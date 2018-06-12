package pers.roamer.boracay.util.web;

import lombok.extern.slf4j.Slf4j;

import java.io.UnsupportedEncodingException;

/**
 * URL
 *
 * @author roamer - 徐泽宇
 * @create 2017-12-2017/12/20  下午5:37
 */
@Slf4j
public class UrlUtil {
    private final static String ENCODE = "UTF-8";

    /**
     * URL 解码
     *
     * @return String
     *
     * @author lifq
     * @date 2015-3-17 下午04:09:51
     */
    public static String getURLDecoderString(String str) throws UnsupportedEncodingException {
        String result = "";
        if (null == str) {
            return "";
        }
        result = java.net.URLDecoder.decode(str, ENCODE);

        return result;
    }

    /**
     * URL 转码
     *
     * @return String
     *
     * @author lifq
     * @date 2015-3-17 下午04:10:28
     */
    public static String getURLEncoderString(String str) throws UnsupportedEncodingException {
        String result = "";
        if (null == str) {
            return "";
        }
        result = java.net.URLEncoder.encode(str, ENCODE);

        return result;
    }
}
