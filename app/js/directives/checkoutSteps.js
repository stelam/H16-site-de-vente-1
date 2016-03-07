/*
* Directive pour l'indicateur d'étapes du processus de checkout
*
*/
(function(){   
    "use strict";

    angular.module('app')
        .directive('checkoutSteps', ['messageService', 'DIRECTIVE_TEMPLATE_PATH', '$timeout', 
        function (messageService, DIRECTIVE_TEMPLATE_PATH, $timeout) {
            return {
                restrict: 'E',
                scope: {

                },
                templateUrl: DIRECTIVE_TEMPLATE_PATH+"/checkout-steps-template.html",
                link: function (scope, element) {
                   
                }
            }
        }]);
}());