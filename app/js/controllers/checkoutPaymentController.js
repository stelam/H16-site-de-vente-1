/*
* Ce contrôleur gère l'étape de revue des articles à la caisse
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('checkoutPaymentController', [ "$timeout", "$injector", "$location", "cartService", "messageService", "authenticationService", "paymentService", "$scope", "$q", "$routeParams", "$rootScope", 
        function($timeout, $injector, $location, cartService, messageService, authenticationService, paymentService, $scope, $q, $routeParams, $rootScope){
        var self = this;

        var $validationProvider = $injector.get('$validation');

        var init = function(){
            loadingScreen.show();
            $scope.currentCart = cartService.currentCart;
            $scope.user = authenticationService.getUser();
            $scope.payment = paymentService.getPayment();
            

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
                //$location.path("/caisse/methode-identification");
            }

            // s'assurer qu'il reste des items dans le panier
            $scope.$watch('currentCart.totalNbItems', function(newNbItems){
                if (newNbItems == 0) {
                    $location.path("/caisse/revue");
                }
            }, true);            

        });

        $scope.validatePayment = function(){
            $validationProvider.validate($scope.paymentForm).success(function(){
                //$location.path("/caisse/informations-paiement");
                loadingScreen.show();
                paymentService.preauthorize().then(function(data){
                    if (data.data.success == true) {
                        $location.path("/caisse/revue");
                    }
                }, function(errorData){
                    loadingScreen.hide();
                    messageService.showMessage(messageService.getMessage("ERROR_FORM"));
                })
            }).error(function(e){
                messageService.showMessage(messageService.getMessage("ERROR_FORM"));
            })
        }


    }])
})();