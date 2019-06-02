# boracay

WebSample For SpringFrame 的项目停止更新。转向以 Spring Boot + thymeleaf  的演示项目

提供 web 应用的一些实用功能框架

[ ![Download](https://api.bintray.com/packages/roamerxv/maven/boracay/images/download.svg) ](https://bintray.com/roamerxv/maven/boracay/_latestVersion)



## 一. 提供的功能

1. 业务方法调用记录到 log 表单的封装
2. 错误信息捕获，并且进行 json 化和详细信息化的封装
3. 短信验证码发送和验证功能的封装
4. 访问 IP 权限白名单控制功能的封装    
5. mvc中 controller 层方法的 session 判断的封装
6. 同时进行多文件和表单提交处理，并且自动保存文件的功能封装 
7. 基于 totp的二次验证方法类
 
    

## 二. 在 spring framework 中的使用方法

### a. 全局配置 

1. 在项目的 applicationContext.xml 文件中增加配置 jpa 扫描目录

    ```
    <!-- 配置Spring Data JPA扫描目录 -->
    <jpa:repositories base-package="pers.roamer.boracay,xxx.xxxxx.xxx(项目的 jpa 扫描目录)"/>
    ```

2. 在项目的 applicationContext.xml 文件中增加组件扫描目录,激活自动代理功能

    ```
    <context:component-scan base-package="pers.roamer.boracay,xxxx.xxxxx.xxx"/>
    <!-- 激活自动代理功能 -->
    <aop:aspectj-autoproxy proxy-target-class="true"/>
    ```

3. 在项目的 spring-mvc.xml 文件中增加 spring mvc 的包扫描目录

    ```
    <context:component-scan base-package="pers.roamer.boracay,xxxx.xxxxx.xxx"/>
    ```

4. 在项目的$classpath目录下增加config目录，并且增加config.xml 配置文件中，增加如下的项目配置项

    ```
    <Config>
        <System>
            <!-- 用于 boracay 组件必须使用到的配置 begin-->
            <AppName> 项目名称 </AppName>
            <!--写入到数据表中的 created_by 和 update_by  系统用户-->
            <SystemAdminName>
                systemadmin
            </SystemAdminName>
            <!--访问白名单-->
            <!--# 系统能访问的IP白名单。只有在这个白名单里面的IP才能访问-->
            <!--#内网地址都纳入-->
            <!--#A类10.0.0.0&#45;&#45;10.255.255.255-->
            <!--#B类172.16.0.0&#45;&#45;172.31.255.255-->
            <!--#C类192.168.0.0&#45;&#45;192.168.255.255-->
            <Whitelist>
                127.0.0.1,192.168.0-255.0-255,172.16-31.0-255.0-255,10.0-255.0-255.0-255
            </Whitelist>
            <!---->
            <!--设置是否要做session判断，以便确定用户是否登录-->
            <SessionCheck>false</SessionCheck>
            <!-- 设置是否要做业务活动日志记录 -->
            <RecordBusinessLog>true</RecordBusinessLog>
            <!---->
            <!-- 设置判断 session 中被用于保存用户信息的关键词 -->
            <SessionUserKeyword>
                user_mobile
            </SessionUserKeyword>
            <!-- 需要保存到日志记录数据库中的用户名字在 session 中保存的 key-->
            <BusinessRecordUserName>
                user_name
            </BusinessRecordUserName>
            <!-- 用于 boracay 组件必须使用到的配置 end -->
        </System>
        ...
    </Config>    
    ```

### b. 配置记录业务日志记录的切面

1. 在 applicationContext.xml 中增加如下代码：

    ```
        <!-- 配置业务方法日志记录的功能 begin-->
        <bean id="businessLogInterceptor" class="pers.roamer.boracay.aspect.businesslogger.BusinessLogAspect"></bean>
        <aop:config>
            <aop:pointcut
                    id="logControllerPointcut"
                    ①expression="execution(* com.ninelephas.raccoon.controller..*.*(..)) &amp;&amp; !execution(* com.ninelephas.raccoon.controller.creator.CreatorController.logout(..))" />
            <aop:pointcut
                    id="beforeLogControllerPointcut"
                    ②expression="execution(* com.ninelephas.raccoon.controller.creator.CreatorController.logout(..))" />
            <aop:aspect ref="businessLogInterceptor">
                <aop:around method="logAroundAction"  pointcut-ref="logControllerPointcut"/>
                <aop:before method="logBeforeAction"  pointcut-ref="beforeLogControllerPointcut"/>
            </aop:aspect>
        </aop:config>
        <!-- 配置业务方法日志记录的功能  end -->
    ```
   
    - 只有①和②的地方需要根据具体项目需求进行变更。
    
    - ①的表达式是配置所有需要记录日志的 controller bean 中的方法，并且是排除了 logout 的方法。
    
    - ②的表达式是配置所有需要在业务逻辑前进行日志记录的 controller bean 中的方法。典型的场景是 logout。
    
    - 这些包含在表达式中的方法，如果用了  @BusinessMethod(value = "登录") 这样的方法注解。就会自动记录日志到日志表中。
    
    - 可以在具体指定当前方法是否要日志记录，设置 isLogged = false 就可以对这个方法不记录日志。缺省是 true，代表记录日志。
    
        `@BusinessMethod(value = "登录" , isLogged = false )`
    
    - 如果整个项目，无论在controller 里面的业务方法里面是否指定 isLogged，都不需要记录日志。可以在 config.xml 里面的 RecordBusinessLog 设置成 false。
     
2. 系统日志的表单结构：

    ```
    CREATE TABLE `business_log` (
      `id` varchar(40) CHARACTER SET utf8 NOT NULL,
      `operator` varchar(255) COLLATE utf8_bin DEFAULT NULL,
      `clazz` varchar(255) CHARACTER SET utf8 NOT NULL,
      `method` varchar(255) CHARACTER SET utf8 NOT NULL,
      `method_description` varchar(255) CHARACTER SET utf8 NOT NULL,
      `success` tinyint(4) NOT NULL COMMENT '方法是否成功运行',
      `exception_string` text COLLATE utf8_bin COMMENT '方法运行出错，抛出的exception堆栈转换成的string',
      `args` text CHARACTER SET utf8 NOT NULL,
      `time_consuming` bigint NOT NULL  DEFAULT 0 COMMENT '方法调用耗时（毫秒）', 
      `remote_ip` varchar(32) COLLATE utf8_bin DEFAULT NULL,
      `client_os` varchar(255) COLLATE utf8_bin DEFAULT NULL,
      `client_browser` varchar(255) COLLATE utf8_bin DEFAULT NULL,
      `browser_version` varchar(255) COLLATE utf8_bin DEFAULT NULL,
      `client_device_type` varchar(255) COLLATE utf8_bin DEFAULT NULL,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='业务方法调用日志';
    
    SET FOREIGN_KEY_CHECKS = 1;
   
    ```
    
### c. 配置 对 exception 进行 json化, 国际化, 信息明细化的封装切面

1. 在 applicationContext.xml 中增加如下代码：
    
    ```
            <!-- 配置controller 方法中抛出的错误进行 json封装，并且和 config.xml 中进行对应！ begin-->
            <bean id="catchControllerExceptionAspect"
                  class="pers.roamer.boracay.aspect.catchcontroller.CatchControllerExceptionAspect"></bean>
            <aop:config>
                <aop:pointcut
                        id="catchControllerExceptionPointcut"
                        expression="execution(* pers.roamer.boracay.controller..*.*(..)) || ①execution(* com.ninelephas.raccoon.controller..*.*(..))"/>
                <aop:aspect ref="catchControllerExceptionAspect">
                    <aop:after-throwing throwing="ex" method="writeToHttpResponse"
                                        pointcut-ref="catchControllerExceptionPointcut"/>
                </aop:aspect>
            </aop:config>
            <!-- 配置controller 方法中抛出的错误进行 json封装，并且和 config.xml 中进行对应！ end-->
    ```
    
2. 只有①的地方需要根据具体项目需求进行变更。
    
3. 要对错误进行 json 话，需要在 url 后面加.json.否则还是返回标准的500错误的 stacktrace。
    
    例子：
    
    调用的 URL
    
    `http://127.0.0.1:8080/creator/rest/login.json`
    
4. 返回的错误数据信息如下：
    
    ```
    {
      "status": 500,
      "success": false,
      "message": "exception",
      "data": [
        {
          "nodesName": [
            "password"
          ],
          "errorMessage": "密码不匹配",
          "errorPath": "exception.creator.login.password_not_match"
        }
      ]
    }
    ```
    
    其中：

    - errorStack  错误堆栈列表。为了便于后台程序员定位错误！
    
    - errorPath 是在 controller 中抛出的 ControllerException 的 message。
        
    - errorMessage: 是在 config.xml 中对 message 进行的国际化和信息明细化后的内容。
        
    - nodesName : 也是在 config.xml 中定义的.用于和前台的 dom 组件绑定。
    
5. config.xml 中的相关内容如下:
    
    ```
        <!--定义错误信息-->
        <exception>
            <system>
                <need_login>
                    必须登录系统
                </need_login>
            </system>
    
            <creator>
                <register>
                    <mobile_used>
                        手机已经被注册过了！| mobile
                    </mobile_used>
                    <name_used>
                        用户名已经被注册过了！| passwd
                    </name_used>
                </register>
                <login>
                    <password_not_match>
                        密码不匹配|password
                    </password_not_match>
                    <user_not_exit>
                        无此用户|mobile
                    </user_not_exit>
                    <unHandle>
                        未捕获错误的登录失败
                    </unHandle>
                    <mobile_is_null>
                        手机号为空
                    </mobile_is_null>
                    <mobile_pattern_wrong>
                        手机号格式错误
                    </mobile_pattern_wrong>
                </login>
                <modify>
                    <password>
                        <validatecode_not_match>
                            修改密码的时候，验证码不正确！修改失败！| validate_code
                        </validatecode_not_match>
                    </password>
                </modify>
                <edit>
                    <user_not_exit>
                        无此用户 | mobile
                    </user_not_exit>
                    <not_company_account>
                        非公司账户
                    </not_company_account>
                    <not_personal_account>
                        非个人账户
                    </not_personal_account>
                </edit>
                <rebound_mobile>
                    <old_mobile_not_exist>
                        需要解绑的手机号不存在，或者需要重新登录| oldMobile
                    </old_mobile_not_exist>
                    <new_mobile_used>
                        要重新绑定的手机号已经被注册了，不能被绑定| newMobile
                    </new_mobile_used>
                </rebound_mobile>
            </creator>
    ```

### d. 对项目进行IP地址白名单访问许可的功能进行封装

1. 在 applicationContext.xml 中增加如下代码：
    
    ```
    <!-- 配置项目访问白名单功能 begin-->
    <bean id="whiteListCheckAspect"
          class="pers.roamer.boracay.aspect.whitelist.WhiteListCheckAspect"></bean>
    <aop:config>
        <aop:pointcut
                id="whiteListCheckPointcut"
                ①expression="execution(* com.ninelephas.raccoon.controller..*.*(..))"/>
        <aop:aspect ref="whiteListCheckAspect">
            <aop:before method="whiteListCheck"
                        pointcut-ref="whiteListCheckPointcut"/>
        </aop:aspect>
    </aop:config>
    <!-- 配置项目访问白名单功能 end-->

    ```
    
2. 只有①的地方需要根据具体项目需求进行变更。
    
    
> 项目的 exception 继承结构建议
    
    ProjectException extends BoracayException
     
    ServiceExcpetion extends ProjectException
    
    ControllerException extends ProjectException 
    
    service 层捕获所有的错误，重新封装成 ServiceException 抛出！
    controller 层捕获所有的错误，重新封装成 ControllerException 抛出！
    
    这样才能比较好的用到 boracay 组件里面的 优化Exception的功能。 
      


### e. 短信网关发送短信验证码的功能
    
1. 短信验证码的存放数据表单

    ```
    CREATE TABLE `sms_verification_code` (
      `id` varchar(40) NOT NULL,
      `session_id` varchar(40) NOT NULL COMMENT 'session_id',
      `op_id` varchar(40) NOT NULL COMMENT '操作类型',
      `phone_number` varchar(40) NOT NULL COMMENT '手机号码',
      `text` varchar(255) NOT NULL COMMENT '短信内容',
      `duration` int(11) NOT NULL COMMENT '有效时长',
      `is_used` tinyint(1) NOT NULL COMMENT '是否被使用',
      `created_time` datetime NOT NULL COMMENT '创建时间',
      `used_time` datetime DEFAULT NULL COMMENT '使用时间',
      `code` varchar(255) NOT NULL COMMENT '验证码',
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='短信验证码';
    
    SET FOREIGN_KEY_CHECKS = 1;
    
    ```
    
2. 配置文件

    在 config/config.xml 文件中增加必须要的配置项

    ```
     <!--短信接口-->
     <System>
            <Sms>
                <Url>http://222.73.117.158/msg/HttpBatchSendSM</Url>
                <Username>xxxxxx</Username>
                <Password>xxxxxx</Password>
                <BusinessMethod>
                    <Regist>
                        <!--注册验证码有效时长-->
                        <Duration>1800000</Duration>
                        <!--注册验证码长度-->
                        <Length>6</Length>
                        <Text>尊敬的用户，您注册的手机验证码为：${code}，请填入以完成注册。该验证码有效时间为${duration}分钟，限本次使用。</Text>
                    </Regist>
                    <ForgetPassword>
                        <!--忘记密码验证码有效时长-->
                        <Duration>1800000</Duration>
                        <!--忘记密码验证码长度-->
                        <Length>6</Length>
                        <Text>尊敬的用户，您正在使用忘记密码功能，您的手机验证码为：${code}，该验证码有效时间为${duration}分钟，限本次使用。</Text>
                    </ForgetPassword>
                    <ModifyPhoneNumber>
                        <!--修改手机号码验证码有效时长-->
                        <Duration>1800000</Duration>
                        <!--修改手机号码验证码长度-->
                        <Length>6</Length>
                        <Text>尊敬的用户，您正在使用修改手机号码功能，您的手机验证码为：${code}，该验证码有效时间为${duration}分钟，限本次使用。</Text>
                    </ModifyPhoneNumber>
                    <ModifyPassword>
                        <!--修改密码验证码有效时长-->
                        <Duration>1800000</Duration>
                        <!--修改密码验证码长度-->
                        <Length>6</Length>
                        <Text>尊敬的用户，您正在使用重置密码功能，您的手机验证码为：${code}，该验证码有效时间为${duration}分钟，限本次使用。</Text>
                    </ModifyPassword>
                </BusinessMethod>
             </Sms>
        </System>     
        <!---->
        
        <exception>
                <!--短信验证部分-->
                <sms>
                    <validate>
                        <vcode>
                            <not_set>
                                短信验证码没有设置!
                            </not_set>
                            <invalid>
                                短信验证码不存在！
                            </invalid>
                            <expired>
                                验证码过期！
                            </expired>
                            <not_match>
                                验证码不匹配！
                            </not_match>
                        </vcode>
                    </validate>
                </sms>
                <!---->
                
                ...
        <exception>
    
    ```

3. 切面配置

    在 applicationContext.xml 中配置切面
    
    ```
         <!-- ④配置项目中需要进行短信验证码验证的功能 begin-->
            <bean id="smsValidateCodeAspect"
                  class="pers.roamer.boracay.aspect.sms.SMSValidateCodeAspect"></bean>
            <aop:config>
                <aop:pointcut
                        id="smsValidateCodePointcut"
                        ①expression="execution(* com.ninelephas.raccoon.controller..*.*(..))"/>
                <aop:aspect ref="smsValidateCodeAspect">
                    <aop:before method="smsValidateCodeCheck"
                                pointcut-ref="smsValidateCodePointcut"/>
                </aop:aspect>
            </aop:config>
            <!-- ④配置项目中需要进行短信验证码验证的功能 end-->
    
    ```
    1. 只有①的地方,需要根据具体项目需求进行变更。
    
    2. 在需要进行短信验证的方法上加入注解
    
    @SMSValidateCode(opId = "001")
    
    其中的 opId 和生成短信验证码调用的时候定义的 opId一致

4. 发送短信验证码的方法

    `http://127.0.0.1:8080/sms/send/{phoneNumber}/{opid}`

5. 在需要进行短信验证的controller方法上加入注解。这个方法要求传入发送在手机上的验证码。

    使用 formData 的方法进行 controller 的调用。
        
    例如：
        
    ```
        传递的 formData
        第一个参数(用于原来的逻辑) ：
        
        creatorEntity
        
            {
                "mobile": "15800392200",
                "passwd": "passwd11"
            }
            
        第二个参数(短信验证码的参数结构，除去验证码参数值和验证码发往的手机，其他都不能修改):
        
        smsValidateBean
        
            {
                "validateCode":"24234",
                "mobile", "158004932098"
            }
    ```
    
    对应的 spring mvc 中的 controller 的方法定义如下:
        
    ```
        @BusinessMethod(value = "注册")
        @SMSValidateMethod(opId = "001")
        @PostMapping(value = "/creator/rest/register")
        public String register(@RequestPart("creatorEntity") CreatorEntity creator , @RequestPart("smsValidateBean") SMSValidateBean smsValidateBean ) throws ControllerException {
                ...
        }
        
    ```
    @SMSValidateMethod(opId = "001") 这个注解起到了对这个方法进行短信验证码验证的功能
    
6. 这个切面可以支持一个方法需要对多个手机校验码的需求。例如 重新绑定手机的功能，就需要输入发往老手机号码的验证码和发往新手机号码的验证码。
    调用方式：
    在 controller方法上加入注解 @SMSValidateCode(opId = {"ReboundOldMobile","ReboundNewMobile"}) 
    同理，这几个 opID 也需要在 config.xml 中定义


### f.  对所有 controller 层面的方法进行 session 的 keyword 判断，以便确定是否登录的切面功能
1. 切面配置
    在 applicationContext.xml 中配置切面
    ```
    <!-- ⑤配置项目中需要进行session check，确定是否登录的功能 begin-->
    <bean id="sessionCheckKeywordAspect"
          class="pers.roamer.boracay.aspect.httprequest.SessionCheckKeywordAspect"></bean>
    <aop:config>
        <aop:pointcut
                id="sessionKeywordCheckPointcut"
                expression="execution(* com.ninelephas.raccoon.controller..*.*(..))"/>
        <aop:aspect ref="sessionCheckKeywordAspect">
            <aop:before method="sessionKeywordCheck"
                        pointcut-ref="sessionKeywordCheckPointcut"/>
        </aop:aspect>
    </aop:config>
    <!-- ⑤配置项目中需要进行session check，确定是否登录的功能  end-->
    ```
    1. 只有①的地方,需要根据具体项目需求进行变更。
    
    2. 在controller 层的类上加入注解 
    
        @SessionCheckKeyword()
    
        代表这个类下面的方法都需要做 登录认证。
    
    3. 如果要排除某个方法不需要登录认证。就在方法的上面加入注解
    @SessionCheckKeyword(checkIt = false)

2. 在 config/config.xml 文件中确定有必须要的配置项
    
    `System.SessionUserKeyword`
    
3. 在系统的登录功能中使用如下语句来设置 sessionCheck 的关键词
    `httpSession.setAttribute(ConfigHelper.getConfig().getString("System.SessionUserKeyword"), "要设置的值");`

4. 短发发送的方法类在 SmsController.java 里面

### g.  在 Controller 或者 Service 的类方法中，使用工具类，把上传的文件保存在服务器端

1.  调用方法：
    
    `ArrayList<FileUploadResult> fileUploadResultArrayList1 = new UploadFileUtil().saveFile(files1, true);`

    第二个参数表示 是否把文件的摘要作为保存的文件的 id。
    保存在服务器端目录结构： 是根据 config.xml中的 System.UploadFile.saveFilePath 部分所指定的路径+以ID为名字的目录+上传的文件名


## 三. 在 spring boot 中的使用方法。

### a.在 spring boot 项目中启动 ApplicationListener
#### 1.在 spring boot 的配置文件application.yaml 中加入
```
context:
    listener:
        classes: pers.roamer.boracay.application.StartedListener
```
#### 2.配置 config.xml
把 config/config.xml 文件保存在 spring boot项目下的/src/main/resources目录下。
确定 spring boot 项目启动后的控制台，有相应的info 信息产生。

```
......
17-09-21 10:48:43 INFO  pers.roamer.boracay.application.StartedListener 65 行 onApplicationEvent - org.springframework.orm.jpa.SharedEntityManagerCreator#0
2017-09-21 10:48:43 INFO  pers.roamer.boracay.application.StartedListener 67 行 onApplicationEvent - 所有被装备的Bean列表显示完成
2017-09-21 10:48:43 INFO  pers.roamer.boracay.application.StartedListener 68 行 onApplicationEvent - 项目:[Raccoon Web Sample],启动完成
......
```

### 3.增加对Boracay 组件的扫描
在 spring boot 的Application 的 class 中，增加 
@ComponentScan("pers.roamer.boracay")
@EnableJpaRepositories("pers.roamer.boracay")
@EntityScan("pers.roamer.boracay.entity")

```
package pers.roamer.boracay.websample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@SpringBootApplication // same as @Configuration @EnableAutoConfiguration @ComponentScan
@ImportResource(locations={"classpath:boracay-config.xml"})
@ComponentScan("pers.roamer.boracay")
@EnableJpaRepositories("pers.roamer.boracay")
@EntityScan("pers.roamer.boracay.entity")
public class BoracayWebSampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(BoracayWebSampleApplication.class, args);
    }

    @RequestMapping("/")
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView("/index");
        return modelAndView;
    }
}
```

### 4.读取组件的配置信息
由于 Boracay 组件需要对各个项目的类包和类进行扫描和方法切入。这个配置是通过上面 spring framework 中的 applicationContext.xml 配置的。
同样，这些配置也必须给 spring boot 使用,
因此,在 resources 目录下建立一个 boracay-config.xml 文件。并且在 spring boot 的 主程序里面加入读取这个文件的配置
`@ImportResource(locations={"classpath:boracay-config.xml"})`

 boracay-config.xml 内容如下：, 配置的详细功能和前面的一样。

```
<?xml version="1.0" encoding="UTF-8"?>
<!--
  ~ Boracay - Web 项目实用组件框架
  ~
  ~ @author 徐泽宇 roamerxv@gmail.com
  ~ @version 1.0.0
  ~ Copyright (c) 2017. 徐泽宇
  ~
  -->

<beans xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns="http://www.springframework.org/schema/beans"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
          http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
          http://www.springframework.org/schema/aop
          http://www.springframework.org/schema/aop/spring-aop-4.3.xsd"
       >


    <!-- 配置徐泽宇的 boracay 框架要到的 aop begin-->
    <!-- ①配置业务方法日志记录的功能 begin-->
    <bean id="businessLogAspect" class="pers.roamer.boracay.aspect.businesslogger.BusinessLogAspect"></bean>
    <aop:config>
        <aop:pointcut
                id="logControllerPointcut"
                expression="execution(* pers.roamer.boracay.websample.controller..*.*(..)) &amp;&amp; !execution(* pers.roamer.boracay.websample.controller.TestController.logout(..))"/>
        <aop:pointcut
                id="beforeLogControllerPointcut"
                expression="execution(* pers.roamer.boracay.websample.controller.TestController.logout(..))"/>
        <aop:aspect ref="businessLogAspect">
            <aop:around method="logAroundAction" pointcut-ref="logControllerPointcut"/>
            <aop:before method="logBeforeAction" pointcut-ref="beforeLogControllerPointcut"/>
        </aop:aspect>
    </aop:config>
    <!-- ①配置业务方法日志记录的功能  end -->

    <!-- ②配置controller 方法中抛出的错误进行 json封装，并且和 config.xml 中进行对应！ begin-->
    <bean id="catchControllerExceptionAspect"
          class="pers.roamer.boracay.aspect.catchcontroller.CatchControllerExceptionAspect"></bean>
    <aop:config>
        <aop:pointcut
                id="catchControllerExceptionPointcut"
                expression="execution(* pers.roamer.boracay.controller..*.*(..)) || execution(* pers.roamer.boracay.websample.controller..*.*(..))"/>
        <aop:aspect ref="catchControllerExceptionAspect">
            <aop:after-throwing throwing="ex" method="writeToHttpResponse"
                                pointcut-ref="catchControllerExceptionPointcut"/>
        </aop:aspect>
    </aop:config>
    <!-- ②配置controller 方法中抛出的错误进行 json封装，并且和 config.xml 中进行对应！ end-->

    <!-- ③配置项目访问白名单功能 begin-->
    <!--<bean id="whiteListCheckAspect"-->
    <!--class="pers.roamer.boracay.aspect.whitelist.WhiteListCheckAspect"></bean>-->
    <!--<aop:config>-->
    <!--<aop:pointcut-->
    <!--id="whiteListCheckPointcut"-->
    <!--expression="execution(* com.ninelephas.raccoon.controller..*.*(..))"/>-->
    <!--<aop:aspect ref="whiteListCheckAspect">-->
    <!--<aop:before method="whiteListCheck"-->
    <!--pointcut-ref="whiteListCheckPointcut"/>-->
    <!--</aop:aspect>-->
    <!--</aop:config>-->
    <!-- ③配置项目访问白名单功能 end-->


    <!-- ④配置项目中需要进行短信验证码验证的功能 begin-->
    <bean id="smsValidateCodeAspect"
          class="pers.roamer.boracay.aspect.sms.SMSValidateCodeAspect"></bean>
    <aop:config>
        <aop:pointcut
                id="smsValidateCodePointcut"
                expression="execution(* pers.roamer.boracay.websample.controller..*.*(..))"/>
        <aop:aspect ref="smsValidateCodeAspect">
            <aop:before method="smsValidateCodeCheck"
                        pointcut-ref="smsValidateCodePointcut"/>
        </aop:aspect>
    </aop:config>
    <!-- ④配置项目中需要进行短信验证码验证的功能 end-->

    <!-- ⑤配置项目中需要进行session check，确定是否登录的功能 begin-->
    <bean id="sessionCheckKeywordAspect"
          class="pers.roamer.boracay.aspect.httprequest.SessionCheckKeywordAspect"></bean>
    <aop:config>
        <aop:pointcut
                id="sessionKeywordCheckPointcut"
                expression="execution(* pers.roamer.boracay.websample.controller..*.*(..))"/>
        <aop:aspect ref="sessionCheckKeywordAspect">
            <aop:before method="sessionKeywordCheck"
                        pointcut-ref="sessionKeywordCheckPointcut"/>
        </aop:aspect>
    </aop:config>
    <!-- ⑤配置项目中需要进行session check，确定是否登录的功能  end-->


    <!-- 不使用aop 方式，使用工具类的方式。以便更灵活的调用-->
    <!-- ⑥配置项目中需要启动自动保存上传文件的功能 -->
    <!--<bean id="uploadFileAutoSaveAspect"-->
    <!--class="pers.roamer.boracay.aspect.fileupload.FileAutoSaveAspect"></bean>-->
    <!--<aop:config>-->
    <!--<aop:pointcut-->
    <!--id="autoSavePointcut"-->
    <!--expression="execution(* pers.roamer.boracay.websample.controller..*.*(..))"/>-->
    <!--<aop:aspect ref="uploadFileAutoSaveAspect">-->
    <!--<aop:around method="saveFileAction"-->
    <!--pointcut-ref="smsValidateCodePointcut"/>-->
    <!--</aop:aspect>-->
    <!--</aop:config>-->
    <!-- ⑥配置项目中需要启动自动保存上传文件的功能 end -->

    <!-- 配置徐泽宇的 boracay 框架要到的 aop end-->

</beans>

```
### 5.动态定时任务

**先开启注解**

在启动类上添加下面的注解
```
@EnableQuartzCluster
```
**创建定时任务数据表**
```
drop table if exists qrtz_fired_triggers;
drop table if exists qrtz_paused_trigger_grps;
drop table if exists qrtz_scheduler_state;
drop table if exists qrtz_locks;
drop table if exists qrtz_simple_triggers;
drop table if exists qrtz_simprop_triggers;
drop table if exists qrtz_cron_triggers;
drop table if exists qrtz_blob_triggers;
drop table if exists qrtz_triggers;
drop table if exists qrtz_job_details;
drop table if exists qrtz_calendars;

create table qrtz_job_details(
sched_name varchar(120) not null,
job_name varchar(200) not null,
job_group varchar(200) not null,
description varchar(250) null,
job_class_name varchar(250) not null,
is_durable varchar(1) not null,
is_nonconcurrent varchar(1) not null,
is_update_data varchar(1) not null,
requests_recovery varchar(1) not null,
job_data blob null,
primary key (sched_name,job_name,job_group))
engine=innodb;

create table qrtz_triggers (
sched_name varchar(120) not null,
trigger_name varchar(200) not null,
trigger_group varchar(200) not null,
job_name varchar(200) not null,
job_group varchar(200) not null,
description varchar(250) null,
next_fire_time bigint(13) null,
prev_fire_time bigint(13) null,
priority integer null,
trigger_state varchar(16) not null,
trigger_type varchar(8) not null,
start_time bigint(13) not null,
end_time bigint(13) null,
calendar_name varchar(200) null,
misfire_instr smallint(2) null,
job_data blob null,
primary key (sched_name,trigger_name,trigger_group),
foreign key (sched_name,job_name,job_group)
references qrtz_job_details(sched_name,job_name,job_group))
engine=innodb;

create table qrtz_simple_triggers (
sched_name varchar(120) not null,
trigger_name varchar(200) not null,
trigger_group varchar(200) not null,
repeat_count bigint(7) not null,
repeat_interval bigint(12) not null,
times_triggered bigint(10) not null,
primary key (sched_name,trigger_name,trigger_group),
foreign key (sched_name,trigger_name,trigger_group)
references qrtz_triggers(sched_name,trigger_name,trigger_group))
engine=innodb;

create table qrtz_cron_triggers (
sched_name varchar(120) not null,
trigger_name varchar(200) not null,
trigger_group varchar(200) not null,
cron_expression varchar(120) not null,
time_zone_id varchar(80),
primary key (sched_name,trigger_name,trigger_group),
foreign key (sched_name,trigger_name,trigger_group)
references qrtz_triggers(sched_name,trigger_name,trigger_group))
engine=innodb;

create table qrtz_simprop_triggers
  (
    sched_name varchar(120) not null,
    trigger_name varchar(200) not null,
    trigger_group varchar(200) not null,
    str_prop_1 varchar(512) null,
    str_prop_2 varchar(512) null,
    str_prop_3 varchar(512) null,
    int_prop_1 int null,
    int_prop_2 int null,
    long_prop_1 bigint null,
    long_prop_2 bigint null,
    dec_prop_1 numeric(13,4) null,
    dec_prop_2 numeric(13,4) null,
    bool_prop_1 varchar(1) null,
    bool_prop_2 varchar(1) null,
    primary key (sched_name,trigger_name,trigger_group),
    foreign key (sched_name,trigger_name,trigger_group)
    references qrtz_triggers(sched_name,trigger_name,trigger_group))
engine=innodb;

create table qrtz_blob_triggers (
sched_name varchar(120) not null,
trigger_name varchar(200) not null,
trigger_group varchar(200) not null,
blob_data blob null,
primary key (sched_name,trigger_name,trigger_group),
index (sched_name,trigger_name, trigger_group),
foreign key (sched_name,trigger_name,trigger_group)
references qrtz_triggers(sched_name,trigger_name,trigger_group))
engine=innodb;

create table qrtz_calendars (
sched_name varchar(120) not null,
calendar_name varchar(200) not null,
calendar blob not null,
primary key (sched_name,calendar_name))
engine=innodb;

create table qrtz_paused_trigger_grps (
sched_name varchar(120) not null,
trigger_group varchar(200) not null,
primary key (sched_name,trigger_group))
engine=innodb;

create table qrtz_fired_triggers (
sched_name varchar(120) not null,
entry_id varchar(95) not null,
trigger_name varchar(200) not null,
trigger_group varchar(200) not null,
instance_name varchar(200) not null,
fired_time bigint(13) not null,
sched_time bigint(13) not null,
priority integer not null,
state varchar(16) not null,
job_name varchar(200) null,
job_group varchar(200) null,
is_nonconcurrent varchar(1) null,
requests_recovery varchar(1) null,
primary key (sched_name,entry_id))
engine=innodb;

create table qrtz_scheduler_state (
sched_name varchar(120) not null,
instance_name varchar(200) not null,
last_checkin_time bigint(13) not null,
checkin_interval bigint(13) not null,
primary key (sched_name,instance_name))
engine=innodb;

create table qrtz_locks (
sched_name varchar(120) not null,
lock_name varchar(40) not null,
primary key (sched_name,lock_name))
engine=innodb;

create index idx_qrtz_j_req_recovery on qrtz_job_details(sched_name,requests_recovery);
create index idx_qrtz_j_grp on qrtz_job_details(sched_name,job_group);

create index idx_qrtz_t_j on qrtz_triggers(sched_name,job_name,job_group);
create index idx_qrtz_t_jg on qrtz_triggers(sched_name,job_group);
create index idx_qrtz_t_c on qrtz_triggers(sched_name,calendar_name);
create index idx_qrtz_t_g on qrtz_triggers(sched_name,trigger_group);
create index idx_qrtz_t_state on qrtz_triggers(sched_name,trigger_state);
create index idx_qrtz_t_n_state on qrtz_triggers(sched_name,trigger_name,trigger_group,trigger_state);
create index idx_qrtz_t_n_g_state on qrtz_triggers(sched_name,trigger_group,trigger_state);
create index idx_qrtz_t_next_fire_time on qrtz_triggers(sched_name,next_fire_time);
create index idx_qrtz_t_nft_st on qrtz_triggers(sched_name,trigger_state,next_fire_time);
create index idx_qrtz_t_nft_misfire on qrtz_triggers(sched_name,misfire_instr,next_fire_time);
create index idx_qrtz_t_nft_st_misfire on qrtz_triggers(sched_name,misfire_instr,next_fire_time,trigger_state);
create index idx_qrtz_t_nft_st_misfire_grp on qrtz_triggers(sched_name,misfire_instr,next_fire_time,trigger_group,trigger_state);

create index idx_qrtz_ft_trig_inst_name on qrtz_fired_triggers(sched_name,instance_name);
create index idx_qrtz_ft_inst_job_req_rcvry on qrtz_fired_triggers(sched_name,instance_name,requests_recovery);
create index idx_qrtz_ft_j_g on qrtz_fired_triggers(sched_name,job_name,job_group);
create index idx_qrtz_ft_jg on qrtz_fired_triggers(sched_name,job_group);
create index idx_qrtz_ft_t_g on qrtz_fired_triggers(sched_name,trigger_name,trigger_group);
create index idx_qrtz_ft_tg on qrtz_fired_triggers(sched_name,trigger_group);

commit;
```
**在spring配置中添加quartz相关配置**
```
spring:
  quartz:
    #相关属性配置
    properties:
      org:
        quartz:
          scheduler:
            instanceName: clusteredScheduler
            instanceId: AUTO
          jobStore:
            class: org.quartz.impl.jdbcjobstore.JobStoreTX
            driverDelegateClass: org.quartz.impl.jdbcjobstore.StdJDBCDelegate
            tablePrefix: qrtz_
            isClustered: true
            clusterCheckinInterval: 10000
            useProperties: false
          threadPool:
            class: org.quartz.simpl.SimpleThreadPool
            threadCount: 10
            threadPriority: 5
            threadsInheritContextClassLoaderOfInitializingThread: true
    #数据库方式
    job-store-type: jdbc
```
**自定义Controller使用IScheduleService**
例如:
```
@RestController
@RequestMapping("/job")
@Slf4j
public class ScheduleController {

    @Autowired private IScheduleService scheduleService;

    /**
     * 添加cron定时任务
     *
     * @param cronJobDefinition
     */
    @PostMapping("/addCronJob")
    public void schedule(@RequestPart("cronJobDefinition") CronJobDefinition cronJobDefinition) {
        scheduleService.schedule(cronJobDefinition);
    }

    /**
     * 添加simple定时任务
     *
     * @param simpleJobDefinition
     */
    @PostMapping("/addSimpleJob")
    public void schedule(
            @RequestPart("simpleJobDefinition") SimpleJobDefinition simpleJobDefinition) {
        scheduleService.schedule(simpleJobDefinition);
    }
}
```
**如果有需要的，可以自定义SchedulerListener，JobListener和TriggerListener，并且交由spring来管理**
```
@Service
public class ScheduleListenerService extends SchedulerListenerSupport {
    //用来监听任务的执行状态
}

@Service
public class JobListenerService extends JobListenerSupport {
    //用来监听任务的执行状态
}

@Service
public class TriggerListenerService extends TriggerListenerSupport {
    //用来监听触发器的执行状态
}
```
