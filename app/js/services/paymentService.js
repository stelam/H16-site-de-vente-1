(function(){   
 "use strict";

  angular.module('app')
    .factory('paymentService', ["$q",
	function($q){
		var payment = {
			preautorized: false,
			number : "",
			ccv: "",
			expirationMonth: "",
			expirationYear: ""
		}

		var getPayment = function(){
			return payment;
		}

		var setPayment = function(p){
			payment = p;
		}

    	return {
    		setPayment: setPayment,
    		getPayment: getPayment
    	
    	}
    }])
})();