package pers.roamer.boracay.util.web;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.springframework.web.multipart.MultipartFile;
import pers.roamer.boracay.configer.ConfigHelper;
import pers.roamer.boracay.util.ImageCheck;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.text.MessageFormat;

/**
 * 文件上传结果类
 *
 * @author roamer - 徐泽宇
 * @create 2017-09-2017/9/8 下午6:29
 */
@Data
@Slf4j
public class FileUploadResult {

  private static String THUMB_FILE_SUB_PATH = "thumb";
  String id;
  boolean idIsDigest;
  MultipartFile multipartFile;
  File savedFile;
  String fullPathOfSavedFile;

  /**
   * 把上传上来的 MultiPartFile 保存
   * 根据指定的保存方式，判断是否是写到物理硬盘还是 分布式硬盘
   *
   * @param savePath 保存的路径。
   * @throws IOException
   * @author 徐泽宇
   * @modified 2020-03-07
   * @since 4.1.0
   */
  public void saveFile(String savePath) throws IOException {
    try {
      boolean hdfsEnabled = ConfigHelper.getConfig().getBoolean("System.UploadFile.HDFS.Plugged");
      if (hdfsEnabled) {
        log.debug("HDFS 设置成启用（Plugged = true ），文件存放到 HDFS 环境");
        this.saveFile2HDFS(savePath);
      } else {
        log.debug("HDFS 设置成未启用（Plugged = false ），文件存放到物理硬盘");
        this.saveFile2Disk(savePath);
      }
    } catch (java.util.NoSuchElementException err) {
      log.debug("HDFS 配置没有设置，文件存放到物理硬盘");
      this.saveFile2Disk(savePath);
    }
  }

  /**
   * 把上传上来的 MultiPartFile 保存到指定的HDFS 环境
   *
   * @param savePath 保存的路径。
   * @throws IOException
   * @author 徐泽宇
   * @modified 2020-03-07
   * @since 4.1.0
   */
  public void saveFile2HDFS(String savePath) throws IOException {
    log.debug("开始处理保存文件到 HDFS 的过程");
    String saveFilePath;
    saveFilePath = new StringBuilder(savePath).append(File.separator).append(this.id).toString();
    BufferedOutputStream bufferedOutputStream = null;
    FileSystem fileSystem = null;
    try {
      // 设置HADOOP_USER_NAME环境变量
      try {
        System.setProperty("HADOOP_USER_NAME", ConfigHelper.getConfig().getString("System.UploadFile.HDFS.UserName"));
      } catch (java.util.NoSuchElementException err) {
        log.error(err.getMessage(), err);
      }

      Configuration conf = new Configuration();
      conf.set("fs.defaultFS", ConfigHelper.getConfig().getString("System.UploadFile.HDFS.FileSystem"));
      conf.set("fs.hdfs.impl", "org.apache.hadoop.hdfs.DistributedFileSystem");

      fileSystem = FileSystem.get(conf);
      if (fileSystem.exists(new Path(saveFilePath))) {
        log.debug("目录存在");
      } else {
        if (fileSystem.mkdirs(new Path(savePath))) {
          log.debug("成功创建目录 {}", savePath);
        }
      }
      String pathString = new StringBuilder(saveFilePath)
              .append(File.separator)
              .append(this.multipartFile.getOriginalFilename())
              .toString();
      bufferedOutputStream = new BufferedOutputStream(fileSystem.create(new Path(pathString)));
      this.fullPathOfSavedFile = pathString;
      bufferedOutputStream.write(multipartFile.getBytes());
      bufferedOutputStream.close();
      fileSystem.close();
    } catch (Exception e) {
      throw new IOException(e.getMessage());
    } finally {
      try {
        if (bufferedOutputStream != null) {
          bufferedOutputStream.close();
        }
      } catch (Exception e) {
        log.error(e.getMessage(), e);
      }
      try {
        if (fileSystem != null) {
          fileSystem.close();
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    log.debug("保存到 HDFS 处理完成");
  }

  /**
   * 把上传上来的 MultiPartFile 保存到指定的物理硬盘位置
   *
   * @param savePath 保存的路径。
   * @throws IOException
   * @author 徐泽宇
   * @modified 2020-03-07
   * @since 4.1.0
   */
  public void saveFile2Disk(String savePath) throws IOException {
    log.debug("开始处理保存文件的过程");
    String saveFilePath;
    saveFilePath = new StringBuilder(savePath).append(File.separator).append(this.id).toString();
    File fp = new File(saveFilePath);

    if (!fp.exists()) {
      // 目录不存在的情况下，创建目录。
      if (fp.mkdirs()) {
        log.info("成功创建目录 {}", fp.getAbsolutePath());
      }
    }
    this.savedFile =
            new File(
                    new StringBuilder(saveFilePath)
                            .append(File.separator)
                            .append(this.multipartFile.getOriginalFilename())
                            .toString());
    this.fullPathOfSavedFile = this.savedFile.getAbsolutePath();
    multipartFile.transferTo(this.savedFile);
    /* 判断上传的文件是否是图片 */
    if (new ImageCheck().isImage(savedFile)) {
      log.debug("上传的文件是可以处理的图片文件，进行缩略图处理！");
      /* 生成缩略图到指定的缩略图目录 **/
      String thumbPath =
              new StringBuilder(savePath)
                      .append(File.separator)
                      .append(THUMB_FILE_SUB_PATH)
                      .append(File.separator)
                      .append(this.id)
                      .toString();
      fp = new File(thumbPath);
      if (!fp.exists()) {
        // 目录不存在的情况下，创建目录。
        if (fp.mkdirs()) {
          log.info("成功创建目录：{}", fp.getAbsolutePath());
        }
      }
      /* 按照设置的界定值进行缩放 **/
      /*
       * 若图片横比200小，高比300小，不变
       * 若图片横比200小，高比300大，高缩小到300，图片比例不变
       * 若图片横比200大，高比300小，横缩小到200，图片比例不变
       * 若图片横比200大，高比300大，图片按比例缩小，横为200或高为300
       */
      int maxWidth = ConfigHelper.getConfig().getInt("System.UploadFile.thumb.maxWidth");
      int maxHeight = ConfigHelper.getConfig().getInt("System.UploadFile.thumb.maxHeight");
      Thumbnails.of(this.savedFile)
              .size(maxWidth, maxHeight)
              .toFile(
                      new StringBuilder(thumbPath)
                              .append(File.separator)
                              .append(this.savedFile.getName())
                  .toString());
    }
    log.debug("处理完成");
  }

  @Override
  public String toString() {
    String[] content = {this.id, String.valueOf(this.idIsDigest), this.fullPathOfSavedFile};
    MessageFormat messageFormat = new MessageFormat("文件ID 是:{0}，ID 是否是摘要:[{1}] ,保存在服务器上路径是:{2}");
    return messageFormat.format(content);
  }
}
