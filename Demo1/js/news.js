$(function(){
    // ajax 获取数据
	$.ajax({
	    url:"./data/main.json",
	    type:"get",
	    dataType:"json",
	    async:true,
	    data:"",
	    success:function(data){
	        var content_list = $('.content_list')
            var str = "";
	        $.each(data.news,function (i,item){
	            str += '<a href="textDetail.html?id='+item.id+'"><article class="ctlist_main"><article class="ctlist_left"><p class="ctlt_top">';
                str += '<span class="recommend">编辑推荐</span>'+item.title+'</p>';
                str += '<p class="ctlt_bottom"><span>引流获客'+item.num+'次</span><span>#'+item.sign+'</span></p>'
                str += '</article><aside class="ctlist_img"><img src="'+item.img1Url+'"></aside></article></a>'
            })
            content_list.append(str);
	    }
    });
})