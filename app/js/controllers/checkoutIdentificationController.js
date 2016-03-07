/*
* Ce contrôleur gère l'étape de revue des articles à la caisse
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('checkoutIdentificationController', [ "$timeout", "$location", "cartService", "messageService", "authenticationService", "$scope", "$q", "$routeParams", "$rootScope", 
        function($timeout, $location, cartService, messageService, authenticationService, $scope, $q, $routeParams, $rootScope){
        var self = this;


        var init = function(){
            loadingScreen.show();
            $scope.currentCart = cartService.currentCart;
            $scope.user = authenticationService.getUser();
            $scope.provinces = [
                {name: "Québec"},
                {name: "Ontario"}
            ]
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
            
            // s'assurer qu'il reste des items dans le panier
            $scope.$watch('currentCart.totalNbItems', function(newNbItems){
                if (newNbItems == 0) {
                    $location.path("/caisse/revue");
                }
            }, true);     
        });

        $scope.delegateAuth = function(){

            var newWindow = window.open("fake-auth-social.html",'Authentification sociale','height=225,width=500');
            if (window.focus) {newWindow.focus()}
            newWindow.onbeforeunload = function(){
                loadingScreen.showFor(1500);
                var user = authenticationService.getFakeUser();
                authenticationService.setUser(user);
                $timeout(function(){

                    $location.path("/caisse/informations-paiement");
                }, 1500)
            }

        }


        $scope.submitAnonymousIdentification = function(){
            $location.path("/caisse/informations-paiement");
        }


    }])
})();