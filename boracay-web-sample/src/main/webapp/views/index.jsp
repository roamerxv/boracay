<%--
  ~ Boracay - Web 项目实用组件框架
  ~
  ~ @author 徐泽宇 roamerxv@gmail.com
  ~ @version 1.0.0
  ~ Copyright (c) 2017. 徐泽宇
  ~
  --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<body>
<div class="admin-content">
    <div class="admin-content-body">
        <div class="am-cf am-padding">
            <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">首页</strong> /
                <small>一些常用模块</small>
            </div>
        </div>


        <div class="am-g">

            <div class="am-u-md-12">
                <div class="am-panel am-panel-default">
                    <div class="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-1'}">对项目的 exception 进行
                        josn 化的处理<span
                                class="am-icon-chevron-down am-fr"></span></div>
                    <div id="collapse-panel-1" class="am-panel-collapse am-collapse">
                        <ul>
                            <li>
                                针对项目中所有的 controller 层面的exception 进行处理。
                            </li>
                            <li>
                                并且根据调用的 url 的格式是 json 还是非 json，进行封装。
                            </li>
                            <li>
                                封装的内容可以在 config.xml 中进行定义。<br/>
                            </li>
                            <li>
                                具体配置参见 readme.md
                            </li>
                        </ul>
                        <pre>
为了能够涵盖所有的Exception。
项目 mvc 的构架中，所有的 controller 方法捕获被调用的 service 层的ServiceException 方法，封装成
ControllerException （用 new ControllerException(e.getMessage())）。
并且抛出 ControllerException 的方法
Service 层以及 Repository 层都抛出自己的Exception。不做截获。
如果需要，则构建ServiceException 然后抛出，以便于 Controller 层进行截获！
返回的 json 的 data 结构中有nodesName,errorMessage,errorPath 3个节点。对应的含义和用途是：
    1. nodesName ：是一个数组！ 可以和前端的 html 中的 dom 配合，可以用于错误信息提示或者绑定在那个 dom 上。如果在 config.xml 中没有配置，则命名为 publicError
    2. errorMessage： 错误信息。一般这个是配置在 config.xml 中，用于把 错误信息进行 I18N 化
    3. errorPath:  错误路径。和 Exception 构建的时候传递的字符串一致。例如：new ControllerException("exception.test.exception");则会获取exception.test.exception 这样的errprPath.
                        </pre>
                        Controller 层如果需要返回成功的 json 字符串。可以采用如下代码:
                        <pre><font color="red">return HttpResponseHelper.successInfoInbox("操作成功");</font>
                        </pre>

                        <section data-am-widget="accordion" class="am-accordion am-accordion-gapped" data-am-accordion='{  }'>
                            <dl class="am-accordion-item am-active">
                                <dt class="am-accordion-title">
                                    举个🌰（调用server 的一个业务功能，出现错误。通过配置错误信息，和前端的 html 中的 dom 绑定。然后通过响应的 js 组件，提示错误信息！）
                                </dt>
                                <dd class="am-accordion-bd am-collapse am-in">
                                    <!-- 规避 Collapase 处理有 padding 的折叠内容计算计算有误问题， 加一个容器 -->
                                    <div class="am-accordion-content">
                                        <%@include  file="exception/showException.jsp" %>
                                    </div>
                                </dd>
                            </dl>
                        </section>

                    </div>

                </div>
            </div>

            <div class="am-u-md-12">
                <div class="am-panel am-panel-default">
                    <div class="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-2'}">对业务方法自动记录日志<span
                            class="am-icon-chevron-down am-fr"></span></div>
                    <div id="collapse-panel-2" class="am-panel-collapse am-collapse">
                        <div>
                            <ul>
                                <li>
                                    在Controller 层的业务方法上加上注解@BusinessMoethod,就会自动在日志表里面加上记录。
                                    <pre>@BusinessMethod(value = "在 session 中设置 keyword")
                                    </pre>
                                </li>
                                <li>
                                    需要在数据库中建立 business_log 表。
                                </li>
                                <li>
                                    <font color="red">可以在项目和方法2个层面进行精细控制。</font>
                                </li>
                                <li>
                                    详细 配置见 README.md 文件。
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>

            <div class="am-u-md-12">
                <div class="am-panel am-panel-default">
                    <div class="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-3'}">对业务方法进行 session 判断<span
                            class="am-icon-chevron-down am-fr"></span></div>
                    <div id="collapse-panel-3" class="am-panel-collapse am-collapse">
                        <div>
                            <ul>
                                <li>
                                    在Controller 层的类上加上注解@SessionCheckKeyword(checkIt = true),就会自动对这个类里面的所有方法进行 session 检查。
                                    <pre>@SessionCheckKeyword(checkIt = true)
                                    </pre>
                                </li>
                                <li>
                                    如果在类上加了这个注册，在需要排除类中的某个方法不要进行检查的时候（比如 login，regsiter 等）。可以在方法上加入@SessionCheckKeyword(checkIt = false) 。
                                </li>
                                <li>
                                    当然，注解也可以直接加在 Controller 层类的方法上。
                                </li>
                                <li>
                                    需要在 config/config.xml 中配置项 System.SessionUserKeyword 。
                                    sessionCheck 根据 session 中这个System.SessionUserKeyword所指定的 value 这个关键词是否有内容，来进行判断是否登录。
                                </li>
                                <li>
                                    所以，在登录后需要调用这样的方法，来对 session 中进行设置关键词的值
                                    <pre>httpSession.setAttribute(ConfigHelper.getConfig().getString("System.SessionUserKeyword"), "要设置的值");
                                    </pre>
                                </li>
                                <li>
                                    详细 配置见 README.md 文件。
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>

            <div class="am-u-md-12">
                <div class="am-panel am-panel-default">
                    <div class="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-4'}">访问的授权白名单功能<span
                            class="am-icon-chevron-down am-fr"></span></div>
                    <div id="collapse-panel-4" class="am-panel-collapse am-collapse">

                    </div>
                </div>
            </div>

            <div class="am-u-md-12">
                <div class="am-panel am-panel-default">
                    <div class="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-5'}"> 短信验证码的功能<span
                            class="am-icon-chevron-down am-fr"></span></div>
                    <div id="collapse-panel-5" class="am-panel-collapse am-collapse">

                    </div>
                </div>
            </div>


        </div>
    </div>

    <footer class="admin-content-footer">
        <hr>
        <p class="am-padding-left">© 2014 AllMobilize, Inc. Licensed under MIT license.</p>
    </footer>
</div>
</body>
