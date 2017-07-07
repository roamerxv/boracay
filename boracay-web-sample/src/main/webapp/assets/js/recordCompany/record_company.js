/**
 * Created by yugang on 2017/6/20.
 */
$().ready(function() {
  var recordCompany_list = $('#recordCompany_list').DataTable({
    "searchable": true,
    "processing": true,
    "ordering": true, //允许排序
    "serverSide": true,
    "stateSave": true,
    "ajax": {
      url: contextPath + "/recordcompanys/list4datatables.json",
      dataSrc: function(json){
        if(json.record_companys == null){
          json.record_companys = []
        }
        return json.record_companys
      },
      type: 'post',
      data: function (data) {
        var selectedVal=$("#dateConditionSelect").val();
        console.debug(data);
        data.dateCondition = selectedVal;
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
      {"data": "covImgUrl"},
      {"data": "name"},
      {"data": "createdTime"},
      {"data": "id"},
    ],
    "columnDefs": [{
      orderable: false,
      targets: [0,3]
    }, {
      "render": function (data, type, row) {
        return data == null || data == '' ? '<img src="' + contextPath + '/assets/imgs/raccoon_logo.jpg" width="55" height="55">' : '<img src="' + data + '" width="55" height="55">'
      },
      "targets": 0
    }, {
        "render": function (data, type, row) {
          return '<p style="width:155px;height:20px;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">'+data+'</p>'
        },
        "targets": 1
      }, {
        "render": function (data, type, row) {
          return '<span class="btn btn-primary recode_del" id = "' + data + '">删除</span>'
        },
        "targets": 3
      }
    ],
    "drawCallback": function(){
      $('#recordCompany_list th:first').removeClass('sorting_asc');
      view();
      del_recordBase();
    },
    select: true
  })

  $('#dateConditionSelect').on('change',function(){
    recordCompany_list.ajax.reload();
  })
  var flag = 0
  $('.screen').on('click',function(){
    if(flag == 0){
      flag++
      $('.screen-content').removeClass('hide')
    }else{
      flag = 0
      $('.screen-content').addClass('hide')
    }

  })
  //跳转查看唱片公司
  function view(){
    $('#recordCompany_list').find('tbody tr').on('click',function(){
      location.href = contextPath + '/views/recordCompany/echo_recordCompany.jsp'
    })
  }
  function del_recordBase(){
    var recordCompany_delete = $('#recordCompany_list').find('.recode_del')
    $(recordCompany_delete).each(function(i,item) {
      $(item).on('click', function (event) {
        event.stopPropagation();
        // recordCompanyId = $(this).attr('id')
        var recodeName = $(this).parent().parent().find('td:nth-child(2) p').html()
        var recodeId = $(this).attr('id')
        console.log(recodeName)
        var html = '<p>'+recodeName+'唱片公司确认永久删除吗</p>'
        $('#record_del').modal('open')
        $('.recordCompany_delWarn').html('')
        $('.recordCompany_delWarn').append(html)
        $('.record_del_confirm').attr('data-id',recodeId)
        $('.record_del_confirm').attr('data-name',recodeName)
      })
    })
  }
  $('.record_del_confirm').on('click',function(){
    var del_id = $(this).attr('data-id')
    var data_name = $(this).attr('data-name')
    var del_record_url = contextPath + '/recordcompanys/' + del_id +'.json'
    $.ajax({
      type: 'delete',
      url: del_record_url,
      async: false,//默认为true
      contentType: 'application/json',//默认为application/x-www-form-urlencoded
      dataType: 'json',//默认为预期服务器返回的数据类型
      processData: false,//默认为true*!/
      success: function (data) {
        if(data.status == '200'){
          recordCompany_list.ajax.reload()
        }
      },
      error: function (data) {
        if(data.status == '500'){
          $('#record_associated').modal('open')
          $('.associated-content').html(data_name+'唱片公司已经关联到音乐作品中，不可删除')
        }
      }
    })
  })
})
