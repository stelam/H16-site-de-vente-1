'use strict';

/* App Module */
(function(){
	angular.module('app', ['ngRoute', 'ngAnimate', 'ngSanitize', 'slugifier']);

	angular.module('app').constant({
		SHOW_API_BASE_URL : "http://demo5168961.mockable.io"
	});


	angular.module('app').run(function($rootScope){

	    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	        $rootScope.title = current.$$route.title;
	    });

	});




})();

