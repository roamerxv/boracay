package pers.roamer.boracay.websample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@SpringBootApplication // same as @Configuration @EnableAutoConfiguration @ComponentScan
@ImportResource(locations={"classpath:boracay-config.xml"})
@ComponentScan("pers.roamer.boracay")
@EnableJpaRepositories("pers.roamer.boracay")
@EntityScan("pers.roamer.boracay.entity")
public class BoracayWebSampleApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(BoracayWebSampleApplication.class, args);
    }

//    @Override
//    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
//        return builder.sources(this.getClass());
//    }


    @RequestMapping("/")
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView("/index");
        return modelAndView;
    }
}
