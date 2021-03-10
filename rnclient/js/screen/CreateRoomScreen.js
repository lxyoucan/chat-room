/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView, Image,
} from 'react-native';
import {Button, InputItem, List, Toast} from '@ant-design/react-native';
import {ConfigContext} from '../context/ConfigContext';
import {LoginContext} from '../context/LoginContext';

const CreateRoomScreen = ({navigation,route}) => {
    const [serverUrl] = useContext(ConfigContext); //服务器的请求地址
    const setAllRoom = useContext(ConfigContext)[3]; //设置全局群信息
    const [name,setName] = useState('');
    const user = useContext(LoginContext)[2];   //上下文中存储是否登录的状态
    //头像
    const [avatar,setAvatar] = useState('https://img-blog.csdnimg.cn/20210228062811223.png');
    const [describe,setDescribe] = useState('这是一个简单的群');
    //保存用户注册数据
    const save = ()=>{
        fetch(serverUrl + '/creatRoom', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'userId=' + user.userId + '&name='+ name+'&avatar='+avatar+'&describe=' + describe
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(json => {
                if(json.code==0){
                    Toast.info('建群成功！', 2);
                    //刷新群数据
                    fetch(serverUrl + '/roomList')
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (myJson) {
                            console.log(myJson);
                            setAllRoom(myJson.data);
                            //返回上一页
                            navigation.goBack();
                            //增加进入群聊天界面
                            navigation.navigate('ChatRoomScreen', {
                                chatRoom: json.data,
                            });
                        });
                }else{
                    alert(json.msg);
                }

            })
            .catch(e => {
                console.log(e.toString());
            })
    }
    return (
        <SafeAreaView style={styles.container}>

            <List renderHeader={'创建群'}>
                {avatar!=''&&(
                    <Image
                        style={styles.head}
                        source={{
                            uri: avatar,
                        }}
                    />)
                }

                <InputItem
                    clear
                    value={avatar}
                    onChange={value => {
                        setAvatar(value)
                    }}
                    placeholder="输入头像的url地址"
                >
                    群头像
                </InputItem>


                <InputItem
                    clear
                    value={name}
                    onChange={value => {
                        setName(value)
                    }}
                    placeholder="请输入你的群名称"
                >
                    群    名
                </InputItem>
                <InputItem
                    clear
                    value={describe}
                    onChange={value => {
                        setDescribe(value)
                    }}
                    placeholder="请输入你的群简介"
                >
                    简    介
                </InputItem>
                <InputItem
                    clear
                    value={user.name}
                    placeholder="群主"
                    disabled={true}
                >
                    群    主
                </InputItem>
            </List>
            <Button type="primary" onPress={save}>创建</Button>

        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },head: {
        marginLeft:16,
        marginTop:10,
        width: 60,
        height: 60,
        borderRadius: 10,
    },
});


export default CreateRoomScreen;
