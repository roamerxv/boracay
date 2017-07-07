/**
 * Created by yugang on 2017/7/5.
 */
$().ready(function () {
  var base_record_company_select2;

  $.ajax({
    type: "get",
    async: false,
    url: contextPath + '/recordcompanys/list4Select2',
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      base_record_company_select2 = $("#base_record_company_select2").select2({
        data: data,
        width: '299px',
        language: "zh-CN",//汉化
        placeholder: '请选择唱片公司',//默认文字提示
        allowClear: true//允许清空
      });
      console.debug("缺省选择的是:" + base_record_company_select2.val());
    },
    error: function (data) {

    }
  });

  base_record_company_select2.on("change", function (e) {
    console.debug("选择了" + base_record_company_select2.val());
  });

})
