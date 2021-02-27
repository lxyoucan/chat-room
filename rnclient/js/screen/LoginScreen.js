/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import {LoginContext} from '../context/LoginContext';
import {Button, InputItem, List, Toast} from '@ant-design/react-native';
import {ConfigContext} from '../context/ConfigContext';

const LoginScreen = ({navigation, route}) => {
    const [isLogin, setIsLogin, user, setUser] = useContext(LoginContext);   //上下文中存储是否登录的状态
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const [serverUrl] = useContext(ConfigContext); //服务器的请求地址

    const loginDo = () => {
        if (userId == '') {
            Toast.info('用户名不能为空！', 3);
            return;
        } else if (password == '') {
            Toast.info('密码不能为空！', 3);
            return;
        }
        fetch(serverUrl + '/login', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'userId=' + userId + '&password=' + password
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(json => {
                if(json.code!=0){
                    alert(json.msg);
                }else{
                    Toast.info('登录成功！', 1);
                    console.log(json.data);
                    setUser(json.data);
                    setIsLogin(true);
                }
            })
            .catch(e => {
                console.log(e.toString());
            })
    };

    return (
        <SafeAreaView style={styles.container}>

            <List renderHeader={'用户登录'}>
                <InputItem
                    clear
                    value={userId}
                    onChange={value => {
                        setUserId(value);
                    }}
                    placeholder="请输入用户名"
                >
                    用户名
                </InputItem>
                <InputItem
                    clear
                    value={password}
                    onChange={value => {
                        setPassword(value);
                    }}
                    type={'password'}
                    placeholder="默认密码123456"
                >
                    密 码
                </InputItem>
            </List>
            <Button type="primary" onPress={loginDo}>登 录</Button>
            <Button onPress={() => {
                navigation.navigate('RegisterScreen');
            }}>注 册</Button>
            <Button onPress={() => {
                navigation.navigate('UserListScreen');
            }}>用户列表</Button>
            <Button onPress={() => {
                navigation.navigate('ConfigScreen');
            }}>服务地址</Button>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default LoginScreen;
