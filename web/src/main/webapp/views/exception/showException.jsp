<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<form class="am-form">
    <fieldset>
        <div class="am-form-group">
            <label for="user_name">用户名</label>
            <input type="email" class="" id="user_name" placeholder="输入用户名">
        </div>

        <div class="am-form-group">
            <label for="user_passwd">密码</label>
            <input type="password" class="" id="user_passwd" placeholder="设置个密码吧">
        </div>
        <div>
            <input type="button" class="am-btn am-btn-success" value="确定" onclick="fun_submit()"/>
        </div>
    </fieldset>
</form>


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
