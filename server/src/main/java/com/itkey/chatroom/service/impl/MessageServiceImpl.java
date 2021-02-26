package com.itkey.chatroom.service.impl;

import com.itkey.chatroom.VO.ResultVO;
import com.itkey.chatroom.dataobject.Message;
import com.itkey.chatroom.dataobject.User;
import com.itkey.chatroom.repository.MessageRepository;
import com.itkey.chatroom.repository.UserRepository;
import com.itkey.chatroom.utils.ResultVOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;

@Service
public class MessageServiceImpl {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     *
     * @param roomId 房间ID
     * @param text 信息
     * @param userId 用户名
     * @return
     */
    public ResultVO sendMessage(Long roomId,String text,String userId){
        if(roomId==null){
            return ResultVOUtil.error(-1,"roomId为空！");
        }
        if(StringUtils.isEmpty(text)){
            return ResultVOUtil.error(-2,"消息为空！发送失败。");
        }
        if(StringUtils.isEmpty(userId)){
            return ResultVOUtil.error(-3,"发件人为空！");
        }

        User user = userRepository.queryByUserId(userId);
        if(StringUtils.isEmpty(user)){
            return ResultVOUtil.error(-4,"发件人不存在！");
        }

        Message msg = new Message();
        msg.setRoomId(1l);
        msg.setText(text);
        //msg.setImage("http://192.168.101.134:8080/head/01.jpeg");
        //msg.setVideo("http://192.168.101.134:8080/video/01.mp4");
        msg.setUser(user);
        msg.setCreatedAt(new Date());
        msg.setRoomId(roomId);
        messageRepository.save(msg);
        return ResultVOUtil.success();
    }

    /**
     * 根据聊天室ID 查询聊天列表
     * @param roomId
     * @return
     */
    public List<Message> queryMessageListByRoomId(Long roomId){
        if(roomId==null){
            roomId = 1l;
        }
       //return messageRepository.queryByRoomIdOrderByCreatedAtAsc(roomId);
        return messageRepository.queryByRoomIdOrderByCreatedAtDesc(roomId);
    }

    /**
     * 根据聊天室ID 查询聊天列表
     * @param userId
     * @return
     */
    public ResultVO userQuery(String userId){
        if(userId==null||StringUtils.isEmpty(userId)){
            ResultVOUtil.error(-1,"userId为空！");
        }
        User user = userRepository.queryByUserId(userId);
        if(user==null){
            ResultVOUtil.error(-2,"userid:"+userId+"查无记录！");
        }
        //return messageRepository.queryByRoomIdOrderByCreatedAtAsc(roomId);
        return ResultVOUtil.success(user);
    }
}
