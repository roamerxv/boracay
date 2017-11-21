package pers.roamer.boracay.configer;

import lombok.extern.log4j.Log4j2;
import org.junit.Test;
import org.springframework.core.io.ClassPathResource;

/**
 * @author roamer - 徐泽宇
 * @create 2017-11-2017/11/21  下午3:42
 */

@Log4j2
public class ConfigerTest {

    @Test
    public void testConfigerInit(){
        if ( new ClassPathResource("config/config.yaml").exists()) {
            log.info("在 classpath 中发现config/config.yaml文件！以此为配置文件");
        }else if (new ClassPathResource("config/config.xml").exists()){
            log.info("在 classpath 中发现config/config.xml文件！以此为配置文件");
        }
        log.debug(ConfigHelper.getConfig().getString("Configer.System.AppName"));
    }

}
