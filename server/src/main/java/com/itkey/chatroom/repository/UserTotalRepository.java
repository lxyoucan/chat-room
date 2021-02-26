package com.itkey.chatroom.repository;

import com.itkey.chatroom.dataobject.UserTotal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTotalRepository extends JpaRepository<UserTotal, Long> {

    Integer countByUserId(String userId);

    UserTotal queryByUserId(String userId);
}
