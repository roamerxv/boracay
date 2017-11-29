package pers.roamer.boracay.util.web;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

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
        log.debug("处理完成");
    }


    public String toString() {
        String[] content = {this.id, new String().valueOf(this.idIsDigest), this.savedFile.getPath()};
        MessageFormat messageFormat = new MessageFormat("文件ID 是:{0}，ID 是否是摘要:[{1}] ,保存在服务器上路径是:{2}");
        return messageFormat.format(content);
    }
}
