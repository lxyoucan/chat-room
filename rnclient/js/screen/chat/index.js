/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useContext} from 'react';
import {View,Text, SafeAreaView, StyleSheet,FlatList,Image,TouchableOpacity} from 'react-native';
//import {ThemeContext} from "../../context/ThemeContext";
import Message from  "./Message";
import {ConfigContext} from '../../context/ConfigContext';


const ChatScreen = ({navigation}) => {
   // const [backgroundColor,setBackgroundColor] = useContext(ThemeContext);
    const [roomList,setRoomList] = useState([]);
    const [serverUrl] = useContext(ConfigContext); //服务器的请求地址
    useEffect(() => {
        fetch(serverUrl+'/roomList')
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
