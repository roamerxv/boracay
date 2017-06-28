/**
 * @Title: BusinessMethod.java
 * @Package com.ninelephas.whale.aspect.businessLogger
 * @Description: 定义标注需要记录日志的业务方法
 *               Copyright: Copyright (c) 2016
 *               Company:九象网络科技（上海）有限公司
 * 
 * @author 徐泽宇
 * @date 2016年9月19日 下午3:48:56
 * @version V1.0.0
 */

package pers.roamer.boracay.aspect.businesslogger;

import java.lang.annotation.*;


/**
  * @ClassName: BusinessMethod
  * @Description: 定义一个业务方法的注解接口
  * @author  徐泽宇
  * @date 2016年10月13日 下午1:16:38
  *
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
      * value
      * 
      * @Auther 徐泽宇
      * @Date   2016年10月13日 下午1:18:50
      * @Title: value
      * @Description: 业务方法名字的缺省值
      * @return
      */
    String value() default "没有设置业务方法名字";

    /**
     * value
     *
     * @Auther 徐泽宇
     * @Date   2017年06月29日 下午7:08:10
     * @Title: isLogged
     * @Description: 业务方法是否要进行日志记录
     * @return
     */
    boolean isLogged() default true;
}
