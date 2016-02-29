(function(){   
 "use strict";

  angular.module('app')
    .factory('checkoutService', ["$q", "CART",
	function($q, CART){
		var steps = {
			review : {
				completed : false
			},

			identification : {
				completed : false
			},

			payment : {
				completed: false
			}
		}

		var currentStep = "review";



    	return {
    		
    	
    	}
    }])
})();