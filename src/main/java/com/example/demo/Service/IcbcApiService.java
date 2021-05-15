package com.example.demo.Service;

import com.example.demo.utils.EncodeUtil;
import com.example.demo.utils.HttpUtil;
import com.example.demo.utils.JsonUtil;
import com.example.demo.utils.ResultUtil;
import com.example.demo.vo.ResultVO;
import com.example.demo.vo.icbc.ErrorResp;
import com.example.demo.vo.icbc.OAccessTokenResp;
import com.example.demo.vo.tables.OpenIdTable;
import com.sun.jndi.toolkit.url.UrlUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * @author: Black
 * @description: IcbcApiService
 * @date: 2018/12/25 9:11
 * @version: v 1.0.0
 */
@Service
public class IcbcApiService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${icbc.appid}")
    private String appId;

    @Value("${icbc.host}")
    private String host;

    public ResultVO getOpenId(String code) {
        // url 转码
        String enAppid = EncodeUtil.encode(appId);
        String enCode = EncodeUtil.encode(code);
        //拼接 url
        Map<String, String> params = new HashMap<>(3);
        params.put("appid", enAppid);
        params.put("code", enCode);
        String res = HttpUtil.getRequest(restTemplate, host, params);

        if (res.contains("access_token") && res.contains("openid")) {
            OAccessTokenResp resp = (OAccessTokenResp) JsonUtil.str2Obj(res, OAccessTokenResp.class);
            return ResultUtil.success(new OpenIdTable(resp.getOpenid()));
        } else {
            ErrorResp resp = (ErrorResp) JsonUtil.str2Obj(res, ErrorResp.class);
            return new ResultVO(Integer.parseInt(resp.getErrCode()), resp.getErrMsg());
        }
    }

}
