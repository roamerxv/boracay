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
        <input type="file" id="files-1" multiple>
    </div>
    <div>
        <input type="file" id="files-2" multiple>
    </div>
    <div>
        <input class="btn btn-success" type="button" value="提交" onclick="fun_submitWithFile()"/>
    </div>
</div>

<%-- 模态框 --%>
<div id="myModal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <%--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>--%>
                <%--</button>--%>
                <h4 class="modal-title">进度查看</h4>
            </div>
            <div class="modal-body">
                <div class="progress" style="margin-top: 20px;">
                    <div class="progress progress-striped active">
                        <div class="progress-bar progress-bar-warning" role="progressbar" data-transitiongoal="0"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <span id="promptMessage"></span>
                <%--<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>--%>
                <%--<button type="button" class="btn btn-primary">Save changes</button>--%>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->
<%-- 模态框 --%>

<%--</form>--%>


<script>
    $().ready(function () {
        // 使用 bootstrap file input 组件
        $("#files-1").fileinput(
            {
                'showUpload': false,
                'previewFileType': 'any',
                'allowedFileExtensions': ['jpg', 'png', 'gif', 'pdf', 'mp3', 'mp4', 'flac', 'wav', 'iso']
            });

        $("#files-2").fileinput(
            {
                'showUpload': false,
                'previewFileType': 'any'
            });
    });

    function fun_submitWithFile() {
        var myModal ;
        var inputData = {};
        inputData.id = $("#id").val();
        inputData.name = $("#name").val();
        var formData = new FormData();
        formData.append("requestBean", new Blob([JSON.stringify(inputData)], {type: "application/json"}));
        $('input[type=file]').each(function (index, item) {
            // 模拟每个 input file 是和一个参数对应。如果有多个 input file，则代表给 Controller 传递多个RequestPart
            var requestPartName = $(item).attr("id");
            //为了支持一个 input 可以选择多个文件，这里再次做循环判断
            var files = $(item).prop("files");
            for (index  in  files) {
                //把要上传的文件放置到 formData 里面
                formData.append(requestPartName, files[index]);
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
            beforeSend: function () {
                myModal = $('#myModal').modal({
                    backdrop: 'static',
                    keyboard: false
                })
                myModal.modal('show');
            },
            xhr: function () {
                myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            var percent = Math.floor(e.loaded / e.total * 100);
                            if (percent <= 100) {
                                pb.attr('data-transitiongoal', percent);
                                pb.progressbar();
                            }
                            if (percent >= 100) {
                                $("#promptMessage").html("上传已经成功，等待服务器处理！");
//                                pb.attr('data-transitiongoal', 0);
//                                pb.progressbar();
                            }
                        }
                    }, false);
                }
                return myXhr;
            },
            success: function (data) {
                clear_message();
                showMessage("success", data.data.localMessage);
            },
            error: function (exception) {
                Logger.debug(exception.responseText);
                clear_message();
                showExceptionTip(exception);
            }
        });

        function clear_message(){
            myModal.modal('hide');
            pb.attr('data-transitiongoal', 0);
            pb.progressbar();
            $("#promptMessage").html("");
        }
    }
</script>

