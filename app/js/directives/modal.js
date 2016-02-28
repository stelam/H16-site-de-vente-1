/*
* Directive pour le widget de modale / message
*/
(function(){   
    "use strict";

    angular.module('app')
        .directive('modal', ['messageService', 'DIRECTIVE_TEMPLATE_PATH', '$timeout', function (messageService, DIRECTIVE_TEMPLATE_PATH, $timeout) {
            return {
                restrict: 'E',
                scope: {

                },
                templateUrl: DIRECTIVE_TEMPLATE_PATH+"/modal-template.html",
                link: function (scope, element) {
                    scope.message = messageService.message;
                    scope.status = messageService.status;

                    // écouter pour voir s'il faut affiher la modale
                    scope.$watch('status', function(newStatus){
                        if (newStatus.show){
                            $(element).find("#modal").modal();
                        }
                    }, true);

                    // mise à jour du contenu du message
                    scope.$watch('message', function(msg){
                        console.log(msg);
                    }, true);

                    $(element).find("#modal").on('hidden.bs.modal', function (e) {
                        scope.status.show = false;
                    })
                }
            }
        }]);
}());