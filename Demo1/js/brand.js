$(function(){
	// ajax 获取数据
	$.ajax({
	    url:"./data/main.json",
	    type:"get",
	    dataType:"json",
	    async:true,
	    data:"",
	    success:function(data){
	        var hot_chose = $('.hot_chose')
            var str = "";
	        $.each(data.hotBrand,function (i,item){
	            str += "<span>"+item.name+"</span>";
            })
            hot_chose.append(str);
            // 展示已选择品牌（链接传回来的）
            showBrandList();
            changeUrl()
            changeClass()
			//console.log(brandList)
	    }
    });
    /* 封装函数  对数组已存内容 添加样式 */ 
    function changeClass(){
        var span = $('.hot_chose span')
        var spanText = span.map(function(){
            return $(this).text();
          }).toArray();
        //   console.log(spanText)
        for(let i of brandList){
            for(let j of spanText){
                if(i == j){
                    span.eq(spanText.indexOf(j)).addClass('active1')
                }
            }
        }
    }
    // 创建数组 存放已选标签
    var show_chose = $('.show_chose');
    var brandList = [],arrylist1=[],arrylist2=[];
    // 展示已选择品牌（链接传回来的） 封装函数 ajax中引入
    function showBrandList(){
        var str = ''
        if(brandList.length == 0){
            // 无选择品牌时，展示字体
            $('.null_chose').css({
                display:'block'
            })
        }else{
            // 有选择品牌时，隐藏字体
            $('.null_chose').css({
                display:'none'
            })
            // 将已选择品牌加载到页面
            for(let i of brandList){
                str += '<p class="sChose_p"><span class="sCp_sp">'+i+'</span><span class="iconfont icon-chahao1"></span></p>';
            }
        }
        show_chose.append(str)
    }
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
    function parameter(){
        Newlist1 = getUrl("arrylist1");
        Newlist2 = getUrl("arrylist2");
        arrylist1 = None(Newlist1)
        arrylist2 = None(Newlist2)
        NewList = getUrl("brandList");
        if(NewList){
            brandList = NewList.split(',')
            //console.log('susses')
        }
    }
    parameter()
    function None(name){
        if(name){
            return name = name.split(",");
        }else{
            return []
        }
    }
    /*------*/     
	// 热门品牌 点击事件
	$(document).on("click",'.hot_chose span', function(){
		var showChose_child = $('.show_chose p')
		$('.null_chose').css({
		    display:'none'
        })
		if(showChose_child.length>4){
            console.log('品牌订阅已达上限')
            $(this).removeClass('active1')
		}else{
		    brandList.push($(this).text())
		    brandList= [...new Set(brandList)];
		    var str = ''
		    for(let i of brandList){
		        str += '<p class="sChose_p"><span class="sCp_sp">'+i+'</span><span class="iconfont icon-chahao1"></span></p>';
		    }
		    showChose_child.remove()
            show_chose.append(str)
            $(this).toggleClass('active1')
        }
        //console.log(brandList)
        // if(brandList.length>5)
        // $(this).toggleClass('active1')
		changeUrl()
    })
    //点击事件  二次点击  删除品牌展示  
    $(document).on("click",'.hot_chose .active1', function(){
        // 重数组中移出品牌名称
        text = $(this).text()
        textIndex = brandList.indexOf(text)
        brandList.splice(textIndex,1)
        var str2 = ''
        for(let i of brandList){
            str2 += '<p class="sChose_p"><span class="sCp_sp">'+i+'</span><span class="iconfont icon-chahao1"></span></p>';
        }
        $('.show_chose p').remove()
        show_chose.append(str2)
        changeUrl()
    })
	// 我的品牌展示  删除品牌  点击事件
    $(document).on("click",'.sChose_p', function(){
        var sCp_sptext = brandList.indexOf($(this).children('.sCp_sp').text())
        brandList.splice(sCp_sptext,1)
        //console.log(brandList)
        $(this).remove() 
        if(show_chose.find('p').length == 0){
            $('.null_chose').css({
                display:'block'
            })
        }
        changeClass2($(this).children('.sCp_sp').text())
        changeUrl()
    });
    /* 封装函数  对数组已存内容 添加样式 */ 
    function changeClass2(text){
        var span = $('.hot_chose span')
        var spanText = span.map(function(){
            return $(this).text();
          }).toArray();
        //console.log(text)
        for(let j of spanText){
            if(text == j){
                span.eq(spanText.indexOf(j)).removeClass('active1')
            }
        }
    }
    /* 当选中标签后时  将选中内容通过url参传数  */ 
    function changeUrl(){
        $('.hot_Jump a').attr('href','industry.html?brand='+brandList+'&arrylist1='+arrylist1+'&arrylist2='+arrylist2+'')
        $('.search a').attr('href','industry.html?brand='+brandList+'&arrylist1='+arrylist1+'&arrylist2='+arrylist2+'')
        $('.bottom a').attr('href','news.html?brand='+brandList+'&arrylist1='+arrylist1+'&arrylist2='+arrylist2+'')
    }
	
})