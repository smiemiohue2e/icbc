package com.example.demo.utils;

import com.example.demo.constant.SessionTag;

import javax.servlet.http.HttpSession;

/**
 * @author: Black
 * @description: SessionUtil
 * @date: 2018/12/25 16:53
 * @version: v 1.0.0
 */
public class SessionUtil {

    private static final Integer MAX_IDLE = 15 * 60;

    public static void set(HttpSession session, String k, Object v) {
        session.setAttribute(k, v);
        session.setMaxInactiveInterval(MAX_IDLE);
    }

    public static String getOpenId(HttpSession session){
        Object openid = session.getAttribute(SessionTag.TAG_OPEN_ID);
        return openid == null ? null : (String) openid;
    }

}
