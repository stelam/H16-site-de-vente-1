(function(){   
 "use strict";

  angular.module('app')
    .controller('showDetailsController', [ "showService", "$scope", "$q", "$routeParams", "$rootScope", function(showService, $scope, $q, $routeParams, $rootScope){
    	$scope.show = {};
        $scope.showId = $routeParams.showId;

    	var init = function(){
    		loadingScreen.show();

    		return $q.all([
    			showService.getShowById($scope.showId),
    			// d'autres appels asynchrones peuvent être faits ici

    		]).then(function(res){
    			return {
    				show : res[0].data.show
    			}
    		})
    	}



    	init().then(function(res){
    		loadingScreen.hide();

    		$scope.show = res.show;

            $rootScope.title = $scope.show.title + " - " + $scope.show.artist + " - du " + $scope.show.date;   
    	});

    }])
})();