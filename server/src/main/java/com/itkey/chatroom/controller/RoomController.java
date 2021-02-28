package com.itkey.chatroom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itkey.chatroom.VO.ResultVO;
import com.itkey.chatroom.dataobject.Message;
import com.itkey.chatroom.dataobject.Room;
import com.itkey.chatroom.dataobject.User;
import com.itkey.chatroom.service.impl.MessageServiceImpl;
import com.itkey.chatroom.service.impl.RoomServiceImpl;
import com.itkey.chatroom.utils.ResultVOUtil;

/**
 * 群相关的管理
 */
@RestController
public class RoomController {
    @Autowired
    private RoomServiceImpl roomService;


    /**创建群
     * @param room 群聊信息
     * @return
     */
    @PostMapping("/creatRoom")
    public ResultVO creatRoom(Room room,String userId){
        return roomService.createRoom(room,userId);
    }
    /**群列表
     * @return
     */
    @GetMapping("/roomList")
    public ResultVO roomList(){
        return ResultVOUtil.success(roomService.roomList());
    }

    /**加入群
     * @param user 加群的用户
     * @return
     */
    @PostMapping("/joinRoom")
    public ResultVO joinRoom(Long user,Long room){

        return ResultVOUtil.success(roomService.joinRoom(user,room));
    }

	/**加入群
     * @param roomId 聊天室编号
     * @return
     */
    @GetMapping("/room/users")
    public ResultVO users(Long roomId){

        return ResultVOUtil.success(roomService.roomUserList(roomId));
    }


}
