<%--
  Created by IntelliJ IDEA.
  User: roamer
  Date: 2017/9/4
  Time: 下午5:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<form method="post" class="form-horizontal record_modal" enctype="multipart/form-data" role="form"--%>
<%--action="">--%>
<input id="id" value="测试表单内容1">
<input id="name" value="测试表单内容2">
<input type="file" id="file-1" multiple>
<input type="file" id="file-2">
<div>
    <input class="am-btn am-btn-success" type="button" value="提交" onclick="fun_submitWithFile()"/>
</div>
<%--</form>--%>


<script>
    $().ready(function () {
        //  使用 bootstrap file input 组件
        $("#file-1").fileinput(
            {
                'showUpload': false,
                'previewFileType': 'any',
                'allowedFileExtensions': ['jpg', 'png', 'gif','pdf']
            });

        $("#file-2").fileinput(
            {
                'showUpload': false,
                'previewFileType': 'any'
            });
    });

    function fun_submitWithFile() {
        var inputData = {};
        inputData.id = $("#id").val();
        inputData.name = $("#name").val();
        var formData = new FormData();
        formData.append("requestBean", new Blob([JSON.stringify(inputData)], {type: "application/json"}));
        $('input[type=file]').each(function (index, item) {
            //为了支持一个 input 可以选择多个文件，这里再次做循环判断
            var files = $(item).prop("files");
            Logger.debug(files);
            for (index  in  files) {
                //把要上传的文件放置到 formData 里面
                Logger.debug(files[index]);
                formData.append("files", files[index]);
            }
        })

        $.ajax({
            url: contextPath + '/test/submitWithFile.json',
            type: 'POST',
            cache: false,
            processData: false,
            contentType: false,
            data: formData,
            success: function (data) {
                showMessage("success", data.data.localMessage);
            },
            error: function (data) {
                Logger.debug(data.responseText);
                //showExceptionTip(data);
            }
        });
    }
</script>

