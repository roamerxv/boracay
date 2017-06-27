/**
 * @Title: SystemLogAspect.java
 * @Package com.ninelephas.meerkat.aspect
 * @Description: 系统日志的AOP类
 * Copyright: Copyright (c) 2016
 * Company:九象网络科技（上海）有限公司
 * @author "徐泽宇"
 * @date 2016年8月1日 下午5:25:15
 * @version V1.0.0
 */

package pers.roamer.boracay.aspect.businesslogger;

import pers.roamer.boracay.configer.ConfigHelper;
import pers.roamer.boracay.entity.BusinessLogEntity;
import pers.roamer.boracay.helper.JsonUtilsHelper;
import pers.roamer.boracay.service.log.BusinessLogService;
import pers.roamer.boracay.util.HttpServletRequestUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import eu.bitwalker.useragentutils.Browser;
import eu.bitwalker.useragentutils.OperatingSystem;
import eu.bitwalker.useragentutils.UserAgent;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;


/**
 * @author Comsys-"徐泽宇"
 * @ClassName: SystemLogAspect
 * @Description: 记录系统日志
 * @date 2016年8月1日 下午5:25:15
 */
@Aspect
@Order(1)
@Log4j2
@Component("com.ninelephas.common.aspect.businesslogger.BusinessLogAspect")
public class BusinessLogAspect {


    @Autowired
    private HttpSession session;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    BusinessLogService businessLogService;


    /**
     * logTheController
     *
     * @Auther 徐泽宇
     * @Date 2016年10月9日 上午11:20:58
     * @Title: logTheController
     * @Description: 定义一个切面，指向所有的controller类，并且排除掉登出的方法
     */
    @Pointcut("execution(* com.ninelephas.raccoon.controller..*.*(..))  && !execution(* com.ninelephas.raccoon.controller.creator.CreatorController.logout(..))")
    public void logTheController() {
        // Nothing to clean up
    }

    /**
     * logTheLogout
     *
     * @Auther 徐泽宇
     * @Date 2016年10月10日 下午3:44:01
     * @Title: logTheLogout
     * @Description: 定义一个处理拦截前处理的部分
     */
    @Pointcut("execution(* com.ninelephas.raccoon.controller.creator.CreatorController.logout(..))")
    public void logBefore() {
        // Nothing to clean up
    }

    /**
     * logService
     *
     * @param joinPoint
     *
     * @throws Throwable
     * @Auther 徐泽宇
     * @Date 2016年9月19日 下午3:40:29
     * @Title: logService
     * @Description: 织入所有的controller类中的方法，进行日志记录的功能
     */
    @Around("logTheController()")
    private Object logService(ProceedingJoinPoint joinPoint) {
        Object rtnObject = null;
        boolean recordBusinessLog = ConfigHelper.getConfig().getBoolean("System.RecordBusinessLog");

        if (!recordBusinessLog) {
            // 如果在配置文件中设置不需要记录日志
            try {
                log.debug("系统配置不需要记录业务活动日志");
                rtnObject = joinPoint.proceed();
            } catch (Throwable e) {
                log.error(e);
            }
        } else {
            boolean isSuccess = true;
            StringBuilder exceptionString = new StringBuilder();
            try {
                rtnObject = joinPoint.proceed();
            } catch (Throwable e) {
                isSuccess = false;
                exceptionString = new StringBuilder(ExceptionUtils.getStackTrace(e));
            }
            try {
                parseJoinPointAndSave2DB(joinPoint, isSuccess, exceptionString);
            } catch (Exception e) {
                log.error(e);
            }
        }
        return rtnObject;
    }

    /**
     * logBeforeAction
     *
     * @param joinPoint
     *
     * @Auther 徐泽宇
     * @Date 2016年10月10日 下午3:53:22
     * @Title: logBeforeAction
     * @Description: 运行前进行拦截，并且记录日志
     */
    @Before("logBefore()")
    private void logBeforeAction(JoinPoint joinPoint) throws BussinessLoggerException {
        if (log.isDebugEnabled()) {
            log.debug("logBeforeAction(JoinPoint joinPoint={}) - start", joinPoint); //$NON-NLS-1$
        }

        try {
            parseJoinPointAndSave2DB(joinPoint, true, new StringBuilder(""));
        } catch (BussinessLoggerException e) {
            throw e;
        }

        if (log.isDebugEnabled()) {
            log.debug("logBeforeAction(JoinPoint joinPoint={}) - end", joinPoint); //$NON-NLS-1$
        }
    }

