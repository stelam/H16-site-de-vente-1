(function(){   
 "use strict";

  angular.module('app')
    .factory('cartService', ["$http", "$q", "$rootScope", "$interval", 'localStorageService', "SHOW_API_BASE_URL", "REAL_SHOW_API_BASE_URL", "CART", "showService", "messageService",
	function($http, $q, $rootScope, $interval, localStorageService, SHOW_API_BASE_URL, REAL_SHOW_API_BASE_URL, CART, showService, messageService){
    	var self = this;
    	var currentCart = {
    		items: [],
    		totalNbItems : 0,
            total : {
                price : 0,
                dollars : 0,
                cents : 0
            },
    		expiredItems: []
    	}
    	

    	this.updateTimers = function(){
    		currentCart.items.forEach(function(item){
    			item.remainingReservationTime = item.timestampReservationEnd - Date.now();
                var inactiveTimeMinutes = ((Date.now() - $rootScope.inactiveSince) / 1000) / 60;

    			if (item.remainingReservationTime <= 0 || inactiveTimeMinutes >= item.inactivityExpirationDelay) {
    				self.removeItemById(item.itemId);
    				self.addExpiredItem(item);
    				self.commitToLocalStorage();
                    //self.commitDeleteItem(item);
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
 	

        // POST : ajout d'une nouvelle réservation
        // PUT : modification d'une réservation existante
    	this.commitReserveItem = function(item){
    		var deferred = $q.defer();
            var url = SHOW_API_BASE_URL + '/ticket/reserve';

            var existingItem = self.getItemById(item.itemId);

            if (existingItem) {
                existingItem.quantity = item.quantity;
                existingItem.oldQuantity = item.oldQuantity;
                item = existingItem;
                item.reservationId = existingItem.reservationId;
                console.log("NEW QUANTY" + item.quantity);
                //url += "/" + item.reservationId;
            }

            console.log(item.quantity);


            var ticketToSend = {
                showPresentationId : item.itemId,
                quantity: item.quantity
            }


    		$http({
				method: "POST",
				url: url,
                data: ticketToSend
		    }).then(function(data){
                console.log(data);
    			if (data.data.id >= 0) {
                    var reservationId = false;
                    var serverTicketList = data.data.ticketList;
                    // le timestamp devrait être retourné par l'API
                    // on utilise des timestamp local (client) pour l'instant

                    // le serveur nous retourne la liste des items réservés par le user
                    // il faut itérer à travers eux pour avoir l'item nouvellement ajouté
                    var receivedTicket;
                    serverTicketList.some(function(ticket){
                        if (ticket.showPresentationId == item.itemId) {
                            receivedTicket = ticket;
                            return reservationId = ticket.ticketId;
                        }
                    })
                    console.log(reservationId);
                    item.reservationId = reservationId;
                    item.timestampAdded = receivedTicket.timeinmillis;
                    item.timestampReservationEnd = receivedTicket.expiringTimeinmillis;
                    item.inactivityExpirationDelay = receivedTicket.inactivityExpirationDelay;
                    
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

        this.commitDeleteItem = function(item){
            var deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: SHOW_API_BASE_URL+'/reservation/' + item.reservationId // TODO : mettre les vrais paramètres 
            }).then(function(data){
                if (!data.data.success) {
                    deferred.reject(messageService.getMessage("ERROR_DELETE_ITEM"));
                } else {
                    deferred.resolve(true);
                }
            }, function(){
                deferred.reject(messageService.getMessage("ERROR_API_CALL"));
            });     

            return deferred.promise;
        }

    	this.recountTotalNbItems = function(){
    		/*var t = 0;
    		currentCart.items.forEach(function(item){
    			t += item.quantity;
    		})
    		currentCart.totalNbItems = t;*/
            currentCart.totalNbItems = currentCart.items.length;
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
                    console.log("replaced")
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

    	this.isItemAvailable = function(item, quantity) {
    		var deferred = $q.defer();

            var existingItem = self.getItemById(item.itemId);
            var existingItemQuantity = (existingItem && !item.reservationId) ? parseInt(existingItem.quantity) : 0;
            console.log(item.itemId);
            console.log(quantity);
    		showService.isTicketAvailable(item.itemId, quantity).then(function(data){
    			//if (data.data.available && parseInt(data.data.maxQuantity) >= quantity + existingItemQuantity) {
                if (data.data == true){
                    //self.ticketInCart();
    				deferred.resolve(true);
    			} else {
    				//retourner une erreur (item non disponible pour la quantité désirée)
                    //self.ticketInCart();
    				//var message = (data.data.available) 
    					//? "Désolé, cette quantité de billets n'est pas disponible." 
    					//: "Désolé, tous les billets sont maintenant réservés ou vendus."
                    var message = "Désolé, cette quantité de billets n'est pas disponible.";
    				deferred.reject(messageService.getMessage("ERROR_ITEM_UNAVAILABLE", {messageOverride: message}));

    			}
    		}, function(){
    			deferred.reject(messageService.getMessage("ERROR_API_CALL"));
    		});

    		return deferred.promise;
    	}

        this.ticketInCart = function(){
                $http({
                    method: 'GET',
                    url: SHOW_API_BASE_URL+'/ticket/inCart'
                }).then(function(data){
                    console.log(data);
                })
        }


    	this.validateItemQuantity = function(item) {
    		var deferred = $q.defer();
            var nbIndividualItems = 0;

            currentCart.items.forEach(function(i){
                nbIndividualItems += i.quantity;
            })
    		//if (item.quantity <= CART.MAX_SHOW_PURCHASE_QUANTITY) {

            // item.oldQuantity = item.quantity;

            if (nbIndividualItems + (item.quantity - item.oldQuantity) <= CART.MAX_SHOW_PURCHASE_QUANTITY){
    			deferred.resolve(true);
    		} else {
                console.log(nbIndividualItems + "+" + item.quantity);
    			deferred.reject(messageService.getMessage("ERROR_MAX_PURCHASE_QUANTITY_EXCEEDED"));
    		}

    		return deferred.promise;
    	}

    	this.incrementItemQuantity = function(item, quantity){
    		var deferred = $q.defer();

    		var existingItem = self.getItemById(item.itemId);
            
    		if (existingItem) {
                item.oldQuantity = existingItem.quantity;
    			item.quantity = existingItem.quantity + quantity;
    		} else {
                item.oldQuantity = 0;
            }
            console.log("oldqty="+item.oldQuantity);
    		deferred.resolve(true);

    		return deferred.promise;
    	}

        this.changeItemQuantity = function(item, newQuantity) {
            var deferred = $q.defer();

            var existingItem = self.getItemById(item.itemId);
            
            if (existingItem) {
                item.oldQuantity = existingItem.quantity;
            } else {
                item.oldQuantity = 0;
            }

            
            item.quantity = newQuantity;
            deferred.resolve(true);

            return deferred.promise;
        }

        // retourne la liste des IDs des spectacles qui correspondent
        // aux billets présentement dans le panier
        this.getListShowsId = function(){
            var listShowsId = [];
            currentCart.items.forEach(function(item){
                listShowsId.push(item.showId);
            })
            return listShowsId;
        }

    	// commit les changements localstorage
    	this.commitToLocalStorage = function(){
    		var deferred = $q.defer();
    		localStorageService.set("cart", JSON.stringify(currentCart));
    		deferred.resolve(currentCart);

    		return deferred.promise;
    	}

        this.updateCartTotal = function(){
            var deferred = $q.defer();
            var total = {
                price : 0,
                dollars : 0,
                cents : 0
            }

            currentCart.items.forEach(function(i){
                total.price += parseFloat(parseFloat(i.price) * parseInt(i.quantity));
            })
            total.price = total.price.toFixed(2);
            total.dollars += parseInt(total.price.toString().split(".")[0]);
            total.cents += parseInt(total.price.toString().split(".")[1]);

            currentCart.total = total;
            deferred.resolve(true);
            return deferred.promise;
        }

        this.updateItemQuantity = function(item, newQuantity) {
            return self.isItemAvailable(item, newQuantity)
                .then(function(data){return self.changeItemQuantity(item, newQuantity)})
                .then(function(data){return self.validateItemQuantity(item)})
                .then(function(data){return self.commitReserveItem(item)})
                .then(function(data){return self.updateCartTotal(item)})
                .then(function(data){return self.commitToLocalStorage()});
        }

        this.empty = function(){
            currentCart.items.forEach(function(item){
                self.commitDeleteItem(item);
                self.removeItemById(item.itemId);
                self.updateCartTotal(item);
                self.commitToLocalStorage();
            })
        }


		this.initCart();

	    return {
	    	addItem : function(item, quantity){
	    		return self.incrementItemQuantity(item, quantity)
	    			.then(function(data){return self.validateItemQuantity(item)})
                    .then(function(data){return self.isItemAvailable(item, item.quantity)})
	    			.then(function(data){return self.commitReserveItem(item)})
                    .then(function(data){return self.updateCartTotal(item)})
	    			.then(function(data){return self.commitToLocalStorage()});

	    	},

            updateItemQuantity : function(item, newQuantity) {
                return self.updateItemQuantity(item, newQuantity);
            },

	    	getNbItems : function(){
	    		return currentCart.items.length;
	    	},

            removeItem :function(item){
                /*return self.commitDeleteItem(item)
                    .then(function(data){return self.removeItemById(item.itemId)})
                    .then(function(data){return self.updateCartTotal(item)})
                    .then(function(data){return self.commitToLocalStorage()});*/
                return self.updateItemQuantity(item, 0)
                    .then(function(data){return self.removeItemById(item.itemId)})
                    .then(function(data){return self.updateCartTotal(item)})
                    .then(function(data){return self.commitToLocalStorage()});
            },

	    	removeExpiredItem : function(item) {
	    		return self.removeExpiredItem(item);
	    	},

            empty: self.empty,

	    	getItemById: self.getItemById,

	    	currentCart : currentCart,

            getListShowsId : self.getListShowsId
	    } 
    }])
})();