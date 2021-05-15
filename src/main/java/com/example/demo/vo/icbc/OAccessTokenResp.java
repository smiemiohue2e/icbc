package com.example.demo.vo.icbc;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

/**
 * @author: Black
 * @description: OAccessTokenResp
 * @date: 2018/12/25 9:38
 * @version: v 1.0.0
 */
@Data
public class OAccessTokenResp {

    @SerializedName("access_token")
    private String accessToken;

    @SerializedName("expires_in")
    private String expiresIn;

    private String openid;

    private String scope;

}
