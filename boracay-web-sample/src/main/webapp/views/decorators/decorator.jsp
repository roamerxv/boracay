<%--
  ~ Boracay - Web 项目实用组件框架
  ~
  ~ @author 徐泽宇 roamerxv@gmail.com
  ~ @version 1.0.0
  ~ Copyright (c) 2017. 徐泽宇
  ~
  --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html class="no-js fixed-layout">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Boracay Web Sample</title>
    <meta name="description" content="Boracay Web Smaple">
    <meta name="keywords" content="index">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <link rel="icon" type="image/png" href="<%=request.getContextPath()%>/assets/AmazeUI-2.7.2/assets/i/favicon.png">
    <link rel="apple-touch-icon-precomposed"
          href="<%=request.getContextPath()%>/assets/AmazeUI-2.7.2/assets/i/app-icon72x72@2x.png">
    <meta name="apple-mobile-web-app-title" content="Amaze UI"/>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/AmazeUI-2.7.2/assets/css/amazeui.min.css"/>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/AmazeUI-2.7.2/assets/css/admin.css">

    <%--以下是项目用到的js 和 css--%>
    <script src="<%=request.getContextPath()%>/assets/js/lib/jquery-3.2.1/jquery-3.2.1.min.js"></script>
    <script src="<%=request.getContextPath()%>/assets/js/lib/bootstrap-3.3.7/bootstrap.min.js"></script>
    <link href="<%=request.getContextPath()%>/assets/css/lib/bootstrap-3.3.7/bootstrap.css" rel="stylesheet">

    <%--使用HubSpot Messager做提示对话框 --%>
    <script src="<%=request.getContextPath()%>/assets/js/lib/messenger-1.4.1/messenger.min.js"></script>
    <script src="<%=request.getContextPath()%>/assets/js/lib/messenger-1.4.1/messenger-theme-flat.js"></script>
    <link href="<%=request.getContextPath()%>/assets/css/lib/messenger-1.4.1/messenger.css" rel="stylesheet"/>
    <link href="<%=request.getContextPath()%>/assets/css/lib/messenger-1.4.1/messenger-theme-future.css"
          rel="stylesheet"/>
    <link href="<%=request.getContextPath()%>/assets/css/lib/messenger-1.4.1/messenger-theme-air.css" rel="stylesheet">
    <%--调用结束--%>
    <%----%>
    <script src="<%=request.getContextPath()%>/assets/js/lib/jquery-validation-1.16.0/jquery.validate.min.js"></script>

    <%-- DataTables --%>
    <script src="<%=request.getContextPath()%>/assets/js/lib/DataTables-1.10.15/jquery.dataTables.min.js"></script>
    <script src="<%=request.getContextPath()%>/assets/js/lib/DataTables-1.10.15/dataTables.bootstrap.js"></script>
    <link href="<%=request.getContextPath()%>/assets/css/lib/DataTables-1.10.15/jquery.dataTables.min.css"
          rel="stylesheet">
    <link href="<%=request.getContextPath()%>/assets/css/lib/DataTables-1.10.15/dataTables.bootstrap.min.css"
          rel="stylesheet">
    <%----%>
    <!-- bootstrap-datetimepicker -->
    <link href="<%=request.getContextPath()%>/assets/css/lib/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css"
          rel="stylesheet">
    <script src="<%=request.getContextPath()%>/assets/js/lib/bootstrap-datetimepicker/bootstrap-datetimepicker.js"
            type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/assets/js/lib/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js"
            type="text/javascript" charset="UTF-8"></script>
    <script src="<%=request.getContextPath()%>/assets/js/lib/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.fr.js"
            type="text/javascript"></script>

    <!-- end  -->
    <%--使用jonnyreeves/js-logger--%>
    <script src="<%=request.getContextPath()%>/assets/js/lib/jonnyreeves-js-logger/logger.min.js"></script>
    <%----%>

    <%--引入显示错误信息的组件所需要的 js 文件和 css 文件--%>
    <%@include file="../component/showExceptionJSComponent.jsp" %>
    <%--引入结束--%>

    <script src="<%=request.getContextPath()%>/assets/js/application.js"></script>
    <link href="<%=request.getContextPath()%>/assets/css/application.css" rel="stylesheet"/>

    <link href="<%=request.getContextPath()%>/assets/css/lib/layui/css/layui.css" rel="stylesheet"/>
    <script src="<%=request.getContextPath()%>/assets/js/lib/layui/layui.js"></script>


    <%--<script src="<%=request.getContextPath()%>/assets/js/lib/jQuery-File-Upload-9.18.0/js/jquery.xdr-transport.js"></script>
    <script src="<%=request.getContextPath()%>/assets/js/lib/jQuery-File-Upload-9.18.0/js/jquery.ui.widget.js"></script>
    <script src="<%=request.getContextPath()%>/assets/js/lib/jQuery-File-Upload-9.18.0/js/jquery.iframe-transport.js"></script>
    <script src="<%=request.getContextPath()%>/assets/js/lib/jQuery-File-Upload-9.18.0/js/jquery.fileupload.js"></script>
    <script src="<%=request.getContextPath()%>/assets/js/lib/jQuery-File-Upload-9.18.0/js/jquery.fileupload-ui.js"></script>--%>
    <script type="text/javascript">
        var contextPath = "<%=request.getContextPath()%>";
    </script>

</head>


<body>
<!--[if lte IE 9]>
<p class="browsehappy">你正在使用<strong>过时</strong>的浏览器，Amaze UI 暂不支持。 请 <a href="http://browsehappy.com/" target="_blank">升级浏览器</a>
    以获得更好的体验！</p>
