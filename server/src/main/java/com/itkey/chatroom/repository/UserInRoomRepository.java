package com.itkey.chatroom.repository;
import com.itkey.chatroom.dataobject.Room;
import com.itkey.chatroom.dataobject.User;
import com.itkey.chatroom.dataobject.UserInRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserInRoomRepository extends JpaRepository<UserInRoom, Long> {

    Integer countByUserAndRoom(User user, Room room);
	List<UserInRoom> queryByRoom(Room room);	
}
