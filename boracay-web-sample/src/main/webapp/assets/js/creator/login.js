/**
 * @Author yjx
 * @date 2017-5-16
 * @description 用户登录
 */
$().ready(function () {
    //登录验证
    var login_form = $("#login-test")
    var login_rules = {
        mobile: {
            required: true,
            isMobile: true
        },
        password: {
            required: true,
        }
    };
    var login_messages = {
        mobile: {
            required: "手机号码不能为空",
            isMobile: "请填写正确的手机号码"
        },
        password: {
            required: '密码不能为空',
        }
    };
    formValidate(login_form, login_rules, login_messages);

    $('#mobile').focus(function () {
        $('.code-error').remove();
    })
    $('#password').focus(function () {
        $('#password_error').remove();
    })
    /*    登录*/
    $(".member-login").click(function () {
        if (!$('#login-test').valid()) {
            return;
        }
        var mobile = $("[name = mobile]").val();
        var passwd = $("[name = password]").val();
        window.sessionStorage["password"] = passwd;
        window.sessionStorage["mobile"] = mobile;
        var param = {
            mobile: mobile,
            passwd: passwd,
        }
        var login_url = contextPath + '/creator/rest/login.json';
        var contentType = 'application/json';
        param = JSON.stringify(param)
        $.ajax({
            type: 'post',
            data: param,
            url: login_url,
            async: false,//默认为true
            contentType: contentType,//默认为application/x-www-form-urlencoded
            dataType: 'json',//默认为预期服务器返回的数据类型
            processData: false,//默认为true*/
            beforeSend: function (data) {
                cleanAllExceptionTip();
            },
            success: function (data) {
                console.log(data.data.completePercent);
                window.sessionStorage["type"] = data.data.type
                if (data.data.type === "9999") {
                    window.location.href = contextPath + '/views/creator/consummate_info.jsp';
                } else if (data.data.type === '0000' || data.data.type === '0010') {
                    showMessage("success", data.data.localMessage);
                    window.location.href = contextPath + '/views/homepage/homepage.jsp';
                }

            },
            error: function (data) {
                var error_information = data.responseText;
                error_information = JSON.parse(error_information)
                var warn_error_infor = error_information.data[0].errorMessage;
                $('#code-error').remove();
                $('#password_error').remove();
                var html = '';
                var h = ''
                html += '<span id="code-error" class="error red code-error" for="mobile">' + warn_error_infor + '</span>'
                h += '<label id="password_error" class="error red password_error" for="password">' + warn_error_infor + '</label>'
                if (warn_error_infor === '密码不匹配') {
                    $('.password_error').append(h);
                } else if (warn_error_infor === '无此用户') {
                    $('.error_mobile').append(html);
                }
            }
        });
    });
    $("#btn_register").click(function () {
        window.location.href = contextPath + '/views/creator/register.jsp';
    })

    $("#login_icon").click(function () {
        var password = document.getElementById("password");
        var login_icon = document.getElementById("login_icon");
        if (password.type == "password") {
            password.type = "text";
            login_icon.src = contextPath + '/assets/imgs/invisible.png';
        } else {
            password.type = "password";
            login_icon.src = contextPath + '/assets/imgs/visible.png';
        }
    })
    $('.btn-gray').click(function () {
        window.location.href = contextPath + "/views/creator/forgot_password.jsp"
    })
});
