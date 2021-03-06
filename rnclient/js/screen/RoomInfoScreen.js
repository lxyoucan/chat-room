/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    SafeAreaView,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Button, List, Modal, Toast, WhiteSpace} from '@ant-design/react-native';
import Item from '@ant-design/react-native/es/list/ListItem';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ConfigContext} from '../context/ConfigContext';
import {LoginContext} from '../context/LoginContext';

//let room;           //聊天室信息
const RoomInfoScreen = ({navigation, route}) => {
    const user = useContext(LoginContext)[2];   //上下文中存储是否登录的状态
    const [serverUrl] = useContext(ConfigContext); //服务器的请求地址
    const roomUsers = useContext(ConfigContext)[4];
    const setRoomUsers = useContext(ConfigContext)[5];
    const setMyRoomList = useContext(ConfigContext)[7]; //服务器的请求地址
    const room =useContext(ConfigContext)[8];
    const setRoom =useContext(ConfigContext)[9];

    useEffect(() => {
        setRoom(route.params.room);
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadData = () => {
        fetch(serverUrl + '/room/users?roomId=' + room.id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setRoomUsers(myJson.data);
            });
    };
    //刷新消息列表数据
    const refreshMyRoomList = () => {
        fetch(serverUrl + '/user/rooms?userId=' + user._id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setMyRoomList(myJson.data);
            });
    };
    /**
     * 退出群聊
     */
    const exitRoom = () => {
        fetch(serverUrl + '/exitRoom', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'userId=' + user._id + '&roomId=' + room.id,
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(json => {
                if (json.code == 0) {
                    Toast.info('退出群聊成功！', 2);
                    refreshMyRoomList();        //立即刷新首页消息列表数据
                    loadData();
                    navigation.navigate('TabNav');
                }else if(json.code==-5){
                    Alert.alert('退群提示',json.msg,
                        [
                            {text:"不退了", onPress: () => {}},
                            {text:"坚持要退", onPress: () => {
                                exitRoomOnlyOne();
                            }}
                        ]
                    );

                }else if(json.code==-6){
                    Alert.alert('退群提示',json.msg,
                        [
                            {text:"不退了", onPress: () => {}},
                            {
                                text:"转让群",
                                onPress: () => {
                                    navigation.navigate('TransferRoomScreen', {
                                        room: room,
                                    });
                                }
                            }
                        ]
                    );
                }else {
                    Toast.info(json.msg, 2);
                }
            })
            .catch(e => {
                console.log(e.toString());
            });
    };

    /**
     * 群中仅剩一人执行的退群操作
     * 退出群聊
     */
    const exitRoomOnlyOne = () => {
        fetch(serverUrl + '/exitRoomOnlyOne', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'userId=' + user._id + '&roomId=' + room.id,
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(json => {
                if (json.code == 0) {
                    Toast.info('退出群聊成功！', 2);
                    refreshMyRoomList();        //立即刷新首页消息列表数据
                    //loadData();
                    navigation.navigate('TabNav');
                }else {
                    Toast.info(json.msg, 2);
                }
            })
            .catch(e => {
                console.log(e.toString());
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={{flex: 1, backgroundColor: '#f5f5f9'}}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {room.avatar != '' && (
                    <Image
                        style={styles.head}
                        source={{
                            uri: room.avatar,
                        }}
                    />)
                }
                <List renderHeader={'聊天信息'}>
                    <Item disabled extra={room.name} arrow="horizontal" onPress={() => {
                    }}>
                        群聊名称
                    </Item>
                    <Item
                        extra={
                            <View>
                                <Text>{room.describe}</Text>
                            </View>
                        }
                        multipleLine
                    >
                        群简介
                    </Item>

                </List>
                <List renderHeader={'群主'}>
                    <Item thumb={room.owner.avatar}>
                                {room.owner.name}
                            </Item>
                </List>
                <List renderHeader={'群成员'}>
                    {
                        roomUsers.map((user) =>
                            (<Item key={user._id} thumb={user.avatar}>
                                {user.name}
                            </Item>),
                        )
                    }
                </List>
                <WhiteSpace size="lg"/>
                {user.userId==room.owner.userId&&
                    (
                        <Button onPress={() => {
                            navigation.navigate('TransferRoomScreen', {
                                room: room,
                            });
                        }}>转让群</Button>
                    )
                }
                <Button onPress={() => {
                    navigation.navigate('InvitationJoinRoomScreen', {
                        room: room,
                    });
                }}>邀请进群</Button>
                <WhiteSpace size="sm"/>
                <Button type={'warning'} onPress={exitRoom}>退出群聊</Button>
            </ScrollView>
        </SafeAreaView>
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, head: {
        marginLeft: 16,
        marginTop: 10,
        width: 60,
        height: 60,
        borderRadius: 10,
    },
});


export default RoomInfoScreen;
