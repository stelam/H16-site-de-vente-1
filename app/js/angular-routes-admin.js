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
			}).
				otherwise({
				redirectTo: '/spectacles'
			});
    }])
})();