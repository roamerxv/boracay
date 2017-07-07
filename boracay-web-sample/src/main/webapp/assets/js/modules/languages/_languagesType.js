/**
 * Created by yugang on 2017/5/26.
 */
$().ready(function () {
  var languages_type_select2;
  var language = $("#languages_type_select2")
  $.ajax({
    type: "get",
    async: false,
    url: contextPath + '/music/language/rest/list',
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      languages_type_select2 = $("#languages_type_select2").select2({
        data: data,
        width: '299px',
        language: "zh-CN",//汉化
        placeholder: '请选择语种',//默认文字提示
        allowClear: true//允许清空
      });
      Logger.debug("缺省选择的是:" + languages_type_select2.val());
    },
    error: function (data) {

    }
  });
  language.on("change", function (e) {
    Logger.debug("选择了" + language.val());
  });

})
