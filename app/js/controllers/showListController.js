(function(){   
 "use strict";

  angular.module('app')
    .controller('showListController', [ "showService", "$scope", "$q", function(showService, $scope, $q){
    	$scope.shows = [];

    	var init = function(){
    		loadingScreen.show();

    		return $q.all([
    			showService.getListShows(),
    			// d'autres appels asynchrones peuvent être faits ici

    		]).then(function(res){
    			return {
    				featuredShows : res[0].data.shows
    			}
    		})
    	}



    	init().then(function(res){
    		loadingScreen.hide();

    		$scope.shows = res.featuredShows;
    	});

    }])
})();