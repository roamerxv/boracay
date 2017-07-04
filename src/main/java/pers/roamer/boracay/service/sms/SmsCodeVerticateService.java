/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.service.sms;

import com.sun.xml.internal.ws.util.UtilException;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.configer.ConfigHelper;
import pers.roamer.boracay.entity.SmsVerificationCodeEntity;
import pers.roamer.boracay.repository.ISmsVerificationCodeRepository;
import pers.roamer.boracay.util.HttpClientUtil;

import java.sql.Timestamp;
import java.util.*;

/**
 * Created by zouwei on 2017/7/3.
 */
@Log4j2
@Data
@Service("com.ninelephas.raccoon.service.sms.SmsService")
public class SmsCodeVerticateService {

    @Qualifier("com.ninelephas.raccoon.repository.ISmsVerificationCodeRepository")
    @Autowired
    ISmsVerificationCodeRepository iSmsVerificationCodeRepository;

    private static final String X = "0123456789";

    private static final String URL_KEY = "System.Sms.Url";

    private static final String USERNAME_KEY = "System.Sms.Username";

    private static final String PASSWORD_KEY = "System.Sms.Password";


    private static final String REGIST_PERFIX = "System.Sms.Regist";
    private static final String FORGET_PASSWORD_PERFIX = "System.Sms.ForgetPassword";
    private static final String MODIFY_PASSWORD_PERFIX = "System.Sms.ModifyPassword";
    private static final String MODIFY_PHONE_NUMBER_PERFIX = "System.Sms.ModifyPhoneNumber";

    private static String SMS_VCODE_INVALID = "exception.sms.validate.vcode.invalid";
    private static String SMS_VCODE_EXPIRED = "exception.sms.validate.vcode.expired";
    private static String SMS_VCODE_NOT_MATCH = "exception.sms.validate.vcode.not_match";


    private static final String REGIST_LENGTH = REGIST_PERFIX + ".Length";
    private static final String REGIST_OPID = REGIST_PERFIX + ".Opid";
    private static final String REGIST_DURATION = REGIST_PERFIX + ".Duration";
    private static final String REGIST_TEXT = REGIST_PERFIX + ".Text";

    private static final String FORGET_PASSWORD_LENGTH = FORGET_PASSWORD_PERFIX + ".Length";
    private static final String FORGET_PASSWORD_OPID = FORGET_PASSWORD_PERFIX + ".Opid";
    private static final String FORGET_PASSWORD_DURATION = FORGET_PASSWORD_PERFIX + ".Duration";
    private static final String FORGET_PASSWORD_TEXT = FORGET_PASSWORD_PERFIX + ".Text";

    private static final String MODIFY_PASSWORD_LENGTH = MODIFY_PASSWORD_PERFIX + ".Length";
    private static final String MODIFY_PASSWORD_OPID = MODIFY_PASSWORD_PERFIX + ".Opid";
    private static final String MODIFY_PASSWORD_DURATION = MODIFY_PASSWORD_PERFIX + ".Duration";
    private static final String MODIFY_PASSWORD_TEXT = MODIFY_PASSWORD_PERFIX + ".Text";

    private static final String MODIFY_PHONE_NUMBER_LENGTH = MODIFY_PHONE_NUMBER_PERFIX + ".Length";
    private static final String MODIFY_PHONE_NUMBER_OPID = MODIFY_PHONE_NUMBER_PERFIX + ".Opid";
    private static final String MODIFY_PHONE_NUMBER_DURATION = MODIFY_PHONE_NUMBER_PERFIX + ".Duration";
    private static final String MODIFY_PHONE_NUMBER_TEXT = MODIFY_PHONE_NUMBER_PERFIX + ".Text";

    private static final Map<String, Map<String, Object>> map = new HashMap<>();


    //初始化加载配置
    static {
        getConfig();
    }

    private static void getConfig() {
        String regist_opid = ConfigHelper.getConfig().getString(REGIST_OPID);
        long regist_duration = ConfigHelper.getConfig().getLong(REGIST_DURATION);
        int regist_length = ConfigHelper.getConfig().getInt(REGIST_LENGTH);
        String regist_text = ConfigHelper.getConfig().getString(REGIST_TEXT);
        Map<String, Object> regist = new HashMap<>();
        regist.put("opid", regist_opid);
        regist.put("length", regist_length);
        regist.put("duration", regist_duration);
        regist.put("text", regist_text);
        map.put(regist_opid, regist);
        String forget_password_opid = ConfigHelper.getConfig().getString(FORGET_PASSWORD_OPID);
        long forget_password_duration = ConfigHelper.getConfig().getLong(FORGET_PASSWORD_DURATION);
        int forget_password_length = ConfigHelper.getConfig().getInt(FORGET_PASSWORD_LENGTH);
        String forget_password_text = ConfigHelper.getConfig().getString(FORGET_PASSWORD_TEXT);
        Map<String, Object> forget_password = new HashMap<>();
        forget_password.put("opid", forget_password_opid);
        forget_password.put("length", forget_password_length);
        forget_password.put("duration", forget_password_duration);
        forget_password.put("text", forget_password_text);
        map.put(forget_password_opid, forget_password);

        String modify_password_opid = ConfigHelper.getConfig().getString(MODIFY_PASSWORD_OPID);
        long modify_password_duration = ConfigHelper.getConfig().getLong(MODIFY_PASSWORD_DURATION);
        int modify_password_length = ConfigHelper.getConfig().getInt(MODIFY_PASSWORD_LENGTH);
        String modify_password_text = ConfigHelper.getConfig().getString(MODIFY_PASSWORD_TEXT);
        Map<String, Object> modify_password = new HashMap<>();
        modify_password.put("opid", modify_password_opid);
        modify_password.put("length", modify_password_length);
        modify_password.put("duration", modify_password_duration);
        modify_password.put("text", modify_password_text);
        map.put(modify_password_opid, modify_password);

        String modify_phone_number_opid = ConfigHelper.getConfig().getString(MODIFY_PHONE_NUMBER_OPID);
        long modify_phone_number_duration = ConfigHelper.getConfig().getLong(MODIFY_PHONE_NUMBER_DURATION);
        int modify_phone_number_length = ConfigHelper.getConfig().getInt(MODIFY_PHONE_NUMBER_LENGTH);
        String modify_phone_number_text = ConfigHelper.getConfig().getString(MODIFY_PHONE_NUMBER_TEXT);
        Map<String, Object> modify_phone_number = new HashMap<>();
        modify_phone_number.put("opid", modify_phone_number_opid);
        modify_phone_number.put("length", modify_phone_number_length);
        modify_phone_number.put("duration", modify_phone_number_duration);
        modify_phone_number.put("text", modify_phone_number_text);
        map.put(modify_phone_number_opid, modify_phone_number);
    }

