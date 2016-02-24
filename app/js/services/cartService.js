(function(){   
 "use strict";

  angular.module('app')
    .factory('cartService', ["$http", 'localStorageService', "SHOW_API_BASE_URL", "CART", 
	function($http,localStorageService, SHOW_API_BASE_URL, CART){
    	var self = this;

    	this.initCart = function(){
    		if (!localStorageService.get("cart")) {
    			localStorageService.set("cart", '{"items": []}');
    		}
    	}


    	this.initCart();

	    return {
	    	// TODO : grouper par item id
	    	addItem : function(item){
	    		var currentCart = JSON.parse(localStorageService.get("cart"));
	    		currentCart.items.push(item);
	    		localStorageService.set("cart", JSON.stringify(currentCart));

	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/shows/featured',
					params: 'limit=10, sort_by=created:desc', // exemple de params
					headers: {'Authorization': 'Token token=xxxxYYYYZzzz'} // exemple de token si on utilise cette méthode d'authentification
			    });
	    	}
	    } 
    }])
})();