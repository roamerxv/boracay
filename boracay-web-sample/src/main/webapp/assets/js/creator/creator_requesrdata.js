/**
 * Created by user on 2017/5/31.
 */
var HttpUtils = (function () {
    var application = {};
    /**
     *
     */
    application.post_consummat_info = function (param, callback) {
        var url = "/creator/rest/company_info.json";
        BaseRequest.post_multipart_form_data(param, url, callback);
    }
    application.post_personal_info = function (param, callback) {
        var url = "/creator/rest/personal_info.json";
        BaseRequest.post_multipart_form_data(param, url, callback);
    }

    //修改公司账户信息
    application.post_company_info = function (param, callback) {
        var url = "/creator/update/company_info";
        BaseRequest.post_multipart_form_data(param, url, callback, url);
    }
    //用户支付信息保存
    application.post_payment_info_data = function (param, callback) {
        var url = '/creator/rest/payment_info';
        BaseRequest.post(param, url, callback, url)
    }


    //用户头像回显
    application.get_creator_avatar_data = function (param, callback) {
        var url = '/creator/avatar';
        BaseRequest.get(param, url, callback, url)
    }
    //公司账户信息回显
    application.get_company_info_data = function (param, callback, paramType) {
        var url = '/creator/company';
        BaseRequest.get(param, url, callback, url)
    }
    //个人账户信息回显
    application.get_personal_info_data = function (param, callback) {
        var url = '/creator/personal';
        BaseRequest.get(param, url, callback, url)
    }
    //支付信息回显
    application.get_payment_info_data = function (param, callback) {
        var url = '/creator/payment_info';
        BaseRequest.get(param, url, callback, url)
    }

    return application
})()