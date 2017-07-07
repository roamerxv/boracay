/**
 * Created by user on 2017/5/19.
 */
/**
 * @Author yjx
 * @date 2017-5-19
 * @description 用户修改密码
 */
$().ready(function () {
    //登录验证
    var login_form = $("#modilfy-test")
     var login_rules = {
     mobile: {
     required: true,
     isMobile: true
     },
     code:{
         required: true,
         isVerificatCode: true
     },
     oldPasswd:{
         required: true,
         rangelength: [6, 16]
     },
     newPasswd: {
         required: true,
         equalTo: "#oldPasswd"
     },
     };
     var login_messages = {
     mobile: {
         required: "手机号码不能为空",
         isMobile: "请填写正确的手机号码"
     },
     code:{
         required: "验证码不能为空",
         isVerificatCode: "输入6位验证码"
     },
     oldPasswd: {
         required: "密码不能为空",
         rangelength: "6-16个字符、支持数字、大小写字母、符号"
     },
     newPasswd: {
     required: "密码不能为空",
         equalTo: "确认密码和设置密码不一致，请重新输入"
     },
     };
     formValidate(login_form, login_rules, login_messages);

    /* 忘记密码*/
    $(".member-modilfy").click(function () {
        if (!$('#modilfy-test').valid()) {
            return;
        }
        var mobile = $("[name = mobile]").val();
        var oldPasswd = $("[name = oldPasswd]").val();
        var newPasswd = $("[name = newPasswd]").val();
        var validataCode = $("[name= validataCode]").val();
        var param = {
            mobile: mobile,
            newPasswd: newPasswd,
            validataCode:oldPasswd,
        }
        var modifyPassword_url = contextPath + '/creator/rest/modifyPassword.json';
        var contentType = 'application/json';
        param = JSON.stringify(param)
        $.ajax({
            type: 'post',
            data: param,
            url: modifyPassword_url,
            async: true,//默认为true
            contentType: contentType,//默认为application/x-www-form-urlencoded
            dataType: 'json',//默认为预期服务器返回的数据类型
            processData: false,//默认为true*!/
            beforeSend: function (data) {
                cleanAllExceptionTip();
            },
            success: function (data) {
                showMessage("success", "密码修改成功");
                window.sessionStorage.removeItem("password")
                window.location.href = contextPath + '/views/creator/user_settings.jsp';
            },
            error: function (data) {
                showExceptionTip(data);
            }
        });
    });
    /*修改手机号码小眼睛效果*/

    $("#eye_icon").click(function () {
        var oldPasswd = document.getElementById("oldPasswd");
        var eye_icon = document.getElementById("eye_icon");
        hideShowPsw();
    })

    $("#invisible_icon").click(function(){
        var newPasswd = document.getElementById("newPasswd");
        var invisible_icon = document.getElementById("invisible_icon");
        hideShowicon();
    })
    function hideShowPsw(){
        if (oldPasswd.type == "password") {
            oldPasswd.type = "text";
            eye_icon.src = contextPath +'/assets/imgs/invisible.png';
        }else {
            oldPasswd.type = "password";
            eye_icon.src = contextPath+'/assets/imgs/visible.png';
        }
    }
    function hideShowicon(){
        if (newPasswd.type == "password") {
            newPasswd.type = "text";
            invisible_icon.src = contextPath +'/assets/imgs/invisible.png';
        }else {
            newPasswd.type = "password";
            invisible_icon.src = contextPath+'/assets/imgs/visible.png';
        }
    }
});
