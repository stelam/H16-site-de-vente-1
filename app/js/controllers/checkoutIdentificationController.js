/*
* Ce contrôleur gère l'étape de revue des articles à la caisse
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('checkoutIdentificationController', ["$injector", "$timeout", "$location", "cartService", "checkoutService", "messageService", "authenticationService", "$scope", "$q", "$routeParams", "$rootScope", 
        function($injector, $timeout, $location, cartService, checkoutService, messageService, authenticationService, $scope, $q, $routeParams, $rootScope){
        var self = this;

        var $validationProvider = $injector.get('$validation');


        var init = function(){
            loadingScreen.show();
            $scope.currentCart = cartService.currentCart;
            $scope.user = authenticationService.getUser();
            $scope.provinces = ["Québec", "Ontario"]
             
            $scope.anonymousIdentificationForm = {}

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

            // s'assurer que la revue ait été faite
            if (!checkoutService.isStepCompleted("review")) {
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

        $scope.delegateAuth = function(){
            $location.path("/caisse/authentification-reseau-social");

        }


        $scope.submitAnonymousIdentification = function(){
            $validationProvider.validate($scope.anonymousIdentificationForm).success(function(){
                $scope.user.socialLogin = false;
                checkoutService.setCompletedStep("identification");
                $location.path("/caisse/informations-paiement");
            }).error(function(e){
                messageService.showMessage(messageService.getMessage("ERROR_FORM"));
            })
        }

        $scope.submitSocialAuthentication = function(){
            loadingScreen.show();
            $validationProvider.validate($scope.authenticationForm).success(function(){
                authenticationService.authenticate($scope.user).then(function(){
                    checkoutService.setCompletedStep("identification");
                    $location.path("/caisse/informations-paiement");
                    loadingScreen.hide();
                }, function(){
                    // temporary
                    checkoutService.setCompletedStep("identification");
                    $scope.user = authenticationService.getFakeUser();
                    $scope.user.socialLogin = true;
                    authenticationService.setUser($scope.user);
                    loadingScreen.hide();
                    $location.path("/caisse/informations-paiement");
                })
            }).error(function(e){
                loadingScreen.hide();
            })
        }


    }])
})();