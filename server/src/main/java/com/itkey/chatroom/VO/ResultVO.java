package com.itkey.chatroom.VO;

import lombok.Data;

import java.io.Serializable;

/**
 * http请求最外层对象
 * 2018.05.21
 *
 */
@Data
public class ResultVO<T> implements Serializable {
    private static final long serialVersionUID = -2878575971877384868L;
    // 错误码
    private Integer code;
    // 提示信息
    private String msg;
    //返回的具体内容
    private T data;

    //zwl添加的一个分页总页数,其他应该都用不上
    //private Integer count;

}
