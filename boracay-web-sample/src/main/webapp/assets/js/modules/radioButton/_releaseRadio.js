/**
 * Created by yugang on 2017/5/27.
 */
$().ready(function () {
  var releaseRadio_button = $('#releaseRadio input:radio')
  releaseRadio_button.on('click',function(){
    if($(this).val() === 'release1'){
      $('.releaseContent').addClass('hide')
    }else{
      $('.releaseContent').removeClass('hide')
    }
  })
})
