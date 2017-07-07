/**
 * Created by jyj on 2017/6/27.
 */
$().ready(function () {
    $('.albun_list_pervious').on('click', function () {
        location.href = contextPath + '/views/worksmanagement/musicassets.jsp'
    })
    $('.album_modify').on('click', function () {
        location.href = contextPath + '/views/worksmanagement/modify_album.jsp'
    })

    var param = 'c9f43d6068d7484898fdb00c7e4e76f6';

    //回显专辑基本信息
    HttpUtils.get_album_info_data(param, function (data) {
        console.log(data);
        var data = data.data

        //根据时间戳生成的时间对象
        //添加时间
        var c = new Date(data.baseInfo.createdTime);
        var createdDate = (c.getFullYear()) + '年' +
            (c.getMonth() + 1) + '月' +
            (c.getDate() + '日');
        //发行时间
        var p = new Date(data.baseInfo.publishTime);
        var publishDate = (p.getFullYear()) + '年' +
            (p.getMonth() + 1) + '月' +
            (p.getDate() + '日')

        var ht = '<h2>' + data.baseInfo.name + '</h2>'
        ht += '<hr>'
        ht += '<p>表演人：' + data.albumMainPerformer.perName + '</p>'
        ht += '<p>添加日期：' + createdDate + '</p>'
        $('.album_info').append(ht);

        var html = ''
        html += '<p>专辑版本：' + data.baseInfo.version + '</p>'
        html += '<p>UPC:' + data.baseInfo.upcEanJan + '</p>'
        if (data.recordCompany !== undefined) {
            html += '<p>唱片公司:' + data.recordCompany.name + '</p>'
        }
        html += '<p>词曲版权所有人：' + data.baseInfo.songCopyrightOwner + '</p>'
        html += '<p>录音版权所有人：' + data.baseInfo.recordingCopyrightHolder + '</p>'
        html += '<p>发行日期：' + publishDate + '</p>'
        html += '<p>流派：' + data.albumStyle.genreName + '</p>'
        html += '<p>目录：' + data.baseInfo.dirCode + '</p>'
        html += '<p>歌曲数量：' + data.songCount + '</p>'
        html += '<p>语种：' + data.albumLanguage.languageName + '</p>'
        $('.album_base_info').append(html);
        console.log(data.albumCover)
        $('.top_pic').attr('src', data.albumCover)
        $('.content_pic').attr('src', data.albumCover)
    })

    //回显专辑的歌曲列表
    HttpUtils.get_album_song_list_data(param, function (data) {
        /*console.log(data);*/
        var data_info = data.data.albumSongs
        console.log(data_info)
        var html = ''
        $(data_info).each(function (i, item) {

            console.log($(item)[0].title)
            html += '<tr class="songs_list" data-id="'+item.id+'" data-title="'+$(item)[0].title+'">'
            html += '<td>' + (i + 1) + '</td>'
            html += '<td>' + $(item)[0].title + '</td>'
            html += '<td>' + $(item)[0].singerName + '</td>'
            if($(item)[0].isrc === null || $(item)[0].isrc === "" ){
                html += '<td> ----------- </td>'
            }else {
                html += '<td>' + $(item)[0].isrc + '</td>'
            }
            if($(item)[0].isrc === null || $(item)[0].isrc === "" ){
            html += '<td>' + $(item)[0].duration + '</td>';
            }else{
            html += '<td>没有音频</td>';
        }

            html += '<td class="download"  ><a href="/download/d32c75fec12d4ac9a1c9b902bce2dfb1" download="true"> 下载</a></td>';
        })
        $('.song_info').append(html);
        clickName();
    })
    function clickName() {
        $('.songs_list').on('click', function () {
            var _this=this
            var id=$(_this).attr('data-id')
            var music_title=$(_this).attr('data-title')
            window.sessionStorage["song_data_id"]=id
            window.sessionStorage["music_title"]=music_title
            location.href = contextPath + '/views/worksmanagement/singles_details.jsp'
        })
    }

})