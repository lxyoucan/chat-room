/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import {LoginContext} from '../context/LoginContext';
import {Button, InputItem, List} from '@ant-design/react-native';

const LoginScreen = ({navigation, route}) => {
    const [isLogin, setIsLogin, user, setUser] = useContext(LoginContext);   //上下文中存储是否登录的状态
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginDo = () => {
        if (username == '') {
            alert('用户名不能为空！');
        } else if (password == '') {
            alert('密码不能为空！');
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <List renderHeader={'用户登录'}>
                <InputItem
                    clear
                    value={username}
                    onChange={value => {
                        setUsername(value);
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
