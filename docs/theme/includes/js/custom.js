var temp_pr_version = document.location.href.toString().split('/');
var new_url = document.location.href.toString().split(temp_pr_version[4]);
var pg_cur,pg_pp,pg_pn,pg_st,pg_en;

setTimeout(function(){
	//document.getElementById("ept-prd-vr").value = parseInt(temp_pr_version[4].toString().replace('v',''))
	$('.ept-prd-vr').val(parseInt(temp_pr_version[4].toString().replace('v','')));
	var cur_pg = window.location.href.toString().split(window.location.origin)[1];
	$('.ept-toc-pg').hide();
	$(".nav-list-link.active").each(function() {
		$('.ept-toc-pg ul').append('');
		var toc_data = '';
			if($(this).attr('href') === cur_pg){
				//Bredcrumb process
					if($('.nav-list-link.active').parents('.has_child.nav-list-item.active').length == 0){
							$(".breadcrumb-nav-list").append(
							'<li class="breadcrumb-nav-list-item"><a href="'+ new_url[0] + temp_pr_version[4] +'">Home</a></li>'+
							'<li class="breadcrumb-nav-list-item"><span>'+ $(this).html()+'</span></li>');
							$('.ept-breadcrumb-nav').show();
					}
					else if($('.nav-list-link.active').parents('.has_child.nav-list-item.active').length == 1){
						if($(".nav-list-link.active").prev().is('.nav-list-expander') == false){
							$(".breadcrumb-nav-list").append(
							'<li class="breadcrumb-nav-list-item"><a href="'+ new_url[0] + temp_pr_version[4] +'">Home</a></li>'+
							'<li class="breadcrumb-nav-list-item"><a href="'+ $(this).parents('.has_child.nav-list-item.active').find('.nav-list-expander').next().attr('href')+'">'+ $(this).parents('.has_child.nav-list-item.active').find('.nav-list-expander').next().html()+'</a></li>'+
							'<li class="breadcrumb-nav-list-item"><span>'+ $(this).html()+'</span></li>');
							$('.ept-breadcrumb-nav').show();	
						}
						else{
							$(".breadcrumb-nav-list").append(
							'<li class="breadcrumb-nav-list-item"><a href="'+ new_url[0] + temp_pr_version[4] +'">Home</a></li>'+
							'<li class="breadcrumb-nav-list-item"><span>'+ $(this).html()+'</span></li>');
							$('.ept-breadcrumb-nav').show();
						}
					}
					else if($('.nav-list-link.active').parents('.has_child.nav-list-item.active').length == 2){
							$(".breadcrumb-nav-list").append(
								
							'<li class="breadcrumb-nav-list-item"><a href="'+ new_url[0] + temp_pr_version[4] +'">Home</a></li>'+
							'<li class="breadcrumb-nav-list-item"><a href="'+ $(this).parents('.has_child.nav-list-item.active').find('.nav-list-expander').next().attr('href')+'">'+ $(this).parents('.has_child.nav-list-item.active').find('.nav-list-expander').next().html()+'</a></li>');
							if($('.nav-list-link.active').prev().hasClass('nav-list-expander') != true)
							{
								$(".breadcrumb-nav-list").append('<li class="breadcrumb-nav-list-item"><a href="'+ $(this).parents('.nav-list').prev().attr('href')+'">'+ $(this).parents('.nav-list').prev().html()+'</a></li>');
							}
							$(".breadcrumb-nav-list").append('<li class="breadcrumb-nav-list-item"><span>'+ $(this).html()+'</span></li>');
							$('.ept-breadcrumb-nav').show();
					}
				if($(this).parent().hasClass('has_child')) {
					$(this).parent('.has_child.nav-list-item.active').each(function() {
					$(this).find('.nav-list li').each(function() {
						if($(this).find('.nav-list-link').parent('li').hasClass('has_child') == false) {
							if($(this).find('.nav-list-link').parent('.nav-list-item').parent('.nav-list').parent('li').hasClass('active') == true){
								toc_data += '<li>'+
		                			'<a href="'+ $(this).find('.nav-list-link').attr('href')+'">'+ $(this).find('.nav-list-link').html()+'</a>'+
		              			'</li>';	
							}
						}
						else{
							toc_data += '<li>'+
		                			'<a href="'+ $(this).find('.nav-list-link').attr('href')+'">'+ $(this).find('.nav-list-link').html()+'</a>'+
		              			'</li>';	
						}
		              });
					});
					$('.ept-toc-pg ul').append(toc_data);
					$('.ept-toc-pg').show();
				}
			}
			else
			{
				//console.log('In else part.')
			}
	});
},2000);

