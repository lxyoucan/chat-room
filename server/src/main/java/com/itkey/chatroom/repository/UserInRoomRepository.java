package com.itkey.chatroom.repository;
import com.itkey.chatroom.dataobject.Room;
import com.itkey.chatroom.dataobject.User;
import com.itkey.chatroom.dataobject.UserInRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserInRoomRepository extends JpaRepository<UserInRoom, Long> {

    Integer countByUserAndRoom(User user, Room room);
	List<UserInRoom> queryByRoom(Room room);


    /**
     * 根据群来查所有的用户列表，仅查用户信息,不包含多余的群信息
     * @param roomId
     * @return
     */
    @Query(value = "SELECT new UserInRoom (p.id,p.user) FROM UserInRoom p WHERE p.room= :roomId")
	List<UserInRoom> users(@Param(value = "roomId")Room roomId);
    /**
     * 根据群来查所有的用户列表，仅查用户信息,不包含多余的群信息
     * @param userId 用户id
     * @return
     */
    @Query(value = "SELECT new UserInRoom (p.id,p.room) FROM UserInRoom p WHERE p.user= :userId")
    List<UserInRoom> rooms(@Param(value = "userId")User userId);
}
