// SCRIPTS TEMPORAIRES POUR LA MAQUETTE STATIQUE

$(window).scroll(function() {
	if ($(this).scrollTop() > 1){  
		$('.site-nav').addClass("sticky");
		$('#admin .footer').css("position","");
		$('#admin .footer').css("bottom","");
	}else{
		$('.site-nav').removeClass("sticky");
		$('#admin .footer').css("position","absolute");
		$('#admin .footer').css("bottom","0");
	}
});

$(document).ready(function(){

	$('html').click(function(e) {
		if (!$(e.target).hasClass('popover') && $(e.target).closest('.popover').length < 1){
	    	$('.popover').popover('hide');
	    }
	});

	$("#search-toggle-btn").click(function(){
		$(".search-wrapper").toggleClass("on");
		$("#search").focus();
	})


})

