/*
* Ce contrôleur gère l'étape de sommaire avant confirmation
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('checkoutSummaryController', [ "showService", "cartService", "checkoutService", "messageService", "authenticationService", "$scope", "$q", "$routeParams", "$location", "$rootScope", 
        function(showService, cartService, checkoutService, messageService, authenticationService, $scope, $q, $routeParams, $location, $rootScope){
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
            console.log("in")
            // s'assurer de l'identification
            if (!$scope.user.firstName) {
                $location.path("/caisse/methode-identification");
            }

            // s'assurer que la revue et l'identification aient été faite
            if (!checkoutService.isStepCompleted("review") && !checkoutService.isStepCompleted("identification")) {
                checkoutService.resetSteps();
                $location.path("/caisse/revue");
            }

            // s'assurer qu'il reste des items dans le panier
            $scope.$watch('currentCart.totalNbItems', function(newNbItems){
                if (newNbItems == 0) {
                    $location.path("/caisse/revue");
                    checkoutService.resetSteps();
                }
            }, true);      
    	});


        $scope.continue = function(){
            checkoutService.setCompletedStep("review");
            loadingScreen.show();
            $location.path("/caisse/methode-identification");
        }


    }])
})();