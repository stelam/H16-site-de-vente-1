'use strict';

/* App Module */
(function(){
	angular.module('app', ['ngRoute', 'ngAnimate', 'ngSanitize', 'slugifier', 'LocalStorageModule', 'validation', 'validation.rule', 'ui.select']);

	angular.module('app').constant({
		SHOW_API_BASE_URL : "http://localhost:8080",
		SHOW_MOCK_API_BASE_URL : "http://demo5168961.mockable.io",
		REAL_SHOW_API_BASE_URL : "http://agile-anchorage-60775.herokuapp.com",
		PAYMENT_API_BASE_URL : "http://demo0468717.mockable.io",
		PAYMENT_API_KEY: "kj124k1j2k1j2k4j12j4jh21gyu12g12uv1j2hjg",
		CART : {
			RESERVATION_TIME : 3, //minutes
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

	angular.module('app').config(['$httpProvider', function($httpProvider) {
		$httpProvider.defaults.withCredentials = true;
	}])


})();

