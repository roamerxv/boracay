/**
 * Created by yugang on 2017/5/31.
 */
$().ready(function () {
  var recordCompany_button = $('#recordCompany input:radio')
  recordCompany_button.on('click',function(){
    if($(this).val() === 'recordCompany1'){
      $('.recordContent').addClass('hide')
    }else{
      $('.recordContent').removeClass('hide')
    }
  })
})
