(function(){   
 "use strict";

  angular.module('app')
    .factory('salesService', ["$http", "SHOW_API_BASE_URL", "Slug", 
    	function($http, SHOW_API_BASE_URL, Slug){
	    return {
	    	getAll : function(){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/ticket/orders'
			    });
	    	}

	    } 
    }])
})();