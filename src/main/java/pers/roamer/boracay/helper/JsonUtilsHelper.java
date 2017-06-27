/**
 * @Title: JsonUtilsHelper.java
 * @Package com.ninelephas.common.helper
 * @Description: Json 转换工具包
 * @author 徐泽宇
 * @date 2016年5月6日 上午11:59:18
 * @version V1.0
 */
package pers.roamer.boracay.helper;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.Feature;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;

/**
 * @author 徐泽宇
 * @ClassName: JsonUtilsHelper
 * @Description: 使用Json工具包进行json和对象的相互转换的helper类
 * <p>把对象转换成 string 的时候，使用 jackson ， 把 string 转化成对象的时候使用alibaba 的fastjson</p>
 * @date 2016年5月6日 上午11:59:18
 */
@Log4j2
public class JsonUtilsHelper {


    private static ObjectMapper mapper;

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
     * @param obj
     *
     * @return json字符串
     *
     * @throws Exception String    返回类型
     * @throws
     */
    public static String objectToJsonString(Object obj) throws JsonProcessingException {
        return mapper.writeValueAsString(obj);
    }

    /**
     * 把一个字符串转换成一个 java 类
     *
     * @param jsonString
     * @param clazz
     *
     * @return
     *
     * @throws JsonProcessingException
     */
    public static <T> T parseStringToObject(String jsonString, Class<T> clazz) throws JsonProcessingException {
        return JSON.parseObject(jsonString, clazz, new Feature[0]);
    }

}
