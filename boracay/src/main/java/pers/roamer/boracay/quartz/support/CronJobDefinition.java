package pers.roamer.boracay.quartz.support;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.quartz.CronScheduleBuilder;
import org.quartz.JobDetail;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;

/** @author zouwei */
@Slf4j
@Data
public class CronJobDefinition extends JobDefinition {

    private static final long serialVersionUID = 6940446397330926681L;

    /** 执行策略 */
    private String cronExpression;

    @Override
    protected Trigger trigger(JobDetail jobDetail) {
        return TriggerBuilder.newTrigger()
                .forJob(jobDetail)
                .withIdentity(triggerKey())
                .withSchedule(CronScheduleBuilder.cronSchedule(getCronExpression()))
                .build();
    }
}
