/**
 * Created by yugang on 2017/6/1.
 */
$().ready(function() {
  var network_wrapper = $("#network-wrapper");
  var add_net = $(".add-net");
  var x = network_wrapper.length;
  var fieldCount=1;
  $(add_net).click(function (e){
    $('.contain-title').removeClass('hide')
    if(x >= 0){
      fieldCount++;
      Logger.debug(fieldCount)
      $(network_wrapper).append('<div class="form-group add-network"><div class="col-md-3"><input class="form-control network-describe" type="text" name="mytext[]" id="net_'+ fieldCount +'"/></div><div class="col-md-4"><input class="form-control network-address" type="text" name="mytext[]" id="field_'+ fieldCount +'"/></div><button class="btn btn-primary removeclass">删除</button></div>');
      x++;
    }
    return false;
  });
  $("body").on("click",".removeclass", function(e){
    if( x > 1 ) {
      $(this).parent('div').remove();
      if($(network_wrapper).find('input').length <= 0){
        $('.contain-title').addClass('hide')
      }
      x--;
    }
    return false;
  });

  //获取所选流派
  var record_musicStyle = []
  $('.record_selectBox').on('change',function(){
    record_musicStyle = $(this).val();
    record_musicStyle = record_style(record_musicStyle)
  })

  //字段验证
  var recordInfo = $('#recordInfo')
  var recordRules = {
    officialName:{
      required: true
    }
  };
  var recordMessage = {
    officialName:{
      required: "官方名称不能为空"
    }
  }
  formValidate(recordInfo,recordRules,recordMessage);

  var record_checkImg = false //判断图片尺寸
  var record_confirmBtn = $('#record_company_modal');
  var record_confirmBtn  = record_confirmBtn .find('[data-am-modal-confirm]');
  record_confirmBtn .off('click.confirm.modal.amui').on('click', function() {
    //网站字段验证
    /*var netCheck = false
    var network_wrapperInput = $('#network-wrapper input')
    $(network_wrapperInput).each(function(){
      if($(this).val() === ''){
        netCheck = true
        $('.net-error').removeClass('hide')
      }else{
        netCheck = false
        $('.net-error').addClass('hide')
      }
    })*/
    //控制图片尺寸
    if($('#show_img').html() !== '') {
      var img = document.getElementById("showImg");
      var imgWidth = img.width;
      var imgHeight = img.height;
      if (imgWidth < 500 || imgHeight < 500 || imgWidth !== imgHeight) {
        $('.errorImg').removeClass('hide')
        record_checkImg = true
        $('.errorImg p').html('图片尺寸不符')
      } else {
        record_checkImg = false
        $('.errorImg').addClass('hide')
      }
    }
    if (! $("#recordInfo").valid() || record_checkImg == true) {
      return;
    }
    //获取网站值
    var net_value = [];
    var netaddressVal = $('#network-wrapper .add-network');
    $(netaddressVal).each(function(i,item){
      var netobj = {};
      netobj['name'] = $(item).find('.network-describe').val();
      netobj['url'] = $(item).find('.network-address').val();
      net_value.push(netobj)
    })
    var officialName = $('#officialName').val();
    var introduce = $('#introduce').val();
    var address = $('#address').val();
    var mail = $('#mail').val();
    var contactNumber = $('#contactNumber').val();
    Logger.debug(net_value)
    if(net_value.length === 0){
      net_value = []
    }
    Logger.debug(record_musicStyle)
    Logger.debug(net_value)
    var param = {};
    param.files = ['recordCompany_file'];
    param.fileName = ['recordCompany_file'];
    param.inputData = {
      name: officialName,
      description: introduce,
      email: mail,
      telphone: contactNumber,
      genreIDList: record_musicStyle,
      siteList: net_value,
      address: address
    }
    Logger.debug(param)
   HttpUtils.post_record_data(param,function(data){
      if(data.status === 200){
        if(window.sessionStorage['performerListId']){
          $('#per_record_company_select2').append('<option value="'+data.data.record_compnay.id+'">'+officialName+'</option>')
          $("#per_record_company_select2 option:last").prop("selected", 'selected');
          $('#record_company_modal').modal('close')
        }else{
          $('#record_company_select2').append('<option value="'+data.data.record_compnay.id+'">'+officialName+'</option>')
          $("#record_company_select2 option:last").prop("selected", 'selected');
          $('#base_record_company_select2').append('<option value="'+data.data.record_compnay.id+'">'+officialName+'</option>')
          $("#base_record_company_select2 option:last").prop("selected", 'selected');
          $('#record_company_modal').modal('close')
        }
      }
    })
  })

  //取消
  $('.record_close').on('click',function(){
    $('#record_company_modal').modal('close')
    window.sessionStorage.removeItem('addRecord')
  })
  $('.record_am_close').on('click',function(){
    window.sessionStorage.removeItem('addRecord')
  })
  //转换

  function record_style(list){
    var R = [];
    for(var F = 0;F<list.length;F++){
      R.push({"genreId":list[F]})
    }
    return R
  }
})

