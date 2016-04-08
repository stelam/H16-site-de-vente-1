(function(){   
 "use strict";

  angular.module('app')
    .factory('paymentService', ["$q", "$http", "SHOW_API_BASE_URL", "PAYMENT_API_BASE_URL", "PAYMENT_API_KEY",
	function($q, $http, SHOW_API_BASE_URL, PAYMENT_API_BASE_URL, PAYMENT_API_KEY){
		/*var payment = {
			amount: 0,
			label: "",
			credit_card: {
				number : "1337427807129058",
				cvv: "332",
				expiration_month: "1",
				expiration_year: "2017",
				first_name: "",
				last_name: ""
			}
		}*/

		var payment = {
			amount: 0,
			label: "",
			credit_card: {
				number : "",
				cvv: "",
				expiration_month: "1",
				expiration_year: "2017",
				first_name: "",
				last_name: ""
			}
		}

		var paymentPreauthorization = {
			amount: 0,
			expired_at: "",
			id: "",
			status: false
		}

		var getPayment = function(){
			return payment;
		}

		var setPayment = function(p){
			payment = p;
		}

		var getPaymentPreauthoriation = function(){
			return paymentPreauthorization;
		}

		var setPaymentPreauthoriation = function(pp){
			paymentPreauthorization = pp;
		}

    	return {
    		setPayment: setPayment,
    		getPayment: getPayment,
    		setPaymentPreauthoriation: setPaymentPreauthoriation,
    		getPaymentPreauthoriation: getPaymentPreauthoriation,

	    	preauthorize : function(paymentObject){
	    		return $http({
					method: 'POST',
					url: SHOW_API_BASE_URL+'/payment/preauthorize',
					withCredentials: true,
					data: paymentObject
			    });
	    	},

	    	pay : function(){
	    		var intent = {
	    			"client_id" : paymentPreauthorization.id,
	    			"intent" : "confirm"
	    		}
	    		return $http({
					method: 'POST',
					url: SHOW_API_BASE_URL+'/payment/send',
					withCredentials: true,
					data: intent
			    });
	    	}
    	}
    }])
})();