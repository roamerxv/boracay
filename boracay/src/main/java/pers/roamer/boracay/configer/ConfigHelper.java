/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.configer;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.configuration2.Configuration;
import org.apache.commons.configuration2.XMLConfiguration;
import org.apache.commons.configuration2.YAMLConfiguration;
import org.apache.commons.configuration2.builder.FileBasedConfigurationBuilder;
import org.apache.commons.configuration2.builder.fluent.Parameters;
import org.apache.commons.configuration2.ex.ConfigurationException;
import org.springframework.core.io.ClassPathResource;


/**
 * 读取配置文件，获取系统全局配置参数
 *
 * @author 徐泽宇
 * @version 1.0.0 2017/6/29 下午5:22
 */
@Slf4j
public class ConfigHelper {

    private static FileBasedConfigurationBuilder<?> builder;
    private static Configuration config;


    private ConfigHelper() {
        //do nothing
    }

    static {
        log.debug("ConfigHelper() - start"); //$NON-NLS-1$
        Parameters params = new Parameters();
        // 判断 配置文件是否存在？
        // 1. config/config.yaml
        // 2. config/config.xml
        if ( new ClassPathResource("config/config.yaml").exists()) {
            log.info("在 classpath 中发现config/config.yaml文件！以此为配置文件");
            builder = new FileBasedConfigurationBuilder<YAMLConfiguration>(YAMLConfiguration.class)
                    .configure(params.xml()
                            .setFileName("config/config.yaml"));
        } else if (new ClassPathResource("config/config.xml").exists()) {
            log.info("在 classpath 中发现config/config.xml文件！以此为配置文件");
            builder = new FileBasedConfigurationBuilder<XMLConfiguration>(XMLConfiguration.class)
                    .configure(params.xml()
                            .setFileName("config/config.xml"));
        } else {
            log.error("请配置 config/config.yaml 或者 config.xml 文件");
        }
        try {
            config = builder.getConfiguration();
        } catch (ConfigurationException e) {
            log.error(e.getMessage(), e);
        }

        log.debug("ConfigHelper() - end"); //$NON-NLS-1$

    }

    public static Configuration getConfig() {
        return config;
    }


    /**
     * 设置属性项目
     *
     * @param key
     * @param value
     *
     * @throws ConfigurationException
     */
    public static void setProperty(String key, Object value) throws ConfigurationException {
        config.setProperty(key, value);
        builder.save();
    }


    /**
     * 移除一个配置项
     *
     * @param key 需要移除内容的 key 值
     *
     * @throws ConfigurationException
     */
    public static void removeProperty(String key) throws ConfigurationException {
        config.clearProperty(key);
        builder.save();
    }

}
