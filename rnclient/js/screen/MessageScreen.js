/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
} from 'react-native';
import {LoginContext} from '../context/LoginContext';

const SettingsScreen = ({navigation,route}) => {
   const [isLogin, setIsLogin, user, setUser] = useContext(LoginContext);   //上下文中存储是否登录的状态



    return (
        <SafeAreaView style={styles.container}>
            <Text>我就是来占位置的</Text>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default SettingsScreen;
