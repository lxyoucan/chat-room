package com.itkey.chatroom.controller;

import com.itkey.chatroom.VO.ResultVO;
import com.itkey.chatroom.dataobject.Room;
import com.itkey.chatroom.service.impl.RoomServiceImpl;
import com.itkey.chatroom.service.impl.UserServiceImpl;
import com.itkey.chatroom.utils.ResultVOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 用户相关的管理
 */
@RestController
public class UserController {
    @Autowired
    private UserServiceImpl userService;


    /**用户列表
     * @return
     */
    @GetMapping("/userList")
    public ResultVO userList(){
        return ResultVOUtil.success(userService.userList());
    }


}
