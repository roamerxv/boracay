package pers.roamer.boracay.controller;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import pers.roamer.boracay.BoracayException;
import pers.roamer.boracay.configer.ConfigHelper;
import pers.roamer.boracay.entity.SmsVerificationCodeEntity;
import pers.roamer.boracay.service.sms.SmsVerificationService;

import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created by zouwei on 2017/7/3.
 */

@Slf4j
@Data
@RestController("pers.roamer.boracay.controller.SmsController")
public class SmsController {

    @Autowired
    private HttpSession httpSession;

    @Autowired
    private SmsVerificationService smsVerificationService;

    private static final String X = "0123456789";


    private static final String BUSINESS_METHOD_PERFIX = "System.Sms.BusinessMethod";

    /**
     * 根据业务id获取对应配置
     *
     * @param businessMethod
     *
     * @return
     */
    private Map<String, Object> getConfig(String businessMethod) throws BoracayException {
        if (StringUtils.isEmpty(businessMethod)) {
            throw new BoracayException("exception.sms.validate.vcode.invalid_method");
        }
        String method = BUSINESS_METHOD_PERFIX + "." + businessMethod;
        long duration = ConfigHelper.getConfig().getLong(method + ".Duration");
        int length = ConfigHelper.getConfig().getInt(method + ".Length");
        String text = ConfigHelper.getConfig().getString(method + ".Text");
        Map<String, Object> map = new HashMap<>();
        map.put("method", businessMethod);
        map.put("length", length);
        map.put("duration", duration);
        map.put("text", text);
        return map;
    }

    /**
     * 生成验证码
     *
     * @param businessMethod
     *
     * @return
     */
    private String generateCode(String businessMethod) throws BoracayException {
        Map<String, Object> m = getConfig(businessMethod);
        int length = (int) m.get("length");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(X.charAt((int) (Math.random() * 10.0)));
        }
        return sb.toString();
    }

    /**
     * 生成短信发送内容
     */
    private String generateText(String businessMethod, String code) throws BoracayException {
        Map<String, Object> m = getConfig(businessMethod);
        int length = (int) m.get("length");
        long duration = (long) m.get("duration");
        String text = (String) m.get("text");
        text = text.replace("${code}", code);
        text = text.replace("${duration}", "" + (duration / 60000));

        return text;
    }


    //生成短信验证码实体
    private SmsVerificationCodeEntity genereateSmsVerificationCodeEntity(String method, String sessionId, String phoneNumber, String text, String code, long duration) {
        SmsVerificationCodeEntity entity = new SmsVerificationCodeEntity();
        entity.setCreatedTime(new Timestamp(System.currentTimeMillis()));
        entity.setDuration(duration);
        entity.setId(UUID.randomUUID().toString().replaceAll("-", ""));
        entity.setUsed(false);
        entity.setOpId(method);
        entity.setPhoneNumber(phoneNumber);
        entity.setSessionId(sessionId);
        entity.setText(text);
        entity.setCode(code);
        return entity;
    }


    @GetMapping(value = "/sms/send/{user_mobile}/{method}")
    @ResponseBody
    public void delete(@PathVariable("method") String method, @PathVariable("user_mobile") String user_mobile) throws BoracayException {
        //判断当前的业务方法是否在 config.xml 里面正确配置
        if (!ConfigHelper.getConfig().getKeys(BUSINESS_METHOD_PERFIX + "." + method).hasNext()) {
            throw new BoracayException("exception.sms.validate.vcode.invalid_method");
        }
        String sessionId = httpSession.getId();

        Map<String, Object> m = getConfig(method);
        long duration = (long) m.get("duration");

        String code = generateCode(method);
        String text = generateText(method, code);

        //保存
        smsVerificationService.save(genereateSmsVerificationCodeEntity(method, sessionId, user_mobile, text, code, duration));
        smsVerificationService.send(user_mobile, text);
    }
}
