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
