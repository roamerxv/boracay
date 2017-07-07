/**
 * Created by yugang on 2017/7/4.
 */
$().ready(function(){
  var performer_list = $('#performer_list').DataTable({
    "searchable": true,
    "processing": true,
    "ordering": true, //允许排序
    "serverSide": true,
    "stateSave": true,
    "ajax": {
      url: contextPath + "/performer/page.json",
      dataSrc: 'performerList',
      type: 'post',
      data: function (data) {
        //var selectedVal=$("#date").val();
        console.debug(data);
        data.timeType = '' ;
        data.musicGenreId = '';
        data.recordId = '';
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
      {"data": "genreName"},
      {"data": "createdTime"},
      {"data": "id"},
    ],
    "columnDefs": [{
      orderable: false,
      targets:[0,1,2,4]
    }, {
      "render": function (data, type, row) {
        return data == null || data == '' ? '<img src="' + contextPath + '/assets/imgs/raccoon_logo.jpg" width="55" height="55">' : '<img src="'+contextPath + data + '" width="55" height="55">'
      },
      "targets": 0
    }, {
      "render": function (data, type, row) {
        return data == null || data == '' ? '' : '<p style="width:150px;height:20px;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">'+data+'</p>'
      },
      "targets": 2
    }, {
      "render": function (data, type, row) {
        return data == null || data == '' ? '' : '<p style="width:150px;height:20px;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">'+data+'</p>'
      },
      "targets": 1
    },{
      "render": function (data, type, row) {
        return '<p class="hide">'+data+'</p>'
      },
      "targets": 4
    }
    ],
    "drawCallback": function(){
      view();
    },
    select: true
  })

  //跳转详情
  function view(){
    $('#performer_list tbody tr').on('click',function(){
      var performer_Id = $(this).find('td:last p').html()
      console.log(performer_Id)
      window.sessionStorage['performerListId'] = performer_Id
      location.href = contextPath + '/views/performers/echo_performer.jsp'
    })
  }
})
