/*
* Contrôleur pour un spectacle
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('adminShowController', ["$scope", "$controller", "$location", "$routeParams", "authenticationService", "messageService", "theaterService", "showService", "$q", 
        function($scope, $controller, $location, $routeParams, authenticationService, messageService, theaterService, showService, $q){
            var self = this;
            var asyncCalls = [
                theaterService.getAll()
            ]

            // Instancier le contrôleur de base
            $controller('baseAdminController', { $scope: $scope });


            if ($routeParams.idShow){
                asyncCalls.push(showService.getShowById($routeParams.idShow));
            } else {
                $scope.show = showService.getEmpty;
            }

            var init = function(){
                loadingScreen.show();

                return $q.all(asyncCalls).then(function(res){
                    return {
                        theaters : res[0].data,
                        show: (res[1]) ? res[1].data : false
                    }
                }).catch(function(e){
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }


        	init().then(function(res){
        		loadingScreen.hide();
                $scope.theaters = res.theaters;

                // si c'est une nouvelle spectacle, on assigne la première salle par défaut
                if (!res.show){
                    $scope.show.showPresentationList[0].theater = $scope.theaters[0];
                } else {
                    $scope.show = res.show;
                    $scope.formatPresentationDatesInReadable();
                }
        	});


            $scope.addPresentation = function(){
                $scope.show.showPresentationList.push({
                    timeinmillis: Date.now() * 1000,
                    theater: $scope.theaters[0],
                    formattedDate: moment(Date.now()).format('DD/MM/YYYY'),
                    numberOfPlaces: 0,
                    price: 0.00
                })
            }

            $scope.deletePresentation = function(pres, i){
                $scope.show.showPresentationList.forEach(function(p){
                    if(p == pres){
                        $scope.show.showPresentationList.splice(i, 1);
                    }
                })
            }

            $scope.create = function(){
                loadingScreen.show();
                $scope.formatPresentationDatesInMillis();
                console.log(JSON.stringify($scope.show));
                showService.add($scope.show).then(function(){
                    messageService.showMessage(messageService.getMessage("INFO_ADD_SUCCESSFUL"));
                    $location.path("/spectacles");
                }, function(){
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }

            $scope.save = function(){
                loadingScreen.show();
                $scope.formatPresentationDatesInMillis();
                console.log($scope.show)
                showService.edit($scope.show).then(function(){
                    messageService.showMessage(messageService.getMessage("INFO_SAVE_SUCCESSFUL"));
                    $location.path("/spectacles");
                }, function(){
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }

            $scope.formatPresentationDatesInMillis = function(){
                $scope.show.showPresentationList.forEach(function(p){
                    p.timeinmillis = moment(p.formattedDate, 'DD/MM/YYYY').valueOf();
                })
            }

            $scope.formatPresentationDatesInReadable = function(){
                $scope.show.showPresentationList.forEach(function(p){
                    p.formattedDate = moment(p.timeinmillis).format("DD/MM/YYYY");
                })
            }


    }])
})();