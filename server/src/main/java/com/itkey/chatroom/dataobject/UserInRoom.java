package com.itkey.chatroom.dataobject;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

/**
 * 用户群的关系表
 */
@Entity
@Data
public class UserInRoom {
    @Id
    @GeneratedValue
    private Long id;
    private @ManyToOne @CreatedBy User user;  //用户ID
    private @ManyToOne @CreatedBy Room room;  //群ID

    public UserInRoom() {
    }

    public UserInRoom(Long id, User user) {
        this.id = id;
        this.user = user;
    }
}
