/**
 * Created by yjx on 2017/7/6.
 */
$().ready(function () {







    function generateHtmlBySong(index,song) {
        console.log(song);
        var html='';
        if(song===undefined||song===''){
            html += '<div class="panel dynamicList aaa" id="collapse' + index + '" data-songid="' + index + '" data-album-id="'+index+'" style="position: relative; left: 0px; top: 0px;">'
            html += '<div class="panel-heading link-cursor arrow-drop-up">'
            html += '<div class="panel-title albummusic">'
            html += '<div class="row-xs-height link-cursor submit arrow-drop-up" data-toggle="collapse" data-parent="#accordion" href="#collapseThree' + index + '" style="background: #20A0FF">'
            html += '<div class="col-xs-2 col-sm-3 col-md-2 no-padding-horizontal col-xs-height col-middle no-wrap padding-right cursor-move-hover"><span class="hidden-xs">歌曲</span><span class="num">' + index + ' </span> </div>'
            html += '<div class=" medium gray-dark col-xs-5 col-xs-height col-middle no-wrap text-ellipsis cursor-move-hover"><span class="music_result"></span></div>'
            html += '<div class="medium gray-dark col-xs-3 col-xs-height col-middle text-ellipsis no-wrap cursor-move-hover"> <span class="mainPerformeName"></span> </div>'
            html += '<div class="col-xs-1 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap duration" name="duration">没有音频</span></div>'
            html += '<div class="col-xs-1 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap removeclass">删除 </span></div> </div> </div> </div>'

            //面板是否展开
            html += '<div id="collapseThree' + index + '" class="panel-collapse add_song collapse in">'
            html += '<div class="panel-body form-default padding-bottom-sm"> <label class="control-label">音频文件</label>'
            html += '<div>'
            html += ' <div class="no-margin single-row padding-right padding-left link-cursor no-wrap text-ellipsis background-gray-light clickable">'
            html += ' <span class="large text-success vertical-center margin-right-sm">+</span>'
            html += ' <input type="file" name="file" class="file" id="file'+index+'" size="28"  accept=".wav" style="display: none"/>'
            html += '  <span >单击上传（请务必上传格式为 WAV 的无损文件，采样率至少为 44.1khz，传输率至少为 16bit）</span>'
            html += '<div id="hidden-preview" style="display: none;">'
            html += '  </div>'
            html += '  </div>'
            html += '   <div class="progress-bar-audio">'
            html += '   <progress id="progressBar' + index + '" class="progressBar" name="progressBar" value="0" max="100" style="width: 50%;height: 20px; display: none"></progress>'
            html += ' <span id="percentage' + index + '" class="percentage" name="percentage" style="color:blue;"></span>'
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
            html += '<input type="text" class="form-control " placeholder="请输入歌曲名称" data-id="collapse' + index + '" name="title" id="title" />'
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
            html += '<div id="select2_container_div perSelect" > <select class="performers_type_select2"  id="performers_type_select2" data-id="collapse' + index + '" class="select2" name="performers_type_select2"> </select> </div>'
            html += '</form>'
            html += '<div id="inputWrapper">'
            html += '</div>'
            html += '<button type="button" class="btn btn-success">添加其他角色</button> </div>'

            html += '</div>'
            html += '<div class="row">'
            html += '<div class="col-md-6"> <label class="control-label">您是否已经有了ISRC代码? </label><a class="help-icon margin-right" style="width:30px;height: 30px;border-radius: 50%;background: orangered; display: inline-block;"></a>'
            html += '<div>'
            html += '<div class="radio radio-inline radio-styled"><label><input name="isrc_code' + index + '"  id="isrc_code" type="radio" checked="checked"/><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage"></span>'
            html += '<div class="radio radio-inline radio-styled"> <label><input name="isrc_code' + index + '" id="hasISRC" type="radio" value="true" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div>'
            html += '<div class="col-xs-12 form-group margin-top-sm hastitle"><span>当我们发行您的专辑时，我们将为您申请编码并发送给您 </span> </div></div>'
            html += '<div class="form-group col-md-6 isrc_code" style="display: none;"> <label class="control-label"><b class="red">*</b>ISRC</label> <input type="text" class="form-control" id="isrc" name="isrc"/> </div> </div>'
            html += '<div class="row">'
            html += '<div class="col-xs-12"> <label class="control-label"><b class="red">*</b>歌词是否涉及敏感内容? </label> <span class="help-icon margin-right"></span>'
            html += '<div>'
            html += '<div class="radio radio-inline radio-styled"> <label><input name="has' + index + '" type="radio" id="hasBadContent" checked="checked"/><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage" style="display: none;"></span>'
            html += '<div class="radio radio-inline radio-styled"> <label><input name="has' + index + '" type="radio" id="hasBad" value="true" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div> </div> </div>'
            html += '<div class="row">'
            html += '<div class="col-xs-6"><label class="control-label"><b class="red">*</b>这首歌曲属于以下哪种类型? </label>'
            html += '<div class="radio"> <label> <input type="radio" name="optionsRadios' + index + '" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios1" value="option1" checked="" /> 原创音乐（需要填写词曲版权信息） </label> </div>'
            html += '<div class="radio"> <label> <input type="radio" name="optionsRadios' + index + '" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios2" value="option2" /> 翻唱歌曲（请先获得原创作者许可） </label> </div>'
            html += '<div class="radio"> <label> <input type="radio" name="optionsRadios' + index + '" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios3" value="option3" /> 公开版权歌曲（不填写词曲版权信息 )</label> </div> </div>'
            html += '<div class="col-xs-6"> <label class="control-label"></label>'
            html += '<div class="label-warning container-box-sm">该音乐由您作词作曲，且未借用其他作品的元素 </div> </div> </div></div> </div> </div> </div> </div> </div>'
            html += '<div class="panel-container panel">'
            html += '<div class="pos-relative">'
            html += '<div class="panel-body form-default ">'
            html += '<div class="panel-heading ">'
            html += '<div class="panel-title" data-toggle="collapse" data-parent="#accord" href="#collapseTh' + index + '">'
            html += '<div class="row-xs-height link-cursor arrow-drop-up"><a >高级信息(可选)</a> </div> </div> </div>'
            html += '<div id="collapseTh' + index + '" class="panel-collapse collapse">'
            html += '<div class="panel-body">'
            html += '<div class="panel">'
            html += '<div class="panel-body">'
            html += '<div class="row margin-bottom-sm">'
            html += '<div class="col-xs-6"> <form>'
            html += '<div class="form-group"> <label for="style">流派</label><div id="select2_container_div" > <select class="music_genre_select2" class="select2" name="music_genre_select2"> </select> </div> </div> </form> </div>'
            html += '<div class="col-xs-6"> <form>'
            html += '<div class="form-group"> <label for="exampleInputEmail1">词曲版权所有人</label> <input type="email" class="form-control" placeholder="填写个人姓名或公司名称及获得版权年份，例如李红(2008)" id="copyrightOwner" name="copyrightOwner" /> </div> </form> </div> </div>'
            html += '<div class="row margin-bottom-sm">'
            html += '<div class="col-xs-6"> <form>'
            html += '<div class="form-group"> <label for="exampleInputEmail1">唱片公司</label><input type="text"  disabled="disabled" class="form-control" id="companyId" name="companyId"/> </div> </form> </div>'
            html += '<div class="col-xs-6"> <form>'
            html += '<div class="form-group"> <label for="exampleInputEmail1">唱片公司ID</label> <input type="text" class="form-control" id="companyBusinessId" name="companyBusinessId"/> </div> </form> </div> </div> </div> </div> </div> </div> </div> </div> </div>'
            html += '<div class="panel-container panel">'
            html += '<div class="pos-relative">'
            html += '<div class="panel-body form-default ">'
            html += '<div class="panel-heading ">'
            html += '<div class="panel-title" data-toggle="collapse" data-parent="#accordio" href="#collapsefour' + index + '">'
            html += '<div class="row-xs-height link-cursor arrow-drop-up demo"> <a >歌词(可选)</a> </div></div></div>'
            html += '<div id="collapsefour' + index + '" class="panel-collapse collapse">'
            html += '<div class="panel-body">'
            html += '<div class="panel">'
            html += '<div class="panel-body">'
            html += '<div class="row margin-bottom-sm">'
            html += '<div class="col-xs-12"> <form>'
            html += '<div class="form-group"><textarea id="demo' + index + '" style="display: none;"  name="lyrics"></textarea></div> </form></div></div> </div></div></div></div></div></div></div></div></div>'
            return html;


        }else{

            html+='<div class="panel dynamicList aaa" id="collapse'+index+'" data-songid="'+index+'" data-album-id="'+index+'"  style="position: relative; left: 0px; top: 0px;" data-file="'+song.wavFile+'" data-id="'+song.id+'">'
            html+='<div class="panel-heading link-cursor arrow-drop-up">'
            html+='<div class="panel-title albummusic">'
            html+='<div class="row-xs-height link-cursor submit arrow-drop-up" data-toggle="collapse" data-parent="#accordion" href="#collapseThree'+index+'" style="background: #20A0FF">'
            html+='<div class="col-xs-2 col-sm-3 col-md-2 no-padding-horizontal col-xs-height col-middle no-wrap padding-right cursor-move-hover"><span class="hidden-xs">歌曲</span><span class="num">' + index + ' </span> </div>'
            html+='<div class=" medium gray-dark col-xs-5 col-xs-height col-middle no-wrap text-ellipsis cursor-move-hover"><span class="music_result">'+song.title+'</span></div>'
            html+='<div class="medium gray-dark col-xs-3 col-xs-height col-middle text-ellipsis no-wrap cursor-move-hover"><span class="mainPerformeName"></span> </div>'
            if(song.duration===null||song.duration===undefined){
                html+='<div class="col-xs-1 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap duration">没有音频</span></div>'
            }else{
                html+='<div class="col-xs-1 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap duration">'+song.duration+'</span></div>'
            }

            html+='<div class="col-xs-1 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap removeclass">删除 </span></div> </div> </div> </div>'
            html+='<div id="collapseThree'+index+'" class="panel-collapse add_song collapse">'
            html+='<div class="panel-body form-default padding-bottom-sm"> <label class="control-label">音频文件</label>'
            html+='<div>'
            if(song.music_title===undefined||song.music_title===''||song.music_title===null){
                html += ' <div class="no-margin single-row padding-right padding-left link-cursor no-wrap text-ellipsis background-gray-light clickable">'
                html += ' <span class="large text-success vertical-center margin-right-sm">+</span>'
                html += ' <input type="file" name="file" class="file" id="file'+index+'" size="28"  accept=".wav" style="display: none"/>'
                html += '  <span >单击上传（请务必上传格式为 WAV 的无损文件，采样率至少为 44.1khz，传输率至少为 16bit）</span>'
                html += '<div id="hidden-preview" style="display: none;">'
                html += '  </div>'
                html += '  </div>'
                html += '   <div class="progress-bar-audio">'
                html += '   <progress id="progressBar' + index + '" class="progressBar" name="progressBar" value="0" max="100" style="width: 50%;height: 20px; display: none"></progress>'
                html += ' <span id="percentage' + index + '" class="percentage" name="percentage" style="color:blue;"></span>'
                html += ' <span class="song_title"></span>'
                html += '<span class="delete">删除</span>'
            }else {
                html += ' <div class="no-margin single-row padding-right padding-left link-cursor no-wrap text-ellipsis background-gray-light clickable" style="display: none">'
                html += ' <span class="large text-success vertical-center margin-right-sm">+</span>'
                html += ' <input type="file" name="file" class="file" id="file'+index+'" size="28"  accept=".wav" style="display: none"/>'
                html += '  <span >单击上传（请务必上传格式为 WAV 的无损文件，采样率至少为 44.1khz，传输率至少为 16bit）</span>'
                html += '<div id="hidden-preview" style="display: none;">'
                html += '  </div>'
                html += '  </div>'
                html += '   <div class="progress-bar-audio">'
                html += '   <progress id="progressBar' + index + '" class="progressBar" name="progressBar" value="0" max="100" style="width: 50%;height: 20px; display: none"></progress>'
                html += ' <span id="percentage' + index + '" class="percentage" name="percentage" style="color:blue;"></span>'
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
            html+='<input type="text" class="form-control " data-id="collapse'+index+'"  value="'+song.title+'" name="title" id="title" />'
            html+= '</div></form></div>'
            html+='<div class="col-xs-6">'
            html+='<form  id="copyrOwner">'
            html+='<div class="form-group copyrightOwner">'
            html+= '<label for="copyrightOwner">歌曲版本</label>'
            html+= '<input type="text"  class="form-control" id="version"  value="' + song.version + '"  name="version"/>'
            html+= '</div></form></div> </div>'
            html+='<div class="row margin-bottom-sm">'
            html+='<div class="col-xs-12 "><form class="performers">'
            html+='<div class="form-group "><label for="exampleInputEmail1"><b class="red">*</b>表演人</label><span style="color:red" class="addPerformers">添加新表演人</span>'
            html+= '<div id="select2_container_div perSelect" > <select class="performers_type_select2" id="performers_type_select2" data-id="collapse' + index + '"  class="select2" name="performers_type_select2"></select> </div>'
            html+= '</form>'
            html+='<div id="inputWrapper">'
            if(song.otherPerformerList===undefined||song.otherPerformerList===''){

            }else {
                for(var j=0;j<song.otherPerformerList.length;j++) {
                    if (song.otherPerformerList[j].type == '伴唱人') {
                        html += '<div class="form-group performer_remove"><div class="col-xs-3">'
                        html += '<select class="form-control"><option value="主要表演人">主要表演人</option><option   selected value="伴唱人">伴唱人</option></select>'
                        html += '</div><div class="col-xs-9 input-group"><input type="text" class="form-control" value="' + song.otherPerformerList[j].otherSingerName + '" id="p_name" name="p_name" placeholder="请输入姓名">'
                        html += '<span class="input-group-addon">删除<b class="red">*</b></span></div></div>'
                    } else if (song.otherPerformerList[j].type == '主要表演人') {
                        html += '<div class="form-group performer_remove"><div class="col-xs-3">'
                        html += '<select class="form-control"><option value="主要表演人" selected>主要表演人</option><option value="伴唱人">伴唱人</option></select>'
                        html += '</div><div class="col-xs-9 input-group"><input type="text" class="form-control" value="' + song.otherPerformerList[j].otherSingerName + '" id="p_name" name="p_name" placeholder="请输入姓名">'
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
            if(song.hasIsrc=='1'){
                html+='<div class="radio radio-inline radio-styled"><label><input name="isrc_code'+index+'"  id="isrc_code" type="radio" checked="checked"/><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage"></span>'
                html+='<div class="radio radio-inline radio-styled"> <label><input name="isrc_code'+index+'" id="hasISRC" type="radio" value="true" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div>'
                html+='<div class="col-xs-12 form-group margin-top-sm hastitle"><span>当我们发行您的专辑时，我们将为您申请编码并发送给您 </span> </div></div>'
                html+='<div class="form-group col-md-6 isrc_code" style="display: none;"> <label class="control-label"><b class="red">*</b>ISRC</label> <input type="text" class="form-control" id="isrc" value="'+song.isrc+'" name="isrc"/> </div> </div>'
            }else if(song.hasIsrc=='0'){

                html+='<div class="radio radio-inline radio-styled"><label><input name="isrc_code'+index+'"  id="isrc_code" type="radio"  /><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage"></span>'
                html+='<div class="radio radio-inline radio-styled"> <label><input name="isrc_code'+index+'" id="hasISRC" type="radio" checked value="true" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div>'
                html+='<div class="col-xs-12 form-group margin-top-sm hastitle"><span>当我们发行您的专辑时，我们将为您申请编码并发送给您 </span> </div></div>'
                html+='<div class="form-group col-md-6 isrc_code" style="display: block;"> <label class="control-label">ISRC</label> <input type="text" class="form-control" id="isrc" value="'+song.isrc+'" name="isrc"/></div></div>'
            }
            html+='<div class="row">'
            html+='<div class="col-xs-12"> <label class="control-label"><b class="red">*</b>歌词是否涉及敏感内容? </label> <span class="help-icon margin-right"></span>'
            html+='<div>'
            if(song.hasBadContent==='0'){
                html+='<div class="radio radio-inline radio-styled"> <label><input name="has'+index+'" type="radio" id="hasBadContent" checked="checked"/><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage" style="display: none;"></span>'
                html+='<div class="radio radio-inline radio-styled"> <label><input name="has'+index+'" type="radio" id="hasBad" value="true" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div> </div> </div>'
            }else if(song.hasBadContent==='1'){
                html+='<div class="radio radio-inline radio-styled"> <label><input name="has'+index+'" type="radio" id="hasBadContent" /><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage" style="display: none;"></span>'
                html+='<div class="radio radio-inline radio-styled"> <label><input name="has'+index+'" type="radio" id="hasBad" value="true" checked="checked" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div> </div> </div>'
            }
            html+='<div class="row">'
            html+='<div class="col-xs-6"><label class="control-label"><b class="red">*</b>这首歌曲属于以下哪种类型? </label>'
            if(song.type==='001'){
                html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+index+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios1" value="option1" checked="checked" /> 原创音乐（需要填写词曲版权信息） </label> </div>'
                html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+index+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios2" value="option2" /> 翻唱歌曲（请先获得原创作者许可） </label> </div>'
                html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+index+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios3" value="option3" /> 公开版权歌曲（不填写词曲版权信息）  </label> </div> </div>'
            }else if(song.type ==='010'){
                html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+index+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios1" value="option1"/> 原创音乐（需要填写词曲版权信息） </label> </div>'
                html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+index+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios2" value="option2" checked="checked" /> 翻唱歌曲（请先获得原创作者许可） </label> </div>'
                html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+index+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios3" value="option3" /> 公开版权歌曲（不填写词曲版权信息） </label> </div> </div>'
            }else if(song.type==='011'){
                html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+index+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios1" value="option1" /> 原创音乐（需要填写词曲版权信息） </label> </div>'
                html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+index+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios2" value="option2" /> 翻唱歌曲（请先获得原创作者许可） </label> </div>'
                html+='<div class="radio"> <label> <input type="radio" name="optionsRadios'+index+'" data-name="optionsRadios" class = "optionsRadios" id="optionsRadios3" value="option3"  checked="checked"/> 公开版权歌曲（不填写词曲版权信息） </label> </div> </div>'
            }
            html+='<div class="col-xs-6"> <label class="control-label"></label>'
            html+='<div class="label-warning container-box-sm">该音乐由您作词作曲，且未借用其他作品的元素 </div> </div> </div></div> </div> </div> </div> </div> </div>'

            html+='<div class="panel-container panel">'
            html+='<div class="pos-relative">'
            html+='<div class="panel-body form-default ">'
            html+='<div class="panel-heading ">'
            html+='<div class="panel-title" data-toggle="collapse" data-parent="#accord" href="#collapseTh'+index+'">'
            html+='<div class="row-xs-height link-cursor arrow-drop-up"><a >高级信息(可选)</a> </div> </div> </div>'
            html+='<div id="collapseTh'+index+'" class="panel-collapse collapse">'
            html+='<div class="panel-body">'
            html+='<div class="panel">'
            html+='<div class="panel-body">'
            html+='<div class="row margin-bottom-sm">'
            html+='<div class="col-xs-6"> <form>'
            html+='<div class="form-group"> <label for="style">流派</label> <div id="select2_container_div" > <select class="music_genre_select2" class="select2" name="music_genre_select2" ></select> </div></div> </form> </div>'
            html+='<div class="col-xs-6"> <form>'
            html+='<div class="form-group"> <label for="exampleInputEmail1">词曲版权所有人</label> <input type="email"  value="'+song.copyrightOwner+'" placeholder="填写个人姓名或公司名称及获得版权年份，例如李红(2008)" class="form-control" id="copyrightOwner" name="copyrightOwner" /> </div> </form> </div> </div>'
                html+='<div class="row margin-bottom-sm">'
                html+='<div class="col-xs-6"> <form>'
                html+='<div class="form-group"> <label for="exampleInputEmail1">唱片公司</label><input type="text" class="form-control" disabled="disabled"  id="companyId" name="companyId"/> </div> </form> </div>'
                html+='<div class="col-xs-6"> <form>'
                html+='<div class="form-group"> <label for="exampleInputEmail1">唱片公司ID</label> <input type="text" class="form-control" value="'+song.companyBusinessId+'" id="companyBusinessId" name="companyBusinessId"/> </div> </form> </div> </div> </div> </div> </div> </div> </div> </div> </div>'

            html+='<div class="panel-container panel">'
            html+='<div class="pos-relative">'
            html+='<div class="panel-body form-default ">'
            html+='<div class="panel-heading ">'
            html+='<div class="panel-title" data-toggle="collapse" data-parent="#accordio" href="#collapsefour'+index+'">'
            html+='<div class="row-xs-height link-cursor arrow-drop-up demo"> <a >歌词(可选)</a> </div></div></div>'
            html+='<div id="collapsefour'+index+'" class="panel-collapse collapse">'
            html+='<div class="panel-body">'
            html+='<div class="panel">'
            html+='<div class="panel-body">'
            html+='<div class="row margin-bottom-sm">'
            html+='<div class="col-xs-12"> <form>'
            if(song.lyrics===undefined){
                html += '<div class="form-group"><textarea id="demo' + index + '" style="display: none;"  name="lyrics"></textarea></div> </form></div></div> </div></div></div></div></div></div></div></div></div></div></div>'
            }else {
                html += '<div class="form-group"><textarea id="demo' + index + '" style="display: none;"  name="lyrics">' + song.lyrics + '</textarea></div> </form></div></div> </div></div></div></div></div></div></div></div></div></div></div>'
            }
            return html
        }

    }


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


    var album_song = {
        getSongsByPerformerId: function (performerId,func) {//根据表演人ID获取所有歌曲列表
            HttpUtils.special_songs(JSON.stringify({singerId:performerId}), function (data) {
                func(data);//回调
            });
        },
        getSongsByAlbumId: function (albumId,func) {//根据专辑ID获取所有歌曲列表
            HttpUtils.list_album_song(albumId, function (data) {
                func(data);//回调
            });
        }
    }



    var song_count = 0;

    //初始化
    var albumId = window.sessionStorage[''];//获取专辑id
    album_song.getSongsByPerformerId("19edc30b609f40c1bd637054732d143b",function (data) {

        album_song.getSongsByAlbumId("c9f43d6068d7484898fdb00c7e4e76f6",function (albumSongs) {//请求专辑下的歌曲列表
            var arr = albumSongs.data['albumSongs']||[];
            song_count = arr.length;
            //从下拉列表剔除已经选中的单曲
            var temp = [];
            for(var i = 0;i< data.length;i++){
                for(var j = 0;j<arr.length;j++){
                    if(data[i]['id']==arr[j]['id']){
                        temp.push(i);
                        break;
                    }
                }
            }
            for(var i=0;i<temp.length;i++){
                data[temp[i]]=null;
            }
            data = data.filter(function (item,index,array) {
                return item!=null;
            });
            reload_select2($("#song_type_select2"),data);//初始化下拉列表

            //显示已有的单曲
            arr.forEach(function (item,index,arr) {
                //渲染html
                $('#accordion').append(generateHtmlBySong(index+1,item));
            });
        });
    });


    //注册添加专辑歌曲点击事件
    $('.btn_add ').on('click', function () {

        $('#accordion').append(generateHtmlBySong(song_count+1));
    });

});