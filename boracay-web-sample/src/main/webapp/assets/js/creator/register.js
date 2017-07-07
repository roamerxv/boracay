/**
 * @Author yjx
 * @date 2017-5-16
 * @description 用户注册
 */
$().ready(function() {
    //注册验证

    window.sessionStorage.removeItem('param');
    
    var resiter_form = $("#user_register")
    var resiter_rules = {
        mobile: {
            required: true,
            isMobile: true
        },
        code:{
            required: true,
            isVerificatCode: true
        },
        password:{
            required: true,
            rangelength: [6, 16]

        },
        confirmpasswd: {
            required: true,
            equalTo: "#password"
        },
    };
    var resiter_messages = {
        mobile: {
            required: "手机号码不能为空",
            isMobile: "请填写正确的手机号码"
        },
        code:{
            required: "验证码不能为空",
            isVerificatCode: "输入6位验证码"
        },
        password: {
            required: "密码不能为空",
            rangelength: "6-16个字符、支持数字、大小写字母、符号"
        },
        confirmpasswd: {
            required: "密码不能为空",
            equalTo: "确认密码和设置密码不一致，请重新输入"
        },
    };
    formValidate(resiter_form, resiter_rules, resiter_messages);

    $('[name = user_mobile]').val(window.sessionStorage["mobile"]);
    $('[name = mobile]').val(window.sessionStorage["mobile"]);
    /* 注册*/
    $(".member-register").click(function() {
       if (!$('#user_register').valid()) {
            return;
        }else if($(".check-input").attr('checked') === "checked"){
           var mobile = $("[name = mobile]").val();
           var passwd = $("[name = password]").val();
           window.sessionStorage["password"] = passwd;
           window.sessionStorage["mobile"] = mobile;
           var param = {
               mobile: mobile,
               passwd: passwd,
           }
           var login_url = contextPath + '/creator/rest/register.json';
           var contentType = 'application/json';
           param = JSON.stringify(param)
           $.ajax({
               type: 'post',
               data: param,
               url: login_url,
               async:true,//默认为true
               contentType:contentType,//默认为application/x-www-form-urlencoded
               dataType:'json',//默认为预期服务器返回的数据类型
               processData:false,//默认为true*/
               beforeSend: function (data) {
                   cleanAllExceptionTip();
               },
               success: function(data) {
                   Logger.debug(data);
                   //注册成功后跳转到完善账号信息的界面
                   window.location.href = contextPath + '/views/creator/consummate_info.jsp';
               },
               error: function(data) {
                   Logger.debug(data);
                   showExceptionTip(data);
               }
           });
       }else if($(".check-input").is(':checked')){
       }else{
           var html = '';
           html += '<label id="error" class="agrement error" for="picCode">'+'请同意《基酒在线注册协议》'+'</label>'
           $('.service_agreement').append(html);
       }
    });

    //checkbox按钮的切换
    $(".check-input").each(function() {
        $(this).click(function() {
            if ($(this).prop("checked") === false) {
                $(this).removeAttr("checked")
                $(".submit-file").removeClass("btn-type");
            } else {
                $(this).attr("checked", "checked")
                $(".submit-file").addClass("btn-type");
                $(".submit-file").removeAttr("disabled");
            }
        })
    })


    $('.check-input').on('click',function(){
        if($(".check-input").attr('checked') === "checked"){
            $('.agrement').hide();
        }else{

        }
    })
    
    $('.member-register').on('click',function () {

    })
    /*修改手机号码小眼睛效果*/

    $("#eye_icon").click(function () {
        var password = document.getElementById("password");
        var eye_icon = document.getElementById("eye_icon");
        if (password.type == "password") {
            password.type = "text";
            eye_icon.src = contextPath +'/assets/imgs/invisible.png';
        }else {
            password.type = "password";
            eye_icon.src = contextPath+'/assets/imgs/visible.png';
        }
    })

    $("#invisible_icon").click(function(){
        var confirmpasswd = document.getElementById("confirmpasswd");
        var invisible_icon = document.getElementById("invisible_icon");
        if (confirmpasswd.type == "password") {
            confirmpasswd.type = "text";
            invisible_icon.src = contextPath +'/assets/imgs/invisible.png';
        }else {
            confirmpasswd.type = "password";
            invisible_icon.src = contextPath+'/assets/imgs/visible.png';
        }
    })

});
