/**
 * Created by user on 2017/5/27.
 */
$().ready(function () {



    $('#login_skip').click(function () {
        window.location.href = contextPath + '/views/creator/reset_phone_number.jsp';
    })

    $('#password_skip').click(function () {
        window.location.href = contextPath + '/views/creator/modifyPassword.jsp';
    })

    var param = window.sessionStorage['creatorId']
    HttpUtils.get_creator_avatar_data(param,function (data) {
        console.log(data.data.localMessage)
        if(data.data.localMessage != '' ){
            window.sessionStorage["base_img_url"] = data.data.localMessage
            $('#base_register-view').html('<img class="img" src="'+data.data.localMessage+'" alt="" width="180" height="180"/><span class="baseInfo_sign" data-role="delete-file" onclick="javascript:base_remove_img(this)">&times;<span>')
        }
    })
});

