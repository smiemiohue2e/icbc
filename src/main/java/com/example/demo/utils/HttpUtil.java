package com.example.demo.utils;

import com.sun.jndi.toolkit.url.Uri;
import net.sf.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author: Black
 * @Date: 2018/7/11 15:39
 * Updated In: 2018/7/11 15:39
 * @Description:
 * @Modified By:
 */
public class HttpUtil {

    /**
     * http GET 请求
     *
     * @param restTemplate restTemplate
     * @param url          uri
     * @return json 字符串
     */
    public static String getRequest(RestTemplate restTemplate, String url) {
        HttpHeaders headers = new HttpHeaders();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).build();
        URI uri = uriComponents.toUri();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(uri, HttpMethod.GET, entity, String.class).getBody();
    }

    public static String getRequest(RestTemplate restTemplate, URI uri) {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(uri, HttpMethod.GET, entity, String.class).getBody();
    }

    public static String getRequest(RestTemplate restTemplate, String host, Map<String, String> params) {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl(host+"/access_token");
        for (Map.Entry entry : params.entrySet()) {
            builder.queryParam(entry.getKey().toString(),entry.getValue());
        }
        URI uri = builder.build(true).toUri();
        return restTemplate.exchange(uri, HttpMethod.GET, entity, String.class).getBody();
    }

    /**
     * Post 请求
     *
     * @param restTemplate RestTemplate
     * @param uri          url
     * @param params       请求体 封装
     * @return
     */
    public static String postRequest(RestTemplate restTemplate, String uri, Object params) {
        HttpHeaders headers = new HttpHeaders();
        MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
        headers.setContentType(type);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        JSONObject jsonObj = JSONObject.fromObject(params);
        HttpEntity<String> formEntity = new HttpEntity<>(jsonObj.toString(), headers);
        return restTemplate.postForObject(uri, formEntity, String.class);
    }

//    public static void main(String[] args) {
//
//        Map<String,String> ps = new HashMap<>(2);
//        ps.put("appid","JUGv88n%2baRALNWWKUqXa2Q%3d%3d");
//        ps.put("code","3bhz3m1sVymNHQ%2fbIDNew0FwBqGSmAA%3d%3D");
//        System.out.println(getRequest(new RestTemplate(),"https://imapi.icbc.com.cn/open/oauth2/access_token",ps));
//
////        UriComponentsBuilder builder = UriComponentsBuilder
////                .fromHttpUrl("https://imapi.icbc.com.cn/open/oauth2/access_token").queryParam("appid", "JUGv88n%2baRALNWWKUqXa2Q%3d%3d").queryParam("code", "3bhz3m1sVymNHQ%2fbIDNew0FwBqGSmAA%3d%3D");
////        System.out.println(builder.build(true).toUri());
////
////        System.out.println(getRequest(new RestTemplate(), builder.build(true).toUri()));
//    }

}
