/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Button, List} from '@ant-design/react-native';
import Item from '@ant-design/react-native/es/list/ListItem';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ConfigContext} from '../context/ConfigContext';

let room;           //聊天室信息
const RoomInfoScreen = ({navigation, route}) => {
    //const [users, setUsers] = useState([]);      //用户列表

    const [serverUrl] = useContext(ConfigContext); //服务器的请求地址
    const roomUsers = useContext(ConfigContext)[4];
    const setRoomUsers= useContext(ConfigContext)[5];
    useEffect(() => {
        room = route.params.room;
        fetch(serverUrl + '/room/users?roomId=' + room.id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setRoomUsers(myJson.data);
            });
        return () => {
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    room = route.params.room;
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
                <List renderHeader={'群成员'}>
                    {
                        roomUsers.map((user) =>
                            (<Item key={user._id} thumb={user.avatar}>
                                {user.name}
                            </Item>),
                        )
                    }
                </List>

                <Button onPress={()=>{
                    navigation.navigate("InvitationJoinRoomScreen",{
                        room:room
                    });
                }}>邀请进群</Button>
                <Button type={'warning'}>退出群聊</Button>
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
