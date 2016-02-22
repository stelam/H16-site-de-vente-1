(function(){   
 "use strict";

  angular.module('app')
    .controller('showListController', [ "showService", "$scope", "$q", "$routeParams", function(showService, $scope, $q, $routeParams){
    	$scope.shows = [];
        $scope.dateFilter = false;
        var self = this;

    	var init = function(){
    		loadingScreen.show();

            self.checkForDateFilter();

    		return $q.all([
    			showService.getListShows(),
    			// d'autres appels asynchrones peuvent être faits ici

    		]).then(function(res){
    			return {
    				featuredShows : res[0].data.shows
    			}
    		})
    	}

        this.checkForDateFilter = function(){
            if ($routeParams.dd && $routeParams.mm && $routeParams.yyyy){
                $scope.dateFilter = $routeParams;
            }
        }



    	init().then(function(res){
    		loadingScreen.hide();

    		$scope.shows = res.featuredShows;
    	});

    }])
})();