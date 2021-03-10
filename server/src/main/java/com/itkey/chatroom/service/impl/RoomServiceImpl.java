package com.itkey.chatroom.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.itkey.chatroom.VO.ResultVO;
import com.itkey.chatroom.repository.MessageRepository;
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

    @Autowired
    private MessageRepository messageRepository;
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
        if (!StringUtils.hasText(userId)) {
            return ResultVOUtil.error(-1, "未登录，无权创建群！");
        }
        User user = userRepository.queryByUserId(userId);
        if (user == null) {
            return ResultVOUtil.error(-1, "未登录，无权创建群！");
        }
        if (!StringUtils.hasText(room.getName())) {
            return ResultVOUtil.error(-2, "创建群，要给它取个名吧！");
        }
        if (!StringUtils.hasText(room.getAvatar())) {
            return ResultVOUtil.error(-3, "创建群，设置个头像吧！");
        }
        room.setOwner(user);
        //创建群默认把自己加入到群中去
        UserInRoom userInRoom = new UserInRoom();
        userInRoom.setUser(user);
        userInRoom.setRoom(room);
        userInRoomRepository.save(userInRoom);

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
            return ResultVOUtil.error(-1, "用户不存在！");
        }
        if (!roomOptional.isPresent()) {
            return ResultVOUtil.error(-2, "错误的群id！");
        }
        //判断用户是否已经加过群了
        User user = userOptional.get();
        Room room = roomOptional.get();
        Integer integer = userInRoomRepository.countByUserAndRoom(user, room);
        if (integer > 0) {

            return ResultVOUtil.error(-3, "重复加群！");
        }

        UserInRoom userInRoom = new UserInRoom();
        userInRoom.setUser(user);
        userInRoom.setRoom(room);
        UserInRoom result = userInRoomRepository.save(userInRoom);
        if (result != null) {
            return ResultVOUtil.success("成功进群！");
        } else {
            return ResultVOUtil.error(-4, "数据错误！");
        }
    }


    /**
     * 更改群主
     *
     * @param userId 用户信息
     * @param roomId 群id
     * @return
     */
    public ResultVO transferRoom(Long userId, Long roomId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Room> roomOptional = roomRepository.findById(roomId);

        if (!userOptional.isPresent()) {
            return ResultVOUtil.error(-1, "用户不存在！");
        }
        if (!roomOptional.isPresent()) {
            return ResultVOUtil.error(-2, "错误的群id！");
        }
        //判断用户是否已经加过群了
        User user = userOptional.get();
        Room room = roomOptional.get();
        //todo: 实际使用时必须增加权限校验
        room.setOwner(user);
        Room result = roomRepository.save(room);
        return ResultVOUtil.success(result);
    }

    /**
     * 查询群成员列表
     *
     * @param roomId
     * @return
     */
    public List<User> roomUserList(Long roomId) {
        if (roomId == null) return null;
        Optional<Room> roomOptional = roomRepository.findById(roomId);
        if (!roomOptional.isPresent()) {
            System.out.println("群不存在！"); //todo:这里应该抛如异常
            return null;
        }
        //return userInRoomRepository.queryByRoom(roomOptional.get());
        List<UserInRoom> result = userInRoomRepository.users(roomOptional.get());
        List<User> userList = new ArrayList<>();
        for (UserInRoom userInRoom :
                result) {
            userList.add(userInRoom.getUser());
        }
        return userList;
    }

    /**
     * 查询没有在群中的好友
     *
     * @param roomId
     * @return
     */
    public List<User> notInUsers(Long roomId) {
        //todo：性能需要优化，目前只是个demo页面数据不多，就偷懒了
        List<User> allUser = userRepository.findAll();
        List<User> roomUser = roomUserList(roomId);
        List<User> result = new ArrayList<>();
        for (User user :
                allUser) {
            if (!roomUser.contains(user)) {     //不在群中
                result.add(user);
            }
        }

        return result;
    }

    /**
     * 根据用户id 查询相关群列表
     *
     * @param userId
     * @return
     */
    public ResultVO userRooms(Long userId) {
        if (userId == null) return ResultVOUtil.error(-1, "用户未登录");
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResultVOUtil.error(-2, "[" + userId + "]用户不存在！");
        }
        //return userInRoomRepository.queryByRoom(roomOptional.get());
        List<UserInRoom> result = userInRoomRepository.rooms(userOptional.get());
        List<Room> roomList = new ArrayList<>();
        for (UserInRoom userInRoom :
                result) {
            roomList.add(userInRoom.getRoom());
        }
        return ResultVOUtil.success(roomList);
    }

    /**
     * 群列表
     *
     * @return
     */
    public List<Room> roomList() {
        return roomRepository.findAll();
    }

    /**
     * 退群功能
     * @param roomId
     * @param userId
     * @return
     */
    @Transactional
    public ResultVO exitRoom(Long roomId, Long userId) {
        if(roomId==null){
            return ResultVOUtil.error(-1, "参数roomId不能为空!");
        }
        if(userId==null){
            return ResultVOUtil.error(-2, "参数userId不能为空!");
        }
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResultVOUtil.error(-3, "[" + userId + "]用户不存在！");
        }
        Optional<Room> roomOptional = roomRepository.findById(roomId);
        if (!roomOptional.isPresent()) {
            return ResultVOUtil.error(-4, "[" + roomId + "]房间不存在！");
        }
        Room room = roomOptional.get();

        //判断当前群是否只有一个人，如果只有一个人则提示退出群会自己删除群和聊天记录
        int userCount = userInRoomRepository.countByRoom(room);
        if(userCount<=1){
            return ResultVOUtil.error(-5, "您是群里的唯一成员，您退出群以后，群将不存在，所有聊天记录将被删除！");
        }
        //判断退群的人是否是群主，如果是群主则提示需要先转让群
        if(room.getOwner().getId().equals(userOptional.get().getId())){
            return ResultVOUtil.error(-6, "您是该群的群主，请先转让该群方可退出群聊。");
        }

        userInRoomRepository.deleteByUserAndRoom(userOptional.get(),roomOptional.get());
        return ResultVOUtil.success();
    }
    /**
     * 群中只有一个人的情况，单独处理
     * @param roomId
     * @param userId
     * @return
     */
    @Transactional
    public ResultVO exitRoomOnlyOne(Long roomId, Long userId) {
        //TODO: 和上面代码重复比较多，可优化或者合并
        if(roomId==null){
            return ResultVOUtil.error(-1, "参数roomId不能为空!");
        }
        if(userId==null){
            return ResultVOUtil.error(-2, "参数userId不能为空!");
        }
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResultVOUtil.error(-3, "[" + userId + "]用户不存在！");
        }
        Optional<Room> roomOptional = roomRepository.findById(roomId);
        if (!roomOptional.isPresent()) {
            return ResultVOUtil.error(-4, "[" + roomId + "]房间不存在！");
        }
        Room room = roomOptional.get();

        //判断当前群是否只有一个人，如果只有一个人则提示退出群会自己删除群和聊天记录
        int userCount = userInRoomRepository.countByRoom(room);
        if(userCount!=1){
            return ResultVOUtil.error(-5, "用户人数不为1，执行失败！");
        }
        //判断退群的人是否是群主，如果是群主则提示需要先转让群
        userInRoomRepository.deleteByUserAndRoom(userOptional.get(),room);
        //删除群的所有聊天记录
        deleteRoomAndRoomMessage(roomId);
        return ResultVOUtil.success();
    }

    /**
     * 删除群和群记录
     * @param roomId 群ID
     * @return
     */
    @Transactional
    public ResultVO deleteRoomAndRoomMessage(Long roomId){
        Optional<Room> roomOptional = roomRepository.findById(roomId);
        if (!roomOptional.isPresent()) {
            return ResultVOUtil.error(-4, "[" + roomId + "]群不存在！");
        }
        Room room = roomOptional.get();
        //删除聊天记录

        messageRepository.deleteByRoomId(roomId);

        //删除房间信息
        roomRepository.delete(room);
        return ResultVOUtil.success();
    }
}
