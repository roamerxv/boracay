/**
 * @program: boracay
 * @description: 缩略图生成的测试类
 * @author: roamer-徐泽宇
 * @create: 2020-06-23 12:22
 */
package pers.roamer.boracay.util;

import org.junit.Test;
import pers.roamer.boracay.util.web.WebpFileUtils;

import java.io.File;

/** @Author: 徐泽宇(roamer) @Description: @Date: Created in 12:22 下午 2020/6/23 @Modified By: */
public class ThumbnailsTest {

  @Test
  /** 测试 webp 文件生成缩略图的功能 */
  public void testWebpThumbnails() throws Exception {
    String inputWebpPath = "/Users/roamer/Downloads/ii.webp";
    String outputWebpPath = "/Users/roamer/Downloads/bb_thumb.webp";
    WebpFileUtils.thumbnails(new File(inputWebpPath), 10000, 10000, outputWebpPath);
  }
}
