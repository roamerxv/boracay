package pers.roamer.boracay.datatables;

import lombok.Data;

/**
 * @author roamer - 徐泽宇
 * @create 2017-06-2017/6/21  下午6:32
 */
@Data
public class Search {
    /**
     * Global search value. To be applied to all columns which have searchable as true.
     */
    private String value;

    /**
     * <code>true</code> if the global filter should be treated as a regular expression for advanced searching, false otherwise. Note that normally server-side
     * processing scripts will not perform regular expression searching for performance reasons on large data sets, but it is technically possible and at the
     * discretion of your script.
     */
    private boolean regex;
}