    /**
     * parseJoinPointAndSave2DB
     *
     * @param joinPoint
     * @param isSuccess
     * @param exceptionString
     *
     * @throws BussinessLoggerException
     * @Auther 徐泽宇
     * @Date 2016年10月10日 下午12:47:59
     * @Title: parseJoinPointAndSave2DB
     * @Description: 把joinPoint对象解析成pojo的BusinessLog对象，并且保存到数据库
     */
    private void parseJoinPointAndSave2DB(JoinPoint joinPoint, boolean isSuccess, StringBuilder exceptionString) throws BussinessLoggerException {
        BusinessLogEntity businessLog = genBusinessLog(joinPoint, isSuccess, exceptionString);
        // 如果没有标注业务逻辑的方法，就不入库
        if (businessLog.getMethodDescription().isEmpty()) {
            // Nothing to clean up
        } else {
            addLog(businessLog);
            log.debug("日志入库成功！");
        }
    }

    /**
     * genBusinessLog
     *
     * @param joinPoint
     * @param isSuccess
     * @param exceptionString
     *
     * @return
     *
     * @throws JsonProcessingException
     * @throws Exception
     * @Auther 徐泽宇
     * @Date 2016年10月10日 下午1:20:10
     * @Title: genBusinessLog
     * @Description: 生成BusinessLog 对象
     */
    @SuppressWarnings("unchecked")
    private BusinessLogEntity genBusinessLog(JoinPoint joinPoint, boolean isSuccess, StringBuilder exceptionString) throws BussinessLoggerException {
        Object[] args = joinPoint.getArgs();
        @SuppressWarnings("rawtypes")
        List<String> argStringList = new LinkedList();
        for (Object object : args) {
            if (object != null) {
                argStringList.add(object.toString());
            }
        }
        String joinPointClass = joinPoint.getTarget().getClass().getName();

        // 获取当前切入的方法的BusinessMethod注解内容
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        String joinPointMethod = method.getName();
        BusinessMethod methodAnnotation = method.getAnnotation(BusinessMethod.class);
        String methodDesc = "";
        if (methodAnnotation != null) {
            methodDesc = methodAnnotation.value();
        }
        BusinessLogEntity businessLog = new BusinessLogEntity();
        businessLog.setId(UUID.randomUUID().toString());
        String remoteIp = HttpServletRequestUtil.getRemortIP(request);
        // 切入的对象
        businessLog.setClazz(joinPointClass);
        // 切入的方法是
        businessLog.setMethod(joinPointMethod);
        // 标注成业务方法描述
        businessLog.setMethodDescription(methodDesc);
        // 传递的参数
        try {
            businessLog.setArgs(JsonUtilsHelper.objectToJsonString(argStringList));
        } catch (JsonProcessingException e) {
            log.error("无法正确获取切面的参数", e);
            log.error(e.fillInStackTrace());
            throw new BussinessLoggerException(e.getMessage());
        }
        try {
            // 客户端地址
            businessLog.setRemoteIp(remoteIp);
            // user-agent
            String agent = request.getHeader("User-Agent");
            // 解析agent字符串
            UserAgent userAgent = UserAgent.parseUserAgentString(agent);
            // 获取浏览器对象
            Browser browser = userAgent.getBrowser();
            // 获取操作系统对象
            OperatingSystem operatingSystem = userAgent.getOperatingSystem();
            // 设置浏览器名字
            businessLog.setClientBrowser(browser.getName());
            // 设置浏览器版本
            String browserVersion = (userAgent.getBrowserVersion() == null) ? "" : userAgent.getBrowserVersion().toString();
            businessLog.setBrowserVersion(browserVersion);
            // 设置操作系统名字
            businessLog.setClientOs(operatingSystem.getName());
            // 设置设备类型
            businessLog.setClientDeviceType(operatingSystem.getDeviceType().toString());
            // 当前的操作人
            String operator = (session.getAttribute("user_mobile") == null) ? "session 中未获取用户信息" : (String) session.getAttribute("user_mobile");
            businessLog.setOperator(operator);

            // 切入的方法是否执行成功
            businessLog.setSuccess(isSuccess);
            // 切入的方法如果抛出错误，那错误的信息设置
            businessLog.setExceptionString(exceptionString.toString());
            // 操作时间
            businessLog.setCreatedAt(new Timestamp(new Date().getTime()));
        } catch (Exception e) {
            log.error(e.fillInStackTrace());
        }
        return businessLog;
    }

    /**
     * addLog
     *
     * @param data
     *
     * @throws Exception
     * @Auther 徐泽宇
     * @Date 2016年9月19日 下午5:54:18
     * @Title: addLog
     * @Description: 保存业务操作到业务日志数据库
     */
    private void addLog(BusinessLogEntity data) throws BussinessLoggerException {
        try {
            businessLogService.add(data);
        } catch (Exception e) {
            log.error("不能保存业务方法日志到数据库中.", e);
            throw new BussinessLoggerException(e.getMessage());
        }
    }
}
