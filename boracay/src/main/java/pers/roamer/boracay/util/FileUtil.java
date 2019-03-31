package pers.roamer.boracay.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static org.apache.commons.codec.binary.Base64.encodeBase64;

/**
 * 对文件进行处理的一些工具方法
 *
 * @author roamer - 徐泽宇
 * @create 2017-09-2017/9/12 上午10:56
 */
public class FileUtil {

  /** 私有化 构造函数，以确保不被不安全的的 new 一个实例 */
  private FileUtil() {
    // do nothing
  };

  /**
   * 对文件进行 MD5方式的获取摘要
   *
   * @param file 需要获取摘要的文件
   * @return 摘要的字符串
   * @throws IOException
   * @throws NoSuchAlgorithmException
   */
  public static String getFileDigest(File file) throws IOException, NoSuchAlgorithmException {
    return getFileDigest(file, "MD5");
  }

  /**
   * 对输入流进行摘要，返回摘要的秘串
   *
   * @param inputStream
   * @return
   * @throws IOException
   * @throws NoSuchAlgorithmException
   */
  public static String getFileDigest(InputStream inputStream)
      throws IOException, NoSuchAlgorithmException {
    return getFileDigest(inputStream, "MD5");
  }

  /**
   * 对一个文件进行摘要，返回摘要的秘串
   *
   * @param file 需要获取摘要的文件
   * @param digestType 摘要类型
   * @return 摘要字符串
   * @throws IOException
   * @throws NoSuchAlgorithmException
   */
  public static String getFileDigest(File file, String digestType)
      throws IOException, NoSuchAlgorithmException {
    FileInputStream fis = new FileInputStream(file);
    return getFileDigest(fis, digestType);
  }

  /**
   * 对输入流进行摘要，返回摘要的秘串
   *
   * @param inputStream 需要获取摘要的输入流
   * @param digestType 摘要类型
   * @return 摘要字符串
   * @throws IOException
   * @throws NoSuchAlgorithmException
   */
  public static String getFileDigest(InputStream inputStream, String digestType)
      throws IOException, NoSuchAlgorithmException {
    MessageDigest digest = MessageDigest.getInstance(digestType);
    byte[] byteArray = new byte[256 * 1024];
    int bytesCount = 0;

    // Read file data and update in message digest
    while ((bytesCount = inputStream.read(byteArray)) != -1) {
      digest.update(byteArray, 0, bytesCount);
    }
    ;
    inputStream.close();

    // Get the hash's bytes
    byte[] bytes = digest.digest();

    // This bytes[] has bytes in decimal format;
    // Convert it to hexadecimal format
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < bytes.length; i++) {
      sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
    }

    // return complete hash
    return sb.toString();
  }

  /**
   * 对文件生成 base64的字符串
   *
   * @author 徐泽宇
   * @date 2018/5/12 下午8:31
   * @param file
   * @return java.lang.String
   * @throws
   */
  public static String fileToBase64(File file) throws IOException {
    byte[] content = new byte[(int) file.length()];
    FileInputStream finputstream = new FileInputStream(file);
    finputstream.read(content);
    finputstream.close();
    return new String(encodeBase64(content), StandardCharsets.UTF_8);
  }
}
