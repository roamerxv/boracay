package pers.roamer.boracay.helper;

import lombok.extern.log4j.Log4j2;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

/**
 * HttpRequest 的helper 类
 *
 * @author roamer - 徐泽宇
 * @create 2017-06-2017/6/20  下午5:37
 */
@Log4j2
public class HttpRequestHelper {
    private HttpRequestHelper() {
        // don't init for static
    }

    /**
     * log 出当前 request 中所有的 paramater 值
     *
     * @param request
     */

    public static void showAllParams(HttpServletRequest request) {
        Enumeration paramNames = request.getParameterNames();
        while (paramNames.hasMoreElements()) {
            String paramName = (String) paramNames.nextElement();
            String[] paramValues = request.getParameterValues(paramName);
            if (paramValues.length == 1) {
                String paramValue = paramValues[0];
                if (paramValue.length() != 0) {
                    log.debug("参数名是{},值是{}", paramName, paramValue);
                }
            }
        }
    }
}
