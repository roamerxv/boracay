/**
 * Created by user on 2017/7/3.
 */
$().ready(function () {

    $(document).on('click', '.addPerformers', function () {
        $('#performers_add').modal({closeViaDimmer: false})
    })


//歌曲标题
    $('.music_title').text(window.sessionStorage['music_title'])
    $('.album').on('click',function(){
        window.location.href = contextPath + '/views/worksmanagement/singles_details.jsp';
    })

    $('.single_album ').on('click',function(){
        $('.album').removeClass('active');
        window.location.href = contextPath + '/views/worksmanagement/statistics.jsp';
    })

    $('.single_lyrics').on('click',function () {
        $('.single_album').removeClass('active');
        window.location.href = contextPath + '/views/worksmanagement/lyrics_copyright_page.jsp';
    })

    layui.use('layedit', function(){
        var layedit = layui.layedit;
        layedit.build('demo'); //建立编辑器
    });

    function dialog(){
        document.getElementById("file").click();
    }
    $('.no-margin').on('click',function () {
        dialog();
    })
    /*添加其他表演人*/
    $(document).on('click',".btn-success",function () {
        var hl=[];
        hl+='<div class="form-group performer_remove">'
        hl+='<div class="col-xs-3">'
        hl+='<select class="form-control">'
        hl+='<option value="主要表演人">主要表演人</option>'
        hl+='<option value="伴唱人">伴唱人</option>'
        hl+=  '</select>'
        hl+= '</div>'
        hl+='<div class="col-xs-9 input-group">'
        hl+='<input type="text" class="form-control" id="p_name" name="p_name" placeholder="请输入姓名">'
        hl+='<span class="input-group-addon">删除<b class="red">*</b></span>'
        hl+='</div>'
        hl+='</div>'
        $('#inputWrapper').append(hl);
    })
    // 点击删除其他角色
    $(document).on('click',".input-group-addon",function () {
        $(this).parent().parent().remove()
    })
    var xhr = new XMLHttpRequest();
    var audio = new Audio();
    function UpladFile() {

        $('#progressBar').show()
        $('[name=file]').hide()
        var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
        var FileController = contextPath + '/music/special/musictimel'; // 接收上传文件的后台地址
        // FormData 对象---进行无刷新上传
        var form = new FormData();
        form.append("author", "hooyes"); // 可以增加表单数据
        form.append("file", fileObj); // 文件对象
        // XMLHttpRequest 对象
        var url = URL.createObjectURL(fileObj);
        UpladFile.src = url;
        audio.src = url;
        console.log(url)
        console.log(fileObj)
        audio.addEventListener('loadedmetadata', function () {
            console.log("时长是："+audio.duration);
            audio.play();
        });
        xhr.open("post", FileController, true);
        xhr.onload = function() {
            $('.song_title').html(fileObj.name)
            $('progress').hide();
            $('.no-margin').hide();
            $('#percentage').hide();
            $('[name=file]').hide()
        };
        //监听progress事件
        xhr.upload.addEventListener("progress", progressFunction, false);
        xhr.send(form);
    }
    function progressFunction(evt) {
        var progressBar = document.getElementById("progressBar");
        var percentageDiv = document.getElementById("percentage");
        if (evt.lengthComputable) {
            progressBar.max = evt.total;
            progressBar.value = evt.loaded;
            percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100)
                + "%";
        }
    }
    $('.delete').on('click',function () {
        $('[name=file]').show()
        $('.song_title').html('')
        $('#progressBar').val('')
        $('progress').hide();
        $('#percentage').show();
        $('.no-margin').show();
        $('.file').hide();
        xhr.abort()
        $('#percentage').html('')
        $('[name=file]').val('')
    })

    $('[name=file]').on('change',function () {
        UpladFile();
    })


    /*获取这首歌曲属于以下哪种类型?*/
    $('.optionsRadios').on('click',function () {
        var _this = this
        var songtest=$("#panel_group .ui-sortable")
        var name = $('[name=name]:last').val()
        console.log(name)
        var optionsRadios= $(_this).attr('id');
        if(optionsRadios === "optionsRadios1"){
            $(".label-warning").text('该音乐由您作词作曲，且未借用其他作品的元素')
        }else if(optionsRadios === "optionsRadios2"){
            $(".label-warning").text('每首翻唱作品需要您向我们支付9.99元以取得许可证');
        }else if(optionsRadios === "optionsRadios3"){
            $(".label-warning").text('公共歌曲指著作权已经过期或被没收的音乐作品，通常指1923年之前的歌曲');
        }
    })

    /*判断是否有ISRC代码*/
    $(document).on('click','#hasISRC',function () {
        $('.isrc_code').show();
        $('.hastitle').hide();
    })
    $(document).on('click','#isrc_code',function () {
        $('.isrc_code').hide();
        $('.hastitle').show();
    })

    //回显单曲信息
    var param=window.sessionStorage["song_data_id"]
    param = {
        id: param
    };
    param = JSON.stringify(param)
    $.ajax({
        type: 'post',
        data: param,
        url: contextPath+'/music/special/song',
        async: false,//默认为true
        contentType: 'application/json',//默认为application/x-www-form-urlencoded
        dataType: 'json',//默认为预期服务器返回的数据类型
        processData: false,//默认为true*/
        beforeSend: function (data) {

        },
        success: function (data) {
            if (data !== undefined && data !== '' ) {
                $('[name=title]').val(data.title)
                $('[name=version]').val(data.version)
                //判断是否有isrc码
                if(data.hasIsrc=='1') {//无isrc码
                    $('#isrc_code').attr('checked','checked')
                }else if(data.hasIsrc=='0'){
                    $('#hasISRC').attr('checked','checked')
                    $('.isrc_code').show();
                    $('[name="isrc"]').val(data.isrc)
                }
                //判断是否涉及敏感歌词
                if(data.hasBadContent=='0'){
                    $('#hasBad').attr('checked','checked')
                }else if(data.hasBadContent=='1'){
                    $('#hasBadContent').attr('checked','checked')
                }
                //判断歌曲类型
              if(data.type=='001'){//原创音乐
                $('#optionsRadios1').attr('checked','checked')
                  $(".label-warning").text('该音乐由您作词作曲，且未借用其他作品的元素')
              }else if(data.type=='010'){//翻唱歌曲
                  $('#optionsRadios2').attr('checked','checked')
                  $(".label-warning").text('每首翻唱作品需要您向我们支付9.99元以取得许可证');
              }else if(data.type=='011'){//公开版权歌曲
                  $('#optionsRadios3').attr('checked','checked')
                  $(".label-warning").text('公共歌曲指著作权已经过期或被没收的音乐作品，通常指1923年之前的歌曲');
              }

              //词曲版权所有人
               $('[name=copyrightOwner]').val(data.copyrightOwner)
                $('[name=companyBusinessId]').val(data.companyBusinessId)
                $('#demo').html(data.lyrics)
                $('[name=companyId]').val(data.songCompanyId)

                var otherPerformerList=data.otherPerformerList
                var html=''
                $.each(otherPerformerList,function(i,item) {
                    console.log(otherPerformerList)
                    if (item.type == '伴唱人') {
                        html += '<div class="form-group performer_remove"><div class="col-xs-3">'
                        html += '<select class="form-control"><option value="主要表演人">主要表演人</option><option   selected value="伴唱人">伴唱人</option></select>'
                        html += '</div><div class="col-xs-9 input-group"><input type="text" class="form-control" value="' + item.otherSingerName + '" id="p_name" name="p_name" placeholder="请输入姓名">'
                        html += '<span class="input-group-addon">删除<b class="red">*</b></span></div></div>'
                    } else if (item.type == '主要表演人') {
                        html += '<div class="form-group performer_remove"><div class="col-xs-3">'
                        html += '<select class="form-control"><option value="主要表演人" selected>主要表演人</option><option value="伴唱人">伴唱人</option></select>'
                        html += '</div><div class="col-xs-9 input-group"><input type="text" class="form-control" value="' + item.otherSingerName + '" id="p_name" name="p_name" placeholder="请输入姓名">'
                        html += '<span class="input-group-addon">删除<b class="red">*</b></span></div></div>'
                    }
                })
                $('#inputWrapper').append(html);
            }
        },
        error: function(data) {
        }
    });


$(".btn-danger").on('click',function () {
        var formData = new FormData();
        var playArray = [];
        var inputWrapper =$('#inputWrapper').find('.performer_remove');
        console.log(inputWrapper)
        $(inputWrapper).each(function (i, item) {
            var obj = {};
            obj["type"] = $(item).find('select').val();
            obj["otherSingerName"] = $(item).find('input').val();
            playArray.push(obj);
        })
        var type=''
        // 判断有无其他表演人
        var hasOtherSinger=''
        if (playArray.length <= 0) {
            hasOtherSinger = '1'
        } else if (playArray.length >= 0) {
            hasOtherSinger = '0'
        }

        var hasBadContent = null
        var hasBadContent1 = $('#hasBadContent').is(':checked');
        var hasBadContent2 = $('#hasBad').is(':checked');
        if (hasBadContent1) {
            hasBadContent = '0'
        } else if (hasBadContent2) {
            hasBadContent = '1'
        }
        var type1 = $('#optionsRadios1').is(':checked');
        var type2 = $('#optionsRadios2').is(':checked');
        var type3 = $('#optionsRadios3').is(':checked');
        if (type1) {
            type = '001'
        } else if (type2) {
            type = '010'
        } else {
            type = '011'
        }
        var hasIsrc = ''
        var isrc_code =$('#isrc_code').is(':checked');
        var hasISRC =$('#hasISRC').is(':checked');

        if (isrc_code) {
            hasIsrc = '1'
        } else if (hasISRC) {
            hasIsrc = '0'
        }
        formData.append('requestBean', new Blob([JSON.stringify({
            "id": window.sessionStorage["song_data_id"],
            "title": $("[name =title]").val(),
            "singerId": $("#performers_type_select2").val(),
            "singerName": $(".select2-selection__rendered").attr('title'),
            "songCompanyId": $("[name = companyId]").val(),
            "wavFile":$("[name = wavFile]").val(),
            "duration":$("[name = duration]").val(),
            "version":$('[name=version]').val(),
            "hasOtherSinger":hasOtherSinger,
            "hasIsrc":hasIsrc,
            "isrc": $("[name = isrc]").val(),
            "hasBadContent":hasBadContent,
            "type":type,
            "style": $(".music_genre_select2 option:selected").text(),
            "copyrightOwner": $("[name = copyrightOwner]").val(),
            "companyBusinessId": $("[name = companyBusinessId]").val(),
            "lyrics":$(".panel iframe").contents().find("body").html(),
            "lyricsType": $(".panel iframe").contents().find("body").html(),
            otherPerformerList:playArray
            })], {
                    type: "application/json"
                }));
        formData.append("files", $("#file")[0].files[0]);
        console.log(formData)
        $.ajax({
            type:'post',
            data:formData,
            contentType:false,
            processData:false,
            url:contextPath+"/music/special/update",
            success:function (data) {
                window.location.href = contextPath + '/views/worksmanagement/album_details.jsp';
            }
        });

})
});