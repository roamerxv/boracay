/**
 * @Title: UtilException.java
 * @Package com.ninelephas.terrier.util
 * @Description: UtileException 基类
 *               Copyright: Copyright (c) 2016
 *               Company:九象网络科技（上海）有限公司
 *
 * @author 徐泽宇
 * @date 2016年10月14日 上午11:19:37
 * @version V1.0.0
 */

package pers.roamer.boracay;

import org.springframework.validation.BindingResult;

/**
 * @ClassName: BoracayException
 * @Description: BoracayException 基类
 * @author 徐泽宇
 * @date 2017年06月26日 上午11:19:37
 *
 */

public class BoracayException extends Exception {


    private final  transient BindingResult bindingResult;

    /**
     *
     * 创建一个新的实例 BoracayException.
     *
     * @Auther 徐泽宇
     * @Date 2016年11月4日 下午1:27:12
     * @param message
     */
    public BoracayException(String message) {
        super(message);
        this.bindingResult = null;
    }


    /**
     *
     * 创建一个新的实例 BoracayException.
     *
     * @Auther 徐泽宇
     * @Date 2016年11月4日 下午1:27:29
     * @param bindingResult
     */
    public BoracayException(BindingResult bindingResult) {
        super();
        this.bindingResult = bindingResult;
    }


    public BindingResult getBindingResult(){
        return this.bindingResult;
    }
}
