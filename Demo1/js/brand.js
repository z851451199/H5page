$(function(){
	// ajax
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
	            str += "<span name="+item.id+">"+item.name+"</span>";
	        })
	        hot_chose.append(str)
	    }
	});
    var hotChose_span = $('.hot_chose span'),
        show_chose = $('.show_chose');
    var brandList = [];
	
	$(document).on("click",'.hot_chose span', function(){
		var showChose_child = $('.show_chose p')
		$('.null_chose').css({
		    display:'none'
		})
		if(showChose_child.length>4){
		    alert('品牌订阅已达上限')
		}else{
		    brandList.push($(this).text())
			// brandID.push($(this).attr(name))
			console.log($(this).attr(name))
		    brandList= [...new Set(brandList)];
		    var str = ''
		    for(let i of brandList){
		        str += '<p class="sChose_p"><span class="sCp_sp">'+i+'</span><span>x</span></p>';
		    }
		    showChose_child.remove()
		    show_chose.append(str)
		}
		changeUrl()
	})

    $(document).on("click",'.sChose_p', function(){
        var sCp_sptext = brandList.indexOf($(this).children('.sCp_sp').text())
        brandList.splice(sCp_sptext,1)
        $(this).remove() 
        if(show_chose.find('p').length == 0){
            $('.null_chose').css({
                display:'block'
            })
        }
        changeUrl()
    });
    /* 当选中标签后时  将选中内容通过url参传数  */ 
    function changeUrl(){
        // if(brandList.length>0){
        //     $('.hot_Jump').html('<a href="industry.html?brand='+brandList+'" class="active">我没公司，去选行业<span>></span></a>')
        // }else{
        //     $('.hot_Jump').html('<a href="industry.html" class="active">我没公司，去选行业<span>></span></a>')
        // }
        $('.hot_Jump').html('<a href="industry.html?brand='+brandList+'" class="active">我没公司，去选行业<span>></span></a>')
    }
	
})