/*
* Directive pour l'indicateur d'étapes du processus de checkout
*
*/
(function(){   
    "use strict";

    angular.module('app')
        .directive('checkoutSteps', ['messageService', 'DIRECTIVE_TEMPLATE_PATH', '$timeout', '$rootScope', '$route', 
        function (messageService, DIRECTIVE_TEMPLATE_PATH, $timeout, $rootScope, $route) {
            return {
                restrict: 'E',
                scope: {

                },
                templateUrl: DIRECTIVE_TEMPLATE_PATH+"/checkout-steps-template.html",
                link: function (scope, element) {
                    scope.steps = [
                        {
                            state : "inactive"
                        },

                        {
                            state : "inactive"
                        },

                        {
                            state : "inactive"
                        },
                    ]

                    function resetStepsState() {
                        scope.steps.forEach(function(s){
                            s.state = "inactive";
                        })
                    }

                    if ($route.current.$$route.checkoutStep) {
                        scope.steps[$route.current.$$route.checkoutStep - 1].state = "active";
                    }

                    $rootScope.$on('$routeChangeStart', function (event, current, previous) {
                        if (current.$$route && current.$$route.checkoutStep) {
                            resetStepsState();
                            scope.steps[current.$$route.checkoutStep - 1].state = "active";
                        }
                        
                    });


                }
            }
        }]);
}());