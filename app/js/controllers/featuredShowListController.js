/*
* Ce contrôleur gère la page des spectacles en vedette
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('featuredShowListController', [ "showService", "$scope", "$q", "$timeout", "messageService", 
        function(showService, $scope, $q, $timeout, messageService){
    	$scope.shows = [];

    	var init = function(){
    		loadingScreen.show();

    		return $q.all([
    			showService.getListFeaturedShows(),
    			// d'autres appels asynchrones peuvent être faits ici

    		]).then(function(res){
    			return {
    				featuredShows : res[0].data
    			}
    		}).catch(function(e){
                messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
            })
    	}



    	init().then(function(res){
    		loadingScreen.hide();
            if (res){
                // on affiche seulement les spectacles qui ont au moins une présentation
                res.featuredShows.forEach(function(fs){
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

                //dirty, but oh well, last minute
                $scope.ad = {};
                function initAds() {
                    if (!$("#id_0 img").attr("src")) {
                        $timeout(function(){
                            initAds();
                        }, 500)
                    } else {
                        $scope.ad.url = "http:" + $("#id_0").attr("href");
                        $scope.ad.imgSrc = "http:" + $("#id_0 img").attr("src");
                    }
                }
                initAds();
            }
    	});

    }])
})();