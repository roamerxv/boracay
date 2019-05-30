package pers.roamer.boracay.quartz.service;

import org.quartz.SchedulerException;
import pers.roamer.boracay.quartz.support.CronJobDefinition;
import pers.roamer.boracay.quartz.support.Key;
import pers.roamer.boracay.quartz.support.SimpleJobDefinition;

/** @author zouwei */
public interface IScheduleService {
    /** @param cronJobDefinition */
    void schedule(CronJobDefinition cronJobDefinition);

    /** @param simpleJobDefinition */
    void schedule(SimpleJobDefinition simpleJobDefinition);

    /**
     * 暂停触发器
     *
     * @param key
     */
    void pauseTrigger(Key key);

    /**
     * 恢复触发器
     *
     * @param key
     */
    void resumeTrigger(Key key);

    /**
     * 删除触发器
     *
     * @param key
     * @return
     */
    boolean removeTrigger(Key key);

    /**
     * 暂停任务
     *
     * @param key
     */
    void pauseJob(Key key);

    /**
     * 恢复任务
     *
     * @param key
     */
    void resumeJob(Key key);

    /**
     * 移除任务
     *
     * @param key
     * @return
     */
    boolean removeJob(Key key);

    /**
     * 清除所有任务
     * @throws SchedulerException
     */
    void clear() throws SchedulerException;
}
