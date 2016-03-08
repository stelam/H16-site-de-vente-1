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


$(function(){
  var hash = window.location.hash;
  hash && $('ul.nav a[href="' + hash + '"]').tab('show');

  $('.navbar-nav a, .titleShow').click(function (e) {
    $(this).tab('show');
    var scrollmem = $('body').scrollTop();
    window.location.hash = this.hash;
    $('html,body').scrollTop(scrollmem);
  });
});

$(document).ready(function(){
	$('html').click(function(e) {
		if (!$(e.target).hasClass('popover') && $(e.target).closest('.popover').length < 1){
	    	$('.popover').popover('hide');
	    }
	});

	$(function () {
		$('[data-toggle="popover"]').popover({
			html: true,
			trigger : 'manual',
			placement : 'bottom'
		})
	})

	$(".btn-add").click(function(e){
		$('.nb-cart-items').removeClass("animate");
		$("#cart-btn").popover('show');
		$('.nb-cart-items').text(parseInt($('.nb-cart-items').text()) + 1).addClass('animate');
	    e.stopPropagation();
	})

	$("#search-toggle-btn").click(function(){
		$(".search-wrapper").toggleClass("on");
		$("#search").focus();
	})

    $(function () {
        $('#calendar').datetimepicker({useCurrent: false, debug: false});

        $('#calendar').on('dp.change', function(e){
        	var date = moment(e.date._d);
        	moment.locale("fr-CA");
        	var dateString = moment(date).format('DD/MM/YYYY');
        	window.location.href = '?page=spectacles&date=' + dateString;
        })
    });

})

