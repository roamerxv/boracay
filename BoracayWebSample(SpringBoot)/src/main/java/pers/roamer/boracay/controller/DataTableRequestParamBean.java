package pers.roamer.boracay.controller;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;
import pers.roamer.boracay.datatables.DataTablesRequest;

import java.text.MessageFormat;

/**
 * @author roamer - 徐泽宇
 * @create 2017-06-2017/6/22  下午12:27
 */
@Data
@Slf4j
@EqualsAndHashCode(callSuper = false)
public class DataTableRequestParamBean extends DataTablesRequest {
    private String beginTime;
    private String endTime;


    public String logString() {
        String m_rtn = "";
        String message =   "\n记录开始时间{0}\n记录结束时间{1}";
        Object[] array = new Object[]{beginTime, endTime};
        try {
            m_rtn = MessageFormat.format(message, array);
        } catch (Exception e) {
            log.warn(e.getMessage(), e);
        }
        return super.logString()+m_rtn;
    }
}
