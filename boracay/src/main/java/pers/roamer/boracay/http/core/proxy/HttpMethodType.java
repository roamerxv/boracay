package pers.roamer.boracay.http.core.proxy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import pers.roamer.boracay.http.core.factory.BaseOkHttpClientFactory;
import pers.roamer.boracay.http.core.handler.RequestParamsHandler;

@Getter
@AllArgsConstructor
public class HttpMethodType {

    private final String url;

    private final BaseOkHttpClientFactory okHttpClientFactory;

    private final Class<? extends RequestParamsHandler> handlerClass;

    private final MethodType methodType;

    enum MethodType {
        GET,
        HEAD,
        POST,
        PUT,
        DELETE,
        PATCH,
        WS
    }
}
