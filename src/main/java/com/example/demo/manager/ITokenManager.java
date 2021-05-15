package com.example.demo.manager;

/**
 * @author: Black
 * @description: ITokenManager
 * @date: 2018/12/15 10:04
 * @version: v 1.0.0
 */
public interface ITokenManager {

    /**
     * 获取accessToken
     * @return  icbc access_token
     */
    String getToken();

    /**
     * 强制更新 access_token
     * @return 最新的 icbc access_token
     */
    String refreshToken();

}
