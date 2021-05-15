package com.example.demo.enums;

import lombok.Getter;

/**
 * @author: Black
 * @description: SolrEnum
 * @date: 2018/12/21 20:56
 * @version: v 1.0.0
 */
@Getter
public enum  SolrEnum {

    /**
     *
     */
    ERROR_IO(0, "服务器IO异常"),
    ERROR_SERVER(1, "搜索服务器异常"),
    ERROR_RE_IMPORT(2,"重建索引异常");


    private Integer code;
    private String msg;

    SolrEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

}
