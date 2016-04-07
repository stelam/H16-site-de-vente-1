(function(){   
 "use strict";

  angular.module('app')
    .factory('orderService', ["$q", "$http", "SHOW_API_BASE_URL",
	function($q, $http, SHOW_API_BASE_URL){
		
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
	    		var ticketOrder = {
	    			ticketBoughtList : [],
	    			user : {
	    				name : user.firstName,
	    				familyName: user.lastName,
	    				zipCode: user.address.postalCode,
	    				address: user.address.civicNumber + " " + user.address.street,
	    				city: user.address.city
	    			},
	    			totalPrice: parseFloat(cart.total.dollars + "." + cart.total.cents)
	    		}

	    		cart.items.forEach(function(i){
	    			var ticket = {
	    				quantity: i.quantity,
	    				showPresentationId: i.itemId,
	    				ticketId: i.reservationId,
	    				price: i.price
	    			}
	    			ticketOrder.ticketBoughtList.push(ticket)
	    		})

	    		$http({
					method: 'POST',
					url: SHOW_API_BASE_URL+'/ticket/order', 
					withCredentials: true,
					data: ticketOrder
			    }).then(function(data){
			    	order.orderId = data.data.confirmationId;
			    	order.cart = cart;
			    	deferred.resolve(data);
			    }, function(e){
			    	deferred.reject(e);
			    })

			    return deferred.promise;
	    	},

	    	getOrder : getOrder
    	}
    }])
})();