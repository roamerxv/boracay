package pers.roamer.boracay.util;

import javax.servlet.http.HttpServletRequest;

/**
 * @ClassName: HttpServletRequestUtil
 * @Description: HttpServletRequestd的工具类
 * @author 徐泽宇
 * @date 2016年10月21日 下午3:55:44
 *
 */
public class HttpServletRequestUtil {

    /**
     * 
     * 创建一个新的实例 HttpServletRequestUtil.
     * 
     * @Auther 徐泽宇
     * @Date 2016年10月21日 下午3:56:44
     */
    private HttpServletRequestUtil() {
    }



    /**
     * getRemortIP
     * 
     * @Auther 徐泽宇
     * @Date 2016年9月20日 下午4:41:06
     * @Title: getRemortIP
     * @Description: 获取客户端IP地址
     * @param request
     * @return
     */
    public static String getRemortIP(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-FORWARDED-FOR");
        if (ipAddress == null) {
            ipAddress = request.getRemoteAddr();
        }
        return ipAddress;
    }
}
