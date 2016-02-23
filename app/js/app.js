'use strict';

/* App Module */
(function(){
	angular.module('app', ['ngRoute', 'ngAnimate', 'ngSanitize']);


	angular.module('app').run(function($rootScope){

	    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
	        $rootScope.containerClass = toState.containerClass;
	    });

	});
})();

