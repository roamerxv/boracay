/**
 * Created by jyj on 2017/7/7.
 */
function front_readFile_view(domClick){
    //var _this=this
    Logger.debug(domClick.value)
    Logger.debug($(domClick)[0].files[0])
    var file = $(domClick)[0].files[0];
    var fileSize = (file.size/1024/1024);
    var fileName=file.name;
    var fileExt = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();//文件后缀名
    Logger.debug(fileExt)
    if(fileSize > 5){
        $('.errorsize').html("<p>上传文件超过5兆</p>")
        setTimeout(function(){
            $('.errorsize p').fadeOut()
        },2000)
        setTimeout(function(){
            $('.errorSize').html('')
        },2000)
        domClick.value = ''
        return
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    console.debug(reader)
    reader.onload = function(e){
        show_front_view(this.result)
        window.sessionStorage["baseImg"] = this.result
        if(fileExt==='.jpg' || fileExt==='.jpeg' || fileExt==='.png'){
            $(domClick).parent().parent().find('#card_front_view').html('<img class="img" data-name='+fileName+' src="'+this.result+'" alt="" width="360px" height="230px"/><span class="baseInfo_sign" data-role="delete-file" onclick="javascript:base_remove_img(this)">&times;<span>');
        }else{
            $(domClick).parent().parent().find('#card_front_view').html('<a target="_blank" class="img filed" download="true">'+fileName+'</a><span class="sign" data-role="delete-file" onclick="javascript:base_remove_img(this)">&times;</span>');
        }
        $(domClick).parent().parent().find('.base_sign').show();
    }
    Logger.debug($(this).parent().find('lable'))
    $(domClick).attr('disabled','disabled')
    $(domClick).attr('data_upload','already_uploaded')
    if($(domClick).parent().find('.error').attr("class") === "error"){
        $(domClick).parent().find('.error').detach();
    }
    $(domClick).parent().find('.lable').css("opacity",0);

}

function show_front_view(data){
    $("#show_front_view").append("<img id = 'showImg' class = 'hide' src='' />");
    $('#showImg').attr('src',data)
}

//删除图片
function base_remove_img(targetName){
    Logger.debug($(targetName))
    window.sessionStorage.removeItem('baseImg')
    $("#show_front_view").html('');
    $('.errorImg').addClass('hide')
    $('.uploadImg').addClass('hide')
    $(targetName).hide();
    $(targetName).parent().find('.img').detach();
    var domName = $(targetName).parent().parent().find('input').attr('id');
    dom_show(domName,targetName)
    $(targetName).parent().parent().find('.lable').css('opacity',1);
}

function dom_show(domName,targetName){
    if($(targetName).parent().parent().find('input').attr('id') === domName){
        var h='';
        $(targetName).parent().parent().find('input').detach();
        $(targetName).parent().parent().find('label').remove();
        h+='<input class="form-control '+domName+'" type="file" id="'+domName+'" name="'+domName+'" accept="image/bmp,image/jpeg,image/png" onchange="front_readFile_view(this)">';
        h+='<label class="lable lable-pic base_lable"></label>'
        $(targetName).parent().parent().find('.base_upfile_box').append(h);
    }
}