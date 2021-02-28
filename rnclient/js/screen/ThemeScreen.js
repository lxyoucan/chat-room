/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, SafeAreaView, StyleSheet, Text, Button, View} from 'react-native';
import {Grid, Icon, Toast} from '@ant-design/react-native';
import {ThemeContext} from '../context/ThemeContext';
import AsyncStorage from '@react-native-community/async-storage';

const themeData = [
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#2196F3'}/>,
        text: 'Default',
        color: '#1677ff',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#F44336'}/>,
        text: 'Red',
        color: '#F44336',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#E91E63'}/>,
        text: 'Pink',
        color: '#E91E63',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#9C27B0'}/>,
        text: 'Purple',
        color: '#9C27B0',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#673AB7'}/>,
        text: 'DeepPurple',
        color: '#673AB7',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#3F51B5'}/>,
        text: 'Indigo',
        color: '#3F51B5',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#2196F3'}/>,
        text: 'Blue',
        color: '#2196F3',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#03A9F4'}/>,
        text: 'LightBlue',
        color: '#03A9F4',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#00BCD4'}/>,
        text: 'Cyan',
        color: '#00BCD4',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#009688'}/>,
        text: 'Teal',
        color: '#009688',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#4CAF50'}/>,
        text: 'Green',
        color: '#4CAF50',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#8BC34A'}/>,
        text: 'LightGreen',
        color: '#8BC34A',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#CDDC39'}/>,
        text: 'Lime',
        color: '#CDDC39',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#FFEB3B'}/>,
        text: 'Yellow',
        color: '#FFEB3B',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#FFC107'}/>,
        text: 'Amber',
        color: '#FFC107',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#FF9800'}/>,
        text: 'Orange',
        color: '#FF9800',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#FF5722'}/>,
        text: 'DeepOrange',
        color: '#FF5722',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#795548'}/>,
        text: 'Brown',
        color: '#795548',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#9E9E9E'}/>,
        text: 'Grey',
        color: '#9E9E9E',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#607D8B'}/>,
        text: 'BlueGrey',
        color: '#607D8B',
    },
    {
        icon: <Icon name={'picture'} size={'lg'} color={'#000000'}/>,
        text: 'Black',
        color: '#000000',
    }
];
const ThemeScreen = ({navigation}) => {
    const [backgroundColor,setBackgroundColor] = useContext(ThemeContext);
    const saveThemeConfig = async (color) => {
        try {
            await AsyncStorage.setItem('@backgroundColor', color);
        } catch (e) {
            // saving error
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <Grid
                    data={themeData}
                    columnNum={4}
                    onPress={(_el, index) => {
                       setBackgroundColor(_el.color);
                        saveThemeConfig(_el.color).then(r => console.log("保存主题颜色："+_el.color));
                    }}
                    renderItem={(el, index) => (
                        <View style={[styles.gridItem,{backgroundColor:el.color}]}>
                            <Text style={styles.gridItemText}>{el.text}</Text>
                        </View>
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ThemeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gridItem:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItemText:{
        color:'#fff'
    }
});
