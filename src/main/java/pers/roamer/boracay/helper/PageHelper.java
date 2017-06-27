package pers.roamer.boracay.helper;

import java.util.List;

public class PageHelper {

    private PageHelper() {

    }

    public static <T> PageResultBuilder<T> pageResult(List<T> value) {
        return new PageResultBuilder<>(value);
    }

    public static class PageResultBuilder<T> {
        private PageResult<T> result = new PageResult<>();

        public PageResultBuilder(List<T> value) {
            this.result.setResult(value);
        }

        public PageResultBuilder<T> pageNo(int pageNo) {
            this.result.setPageNo(pageNo);
            return this;
        }

        public PageResultBuilder<T> pageCount(int pageCount) {
            this.result.setPageCount(pageCount);
            return this;
        }

        public PageResultBuilder<T> pageSize(int pageSize) {
            this.result.setPageSize(pageSize);
            return this;
        }

        public PageResultBuilder<T> totalCount(long totalCount) {
            this.result.setTotalCount(totalCount);
            return this;
        }

        public PageResult<T> build() {
            return this.result;
        }

    }

}
