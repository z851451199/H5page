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
    // ajax 获取数据
	$.ajax({
	    url:"./data/main.json",
	    type:"get",
	    dataType:"json",
	    async:true,
	    data:"",
	    success:function(data){
            var titleLabel = $('.heard_title'),
                textMain = $('.textMain');
            var titleStr = "",
                contentStr = "";
	        $.each(data.news,function (i,item){
	            if(textId == i){
                    titleStr += '<p class="showTitle">'+item.title+'</p>';
                    contentStr += '<img src="'+item.img1Url+'"><p>'+item.txt1+'</p>'
                }
            })
            titleLabel.append(titleStr)
            textMain.append(contentStr)
	    }
    });
})