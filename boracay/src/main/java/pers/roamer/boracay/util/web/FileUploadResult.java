package pers.roamer.boracay.util.web;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.web.multipart.MultipartFile;
import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.configer.ConfigHelper;
import pers.roamer.boracay.util.ImageCheck;

import java.io.File;
import java.io.IOException;
import java.text.MessageFormat;

/**
 * 文件上传结果类
 *
 * @author roamer - 徐泽宇
 * @create 2017-09-2017/9/8  下午6:29
 */
@Data
@Slf4j
public class FileUploadResult {

    private static  String THUMB_FILE_SUB_PATH = "thumb";
    String id;
    boolean idIsDigest;
    MultipartFile multipartFile;
    File savedFile;

    /**
     * 把上传上来的 MultiPartFile 保存到指定位置
     *
     * @param savePath 保存的路径。
     *
     * @throws IOException
     */
    public void saveFile(String savePath) throws IOException {
        log.debug("开始处理保存文件的过程");
        String saveFilePath;
        saveFilePath = new StringBuilder(savePath).append(File.separator).append(this.id).toString();
        File fp = new File(saveFilePath);
        if (!fp.exists()) {
            fp.mkdirs();// 目录不存在的情况下，创建目录。
        }
        this.savedFile = new File(new StringBuilder(saveFilePath)
                .append(File.separator)
                .append(this.multipartFile.getOriginalFilename()).toString());
        multipartFile.transferTo(savedFile);
        /* 判断上传的文件是否是图片 */
        if (new ImageCheck().isImage(savedFile)){
            log.debug("上传的文件是可以处理的图片文件，进行缩略图处理！");
            /* 生成缩略图到指定的缩略图目录 **/
            String thumbPath = new StringBuilder(savePath).append(File.separator).append(THUMB_FILE_SUB_PATH).append(File.separator).append(this.id).toString();
            fp = new File(thumbPath);
            if (!fp.exists()) {
                fp.mkdirs();// 目录不存在的情况下，创建目录。
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
                    .toFile(new StringBuilder(thumbPath).append(File.separator).append(savedFile.getName()).toString());

        }

        log.debug("处理完成");
    }

    @Override
    public String toString() {
        String[] content = {this.id, String.valueOf(this.idIsDigest), this.savedFile.getPath()};
        MessageFormat messageFormat = new MessageFormat("文件ID 是:{0}，ID 是否是摘要:[{1}] ,保存在服务器上路径是:{2}");
        return messageFormat.format(content);
    }
}
