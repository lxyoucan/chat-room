/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, FlatList} from 'react-native';
import {ConfigContext} from '../context/ConfigContext';
import Message from './chat/Message';
import {Toast} from '@ant-design/react-native';

const TransferRoomScreen = ({navigation, route}) => {
    const [serverUrl] = useContext(ConfigContext); //服务器的请求地址
    const [userList, setUserList] = useState([]);
    const roomUsers = useContext(ConfigContext)[4];
    const [showUsers, setShowUsers] = useState([]);
    const setRoom =useContext(ConfigContext)[9];        //当前聊天室的信息
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        loadData();

    }, []);
    //加载数据
    const loadData = () => {
        //不显示群主自己
        const users = [];
        for (let i = 0; i < roomUsers.length; i++) {
            if (roomUsers[i].userId != route.params.room.owner.userId) {
                users.push(roomUsers[i]);
            }
        }
        setShowUsers(users);
    };
    const renderItem = ({item}) => (
        <Message
            title={item.name}
            msg={'登录账号：' + item.userId}
            head={item.avatar}
            time={item.createdAt}
            unRead={0}
            onPress={() => {
                fetch(
                    serverUrl +
                    '/transferRoom?room=' +
                    route.params.room.id +
                    '&user=' +
                    item._id,
                )
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (myJson) {
                        if (myJson.code == 0) {
                            Toast.info("群转让成功！",2 );
                            setRoom(myJson.data);
                        } else {
                            Toast.info(myJson.msg, 2);
                        }
                    });
            }}
        />
    );
    return (
        <SafeAreaView style={styles.container}>
            <Text>请点击你要转让的群成员！</Text>
            <FlatList
                data={showUsers}
                renderItem={renderItem}
                keyExtractor={(item) => item.userId}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default TransferRoomScreen;
