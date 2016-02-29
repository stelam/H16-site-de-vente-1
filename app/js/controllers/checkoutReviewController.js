/*
* Ce contrôleur gère l'étape de revue des articles à la caisse
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('checkoutReviewController', [ "showService", "cartService", "$scope", "$q", "$routeParams", "$rootScope", 
        function(showService, cartService, $scope, $q, $routeParams, $rootScope){
        var self = this;


        var init = function(){
            loadingScreen.show();
            $scope.cartItems = cartService.currentCart.items;
            console.log($scope.cartItems);

            return $q.all([
                // d'autres appels asynchrones peuvent être faits ici

            ]).then(function(res){
                return {
                    
                }
            })
        }




    	init().then(function(res){
    		loadingScreen.hide();

    	});

    }])
})();