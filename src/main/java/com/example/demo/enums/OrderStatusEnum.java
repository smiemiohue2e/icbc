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
public enum OrderStatusEnum {
    /**
     * 订单支付状态：
     * 0 为 未支付，
     * 1 为 已支付未领取，
     * 2 为 已领取订单完成,
     * 3 为 未取商家已确认
     * 4 为 过期未取
     */
    UN_PAYED(0, "未支付"),
    PAYED_UN_TOOK(1, "已支付未领取"),
    TOOK(2,"已领取订单完成"),
    TOOK_UN_CHECK(3, "未取商家已确认"),
    EXPIRE(4, "过期未取");


    private Integer code;
    private String msg;

    OrderStatusEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
