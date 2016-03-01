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
        var self = this;

    	var init = function(){
            var asyncCalls = [];

    		loadingScreen.show();
            self.checkForDateFilter();

            // si un filtre de date a été passé, mettre dans la queue
            // la méthode qui va chercher les spectacles pour une date donnée
            if ($scope.dateFilter) {
                asyncCalls.push(showService.getListShowsByDate($scope.dateFilter.dd, $scope.dateFilter.mm, $scope.dateFilter.yyyy))
            } else {
                asyncCalls.push(showService.getListShows());
            }

    		return $q.all(asyncCalls).then(function(res){
    			return {
    				shows : res[0].data.shows
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



    	init().then(function(res){
    		loadingScreen.hide();
            if (res){
                $scope.shows = res.shows;
            }
    		

            if ($scope.dateFilter) {
                $rootScope.title = "Spectacles du " + $scope.dateFilter.dd + "/" + $scope.dateFilter.mm + "/" + $scope.dateFilter.yyyy;
            }
    	});

    }])
})();