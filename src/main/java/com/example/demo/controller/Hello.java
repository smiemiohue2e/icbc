package com.example.demo.controller;

import com.example.demo.Service.IcbcApiService;
import com.example.demo.constant.SessionTag;
import com.example.demo.enums.ResultEnum;
import com.example.demo.utils.ResultUtil;
import com.example.demo.utils.SessionUtil;
import com.example.demo.vo.ResultVO;
import com.example.demo.vo.icbc.OAccessTokenResp;
import com.example.demo.vo.tables.OpenIdTable;
import com.icbc.crypto.utils.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.net.URLDecoder;
import java.util.Arrays;

import static com.crypto.RSAUtils.decryptByPublicKey;
import static com.crypto.RSAUtils.encryptByPrivateKey;

/**
 * @author: Black
 * @description: Hello
 * @date: 2018/12/24 17:55
 * @version: v 1.0.0
 */
@Controller
public class Hello {

    @Autowired
    private IcbcApiService icbcApiService;

//    @RequestMapping()
//    @ResponseBody
//    public String confirm(String timestamp, String signature) {
//        String res = "";
//        try {
//            signature = URLDecoder.decode(signature, "utf-8");
//            //进行base64 decode处理
//            byte[] base64Data = Base64.icbcbase64decode(signature);
//            //采用服务平台提供的公钥对秘文进行解密
//            byte[] deData =
//                    decryptByPublicKey(base64Data, "E:\\platform_pub.key");
//            //获取得到解密后的时间值
//            signature = new String(deData);
//            if (signature.equals(timestamp)) {
//                byte[] enData = encryptByPrivateKey(deData, "E:\\priv.key");
//                res = Base64.icbcbase64encode(enData);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return Arrays.toString(e.getStackTrace());
//        }
//        return res;
//    }

    @RequestMapping("/check/{key}")
    public String test(String code, @PathVariable String key, HttpSession session) {
        String openid = SessionUtil.getOpenId(session);
        if (openid == null) {
            // 获取 openid
            ResultVO resultVO = icbcApiService.getOpenId(code);
            if (ResultEnum.SUCCESS.getCode().equals(resultVO.getRespCode())) {
                OpenIdTable oaBody = (OpenIdTable) resultVO.getData();
                openid = oaBody.getOpenid();
                //设置session
                SessionUtil.set(session, SessionTag.TAG_OPEN_ID, openid);
            } else {
                return "/error.html";
            }
        }
        switch (key) {
            case "hello":
                return "/hello.html";
            default:
                return "/error.html";
        }
    }

    @ResponseBody
    @RequestMapping("/openid")
    public ResultVO getOpenId(HttpSession session) {
        String openId = SessionUtil.getOpenId(session);
        return openId == null ?
                ResultUtil.error(ResultEnum.NOT_LOGIN) : ResultUtil.success(new OpenIdTable(openId));
    }
}
