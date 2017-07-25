<%@ page contentType="text/html;charset=UTF-8" language="java" %>

用户名：<input id="user_name" ></input><br/>
密码：<input id="user_passwd"></input><br/>
<input type="button" value="确定" onclick="fun_submit()"/>

<script>
    function fun_submit() {
        $.ajax({
            url: '/test/500_error.json',
            type: 'POST',
            cache: false,
            success: function (data) {
                showMessage("success", data.data.localMessage);
            },
            error: function (data) {
                showExceptionTip(data);
            }
        });
    }
</script>
