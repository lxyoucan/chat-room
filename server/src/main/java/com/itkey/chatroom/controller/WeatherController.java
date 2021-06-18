package com.itkey.chatroom.controller;

import com.itkey.chatroom.VO.ResultVO;
import com.itkey.chatroom.VO.Weather;
import com.itkey.chatroom.form.UserRegisterForm;
import com.itkey.chatroom.service.impl.LoginServiceImpl;
import com.itkey.chatroom.service.impl.WeatherServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 天气信息控制类
 * 模拟一个天气获取接口
 * 控制类
 */
@Controller
@Slf4j
public class WeatherController {

    @Autowired
    private WeatherServiceImpl weatherService;


    /**
     * 用户登录
     * @return
     */
    @RequestMapping("/weather")
    @ResponseBody
    public Weather weather(String city) {
        return weatherService.queryWeatherByCityName(city);
    }

}
