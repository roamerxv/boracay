/**
 * Created by yugang on 2017/6/19.
 */
$().ready(function() {
  //收入
  $('#income_list').DataTable(
    {
      "language":{
        "sProcessing":   "处理中...",
        "sLengthMenu":   "显示 _MENU_ 项结果",
        "sZeroRecords":  "没有匹配结果",
        "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix":  "",
        "sSearch":       "搜索:",
        "sUrl":          "",
        "sEmptyTable":     "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands":  ",",
        "oPaginate": {
          "sFirst":    "首页",
          "sPrevious": "上页",
          "sNext":     "下页",
          "sLast":     "末页"
        },
        "oAria": {
          "sSortAscending":  ": 以升序排列此列",
          "sSortDescending": ": 以降序排列此列"
        }
      }
    }
  )
  //添加网站和添加名称
  var performerId = null //表演人id
  var performer_network_wrapper = $("#echo_network-wrapper");
  var performer_countryName_wrapper = $('#countryName-wrapper');
  var performer_add_countryName = $('.add_countryName')
  var performer_add_net = $(".addPerformer-net");
  var performer_y = performer_countryName_wrapper.length;
  var performer_x = performer_network_wrapper.length;
  var performer_countryCount=1
  var performer_fieldCount=1;
  $(performer_add_net).click(function (e){
    $('.contain-title').removeClass('hide')
    if(performer_x >= 0){
      performer_fieldCount++;
      Logger.debug(performer_fieldCount)
      $(performer_network_wrapper).append('<div class="form-group add-network"><div class="col-md-3"><input class="form-control network-describe" type="text" name="mytext[]" id="net_'+ performer_fieldCount +'"/></div><div class="col-md-4"><input class="form-control network-address" type="text" name="mytext[]" id="field_'+ performer_fieldCount +'"/></div><span class="btn btn-primary performer_removeclass">删除</span></div>');
      performer_x++;
    }
    //新增网站
    var net_address_key = null;
    var net_name_key = null;
    $('#echo_network-wrapper input').blur(function(){
      if($(this).hasClass('network-address') == true){
        net_address_key = $(this).val()
        net_name_key = $(this).parent().prev().find('.network-describe').val()
      }else {
        net_name_key = $(this).val()
        net_address_key = $(this).parent().next().find('.network-address').val()
      }
      if(net_address_key != '' && net_name_key != ''){
        var param = {
          performerId : performerId,
          name : net_name_key,
          url : net_address_key
        }
        param = JSON.stringify(param)
        console.log(param)
        HttpUtils.post_performerSite_data(param,function(data){
          console.log(data)
        })
      }
    })
    return false;
  });
  $("body").on("click",".performer_removeclass", function(e){
    if( performer_x > 1 ) {
      $(this).parent('div').remove();
      if($(performer_network_wrapper).find('input').length <= 0){
        $('.contain-title').addClass('hide')
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
      $(performer_countryName_wrapper).append('<div class="form-group addName"><div class="col-md-3"><div id="select2_container_div'+performer_countryCount+'" ><select id="languages_type_set'+performer_countryCount+'" class="select2_performer"></select></div></div><div class="col-md-4"><input class="form-control" type="text" name="mytext[]" id="signName_'+ performer_countryCount +'"/></div><span class="btn btn-primary performer_removeName">删除</span></div>');
      performer_y++;
      language();
    }
    $('.select2_performer').on('change',function(){
      var languageId = $(this).val()
      var nation_name_val = $(this).parent().parent().next().find('input').val()
      if(nation_name_val != ''){
        var param = {
          languageId : languageId,
          performerId : performerId,
          name : nation_name_val
        }
        param = JSON.stringify(param)
        HttpUtils.post_performerName_data(param,function(data){
          console.log(data)
        })
      }
    })
    $('#countryName-wrapper input').blur(function(){
      var nation_nameVal = $(this).val();
      var languageId = $(this).parent().prev().find('select').val()
      if(nation_nameVal != ''){
        var param = {
          languageId : languageId,
          performerId : performerId,
          name : nation_nameVal
        }
        param = JSON.stringify(param)
        HttpUtils.post_performerName_data(param,function(data){
          console.log(data)
        })
      }
    })
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

  //表演人信息回显
  var param = window.sessionStorage['performerListId']
  HttpUtils.get_performerEcho_data(param,function(data){
    //var baseInfo = data.performerInfo
    console.log(data)
    performerId = data.performerInfo.id
    //图片文件
    window.sessionStorage['fileId'] = data.performerInfo.perPic
    //基本信息回显
    if(data.performerInfo.perPic){
      $('.uploadFile').parent().parent().find('#echo_register-view').html('<img class="img" src="'+contextPath+data.performerInfo.perPic+'" alt="" width="300" height="300"/><span class="sign" data-role="delete-file" onclick="javascript:per_remove_img(this)">&times;<span>')
    }
    $('#performersName').val(data.performerInfo.perName)
    $('.perName').html(data.performerInfo.perName)
    $('#introduce').val(data.performerInfo.introduce)
    $('#address').val(data.performerInfo.address)
    //流派回显
    var genre = data.genre
    //var selectBox = $('.echo_selectBox').find('option')
    var lableName = $('.sumo_echo_music_styleSelect .options').find('li label')
    var selectArray = []
    console.log(lableName)
    $(genre).each(function(i,temp){
      //temp = $(temp)[0].name
      $(lableName).each(function(i,item){
        if($(temp)[0].name == $(item).html()){
          $(item).parent().addClass("selected")
          selectArray.push($(item).html())
        }
      })
    })
    console.log(selectArray)
    if(selectArray.length > 0){
      $('.sumo_echo_music_styleSelect .CaptionCont ').find('span').removeClass("placeholder")
      $('.sumo_echo_music_styleSelect .CaptionCont ').attr('title',selectArray)
      $('.sumo_echo_music_styleSelect .CaptionCont ').find('span').html(selectArray.toString())
    }
    $('.echo_selectBox').on('change',function(){
      if( $('.CaptionCont ').find('span').html() != ''){
        $('.CaptionCont ').find('span').removeClass('placeholder')
      }
      var option = $('.options').find('.selected')
      var option_arr = []
      $(option).each(function(i,item){
        option_arr.push($(item).find('label').html())
        //console.log($(item).find('label').html())
      })
      console.log(option_arr)
      $('.CaptionCont ').attr('title',option_arr)

      $('.CaptionCont ').find('span').html(option_arr.toString())
      if($('.CaptionCont ').attr('title') == ''){
        $('.CaptionCont ').attr('title','选择流派')
        $('.CaptionCont ').find('span').html('选择流派')
      }
      //新增流派console.log($(this).val())
    })
    //删除和新增流派
    $('.options li').on('click',function(){
      if($(this).hasClass('selected') == false){
        var select_common = $(this).find('label').html()
        select_common = select_common.replace(/&amp;/,'&')
        $('#echo_music_styleSelect').find('option').each(function(i,item){
          if(select_common == $(item).text()){
            var del_style_url = contextPath + '/performer/delete/genres/' +performerId+'/'+ $(item).val() + '.json'
            $.ajax({
              type: 'delete',
              url: del_style_url,
              async: false,//默认为true
              contentType: 'application/json',//默认为application/x-www-form-urlencoded
              dataType: 'json',//默认为预期服务器返回的数据类型
              processData: false,//默认为true*!/
              success: function (data) {
                if(data.status == '200'){
                  console.log(data)
                }
              },
              error: function (data) {
                console.log(data)
              }
            })
          }
        })
      }else if($(this).hasClass('selected') == true){
        var add_select_common = $(this).find('label').html()
        add_select_common = add_select_common.replace(/&amp;/,'&')
        $('#echo_music_styleSelect').find('option').each(function(i,item){
          console.log($(item).text())
          if(add_select_common == $(item).text()){
            var param_val =  $(item).val()
            var param= {
              performerId : performerId,
              musicGenreId : param_val
            }
            param = JSON.stringify(param)
            HttpUtils.post_performerStyle_data(param,function(data){
              console.log(data)
            })
          }
        })
      }
    })
    //活跃年代
    $('#music_year_select2').find('option').each(function(i,item){
      if($(item).val() == data.age.ageId){
        $(item).prop('selected',true)
      }
    })
    $('#music_year_select2').on('change',function(){
      console.log($(this).val())
      var ageId = $(this).val()
      var param = {
        ageId : ageId,
        performerId : performerId
      }
      param = JSON.stringify(param)
      HttpUtils.modify_performerYear_data(param,function(data){
        console.log(data)
      })
    })

    //唱片公司
    if(data.record.recordId != '' && data.record.recordId != undefined){
      $('.signContent').removeClass('hide')
      $('#signCompany2').prop('checked',true)
      var record_company_select2 = $('#per_record_company_select2').find('option')
      var record_companyName = null
      var echo_recordId = data.record.recordId
      record_companyName = map(record_company_select2,record_companyName,echo_recordId)
      //$('#record_company_select2').attr('dataId',data.data.recordCompany.albumId)
      $('#select2-per_record_company_select2-container').html(record_companyName)
    }
    function map(dom,name,echoId){
      $(dom).each(function(i,item){
        if($(item).val() === echoId){
          name = $(item).text()
          $(item).prop("selected", 'selected')
        }
      })
      return name
    }
    //唱片公司修改或删除
    $('#per_record_company_select2').on('change',function(){
      var recordId = $(this).val()
      if(recordId == null){
        recordId = ''
      }
      var param = {
        recordId : recordId,
        performerId : performerId
      }
      param = JSON.stringify(param)
      HttpUtils.post_performerRecord_data(param,function(data){
        if(data.status == '200'){
          return
        }
      })
    })
    $('#signCompany2').on('click',function(){
      var recordId = $('#per_record_company_select2').val()
      var param = {
        recordId : recordId,
        performerId : performerId
      }
      param = JSON.stringify(param)
      HttpUtils.post_performerRecord_data(param,function(data){
        if(data.status == '200'){
          return
        }
      })
    })
    //删除唱片公司
    $('#signCompany1').on('click',function(){
      var param = {
        recordId : '',
        performerId : performerId
      }
      param = JSON.stringify(param)
      HttpUtils.del_performerRecord_data(param,function(data){
          console.log(data)
      })
    })
    //回显网站
    //console.log(data.siteInfo.length)
    if(data.siteInfo.length > 0){
      $('.contain-title').removeClass('hide')
      var temp = ''
      $(data.siteInfo).each(function (i,item){
        temp += '<div class="form-group add-network" data-id="'+$(item)[0].id+'">'
        temp += '<div class="col-md-3"><input class="form-control network-describe" type="text" value="'+$(item)[0].name+'"></div>'
        temp += '<div class="col-md-4"><input class="form-control network-address" type="text" value="'+$(item)[0].url+'"></div>'
        temp += '<span class="btn btn-primary performer_removeclass">删除</span>'
        temp += '</div>'
      })
      $('#echo_network-wrapper').append(temp)
    }
    //修改网站
    var net_address_val = null
    var net_name_val = null
    var address_input = null
    var name_input = null
    $('#echo_network-wrapper input').focus(function(){
      if($(this).hasClass('network-address') == true){
        net_address_val = $(this).val()
        net_name_val = $(this).parent().prev().find('.network-describe').val()
      }else{
        net_address_val = $(this).parent().next().find('.network-address').val()
        net_name_val = $(this).val()
      }
    })
    $('#echo_network-wrapper input').blur(function(){
      if($(this).hasClass('network-address') == true){
        address_input = $(this).val()
        name_input = $(this).parent().prev().find('.network-describe').val()
      }else {
        name_input = $(this).val()
        address_input = $(this).parent().next().find('.network-address').val()
      }
      if(net_address_val != address_input || net_name_val != name_input){
        var siteId = $(this).parent().parent().attr('data-id')
        var param = {
          id : siteId,
          name : name_input,
          url : address_input
        }
        param = JSON.stringify(param)
        HttpUtils.modify_performerSite_data(param,function(data){
          console.log(data)
        })
      }else{
        return
      }
    })
    //删除网站
    var del_site = $('.performer_removeclass')
    $(del_site).on('click',function(){
      var siteId = $(this).parent().attr('data-id')
      var param = siteId
      HttpUtils.del_performerSite_data(param,function(data){
        if(data.status == '200'){
        }
      })
      $(this).parent('div').remove();
      if($('#echo_network-wrapper').find('input').length <= 0){
        $('.contain-title').addClass('hide')
      }
    })
    //回显各国名称
    if(data.language.length > 0){
      var language_temp = ''
      $('.countryName-title').removeClass('hide')
      $(data.language).each(function(i,item){
        language_temp += '<div class="form-group addName" data-id="'+$(item)[0].id+'">'
        language_temp += '<div class="col-md-3"><div><select class="echo_select2_performer"></select></div></div>'
        language_temp += '<div class="col-md-4"><input class="form-control" type="text" value="'+$(item)[0].name+'"/></div>'
        language_temp += '<span class="btn btn-primary performer_removeName">删除</span></div>'
      })
      $('#countryName-wrapper').append(language_temp)
    }
    echoLanguage();
    $(".echo_select2_performer").each(function(i,item) {
      $(item).find('option').each(function(){
        if($(this).text() == data.language[i].languageName){
          $(this).prop('selected',true)
        }
      })
    });

    //修改各国名称
    $(".echo_select2_performer").on('change',function(){
      var language_val = $(this).val();
      var language_nameId = $(this).parent().parent().parent().attr('data-id')
      var language_name = $(this).parent().parent().next().find('input').val();
      var param = {
        id : language_nameId,
        languageId : language_val,
        name : language_name,
      }
      param = JSON.stringify(param)
      HttpUtils.modify_performerName_data(param,function(data){
        console.log(data)
      })
    })
    var nationName = null
    $('#countryName-wrapper input').focus(function(){
      nationName = $(this).val();
    })
    $('#countryName-wrapper input').blur(function(){
      var nation_Name = $(this).val();
      var nation = $(this).parent().prev().find('select').val();
      var language_nameId = $(this).parent().parent().attr('data-id')
      if(nationName != nation_Name){
        var param = {
          id : language_nameId,
          languageId : nation,
          name : nation_Name,
        }
        param = JSON.stringify(param)
        HttpUtils.modify_performerName_data(param,function(data){
          console.log(data)
        })
      }
    })
    //删除各国名称
    $('.performer_removeName').on('click',function(){
      var nationId = $(this).parent().find('select').val()
      var del_language_url = contextPath + '/performer/delete/language/' +performerId+'/'+ nationId + '.json'
      $.ajax({
        type: 'delete',
        url: del_language_url,
        async: false,//默认为true
        contentType: 'application/json',//默认为application/x-www-form-urlencoded
        dataType: 'json',//默认为预期服务器返回的数据类型
        processData: false,//默认为true*!/
        success: function (data) {
          if(data.status == '200'){
            console.log(data)
          }
        },
        error: function (data) {
          console.log(data)
        }
      })
      $(this).parent('div').remove();
      if($('#countryName-wrapper').find('input').length <= 0){
        $('.countryName-title').addClass('hide')
      }
    })
    //删除封面
    $('.sign').on('click',function(){
      var per_pic_fileId = data.performerInfo.perPic
      per_pic_fileId = per_pic_fileId.replace(/download/,'')
      per_pic_fileId = per_pic_fileId.replace(/[//]/g,'')
      var param = per_pic_fileId
      var del_pic_url = contextPath + '/performer/delete/' +performerId+'/'+ param + '.json'
      $.ajax({
        type: 'delete',
        url: del_pic_url,
        async: false,//默认为true
        contentType: 'application/json',//默认为application/x-www-form-urlencoded
        dataType: 'json',//默认为预期服务器返回的数据类型
        processData: false,//默认为true*!/
        success: function (data) {
          if(data.status == '200'){
            console.log(data)
          }
        },
        error: function (data) {
          console.log(data)
        }
      })
    })
  })
  //获取语种数据
  function language(){
    var language = $(".select2_performer")
      $.ajax({
        type: "get",
        async: false,
        url: contextPath + '/music/language/rest/list',
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
          var languageName = ''
          $(data).each(function(i,item){
            languageName += '<option value="'+$(item)[0].id+'">'+$(item)[0].text+'</option>'
          })
          language.append(languageName)
        },
        error: function (data) {

        }
      });
    $(language).on("change", function (e) {
      Logger.debug("选择了" + language.val());
    });
  }
  //回显语种
  function echoLanguage(){
    var echo_language = $(".echo_select2_performer")
    $.ajax({
      type: "get",
      async: false,
      url: contextPath + '/music/language/rest/list',
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        var languageName = ''
        $(data).each(function(i,item){
          languageName += '<option value="'+$(item)[0].id+'">'+$(item)[0].text+'</option>'
        })
        echo_language.append(languageName)
      },
      error: function (data) {

      }
    });
    $(echo_language).on("change", function (e) {
      Logger.debug("选择了" + echo_language.val());
    });
  }
  //修改基本信息保存
  $('.save').on('click',function(){
    var perName = $('#performersName').val()
    var introduce = $('#introduce').val()
    var address = $('#address').val()
    var param = {
      perName : perName,
      introduce : introduce,
      address : address,
      id : performerId
    }
    param = JSON.stringify(param)
    HttpUtils.post_performerBase_data(param,function(data){
      if(data.status == '200'){
        $('#save_success').modal('open')
      }
    })
  })
  $('.save_confirm').on('click',function(){
    location.href = contextPath + '/views/performers/performers.jsp'
  })
  $('.echo_close-confirm').on('click',function(){
    location.href = contextPath + '/views/performers/performers.jsp'
  })
  $('.performer_close').on('click',function(){
    location.href = contextPath + '/views/performers/performers.jsp'
  })

  $('.add_recode').on('click',function(){
    $('#record_company_modal').modal({closeViaDimmer: false})
    $('#recordInfo')[0].reset();
    $('#netContent .contain-title').addClass('hide')
  })
  //离开当前页面提示
  var jump_url = null
  var leftBar = $('.sidebar-nav').find('li')
  $(leftBar).each(function(i,item){
    $(item).on('click',function(){
      jump_url = $(this).find('a').attr('href')
      if(jump_url == 'javascript:void(0)'){
        window.sessionStorage.removeItem("performerListId")
        jump_url = contextPath + '/views/performers/performers.jsp'
      }
      window.sessionStorage.removeItem("performerListId")
    })
  })
})
