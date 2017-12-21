/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.datatables;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author roamer - 徐泽宇
 * @version  2017-06-2017/6/21  下午6:32
 */
@Data
@EqualsAndHashCode(callSuper=false)
public class Order {
    /**
     * Column to which ordering should be applied. This is an index reference to the columns array of information that is also submitted to the server.
     */
    private int column;

    /**
     * Ordering direction for this column. It will be <code>asc</code> or <code>desc</code> to indicate ascending ordering or descending ordering,
     * respectively.
     */
    private String dir;
}
