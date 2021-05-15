package com.example.demo.utils;

import com.example.demo.vo.ResultVO;
import com.google.gson.Gson;

import java.lang.reflect.Type;

/**
 * @author: Black
 * @description: JsonUtil
 * @date: 2018/12/25 9:59
 * @version: v 1.0.0
 */
public class JsonUtil {

    public static Object str2Obj(String str, Class clz) {
        Gson gson = new Gson();
        return gson.fromJson(str, clz);
    }

}
