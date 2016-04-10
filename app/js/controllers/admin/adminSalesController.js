/*
* Contrôleur pour la liste des ventes
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('adminSalesController', ["$scope", "$controller", "messageService", "$q", "provinceService", "salesService", 
        function($scope, $controller, messageService, $q, provinceService, salesService){
            var self = this;
            $scope.sales = [];
 

            // Instancier le contrôleur de base
            $controller('baseAdminController', { $scope: $scope });

            var init = function(){
                loadingScreen.show();


                return $q.all([
                    // d'autres appels asynchrones peuvent être faits ici
                    salesService.getAll(),

                ]).then(function(res){
                    return {
                        sales : res[0].data
                    }
                }).catch(function(e){
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }


        	init().then(function(res){
        		loadingScreen.hide();
                if (res){
                    $scope.sales = res.sales;
                    console.log($scope.sales);
                }

        	});

    }])
})();