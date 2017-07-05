/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.aspect.sms;


import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.service.sms.SmsVerificationService;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;

/**
 * 对短信验证码进行验证的aspect
 *
 * @author roamer - 徐泽宇
 * @create 2017-07-2017/7/3  下午12:59
 */
@Aspect
@Order(4)
@Log4j2
@Component("pers.roamer.boracay.aspect.sms.SMSValidateCodeAspect")
public class SMSValidateCodeAspect {

    private static String SMS_VCODE_NOT_SET = "exception.sms.validate.vcode.not_set";

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private SmsVerificationService smsService;

    /***
     * 进行短信验证码的判断
     * @param joinPoint
     * @throws BoracayException
     */
    private void smsValidateCodeCheck(JoinPoint joinPoint) throws BoracayException {
        //判断切入的方法是否被注解
        // 获取当前切入的方法的BSMSValidateMethodAnnotation注解内容
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        SMSValidateCode methodAnnotation = method.getAnnotation(SMSValidateCode.class);
        String opID = (methodAnnotation != null ? methodAnnotation.opId() : "");
        if (opID.isEmpty()) {
        } else {
            log.debug("类[{}]中的[{}]方法使用了@SMSValidateMethodAnnotation注解，并且设置了 opID 是 {}。需要进行短信验证!", joinPoint.getTarget().getClass().getName(), method.getName(), opID);
            SMSValidateBean smsValidateBean = null;
            Object[] args = joinPoint.getArgs();
            for (Object object : args) {
                if (object instanceof SMSValidateBean) {
                    log.debug(object.toString());
                    smsValidateBean = (SMSValidateBean) object;
                }
            }
            if (smsValidateBean == null) {
                throw new BoracayException(SMS_VCODE_NOT_SET);
            } else {
                //进行验证码是否有效的判断
                if (smsValidateBean.getValidateCode().isEmpty()) {
                    throw new BoracayException(SMS_VCODE_NOT_SET);
                }
                smsService.validate(request.getSession().getId(), opID, smsValidateBean.getValidateCode());
            }
        }
    }


}
