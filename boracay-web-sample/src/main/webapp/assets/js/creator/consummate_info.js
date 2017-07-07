/**
 * @Author yjx
 * @date 2017-5-16
 * @description 用户登录
 *
 */
$().ready(function () {
    /*公司前端验证*/
    var consummate_form = $("#consummate")
    var consummate_rules = {
        c_mobile: {
            required: true,
            isMobile: true
        },
        c_name: {
            required: true,
        },
        c_email: {
            required: true,
            email: true
        },
        c_contactName: {
            required: true,
        },
        c_contactMobile: {
            required: true,
            isMobile: true
        },
        c_licenseNo: {
            required: true,
            rangelength: [18, 18]
        },
        c_contactAddress: {
            required: true,
        },
        file: {
            required: true
        },
    };
    var consummate_messages = {
        c_mobile: {
            required: "手机号码不能为空",
            isMobile: "请填写正确的手机号码"
        },
        c_name: {
            required: '公司名称不能为空',
        },
        c_contactName: {
            required: '联系人不能为空',
        },
        c_contactMobile: {
            required: "手机号码不能为空",
            isMobile: "请填写正确的手机号码"
        },
        c_email: {
            required: "邮箱不能为空",
            email: "请输入一个正确的邮箱"
        },
        c_licenseNo: {
            required: '营业执照编号不能为空',
            rangelength: '请输入18位字符',
        },
        c_contactAddress: {
            required: '公司联系地址不能为空',
        },
        file: {
            required: '请上传营业执照'
        },
    };
    formValidate(consummate_form, consummate_rules, consummate_messages);


    /*个人前端验证*/
    var personal_form = $("#personal_information")
    var personal_rules = {
        p_mobile: {
            required: true,
            isMobile: true
        },
        p_name: {
            required: true,
        },
        p_email: {
            required: true,
            email: true
        },
        p_cidNo: {
            required: true,
            rangelength: [18, 18]
        },

        p_contactAddress: {
            required: true,
        },
        filecidno: {
            required: true,
        },
        fileimg: {
            required: true,
        }
    };
    var personal_messages = {
        p_mobile: {
            required: "手机号码不能为空",
            isMobile: "请填写正确的手机号码"
        },
        p_name: {
            required: '联系人姓名不能为空',
        },
        p_cidNo: {
            required: "身份证号不能为空",
            rangelength: '请输入18位字符',
        },
        p_email: {
            required: "邮箱不能为空",
            email: "请输入一个正确的邮箱"
        },
        p_contactAddress: {
            required: '联系地址不能为空',
        },
        filecidno: {
            required: '身份证不能为空',
        },
        fileimg: {
            required: '身份证不能为空',
        }
    };
    formValidate(personal_form, personal_rules, personal_messages);

    $('[name = c_mobile]').val(window.sessionStorage["mobile"]);
    $('[name = p_mobile]').val(window.sessionStorage["mobile"]);
    $('.radio_check').click(function () {
        $('.enterprise').hide();
        $('.personal').show();
    })
    $('.radio_checked').click(function () {
        $('.enterprise').show();
        $('.personal').hide();
    })

    //
    var checkImg = false
    $(".btn-submit").on('click', function () {

        if (!$("#consummate").valid()) {
            return;
        }
        var param = {}
        var type = $('input[name="inlineRadioOptions"]:checked').val();
        param.files = ['file'];
        param.fileName = ['file'];
        param.inputData = {
            mobile: $("[name = c_mobile]").val(),
            name: $("[name = c_name]").val(),
            contactName: $("[name=c_contactName]").val(),
            contactMobile: $("[name=c_contactMobile]").val(),
            email: $("[name=c_email]").val(),
            licenseNo: $("[name=c_licenseNo]").val(),
            contactAddress: $("[name=c_contactAddress]").val(),
        };
        console.log(param)

        /*param = JSON.stringify(param)*/
        HttpUtils.post_consummat_info(param, function (data) {
            console.log(data)
            if (data.status == '200') {
                showMessage("success", "操作成功");
                window.sessionStorage["type"] = data.data.localMessage
                getMenuFirstUrl();
            } else {
                showExceptionTip(data);
            }
        })
    })

    $(".btn-submit_info").on('click', function () {
        if (!$("#personal_information").valid()) {
            return;
        }
        var formData = new FormData();

        formData.append('requestBean', new Blob([JSON.stringify({
            "mobile": $("[name = p_mobile]").val(),
            "name": $("[name = p_name]").val(),
            "email": $("[name=p_email]").val(),
            "cidNo": $("[name=p_cidNo]").val(),
            "contactAddress": $("[name=p_contactAddress]").val(),
        })], {
            type: "application/json"
        }));
        formData.append("files", $("#fileimg")[0].files[0]);
        formData.append("files", $("#filecidno")[0].files[0]);

        console.log(formData)
        $.ajax({
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            url: contextPath + "/creator/rest/personal_info.json",
            success: function (data) {
                if (data.status == '200') {
                    showMessage("success", "操作成功");
                    window.sessionStorage["type"] = data.data.localMessage
                    getMenuFirstUrl();
                }else {
                    showExceptionTip(data);
                }
            }
        });
    });

    // $(".btn-submit_info").on('click', function () {
    //     if (!$("#personal_information").valid()) {
    //         return;
    //     }
    //     param.files = ['fileimg','filecidno'];
    //     param.fileName = ['fileimg','filecidno'];
    //     param.inputData = {
    //         mobile: $("[name = p_mobile]").val(),
    //         name: $("[name = p_name]").val(),
    //         email: $("[name=p_email]").val(),
    //         cidNo: $("[name=p_cidNo]").val(),
    //         contactAddress: $("[name=p_contactAddress]").val(),
    //         types: "0000"
    //     };
    //     console.log(param)
    //
    //     /*param = JSON.stringify(param)*/
    //     HttpUtils.post_personal_info(param, function(data) {
    //         if (data.status == '200') {
    //             showMessage("success", data.data.localMessage);
    //             getMenuFirstUrl();
    //         }else{
    //             showExceptionTip(data);
    //         }
    //     })
    // });


    function getMenuFirstUrl() {
        var param = {
            mobile: window.sessionStorage["mobile"],
            passwd: window.sessionStorage["password"],
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
                showMessage("success", "操作成功");
                window.location.href = contextPath + '/views//homepage/homepage.jsp';
            },
            error: function (data) {
                showExceptionTip(data);
            }
        });
    }
})