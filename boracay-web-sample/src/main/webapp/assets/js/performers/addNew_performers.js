/**
 * Created by yugang on 2017/6/19.
 */
/**
 * Created by yugang on 2017/5/31.
 */
$().ready(function() {
  var performer_network_wrapper = $("#performer_network-wrapper");
  var performer_countryName_wrapper = $('#countryName-wrapper');
  var performer_add_countryName = $('.add_countryName')
  var performer_add_net = $(".performer_add-net");
  var performer_y = performer_countryName_wrapper.length;
  var performer_x = performer_network_wrapper.length;
  var performer_countryCount=1
  var performer_fieldCount=1;
  $(performer_add_net).click(function (e){
    $('.performer_contain-title').removeClass('hide')
    if(performer_x >= 0){
      performer_fieldCount++;
      Logger.debug(performer_fieldCount)
      $(performer_network_wrapper).append('<div class="form-group add-network"><div class="col-md-3"><input class="form-control network-describe" type="text" name="mytext[]" id="net_'+ performer_fieldCount +'"/></div><div class="col-md-4"><input class="form-control network-address" type="text" name="mytext[]" id="field_'+ performer_fieldCount +'"/></div><span class="btn btn-primary performer_removeclass">删除</span></div>');
      performer_x++;
    }
    return false;
  });
  $("body").on("click",".performer_removeclass", function(e){
    if( performer_x > 1 ) {
      $(this).parent('div').remove();
      if($(performer_network_wrapper).find('input').length <= 0){
        $('.performer_contain-title').addClass('hide')
      }
      performer_x--;
    }
    return false;
  });
  $(performer_add_countryName).click(function (e){
    $('.countryName-title').removeClass('hide')
    if(performer_y >= 0){
      performer_countryCount++;
      Logger.debug(performer_countryCount)
      $(performer_countryName_wrapper).append('<div class="form-group addName"><div class="col-md-4"><div id="select2_container_div'+performer_countryCount+'" ><select id="languages_type_set'+performer_countryCount+'" class="select2_performer"></select></div></div><div class="col-md-4"><input class="form-control" type="text" name="mytext[]" id="signName_'+ performer_countryCount +'"/></div><span class="btn btn-primary performer_removeName">删除</span></div>');
      performer_y++;
      language();
    }
    return false;
  });
  $("body").on("click",".performer_removeName", function(e){
    if( performer_y > 1 ) {
      $(this).parent('div').remove();
      if($(performer_countryName_wrapper).find('input').length <= 0){
        $('.countryName-title').addClass('hide')
      }
      performer_y--;
    }
    return false;
  })

  //跳转新增唱片公司
  $('.add_recode').on('click',function(){
    $('#record_company_modal').modal('open')
  })
  //获取语种数据
  function language(){
    var languages_type_set;
    var language = $(".select2_performer")
    $.ajax({
      type: "get",
      async: false,
      url: contextPath + '/music/language/rest/list',
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        languages_type_set = $(language).select2({
          data: data,
          width: '299px',
          language: "zh-CN",//汉化
          placeholder: '请选择语种',//默认文字提示
          allowClear: true//允许清空
        });
        Logger.debug("缺省选择的是:" + languages_type_set.val());
      },
      error: function (data) {

      }
    });

    $(language).on("change", function (e) {
      Logger.debug("选择了" + language.val());
    });
  }

  //获取所选流派
  var musicStyle = []
  $('.selectBox').on('change',function(){
    musicStyle = $(this).val();
    musicStyle = style(musicStyle);
  })
  //获取年代id
  var year = null
  $('#music_year_select2').on('change',function(){
    year = $(this).val();
  })
  //字段验证
  var performerInfo = $('#performerInfo')
  var performerRules = {
    performersName:{
      required: true
    }
  };
  var performerMessage = {
    performersName:{
      required: "表演人/乐队不能为空"
    }
  }
  formValidate(performerInfo,performerRules,performerMessage);

  var performer_checkImg = false
 $('.performer_save').on('click', function() {
    //验证网站和名称是否填写
    /*var netCheck = false
     var countryCheck = false
     var network_wrapperInput = $('#network-wrapper input')
     $(network_wrapperInput).each(function(){
     if($(this).val() === ''){
     netCheck = true
     $('.net-error').removeClass('hide')
     }else{
     netCheck = false
     $('.net-error').addClass('hide')
     }
     })
     var countryName_wrapperInput = $('#countryName-wrapper input')
     //var countryName_wrapperSelect = $('#countryName_wrapper select')
     $(countryName_wrapperInput).each(function(){
     if($(this).val() === ''){
     countryCheck = true
     $('.countryName-error').removeClass('hide')
     }else{
     countryCheck = false
     $('.countryName-error').addClass('hide')
     }
     })*/
    //获取网站值
    var net_value = []
    var netaddressVal = $('#performer_network-wrapper .add-network')
    $(netaddressVal).each(function(i,item){
      var netobj = {};
      netobj['name'] = $(item).find('.network-describe').val();
      netobj['url'] = $(item).find('.network-address').val();
      net_value.push(netobj)
    })
    //获取表演人各国名称的值
    var performer_value = []
    var performerWrapper = $('#countryName-wrapper .addName')
    $(performerWrapper).each(function(i,item){
      var obj = {}
      obj['languageId'] = $(item).find('select').val()
      obj['name'] = $(item).find('input').val()
      performer_value.push(obj)
    })
    //控制图片尺寸
    if($('#show_img').html() !== '') {
      var img = document.getElementById("showImg");
      var imgWidth = img.width;
      var imgHeight = img.height;
      Logger.debug(imgWidth,imgHeight)
      if (imgWidth < 500 || imgHeight < 500 || imgWidth !== imgHeight) {
        $('.errorImg').removeClass('hide')
        performer_checkImg = true
        $('.errorImg p').html('图片尺寸不符')
      } else {
        performer_checkImg = false
        $('.errorImg').addClass('hide')
      }
    }
    if (! $("#performerInfo").valid() || performer_checkImg == true) {
      return;
    }
    var perName = $('#performersName').val();
    var introduce = $('#introduce').val();
    var address = $('#address').val();
    var recordId = $('#per_record_company_select2').val();
    if($('#signCompany1').is(':checked')){
      recordId = null
    }
    var param = {}
    param.files = ['performer_file'];
    param.fileName = ['performer_file'];
    param.inputData = {
      perName: perName,
      introduce: introduce,
      address: address,
      ageId: year,
      genreLists: musicStyle,
      recordId: recordId,
      siteLists: net_value,
      languageLists: performer_value,
    }
    Logger.debug(param)
    HttpUtils.post_performer_data(param,function(data){
      if(data.data.status = 200){
        $('#success').modal('open')
      }
    })
  })
  $('.confirm').on('click',function(){
    location.href = contextPath + '/views/performers/performers.jsp'
  })
  $('.performer_close').on('click', function() {
    location.href = contextPath + '/views/performers/performers.jsp'
  })
  $('.add_recode').on('click',function(){
    $('#record_company_modal').modal('open')
  })

  function style(list){
    var F = 0,R = [];
    for (;F < list.length;F++) R.push({"musicGenreId" : list[F]})
    return R
  }
})
