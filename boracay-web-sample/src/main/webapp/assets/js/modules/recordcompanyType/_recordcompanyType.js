/**
 * Created by yugang on 2017/5/31.
 */
$().ready(function () {
  var recordcompany_type_select2;

  $.ajax({
    type: "get",
    async: false,
    url: contextPath + '/music/genre/rest/list',
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      recordcompany_type_select2 = $("#recordcompany_type_select2").select2({
        data: data,
        width: '299px',
        language: "zh-CN",//汉化
        placeholder: '请选择音乐类型',//默认文字提示
        allowClear: true//允许清空
      });
      console.debug("缺省选择的是:" + recordcompany_type_select2.val());
    },
    error: function (data) {

    }
  });

  recordcompany_type_select2.on("change", function (e) {
    console.debug("选择了" + recordcompany_type_select2.val());
  });

})
