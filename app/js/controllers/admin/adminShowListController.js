/*
* Contrôleur pour la liste des spectacles
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('adminShowListController', ["$scope", "$controller", "authenticationService", "$q", 
        function($scope, $controller, authenticationService, $q){
            var self = this;

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


    }])
})();