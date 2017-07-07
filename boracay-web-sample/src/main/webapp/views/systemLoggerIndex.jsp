<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../views/layouts/_included_js.jsp" %>

<style>


    .dataTable_div {
        font-size: 0.2em;
        width: 100%;
    }

    #businesslog_table{
        font-size: 0.4em;
    }

    #businesslog_table tbody tr td.success_type {
        color: green;
    }

    #businesslog_table tbody tr td.fail_type {
        color: red;
        font-size: 1.0em;
    }

</style>

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

<script>
    $().ready(function () {
        businesslog_table = $("#businesslog_table").DataTable({
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "ajax": {
                url: contextPath + "/system/businesslog/getDataWithPaged",
                type: 'post',
                data: function (data) {
                    return JSON.stringify(data);
                },
                dataType: "json",
                processData: true,
                contentType: 'application/json;charset=UTF-8',
                dataSrc: 'logs'
            },
            "language": {
                "url": contextPath + "/assets/js/lib//DataTables-1.10.15/chinese.lang.json"
            },
            "columns": [{
                "data": "createdAt" // 发生时间
            }, {
                "data": "operator" // 操作员
            }, {
                "data": "methodDescription" // 事件描述
            }, {
                "data": "remoteIp" // IP地址
            }, {
                "data": "clientOs" // 操作系统
            }, {
                "data": "clientBrowser" // 浏览器
            }, {
                "data": "browserVersion" // 浏览器版本
            }, {
                "data": "clientDeviceType" // 访问设备
            }, {
                "data": "clazz" // 调用类
            }, {
                "data": "method" // 调用方法
            }, {
                "data": "success" // 调用方法
            }],
            "order": [[0, "desc"]],
            "columnDefs": [{
                "orderable": false,
                "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9]
            }, {
                "render": function (data, type, row) {
                    var prompt = "";
                    if (data) {
                        prompt = "成功";
                    } else {
                        prompt = "失败";
                    }
                    return prompt;
                },
                "targets": 10
            }],
            "createdRow": function (row, data, index) {
                if (data.success) {
                    $('td', row).eq(10).addClass('success_type');
                } else {
                    $('td', row).eq(10).addClass('fail_type');
                }
            }

        });
    });
</script>
