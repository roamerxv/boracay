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
      throws IOException, UtilException {
    // Obtain a WebP ImageReader instance
    ImageReader reader = ImageIO.getImageReadersByMIMEType("image/webp").next();

    // Configure decoding parameters
    WebPReadParam readParam = new WebPReadParam();
    readParam.setBypassFiltering(true);

    // Configure the input on the ImageReader
    reader.setInput(new FileImageInputStream(inputFile));

    // Decode the image
    BufferedImage image = reader.read(0, readParam);

    log.debug("原始文件的尺寸是， 宽：" + image.getWidth() + ",高：" + image.getHeight());

    // 计算缩略图的尺寸
    Dimension thumbFileDimension =
        getScaling(
            new Dimension(image.getWidth(), image.getHeight()), new Dimension(maxWidth, maxHeight));

    BufferedImage resizedImage =
        new BufferedImage(
            (int) thumbFileDimension.getWidth(),
            (int) thumbFileDimension.getHeight(),
            image.getType());
    Graphics graphics = resizedImage.getGraphics();
    graphics.drawImage(
        image,
        0,
        0,
        (int) thumbFileDimension.getWidth(),
        (int) thumbFileDimension.getHeight(),
        null);
    graphics.dispose();
    ImageWriter writer = ImageIO.getImageWritersByMIMEType("image/webp").next();
    // Configure encoding parameters
    WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
    writeParam.setCompressionMode(WebPWriteParam.LOSSLESS_COMPRESSION);

    // Configure the output on the ImageWriter
    writer.setOutput(new FileImageOutputStream(outputFile));

    // Encode
    writer.write(null, new IIOImage(resizedImage, null, null), writeParam);

    log.debug(
        "缩略图的尺寸是， 宽：" + thumbFileDimension.getWidth() + ",高：" + thumbFileDimension.getHeight());
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
      throws IOException, UtilException {
    thumbnails(inputFile, maxWidth, maxHeight, new File(outputFilePath));
  }

  /**
   * 计算缩略图的缩放后的尺寸
   *
   * @param sourceDimension 原图尺寸
   * @param thumbDimension 设定的缩略图尺寸
   * @return 经过计算后，按照原图等比缩放后的缩略图尺寸
   * @throws UtilException
   */
  private static Dimension getScaling(Dimension sourceDimension, Dimension thumbDimension) {
    if (thumbDimension.getWidth() >= sourceDimension.getWidth()
        && thumbDimension.getHeight() >= sourceDimension.getHeight()) { // 缩略图尺寸大于原图尺寸，保持原图
      return sourceDimension;
    }
    double sourceAspectRatio =
        (double) sourceDimension.getWidth()
            / (double) sourceDimension.getHeight(); // 原图的纵横比 ，大于 1 ，说明是 横向图片，小于 1 说明是纵向 图片
    double thumbSAspectRation =
        (double) thumbDimension.getWidth() / (double) thumbDimension.getHeight(); // 设置的缩略图的纵横比

    Dimension resizedThumbDimension = new Dimension(0, 0); // 对原图进行等比缩放后，配合缩略图的设置尺寸，得出的最合适的缩略图大小
    if (thumbSAspectRation > sourceAspectRatio) {
      // 缩略图是横向
      resizedThumbDimension.setSize(
          (int) ((double) (thumbDimension.getHeight()) * sourceAspectRatio),
          thumbDimension.getHeight());
    } else {
      // 缩略图是纵向
      resizedThumbDimension.setSize(
          thumbDimension.getWidth(),
          (int) ((double) (thumbDimension.getWidth()) / sourceAspectRatio));
    }
    return resizedThumbDimension;
  }
}
