/**
 * Created by yugang on 2017/6/13.
 */
$().ready(function () {
    //跳转
    $('.single_lyrics').addClass('active');
    $('.album').removeClass('active');
    $('.album').on('click', function () {
        location.href = contextPath + '/views/worksmanagement/modify_album.jsp'
    })
    //离开当前页面提示
    var jump_url = null
    var leftBar = $('.sidebar-nav').find('li')
    $(leftBar).each(function (i, item) {
        $(item).on('click', function () {
            jump_url = $(this).find('a').attr('href')
            if (jump_url == 'javascript:void(0)') {
                jump_url = contextPath + '/views/performers/performers.jsp'
            }
            $('#unSave').modal('open')
            return false
        })
    })
    $('.confirm').on('click', function () {
        window.sessionStorage.removeItem("createdId")
        window.sessionStorage.removeItem('baseImg')
        window.sessionStorage.removeItem('param')
        location.href = contextPath + jump_url
    })
    $('.base_close').on('click', function () {
        window.sessionStorage.removeItem("createdId")
        window.sessionStorage.removeItem('baseImg')
        window.sessionStorage.removeItem('param')
        location.href = contextPath + '/views/worksmanagement/musicassets.jsp'
    })
    $('.base_close').on('click', function () {
        window.sessionStorage.removeItem("createdId")
        window.sessionStorage.removeItem('baseImg')
        window.sessionStorage.removeItem('param')
    })
    $('.single_album').on('click', function () {
        location.href = contextPath + '/views/worksmanagement/album_song.jsp'
    })
    $('.prev_step').on('click', function () {
        location.href = contextPath + '/views/worksmanagement/album_song.jsp'
    })
    $('.next_step').on('click', function () {
        location.href = contextPath + '/views/worksmanagement/preview_save.jsp'
    })
    $('.single_save').on('click', function () {
        location.href = contextPath + '/views/worksmanagement/preview_save.jsp'
    })


    //回显已添加歌曲

        var song_list = window.sessionStorage["param"]
        var html = '';
        if (song_list == '[]' || song_list === '' || song_list == undefined) {
            return
        } else {
        $.each(JSON.parse(song_list), function (i, item) {
            html += '<tr class="music_list" id=' + (i + 1) + ' data-title=' + item.data.title + ' data-type="' + item.data.type + '">';
            html += '<td>' + (i + 1) + '</td>';
            if (item.data.type === '011') {
                html += '<td class="song_title""><a class="songName">' + item.data.title + '</a><span>(公开版权，不需要填写词曲作者信息)</span></td>';
            } else if (item.data.type === '010') {
                html += '<td class="song_title" ><a class="songName">' + item.data.title + '</a><span>(翻唱歌曲，不需要填写词曲作者信息)</span></td>';
            }else if(item.data.equityList==''){
                html += '<td class="song_title"><a class="songName">' + item.data.title + '</a></td>';
            } else if(item.data.equityList!==''){
                html += '<td class="song_title"><a class="songName">' + item.data.title + '</a><span style="color: red">(已添加作者)</span></td>';
            }
            html += '<td>' + item.data.singerName + '</td>';
            if (item.data.hasIsrc == '0') {
                html += '<td>' + item.data.isrc + '</td>'
            } else if (item.data.hasIsrc === '1') {
                html += '<td>无isrc码</td>'
            }

        })
        $('.song_list').append(html)
    }


    $(".music_list").on("click", function () {
        var _this = this;
        var lyriceID = $(this).attr('id');
        var song_title = $(this).find('.songName').text();
        var daya_type = $(this).attr('data-type');
        window.sessionStorage['lyriceID'] = lyriceID;
        window.sessionStorage['song_title'] = song_title;
        if (daya_type === '010' || daya_type === '011') {

        } else if (daya_type === '001') {
            window.location.href = contextPath + "/views/worksmanagement/add_rights_holder.jsp";
        }
        window.sessionStorage.removeItem('songholder')
    });

    //会显权利人


})
