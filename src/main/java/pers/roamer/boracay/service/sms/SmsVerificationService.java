/*
 * Boracay - Web 项目实用组件框架
 *
 * @author 徐泽宇 roamerxv@gmail.com
 * @version 1.0.0
 * Copyright (c) 2017. 徐泽宇
 *
 */

package pers.roamer.boracay.service.sms;

import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.aspect.sms.SMSValidateBean;
import pers.roamer.boracay.configer.ConfigHelper;
import pers.roamer.boracay.entity.SmsVerificationCodeEntity;
import pers.roamer.boracay.repository.ISmsVerificationCodeRepository;
import pers.roamer.boracay.util.HttpClientUtil;
import pers.roamer.boracay.util.UtilException;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author 徐泽宇
 * @version 1.0.2
 * @since 1.0.2 2017/7/5 下午4:07
 */
@Log4j2
@Data
@Service("pers.roamer.boracay.service.sms.SmsService")
public class SmsVerificationService {

    @Qualifier("pers.roamer.boracay.repository.ISmsVerificationCodeRepository")
    @Autowired
    ISmsVerificationCodeRepository iSmsVerificationCodeRepository;

    private static final String URL_KEY = "System.Sms.Url";

    private static final String USERNAME_KEY = "System.Sms.Username";

    private static final String PASSWORD_KEY = "System.Sms.Password";

    private static String SMS_VCODE_INVALID = "exception.sms.validate.vcode.invalid";
    private static String SMS_VCODE_EXPIRED = "exception.sms.validate.vcode.expired";
    private static String SMS_VCODE_NOT_MATCH = "exception.sms.validate.vcode.not_match";

    /**
     * 不需要设置事务回滚
     *
     * @param entity
     */
    public void save(SmsVerificationCodeEntity entity) {
        iSmsVerificationCodeRepository.save(entity);
    }


    public void send(String phoneNumber, String text) throws BoracayException {
        if (StringUtils.isEmpty(phoneNumber)) {//做一个电话号码的判断
            throw new BoracayException("无效的电话号码");
        }
        if (StringUtils.isEmpty(text)) {
            throw new BoracayException("不能发送空内容");
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
            HttpClientUtil.doAsyncPostWithParam(url, map);
        } catch (UtilException e) {
            throw new ServiceException(e.getMessage());
        }
    }

    /**
     * 进行短信验证码校验
     *
     * @param opIdArrayList            操作 id 数组
     * @param smsValidateBeanArrayList 验证码数组
     *
     * @return
     *
     * @throws BoracayException
     */
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = {BoracayException.class})
    public boolean validate(ArrayList<String> opIdArrayList, ArrayList<SMSValidateBean> smsValidateBeanArrayList) throws BoracayException {
        for (int i = 0; i < opIdArrayList.size(); i++) {
            String opId = opIdArrayList.get(i);
            String vCode = smsValidateBeanArrayList.get(i).getValidateCode();
            String mobile = smsValidateBeanArrayList.get(i).getMobile();
            if (mobile.isEmpty()) {
                throw new BoracayException("exception.sms.validate.mobile.not_set");
            }
            ArrayList<SmsVerificationCodeEntity> smsVerificationCodeEntityArrayList = iSmsVerificationCodeRepository.findAllByPhoneNumberAndOpIdAndUsedOrderByCreatedTimeDesc(mobile, opId, false);
            if (smsVerificationCodeEntityArrayList == null || smsVerificationCodeEntityArrayList.size() <= 0) {
                throw new BoracayException(SMS_VCODE_INVALID + "." + opId);
            }
            SmsVerificationCodeEntity smsVerificationCodeEntity = smsVerificationCodeEntityArrayList.get(0);
            if (smsVerificationCodeEntity.getCode().equalsIgnoreCase(vCode)) {
                //判断是否过期
                if ((smsVerificationCodeEntity.getCreatedTime().getTime() + smsVerificationCodeEntity.getDuration() < new Date().getTime())) {
                    throw new BoracayException(SMS_VCODE_EXPIRED + "." + opId);
                }
                //修改验证码状态为已经使用
                smsVerificationCodeEntity.setUsed(true);
                smsVerificationCodeEntity.setUsedTime(new Timestamp(new Date().getTime()));
                iSmsVerificationCodeRepository.save(smsVerificationCodeEntity);
            } else {
                throw new BoracayException(SMS_VCODE_NOT_MATCH + "." + opId);
            }
        }
        return true;
    }
}
