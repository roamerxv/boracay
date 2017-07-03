# boracay
提供 web 应用的一些实用功能框架

[ ![Download](https://api.bintray.com/packages/roamerxv/maven/boracay/images/download.svg) ](https://bintray.com/roamerxv/maven/boracay/_latestVersion)

## 1. 使用方法

### a. 在项目的 applicationContext.xml 文件中增加配置 jpa 扫描目录

```
<!-- 配置Spring Data JPA扫描目录 -->
<jpa:repositories base-package="pers.roamer.boracay,xxx.xxxxx.xxx(项目的 jpa 扫描目录)"/>
```

### b.在项目的 applicationContext.xml 文件中增加组件扫描目录,激活自动代理功能

```
<context:component-scan base-package="pers.roamer.boracay,xxxx.xxxxx.xxx"/>
<!-- 激活自动代理功能 -->
<aop:aspectj-autoproxy proxy-target-class="true"/>
```

### c. 在项目的 spring-mvc.xml 文件中增加 spring mvc 的包扫描目录

```
<context:component-scan base-package="pers.roamer.boracay,xxxx.xxxxx.xxx"/>
```

### d. 在项目的$classpath目录下增加config目录，并且增加config.xml 配置文件中，增加如下的项目配置项

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
        <!-- 用于 boracay 组件必须使用到的配置 end -->
    </System>
    ...
</Config>    
```

### e. 配置记录业务日志记录的切面

在 applicationContext.xml 中增加如下代码：

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

只有①和②的地方需要根据具体项目需求进行变更。

①的表达式是配置所有需要记录日志的 controller bean 中的方法，并且是排除了 logout 的方法。

②的表达式是配置所有需要在业务逻辑前进行日志记录的 controller bean 中的方法。典型的场景是 logout。

这些包含在表达式中的方法，如果用了  @BusinessMethod(value = "登录") 这样的方法注解。就会自动记录日志到日志表中。

可以再具体制定当前方法是否要日志记录，设置 isLogged = false 就可以对这个方法不记录日志。缺省是 true，代表记录日志。

@BusinessMethod(value = "登录" , isLogged = false )

如果整个项目，无论在controller 里面的业务方法里面是否指定 isLogged，都不需要记录日志。

可以在 config.xml 里面的 RecordBusinessLog 设置成 false。 

### f. 配置 对 exception 进行 json化, 国际化, 信息明细化的封装切面

在 applicationContext.xml 中增加如下代码：

```
    <!-- 配置controller 方法中抛出的错误进行 json封装，并且和 config.xml 中进行对应！ begin-->
    <bean id="catchControllerExceptionAspect"
          class="pers.roamer.boracay.aspect.catchcontroller.CatchControllerExceptionAspect"></bean>
    <aop:config>
        <aop:pointcut
                id="catchControllerExceptionPointcut"
                ①expression="execution(* com.ninelephas.raccoon.controller..*.*(..) )"/>
        <aop:aspect ref="catchControllerExceptionAspect">
            <aop:after-throwing throwing="ex" method="writeToHttpResponse"
                                pointcut-ref="catchControllerExceptionPointcut"/>
        </aop:aspect>
    </aop:config>
    <!-- 配置controller 方法中抛出的错误进行 json封装，并且和 config.xml 中进行对应！ end-->
```

只有①的地方需要根据具体项目需求进行变更。

要对错误进行 json 话，需要在 url 后面加.json.否则还是返回标准的500错误的 stacktrace。

例子：

调用的 URL

http://127.0.0.1:8080/creator/rest/login.json

返回的错误数据信息如下：

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

errorPath 是在 controller 中抛出的 ControllerException 的 message。

errorMessage: 是在 config.xml 中对 message 进行的国际化和信息明细化后的内容。

nodesName : 也是在 config.xml 中定义的.用于和前台的 dom 组件绑定。

config.xml 中的相关内容如下:

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

### g. 对项目进行白名单访问许可的功能进行封装的切面

在 applicationContext.xml 中增加如下代码：

```
    <!-- 配置项目访问白名单功能 begin-->
    <bean id="whiteListCheckAspect"
          class="pers.roamer.boracay.aspect.controller.WhiteListCheckAspect"></bean>
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

只有①的地方需要根据具体项目需求进行变更。

<font color="red">

项目的 exception 继承结构建议：

ProjectException extends BoracayException
 
ServiceExcpetion extends ProjectException

ControllerException extends ProjectException 

service 层捕获所有的错误，重新封装成 ServiceException 抛出！
controller 层捕获所有的错误，重新封装成 ControllerException 抛出！

这样才能比较好的用到 boracay 组件里面的 优化Exception的功能。 

</font>

### h. 系统日志表单的机构
 
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

### i. 短信网关发送短信验证码的功能
