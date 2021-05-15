package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * @Author: Black
 * @Date: 2018/7/11 11:47
 * Updated In: 2018/7/11 11:47
 * @Description:
 * @Modified By:
 */
@Configuration
public class RestConfiguration {

    private final RestTemplateBuilder restTemplateBuilder;

    @Autowired
    public RestConfiguration(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplateBuilder = restTemplateBuilder;
    }

    @Bean
    public RestTemplate restTemplate(){
        return restTemplateBuilder.build();
    }

}
