/**
 * @Title: BussinessLoggerException.java
 * @Package com.ninelephas.whale.aspect.businesslogger
 * @Description: 业务日志的Exception
 *               Copyright: Copyright (c) 2016
 *               Company:九象网络科技（上海）有限公司
 * 
 * @author 徐泽宇
 * @date 2016年10月12日 下午6:05:09
 * @version V1.0.0
 */

package pers.roamer.boracay.aspect.businesslogger;

import pers.roamer.boracay.BoracayException;

/**
 * @ClassName: BussinessLoggerException
 * @Description: 业务日志的Exception
 * @author 徐泽宇
 * @date 2016年10月13日 下午1:00:30
 *
 */
public class BussinessLoggerException extends BoracayException {



    /**
     * @Fields serialVersionUID : 序列号
     */

    private static final long serialVersionUID = 8757953678062880700L;

    /**
     * 
     * 创建一个新的实例 BussinessLoggerException.
     * 
     * @Auther 徐泽宇
     * @Date 2016年11月2日 下午3:29:43
     * @param message
     */
    public BussinessLoggerException(String message) {
        super(message);
    }

}
