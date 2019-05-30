package pers.roamer.boracay.quartz.support;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDetail;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;

import java.util.Date;

/** @author zouwei */
@Slf4j
@Data
public class SimpleJobDefinition extends JobDefinition {

    private static final long serialVersionUID = 6940446397330926681L;

    /** 开始时间 */
    private long startTime;
    /** 结束时间 */
    private long endTime;
    /** 重复次数 */
    private int repeatCount;

    /** 时间间隔(单位：秒) */
    private int repeatIntervalInSeconds;

    @Override
    protected Trigger trigger(JobDetail jobDetail) {
        return TriggerBuilder.newTrigger()
                .forJob(jobDetail)
                .withIdentity(triggerKey())
                .withSchedule(
                        SimpleScheduleBuilder.simpleSchedule()
                                .withRepeatCount(getRepeatCount())
                                .withIntervalInSeconds(getRepeatIntervalInSeconds()))
                .startAt(new Date(getStartTime()))
                .endAt(new Date(getEndTime()))
                .build();
    }
}
