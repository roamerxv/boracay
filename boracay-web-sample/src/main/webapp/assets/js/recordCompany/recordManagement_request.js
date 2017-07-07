/**
 * Created by yugang on 2017/6/7.
 */
/**
 * Created by yugang on 2017/6/6.
 */
var HttpUtils = (function () {
  /**
   * 封装基本请求方式
   */

    //还款管理的所有请求接口对象
  var application = {};
  /**
   * 基本信息提交
   */
  application.post_record_data = function(param,callback){
    var url = '/recordcompanys';
    BaseRequest.post_multipart_form_data(param,url,callback)
  }
  return application;
})();
