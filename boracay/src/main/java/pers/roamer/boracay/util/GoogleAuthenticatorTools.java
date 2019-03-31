package pers.roamer.boracay.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base32;
import org.apache.commons.codec.binary.Base64;
import pers.roamer.boracay.util.web.UrlUtil;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

/**
 * Google Authenticator二次验证的工具类
 *
 * @author roamer - 徐泽宇
 * @create 2017-12-2017/12/20 下午4:29
 */
@Slf4j
public class GoogleAuthenticatorTools {
  public static final int SECRET_SIZE = 10;

  public static final String SEED =
      "ftHZgQaZbyAPtKUFDyGYxGzQktTwnxwboeY6zkkgMamrjbFiBtGatnCbGXjARkgv";

  public static final String RANDOM_NUMBER_ALGORITHM = "SHA1PRNG";

  int window_size = 3; // default 3 - max 17 (from google docs)最多可偏移的时间

  public void setWindowSize(int s) {
    if (s >= 0 && s <= 17) window_size = s;
  }

  /**
   * 验证身份验证码是否正确
   *
   * @param codes 输入的身份验证码
   * @param savedSecret 密钥
   * @return
   */
  public static Boolean authcode(String codes, String savedSecret) {
    long code = 0;
    try {
      code = Long.parseLong(codes);
    } catch (Exception e) {
      e.printStackTrace();
    }
    long t = System.currentTimeMillis();
    GoogleAuthenticatorTools ga = new GoogleAuthenticatorTools();
    ga.setWindowSize(0); // should give value * 30  seconds of grace...
    boolean r = ga.check_code(savedSecret, code, t);
    return r;
  }

  /**
   * 生成密钥
   *
   * @return 密钥
   */
  public static String genSecret() throws UnsupportedEncodingException, NoSuchAlgorithmException {
    String secret = GoogleAuthenticatorTools.generateSecretKey();
    return secret;
  }

  private static String generateSecretKey() throws NoSuchAlgorithmException {
    SecureRandom sr = null;

    sr = SecureRandom.getInstance(RANDOM_NUMBER_ALGORITHM);
    sr.setSeed(Base64.decodeBase64(SEED));
    byte[] buffer = sr.generateSeed(SECRET_SIZE);
    Base32 codec = new Base32();
    byte[] bEncodedKey = codec.encode(buffer);
    String encodedKey = new String(bEncodedKey, StandardCharsets.UTF_8);
    return encodedKey;
  }

  /**
   * 获取getOptauth的内容。用于二维码图片的内容
   *
   * @param user 用户
   * @param issuer 域的描述（可以包含中文）
   * @param secret 密钥
   * @return 二维码内容
   */
  public static String getOptauth(String user, String issuer, String secret)
      throws UnsupportedEncodingException {
    String optauth =
        "otpauth://totp/%s?secret=%s&issuer=%s"; // 第一个参数是显示在 app 端密码下方，表示用户名和域 。第二个参数是秘钥，第三个参数是显示在
                                                 // app 端密码上方的文字。
    return String.format(optauth, user, secret, UrlUtil.getURLEncoderString(issuer));
  }

  private boolean check_code(String secret, long code, long timeMsec) {
    Base32 codec = new Base32();
    byte[] decodedKey = codec.decode(secret);
    long t = (timeMsec / 1000L) / 30L;
    for (int i = -window_size; i <= window_size; ++i) {
      long hash;
      try {
        hash = verify_code(decodedKey, t + i);
      } catch (Exception e) {
        log.error(e.getMessage(), e);
        throw new RuntimeException(e.getMessage());
      }
      if (hash == code) {
        return true;
      }
    }
    return false;
  }

  private static int verify_code(byte[] key, long t)
      throws NoSuchAlgorithmException, InvalidKeyException {
    byte[] data = new byte[8];
    long value = t;
    for (int i = 8; i-- > 0; value >>>= 8) {
      data[i] = (byte) value;
    }
    SecretKeySpec signKey = new SecretKeySpec(key, "HmacSHA1");
    Mac mac = Mac.getInstance("HmacSHA1");
    mac.init(signKey);
    byte[] hash = mac.doFinal(data);
    int offset = hash[20 - 1] & 0xF;
    long truncatedHash = 0;
    for (int i = 0; i < 4; ++i) {
      truncatedHash <<= 8;
      truncatedHash |= (hash[offset + i] & 0xFF);
    }
    truncatedHash &= 0x7FFFFFFF;
    truncatedHash %= 1000000;
    return (int) truncatedHash;
  }

  public static void main(String[] args)
      throws UnsupportedEncodingException, NoSuchAlgorithmException {
    /*
     * 注意：先运行前两步，获取密钥和二维码url。 然后只运行第三步，填写需要验证的验证码，和第一步生成的密钥
     */
    String user = "testUser@134.com";
    String issuer = "testHost中文";
    // 第一步：获取密钥
    String secret = genSecret();
    System.out.println("secret:" + secret);
    // 第二步：根据密钥获取二维码图片的文本内容（可忽略）
    String optauthContent = getOptauth(user, issuer, secret);
    System.out.println("生成二维码的内容是:" + optauthContent);
    // 第三步：验证（第一个参数是需要验证的验证码，第二个参数是第一步生成的secret运行）
    boolean result = authcode("698168", "XS7QXCTHFF22NXLD");
    System.out.println("result:" + result);
  }
}
