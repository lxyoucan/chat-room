/* eslint-disable prettier/prettier */
import React, {useState, useCallback, useEffect, useContext} from 'react';
import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat';
// 引入中文语言包
import 'dayjs/locale/zh-cn';
import {View,Text,StyleSheet,SafeAreaView} from 'react-native';
import {ConfigContext} from '../../context/ConfigContext';
import {LoginContext} from '../../context/LoginContext';


let loginUser;      //当前登录用户
let room;           //聊天室信息
let timer;  //计时器
export default function ChatRoomScreen({route, navigation}) {
    const [messages, setMessages] = useState([]);
    const [serverUrl] = useContext(ConfigContext); //服务器的请求地址
    const [isLogin, setIsLogin, user ] = useContext(LoginContext);   //上下文中存储是否登录的状态

    room = route.params.chatRoom;
    useEffect(() => {
        loadMessageDo();
        loadMessage();
        loginUser = user;

        navigation.setOptions({
            title: room.name,
        });
        return () => {
            console.log("------------组件被卸载了!停止定时器--------");
            timer && clearTimeout(timer);
            timer = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSend = useCallback((msg = []) => {
        console.log(msg);
        msg.map((item, index) => {
            postMessage(item.text);
            console.log(item.createdAt);
        });
        //setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
    }, []);
    const postMessage = (text) => {
        let postData = 'roomId='+route.params.chatRoom.id+'&text=' + text + '&userId=' + loginUser.userId;
        console.log(postData);
        fetch(serverUrl + '/send', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postData
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Network response was not ok.');
            })
            .then(responseText => {
                console.log(responseText);
                loadMessageDo();
            })
            .catch(e => {
                console.log(e.toString());
            });
    };


    /**
     * 加载聊天信息
     */
    const loadMessage = () => {
        if (timer == null) {
            timer = setInterval(function () {
                //执行代码
                loadMessageDo();
            }, 1500);
        }
    };

    const loadMessageDo = ()=>{
        //console.log('-----------获取数据------------');
        //console.log(route.params.chatRoom.id);
        console.log('-------room:'+room.id);
        fetch(serverUrl + '/list?roomId='+room.id)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                console.log(JSON.stringify(result));
                if (result.code == 0) {
                    setMessages(result.data);
                }
            });
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: 'black',
                    },
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#fff',
                    },
                    right: {
                        backgroundColor: '#95ec69',
                    },
                }}
            />
        );
    };

    const renderSend = (props) => {
        return (
            <Send
                {...props}
                alwaysShowSend={true}
            >
                <View style={styles.sendBtn}>
                    <Text style={{color: '#ffffff', fontSize: 17}}>发送</Text>
                </View>
            </Send>
        );
    };

    return (
        <SafeAreaView style={styles.mainContent}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                showUserAvatar={true}
                locale={'zh-cn'}
                showAvatarForEveryMessage={true}
                renderBubble={renderBubble}
                placeholder={'开始聊天吧'}
                renderSend={renderSend}
                inverted={true}
                renderUsernameOnMessage={true}
                user={user}
               alignTop={true}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: '#ededed',
    },
    sendBtn: {
        width: 63,
        height: 32,
        borderRadius: 3,
        backgroundColor:'#07c160',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:5,
        marginRight:5,
    }
});
