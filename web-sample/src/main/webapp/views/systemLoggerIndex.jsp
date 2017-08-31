<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>


<body>

<%@ include file="../views/layouts/_included_js.jsp" %>


<script src="<%=request.getContextPath()%>/assets/js/systemLogger/index.js"></script>
<link href="<%=request.getContextPath()%>/assets/css/systemLogger/index.css" rel="stylesheet"/>


<div class="dataTable_div">
    <table id="businesslog_table" class="table table-striped table-bordered hover">
        <thead>
        <tr>
            <th>产生时间</th>
            <th>操作员</th>
            <th>事件名称</th>
            <th>IP地址</th>
            <th>操作系统</th>
            <th>浏览器</th>
            <th>浏览器版本</th>
            <th>访问设备</th>
            <th>调用类</th>
            <th>调用方法</th>
            <th>运行结果</th>
        </tr>
        </thead>
        <tfoot>
        <tr>
            <th>产生时间</th>
            <th>操作员</th>
            <th>事件名称</th>
            <th>IP地址</th>
            <th>操作系统</th>
            <th>浏览器</th>
            <th>浏览器版本</th>
            <th>访问设备</th>
            <th>调用类</th>
            <th>调用方法</th>
            <th>运行结果</th>
        </tr>
        </tfoot>
    </table>
</div>

</body>
