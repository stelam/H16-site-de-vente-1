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
                isFeatured: false,
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

            $scope.dateFilter = {
                dd:"11",
                mm:"03",
                yyyy:"2016"
            }

            // Instancier le contrôleur de base
            $controller('baseAdminController', { $scope: $scope });

            var init = function(){
                loadingScreen.show();

                // lorsque la sécurité sera implémentée dans le backend, vérifier
                // si logged in, sinon rediriger vers l'écran de login


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