/*
* Contrôleur pour une salle de spectacle
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('adminTheaterController', ["$scope", "$controller", "authenticationService", "$q", "$location", "provinceService", "theaterService", 
        function($scope, $controller, authenticationService, $q, $location, provinceService, theaterService){
            var self = this;
            $scope.theater = {
                name: "",
                phoneNumber: "",
                zipCode : "",
                address : "",
                city : "",
                capacity : 0,
                province: {
                    provinceName: "Quebec"
                },
                active: true
            };

            $scope.provinces = provinceService.provinces;

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


            $scope.create = function(){
                loadingScreen.show();
                theaterService.add($scope.theater).then(function(){
                    messageService.showMessage(messageService.getMessage("INFO_ADD_SUCCESSFUL"));
                    $location.path("/salles");
                }, function(){
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }

    }])
})();