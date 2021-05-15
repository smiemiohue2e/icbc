package com.example.demo.vo.tables;

import lombok.Data;

/**
 * @author: Black
 * @description: OpenIdTable
 * @date: 2018/12/25 15:35
 * @version: v 1.0.0
 */
@Data
public class OpenIdTable {

    private String openid;

    public OpenIdTable() {
    }

    public OpenIdTable(String openid) {
        this.openid = openid;
    }
}
