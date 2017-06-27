package pers.roamer.boracay.datatables;

import lombok.Data;

/**
 * @author roamer - 徐泽宇
 * @create 2017-06-2017/6/21  下午6:32
 */
@Data
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
