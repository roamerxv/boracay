/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.aspect.whitelist;

import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.configer.ConfigHelper;
import pers.roamer.boracay.util.Ipv4WhiteList;

import javax.servlet.http.HttpServletRequest;


/**
 * 访问白名单处理
 *
 * @author 徐泽宇
 * @version 1.0.0 2016年12月21日 下午12:13:26
 */
@Log4j2
@Aspect
@Order(3)
@Component("pers.roamer.boracay.aspect.controller.WhiteListCheckAspect")
public class WhiteListCheckAspect {
    @Autowired
    private HttpServletRequest request;

//    下面切入点，因为通过 xml 配置了。所以不再需要用注解的方式定义了
//    /**
//     * runControllerMethod
//     *
//     * @author 徐泽宇
//     * @since 1.0.0 2016年12月10日 上午3:15:59
//     * @Title: logTheController
//     * @Description: 定义一个切面，指向所有的controller类中的所有方法
//     */
//    @Pointcut("execution(* com.ninelephas.raccoon.controller..*.*(..)) ")
//    public void beforeRunControllerMethod() {
//        // Nothing to clean up
//    }

    /**
     * 进行白名单授权检查
     *
     * @author 徐泽宇
     * @since 1.0.0 2016年12月10日 上午3:17:12
     */
//    @Before("beforeRunControllerMethod()")
    private void whiteListCheck() throws BoracayException {
        if (log.isDebugEnabled()) {
            log.debug("whitePaperCheck() - start"); //$NON-NLS-1$
        }
        Ipv4WhiteList list = new Ipv4WhiteList(ConfigHelper.getConfig().getString("System.Whitelist"));
        String requestIP = request.getRemoteAddr();
        boolean isInWhitelist = list.isIn(requestIP);
        if (!isInWhitelist) {
            String errorMessage = new StringBuilder(requestIP).append("不在访问白名单中，访问被拒绝").toString();
            throw new BoracayException(errorMessage);
        } else {
            log.debug(new StringBuilder("白名单判断 :").append(requestIP).append("在白名单中。"));
        }

    }
}
