/**
 * Created by user on 2017/6/22.
 */
$().ready(function () {

    var song_type_select2;
    var song_data_list = $("#song_type_select2")
    var songlist_Data={}

    var Songdata= window.sessionStorage["createdId"]
    var music_data=JSON.parse(Songdata)
    var songid=music_data.inputData.mainPerformerId
    songlist_Data = {
        singerId:songid
    };

    function reload_select2(node,data) {
        node.html('');
        return node.select2({
            data: data,
            width: '450px',
            language: "zh-CN",//汉化
            placeholder: '从您的曲库选择歌曲',//默认文字提示
            allowClear: true//允许清空
        });
    }


    var song_array = [];//用于存放查询的所有歌曲

    musiclist_Data = JSON.stringify(songlist_Data)
    $.ajax({
        type: "post",
        data: musiclist_Data,
        async: false,
        url: contextPath + '/music/special/Songs',
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            song_array = data;

            var list = []
            var songData = window.sessionStorage["param"]
            if (songData != "[]" && songData !== undefined) {
                list = JSON.parse(songData);
            }
            list = list.filter(function(item,index,array){
                return item['id']!==undefined;
            });
            var temp = [];
            for(var i = 0;i< song_array.length;i++){
                for(var j = 0;j<list.length;j++){
                    if(song_array[i]['id']==list[j]['id']){
                        temp.push(i);
                        break;
                    }
                }
            }
            for(var i=0;i<temp.length;i++){
                song_array[temp[i]]=null;
            }
            song_array = song_array.filter(function (item,index,array) {
                return item!=null;
            })

            /*song_array = data.filter(function (item,index,array) {
                return item!=null;
            });*/

            var default_value = reload_select2($("#song_type_select2"),song_array);
            Logger.debug("缺省选择的是:" + default_value.val());
        },
        error: function (data) {

        }
    });











    $(document).on('click','.addPerformers',function () {
        $('#performers_add').modal('open')
    })

    //跳转专辑歌曲验证
    $('.single_lyrics').on('click', function () {
        var check_input = false;
        var inputName = $('#inputWrapper input');
        $(inputName).each(function () {
            if ($(this).val() === '') {
                check_input = true;
                $('.containError').removeClass('hide')
            }
        })
        if(check_input == false){
            $('.containError').addClass('hide')
        }
        if(!$('.panel .in [name=title]')){
            $('#infoUnfilled').modal('open');
            return
        }

        location.href = contextPath + '/views/worksmanagement/lyrics_copyright.jsp'
    })
    //跳转词曲版权验证
    $('.single_album').on('click', function () {

        var check_input = false;
        var inputName = $('#inputWrapper input');
        $(inputName).each(function () {
            if ($(this).val() === '') {
                check_input = true;
                $('.containError').removeClass('hide')
            }
        })
        if(check_input == false){
            $('.containError').addClass('hide')
        }
        Logger.debug(check_input)
        if(!$('.panel .in [name=title]')){
            $('#infoUnfilled').modal('open');
            return
        }

        location.href = contextPath + '/views/worksmanagement/album_song.jsp'
    })
    //跳转预览验证
    $('.single_save').on('click', function () {
        var check_input = false;
        var inputName = $('#inputWrapper input');
        $(inputName).each(function () {
            if ($(this).val() === '') {
                check_input = true;
                $('.containError').removeClass('hide')
            }
        })
        if(check_input == false){
            $('.containError').addClass('hide')
        }
        if(!$('.panel .in [name=title]')){
            $('#infoUnfilled').modal('open');
            return
        }

        location.href = contextPath + '/views/worksmanagement/preview_save.jsp'
    })



    var id=''
    var progressbar=''
    var percentagediv=''
    $(document).on('click','.no-margin',function () {
         id=$(this).find('[name=file]').attr('id');
        percentagediv=$(this).parent().find('[name=percentage]').attr('id');
        progressbar=$(this).parent().find('[name=progressBar]').attr('id');
        document.getElementById(''+id+'').click();
        return id
    })

    var xhr = new XMLHttpRequest();
    var audio = new Audio();
    function UpladFile() {
        $('#'+progressbar+'').show()
        $('[name=file]').hide()
        var fileObj = document.getElementById(''+id+'').files[0]; // js 获取文件对象
        var FileController = contextPath + '/music/special/musictime'; // 接收上传文件的后台地址
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
        xhr.onload = function(data) {
            $('.song_title').html(fileObj.name)
            $('progress').hide();
            $('.no-margin').hide();
            $('#'+percentagediv+'').hide();
            $('[name=file]').hide()
            console.log(data)
        };
        // //监听progress事件
         xhr.upload.addEventListener("progress", progressFunction, false);
         xhr.send(form);
        xhr.onreadystatechange=function() {
            if (xhr.status==200) {
                var data=JSON.parse(xhr.response)
                var wav=xhr.response.split(',')[0].split(':')[1];

                console.log(data.wavFile)
                var duration_id= $('.panel .in').parents().attr('id');
                console.log($($('#' +duration_id+' .duration')))
                // $($('#' +duration_id+' .duration')).text(song_data.time);
                $($('#' +duration_id)).attr("data-file",data.wavFile);
                $($('#' +duration_id)).attr("data-id",data.id);

            }
        }
    }
    function progressFunction(evt) {
        var progressBar = document.getElementById(''+progressbar+'');
        var percentageDiv = document.getElementById(''+percentagediv+'');
        if (evt.lengthComputable) {
            progressBar.max = evt.total;
            progressBar.value = evt.loaded;
            percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100)
                + "%";
        }
    }
    $(document).on('click','.panel .in .delete',function () {
        $('.panel .in [name=file]').show()
        $('.panel .in .song_title').html('')
        $('.panel .in #progressBar').val('')
        $('.panel .in progress').hide();
        $('.panel .in #percentage').show();
        $('.panel .in .no-margin').show();
        $('.panel .in .file').hide();
        xhr.abort()
        $('.panel .in #percentage').html('')
        $('.panel .in [name=file]').val('')
    })

    $(document).on('change','[name=file]',function () {
        UpladFile();
    })




    var languages_type_select2 = $('#languages_type_select2')
    languages_type_select2.append('<option>请选择歌曲</option>')
    $("#languages_type_select2").change(function () {
        var songid = $("#languages_type_select2").val();
        var param = {}
        var SongId = songid;

        param = {
            singerId: SongId
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

            },
            error: function(data) {
            }
        });
    })






        function songHtml(i) {
        var mainPerformeName=window.sessionStorage["createdId"];
            if(mainPerformeName){
                var main=JSON.parse(mainPerformeName)
                var mainname=main.name.mainPerformeName
                var companyName=main.name.companyName
            }
        var html='';
            html += '<div class="panel dynamicList aaa" id="collapse' + i + '" data-songid="' + i + '" data-album-id="'+i+'" style="position: relative; left: 0px; top: 0px;">'
            html += '<div class="panel-heading link-cursor arrow-drop-up">'
            html += '<div class="panel-title albummusic">'
            html += '<div class="row-xs-height link-cursor submit arrow-drop-up" data-toggle="collapse" data-parent="#accordion" href="#collapseThree' + i + '">'
            html += '<div class="col-xs-2 col-sm-3 col-md-2 no-padding-horizontal col-xs-height col-middle no-wrap padding-right cursor-move-hover"><span class="hidden-xs">歌曲</span><span class="num">' + i + ' </span> </div>'
            html += '<div class=" medium gray-dark col-xs-5 col-xs-height col-middle no-wrap text-ellipsis cursor-move-hover"><span class="music_result"></span></div>'
            html += '<div class="medium gray-dark col-xs-3 col-xs-height col-middle text-ellipsis no-wrap cursor-move-hover"> <span class="mainPerformeName">'+mainname+'</span> </div>'
            html += '<div class="col-xs-1 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap duration" name="duration">没有音频</span></div>'
            html += '<div class="col-xs-1 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap removeclass">删除 </span></div> </div> </div> </div>'

            //面板是否展开
            html += '<div id="collapseThree' + i + '" class="panel-collapse add_song collapse in">'
            html += '<div class="panel-body form-default padding-bottom-sm"> <label class="control-label">音频文件</label>'
            html += '<div>'
            html += ' <div class="no-margin single-row padding-right padding-left link-cursor no-wrap text-ellipsis background-gray-light clickable">'
            html += ' <span class="large text-success vertical-center margin-right-sm">+</span>'
            html += ' <input type="file" name="file" class="file" id="file'+i+'" size="28"  accept=".wav" style="display: none"/>'
            html += '  <span >单击上传（请务必上传格式为 WAV 的无损文件，采样率至少为 44.1khz，传输率至少为 16bit）</span>'
            html += '<div id="hidden-preview" style="display: none;">'
            html += '  </div>'
            html += '  </div>'
            html += '   <div class="progress-bar-audio">'
            html += '   <progress id="progressBar' + i + '" class="progressBar" name="progressBar" value="0" max="100" style="width: 50%;height: 20px; display: none"></progress>'
            html += ' <span id="percentage' + i + '" class="percentage" name="percentage" style="color:blue;"></span>'
            html += ' <span class="song_title"></span>'
            html += '<span class="delete">删除</span>'
            html += ' </div>'


            html += '<div class=" panel-container panel ">'
            html += '<div class="panel-heading">'
            html += '<div class="pos-relative">'
            html += '<div class="panel-body form-default ">'
            html += '<div class="row margin-bottom-sm">'
            html += '<div class="col-xs-6">'
            html += '<form id="music_style">'
            html += '<div class="form-group title_music"> '
            html += '<label for="title"><b class="red">*</b>歌曲名称</label>'
            html += '<input type="text" class="form-control " placeholder="请输入歌曲名称" data-id="collapse' + i + '" name="title" id="title" />'
            html += '</div></form></div>'
            html += '<div class="col-xs-6">'
            html += '<form  id="copyrOwner">'
            html += '<div class="form-group copyrightOwner">'
            html += '<label for="copyrightOwner">歌曲版本</label>'
            html += '<input type="text"  class="form-control" id="version" placeholder="请输入歌曲版本，例如混音版" name="version"/>'
            html += '</div></form></div> </div>'
            html += '<div class="row margin-bottom-sm">'
            html += '<div class="col-xs-12 "><form class="performers">'
            html += '<div class="form-group "><label for="exampleInputEmail1"><b class="red">*</b>表演人</label><span style="color:red" class="addPerformers">添加新表演人</span>'
            html += '<div id="select2_container_div perSelect" > <select class="performers_type_select2"  id="performers_type_select2" data-id="collapse' + i + '" class="select2" name="performers_type_select2"> </select> </div>'
            html += '</form>'
            html += '<div id="inputWrapper">'
            html += '</div>'
            html += '<button type="button" class="btn btn-success">添加其他角色</button> </div>'

            html += '</div>'
            html += '<div class="row">'
            html += '<div class="col-md-6"> <label class="control-label">您是否已经有了ISRC代码? </label><a class="help-icon margin-right" style="width:30px;height: 30px;border-radius: 50%;background: orangered; display: inline-block;"></a>'
            html += '<div>'
            html += '<div class="radio radio-inline radio-styled"><label><input name="isrc_code' + i + '"  id="isrc_code" type="radio" checked="checked"/><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage"></span>'
            html += '<div class="radio radio-inline radio-styled"> <label><input name="isrc_code' + i + '" id="hasISRC" type="radio" value="true" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div>'
            html += '<div class="col-xs-12 form-group margin-top-sm hastitle"><span>当我们发行您的专辑时，我们将为您申请编码并发送给您 </span> </div></div>'
            html += '<div class="form-group col-md-6 isrc_code" style="display: none;"> <label class="control-label"><b class="red">*</b>ISRC</label> <input type="text" class="form-control" id="isrc" name="isrc"/> </div> </div>'
            html += '<div class="row">'
            html += '<div class="col-xs-12"> <label class="control-label"><b class="red">*</b>歌词是否涉及敏感内容? </label> <span class="help-icon margin-right"></span>'
            html += '<div>'
            html += '<div class="radio radio-inline radio-styled"> <label><input name="has' + i + '" type="radio" id="hasBadContent" checked="checked"/><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage" style="display: none;"></span>'
            html += '<div class="radio radio-inline radio-styled"> <label><input name="has' + i + '" type="radio" id="hasBad" value="true" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div> </div> </div>'
            html += '<div class="row">'
            html += '<div class="col-xs-6"><label class="control-label"><b class="red">*</b>这首歌曲属于以下哪种类型? </label>'
            html += '<div class="radio"> <label> <input type="radio" name="optionsRadios' + i + '" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios1" value="option1" checked="" /> 原创音乐（需要填写词曲版权信息） </label> </div>'
            html += '<div class="radio"> <label> <input type="radio" name="optionsRadios' + i + '" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios2" value="option2" /> 翻唱歌曲（请先获得原创作者许可） </label> </div>'
            html += '<div class="radio"> <label> <input type="radio" name="optionsRadios' + i + '" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios3" value="option3" /> 公开版权歌曲（不填写词曲版权信息 )</label> </div> </div>'
            html += '<div class="col-xs-6"> <label class="control-label"></label>'
            html += '<div class="label-warning container-box-sm">该音乐由您作词作曲，且未借用其他作品的元素 </div> </div> </div></div> </div> </div> </div> </div> </div>'
            html += '<div class="panel-container panel">'
            html += '<div class="pos-relative">'
            html += '<div class="panel-body form-default ">'
            html += '<div class="panel-heading ">'
            html += '<div class="panel-title" data-toggle="collapse" data-parent="#accord" href="#collapseTh' + i + '">'
            html += '<div class="row-xs-height link-cursor arrow-drop-up"><a >高级信息(可选)</a> </div> </div> </div>'
            html += '<div id="collapseTh' + i + '" class="panel-collapse collapse">'
            html += '<div class="panel-body">'
            html += '<div class="panel">'
            html += '<div class="panel-body">'
            html += '<div class="row margin-bottom-sm">'
            html += '<div class="col-xs-6"> <form>'
            html += '<div class="form-group"> <label for="style">流派</label><div id="select2_container_div" > <select class="music_genre_select2" class="select2" name="music_genre_select2"> </select> </div> </div> </form> </div>'
            html += '<div class="col-xs-6"> <form>'
            html += '<div class="form-group"> <label for="exampleInputEmail1">词曲版权所有人</label> <input type="email" class="form-control" placeholder="填写个人姓名或公司名称及获得版权年份，例如李红(2008)" id="copyrightOwner" name="copyrightOwner" /> </div> </form> </div> </div>'

            if(companyName===null){
                html+='</div> </div> </div> </div> </div> </div> </div>'
            }else if(companyName!==null){
                html += '<div class="row margin-bottom-sm">'
                html += '<div class="col-xs-6"> <form>'
                html += '<div class="form-group"> <label for="exampleInputEmail1">唱片公司</label><input type="text" value="'+companyName+'" disabled="disabled" class="form-control" id="companyId" name="companyId"/> </div> </form> </div>'
                html += '<div class="col-xs-6"> <form>'
                html += '<div class="form-group"> <label for="exampleInputEmail1">唱片公司ID</label> <input type="text" class="form-control" id="companyBusinessId" name="companyBusinessId"/> </div> </form> </div> </div> </div> </div> </div> </div> </div> </div> </div>'
            }
            html += '<div class="panel-container panel">'
            html += '<div class="pos-relative">'
            html += '<div class="panel-body form-default ">'
            html += '<div class="panel-heading ">'
            html += '<div class="panel-title" data-toggle="collapse" data-parent="#accordio" href="#collapsefour' + i + '">'
            html += '<div class="row-xs-height link-cursor arrow-drop-up demo"> <a >歌词(可选)</a> </div></div></div>'
            html += '<div id="collapsefour' + i + '" class="panel-collapse collapse">'
            html += '<div class="panel-body">'
            html += '<div class="panel">'
            html += '<div class="panel-body">'
            html += '<div class="row margin-bottom-sm">'
            html += '<div class="col-xs-12"> <form>'
            html += '<div class="form-group"><textarea id="demo' + i + '" style="display: none;"  name="lyrics"></textarea></div> </form></div></div> </div></div></div></div></div></div></div></div></div>'
            return html;
        }



    function albumSongData(i,song) {
        var mainPerformeName=window.sessionStorage["createdId"];
        if(mainPerformeName){
            var main=JSON.parse(mainPerformeName)
            var mainname=main.name.mainPerformeName
            var companyName=main.name.companyName
        }
        var html=''
        html+='<div class="panel dynamicList aaa" id="collapse'+i+'" data-songid="'+i+'" data-album-id="'+i+'"  style="position: relative; left: 0px; top: 0px;" data-file="'+song.data.wavFile+'" data-id="'+song.data.id+'">'
        html+='<div class="panel-heading link-cursor arrow-drop-up">'
        html+='<div class="panel-title albummusic">'
        html+='<div class="row-xs-height link-cursor submit arrow-drop-up" data-toggle="collapse" data-parent="#accordion" href="#collapseThree'+i+'">'
        html+='<div class="col-xs-2 col-sm-3 col-md-2 no-padding-horizontal col-xs-height col-middle no-wrap padding-right cursor-move-hover"><span class="hidden-xs">歌曲</span><span class="num">' + i + ' </span> </div>'
        html+='<div class=" medium gray-dark col-xs-5 col-xs-height col-middle no-wrap text-ellipsis cursor-move-hover"><span class="music_result">'+song.data.title+'</span></div>'
        html+='<div class="medium gray-dark col-xs-3 col-xs-height col-middle text-ellipsis no-wrap cursor-move-hover"><span class="mainPerformeName">'+mainname+'</span> </div>'
        if(song.data.duration===null||song.data.duration===undefined){
            html+='<div class="col-xs-1 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap duration">没有音频</span></div>'
        }else{
            html+='<div class="col-xs-1 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap duration">'+song.data.duration+'</span></div>'
        }

        html+='<div class="col-xs-1 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap removeclass">删除 </span></div> </div> </div> </div>'
        html+='<div id="collapseThree'+i+'" class="panel-collapse add_song collapse">'
        html+='<div class="panel-body form-default padding-bottom-sm"> <label class="control-label">音频文件</label>'
        html+='<div>'
        if(song.music_title===undefined||song.music_title===''||song.music_title===null){
        html += ' <div class="no-margin single-row padding-right padding-left link-cursor no-wrap text-ellipsis background-gray-light clickable">'
        html += ' <span class="large text-success vertical-center margin-right-sm">+</span>'
        html += ' <input type="file" name="file" class="file" id="file'+i+'" size="28"  accept=".wav" style="display: none"/>'
        html += '  <span >单击上传（请务必上传格式为 WAV 的无损文件，采样率至少为 44.1khz，传输率至少为 16bit）</span>'
        html += '<div id="hidden-preview" style="display: none;">'
        html += '  </div>'
        html += '  </div>'
        html += '   <div class="progress-bar-audio">'
        html += '   <progress id="progressBar' + i + '" class="progressBar" name="progressBar" value="0" max="100" style="width: 50%;height: 20px; display: none"></progress>'
        html += ' <span id="percentage' + i + '" class="percentage" name="percentage" style="color:blue;"></span>'
        html += ' <span class="song_title"></span>'
        html += '<span class="delete">删除</span>'
        }else {
        html += ' <div class="no-margin single-row padding-right padding-left link-cursor no-wrap text-ellipsis background-gray-light clickable" style="display: none">'
        html += ' <span class="large text-success vertical-center margin-right-sm">+</span>'
        html += ' <input type="file" name="file" class="file" id="file'+i+'" size="28"  accept=".wav" style="display: none"/>'
        html += '  <span >单击上传（请务必上传格式为 WAV 的无损文件，采样率至少为 44.1khz，传输率至少为 16bit）</span>'
        html += '<div id="hidden-preview" style="display: none;">'
        html += '  </div>'
        html += '  </div>'
        html += '   <div class="progress-bar-audio">'
        html += '   <progress id="progressBar' + i + '" class="progressBar" name="progressBar" value="0" max="100" style="width: 50%;height: 20px; display: none"></progress>'
        html += ' <span id="percentage' + i + '" class="percentage" name="percentage" style="color:blue;"></span>'
        html += ' <span class="song_title">'+song.music_title+'</span>'
        html += '<span class="delete">删除</span>'
        }

        html+='<div class=" panel-container panel ">'
        html+='<div class="panel-heading">'
        html+='<div class="pos-relative">'
        html+='<div class="panel-body form-default ">'
        html+='<div class="row margin-bottom-sm">'
        html+='<div class="col-xs-6">'
        html+='<form id="music_style">'
        html+='<div class="form-group title_music"> '
        html+='<label for="title"><b class="red">*</b>歌曲名称</label>'
        html+='<input type="text" class="form-control " data-id="collapse'+i+'"  value="'+song.data.title+'" name="title" id="title" />'
        html+= '</div></form></div>'
        html+='<div class="col-xs-6">'
        html+='<form  id="copyrOwner">'
        html+='<div class="form-group copyrightOwner">'
        html+= '<label for="copyrightOwner">歌曲版本</label>'
        html+= '<input type="text"  class="form-control" id="version"  value="' + song.data.version + '"  name="version"/>'
        html+= '</div></form></div> </div>'
        html+='<div class="row margin-bottom-sm">'
        html+='<div class="col-xs-12 "><form class="performers">'
        html+='<div class="form-group "><label for="exampleInputEmail1"><b class="red">*</b>表演人</label><span style="color:red" class="addPerformers">添加新表演人</span>'
        html+= '<div id="select2_container_div perSelect" > <select class="performers_type_select2" id="performers_type_select2" data-id="collapse' + i + '"  class="select2" name="performers_type_select2"></select> </div>'
        html+= '</form>'
        html+='<div id="inputWrapper">'
        if(song.data.otherPerformerList===undefined||song.data.otherPerformerList===''){

        }else {
            for(var j=0;j<song.data.otherPerformerList.length;j++) {
                 if (song.data.otherPerformerList[j].type == '伴唱人') {
                    html += '<div class="form-group performer_remove"><div class="col-xs-3">'
                    html += '<select class="form-control"><option value="主要表演人">主要表演人</option><option   selected value="伴唱人">伴唱人</option></select>'
                    html += '</div><div class="col-xs-9 input-group"><input type="text" class="form-control" value="' + song.data.otherPerformerList[j].otherSingerName + '" id="p_name" name="p_name" placeholder="请输入姓名">'
                    html += '<span class="input-group-addon">删除<b class="red">*</b></span></div></div>'
                } else if (song.data.otherPerformerList[j].type == '主要表演人') {
                    html += '<div class="form-group performer_remove"><div class="col-xs-3">'
                    html += '<select class="form-control"><option value="主要表演人" selected>主要表演人</option><option value="伴唱人">伴唱人</option></select>'
                    html += '</div><div class="col-xs-9 input-group"><input type="text" class="form-control" value="' + song.data.otherPerformerList[j].otherSingerName + '" id="p_name" name="p_name" placeholder="请输入姓名">'
                    html += '<span class="input-group-addon">删除<b class="red">*</b></span></div></div>'
                }
            }
        }
        html+='</div>'
        html+= '<button type="button" class="btn btn-success">添加其他角色</button> </div>'
        html+= '</div>'
        html+='<div class="row">'
        html+='<div class="col-md-6"> <label class="control-label">您是否已经有了ISRC代码? </label><span class="help-icon margin-right"></span>'
        html+='<div>'
        if(song.data.hasIsrc=='1'){
        html+='<div class="radio radio-inline radio-styled"><label><input name="isrc_code'+i+'"  id="isrc_code" type="radio" checked="checked"/><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage"></span>'
        html+='<div class="radio radio-inline radio-styled"> <label><input name="isrc_code'+i+'" id="hasISRC" type="radio" value="true" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div>'
        html+='<div class="col-xs-12 form-group margin-top-sm hastitle"><span>当我们发行您的专辑时，我们将为您申请编码并发送给您 </span> </div></div>'
        html+='<div class="form-group col-md-6 isrc_code" style="display: none;"> <label class="control-label"><b class="red">*</b>ISRC</label> <input type="text" class="form-control" id="isrc" value="'+song.data.isrc+'" name="isrc"/> </div> </div>'
        }else if(song.data.hasIsrc=='0'){

        html+='<div class="radio radio-inline radio-styled"><label><input name="isrc_code'+i+'"  id="isrc_code" type="radio"  /><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage"></span>'
        html+='<div class="radio radio-inline radio-styled"> <label><input name="isrc_code'+i+'" id="hasISRC" type="radio" checked value="true" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div>'
        html+='<div class="col-xs-12 form-group margin-top-sm hastitle"><span>当我们发行您的专辑时，我们将为您申请编码并发送给您 </span> </div></div>'
        html+='<div class="form-group col-md-6 isrc_code" style="display: block;"> <label class="control-label">ISRC</label> <input type="text" class="form-control" id="isrc" value="'+song.data.isrc+'" name="isrc"/></div></div>'
        }
        html+='<div class="row">'
        html+='<div class="col-xs-12"> <label class="control-label"><b class="red">*</b>歌词是否涉及敏感内容? </label> <span class="help-icon margin-right"></span>'
        html+='<div>'
        if(song.data.hasBadContent==='0'){
            html+='<div class="radio radio-inline radio-styled"> <label><input name="has'+i+'" type="radio" id="hasBadContent" checked="checked"/><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage" style="display: none;"></span>'
            html+='<div class="radio radio-inline radio-styled"> <label><input name="has'+i+'" type="radio" id="hasBad" value="true" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div> </div> </div>'
        }else if(song.data.hasBadContent==='1'){
            html+='<div class="radio radio-inline radio-styled"> <label><input name="has'+i+'" type="radio" id="hasBadContent" /><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage" style="display: none;"></span>'
            html+='<div class="radio radio-inline radio-styled"> <label><input name="has'+i+'" type="radio" id="hasBad" value="true" checked="checked" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div> </div> </div>'
        }
        html+='<div class="row">'
        html+='<div class="col-xs-6"><label class="control-label"><b class="red">*</b>这首歌曲属于以下哪种类型? </label>'
        if(song.data.type==='001'){
            html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+i+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios1" value="option1" checked="checked" /> 原创音乐（需要填写词曲版权信息） </label> </div>'
            html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+i+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios2" value="option2" /> 翻唱歌曲（请先获得原创作者许可） </label> </div>'
            html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+i+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios3" value="option3" /> 公开版权歌曲（不填写词曲版权信息）  </label> </div> </div>'
        }else if(song.data.type ==='010'){
            html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+i+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios1" value="option1"/> 原创音乐（需要填写词曲版权信息） </label> </div>'
            html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+i+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios2" value="option2" checked="checked" /> 翻唱歌曲（请先获得原创作者许可） </label> </div>'
            html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+i+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios3" value="option3" /> 公开版权歌曲（不填写词曲版权信息） </label> </div> </div>'
        }else if(song.data.type==='011'){
            html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+i+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios1" value="option1" /> 原创音乐（需要填写词曲版权信息） </label> </div>'
            html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+i+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios2" value="option2" /> 翻唱歌曲（请先获得原创作者许可） </label> </div>'
            html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+i+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios3" value="option3"  checked="checked"/> 公开版权歌曲（不填写词曲版权信息） </label> </div> </div>'
        }
        html+='<div class="col-xs-6"> <label class="control-label"></label>'
        html+='<div class="label-warning container-box-sm">该音乐由您作词作曲，且未借用其他作品的元素 </div> </div> </div></div> </div> </div> </div> </div> </div>'

        html+='<div class="panel-container panel">'
        html+='<div class="pos-relative">'
        html+='<div class="panel-body form-default ">'
        html+='<div class="panel-heading ">'
        html+='<div class="panel-title" data-toggle="collapse" data-parent="#accord" href="#collapseTh'+i+'">'
        html+='<div class="row-xs-height link-cursor arrow-drop-up"><a >高级信息(可选)</a> </div> </div> </div>'
        html+='<div id="collapseTh'+i+'" class="panel-collapse collapse">'
        html+='<div class="panel-body">'
        html+='<div class="panel">'
        html+='<div class="panel-body">'
        html+='<div class="row margin-bottom-sm">'
        html+='<div class="col-xs-6"> <form>'
        html+='<div class="form-group"> <label for="style">流派</label> <div id="select2_container_div" > <select class="music_genre_select2" class="select2" name="music_genre_select2"  value="'+song.data.style+'"><option>'+song.data.style+'</option></select> </div></div> </form> </div>'
        html+='<div class="col-xs-6"> <form>'
        html+='<div class="form-group"> <label for="exampleInputEmail1">词曲版权所有人</label> <input type="email"  value="'+song.data.copyrightOwner+'" placeholder="填写个人姓名或公司名称及获得版权年份，例如李红(2008)" class="form-control" id="copyrightOwner" name="copyrightOwner" /> </div> </form> </div> </div>'
        if(companyName===null||companyName===undefined){
            html+=' </div> </div> </div> </div> </div> </div> </div>'
        }else if(companyName!==''||companyName!==undefined||companyName!==null){
            html+='<div class="row margin-bottom-sm">'
            html+='<div class="col-xs-6"> <form>'
            html+='<div class="form-group"> <label for="exampleInputEmail1">唱片公司</label><input type="text" class="form-control" disabled="disabled" value="'+companyName+'" id="companyId" name="companyId"/> </div> </form> </div>'
            html+='<div class="col-xs-6"> <form>'
            html+='<div class="form-group"> <label for="exampleInputEmail1">唱片公司ID</label> <input type="text" class="form-control" value="'+song.data.companyBusinessId+'" id="companyBusinessId" name="companyBusinessId"/> </div> </form> </div> </div> </div> </div> </div> </div> </div> </div> </div>'
        }
        html+='<div class="panel-container panel">'
        html+='<div class="pos-relative">'
        html+='<div class="panel-body form-default ">'
        html+='<div class="panel-heading ">'
        html+='<div class="panel-title" data-toggle="collapse" data-parent="#accordio" href="#collapsefour'+i+'">'
        html+='<div class="row-xs-height link-cursor arrow-drop-up demo"> <a >歌词(可选)</a> </div></div></div>'
        html+='<div id="collapsefour'+i+'" class="panel-collapse collapse">'
        html+='<div class="panel-body">'
        html+='<div class="panel">'
        html+='<div class="panel-body">'
        html+='<div class="row margin-bottom-sm">'
        html+='<div class="col-xs-12"> <form>'
        if(song.data.lyrics===undefined){
            html += '<div class="form-group"><textarea id="demo' + i + '" style="display: none;"  name="lyrics"></textarea></div> </form></div></div> </div></div></div></div></div></div></div></div></div></div></div>'
        }else {
            html += '<div class="form-group"><textarea id="demo' + i + '" style="display: none;"  name="lyrics">' + song.data.lyrics + '</textarea></div> </form></div></div> </div></div></div></div></div></div></div></div></div></div></div>'
        }
        return html
    }


    function generateContent(i, song) {//拿到歌曲每一条数据
        if (i === undefined) {//如果对象为空，生成第一条就要展开
            i = 1;
        }
        if (song === undefined) {
            displayIndex = i;
            return songHtml(i)
        }else{
            console.log(song)
            return albumSongData(i,song)
            albumSong.songType();//表演人
            albumSong.musicType();
        }

    }
    //输入数据同步显示
    function keyMusicTitle(){
        $(document).on("keyup",".panel .in  [name=title]",function(){
            console.log($(this))
            var item_id= $(this).attr('data-id');
            var div_id= $(this).parents().parents().parents().parents().parents().parents().parents().parents().parents().parents().parents().parents().attr('id');
            console.log(div_id)
            if(item_id === div_id){
                $($('#'+div_id+' .music_result')).html($(" .panel .in  [name=title]").val())
            }
        });
    }
    keyMusicTitle();




    $(document).on('focus','.panel .in [name=title]',function () {
        $('.panel .in #mobile-error').remove();
    })
    $(document).on('focus','.panel .in [name=p_name]',function () {
        $('.panel .in #role_error').remove();
    })
    $(document).on('focus','.panel .in [name=isrc]',function () {
        $('.panel .in #isrc_error').remove();
    })
    /*获取这首歌曲属于以下哪种类型?*/
    $(document).on('click','.panel .in .optionsRadios', function () {
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


    function gettingData(index) {
        var context;
        $('.dynamicList').each(function (i, item) {
            if (i == index - 1) {
                context = $(item);
                return;
            }
        })

        console.log(context)
        var id = context.attr("data-id");
        var music_title=context.find(".song_title").html();
        var songid = context.attr("data-songid");
        var singerName = context.find(".select2-selection__rendered").attr('title')/*表演人名称*/
        var songCompanyId = context.find("[name=companyId]").val() /*唱片公司id*/
        var wavFile = context.attr("data-file");
        var duration =context.find(' .duration').text()
        var singerId =context.find(".performers_type_select2").val();
        console.log(singerId)
        var title = context.find("[name=title]").val()/*歌曲标题*/
        var version = context.find("[name=version]").val()/*歌曲版本*/
        var hasOtherSinger ='' /*其他表演人 0有 1没有*/
        var isrc = context.find("[name=isrc]").val()/*isrc码*/
        var type = ''/*类型，001：原创音乐；010：翻唱歌曲；011：公开版权歌曲*/
        var style = context.find(".music_genre_select2 option:selected").text() /*流派*/
        var copyrightOwner = context.find("[name=copyrightOwner]").val()   /*词曲版权所有人*/
        var companyBusinessId = context.find("[name=companyBusinessId]").val() /*唱片公司id*/
        var p_name= context.find("[name=p_name]").val()
        if(companyBusinessId===undefined){
            companyBusinessId='';
        }
        var lyrics = $(".panel .in iframe").contents().find("body").html() /*唱片公司*/
        var lyricsType=$(".panel .in iframe").contents().find("body").html() /*歌词格式*/
        var up_filename =  context.find('.up_filename').text()
        var playArray = [];
        var inputWrapper =context.find('#inputWrapper .performer_remove');
        console.log(inputWrapper)



        $(inputWrapper).each(function (i, item) {
            var obj = {};
            obj["type"] = $(item).find('select').val();
            obj["otherSingerName"] = $(item).find('input').val();
            playArray.push(obj);
        })

        //     var name=[]
        // var role_name=true
        // $(p_name).each(function (i,item) {
        //     name.push($(item).val())
        //     for(var i=0;i<name.length;i++){
        //         if(name==''){
        //             role_name=false
        //             return role_name
        //         }
        //     }
        // })
        // 判断有无其他表演人
        if (playArray.length <= 0) {
            hasOtherSinger = '1'
        } else if (playArray.length >= 0) {
            hasOtherSinger = '0'
        }

        var hasBadContent = null
        var hasBadContent1 = context.find('#hasBadContent').is(':checked');
        var hasBadContent2 = context.find('#hasBad').is(':checked');
        if (hasBadContent1) {
            hasBadContent = '0'
        } else if (hasBadContent2) {
            hasBadContent = '1'
        }
        var type1 = context.find('#optionsRadios1').is(':checked');
        var type2 = context.find('#optionsRadios2').is(':checked');
        var type3 = context.find('#optionsRadios3').is(':checked');
        if (type1) {
            type = '001'
        } else if (type2) {
            type = '010'
        } else {
            type = '011'
        }
        var hasIsrc = null
        var isrc_code =context.find('#isrc_code').is(':checked');
        var hasISRC =context.find('#hasISRC').is(':checked');

        if (isrc_code) {
            hasIsrc = '1'
        } else if (hasISRC) {
            hasIsrc = '0'
        }

        if (title === '') {
            $('.panel .in  #mobile-error').remove();
            $('.panel .in .title_music').append('<label id="mobile-error" class="error" for="mobile" style="color: red">歌曲名称不能为空</label>');
        }

        if(name===''){
            $('.panel .in  #role_error').remove();
            $('.panel .in .performer_remove').append('<label id="role_error" class="error" for="mobile" style="color: red">姓名不能为空</label>');
        }
        if(isrc===''&& hasIsrc==='0'){
            $('.panel .in  #isrc_error').remove();
            $('.panel .in .isrc_code').append('<label id="isrc_error" class="error" for="mobile" style="color: red">isrc码不能为空</label>');
        }
        if(title===''||isrc===''&&hasIsrc==='0'){
            throw Error("参数验证不通过");
        }else{
            return {
                id: id,
                music_title:music_title,
                data:{
                    id:id, //歌曲ID
                    singerId:singerId,  //表演人ID
                    singerName:singerName,  //表演人名称
                    songCompanyId:songCompanyId,  //唱片公司ID
                    wavFile:wavFile,  //音频文件ID
                    duration:duration,  // 歌曲时长
                    title:title,   //歌曲标题
                    version:version,  // 歌曲版本
                    hasOtherSinger:hasOtherSinger,  //有其他表演人 1无其他表演人
                    hasIsrc:hasIsrc, // 0有isrc 1无isrc
                    isrc:isrc,   //isrc编码
                    hasBadContent:hasBadContent,  //0涉及违法暴力 1不涉及
                    type:type,   //原创音乐；010：翻唱歌曲；011：公开版权歌曲
                    style:style,  //流派  （直接给中文名称）
                    copyrightOwner:copyrightOwner,  //版权所有人
                    companyBusinessId:companyBusinessId,   //唱片公司ID
                    lyrics:lyrics,   //歌词
                    lyricsType:lyricsType,   //歌词格式
                    equityList:[],  //词曲版权人数组
                    otherPerformerList:playArray,   //其他表演人数组
                }
            }
        }
    }
    var isOpen  = false;//有且仅有一行能展开
    var songList = [];
    var songCount = 0;
    var displayIndex = 0;//展开的面板的index
    var displayClass = "in";//面板是否展开
    var albumSong = {

        init: function () {/*页面初始化*/
            $('#accordion').html('');
            songList = [];
            var songData = window.sessionStorage["param"]
            if (songData != "[]" && songData !== undefined) {
                songList = JSON.parse(songData);
            }
            function generateList(songList) {//生成歌曲列表
                var html = "";
                if (songList === undefined || songList.length <= 0) {
                     $('#accordion').append(html);
                } else {
                    for (var i = 0; i < songList.length; i++) {
                        html = generateContent(i + 1, songList[i]);
                        $('#accordion').append(html);
                    }
                }

            }

            //执行生成面板的代码
            generateList(songList);
            songCount = songList.length;
        },
        saveData: function () {
            // 保存数据
            if (displayIndex <= 0) {
                return;
            }
            var param = gettingData(displayIndex);
            console.log(param);
            // param['equityList'] = songList[displayIndex - 1]
            songList.splice(displayIndex - 1, 1, param);
            window.sessionStorage["param"] = JSON.stringify(songList)
            songCount = songList.length;
        },
        deleteData: function (i) {
            var element = songList[i-1];
            if(element['id']!==undefined){
                song_array.push(element['data']);
            }
            reload_select2($("#song_type_select2"),song_array);
            songList.splice(i - 1, 1);
            window.sessionStorage["param"] = JSON.stringify(songList)
            songCount = songList.length;
        },
        open: function (index) {//展开面板
            if (index <= 0) {
                return;
            }
            $('.dynamicList ').each(function (i, item) {
                var context = $(item).find('#collapseThree' + index);
                if (i == index - 1) {
                    context.addClass(displayClass);
                    displayIndex = index;
                }
            })
        },
        close: function () {//折叠面板
            if (displayIndex <= 0) {
                return;
            }
            $('.dynamicList ').each(function (i, item) {
                var context = $(item).find('#collapseThree' + displayIndex);
                if (i == displayIndex - 1) {
                    context.removeClass(displayClass);
                }
            })
        },
        add: function () {//添加歌曲
            console.log(songList.length);
            $('#accordion').append(generateContent(++songCount));
            isOpen = true;
            $('.panel-title').on('click', function () {
                var index = $(this).find('.num').html();
                if (index == displayIndex) {
                    albumSong.saveData();
                }
            });
        },
        songType: function () {
            var performers_type_select2;
            $.ajax({
                type: "get",
                async: false,
                url: contextPath + '/performer/list',
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    performers_type_select2 = $('.performers_type_select2').select2({
                        data: data,
                        width: '299px',
                        language: "zh-CN",//汉化
                        placeholder: '请选择表演人',//默认文字提示
                        allowClear: true//允许清空
                    });
                    console.debug("缺省选择的是:" + performers_type_select2.val());
                },
                error: function (data) {

                }
            });
            performers_type_select2.on("change", function (e) {
                console.debug("选择了" + performers_type_select2.val());
                var item_id= $(this).attr('data-id');
                var div_id= $('.panel .in').parents().attr('id');
                var title=$("#"+item_id+' .select2-selection__rendered').attr("title");
                if(item_id === div_id){
                    $($('#'+div_id+' .mainPerformeName')).html(title)
                }
            });
        },
        musicType: function () {
            var musci_genre_select2;
            $.ajax({
                type: "get",
                async: false,
                url: contextPath + '/music/genre/rest/list',
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    musci_genre_select2 = $(".music_genre_select2").select2({
                        data: data,
                        width: '299px',
                        language: "zh-CN",//汉化
                        placeholder: '请选择流派',//默认文字提示
                        allowClear: true//允许清空
                    });
                    console.debug("缺省选择的是:" + musci_genre_select2.val());
                },
                error: function (data) {

                }
            });

            musci_genre_select2.on("change", function (e) {
                console.debug("选择了" + musci_genre_select2.val());
            });
        }
    }
    albumSong.init(); //页面初始化
    albumSong.songType();//表演人
    albumSong.musicType();
    $('.btn_add ').on('click', function () {
        albumSong.saveData();
        albumSong.close();
        albumSong.add();//添加歌曲面板
        albumSong.songType();//表演人
        albumSong.musicType();//流派
        // adduploadaMusic();//音频文件
    })

    $('#accordion').on('click', '.albummusic', function (event) {//点击展开折叠
        var index = $(this).find('.num').html();
            try{
                albumSong.saveData();
                displayIndex = index;
            }catch (e){
                return false;
            }
    })


    $('#accordion').on('click', '.albummusic', function (event) {//点击展开折叠
        try{
            gettingData(displayIndex);
        }catch (e){
            return false;
        }
    })


    //删除歌曲
    $('#accordion').on('click', '.removeclass', function (event) {
        event.stopPropagation();
        var context = $(this).parent().parent().parent().parent().parent();
        var i = context.attr('data-songid');
        albumSong.deleteData(i);
        albumSong.init();
        albumSong.songType();//表演人
        albumSong.musicType();//流派
        if (i < displayIndex) {
            displayIndex--;
        } else if (i == displayIndex) {
            displayIndex = 0;
        }
        // albumSong.open(displayIndex);
        context.remove();
    });

    function exchange(song){
        return {
            id: song['id'],
            data: song
        }
    }

    song_data_list.on("change", function (e) { // TODO
        var songId = $(this).val();
        var song = song_array.filter(function (item,index,array) {
            return songId==item['id']
        });
        song_array = song_array.filter(function (item,index,array) {
            return songId!=item['id']
        });
        reload_select2($("#song_type_select2"), song_array);
        var data = exchange(song[0]);
        songList.push(data);
        window.sessionStorage["param"] = JSON.stringify(songList);
        $('#accordion').append(generateContent(++songCount,data));
        albumSong.songType();//表演人
        albumSong.musicType();//音乐类型
        // adduploadaMusic();//上传音频文件方法
    });



    /*下一步*/
    $('.next_step').on("click",function () {
        // gettingData();
        albumSong.saveData();
        location.href = contextPath + '/views/worksmanagement/lyrics_copyright.jsp'
    })
    // 上一步
    $('.prev_step').on("click",function () {
        albumSong.saveData();
        location.href = contextPath + '/views/worksmanagement/lyrics_copyright.jsp'
    })

    $('.album').on('click',function () {
        albumSong.saveData();
        location.href = contextPath + '/views/worksmanagement/lyrics_copyright.jsp'
    })

    $('.single_lyrics').on('click',function () {
        albumSong.saveData();
    })

    $('.single_save').on('click',function(){
        albumSong.saveData();
    })

    /*添加其他角色*/
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
        $('.panel .in #inputWrapper').append(hl);
    })

    // 点击删除其他角色
    $(document).on('click',".input-group-addon",function () {
        $(this).parent().parent().remove()
    })


    //回显上传文件按钮
    $(".panel-group [name=uploadmusic]").each(function(){
        var  music_id=($(this).attr("id"));
        $('#'+music_id).Huploadify({
            auto:true,
            fileTypeExts:'wav;',
            multi:true,
            formData:{key:123456,key2:'vvvv'},
            fileSizeLimit:1000000000,
            showUploadedPercent:true,//是否实时显示上传的百分比，如20%
            showUploadedSize:true,
            removeTimeout: 9999999999999999,
            uploader:'http://127.0.0.1:8080/music/special/musictime',
            onUploadStart:function(){
                //alert('开始上传');
            },
            onInit:function(){
                //alert('初始化');
            },
            onUploadComplete:function(){
                //alert('上传完成');
            },
            onDelete:function(file){
                console.log('删除的文件：'+file);
                console.log(file);
            },
            onUploadSuccess: function (fileObj, data, response) {
                /*拿到后台数据的返回信息*/
                var song_data=JSON.parse(data)
                var duration_id= $('.panel .in').parents().attr('id');
                console.log($($('#' +duration_id+' .duration')))
                $($('#' +duration_id+' .duration')).text(song_data.time);
                $($('#' +duration_id)).attr("data-file",song_data.wavFile);
                $($('#' +duration_id)).attr("data-id",song_data.id);
                var count = 1;
                timer = setInterval(function() {
                    count--;
                    if (count > 0) {
                    } else{
                        $($('#' +duration_id+' .uploadify-progress')).hide()
                        $($('#' +duration_id+' .up_percent')).hide()
                        $($('#' +duration_id+' .uploadedsize')).hide()
                        $($('#' +duration_id+' .progressnum')).hide()
                         $($('#' +duration_id+' .uploadify-button')).css("display","none")
                        return false
                    }
                }, 1000)
            }
        });
    })


    $(document).on('click','.delfilebtn',function () {
        var wavfile=$(this).parent().parent().parent().parent().parent().parent().parent().parent().attr("data-file");
        var id=$(this).parent().parent().parent().parent().parent().parent().parent().parent().attr("data-id");
        var param={}
        param={
            wavFile:wavfile,
            id:id,
        };
        console.log(param)
        var song_url = contextPath + '/music/special/daleteSongs';
        var contentType = 'application/json';
        param = JSON.stringify(param)
        $.ajax({
            type: 'post',
            data: param,
            url: song_url,
            async: false,//默认为true
            contentType: contentType,//默认为application/x-www-form-urlencoded
            dataType: 'json',//默认为预期服务器返回的数据类型
            processData: false,//默认为true*/
            beforeSend: function (data) {

            },
            success: function (data) {
                $('.panel .in').find('.uploadify-button').removeClass('uploadin');
            },
            error: function (data) {

            }
        });
    })


    $(document).on('click','.demo', function () {
        $(".panel-group [name=lyrics]").each(function(){
            var  lyrics_id=($(this).attr("id"));
            layui.use('layedit', function(){
                var layedit = layui.layedit;
                layedit.build(lyrics_id,{
                    tool: [ 'strong','italic','underline','del', '|', 'left', 'center', 'right']
                });
            });
        })
    })


    $(document).on('click','.demo', function () {
       var musicid= $(".panel-group .in [name=lyrics]").attr("id")
        layui.use('layedit', function(){
            var layedit = layui.layedit;
            layedit.build(musicid,{
                tool: [ 'strong','italic','underline','del', '|', 'left', 'center', 'right']
            });
        });
    })

});

