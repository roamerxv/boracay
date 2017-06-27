package pers.roamer.boracay.helper;

import java.util.List;


public class PageResult<T> {
    /**
     * 总页数
     */
    private int pageCount;
    /**
     * 每页条数
     */
    private int pageSize;
    /**
     * 当前页数
     */
    private int pageNo;

    /**
     * 总个数
     */
    private long totalCount;
    /**
     * 分页结果
     */
    private List<T> result;

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public List<T> getResult() {
        return result;
    }

    public void setResult(List<T> result) {
        this.result = result;
    }


    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    @Override
    public String toString() {
        return "PageResult{" +
                "pageCount=" + pageCount +
                ", pageSize=" + pageSize +
                ", pageNo=" + pageNo +
                ", totalCount=" + totalCount +
                ", result=" + result +
                '}';
    }
}
