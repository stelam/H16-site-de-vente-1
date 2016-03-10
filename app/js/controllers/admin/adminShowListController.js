/*
* Contrôleur pour la liste des spectacles
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('adminShowListController', ["$scope", "$controller", "showService", "messageService", "$q", 
        function($scope, $controller, showService, messageService, $q){
            var self = this;
            $scope.unpublishedShows = [];

            // Instancier le contrôleur de base
            $controller('baseAdminController', { $scope: $scope });

            var init = function(){
                loadingScreen.show();

                return $q.all([
                    showService.getListShows(),
                    showService.getListFeaturedShows()

                ]).then(function(res){
                    return {
                        shows : res[0].data,
                        featuredShows : res[1].data
                    }
                }).catch(function(e){
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }


        	init().then(function(res){
        		loadingScreen.hide();
                $scope.shows = res.shows;
                $scope.featuredShows = res.featuredShows;

        	});

            $scope.deleteShow = function(show){
                loadingScreen.show();

                showService.delete(show).then(function(){
                    $scope.shows.forEach(function(s,i){
                        if (s.id == show.id){
                            $scope.shows.splice(i,1);
                        }
                    })
                    $scope.featuredShows.forEach(function(s,i){
                        if (s.id == show.id){
                            $scope.featuredShows.splice(i,1);
                        }
                    })
                    loadingScreen.hide();
                    messageService.showMessage(messageService.getMessage("INFO_DELETE_SUCCESSFUL"));
                },function(e){
                    loadingScreen.hide();
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }


    }])
})();