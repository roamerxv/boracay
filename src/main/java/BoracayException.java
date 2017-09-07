/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay;

import org.springframework.validation.BindingResult;

/**
 * BoracayException 基类
 *
 * @author 徐泽宇
 * @version 1.0.0   2017/6/29 下午5:21
 */

public class BoracayException extends Exception {


    private final transient BindingResult bindingResult;

    /**
     * 创建一个新的实例 BoracayException.
     *
     * @param message
     *
     * @author 徐泽宇
     * @since 1.0.0 2017/6/29 下午5:21
     */
    public BoracayException(String message) {
        super(message);
        this.bindingResult = null;
    }


    /**
     * 创建一个新的实例 BoracayException.
     *
     * @param bindingResult bindingResult
     *
     * @author 徐泽宇
     * @since 1.0.0 2017/6/29 下午5:21
     */
    public BoracayException(BindingResult bindingResult) {
        super();
        this.bindingResult = bindingResult;
    }


    public BindingResult getBindingResult() {
        return this.bindingResult;
    }
}
