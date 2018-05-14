package pers.roamer.boracay.util.web;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.configer.ConfigHelper;
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
@Slf4j
public class UploadFileUtil {

    /**
     * 把 MultipartFile 的文件保存到服务器端。返回结果。
     * 使用 uuid 作为 id
     * 保存的路径 在 config文件中设置
     *
     * @author 徐泽宇
     * @date 2018/5/12 下午7:49
     * @param multipartFile
     * @return pers.roamer.boracay.util.web.FileUploadResult
     * @throws
     **/
    public FileUploadResult saveFile(MultipartFile multipartFile )throws IOException, NoSuchAlgorithmException, BoracayException {
        return saveFile(multipartFile,false);
    }

    /**
     * 把 MultipartFile 的文件保存到服务器端。返回结果。
     * 如果 digestIt 是 false ，使用 uuid 作为 id，否则用摘要做 id
     * 保存的路径 在 config文件中设置
     *
     * @author 徐泽宇
     * @date 2018/5/12 下午7:43
     * @param multipartFile
     * @param digestIt
     * @return pers.roamer.boracay.util.web.FileUploadResult
     * @throws
     **/
    public FileUploadResult saveFile(MultipartFile multipartFile , boolean digestIt) throws IOException, NoSuchAlgorithmException, BoracayException{
        String savePath = ConfigHelper.getConfig().getString("System.UploadFile.saveFilePath");
        if (StringUtils.isEmpty(savePath)) {
            throw new BoracayException("system.UploadFile.saveFilePath not setted in config file！");
        }
        return this.saveFile(multipartFile, digestIt, savePath);
    }

    /**
     * 把 MultipartFile 的文件保存到服务器端。返回结果。
     * 使用 uuid 作为 id
     * 保存的路径 通过 savePath 指定
     *
     * @author 徐泽宇
     * @date 2018/5/12 下午7:43
     * @param multipartFile     上传的文件
     * @param savePath          保存到服务器上的路径
     * @return pers.roamer.boracay.util.web.FileUploadResult
     *
     * @throws IOException
     * @throws NoSuchAlgorithmException
     * @throws BoracayException
     **/
    public FileUploadResult saveFile(MultipartFile multipartFile ,String savePath ) throws IOException, NoSuchAlgorithmException, BoracayException {
        return saveFile(multipartFile,false,savePath);
    }

    /**
     * 把 MultipartFile 的文件保存到服务器端。返回结果。
     * 如果 digestIt 是 false ，使用 uuid 作为 id，否则用摘要做 id
     * 保存的路径 通过 savePath 指定
     *
     * @author 徐泽宇
     * @date 2018/5/12 下午7:35
     * @param multipartFile
     * @param digestIt
     * @param savePath
     * @return pers.roamer.boracay.util.web.FileUploadResult
     * @throws
     **/
    public FileUploadResult saveFile(MultipartFile multipartFile , boolean digestIt , String savePath ) throws IOException, NoSuchAlgorithmException, BoracayException {
        MultipartFile[] multipartFilesArray = new MultipartFile[1];
        multipartFilesArray[0] = multipartFile;
        return saveFile( multipartFilesArray, digestIt, savePath).get(0);
    }



    /**
     * 把 MultipartFile  数组中的文件保存到服务器端。返回结果。
     * 使用 uuid 作为 id
     * 保存的路径 在 config文件中设置
     *   
     * @author 徐泽宇 
     * @date 2018/5/12 下午7:13
     * @param multipartFileArrayList
     * @return java.util.ArrayList<pers.roamer.boracay.util.web.FileUploadResult>
     * @throws
     **/
    public ArrayList<FileUploadResult> saveFile(MultipartFile[] multipartFileArrayList) throws IOException, NoSuchAlgorithmException, BoracayException {
        return this.saveFile(multipartFileArrayList, false);
    }


    /**
     * 把 MultipartFile  数组中的文件保存到服务器端。返回结果。
     * 保存的路径 在 config文件中设置
     * 是否要通过 摘要作为 id。通过 digestIt 来指定
     *
     * @param multipartFileArrayList 需要保存的上传后的文件
     * @param digestIt    是否把摘要作为 id
     *
     * @return
     *
     * @throws IOException
     * @throws NoSuchAlgorithmException
     */
    public ArrayList<FileUploadResult> saveFile(MultipartFile[] multipartFileArrayList, boolean digestIt) throws IOException, NoSuchAlgorithmException, BoracayException {
        String savePath = ConfigHelper.getConfig().getString("System.UploadFile.saveFilePath");
        if (StringUtils.isEmpty(savePath)) {
            throw new BoracayException("system.UploadFile.saveFilePath not setted in config file！");
        }
        return this.saveFile(multipartFileArrayList, digestIt, savePath);
    }

    /**
     * 把 MultipartFile  数组中的文件保存到服务器端。返回结果。
     * 保存的路径 通过 savePath 指定
     * 通过 随机生成的 UUID 来作为 目录名
     * @param multipartFileArrayList 需要保存的上传后的文件
     * @param savePath               保存的路径
     *
     * @return
     *
     * @throws IOException
     * @throws NoSuchAlgorithmException
     */
    public ArrayList<FileUploadResult> saveFile(MultipartFile[] multipartFileArrayList, String savePath) throws IOException, NoSuchAlgorithmException, BoracayException {
        return this.saveFile(multipartFileArrayList, false, savePath);
    }


    /**
     * 把 MultipartFile 的文件保存到服务器端。返回结果
     *
     * @param multipartFileArrayList
     * @param digestIt               是否把摘要作为 id
     * @param savePath               保存的路径
     *
     * @return
     *
     * @throws IOException
     * @throws NoSuchAlgorithmException
     */
    public ArrayList<FileUploadResult> saveFile(MultipartFile[] multipartFileArrayList, boolean digestIt, String savePath) throws IOException, NoSuchAlgorithmException {
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
            fileUploadResult.saveFile(savePath);
            fileUploadResultArrayList.add(fileUploadResult);
        }
        return fileUploadResultArrayList;
    }
}
