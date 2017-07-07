/**
 * Created by jyj on 2017/7/4.
 */

function base_readAvator(domClick) {

    Logger.debug(domClick.value)
    Logger.debug($(domClick)[0].files[0])
    var file = $(domClick)[0].files[0];
    var fileSize = (file.size / 1024 / 1024);
    var fileName = file.name;
    var fileExt = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();//文件后缀名
    Logger.debug(fileExt)
    if (fileExt !== '.jpg' && fileExt !== '.jpeg' && fileExt !== '.png') {
        domClick.value = ''
        return false
    }
    if (fileSize > 5) {
        $('.errorSize').html("<p>上传文件超过5兆</p>")
        setTimeout(function () {
            $('.errorSize p').fadeOut()
        }, 5000)
        setTimeout(function () {
            $('.errorSize').html('')
        }, 5000)
        domClick.value = ''
        return
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    console.debug(reader)
    reader.onload = function (e) {
        showimg(this.result)
        window.sessionStorage["baseImg"] = this.result
        if (fileExt === '.jpg' || fileExt === '.jpeg' || fileExt === '.png') {
            $(domClick).parent().parent().find('#base_register-view').html('<img class="img" data-name=' + fileName + ' src="' + this.result + '" alt="" width="180" height="180"/><span class="baseInfo_sign" data-role="delete-file" onclick="javascript:base_remove_img(this)">&times;<span>');
        }
        $(domClick).parent().parent().find('.base_sign').show();
    }
    Logger.debug($(this).parent().find('lable'))
    $(domClick).attr('disabled', 'disabled')
    $(domClick).attr('data_upload', 'already_uploaded')
    if ($(domClick).parent().find('.error').attr("class") === "error") {
        $(domClick).parent().find('.error').detach();
    }
    $(domClick).parent().find('.lable').css("opacity", 0);

    var formdata = new FormData();
    formdata.append("file", $(domClick)[0].files[0]);
    var url = contextPath + '/creator/upload/file.json'
    $.ajax({
        type: 'post',
        url: url,
        data: formdata,
        cache: false,
        processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
        contentType: false, // 不设置Content-type请求头
        success: function (data) {
            if (data.status === 200 && data.data.localMessage !== '') {
                window.sessionStorage['avatar'] = data.data.localMessage
            }
        }
    })
}
function showimg(data) {
    $("#show_img").append("<img id = 'showImg' class = 'hide' src='' />");
    $('#showImg').attr('src', data)
}
//删除图片
function base_remove_img(targetName){
    Logger.debug($(targetName))

    $("#show_img").html('');
    $('.errorImg').addClass('hide')
    $('.uploadImg').addClass('hide')
    $(targetName).hide();
    $(targetName).parent().find('.img').detach();
    var domName = $(targetName).parent().parent().find('input').attr('id');
    dom_show(domName,targetName)
    $(targetName).parent().parent().find('.lable').css('opacity',1);
    if(window.sessionStorage["avatar"]){
        var avatar = window.sessionStorage["avatar"]
        avatar = avatar.replace('/download/','');
        console.debug(avatar)
        var url = contextPath+'/creator/delete/file/'+ avatar+'.json'
        $.ajax({
            type: 'delete',
            url: url,
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
}

function dom_show(domName,targetName){
    if($(targetName).parent().parent().find('input').attr('id') === domName){
        var h='';
        $(targetName).parent().parent().find('input').detach();
        $(targetName).parent().parent().find('label').remove();
        h+='<input class="form-control '+domName+'" type="file" id="'+domName+'" name="'+domName+'" accept="image/jpeg,image/png,img/jpg" onchange="base_readAvator(this)">';
        h+='<label class="lable lable-pic base_lable"></label>'
        $(targetName).parent().parent().find('.base_upfilebox').append(h);
    }
}


