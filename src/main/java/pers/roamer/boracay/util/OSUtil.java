package pers.roamer.boracay.util;


import pers.roamer.boracay.configer.ConfigHelper;

/**
 * @ClassName: OSUtil
 * @Description: 获取操作系统配置信息工具类
 * @author 邹伟
 * @date 2017年06月01日 上午11:39:19
 *
 */
public final class OSUtil {

    //默认的保存路径
    private static final String DEFAULT_PATH="/local";
    // 用户配置的文件保存路径
    private static final String LINUX_PATH = ConfigHelper.getConfig().getString("System.UploadFilePath");

    /**
     * 创建一个私有构造函数，防止被new实例化
     * 
     * @Auther 邹伟
     * @Date 2017年06月01日 上午11:39:19
     */
    private OSUtil() {}

    /**
     * isWindowOS
     * 
     * @Auther 邹伟
     * @Date 2017年06月01日 上午11:39:19
     * @Title: isWindowOS
     * @Description: 判断操作系统是否是Window系列
     * @return true：window系列 false：linux 系类
     */
    public static boolean isWindowOS() {
        String osName = System.getProperty("os.name");
        return osName.startsWith("win") || osName.startsWith("Win");
    }

    /**
     * 
     * getUserHomePath
     * 
     * @Auther 邹伟
     * @Date 2017年06月01日 上午11:39:19
     * @Title: getUserHomePath
     * @Description: 获取用户目录
     * @return
     */
    public static String getUserHomePath() {
        return System.getProperties().getProperty("user.home");
    }

    /**
     * getAccessoryPath
     * 
     * @Auther 邹伟
     * @Date 2017年06月01日 上午11:39:19
     * @Title: getAccessoryPath
     * @Description: 获取文件保存目录
     * @return
     */
    public static String getAccessoryPath(String... dirname) {
        StringBuilder path = new StringBuilder();
        String fileSeparator = getFileSeparator();
        if (isWindowOS()) {
            path.append(getUserHomePath());
        } else {
            path.append(LINUX_PATH==null?DEFAULT_PATH:LINUX_PATH);
        }
        if ("".equals(path.toString())) {
            path.append(getUserHomePath());
        }
        path.append(fileSeparator).append("upload");
        for(String dir:dirname){
            path.append(fileSeparator).append(dir);
        }
        return path.toString();
    }

    /**
     * 
     * getFileSeparator
     * 
     * @Auther 邹伟
     * @Date 2017年06月01日 上午11:39:19
     * @Title: getFileSeparator
     * @Description: 获取系统文件分隔符
     * @return
     */
    public static String getFileSeparator() {
        return System.getProperty("file.separator");
    }



}
