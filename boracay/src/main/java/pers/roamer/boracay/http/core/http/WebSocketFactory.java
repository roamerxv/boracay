package pers.roamer.boracay.http.core.http;

import lombok.extern.slf4j.Slf4j;
import okhttp3.Request;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;
import pers.roamer.boracay.http.core.factory.BaseOkHttpClientFactory;

import java.io.File;
import java.util.Map;

/** @author zouwei */
@Slf4j
public class WebSocketFactory extends AbstractHttp {
    /**
     * 构造函数
     *
     * @param okHttpClientFactory
     */
    public WebSocketFactory(BaseOkHttpClientFactory okHttpClientFactory) {
        super(okHttpClientFactory);
    }

    /**
     * 创建并缓存WebSocket
     *
     * @param url
     * @param listener
     * @return
     */
    public WebSocket createWebSocket(String url, WebSocketListener listener) {
        return okHttpClient().newWebSocket(newRequest(url), listener);
    }

    /**
     * 创建Request
     *
     * @param url
     * @return
     */
    private Request newRequest(String url) {
        return new Request.Builder().url(url).build();
    }

    /**
     * 空实现，因为和http发请求不同
     *
     * @param builder
     * @param url
     * @param params
     * @param files
     * @param progressListener
     */
    @Override
    protected void enhanceRequestBuilder(
            Request.Builder builder,
            String url,
            Map<String, Object> params,
            Map<String, File[]> files,
            ProgressListener progressListener) {}
}
