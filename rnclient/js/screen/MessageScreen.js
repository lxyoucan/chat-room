/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Message from './chat/Message';
import {ConfigContext} from '../context/ConfigContext';
import {Button} from '@ant-design/react-native';

const MessageScreen = ({navigation}) => {
  // const [backgroundColor,setBackgroundColor] = useContext(ThemeContext);
  const [serverUrl,setServerUrl,allRoom,setAllRoom] = useContext(ConfigContext); //服务器的请求地址
  useEffect(() => {
    fetch(serverUrl + '/roomList')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setAllRoom(myJson.data);
      });
  }, []);
  const renderItem = ({item}) => (
    <Message
      title={item.name}
      msg={item.describe}
      head={item.avatar}
      time={'群主：' + item.owner.name}
      unRead={0}
      onPress={() => {
        navigation.navigate('ChatRoomScreen', {
          chatRoom: item,
        });
      }}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={()=>{
          navigation.navigate("CreateRoomScreen");
      }}>创建群</Button>

      <Text> 未加入的群，点击完成添加</Text>
      <FlatList
        data={allRoom}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + ''}
      />
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
