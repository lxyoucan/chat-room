package com.itkey.chatroom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

    /**
     * 退群
     * @param roomId 群
     * @param userId 用户id
     * @return
     */
    @PostMapping("/exitRoom")
    public ResultVO exitRoom(Long roomId, Long userId){
        return roomService.exitRoom(roomId,userId);
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
    @RequestMapping("/joinRoom")
    public ResultVO joinRoom(Long user,Long room){

        return roomService.joinRoom(user,room);
    }

	/**查询群中所有成员
     * @param roomId 聊天室编号
     * @return
     */
    @GetMapping("/room/users")
    public ResultVO users(Long roomId){

        return ResultVOUtil.success(roomService.roomUserList(roomId));
    }
    /**查询未进群的好友，用于邀请进群
     * todo: 增加好友功能。暂时没有好友功能，默认所有用户都是好友
     * @param roomId 聊天室编号
     * @return
     */
    @GetMapping("/room/notInUsers")
    public ResultVO notInUsers(Long roomId){

        return ResultVOUtil.success(roomService.notInUsers(roomId));
    }
    /**查询用户的所有群
     * @param userId 用户编号
     * @return
     */
    @GetMapping("/user/rooms")
    public ResultVO userRooms(Long userId){

        return roomService.userRooms(userId);
    }


}
