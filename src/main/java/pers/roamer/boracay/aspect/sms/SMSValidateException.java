/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.aspect.sms;

import pers.roamer.boracay.BoracayException;

/**
 * 短信验证码验证的Exception
 *
 * @author 徐泽宇
 * @version 1.0.2 2017/7/3 下午2:46
 */
public class SMSValidateException extends BoracayException {


    /**
     * 创建一个新的实例 BussinessLoggerException.
     *
     * @param message 错误的message
     *
     * @author 徐泽宇
     * @since 1.0.0 2016年11月2日 下午3:29:43
     */
    public SMSValidateException(String message) {
        super(message);
    }

}
