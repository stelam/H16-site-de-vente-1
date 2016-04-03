/*
* Contrôleur pour un spectacle
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('adminShowController', ["$scope", "$controller", "$location", "$routeParams", "messageService", "theaterService", "showService", "$q", 
        function($scope, $controller, $location, $routeParams, messageService, theaterService, showService, $q){
            var self = this;
            var asyncCalls = [
                theaterService.getAll()
            ]

            // Instancier le contrôleur de base
            $controller('baseAdminController', { $scope: $scope });

            $scope.cloning = false;

            // déterminer, selon l'url, si le user veut :
            // 1) éditer un show
            // 2) cloner un show
            // 3) créer un show
            if ($routeParams.idShow){
                asyncCalls.push(showService.getShowById($routeParams.idShow));
            } else if ($routeParams.idClonedShow) {
                asyncCalls.push(showService.getShowById($routeParams.idClonedShow));
                $scope.cloning = true;
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
                    if ($scope.theaters[0])
                        $scope.show.showPresentationList[0].numberOfPlaces = $scope.theaters[0].capacity;
                } else {
                    $scope.show = res.show;
                    $scope.formatPresentationDatesInReadable();

                    // obtenir les quantités restantes des présentations
                    $scope.show.showPresentationList.forEach(function(p){
                        loadingScreen.show();
                        showService.showPresentationDetails(p.id).then(function(data){
                            loadingScreen.hide();
                            p.numberOfTicketsRemaining = data.data.numberOfTicketsRemaining;
                            p.numberOfSoldTickets = p.numberOfPlaces - p.numberOfTicketsRemaining;
                        }, function(){
                            loadingScreen.hide();
                        })
                    })

                    // si c'est une duplication de spectacle
                    if ($scope.cloning) {
                        $scope.show.name = "Copie de " + $scope.show.name;
                        $scope.show.id = null;
                        $scope.show.showPresentationList.forEach(function(p){
                            p.id = null;
                        })
                    }
                }
        	});


            $scope.addPresentation = function(){
                $scope.show.showPresentationList.push({
                    timeinmillis: Date.now() * 1000,
                    theater: $scope.theaters[0],
                    numberOfPlaces: ($scope.theaters[0]) ? $scope.theaters[0].capacity : 0,
                    formattedDate: moment(Date.now()).format('DD/MM/YYYY'),
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
                console.log(($scope.show));
                showService.add($scope.show).then(function(){
                    messageService.showMessage(messageService.getMessage("INFO_ADD_SUCCESSFUL"));
                    $location.path("/spectacles");
                }, function(){
                    loadingScreen.hide();
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }

            $scope.save = function(){
                loadingScreen.show();
                console.log($scope.show)
                $scope.formatPresentationDatesInMillis();
                
                showService.edit($scope.show).then(function(){
                    messageService.showMessage(messageService.getMessage("INFO_SAVE_SUCCESSFUL"));
                    $location.path("/spectacles");
                }, function(){
                    loadingScreen.hide();
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }

            $scope.updateCapacity = function(presentation, theater){
                presentation.numberOfPlaces = presentation.theater.capacity;
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