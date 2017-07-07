/**
 * Created by yugang on 2017/6/5.
 */
$().ready(function () {
  $.ajax({
    type: "get",
    async: false,
    url: contextPath + '/music/genre/rest/list',
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      var html = '';
      var length = data.length;
      $.each(data,function(i,item){
        html += '<option id="'+item.id+'" value="'+item.id+'">'+item.text+'</option>'
      })
      $('.record_selectBox').html(html);
      $('.record_selectBox').SumoSelect({ csvDispCount: length, captionFormatAllSelected: "你已经全选" });
    },
    error: function(data){

    }
  })
})
