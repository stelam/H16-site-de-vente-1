(function(){   
 "use strict";

  angular.module('app')
    .factory('paymentService', ["$q", "$http", "SHOW_API_BASE_URL", "PAYMENT_API_BASE_URL", "PAYMENT_API_KEY",
	function($q, $http, SHOW_API_BASE_URL, PAYMENT_API_BASE_URL, PAYMENT_API_KEY){
		var payment = {
			preauthorized: false,
			number : "1111111111111111",
			ccv: "111",
			expirationMonth: "1",
			expirationYear: "2017",
			amount: 79.99
		}

		var getPayment = function(){
			return payment;
		}

		var setPayment = function(p){
			payment = p;
		}

    	return {
    		setPayment: setPayment,
    		getPayment: getPayment,

	    	preauthorize : function(){
	    		return $http({
					method: 'POST',
					url: PAYMENT_API_BASE_URL+'/payment/preauthorize',
					params: {
						cardNumber: payment.number, 
						ccv: payment.ccv,
						expirationMonth: payment.expirationMonth,
						expirationYear: payment.expirationYear,
						amount: payment.amount,
						apiKey: PAYMENT_API_KEY
					}
			    });
	    	},

	    	pay : function(){
	    		return $http({
					method: 'POST',
					url: PAYMENT_API_BASE_URL+'/pay',
					params: {
						cardNumber: payment.number, 
						ccv: payment.ccv,
						expirationMonth: payment.expirationMonth,
						expirationYear: payment.expirationYear,
						amount: payment.amount,
						apiKey: PAYMENT_API_KEY
					}
			    });
	    	}
    	}
    }])
})();