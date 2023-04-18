/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.helper;

import lombok.extern.slf4j.Slf4j;

import java.util.Enumeration;

import jakarta.servlet.http.HttpServletRequest;

/**
 * HttpRequest 的helper 类
 *
 * @author 徐泽宇
 * @version 1.0.0   2017/6/29 下午5:13
 */
@Slf4j
public class HttpRequestHelper {

    /**
     * 私有化 构造函数，以确保不被不安全的的 new 一个实例
     *
     * @author 徐泽宇
     * @since 1.0.0  2016年10月21日 下午3:56:44
     */
    private HttpRequestHelper() {
        // don't init for static
    }

    /**
     * log 出当前 request 中所有的 paramater 值
     *
     * @param request HttpServletRequest
     *
     * @author 徐泽宇
     * @since 1.0.0 2017/6/29 下午5:14
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
