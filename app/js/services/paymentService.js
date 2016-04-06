(function(){   
 "use strict";

  angular.module('app')
    .factory('paymentService', ["$q", "$http", "SHOW_API_BASE_URL", "PAYMENT_API_BASE_URL", "PAYMENT_API_KEY",
	function($q, $http, SHOW_API_BASE_URL, PAYMENT_API_BASE_URL, PAYMENT_API_KEY){
		var payment = {
			amount: 0,
			label: "",
			credit_card: {
				number : "1337474812964632",
				cvv: "339",
				expiration_month: "4",
				expiration_year: "2018",
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
					withCredentials: false,
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
					withCredentials: false,
					data: intent
			    });
	    	}
    	}
    }])
})();