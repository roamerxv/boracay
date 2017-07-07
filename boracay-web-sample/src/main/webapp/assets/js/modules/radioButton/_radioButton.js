/**
 * Created by yugang on 2017/5/27.
 */
$().ready(function () {
 var radio_button = $('#radio_button input:radio')
  radio_button.on('click',function(){
    if($(this).val() === 'option2'){
      $('.collection_more').removeClass('hide')
      $('.nothing_more').addClass('hide')
      $('.btn_add').addClass('hide')
      $('#inputWrapper').addClass('hide')
    }else{
      $('.collection_more').addClass('hide')
      $('.nothing_more').removeClass('hide')
      $('.btn_add').removeClass('hide')
      $('#inputWrapper').removeClass('hide')
    }
  })
  var inputWrapper = $("#inputWrapper");
  var addContent = $(".btn_add");
  var x = inputWrapper.length;
  var fieldCount=1;
  $(addContent).click(function (e){
    if(x >= 0){
      fieldCount++;
      Logger.debug(fieldCount)
      $(inputWrapper).append('<div class="form-group inputPerformer"><div class="col-md-3"><select class="form-control"><option value = "主要表演人" class="performer'+ fieldCount +'">主要表演人</option><option value = "伴唱人" class="accompany'+ fieldCount +'">伴唱人</option></select></div><div class="col-md-4"><input class="form-control" type="text" name="mytext[]" id="field_'+ fieldCount +'"/></div><span class="btn btn-primary removeclass">删除</span><b class="red">*</b></div>');
      x++;
    }
    //新增其他表演人
    if(window.sessionStorage['album_song_id']){
      var album_Id = window.sessionStorage['album_song_id']
      $('.inputPerformer').find('select').on('change',function(){
        var performer_type = $(this).val();
        var performer_name = $(this).parent().next().find('input').val();
        if(performer_name != ''){
          var param = {
            albumId : album_Id,
            type : performer_type,
            name : performer_name
          }
          param = JSON.stringify(param)
          HttpUtils.post_album_AddPerformer(param,function(data){
            console.log(data)
          })
        }
      })
      $('.inputPerformer').find('input').blur(function(){
          var performer_type = $(this).parent().prev().find('select').val();
          var performer_name = $(this).val();
          if(performer_name != ''){
            var param = {
              albumId : album_Id,
              type : performer_type,
              name : performer_name
            }
            param = JSON.stringify(param)
            HttpUtils.post_album_AddPerformer(param,function(data){
              console.log(data)
            })
          }
      })
    }
    return false;
  });

  $("body").on("click",".removeclass", function(e){
    if( x > 1 ) {
      $(this).parent('div').remove();
      var check_input = false;
      var inputName = $('#inputWrapper input');
      Logger.debug(inputName)
      $(inputName).each(function () {
        if ($(this).val() === '') {
          check_input = true;
          $('.containError').removeClass('hide')
        }
      })
      if (check_input == false) {
        $('.containError').addClass('hide')
      }
      x--;
    }
    return false;
  })
})
