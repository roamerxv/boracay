/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.helper;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

/**
 * 把所有捕获到的exception 封装成一个json字符串
 *
 * @author 徐泽宇
 * @version 1.0.0 2016年12月8日 下午2:27:55
 */
@Slf4j
public class HttpResponseHelper {
    private HttpResponseHelper() {
        // don't init for static
    }

    /**
     * 把exception装箱成一个json字符串
     *
     * @param errorsHash 需要封装的内容
     *
     * @return
     *
     * @author 徐泽宇
     * @since 1.0.0 2016年12月8日 下午2:29:54
     */
    public static String inbox(HashMap<String, Object> errorsHash) {
        ObjectMapper mapper = new ObjectMapper();
        CustomerHttpResponseStruct customerHttpResponseStruct = new CustomerHttpResponseStruct();
        customerHttpResponseStruct.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        customerHttpResponseStruct.setMessage("exception");
        customerHttpResponseStruct.setData(errorsHash.get("errors"));
        String returnString = null;
        try {
            returnString = mapper.writeValueAsString(customerHttpResponseStruct);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage(), e);
        }
        if (log.isDebugEnabled()) {
            log.debug("装箱成功，返回的json字符串是:{}", returnString); //$NON-NLS-1$
        }
        return returnString;
    }

    /**
     * 生成调用方法成功后，提示的json字符串
     *
     * @param dataString
     *
     * @return
     *
     * @author 徐泽宇
     * @since 1.0.0 2016年12月12日 下午4:50:55
     */
    public static String successInfoInbox(String dataString) {
        HashMap hashMap = new HashMap();
        hashMap.put("localMessage", dataString);
        return successInfoInbox(hashMap);
    }


    /**
     * 把一个 hash 对象封装成返回给浏览器的json 字符串
     *
     * @param successMessageHash
     *
     * @return
     *
     * @author 徐泽宇
     * @since 1.0.0 2017/6/29 下午5:32
     */
    public static String successInfoInbox(HashMap<String, Object> successMessageHash) {
        return  objToJson(successMessageHash);
    }

	/**
	 * 把一个 Object 对象封装成返回给浏览器的json 字符串
	 *
	 * @param obj
	 *
	 * @return
	 *
	 * @author 徐泽宇
	 * @since 2.2.2 2018/5/8 上午9:32
	 */
    public static String successInfoInbox(Object obj) {
	    return  objToJson(obj);
    }

	/**
	 * 把一个 Object 对象转换成 Json 字符串
	 *
	 * @param obj
	 *
	 * @return
	 *
	 * @author 徐泽宇
	 * @since 2.2.2 2018/5/8 上午9:32
	 */
	private static String objToJson(Object obj){
	    CustomerHttpResponseStruct customerHttpResponseStruct = new CustomerHttpResponseStruct();
	    ObjectMapper mapper = new ObjectMapper();
	    customerHttpResponseStruct.setStatus(HttpServletResponse.SC_OK);
	    customerHttpResponseStruct.setMessage("success");
	    customerHttpResponseStruct.setSuccess(true);
	    customerHttpResponseStruct.setData(obj);
	    String returnString = null;
	    try {
		    returnString = mapper.writeValueAsString(customerHttpResponseStruct);
	    } catch (JsonProcessingException e) {
		    log.error(e.getMessage(), e);
	    }
	    return returnString;
    }

}


/**
 * 返回的错误结构
 *
 * @author 徐泽宇
 * @since 1.0.0 2016年12月8日 下午2:28:44
 */
@Data
class CustomerHttpResponseStruct {
    /**
     * httpresponse 状态
     */
    @JSONField
    private int status;

    @JSONField
    private boolean success;
    /**
     * 状态代码
     */
    @JSONField
    private String message;
    /**
     * 返回数据
     */
    @JSONField
    private Object data;
}
