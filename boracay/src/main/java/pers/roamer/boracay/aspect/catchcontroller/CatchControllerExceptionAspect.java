/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.aspect.catchcontroller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.validation.ObjectError;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.helper.ExceptionHelper;
import pers.roamer.boracay.helper.HttpResponseHelper;

import java.io.IOException;
import java.lang.reflect.UndeclaredThrowableException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 捕获所有Controller中的方法的Exception 通过HttpServletResponse输出到浏览器
 *
 * @author 徐泽宇
 * @version 1.0.0 2016年11月1日 下午10:05:29
 */
@SuppressWarnings("ALL")
@Slf4j
@Aspect
@Order(2)
@Component("pers.roamer.boracay.aspect.catchcontroller.CatchControllerExceptionAspect")
public class CatchControllerExceptionAspect {

  @Autowired private HttpServletRequest request;

  @Autowired private HttpServletResponse response;

  //    下面切入点，因为通过 xml 配置了。所以不再需要用注解的方式定义了
  //    /**
  //     * catch appliction Controller
  //     *
  //     * @author 徐泽宇
  //     * @since 1.0.0 2017年05月10日 下午10:08:50
  //     * @Title: catchControllerMethod
  //     * @Description: 切入所有需要切入的controller中方法的切面
  //     */
  //    @Pointcut("execution(* com.ninelephas.raccoon.controller..*.*(..) )  ")
  //    public void catchControllerMethod() {
  //        // Nothing to clean up
  //    }

  /**
   * 捕捉到切面产生的Exception后，写入HttpServletResponse
   *
   * @param ex 需要处理的 Exception
   * @throws IOException
   * @author 徐泽宇
   * @since 4.0.1 2019年12月12日 上午5:11:24
   */
  // @AfterThrowing(throwing = "ex", pointcut = "catchControllerMethod()")
  private void writeToHttpResponse(Throwable ex) throws IOException {
    if (log.isDebugEnabled()) {
      log.debug("writeToHttpResponse() - start");
      log.debug(new StringBuilder("访问的uri是：").append(request.getRequestURI()).toString());
    }

    response.setCharacterEncoding("UTF-8");
    // 判断 传入 exception message是否在配置文件中存在
    HashMap<String, Object> errorsHash = new HashMap<>();
    ArrayList<Map<String, Object>> errors = new ArrayList<>();
    String returnString;

    /**
     * @since 4.0.1 增加一个容错 spring 5 以后，对错误进行 UndeclaredThrowableException 的封装
     * @author 徐泽宇
     * @since 4.0.1 2019年12月12日 上午5:11:24
     */
    while (ex instanceof UndeclaredThrowableException) {
      ex = ex.getCause();
    }

    if (ex instanceof BoracayException && ((BoracayException) ex).getBindingResult() != null) {
      log.debug("传入的validator的错误信息");
      List<ObjectError> errorList = ((BoracayException) ex).getBindingResult().getAllErrors();
      for (ObjectError item : errorList) {
        log.debug(item.getDefaultMessage());
        ExceptionHelper helper = new ExceptionHelper(ex);
        errors.add(helper.genErrorHash());
      }
      errorsHash.put("errors", errors);
    } else {
      log.debug("传入的是捕获的exception信息，需要到配置文件中查找针对exceptionMessage的映射");
      String exceptionMessage = ex.getMessage();
      if (StringUtils.isEmpty(exceptionMessage)) {
        exceptionMessage = ex.getClass().getName();
      }
      ExceptionHelper helper = new ExceptionHelper(ex);
      errors.add(helper.genErrorHash());
      errorsHash.put("errors", errors);
    }
    try {
      returnString = HttpResponseHelper.inbox(errorsHash);
      log.debug(
          new StringBuilder("准备返回给Request的exception json字符串是:").append(returnString).toString());
      // 判断是否需要json化
      String invokeURI = request.getRequestURI();
      String uriPostfix = "";
      String[] urlStringArray = StringUtils.split(invokeURI, '.');
      if (urlStringArray.length == 2) {
        uriPostfix = urlStringArray[1];
      } else if (urlStringArray.length == 1) {
        uriPostfix = "";
      } else {
        uriPostfix = urlStringArray[urlStringArray.length - 1];
      }
      response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      log.debug(String.format("URL 调用的格式是[%s]", uriPostfix));
      if (StringUtils.isEmpty(uriPostfix)) {
        log.debug("说明是不需要把错误信息json化后，返给浏览器！而是直接把错误抛给浏览器，并且通过webserver进行个性化页面定制");
        response.sendError(500, returnString);
      } else if (StringUtils.equalsIgnoreCase(uriPostfix, "json")) {
        response.setContentType("text/json;charset=UTF-8");
        log.debug("说明是需要把错误信息json化后，返给浏览器");
        response.setStatus(500);
        response.getWriter().write(returnString);
      } else {
        response.setContentType("text/json;charset=UTF-8");
        String typeErrorMsg = "调用的格式不正确，只接受.json 的格式或者无后缀格式";
        log.debug(typeErrorMsg);
        response.setStatus(500);
        response.getWriter().write(String.format("{\"error\":\"%s\"}", typeErrorMsg));
        return;
      }
    } catch (IOException e) {
      log.error(e.getMessage(), e);
    }
    if (log.isDebugEnabled()) {
      log.debug("writeToHttpResponse() - end"); // $NON-NLS-1$
    }
  }
}
