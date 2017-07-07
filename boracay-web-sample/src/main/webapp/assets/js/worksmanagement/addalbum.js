/**
 * Created by yugang on 2017/5/31.
 */
$().ready(function () {
  var checkPic = false//切换tab判断图片
  var album_Id = ''//图片id
//基本信息
  var release_radio = $('#releaseRadio input:radio');
  release_radio.on('click', function () {
    if ($(this).val() === 'release2') {
      $('.releaseContent').removeClass('hide')
      $('#getcode1').prop("checked",false)
      $('#getcode1').attr('disabled', 'disabled')
      $('#getcode2').prop("checked", true)
      $('.getcodeContent').removeClass('hide')
      $('.code_waring').addClass('hide')
    } else {
      $('.releaseContent').addClass('hide')
      $('#getcode2').prop("checked",false)
      $('#getcode1').removeAttr('disabled')
      $('#getcode1').prop("checked", true)
      $('.getcodeContent').addClass('hide')
      $('.code_waring').removeClass('hide')
    }
  })
  var getcode_radio = $('#getcode input:radio');
  getcode_radio.on('click', function () {
    if ($(this).val() === 'getcode2') {
      $('.getcodeContent').removeClass('hide')
      $('#getcode1').prop("checked",false)
      $('#getcode2').prop("checked", true)
      $('.code_waring').addClass('hide')
    } else {
      $('.getcodeContent').addClass('hide')
      $('#getcode2').prop("checked",false)
      $('#getcode1').prop("checked",true)
      $('.code_waring').removeClass('hide')
    }
  })

  //日期控件
  function getdate() {
    $('#date').datetimepicker({format: 'yyyy/mm/dd',language:'zh-CN',startView:'month',todayHighlight:true,minView:'month',autoclose:true});
  }

  getdate()

  //字段验证
  var userInfo = $('#userInfo');
  var userrules = {
    languages_type_select2: {
      required: true
    },
    music_type_select2: {
      required: true
    },
    performers_type_select2:{
      required: true
    },
    music_genre_select2:{
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
    performers_type_select2:{
      required: '表演人不能为空'
    },
    music_genre_select2:{
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
  //跳转
  $('.addPerformers').on('click', function () {
    $('#performers_add').modal({closeViaDimmer: false});
  })
  $('.add_company').on('click', function () {
    $('#record_company_modal').modal({closeViaDimmer: false})
    /*//初始化
    $('#recordInfo')[0].reset();
    $('#record_register-view').html('')
    $('#recordCompany_file').parent().parent().find('.upfilebox').html('<input class="form-control uploadFile" type="file" id="recordCompany_file" name="recordCompany_file" accept="image/jpeg,image/png,img/jpg" onchange="readFile(this)"><label class="lable lable-pic"></label>')
    $('#netContent .contain-title').addClass('hide')
    $('#network-wrapper').html('');
    $('.sumo_record_music_styleSelect .selectBox').attr('title','选择流派');
    $('.sumo_record_music_styleSelect .selectBox').find('span').html('选择流派');
    $('.sumo_record_music_styleSelect .selectBox').find('span').addClass('placeholder')*/
  })

  //跳转专辑歌曲验证
  $('.single_lyrics').on('click', function () {
    check();
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
    if(!$("#userInfo").valid() || checkPic ==true || check_input == true){
      $('#infoUnfilled').modal('open');
      return
    }
    save();
    location.href = contextPath + '/views/worksmanagement/lyrics_copyright.jsp'
  })
  //跳转词曲版权验证
  $('.single_album').on('click', function () {
    check();
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
    if(!$("#userInfo").valid() || checkPic ==true || check_input == true){
      $('#infoUnfilled').modal('open');
      return
    }
    save();
    location.href = contextPath + '/views/worksmanagement/album_song.jsp'
  })
  //跳转预览验证
  $('.single_save').on('click', function () {
    check();
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
    if(!$("#userInfo").valid() || checkPic ==true || check_input == true){
      $('#infoUnfilled').modal('open');
      return
    }
    save();
    location.href = contextPath + '/views/worksmanagement/preview_save.jsp'
  })
  $('.cancel-confirm').on('click', function () {
    $('.single_lyrics').removeClass("active");
    $('.single_album').removeClass("active");
    $('.single_save').removeClass("active");
    $('.album').addClass('active');
  })
  $('.close-confirm').on('click', function () {
    $('.single_lyrics').removeClass("active");
    $('.single_album').removeClass("active");
    $('.single_save').removeClass("active");
    $('.album').addClass('active');
  })
  //控制图片尺寸保存数据
  var checkImg = false
  $('.next_step').on('click', function () {
    if ($('#show_img').html() !== '') {
      var img = document.getElementById("showImg");
      var imgWidth = img.width;
      var imgHeight = img.height;
      if (imgWidth < 500 || imgHeight < 500 || imgWidth !== imgHeight) {
        $('.errorImg').removeClass('hide')
        checkImg = true
        $('.errorImg p').html('图片尺寸不符')
      } else {
        checkImg = false
        $('.errorImg').addClass('hide')
      }
    }else{
      window.sessionStorage.removeItem('baseImg')
    }
    var checkVal = false;
    var playArray = [];
    var inputWrapper = $('#inputWrapper .inputPerformer');
    Logger.debug(inputWrapper)

    $(inputWrapper).each(function (i, item) {
      var obj = {};
      obj["type"] = $(item).find('select').val();
      obj["name"] = $(item).find('input').val();
      playArray.push(obj);
    })
    Logger.debug("1724310973" + playArray);
    var inputName = $('#inputWrapper input');
    $(inputName).each(function () {
      if ($(this).val() === '') {
        checkVal = true;
        $('.containError').removeClass('hide')
      }
    })
    Logger.debug(playArray)
    if (!$("#userInfo").valid() || checkVal == true || checkImg == true) {
      $('#infoUnfilled').modal('open');
      return;
    }
    var languageId = $('#languages_type_select2').val();
    var typeId = $('#music_type_select2').val();
    var styleId = $('#music_genre_select2').val();
    var styleName = $('#music_genre_select2').find('option:selected').text();
    var name = $('#Issue_name').val();
    var version = $('#album_version').val();
    var mainPerformerId = $('#performers_type_select2').val();
    var mainPerformeName = $('#performers_type_select2').find('option:selected').text();
    var companyName = $('#record_company_select2').find('option:selected').text();
    Logger.debug(mainPerformerId)
    var publishTime = $('#date').val();
    var upcEanJan = $('#releaseCode').val();
    var companyId = $('#record_company_select2').val();
    var songCopyrightOwner = $('#lyrics_copyright').val();
    var recordingCopyrightHolder = $('#record_copyright').val();
    var dirCode = $('#catalogCode').val();
    //获取图片的id
    if(window.sessionStorage['albumId']){
      album_Id = window.sessionStorage['albumId']
    }else {
      album_Id = ''
    }
    if (playArray.length === 0) {
      playArray = null;
    }
    if (companyId === undefined) {
      companyId = null;
      companyName = null
    }
    if (dirCode === undefined) {
      dirCode = null
    }
    publishTime = publishTime.replace(/-/g, "/");
    var time = new Date(publishTime)
    //判断选择是否
    if($('#option2').is(':checked')){
      mainPerformerId = ""
      mainPerformeName = '多名表演人'
      playArray = null
    }
    if($('#release1').is(':checked')){
      time = null
    }
    if($('#recordCompany1').is(':checked')){
      companyId = null
      companyName = null
      dirCode = null
    }
    if($('#getcode1').is(':checked')){
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
      otherPerformers: playArray,
      id : album_Id
    }
    param.name = {
      styleName:styleName,
      mainPerformeName:mainPerformeName,
      companyName:companyName
    }
    param = JSON.stringify(param)
    Logger.debug(param)
    /*HttpUtils.post_albumInfo_data(param, function (data) {
      if (data.status == 200) {
        window.sessionStorage['createdId'] = data.data.baseInfo.id;
        location.href = contextPath + '/views/worksmanagement/album_song.jsp'
      }
    })*/
    window.sessionStorage['createdId'] = param
    location.href = contextPath + '/views/worksmanagement/album_song.jsp'
  })


  //保存数据方法
  function save() {
    var performerArray = [];
    var inputWrapper = $('#inputWrapper .inputPerformer');
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
    if(window.sessionStorage['albumId']){
      album_Id = window.sessionStorage['albumId']
    }else {
      album_Id = ''
    }
    if (performerArray.length === 0) {
      performerArray = null;
    }
    if (companyId === undefined) {
      companyId = null;
      companyName = null
    }
    if (dirCode === undefined) {
      dirCode = null
    }
    publishTime = publishTime.replace(/-/g, "/");
    var time = new Date(publishTime)
    //判断选择是否
    if($('#option2').is(':checked')){
      mainPerformerId = ""
      mainPerformeName = '多名表演人'
      performerArray = null
    }
    if($('#release1').is(':checked')){
      time = null
    }
    if($('#recordCompany1').is(':checked')){
      companyId = null
      companyName = null
      dirCode = null
    }
    if($('#getcode1').is(':checked')){
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
      id : album_Id,
    }
    param.name = {
      styleName:styleName,
      mainPerformeName:mainPerformeName,
      companyName:companyName
    }
    param = JSON.stringify(param);
    Logger.debug(param)
    window.sessionStorage['createdId'] = param
  }

  function check() {
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
    } else {
      window.sessionStorage.removeItem('baseImg')
    }
  }
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
  /*$('.left-sidebar').on('click',function(){
    $('#unSave').modal('open')
    return false
  })*/
  $('.confirm').on('click',function(){
    window.sessionStorage.removeItem("createdId")
    window.sessionStorage.removeItem('baseImg')
    location.href = contextPath + jump_url
  })
  $('.base_close').on('click',function(){
    window.sessionStorage.removeItem("createdId")
    window.sessionStorage.removeItem('baseImg')
    location.href = contextPath + '/views/worksmanagement/musicassets.jsp'
  })
  //获取主要表演人的值
  /*$('.select2').on('click',function(){
    alert(1111)
    Logger.debug($('.select2-search__field'))
  })*/
  /*$('.select2-search__field').bind('input porpertychange',function(){
    alert(1111)
    /!*var val = $(this).val();
    Logger.debug(val)*!/
  });*/
  $('.music_asset').on('click',function(){
    window.sessionStorage.removeItem("createdId")
    window.sessionStorage.removeItem('baseImg')
  })
  //隐藏上一步
  $('.prev_step').addClass('hide')
})
