/*
* Ce contrôleur gère l'étape de revue des articles à la caisse
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('checkoutReviewController', [ "showService", "cartService", "checkoutService", "messageService", "$scope", "$q", "$routeParams", "$location", "$rootScope", 
        function(showService, cartService, checkoutService, messageService, $scope, $q, $routeParams, $location, $rootScope){
        var self = this;


        var init = function(){
            loadingScreen.show();
            $scope.currentCart = cartService.currentCart;

            return $q.all([
                // d'autres appels asynchrones peuvent être faits ici

            ]).then(function(res){
                return {
                    
                }
            }).catch(function(e){
                messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
            })
        }


    	init().then(function(res){
    		loadingScreen.hide();

    	});

        $scope.changeItemQuantity = function(item, oldQuantity){

            // si la nouvelle quantité est invalide, 
            // remettre l'ancienne quantité
            if (!item.quantity) {
                item.quantity = parseInt(oldQuantity);
                messageService.showMessage(messageService.getMessage("ERROR_MAX_PURCHASE_QUANTITY_EXCEEDED"));
            } else {
                loadingScreen.show();

                cartService.updateItemQuantity(item, item.quantity).then(function(){
                    loadingScreen.hide();
                }).catch(function(e){
                    loadingScreen.hide();
                    messageService.showMessage(e);
                    item.quantity = parseInt(oldQuantity);
                })
            }
            
        }


        $scope.removeItem = function(item){
            loadingScreen.show();
            cartService.removeItem(item).then(function(){
                loadingScreen.hide();
            }).catch(function(e){
                loadingScreen.hide();
                messageService.showMessage(e);
            })
        }

        $scope.continue = function(){
            checkoutService.setCompletedStep("review");
            loadingScreen.show();
            $location.path("/caisse/methode-identification");
        }


    }])
})();