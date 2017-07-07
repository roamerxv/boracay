$().ready(function() {
    $(".am-text-sm").click(function () {
        window.location.href = contextPath + '/jumpTo?viewName=/creator/modilfypassword';
    })
    $('#linkto_modify_password').click(function () {
        window.location.href = contextPath + '/jumpTo?viewName=/creator/modilfypassword';
    })
    $('#example').dataTable({
        "lengthMenu": [10, 15, 30],
        "ordering": false, //禁止排序
        "language": {
            "lengthMenu": "每页 _MENU_ 条记录",
            "zeroRecords": "没有找到记录",
            "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
            "infoEmpty": "无记录",
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "oPaginate": {
                "sPrevious": "上一页",
                "sNext": "下一页"
            }
        },
    });
});