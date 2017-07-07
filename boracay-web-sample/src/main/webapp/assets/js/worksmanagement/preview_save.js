/**
 * Created by yugang on 2017/6/6.
 */
$().ready(function () {
  $('.album').on('click', function () {
    location.href = contextPath + '/views/worksmanagement/modify_album.jsp'
  })
  //离开当前页面提示
  var jump_url = null
  var leftBar = $('.sidebar-nav').find('li')
  $(leftBar).each(function(i,item){
    $(item).on('click',function(){
      jump_url = $(this).find('a').attr('href')
      if(jump_url == 'javascript:void(0)'){
        jump_url = contextPath + '/views/performers/performers.jsp'
      }
      $('#unSave').modal('open')
      return false
    })
  })
  $('.confirm').on('click',function(){
    window.sessionStorage.removeItem("createdId")
    window.sessionStorage.removeItem('baseImg')
    window.sessionStorage.removeItem('album_song_id')
    location.href = contextPath + jump_url
  })
  $('.base_close').on('click',function(){
    window.sessionStorage.removeItem("createdId")
    window.sessionStorage.removeItem('baseImg')
    window.sessionStorage.removeItem('album_song_id')
    location.href = contextPath + '/views/worksmanagement/musicassets.jsp'
  })
  $('.music_asset').on('click',function(){
    window.sessionStorage.removeItem("createdId")
    window.sessionStorage.removeItem('baseImg')
  })
  $('.single_lyrics').on('click',function(){
    location.href = contextPath + '/views/worksmanagement/lyrics_copyright.jsp'
  })
  $('.single_album').on('click',function(){
    location.href = contextPath + '/views/worksmanagement/album_song.jsp'
  })
  $('.prev_step').on('click',function(){
    location.href = contextPath + '/views/worksmanagement/lyrics_copyright.jsp'
  })
  //获取信息
  if(window.sessionStorage['album_song_id']){
    var param = window.sessionStorage['album_song_id']
    //专辑回显
    var albumPic = null
    var album_song_listNum = null
    HttpUtils.get_album_echoInfo(param,function(data){
      console.log(data)
      albumPic = data.data.albumCover
      album_song_listNum = data.data.songInfoList.length
      if(data.data.albumCover == null){
        $('.view_img').attr('src', contextPath + '/assets/imgs/raccoon_logo.jpg')
      }else{
        $('.view_img').attr('src',data.data.albumCover)
      }
      var html = ''
      var mainPerforName = data.data.albumMainPerformer == undefined?'多名表演人':data.data.albumMainPerformer.perName
      console.log(mainPerforName)
      html += '<p><span>专辑名称：</span><span>' + data.data.baseInfo.name + '</span></p>';
      html += '<p><span>表演人：</span><span>' + mainPerforName + '</span></p>';
      if (data.data.otherPerformers) {
        $(data.data.otherPerformers).each(function (i, item) {
          html += '<p><span>' + $(item)[0].type + '</span><span>：</span><span>' + $(item)[0].name + '</span></p>'
        })
      }
      if (data.data.baseInfo.version !=null && data.data.baseInfo.version != '') {
        html += '<p><span>' + data.data.baseInfo.version + '</span></p>'
      }
      if(data.data.albumStyle) {
        html += '<p><span>流派：</span><span>' + data.data.albumStyle.genreName + '</span></p>';
      }
      if (data.data.recordCompany) {
        html += '<p><span>唱片公司：</span><span>' + data.data.recordCompany.name + '</span></p>';
      } else {
        html += '<p><span>唱片公司：</span><span></span></p>';
      }
      if (data.data.baseInfo.upcEanJan != null && data.data.baseInfo.upcEanJan != '') {
        html += '<p><span>UPC/EAN/JAN：</span><span>' + data.data.baseInfo.upcEanJan + '</span></p>';
      }
      html += '<p><span>词曲版权所有人：</span><span>' + data.data.baseInfo.songCopyrightOwner + '</span></p>'
      html += '<p><span>录音版权所有人：</span><span>' + data.data.baseInfo.recordingCopyrightHolder + '</span></p>'
      $('.waring').append(html);
      //歌曲回显
      $(".song_num").html(data.data.songInfoList.length + '歌曲')
      var songList = data.data.songInfoList
      var html_song = ''
      $(songList).each(function(i,item){
        console.log($(item)[0])
        html_song += '<div class="songList">'
        html_song += '<span>0' + (i + 1) + '</span>'
        html_song += '<span class="songName">' + $(item)[0].song.title + '</span>'
        if ($(item)[0].song.duration == '没有音频') {
          html_song += '<span class="songTime pull-right"></span>'
        } else {
          html_song += '<span class="songTime pull-right">' + $(item)[0].song.duration + '</span>'
        }

        html_song += '<p><span>表演人：</span><span class="songSingle">' + $(item)[0].song.singerName + '</span></p>'
        if ($(item)[0].otherPerformer) {
          $($(item)[0].otherPerformer).each(function (j, tep) {
            html_song += '<p><span>' + $(tep)[0].type + '</span><span>：</span><span>' + $(tep)[0].otherSingerName + '</span></p>'
          })
        }
        if($(item)[0].song.style){
          html_song += '<p><span>流派：</span><span class="songStyle">' + $(item)[0].song.style + '</span></p>'
        }
        if($(item)[0].song.copyrightOwner){
          html_song += '<p><span>词曲版权所有人：</span><span class="lyricOwner">' + $(item)[0].song.copyrightOwner + '</span></p>'
        }
        if ($(item)[0].song.hasBadContent == 0) {
          html_song += '<p><span>歌词是否涉及敏感歌词：</span><span>不涉及</span></p>'
        } else {
          html_song += '<p><span>歌词是否涉及敏感歌词：</span><span>涉及</span></p>'
        }
        if ($(item)[0].song.lyrics == '' || $(item)[0].song.lyrics == undefined) {
          html_song += '<p><span>歌词：</span><span>没有</span></p>'
        } else {
          html_song += '<p><span>歌词：</span><span>有</span></p>'
        }
        if ($(item)[0].song.type != '010' && $(item)[0].song.type != '011') {
          if ($(item)[0].equityHolder) {
            if ($(item)[0].equityHolder.length == 0) {
              html_song += '<p><span>词曲权利人：</span><span class="rights_holder"></span></p>'
            } else {
              html_song += '<span>词曲权利人：</span>'
              $($(item)[0].equityHolder).each(function (k, temp) {
                html_song += '<span class="rights_holder">' + $(temp)[0].holderName + '</span><span>（' + $(temp)[0].role + '）</span>'
              })
            }
          }
        }
        if($(item)[0].song.version){
          html_song += '<p class="version hide">' + $(item)[0].song.version + '</p>'
        }
        html_song += '</div>'
      })
      $('#songContent').html(html_song)
    })
  }else {
    //专辑回显
    if (window.sessionStorage['createdId']) {
      var view = window.sessionStorage['createdId']
      view = JSON.parse(view)
      Logger.debug(view)
      //专辑信息回显
      if (window.sessionStorage['baseImg']) {
        $('.view_img').attr('src', window.sessionStorage['baseImg'])
      } else {
        $('.view_img').attr('src', contextPath + '/assets/imgs/raccoon_logo.jpg')
      }
      var html = ''
      html += '<p><span>专辑名称：</span><span>' + view.inputData.name + '</span></p>';
      html += '<p><span>表演人：</span><span>' + view.name.mainPerformeName + '</span></p>';
      if (view.inputData.otherPerformers) {
        $(view.inputData.otherPerformers).each(function (i, item) {
          html += '<p><span>' + $(item)[0].type + '</span><span>：</span><span>' + $(item)[0].name + '</span></p>'
        })
      }
      if (view.inputData.version) {
        html += '<p><span>' + view.inputData.version + '</span></p>'
      }
      html += '<p><span>流派：</span><span>' + view.name.styleName + '</span></p>';
      if (view.name.companyName != null) {
        html += '<p><span>唱片公司：</span><span>' + view.name.companyName + '</span></p>';
      } else {
        html += '<p><span>唱片公司：</span><span></span></p>';
      }
      if (view.inputData.upcEanJan != null) {
        html += '<p><span>UPC/EAN/JAN：</span><span>' + view.inputData.upcEanJan + '</span></p>';
      }
      html += '<p><span>词曲版权所有人：</span><span>' + view.inputData.songCopyrightOwner + '</span></p>'
      html += '<p><span>录音版权所有人：</span><span>' + view.inputData.recordingCopyrightHolder + '</span></p>'
      $('.waring').append(html);
    }
    //歌曲信息回显
    if (window.sessionStorage['param'] && window.sessionStorage['param'] != 'undefined') {
      var song = window.sessionStorage['param']
      song = JSON.parse(song)
      $(".song_num").html(song.length + '歌曲')
      var html_song = ''
      $(song).each(function (i, item) {
        console.log($(item)[0].data)
        html_song += '<div class="songList">'
        html_song += '<span>0' + (i + 1) + '</span>'
        html_song += '<span class="songName">' + $(item)[0].data.title + '</span>'
        if ($(item)[0].data.id == '' || $(item)[0].data.id == undefined) {
          html_song += '<span class="songTime pull-right"></span>'
        } else {
          html_song += '<span class="songTime pull-right" data-id="' + $(item)[0].data.id + '">' + $(item)[0].data.duration + '</span>'
        }

        html_song += '<p><span>表演人：</span><span class="songSingle">' + $(item)[0].data.singerName + '</span></p>'
        if ($(item)[0].data.otherPerformerList.length != 0) {
          $($(item)[0].data.otherPerformerList).each(function (j, tep) {
            html_song += '<p><span>' + $(tep)[0].type + '</span><span>：</span><span>' + $(tep)[0].otherSingerName + '</span></p>'
          })
        }

        html_song += '<p><span>流派：</span><span class="songStyle">' + $(item)[0].data.style + '</span></p>'
        html_song += '<p><span>词曲版权所有人：</span><span class="lyricOwner">' + $(item)[0].data.copyrightOwner + '</span></p>'
        if ($(item)[0].data.hasBadContent == 0) {
          html_song += '<p><span>歌词是否涉及敏感歌词：</span><span>不涉及</span></p>'
        } else {
          html_song += '<p><span>歌词是否涉及敏感歌词：</span><span>涉及</span></p>'
        }
        if ($(item)[0].data.lyrics == '' || $(item)[0].data.lyrics == undefined) {
          html_song += '<p><span>歌词：</span><span>没有</span></p>'
        } else {
          html_song += '<p><span>歌词：</span><span>有</span></p>'
        }
        if ($(item)[0].data.type != '010' && $(item)[0].data.type != '011') {
          if ($(item)[0].data.equityList.length == 0) {
            html_song += '<p><span>词曲权利人：</span><span class="rights_holder"></span></p>'
          } else {
            html_song += '<span>词曲权利人：</span>'
            $($(item)[0].data.equityList).each(function (k, temp) {
              html_song += '<span class="rights_holder">' + $(temp)[0].holderName + '</span><span>（' + $(temp)[0].role + '）</span>'
            })
          }
        }
        html_song += '<p class="version hide">' + $(item)[0].data.version + '</p>'
        html_song += '</div>'
      })
      $('#songContent').html(html_song)
      var songEntityList = []
      $(song).each(function (i, item) {
        songEntityList.push($(item)[0].data)
      })
    }
  }
  //下一步改提交
  if(window.sessionStorage['album_song_id']){
    $('.next_step').html('专辑完整性检查')
  }else{
    $('.next_step').html('提交')
  }

  //上一步
  $('.prev_step').on('click',function(){
    location.href = contextPath + '/views/worksmanagement/lyrics_copyright.jsp'
  })
  $('.base_close').on('click',function(){
    window.sessionStorage.removeItem("createdId")
    window.sessionStorage.removeItem('baseImg')
    location.href = contextPath + '/views/worksmanagement/musicassets.jsp'
  })
  var save_check = false
  $('.next_step').on('click',function(){
    if(window.sessionStorage['album_song_id']){
        if(albumPic == null){
          save_check = true
          if ($('.albumImg').length == 0) {
            var temp = '<p class="albumImg">专辑封面未上传</p>'
            $('.not_completed').append(temp)
          }
        }
        if(album_song_listNum <=0){
          save_check = true
          if ($('.albumSong'.length == 0)) {
            var albumSong = '<p class = "albumSong">专辑至少包含一首歌曲</p>'
            $('.not_completed').append(albumSong)
          }
        }
      var songList = $('#songContent .songList')
      var songName_arr = []
      var songVersion_arr = []
      var songSingle_arr = []
      $(songList).each(function (i, item) {
        console.log($(item).find('.rights_holder').html())
        if ($(item).find('.songTime').html() == '') {
          save_check = true
          var album_songRecord = '<p class="album_songRecord">‘' + $(item).find('.songName').html() + '’缺少音频文件</p>'
          $('.not_completed').append(album_songRecord)
        }
        if ($(item).find('.rights_holder').html() == '') {
          save_check = true
          var rights_holder_owner = '<p class="rights_holder_owner">‘' + $(item).find('.songName').html() + '’缺少词曲作者信息</p>'
          $('.not_completed').append(rights_holder_owner)
        }
        songName_arr.push($(item).find('.songName').html());
        songVersion_arr.push($(item).find('.version').html());
        songSingle_arr.push($(item).find('.songSingle').html());
      })
      var songName_index = getItem(songName_arr);
      var songVersion_index = getItem(songVersion_arr);
      var songSingle_index = getItem(songSingle_arr);
      var identical = getIndex(songName_index, songVersion_index, songSingle_index)
      console.log(identical)
      if (identical.length != 0) {
        for (var i = 0; i < identical.length; i++) {
          console.log(songName_arr[identical[i]])
          save_check = true
          var identical_song = '<p class="identical_song">歌曲名称‘' + songName_arr[identical[i]] + '’重复且基本信息相同，请修改歌曲名称、歌曲版本、表演人任意一项进行区分</p>'
          $('.not_completed').append(identical_song)
        }
      }
      if (save_check == true) {
        $('#pre_waring').modal({closeViaDimmer: false})
      }else{
        $('#base_success').modal('open')
      }
      $('#pre_waring').on('close.modal.amui', function () {
        $('#base_success').modal('open')
      });
    }else {
      if (window.sessionStorage['baseImg'] == undefined) {
        save_check = true
        if ($('.albumImg').length == 0) {
          var temp = '<p class="albumImg">专辑封面未上传</p>'
          $('.not_completed').append(temp)
        }
      }
      if (window.sessionStorage['param'] == undefined || window.sessionStorage['param'] == 'undefined') {
        save_check = true
        if ($('.albumSong'.length == 0)) {
          var albumSong = '<p class = "albumSong">专辑至少包含一首歌曲</p>'
          $('.not_completed').append(albumSong)
        }
      }
      if (window.sessionStorage['param'] != undefined && window.sessionStorage['param'] != 'undefined') {
        var songList = $('#songContent .songList')
        var songName_arr = []
        var songVersion_arr = []
        var songSingle_arr = []
        $(songList).each(function (i, item) {
          console.log($(item).find('.rights_holder').html())
          if ($(item).find('.songTime').html() == '') {
            save_check = true
            var album_songRecord = '<p class="album_songRecord">‘' + $(item).find('.songName').html() + '’缺少音频文件</p>'
            $('.not_completed').append(album_songRecord)
          }
          if ($(item).find('.rights_holder').html() == '') {
            save_check = true
            var rights_holder_owner = '<p class="rights_holder_owner">‘' + $(item).find('.songName').html() + '’缺少词曲作者信息</p>'
            $('.not_completed').append(rights_holder_owner)
          }
          songName_arr.push($(item).find('.songName').html());
          songVersion_arr.push($(item).find('.version').html());
          songSingle_arr.push($(item).find('.songSingle').html());
        })
        var songName_index = getItem(songName_arr);
        var songVersion_index = getItem(songVersion_arr);
        var songSingle_index = getItem(songSingle_arr);
        var identical = getIndex(songName_index, songVersion_index, songSingle_index)
        console.log(identical)
        if (identical.length != 0) {
          for (var i = 0; i < identical.length; i++) {
            console.log(songName_arr[identical[i]])
            save_check = true
            var identical_song = '<p class="identical_song">歌曲名称‘' + songName_arr[identical[i]] + '’重复且基本信息相同，请修改歌曲名称、歌曲版本、表演人任意一项进行区分</p>'
            $('.not_completed').append(identical_song)
          }
        }
      }
      if (save_check == true) {
        $('#pre_waring').modal({closeViaDimmer: false})
      }
      //保存基本信息
      //$('#base_success').modal('open')
      var param = {
        baseInfoEntity: {
          name: view.inputData.name,
          version: view.inputData.version,
          songCopyrightOwner: view.inputData.songCopyrightOwner,
          recordingCopyrightHolder: view.inputData.recordingCopyrightHolder,
          publishTime: view.inputData.publishTime,
          upcEanJan: view.inputData.upcEanJan,
          dirCode: view.inputData.dirCode,
          id: view.inputData.id
        },
        languageId: view.inputData.languageId,
        typeId: view.inputData.typeId,
        styleId: view.inputData.styleId,
        mainPerformerId: view.inputData.mainPerformerId,
        companyId: view.inputData.companyId,
        otherPerformers: view.inputData.otherPerformers,
        songEntityList: songEntityList,
      }
      param = JSON.stringify(param)
      HttpUtils.post_albumData(param, function (data) {
        if (data.status == '200') {
          $('#pre_waring').on('close.modal.amui', function () {
            $('#base_success').modal('open')
          });
          if (save_check == false) {
            $('#base_success').modal('open')
          }
        }
      })
      //跳转
      $('.see_album').on('click', function () {
        window.sessionStorage.clear();
        location.href = contextPath + '/views/worksmanagement/musicassets.jsp'
      })
      $('.created_album').on('click', function () {
        window.sessionStorage.clear();
        location.href = contextPath + '/views/worksmanagement/addalbum.jsp'
      })
    }
  })

  //取得相同歌曲、版本、歌手的下标
  function getItem(arr){
    var index = []
    var nary=arr.sort();
    for(var i=0;i<nary.length;i++){
      if(nary[i] == nary[i+1]){
        index.push(i)
      }
    }
    return index
  }
  //取得歌曲版本歌手三者都相同的下标号
  function getIndex(arr,temp,array){
    var songArray = []
    for(var i = 0; i<arr.length;i++){
      for(var j = 0;j<temp.length;j++){
        for(var k = 0; k<array.length;k++){
          if(arr[i] == temp[j] && arr[i] == array[k] && array[k] == temp[j]){
            songArray.push(i)
          }
        }
      }
    }
    return songArray
  }
  //清空弹出框内容
  $('.close_warn').on('click',function(){
    $('.not_completed').html('')
  })
  $('.song_confirm').on('click',function(){
    $('.not_completed').html('')
  })
})
