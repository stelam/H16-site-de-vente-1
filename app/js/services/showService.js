(function(){   
 "use strict";

  angular.module('app')
    .factory('showService', ["$http", "SHOW_API_BASE_URL", function($http, SHOW_API_BASE_URL){
	    return {
	    	getListFeaturedShows : function(){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/shows/featured',
					params: 'limit=10, sort_by=created:desc', // exemple de params
					headers: {'Authorization': 'Token token=xxxxYYYYZzzz'} // exemple de token si on utilise cette méthode d'authentification
			    });
	    	},

	    	getListShows : function(){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/shows/'
			    });
	    	},

	    	getListShowsByDate : function(dd, mm, yyyy){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/shows/date/',
					params: 'dd=' + dd + ', mm=' + mm + ', yyyy=' + yyyy
			    });
	    	},

	    	getShowById : function(dd, mm, yyyy){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/show/1' // TODO: mettre le vrai id du spectacle quand le vrai service web sera disponible
			    });
	    	}
	    } 
    }])
})();