/**
 * Created by user on 2017/6/22.
 */
$().ready(function () {
    var name=window.sessionStorage["createdId"]
    if(name){
        var songtitle=JSON.parse(name)
        var title=songtitle.inputData.name
        $('.album_title').html(title);
    }else{

    }


    //跳转
    $('.single_album').addClass('active');
    $('.album').removeClass('active');
    $('.album').on('click',function(){
      location.href = contextPath + '/views/worksmanagement/modify_album.jsp'
    })

    $('.confirm').on('click',function(){
        window.sessionStorage.removeItem("createdId")
        window.sessionStorage.removeItem('baseImg')
        window.sessionStorage.removeItem('param')
        window.sessionStorage.removeItem('songholder')
        location.href = contextPath + '/views/homepage/homepage.jsp'
    })
    $('.base_close').on('click',function(){
        window.sessionStorage.removeItem("createdId")
        window.sessionStorage.removeItem('baseImg')
        window.sessionStorage.removeItem('param')
        window.sessionStorage.removeItem('songholder')
        location.href = contextPath + '/views/worksmanagement/musicassets.jsp'
    })
    $('.base_close').on('click',function(){
        window.sessionStorage.removeItem("createdId")
        window.sessionStorage.removeItem('baseImg')
        window.sessionStorage.removeItem('param')
        window.sessionStorage.removeItem('songholder')
    })
    $('.single_lyrics').on('click',function(){
        location.href = contextPath + '/views/worksmanagement/lyrics_copyright.jsp'
    })
    $('.single_save').on('click',function(){
        location.href = contextPath + '/views/worksmanagement/preview_save.jsp'
    })
    $('.prev_step').on('click',function(){
        location.href = contextPath + '/views/worksmanagement/modify_album.jsp'
    })
    $('.next_step').on('click',function(){
        location.href = contextPath + '/views/worksmanagement/lyrics_copyright.jsp'
    })


    //离开当前页面提示
    var jump_url = null
    var leftBar = $('.sidebar-nav').find('li')
    $(leftBar).each(function(i,item){
        $(item).on('click',function(){
            jump_url = $(this).find('a').attr('href')
            if(jump_url == 'javascript:void(0)'){
                jump_url = contextPath + '/views/performers/performers.jsp'
            }
            $('#unSave').modal('open')
            return false
        })
    })

    //跳转
    $('.addPerformers').on('click', function () {
        $('#performers_add').modal({closeViaDimmer: false})
    })
    $('.add_company').on('click', function () {
        $('#record_company_modal').modal({closeViaDimmer: false})
    })

$('.out').on('click',function () {
    $('#login_bar').modal('open')
    return false
})

    $('.Sign_out').on('click',function () {
        window.sessionStorage.removeItem("mobile")
        window.sessionStorage.removeItem('password')
        location.href = contextPath + '/logout'
    })
})
