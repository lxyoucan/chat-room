package com.itkey.chatroom.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.itkey.chatroom.dataobject.Room;
import com.itkey.chatroom.dataobject.User;
import com.itkey.chatroom.dataobject.UserInRoom;
import com.itkey.chatroom.repository.RoomRepository;
import com.itkey.chatroom.repository.UserInRoomRepository;
import com.itkey.chatroom.repository.UserRepository;

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
    public Room createRoom(Room room) {
        room.setCreatedAt(new Date());
        room.setUserCount(1);
        Optional<User> userOptional = userRepository.findById(1l);
        room.setOwner(userOptional.get());
        return roomRepository.save(room);
    }

    /**
     * 用户加群
     *
     * @param userId 用户信息
     * @param roomId 群id
     * @return
     */
    public String joinRoom(Long userId, Long roomId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Room> roomOptional = roomRepository.findById(roomId);

        if (!userOptional.isPresent()) {
            return "用户不存在！";
        }
        if (!roomOptional.isPresent()) {
            return "错误的群id！";
        }
        //判断用户是否已经加过群了
        User user = userOptional.get();
        Room room = roomOptional.get();
        Integer integer = userInRoomRepository.countByUserAndRoom(user, room);
        if (integer > 0) {
            return "重复加群！";
        }

        UserInRoom userInRoom = new UserInRoom();
        userInRoom.setUser(user);
        userInRoom.setRoom(room);
        UserInRoom result = userInRoomRepository.save(userInRoom);
        if (result != null) {
            return "成功进群！";
        } else {
            return "错误！";
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
     * 群列表
     * @return
     */
    public List<Room> roomList(){
       return roomRepository.findAll();
    }
}
