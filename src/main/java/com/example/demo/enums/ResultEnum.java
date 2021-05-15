package com.example.demo.enums;

import lombok.Getter;

/**
 * @Author: Black
 * @Description:
 * @Date: Created in 12:45 2018/6/8
 * Updated in
 * @Modified By:
 */
@Getter
public enum ResultEnum {
    /**
     * 结果类型的 Code 与  String
     */
    SUCCESS(200, "成功"),
    NOT_LOGIN(2001, "未登录"),

    NOT_UNIQUE(3002, "主键不唯一"),
    NOT_EMPTY(3001, "非空字段为空"),

    NOT_CORRECT_PRICE(4001, "金额不正确"),
    NOT_ENOUGH_STOCK(4002, "库存不足"),
    NOT_CORRECT_USER(4003,"买家信息不正确"),
    UNKNOWN_ERROR(444, "未知错误"),

    EMPTY_ACCESS_TOKEN(5001, "access_token为空"),
    EMPTY_OPEN_ID(5002, "openId 为空"),

    ERROR_ORDER_MASTER_NUM(6001, "订单号不正确"),
    ORDER_PAYED(6002,"订单以支付"),
    ERROR_PROP_NO(6003, "商户号不正确"),
    EMPTY_VM_POST_NUM(6004,"商家不支持线上消费"),;

    private Integer code;
    private String msg;

    ResultEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
