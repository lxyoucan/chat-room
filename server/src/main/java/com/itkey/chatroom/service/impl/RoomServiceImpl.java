package com.itkey.chatroom.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.itkey.chatroom.VO.ResultVO;
import com.itkey.chatroom.utils.ResultVOUtil;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.itkey.chatroom.dataobject.Room;
import com.itkey.chatroom.dataobject.User;
import com.itkey.chatroom.dataobject.UserInRoom;
import com.itkey.chatroom.repository.RoomRepository;
import com.itkey.chatroom.repository.UserInRoomRepository;
import com.itkey.chatroom.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.lang.RuntimeException;

@Service
public class RoomServiceImpl {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInRoomRepository userInRoomRepository;

    /**
     * 创建群
     *
     * @param room 群信息
     * @return
     */
    @Transactional
    public ResultVO createRoom(Room room, String userId) {
        room.setCreatedAt(new Date());
        room.setUserCount(1);
        if(!StringUtils.hasText(userId)){
            return ResultVOUtil.error(-1,"未登录，无权创建群！");
        }
        User user = userRepository.queryByUserId(userId);
        if(user==null){
            return ResultVOUtil.error(-1,"未登录，无权创建群！");
        }
        if(!StringUtils.hasText(room.getName())){
            return ResultVOUtil.error(-2,"创建群，要给它取个名吧！");
        }
        if(!StringUtils.hasText(room.getAvatar())){
            return ResultVOUtil.error(-3,"创建群，设置个头像吧！");
        }
        room.setOwner(user);
        return ResultVOUtil.success(roomRepository.save(room));
    }

    /**
     * 用户加群
     *
     * @param userId 用户信息
     * @param roomId 群id
     * @return
     */
    public ResultVO joinRoom(Long userId, Long roomId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Room> roomOptional = roomRepository.findById(roomId);

        if (!userOptional.isPresent()) {
            return ResultVOUtil.error(-1,"用户不存在！");
        }
        if (!roomOptional.isPresent()) {
            return ResultVOUtil.error(-2,"错误的群id！");
        }
        //判断用户是否已经加过群了
        User user = userOptional.get();
        Room room = roomOptional.get();
        Integer integer = userInRoomRepository.countByUserAndRoom(user, room);
        if (integer > 0) {

            return ResultVOUtil.error(-3,"重复加群！");
        }

        UserInRoom userInRoom = new UserInRoom();
        userInRoom.setUser(user);
        userInRoom.setRoom(room);
        UserInRoom result = userInRoomRepository.save(userInRoom);
        if (result != null) {
            return ResultVOUtil.success("成功进群！");
        } else {
            return ResultVOUtil.error(-4,"数据错误！");
        }
    }

    public List<User> roomUserList(Long roomId) {
        if (roomId == null) return null;
        Optional<Room> roomOptional = roomRepository.findById(roomId);
        if (!roomOptional.isPresent()) {
            System.out.println("群不存在！"); //todo:这里应该抛如异常
            return null;
        }
        //return userInRoomRepository.queryByRoom(roomOptional.get());
        List<UserInRoom> result =userInRoomRepository.users(roomOptional.get());
        List<User> userList = new ArrayList<>();
        for (UserInRoom userInRoom :
                result) {
            userList.add(userInRoom.getUser());
        }
        return userList;
    }

    /**
     * 根据用户id 查询相关群列表
     * @param userId
     * @return
     */
    public ResultVO userRooms(Long userId) {
        if (userId == null) return ResultVOUtil.error(-1,"用户未登录");
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResultVOUtil.error(-2,"["+userId+"]用户不存在！");
        }
        //return userInRoomRepository.queryByRoom(roomOptional.get());
        List<UserInRoom> result =userInRoomRepository.rooms(userOptional.get());
        List<Room> roomList = new ArrayList<>();
        for (UserInRoom userInRoom :
                result) {
            roomList.add(userInRoom.getRoom());
        }
        return ResultVOUtil.success(roomList);
    }

    /**
     * 群列表
     * @return
     */
    public List<Room> roomList(){
       return roomRepository.findAll();
    }
}
