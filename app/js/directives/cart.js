/*
* Directive pour le widget de panier d'achat
*/
(function(){   
    "use strict";

    angular.module('app')
        .directive('cart', ['cartService', 'DIRECTIVE_TEMPLATE_PATH', '$timeout', function (cartService, DIRECTIVE_TEMPLATE_PATH, $timeout) {
            return {
                restrict: 'E',
                scope: {

                },
                templateUrl: DIRECTIVE_TEMPLATE_PATH+"/cart-template.html",
                link: function (scope, element) {
                    scope.currentCart = cartService.currentCart;
                    scope.initialized = false;

                    // écouter les changements faits au panier
                    scope.$watch('currentCart.totalNbItems', function(newCart){
                        if (scope.initialized)
                            scope.flashCart();
                        else {
                            scope.initialized = true;
                        }
                    }, true);


                    $(element).find("#cart-btn").popover({
                        html: true,
                        trigger : 'manual',
                        placement : 'bottom'
                    });

                    scope.flashCart = function(){
                        $(element).find(".nb-cart-items").removeClass("animate");
                        $(element).find("#cart-btn").popover('show');
                        $(element).find(".nb-cart-items").addClass("animate");
                    }

                }
            }
        }]);
}());