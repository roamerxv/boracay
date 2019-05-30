package pers.roamer.boracay.quartz.config;

import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

import java.util.Objects;

/** @author zouwei */
@Slf4j
public class SchedulerConfiguration {

    /** 保证ApplicationContextUtil在Scheduler之前加载 */
    @Autowired private ApplicationContextUtil applicationContextUtil;

    @Autowired(required = false)
    private SchedulerListener schedulerListener;

    @Autowired(required = false)
    private TriggerListener triggerListener;

    @Autowired(required = false)
    private JobListener jobListener;

    @Bean(name = "scheduler", initMethod = "start", destroyMethod = "shutdown")
    public Scheduler scheduler(@Autowired SchedulerFactoryBean schedulerFactoryBean)
            throws SchedulerException {
        Scheduler scheduler = schedulerFactoryBean.getScheduler();
        if (!Objects.isNull(schedulerListener)) {
            scheduler.getListenerManager().addSchedulerListener(schedulerListener);
        }
        if (!Objects.isNull(triggerListener)) {
            scheduler.getListenerManager().addTriggerListener(triggerListener);
        }
        if (!Objects.isNull(jobListener)) {
            scheduler.getListenerManager().addJobListener(jobListener);
        }
        return scheduler;
    }
}
