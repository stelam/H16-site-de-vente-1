/*
* Ce contrôleur gère l'étape d'identification de l'utilisateur
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('checkoutReviewController', ["messageService", "$scope", "$q", "$routeParams", "$rootScope", 
        function(showService, cartService, messageService, $scope, $q, $routeParams, $rootScope){
        var self = this;


        var init = function(){
            loadingScreen.show();

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