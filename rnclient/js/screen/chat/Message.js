import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

/**
 * 一行会话
 * @param title
 * @param msg
 * @param head
 * @param time
 * @returns {*}
 * @constructor
 */
const Message = ({title, msg, head, time, unRead, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <View style={styles.messageLeft}>
      <Image
        style={styles.head}
        source={{
          uri: head,
        }}
      />
    </View>

    <View style={styles.messageRight}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={styles.msgView}>
        <Text style={styles.msg} numberOfLines={1}>
          {msg}
        </Text>
        {unRead == 0 ? (
          <></>
        ) : (
          <View style={styles.unRead}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: '700',
              }}>
              {unRead}
            </Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  titleView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  msgView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#191919',
  },
  msg: {
    fontSize: 16,
    color: '#b2b2b2',
    marginTop: 8,
  },
  head: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  time: {
    fontSize: 14,
    color: '#b2b2b2',
  },
  messageLeft: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
  },
  messageRight: {
    flex: 1,
    justifyContent: 'center',
    height: 80,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    flexDirection: 'column',
  },
  unRead: {
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 7,
    right: 2,
  },
});

export default Message;
