/*
* Contrôleur pour la liste des salles
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('adminTheaterListController', ["$scope", "$controller", "authenticationService", "$q", "provinceService", "theaterService", 
        function($scope, $controller, authenticationService, $q, provinceService, theaterService){
            var self = this;
            $scope.theaters = [];
 

            // Instancier le contrôleur de base
            $controller('baseAdminController', { $scope: $scope });

            var init = function(){
                loadingScreen.show();


                return $q.all([
                    // d'autres appels asynchrones peuvent être faits ici
                    theaterService.getAll(),

                ]).then(function(res){
                    return {
                        theaters : res[0].data
                    }
                }).catch(function(e){
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }


        	init().then(function(res){
        		loadingScreen.hide();
                if (res){
                    $scope.theaters = res.theaters;
                }

        	});


    }])
})();