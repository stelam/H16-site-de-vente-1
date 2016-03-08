/*
* Directive qui permet de retourner à un état (route/page) précédent.
*/
(function(){   
    "use strict";

    angular.module('app')
        .directive('backButton', ['$window', function ($window) {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element) {
                    element.on('click', function() {
                        $window.history.back();
                    });

                }
            }
        }]);
}());