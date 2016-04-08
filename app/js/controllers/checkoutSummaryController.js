/*
* Ce contrôleur gère l'étape de sommaire avant confirmation
*
*
*/
(function(){   
 "use strict";

  angular.module('app')
    .controller('checkoutSummaryController', [ "showService", "cartService", "checkoutService", "messageService", "authenticationService", "paymentService", "orderService", "$scope", "$q", "$routeParams", "$location", "$rootScope", 
        function(showService, cartService, checkoutService, messageService, authenticationService, paymentService, orderService, $scope, $q, $routeParams, $location, $rootScope){
        var self = this;


        var init = function(){
            loadingScreen.show();
            $scope.currentCart = cartService.currentCart;
            $scope.user = authenticationService.getUser();

            return $q.all([
                // d'autres appels asynchrones peuvent être faits ici

            ]).then(function(res){
                return {
                    
                }
            }).catch(function(e){
                messageService.showMessage(messageService.getMessage("ERROR_API_CALL"));
            })
        }


    	init().then(function(res){
    		loadingScreen.hide();

            // s'assurer de l'identification
            if (!$scope.user.firstName) {
                $location.path("/caisse/methode-identification");
            }

            // s'assurer que la revue et l'identification aient été faite
            if (!checkoutService.isStepCompleted("review") && !checkoutService.isStepCompleted("identification")) {
                checkoutService.resetSteps();
                $location.path("/caisse/revue");
            }

            // s'assurer qu'il reste des items dans le panier
            $scope.$watch('currentCart.totalNbItems', function(newNbItems){
                if (newNbItems == 0) {
                    $location.path("/caisse/revue");
                    checkoutService.resetSteps();
                }
            }, true);      

            // s'assurer que le paiement est préauthorisé
            if (paymentService.getPaymentPreauthoriation().status != "authorized"){
                console.log(paymentService.getPaymentPreauthoriation().status);
                $location.path("/caisse/revue");
                checkoutService.resetSteps();
            }
    	});

        $scope.checkActive = function(){
            var deferred = $q.defer();
            loadingScreen.show();
            var shows;
            var error = false;
            $scope.itemsToRemove =[];
            // check if all presentations are still active
            showService.getListShows().then(function(data){
                shows = data.data;
                $scope.currentCart.items.forEach(function(item){
                    shows.forEach(function(s){
                        if (s.id == item.show.id) {
                            if (!s.active){
                                error = true;
                                $scope.itemsToRemove.push(item);
                            }
                        }
                    })
                })
                deferred.resolve(error);
            })

            return deferred.promise;
        }

        $scope.placeOrder = function(){
            loadingScreen.show();

            $scope.checkActive().then(function(error){
                if (!error) {
                    paymentService.pay().then(function(data){
                        loadingScreen.hide();
                        if (data.status == 200) { 

                            orderService.commitOrder($scope.currentCart, $scope.user, data.data.transactionId).then(function(orderData){

                                authenticationService.authenticate($scope.user).then(function(authData){
                                    if (authData.data.id >= 0) {
                                        orderService.commitToSocial(orderData.data, authData.data.accessToken, $scope.user.socialUserId).then(function(){
                                            checkoutService.setCompletedStep("payment");
                                            $location.path("/confirmation-achat");
                                        }, function(){
                                            checkoutService.setCompletedStep("payment");
                                            $location.path("/confirmation-achat");
                                            messageService.showMessage(messageService.getMessage("ERROR_COMMIT_SOCIAL"));
                                        })
                                    } else {
                                        checkoutService.setCompletedStep("payment");
                                        $location.path("/confirmation-achat");
                                        messageService.showMessage(messageService.getMessage("ERROR_COMMIT_SOCIAL"));
                                    }
                                }, function(){
                                    checkoutService.setCompletedStep("payment");
                                    $location.path("/confirmation-achat");
                                    messageService.showMessage(messageService.getMessage("ERROR_COMMIT_SOCIAL"));
                                })

                            }, function(){
                                messageService.showMessage(messageService.getMessage("ERROR_PAYMENT_API"));
                            })
                            
                        }
                    }, function(errorData){
                        loadingScreen.hide();
                        /*if (errorData.status == 406) // le code va sûrement changer
                            messageService.showMessage(messageService.getMessage("ERROR_PAYMENT_REJECTED"));
                        else
                            messageService.showMessage(messageService.getMessage("ERROR_PAYMENT_API"));*/
                        messageService.showMessage(messageService.getMessage("ERROR_PAYMENT_REJECTED"));
                        $location.path("/caisse/informations-paiement");
                    })
                } else {

                    for (var i =0; i< $scope.itemsToRemove.length; i++){
                        cartService.removeItem($scope.itemsToRemove[i]).then(function(){
                            loadingScreen.hide();
                            messageService.showMessage(messageService.getMessage("ERROR_INACTIVE_SHOW"));
                            $location.path("/caisse/revue");
                        })
                    }

                }
            })

            

        }


    }])
})();