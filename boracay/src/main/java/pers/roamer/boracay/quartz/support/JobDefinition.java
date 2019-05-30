package pers.roamer.boracay.quartz.support;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import pers.roamer.boracay.quartz.config.Const;

import java.io.Serializable;

/** @author zouwei */
@Slf4j
@Data
public abstract class JobDefinition extends Key implements Serializable {

    private static final long serialVersionUID = -8355775738649736514L;
    /** 任务ID(要求全局唯一，包括集群范围内) */
    private String jobId;
    /** 任务描述 */
    private String description;
    /** 假设时间间隔很短，上一次任务还没执行完毕，是否并行执行这次任务 */
    private boolean isConcurrent;
    /** 类名 */
    private String className;
    /** spring容器中的bean名称 */
    private String springId;
    /** 方法名称 */
    private String methodName;
    /** 方法参数(只能是json) */
    private String methodArg;
    /** 创建时间 */
    private long createTime;
    /** 更新时间 */
    private long updateTime;

    /**
     * 添加或修改
     *
     * @param scheduler
     */
    public void scheduleJob(Scheduler scheduler) {
        TriggerKey triggerKey = triggerKey();
        JobDetail jobDetail = jobDetail();
        Trigger trigger = trigger(jobDetail);
        try {
            scheduler.addJob(jobDetail, true, true);
            if (scheduler.checkExists(triggerKey)) {
                scheduler.rescheduleJob(triggerKey, trigger);
            } else {
                scheduler.scheduleJob(trigger);
            }
        } catch (SchedulerException e) {
            throw new IllegalArgumentException(e);
        }
    }

    /**
     * 创建Trigger
     *
     * @param jobDetail
     * @return
     */
    protected abstract Trigger trigger(JobDetail jobDetail);

    /**
     * 创建jobDetail
     *
     * @return
     */
    private JobDetail jobDetail() {
        JobDetail jobDetail =
                JobBuilder.newJob(
                                isConcurrent()
                                        ? ConcurrentQuartzJob.class
                                        : DisallowConcurrentQuartzJob.class)
                        .withIdentity(jobKey())
                        .withDescription(getDescription())
                        .build();
        jobDetail.getJobDataMap().put(Const.JOB_DATA_KEY, this);
        return jobDetail;
    }
}
