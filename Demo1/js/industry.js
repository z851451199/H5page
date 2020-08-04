$(function(){
    /*
    取链接url参数
    */  
    function getUrl(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null){
            return decodeURI(r[2]);
        }else{
            return null;
        }
    }
	function addBanner(){
		var name = getUrl("brand");
		if(name){
            var brandList = name.split(',')
			var str = ''
			for(let i of brandList){
			    str += '<span class="sCp_sp">'+i+'</span>';
			}
			$('.bs_noChose').css({
				display:'none'
			})
			$('.banner_show').append(str)
		}else{
			$('.bs_noChose').css({
				display:'block'
			})
		}
		
	}
    addBanner()
    /* 事件 */ 
    var oShowl2 = $('.showlist2'),
    list2_chose = $('.list2_chose'),
    list_span = $('.list_chose span:gt(0)');
    oShowl2.on('click',function(){
        $('.list2_chose').toggle()
    });
    list_span.on('click',function(){
        $(this).toggleClass('active')
    });
})

