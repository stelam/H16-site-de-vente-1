(function(){   
 "use strict";

  angular.module('app')
    .factory('theaterService', ["$http", "SHOW_API_BASE_URL", "Slug", 
    	function($http, SHOW_API_BASE_URL, Slug){
	    return {
	    	add : function(theater){
	    		return $http({
					method: 'POST',
					url: SHOW_API_BASE_URL+'/theater/add',
					data: theater,
			    });
	    	},
	    	getAll : function(){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/theater/theaters'
			    });
	    	},
	    	getById : function(id){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/theater',
					params: {
						id: id
					}
			    });
	    	},
	    	edit: function(theater){
	    		return $http({
					method: 'PUT',
					url: SHOW_API_BASE_URL+'/theater/edit',
					data: theater,
			    });
	    	},
	    	delete: function(theater){
	    		return $http({
					method: 'DELETE',
					url: SHOW_API_BASE_URL+'/theater/remove',
					params: {id: theater.id}
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