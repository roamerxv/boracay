package pers.roamer.boracay.quartz.support;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.TriggerKey;

/** @author zouwei */
@Slf4j
@Data
public class Key{

    protected static final String DEFAULT_GROUP = "default_group";

    /** 任务名称 */
    private String name;
    /** 任务分组 */
    private String group;

    /**
     * 暂停触发器
     *
     * @param scheduler
     */
    public void pauseTrigger(Scheduler scheduler) {
        TriggerKey triggerKey = triggerKey();
        try {
            scheduler.pauseTrigger(triggerKey);
        } catch (SchedulerException e) {
            log.error("无法暂停触发器", e);
            throw new IllegalArgumentException(e);
        }
    }

    /**
     * 恢复触发器
     *
     * @param scheduler
     */
    public void resumeTrigger(Scheduler scheduler) {
        TriggerKey triggerKey = triggerKey();
        try {
            scheduler.resumeTrigger(triggerKey);
        } catch (SchedulerException e) {
            log.error("无法恢复触发器", e);
            throw new IllegalArgumentException(e);
        }
    }

    /**
     * 删除触发器
     *
     * @param scheduler
     */
    public boolean removeTrigger(Scheduler scheduler) {
        TriggerKey triggerKey = triggerKey();
        try {
            scheduler.pauseTrigger(triggerKey);
            return scheduler.unscheduleJob(triggerKey);
        } catch (SchedulerException e) {
            log.error("无法删除触发器", e);
            throw new IllegalArgumentException(e);
        }
    }

    /**
     * 暂停任务
     *
     * @param scheduler
     */
    public void pauseJob(Scheduler scheduler) {
        try {
            scheduler.pauseJob(jobKey());
        } catch (SchedulerException e) {
            log.error("无法暂停任务", e);
            throw new IllegalArgumentException(e);
        }
    }

    /**
     * 恢复任务
     *
     * @param scheduler
     */
    public void resumeJob(Scheduler scheduler) {
        try {
            scheduler.resumeJob(jobKey());
        } catch (SchedulerException e) {
            log.error("无法恢复任务", e);
            throw new IllegalArgumentException(e);
        }
    }

    /**
     * 删除任务
     *
     * @param scheduler
     * @return
     */
    public boolean removeJob(Scheduler scheduler) {
        JobKey jobKey = jobKey();
        try {
            scheduler.pauseJob(jobKey);
            return scheduler.deleteJob(jobKey);
        } catch (SchedulerException e) {
            log.error("无法删除任务", e);
            throw new IllegalArgumentException(e);
        }
    }

    protected TriggerKey triggerKey() {
        return new TriggerKey(getName(), getGroup());
    }

    protected JobKey jobKey() {
        return new JobKey(getName(), getGroup());
    }

    /**
     * 获取group
     *
     * @return
     */
    public String getGroup() {
        return StringUtils.isBlank(group) ? DEFAULT_GROUP : group;
    }
}
