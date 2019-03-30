/**
 * @program: boracay
 * @description:
 * @author: roamer-徐泽宇
 * @create: 2019-03-30 17:18
 **/

package pers.roamer.boracay;


import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import pers.roamer.boracay.service.sms.SmsVerificationService;

@Slf4j
public class SMSTest {
    @Autowired
    SmsVerificationService smsVerificationService ;

    @Test
    public void testSendSM() throws BoracayException {
        smsVerificationService.send("15800392098","测试");
    }

}
