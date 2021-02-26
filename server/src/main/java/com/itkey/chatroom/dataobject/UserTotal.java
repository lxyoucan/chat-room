package com.itkey.chatroom.dataobject;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 包含所有信息，敏感信息也包含
 * 比如：密码
 */
@Entity
@Table(name = "USER")
@Data
public class UserTotal {
    @Id
    @GeneratedValue
    private Long id;

    private String userId;      //用户登录账号
    private String password;
    private String name;        //用户姓名

    private String avatar;
}
