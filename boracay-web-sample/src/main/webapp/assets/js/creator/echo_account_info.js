/**
 * Created by jyj on 2017/7/5.
 */
$().ready(function () {
    var type = window.sessionStorage["type"]
    var param = window.sessionStorage['creatorId']
    if (type == '0010') {
        $(".personal").addClass("hide")
        HttpUtils.get_company_info_data(param, function (data) {
            console.log(data)
            $('#c_mobile').val(data.mobile)
            $('#c_name').val(data.name)
            $('#c_contactName').val(data.contactName)
            $('#c_contactMobile').val(data.contactMobile)
            $('#c_email').val(data.email)
            $('#c_licenseNo').val(data.licenseNo)
            $('#c_contactAddress').val(data.contactAddress)
            $('#base_upload_img').html('<img class="img" src="' + data.licensePic + '" alt="" width="250px" height="353px"/><span class="baseInfo_sign" data-role="delete-file" onclick="javascript:base_remove_img(this)">&times;<span>')
        });
    } else if (type == '0000') {
        $(".company").addClass("hide")
        HttpUtils.get_personal_info_data(param, function (data) {
            console.log(data)
            $('#p_mobile').val(data.mobile)
            $('#p_name').val(data.name)
            $('#p_email').val(data.email)
            $('#p_cidNo').val(data.cidNo)
            $('#p_contactAddress').val(data.contactAddress)
            $('#card_front_view').html('<img class="img" src="' + data.pcidPic1 + '" alt="" width="360px" height="230px"/><span class="baseInfo_sign" data-role="delete-file" onclick="javascript:base_remove_img(this)">&times;<span>')
            $('#card_negative_view').html('<img class="img" src="' + data.pcidPic2 + '" alt="" width="360px" height="230px"/><span class="baseInfo_sign" data-role="delete-file" onclick="javascript:base_remove_img(this)">&times;<span>')
        });
    }

    HttpUtils.get_payment_info_data(param, function (data) {
        console.log(data)
        $('#bank_name').val(data.bankName)
        $('#account_name').val(data.accountName)
        $('#bank_account').val(data.bankAccount)
        $('#alipay').val(data.zfbAccount)
        $('#wechat').val(data.wxAccount)
    });


    var company_form = $("#company")
    var company_rules = {
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
    var company_messages = {
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
    formValidate(company_form, company_rules, company_messages);


    /*个人前端验证*/
    var personal_form = $("#personal")
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

    $(".btn-submit_company").on('click', function () {
        if (!$("#company").valid()) {
            return;
        }
        var param = {}
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
            type: type
        };

        HttpUtils.post_company_info(param, function (data) {
            console.log(data)
            if (data.status == '200') {
                $("#infoUnfilled").modal('open');
                setTimeout(function () {
                    $("#infoUnfilled").modal('close');
                }, 2000)
                return;
            } else {
                showExceptionTip(data);
            }
        })
    })


    $(".btn-submit_personal").on('click', function () {
        if (!$("#personal").valid()) {
            return;
        }
        var formData = new FormData();
        formData.append('requestBean', new Blob([JSON.stringify({
            "mobile": $("[name = p_mobile]").val(),
            "name": $("[name = p_name]").val(),
            "email": $("[name=p_email]").val(),
            "cidNo": $("[name=p_cidNo]").val(),
            "contactAddress": $("[name=p_contactAddress]").val(),
            "type":type
        })], {
            type: "application/json"
        }));
        formData.append("files", $("#card_front")[0].files[0]);
        formData.append("files", $("#card_negative")[0].files[0]);

        console.log(formData)
        $.ajax({
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            url: contextPath + "/creator/update/personal_info.json",
            success: function (data) {
                if (data.status == '200') {
                    $("#infoUnfilled").modal('open');
                    setTimeout(function () {
                        $("#infoUnfilled").modal('close');
                    }, 2000)
                    return;
                } else {
                    showExceptionTip(data);
                }
            }
        });
    });

    jQuery.validator.addMethod("isDigits", function (value, element) {
        return this.optional(element) || /^\d+$/.test(value);
    }, "只能输入0-9数字");
    //支付信息验证
    var payment_form = $("#payment")
    var payment_rules = {
        bank_name: {
            required: true,
            rangelength: [1, 50]
        },
        account_name: {
            required: true,
            rangelength: [1, 50]
        },
        bank_account: {
            required: true,
            isDigits: true,
            rangelength: [1, 50]
        }
    };
    var payment_messages = {
        bank_name: {
            required: "开户银行不能为空",
            rangelength: "不能超过50个字符"
        },
        account_name: {
            required: '开户名称不能为空',
            rangelength: "不能超过50个字符"
        },
        bank_account: {
            required: '银行账号不能为空',
            isDigits: "只能输入0-9数字",
            rangelength: "不能超过50个字符"
        }
    };
    formValidate(payment_form, payment_rules, payment_messages);

    $(".btn-submit_payment").on('click', function () {
        if (!$("#payment").valid()) {
            return;
        }
        var param = {
            mobile: window.sessionStorage["mobile"],
            bankName: $("[name = bank_name]").val(),
            accountName: $("[name = account_name]").val(),
            bankAccount: $("[name=bank_account]").val(),
            zfbAccount: $("[name=alipay]").val(),
            wxAccount: $("[name=wechat]").val(),
        };
        console.log(param)
        param = JSON.stringify(param)
        HttpUtils.post_payment_info_data(param, function (data) {
            if (data.status == '200') {
                $("#infoUnfilled").modal('open');
                setTimeout(function () {
                    $("#infoUnfilled").modal('close');
                }, 2000)
                return;
            } else {
                showExceptionTip(data);
            }
        })
    })
})


