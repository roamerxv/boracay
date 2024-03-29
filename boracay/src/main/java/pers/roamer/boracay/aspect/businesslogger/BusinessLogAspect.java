/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.aspect.businesslogger;

import com.blueconic.browscap.BrowsCapField;
import com.blueconic.browscap.Capabilities;
import com.blueconic.browscap.UserAgentParser;
import com.blueconic.browscap.UserAgentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pers.roamer.boracay.configer.ConfigHelper;
import pers.roamer.boracay.entity.BusinessLogEntity;
import pers.roamer.boracay.helper.JsonUtilsHelper;
import pers.roamer.boracay.service.log.BusinessLogService;
import pers.roamer.boracay.util.HttpServletRequestUtil;


import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

/**
 * 记录系统日志
 *
 * @author Comsys-"徐泽宇"
 * @since 1.0.0 2016年8月1日 下午5:25:15
 */
@Aspect
@Order(1)
@Slf4j
@Component("pers.roamer.boracay.aspect.businesslogger.BusinessLogAspect")
public class BusinessLogAspect {

  @Autowired private HttpSession session;

  @Autowired private HttpServletRequest request;

  @Autowired BusinessLogService businessLogService;

  //    下面2个切入点，因为通过 xml 配置了。所以不再需要用注解的方式定义了

  //    /**
  //     * logTheController
  //     *
  //     * @author 徐泽宇
  //     * @since 1.0.0 2016年10月9日 上午11:20:58
  //     * @Title: logTheController
  //     * @Description: 定义一个切面，指向项目中的所有的controller类，并且排除掉登出的方法。
  //     */
  //    @Pointcut("execution(* com.ninelephas.raccoon.controller..*.*(..))  && !execution(*
  // com.ninelephas.raccoon.controller.creator.CreatorController.logout(..))") //通过xml 来配置
  //    public void logTheController() {
  //        // Nothing to clean up
  //    }

  //    /**
  //     * beforeLog
  //     *
  //     * @author 徐泽宇
  //     * @since 1.0.0 2016年10月10日 下午3:44:01
  //     * @Title: logTheLogout
  //     * @Description: 定义一个拦截前处理的切面。比如用于 记录登出信息。
  //     * 登出要先拦截的目的是为了能够获取当前 session 中的用户 key-word，以便记录在日志数据表中
  //     */
  //    // @Pointcut("execution(*
  // com.ninelephas.raccoon.controller.creator.CreatorController.logout(..))") //通过 xml 来配置
  //    public void beforeLog() {
  //        // Nothing to clean up
  //    }

  /**
   * 织入所有的controller类中的方法，进行日志记录的功能
   *
   * @param joinPoint
   * @throws Throwable
   * @author 徐泽宇
   * @since 1.0.0 2017/6/29 下午5:25
   */
  // @Around("logTheController()") // 通过xml 文件来进行配置
  private Object logAroundAction(ProceedingJoinPoint joinPoint) {
    Object rtnObject = null;
    boolean recordBusinessLog = ConfigHelper.getConfig().getBoolean("System.RecordBusinessLog");

    if (!recordBusinessLog) {
      // 如果在配置文件中设置不需要记录日志
      try {
        log.debug("系统配置不需要记录业务活动日志");
        rtnObject = joinPoint.proceed();
      } catch (Throwable e) {
        log.error(e.getMessage(), e);
      }
    } else {
      boolean isSuccess = true;
      long beginTime = System.currentTimeMillis();
      StringBuilder exceptionString = new StringBuilder();
      try {
        rtnObject = joinPoint.proceed();
      } catch (Throwable e) {
        isSuccess = false;
        exceptionString = new StringBuilder(ExceptionUtils.getStackTrace(e));
      }
      try {
        parseJoinPointAndSave2DB(joinPoint, isSuccess, exceptionString, beginTime);
      } catch (Exception e) {
        log.error(e.getMessage(), e);
      }
    }
    return rtnObject;
  }

  /**
   * logBeforeAction
   *
   * @param joinPoint
   * @author 徐泽宇 @Title: logBeforeAction @Description: 运行前进行拦截，并且记录日志
   * @since 1.0.0 2016年10月10日 下午3:53:22
   */
  private void logBeforeAction(JoinPoint joinPoint) throws BussinessLoggerException {
    if (log.isDebugEnabled()) {
      log.debug("logBeforeAction(JoinPoint joinPoint={}) - start", joinPoint);
    }

    try {
      long beginTime = System.currentTimeMillis();
      parseJoinPointAndSave2DB(joinPoint, true, new StringBuilder(""), beginTime);
    } catch (BussinessLoggerException e) {
      throw e;
    }

    if (log.isDebugEnabled()) {
      log.debug("logBeforeAction(JoinPoint joinPoint={}) - end", joinPoint);
    }
  }

