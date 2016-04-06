/*
* Contrôleur pour une salle de spectacle
* (création, édition)
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('adminTheaterController', ["$scope", "$routeParams", "$controller", "messageService", "$q", "$location", "provinceService", "theaterService", 
        function($scope, $routeParams, $controller, messageService, $q, $location, provinceService, theaterService){
            var self = this;
            var asyncCalls = [];

            // Instancier le contrôleur de base
            $controller('baseAdminController', { $scope: $scope });


            if ($routeParams.idTheater){
                asyncCalls.push(theaterService.getById($routeParams.idTheater));
            } else {
                $scope.theater = theaterService.emptyTheater;
            }

            $scope.provinces = provinceService.provinces;



            var init = function(){
                loadingScreen.show();


                return $q.all(asyncCalls).then(function(res){
                    if (res.length){
                        return {
                            theater : res[0].data
                        }                        
                    }

                }).catch(function(e){
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }


        	init().then(function(res){
        		loadingScreen.hide();

                if (res) {
                    $scope.theater = res.theater;
                }

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


            $scope.save = function(){
                loadingScreen.show();
                theaterService.edit($scope.theater).then(function(){
                    messageService.showMessage(messageService.getMessage("INFO_SAVE_SUCCESSFUL"));
                    $location.path("/salles");
                }, function(){
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }

    }])
})();