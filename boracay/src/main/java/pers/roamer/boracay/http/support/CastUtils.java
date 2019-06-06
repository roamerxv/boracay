package pers.roamer.boracay.http.support;

import org.apache.commons.lang3.StringUtils;

/** Created by zouwei on 2017/11/8. */
public class CastUtils {
    private CastUtils() {}

    /**
     *
     * @param obj
     * @return
     */
    public static String castString(final Object obj) {
        return castString(obj, "");
    }

    /**
     *
     * @param obj
     * @param defaultValue
     * @return
     */
    public static String castString(final Object obj, final String defaultValue) {
        return obj != null ? String.valueOf(obj) : defaultValue;
    }

    /**
     *
     * @param obj
     * @return
     */
    public static int castInt(final Object obj) {
        return castInt(obj, 0);
    }

    /**
     *
     * @param obj
     * @param defaultValue
     * @return
     */
    public static int castInt(final Object obj, final int defaultValue) {
        int intValue = defaultValue;
        if (obj != null) {
            final String strValue = CastUtils.castString(obj);
            if (!StringUtils.isEmpty(strValue)) {
                try {
                    intValue = Integer.parseInt(strValue);
                } catch (final NumberFormatException e) {
                    intValue = defaultValue;
                }
            }
        }
        return intValue;
    }

    /**
     * 转为double值（默认值为0）
     *
     * @param obj
     * @return double
     */
    public static double castDouble(final Object obj) {
        return castDouble(obj, 0);
    }

    /**
     * 转为double值（提供默认值）
     *
     * @param obj
     * @param defaultValue
     * @return double
     */
    public static double castDouble(final Object obj, final double defaultValue) {
        double doubleValue = defaultValue;
        if (obj != null) {
            final String strValue = CastUtils.castString(obj);
            if (!StringUtils.isEmpty(strValue)) {
                try {
                    doubleValue = Double.parseDouble(strValue);
                } catch (final NumberFormatException e) {
                    doubleValue = defaultValue;
                }
            }
        }
        return doubleValue;
    }

    /**
     * 转为long值（默认值为0）
     *
     * @param obj
     * @return long
     */
    public static long castLong(final Object obj) {
        return castLong(obj, 0);
    }

    /**
     * 转为long值（提供默认值）
     *
     * @param obj
     * @param defaultValue
     * @return long
     */
    public static long castLong(final Object obj, final long defaultValue) {
        long longValue = defaultValue;
        if (obj != null) {
            final String strValue = CastUtils.castString(obj);
            if (StringUtils.isEmpty(strValue)) {
                try {
                    longValue = Long.parseLong(strValue);
                } catch (final NumberFormatException e) {
                    longValue = defaultValue;
                }
            }
        }
        return longValue;
    }

    /**
     * 转为boolean值（默认值为false）
     *
     * @param obj
     * @return boolean
     */
    public static boolean castBoolean(final Object obj) {
        return castBoolean(obj, false);
    }

    /**
     * 转为boolean值（提供默认值）
     *
     * @param obj
     * @param defaultValue
     * @return boolean
     */
    public static boolean castBoolean(final Object obj, final boolean defaultValue) {
        boolean booleanValue = defaultValue;
        if (obj != null) {
            final String strValue = CastUtils.castString(obj);
            booleanValue = Boolean.parseBoolean(strValue);
        }
        return booleanValue;
    }
}
