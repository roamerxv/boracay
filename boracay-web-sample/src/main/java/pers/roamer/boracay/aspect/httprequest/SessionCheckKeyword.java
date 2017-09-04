/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.2
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.aspect.httprequest;

import java.lang.annotation.*;


/**
 * 定义一个需要进行 session 中关键词判断的注解接口
 *
 * @author 徐泽宇
 * @version 1.0.2  2017/7/5 上午11:33
 */
@Target({ElementType.TYPE,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SessionCheckKeyword {

    /**
     * 需要进行验证的业务方法 ID
     *
     * @return
     *
     * @author 徐泽宇
     * @since 1.0.2   2017/7/5 上午11:34
     */
    boolean checkIt() default true;

}