    /**
     * 发送验证码
     */
    public void sendVerificationCode(String opId, String sessionId, String phoneNumber) throws ServiceException {

        Map<String, Object> m = getConfig(opId);
        int length = (int) m.get("length");
        long duration = (long) m.get("duration");
        String text = (String) m.get("text");

        //生成6位随机验证码
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(X.charAt((int) (Math.random() * 10.0)));
        }
        String code = sb.toString();
        text = text.replace("${code}", code);
        text = text.replace("${duration}", "" + (duration / 60000));
        //发送短信
        send(phoneNumber, text);
        //保存发送的数据
        iSmsVerificationCodeRepository.save(genereateSmsVerificationCodeEntity(opId, sessionId, phoneNumber, text, code, duration));
    }

    private static Map<String, Object> getConfig(String opId) {

        return map.get(opId);
    }

    //生成短信验证码实体
    private SmsVerificationCodeEntity genereateSmsVerificationCodeEntity(String opId, String sessionId, String phoneNumber, String text, String code, long duration) {
        SmsVerificationCodeEntity entity = new SmsVerificationCodeEntity();
        entity.setCreatedTime(new Timestamp(System.currentTimeMillis()));
        entity.setDuration(duration);
        entity.setId(UUID.randomUUID().toString().replaceAll("-", ""));
        entity.setUsed(false);
        entity.setOpId(opId);
        entity.setPhoneNumber(phoneNumber);
        entity.setSessionId(sessionId);
        entity.setText(text);
        entity.setCode(code);
        return entity;
    }


    public void send(String phoneNumber, String text) throws ServiceException {
        if (StringUtils.isEmpty(phoneNumber)) {//做一个电话号码的判断
            throw new ServiceException("无效的电话号码");
        }
        if (StringUtils.isEmpty(text)) {
            throw new ServiceException("不能发送空内容");
        }
        String url = ConfigHelper.getConfig().getString(URL_KEY);
        String username = ConfigHelper.getConfig().getString(USERNAME_KEY);
        String password = ConfigHelper.getConfig().getString(PASSWORD_KEY);
        //String content = "验证码：" + sb.toString() + ",短信接口测试，收到请勿答复！";
        //发送短信验证码
        Map<String, String> map = new HashMap<>();
        map.put("account", username);
        map.put("pswd", password);
        map.put("mobile", phoneNumber);
        map.put("needstatus", "true");
        map.put("msg", text);//Jsoup.clean(content, Whitelist.none()).replace("&nbsp;", "").trim()
        map.put("product", null);
        map.put("extno", null);
        try {
            HttpClientUtil.doPostWithParam(url, map);
        } catch (UtilException e) {
            throw new ServiceException(e.getMessage());
        }
    }

    /**
     * 进行短信验证码校验
     *
     * @param sessionId sessionID
     * @param opId      操作 id
     * @param vCode     验证码
     *
     * @return
     *
     * @throws BoracayException
     */
    public boolean validate(String sessionId, String opId, String vCode) throws BoracayException {
        ArrayList<SmsVerificationCodeEntity> smsVerificationCodeEntityArrayList = iSmsVerificationCodeRepository.findAllBySessionIdAndOpIdAndUsedOrderByCreatedTimeDesc(sessionId, opId, false);
        if (smsVerificationCodeEntityArrayList == null || smsVerificationCodeEntityArrayList.size() <= 0) {
            throw new BoracayException(SMS_VCODE_INVALID);
        }
        SmsVerificationCodeEntity smsVerificationCodeEntity = smsVerificationCodeEntityArrayList.get(0);
        if (smsVerificationCodeEntity.getCode().equalsIgnoreCase(vCode)) {
            //判断是否过期
            if ((smsVerificationCodeEntity.getCreatedTime().getTime() + smsVerificationCodeEntity.getDuration() < new Date().getTime())) {
                throw new BoracayException(SMS_VCODE_EXPIRED);
            }
            //修改验证码状态为已经使用
            smsVerificationCodeEntity.setUsed(true);
            smsVerificationCodeEntity.setUsedTime(new Timestamp(new Date().getTime()));
            iSmsVerificationCodeRepository.saveAndFlush(smsVerificationCodeEntity);
            return true;
        } else {
            throw new BoracayException(SMS_VCODE_NOT_MATCH);
        }
    }
}
