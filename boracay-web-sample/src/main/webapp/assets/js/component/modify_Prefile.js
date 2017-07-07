/**
 * Created by yugang on 2017/6/20.
 */
/**
 * Created by yugang on 2017/6/14.
 */
function per_readFile(domClick){
  //var _this=this
  Logger.debug(domClick.value)
  Logger.debug($(domClick)[0].files[0])
  var file = $(domClick)[0].files[0];
  var fileSize = (file.size/1024/1024);
  var fileName=file.name;
  var fileExt = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();//文件后缀名
  Logger.debug(fileExt)
  if(fileExt !=='.jpg' && fileExt !=='.jpeg' && fileExt !=='.png'){
    domClick.value = ''
    return false
  }
  if(fileSize > 3){
    $('.errorSize').html("<p>上传文件超过3兆</p>")
    setTimeout(function(){
      $('.errorSize p').fadeOut()
    },5000)
    setTimeout(function(){
      $('.errorSize').html('')
    },5000)
    domClick.value = ''
    return
  }
  var reader = new FileReader();
  reader.readAsDataURL(file);
  console.debug(reader)
  reader.onload = function(e){
    showimg(this.result)
    if(fileExt==='.jpg' || fileExt==='.jpeg' || fileExt==='.png'){
      $(domClick).parent().parent().find('#echo_register-view').html('<img class="img" data-name='+fileName+' src="'+this.result+'" alt="" width="300" height="300"/><span class="sign" data-role="delete-file" onclick="javascript:per_remove_img(this)">&times;<span>');
    }else{
      $(domClick).parent().parent().find('#echo_register-view').html('<a target="_blank" class="img filed" download="true">'+fileName+'</a><span class="sign" data-role="delete-file" onclick="javascript:per_remove_img(this)">&times;</span>');
    }
    $(domClick).parent().parent().find('.sign').show();
  }
  Logger.debug($(this).parent().find('lable'))
  $(domClick).attr('disabled','disabled')
  $(domClick).attr('data_upload','already_uploaded')
  if($(domClick).parent().find('.error').attr("class") === "error"){
    $(domClick).parent().find('.error').detach();
  }
  $(domClick).parent().find('.lable').css("opacity",0);

  var formdata=new FormData( );
  var fileId = window.sessionStorage['fileId']
  fileId = fileId.replace(/download/,'')
  fileId = fileId.replace(/[//]/g,'')
  formdata.append("file" , $(domClick)[0].files[0]);
  formdata.append("fileId",fileId)
   var url = contextPath + '/performer/update/file'
   $.ajax({
     type : 'post',
     url : url,
     data : formdata,
     cache : false,
     processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
     contentType : false, // 不设置Content-type请求头
     success : function(data){
       if(data.status === 200){
         var fileMessage = data.data.localMessage;
         window.sessionStorage['fileId'] = fileMessage
       }
     }
   })
}

function showimg(data){
  $("#show_img").append("<img id = 'showImg' class = 'hide' src='' />");
  $('#showImg').attr('src',data)
}
//删除图片
function per_remove_img(targetName){
  window.sessionStorage.removeItem('baseImg')
  $("#show_img").html('');
  $('.errorImg').addClass('hide')
  $('.uploadImg').addClass('hide')
  $(targetName).hide();
  $(targetName).parent().find('.img').detach();
  var domName = $(targetName).parent().parent().find('input').attr('id');
  pre_dom_show(domName,targetName)
  $(targetName).parent().parent().find('.lable').css('opacity',1);
}

function pre_dom_show(domName,targetName){
  if($(targetName).parent().parent().find('input').attr('id') === domName){
    var h='';
    $(targetName).parent().parent().find('input').detach();
    $(targetName).parent().parent().find('label').remove();
    h+='<input class="form-control '+domName+'" type="file" id="'+domName+'" name="'+domName+'" accept="image/jpeg,image/png,img/jpg" onchange="per_readFile(this)">';
    h+='<label class="lable lable-pic"></label>'
    $(targetName).parent().parent().find('.upfilebox').append(h);
  }
}
