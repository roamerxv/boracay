package pers.roamer.boracay.datatables;

import lombok.Data;

/**
 * @author roamer - 徐泽宇
 * @create 2017-06-2017/6/21  下午6:31
 */
@Data
public class Column {
    /**
     * Column's data source, as defined by columns.data.
     */
    private String data;

    /**
     * Column's name, as defined by columns.name.
     */
    private String name;

    /**
     * Flag to indicate if this column is searchable (true) or not (false). This is controlled by columns.searchable.
     */
    private boolean searchable;


    /**
     * Flag to indicate if this column is orderable (true) or not (false). This is controlled by columns.orderable.
     */
    private boolean orderable;

    /**
     * Search value to apply to this specific column.
     */
    private Search search;

}
