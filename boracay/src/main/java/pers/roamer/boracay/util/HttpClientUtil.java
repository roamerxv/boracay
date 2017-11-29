/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpResponse;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.concurrent.FutureCallback;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
import org.apache.http.impl.nio.client.HttpAsyncClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;


/**
 * HttpClient 工具类
 *
 * @author 徐泽宇
 * @since 1.0.2 2017/7/4 下午7:12
 */
@Slf4j
public class HttpClientUtil {
    private static final String URL_ENCODING = "UTF-8";

    private static ObjectMapper objectMapper;
    private static String pattern = "yyyy-MM-dd HH:mm:ss";
    private static DateFormat dateFormat = new SimpleDateFormat(pattern);


    private HttpClientUtil() {

    }


    static {
        objectMapper = new ObjectMapper();
        objectMapper.setDateFormat(dateFormat);
    }

    /**
     * <p>
     * Title: doGetWithParam
     * </p>
     * <p>
     * Description: 发送带参数get请求
     * </p>
     *
     * @param url   发送get请求url
     * @param param 发送get请求参数
     *
     * @return String 请求结果
     */
    public static String doGetWithParam(String url, Map<String, String> param) throws UtilException {
        String res = "";
        CloseableHttpClient httpclient = HttpClients.createDefault();
        try {
            URIBuilder uriBuilder;
            uriBuilder = new URIBuilder(url);
            if (param != null) {
                for (Map.Entry<String, String> e : param.entrySet()) {
                    uriBuilder.addParameter(e.getKey(), param.get(e.getKey()));
                }
            }

            HttpGet get = new HttpGet(uriBuilder.build());
            CloseableHttpResponse response;
            response = httpclient.execute(get);
            res = EntityUtils.toString(response.getEntity(), URL_ENCODING);
            response.close();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new UtilException(e.getMessage());
        } finally {
            try {
                httpclient.close();
            } catch (IOException e) {
                log.error(e.getMessage(), e);
            }
        }
        return res;
    }

    /**
     * <p>
     * Title: doGet
     * </p>
     * <p>
     * Description: 发送不带参数的get请求
     * </p>
     *
     * @param url 发送get请求url
     *
     * @return String 请求结果
     *
     * @throws IOException
     * @throws
     * @throws Exception
     * @author:邹伟
     */
    public static String doGet(String url) throws UtilException {
        return doGetWithParam(url, null);
    }

    /**
     * <p>
     * Title: doGetWithParamToObject
     * </p>
     * <p>
     * Description: 发送带参数get请求，并将结果转换成指定类型
     * </p>
     *
     * @param url   请求url
     * @param param 请求参数（可为null）
     * @param type  指定的返回类型
     *
     * @return
     *
     * @throws Exception
     * @author:邹伟
     */
    public static <T> T doGetWithParamToObject(String url, Map<String, String> param, Class<T> type) throws UtilException {
        String str = doGetWithParam(url, param);
        return resultToObject(str, type);
    }

    /**
     * <p>
     * Title: doGetToObject
     * </p>
     * <p>
     * Description: 发送不带参数get请求，并将结果转换成指定类型
     * </p>
     *
     * @param url  请求url
     * @param type 指定的返回类型
     *
     * @return
     *
     * @throws Exception
     * @author:邹伟
     */
    public static <T> T doGetToObject(String url, Class<T> type) throws UtilException {
        String str = doGetWithParam(url, null);
        return resultToObject(str, type);
    }

    /**
     * <p>
     * Title: doPostWithParam
     * </p>
     * <p>
     * Description: 发送带参数的post请求
     * </p>
     *
     * @param url   发送post请求url
     * @param param 发送post请求参数
     *
     * @return String 请求结果
     *
     * @throws Exception
     * @author:邹伟
     */
    public static String doPostWithParam(String url, Map<String, String> param) throws UtilException {
        CloseableHttpClient httpclient = HttpClients.createDefault();
        String res = "";
        try {
            HttpPost post = new HttpPost(url);

            if (param != null) {
                List<BasicNameValuePair> kvList = new ArrayList<>();
                for (Map.Entry<String, String> e : param.entrySet()) {
                    kvList.add(new BasicNameValuePair(e.getKey(), param.get(e.getKey())));
                }
                StringEntity entity = new UrlEncodedFormEntity(kvList, URL_ENCODING);
                post.setEntity(entity);
            }
            CloseableHttpResponse response = httpclient.execute(post);
            res = EntityUtils.toString(response.getEntity(), "utf-8");
            response.close();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new UtilException(e.getMessage());
        } finally {
            try {
                httpclient.close();
            } catch (IOException e) {
                log.error(e.getMessage(), e);
            }
        }
        return res;
    }

