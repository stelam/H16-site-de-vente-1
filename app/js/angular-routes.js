(function(){   
 "use strict";

  angular.module('app')
    .config(['$routeProvider', function($routeProvider){
	    $routeProvider.
	      when('/', {
	        templateUrl: 'partials/featuring-list.html',
	        controller: 'featuredShowListController',
	        ident: 'accueil',
	        title: 'Spectacles en vedette'
	      }).when('/spectacles', {
	        templateUrl: 'partials/show-list.html',
	        controller: 'showListController',
	        ident: 'spectacles',
	        title: 'Tous les spectacles'
	      }).when('/spectacles/:dd/:mm/:yyyy', {
	        templateUrl: 'partials/show-list.html',
	        controller: 'showListController',
	        ident: 'spectacles',
	        title: ''
	      }).when('/spectacle/:showId', {
	        templateUrl: 'partials/show-details.html',
	        controller: 'showDetailsController',
	        ident: 'spectacle',
	        title: ''
	      }).
	      otherwise({
	        redirectTo: '/'
	      });
    }])
})();