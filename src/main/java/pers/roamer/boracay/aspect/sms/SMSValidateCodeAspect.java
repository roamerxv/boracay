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
import java.util.ArrayList;
import java.util.Collections;

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

    private static String SMS_VCODE_AND_OPIDS_SIZE_NOT_MATCH = "exception.sms.validate.vcode.opid_size_no_match";

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
        // 获取当前切入的方法的BSMSValidateMethodAnnotation注解内容
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        SMSValidateCode methodAnnotation = method.getAnnotation(SMSValidateCode.class);
        //判断切入的方法是否被注解
        if (methodAnnotation == null) {
            return;
        }
        for (int i = 0; i < methodAnnotation.opId().length; i++) {
            log.debug("需要进行短信验证码功能的 opId 是：{}", methodAnnotation.opId()[i].toString());
        }

        String[] opIDs = (methodAnnotation != null ? methodAnnotation.opId() : new String[0]);
        if (opIDs.length <= 0) {
        } else {
            ArrayList<String> opIdArrayList = new ArrayList<>();
            Collections.addAll(opIdArrayList, opIDs);
            Object[] args = joinPoint.getArgs();
            log.debug("类[{}]中的[{}]方法使用了@SMSValidateMethodAnnotation注解，并且设置了 opID 是 {}。需要进行短信验证!", joinPoint.getTarget().getClass().getName(), method.getName(), opIdArrayList);
            ArrayList<SMSValidateBean> smsValidateBeanArrayList = new ArrayList<>();
            for (Object object : args) {
                if (object instanceof SMSValidateBean) {
                    smsValidateBeanArrayList.add((SMSValidateBean) object);
                }
            }
            if (smsValidateBeanArrayList.size() <= 0) {
                throw new BoracayException(SMS_VCODE_NOT_SET);
            }
            if (smsValidateBeanArrayList.size() != opIdArrayList.size()) {
                throw new BoracayException(SMS_VCODE_AND_OPIDS_SIZE_NOT_MATCH);
            }
            smsService.validate(request.getSession().getId(), opIdArrayList, smsValidateBeanArrayList);

        }
    }


}
