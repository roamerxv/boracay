package pers.roamer.boracay.http.core.http;

import okhttp3.Request;
import okhttp3.RequestBody;
import pers.roamer.boracay.http.core.factory.BaseOkHttpClientFactory;
import pers.roamer.boracay.http.core.handler.RequestParamsHandler;

import java.io.File;
import java.util.Map;
import java.util.Objects;

/** @author zouwei */
public class PutHttp extends PostHttp {

    /**
     * 构造函数
     *
     * @param okHttpClientFactory
     */
    public PutHttp(BaseOkHttpClientFactory okHttpClientFactory) {
        super(okHttpClientFactory);
    }
    /**
     * 构造函数
     *
     * @param okHttpClientFactory
     * @param clazz
     */
    public PutHttp(
            BaseOkHttpClientFactory okHttpClientFactory,
            Class<? extends RequestParamsHandler> clazz) {
        super(okHttpClientFactory, clazz);
    }

    @Override
    protected void enhanceRequestBuilder(
            Request.Builder builder,
            String url,
            Map<String, Object> params,
            Map<String, File[]> files,
            ProgressListener progressListener) {
        RequestBody requestBody = handleRequestBody(params, files, progressListener);
        if (Objects.isNull(requestBody)) {
            throw new IllegalArgumentException("请求体不能为空");
        }
        builder.put(requestBody);
    }
}
