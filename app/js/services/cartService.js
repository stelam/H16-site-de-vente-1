(function(){   
 "use strict";

  angular.module('app')
    .factory('cartService', ["$http", "$q", "$interval", 'localStorageService', "SHOW_API_BASE_URL", "CART", "showService", 
	function($http, $q, $interval, localStorageService, SHOW_API_BASE_URL, CART, showService, messageService){
    	var self = this;
    	var currentCart = {
    		items: [],
    		totalNbItems : 0
    	}

    	this.updateTimers = function(){
    		currentCart.items.forEach(function(item){
    			item.remainingReservationTime = item.timestampReservationEnd - Date.now();
    		})
    	}

    	this.initCart = function(){
    		if (!localStorageService.get("cart")) {
    			localStorageService.set("cart", JSON.stringify(currentCart));
    		} else {
    			currentCart = JSON.parse(localStorageService.get("cart"));
    		}

    		$interval(self.updateTimers, 1000);
    	}


    	this.initCart();

    	this.reserveItem = function(itemId, quantity){
    		return $http({
				method: 'GET',
				url: SHOW_API_BASE_URL+'/reservation/1' // TODO : mettre les vrais paramètres 
		    });	    
    	}

    	this.recountTotalNbItems = function(){
    		var t = 0;
    		currentCart.items.forEach(function(item){
    			t += item.quantity;
    		})
    		currentCart.totalNbItems = t;
    	}

    	this.getItemById = function(itemId){
    		var found = false;
    		currentCart.items.forEach(function(item){
    			if (parseInt(item.itemId) == parseInt(itemId))
    				found = item;
    		})

    		return found;
    	}

    	this.removeItemById = function(itemId) {
    		currentCart.items.forEach(function(item, index){
    			if (parseInt(item.itemId) == parseInt(itemId))
    				currentCart.items.splice(index, 1);	
    		})
    	}


	    return {
	    	// TODO : séparer ça en sous-méthodes
	    	addItem : function(item, quantity){
	    		var deferred = $q.defer();

	    		showService.isShowAvailable(item.itemId, quantity).then(function(data){
	    			if (data.data.available && data.data.maxQuantity >= quantity) {
			    		var existingItem = self.getItemById(item.itemId);

			    		// si l'article est déjà dans le panier, on incrémente la quantité
			    		if (existingItem) {
			    			item.quantity = existingItem.quantity + quantity;
			    		}

			    		// si l'utilisateur tente d'acheter trop de billets
			    		if (item.quantity > CART.MAX_SHOW_PURCHASE_QUANTITY) {
			    			deferred.reject({
			    				type: "error",
			    				code: "CS5",
			    				title: "Erreur",
			    				message: "Désolé, vous ne pouvez réserver un total de plus de " + CART.MAX_SHOW_PURCHASE_QUANTITY + " billets pour un spectacle."
			    			})
			    			return;
			    		}

			    		// appel pour enregistrer la réservation au backend
			    		return self.reserveItem(item.itemId, item.quantity).then(function(data){
			    			if (data.data.success) {
								// enregistrer les modifications dans le localstorage
								item.timestampAdded = Date.now();
								item.timestampReservationEnd = item.timestampAdded + CART.RESERVATION_TIME * 60000;

								self.removeItemById(item.itemId);
								currentCart.items.push(item);
								self.recountTotalNbItems();
					    		localStorageService.set("cart", JSON.stringify(currentCart));
					    		deferred.resolve(currentCart);

			    			} else {
			    				// retourner une erreur
			    				deferred.reject({
				    				type: "error",
				    				code: "CS1",
				    				title: "Erreur",
				    				message: "Erreur lors de l'ajout de l'article au panier."
				    			});
			    			}

			    		}, function(){
			    			// erreur d'appel à l'API
			    			deferred.reject({
			    				type: "error",
			    				code: "CS2",
			    				title: "Erreur",
			    				message: "Erreur, veuillez recommencer."
			    			});
			    		})
	    			} else {
	    				//retourner une erreur (item non disponible pour la quantité désirée)
	    				var message = (data.data.available) 
	    					? "Désolé, il ne reste que " + data.data.maxQuantity + " billets disponibles." 
	    					: "Désolé, tous les billets sont maintenant réservés ou vendus."

	    				deferred.reject({
		    				type: "error",
		    				code: "CS3",
		    				title: "Erreur",
		    				message: message
		    			});
	    			}1
	    		}, function(){
	    			// erreur d'appel à l'API
	    			deferred.reject({
	    				type: "error",
	    				code: "CS4",
	    				title: "Erreur",
	    				message: "Erreur, veuillez recommencer."
	    			});
	    		})
				
				return deferred.promise;


	    	},

	    	getNbItems : function(){
	    		return currentCart.items.length;
	    	},

	    	getItemById: self.getItemById,

	    	currentCart : currentCart
	    } 
    }])
})();