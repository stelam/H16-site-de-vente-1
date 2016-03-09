/*
* Ce contrôleur gère l'étape de sommaire avant confirmation
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('orderConfirmationController', [ "showService", "cartService", "checkoutService", "messageService", "authenticationService", "orderService", "paymentService", "$scope", "$q", "$routeParams", "$location", "$rootScope", 
        function(showService, cartService, checkoutService, messageService, authenticationService, orderService, paymentService, $scope, $q, $routeParams, $location, $rootScope){
        var self = this;


        var init = function(){
            loadingScreen.show();
            $scope.user = authenticationService.getUser();
            $scope.order = orderService.getOrder();
            $scope.orderCart = JSON.parse(JSON.stringify(cartService.currentCart));; // on fait une copie du cart avant de le vider


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
            
            cartService.empty();
            checkoutService.resetSteps(); 
    	});


        $scope.continue = function(){


        }


    }])
})();