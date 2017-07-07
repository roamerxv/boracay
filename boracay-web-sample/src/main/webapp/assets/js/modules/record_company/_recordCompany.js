/**
 * Created by yugang on 2017/6/6.
 */
$().ready(function () {
  var record_company_select2;

  $.ajax({
    type: "get",
    async: false,
    url: contextPath + '/recordcompanys/list4Select2',
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      record_company_select2 = $("#record_company_select2").select2({
        data: data,
        width: '299px',
        language: "zh-CN",//汉化
        placeholder: '请选择唱片公司',//默认文字提示
        allowClear: true//允许清空
      });
      console.debug("缺省选择的是:" + record_company_select2.val());
    },
    error: function (data) {

    }
  });

  record_company_select2.on("change", function (e) {
    console.debug("选择了" + record_company_select2.val());
  });

})
