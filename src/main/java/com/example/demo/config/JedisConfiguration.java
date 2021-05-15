package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * @Author: Black
 * @Date: 2018/7/9 17:46
 * Updated In: 2018/7/9 17:46
 * @Description:
 * @Modified By:
 */
@Configuration
@EnableCaching
@EnableRedisHttpSession
public class JedisConfiguration extends CachingConfigurerSupport {

    @Value("${spring.redis.host}")
    private String host;
    @Value("${spring.redis.port}")
    private Integer port;

    /**
     * yml配置信息
     * redis:
     * database: 0
     * host: localhost
     * port: 6739
     * password:
     * timeout: 0
     * jedis:
     * pool:
     * max-active: 10    控制一个pool可分配多少个jedis实例，通过pool.getResource()来获取；如果赋值为-1，则表示不限制；
     * 如果pool已经分配了maxActive个jedis实例，则此时pool的状态为exhausted
     * max-idle: 10     控制一个pool最多有多少个状态为idle(空闲)的jedis实例
     * max-wait: 10ms
     */

    @Bean
    public JedisPool redisPoolFactory() {
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        // 最大活动对象数 ms
        jedisPoolConfig.setMaxTotal(1000);
        // 最大能够保持Idel状态的对象数 ms
        jedisPoolConfig.setMaxIdle(100);
        // 最小能够保持Idel状态的对象数 ms
        jedisPoolConfig.setMinIdle(50);
        // 当池内没有返回对象时，最大等待时间 ms
        jedisPoolConfig.setMaxWaitMillis(10000);
        // 当调用borrow Object方法时，是否进行有效性检查
        jedisPoolConfig.setTestOnBorrow(true);
        // 当调用return Object方法时，是否进行有效性检查
        jedisPoolConfig.setTestOnReturn(true);
        // “空闲链接”检测线程，检测的周期，毫秒数。如果为负值，表示不运行“检测线程”。默认为-1.
        jedisPoolConfig.setTimeBetweenEvictionRunsMillis(30000);
        // 对于“空闲链接”检测线程而言，每次检测的链接资源的个数。默认为3.
        jedisPoolConfig.setTestWhileIdle(true);
        return new JedisPool(jedisPoolConfig, host, port, 0, null);
    }

}
