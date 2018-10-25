/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.application;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;
import pers.roamer.boracay.configer.ConfigHelper;

import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Properties;

/**
 * Spring容器成功载入后执行的任务
 *
 * @author Comsys-"徐泽宇"
 * @version 1.0.0 2016年7月6日 下午12:39:33
 */
@Slf4j
@Service("pers.roamer.boracay.application.StartedListener")
public class StartedListener implements ApplicationListener<ContextRefreshedEvent> {


    /**
     * @author 徐泽宇
     * @since 1.0.0 2017/6/29 下午5:27
     */
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (event.getApplicationContext().getParent() == null)
        // root application context  没有parent，他就是老大.
        {
            //  读取配置文件
            log.info(String.format("项目:[%s],开始启动。。。", ConfigHelper.getConfig().getString("System.AppName")));

            //
            log.debug("onApplicationEvent(ContextRefreshedEvent) - start");
            // 需要执行的逻辑代码，当spring容器初始化完成后就会执行该方法。
            Properties properties = System.getProperties();
            Iterator<Entry<Object, Object>> it = properties.entrySet().iterator();
            log.debug("系统环境信息如下：");
            while (it.hasNext()) {
                Entry<Object, Object> entry = it.next();
                log.debug(entry.getKey() + "=" + entry.getValue());
            }
            log.debug("onApplicationEvent(ContextRefreshedEvent) - end");
            ApplicationContext context = event.getApplicationContext();
            String[] beans = context.getBeanDefinitionNames();
            log.debug("所有被装备的Bean列表如下:");
            for (String beanName : beans) {
                log.debug("Bean 名称是:{},\t对应的类是:{}",beanName, context.getBean(beanName).getClass().getName());
            }
            log.debug("所有被装备的Bean列表显示完成");
            log.info(String.format("项目:[%s],启动完成", ConfigHelper.getConfig().getString("System.AppName")));
        }
    }
}
