package com.itkey.chatroom.controller;

import com.itkey.chatroom.VO.ResultVO;
import com.itkey.chatroom.dataobject.Message;
import com.itkey.chatroom.service.impl.MessageServiceImpl;
import com.itkey.chatroom.utils.ResultVOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChatController {
    @Autowired
    private MessageServiceImpl messageService;

    /**
     * 查询配置列表
     * @return
     */
    @GetMapping("/list")
    public ResultVO queryMessageListByRoomId(Long roomId) {
        List<Message> list = messageService.queryMessageListByRoomId(roomId);
        return ResultVOUtil.success(list);
    }

    /**
     * 查询配置列表
     * @return
     */
    @GetMapping("/user/query")
    public ResultVO userQuery(String userId) {
        return messageService.userQuery(userId);
    }

    /**
     * 发送消息
     * @param roomId 聊天室id
     * @param text 消息体
     * @param userId 发信人
     * @return
     */
    @PostMapping("/send")
    public ResultVO sendMessage(Long roomId,String text,String userId) {
        return messageService.sendMessage(roomId,text,userId);
    }
}
