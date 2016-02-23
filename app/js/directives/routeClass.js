/*
* Directive qui ajoute une classe en fonction de la route courante
*/
(function(){   
    "use strict";

    angular.module('app')
        .directive('routeClass', ['$location', '$route', function ($location, $route) {
            return {
                restrict: 'A',
                scope: {

                },
                link: function (scope, element) {
                    scope.$on('$routeChangeSuccess', function() {
                        scope.class = $route.current.$$route.ident;

                        $(element).removeClass (function (index, css) {
                            return (css.match (/(^|\s)page-\S+/g) || []).join(' ');
                        });

                        $(element).addClass("page-" + scope.class);
                    }) 

                }
            }
        }]);
}());