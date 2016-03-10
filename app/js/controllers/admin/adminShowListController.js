/*
* Contrôleur pour la liste des spectacles
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('adminShowListController', ["$scope", "$controller", "showService", "$q", 
        function($scope, $controller, showService, $q){
            var self = this;
            $scope.unpublishedShows = [];

            // Instancier le contrôleur de base
            $controller('baseAdminController', { $scope: $scope });

            var init = function(){
                loadingScreen.show();

                return $q.all([
                    showService.getAll()

                ]).then(function(res){
                    return {
                        shows : res[0].data
                    }
                }).catch(function(e){
                    messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
                })
            }


        	init().then(function(res){
        		loadingScreen.hide();
                $scope.shows = res.shows;

        	});


    }])
})();