package com.itkey.chatroom.VO;

import lombok.Data;

/**
 * 用于分页的VO
 */
@Data
public class PageVO<T> {
    private static final long serialVersionUID = -2878575978877388868L;
    //数据体
    private T data;
    //是否成功
    private Boolean success;
    // 每页显示条数
    private Integer pageSize;
    // 当前页面
    private Integer current;
    // 错误码
    private Integer code;

    //总数
    private Long total;

}
