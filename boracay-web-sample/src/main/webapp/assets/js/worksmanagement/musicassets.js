/**
 * Created by yugang on 2017/5/25.
 */
$().ready(function() {
  $('.single').on('click',function(){
    $('.create').html('创建单曲')
  })
  $('.album').on('click',function(){
    $('.create').html('创建专辑')
  })
  $('.create').on('click',function(){
    location.href = contextPath + '/views/worksmanagement/addalbum.jsp'
  })
  $('#myTabContent').find('tbody tr').on('click',function(){
    location.href = contextPath + '/views/worksmanagement/modify_album.jsp'
    var albumId = '2c3222c52a7d4330872f665204fb1704'
    window.sessionStorage['album_song_id'] = albumId
  })

  //专辑分页
  var album_list = $('#album').DataTable({
    "searchable": true,
    "processing": true,
    "ordering": true, //允许排序
    "serverSide": true,
    "stateSave": true,
    "ajax": {
      url: contextPath + "/album/search.json",
      dataSrc: function(json){
        if(json.albums == null){
          json.albums = []
        }
        return json.albums
      },
      type: 'post',
      data: function (data) {
        //var selectedVal=$("#date").val();
        console.debug(data);
        data.typeId =  $('#album_type').val();
        data.styleId = $('#album_style').val();
        data.publishTimeInterval = $('#publish_time').val();
        data.publishStatus = $('#publish_status').val();
        data.createdTimeInterval = $('#create_time').val();
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
      {"data": "id"},
      {"data": "cover"},
      {"data": "name"},
      {"data": "performerName"},
      {"data": "companyName"},
      {"data": "upcEanJan"},
      {"data": "publishTime"},
      {"data": "id"},
    ],
    "columnDefs": [{
      orderable: false,
      targets: [0,1,2,5,7]
    }, {
      "render": function (data, type, row) {
        return data == null || data == '' ? '<img src="' + contextPath + '/assets/imgs/raccoon_logo.jpg" width="55" height="55">' : '<img src="'+contextPath + data + '" width="55" height="55">'
      },
      "targets": 1
    }, {
      "render": function (data, type, row) {
        return data == null || data == '' ? '' : '<p style="width:150px;height:20px;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">'+data+'</p>'
      },
      "targets": 4
    },{
      "render": function (data, type, row) {
        return '<label class="ck"><input name="sCheckbox" type="checkbox" class="form-control select-use" value="'+data+'"></label>'
      },
      "targets": 0
    }, {
      "render": function (data, type, row) {
        return '<span class="btn btn-primary album_delete_separately" id = "' + data + '">删除</span>'
      },
      "targets": 7
    },{
      "render": function (data, type, row) {
        return  data == null? '' : '<p>'+formatDate(new Date(data))+'</p>'
      },
      "targets": 6
    }
    ],
    "drawCallback": function(){
      $('#album th:first').removeClass('sorting_asc');
      selectAll();
      del_separately();
      albumDetail();
    },
      select: true
  })
  //专辑筛选
  onload($('#album_type'),album_list)
  onload($('#publish_time'),album_list)
  onload($('#create_time'),album_list)
  onload($('#publish_status'),album_list)
  onload($('#album_style'),album_list)

  //获取流派
  HttpUtils.get_style(function(data){
    var style_list = data
    var html = ''
    $(style_list).each(function(i,item){
      html += '<option value = "'+$(item)[0].id+'">'+$(item)[0].text+'</option>'
    })
    $('#album_style').append('<option value = "">全部</option>' + html)
  })
  //获取专辑类型
  HttpUtils.get_albumType(function(data){
    var type_list = data
    var html = ''
    $(type_list).each(function(i,item){
      html += '<option value = "'+$(item)[0].id+'">'+$(item)[0].text+'</option>'
    })
    $('#album_type').append('<option value = "">全部</option>' + html)
  })
  //折叠
  var flag = 0
  $('.album_screen').on('click',function(){
    if(flag == 0){
      flag ++
      $('.screen_content').removeClass('hide')
    }else{
      flag = 0
      $('.screen_content').addClass('hide')
    }
  })
  //重置
  $('.albumReset').on('click',function(){
    $('#album_style option:first').prop('selected',true)
    $('#album_type option:first').prop('selected',true)
    $('#publish_status option:first').prop('selected',true)
    $('#create_time option:first').prop('selected',true)
    $('#publish_time option:first').prop('selected',true)
    album_list.ajax.reload();
  })
  //批量删除
  $('#selectAll').on('click',function(){
    $(this).is(':checked')?$('.select-use').prop('checked',true):$('.select-use').prop('checked',false)
  })

  function selectAll(){
    $('#selectAll').is(':checked')?$('#selectAll').prop('checked',false):$('#selectAll').prop('checked',false)
  }
  $('.album_batch_delete').on('click',function(){
    var checkLength = $('.select-use:checked');
    console.log(checkLength.length)
    if(checkLength.length<1){
      $('#delete_warn').modal('open');
      return
    }
    var html = ''
    $.each($('.select-use:checked'),function(i,item){
      console.log($(item).parent().parent().parent().find('td:nth-child(3)').text())
      html += '<div class="media"><div class="media-left"><img class="del-img" width="55" height="55" src="'+$(item).parent().parent().next().find('img').attr('src')+'"></div>'
      html += '<div class="media-body"><h4 class="media-heading">'+$(item).parent().parent().parent().find('td:nth-child(3)').text()+'</h4></div></div>'
    })
    $('#delete_album_list').modal('open')
    $('.album_delete_content').html('')
    $('.album_delete_content').append(html)
  })
  $('.del_confirm').on('click',function(){
    var arr = [];//id数组
    $.each($('.select-use:checked'),function(i,item) {
      arr.push($(item).val());
    })
    var albumIds = arr.join(',');
    var del_album_url = contextPath + '/album/deletebatch/' + albumIds + '.json'
    $.ajax({
      type: 'delete',
      url: del_album_url,
      async: false,//默认为true
      contentType: 'application/json',//默认为application/x-www-form-urlencoded
      dataType: 'json',//默认为预期服务器返回的数据类型
      processData: false,//默认为true*!/
      success: function (data) {
        if(data.status == '200'){
          var dataSource = data.data.localMessage
          if(dataSource){
            dataSource = JSON.parse(dataSource)
            var temp = ''
            $(dataSource).each(function(i,item){
              if($(item)[0].filePath == null){
                temp += '<div class="media"><div class="media-left"><img class="del-img" width="55" height="55" src="' + contextPath + '/assets/imgs/raccoon_logo.jpg"></div>'
              }else{
                temp += '<div class="media"><div class="media-left"><img class="del-img" width="55" height="55" src="'+contextPath+$(item)[0].filePath+'"></div>'
              }
              temp += '<div class="media-body"><h4 class="media-heading">'+$(item)[0].albumName+'</h4></div></div>'
            })
            $('#noDelete_album_list').modal('open')
            $('.album_noDelete_content').html('')
            $('.album_noDelete_content').append(temp)
          }
          album_list.ajax.reload();
        }
      },
      error: function (data) {
        console.log(data)
      }
    })
  })
  //单独删除专辑
  function del_separately() {
    $('.album_delete_separately').on('click', function (event) {
      event.stopPropagation()
      var data_src = $(this).parent().parent().find('img').attr('src');
      var name = $(this).parent().parent().find('td:nth-child(3)').text();
      var html = ''
      html += '<div class="media"><div class="media-left"><img class="del-img" width="55" height="55" src="'+$(this).parent().parent().find('img').attr('src')+'"></div>'
      html += '<div class="media-body"><h4 class="media-heading">'+$(this).parent().parent().find('td:nth-child(3)').text()+'</h4></div>'
      $('#delete_album_separately').modal('open')
      $('.album_deleteSeparately_content').html('')
      $('.album_deleteSeparately_content').append(html)
      var albumId = $(this).attr('id');
      $('.del_separately_confirm').attr('data-id',albumId)
      $('.del_separately_confirm').attr('data-src',data_src)
      $('.del_separately_confirm').attr('data-name',name)
    })
  }
  $('.del_separately_confirm').on('click',function(){
    var albumId = $(this).attr('data-id')
    var data_name = $(this).attr('data-name')
    var data_src = $(this).attr('data-src')
    var del_separately_url = contextPath + '/album/delete/' + albumId + '.json'
    $.ajax({
      type: 'delete',
      url: del_separately_url,
      async: false,//默认为true
      contentType: 'application/json',//默认为application/x-www-form-urlencoded
      dataType: 'json',//默认为预期服务器返回的数据类型
      processData: false,//默认为true*!/
      success: function (data) {
        if(data.status == '200'){
          album_list.ajax.reload();
        }
      },
      error: function (data) {
        if(data.status == '500'){
          var html = ''
          html += '<div class="media"><div class="media-left"><img class="del-img" width="55" height="55" src="'+data_src+'"></div>'
          html += '<div class="media-body"><h4 class="media-heading">'+data_name+'</h4></div>'
          $('#noDelete_album_separately').modal('open')
          $('.album_noDeleteSeparately_content').html('')
          $('.album_noDeleteSeparately_content').append(html)
        }
      }
    })
  })
  function albumDetail(){
    $('#album').find('tbody tr').on('click',function(){
      var album_song_id = $(this).find('td:first .select-use').val()
      window.sessionStorage['album_song_id'] = album_song_id
      location.href = contextPath + '/views/worksmanagement/modify_album.jsp'
    })
  }

  //歌曲筛选
  var single_list = $('#singleSong').DataTable({
    "searchable": true,
    "processing": true,
    "ordering": true, //允许排序
    "serverSide": true,
    "stateSave": true,
    "ajax": {
      url : contextPath + "/music/special/search.json",
      dataSrc : function(json){
        if(json.songs == null){
          json.songs = [];
        }
        return json.songs
      },
      type : 'post',
      data : function (data) {
        //var selectedVal=$("#date").val();
        console.debug(data);
        data.recordId =  $('#record_companyList').val();
        data.type = $('#single_publishTime').val();
        data.creaTime = $('#single_createdTime').val();
        data.styleId = $('#single_style').find('option:selected').text();
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
      {"data": "id"},
      {"data": "title"},
      {"data": "singerName"},
      {"data": "isrc"},
      {"data": "style"},
      {"data": "count"},
      {"data": "duration"},
      {"data": "id"},
      {"data": "wav_file"},
    ],
    "columnDefs": [{
      orderable: false,
      targets: [0,1,3,4,7,8]
    }, {
     "render": function (data, type, row) {
     return '<label class="ck"><input name="sCheckbox" type="checkbox" class="form-control select-single-use" value="'+data+'"></label>'
     },
     "targets": 0
     }, {
     "render": function (data, type, row) {
     return '<p>'+data+'</p>'
     },
     "targets": 5
     }, {
     "render": function (data, type, row) {
     return '<span class="btn btn-primary" id = "' + data + '" onclick = "del_performer(\'' + data + '\',this)">删除</span>'
     },
     "targets": 7
     },{
      "render": function (data, type, row) {
        return '<p class="hide wive">'+data+'</p>'
      },
      "targets": 8
    }
    ],
    "drawCallback": function(){
      $('#singleSong th:last').removeClass('sorting_desc');
      $('#singleSong th:first').removeClass('sorting_asc');
      single_select();
    },
    select: true
  })
  //批量删除单曲
  $('#single_selectAll').on('click',function(){
    $(this).is(':checked')?$('.select-single-use').prop('checked',true):$('.select-single-use').prop('checked',false)
  })
  function single_select(){
    $('#single_selectAll').is(':checked')?$('#single_selectAll').prop('checked',false):$('#single_selectAll').prop('checked',false)
  }
  $('.single_batch_delete').on('click',function(){
    var single_checkLength = $('.select-single-use:checked');
    console.log(single_checkLength.length)
    if(single_checkLength.length<1){
      $('#delete_warn').modal('open');
      return
    }
    var html = ''
    $.each($('.select-single-use:checked'),function(i,item){
      console.log($(item).parent().parent().parent().find('td:nth-child(2)').text())
      html += '<div class="media"><div class="media-left"><img class="del-img" width="55" height="55" src="' + contextPath + '/assets/imgs/raccoon_logo.jpg"></div>'
      html += '<div class="media-body"><h4 class="media-heading">'+$(item).parent().parent().parent().find('td:nth-child(2)').text()+'</h4></div></div>'
    })
    $('#delete_single_list').modal('open')
    $('.single_delete_content').html('')
    $('.single_delete_content').append(html)
  })
  $('.del_single_confirm').on('click',function(){
    var single_arr = [];//id数组
    $.each($('.select-single-use:checked'),function(i,item) {
      var obj = {}
      obj.id = $(item).val()
      obj.wavFile = $(item).parent().parent().parent().find('.wive').html();
      single_arr.push(obj)
    })
    var songEntity = single_arr;
    console.log(songEntity)
    var param = songEntity
    param = JSON.stringify(param)
    console.log(param)
    var del_single_url = contextPath + '/music/special/daleteSongs'
    $.ajax({
      type: 'post',
      url: del_single_url,
      data: param,
      async: false,//默认为true
      contentType: 'application/json',//默认为application/x-www-form-urlencoded
      dataType: 'json',//默认为预期服务器返回的数据类型
      processData: false,//默认为true*!/
      success: function (data) {
        if(data.status == '200'){
          single_list.ajax.reload();
          console.log(data)
        }
      },
      error: function (data) {
        console.log(data)
      }
    })
  })

  //歌曲筛选
  onload($('#record_companyList'),single_list)
  onload($('#single_style'),single_list)
  onload($('#single_publishTime'),single_list)
  onload($('#single_createdTime'),single_list)
  //获取唱片公司
  HttpUtils.get_recordCompany(function(data){
    var recordCompany_list = data
    var temp = ''
    $(recordCompany_list).each(function(i,item){
      temp += '<option value = "'+$(item)[0].id+'">'+$(item)[0].text+'</option>'
    })
    $('#record_companyList').append('<option value = "-1">全部</option>' + temp)
  })
  //获取流派
  HttpUtils.get_style(function(data){
    var style_list = data
    var html = ''
    $(style_list).each(function(i,item){
      html += '<option value = "'+$(item)[0].id+'">'+$(item)[0].text+'</option>'
    })
    $('#single_style').append('<option value = "-1">全部</option>' + html)
  })
  //折叠
  var temp = 0
  $('.single_screen').on('click',function(){
    if(temp == 0){
      temp ++
      $('.single_content').removeClass('hide')
    }else{
      temp = 0
      $('.single_content').addClass('hide')
    }
  })
  //重置
  $('.single_reset').on('click',function(){
    $('#single_style option:first').prop('selected',true)
    $('#record_companyList option:first').prop('selected',true)
    $('#single_publishTime option:first').prop('selected',true)
    $('#single_createdTime option:first').prop('selected',true)
    single_list.ajax.reload()
  })

  function onload(dom,node){
    $(dom).on('change',function(){
      node.ajax.reload();
    })
  }
  //转换成时间格式
  function formatDate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  };
  //默认列表状态
  /*if(window.sessionStorage['dataTables-musicAssets']){
    album_list.state.clear();
    window.location.reload();
    window.sessionStorage.removeItem('dataTables-musicAssets')
  }*/
  /*album_list.search('',true,false)
  $('.dataTables_filter').find('input').val('')*/

  //离开当前页面提示
  var jump_url = null
  var leftBar = $('.sidebar-nav').find('li')
  $(leftBar).each(function(i,item){
    $(item).on('click',function(){
      jump_url = $(this).find('a').attr('href')
      if(jump_url == 'javascript:void(0)'){
        /*single_list.ajax.reload();*/
        album_list.stateSave(false);
        //album_list.search('',true,false).draw()
        //$('.dataTables_filter').find('input').val('')
       // jump_url = contextPath + '/views/performers/performers.jsp'
      }
      /*single_list.ajax.reload();*/
      album_list.stateSave(false);
      //album_list.search('',true,false).draw()
      //$('.dataTables_filter').find('input').val('')
    })
  })
})
