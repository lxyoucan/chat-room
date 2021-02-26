package com.itkey.chatroom.repository;

import com.itkey.chatroom.dataobject.Room;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoomRepository extends JpaRepository<Room, Long> {


}
