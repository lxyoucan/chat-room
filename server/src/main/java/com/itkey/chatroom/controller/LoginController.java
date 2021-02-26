package com.itkey.chatroom.controller;

import com.itkey.chatroom.VO.ResultVO;
import com.itkey.chatroom.form.UserRegisterForm;
import com.itkey.chatroom.service.impl.LoginServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 用户登录注销控制类
 * 控制类
 */
@Controller
@Slf4j
public class LoginController {

    @Autowired
    private LoginServiceImpl loginService;


    /**
     * 用户注册
     * PS:用户注册功能，在枣庄APP中没有实质的作用，主要是为了应付appstore 审核
     * @return
     */
    @RequestMapping("/userRegister")
    @ResponseBody
    public ResultVO userRegister(UserRegisterForm userRegisterForm) {
        return loginService.userRegister(userRegisterForm);
    }
}
