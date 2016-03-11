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
	        title: 'Caisse - Revue des items du panier',
	        checkoutStep : 1
	      }).when('/caisse/methode-identification', {
	        templateUrl: 'partials/checkout-identification-method-selection.html',
	        controller: 'checkoutIdentificationController',
	        ident: 'checkout-identification-method',
	        title: 'Caisse - Identification',
	        checkoutStep : 2
	      }).when('/caisse/identification-anonyme', {
	        templateUrl: 'partials/checkout-anonymous-identification.html',
	        controller: 'checkoutIdentificationController',
	        ident: 'checkout-anonymous-identification',
	        title: 'Caisse - Identification',
	        checkoutStep : 2
	      }).when('/caisse/informations-paiement', {
	        templateUrl: 'partials/checkout-payment-information.html',
	        controller: 'checkoutPaymentController',
	        ident: 'checkout-payment-information',
	        title: 'Caisse - Méthode de paiement',
	        checkoutStep : 3
	      }).when('/caisse/sommaire', {
	        templateUrl: 'partials/checkout-summary.html',
	        controller: 'checkoutSummaryController',
	        ident: 'checkout-summary',
	        title: 'Caisse - Sommaire',
	        checkoutStep : 3
	      }).when('/confirmation-achat', {
	        templateUrl: 'partials/order-confirmation.html',
	        controller: 'orderConfirmationController',
	        ident: 'order-confirmation',
	        title: 'Confirmation d\'achat'
	      }).when('/spectacles/recherche/:searchQuery', {
	        templateUrl: 'partials/show-list.html',
	        controller: 'showListController',
	        ident: 'spectacles-search',
	        title: 'Résultats de recherche'
	      }).when('/spectacles/recherche/:searchQuery', {
	        templateUrl: 'partials/show-list.html',
	        controller: 'showListController',
	        ident: 'spectacles-search',
	        title: 'Résultats de recherche'
	      }).
	      otherwise({
	        redirectTo: '/'
	      });
    }])
})();