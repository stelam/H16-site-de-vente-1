/*
* Ce contrôleur gère la page de détails d'un spectacle
*
*/

(function(){   
 "use strict";

  angular.module('app')
    .controller('showDetailsController', [ "showService", "messageService", "cartService", "$scope", "$q", "$routeParams", "$rootScope", "Slug", "$location",
    function(showService, messageService, cartService, $scope, $q, $routeParams, $rootScope, Slug, $location){

    	$scope.show = {};
        $scope.showId = $routeParams.showSlug.split("-").pop();
        $scope.itemOptions = {
            quantity : 1
        }
        $scope.cart = cartService;

        var self = this;

    	var init = function(){
    		loadingScreen.show();

    		return $q.all([
    			showService.getShowById($scope.showId),
    			// d'autres appels asynchrones peuvent être faits ici

    		]).then(function(res){
    			return {
    				show : res[0].data.show
    			}
    		}).catch(function(e){
                messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
            })
    	}


        this.validateSlug = function(show){
            return ($routeParams.showSlug == Slug.slugify(show.title+"-"+show.artist+"-"+$scope.showId));
        }



    	init().then(function(res){
    		loadingScreen.hide();

            if (res && self.validateSlug(res.show)) {
                $scope.show = res.show;

                // setter les quantités par défaut à 1 pour les billets
                $scope.show.tickets.forEach(function(ticket){
                    ticket.quantity = 1;
                })

                // si une date a été spécifiée dans l'URL, présélectionner le billet correspondant à cette date
                // sinon, sélectionner la première présentation par défaut
                if ($routeParams.dd && $routeParams.mm && $routeParams.yyyy) {
                    var preselectedTicket = showService.getTicketInShowObjByTicketDate($scope.show, $routeParams.dd+"/"+$routeParams.mm+"/"+$routeParams.yyyy);
                    if (preselectedTicket) {
                        $scope.itemOptions = preselectedTicket;
                    } else {
                        $scope.itemOptions = $scope.show.tickets[0];
                    }
                } else {
                    $scope.itemOptions = $scope.show.tickets[0];
                }
                

                // séparer les dollars et les cents
                $scope.show.dollars = $scope.show.price.toString().split(".")[0];
                $scope.show.cents = $scope.show.price.toString().split(".")[1];

                $rootScope.title = $scope.show.title + " - " + $scope.show.artist + " - du " + $scope.show.date;   
            } else {
                $location.path("/404");
            }


    	});


        $scope.addToCart = function(){
            loadingScreen.show();
            var item = {
                itemId : parseInt($scope.itemOptions.id),
                quantity: $scope.itemOptions.quantity,
                show: $scope.show,
                date: $scope.itemOptions.date,
                time: $scope.itemOptions.time
            }
            cartService.addItem(item, $scope.itemOptions.quantity).then(function(){
                loadingScreen.hide();
            }).catch(function(e){
                loadingScreen.hide();
                messageService.showMessage(e);

                // peut-être checker si le spectacle est devenu "sold out"
                // et changer l'état du spectacle en conséquence
            })
        }

        // vérifie si le billet présentement sélectionné est dans le panier
        // si oui, obtient aussi la quantité, le temps restant
        $scope.isTicketInCart = function(){
            return (cartService.getItemById($scope.itemOptions.id));
        }

    }])
})();