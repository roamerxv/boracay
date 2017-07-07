/**
 * Created by yugang on 2017/6/6.
 */
$().ready(function () {
  $.ajax({
    type: "get",
    async: false,
    url: contextPath + '/age/list',
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      var html = ''
      $(data).each(function(i,item){
        html += '<option value="'+$(item)[0].id+'">'+$(item)[0].text+'</option>'
      })
      $('#music_year_select2').append(html)
    },
    error: function (data) {

    }
  });

  /*music_year_select2.on("change", function (e) {
    console.debug("选择了" + music_year_select2.val());
  });*/

})
