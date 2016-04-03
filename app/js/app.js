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
		AUTH_API_BASE_URL: "https://stark-lowlands-60666.herokuapp.com",
		AUTH_API_KEY: "0e69f839017442fd779ca49f09cab8e66394c894a16f24b4112f7b5f5bc64a9fecebf89e45e010fd2ca9188a5035f4289436064f69070439118587f53c39b72c",
		AUTH_API_CLIENT_ID: 2,
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
		$httpProvider.interceptors.push('httpActivityInterceptorService');
		$httpProvider.defaults.withCredentials = true;
	}])


})();

