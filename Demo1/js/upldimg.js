$(function(){
	/* 取链接url参数 */
	function getUrl(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)","i");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null){
	         return decodeURI(r[2]);
	     }else{
	         return null;
	     }
	 }
	 var textId = getUrl("id")
	 // ajax 获取数据  接收后台存储得用户‘模板’
	 $.ajax({
	     url:"./data/main.json",
	     type:"get",
	     dataType:"json",
	     async:true,
	     data:"",
	     success:function(data){
	 		$('.confirm').attr('href','textDetail.html?id='+textId+'')
	     }
	 });
    // 展示本地图片
    function getObjectURL(file){
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
            return url ;
    }
    //显示图像 预览效果 
    $("#file0").change(function(){
    　　var objUrl = getObjectURL(this.files[0]) ;
    　　console.log("objUrl = "+objUrl) ;
        if (objUrl) {
        　　$("#img0").attr("src", objUrl) ;
        　　$("#img0").show();
        }
        
    });
    // 点击插入图片  进入（input type="file"）
    $('.up_img').on("click",function(){
        /* 当已有图片时 点击插入图片 展示已有图片  不用在选择  */
        if($("#img0").attr("src")){
            Show_chose("up_img")
        }else{
            $("#file0").click()//间接实现点击查询本地文件按钮
            Show_chose("up_img")
        }
    })
    //当已有图片时 点击图片 实现替换图片
    $("#img0").on("click",function(){
        $("#file0").click()
    })
    // 
    $('.up_text').on("click",function(){
        Show_chose("up_text")
    })
    function Show_chose(name){
        $("."+name+"").addClass("active")
        if(name == "up_img"){
            $("#img0").show();
            $(".up_text").removeClass("active")
            $(".text_box").css({display:"none"})
        }else if(name == "up_text"){
            $("#img0").hide();
            $(".up_img").removeClass("active")
            $(".text_box").css({display:"block"})
        }
    }
    // 点击checkbox得label 简介点击checkbox
    $(".ckb_label").on("click",function(){
        let ckbIndex = $(this).index(".ckb_label")
        $(".ckb").eq(ckbIndex).click()
    })

})