package pers.roamer.boracay.quartz.support;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.PersistJobDataAfterExecution;
import org.springframework.scheduling.quartz.QuartzJobBean;
import pers.roamer.boracay.quartz.config.Const;
import pers.roamer.boracay.quartz.core.JobActuator;

/** @author zouwei */
@PersistJobDataAfterExecution
public class ConcurrentQuartzJob extends QuartzJobBean {
    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        JobDefinition task = (JobDefinition) context.getMergedJobDataMap().get(Const.JOB_DATA_KEY);
        try {
            JobActuator.invoke(task);
        } catch (Exception e) {
            throw new JobExecutionException(e);
        }
    }
}
