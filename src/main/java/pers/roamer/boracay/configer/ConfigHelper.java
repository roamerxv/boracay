/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.configer;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.configuration2.Configuration;
import org.apache.commons.configuration2.XMLConfiguration;
import org.apache.commons.configuration2.builder.FileBasedConfigurationBuilder;
import org.apache.commons.configuration2.builder.fluent.Parameters;
import org.apache.commons.configuration2.ex.ConfigurationException;


/**
 * 读取配置文件，获取系统全局配置参数
 *
 * @author 徐泽宇
 * @version 1.0.0 2017/6/29 下午5:22
 */
@Log4j2
public class ConfigHelper {

    private static FileBasedConfigurationBuilder<XMLConfiguration> builder;
    private static Configuration config;


    private ConfigHelper() {
        //do nothing
    }

    static {
        log.debug("ConfigHelper() - start"); //$NON-NLS-1$
        Parameters params = new Parameters();
        builder = new FileBasedConfigurationBuilder<XMLConfiguration>(XMLConfiguration.class)
                .configure(params.xml()
                        .setFileName("config/config.xml"));
        try {
            config = builder.getConfiguration();
        } catch (ConfigurationException cex) {
            log.error(cex, cex.fillInStackTrace()); //$NON-NLS-1$
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
     * @exception ConfigurationException
     */
    public static void setProperty(String key, Object value) throws ConfigurationException {
        config.setProperty(key, value);
        builder.save();
    }


    /**
     * 移除一个配置项
     *
     * @param key   需要移除内容的 key 值
     *
     * @exception ConfigurationException
     */
    public static void removeProperty(String key) throws ConfigurationException {
        config.clearProperty(key);
        builder.save();
    }

}
