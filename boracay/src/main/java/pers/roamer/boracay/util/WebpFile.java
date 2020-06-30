/**
 * @program: boracay
 * @description: Webp文件工具类
 * @author: roamer-徐泽宇
 * @create: 2020-06-23 22:33
 */
package pers.roamer.boracay.util;

import com.luciad.imageio.webp.WebPReadParam;
import com.luciad.imageio.webp.WebPWriteParam;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.ImageWriter;
import javax.imageio.stream.FileImageInputStream;
import javax.imageio.stream.FileImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;

/** @Author: 徐泽宇(roamer) @Description: @Date: Created in 10:33 下午 2020/6/23 @Modified By: */
public class WebpFile {
  public void convertThumb(File inputWebpFile, File outputWebpFile) throws UtilException {
    try {
      // Obtain a WebP ImageReader instance
      ImageReader reader = ImageIO.getImageReadersByMIMEType("image/webp").next();

      // Configure decoding parameters
      WebPReadParam readParam = new WebPReadParam();
      readParam.setBypassFiltering(true);

      // Configure the input on the ImageReader
      reader.setInput(new FileImageInputStream(inputWebpFile));

      // Decode the image
      BufferedImage image = reader.read(0, readParam);
      int height = image.getHeight();
      int width = image.getWidth();

      BufferedImage resizedImage = new BufferedImage(width * 2, height * 2, image.getType());
      Graphics graphics = resizedImage.getGraphics();
      graphics.drawImage(image, 0, 0, width * 2, height * 2, null);
      graphics.dispose();

      ImageWriter writer = ImageIO.getImageWritersByMIMEType("image/webp").next();
      // Configure encoding parameters
      WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
      writeParam.setCompressionMode(WebPWriteParam.MODE_DEFAULT);

      // Configure the output on the ImageWriter
      writer.setOutput(new FileImageOutputStream(outputWebpFile));

      // Encode
      writer.write(null, new IIOImage(resizedImage, null, null), writeParam);
    } catch (Exception err) {
      throw new UtilException(err.getMessage());
    }
  }
}
