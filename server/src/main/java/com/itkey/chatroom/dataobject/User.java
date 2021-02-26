package com.itkey.chatroom.dataobject;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 用户的基本信息，不包含密码
 */
@Entity
@Table(name = "USER")
@Data
public class User {
    @Id
    @GeneratedValue
    @JsonProperty("_id")
    private Long id;

    private String userId;      //用户登录账号
    private String name;        //用户姓名

    private String avatar;
}
