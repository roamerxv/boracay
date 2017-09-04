/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.aspect.businesslogger;

import java.lang.annotation.*;


/**
 * 定义一个业务方法的注解接口
 *
 * @author 徐泽宇
 * @version 1.0.0 2016年10月13日 下午1:16:38
 */
@Target({ElementType.METHOD})
/*
 * @Retention(RetentionPolicy.RUNTIME)
 * 表示这个注解可以在运行期通过反射访问。
 * 如果你没有在注解定义的时候使用这个指示那么这个注解的信息不会保留到运行期，这样反射就无法获取它的信息
 */
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface BusinessMethod {

    /**
     * 业务方法名字的缺省值
     *
     * @return
     *
     * @author 徐泽宇
     * @since 1.0.0   2016年10月13日 下午1:18:50
     */
    String value() default "没有设置业务方法名字";

    /**
     * 业务方法是否要进行日志记录
     *
     * @return
     *
     * @author 徐泽宇
     * @since 1.0.0   2017年06月29日 下午7:08:10
     */
    boolean isLogged() default true;
}
