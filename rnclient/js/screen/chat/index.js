/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useContext} from 'react';
import {View,Text, SafeAreaView, StyleSheet,FlatList,Image,TouchableOpacity} from 'react-native';
//import {ThemeContext} from "../../context/ThemeContext";
import Message from  "./Message";
import {ConfigContext} from '../../context/ConfigContext';
import {LoginContext} from '../../context/LoginContext';

let timer;      //  计时器
const ChatScreen = ({navigation}) => {
   // const [backgroundColor,setBackgroundColor] = useContext(ThemeContext);
    const [roomList,setRoomList] = useState([]);
    const [serverUrl] = useContext(ConfigContext); //服务器的请求地址
    const user = useContext(LoginContext)[2];   //上下文中存储是否登录的状态
    useEffect(() => {
        loadMessageDo();
        loadMessage();
        return () => {
            console.log("------------组件被卸载了!停止定时器--------");
            timer && clearTimeout(timer);
            timer = null;
        };
    }, []);
    /**
     * 加载群信息
     */
    const loadMessage = () => {
        if (timer == null) {
            timer = setInterval(function () {
                //执行代码
                loadMessageDo();
            }, 3000);
        }
    };

    const loadMessageDo = ()=>{
        fetch(serverUrl+'/user/rooms?userId='+user._id)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                setRoomList(myJson.data);
            });
    };
    const renderItem = ({ item }) => (
        <Message title={item.name}
                 msg={'这是最新的群信息'}
                 head={item.avatar}
                 time={item.createdAt}
                 unRead={0}
                 onPress={()=>{
                     navigation.navigate("ChatRoomScreen",{
                         chatRoom: item
                     });
                 }}
        />
    );
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={roomList}
                renderItem={renderItem}
                keyExtractor={item => item.id+''}
            />
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});
