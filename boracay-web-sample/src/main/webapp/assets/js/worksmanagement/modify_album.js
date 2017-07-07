/**
 * Created by yugang on 2017/6/9.
 */
$().ready(function () {
  var album_Id = '' //图片id
  var checkPic = false
  if(window.sessionStorage['createdId']) {
    var albumId = window.sessionStorage['createdId']
    var url = window.sessionStorage['baseImg']
    //Logger.debug("图片地址"+url)
    albumId = JSON.parse(albumId)
    Logger.debug(albumId)
    //回显语种
    var languages_select2 = $('#languages_type_select2').find('option');
    var languagesName = null
    var echo_languageId = albumId.inputData.languageId
    languagesName = map(languages_select2, languagesName, echo_languageId)
    $('#languages_select2').find('#select2-languages_type_select2-container').html(languagesName)
    //回显专辑类型
    var music_type_select2 = $('#music_type_select2').find('option');
    var music_typeName = null;
    var echo_musicId = albumId.inputData.typeId
    music_typeName = map(music_type_select2, music_typeName, echo_musicId)
    //$('#music_type_select2').attr('dataId',data.data.albumType.albumId)
    $('#music_select2').find('#select2-music_type_select2-container').html(music_typeName)
    //回显基本信息
    $('#Issue_name').val(albumId.inputData.name);
    $('#album_version').val(albumId.inputData.version);
    $('#lyrics_copyright').val(albumId.inputData.songCopyrightOwner);
    $('#record_copyright').val(albumId.inputData.recordingCopyrightHolder);
    $('#catalogCode').val(albumId.inputData.dirCode);
    $('#releaseCode').val(albumId.inputData.upcEanJan)
    var newTime = new Date(albumId.inputData.publishTime);
    newTime = formatDate(newTime)
    Logger.debug(newTime)
    $('#date').val(newTime)
    //修改主要表演人
    if (albumId.inputData.mainPerformerId != '') {
      var performers_select2 = $('#performers_type_select2').find('option')
      var performersName = null
      var echo_performerId = albumId.inputData.mainPerformerId
      performersName = map(performers_select2, performersName, echo_performerId)
      //$('#performers_type_select2').attr('dataId',data.data.albumLanguage.albumId)
      $('#select2-performers_type_select2-container').html(performersName)
    }
    //流派
    var music_genre_select2 = $('#music_genre_select2').find('option')
    var genreName = null
    var echo_genreId = albumId.inputData.styleId
    genreName = map(music_genre_select2, genreName, echo_genreId)
    //$('#music_genre_select2').attr('dataId',data.data.albumStyle.albumId)
    $('#select2-music_genre_select2-container').html(genreName)
    //所属唱片公司
    //唱片公司
    if (albumId.inputData.companyId != null) {
      $('.recordContent').removeClass('hide')
      $('#recordCompany2').prop('checked', true)
      var record_company_select2 = $('#record_company_select2').find('option')
      var record_companyName = null
      var echo_recordId = albumId.inputData.companyId
      record_companyName = map(record_company_select2, record_companyName, echo_recordId)
      //$('#record_company_select2').attr('dataId',data.data.recordCompany.albumId)
      $('#select2-record_company_select2-container').html(record_companyName)
    }
    //其他表演人
    var otherPerformers = albumId.inputData.otherPerformers;
    var html = '';
    Logger.debug($(otherPerformers))
    $(otherPerformers).each(function (i, item) {
      Logger.debug($(item))
      var type = $(item)[0].type == "伴唱人" ? "主要表演人" : "伴唱人"
      html += '<div class="form-group inputPerformer" id="' + $(item)[0].id + '" dataId="' + $(item)[0].albumId + '"><div class="col-md-3">'
      html += '<select class="form-control"><option value = "' + $(item)[0].type + '" class="performer">' + $(item)[0].type + '</option><option value = "' + type + '" class="accompany">' + type + '</option></select></div>'
      html += '<div class="col-md-4"><input class="form-control filed" type="text" name="mytext[]" value="' + $(item)[0].name + '"/></div>'
      html += '<button class="btn btn-primary removeclass">删除</button><b class="red">*</b></div>'
    })
    $('#inputWrapper').append(html);
    //删除表演人
    var modify_inputWrapper = $("#inputWrapper .inputPerformer");
    var modify_length = modify_inputWrapper.length;
    $("body").on("click", ".removeclass", function (e) {
      if (modify_length > 1) {
        $(this).parent('div').remove();
      }
      return false;
    })
    //图片回显
    if (url) {
      $('.uploadFile').parent().parent().find('#modify_register-view').html('<img class="img" src="' + url + '" alt="" width="180" height="180"/><span class="modify_sign" data-role="delete-file" onclick="javascript:modify_remove_img(this)">&times;<span>')
    }
    //发布日期
    if (albumId.inputData.publishTime != null) {
      $('#release2').prop('checked', true)
      $('.releaseContent').removeClass('hide')
    }
    //汇集多名表演人
    if (albumId.inputData.mainPerformerId == '') {
      $('.btn_add').addClass('hide')
      $('.collection_more').removeClass('hide')
      $('.nothing_more').addClass('hide')
      $('#option2').prop('checked', true)
    }
    //upc/ean/jan
    if (albumId.inputData.upcEanJan != null) {
      $('.getcodeContent').removeClass('hide')
      $('#getcode2').prop('checked', true)
    }
    //跳转
    //跳转
    $('.addPerformers').on('click', function () {
      $('#performers_add').modal({closeViaDimmer: false})
    })
    $('.add_company').on('click', function () {
      $('#record_company_modal').modal({closeViaDimmer: false})
    })
    $('.single_album').on('click', function () {
      check();
      var checkVal = false;
      var inputName = $('#inputWrapper input');
      $(inputName).each(function () {
        if ($(this).val() === '') {
          checkVal = true;
          $('.containError').removeClass('hide')
        }
      })
      if (checkVal == false) {
        $('.containError').addClass('hide')
      }
      if (!$("#userInfo").valid() || checkPic == true || checkVal == true) {
        $('#infoUnfilled').modal('open');
        return
      }
      save();
      location.href = contextPath + '/views/worksmanagement/album_song.jsp'
    })
    $('.single_lyrics').on('click', function () {
      check();
      var checkVal = false;
      var inputName = $('#inputWrapper input');
      $(inputName).each(function () {
        if ($(this).val() === '') {
          checkVal = true;
          $('.containError').removeClass('hide')
        }
      })
      if (checkVal == false) {
        $('.containError').addClass('hide')
      }
      if (!$("#userInfo").valid() || checkPic == true || checkVal == true) {
        $('#infoUnfilled').modal('open');
        return
      }
      save();
      location.href = contextPath + '/views/worksmanagement/lyrics_copyright.jsp'
    })
    $('.single_save').on('click', function () {
      check();
      var checkVal = false;
      var inputName = $('#inputWrapper input');
      $(inputName).each(function () {
        if ($(this).val() === '') {
          checkVal = true;
          $('.containError').removeClass('hide')
        }
      })
      if (checkVal == false) {
        $('.containError').addClass('hide')
      }
      if (!$("#userInfo").valid() || checkPic == true || checkVal == true) {
        $('#infoUnfilled').modal('open');
        return
      }
      save();
      location.href = contextPath + '/views/worksmanagement/preview_save.jsp'
    })
    $('.next_step').on('click', function () {
      check();
      var checkVal = false;
      var inputName = $('#inputWrapper input');
      $(inputName).each(function () {
        if ($(this).val() === '') {
          checkVal = true;
          $('.containError').removeClass('hide')
        }
      })
      if (checkVal == false) {
        $('.containError').addClass('hide')
      }
      if (!$("#userInfo").valid() || checkPic == true || checkVal == true) {
        $('#infoUnfilled').modal('open');
        return
      }
      save();
      location.href = contextPath + '/views/worksmanagement/album_song.jsp'
    })
    $('.cancel-confirm').on('click', function () {
      $('.single_album').removeClass("active");
      $('.single_lyrics').removeClass("active");
      $('.single_save').removeClass("active");
      $('.album').addClass('active');
    })
    $('.close-confirm').on('click', function () {
      $('.single_album').removeClass("active");
      $('.single_lyrics').removeClass("active");
      $('.single_save').removeClass("active");
      $('.album').addClass('active');
    })
    /*Date.prototype.toLocaleString = function() {
     return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
     };*/
    //日期控件
    //保存数据方法
    function save() {
      var performerArray = [];
      var inputWrapper = $('#inputWrapper .inputPerformer');
      Logger.debug(inputWrapper)
      $(inputWrapper).each(function (i, item) {
        var obj = {};
        obj["type"] = $(item).find('select').val();
        obj["name"] = $(item).find('input').val();
        performerArray.push(obj);
      })
      var languageId = $('#languages_type_select2').val();
      var typeId = $('#music_type_select2').val();
      var styleId = $('#music_genre_select2').val();
      var styleName = $('#music_genre_select2').find('option:selected').text();
      var name = $('#Issue_name').val();
      var version = $('#album_version').val();
      var mainPerformerId = $('#performers_type_select2').val();
      var mainPerformeName = $('#performers_type_select2').find('option:selected').text();
      var companyName = $('#record_company_select2').find('option:selected').text();
      var publishTime = $('#date').val();
      var upcEanJan = $('#releaseCode').val();
      var companyId = $('#record_company_select2').val();
      var songCopyrightOwner = $('#lyrics_copyright').val();
      var recordingCopyrightHolder = $('#record_copyright').val();
      var dirCode = $('#catalogCode').val();
      //获取图片的id
      if (window.sessionStorage['albumId']) {
        album_Id = window.sessionStorage['albumId']
      } else {
        album_Id = ''
      }
      if (performerArray.length === 0) {
        performerArray = null;
      }
      if (companyId === undefined) {
        companyId = null;
        companyName = null;
      }
      if (dirCode === undefined) {
        dirCode = null
      }
      publishTime = publishTime.replace(/-/g, "/");
      var time = new Date(publishTime)
      //判断选择是否
      if ($('#option2').is(':checked')) {
        mainPerformerId = ""
        mainPerformeName = '多名表演人'
        performerArray = null
      }
      if ($('#release1').is(':checked')) {
        time = null
      }
      if ($('#recordCompany1').is(':checked')) {
        companyId = null
        companyName = null
        dirCode = null
      }
      if ($('#getcode1').is(':checked')) {
        upcEanJan = null
      }
      var param = {}
      param.files = ['file'];
      param.fileName = ['file'];
      param.inputData = {
        languageId: languageId,
        typeId: typeId,
        styleId: styleId,
        name: name,
        dirCode: dirCode,
        version: version,
        publishTime: time,
        upcEanJan: upcEanJan,
        companyId: companyId,
        mainPerformerId: mainPerformerId,
        songCopyrightOwner: songCopyrightOwner,
        recordingCopyrightHolder: recordingCopyrightHolder,
        otherPerformers: performerArray,
        id: album_Id
      }
      param.name = {
        styleName: styleName,
        mainPerformeName: mainPerformeName,
        companyName: companyName
      }
      param = JSON.stringify(param);
      Logger.debug(param)
      window.sessionStorage['createdId'] = param
    }
    //检查input
    /*function checkInput(){
     var inputName = $('#inputWrapper input');
     $(inputName).each(function () {
     if ($(this).val() === '') {
     checkVal = true;
     $('.containError').removeClass('hide')
     }
     })
     }*/
    //离开本页面
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
      location.href = contextPath + jump_url
    })
    $('.base_close').on('click', function () {
      window.sessionStorage.removeItem("createdId")
      window.sessionStorage.removeItem('baseImg')
      location.href = contextPath + '/views/worksmanagement/musicassets.jsp'
    })
    $('.prev_step').addClass('hide')
    $('.music_asset').on('click', function () {
      window.sessionStorage.removeItem("createdId")
      window.sessionStorage.removeItem('baseImg')
    })
  }else {
    var albumId = window.sessionStorage['album_song_id']
    var checkPubilshtime = null
    var pic_file_id = null
    $.ajax({
      type: "get",
      async: false,
      url: contextPath + '/album/base_info/' + albumId + '.json',
      dataType: "json",
      contentType: "application/json",
      success:function(data){
        //回显语种
        console.log(data)
        var languages_select2 = $('#languages_type_select2').find('option');
        var languagesName = null
        var echo_languageId = data.data.albumLanguage.id
        languagesName = map(languages_select2,languagesName,echo_languageId)
        $('#languages_type_select2').attr('dataId',data.data.baseInfo.id)
        $('#languages_select2').find('#select2-languages_type_select2-container').html(languagesName)
        //回显专辑类型
        var music_type_select2 = $('#music_type_select2').find('option');
        var music_typeName = null;
        var echo_musicId = data.data.albumType.id
        music_typeName = map(music_type_select2,music_typeName,echo_musicId)
        $('#music_type_select2').attr('dataId',data.data.baseInfo.id)
        $('#music_select2').find('#select2-music_type_select2-container').html(music_typeName)
        //回显基本信息
        $('#Issue_name').val(data.data.baseInfo.name);
        $('#album_version').val(data.data.baseInfo.version);
        $('#lyrics_copyright').val(data.data.baseInfo.songCopyrightOwner);
        $('#record_copyright').val(data.data.baseInfo.recordingCopyrightHolder);
        $('#catalogCode').val(data.data.baseInfo.dirCode);
        $('#releaseCode').val(data.data.baseInfo.upcEanJan)
        var newTime = new Date(data.data.baseInfo.publishTime);
        newTime = formatDate(newTime)
        $('#date').val(newTime)
        checkPubilshtime = data.data.baseInfo.publishTime
        //修改主要表演人
        if(data.data.albumMainPerformer){
          var performers_select2 = $('#performers_type_select2').find('option')
          var performersName = null
          var echo_performerId = data.data.albumMainPerformer.id
          performersName = map(performers_select2,performersName,echo_performerId)
          $('#performers_type_select2').attr('dataId',data.data.baseInfo.id)
          $('#select2-performers_type_select2-container').html(performersName)
        }
        //流派
        var music_genre_select2 = $('#music_genre_select2').find('option')
        var genreName = null
        var echo_genreId = data.data.albumStyle.id
        genreName = map(music_genre_select2,genreName,echo_genreId)
        $('#music_genre_select2').attr('dataId',data.data.baseInfo.id)
        $('#select2-music_genre_select2-container').html(genreName)
        //所属唱片公司
        if(data.data.recordCompany){
          var record_company_select2 = $('#record_company_select2').find('option')
          var record_companyName = null
          var echo_recordId = data.data.recordCompany.id
          record_companyName = map(record_company_select2,record_companyName,echo_recordId)
          $('#record_company_select2').attr('dataId',data.data.recordCompany.albumId)
          $('#select2-record_company_select2-container').html(record_companyName)
        }
        //其他表演人
        var otherPerformers = data.data.otherPerformers;
        var html = '';
        Logger.debug($(otherPerformers))
        $(otherPerformers).each(function(i,item){
          Logger.debug($(item))
          var type = $(item)[0].type == "伴唱人"?"主要表演人":"伴唱人"
          html += '<div class="form-group inputmodify_Performer" id="'+$(item)[0].id+'" dataId="'+$(item)[0].albumId+'"><div class="col-md-3">'
          html += '<select class="form-control"><option value = "'+$(item)[0].type+'" class="performer">'+$(item)[0].type+'</option><option value = "'+type+'" class="accompany">'+type+'</option></select></div>'
          html += '<div class="col-md-4"><input class="form-control filed" type="text" name="mytext[]" value="'+$(item)[0].name+'"/></div>'
          html += '<button class="btn btn-primary removeclass">删除</button></div>'
        })
        $('#inputWrapper').append(html);
        //图片回显
        if(data.data.albumCover != null){
          pic_file_id = data.data.albumCover
          pic_file_id = pic_file_id.replace(/download/,'')
          pic_file_id = pic_file_id.replace(/[//]/g,'')
          console.log(pic_file_id)
          $('.uploadFile').parent().parent().find('#modify_register-view').html('<img class="img" src="'+(contextPath+data.data.albumCover)+'" alt="" width="180" height="180"/><span class="modify_sign" data-role="delete-file" onclick="javascript:modify_remove_img(this)">&times;<span>')
        }
        //发布日期
        if(data.data.baseInfo.publishTime != null){
          $('#release2').prop('checked',true)
          $('#getcode1').attr('disabled','disabled')
          $('.releaseContent').removeClass('hide')
        }
        //唱片公司
        if(data.data.recordCompany){
          $('.recordContent').removeClass('hide')
          $('#recordCompany2').prop('checked',true)
        }
        if(data.data.albumMainPerformer == undefined){
          $('#option2').prop('checked',true)
          $('.collection_more ').removeClass('hide')
          $('.nothing_more').addClass('hide')
          $('.btn_add').addClass('hide')
        }
        //upcEanJan
        if(data.data.baseInfo.upcEanJan !='' && data.data.baseInfo.upcEanJan != null){
          $('.getcodeContent ').removeClass('hide')
          $('#getcode2').prop('checked',true)
        }
      },
      error: function(data){
        Logger.debug(data)
      }
    })
    //删除封面
    $('.modify_sign').on('click',function(){
      var param = pic_file_id
      HttpUtils.del_pic(param,function(data){
        console.log(data)
      })
    })
    //修改语种
    $('#languages_type_select2').on('change',function(){
      var language_val = $(this).val()
      var param = {
        albumId : albumId,
        languageId : language_val
      }
      param = JSON.stringify(param)
      HttpUtils.post_album_language(param,function(data){
          console.log(data)
      })
    })
    //修改专辑类型
    $('#music_type_select2').on('change',function(){
      var music_type_val = $(this).val()
      var param = {
        albumId : albumId,
        typeId : music_type_val
      }
      param = JSON.stringify(param)
      HttpUtils.post_album_type(param,function(data){
        console.log(data)
      })
    })
    //修改流派
    $('#music_genre_select2').on('change',function(){
      var music_genre_val = $(this).val()
      var param = {
        albumId : albumId,
        styleId : music_genre_val
      }
      param = JSON.stringify(param)
      HttpUtils.post_album_style(param,function(data){
        console.log(data)
      })
    })
    //修改唱片公司
    $('#record_company_select2').on('change',function(){
      var record_company_val = $(this).val()
      var param = {
        albumId : albumId,
        companyId : record_company_val
      }
      param = JSON.stringify(param)
      HttpUtils.post_album_company(param,function(data){
        console.log(data)
      })
    })
    //修改表演人
    $('#performers_type_select2').on('change',function(){
      var performers_type_val = $(this).val()
      var param = {
        albumId : albumId,
        performerId : performers_type_val
      }
      param = JSON.stringify(param)
      HttpUtils.post_album_performer(param,function(data){
        console.log(data)
      })
    })
    //修改其他表演人
    $('#inputWrapper').find('select').on('change',function(){
      var per_type = $(this).val()
      var per_name = $(this).parent().next().find('input').val()
      var per_id = $(this).parent().parent().attr('id')
      if(per_name != ''){
        var param = {
          id : per_id,
          type : per_type,
          name : per_name,
          albumId : albumId
        }
        param = JSON.stringify(param)
        HttpUtils.modify_album_otherPerformer(param,function(data){
          console.log(data)
        })
      }
    })
    var perforName = null
    $('#inputWrapper').find('input').focus(function(){
      perforName = $(this).val()
    })
    $('#inputWrapper').find('input').blur(function(){
      var performer_name_val = $(this).val()
      var performer_type_val = $(this).parent().prev().find('select').val()
      var per_id = $(this).parent().parent().attr('id')
      if(performer_name_val != perforName && performer_name_val != ''){
         var param = {
            id : per_id,
            type : performer_type_val,
            name : performer_name_val,
            albumId : albumId
        }
        param = JSON.stringify(param)
        HttpUtils.modify_album_otherPerformer(param,function(data){
          console.log(data)
        })
      }
    })
    //删除表演人
    $('.removeclass').on('click',function(){
      var performer_id = $(this).parent().attr('id')
      var param = performer_id
      var status = null
      HttpUtils.del_album_otherPerformer(param,function(data){
        status = data.status
      })
      $(this).parent('div').remove();
    })
    //跳转
    $('.prev_step').addClass('hide')
    $('.next_step').on('click',function(){
      if (!$("#userInfo").valid() || checkPic == true) {
        $('#infoUnfilled').modal('open');
        return
      }
      save_echo_baseInfo()
      location.href = contextPath + '/views/worksmanagement/album_song.jsp'
    })
    $('.single_album').on('click',function(){
      if (!$("#userInfo").valid() || checkPic == true) {
        $('#infoUnfilled').modal('open');
        return
      }
      save_echo_baseInfo()
      location.href = contextPath + '/views/worksmanagement/album_song.jsp'
    })
    $('.single_lyrics').on('click',function(){
      if (!$("#userInfo").valid() || checkPic == true) {
        $('#infoUnfilled').modal('open');
        return
      }
      save_echo_baseInfo()
      location.href = contextPath + '/views/worksmanagement/lyrics_copyright.jsp'
    })
    $('.single_save').on('click',function(){
      if (!$("#userInfo").valid() || checkPic == true) {
        $('#infoUnfilled').modal('open');
        return
      }
      save_echo_baseInfo()
      location.href = contextPath + '/views/worksmanagement/preview_save.jsp'
    })
    //修改基本信息
    function save_echo_baseInfo(){
      var name = $('#Issue_name').val();
      var version = $('#album_version').val();
      var publishTime = $('#date').val();
      publishTime = publishTime.replace(/-/g, "/");
      var time = new Date(publishTime)
      var upcEanJan = $('#releaseCode').val();
      var songCopyrightOwner = $('#lyrics_copyright').val();
      var recordingCopyrightHolder = $('#record_copyright').val();
      var dirCode = $('#catalogCode').val();
      if($('#recordCompany1').is(':checked')){
        dirCode = null
      }
      if($('#release1').is(':checked')){
        time = null
      }
      if($('#getcode1').is(':checked')){
        upcEanJan = null
      }
      var param= {
        name: name,
        dirCode: dirCode,
        version: version,
        publishTime: time,
        upcEanJan: upcEanJan,
        songCopyrightOwner: songCopyrightOwner,
        recordingCopyrightHolder: recordingCopyrightHolder,
        id: albumId
      }
      param = JSON.stringify(param)
      $.ajax({
        type: "post",
        async: false,
        url: contextPath + '/stst.json',
        dataType: "json",
        data:param,
        contentType: "application/json",
        success: function (data) {
          console.log(data)
        },error :function(data){
          console.log(data)
        }
      })
    }
  }

  //select2下拉组件回显匹配
  function map(dom, name, echoId) {
    $(dom).each(function (i, item) {
      if ($(item).val() === echoId) {
        name = $(item).text()
        $(item).prop("selected", 'selected')
      }
    })
    return name
  }
  //检查图片尺寸
  function check() {
    var showLength = $('#modify_register-view').find('.img').length
    if ($('#show_img').html() !== '') {
      var img = document.getElementById("showImg");
      var imgWidth = img.width;
      var imgHeight = img.height;
      if (imgWidth < 500 || imgHeight < 500 || imgWidth !== imgHeight) {
        $('.errorImg').removeClass('hide')
        checkPic = true
        $('.errorImg p').html('图片尺寸不符')
      } else {
        checkPic = false
        $('.errorImg').addClass('hide')
      }
    } else if (showLength == 0) {
      window.sessionStorage.removeItem('baseImg')
    }
  }
  //字段验证
  //字段验证
  var userInfo = $('#userInfo');
  var userrules = {
    languages_type_select2: {
      required: true
    },
    music_type_select2: {
      required: true
    },
    performers_type_select2: {
      required: true
    },
    music_genre_select2: {
      required: true
    },
    record_company_select2: {
      required: true
    },
    Issue_name: {
      required: true
    },
    lyrics_copyright: {
      required: true
    },
    record_copyright: {
      required: true
    },
    releaseCode: {
      required: true
    }
  };
  var usermessages = {
    languages_type_select2: {
      required: '专辑的语种不能为空'
    },
    music_type_select2: {
      required: '专辑类型不能为空'
    },
    performers_type_select2: {
      required: '表演人不能为空'
    },
    music_genre_select2: {
      required: '流派不能为空'
    },
    record_company_select2: {
      required: '唱片公司不能为空'
    },
    Issue_name: {
      required: '发行名称不能为空'
    },
    lyrics_copyright: {
      required: '词曲版权所有人不能为空'
    },
    record_copyright: {
      required: '录音版权所有人不能为空'
    },
    releaseCode: {
      required: 'UPC\EAN\JAN不能为空'
    }
  };
  formValidate(userInfo, userrules, usermessages);
  //转换成时间格式
    function formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '/' + m + '/' + d;
    };
  //日期控件
  function getdate() {
    $('#date').datetimepicker({
      format: 'yyyy/mm/dd',
      language: 'zh-CN',
      startView: 'month',
      todayHighlight: true,
      minView: 'month',
      autoclose: true
    });
  }
  getdate()
  //日期和upc/ean/jan联动
  var release_radio = $('#releaseRadio input:radio');
  release_radio.on('click', function () {
    if ($(this).val() === 'release2') {
      $('.releaseContent').removeClass('hide')
      if(window.sessionStorage['createdId'] || checkPubilshtime == null){
        $('#date').val('')
      }
      $('#getcode1').prop("checked", false)
      $('#getcode1').attr('disabled', 'disabled')
      $('#getcode2').prop("checked", true)
      $('.getcodeContent').removeClass('hide')
    } else {
      $('.releaseContent').addClass('hide')
      $('#getcode2').prop("checked", false)
      $('#getcode1').removeAttr('disabled')
      $('#getcode1').prop('checked', true)
      $('.getcodeContent').addClass('hide')
    }
  })
  var getcode_radio = $('#getcode input:radio');
  getcode_radio.on('click', function () {
    if ($(this).val() === 'getcode2') {
      $('.getcodeContent').removeClass('hide')
      $('#getcode1').prop("checked", false)
      $('#getcode2').prop("checked", true)
    } else {
      $('.getcodeContent').addClass('hide')
      $('#getcode2').prop("checked", false)
      $('#getcode1').prop("checked", true)
    }
  })
})
