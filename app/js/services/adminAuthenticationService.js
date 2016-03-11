(function(){   
 "use strict";

  angular.module('app')
    .factory('adminAuthenticationService', ["$q", "$http", "$rootScope", "SHOW_API_BASE_URL",
	function($q, $http, $rootScope, SHOW_API_BASE_URL){
		var authentified = false;

    	return {
	    	authenticate : function(username, password){
	    		var deferred = $q.defer();

	    		$http({
					method: 'POST',
					url: SHOW_API_BASE_URL+'/authentication/authenticate',
				    headers: { 
				        'Accept': 'application/json',
				        'Content-Type': 'application/json' 
				    },
					data: {
						username: username,
						password: password
					}
			    }).then(function(data){
			    	deferred.resolve(data);
			    }, function(data){
			    	deferred.reject(data);
			    })

			    return deferred.promise;


	    	},

	    	check : function(){
	    		return $http({
	    			method: "GET",
	    			url: SHOW_API_BASE_URL+"/authentication/check"
	    		})
	    	}
    	}
    }])
})();