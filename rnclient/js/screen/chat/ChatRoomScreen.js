/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat';
// 引入中文语言包
import 'dayjs/locale/zh-cn';
import {View,Text,StyleSheet,SafeAreaView} from 'react-native';

const URL_SERVER = 'http://192.168.0.101:8088';

let loginUser;      //当前登录用户
export default function ChatRoomScreen() {
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState('lufei');
    const [receiverUser, setReceiverUser] = useState({
        _id: 50,
    });
    useEffect(() => {
        loadMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() =>{
        console.log("------切换用户-----");
        fetch(URL_SERVER + '/user/query?userId='+receiver)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                if (result.code == 0) {
                    console.log(result.data);
                    setReceiverUser(result.data);
                    loginUser = result.data;
                }
            });
    },[receiver]);


    const onSend = useCallback((msg = []) => {
        console.log(msg);
        msg.map((item, index) => {
            postMessage(item.text);
            console.log(item.createdAt);
        });
        //setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
    }, []);
    const postMessage = (text) => {
        let postData = 'roomId=1&text=' + text + '&userId=' + loginUser.userId;
        console.log(postData);
        fetch(URL_SERVER + '/send', {
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

    let timer;  //计时器
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
        fetch(URL_SERVER + '/list')
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
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
                user={receiverUser}
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