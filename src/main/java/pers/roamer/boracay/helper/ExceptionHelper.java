package pers.roamer.boracay.helper;

import pers.roamer.boracay.configer.ConfigHelper;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;


/**
 * @Title: ExceptionHelper.java
 * @Package com.ninelephas.whale.helper
 * @Description: 配置文件的exception解析类
 *               Copyright: Copyright (c) 2016
 *               Company:九象网络科技（上海）有限公司
 * 
 * @author 徐泽宇
 * @date 2016年11月3日 下午11:41:51
 * @version V1.0.0
 */
@Log4j2
@Data
public class ExceptionHelper {


    String exceptionMessage;
    String[] nodesName;
    String  errorPath ;


    /**
     * 
     * 创建一个新的实例 ExceptionHelper.
     * 
     * @Auther 徐泽宇
     * @Date 2016年11月3日 下午11:57:45
     * @param propertyKey
     */
    public ExceptionHelper(String propertyKey) {
        this.errorPath = propertyKey ;
        String exceptionMapString = ConfigHelper.getConfig().getString(propertyKey);
        if (StringUtils.isEmpty(exceptionMapString)) {
            // 无法从配置文件中获取到映射信息
            this.exceptionMessage = propertyKey;
            this.nodesName = new String[] {"publicError"};
            String expMessage = new StringBuilder("无法从配置文件里面获取[").append(propertyKey).append("]对应的信息！").toString();
            log.debug(expMessage);
        } else {
            // 从配置文件中获取到映射信息
            String[] items = StringUtils.split(exceptionMapString, '|');
            this.exceptionMessage = items[0];
            if (items.length == 2) {
                this.nodesName = items[1].split(",");
                //把前后的空格去掉
                for(int i = 0 ; i < this.nodesName.length ; i++){
                    this.nodesName[i] = this.nodesName[i].trim();
                }
            } else {
                this.nodesName = new String[] {"publicError"};
            }
        }
    }


    /**
     * genErrorHash
     *
     * @Auther 徐泽宇
     * @Date 2016年11月4日 下午2:55:36
     * @Title: genErrorHash
     * @Description: 根据构造好的内容，生成一个error的hashMap
     * @return
     */
    public Map<String, Object> genErrorHash() {
        HashMap<String, Object> errorHash = new HashMap<>();
        errorHash.put("errorMessage", this.getExceptionMessage());
        errorHash.put("nodesName", this.getNodesName());
        errorHash.put("errorPath",this.getErrorPath());
        return errorHash;
    }

}
