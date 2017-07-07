/**
 * Created by user on 2017/6/5.
 */
/**
 * Created by yjx on 2017/5/26.
 */
$().ready(function () {
    var languages_type_select2;
    var language = $("#languages_type_select2")
    var param={}

    var Songdata= window.sessionStorage["createdId"]
    var song=JSON.parse(Songdata)
    var songid=song.inputData.mainPerformerId
    console.log(songid)
        param = {
            singerId:songid
        };
    console.log(param)
        param = JSON.stringify(param)
    $.ajax({
        type: "post",
        data: param,
        async: false,
        url: contextPath + '/music/special/Songs',
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            languages_type_select2 = $("#languages_type_select2").select2({
                data: data,
                width: '450px',
                language: "zh-CN",//汉化
                placeholder: '从您的曲库选择歌曲',//默认文字提示
                allowClear: true//允许清空
            });
            // if(data==""){
            //     $('#languageContent').hide()
            // }else{
            //     $('#languageContent').show()
            // }
            Logger.debug("缺省选择的是:" + languages_type_select2.val());
        },
        error: function (data) {

        }
    });

    language.on("change", function (e) {
        Logger.debug("选择了" + language.val());
        var SongId=language.val()
        return SongId
    });

})