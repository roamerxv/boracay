/**
 * @Title: BusinessLoggerController.java
 * @Package com.ninelephas.whale.controller.businesslog
 * @Description: 记录信息处理的controller
 * Copyright: Copyright (c) 2016
 * Company:九象网络科技（上海）有限公司
 * @author 徐泽宇
 * @date 2016年9月19日 下午11:35:43
 * @version V1.0.0
 */

package pers.roamer.boracay.controller;

import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.datatables.DataTablesRequest;
import pers.roamer.boracay.entity.BusinessLogEntity;
import pers.roamer.boracay.helper.JsonUtilsHelper;
import pers.roamer.boracay.service.log.BusinessLogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author 徐泽宇
 * @ClassName: BusinessLoggerController
 * @Description: 业务日志
 * @date 2016年9月19日 下午11:35:43
 */
@Log4j2
@Controller("pers.roamer.boracay.controller.log.BusinessLoggerController")
@RequestMapping(value = "/system/businesslog/")
public class BusinessLoggerController {

    @Autowired
    BusinessLogService businessLogService;

    @Autowired
    HttpServletRequest req;


    /**
     * indexForDatatable
     *
     * @return
     *
     * @throws BoracayException
     * @Auther 徐泽宇
     * @Date 2016年9月20日 下午12:27:59
     * @Title: indexForDatatable
     * @Description: 分页查询所有的业务日志数据, 用于显示给 dataTables 控件
     */
    @PostMapping(value = "/getDataWithPaged")
    @ResponseBody
    public String indexForDatatable(@RequestBody final DataTablesRequest dataTablesRequest) throws BoracayException {

        log.debug(dataTablesRequest.logString());

        Page<BusinessLogEntity> businesslogMap = businessLogService.findAllByExtraSearch(dataTablesRequest);
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
            itemHash.put("clazz", item.getClazz());
            itemHash.put("method", item.getMethod());
            itemHash.put("success", item.isSuccess());
            data.add(itemHash);
        }
        root.put("logs", data);
        root.put("draw", dataTablesRequest.getDraw()); // 必须设置，这个值作者会直接返回给前台
        root.put("recordsTotal", businesslogMap.getTotalElements());
        root.put("recordsFiltered", businesslogMap.getTotalElements());
        StringBuilder rtnString;
        try {
            rtnString = new StringBuilder(JsonUtilsHelper.objectToJsonString(root));
        } catch (JsonProcessingException e) {
            throw new BoracayException(e.getMessage());
        }

        log.debug(rtnString.toString());
        return rtnString.toString();
    }

}
