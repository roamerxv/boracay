/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.websample.controller;

import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpSession;

/**
 * 基础控制类
 *
 * @author roamer - 徐泽宇
 * @create 2017-06-2017/6/2  下午4:24
 */
@Slf4j
@Controller("pers.roamer.boracay.websample.controller.BaseController")
public class BaseController {
    @Autowired
    protected HttpSession httpSession;

    public String getUserID() throws ControllerException {
        String user_id = (String) httpSession.getAttribute("user_id");
        log.debug("当前 session 中的user_id 是 {}", user_id);
        if (StringUtils.isEmpty(user_id)) {
            throw new ControllerException("exception.system.need_login");
        }
        return user_id;
    }
}
