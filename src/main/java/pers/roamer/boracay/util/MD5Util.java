package pers.roamer.boracay.util;


import pers.roamer.boracay.BoracayException;

import java.math.BigInteger;
import java.security.MessageDigest;

/**
 * MD5 工具类
 *
 * @author roamer - 徐泽宇
 * @create 2017-05-2017/5/15  下午3:21
 */
public class MD5Util {
    private MD5Util() {
        //do nothings
    }

    /**
     * 对字符串md5加密
     *
     * @param str
     *
     * @return
     */
    public static String getMD5(String str) throws BoracayException {
        try {
            // 生成一个MD5加密计算摘要
            MessageDigest md = MessageDigest.getInstance("MD5");
            // 计算md5函数
            md.update(str.getBytes());
            // digest()最后确定返回md5 hash值，返回值为8为字符串。因为md5 hash值是16位的hex值，实际上就是8位的字符
            // BigInteger函数则将8位的字符串转换成16位hex值，用字符串来表示；得到字符串形式的hash值
            return new BigInteger(1, md.digest()).toString(16);
        } catch (Exception e) {
            throw new BoracayException("MD5 error");
        }
    }
}
