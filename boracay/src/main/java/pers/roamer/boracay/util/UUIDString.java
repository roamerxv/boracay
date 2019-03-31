/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.util;

import java.util.UUID;

/**
 * UUID的工具类
 *
 * @author 徐泽宇
 * @version 1.0.0
 * @since 1.0.0 2016年12月21日 下午3:27:30
 */
public class UUIDString {

  private static String[] chars =
      new String[] {
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
        "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X", "Y", "Z"
      };

  /**
   * 私有化 构造函数，以确保不被不安全的的 new 一个实例
   *
   * @author 徐泽宇
   * @since 1.0.0 2016年10月21日 下午3:56:44
   */
  private UUIDString() {
    // Nothings to do
  }

  /**
   * 生成一个基于UUID的短字符串
   *
   * @author 徐泽宇
   * @date 2018/6/6 下午5:57
   * @return java.lang.String
   * @since 2.2.10
   */
  public static String generateShortUuid() {
    StringBuffer shortBuffer = new StringBuffer();
    String uuid = UUID.randomUUID().toString().replace("-", "");
    for (int i = 0; i < 8; i++) {
      String str = uuid.substring(i * 4, i * 4 + 4);
      int x = Integer.parseInt(str, 16);
      shortBuffer.append(chars[x % 0x3E]);
    }
    return shortBuffer.toString();
  }

  /**
   * 生成一个系统的 UUID 字符串
   *
   * @return UUID 字符串
   * @author 徐泽宇
   * @since 1.0.0 2016年12月21日 下午3:27:30
   */
  public static String genUUID() {
    return UUID.randomUUID().toString().replace("-", "");
  }
}
