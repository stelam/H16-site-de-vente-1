(function(){   
 "use strict";

  angular.module('app')
    .controller('featuredShowListController', [ "showService", "$scope", function(showService, $scope){
    	$scope.shows = [];

    	showService.getListFeaturedShows().then(function(data){
    		$scope.shows = data.data.featuredShows;
    		console.log($scope.shows);
    	})
    }])
})();