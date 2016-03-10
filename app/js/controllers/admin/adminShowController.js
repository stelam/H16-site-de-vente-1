/*
* Contrôleur pour un spectacle
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('adminShowController', ["$scope", "$controller", "$location", "authenticationService", "messageService", "theaterService", "showService", "$q", 
        function($scope, $controller, $location, authenticationService, messageService, theaterService, showService, $q){
            var self = this;
            $scope.show = {
                name: "test",
                artistName: "art",
                imageUrl: "popo",
                description: "tete",
                isFeatured: true,
                showPresentationList : [
                    {
                        timeinmillis: Date.now() * 1000,
                        formattedDate: moment(Date.now()).format('DD/MM/YYYY'),
                        numberOfPlaces: 0,
                        price: 0.00,
                        theater: {}
                    }
                ]
            }

            // Instancier le contrôleur de base
            $controller('baseAdminController', { $scope: $scope });

            var init = function(){
                loadingScreen.show();

                return $q.all([
                    // d'autres appels asynchrones peuvent être faits ici
                    theaterService.getAll()

                ]).then(function(res){
                    return {
                        theaters : res[0].data
                    }
                }).catch(function(e){
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }


        	init().then(function(res){
        		loadingScreen.hide();
                $scope.theaters = res.theaters;

                // si c'est une nouvelle spectacle, on assigne la première salle par défaut
                if (!$scope.show.id && $scope.theaters.length){
                    $scope.show.showPresentationList[0].theater = $scope.theaters[0];
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
                console.log($scope.show);
                showService.add($scope.show).then(function(){
                    messageService.showMessage(messageService.getMessage("INFO_ADD_SUCCESSFUL"));
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


    }])
})();