/*
* Directive pour la barre de recherche
*/
(function(){   
    "use strict";

    angular.module('app')
        .directive('search', ['$location', function ($location) {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element) {
                    element.bind("keypress", function (event) {
                        if(event.which === 13) {
                            $location.path("/spectacles/recherche/"+encodeURIComponent(element.val()));
                            event.preventDefault();
                        }
                    });

                }
            }
        }]);
}());