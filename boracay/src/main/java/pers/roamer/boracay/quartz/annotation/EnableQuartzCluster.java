package pers.roamer.boracay.quartz.annotation;

import org.springframework.context.annotation.Import;
import pers.roamer.boracay.quartz.config.DynamicSchedulingConfigurationSelector;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Import(DynamicSchedulingConfigurationSelector.class)
public @interface EnableQuartzCluster {
}
