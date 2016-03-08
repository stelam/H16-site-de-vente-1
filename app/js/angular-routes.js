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
	      }).when('/spectacle/:showSlug', {
	        templateUrl: 'partials/show-details.html',
	        controller: 'showDetailsController',
	        ident: 'spectacle',
	        title: ''
	      }).when('/spectacle/:showSlug/:dd/:mm/:yyyy', {
	        templateUrl: 'partials/show-details.html',
	        controller: 'showDetailsController',
	        ident: 'spectacle',
	        title: ''
	      }).when('/caisse/revue', {
	        templateUrl: 'partials/checkout-review.html',
	        controller: 'checkoutReviewController',
	        ident: 'checkout-review',
	        title: 'Caisse - Revue des items du panier'
	      }).when('/adminSpectacles', {
	        templateUrl: 'partials/admin_show-list.html',
	        controller: 'adminShowListController',
	        ident: 'admin_spectacles',
	        title: ''
	      }).when('/adminSalles', {
	        templateUrl: 'partials/admin_room-list.html',
	        controller: 'adminRoomListController',
	        ident: 'admin_salles',
	        title: ''
	      }).when('/adminSpectacle', {
	        templateUrl: 'partials/admin_room-details.html',
	        controller: 'adminShowDetailsController',
	        ident: 'admin_spectacle',
	        title: ''
	      }).when('/adminSalle', {
	        templateUrl: 'partials/admin_room-details.html',
	        controller: 'adminRoomDetailsController',
	        ident: 'admin_salle',
	        title: ''
	      }).
	      otherwise({
	        redirectTo: '/'
	      });
    }])
})();