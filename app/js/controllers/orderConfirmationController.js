/*
* Ce contrôleur gère l'étape de sommaire avant confirmation
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('orderConfirmationController', [ "showService", "cartService", "checkoutService", "messageService", "authenticationService", "paymentService", "$scope", "$q", "$routeParams", "$location", "$rootScope", 
        function(showService, cartService, checkoutService, messageService, authenticationService, paymentService, $scope, $q, $routeParams, $location, $rootScope){
        var self = this;


        var init = function(){
            loadingScreen.show();
            $scope.currentCart = cartService.currentCart;
            $scope.user = authenticationService.getUser();

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

            // s'assurer de l'identification
            if (!$scope.user.firstName) {
                $location.path("/caisse/methode-identification");
            }

            // s'assurer que le paiement
            if (!checkoutService.isStepCompleted("payment")) {
                checkoutService.resetSteps();
                $location.path("/caisse/revue");
            }
            
            // vider le panier ici
            // reset les checkout steps ici    
    	});


        $scope.continue = function(){


        }


    }])
})();