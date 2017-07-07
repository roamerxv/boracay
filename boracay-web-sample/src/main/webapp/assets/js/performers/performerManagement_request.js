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
  application.post_performer_data = function(param,callback){
    var url = '/performer/add';
    BaseRequest.post_multipart_form_data(param,url,callback)
  }
  application.get_performerEcho_data = function(param,callback){
    var url = '/performer';
    BaseRequest.get(param,url,callback,'url')
  }
  //修改年代
  application.modify_performerYear_data = function(param,callback){
    var url = '/performer/addOrUpdate/age';
    BaseRequest.post(param,url,callback)
  }
  //删除一个年代
  application.del_performerStyle_data = function(param,callback){
    var url = 'performer/delete/genres';
    BaseRequest.delete(param,url,callback,'url')
  }
  //新增一个流派
  application.post_performerStyle_data = function(param,callback){
      var url = '/performer/add/genres';
      BaseRequest.post(param,url,callback)
    }
    //修改唱片公司
  application.post_performerRecord_data = function(param,callback){
    var url = '/performer/addOrUpdate/record';
    BaseRequest.post(param,url,callback)
  }
  //删除唱片公司
  application.del_performerRecord_data = function(param,callback){
    var url = '/performer/addOrUpdate/record';
    BaseRequest.post(param,url,callback)
  }
  //修改一个网站
  application.modify_performerSite_data = function(param,callback){
    var url = '/performer/modify/site';
    BaseRequest.post(param,url,callback)
  }
  //删除一个网站信息
  application.del_performerSite_data = function(param,callback){
    var url = '/performer/delete/site';
    BaseRequest.delete(param,url,callback,'url')
  }
  //新增一个网站
  application.post_performerSite_data = function(param,callback){
    var url = '/performer/add/site';
    BaseRequest.post(param,url,callback)
  }
  //修改各国名称
  application.modify_performerName_data = function(param,callback){
    var url = '/performer/modify/language';
    BaseRequest.post(param,url,callback)
  }
  //新增各国名称
  application.post_performerName_data = function(param,callback){
    var url = '/performer/add/language';
    BaseRequest.post(param,url,callback)
  }
  //修改基本信息
  application.post_performerBase_data = function(param,callback){
    var url = '/performer/update/basic';
    BaseRequest.post(param,url,callback)
  }
  application.post_record_data = function(param,callback){
    var url = '/recordcompanys';
    BaseRequest.post_multipart_form_data(param,url,callback)
  }
  //删除封面
  application.del_prefor_pic = function(param,callback){
    var url = '/performer/delete';
    BaseRequest.delete(param,url,callback,'url')
  }
  //获取流派
  application.get_style = function(callback){
    var url = '/music/genre/rest/list';
    BaseRequest.get('',url,callback)
  }
  //获取唱片公司
  application.get_recordCompany = function(callback){
    var url = '/recordcompanys/list4Select2';
    BaseRequest.get('',url,callback)
  }
  return application;
})();
