package com.itkey.chatroom.service.impl;

import com.itkey.chatroom.VO.Weather;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Random;


@Service
@Slf4j
public class WeatherServiceImpl {

    /**
     * 根据城市的中文名称获取天气信息
     *
     * @param cityName
     * @return
     */
    public Weather queryWeatherByCityName(String cityName) {
        Random random = new Random();  // 随机数类
        String[] randomWeather =  getRandomWeather();
        Weather weather = new Weather();
        weather.setCityid(System.currentTimeMillis() + "");
        weather.setCity(cityName);
        weather.setWea(randomWeather[1]);
        weather.setWea_img(randomWeather[0]);
        weather.setTem(random.nextInt(38) + "");
        weather.setTem_day("30");
        weather.setTem_night("10");
        weather.setWin("东南风");
        weather.setWin_speed("1级");
        weather.setWin_meter("小于12km/h");
        weather.setAir(random.nextInt(100) + "");
        weather.setUpdate_time("开发测试");

        return weather;
    }

    public String[] getRandomWeather() {
        String weatherInfo = "xue:雪|lei:阵雨|shachen:沙尘|wu:雾|bingbao:冰雹|yun:多云|yu:雨|yin:阴|qing:晴";
        String[] array = weatherInfo.split("\\|");
        Random random = new Random();  // 随机数类
        int r = random.nextInt(array.length);
        String[] result = array[r].split(":");
        return result;
    }
}
