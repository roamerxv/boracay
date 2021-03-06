/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.datatables;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;
import pers.roamer.boracay.helper.JsonUtilsHelper;

import java.text.MessageFormat;
import java.util.List;

/**
 * 转换 dataTables 的 Request 对象的 javabean
 *
 * @author roamer - 徐泽宇
 * @version 1.0.0 2017-06-2017/6/21 下午5:44
 */
@Data
@Slf4j
@EqualsAndHashCode(callSuper = false)
public class DataTablesRequest {
  /**
   * Draw counter. This is used by DataTables to ensure that the Ajax returns from server-side
   * processing requests are drawn in sequence by DataTables (Ajax requests are asynchronous and
   * thus can return out of sequence). This is used as part of the draw return parameter (see
   * below).
   */
  private int draw;

  /**
   * Paging first record indicator. This is the start point in the current data set (0 index based -
   * i.e. 0 is the first record).
   */
  private int start;

  /**
   * Number of records that the table can display in the current draw. It is expected that the
   * number of records returned will be equal to this number, unless the server has fewer records to
   * return. Note that this can be -1 to indicate that all records should be returned (although that
   * negates any benefits of server-side processing!)
   */
  private int length;

  /** @see Search */
  private Search search;

  /** @see Order */
  @JsonProperty("order")
  private List<Order> order;

  /** @see Column */
  private List<Column> columns;

  /**
   * 获取 log 字符串
   *
   * @return
   */
  public String logString() {
    String this2Json = "";
    try {
      this2Json = JsonUtilsHelper.objectToJsonString(this);
    } catch (JsonProcessingException e) {
      log.error(e.getMessage());
    }
    String message =
        "传入的参数转换成的json字符串是:{0}\n"
            + "分析后获取的关键值分别是是:\n"
            + "draw值是:{1}\n"
            + "起始记录数是{2}\n"
            + "从第{3}页开始\n"
            + "每页有{4}条记录\n"
            + "模糊查询关键词是:{5}\n"
            + "排序列标号是:{6}\n"
            + "排序列名称是:{7}\n"
            + "排序的类型是{8}";
    Object[] array =
        new Object[] {
          this2Json,
          draw,
          start,
          start / length,
          length,
          search.getValue(),
          order.get(0).getColumn(),
          columns.get(order.get(0).getColumn()).getData(),
          order.get(0).getDir()
        };
    String m_rtn = "";
    try {
      m_rtn = MessageFormat.format(message, array);
    } catch (Exception e) {
      log.warn(e.getMessage());
    }
    return m_rtn;
  }
}