    public static String doPostWithParam(String url, String requestMethod, Map<String, String> param) throws UtilException {
        CloseableHttpClient httpclient = HttpClients.createDefault();
        String res = "";
        try {
            HttpPost post = new HttpPost(url);

            if (param != null) {
                List<BasicNameValuePair> kvList = new ArrayList<>();
                for (Map.Entry<String, String> e : param.entrySet()) {
                    kvList.add(new BasicNameValuePair(e.getKey(), param.get(e.getKey())));
                }
                StringEntity entity = new UrlEncodedFormEntity(kvList, URL_ENCODING);
                post.setEntity(entity);
            }
            CloseableHttpResponse response = httpclient.execute(post);
            res = EntityUtils.toString(response.getEntity(), "utf-8");
            response.close();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new UtilException(e.getMessage());
        } finally {
            try {
                httpclient.close();
            } catch (IOException e) {
                log.error(e.getMessage(), e);
            }
        }


        return res;
    }

    /**
     * 异步发送post请求
     *
     * @param url
     * @param param
     *
     * @throws UtilException
     */
    public static void doAsyncPostWithParam(String url, Map<String, String> param) throws UtilException {
        CloseableHttpAsyncClient httpclient = HttpAsyncClients.createDefault();
        httpclient.start();
        final CountDownLatch latch = new CountDownLatch(1);
        HttpPost post = new HttpPost(url);
        if (param != null) {
            List<BasicNameValuePair> kvList = new ArrayList<>();
            for (Map.Entry<String, String> e : param.entrySet()) {
                kvList.add(new BasicNameValuePair(e.getKey(), param.get(e.getKey())));
            }
            try {
                post.setEntity(new UrlEncodedFormEntity(kvList, URL_ENCODING));
            } catch (Exception e) {
                log.error(e.getMessage(), e);
                throw new UtilException(e.getMessage());
            }
        }
        httpclient.execute(post, new FutureCallback<HttpResponse>() {
            public void completed(final HttpResponse response) {
                latch.countDown();
                try {
                    String content = EntityUtils.toString(response.getEntity(), "UTF-8");
                    log.debug(content);

                } catch (IOException e) {
                    log.error(e.getMessage(), e);
                }
            }

            public void failed(final Exception ex) {
                latch.countDown();
            }

            public void cancelled() {
                latch.countDown();
            }
        });
        try {
            latch.await();
        } catch (InterruptedException e) {
            log.error(e.getMessage(), e);
            throw new UtilException(e.getMessage());
        }
        try {
            httpclient.close();
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            throw new UtilException(e.getMessage());
        }
    }


    /**
     * <p>
     * Title: doPost
     * </p>
     * <p>
     * Description: 发送不带参数post请求
     * </p>
     *
     * @param url 发送post请求url
     *
     * @return String 请求结果
     *
     * @throws Exception
     * @author:邹伟
     */
    public static String doPost(String url) throws UtilException {
        return doPostWithParam(url, null);
    }

    /**
     * <p>
     * Title: doPostWithParamToObject
     * </p>
     * <p>
     * Description: 发送带参数post请求，并将结果转换成指定类型
     * </p>
     *
     * @param url   请求url
     * @param param 请求参数（可为null）
     * @param type  指定的返回类型
     *
     * @return
     *
     * @throws Exception
     * @author:邹伟
     */
    public static <T> T doPostWithParamToObject(String url, Map<String, String> param, Class<T> type) throws UtilException {
        String str = doPostWithParam(url, param);
        return resultToObject(str, type);
    }

    /**
     * <p>
     * Title: doPostToObject
     * </p>
     * <p>
     * Description: 发送不带参数post请求，并将结果转换成指定类型
     * </p>
     *
     * @param url  请求url
     * @param type 指定的返回类型
     *
     * @return
     *
     * @throws Exception
     * @author:邹伟
     */
    public static <T> T doPostToObject(String url, Class<T> type) throws UtilException {
        String str = doPostWithParam(url, null);
        return resultToObject(str, type);
    }

    /**
     * <p>
     * Title: resultToObject
     * </p>
     * <p>
     * Description: 将字符串转换成对指定的类型
     * </p>
     *
     * @param str  需要转换的字符串
     * @param type 目标类型
     *
     * @return
     *
     * @throws IOException
     * @author:邹伟
     */
    private static <T> T resultToObject(String str, Class<T> type) throws UtilException {
        T obj = null;
        try {
            obj = objectMapper.readValue(str, type);
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            throw new UtilException(e.getMessage());
        }
        return obj;
    }
}
