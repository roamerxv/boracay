/**
 * Created by yangjiaxin on 2017/6/12.
 */

/**
 * Created by yangjiaxin on 2017/6/12.
 */
$().ready(function () {
    /*添加权利人*/
    var panel_title = []
    var data_source = window.sessionStorage['param']
    console.log(data_source)
    var panel_group = $(".aaa");
    var k = panel_group.length;
    var songCount=0;
    var holderid=0
    $('.btn-info').on('click',function () {

        var name=$('.panel .in [name=name]').val();
        var role=$('.panel .in [name=role]').val();
        var income=$('.panel .in [name=income]').val();
        var copyright=$('.panel .in [name=copyright]').val();
        if(name==''|| role=='' || income==''|| copyright==''){
            return
        }
        if(k >= 0) {
            var html = '';
            songCount++;
            holderid++
            console.log(songCount)
            html+='<div class="panel panel-default add_holder aaa" id="collapse'+songCount+'" data-holder-id="'+holderid+'">'
            html+='<div class="panel-heading">'
            html+='<div class="panel-title">'
            html+='<div class="row-xs-height link-cursor submit arrow-drop-up" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo'+songCount+'">'
            html+='<div class="col-xs-2 col-sm-3 col-md-2 no-padding-horizontal col-xs-height col-middle no-wrap padding-right cursor-move-hover"><span class="hidden-xs">权利人</span><span class="num">' + songCount + ' </span> </div>'
            html+='<div class=" medium gray-dark col-xs-5 col-xs-height col-middle no-wrap text-ellipsis cursor-move-hover"><span class="holder_name"></span></div>'
            html+='<div class="col-xs-3 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap removeclass">删除 </span></div>'
            html+='</div> </div> </div>'
            html+='<div id="collapseTwo'+songCount+'" class="panel-collapse collapse in">'
            html+=' <div class="panel-body"> <form class="col-xs-12"  role="form" method="get" id="consummate" class="consummate" action=""> <div class="form-group "> <div class="form-group  col-xs-4"> <label for="name"><b class="red">*</b>作者姓名</label> <input type="text" id="name" name="name" data-id="collapse'+songCount+'" class="form-control"> </div>'
            html+=' <div class="form-group col-xs-4">'
            html+=' <label for="role"><b class="red">*</b>角色</label>'
            html+=' <select class="form-control role"><option value="作词人">作词</option><option value="作曲人">作曲</option><option value="编曲人">编曲</option><option value="制作人">制作</option></select> </div>'
            html+=' <div class="form-group col-xs-4"> <label for="income"><b class="red">*</b>收益分配%</label> <input type="text" id="income" placeholder="请输入分配比例" name="income" class="form-control" > </div>'
            html+='<div class="form-group col-xs-4"> <label for="name"><b class="red">*</b>版权发行</label> <select class="form-control copyright" name="copyright"><option value="自有版权(自行发布)">自有版权(自行发布)</option><option value="公共版权(无发行商)">公共版权(无发行商)</option><option value="已发布版权(由发行商管理)">已发布版权(由发行商管理)</option></select> </div> </div> </form> </div> </div> </div>'
            k++;
        }
        $('#accordion').append(html)

        $(document).on("keyup",".panel .in  [name=name]",function(){
            var item_id= $(this).attr('data-id');
            var div_id= $('.panel .in').parents().attr('id');
            if(item_id === div_id){
                $($('#' +div_id+' .holder_name')).html($(" .panel .in  [name=name]").val())
            }
        });
        //控制折叠
        if(songCount >1){
            $('#collapseTwo'+songCount).parent().prev().find('.panel-collapse').removeClass('in')
            $('#collapseTwo'+songCount).addClass('in')
        }
    })


    $(document).on("keyup",".panel .in  [name=name]",function(){
        var item_id= $(this).attr('data-id');
        var div_id= $('.panel .in').parents().attr('id');
        if(item_id === div_id){
            $($('#' +div_id+' .holder_name')).html($(" .panel .in  [name=name]").val())
        }
    });

    // 提交数据

     var songholder= new Array()

     $('.btn-success').on('click',function () {
             var name=$('[name=name]').val();
             var role=$('.role').val();
             var income=$('[name=income]').val();
             var copyright=$('[name=copyright]').val();
             var addholderid=$('.panel .in').parents().parents().attr('data-holder-id')
             //前端验证
             console.log(addholderid)
             if (name===''){
             $('.panel .in #name-error').remove();
             $('.panel .in .h_name').append('<label id="name-error" class="error" for="name" style="color: red">作者姓名不能为空</label>');
             }
             if(role===''){
             $('.panel .in #role-error').remove();
             $('.panel .in .h_role').append('<label id="role-error" class="error" for="role" style="color: red">角色不能为空</label>');
             }
             if (income===''){
             $('.panel .in #income-error').remove();
             $('.panel .in .h_income').append('<label id="income-error" class="error" for="income" style="color: red">收益分配不能为空</label>');
             }
             if(copyright===''){
             $('.panel .in #copyright-error').remove();
             $('.panel .in .h_copyright').append('<label id="copyright-error" class="error" for="copyright" style="color: red">版权发行不能为空</label>');

             }
             if(name==''|| role=='' || income==''|| copyright==''){
             return
             }

             var obj={
             addholderid:addholderid,
             name :name,
             role : role,
             income :income,
             copyright :copyright,
             }
             songholder.push(obj)
             var lyriceID=window.sessionStorage['lyriceID']
             var music_list_song=window.sessionStorage["param"]
             var music_list= JSON.parse(music_list_song)
             for(i=0;i<music_list.length;i++) {
             if(music_list[i].songid ==lyriceID){
                 music_list[i].holder=songholder
                 var param = JSON.stringify(music_list)
             window.sessionStorage["param"]= param;
                }
             }
             console.log(songholder)
             var param = JSON.stringify(songholder)
             window.sessionStorage["songholder"]= param;
             window.location.href = contextPath + "/views/worksmanagement/lyrics_copyright.jsp";
     });



    /*点击添加权利人保存信息*/
    function addRightdata() {
         var name=$('.panel .in [name=name]').val();
         var role=$('.panel .in .role').val();
         var income=$('.panel .in [name=income]').val();
         var copyright=$('.panel .in [name=copyright]').val();
         var addholder_id=$(".panel .in").parents().attr("data-holder-id");
         //前端验证
         if (name===''){
         $('.panel .in #name-error').remove();
         $('.panel .in .h_name').append('<label id="name-error" class="error" for="name" style="color: red">作者名不能为空</label>');
         }
         if(role===''){
         $('.panel .in #role-error').remove();
         $('.panel .in .h_role').append('<label id="role-error" class="error" for="role" style="color: red">角色不能为空</label>');
         }
         if (income===''){
         $('.panel .in #income-error').remove();
         $('.panel .in .h_income').append('<label id="income-error" class="error" for="income" style="color: red">收益分配不能为空</label>');
         }
         if(copyright===''){
         $('.panel .in #copyright-error').remove();
         $('.panel .in .h_copyright').append('<label id="copyright-error" class="error" for="copyright" style="color: red">版权发行不能为空</label>');

         }
         if(name==''|| role=='' || income==''|| copyright==''){
         return
         }

         var obj={
             addholderid:addholder_id,
             name :name,
             role : role,
             income :income,
             copyright :copyright,
         }
        songholder.push(obj)

        var song=JSON.stringify(songholder)
         window.sessionStorage['song']=songholderdata
         // console.log(songholderdata)
         // if(songholderdata){
         // songholder= JSON.parse(songholderdata)
         //     songholder.push({
         //         addholderid:addholder_id,
         //         name :name,
         //         role : role,
         //         income :income,
         //         copyright :copyright,
         //     })
         //     console.log(songholder)
         //     var param = JSON.stringify(songholder)
         //     window.sessionStorage["songholder"]= param;
         //
         //     }else{
         //     console.log(songholder)
         //         songholder.push({
         //         addholderid:addholder_id,
         //         name :name,
         //         role : role,
         //         income :income,
         //         copyright :copyright,
         //         })
         //     console.log(songholder)
         //     var param = JSON.stringify(songholder)
         //     window.sessionStorage["songholder"]= param;
         //     }
         }

         $('.btn-info').on('click',function () {
             alert(1)
             addRightdata();
         })



    //删除
    $("body").on("click",".removeclass", function(){
        $(this).parent().parent().parent().parent().parent().remove();
        var number = $('.num')
        var panel_collapse = $('.panel-collapse')
        $(panel_collapse).each(function(i,item){
            $(item).removeAttr('id')
            $(item).attr('id','collapseTwo'+(i+1))
        })
        var panel_aaa = $('.aaa')
        $(panel_aaa).each(function(i,item){
            $(item).removeAttr('id')
            $(item).attr('id','collapse'+(i+1))
        })
        var submit = $('.submit')
        $(submit).each(function(i,item){
            $(item).removeAttr('href')
            $(item).attr('href','#collapseTwo'+(i+1))
        })
        $(number).each(function(i,item){
            $(item).html(i+1)
        })
        songCount--;
        console.log(songCount)
        return false;
    });




    //回显权利人信息
    /*var holderData= window.sessionStorage["param"];
     var lyriceID=window.sessionStorage['lyriceID']
     if(holderData !== undefined || holderData !=='') {
     var param = JSON.parse(holderData)
     var songCount = 0;
     var song_html = '';
     var holderid=0;
     var num=0;
     console.log(param)

     for(var i=0;i<param.length;i++){
     if(param[i].songid==lyriceID){
     var add_holder=param[i].holder
     var html=[];
     for(var j=0;j<add_holder.length;j++){
     console.log(add_holder);
     songCount++;
     holderid++;
     html+='<div class="panel panel-default add_holder" id="collapse'+songCount+'" data-holder-id="'+holderid+'">'
     html+='<div class="panel-heading">'
     html+='<div class="panel-title">'
     html+='<div class="row-xs-height link-cursor submit arrow-drop-up" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo'+songCount+'">'
     html+='<div class="col-xs-2 col-sm-3 col-md-2 no-padding-horizontal col-xs-height col-middle no-wrap padding-right cursor-move-hover"><span class="hidden-xs">作者</span><span class="num">' + num + ' </span> </div>'
     html+='<div class=" medium gray-dark col-xs-5 col-xs-height col-middle no-wrap text-ellipsis cursor-move-hover"><span class="holder_name"></span></div>'
     html+='<div class="col-xs-3 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap removeclass">删除 </span></div>'
     html+='</div> </div> </div>'
     html+='   <div id="collapseTwo'+songCount+'"" class="panel-collapse collapse">'
     html+=' <div class="panel-body"> <form class="col-xs-12"  role="form" method="get" id="consummate" class="consummate" action=""> <div class="form-group "> <div class="form-group  col-xs-4"> <label for="name"><b class="red">*</b>作者姓名</label> <input type="text" id="name" name="name" value="'+add_holder[j].name+'" data-id="collapse'+songCount+'" class="form-control"> </div>'
     html+=' <div class="form-group col-xs-4">'
     html+=' <label for="role"><b class="red">*</b>角色</label>'
     html+='</select> <select class="form-control role"><option value="作词">作词</option><option value="作曲">作曲</option><option value="编曲">编曲</option><option value="制作">制作</option></select> </div>'
     html+=' <div class="form-group col-xs-4"> <label for="income"><b class="red">*</b>收益分配%</label> <input type="text" id="income" name="income" class="form-control" value="'+add_holder[j].income+'" > </div>'
     html+='<div class="form-group col-xs-4"> <label for="name"><b class="red">*</b>版权发行</label> <input type="text" id="copyright" value="'+add_holder[j].copyright+'" name="copyright" class="form-control" > </div> </div> </form> </div> </div> </div>'
     }
     $('#accordion').append(html)
     }else{

     }
     }
     }*/


    //修改权利人信息
    /*$(document).on('click', '.panel-title', function () {
     var _this = this;
     var aria_expanded = $(_this).find('.row-xs-height').attr('aria-expanded')
     var song_titleid = $(_this).parent().parent().attr('id')
     console.log(song_titleid)
     if (aria_expanded === 'false') {
     var holderData = window.sessionStorage["param"];
     console.log(holderData)
     var lyriceID = window.sessionStorage['lyriceID']
     var addholder_id = $('#' + song_titleid + ' .panel').parents().attr("data-holder-id");

     var name = $('#' + song_titleid).find("[name=name]").val()
     console.log(name)
     var role = $('#' + song_titleid + ' .role').val()
     var income = $('#' + song_titleid).find("[name=income]").val()
     var copyright = $('#' + song_titleid).find("[name=copyright]").val()
     flag = 0
     var addholder_id = $('#' + song_titleid).attr("data-holder-id");
     var music_list_song = window.sessionStorage["param"]
     window.sessionStorage["addholder_id"] = addholder_id;
     var dataid = window.sessionStorage['addholder_id']
     var holder_list = JSON.parse(music_list_song)
     console.log(holder_list)
     for (i = 0; i < holder_list.length; i++) {
     if (holder_list[i].songid == lyriceID) {
     var add_holder = holder_list[i].holder
     for (var j = 0; j < add_holder.length; j++) {
     if (add_holder[j].addholderid == addholder_id) {
     add_holder[j].name = name,
     add_holder[j].role = role;
     add_holder[j].income = income;
     add_holder[j].copyright = copyright;
     var param = JSON.stringify(holder_list)
     window.sessionStorage["param"] = param;
     console.log(param)
     return false
     }
     }
     }
     }
     if (addholder_id === dataid) {
     add_holder.push({
     addholderid: addholder_id,
     name: name,
     income: income,
     copyright: copyright,
     role: role,
     })

     window.sessionStorage["param"] = param;
     }
     } else {
     holder_list.push({
     addholderid: addholder_id,
     name: name,
     income: income,
     copyright: copyright,
     role: role,
     })
     console.log(holder_list)
     var param = JSON.stringify(holder_list)
     window.sessionStorage["param"] = param;
     }
     return flag

     })*/


    //删除
    /*$("body").on("click",".removeclass", function(e){
     var index= $(this).parent().parent().parent().parent().parent().attr('data-holder-id');
     console.log(index)
     $(this).parent().parent().parent().parent().parent().remove();
     var remove_holder =  window.sessionStorage["param"]
     console.log(remove_holder)
     var lyriceID  = window.sessionStorage['lyriceID']
     var remove_holderData= JSON.parse(remove_holder)
     Logger.debug(remove_holderData)
     for(var i=0; i<remove_holderData.length;i++){
     if(remove_holderData[i].songid== lyriceID){
     var remove_holder = remove_holderData[i].holder
     for (var j = 0; j < remove_holder.length; j++){
     if(remove_holder[i].addholderid== index){
     remove_holder.splice(i,1);
     }
     }
     }
     }
     remove_holderData= JSON.stringify(remove_holderData)
     console.log(remove_holderData)
     window.sessionStorage['param'] = remove_holderData
     num--;
     $('#accordion').find('.dynamicList ').each(function(i,item){
     if(num>=i){
     $(item).find('.num').html(i+1);
     }

     })
     console.log( num)
     return false;
     });*/

    /*$(item).on('click',function(){
     console.log($(this))
     })*/
    var check = false
    $(document).on('click', '.panel-title', function () {
        var _this = this
        if($(_this).parent().parent().find('#name').val() == ''){
            /*console.log($(_this).parent().parent().find('.panel-collapse'))
             $(_this).unbind("click");*/
            check = true
        }
    })
})





















