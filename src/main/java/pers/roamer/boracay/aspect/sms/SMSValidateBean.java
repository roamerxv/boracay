/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.aspect.sms;

import lombok.Data;

/**
 * 短信验证码和前台进行传递的 Bean
 *
 * @author roamer - 徐泽宇
 * @create 2017-07-2017/7/3  下午4:13
 */
@Data
public class SMSValidateBean {
    private String validateCode;
}
