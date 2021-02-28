import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, FlatList} from 'react-native';
import {ConfigContext} from '../context/ConfigContext';
import Message from './chat/Message';
import {Toast} from '@ant-design/react-native';

const InvitationJoinRoomScreen = ({navigation, route}) => {
  const [serverUrl] = useContext(ConfigContext); //服务器的请求地址
  const [userList, setUserList] = useState([]);
  const setRoomUsers = useContext(ConfigContext)[5];
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loadData();
  }, []);
  //加载数据
  const loadData = () => {
    fetch(serverUrl + '/room/notInUsers?roomId=' + route.params.room.id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setUserList(myJson.data);
      });
  };
  const renderItem = ({item}) => (
    <Message
      title={item.name}
      msg={'登录账号：' + item.userId}
      head={item.avatar}
      time={item.createdAt}
      unRead={0}
      onPress={() => {
        fetch(
          serverUrl +
            '/joinRoom?room=' +
            route.params.room.id +
            '&user=' +
            item._id,
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (myJson) {
            console.log(myJson);
            Toast.info('邀请成功！', 2);
            loadData();
            //刷新一下群成员信息
            fetch(serverUrl + '/room/users?roomId=' + route.params.room.id)
              .then(function (response) {
                return response.json();
              })
              .then(function (myJson) {
                console.log('-----刷新群成员信息------');
                setRoomUsers(myJson.data);
              });
          });
      }}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text>点击要邀请进群的人员吧！</Text>
      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={(item) => item.userId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default InvitationJoinRoomScreen;
