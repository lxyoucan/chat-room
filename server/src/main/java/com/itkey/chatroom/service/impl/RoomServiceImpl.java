package com.itkey.chatroom.service.impl;
import com.itkey.chatroom.dataobject.Room;
import com.itkey.chatroom.dataobject.User;
import com.itkey.chatroom.dataobject.UserInRoom;
import com.itkey.chatroom.repository.RoomRepository;
import com.itkey.chatroom.repository.UserInRoomRepository;
import com.itkey.chatroom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


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
     * @param room 群信息
     * @return
     */
   public Room createRoom(Room room) {
       return roomRepository.save(room);
   }
    /**
     * 用户加群
     * @param userId 用户信息
     * @param roomId 群id
     * @return
     */
    public String joinRoom(Long userId,Long roomId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Room> roomOptional = roomRepository.findById(roomId);

        if(!userOptional.isPresent()){
           return "用户不存在！";
        }
        if(!roomOptional.isPresent()){
            return "错误的群id！";
        }
        //判断用户是否已经加过群了
        User user = userOptional.get();
        Room room= roomOptional.get();
        Integer integer = userInRoomRepository.countByUserAndRoom(user,room);
        if(integer>0){
            return "重复加群！";
        }

        UserInRoom userInRoom = new UserInRoom();
        userInRoom.setUser(user);
        userInRoom.setRoom(room);
        UserInRoom result = userInRoomRepository.save(userInRoom);
        if(result!=null){
            return "成功进群！";
        }else{
            return "错误！";
        }
    }

    public List<UserInRoom> roomUserList(){
         return userInRoomRepository.findAll();
    }
}
