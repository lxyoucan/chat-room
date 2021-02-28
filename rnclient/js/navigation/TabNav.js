/* eslint-disable prettier/prettier */
import * as React from 'react';
import {Text, View} from '../components/Themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screen/chat/index';
import RoomManagerScreen from '../screen/RoomManagerScreen';
import SettingsScreen from '../screen/SettingsScreen';
import {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import {LoginContext} from '../context/LoginContext';

export default function Navigation({colorScheme}) {
    const [backgroundColor] = useContext(ThemeContext);
    const [countMessage, setCountMessage] = useState(0);

    useEffect(() => {

    },[]);

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    if (route.name === 'index') {
                        return <AntDesign name="message1" size={size} color={color}/>;
                    } else if (route.name === 'message') {
                        return <AntDesign name="cloudo" size={size} color={color}/>;
                    } else if (route.name === 'setting') {
                        return <AntDesign name="user" size={size} color={color}/>;
                    }
                },
            })}
            tabBarOptions={{
                activeTintColor: backgroundColor,
            }}
        >
            <Tab.Screen
                name="index"
                component={HomeScreenNavigator}
                options={{title: '消息', headerMode: 'none'}}
            />
           <Tab.Screen
                name="message"
                component={MessageNavigator}
                options={{title: '加群',  }}
            />

            <Tab.Screen
                name="setting"
                component={SettingsScreenNavigator}
                options={{title: '我的'}}
            />
        </Tab.Navigator>
    );
}
const Tab = createBottomTabNavigator();
const TabStack = createStackNavigator();

function MessageNavigator() {
    const [backgroundColor,setBackgroundColor] = useContext(ThemeContext);
    return (
        <TabStack.Navigator>
            <TabStack.Screen
                name="RoomManagerScreen"
                 component={RoomManagerScreen}
                options={{
                    headerTitle: '加群',
                    headerLeft: null,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: backgroundColor,
                    },
                    headerTitleStyle:{
                        color: '#fff',
                    }
                }}
            />
        </TabStack.Navigator>
    );
}

function SettingsScreenNavigator() {
    const [backgroundColor,setBackgroundColor] = useContext(ThemeContext);
    return (
        <TabStack.Navigator>
            <TabStack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    headerTitle: '我的',
                    headerLeft: null,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: backgroundColor,
                    },
                    headerTitleStyle:{
                        color: '#fff',
                    }
                }}
            />
        </TabStack.Navigator>
    );
}
function HomeScreenNavigator() {
    const [backgroundColor,setBackgroundColor] = useContext(ThemeContext);
    const user = useContext(LoginContext)[2];   //上下文中存储是否登录的状态
    return (
        <TabStack.Navigator>
            <TabStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerTitle: user.name,
                    headerLeft: null,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: backgroundColor,
                    },
                    headerTitleStyle:{
                        color: '#fff',
                    }
                }}
            />
        </TabStack.Navigator>
    );
}