// $().ready(function () {
//     /*添加权利人*/
//     var panel_group = $(".aaa");
//     var k = panel_group.length;
//     var songCount=0;
//     var holderid=0
//     $('.btn-info').on('click',function () {
//
//             var name=$('.panel .in [name=name]').val();
//             var role=$('.panel .in [name=role]').val();
//             var income=$('.panel .in [name=income]').val();
//             var copyright=$('.panel .in [name=copyright]').val();
//             if(name==''|| role=='' || income==''|| copyright==''){
//                 return
//             }
//         if(k >= 0) {
//             var html = [];
//             songCount++;
//             holderid++
//             html+='<div class="panel panel-default add_holder aaa" id="collapse'+songCount+'" data-holder-id="'+holderid+'">'
//             html+='<div class="panel-heading">'
//             html+='<div class="panel-title">'
//             html+='<div class="row-xs-height link-cursor submit arrow-drop-up" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo'+songCount+'">'
//             html+='<div class="col-xs-2 col-sm-3 col-md-2 no-padding-horizontal col-xs-height col-middle no-wrap padding-right cursor-move-hover"><span class="hidden-xs">权利人</span><span class="num">' + songCount + ' </span> </div>'
//             html+='<div class=" medium gray-dark col-xs-5 col-xs-height col-middle no-wrap text-ellipsis cursor-move-hover"><span class="holder_name"></span></div>'
//             html+='<div class="col-xs-3 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap removeclass">删除 </span></div>'
//             html+='</div> </div> </div>'
//             if(k==0){
//                 html+='<div id="collapseTwo'+songCount+'" class="panel-collapse collapse in">'
//             }else if(k>=1){
//                 html+='<div id="collapseTwo'+songCount+'" class="panel-collapse collapse">'
//             }
//             html+=' <div class="panel-body"> <form class="col-xs-12"  role="form" method="get" id="consummate" class="consummate" action=""> <div class="form-group "> <div class="form-group  col-xs-4"> <label for="name"><b class="red">*</b>作者姓名</label> <input type="text" id="name" name="name" data-id="collapse'+songCount+'" class="form-control"> </div>'
//             html+=' <div class="form-group col-xs-4">'
//             html+=' <label for="role"><b class="red">*</b>角色</label>'
//             html+=' <select class="form-control role"><option value="作词人">作词</option><option value="作曲人">作曲</option><option value="编曲人">编曲</option><option value="制作人">制作</option></select> </div>'
//             html+=' <div class="form-group col-xs-4"> <label for="income"><b class="red">*</b>收益分配%</label> <input type="text" id="income" name="income" class="form-control" > </div>'
//             html+='<div class="form-group col-xs-4"> <label for="name"><b class="red">*</b>版权发行</label> <input type="text" id="copyright" name="copyright" class="form-control" > </div> </div> </form> </div> </div> </div>'
//             k++;
//         }
//         $('#accordion').append(html)
//
//         $(document).on("keyup",".panel .in  [name=name]",function(){
//             var item_id= $(this).attr('data-id');
//             var div_id= $('.panel .in').parents().attr('id');
//             if(item_id === div_id){
//                 $($('#' +div_id+' .holder_name')).html($(" .panel .in  [name=name]").val())
//             }
//         });
//     })
//
//
//     $(document).on("keyup",".panel .in  [name=name]",function(){
//         var item_id= $(this).attr('data-id');
//         var div_id= $('.panel .in').parents().attr('id');
//         if(item_id === div_id){
//             $($('#' +div_id+' .holder_name')).html($(" .panel .in  [name=name]").val())
//         }
//     });
//
//     // 提交数据
//
//     var songholder= new Array()
//
//     $('.btn-success').on('click',function () {
//         var name=$('[name=name]').val();
//         var role=$('.role').val();
//         var income=$('[name=income]').val();
//         var copyright=$('[name=copyright]').val();
//         var addholderid=$('.panel .in').parents().parents().attr('data-holder-id')
//         //前端验证
//         console.log(addholderid)
//         if (name===''){
//             $('.panel .in #name-error').remove();
//             $('.panel .in .h_name').append('<label id="name-error" class="error" for="name" style="color: red">作者姓名不能为空</label>');
//         }
//         if(role===''){
//             $('.panel .in #role-error').remove();
//             $('.panel .in .h_role').append('<label id="role-error" class="error" for="role" style="color: red">角色不能为空</label>');
//         }
//         if (income===''){
//             $('.panel .in #income-error').remove();
//             $('.panel .in .h_income').append('<label id="income-error" class="error" for="income" style="color: red">收益分配不能为空</label>');
//         }
//         if(copyright===''){
//             $('.panel .in #copyright-error').remove();
//             $('.panel .in .h_copyright').append('<label id="copyright-error" class="error" for="copyright" style="color: red">版权发行不能为空</label>');
//
//         }
//         if(name==''|| role=='' || income==''|| copyright==''){
//             return
//         }
//
//         var obj={
//             addholderid:addholderid,
//             name :name,
//             role : role,
//             income :income,
//             copyright :copyright,
//         }
//         songholder.push(obj)
//         var lyriceID=window.sessionStorage['lyriceID']
//         var music_list_song=window.sessionStorage["param"]
//         var music_list= JSON.parse(music_list_song)
//         for(i=0;i<music_list.length;i++) {
//             if(music_list[i].songid ==lyriceID){
//                 music_list[i].holder=songholder
//                 var param = JSON.stringify(music_list)
//                 window.sessionStorage["param"]= param;
//             }
//         }
//         console.log(songholder)
//         var param = JSON.stringify(songholder)
//         window.sessionStorage["songholder"]= param;
//         window.location.href = contextPath + "/views/worksmanagement/lyrics_copyright.jsp";
//     });
//
//
//
//     /*点击添加权利人保存信息*/
//     function addRightdata() {
//         var name=$('.panel .in [name=name]').val();
//         var role=$('.panel .in .role').val();
//         var income=$('.panel .in [name=income]').val();
//         var copyright=$('.panel .in [name=copyright]').val();
//         var addholder_id=$(".panel .in").parents().attr("data-holder-id");
//         //前端验证
//         if (name===''){
//             $('.panel .in #name-error').remove();
//             $('.panel .in .h_name').append('<label id="name-error" class="error" for="name" style="color: red">作者名不能为空</label>');
//         }
//         if(role===''){
//             $('.panel .in #role-error').remove();
//             $('.panel .in .h_role').append('<label id="role-error" class="error" for="role" style="color: red">角色不能为空</label>');
//         }
//         if (income===''){
//             $('.panel .in #income-error').remove();
//             $('.panel .in .h_income').append('<label id="income-error" class="error" for="income" style="color: red">收益分配不能为空</label>');
//         }
//         if(copyright===''){
//             $('.panel .in #copyright-error').remove();
//             $('.panel .in .h_copyright').append('<label id="copyright-error" class="error" for="copyright" style="color: red">版权发行不能为空</label>');
//
//         }
//         if(name==''|| role=='' || income==''|| copyright==''){
//             return
//         }
//
//         var obj={
//             addholderid:addholder_id,
//             name :name,
//             role : role,
//             income :income,
//             copyright :copyright,
//         }
//        var songholderdata=window.sessionStorage['songholder']
//             console.log(songholderdata)
//         if(songholderdata){
//             songholder= JSON.parse(songholderdata)
//             songholder.push({
//                 addholderid:addholder_id,
//                 name :name,
//                 role : role,
//                 income :income,
//                 copyright :copyright,
//             })
//             console.log(songholder)
//             var param = JSON.stringify(songholder)
//             window.sessionStorage["songholder"]= param;
//         }else{
//             console.log(songholder)
//             songholder.push({
//                 addholderid:addholder_id,
//                 name :name,
//                 role : role,
//                 income :income,
//                 copyright :copyright,
//             })
//             console.log(songholder)
//             var param = JSON.stringify(songholder)
//             window.sessionStorage["songholder"]= param;
//         }
//     }
//     var addflag =0;
//     if(window.sessionStorage["addflag"]){
//         flag=window.sessionStorage["addflag"]
//     }else{
//         flag =0;
//     }
//
//     $('.btn-info').on('click',function () {
//         flag++;
//         if(flag ==0) {
//
//         }else if(flag>1){
//             addRightdata();
//         }
//
//     })
//
//     var flag =0;
//     if(window.sessionStorage["flag"]){
//         flag=window.sessionStorage["flag"]
//     }else{
//         flag =0;
//     }
//     $('.btn-submit').on('click',function () {
//         song_type();
//         music_type();
//         flag++;
//         if(flag ==0) {
//
//         }else if(flag>1){
//             gettingData()
//             song_type();
//             music_type();
//         }
//     })
//
//
//     //删除
//     $("body").on("click",".removeclass", function(e){
//         $(this).parent().parent().parent().parent().parent().remove();
//         i--;
//         var number = $('.num')
//         $(number).each(function(i,item){
//           $(item).html(i+1)
//         })
//         songCount--;
//         console.log(i)
//         return false;
//     });
//
//
//     //回显权利人信息
//     var holderData= window.sessionStorage["param"];
//     var lyriceID=window.sessionStorage['lyriceID']
//     if(holderData !== undefined || holderData !=='') {
//         var param = JSON.parse(holderData)
//         var songCount = 0;
//         var song_html = '';
//         var holderid=0;
//         var num=0;
//         console.log(param)
//
//       for(var i=0;i<param.length;i++){
//             if(param[i].songid==lyriceID){
//                 var add_holder=param[i].holder
//                 var html=[];
//                 for(var j=0;j<add_holder.length;j++){
//                     console.log(add_holder);
//                     songCount++;
//                     holderid++;
//                     html+='<div class="panel panel-default add_holder" id="collapse'+songCount+'" data-holder-id="'+holderid+'">'
//                     html+='<div class="panel-heading">'
//                     html+='<div class="panel-title">'
//                     html+='<div class="row-xs-height link-cursor submit arrow-drop-up" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo'+songCount+'">'
//                     html+='<div class="col-xs-2 col-sm-3 col-md-2 no-padding-horizontal col-xs-height col-middle no-wrap padding-right cursor-move-hover"><span class="hidden-xs">作者</span><span class="num">' + num + ' </span> </div>'
//                     html+='<div class=" medium gray-dark col-xs-5 col-xs-height col-middle no-wrap text-ellipsis cursor-move-hover"><span class="holder_name"></span></div>'
//                     html+='<div class="col-xs-3 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap removeclass">删除 </span></div>'
//                     html+='</div> </div> </div>'
//                     html+='   <div id="collapseTwo'+songCount+'"" class="panel-collapse collapse">'
//                     html+=' <div class="panel-body"> <form class="col-xs-12"  role="form" method="get" id="consummate" class="consummate" action=""> <div class="form-group "> <div class="form-group  col-xs-4"> <label for="name"><b class="red">*</b>作者姓名</label> <input type="text" id="name" name="name" value="'+add_holder[j].name+'" data-id="collapse'+songCount+'" class="form-control"> </div>'
//                     html+=' <div class="form-group col-xs-4">'
//                     html+=' <label for="role"><b class="red">*</b>角色</label>'
//                     html+='</select> <select class="form-control role"><option value="作词">作词</option><option value="作曲">作曲</option><option value="编曲">编曲</option><option value="制作">制作</option></select> </div>'
//                     html+=' <div class="form-group col-xs-4"> <label for="income"><b class="red">*</b>收益分配%</label> <input type="text" id="income" name="income" class="form-control" value="'+add_holder[j].income+'" > </div>'
//                     html+='<div class="form-group col-xs-4"> <label for="name"><b class="red">*</b>版权发行</label> <input type="text" id="copyright" value="'+add_holder[j].copyright+'" name="copyright" class="form-control" > </div> </div> </form> </div> </div> </div>'
//                 }
//                 $('#accordion').append(html)
//             }else{
//
//             }
//         }
//     }
//
//
//     //修改权利人信息
//     $(document).on('click', '.panel-title', function () {
//         var _this = this;
//         var aria_expanded = $(_this).find('.row-xs-height').attr('aria-expanded')
//         var song_titleid = $(_this).parent().parent().attr('id')
//         console.log(song_titleid)
//         if (aria_expanded === 'false') {
//             var holderData = window.sessionStorage["param"];
//             var lyriceID = window.sessionStorage['lyriceID']
//             var addholder_id = $('#' + song_titleid + ' .panel').parents().attr("data-holder-id");
//
//             var name = $('#' + song_titleid).find("[name=name]").val()
//             console.log(name)
//             var role = $('#' + song_titleid + ' .role').val()
//             var income = $('#' + song_titleid).find("[name=income]").val()
//             var copyright = $('#' + song_titleid).find("[name=copyright]").val()
//             flag = 0
//             var addholder_id = $('#' + song_titleid).attr("data-holder-id");
//             var music_list_song = window.sessionStorage["param"]
//             window.sessionStorage["addholder_id"] = addholder_id;
//             var dataid = window.sessionStorage['addholder_id']
//             var holder_list = JSON.parse(music_list_song)
//             console.log(holder_list)
//             for (i = 0; i < holder_list.length; i++) {
//                 if (holder_list[i].songid == lyriceID) {
//                     var add_holder = holder_list[i].holder
//                     for (var j = 0; j < add_holder.length; j++) {
//                         if (add_holder[j].addholderid == addholder_id) {
//                             add_holder[j].name = name,
//                                 add_holder[j].role = role;
//                             add_holder[j].income = income;
//                             add_holder[j].copyright = copyright;
//                             var param = JSON.stringify(holder_list)
//                             window.sessionStorage["param"] = param;
//                             console.log(param)
//                             return false
//                         }
//                     }
//                 }
//             }
//             if (addholder_id === dataid) {
//                 add_holder.push({
//                     addholderid: addholder_id,
//                     name: name,
//                     income: income,
//                     copyright: copyright,
//                     role: role,
//                 })
//
//                 window.sessionStorage["param"] = param;
//             }
//         } else {
//             holder_list.push({
//                 addholderid: addholder_id,
//                 name: name,
//                 income: income,
//                 copyright: copyright,
//                 role: role,
//             })
//             console.log(holder_list)
//             var param = JSON.stringify(holder_list)
//             window.sessionStorage["param"] = param;
//         }
//         return flag
//
//     })
//
//
//     //删除
//     $("body").on("click",".removeclass", function(e){
//         var index= $(this).parent().parent().parent().parent().parent().attr('data-holder-id');
//         console.log(index)
//         $(this).parent().parent().parent().parent().parent().remove();
//         var remove_holder=window.sessionStorage["param"]
//         var lyriceID=window.sessionStorage['lyriceID']
//         var remove_holderData= JSON.parse(remove_holder)
//         Logger.debug(remove_holderData)
//         for(var i=0; i<remove_holderData.length;i++){
//             if(remove_holderData[i].songid== lyriceID){
//                 var remove_holder = remove_holderData[i].holder
//                  for (var j = 0; j < remove_holder.length; j++){
//                      if(remove_holder[i].addholderid== index){
//                          remove_holder.splice(i,1);
//                      }
//                  }
//             }
//         }
//         remove_holderData= JSON.stringify(remove_holderData)
//         window.sessionStorage['param']=remove_holderData
//         num--;
//         $('#accordion').find('.dynamicList ').each(function(i,item){
//             if(num>=i){
//                 $(item).find('.num').html(i+1);
//             }
//
//         })
//         console.log( num)
//         return false;
//     });
// })
