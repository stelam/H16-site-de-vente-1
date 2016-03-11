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
    				show : res[0].data
    			}
    		}).catch(function(e){
                messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
            })
    	}


        this.validateSlug = function(show){
            return ($routeParams.showSlug == Slug.slugify(show.name+"-"+show.artistName+"-"+$scope.showId));
        }



    	init().then(function(res){
    		loadingScreen.hide();

            if (res && self.validateSlug(res.show)) {
                $scope.show = res.show;

                var totalRemainingPlaces = 0;
                $scope.show.showPresentationList.forEach(function(p){
                    totalRemainingPlaces += p.numberOfPlaces;
                })
                $scope.show.totalRemainingPlaces = totalRemainingPlaces;

                // setter les quantités par défaut à 1 pour les billets
                $scope.show.showPresentationList.forEach(function(ticket){
                    ticket.quantity = 1;
                })

                // si une date a été spécifiée dans l'URL, présélectionner le billet correspondant à cette date
                // sinon, sélectionner la première présentation par défaut
                if ($routeParams.dd && $routeParams.mm && $routeParams.yyyy) {
                    var preselectedTicket = showService.getTicketInShowObjByTicketDate($scope.show, moment($routeParams.dd+"/"+$routeParams.mm+"/"+$routeParams.yyyy, "DD/MM/YYYY").toValue());
                    if (preselectedTicket) {
                        $scope.itemOptions = preselectedTicket;
                    } else {
                        $scope.itemOptions = $scope.show.showPresentationList[0];
                    }
                } else {
                    $scope.itemOptions = $scope.show.showPresentationList[0];
                }
                

                // séparer les dollars et les cents
                $scope.itemOptions.dollars = $scope.itemOptions.price.toString().split(".")[0];
                $scope.itemOptions.cents = $scope.itemOptions.price.toString().split(".")[1];

                showService.formatShow($scope.show);

                $rootScope.title = $scope.show.name + " - " + $scope.show.artistName;

            } else {
                $location.path("/404");
            }


    	});
        
        $scope.onPresentationChange = function(){
            $scope.itemOptions.dollars = $scope.itemOptions.price.toString().split(".")[0];
            $scope.itemOptions.cents = $scope.itemOptions.price.toString().split(".")[1];
        }

        $scope.addToCart = function(){
            loadingScreen.show();
            console.log($scope.itemOptions);
            var item = {
                itemId : parseInt($scope.itemOptions.id),
                quantity: $scope.itemOptions.quantity,
                show: $scope.show,
                date: $scope.itemOptions.timeinmillis,
                time: $scope.itemOptions.time,
                theater: $scope.itemOptions.theater,
                price: $scope.itemOptions.price
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