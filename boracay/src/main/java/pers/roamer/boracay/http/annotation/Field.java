package pers.roamer.boracay.http.annotation;

import org.apache.commons.lang3.StringUtils;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/** 注解请求体参数 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.PARAMETER, ElementType.FIELD})
public @interface Field {
    /**
     * 请求参数对应的key值
     *
     * @return
     */
    String value() default StringUtils.EMPTY;
}
