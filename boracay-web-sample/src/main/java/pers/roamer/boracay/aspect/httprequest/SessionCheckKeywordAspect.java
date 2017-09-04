/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.aspect.httprequest;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.configer.ConfigHelper;

import javax.servlet.http.HttpSession;

/**
 * HttpRequest 中进行 session 关键词判断的 Aspect
 *
 * @author roamer - 徐泽宇
 * @create 2017-07-2017/7/5  上午11:38
 */
@Log4j2
@Order(3)
@Component("pers.roamer.boracay.aspect.httprequest.SessionCheckKeywordAspect")
public class SessionCheckKeywordAspect {

    @Autowired
    private HttpSession session;

    /**
     * 对类或者方法进行@SessionCheckKeyword()注解后的切面处理。
     * 进行 session keyword 判断
     *
     * @param joinPoint
     *
     * @throws BoracayException
     * @autor 徐泽宇
     * @since 1.0.2 2017/7/5 下午3:09
     */
    private void sessionKeywordCheck(JoinPoint joinPoint) throws BoracayException {
        SessionCheckKeyword classAnnotation = (SessionCheckKeyword) joinPoint.getSignature().getDeclaringType().getAnnotation(SessionCheckKeyword.class);
        SessionCheckKeyword methodAnnotation = ((MethodSignature) joinPoint.getSignature()).getMethod().getAnnotation(SessionCheckKeyword.class);
        log.debug("对方法进行@SessionCheckKeyword()的对象是{},类注解的对象是{}", methodAnnotation, classAnnotation);
        Boolean classCheckIt = (classAnnotation == null ? null : classAnnotation.checkIt());
        Boolean methodCheckIt = (methodAnnotation == null ? null : methodAnnotation.checkIt());
        if (methodCheckIt == null && classCheckIt == null) {
            log.debug("都没设置，不进行 session keyword判断！");
        } else if ((methodCheckIt != null && methodCheckIt) || (methodCheckIt == null && classCheckIt)) {
            log.debug("要进行 session keywork判断！");
            sessionCheck();
        } else {
            log.debug("不进行 session keyword判断！");
        }
    }

    /**
     * 判断 session 中的 keyword 是否被设置。
     * @throws BoracayException
     */

    private void sessionCheck() throws BoracayException {
        String sessionKeyword = (String) session.getAttribute(ConfigHelper.getConfig().getString("System.SessionUserKeyword"));
        log.debug("当前 session 中的keyword 是{}，值是： {}", ConfigHelper.getConfig().getString("System.SessionUserKeyword"),sessionKeyword);
        if (StringUtils.isEmpty(sessionKeyword)) {
            throw new BoracayException("exception.system.need_login");
        }
    }
}
