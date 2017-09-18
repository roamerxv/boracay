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

    <script src="<%=request.getContextPath()%>/assets/js/lib/jquery-3.2.1/jquery-3.2.1.min.js"></script>
    <script src="<%=request.getContextPath()%>/assets/AmazeUI-2.7.2/assets/js/amazeui.min.js"></script>
    <script src="<%=request.getContextPath()%>/assets/AmazeUI-2.7.2/assets/js/app.js"></script>
    <%@ include file="../layouts/_included_js.jsp" %>
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
                               class="am-cf">exception josn 化</a></li>
                        <li><a href="<%=request.getContextPath()%>/test/500_error" target="_test" class="am-cf">exception
                            不 josn 化</a></li>
                    </ul>
                </li>
                <li>
                    <a class="am-cf" data-am-collapse="{target: '#collapse-nav2'}"><span class="am-icon-file"></span>
                        记录日志的业务方法<span class="am-icon-angle-right am-fr am-margin-right"></span></a>
                    <ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-nav2">
                        <li><a href="<%=request.getContextPath()%>/test/businessMethodLog.json" target="_test"
                               class="am-cf">调用一个需要记录日志的方法</a></li>
                        <li><a href="<%=request.getContextPath()%>/views/systemLoggerIndex.jsp"
                               class="am-cf">日志结果查看<span
                                class="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="am-cf" data-am-collapse="{target: '#collapse-nav3'}"><span class="am-icon-file"></span>
                        自动 session 判断<span class="am-icon-angle-right am-fr am-margin-right"></span></a>
                    <ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-nav3">
                        <li><a href=""<%=request.getContextPath()%>/test/noSessionCheck.json" target="_test"
                            class="am-cf">访问一个不需要 session 判断的方法</a></li>

                        <li><a href="<%=request.getContextPath()%>/test/sessionCheck.json" target="_test"
                               class="am-cf">访问一个需要 session 判断的方法</a></li>

                        <li><a href="<%=request.getContextPath()%>/test/setSessionKeyword.json" target="_test"
                               class="am-cf">在 session 中设置一个keyword(login)</a></li>
                        <li><a href="<%=request.getContextPath()%>/test/logout.json" target="_test"
                               class="am-cf">清理 session 中所有的值（logout</a></li>
                    </ul>
                </li>
                <li><a href="#"><span class="am-icon-sign-out"></span> 注销</a></li>
            </ul>
        </div>
    </div>
    <!-- sidebar end -->

    <!-- content start -->
    <div class="admin-content" style="padding: 5px">
        <sitemesh:write property='body'/>
    </div>


    <!-- content end -->

</div>

</body>
</html>
