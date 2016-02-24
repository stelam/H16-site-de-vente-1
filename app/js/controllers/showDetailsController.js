/*
* Ce contrôleur gère la page de détails d'un spectacle
*
*/

(function(){   
 "use strict";

  angular.module('app')
    .controller('showDetailsController', [ "showService", "cartService", "$scope", "$q", "$routeParams", "$rootScope", "Slug", "$location",
    function(showService, cartService, $scope, $q, $routeParams, $rootScope, Slug, $location){

    	$scope.show = {};
        $scope.showId = $routeParams.showSlug.split("-").pop();
        $scope.itemOptions = {
            quantity : 1
        }
        var self = this;

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


        this.validateSlug = function(show){
            return ($routeParams.showSlug == Slug.slugify(show.title+"-"+show.artist+"-"+$scope.showId));
        }



    	init().then(function(res){
    		loadingScreen.hide();

            if (self.validateSlug(res.show)) {
                $scope.show = res.show;

                $rootScope.title = $scope.show.title + " - " + $scope.show.artist + " - du " + $scope.show.date;   
            } else {
                $location.path("/404");
            }


    	});


        $scope.addToCart = function(){
            var item = {
                itemId : $scope.showId,
                quantity: $scope.itemOptions.quantity
            }
            cartService.addItem(item);
        }

    }])
})();