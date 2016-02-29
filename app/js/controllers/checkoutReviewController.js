/*
* Ce contrôleur gère l'étape de revue des articles à la caisse
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('checkoutReviewController', [ "showService", "$scope", "$q", "$routeParams", "$rootScope", 
        function(showService, $scope, $q, $routeParams, $rootScope){
        var self = this;


        var init = function(){
            loadingScreen.show();

            return $q.all([
                showService.getShowById($scope.showId),
                // d'autres appels asynchrones peuvent être faits ici

            ]).then(function(res){
                return {
                    show : res[0].data.show
                }
            })
        }




    	init().then(function(res){
    		loadingScreen.hide();

    	});

    }])
})();