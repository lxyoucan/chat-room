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
import {Button, List, WhiteSpace} from '@ant-design/react-native';
import Item from '@ant-design/react-native/es/list/ListItem';
import {ConfigContext} from '../context/ConfigContext';
import {LoginContext} from '../context/LoginContext';

const SettingScreen = ({navigation, route}) => {
    const [serverUrl] = useContext(ConfigContext); //服务器的请求地址
    const [isLogin, setIsLogin, user, setUser] = useContext(LoginContext);   //上下文中存储是否登录的状态
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={{flex: 1, backgroundColor: '#f5f5f9'}}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {user.avatar != '' && (
                    <Image
                        style={styles.head}
                        source={{
                            uri: user.avatar,
                        }}
                    />)
                }
                <List renderHeader={'个人信息'}>
                    <Item disabled extra={user.name} arrow="horizontal" onPress={() => {
                    }}>
                        昵        称
                    </Item>

                    <Item  arrow="horizontal" onPress={() => {
                        navigation.navigate("ThemeScreen");
                    }}>
                        主题设置
                    </Item>
                </List>
                <WhiteSpace size="lg" />
                <Button type={'warning'} onPress={()=>{
                    setIsLogin(false);
                }}>退出登录</Button>
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


export default SettingScreen;
