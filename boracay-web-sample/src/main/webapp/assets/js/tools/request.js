/**
* @Author 杨家馨
* @Date 2017-5-16
* @description 网络层封装
*/

/**
 * 封装基本请求方式
 */
window.BaseRequest = (function () {
    //发送请求的所有方式
    var request = {};

    /**
     * 基本请求
     */
    function baseRequestFunc(type,param,url,async,contentType,dataType,processData,opt_suc,paramType,opt_error) {
        var cur_url = contextPath+url;
        var now_url = '';
        //当把参数作为路由的一部分时此时的参数为字符串;
        (paramType&&paramType=='url')?(now_url=cur_url+'/'+param+'.json'):(now_url=cur_url+'.json');
        //这个里面是最基本的ajax
        $.ajax({
            type:type,
            data:param,
            url:now_url,
            async:async,//默认为true
            contentType:contentType,//默认为application/x-www-form-urlencoded
            dataType:dataType,//默认为预期服务器返回的数据类型
            processData:processData,//默认为true
            success:function(data,textStatus,jqXHR){
                if($.isFunction(opt_suc)){
                    opt_suc(data,textStatus,jqXHR);
                }
            },
            error:function(data){
              showExceptionTip(data)
                if($.isFunction(opt_error)){
                    opt_error();
                }
            }
        })

    }

    /**
     * get异步请求方式
     */
    request.get = function (param,url,callback,paramType) {
        baseRequestFunc('get',param,url,true,'application/x-www-form-urlencoded','json',true,callback,paramType);
    }

    /**
     * get同步请求方式
     * param {param} object
     */
    request.sync_get = function (param,url,callback,paramType) {
        baseRequestFunc('get',param,url,false,'application/x-www-form-urlencoded','json',true,callback,paramType);
    }

    /**
     * post异步请求方式
     * param {param} object
     */
    request.post = function (param,url,callback,paramType) {
        baseRequestFunc('post',param,url,true,'application/json','json',true,callback,paramType);
    }
    /**
     * delete异步请求方式
     * param {param} object
     */
    request.delete = function (param,url,callback,paramType) {
      baseRequestFunc('delete',param,url,true,'application/json','json',true,callback,paramType);
    }
    /**
     * post的requestBean请求方式 这种请求方式适用于字段较多，且需要formdata方式上传文件
     * param {param} object  {param.files} array {param.fileNames} array {param.inputData} object
     */
    request.post_multipart_form_data = function (param,url,callback,paramType,formData,opt_error) {
        var form_data = new FormData();
        if(param.files && param.files.length>0){
           $.each(param.files,function(k,info_name){
                //if(document.getElementById(info_name).files[0] !== undefined){
                    form_data.append('files',document.getElementById(info_name).files[0])
                //}
            })
        }

        if(param.fileNames && param.fileNames.length>0){
            $.each(param.fileNames,function(i,item){
                form_data.append('fileNames',item);
            })
        }
        if(formData && formData=='formdata'){
            $.each(param.inputData,function(i,item){
                form_data.append(i,item);
            })
        }else{
           form_data.append('requestBean', new Blob([JSON.stringify(param.inputData)], {
                type: "application/json"
            }));
        }
        baseRequestFunc('post',form_data,url,true,false,'json',false,callback,paramType,opt_error);
    }

    /**
     * post的formdata请求方式
     * param {param} object
     */
    request.post_form_data = function(param,url,callback,paramType,opt_error){
        var form_data = new FormData();
        $.each(param,function(i,item){
            form_data.append(i,item);
        })
        baseRequestFunc('post',form_data,url,true,false,'json',false,callback,opt_error);
    }

    /**
     * post的JSON.stringify(param)请求方式
     * param {param} object
     */
     request.post_string_data = function(param,url,callback,paramType,opt_error){
        var cur_data = JSON.stringify(param);
        baseRequestFunc('post',cur_data,url,true,'application/json','json',false,callback,paramType,opt_error);
     }
    return request;
})();
