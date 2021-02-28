/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useContext} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import Message from './chat/Message';
import {ConfigContext} from '../context/ConfigContext';
import {Button, Toast} from '@ant-design/react-native';
import {LoginContext} from '../context/LoginContext';

const RoomManagerScreen = ({navigation}) => {
    // const [backgroundColor,setBackgroundColor] = useContext(ThemeContext);
    const [serverUrl, setServerUrl, allRoom, setAllRoom] = useContext(ConfigContext); //服务器的请求地址
    const user = useContext(LoginContext)[2];   //上下文中存储是否登录的状态
    useEffect(() => {
        fetch(serverUrl + '/roomList')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setAllRoom(myJson.data);
            });
    }, []);
    //加群
    const joinRoom = (item) => {
        fetch(serverUrl + '/joinRoom?user=' + user._id + '&room='+item.id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                if(myJson.code==0){
                    Toast.info("成功加入【"+item.name+"】！", 2);
                    navigation.navigate('ChatRoomScreen', {
                        chatRoom: item,
                    });
                }else{
                    Toast.info(myJson.msg, 2);
                }

            });
    };
    const renderItem = ({item}) => (
        <Message
            title={item.name}
            msg={item.describe}
            head={item.avatar}
            time={'群主：' + item.owner.name}
            unRead={0}
            onPress={() => {
                joinRoom(item);
            }}
        />
    );
    return (
        <SafeAreaView style={styles.container}>
            <Button onPress={() => {
                navigation.navigate('CreateRoomScreen');
            }}>创建群</Button>

            <Text> 未加入的群，点击完成添加</Text>
            <FlatList
                data={allRoom}
                renderItem={renderItem}
                keyExtractor={(item) => item.id + ''}
            />
        </SafeAreaView>
    );
};

export default RoomManagerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});
