package pers.roamer.boracay.quartz.config;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/** @author zouwei */
public class ApplicationContextUtil implements ApplicationContextAware {

    private static ApplicationContext appContext;

    /**
     * 获取Bean
     *
     * @param name
     * @return
     */
    public static Object getBean(String name) {
        return appContext.getBean(name);
    }

    /**
     * 获取bean
     *
     * @param clazz
     * @param <T>
     * @return
     */
    public static <T> T getBean(Class<T> clazz) {
        return appContext.getBean(clazz);
    }

    /**
     * @param className
     * @return
     */
    public static Class<?> getType(String className) {
        return appContext.getType(className);
    }

    /**
     * @param name
     * @return
     */
    public static String getProperty(String name) {
        return appContext.getEnvironment().getProperty(name);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        appContext = applicationContext;
    }
}
