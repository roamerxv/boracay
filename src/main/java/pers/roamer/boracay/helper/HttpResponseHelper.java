package pers.roamer.boracay.helper;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.log4j.Log4j2;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

/**
 * @author 徐泽宇
 * @ClassName: HttpResponseHelper
 * @Description: 把所有捕获到的exception 封装成一个json字符串
 * @date 2016年12月8日 下午2:27:55
 */
@Log4j2
public class HttpResponseHelper {
    private HttpResponseHelper() {
        // don't init for static
    }

    /**
     * inbox
     *
     * @param errorsHash
     *
     * @return
     *
     * @Auther 徐泽宇
     * @Date 2016年12月8日 下午2:29:54
     * @Title: inbox
     * @Description: 把exception装箱成一个json字符串
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
     * successInfoInbox
     *
     * @param dataString
     *
     * @return
     *
     * @Auther 徐泽宇
     * @Date 2016年12月12日 下午4:50:55
     * @Title: successInfoInbox
     * @Description: 生成调用方法成功后，提示的json字符串
     */
    public static String successInfoInbox(String dataString) {
        HashMap hashMap = new HashMap();
        hashMap.put("localMessage",dataString);
        return successInfoInbox(hashMap);
    }


    /**
     * 把一个 hash 对象封装未成功返回给浏览器的json 字符串
     * @param successMessageHash
     * @return
     */
    public static String successInfoInbox(HashMap<String,Object> successMessageHash) {
        CustomerHttpResponseStruct customerHttpResponseStruct = new CustomerHttpResponseStruct();
        ObjectMapper mapper = new ObjectMapper();
        customerHttpResponseStruct.setStatus(HttpServletResponse.SC_OK);
        customerHttpResponseStruct.setMessage("success");
        customerHttpResponseStruct.setSuccess(true);
        customerHttpResponseStruct.setData(successMessageHash);
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
 * @author 徐泽宇
 * @ClassName: CustomerHttpResponseStruct
 * @Description: 返回的错误结构
 * @date 2016年12月8日 下午2:28:44
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
