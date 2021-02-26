package com.itkey.chatroom.repository;
import com.itkey.chatroom.dataobject.Room;
import com.itkey.chatroom.dataobject.User;
import com.itkey.chatroom.dataobject.UserInRoom;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserInRoomRepository extends JpaRepository<UserInRoom, Long> {


    Integer countByUserAndRoom(User user, Room room);
}
