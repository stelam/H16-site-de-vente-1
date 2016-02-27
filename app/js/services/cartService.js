(function(){   
 "use strict";

  angular.module('app')
    .factory('cartService', ["$http", 'localStorageService', "SHOW_API_BASE_URL", "CART", "showService", 
	function($http,localStorageService, SHOW_API_BASE_URL, CART, showService){
    	var self = this;
    	var currentCart = {
    		items: []
    	}

    	this.initCart = function(){
    		if (!localStorageService.get("cart")) {
    			localStorageService.set("cart", JSON.stringify(currentCart));
    		} else {
    			currentCart = JSON.parse(localStorageService.get("cart"));
    		}
    	}


    	this.initCart();

	    return {
	    	// TODO : grouper par item id
	    	addItem : function(item, quantity){

	    		return showService.isShowAvailable(item.itemId, quantity).then(function(data){
	    			if (data.data.available) {
			    		

			    		var itemIndex = _.findIndex(currentCart.items, "itemId", item.itemId);

			    		// si l'article est déjà dans le panier, on incrémente la quantité
			    		if (itemIndex > -1) {
			    			var existingItem = _.find(currentCart.items, "itemId", item.itemId);
			    			existingItem.quantity = (existingItem.quantity + quantity <= CART.MAX_SHOW_PURCHASE_QUANTITY) ? existingItem.quantity + quantity : CART.MAX_SHOW_PURCHASE_QUANTITY;
			    			currentCart.items[itemIndex] = existingItem;
			    		} else {
			    			currentCart.items.push(item);
			    		}

			    		// enregistrer les modifications dans le localstorage
			    		localStorageService.set("cart", JSON.stringify(currentCart));

			    		// TODO : appel au backend pour réserver un article pendant 20/10 minutes
			    		return $http({
							method: 'GET',
							url: 'http://agile-anchorage-60775.herokuapp.com/theater?id=1'
					    });
	    			} else {
	    				//retourner une erreur
	    			}
	    		})



	    	},

	    	getNbItems : function(){
	    		return currentCart.items.length;
	    	},

	    	currentCart : currentCart
	    } 
    }])
})();