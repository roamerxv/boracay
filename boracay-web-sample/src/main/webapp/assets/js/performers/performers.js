/**
 * Created by yugang on 2017/6/19.
 */
$().ready(function() {
  var performer_list = $('#performer_list').DataTable({
    "searchable": true,
    "processing": true,
    "ordering": true, //允许排序
    "serverSide": true,
    "stateSave": true,
    "ajax": {
      url: contextPath + "/performer/page.json",
      dataSrc: function(json){
        if(json.performerList == null){
          json.performerList = []
        }
        return json.performerList
      },
      type: 'post',
      data: function (data) {
        var selectedVal=$("#date").val();
        console.debug(data);
        data.timeType = selectedVal ;
        data.musicGenreId = $('#style').val() == null? '': $('#style').val();
        data.recordId = $('#record_company').val() == null? '' : $('#record_company').val();
        console.debug(data);
        return JSON.stringify(data);
      },
      dataType: "json",
      processData: false,
      contentType: 'application/json;charset=UTF-8'

    },
    "language": {
      "url": contextPath + "/assets/js/lib//DataTables-1.10.15/chinese.lang.json"
    },
    "columns": [
      {"data": "perPic"},
      {"data": "perName"},
      {"data": "companyName"},
      {"data": "genreName"},
      {"data": "createdTime"},
      {"data": "id"},
    ],
    "columnDefs": [{
      orderable: false,
      targets:[0,2,3,5]
    }, {
      "render": function (data, type, row) {
        return data == null || data == '' ? '<img src="' + contextPath + '/assets/imgs/raccoon_logo.jpg" width="55" height="55">' : '<img src="'+contextPath + data + '" width="55" height="55">'
      },
      "targets": 0
    },{
      "render": function (data, type, row) {
        return data == null || data == '' ? '' : '<p style="width:155px;height:20px;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">'+data+'</p>'
      },
      "targets": 1
    },{
      "render": function (data, type, row) {
        return data == null || data == '' ? '' : '<p style="width:155px;height:20px;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">'+data+'</p>'
      },
      "targets": 2
    },{
      "render": function (data, type, row) {
        return data == null || data == '' ? '' : '<p style="width:155px;height:20px;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">'+data+'</p>'
      },
      "targets": 3
    },{
      "render": function (data, type, row) {
        return '<span class="btn btn-primary performer_del" id = "' + data + '">删除</span>'
      },
      "targets": 5
    }
    ],
    "drawCallback": function(){
      $('#performer_list th:first').removeClass('sorting_asc');
      view();
      del_performer();
    },
    select: true
  })
  var flag = 0
  $('#performer_list tbody tr').on('click',function(){
    location.href = contextPath + '/views/performers/echo_performer.jsp'
  })
  $('.newPerformer').on('click',function(){
    location.href = contextPath + '/views/performers/add_newPerformers.jsp'
  })

  //展开折叠
  $('.screen').on('click',function(){
    if(flag == 0){
      flag++
      $('.screen-content').removeClass('hide')
    }else{
      flag = 0
      $('.screen-content').addClass('hide')
    }
  })
  //获取流派
  HttpUtils.get_style(function(data){
    var style_list = data
    var html = ''
    $(style_list).each(function(i,item){
      html += '<option value = "'+$(item)[0].id+'">'+$(item)[0].text+'</option>'
    })
    $('#style').append('<option value = "">全部</option>' + html)
  })
  //唱片公司
  HttpUtils.get_recordCompany(function(data){
    var recordCompany_list = data
    var temp = ''
    $(recordCompany_list).each(function(i,item){
      temp += '<option value = "'+$(item)[0].id+'">'+$(item)[0].text+'</option>'
    })
    $('#record_company').append('<option value = "">全部</option>' + temp)
  })
  //重置
  $('.reset').on('click',function(){
    $('#style option:first').prop('selected',true)
    $('#record_company option:first').prop('selected',true)
    $('#date option:first').prop('selected',true)
    performer_list.ajax.reload();
  })
  $('#style').on('change',function(){
    performer_list.ajax.reload();
  })
  $('#record_company').on('change',function(){
    performer_list.ajax.reload();
  })
  $('#date').on('change',function(){
    performer_list.ajax.reload();
  })
  //跳转详情
  function view(){
    $('#performer_list tbody tr').on('click',function(){
      var performer_Id = $(this).find('td span').attr('id')
      window.sessionStorage['performerListId'] = performer_Id
      location.href = contextPath + '/views/performers/echo_performer.jsp'
    })
  }
  function del_performer(){
    var performer_delete = $('#performer_list').find('.performer_del')
    $(performer_delete).each(function(i,item) {
      $(item).on('click', function (event) {
        event.stopPropagation();
        // recordCompanyId = $(this).attr('id')
        var performerName = $(this).parent().parent().find('td:nth-child(2) p').html()
        var performerId = $(this).attr('id')
        console.log(performerName)
        var html = '<p>确认永久删除吗？</p>'
        $('#performer_del').modal('open')
        $('.performer_delWarn').html('')
        $('.performer_delWarn').append(html)
        $('.performer_del_confirm').attr('data-id',performerId)
        $('.performer_del_confirm').attr('data-name',performerName)
      })
    })
  }
  $('.performer_del_confirm').on('click',function(){
    var del_id = $(this).attr('data-id')
    var data_name = $(this).attr('data-name')
    var del_record_url = contextPath + '/performer/delete/' + del_id +'.json'
    $.ajax({
      type: 'delete',
      url: del_record_url,
      async: false,//默认为true
      contentType: 'application/json',//默认为application/x-www-form-urlencoded
      dataType: 'json',//默认为预期服务器返回的数据类型
      processData: false,//默认为true*!/
      success: function (data) {
        if(data.status == '200'){
          performer_list.ajax.reload()
        }
      },
      error: function (data) {
        if(data.status == '500'){
          $('#performer_associated').modal('open')
          $('.associated-content').html('表演人'+data_name+'已与专辑或歌曲关联，不可删除！')
        }
      }
    })
  })

})
