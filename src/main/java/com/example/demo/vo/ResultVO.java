package com.example.demo.vo;

import lombok.Data;

/**
 * @Author: Black
 * @Description: Json 数据格式 {respCode:响应码，msg:响应信息，{ tableName:表名，contents:【表内容】} }
 * @Date: Created in 10:42 2018/5/24
 * Updated in
 * @Modified By:
 */
@Data
public class ResultVO<T> {

    private Integer respCode;
    private String msg;

    private T data;

    public ResultVO() {
    }

    public ResultVO(Integer respCode, String msg) {
        this.respCode = respCode;
        this.msg = msg;
    }

    public ResultVO(Integer respCode, String msg, T data) {
        this.respCode = respCode;
        this.msg = msg;
        this.data = data;
    }
}
