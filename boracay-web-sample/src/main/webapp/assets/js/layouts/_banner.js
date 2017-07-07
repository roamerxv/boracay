/**
 * Created by yugang on 2017/6/14.
 */
$().ready(function() {
 $('.out').on('click',function(){
   window.sessionStorage.removeItem("createdId")
   window.sessionStorage.removeItem('baseImg')
 window.sessionStorage.removeItem('param')
     window.sessionStorage.removeItem('songholder')
 })
})
