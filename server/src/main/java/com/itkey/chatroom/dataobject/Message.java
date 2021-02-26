package com.itkey.chatroom.dataobject;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.itkey.chatroom.utils.serializer.Date2LongFullSerializer;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
@Data
public class Message {
    @Id
    @GeneratedValue
    @JsonProperty("_id")
    private Long id;
    private String text;     //消息
    @JsonSerialize(using = Date2LongFullSerializer.class)

    private Date createdAt;      //发送时间

    private @ManyToOne @CreatedBy User user;        //发送人


    private Long roomId;        //会话ID

    private String image;       //图片
    private String video;       //视频

}
