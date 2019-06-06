package pers.roamer.boracay.http.core.factory;

import okhttp3.OkHttpClient;

/**
 * 默认的OkHttpClient
 *
 * @author zouwei
 */
public class DefaultOkHttpClientFactory extends BaseOkHttpClientFactory {
    @Override
    protected OkHttpClient httpClient() {
        return new OkHttpClient();
    }
}
