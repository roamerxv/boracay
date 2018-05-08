/**
 * @program: boracay
 * @description: HttpResponseHelper的测试类
 * @author: roamer-徐泽宇
 * @create: 2018-05-08 09:26
 **/

package pers.roamer.boracay.helper;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;


@Slf4j
public class HttpResponseHelperTester {


	@Test
	public void testObjectInbox(){

		TestBean testBean = new TestBean();
		testBean.setName("用户名张三");
		testBean.setId("ID1111111");
		String msg = HttpResponseHelper.successInfoInbox(testBean);
		log.info(msg);
		msg = HttpResponseHelper.successInfoInbox("处理成功");
		log.info(msg);
	}

	@Data
	class TestBean{
		private String name ;
		private String id;
	}
}

