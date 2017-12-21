/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.oro.text.regex.MalformedPatternException;
import org.apache.oro.text.regex.Pattern;
import org.apache.oro.text.regex.Perl5Compiler;
import org.apache.oro.text.regex.Perl5Matcher;
import pers.roamer.boracay.BoracayException;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * 用作匹配ipv4地址黑/白名单的工具
 *
 * @author 徐泽宇
 * @since 1.0.0  2016年10月21日 下午3:56:44
 */
@Slf4j
public class Ipv4WhiteList {

    // 整体语法正确性校验正则
    private static final Pattern allPat;
    private static final Pattern blankPat;

    // num cache
    private static final Integer[] numTab = new Integer[256];

    static {
        try {
            allPat = new Perl5Compiler().compile("^\\s*(\\d{1,3}(\\-\\d{1,3})?\\.\\d{1,3}(\\-\\d{1,3})?\\.\\d{1,3}(\\-\\d{1,3})?\\.\\d{1,3}(\\-\\d{1,3})?(\\s*,\\s*\\d{1,3}(\\-\\d{1,3})?\\.\\d{1,3}(\\-\\d{1,3})?\\.\\d{1,3}(\\-\\d{1,3})?\\.\\d{1,3}(\\-\\d{1,3})?)*)?\\s*$");
            blankPat = new Perl5Compiler().compile("^\\s*$");
        } catch (MalformedPatternException e) {
            throw new RuntimeException(e);
        }
        for (int i = 0; i < 256; i++)
            numTab[i] = i;
    }

    private Map<Integer, Set<String>> lv0Map = new HashMap<>();
    private Map<Integer, Set<String>> lv1Map = new HashMap<>();
    private Map<Integer, Set<String>> lv2Map = new HashMap<>();
    private Map<Integer, Set<String>> lv3Map = new HashMap<>();

    /**
     * 编译、构造匹配内容
     *
     * @param ipRules 符合ipList语法规范的ip规则，支持精确ip，如“127.0.0.1”和范围ip,
     *                如"192.168.1-2.5-103"或"204-208.119.5-13.0-255"两种形式
     */
    public Ipv4WhiteList(String ipRules) throws BoracayException {
        if (ipRules == null || new Perl5Matcher().matches(ipRules, blankPat))
            return;
        if (!new Perl5Matcher().matches(ipRules, allPat)) {
            throw new BoracayException("Ip rules syntax error.");
        }
        String[] ips = ipRules.split(",");
        if (ips == null || ips.length == 0) {
            return;
        }
        for (String ip : ips) {
            ip = ip.trim();
            addToMapping(ip);
        }
    }

    private void addToMapping(String ip) throws BoracayException {
        String[] segs = ip.split("\\.");
        if (segs[0].contains("-")) {
            String[] p = segs[0].split("\\-");
            int from = Integer.parseInt(p[0]);
            int to = Integer.parseInt(p[1]);
            for (int i = from; i <= to; i++)
                putOnMap(lv0Map, getCachedInteger(i), ip);
        } else {
            putOnMap(lv0Map, getIntegerFromStr(segs[0]), ip);
        }
        if (segs[1].contains("-")) {
            String[] p = segs[1].split("\\-");
            int from = Integer.parseInt(p[0]);
            int to = Integer.parseInt(p[1]);
            for (int i = from; i <= to; i++)
                putOnMap(lv1Map, getCachedInteger(i), ip);
        } else {
            putOnMap(lv1Map, getIntegerFromStr(segs[1]), ip);
        }
        if (segs[2].contains("-")) {
            String[] p = segs[2].split("\\-");
            int from = Integer.parseInt(p[0]);
            int to = Integer.parseInt(p[1]);
            for (int i = from; i <= to; i++)
                putOnMap(lv2Map, getCachedInteger(i), ip);
        } else {
            putOnMap(lv2Map, getIntegerFromStr(segs[2]), ip);
        }
        if (segs[3].contains("-")) {
            String[] p = segs[3].split("\\-");
            int from = Integer.parseInt(p[0]);
            int to = Integer.parseInt(p[1]);
            for (int i = from; i <= to; i++)
                putOnMap(lv3Map, getCachedInteger(i), ip);
        } else {
            putOnMap(lv3Map, getIntegerFromStr(segs[3]), ip);
        }
    }

    private void putOnMap(Map<Integer, Set<String>> map, Integer key, String ip) {
        Set<String> set;
        if (map.containsKey(key)) {
            set = map.get(key);
        } else {
            set = new HashSet<>();
            map.put(key, set);
        }
        set.add(ip);
    }

    /**
     * 判断是否在ip名单中
     *
     * @param ip ip 地址
     *
     * @return 是否在白名单中
     */
    public boolean isIn(String ip) {
        if (ip == null)
            return false;
        String[] segs = ip.trim().split("\\.");
        if (segs.length != 4)
            return false;
        Set<String> set = lv0Map.get(Integer.parseInt(segs[0]));
        if (set == null || set.isEmpty())
            return false;
        set = intersect(set, lv1Map.get(Integer.parseInt(segs[1])));
        if (set == null || set.isEmpty())
            return false;
        set = intersect(set, lv2Map.get(Integer.parseInt(segs[2])));
        if (set == null || set.isEmpty())
            return false;
        set = intersect(set, lv3Map.get(Integer.parseInt(segs[3])));
        if (set == null || set.isEmpty())
            return false;
        return true;
    }

    private Set<String> intersect(Set<String> s1, Set<String> s2) {
        if (s2 == null || s2.isEmpty())
            return s2;
        Set<String> ret = new HashSet<>();
        for (String s : s1)
            if (s2.contains(s))
                ret.add(s);
        return ret;
    }

    private static Integer getIntegerFromStr(String str) throws BoracayException {
        return getCachedInteger(Integer.parseInt(str));
    }

    private static Integer getCachedInteger(int i) throws BoracayException {
        try {
            return numTab[i];
        } catch (ArrayIndexOutOfBoundsException e) {
            log.error("getCachedInteger(int)", e); //$NON-NLS-1$
            throw new BoracayException(new StringBuilder("Illegal ipv4 address, each part of a address must be in range 0 ~ 255. But found: ").append(i).toString());
        }
    }

}
