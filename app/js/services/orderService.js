(function(){   
 "use strict";

  angular.module('app')
    .factory('orderService', ["$q", "$http", "PAYMENT_API_BASE_URL",
	function($q, $http, PAYMENT_API_BASE_URL){
		
		var order = {
			orderId : "",
			cart: {}
		}

		var getOrder = function(){
			return order;
		}

    	return {
	    	commitOrder : function(cart, user, transactionId){
	    		var deferred = $q.defer();

	    		$http({
					method: 'POST',
					url: PAYMENT_API_BASE_URL+'/order', // ce sera pas PAYMENT_API_BASE_URL
					params: {
						//user : user,
						//items : cart.items,
						//: transactionId
					}
			    }).then(function(data){
			    	order.orderId = data.data.orderId;
			    	order.cart = cart;
			    	deferred.resolve(data);
			    }, function(e){
			    	deferred.resolve(e);
			    })

			    return deferred.promise;
	    	},

	    	getOrder : getOrder
    	}
    }])
})();