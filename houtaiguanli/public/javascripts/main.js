window.onload=function(){
  $("#yonghu").click(function() {
    $("#yhz").css("display","block");
    $("#bd").css("display","none");
    $("#xiangqing").css('display', 'none');
    $("#boke").css('display', 'none');
    $(this).addClass("bian");
    $("#bokexiugai").removeClass('bian');
    $("#kzt").removeClass("bian");
    $("#xiang").removeClass('bian');
  });
  $("#kzt").click(function() {
    location.href="/main"
    $(this).addClass("bian");
    $("#bokexiugai").removeClass('bian');
    $("#yonghu").removeClass("bian");
    $("#xiang").removeClass('bian');
    $("#yhz").css("display","none");
    $("#xiangqing").css('display', 'none');
    $("#boke").css('display', 'none');
    $("#bd").css("display","block");
  });
  // $("#bokexiugai").click(function() {
  //   $(this).addClass("bian");
  //   $("#yonghu").removeClass("bian");
  //   $("#xiang").removeClass('bian');
  //   $("#kzt").removeClass('bian');
  //   $("#yhz").css("display","none");
  //   $("#xiangqing").css('display', 'none');
  //   $("#bd").css("display","none");
  //   $("#boke").css('display', 'block');
  // });
  $("#zhu").css('display', 'none');
  $(".zhu").click(function() {
    $("#zhu").slideToggle();
  });
  $("#zu").css('display', 'none');
  $(".zu").click(function() {
    $("#zu").slideToggle();
  });
  $("#yong").css('display', 'none');
  $(".yong").click(function() {
    $("#yong").slideToggle();
  });
  $("#xiang").click(function() {
      $("#xiangqing").css('display', 'block');
      $("#boke").css('display', 'none');
      $("#yhz").css("display","none");
      $("#bd").css("display","none");
      $(this).addClass("bian");
      $("#bokexiugai").removeClass('bian');
      $("#kzt").removeClass("bian");
      $("#yonghu").removeClass("bian");
  });
$(".lianjie").click(function() {
  $("#xiangqing").css('display', 'block');
  $("#yhz").css("display","none");
  $("#bd").css("display","none");
  $("#xiang").addClass("bian");
  $("#kzt").removeClass("bian");
  $("#yonghu").removeClass("bian");
  var ide=$(this).attr("idd");
  var at="";
  $.ajax({
    url:"/xiang?id="+ide,
    type: 'get',
    success:function(data){
      console.log(data[0].tit);
      at=`
        <div id="wrrp">
        <p id="tit">${data[0].tit}</p>
        <p id="nam">作者:</p>
        <p id="about">${data[0].con}</p>
        <p id="neirong">${data[0].nei}</p>
        <input type="button" id="shan" value="删除 "/>
        <input type="button" id="xiugai" value="修改" />
        </div>
      `


      document.getElementById("xiangqing").innerHTML=at;

      $("#shan").click(function() {
        var id=data[0]._id;
        console.log(id);
        $.ajax({
          url:"/shan?id="+id,
          type: 'get',
          success:function(data) {
              if(data==1){
                alert("删除成功");

                location.href="/main";
                $("#yhz").css("display","block");
                $("#bd").css("display","none");
                $("#xiangqing").css('display', 'none');
                $(this).addClass("bian");
                $("#kzt").removeClass("bian");
              }
          }
        })
      });

      $("#xiugai").click(function(){
          $("#bokexiugai").addClass("bian");
          $("#yonghu").removeClass("bian");
          $("#xiang").removeClass('bian');
          $("#kzt").removeClass('bian');
          $("#yhz").css("display","none");
          $("#xiangqing").css('display', 'none');
          $("#bd").css("display","none");
          $("#boke").css('display', 'block');
          var id=data[0]._id;
        $("#xi").click(function(){
            var a=$("#biaoti1").val();
            var b=$("#pwd1").val();
            var c=$("#txa1").val();
            console.log(a);
            if(a==""||b==""||c==""){
              alert("不能为空");
            }else{
              $.ajax({
                type:"post",
                url:"/users/xiugai",
                data:{id:id,tit:$("#biaoti1").val(),con:$("#pwd1").val(),nei:$(".val2").val()},
                success:function (data) {
                  if (data==1) {
                    alert("修改成功");
                      $("#yhz").css("display","block");
                      $("#boke").css("display","none");
                      $("#xiang").addClass("bian");
                      $("#bokexiugai").removeClass("bian");
                  }else{
                    alert("修改失败");
                    location.href="/main"
                  }
                }
              })
            }
          })



      });



    }
  })
});








}
