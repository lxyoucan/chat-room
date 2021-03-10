# chat-room
前端：RN 后端：Spring boot 实现的聊天室功能（群聊）

这是一个大部分时间使用手机在地铁上开发的项目

通勤久不是停止写代码的理由，手机也能写代码。虽然慢了一点，至少我在向前爬。



# 功能简介

1. 简单的用户管理
2. 简单的用户登录
3. 用户建群
4. 邀请人进群
5. 群聊 （仅文本消息）
6. 加入群聊天
7. 退出群聊
# 打包部署
跳过测试打包

```mvn clean package -Dmaven.test.skip=true```

```nohup java -jar sg.jar > catalina.out 2>&1 &```



