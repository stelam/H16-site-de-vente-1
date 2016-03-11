/*
* Contrôleur de base pour les contrôleurs admins 
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('baseAdminController', [ "authenticationService", "$q", "$location", "provinceService",
        function(authenticationService, $q, $location, provinceService){
        var self = this;


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


    }])
})();