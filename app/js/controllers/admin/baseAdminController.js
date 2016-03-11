/*
* Contrôleur de base pour les contrôleurs admins 
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('baseAdminController', [ "adminAuthenticationService", "$q", "$location", "provinceService",
        function(adminAuthenticationService, $q, $location, provinceService){
        var self = this;


        var init = function(){
            loadingScreen.show();

            // lorsque la sécurité sera implémentée dans le backend, vérifier
            // si logged in, sinon rediriger vers l'écran de login

            return $q.all([
                // d'autres appels asynchrones peuvent être faits ici
                adminAuthenticationService.check()
            ]).then(function(res){
                return {
                    
                }
            }).catch(function(e){
                loadingScreen.hide();
                $location.path("/authentification")
            })
        }


    	init().then(function(res){
    		//loadingScreen.hide();


    	});


    }])
})();