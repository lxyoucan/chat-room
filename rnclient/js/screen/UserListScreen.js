import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
//import {ThemeContext} from "../../context/ThemeContext";
import Message from './chat/Message';
import {ConfigContext} from '../context/ConfigContext';

const UserListScreen = ({navigation}) => {
  const [serverUrl] = useContext(ConfigContext); //服务器的请求地址
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetch(serverUrl + '/userList')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setRoomList(myJson.data);
      });
  }, []);
  const renderItem = ({item}) => (
    <Message
      title={item.name}
      msg={'登录账号：' + item.userId}
      head={item.avatar}
      time={item.createdAt}
      unRead={0}
      onPress={() => {
        alert('你为什么这么好看');
      }}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={roomList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
