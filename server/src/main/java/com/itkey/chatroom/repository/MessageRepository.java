package com.itkey.chatroom.repository;

import com.itkey.chatroom.dataobject.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> queryByRoomIdOrderByCreatedAtAsc(Long roomId);

    List<Message> queryByRoomIdOrderByCreatedAtDesc(Long roomId);

    /**
     * 删除聊天室的全部聊天记录
     * @param roomId
     * @return
     */
    Integer deleteByRoomId(Long roomId);

}
