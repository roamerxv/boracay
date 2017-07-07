/**
 * Created by yugang on 2017/6/1.
 */
$().ready(function () {
  var signCompany_button = $('#signCompany input:radio')
  signCompany_button.on('click',function(){
    if($(this).val() === 'signCompany1'){
      $('.signContent').addClass('hide')
    }else{
      $('.signContent').removeClass('hide')
    }
  })
})
