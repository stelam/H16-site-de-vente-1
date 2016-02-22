(function(){   
 "use strict";

  angular.module('app')
    .factory('showService', ["$http", function($http){
	    return {
	    	getListFeaturedShows : function(){
	    		return $http({
					method: 'GET',
					url: 'http://demo5168961.mockable.io/shows/featured',
					params: 'limit=10, sort_by=created:desc', // exemple de params
					headers: {'Authorization': 'Token token=xxxxYYYYZzzz'} // exemple de token si on utilise cette méthode d'authentification
			    });
	    	},

	    	getListShows : function(){
	    		return $http({
					method: 'GET',
					url: 'http://demo5168961.mockable.io/shows/'
			    });
	    	}
	    } 
    }])
})();