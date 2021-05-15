package com.example.demo.vo.icbc;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

/**
 * @author: Black
 * @description: ErrorResp
 * @date: 2018/12/25 10:30
 * @version: v 1.0.0
 */
@Data
public class ErrorResp {

    @SerializedName("errcode")
    private String errCode;

    @SerializedName("errmsg")
    private String errMsg;

}
