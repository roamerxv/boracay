/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 2.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.websample.controller;

import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import pers.roamer.boracay.aspect.businesslogger.BusinessMethod;
import pers.roamer.boracay.aspect.httprequest.SessionCheckKeyword;
import pers.roamer.boracay.configer.ConfigHelper;
import pers.roamer.boracay.helper.HttpResponseHelper;

import java.util.Enumeration;


/**
 * @author 徐泽宇
 * @ClassName: TestController
 * @Description: 用于测试的MVC Controller
 * @date 2016年12月2日 下午6:52:03
 */
@Log4j2
@Controller("com.ninelephas.raccoon.controller.test")
@RequestMapping(value = "/test")
@SessionCheckKeyword(checkIt = false)
public class TestController extends BaseController {

    /**
     * 登出功能
     *
     * @return
     *
     * @throws ServiceException
     */
    // @BusinessMethod(value = "登出", isLogged = true)
    @SessionCheckKeyword(checkIt = false)
    @RequestMapping(value = "/logout")
    public ModelAndView logout() throws ServiceException {
        log.debug("开始登出");
        Enumeration<String> eume = httpSession.getAttributeNames();
        while (eume.hasMoreElements()) {
            String name = eume.nextElement();
            httpSession.removeAttribute(name);
        }
        log.debug("登出完成");
        return new ModelAndView("/");
    }

    /**
     * Test500ErrorController
     *
     * @return
     *
     * @throws ControllerException
     * @Auther 徐泽宇
     * @Date 2016年11月10日 下午7:18:14
     * @Title: Test500ErrorController
     * @Description: 抛出一个500的错误
     */
    @RequestMapping(value = "/500_error")
    @ResponseBody
    public String test500ErrorController() throws ControllerException {
        throw new ControllerException("exception.test.exception");
    }

    /**
     * test500ErrorController
     *
     * @return
     *
     * @throws ControllerException
     * @Auther 徐泽宇
     * @Date 2016年12月12日 下午2:59:53
     * @Title: test500ErrorController
     * @Description: 调用成功
     */
    @RequestMapping(value = "/success", produces = "application/json;charset=utf-8")
    @ResponseBody
    public String success() throws ControllerException {
        return HttpResponseHelper.successInfoInbox("ok");
    }

    @RequestMapping(value = "/uploadAndJson", consumes = {"multipart/form-data;charset=utf-8"})
    @ResponseBody
    public String uploadFileAndJson(@RequestPart("requestBean") FormDataJsonBean formDataJsonBean, @RequestPart("files") MultipartFile[] files) throws ControllerException {
        log.debug("获取上传文件和 json 对象:{} , {}", formDataJsonBean, files);
        for (MultipartFile file : files) {
            log.debug(file.getOriginalFilename());
        }
        ;

        return HttpResponseHelper.successInfoInbox("上传成功");
    }

    /**
     * 测试需要记录日志的业务方法
     *
     * @return
     *
     * @throws ControllerException
     */
    @GetMapping(value = "/businessMethodLog")
    @BusinessMethod(value = "测试需要记录日志的业务方法")
    @ResponseBody
    public String businessMethodLog() throws ControllerException {
        return HttpResponseHelper.successInfoInbox("ok");
    }

    /**
     * 不用做 session check
     * @return
     * @throws ControllerException
     */
    @GetMapping(value = "/noSessionCheck")
    @BusinessMethod(value = "不做 session check 的方法")
    @SessionCheckKeyword(checkIt = false)
    @ResponseBody
    public String noSessionCheck() throws ControllerException {
        return HttpResponseHelper.successInfoInbox("ok");
    }

    /**
     * 做 session check
     * @return
     * @throws ControllerException
     */
    @GetMapping(value = "/sessionCheck")
    @BusinessMethod(value = "进行 session check 的方法")
    @SessionCheckKeyword(checkIt = true)
    @ResponseBody
    public String sessionCheck() throws ControllerException {
        return HttpResponseHelper.successInfoInbox("ok");
    }

    /**
     * 设置 session 的 keyword
     * @return
     * @throws ControllerException
     */
    @GetMapping(value = "/setSessionKeyword")
    @BusinessMethod(value = "在 session 中设置 keyword")
    @SessionCheckKeyword(checkIt = false)
    @ResponseBody
    public String setSessionKeyword() throws ControllerException {
        httpSession.setAttribute(ConfigHelper.getConfig().getString("System.SessionUserKeyword"), "keyword");
        return HttpResponseHelper.successInfoInbox("设置 session keyword 成功");
    }

}

@Data
class FormDataJsonBean {
    private String id;
    private String name;
}
