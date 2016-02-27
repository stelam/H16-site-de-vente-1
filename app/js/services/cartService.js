(function(){   
 "use strict";

  angular.module('app')
    .factory('cartService', ["$http", "$q", 'localStorageService', "SHOW_API_BASE_URL", "CART", "showService", 
	function($http, $q, localStorageService, SHOW_API_BASE_URL, CART, showService, messageService){
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

    	this.reserveItem = function(itemId, quantity){
    		return $http({
				method: 'GET',
				url: SHOW_API_BASE_URL+'/reservation/1' // TODO : mettre les vrais paramètres 
		    });	    
    	}

	    return {
	    	// TODO : grouper par item id
	    	addItem : function(item, quantity){
	    		var deferred = $q.defer();

	    		showService.isShowAvailable(item.itemId, quantity).then(function(data){
	    			if (data.data.available) {
			    		var itemIndex = _.findIndex(currentCart.items, "itemId", item.itemId);

			    		// si l'article est déjà dans le panier, on incrémente la quantité
			    		if (itemIndex > -1) {
			    			var existingItem = _.find(currentCart.items, "itemId", item.itemId);
			    			item.quantity = (existingItem.quantity + quantity <= CART.MAX_SHOW_PURCHASE_QUANTITY) ? existingItem.quantity + quantity : CART.MAX_SHOW_PURCHASE_QUANTITY;
			    		}

			    		// appel pour enregistrer la réservation au backend
			    		return self.reserveItem(item.itemId, item.quantity).then(function(data){
			    			if (data.data.success) {
								// enregistrer les modifications dans le localstorage
								currentCart.items[itemIndex] = item;
				    			_.remove(currentCart.items, {itemId: item.itemId});
								currentCart.items.push(item);
					    		localStorageService.set("cart", JSON.stringify(currentCart));
					    		deferred.resolve(currentCart);

			    			} else {
			    				// retourner une erreur
			    				deferred.reject({
				    				type: "error",
				    				code: "CS1",
				    				message: "Erreur lors de l'ajout de l'article au panier."
				    			});
			    			}

			    		}, function(){
			    			// erreur d'appel à l'API
			    			deferred.reject({
			    				type: "error",
			    				code: "CS2",
			    				message: "Erreur, veuillez recommencer."
			    			});
			    		})
	    			} else {
	    				//retourner une erreur (item non disponible)
	    				deferred.reject({
		    				type: "error",
		    				code: "CS3",
		    				message: "Désolé, l'item n'est plus disponible."
		    			});
	    			}1
	    		}, function(){
	    			// erreur d'appel à l'API
	    			deferred.reject({
	    				type: "error",
	    				code: "CS4",
	    				message: "Erreur, veuillez recommencer."
	    			});
	    		})
				
				return deferred.promise;


	    	},

	    	getNbItems : function(){
	    		return currentCart.items.length;
	    	},

	    	currentCart : currentCart
	    } 
    }])
})();