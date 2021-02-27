/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useContext} from 'react';
import {View,Text, SafeAreaView, StyleSheet,FlatList,Image,TouchableOpacity} from 'react-native';
//import {ThemeContext} from "../../context/ThemeContext";
import Message from  "./Message";

const wm = require('../../../assets/head/wm.jpeg');
const zwl = require('../../../assets/head/zwl.jpeg');
const lx = require('../../../assets/head/lx.jpg');

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: '王慢',
        head: wm,
        msg: '师父，来帮我看看，我遇到问题了',
        time:'上午 9:45',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: '张旺龙',
        head: zwl,
        msg: '刘老板，看看这个定位页面可不可以？',
        time:'昨天',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: '刘旭',
        head: lx,
        msg: '可以的，把标题调一下,刘老板，看看这个定位页面可不可以？刘老板，看看这个定位页面可不可以？',
        time:'下午 4:45',
    },
];


const ChatScreen = ({navigation}) => {
   // const [backgroundColor,setBackgroundColor] = useContext(ThemeContext);
    const [roomList,setRoomList] = useState([]);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetch('http://127.0.0.1:8088/roomList')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                setRoomList(myJson.data);
            });
    }, []);
    const renderItem = ({ item }) => (
        <Message title={item.name}
                 msg={'这是最新的群信息'}
                 head={item.avatar}
                 time={item.createdAt}
                 unRead={0}
                 onPress={()=>{
                     navigation.navigate("ChatRoomScreen");
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
