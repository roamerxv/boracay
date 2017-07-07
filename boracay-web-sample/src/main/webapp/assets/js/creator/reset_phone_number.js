/**
 * @Author yjx
 * @date 2017-5-17
 * @description 修改登录手机号
 */
$().ready(function () {
    //修改手机号前端验证
    var modify_mobile_form = $("#modify_mobile")
    var modify_rules = {
        old_mobile: {
            required: true,
            isMobile: true
        },
        old_mobile_code: {
            required: true,
            isVerificatCode: true
        },
        new_mobile: {
            required: true,
            isMobile: true
        },
        new_mobile_code: {
            required: true,
            isVerificatCode: true
        },
    };
    var modify_messages = {
        old_mobile: {
            required: "手机号码不能为空",
            isMobile: "请填写正确的手机号码"
        },
        old_mobile_code: {
            required: "验证码不能为空",
            isVerificatCode: "输入6位验证码"
        },
        new_mobile: {
            required: "手机号码不能为空",
            isMobile: "请填写正确的手机号码"
        },
        new_mobile_code: {
            required: "验证码不能为空",
            isVerificatCode: "输入6位验证码"
        },
    };
    formValidate(modify_mobile_form, modify_rules, modify_messages);

    /* 修改手机号提交数据*/
    $(".btn-modilfy").click(function () {
        if (!$('#modify_mobile').valid()) {
            return;
        }
        var old_mobile = $("[name = old_mobile]").val();
        var old_mobile_code = $("[name = old_mobile_code]").val();
        var new_mobile = $("[name = new_mobile]").val();
        var new_mobile_code = $("[name = new_mobile_code]").val();
        var param = {
            oldMobile: old_mobile,
            oldMobileVCode: old_mobile_code,
            newMobile: new_mobile,
            newMobileVCoder: new_mobile_code
        }
        console.log(param);
        var url = contextPath + '/creator/rest/rebound_mobile.json';
        param = JSON.stringify(param)
        $.ajax({
            type: 'post',
            data: param,
            url: url,
            async: true,//默认为true
            contentType: 'application/json',//默认为application/x-www-form-urlencoded
            dataType: 'json',//默认为预期服务器返回的数据类型
            processData: false,//默认为true*!/
            beforeSend: function (data) {
                cleanAllExceptionTip();
            },
            success: function (data) {
                showMessage("success", "手机号修改成功");
                window.sessionStorage.removeItem("mobile")
                window.sessionStorage["mobile"]=new_mobile
                window.location.href = contextPath + '/views/creator/user_settings.jsp';
            },
            error: function (data) {
                showExceptionTip(data);
            }
        });
    });

})