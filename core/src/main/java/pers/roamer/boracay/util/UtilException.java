/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.util;

import org.springframework.validation.BindingResult;
import pers.roamer.boracay.BoracayException;

/**
 * Created by zouwei on 2017/7/3.
 */
public class UtilException extends BoracayException {

    /**
     *
     * @param message
     */
    public UtilException(String message){
        super(message);
    }

    /**
     *
     * @param bindingResult
     */
    public UtilException(BindingResult bindingResult) {
        super(bindingResult);
    }
}
