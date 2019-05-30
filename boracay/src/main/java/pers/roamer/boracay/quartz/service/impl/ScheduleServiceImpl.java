package pers.roamer.boracay.quartz.service.impl;

import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pers.roamer.boracay.quartz.service.IScheduleService;
import pers.roamer.boracay.quartz.support.CronJobDefinition;
import pers.roamer.boracay.quartz.support.Key;
import pers.roamer.boracay.quartz.support.SimpleJobDefinition;

/** @author zouwei */
@Service
public class ScheduleServiceImpl implements IScheduleService {

    @Autowired private Scheduler scheduler;

    @Override
    public void schedule(CronJobDefinition cronJobDefinition) {
        cronJobDefinition.scheduleJob(scheduler);
    }

    @Override
    public void schedule(SimpleJobDefinition simpleJobDefinition) {
        simpleJobDefinition.scheduleJob(scheduler);
    }

    /**
     * 暂停触发器
     *
     * @param key
     */
    @Override
    public void pauseTrigger(Key key) {
        key.pauseTrigger(scheduler);
    }

    /**
     * 恢复触发器
     *
     * @param key
     */
    @Override
    public void resumeTrigger(Key key) {
        key.resumeTrigger(scheduler);
    }

    /**
     * 移除触发器
     *
     * @param key
     * @return
     */
    @Override
    public boolean removeTrigger(Key key) {
        return key.removeTrigger(scheduler);
    }

    /**
     * 暂停任务
     *
     * @param key
     */
    @Override
    public void pauseJob(Key key) {
        key.pauseJob(scheduler);
    }

    /**
     * 恢复任务
     *
     * @param key
     */
    @Override
    public void resumeJob(Key key) {
        key.resumeJob(scheduler);
    }

    /**
     * 移除任务
     *
     * @param key
     * @return
     */
    @Override
    public boolean removeJob(Key key) {
        return key.removeJob(scheduler);
    }

    /**
     * 清除所有任务
     *
     * @throws SchedulerException
     */
    @Override
    public void clear() throws SchedulerException {
        scheduler.clear();
    }
}
