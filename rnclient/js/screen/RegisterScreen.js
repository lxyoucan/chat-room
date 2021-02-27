/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView, Image,
} from 'react-native';
import {Button, InputItem, List} from '@ant-design/react-native';
import {ConfigContext} from '../context/ConfigContext';

const RegisterScreen = ({navigation,route}) => {
    const [serverUrl] = useContext(ConfigContext); //服务器的请求地址
    const [userId,setUserId] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    //头像
    const [avatar,setAvatar] = useState('https://img-blog.csdnimg.cn/20210227171154880.png');

    //保存用户注册数据
    const save = ()=>{
        fetch(serverUrl + '/userRegister', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'userId=' + userId + '&password=' + password + '&name='+ username+'&avatar='+avatar
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(json => {
                alert(json.msg);
            })
            .catch(e => {
                console.log(e.toString());
            })
    }
    return (
        <SafeAreaView style={styles.container}>

            <List renderHeader={'用户注册'}>
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
                    头像url
                </InputItem>

                <InputItem
                    clear
                    value={userId}
                    onChange={value => {
                        setUserId(value)
                    }}
                    placeholder="请输入用户名,用于登录"
                >
                    用户名
                </InputItem>
                <InputItem
                    clear
                    value={password}
                    onChange={value => {
                        setPassword(value)
                    }}
                    placeholder="默认密码"
                >
                    密    码
                </InputItem>
                <InputItem
                    clear
                    value={username}
                    onChange={value => {
                        setUsername(value)
                    }}
                    placeholder="请输入你的昵称"
                >
                    昵    称
                </InputItem>

            </List>
            <Button type="primary" onPress={save}>注册</Button>

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


export default RegisterScreen;
