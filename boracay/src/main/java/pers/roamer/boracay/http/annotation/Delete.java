package pers.roamer.boracay.http.annotation;

import org.apache.commons.lang3.StringUtils;
import pers.roamer.boracay.http.core.factory.BaseOkHttpClientFactory;
import pers.roamer.boracay.http.core.factory.DefaultOkHttpClientFactory;
import pers.roamer.boracay.http.core.handler.RequestParamsHandler;
import pers.roamer.boracay.http.core.handler.SimpleJsonRequestParamsHandler;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/** 注解Delete请求方法 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Delete {
    /**
     * 请求url
     *
     * @return
     */
    String value() default StringUtils.EMPTY;

    /**
     * 指定创建OkHttpClient的工厂类
     *
     * @return
     */
    Class<? extends BaseOkHttpClientFactory> clientFactory() default
            DefaultOkHttpClientFactory.class;

    /**
     * 使用自定义的RequestParamsHandler，否则就用默认的
     *
     * @return
     */
    Class<? extends RequestParamsHandler> handler() default SimpleJsonRequestParamsHandler.class;
}
