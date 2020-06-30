/**
 * @program: boracay
 * @description: ImageCheck 的测试类
 * @author: roamer-徐泽宇
 * @create: 2020-06-23 12:09
 */
package pers.roamer.boracay.util;

import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import pers.roamer.boracay.util.web.WebpFileUtils;

import java.io.File;

/** @Author: 徐泽宇(roamer) @Description: @Date: Created in 12:09 下午 2020/6/23 @Modified By: */
@Slf4j
public class ImageCheckTest {

  private static String inputFilePath = "/Users/roamer/Downloads/aa.webp";
  //  private static String inputFilePath = "/Users/roamer/Downloads/bb.jpg";

  @Test
  public void testImageCheck() {
    File file = new File(inputFilePath);
    log.debug(file.getAbsolutePath() + "是否为图片文件 " + new ImageCheck().isImage(file));
  }

  /**
   * 显示 文件的 metadata 信息
   *
   * @throws Exception
   */
  @Test
  public void getMetadata() throws Exception {
    Metadata metadata = ImageMetadataReader.readMetadata(new File(inputFilePath));
    for (Directory directory : metadata.getDirectories()) {
      for (Tag tag : directory.getTags()) {
        log.debug(tag.getTagTypeHex() + " " + tag.getTagName() + " is " + tag.getDescription());
      }
    }
  }

  @Test
  public void isWebpFile() throws Exception {
    log.debug(
        inputFilePath + " 是否是 webp 文件格式: " + WebpFileUtils.mimeTypeIsWebp(new File(inputFilePath)));
  }
}
