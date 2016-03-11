(function(){   
 "use strict";

	angular.module('app').factory('httpActivityInterceptorService', ['$log', '$q', '$rootScope',

		function($log, $q, $rootScope) {  



		    var interceptor = {
		        response : function(response) {
		        	var deferred = $q.defer();
		        	deferred.resolve(response);
		    		
		        	console.log("resetting inactivity");
		        	$rootScope.inactiveSince = (moment(new Date()).valueOf());

		    		return deferred.promise;

		        }
		    };

	    	return interceptor;
		}])
})();