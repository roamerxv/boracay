/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.util;

import javax.servlet.http.HttpServletRequest;


/**
 * HttpServletRequest 工具类
 *
 * @author 徐泽宇
 * @since 1.0.0 2017/6/29 下午4:49
 */
public class HttpServletRequestUtil {

    /**
     * 私有化 构造函数，以确保不被不安全的的 new 一个实例
     *
     * @author 徐泽宇
     * @since 1.0.0  2016年10月21日 下午3:56:44
     */
    private HttpServletRequestUtil() {
    }


    /**
     * 获取客户端的 IP 地址
     *
     * @param request HttpServletRequest
     *
     * @return IP 地址
     *
     * @author 徐泽宇
     * @since 1.0.0  2016年10月21日 下午3:56:44
     */
    public static String getRemortIP(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-FORWARDED-FOR");
        if (ipAddress == null) {
            ipAddress = request.getRemoteAddr();
        }
        return ipAddress;
    }
}
