/*
* Contrôleur pour un spectacle
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('adminShowController', ["$scope", "$controller", "authenticationService", "$q", 
        function($scope, $controller, authenticationService, $q){
            var self = this;
            $scope.show = {
                name: "",
                artistName: "",
                imageUrl: "",
                description: "",
                isFeatured: false,
                showPresentationList : [
                    {
                        timeinmillis: Date.now() * 1000,
                        numberOfPlaces: 0,
                        price: 0.00
                    }
                ]
            }

            // Instancier le contrôleur de base
            $controller('baseAdminController', { $scope: $scope });

            var init = function(){
                loadingScreen.show();

                // lorsque la sécurité sera implémentée dans le backend, vérifier
                // si logged in, sinon rediriger vers l'écran de login


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


            $scope.addPresentation = function(){
                $scope.show.showPresentationList.push({
                    timeinmillis: Date.now() * 1000,
                    numberOfPlaces: 0,
                    price: 0.00
                })
            }

            $scope.deletePresentation = function(pres, i){
                $scope.show.showPresentationList.forEach(function(p){
                    if(p == pres){
                        $scope.show.showPresentationList.splice(i, 1);
                    }
                })
            }


    }])
})();