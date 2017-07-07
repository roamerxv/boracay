/**
 * Created by roamer on 2017/4/27.
 */
var config_items_table;
var editor;

$().ready(
    function () {
        // 试用14天 ，无法破解。暂时不用编辑功能
        // editor = new $.fn.dataTable.Editor({
        //     table: "#config_items_table",
        //     display: 'bootstrap',
        //     idSrc: "id",
        //     ajax: {
        //         create: {
        //             type: 'POST',
        //             url: contextPath + "/config/rest/create"
        //         },
        //         edit: {
        //             type: 'PUT',
        //             url: contextPath + "/config/rest/edit?key=_id_"
        //         },
        //         remove: {
        //             type: 'DELETE',
        //             url: contextPath + "/config/rest/remove?key=_id_"
        //         }
        //     },
        //     fields: [{
        //         label: "属性 key",
        //         name: "key"
        //     }, {
        //         label: "属性值:",
        //         name: "value"
        //     }],
        //     i18n: {
        //         edit: {
        //             button: "修改",
        //             title: "修改配置项",
        //             submit: "更新"
        //         },
        //         create: {
        //             button: "增加",
        //             title: "增加配置项",
        //             submit: "增加"
        //         },
        //         remove: {
        //             button: "删除",
        //             title: "删除配置项",
        //             submit: "确认",
        //             confirm: {
        //                 _: "确认删除这条记录?",
        //                 1: "确认删除这条记录?"
        //             }
        //         }
        //     }
        // });
        config_items_table = $("#config_items_table").DataTable(
            {
                dom: "Bfrtip",
                "processing": true,
                "ordering": false, //禁止排序
                // "serverSide": true,
                "ajax": {
                    url: contextPath + "/configs",
                    type: 'get'
                },
                "language": {
                    "url": contextPath + "/assets/js/lib//DataTables-1.10.15/chinese.lang.json"
                },
                "columns": [
                    {"data": "key"},
                    {"data": "value"}
                ],
                "columnDefs": [{
                    orderable: false,
                    targets: [0, 1]
                }],
                select: true,
                // buttons: [
                //     {extend: "create", editor: editor},
                //     {extend: "edit", editor: editor},
                //     {extend: "remove", editor: editor}
                // ]
            });
    }
)