setTimeout(function(){
	$(document).ready(function() {
		// set class and add nav-expander class
		if($( window ).width() >= 1023 ){
			$(".site-nav").css("display","block");
		}
		$('.site-nav ul li ul').addClass('nav-list');
		$('.site-nav ul li ul li').addClass('nav-list-item');
		$('.site-nav ul li ul li a').addClass('nav-list-link');		

		$(".has_child").each(function() {
			$(this).find('a').first().before('<a href="#" class="nav-list-expander"><svg viewBox="0 0 24 24"><use xlink:href="#svg-arrow-right"></use></svg></a>');
		});
		$(".site-nav .nav-list-link").each(function(index) {
		    if( $(this).text().toString().length >= 3 )
		    {
		    	
		        if( $(this).prop("href").toString().split(temp_pr_version[4])[1] === new_url[1])
				{	
					$(this).parent('li').addClass('active');
					$(this).parents('li').addClass('active');
					$(this).addClass('active');
				}
		    }
		    else{
		        $(this).remove();
		    }
			
		});
		
		//set custom attribute for the pagination
		setTimeout(function(){
			$(".site-nav .nav-list-link").each(function(index) {
		    		$(this).attr("cur-pg",index);
			});
		},1500);

		//get Current,Previous and Next Page
		setTimeout(function(){
			$( ".nav-list-link" ).each(function(index) {
			    if($(this).hasClass('active')){
			        pg_cur = parseInt($(this).attr("cur-pg"));
			        pg_pp = pg_cur - 1;
			        pg_pn = pg_cur + 1;
			        pg_st = parseInt($("#site-nav ul li:first a").attr('cur-pg'));
			        pg_en = parseInt($("#site-nav ul li:last a").attr('cur-pg'));
			    }
			    else{
			    	pg_cur = parseInt($("#site-nav ul li:first a").attr('cur-pg'));
			        pg_pp = pg_cur - 1;
			        pg_pn = pg_cur + 1;
			        pg_st = 0;
			        pg_en = parseInt($("#site-nav ul li:last a").attr('cur-pg'));
			    }
			});
			if( $(".nav-list-link.active").attr('cur-pg') != undefined && parseInt($(".nav-list-link.active").attr('cur-pg') - 1) == pg_en)
				$('.ept_pn').hide();
			else
				$('.ept_pn').show();
			if($(".nav-list-link.active").attr('cur-pg') != undefined) {
				if(parseInt($(".nav-list-link.active").attr('cur-pg')) < 0 )
					$('.ept_pp').hide();
				else
					$('.ept_pp').show();	
			}
			else{
				$('.ept_pp').hide();
			}
			
			
		},4000);
		$(".ept_pp").click(function(){
			updatePageVariable();
			if(pg_pp >= 0){
				$(this).show();
				$(".nav-list-link").each(function(index) {
					if(parseInt($(this).attr('cur-pg')) === pg_pp ){
						window.location = document.location.origin + $(this).attr('href');
					}
				});	
			}
			else{
				window.location = new_url[0] + temp_pr_version[4] ;
				$(this).hide();
			}
		});
		$(".ept_pn").click(function(){
			updatePageVariable();
			if(pg_pn <= pg_en){
				$(this).show();
				if(new_url[1].toString().length <= 1){
					window.location = $("#site-nav ul li:first a").attr('href');
				}
				else{
					$(".nav-list-link").each(function(index) {
						if(parseInt($(this).attr('cur-pg')) === pg_pn ){
							window.location = document.location.origin + $(this).attr('href');
						}
					});		
				}
			}
			else{
				$(this).hide();
			}
		});

		if(temp_pr_version[5] == '' || temp_pr_version[5] == undefined)
		{
			// Fire nav click event once body is ready
			//window.location = $("#site-nav ul li:first a").attr('href');
		}
		//set link in Product Name
		var temp_pr_name_link = $(".ept_a_prd_logo").attr('href') + temp_pr_version[4];
		$(".ept_a_prd_logo").attr('href',temp_pr_name_link);
		
		//hide nav bar panel
		$('.ept_nav_arr').click(function(){
			if($( window ).width() >= 1023 ){
				if($(this).hasClass('ept_lf_arr')){
					$('.side-bar').animate({'left' : "-350px"});
					$(this).hide();
					$('.ept_rf_arr').show();
					$('.main').animate({'marginLeft' : "2px"});
					$(".main-header").css("width","calc(100% - 2px)");
				}
				else
				{
					$(".main-header").css("width","calc(100% - 340px)");
					$('.main').animate({'marginLeft' : "348px"});
					$('.side-bar').animate({'left' : "0px"});
					$(this).hide();		
					$('.ept_lf_arr').show();
				}
				
			}
		});
	});
},1000);

function changeProductVersion(data){
	
	window.location = new_url[0] + 'v'+data.value;
}
function updatePageVariable(){
	if($(".nav-list-link.active").attr('cur-pg') == undefined)
		pg_cur = 0;
	else
		pg_cur = parseInt($(".nav-list-link.active").attr('cur-pg'));
    pg_pp = pg_cur - 1;
    pg_pn = pg_cur + 1;
    pg_st = 0;//parseInt($("#site-nav ul li:first a").attr('cur-pg'));
    pg_en = parseInt($("#site-nav ul li:last a").attr('cur-pg'));
}

