package com.itkey.chatroom.repository;

import com.itkey.chatroom.dataobject.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User queryByUserId(String userId);
}
