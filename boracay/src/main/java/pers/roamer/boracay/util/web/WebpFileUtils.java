/**
 * @program: boracay
 * @description: Webp 文件的工具类
 * @author: roamer-徐泽宇
 * @create: 2020-06-30 17:46
 */
package pers.roamer.boracay.util.web;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import com.luciad.imageio.webp.WebPReadParam;
import com.luciad.imageio.webp.WebPWriteParam;
import lombok.extern.slf4j.Slf4j;
import pers.roamer.boracay.util.UtilException;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.ImageWriter;
import javax.imageio.stream.FileImageInputStream;
import javax.imageio.stream.FileImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Slf4j
/** @Author: 徐泽宇(roamer) @Description: @Date: Created in 5:46 下午 2020/6/30 @Modified By: */
public class WebpFileUtils {

  /**
   * 判断传入的文件类型是否是 image/webp 格式
   *
   * @param inputFile
   * @return
   * @throws UtilException
   */
  public static boolean mimeTypeIsWebp(File inputFile) throws UtilException {
    try {
      Metadata metadata = ImageMetadataReader.readMetadata(inputFile);
      for (Directory directory : metadata.getDirectories()) {
        for (Tag tag : directory.getTags()) {
          // 判断0x0003D 的类型，是否等于 image/webp
          if (tag.getTagTypeHex().equalsIgnoreCase("0x0003")
              && tag.getDescription().equalsIgnoreCase("image/webp")) {
            return true;
          }
        }
      }
      return false;
    } catch (IOException e) {
      throw new UtilException(e.getMessage());
    } catch (ImageProcessingException e) {
      throw new UtilException(e.getMessage());
    }
  }

  /**
   * 对指定的 webp 文件生成缩略图
   *
   * @param inputFile 输入的webp 文件
   * @param maxWidth 缩略图的最大宽度
   * @param maxHeight 缩略图的最大高度
   * @param outputFile 缩略图保存的文件
   */
  public static void thumbnails(File inputFile, int maxWidth, int maxHeight, File outputFile)
      throws IOException {
    // Obtain a WebP ImageReader instance
    ImageReader reader = ImageIO.getImageReadersByMIMEType("image/webp").next();

    // Configure decoding parameters
    WebPReadParam readParam = new WebPReadParam();
    readParam.setBypassFiltering(true);

    // Configure the input on the ImageReader
    reader.setInput(new FileImageInputStream(inputFile));

    // Decode the image
    BufferedImage image = reader.read(0, readParam);
    float heightFloat = (float) image.getHeight();
    float widthFloat = (float) image.getWidth();
    log.debug("原始文件的尺寸是， 宽：" + widthFloat + ",高：" + heightFloat);

    BufferedImage resizedImage =
        new BufferedImage((int) widthFloat, (int) heightFloat, image.getType());
    Graphics graphics = resizedImage.getGraphics();
    if (heightFloat <= maxHeight && widthFloat <= maxWidth) {
      graphics.drawImage(image, 0, 0, (int) widthFloat, (int) heightFloat, null);
    } else if (widthFloat > maxWidth && heightFloat <= maxHeight) {
      graphics.drawImage(image, 0, 0, maxWidth, (int) (maxHeight / maxWidth * widthFloat), null);
    } else if (heightFloat > maxHeight && widthFloat <= maxWidth) {
      graphics.drawImage(
          image, 0, 0, (int) ((float) maxWidth / (float) maxHeight * heightFloat), maxHeight, null);
    } else {
      if (widthFloat >= heightFloat) {
        graphics.drawImage(
            image, 0, 0, maxWidth, (int) (heightFloat / widthFloat * (float) maxWidth), null);
      } else {
        graphics.drawImage(
            image, 0, 0, (int) (heightFloat / widthFloat * (float) maxHeight), maxHeight, null);
      }
    }

    graphics.dispose();

    ImageWriter writer = ImageIO.getImageWritersByMIMEType("image/webp").next();
    // Configure encoding parameters
    WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
    writeParam.setCompressionMode(WebPWriteParam.LOSSY_COMPRESSION);

    // Configure the output on the ImageWriter
    writer.setOutput(new FileImageOutputStream(outputFile));

    // Encode
    writer.write(null, new IIOImage(resizedImage, null, null), writeParam);
  }

  /**
   * 对指定的 webp 文件生成缩略图
   *
   * @param inputFile 输入的webp 文件
   * @param maxWidth 缩略图的最大宽度
   * @param maxHeight 缩略图的最大高度
   * @param outputFilePath 缩略图保存的文件
   */
  public static void thumbnails(File inputFile, int maxWidth, int maxHeight, String outputFilePath)
      throws IOException {
    thumbnails(inputFile, maxWidth, maxHeight, new File(outputFilePath));
  }
}
