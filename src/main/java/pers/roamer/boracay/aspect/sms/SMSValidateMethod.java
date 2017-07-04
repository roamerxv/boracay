/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.2
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.aspect.sms;

import java.lang.annotation.*;


/**
 * 定义一个需要短信验证码验证的注解接口
 *
 * @author 徐泽宇
 * @version 1.0.2 2017/7/3 下午1:07
 */
@Target({ElementType.METHOD})
/*
 * @Retention(RetentionPolicy.RUNTIME)
 * 表示这个注解可以在运行期通过反射访问。
 * 如果你没有在注解定义的时候使用这个指示那么这个注解的信息不会保留到运行期，这样反射就无法获取它的信息
 */
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SMSValidateMethod {

    /**
     * 需要进行验证的业务方法 ID
     *
     * @return
     *
     * @author 徐泽宇
     * @since 1.0.1   2017/7/3 下午1:07
     */
    String opId() default "";

}
