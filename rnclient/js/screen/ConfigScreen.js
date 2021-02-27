import React, {useContext} from 'react';
import {StyleSheet, Text, SafeAreaView, Image} from 'react-native';
import {ConfigContext} from '../context/ConfigContext';
import {Button, List, TextareaItem} from '@ant-design/react-native';

const ConfigScreen = ({navigation, route}) => {
  const [serverUrl, setServerUrl] = useContext(ConfigContext); //服务器的请求地址

  //保存用户注册数据
  const save = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <Text> 示例：http://127.0.0.1:8088 域名+端口不要带/</Text>

      <List renderHeader={'服务器地址(立即生效)'}>
        <TextareaItem
          clear
          value={serverUrl}
          onChange={(value) => {
            setServerUrl(value);
          }}
          placeholder="输入服务器url地址"
          rows={4}
          autoHeight
          style={{paddingVertical: 5}}
        />
        <Button
          onPress={() => {
            fetch(serverUrl, {
              method: 'POST',
            })
              .then((response) => {
                if (response.ok) {
                  return response.text();
                }
                throw new Error('网络连接异常！');
              })
              .then((responseText) => {
                alert(responseText);
              })
              .catch((e) => {
                alert(e.toString());
              });
          }}>
          测试
        </Button>
      </List>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    marginLeft: 16,
    marginTop: 10,
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});

export default ConfigScreen;
