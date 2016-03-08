/*
* Ce contrôleur gère la page des spectacles en vedette
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('featuredShowListController', [ "showService", "$scope", "$q", "messageService", function(showService, $scope, $q, messageService){
    	$scope.shows = [];

    	var init = function(){
    		loadingScreen.show();

    		return $q.all([
    			showService.getListFeaturedShows(),
    			// d'autres appels asynchrones peuvent être faits ici

    		]).then(function(res){
    			return {
    				featuredShows : res[0].data.featuredShows
    			}
    		}).catch(function(e){
                messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
            })
    	}



    	init().then(function(res){
    		loadingScreen.hide();
            if (res){
                $scope.shows = res.featuredShows;
            }
    	});

    }])
})();