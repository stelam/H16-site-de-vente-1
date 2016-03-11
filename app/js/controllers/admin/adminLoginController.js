/*
* Contrôleur de base pour les contrôleurs admins 
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('adminLoginController', [ "adminAuthenticationService", "$q", "$controller", "$location", "$scope", "messageService",
        function(adminAuthenticationService , $q, $controller, $location, $scope, messageService){
            var self = this;
            $scope.login = {
                username: "",
                password: ""
            }
            // Instancier le contrôleur de base
            $controller('baseAdminController', { $scope: $scope });


            var init = function(){
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
                //loadingScreen.hide();


            });

            $scope.authenticate = function(){
                if ($scope.login.username && $scope.login.password) {
                    adminAuthenticationService.authenticate($scope.login.username, $scope.login.password).then(function(data){
                        //console.log(data);
                        $location.path("/spectacles");
                    }, function(){
                        messageService.showMessage(messageService.getMessage("ERROR_ADMIN_LOGIN"));
                    })                   
                } else {
                    messageService.showMessage(messageService.getMessage("ERROR_ADMIN_LOGIN"));
                }

            }


    }])
})();

