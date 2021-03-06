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

<style type="text/css">
    .panel-heading {
        background: lightblue !important;
    }
</style>


<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="exception">
            <h4 class="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"
                   aria-expanded="true" aria-controls="collapseOne">
                    exception 拦截，并且自动 json 化。 方便 ajax 方式的调用！
                </a>
            </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="exception">
            <div class="panel-body">
                <div id="collapse-panel-1" class="am-panel-collapse am-collapse">
                    <ol>
                        <li>
                            针对项目中所有的 controller 层面的exception 进行处理。
                        </li>
                        <li>
                            并且根据调用的 url 的格式是 json 还是非 json，进行封装。
                            <br/>
                            例子
                            <ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-nav">
                                <li>
                                    <a href="<%=request.getContextPath()%>/test/500_error.json" target="_test"
                                       class="am-cf"><font color="blue">exception josn 化(调用 url:
                                        /test/500_error.json)</font></a>

                                </li>
                                <li>
                                    <a href="<%=request.getContextPath()%>/test/500_error" target="_test" class=""><font
                                            color="green">
                                        exception 不 josn 化(调用 url: /test/500_error)</font></a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            封装的内容可以在 config.xml 中进行定义。
                        </li>
                        <li>
                            具体配置参见<a href="https://github.com/roamerxv/boracay/blob/master/README.md">README.md</a>
                        </li>
                    </ol>
                    <pre>
    为了能够涵盖所有的Exception。
    项目 mvc 的构架中，所有的 controller 方法捕获被调用的 service 层的ServiceException 方法，封装成
    ControllerException （用 new ControllerException(e.getMessage())）。
    并且抛出 ControllerException
    Service 层以及 Repository 层都抛出自己的Exception。不做截获。
    如果需要，则构建ServiceException 然后抛出，以便于 Controller 层进行截获！
    返回的 json 的 data 结构中有nodesName,errorMessage,errorPath 3个节点。对应的含义和用途是：
    1. nodesName ：是一个数组！ 可以和前端的 html 中的 dom 配合，可以用于错误信息提示或者绑定在那个 dom 上。如果在 config.xml 中没有配置，则命名为
    publicError
    2. errorMessage： 错误信息。一般这个是配置在 config.xml 中，用于把 错误信息进行 I18N 化
    3. errorPath: 错误路径。和 Exception 构建的时候传递的字符串一致。例如：new ControllerException("exception.test.exception");则会获取exception.test.exception 这样的errorPath.
                    </pre>

                    Controller 层如果需要返回成功的 json 字符串。可以采用如下代码:
                    <pre><font color="red">return HttpResponseHelper.successInfoInbox("操作成功");</font></pre>

                    <section data-am-widget="accordion" class="am-accordion am-accordion-gapped"
                             data-am-accordion='{  }'>
                        <dl class="am-accordion-item am-active">
                            <dt class="am-accordion-title">
                                举个🌰（调用server 的一个业务功能，出现错误。通过配置错误信息，和前端的 html 中的 dom 绑定。然后通过响应的 js 组件，提示错误信息！）
                            </dt>
                            <dd class="am-accordion-bd am-collapse am-in">
                                <!-- 规避 Collapase 处理有 padding 的折叠内容计算计算有误问题， 加一个容器 -->
                                <div class="am-accordion-content">
                                    <%@include file="exception/showException.jsp" %>
                                </div>
                            </dd>
                        </dl>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="syslog">
            <h4 class="panel-title">
                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion"
                   href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    自动记录业务日志
                </a>
            </h4>
        </div>
        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="syslog">
            <div class="panel-body">
                <div class="am-u-md-12">
                    <div class="am-panel am-panel-default">
                        <div class="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-2'}">
                            对业务方法自动记录日志<span
                                class="am-icon-chevron-down am-fr"></span></div>
                        <div id="collapse-panel-2" class="am-panel-collapse am-collapse">
                            <div>
                                <ul>
                                    <li>
                                        在Controller 层的业务方法上加上注解@BusinessMoethod,就会自动在日志表里面加上记录。
                                        <pre>@BusinessMethod(value = "在 session 中设置 keyword")</pre>
                                    </li>
                                    <li>
                                        需要在数据库中建立 business_log 表。
                                    </li>
                                    <li>
                                        <font color="red">可以在项目和方法2个层面进行精细控制。</font>
                                    </li>
                                    <li>
                                        详细 配置见 <a href="https://github.com/roamerxv/boracay/blob/master/README.md">README.md</a>
                                        文件。
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <br/>
                                <div>演示</div>
                                <hr/>
                                <div>
                                    <span><a href="<%=request.getContextPath()%>/test/businessMethodLog.json"
                                             target="_test"
                                             class="">调用一个<font color="red">需要</font>记录日志的方法</a></span>
                                </div>
                                <div>
                                    <span><a href="<%=request.getContextPath()%>/views/systemLoggerIndex.jsp"
                                             class="">查看日志</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingThree">
            <h4 class="panel-title">
                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion"
                   href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    对业务方法进行 session 判断
                </a>
            </h4>
        </div>
        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
            <div class="panel-body">

                <div id="collapse-panel-3" class="am-panel-collapse am-collapse">
                    <div>
                        <ul>
                            <li>
                                在Controller 层的类上加上注解@SessionCheckKeyword(checkIt = true),就会自动对这个类里面的所有方法进行 session
                                检查。
                                <pre>@SessionCheckKeyword(checkIt = true)</pre>
                            </li>
                            <li>
                                如果在类上加了这个注册，在需要排除类中的某个方法不要进行检查的时候（比如 login，regsiter
                                等）。可以在方法上加入@SessionCheckKeyword(checkIt = false) 。
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
                                <pre>httpSession.setAttribute(ConfigHelper.getConfig().getString("System.SessionUserKeyword"), "要设置的值");</pre>
                            </li>
                            <li>
                                详细 配置见 <a href="https://github.com/roamerxv/boracay/blob/master/README.md">README.md</a>
                                文件。
                            </li>
                        </ul>
                    </div>
                    <div>
                        演示
                        <hr/>
                        <ul class="">
                            <li><a href="<%=request.getContextPath()%>/test/noSessionCheck.json" target="_test"
                                   class="">访问一个不需要 session 判断的方法</a></li>

                            <li><a href="<%=request.getContextPath()%>/test/sessionCheck.json" target="_test"
                                   class="">访问一个需要 session 判断的方法</a></li>

                            <li><a href="<%=request.getContextPath()%>/test/setSessionKeyword.json" target="_test"
                                   class="">在 session 中设置一个keyword(login)</a></li>
                            <li><a href="<%=request.getContextPath()%>/test/logout.json" target="_test"
                                   class="">清理 session 中所有的值（logout)</a></li>
                            <li><a href="<%=request.getContextPath()%>/views/systemLoggerIndex.jsp"
                                   class="">查看日志</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingFour">
            <h4 class="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour"
                   aria-expanded="false"
                   aria-controls="collapseFour">
                    黑白名单功能
                </a>
            </h4>
        </div>
        <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
            <div class="panel-body">
                详细参考 <a href="https://github.com/roamerxv/boracay/blob/master/README.md">README.md</a> 文件
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingFive">
            <h4 class="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive"
                   aria-expanded="false"
                   aria-controls="collapseFour">
                    短信验证码的功能
                </a>
            </h4>
        </div>
        <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
            <div class="panel-body">
                详细参考 <a href="https://github.com/roamerxv/boracay/blob/master/README.md">README.md</a> 文件
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingSix">
            <h4 class="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSix"
                   aria-expanded="false"
                   aria-controls="collapseFour">
                    同时提交表单和文件，并且自动保存上传文件到服务器的功能
                </a>
            </h4>
        </div>
        <div id="collapseSix" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingSix">
            <div class="panel-body">
                详细参考 <a href="https://github.com/roamerxv/boracay/blob/master/README.md">README.md</a> 文件
                <div class="am-accordion-content">
                    <br/>
                    演示
                    <hr>
                    测试同时提交表单和文件的演示
                    <%@include file="fileUpload/fileUpload.jsp" %>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
