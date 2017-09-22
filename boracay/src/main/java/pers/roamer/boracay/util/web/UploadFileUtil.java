package pers.roamer.boracay.util.web;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.multipart.MultipartFile;
import pers.roamer.boracay.util.FileUtil;
import pers.roamer.boracay.util.UUIDString;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

/**
 * 上传文件的工具类
 *
 * @author roamer - 徐泽宇
 * @create 2017-09-2017/9/18  下午4:47
 */
@Log4j2
public class UploadFileUtil {


    /**
     * 把 MultipartFile 的文件保存到服务器端。返回结果。使用 uuid 作为 id
     *
     * @param multipartFileArrayList
     *
     * @return
     *
     * @throws IOException
     * @throws NoSuchAlgorithmException
     */
    public ArrayList<FileUploadResult> saveFile(MultipartFile[] multipartFileArrayList) throws IOException, NoSuchAlgorithmException {
        return this.saveFile(multipartFileArrayList, false);
    }

    ;

    /**
     * 把 MultipartFile 的文件保存到服务器端。返回结果
     *
     * @param multipartFileArrayList
     * @param digestIt               是否把摘要作为 id
     *
     * @return
     *
     * @throws IOException
     * @throws NoSuchAlgorithmException
     */
    public ArrayList<FileUploadResult> saveFile(MultipartFile[] multipartFileArrayList, boolean digestIt) throws IOException, NoSuchAlgorithmException {
        ArrayList<FileUploadResult> fileUploadResultArrayList = new ArrayList<>();
        log.debug("需要保存{}个上传文件到", multipartFileArrayList.length);
        for (MultipartFile multipartFile : multipartFileArrayList) {
            FileUploadResult fileUploadResult = new FileUploadResult();
            fileUploadResult.setIdIsDigest(digestIt);
            if (digestIt) {
                long beginTime = System.currentTimeMillis();
                if (log.isDebugEnabled()) {
                    log.debug("开始对文件进行摘要");
                }
                String digest = FileUtil.getFileDigest(multipartFile.getInputStream());
                fileUploadResult.setId(digest);
                if (log.isDebugEnabled()) {
                    long endTime = System.currentTimeMillis();
                    log.debug("生成文件摘要耗时：{} 毫秒，摘要的内容是：{}", endTime - beginTime, digest);
                }
                //需要对文件的内容进行摘要，把摘要作为 ID
            } else {
                //生成一个 UUID ，作为 ID
                fileUploadResult.setId(UUIDString.genUUID());
            }
            fileUploadResult.setMultipartFile(multipartFile);
            //保存文件
            fileUploadResult.saveFile();
            fileUploadResultArrayList.add(fileUploadResult);
        }
        return fileUploadResultArrayList;
    }
}
