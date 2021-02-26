package com.itkey.chatroom.dataobject;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
@Data
public class Room {
    @Id
    @GeneratedValue
    private Long id;
    private String name;     //群主名称
    private Date createdAt;      //群创建时间
    private @ManyToOne @CreatedBy User owner;        //群主
    private Integer userCount;        //群人数
    private String avatar;       //群图标
}
