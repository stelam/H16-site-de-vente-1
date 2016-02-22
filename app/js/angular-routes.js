(function(){   
 "use strict";

  angular.module('app')
    .config(['$routeProvider', function($routeProvider){
	    $routeProvider.
	      when('/featuring', {
	        templateUrl: 'partials/featuring-list.html',
	        controller: 'featuredShowListController'
	      }).
	      otherwise({
	        redirectTo: '/featuring'
	      });
    }])
})();