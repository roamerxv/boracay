/**
 * Created by yjx on 2017/6/2.
 */
$().ready(function () {
    $(document).on('click','.addPerformers',function () {
        $('#performers_add').modal({closeViaDimmer: false})
    })

    function song_type(){
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
        });
    }


    function music_type(){
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


    /*前端验证*/

    var login_form = $("#music_style")
    var login_rules = {
        title: {
            required: true,
        },
    };
    var login_messages = {
        title: {
            required: "歌曲名称不能为空",
        },
    };
    formValidate(login_form, login_rules, login_messages);

    var languages_type_select2 = $('#languages_type_select2')
    languages_type_select2.append('<option>请选择歌曲</option>')
    $("#languages_type_select2").change(function () {
        var songid = $("#languages_type_select2").val();
        var param={}
        var SongId=songid;

        param = {
            singerId:SongId
        };
        param = JSON.stringify(param)
        HttpUtils.post_song_data(param, function(data) {
            console.log()
            if (data !== '') {
                if(i >= 0){
                    songCount++;
                    dataid++;
                    Logger.debug(songCount)
                    var html=[];
                    html+='<div class="panel dynamicList aaa" style="position: relative; left: 0px; top: 0px;">'
                    html+='<div class="panel-heading link-cursor arrow-drop-up">'
                    html+='<div class="panel-title">'
                    html+='<div class="row-xs-height link-cursor submit arrow-drop-up" data-toggle="collapse" data-parent="#accordion" href="#collapseThree'+songCount+'">'
                    html+='<div class="col-xs-2 col-sm-3 col-md-2 no-padding-horizontal col-xs-height col-middle no-wrap padding-right cursor-move-hover"><span class="hidden-xs">歌曲</span><span class="num">' + num + ' </span> </div>'
                    html+='<div class=" medium gray-dark col-xs-5 col-xs-height col-middle no-wrap text-ellipsis cursor-move-hover"><span class="music_result"></span></div>'
                    html+='<div class="medium gray-dark col-xs-3 col-xs-height col-middle text-ellipsis no-wrap cursor-move-hover"> <span>DDD</span> </div>'
                    html+='<div class="col-xs-1 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap duration">没有音频 </span></div>'
                    html+='<div class="col-xs-1 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap removeclass">删除 </span></div> </div> </div> </div>'
                    if(i==0){
                        html+='<div id="collapseThree'+songCount+'" class="panel-collapse song collapse">'
                    }else if(i>=1){
                        html+='<div id="collapseThree'+songCount+'" class="panel-collapse song collapse">'
                    }
                    html+='<div class="panel-body form-default padding-bottom-sm"> <label class="control-label">音频文件</label>'
                    html+='<div>'
                    html+='<div class="no-margin single-row padding-right padding-left link-cursor no-wrap text-ellipsis background-gray-light clickable"> </span> <span title="将文件拖到此处或单击上传（仅限立体声WAV文件。推荐最小位深度：16位;采样率：44.1 kHz）">拖动您的文件或单击上传（仅限立体声WAV文件。推荐最小位深度：16位;采样率：44.1 kHz）</span></div>'
                    html+='<div class=" panel-container panel ">'
                    html+='<div class="panel-heading">'
                    html+='<div class="pos-relative">'
                    html+='<div class="panel-body form-default ">'
                    html+='<div class="row margin-bottom-sm">'
                    html+='<div class="col-xs-6">'
                    html+='<form id="music_style">'
                    html+='<div class="form-group title_music"> '
                    html+='<label for="title">歌曲名称</label>'
                    html+='<input type="text" class="form-control" ng-model="name" name="title" id="title" />'
                    html+= '</div></form></div>'
                    html+='<div class="col-xs-6">'
                    html+='<form  id="copyrOwner">'
                    html+='<div class="form-group copyrightOwner">'
                    html+= '<label for="copyrightOwner">歌曲版本</label>'
                    html+= '<input type="text"  class="form-control" id="copyrightOwner" name="copyrightOwner"/>'
                    html+= '</div></form></div> </div>'
                    html+='<div class="row margin-bottom-sm">'
                    html+='<div class="col-xs-12 "><form class="performers">'
                    html+='<div class="form-group "><label for="exampleInputEmail1"></label><span style="color:red">添加新表演人</span>'
                    html+= '<select class="form-control "><option>1</option><option>2</option> <option>3</option> <option>4</option> <option>5</option></select>'
                    html+= '</select> </div></form> <button type="button" class="btn btn-success">添加其他表演人</button> </div>'


                    html+= '</div>'
                    html+='<div class="row">'
                    html+='<div class="col-md-6"> <label class="control-label">您是否已经有了ISRC代码? </label><span class="help-icon margin-right"></span>'
                    html+='<div>'
                    html+='<div class="radio radio-inline radio-styled"><label><input name="isrc_code'+songCount+'"  id="isrc_code" type="radio" checked="checked"/><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage"></span>'
                    html+='<div class="radio radio-inline radio-styled"> <label><input name="isrc_code'+songCount+'" id="hasISRC" type="radio" value="true" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div>'
                    html+='<div class="col-xs-12 form-group margin-top-sm hastitle"><span>当我们发行您的专辑时，我们将为您申请编码并发送给您 </span> </div></div>'
                    html+='<div class="form-group col-md-6 isrc_code" style="display: none;"> <label class="control-label">ISRC</label> <input type="text" class="form-control" id="isrc" name="isrc"/> </div> </div>'
                    html+='<div class="row">'
                    html+='<div class="col-xs-12"> <label class="control-label">歌词是否涉及敏感内容? </label> <span class="help-icon margin-right"></span>'
                    html+='<div>'
                    html+='<div class="radio radio-inline radio-styled"> <label><input name="has'+songCount+'" type="radio" id="hasBadContent" checked="checked"/><span class="padding-right-sm margin-left-sm bold">No</span></label> </div> <span class="validationMessage" style="display: none;"></span>'
                    html+='<div class="radio radio-inline radio-styled"> <label><input name="has'+songCount+'" type="radio" id="hasBad" value="true" /><span class="margin-left-sm bold">Yes</span></label> </div> <span class="validationMessage"></span> </div> </div> </div>'
                    html+='<div class="row">'
                    html+='<div class="col-xs-6"><label class="control-label">这首歌曲属于以下哪种类型? </label>'
                    html+='<div class="radio"> <label> <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked="" /> 原创音乐（需要填写词曲版权信息） </label> </div>'
                    html+='<div class="radio"> <label> <input type="radio" name="optionsRadios" class = "optionsRadios2" id="optionsRadios2" value="option2" /> 翻唱歌曲（请先获得原创作者许可） </label> </div>'
                    html+='<div class="radio"> <label> <input type="radio" name="optionsRadios" class = "optionsRadios3" id="optionsRadios3" value="option3" /> 公开版权歌曲（不填写词曲版权信息） </label> </div> </div>'
                    html+='<div class="col-xs-6"> <label class="control-label"></label>'
                    html+='<div class="label-warning container-box-sm">该音乐由您作词作曲，且未借用其他作品的元素 </div> </div> </div></div> </div> </div> </div> </div> </div>'

                    html+='<div class="panel-container panel">'
                    html+='<div class="pos-relative">'
                    html+='<div class="panel-body form-default ">'
                    html+='<div class="panel-heading ">'
                    html+='<div class="panel-title" data-toggle="collapse" data-parent="#accord" href="#collapseTh'+songCount+'">'
                    html+='<div class="row-xs-height link-cursor arrow-drop-up"><a >高级信息(可选)</a> </div> </div> </div>'
                    html+='<div id="collapseTh'+songCount+'" class="panel-collapse collapse">'
                    html+='<div class="panel-body">'
                    html+='<div class="panel">'
                    html+='<div class="panel-body">'
                    html+='<div class="row margin-bottom-sm">'
                    html+='<div class="col-xs-6"> <form>'
                    html+='<div class="form-group"> <label for="style">流派</label> <input type="text" class="form-control" id="style" name="style"/> </div> </form> </div>'
                    html+='<div class="col-xs-6"> <form>'
                    html+='<div class="form-group"> <label for="exampleInputEmail1">词曲版权所有人</label> <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" /> </div> </form> </div> </div>'

                    html+='<div class="row margin-bottom-sm">'
                    html+='<div class="col-xs-6"> <form>'
                    html+='<div class="form-group"> <label for="exampleInputEmail1">唱片公司</label><input type="text" class="form-control" id="companyId" name="companyId"/> </div> </form> </div>'
                    html+='<div class="col-xs-6"> <form>'
                    html+='<div class="form-group"> <label for="exampleInputEmail1">唱片公司ID</label> <input type="text" class="form-control" id="companyBusinessId" name="companyBusinessId"/> </div> </form> </div> </div> </div> </div> </div> </div> </div> </div> </div>'

                    html+='<div class="panel-container panel">'
                    html+='<div class="pos-relative">'
                    html+='<div class="panel-body form-default ">'
                    html+='<div class="panel-heading ">'
                    html+='<div class="panel-title" data-toggle="collapse" data-parent="#accordio" href="#collapsefour'+songCount+'">'
                    html+='<div class="row-xs-height link-cursor arrow-drop-up demo"> <a >歌词(可选)</a> </div></div></div>'
                    html+='<div id="collapsefour'+songCount+'" class="panel-collapse collapse">'
                    html+='<div class="panel-body">'
                    html+='<div class="panel">'
                    html+='<div class="panel-body">'
                    html+='<div class="row margin-bottom-sm">'
                    html+='<div class="col-xs-12"> <form>'
                    html+='<div class="form-group"><textarea id="demo" style="display: none;"></textarea></div> </form></div></div> </div></div></div></div></div></div></div></div></div>'
                    i++;
                }
                $('#accordion').append(html);
                return false;
            }else{
                /* showExceptionTip(data);*/
            }
        })
    });



});
