/**
 * Created by yjx on 2017/7/5.
 */
/**
 * Created by user on 2017/7/3.
 */
$().ready(function () {

    $('.album').on('click',function(){
        window.location.href = contextPath + '/views/worksmanagement/singles_details.jsp';
    })

    $('.single_album ').on('click',function(){
        $('.album').removeClass('active');
        window.location.href = contextPath + '/views/worksmanagement/statistics.jsp';
    })

    //回显单曲信息
    var copyrightData='';
    var param=window.sessionStorage["song_data_id"]
    param = {
        id: param
    };
    param = JSON.stringify(param)
    $.ajax({
        type: 'post',
        data: param,
        url: contextPath+'/music/special/song',
        async: false,//默认为true
        contentType: 'application/json',//默认为application/x-www-form-urlencoded
        dataType: 'json',//默认为预期服务器返回的数据类型
        processData: false,//默认为true*/
        beforeSend: function (data) {

        },
        success: function (data) {
            if (data !== undefined && data !== '' ) {
                 copyrightData=data.equityList
            }
        }
    });

    console.log(copyrightData)


    function holderHtml(i) {
        var html='';
        html += '<div class="panel panel-default add_holder aaa" id="collapse' + i + '" data-holder-id="' + i + '" >'
        html += '<div class="panel-heading">'
        html += '<div class="panel-title albummusic">'
        html += '<div class="row-xs-height link-cursor submit arrow-drop-up" data-toggle="collapse" data-parent="false" href="#collapseTwo' + i + '">'
        html += '<div class="col-xs-2 col-sm-3 col-md-2 no-padding-horizontal col-xs-height col-middle no-wrap padding-right cursor-move-hover"><span class="hidden-xs">作者</span><span class="num">' + i + ' </span> </div>'
        html += '<div class=" medium gray-dark col-xs-5 col-xs-height col-middle no-wrap text-ellipsis cursor-move-hover"><span class="holder_name"></span></div>'
        html += '<div class="col-xs-3 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap removeclass" data-index=' + i + ' >删除 </span></div>'
        html += '</div> </div> </div>'
        html += '<div id="collapseTwo' + i + '" class="panel-collapse collapse  in">'
        html += ' <div class="panel-body"> <form class="col-xs-12"  role="form" method="get" id="consummate" class="consummate" action=""> <div class="form-group h_name"> <div class="form-group  col-xs-4" id="h_name"> <label for="name"><b class="red">*</b>作者姓名</label> <input type="text" id="name" name="name" data-id="collapse' + i + '"  class="form-control"> </div>'
        html += ' <div class="form-group col-xs-4">'
        html += ' <label for="role"><b class="red">*</b>角色</label>'
        html += ' <select class="form-control role"><option value="作词">作词</option><option value="作曲">作曲</option><option value="词曲">词曲</option><option value="编曲">编曲</option></select> </div>'
        html += ' <div class="form-group col-xs-4 " id="h_income"> <label for="income"><b class="red">*</b>收益分配%</label> <input type="text" id="income"  data-incom="num" placeholder="请输入分配比例" name="income" class="form-control" > </div>'
        html += '<div class="form-group col-xs-4"> <label for="name"><b class="red">*</b>版权发行</label> <select class="form-control copyright" name="copyright"><option value="001">自有版权(自行发布)</option><option value="010">公共版权(无发行商)</option><option value="011">已发布版权(由发行商管理)</option></select> </div> </div> </form> </div> </div> </div>'
        return html;
    }



    function generateContent(i, song) {//拿到歌曲每一条数据
        var html = "";
        var display = ""
        console.log(song)
        if (i === undefined) {//如果对象为空，生成第一条就要展开
            i = 1;
        }
        if (song === undefined) {
            displayIndex = i;
            display = displayClass;
            return holderHtml(i)
        }else {
            html += '<div class="panel panel-default add_holder aaa" id="collapse' + i + '" data-holder-id="' + i + '" data-song="'+song.id+'" data-music="'+song.songId+'">'
            html += '<div class="panel-heading">'
            html += '<div class="panel-title albummusic">'
            html += '<div class="row-xs-height link-cursor submit arrow-drop-up" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo' + i + '">'
            html += '<div class="col-xs-2 col-sm-3 col-md-2 no-padding-horizontal col-xs-height col-middle no-wrap padding-right cursor-move-hover"><span class="hidden-xs">作者</span><span class="num">' + i + ' </span> </div>'
            html += '<div class=" medium gray-dark col-xs-5 col-xs-height col-middle no-wrap text-ellipsis cursor-move-hover"><span class="holder_name">'+song.holderName+'</span></div>'
            html += '<div class="col-xs-3 text-blue regular col-xs-height col-middle cursor-move-hover"> <span class="no-wrap removeclass" data-index=' + i + ' data-song="'+song.id+'">删除 </span></div>'
            html += '</div> </div> </div>'
            html += '<div id="collapseTwo' + i + '" class="panel-collapse collapse ' + display + '">'
            html += ' <div class="panel-body"> <form class="col-xs-12"  role="form" method="get" id="consummate" class="consummate" action=""> <div class="form-group "> <div class="form-group  col-xs-4"> <label for="name"><b class="red">*</b>作者姓名</label> <input type="text" id="name" name="name" value="'+song.holderName+'" data-id="collapse' + i + '"  class="form-control"> </div>'
            html += ' <div class="form-group col-xs-4 " id="h_role">'
            html += ' <label for="role"><b class="red">*</b>角色</label>'
            if(song.role==='作词'){
                html += ' <select class="form-control role"><option value="作词">作词</option><option value="作曲">作曲</option><option value="词曲">词曲</option><option value="编曲">编曲</option></select> </div>'
            }else if(song.role==='作曲'){
                html += ' <select class="form-control role"><option value="作词">作词</option><option value="作曲" selected="selected">作曲</option><option value="词曲">词曲</option><option value="编曲">编曲</option></select> </div>'
            }else if(song.role==='词曲'){
                html += ' <select class="form-control role"><option value="作词">作词</option><option value="作曲">作曲</option><option value="词曲" selected="selected">词曲</option><option value="编曲">编曲</option></select> </div>'
            }else if(song.role==='编曲'){
                html += ' <select class="form-control role"><option value="作词">作词</option><option value="作曲">作曲</option><option value="词曲">词曲</option><option value="编曲"  selected="selected">编曲</option></select> </div>'
            }
            html += ' <div class="form-group col-xs-4" id="h_income"> <label for="income"><b class="red">*</b>收益分配%</label> <input type="text" id="income" data-incom="num" value="'+song.allocationProportion+'" placeholder="请输入分配比例" name="income" class="form-control" > </div>'
            if(song.type==='001'){
                html += '<div class="form-group col-xs-4"> <label for="name"><b class="red">*</b>版权发行</label> <select class="form-control copyright" name="copyright"><option value="001" selected="selected">自有版权(自行发布)</option><option value="010">公共版权(无发行商)</option><option value="011">已发布版权(由发行商管理)</option></select> </div> </div> </form> </div> </div> </div>'
            }else if(song.type==='010'){
                html += '<div class="form-group col-xs-4"> <label for="name"><b class="red">*</b>版权发行</label> <select class="form-control copyright" name="copyright"><option value="001">自有版权(自行发布)</option><option value="010" selected="selected">公共版权(无发行商)</option><option value="011">已发布版权(由发行商管理)</option></select> </div> </div> </form> </div> </div> </div>'
            }else if(song.type==='011'){
                html += '<div class="form-group col-xs-4"> <label for="name"><b class="red">*</b>版权发行</label> <select class="form-control copyright" name="copyright"><option value="010">公共版权(无发行商)</option><option value="001">自有版权(自行发布)</option><option value="011" selected="selected">已发布版权(由发行商管理)</option></select> </div> </div> </form> </div> </div> </div>'
            }
            return html;
        }

    }






    $(document).on("keyup", ".panel .in  [name=name]", function () {
        var item_id = $(this).attr('data-id');
        var div_id = $('.panel .in').parents().attr('id');
        if (item_id === div_id) {
            $($('#' + div_id + ' .holder_name')).html($(" .panel .in  [name=name]").val())
        }
    });

    $(document).on("keyup", ".panel .in [name=income]", function () {
        $('[data-incom="num"]').whaleNumber({type:'money'});
    });


    $(document).on("input  propertychange", "input[name=income]",  function () {
        $('.sum').html('');
        var sum = 0;
        $('input[name=income]').each(function (i,item) {
            var value = parseInt($(item).val().replace('%'));
            sum += value;

        });
        if(isNaN(sum)===true){
            $('.sum').html(0+'%');
        }else{
            $('.sum').html(sum+'%');
        }


    });

    $(document).on('click','.panel .in [name=name]',function () {
        $('.panel .in #name-error').remove();
    })
    $(document).on('click','.panel .in [name=income]',function () {
        $('.panel .in #income-error').remove();
        $('.panel .in #hincome-error').remove();
    })



    function gettingData(index) {
        var context;
        $('.add_holder').each(function (i, item) {
            if (i == index - 1) {
                context = $(item);
                return;
            }
        })
        var id=context.attr('data-song');
        var holderName = context.find('[name=name]').val();
        var role = context.find('.role').val();
        var allocationProportion = context.find('[name=income]').val();
        var type = context.find('[name=copyright]').val();
        var songId=context.attr('data-music')
        var addholderid = context.attr('data-holder-id')
        if (holderName===''){
            $('.panel .in #name-error').remove();
            $('.panel .in #h_name').append('<label id="name-error" class="error" for="name" style="color: red">作者姓名不能为空</label>');
        }
        if (allocationProportion===''){
            $('.panel .in #income-error').remove();
            $('.panel .in #hincome-error').remove();
            $('.panel .in #h_income').append('<label id="income-error" class="error" for="income" style="color: red">收益分配不能为空</label>');
        }
        var k=/^(\d{1,2}(\.\d{1,1})?|100)$/;
        var thisValue=allocationProportion;
        console.log(k.test(thisValue));
        if(holderName===''||allocationProportion==''||k.test(thisValue)===false){
            throw Error("参数验证不通过");
        }else{
            return {
                id:id,
                songId:window.sessionStorage['song_data_id'],
                holderName:holderName,
                role:role,
                allocationProportion:allocationProportion,
                type:type,
            }
        }
    }
    var isOpen  = false;//有且仅有一行能展开
    var song_title = window.sessionStorage['song_title'];//获取歌曲的名称
    var songholder = new Array();
    var songCount = 0;
    var displayIndex = 0;//展开的面板的index
    var displayClass = "in";//面板是否展开

    var albumSong = {
        getHolderList: function () {//获取权利人
            var list = JSON.parse(window.sessionStorage["songholder"] || '[]');
            if (list.length > 0) {
                return list;
            }
            var index = window.sessionStorage['lyriceID'];//获取歌曲的索引
            var song = copyrightData;//获取歌曲列表\
            console.log(song)
            return song//获取权利人数组
        },
        init: function () {/*页面初始化*/
            $('#accordion').html('');

            //修改歌曲名称
            $('.song_name').html(song_title);


            //获取回显数据
            songholder = albumSong.getHolderList();

            function generateList(songholder) {//生成歌曲列表
                var html = "";
                if (songholder === undefined || songholder.length <= 0) {
                    // html = generateContent()
                    $('#accordion').append(html);
                } else {
                    for (var i = 0; i < songholder.length; i++) {
                        html = generateContent(i + 1, songholder[i]);
                        $('#accordion').append(html);
                    }
                }

            }

            //执行生成面板的代码
            generateList(songholder);
            songCount = songholder.length;
        },
        reload: function () {
            $('#accordion').html('');

            //修改歌曲名称
            $('.song_name').html(song_title);

            //获取回显数据
            songholder = JSON.parse(window.sessionStorage["songholder"] || '[]');

            function generateList(songholder) {//生成歌曲列表
                var html = "";
                if (songholder === undefined || songholder.length <= 0) {
                    // html = generateContent()
                    $('#accordion').append(html);
                } else {
                    for (var i = 0; i < songholder.length; i++) {
                        html = generateContent(i + 1, songholder[i]);
                        $('#accordion').append(html);
                    }
                }
            }

            //执行生成面板的代码
            generateList(songholder);
            songCount = songholder.length;
        },
        saveData: function () {//保存数据到单曲中
            if (songholder.length < 0) {
                return;
            }

            var index = window.sessionStorage['lyriceID'];//获取歌曲的索引
            // songs[index - 1].data['equityList'] = songholder;


        },
        saveTempData: function () {
            //保存临时数据
            if (displayIndex <= 0) {
                return;
            }


            var param = gettingData(displayIndex);
            songholder.splice(displayIndex - 1, 1, param);
            window.sessionStorage["songholder"] = JSON.stringify(songholder)
            songCount = songholder.length;
        },
        deleteData: function (i) {
            songholder.splice(i - 1, 1);
            window.sessionStorage["songholder"] = JSON.stringify(songholder)
            songCount = songholder.length;
        },
        open: function (index) {//展开面板
            if (index <= 0) {
                return;
            }
            $('.add_holder ').each(function (i, item) {
                var context = $(item).find('#collapseTwo' + index);
                if (i == index - 1) {
                    context.addClass(displayClass);
                    displayIndex = index;
                }
            })

        },
        close: function () {//折叠面板
            if (displayIndex <= 0) {
                return;
            }
            $('.add_holder').each(function (i, item) {
                var context = $(item).find('#collapseTwo' + displayIndex);
                if (i == displayIndex - 1) {
                    context.removeClass(displayClass);
                }
            })
        },
        add: function () {//添加歌曲
            songCount = songholder.length;
            $('#accordion').append(generateContent(songCount + 1));
            isOpen = true;
            $('.panel-title').on('click', function () {
                var index = $(this).find('.num').html();
                if (index == displayIndex) {
                    albumSong.saveTempData();
                }
            });
        },
        centum:function () {
            $('.sum').html('');
            var sum = 0;
            $('input[name=income]').each(function (i,item) {
                var value = parseInt($(item).val().replace('%'));
                sum += value;
            });
            $('.sum').html(sum+'%');
        }
    }

    albumSong.init();//初始化页面
    albumSong.centum();

    $('.btn-info ').on('click', function () {//点击添加作者
        albumSong.saveTempData();//保存临时数据
        albumSong.close();//关闭正在展开的
        albumSong.add();
    })

    $(document).on('hide.bs.collapse','.panel-collapse',function () {//隐藏
        try{
            albumSong.saveTempData();

        }catch (e){
            return false;
        }
    });

    $(document).on('show.bs.collapse','.panel-collapse',function () {//展开
        var index = $(this).parent().find('.num').html();
        try{
            albumSong.saveTempData();
            albumSong.close();
            displayIndex = index;
        }catch (e){
            return false;
        }
    });

    function testRegx() {
        $('.panel .in #hincome-error').remove();
        $(document).on("input  propertychange", "input[name=income]", function () {
            $('.panel .in #hincome-error').remove();
            var k=/^(\d{1,2}(\.\d{1,1})?|100)$/;
            var thisValue=$(this).val();
            console.log(k.test(thisValue));
            if(k.test(thisValue)===false){
                $('.panel .in #hincome-error').remove();
                $('.panel .in #h_income').append('<label id="hincome-error" class="error" for="income" style="color: red">请输入小于或等于100的数字</label>');
                return false
            }else{

            }
        });
    }
    testRegx()




    //删除歌曲
    $('#accordion').on('click', '.removeclass', function (event) {
        event.stopPropagation();
        var i = $(this).attr('data-index');
        var songId=$(this).attr('data-song');
        var delete_copyright=''
        delete_copyright={
            id:songId
        }
        delete_copyright = JSON.stringify(delete_copyright)
        $.ajax({
            type: 'post',
            data: delete_copyright,
            url: contextPath+'/music/role/delete',
            async: false,//默认为true
            contentType: 'application/json',//默认为application/x-www-form-urlencoded
            dataType: 'json',//默认为预期服务器返回的数据类型
            processData: false,//默认为true*/
            beforeSend: function (data) {

            },
            success: function (data) {
            }
        });
        albumSong.deleteData(i);
        albumSong.reload();
        albumSong.centum();


        if (i < displayIndex) {
            displayIndex--;
        } else if (i == displayIndex) {
            displayIndex = 0;
        }


    });

    $('.btn-success').on('click', function () {//在保存临时数据的时候就应该验证

        var Maxvalue_num=$('.sum').html();
        var value_num=parseInt(Maxvalue_num.replace('%'))
        if (value_num<100){
            $('.income').remove();
            $('.widget_num').append('<label class="income" class="error" for="income" style="color: red">不等于100%</label>')
            return false
        }else if(value_num>100){
            $('.income').remove();
            $('.widget_num').append('<label class="income" class="error" for="income" style="color: red">不等于100%</label>')
            return false
        }else if(value_num==100){
            $('.income').remove();
        }

        albumSong.saveTempData();//保存临时数据
        // albumSong.close();//关闭展开的
        albumSong.saveData();
        console.log(copyrightData)
        var musicData=window.sessionStorage["songholder"]
        console.log(musicData)
        var Modify_music_data=''
        if(musicData===''||musicData===undefined){
            Modify_music_data=JSON.stringify(copyrightData)
            console.log(copyrightData)
        }else{
            Modify_music_data=musicData
        }
        $.ajax({
            type: 'post',
            data: Modify_music_data,
            url: contextPath+'/music/role/update',
            async: false,//默认为true
            contentType: 'application/json',//默认为application/x-www-form-urlencoded
            dataType: 'json',//默认为预期服务器返回的数据类型
            processData: false,//默认为true*/
            beforeSend: function (data) {

            },
            success: function (data) {
                window.sessionStorage.removeItem('songholder');//移除权利人数据
                window.sessionStorage.removeItem('song_title');//移除歌名
                window.sessionStorage.removeItem("lyriceID");//移除index
                window.location.href = contextPath + "/views/worksmanagement/album_details.jsp";
            }
        });

    });



});