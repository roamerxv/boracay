<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="<%=request.getContextPath()%>/assets/js/lib/jquery-3.2.1/jquery-3.2.1.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/js/lib/bootstrap-3.3.7/bootstrap.min.js"></script>
<link href="<%=request.getContextPath()%>/assets/css/lib/bootstrap-3.3.7/bootstrap.css" rel="stylesheet">

<%--使用HubSpot Messager做提示对话框 --%>
<script src="<%=request.getContextPath()%>/assets/js/lib/messenger-1.4.1/messenger.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/js/lib/messenger-1.4.1/messenger-theme-flat.js"></script>
<link href="<%=request.getContextPath()%>/assets/css/lib/messenger-1.4.1/messenger.css" rel="stylesheet"/>
<link href="<%=request.getContextPath()%>/assets/css/lib/messenger-1.4.1/messenger-theme-future.css" rel="stylesheet"/>
<link href="<%=request.getContextPath()%>/assets/css/lib/messenger-1.4.1/messenger-theme-air.css" rel="stylesheet">
<%--调用结束--%>
<%----%>
<script src="<%=request.getContextPath()%>/assets/js/lib/jquery-validation-1.16.0/jquery.validate.min.js"></script>

<%-- DataTables --%>
<script src="<%=request.getContextPath()%>/assets/js/lib/DataTables-1.10.15/jquery.dataTables.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/js/lib/DataTables-1.10.15/dataTables.bootstrap.js"></script>
<link href="<%=request.getContextPath()%>/assets/css/lib/DataTables-1.10.15/jquery.dataTables.min.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/assets/css/lib/DataTables-1.10.15/dataTables.bootstrap.min.css" rel="stylesheet">
<%----%>
<!-- bootstrap-datetimepicker -->
<link href="<%=request.getContextPath()%>/assets/css/lib/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/assets/js/lib/bootstrap-datetimepicker/bootstrap-datetimepicker.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/js/lib/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js" type="text/javascript" charset="UTF-8"></script>
<script src="<%=request.getContextPath()%>/assets/js/lib/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.fr.js" type="text/javascript"></script>

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
