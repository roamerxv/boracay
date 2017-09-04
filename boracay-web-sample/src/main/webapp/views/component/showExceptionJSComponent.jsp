<%--
  Created by IntelliJ IDEA.
  User: roamer
  Date: 2017/5/18
  Time: 下午3:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"
         pageEncoding="UTF-8" %>
    <%--载入前台 UI 显示错误信息所用到的 js 文件引入--%>
    <script src="<%=request.getContextPath()%>/assets/js/lib/jquery-ui-1.12.1/jquery-ui.js"></script>
    <link href="<%=request.getContextPath()%>/assets/css/lib/jquery-ui-1.12.1/jquery-ui.css" rel="stylesheet"/>

    <script src="<%=request.getContextPath()%>/assets/js/lib/qtip2-3.0.3/jquery.qtip.js"></script>
    <link href="<%=request.getContextPath()%>/assets/css/lib/qtip2-3.0.3/jquery.qtip.css" rel="stylesheet"/>
    <%--调用结束--%>

    <%--使用HubSpot Messager做提示对话框 --%>
    <script src="<%=request.getContextPath()%>/assets/js/lib/messenger-1.4.1/messenger.min.js"></script>
    <script src="<%=request.getContextPath()%>/assets/js/lib/messenger-1.4.1/messenger-theme-flat.js"></script>
    <link href="<%=request.getContextPath()%>/assets/css/lib/messenger-1.4.1/messenger.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/assets/css/lib/messenger-1.4.1/messenger-theme-future.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/assets/css/lib/messenger-1.4.1/messenger-theme-air.css" rel="stylesheet">
    <%--调用结束--%>

    <script src="<%=request.getContextPath()%>/assets/js/component/showExceptionOrMessage.js"></script>
