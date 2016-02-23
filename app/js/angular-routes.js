(function(){   
 "use strict";

  angular.module('app')
    .config(['$routeProvider', function($routeProvider){
	    $routeProvider.
	      when('/', {
	        templateUrl: 'partials/featuring-list.html',
	        controller: 'featuredShowListController',
	        ident: 'accueil'
	      }).when('/spectacles', {
	        templateUrl: 'partials/show-list.html',
	        controller: 'showListController',
	        ident: 'spectacles'
	      }).when('/spectacles/:dd/:mm/:yyyy', {
	        templateUrl: 'partials/show-list.html',
	        controller: 'showListController',
	        ident: 'spectacles'
	      }).when('/spectacle/:showId', {
	        templateUrl: 'partials/show-details.html',
	        controller: 'showDetailsController',
	        ident: 'spectacle'
	      }).
	      otherwise({
	        redirectTo: '/'
	      });
    }])
})();