(function(){   
 "use strict";

  angular.module('app')
    .factory('cartService', ["$http", "$q", "$interval", 'localStorageService', "SHOW_API_BASE_URL", "CART", "showService", "messageService", 
	function($http, $q, $interval, localStorageService, SHOW_API_BASE_URL, CART, showService, messageService){
    	var self = this;
    	var currentCart = {
    		items: [],
    		totalNbItems : 0,
    		expiredItems: []
    	}
    	

    	this.updateTimers = function(){
    		currentCart.items.forEach(function(item){
    			item.remainingReservationTime = item.timestampReservationEnd - Date.now();

    			if (item.remainingReservationTime <= 0) {
    				self.removeItemById(item.itemId);
    				self.addExpiredItem(item);
    				self.commitToLocalStorage();
    				// TODO : informer le user
    				// TODO : commiter au backend aussi
    			}
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
 	

    	this.reserveItem = function(item){
    		var deferred = $q.defer();

    		$http({
				method: 'GET',
				url: SHOW_API_BASE_URL+'/reservation/1' // TODO : mettre les vrais paramètres 
		    }).then(function(data){
    			if (data.data.success) {
					item.timestampAdded = Date.now();
					item.timestampReservationEnd = item.timestampAdded + CART.RESERVATION_TIME * 60000;
					self.addItem(item);
					deferred.resolve(true);

    			} else {
    				// retourner une erreur
    				deferred.reject(messageService.getMessage("ERROR_ADD_ITEM_TO_CART"));
    			}
		    }, function(){
                deferred.reject(messageService.getMessage("ERROR_API_CALL"));
		    });	    

		    return deferred.promise;
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

    	// ne commit pas les changements au LS ni au backend
    	this.removeItemById = function(itemId) {
    		currentCart.items.forEach(function(item, index){
    			if (parseInt(item.itemId) == parseInt(itemId)){
    				currentCart.items.splice(index, 1);	
    				self.recountTotalNbItems();
    			}
    		})
    	}

    	// ne commit pas les changements au LS ni au backend
    	this.replaceItem = function(item) {
    		var replaced = false;
    		currentCart.items.forEach(function(thisItem, index){
    			if (parseInt(thisItem.itemId) == parseInt(item.itemId)){
    				currentCart.items[index] = item;	
    				self.recountTotalNbItems();
    				replaced = true;
    			}
    		})
    		return replaced;
    	}	

    	// ne commit pas les changements au LS ni au backend
    	this.addItem = function(item) {
    		if(!self.replaceItem(item)){
    			currentCart.items.push(item);
    			self.recountTotalNbItems();
    		}
    	}	

    	// autocommit au LS
    	this.addExpiredItem = function(item){
    		currentCart.expiredItems.push(item);
    		self.commitToLocalStorage();
    	}

    	// autocommit au LS
    	this.removeExpiredItem = function(item){
			currentCart.expiredItems.forEach(function(thisItem, index){
    			if (parseInt(thisItem.itemId) == parseInt(item.itemId)){
    				currentCart.expiredItems.splice(index, 1);	
    				self.commitToLocalStorage();
    			}
    		})
    	}

    	this.isItemAvailable = function(itemId, quantity) {
    		var deferred = $q.defer();

    		showService.isTicketAvailable(itemId, quantity).then(function(data){
    			if (data.data.available && data.data.maxQuantity >= quantity) {
    				deferred.resolve(true);
    			} else {
    				//retourner une erreur (item non disponible pour la quantité désirée)
    				var message = (data.data.available) 
    					? "Désolé, il ne reste que " + data.data.maxQuantity + " billets disponibles." 
    					: "Désolé, tous les billets sont maintenant réservés ou vendus."

    				deferred.reject(messageService.getMessage("ERROR_ITEM_UNAVAILABLE", {messageOverride: message}));
    			}
    		}, function(){
    			deferred.reject(messageService.getMessage("ERROR_API_CALL"));
    		});

    		return deferred.promise;
    	}


    	this.validateItemQuantity = function(item) {
    		var deferred = $q.defer();
    		if (item.quantity <= CART.MAX_SHOW_PURCHASE_QUANTITY) {
    			deferred.resolve(true);
    		} else {
    			deferred.reject(messageService.getMessage("ERROR_MAX_PURCHASE_QUANTITY_EXCEEDED"));
    		}

    		return deferred.promise;
    	}

    	this.incrementItemQuantity = function(item, quantity){
    		var deferred = $q.defer();

    		var existingItem = self.getItemById(item.itemId);
    		if (existingItem) {
    			item.quantity = existingItem.quantity + quantity;
    		}
    		deferred.resolve(true);

    		return deferred.promise;
    	}

    	// commit les changements localstorage
    	this.commitToLocalStorage = function(){
    		var deferred = $q.defer();
    		localStorageService.set("cart", JSON.stringify(currentCart));
    		deferred.resolve(currentCart);

    		return deferred.promise;
    	}

		this.initCart();

	    return {
	    	addItem : function(item, quantity){
	    		return self.isItemAvailable(item.itemId, quantity)
	    			.then(function(data){return self.incrementItemQuantity(item, quantity)})
	    			.then(function(data){return self.validateItemQuantity(item)})
	    			.then(function(data){return self.reserveItem(item)})
	    			.then(function(data){return self.commitToLocalStorage()});

	    	},

	    	getNbItems : function(){
	    		return currentCart.items.length;
	    	},

	    	removeExpiredItem : function(item) {
	    		return self.removeExpiredItem(item);
	    	},

	    	getItemById: self.getItemById,

	    	currentCart : currentCart
	    } 
    }])
})();