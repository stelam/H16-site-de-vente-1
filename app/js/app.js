'use strict';

/* App Module */
(function(){
	angular.module('app', ['ngRoute', 'ngAnimate', 'ngSanitize', 'slugifier', 'LocalStorageModule', 'validation', 'validation.rule', 'ui.select']);

	angular.module('app').constant({
		SHOW_API_BASE_URL : "http://demo5168961.mockable.io",
		CART : {
			RESERVATION_TIME : 20, //minutes
			INACTIVITY_TIME : 10,
			MAX_SHOW_PURCHASE_QUANTITY : 6
		},
		DIRECTIVE_TEMPLATE_PATH : "js/directives/templates"
	});


	angular.module('app').run(function($rootScope){

	    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	    	if (current.$$route) {
	    		$rootScope.title = current.$$route.title;
	    	}
	        
	    });

	});




})();

