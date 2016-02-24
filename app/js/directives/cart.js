/*
* Directive pour le widget de panier d'achat
*/
(function(){   
    "use strict";

    angular.module('app')
        .directive('cart', ['cartService', 'DIRECTIVE_TEMPLATE_PATH', function (cartService, DIRECTIVE_TEMPLATE_PATH) {
            return {
                restrict: 'E',
                scope: {

                },
                templateUrl: DIRECTIVE_TEMPLATE_PATH+"/cart-template.html",
                link: function (scope, element) {
                    scope.currentCart = cartService.currentCart;
                }
            }
        }]);
}());