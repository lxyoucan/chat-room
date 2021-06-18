package com.itkey.chatroom.VO;

import lombok.Data;

@Data
public class Weather {
    private String cityid;
    private String city;
    private String update_time;
    private String wea;
    private String wea_img;
    private String tem;
    private String tem_day;
    private String tem_night;
    private String win;
    private String win_speed;
    private String win_meter;
    private String air;

    /**
     * {
     *     "cityid":"101120101",
     *     "city":"济南",
     *     "update_time":"20:55",
     *     "wea":"晴",
     *     "wea_img":"qing",
     *     "tem":"11",
     *     "tem_day":"17",
     *     "tem_night":"7",
     *     "win":"东南风 ",
     *     "win_speed":"1级",
     *     "win_meter":"小于12km/h",
     *     "air":"73"
     * }
     */
}
