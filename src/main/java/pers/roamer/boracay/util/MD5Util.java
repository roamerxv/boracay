/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.util;


import pers.roamer.boracay.BoracayException;

import java.math.BigInteger;
import java.security.MessageDigest;

/**
 * MD5 工具类
 *
 * @author 徐泽宇
 * @since 1.0.0 2017/6/29 下午4:57
 */
public class MD5Util {

    /**
     * 私有化 构造函数，以确保不被不安全的的 new 一个实例
     *
     * @author 徐泽宇
     * @since 1.0.0  2016年10月21日 下午3:56:44
     */
    private MD5Util() {
        //do nothings
    }

    /**
     * 对字符串md5加密
     *
     * @param str 需要加密的字符串
     *
     * @return 加密后的字符串
     *
     * @author 徐泽宇
     * @since 1.0.0  2016年10月21日 下午3:56:44
     */
    public static String getMD5(String str) throws BoracayException {
        try {
            // 生成一个MD5加密计算摘要
            MessageDigest md = MessageDigest.getInstance("MD5");
            // 计算md5函数
            md.update(str.getBytes());
            // digest()最后确定返回md5 hash值，返回值为8为字符串。因为md5 hash值是16位的hex值，实际上就是8位的字符
            // BigInteger函数则将8位的字符串转换成16位hex值，用字符串来表示；得到字符串形式的hash值
            return new BigInteger(1, md.digest()).toString(16);
        } catch (Exception e) {
            throw new BoracayException("MD5 error");
        }
    }
}
