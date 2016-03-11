/*
* Ce contrôleur gère les pages de : 
*   - liste de tous les spectacles
*   - résultats de recherche
*   - spectacles pour une date donnée
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('showListController', [ "showService", "$scope", "$q", "$routeParams", "$rootScope", "messageService", 
        function(showService, $scope, $q, $routeParams, $rootScope, messageService){
    	$scope.shows = [];
        $scope.dateFilter = false;
        $scope.searchQuery = false;
        var self = this;

    	var init = function(){
            var asyncCalls = [];

    		loadingScreen.show();
            self.checkForDateFilter();
            self.checkForSearchQuery();

            // si un filtre de date a été passé, mettre dans la queue
            // la méthode qui va chercher les spectacles pour une date donnée
            if ($scope.dateFilter) {
                asyncCalls.push(showService.getListShowsByDate($scope.dateFilter.dd, $scope.dateFilter.mm, $scope.dateFilter.yyyy))
            // si c'est une recherche
            } else if ($scope.searchQuery){
                asyncCalls.push(showService.searchByNameOrArtistName($scope.searchQuery)); // TODO : méthode de recherche
            } else {
                asyncCalls.push(showService.getListShows());
            }

    		return $q.all(asyncCalls).then(function(res){
    			return {
    				shows : res[0].data
    			}
    		}).catch(function(e){
                messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
            })
    	}

        this.checkForDateFilter = function(){
            if ($routeParams.dd && $routeParams.mm && $routeParams.yyyy){
                $scope.dateFilter = $routeParams;
            }
        }

        this.checkForSearchQuery = function() {
            if ($routeParams.searchQuery){
                $scope.searchQuery = decodeURIComponent($routeParams.searchQuery); //pt qu'il va falloir le laisser encodé pour le passer au backend
            }
        }


    	init().then(function(res){
    		loadingScreen.hide();
            if (res){
                // on affiche seulement les spectacles qui ont au moins une présentation
                res.shows.forEach(function(fs){
                    if (fs.showPresentationList && fs.showPresentationList.length > 0){
                        fs = showService.formatShow(fs);

                        var totalRemainingPlaces = 0;
                        fs.showPresentationList.forEach(function(p){
                            totalRemainingPlaces += p.numberOfPlaces;
                        })
                        fs.totalRemainingPlaces = totalRemainingPlaces;

                        $scope.shows.push(fs);
                    }
                        
                })
            }
    		

            if ($scope.dateFilter) {
                $rootScope.title = "Spectacles du " + $scope.dateFilter.dd + "/" + $scope.dateFilter.mm + "/" + $scope.dateFilter.yyyy;
            }
    	});

    }])
})();