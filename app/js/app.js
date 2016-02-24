'use strict';

/* App Module */
(function(){
	angular.module('app', ['ngRoute', 'ngAnimate', 'ngSanitize', 'slugifier', 'LocalStorageModule']);

	angular.module('app').constant({
		SHOW_API_BASE_URL : "http://demo5168961.mockable.io",
		CART : {
			RESERVATION_TIME : 1200,
			INACTIVITY_TIME : 600
		}
	});


	angular.module('app').run(function($rootScope){

	    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	    	if (current.$$route) {
	    		$rootScope.title = current.$$route.title;
	    	}
	        
	    });

	});




})();

