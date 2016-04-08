/*
* Ce contrôleur gère l'étape de revue des articles à la caisse
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('checkoutPaymentController', [ "$timeout", "$injector", "$location", "cartService", "checkoutService", "messageService", "authenticationService", "paymentService", "$scope", "$q", "$routeParams", "$rootScope", 
        function($timeout, $injector, $location, cartService, checkoutService, messageService, authenticationService, paymentService, $scope, $q, $routeParams, $rootScope){
        var self = this;

        var $validationProvider = $injector.get('$validation');

        var init = function(){
            loadingScreen.show();
            $scope.currentCart = cartService.currentCart;
            $scope.user = authenticationService.getUser();
            $scope.payment = paymentService.getPayment();
            $scope.payment.credit_card.first_name = $scope.user.firstName;
            $scope.payment.credit_card.last_name = $scope.user.lastName;
            $scope.payment.amount = $scope.currentCart.total.price;
            $scope.payment.label = "Test";

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

        $scope.validatePayment = function(){
            $validationProvider.validate($scope.paymentForm).success(function(){
                //$location.path("/caisse/informations-paiement");
                loadingScreen.show();
                console.log(JSON.stringify($scope.payment));
                paymentService.preauthorize($scope.payment).then(function(data){
                    loadingScreen.hide();
                    if (data.status == 200) {
                        paymentService.setPaymentPreauthoriation(data.data);
                        $location.path("/caisse/sommaire");
                    } else {
                        messageService.showMessage(messageService.getMessage("ERROR_PAYMENT_API"));

                    }
                }, function(errorData){
                    loadingScreen.hide();
                    if (errorData.status == 422) // le code va sûrement changer
                        messageService.showMessage(messageService.getMessage("ERROR_PREAUTHORIZATION_REJECTED"));
                    else{
                        messageService.showMessage(messageService.getMessage("ERROR_PAYMENT_API"));
                    }
                })
            }).error(function(e){
                messageService.showMessage(messageService.getMessage("ERROR_FORM"));
            })
        }


    }])
})();