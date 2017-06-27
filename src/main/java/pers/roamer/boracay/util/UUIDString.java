package pers.roamer.boracay.util;

import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * 
  * @ClassName: UUIDString
  * @Description: UUID的工具类
  * @author  徐泽宇
  * @date 2016年12月21日 下午3:27:30
  *
 */
public class UUIDString {
    
    private UUIDString(){
        //Nothings to do
    }

    /**
     * 
      * genShortUUID
      * 
      * @Auther 徐泽宇
      * @Date   2016年12月21日 下午3:28:59
      * @Title: genShortUUID
      * @Description: 生成一个基于UUID的短字符串
      * @return
     */
    public static String genShortUUID(){
        SecureRandom rand =new SecureRandom();
        SimpleDateFormat sdf = new SimpleDateFormat("ddMMyyyyHHmmssSSS");
        return new StringBuffer(sdf.format(new Date())).append(Integer.toString(rand.nextInt(1000))).toString();
    }

    /**
     * 生成一个系统的 UUID 字符串
     * @return
     */
    public static String genUUID(){
        return  UUID.randomUUID().toString().replace("-", "");
    }

}
