(function(){   
 "use strict";

  angular.module('app')
    .config(['$routeProvider', function($routeProvider){
	    $routeProvider.
			when('/spectacles', {
				templateUrl: 'partials/admin/show-list.html',
				controller: 'adminShowListController',
				ident: 'spectacles',
				title: 'Liste des spectacles'
			}).when('/spectacle/nouveau', {
				templateUrl: 'partials/admin/new-show.html',
				controller: 'adminShowController',
				ident: 'nouveau-spectacle',
				title: 'Nouveau spectacle'
			}).when('/salle/nouvelle', {
				templateUrl: 'partials/admin/new-theater.html',
				controller: 'adminTheaterController',
				ident: 'nouvelle-salle',
				title: 'Nouvelle salle'
			}).when('/salles', {
				templateUrl: 'partials/admin/theater-list.html',
				controller: 'adminTheaterListController',
				ident: 'liste-salles',
				title: 'Liste des salles'
			}).otherwise({
				redirectTo: '/spectacles'
			});
    }])
})();