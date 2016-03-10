(function(){   
 "use strict";

  angular.module('app')
    .config(['$routeProvider', function($routeProvider){
	    $routeProvider.
			when('/spectacles', {
				templateUrl: 'partials/admin/show-list.html',
				controller: 'adminShowListController',
				title: 'Liste des spectacles'
			}).when('/spectacle/nouveau', {
				templateUrl: 'partials/admin/show-details.html',
				controller: 'adminShowController',
				title: 'Nouveau spectacle'
			}).when('/salle/nouvelle', {
				templateUrl: 'partials/admin/theater-details.html',
				controller: 'adminTheaterController',
				title: 'Nouvelle salle'
			}).when('/salles', {
				templateUrl: 'partials/admin/theater-list.html',
				controller: 'adminTheaterListController',
				title: 'Liste des salles'
			}).when('/salle/:idTheater', {
				templateUrl: 'partials/admin/theater-details.html',
				controller: 'adminTheaterController',
				title: 'Modifier une salle'
			}).when('/spectacle/:idShow', {
				templateUrl: 'partials/admin/show-details.html',
				controller: 'adminShowController',
				title: 'Modifier un spectacle'
			}).otherwise({
				redirectTo: '/spectacles'
			});
    }])
})();