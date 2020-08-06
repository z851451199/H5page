$(function(){
    /*
    取链接url参数
    */  
   var arrylist1 = [],
       arrylist2 = [],
       brandList = [];
    function getUrl(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null){
            return decodeURI(r[2]);
        }else{
            return '';
        }
    }
	function addBanner(){
        var brandArry = getUrl("brand");
        var Newlist1 = getUrl("arrylist1");
        var Newlist2 = getUrl("arrylist2");
        arrylist1 = None(Newlist1)
        arrylist2 = None(Newlist2)
        // addClass(arrylist1,'.list2_chose span')
		if(brandArry){
            brandList = brandArry.split(',')
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
    function None(name){
        if(name){
            return name = name.split(",");
        }else{
            return []
        }
    }
    /* 封装函数  对数组已存内容 添加样式 */ 
    function addClass(name,className){
        var span = $(''+className+'')
        var spanText = span.map(function(){
            return $(this).text();
          }).toArray();
        for(let i of name){
            for(let j of spanText){          
                if(i == j){
                    span.eq(spanText.indexOf(j)).addClass('active')
                }
            }
        }

    }
    addBanner()
	
    // ajax 获取数据
	var str4 = "";//str4储存 ajax获取的 家居家装名称
	$.ajax({
	    url:"./data/main.json",
	    type:"get",
	    dataType:"json",
	    async:true,
	    data:"",
	    success:function(data){
            var list1_chose = $('.list1_chose'),
                list2_chose = $('.list2_chose'),
                list3_chose = $('.list3_chose');
            var str = "",
                str2 = "",
                str3 = "";
	        $.each(data.list_chose,function (i,item){
                if(i == 0){
                    str += "<span class='showlist2'>"+item.name+"</span>";
					str4 = item.name
                }else if(i>0 && i<=2){
                    str += "<span>"+item.name+"</span>";
                }else{
                    str3 += "<span>"+item.name+"</span>";
                }
            })
            $.each(data.list_detail,function (i,item){
                str2 += "<span>"+item.name+"</span>";
	        })
            list1_chose.append(str);
            list2_chose.append(str2);
            list3_chose.append(str3);
            // 
            changeUrl()
			list2Num()
            /*  将返回已选数据  进行重新添加样式  */ 
            addClass(arrylist1,'.list_chose span')
            addClass(arrylist2,'.list2_chose span')
			
	    }
    });
    /* ---当家居详情点击后 家居家装需要改变样式--- */ 
	function list2Num(){
		num = arrylist2.length
		if(num>0){
			$('.showlist2').addClass('active').text(''+str4+"  "+num+'')
		}else{
			$('.showlist2').removeClass('active').text(''+str4+'')
		}
	}
	
    /* 事件 */ 
    $(document).on("click",'.showlist2', function(){
        $('.list2_chose').toggle()
    });
    $(document).on("click",'.list_chose span:gt(0)', function(){
        // 重数组中添加品牌名称
        text = $(this).text()
        arrylist1.push($(this).text())
        arrylist1= [...new Set(arrylist1)];
        //console.log(arrylist1)
        // 给选中标签添加类名
        $(this).toggleClass('active')
        changeUrl()
    });
    $(document).on("click",'.list_chose .active', function(){
        // 重数组中移出品牌名称
        text = $(this).text()
        textIndex = arrylist1.indexOf(text)
        arrylist1.splice(textIndex,1)
        changeUrl()
    })
    $(document).on("click",'.list2_chose span', function(){
        // 重数组中添加品牌名称
        text = $(this).text()
        arrylist2.push($(this).text())
        arrylist2= [...new Set(arrylist2)];
        // 给选中标签添加类名
        $(this).toggleClass('active')
        changeUrl()
		list2Num()
    });
    $(document).on("click",'.list2_chose .active', function(){
        // 重数组中移出品牌名称
        text = $(this).text()
        textIndex = arrylist2.indexOf(text)
        arrylist2.splice(textIndex,1)
        changeUrl()
		list2Num()
    })
    function changeUrl(){
        $(".ba_change").attr('href','brand.html?brandList='+brandList+'&arrylist1='+arrylist1+'&arrylist2='+arrylist2+'');
        $(".bs_noChose").attr('href','brand.html?brandList='+brandList+'&arrylist1='+arrylist1+'&arrylist2='+arrylist2+'');
        $('.bottom a').attr('href','news.html?brand='+brandList+'&arrylist1='+arrylist1+'&arrylist2='+arrylist2+'');
    }
})

