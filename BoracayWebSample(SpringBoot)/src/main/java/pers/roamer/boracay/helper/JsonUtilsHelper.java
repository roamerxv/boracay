/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */
package pers.roamer.boracay.helper;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.Feature;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

/**
 * 使用Json工具包进行json和对象的相互转换的helper类
 * <p>把对象转换成 string 的时候，使用 jackson ， 把 string 转化成对象的时候使用alibaba 的fastjson</p>
 *
 * @author 徐泽宇
 * @version 1.0.0 2017/6/29 下午5:16
 */
@Slf4j
public class JsonUtilsHelper {


    private static ObjectMapper mapper;

    /**
     * 私有化 构造函数，以确保不被不安全的的 new 一个实例
     *
     * @author 徐泽宇
     * @since 1.0.0  2016年10月21日 下午3:56:44
     */
    private JsonUtilsHelper() {
        // do nothing
    }

    static {
        log.debug("JsonUtilsHelper() - start"); //$NON-NLS-1$
        mapper = new ObjectMapper();
        //        mapper.configure(SerializationFeature.FAIL_ON_UNWRAPPED_TYPE_IDENTIFIERS, false);
        log.debug("JsonUtilsHelper() - end"); //$NON-NLS-1$

    }

    /**
     * ObjectToJsonString
     * 把一个对象转换成json字符串
     *
     * @param obj 需要转换成 json 字符串的对象
     *
     * @return json字符串
     *
     * @throws JsonProcessingException
     * @author 徐泽宇
     * @since 1.0.0 2017/6/29 下午5:17
     */
    public static String objectToJsonString(Object obj) throws JsonProcessingException {
        return mapper.writeValueAsString(obj);
    }

    /**
     * 把一个字符串转换成一个 java 类
     *
     * @param jsonString 需要转换成对象的 json 字符串
     * @param clazz      转换后的对象的类型
     *
     * @return 转换成功的对象
     *
     * @throws JsonProcessingException
     * @author 徐泽宇
     * @since 1.0.0 2017/6/29 下午5:18
     */
    public static <T> T parseStringToObject(String jsonString, Class<T> clazz) throws JsonProcessingException {
        return JSON.parseObject(jsonString, clazz, new Feature[0]);
    }

}
