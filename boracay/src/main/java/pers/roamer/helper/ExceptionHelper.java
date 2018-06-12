/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.helper;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import pers.roamer.boracay.configer.ConfigHelper;

import java.util.HashMap;
import java.util.Map;


/**
 * Exception 的 helper 类
 *
 * @author 徐泽宇
 * @version 1.0.0
 * @since 1.0.0 2017/6/29 下午5:11
 */
@Slf4j
@Data
public class ExceptionHelper {


    String exceptionMessage;
    String[] nodesName;
    String errorPath;


    /**
     * 创建一个新的实例 ExceptionHelper.
     *
     * @param propertyKey 属性 key
     *
     * @author 徐泽宇
     * @since 1.0.0 2017/6/29 下午5:12
     */
    public ExceptionHelper(String propertyKey) {
        this.errorPath = propertyKey;
        String exceptionMapString = ConfigHelper.getConfig().getString(propertyKey);
        if (StringUtils.isEmpty(exceptionMapString)) {
            // 无法从配置文件中获取到映射信息
            this.exceptionMessage = propertyKey;
            this.nodesName = new String[]{"publicError"};
            String expMessage = new StringBuilder("无法从配置文件里面获取[").append(propertyKey).append("]对应的信息！").toString();
            log.debug(expMessage);
        } else {
            // 从配置文件中获取到映射信息
            String[] items = StringUtils.split(exceptionMapString, '|');
            this.exceptionMessage = items[0];
            if (items.length == 2) {
                this.nodesName = items[1].split(",");
                //把前后的空格去掉
                for (int i = 0; i < this.nodesName.length; i++) {
                    this.nodesName[i] = this.nodesName[i].trim();
                }
            } else {
                this.nodesName = new String[]{"publicError"};
            }
        }
    }


    /**
     * 根据构造好的内容，生成一个error的hashMap
     *
     * @return Map 值
     *
     * @author 徐泽宇
     * @since 1.0.0 2017/6/29 下午5:13
     */
    public Map<String, Object> genErrorHash() {
        HashMap<String, Object> errorHash = new HashMap<>();
        errorHash.put("errorMessage", this.getExceptionMessage());
        errorHash.put("nodesName", this.getNodesName());
        errorHash.put("errorPath", this.getErrorPath());
        return errorHash;
    }

}