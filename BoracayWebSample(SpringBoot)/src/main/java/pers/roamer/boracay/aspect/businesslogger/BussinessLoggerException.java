/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.aspect.businesslogger;

import pers.roamer.boracay.BoracayException;

/**
 * 业务日志的Exception
 *
 * @author 徐泽宇
 * @version 1.0.0 2016年10月13日 下午1:00:30
 */
public class BussinessLoggerException extends BoracayException {


    /**
     * @Fields serialVersionUID : 序列号
     */

    private static final long serialVersionUID = 8757953678062880700L;

    /**
     * 创建一个新的实例 BussinessLoggerException.
     *
     * @param message 错误的message
     *
     * @author 徐泽宇
     * @since 1.0.0 2016年11月2日 下午3:29:43
     */
    public BussinessLoggerException(String message) {
        super(message);
    }

}
