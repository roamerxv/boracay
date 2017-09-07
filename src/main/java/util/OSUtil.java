package pers.roamer.boracay.util;


import pers.roamer.boracay.configer.ConfigHelper;

/**
 * 获取操作系统配置信息工具类
 *
 * @author 邹伟
 * @version 1.0.0 2017/6/29 下午4:59
 */
public final class OSUtil {

    //默认的保存路径
    private static final String DEFAULT_PATH = "/local";
    // 用户配置的文件保存路径
    private static final String LINUX_PATH = ConfigHelper.getConfig().getString("System.UploadFilePath");

    /**
     * 创建一个私有构造函数，防止被new实例化
     *
     * @author 邹伟
     * @since 1.0.0 2017年06月01日 上午11:39:19
     */
    private OSUtil() {
    }

    /**
     * 判断操作系统是否是Window系列
     *
     * @return true：window系列 false：linux 系类
     *
     * @author 邹伟
     * @since 1.0.0 2017/6/29 下午5:00
     */
    public static boolean isWindowOS() {
        String osName = System.getProperty("os.name");
        return osName.startsWith("win") || osName.startsWith("Win");
    }

    /**
     * 获取用户目录
     * <p>
     * author 邹伟
     *
     * @return
     *
     * @since 1.0.0 2017年06月01日 上午11:39:19
     */
    public static String getUserHomePath() {
        return System.getProperties().getProperty("user.home");
    }

    /**
     * 获取文件保存目录
     *
     * @param dirname 目录名字
     *
     * @return 目录
     *
     * @author 邹伟
     * @since 1.0.0  2017年06月01日 上午11:39:19
     */
    public static String getAccessoryPath(String... dirname) {
        StringBuilder path = new StringBuilder();
        String fileSeparator = getFileSeparator();
        if (isWindowOS()) {
            path.append(getUserHomePath());
        } else {
            path.append(LINUX_PATH == null ? DEFAULT_PATH : LINUX_PATH);
        }
        if ("".equals(path.toString())) {
            path.append(getUserHomePath());
        }
        path.append(fileSeparator).append("upload");
        for (String dir : dirname) {
            path.append(fileSeparator).append(dir);
        }
        return path.toString();
    }


    /**
     * 获取系统文件分隔符
     *
     * @return 分隔符
     *
     * @author 邹伟
     * @since 1.0.0  2017年06月01日 上午11:39:19
     */
    public static String getFileSeparator() {
        return System.getProperty("file.separator");
    }


}
