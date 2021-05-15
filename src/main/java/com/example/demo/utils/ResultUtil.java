package com.example.demo.utils;

import com.example.demo.enums.ResultEnum;
import com.example.demo.vo.ResultVO;

/**
 * @Author: Black
 * @Description: 请求 成功 或 失败 时，快速封装返回的json对象
 * @Date: Created in 12:38 2018/6/8
 * Updated in
 * @Modified By:
 */
public class ResultUtil {

    /**
     * 一般为，查询操作成功时使用
     * @param obj 查询结果
     * @return 封装后对象
     */
    public static ResultVO success(Object obj){
        return new ResultVO(200,"成功",obj);
    }

    /**
     *  一般为，增加、删除、更新操作成功后使用
     * @return 返回操作结果：成功
     */
    public static ResultVO success(){
        return success(null);
    }

    /**
     * 一般为，请求失败时使用
     * @param resultEnum 失败信息采用枚举形式传递
     * @return 失败后，返回的封装对象
     */
    public static ResultVO error(ResultEnum resultEnum){
        return new ResultVO(resultEnum.getCode(),resultEnum.getMsg(),null);
    }

    /** 一般为，请求失败时使用
     *
     * @param code 错误码
     * @param msg 错误信息
     * @return 失败后，返回的封装对象
     */
    public ResultVO error(Integer code, String msg){
        return new ResultVO(code,msg,null);
    }
}
