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
<div style="margin-top: 10px">
    <input id="id" value="测试表单内容1">
    <input id="name" value="测试表单内容2">
    <div style="width:600px">
        <input type="file" id="file-1" multiple>
    </div>
    <div>
        <input type="file" id="file-2" multiple>
    </div>
    <div>
        <input class="am-btn am-btn-success" type="button" value="提交" onclick="fun_submitWithFile()"/>
    </div>

    <div class="progress" style="margin-top: 20px;">
        <div class="progress progress-striped active">
            <div class="progress-bar progress-bar-warning" role="progressbar" data-transitiongoal="0"></div>
        </div>
    </div>
</div>
<%--</form>--%>


<script>
    $().ready(function () {
        // 使用 bootstrap file input 组件
        $("#file-1").fileinput(
            {
                'showUpload': false,
                'previewFileType': 'any',
                'allowedFileExtensions': ['jpg', 'png', 'gif', 'pdf', 'mp3', 'mp4', 'flac', 'wav', 'iso']
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
            for (index  in  files) {
                //把要上传的文件放置到 formData 里面
                formData.append("files", files[index]);
            }
        })

        // 使用 bootstrap progress bar
        var pb = $('.progress .progress-bar').progressbar({display_text: 'fill'});

        $.ajax({
            url: contextPath + '/test/submitWithFile.json',
            type: 'POST',
            cache: false,
            processData: false,
            contentType: false,
            data: formData,
            xhr: function () {
                myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', function (e) {
                        Logger.debug(e);
                        if (e.lengthComputable) {
                            var percent = Math.floor(e.loaded / e.total * 100);
                            if (percent < 100) {
                                pb.attr('data-transitiongoal', percent);
                                pb.progressbar();
                            }
                            if (percent >= 100) {
                                pb.attr('data-transitiongoal', 0);
                                pb.progressbar();
                            }
                        }
                    }, false);
                }
                return myXhr;
            },
            success: function (data) {
                showMessage("success", data.data.localMessage);
            },
            error: function (data) {
                Logger.debug(data.responseText);
                //showExceptionTip(data);
            }
        });
    }


    /**
     *    侦查附件上传情况    ,这个方法大概0.05-0.1秒执行一次
     */
    function onprogress(evt) {
        var loaded = evt.loaded;                  //已经上传大小情况
        var tot = evt.total;                      //附件总大小
        var per = Math.floor(100 * loaded / tot);     //已经上传的百分比
        $("#son").html(per + "%");
        $("#son").css("width", per + "%");
    }
</script>

