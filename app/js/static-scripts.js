// SCRIPTS TEMPORAIRES POUR LA MAQUETTE STATIQUE



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

