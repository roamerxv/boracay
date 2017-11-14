/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.aspect.httprequest.SessionCheckKeyword;
import pers.roamer.boracay.entity.BusinessLogEntity;
import pers.roamer.boracay.helper.JsonUtilsHelper;
import pers.roamer.boracay.service.log.BusinessLogService;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * 业务日志
 *
 * @author 徐泽宇
 * @version 1.0.0 2016年9月19日 下午11:35:43
 */
@Log4j2
@Controller("pers.roamer.boracay.controller.BusinessLoggerController")
@RequestMapping(value = "/system/businesslog/")
@SessionCheckKeyword()
public class BusinessLoggerController {

    @Autowired
    BusinessLogService businessLogService;

    @Autowired
    HttpServletRequest req;


    /**
     * 分页查询所有的业务日志数据, 用于显示给 dataTables 控件
     *
     * @return
     *
     * @throws BoracayException
     * @author 徐泽宇
     * @since 1.0.0 2016年9月20日 下午12:27:59
     */
    @PostMapping(value = "/getDataWithPaged")
    @ResponseBody
    public String indexForDatatable(@RequestBody final DataTableRequestParamBean dataTableRequestParamBean) throws BoracayException {

        log.debug(dataTableRequestParamBean.logString());

        Page<BusinessLogEntity> businesslogMap = businessLogService.findAllByExtraSearch(dataTableRequestParamBean);
        HashMap<String, Object> root = new HashMap<>();
        List<Object> data = new ArrayList<>();

        for (BusinessLogEntity item : businesslogMap.getContent()) {
            HashMap<String, Object> itemHash = new HashMap<>();
            itemHash.put("createdAt", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(item.getCreatedAt()));
            itemHash.put("operator", item.getOperator());
            itemHash.put("methodDescription", item.getMethodDescription());
            itemHash.put("remoteIp", item.getRemoteIp());
            itemHash.put("clientOs", item.getClientOs());
            itemHash.put("clientBrowser", item.getClientBrowser());
            itemHash.put("browserVersion", item.getBrowserVersion());
            itemHash.put("clientDeviceType", item.getClientDeviceType());
//            itemHash.put("clazz", item.getClazz());
//            itemHash.put("method", item.getMethod());
            itemHash.put("timeConsuming", item.getTimeConsuming());
            itemHash.put("success", item.isSuccess());
            data.add(itemHash);
        }
        root.put("logs", data);
        root.put("draw", dataTableRequestParamBean.getDraw()); // 必须设置，这个值作者会直接返回给前台
        root.put("recordsTotal", businesslogMap.getTotalElements());
        root.put("recordsFiltered", businesslogMap.getTotalElements());
        StringBuilder rtnString;
        try {
            rtnString = new StringBuilder(JsonUtilsHelper.objectToJsonString(root));
            log.debug("返回给浏览器的结果值是:{}：", rtnString.toString());
        } catch (JsonProcessingException e) {
            throw new BoracayException(e.getMessage());
        }
        return rtnString.toString();
    }

}
