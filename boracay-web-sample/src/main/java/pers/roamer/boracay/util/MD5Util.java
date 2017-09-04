/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.util;


import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import pers.roamer.boracay.BoracayException;

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
     * @param input 需要加密的字符串
     *
     * @return 加密后的字符串
     *
     * @author 徐泽宇
     * @since 1.0.0  2016年10月21日 下午3:56:44
     */
    public static String getMD5(String input) throws BoracayException {
        try {
            if (StringUtils.isEmpty(input)) {
                throw new BoracayException("can not get MD5  with null String");
            }
            // 生成一个MD5加密计算摘要
            return DigestUtils.md5Hex(input);
        } catch (Exception e) {
            throw new BoracayException(e.getMessage());
        }
    }
}
