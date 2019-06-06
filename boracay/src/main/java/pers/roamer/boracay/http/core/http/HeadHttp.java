package pers.roamer.boracay.http.core.http;

import okhttp3.Request;
import pers.roamer.boracay.http.core.factory.BaseOkHttpClientFactory;

import java.io.File;
import java.util.Map;

/** @author zouwei */
public class HeadHttp extends GetHttp {
    /**
     * 构造函数
     *
     * @param okHttpClientFactory
     */
    public HeadHttp(BaseOkHttpClientFactory okHttpClientFactory) {
        super(okHttpClientFactory);
    }

    @Override
    protected void enhanceRequestBuilder(
            Request.Builder builder,
            String url,
            Map<String, Object> params,
            Map<String, File[]> files,
            ProgressListener progressListener) {
        builder.head();
    }
}
