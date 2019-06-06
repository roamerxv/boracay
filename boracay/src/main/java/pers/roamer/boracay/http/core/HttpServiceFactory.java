package pers.roamer.boracay.http.core;

/** @author zouwei */
public interface HttpServiceFactory {

    /**
     * 获取代理对象
     *
     * @param type
     * @param <T>
     * @return
     */
    <T> T getSimpleHttpService(Class<T> type);
}
