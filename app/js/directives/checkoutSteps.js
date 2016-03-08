/*
* Directive pour l'indicateur d'étapes du processus de checkout
*
*/
(function(){   
    "use strict";

    angular.module('app')
        .directive('checkoutSteps', ['messageService', 'DIRECTIVE_TEMPLATE_PATH', '$timeout', '$rootScope', '$route', "checkoutService",
        function (messageService, DIRECTIVE_TEMPLATE_PATH, $timeout, $rootScope, $route, checkoutService) {
            return {
                restrict: 'E',
                scope: {

                },
                templateUrl: DIRECTIVE_TEMPLATE_PATH+"/checkout-steps-template.html",
                link: function (scope, element) {
                    scope.steps = checkoutService.getSteps();

                    function resetStepsState() {
                        scope.steps.forEach(function(s,i){
                            if (s.state == "active")
                                s.state = "inactive";
                            if (scope.steps[i-1] && scope.steps[i-1].completed){
                                var st = s.state.split(" ");
                                s.state = st[0] + " clickable";
                            }
                                
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