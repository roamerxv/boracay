/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.util;

import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * UUID的工具类
 *
 * @author 徐泽宇
 * @version 1.0.0
 * @since 1.0.0 2016年12月21日 下午3:27:30
 */

public class UUIDString {

    /**
     * 私有化 构造函数，以确保不被不安全的的 new 一个实例
     *
     * @author 徐泽宇
     * @since 1.0.0  2016年10月21日 下午3:56:44
     */
    private UUIDString() {
        //Nothings to do
    }


    /**
     * 生成一个基于UUID的短字符串
     *
     * @return UUID 短字符串
     *
     * @author 徐泽宇
     * @since 1.0.0 2016年12月21日 下午3:27:30
     */
    public static String genShortUUID() {
        SecureRandom rand = new SecureRandom();
        SimpleDateFormat sdf = new SimpleDateFormat("ddMMyyyyHHmmssSSS");
        return new StringBuffer(sdf.format(new Date())).append(Integer.toString(rand.nextInt(1000))).toString();
    }

    /**
     * 生成一个系统的 UUID 字符串
     *
     * @return UUID 字符串
     *
     * @author 徐泽宇
     * @since 1.0.0 2016年12月21日 下午3:27:30
     */
    public static String genUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }

}
