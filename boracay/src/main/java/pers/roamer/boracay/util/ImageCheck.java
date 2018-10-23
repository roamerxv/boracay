/**
 * @program: BoracayWebSample(SpringBoot)
 * @description: 文件类型是否是图片的判断类
 * @author: roamer-徐泽宇
 * @create: 2018-06-12 15:58
 **/

package pers.roamer.boracay.util;

import javax.activation.MimetypesFileTypeMap;
import java.io.File;

public class ImageCheck {
    private MimetypesFileTypeMap mtftp;

    public ImageCheck(){
        mtftp = new MimetypesFileTypeMap();
        /* 不添加下面的类型会造成误判 详见：http://stackoverflow.com/questions/4855627/java-mimetypesfiletypemap-always-returning-application-octet-stream-on-android-e*/
        mtftp.addMimeTypes("image png tif jpg jpeg bmp");
    }
    public  boolean isImage(File file){
        String mimetype= mtftp.getContentType(file);
        String type = mimetype.split("/")[0];
        return type.equals("image");
    }
}
