(function(){   
 "use strict";

  angular.module('app')
    .config(['$routeProvider', function($routeProvider){
	    $routeProvider.
	      when('/', {
	        templateUrl: 'partials/featuring-list.html',
	        controller: 'featuredShowListController'
	      }).when('/spectacles', {
	        templateUrl: 'partials/show-list.html',
	        controller: 'showListController'
	      }).when('/spectacles/:dd/:mm/:yyyy', {
	        templateUrl: 'partials/show-list.html',
	        controller: 'showListController'
	      }).
	      otherwise({
	        redirectTo: '/'
	      });
    }])
})();