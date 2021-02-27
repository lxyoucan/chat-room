package com.itkey.chatroom.service.impl;

import com.itkey.chatroom.dataobject.User;
import com.itkey.chatroom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl {
    @Autowired
    private UserRepository userRepository;

    public List<User> userList(){
        return userRepository.findAll();
    }
}