  /**
   * parseJoinPointAndSave2DB
   *
   * @param joinPoint
   * @param isSuccess
   * @param exceptionString
   * @param begintTime 业务调用开始时间
   * @throws BussinessLoggerException
   * @author 徐泽宇 @Title: parseJoinPointAndSave2DB @Description:
   *     把joinPoint对象解析成pojo的BusinessLog对象，并且保存到数据库
   * @since 1.0.0 2016年10月10日 下午12:47:59
   */
  private void parseJoinPointAndSave2DB(
      JoinPoint joinPoint, boolean isSuccess, StringBuilder exceptionString, long begintTime)
      throws BussinessLoggerException {
    BusinessLogEntity businessLog = genBusinessLog(joinPoint, isSuccess, exceptionString);

    // 如果没有标注业务逻辑的方法，就不入库
    if (businessLog == null || businessLog.getMethodDescription().isEmpty()) {
      // 如果业务方法的注解是 null，或者注解的 value 是空，则不入日志数据表单
      // Nothing to do
    } else {
      // 记录业务调用耗时
      businessLog.setTimeConsuming(System.currentTimeMillis() - begintTime);
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
   * @return
   * @throws JsonProcessingException
   * @throws Exception
   * @author 徐泽宇 @Title: genBusinessLog @Description: 生成BusinessLog 对象
   * @since 1.0.0 2016年10月10日 下午1:20:10
   */
  @SuppressWarnings("unchecked")
  private BusinessLogEntity genBusinessLog(
      JoinPoint joinPoint, boolean isSuccess, StringBuilder exceptionString)
      throws BussinessLoggerException {
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
    boolean isLogged = true;
    if (methodAnnotation != null) {
      methodDesc = methodAnnotation.value();
      isLogged = methodAnnotation.isLogged();
    }
    // 如果业务方法标记为不需要记录日志，则返回 null
    if (!isLogged) {
      return null;
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
      throw new BussinessLoggerException(e.getMessage());
    }
    try {
      // create a parser with the default fields
      //final UserAgentParser parser = new UserAgentService().loadParser(); // handle IOException and ParseException

      // or create a parser with a custom defined field list
      // the list of available fields can be seen inthe BrowsCapField enum
      final UserAgentParser parser =
              new UserAgentService().loadParser(Arrays.asList(BrowsCapField.BROWSER, BrowsCapField.BROWSER_TYPE,
                      BrowsCapField.BROWSER_MAJOR_VERSION,
                      BrowsCapField.DEVICE_TYPE, BrowsCapField.PLATFORM, BrowsCapField.PLATFORM_VERSION,
                      BrowsCapField.RENDERING_ENGINE_VERSION, BrowsCapField.RENDERING_ENGINE_NAME,
                      BrowsCapField.PLATFORM_MAKER, BrowsCapField.RENDERING_ENGINE_MAKER));

      // It's also possible to supply your own ZIP file by supplying a correct path to a ZIP file in the constructor.
      // This can be used when a new BrowsCap version is released which is not yet bundled in this package.
      // final UserAgentParser parser = new UserAgentService("E:\\anil\\browscap.zip").loadParser();

      // parser can be re-used for multiple lookup calls
      final String userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36";
      final Capabilities capabilities = parser.parse(userAgent);

      // the default fields have getters
      final String browser = capabilities.getBrowser();
      final String browserType = capabilities.getBrowserType();
      final String browserMajorVersion = capabilities.getBrowserMajorVersion();
      final String deviceType = capabilities.getDeviceType();
      final String platform = capabilities.getPlatform();
      final String platformVersion = capabilities.getPlatformVersion();
      // 客户端地址
      businessLog.setRemoteIp(remoteIp);
      // user-agent
      String agent = request.getHeader("User-Agent");
      
      
      // 设置浏览器名字
      businessLog.setClientBrowser(browser);
      // 设置浏览器版本
      businessLog.setBrowserVersion(browserMajorVersion);
      // 设置操作系统名字
      businessLog.setClientOs(platform);
      // 设置设备类型
      businessLog.setClientDeviceType(deviceType);
      // 当前的操作人
      String operator =
          (session.getAttribute(ConfigHelper.getConfig().getString("System.BusinessRecordUserName"))
                  == null)
              ? "访客"
              : (String)
                  session.getAttribute(
                      ConfigHelper.getConfig().getString("System.BusinessRecordUserName"));
      businessLog.setOperator(operator);

      // 切入的方法是否执行成功
      businessLog.setSuccess(isSuccess);
      // 切入的方法如果抛出错误，那错误的信息设置
      businessLog.setExceptionString(exceptionString.toString());
      // 操作时间
      businessLog.setCreatedAt(new Timestamp(System.currentTimeMillis()));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
    }
    return businessLog;
  }

  /**
   * addLog
   *
   * @param data
   * @throws Exception
   * @author 徐泽宇 @Title: addLog @Description: 保存业务操作到业务日志数据库
   * @since 1.0.0 2016年9月19日 下午5:54:18
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
