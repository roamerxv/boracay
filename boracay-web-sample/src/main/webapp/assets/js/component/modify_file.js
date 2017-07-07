/**
 * Created by yugang on 2017/6/12.
 */
/**
 * Created by yugang on 2017/5/23.
 */
function modify_readFile(domClick){
  //var _this=this
  Logger.debug(domClick.value)
  console.log($(domClick)[0].files[0])
  window.sessionStorage['fileMessage'] = $(domClick)[0].files[0]
  var file = $(domClick)[0].files[0];
  var fileSize = (file.size/1024/1024);
  var fileName=file.name;
  var fileExt = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();//文件后缀名
  Logger.debug(fileExt)
  if(fileExt !=='.jpg' && fileExt !=='.jpeg'  && fileExt !=='.png'){
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
  console.log(reader)
  reader.onload = function(e){
    showimg(this.result)
    window.sessionStorage["baseImg"] = this.result
    if(fileExt==='.jpg' || fileExt==='.jpeg' || fileExt==='.png'){
      $(domClick).parent().parent().find('#modify_register-view').html('<img class="img" data-name='+fileName+' src="'+this.result+'" alt="" width="180" height="180"/><span class="modify_sign" data-role="delete-file" onclick="javascript:modify_remove_img(this)">&times;<span>');
    }else{
      $(domClick).parent().parent().find('#modify_register-view').html('<a target="_blank" class="img filed" download="true">'+fileName+'</a><span class="sign" data-role="delete-file" onclick="javascript:record_remove_img(this)">&times;</span>');
    }
    $(domClick).parent().parent().find('.modify_sign').show();
  }
  Logger.debug($(this).parent().find('lable'))
  $(domClick).attr('disabled','disabled')
  $(domClick).attr('data_upload','already_uploaded')
  if($(domClick).parent().find('.error').attr("class") === "error"){
    $(domClick).parent().find('.error').detach();
  }
  $(domClick).parent().find('.lable').css("opacity",0);
  if(window.sessionStorage['pic_fileId']){
    var formdata=new FormData( );
    formdata.append("file" , $(domClick)[0].files[0]);
    formdata.append("fileId" , window.sessionStorage['pic_fileId']);
    var url = contextPath + '/album/upload'
    $.ajax({
      type : 'post',
      url : url,
      data : formdata,
      cache : false,
      processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
      contentType : false, // 不设置Content-type请求头
      success : function(data){
        if(data.status === 200 && data.data.fileId !== ''){
          var fileId = data.data.fileId
          window.sessionStorage['pic_fileId'] = fileId
        }
      }
    })
  }else {
    var formdata=new FormData( );
    formdata.append("file" , $(domClick)[0].files[0]);
    var url = contextPath + '/album/cover/add'
    $.ajax({
      type : 'post',
      url : url,
      data : formdata,
      cache : false,
      processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
      contentType : false, // 不设置Content-type请求头
      success : function(data){
        console.log(data)
        if(data.status === 200 && data.data.fileId !== ''){
          var fileId = data.data.fileId
          var albumId = data.data.albumId
          window.sessionStorage['albumId'] = albumId
          window.sessionStorage['pic_fileId'] = fileId
        }
      }
    })
  }
}

function showimg(data){
  $("#show_img").append("<img id = 'showImg' class = 'hide' src='' />");
  $('#showImg').attr('src',data)
}
//删除图片
function modify_remove_img(targetName){
  window.sessionStorage.removeItem('baseImg')
  $("#show_img").html('');
  $('.errorImg').addClass('hide')
  $('.uploadImg').addClass('hide')
  $(targetName).hide();
  $(targetName).parent().find('.img').detach();
  var domName = $(targetName).parent().parent().find('input').attr('id');
  modify_dom_show(domName,targetName)
  $(targetName).parent().parent().find('.lable').css('opacity',1);
}

function modify_dom_show(domName,targetName){
  if($(targetName).parent().parent().find('input').attr('id') === domName){
    var h='';
    $(targetName).parent().parent().find('input').detach();
    $(targetName).parent().parent().find('label').remove();
    h+='<input class="form-control '+domName+'" type="file" id="'+domName+'" name="'+domName+'" accept="image/jpeg,image/png,image/jpg" onchange="modify_readFile(this)">';
    h+='<label class="lable lable-pic modify_lable"></label>'
    $(targetName).parent().parent().find('.modify_upfilebox').append(h);
  }
}