<![endif]-->

<header class="am-topbar am-topbar-inverse admin-header">
    <div class="am-topbar-brand">
        <strong>Boracay Web Smaple</strong>
        <small>应用例子</small>
    </div>

    <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only"
            data-am-collapse="{target: '#topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span
            class="am-icon-bars"></span></button>

    <div class="am-collapse am-topbar-collapse" id="topbar-collapse">

        <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list">
            <li><a href="javascript:;"><span class="am-icon-envelope-o"></span> 收件箱 <span
                    class="am-badge am-badge-warning">5</span></a></li>
            <li class="am-dropdown" data-am-dropdown>
                <a class="am-dropdown-toggle" data-am-dropdown-toggle href="javascript:;">
                    <span class="am-icon-users"></span> 管理员 <span class="am-icon-caret-down"></span>
                </a>
                <ul class="am-dropdown-content">
                    <li><a href="#"><span class="am-icon-user"></span> 资料</a></li>
                    <li><a href="#"><span class="am-icon-cog"></span> 设置</a></li>
                    <li><a href="#"><span class="am-icon-power-off"></span> 退出</a></li>
                </ul>
            </li>
            <li class="am-hide-sm-only"><a href="javascript:;" id="admin-fullscreen"><span
                    class="am-icon-arrows-alt"></span> <span class="admin-fullText">开启全屏</span></a></li>
        </ul>
    </div>
</header>

<div class="am-cf admin-main">
    <!-- sidebar start -->
    <div class="admin-sidebar am-offcanvas" id="admin-offcanvas">
        <div class="am-offcanvas-bar admin-offcanvas-bar">
            <ul class="am-list admin-sidebar-list">
                <li><a href="<%=request.getContextPath()%>/"><span class="am-icon-home"></span> 首页</a></li>
                <li class="admin-parent">
                    <a class="am-cf" data-am-collapse="{target: '#collapse-nav'}"><span class="am-icon-file"></span>
                        exception josn 化的功能<span class="am-icon-angle-right am-fr am-margin-right"></span></a>
                    <ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-nav">
                        <li><a href="<%=request.getContextPath()%>/test/500_error.json" target="_test"
                               class="am-cf"><span class="am-icon-check"></span> exception josn 化<span
                                class="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
                        <li><a href="<%=request.getContextPath()%>/test/500_error" target="_test" class="am-cf"><span
                                class="am-icon-check"></span> exception 不 josn 化<span
                                class="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="am-cf" data-am-collapse="{target: '#collapse-nav2'}"><span class="am-icon-file"></span>
                        记录日志的业务方法<span class="am-icon-angle-right am-fr am-margin-right"></span></a>
                    <ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-nav2">
                        <li><a href=""<%=request.getContextPath()%>/test/businessMethodLog.json" target="_test"
                            class="am-cf"><span class="am-icon-check"></span>调用一个需要记录日志的方法<span
                                    class="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
                        <li><a href="<%=request.getContextPath()%>/views/systemLoggerIndex.jsp"
                               class="am-cf"><span
                                class="am-icon-check"></span> 日志结果查看<span
                                class="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="am-cf" data-am-collapse="{target: '#collapse-nav3'}"><span class="am-icon-file"></span>
                        自动 session 判断<span class="am-icon-angle-right am-fr am-margin-right"></span></a>
                    <ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-nav3">
                        <li><a href=""<%=request.getContextPath()%>/test/noSessionCheck.json" target="_test"
                            class="am-cf"><span class="am-icon-check"></span>访问一个不需要 session 判断的方法<span
                                    class="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>

                        <li><a href="<%=request.getContextPath()%>/test/sessionCheck.json" target="_test"
                               class="am-cf"><span
                                class="am-icon-check"></span> 访问一个需要 session 判断的方法<span
                                class="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>

                        <li><a href="<%=request.getContextPath()%>/test/setSessionKeyword.json" target="_test"
                               class="am-cf"><span
                                class="am-icon-check"></span> 在 session 中设置一个keyword(login)<span
                                class="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
                        <li><a href="<%=request.getContextPath()%>/test/logout.json" target="_test"
                               class="am-cf"><span
                                class="am-icon-check"></span>清理 session 中所有的值（logout）<span
                                class="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
                    </ul>
                </li>
                <li><a href="#"><span class="am-icon-sign-out"></span> 注销</a></li>
            </ul>
        </div>
    </div>
    <!-- sidebar end -->

    <!-- content start -->
    <div class="admin-content">
        <sitemesh:write property='body'/>
    </div>
    <!-- content end -->

</div>

<a href="#" class="am-icon-btn am-icon-th-list am-show-sm-only admin-menu"
   data-am-offcanvas="{target: '#admin-offcanvas'}"></a>

<!--[if lt IE 9]>
<!--<script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>-->
<script src="http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js"></script>
<script src="<%=request.getContextPath()%>/assets/AmazeUI-2.7.2/assets/js/amazeui.ie8polyfill.min.js"></script>
<![endif]-->

<!--[if (gte IE 9)|!(IE)]><!-->
<%--<script src="<%=request.getContextPath()%>/assets/AmazeUI-2.7.2/assets/js/jquery.min.js"></script>--%>
<!--<![endif]-->
<script src="<%=request.getContextPath()%>/assets/AmazeUI-2.7.2/assets/js/amazeui.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/AmazeUI-2.7.2/assets/js/app.js"></script>


</body>
</html>
