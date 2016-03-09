(function(){   
 "use strict";

  angular.module('app')
    .factory('theaterService', ["$http", "REAL_SHOW_API_BASE_URL", "Slug", 
    	function($http, REAL_SHOW_API_BASE_URL, Slug){
	    return {
	    	add : function(theater){
	    		return $http({
					method: 'POST',
					url: REAL_SHOW_API_BASE_URL+'/theater/add',
					data: theater,
					headers: {'Authorization': 'Token token=xxxxYYYYZzzz'} // exemple de token si on utilise cette méthode d'authentification
			    });
	    	},
	    	getAll : function(){
	    		return $http({
					method: 'GET',
					url: REAL_SHOW_API_BASE_URL+'/theater/theaters'
			    });
	    	},
	    	getById : function(id){
	    		return $http({
					method: 'GET',
					url: REAL_SHOW_API_BASE_URL+'/theater',
					params: {
						id: id
					}
			    });
	    	},
	    	edit: function(theater){
	    		return $http({
					method: 'POST',
					url: REAL_SHOW_API_BASE_URL+'/theater/edit',
					data: theater,
			    });
	    	},
	    	emptyTheater : {
                name: "",
                phoneNumber: "",
                zipCode : "",
                address : "",
                city : "",
                capacity : 0,
                province: {
                    provinceName: "Quebec"
                },
                active: true
            }

	    } 
    }])
})();