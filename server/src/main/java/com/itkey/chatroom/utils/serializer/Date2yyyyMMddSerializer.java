package com.itkey.chatroom.utils.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 日期类型转换格式化成 yyyy-MM-dd HH:mm:ss
 */
public class Date2yyyyMMddSerializer extends JsonSerializer<Date> {

    @Override
    public void serialize(Date date, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        //jsonGenerator.writeNumber(date.getTime() / 1000);
        // 指定日期格式化类型
        //SimpleDateFormat time=new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
        SimpleDateFormat time=new SimpleDateFormat("yyyy-MM-dd");
        jsonGenerator.writeString(time.format(date));
    }
}
