/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 2.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.websample.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.aspect.businesslogger.BusinessMethod;
import pers.roamer.boracay.aspect.httprequest.SessionCheckKeyword;
import pers.roamer.boracay.configer.ConfigHelper;
import pers.roamer.boracay.helper.HttpResponseHelper;
import pers.roamer.boracay.helper.JsonUtilsHelper;
import pers.roamer.boracay.util.web.FileUploadResult;
import pers.roamer.boracay.util.web.UploadFileUtil;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Enumeration;


/**
 * @author 徐泽宇
 * @ClassName: TestController
 * @Description: 用于测试的MVC Controller
 * @date 2016年12月2日 下午6:52:03
 */
@Slf4j
@Controller("pers.roamer.boracay.websample.controller.TestController")
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
        return HttpResponseHelper.successInfoInbox("记录业务日志的方法被成功调用！现在可以到日志结果查看功能里面去查看日志是否被成功记录！");
    }

    /**
     * 不用做 session check
     *
     * @return
     *
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
     *
     * @return
     *
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
     *
     * @return
     *
     * @throws ControllerException
     */
    @GetMapping(value = "/setSessionKeyword")
    @BusinessMethod(value = "在 session 中设置 keyword")
    @SessionCheckKeyword(checkIt = false)
    @ResponseBody
    public String setSessionKeyword() throws ControllerException {
        httpSession.setAttribute(ConfigHelper.getConfig().getString("System.SessionUserKeyword"), "登录用户");
        return HttpResponseHelper.successInfoInbox("设置 session keyword 成功");
    }


    /**
     * 测试提交表单的同时，也进行多文件上传
     *
     * @param formDataJsonBean
     * @param files1
     * @param files2
     *
     * @return
     *
     * @throws ControllerException
     */
    @ResponseBody
    @PostMapping(value = "/submitWithFile", consumes = {"multipart/form-data;charset=utf-8"})
    public String uploadTest(@RequestPart("requestBean") FormDataJsonBean formDataJsonBean, @RequestPart("files-1") MultipartFile[] files1, @RequestPart("files-2") MultipartFile[] files2) throws ControllerException {
        log.debug("开始处理");
        try {
            log.debug("传入的表单内容是：{}", JsonUtilsHelper.objectToJsonString(formDataJsonBean));
        } catch (JsonProcessingException e) {
            new ControllerException(e.getMessage());
        }
        //log.debug(fileDigest[0].getDigest());
        for (MultipartFile file : files1) {
            log.debug(file.getClass().getName());
        }
        for (MultipartFile file : files2) {
            log.debug(file.getClass().getName());
        }
        try {
            ArrayList<FileUploadResult> fileUploadResultArrayList1 = new UploadFileUtil().saveFile(files1, true);
            ArrayList<FileUploadResult> fileUploadResultArrayList2 = new UploadFileUtil().saveFile(files2, false, "/Users/roamer/Desktop/upload");
            if (log.isDebugEnabled()){
                fileUploadResultArrayList1.forEach(item -> {
                    log.debug("保存的文件信息是：{}", item.toString());
                });
                fileUploadResultArrayList2.forEach(item -> {
                    log.debug("保存的文件信息是：{}", item.toString());
                });
            }

        } catch (IOException | NoSuchAlgorithmException | BoracayException e) {
            log.error(e.getMessage());
            throw new ControllerException(e.getMessage());
        }
        return HttpResponseHelper.successInfoInbox("处理成功");
    }

    ;

}

@Data
class FormDataJsonBean {
    private String id;
    private String name;
}
