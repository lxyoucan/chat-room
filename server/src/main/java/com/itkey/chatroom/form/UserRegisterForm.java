package com.itkey.chatroom.form;

import lombok.Data;

/**
 * 用户注册表单对象
 */
@Data
public class UserRegisterForm {
    private String userId;          //用户登录名
    private String password;        //密码
    private String name;            //姓名
    private String avatar;          //头像
}
