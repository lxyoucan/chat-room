/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {Button, TouchableOpacity,Animated} from 'react-native';
import {View, Text} from '../components/Themed';
import {createStackNavigator,HeaderBackButton} from '@react-navigation/stack';
import TabNav from './TabNav';;
import ChatScreen from '../screen/chat';
import ChatRoomScreen from '../screen/chat/ChatRoomScreen';
import LoginScreen from '../screen/LoginScreen';
import UserListScreen from '../screen/UserListScreen';
import RegisterScreen from '../screen/RegisterScreen';
import ConfigScreen from '../screen/ConfigScreen';
import {LoginContext} from '../context/LoginContext';
import {ThemeContext} from '../context/ThemeContext';
const Stack = createStackNavigator();

function App() {
    const [isLogin] = useContext(LoginContext);   //上下文中存储是否登录的状态
    const [backgroundColor] = useContext(ThemeContext);

    //自定义主题导航颜色设置
    const navOptions = (navigation,title)=>({
        title: title,
        headerShown: true,
        headerStyle: {
            backgroundColor: backgroundColor,
        },
        headerTitleStyle: {
            color: '#fff',
        },
        headerLeft: (props) => (
            <HeaderBackButton
                {...props}
                tintColor='#fff'
                onPress={() => {
                    navigation.goBack()
                }}
            />
        ),
    });

    return (
        <Stack.Navigator>
            {/*防止登录状态，跳转登录页面，未登录状态跳转主页*/}
            {isLogin ? (
                <Stack.Screen
                    name="TabNav"
                    component={TabNav}
                    options={{title: '返回', headerShown: false}}
                />
            ) : (
                <>
                    <Stack.Screen
                        name="LoginPage"
                        component={LoginScreen}
                        options={{title: '登录', headerShown: false}}
                    />
                    <Stack.Screen
                        name="UserListScreen"
                        component={UserListScreen}
                        options={{title: '用户列表', headerShown: true}}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{title: '用户注册', headerShown: true}}
                    />
                    <Stack.Screen
                        name="ConfigScreen"
                        component={ConfigScreen}
                        options={{title: '服务地址临时设置', headerShown: true}}
                    />
                </>
            )}

            <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={({navigation})=>navOptions(navigation,"聊天")}
            />
            <Stack.Screen
                name="ChatRoomScreen"
                component={ChatRoomScreen}
                options={({navigation})=>navOptions(navigation,"聊天室")}
            />
        </Stack.Navigator>
    );
}

export default App;
