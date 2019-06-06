package pers.roamer.boracay.http.core.http;

/**
 * 上传进度监听器
 *
 * @author zouwei
 */
public interface ProgressListener {

    /**
     * 更新进度
     *
     * @param totalLength
     * @param currentLength
     */
    void onProgress(long totalLength, long currentLength);
}
