/*
* Directive pour le widget de panier d'achat
*/
(function(){   
    "use strict";

    angular.module('app')
        .directive('cart', ['cartService', 'showService', 'DIRECTIVE_TEMPLATE_PATH', "CART", '$timeout', 'Slug', 
            function (cartService, showService, DIRECTIVE_TEMPLATE_PATH, CART, $timeout, Slug) {
            return {
                restrict: 'E',
                scope: {

                },
                templateUrl: DIRECTIVE_TEMPLATE_PATH+"/cart-template.html",
                link: function (scope, element) {
                    scope.currentCart = cartService.currentCart;
                    scope.previousCart = $.extend( {}, scope.currentCart ); // garder en mémoire une copie du panier avant changements
                    scope.initialized = false;
                    scope.popover = {
                        content : ""
                    }

                    // écouter les changements faits au panier
                    scope.$watch('currentCart.totalNbItems', function(newNbItems){
                        if (!scope.initialized){
                            scope.initialized = true;
                        }

                        // si des items ont été ajoutés
                        if (newNbItems > scope.previousCart.totalNbItems) {
                            scope.flashCart();
                            scope.showPopover({type:"itemsAdded"})
                        } else if (newNbItems < scope.previousCart.totalNbItems) {
                            scope.flashCart();
                        }

                        // mise à jour de l'ancien panier
                        scope.previousCart = $.extend( {}, scope.currentCart );

                    }, true);

                    // observer les items expirés
                    scope.$watch('currentCart.expiredItems', function(expiredItems){
                        if (expiredItems && expiredItems.length > 0) {
                            var expiredItem = scope.currentCart.expiredItems[expiredItems.length - 1];

                            loadingScreen.show();
                            console.log(expiredItems)
                            scope.showPopover({
                                type:"expiredItem",
                                show: expiredItem.show,
                                item: expiredItem
                            });
                            cartService.removeExpiredItem(expiredItem);
                            loadingScreen.hide();
                           
                        }

                    }, true)


                    scope.flashCart = function(){
                        $(element).find(".nb-cart-items").removeClass("animate");
                        $timeout(function(){
                            $(element).find(".nb-cart-items").addClass("animate");
                        }, 25);
                        
                    }

                    scope.showPopover = function(options) {
                
                        if (options.type == "itemsAdded") {
                            scope.popover.title = "Billets ajoutés au panier";
                            scope.popover.content = "<p>Vos billets vous sont réservés pour une durée de " + CART.RESERVATION_TIME +" minutes à partir du moment de l'ajout du premier billet pour un spectacle donné.</p> <a href='#/caisse/revue' class='btn btn-block btn-goevents'>Passer à la caisse</a>";
                        } else if (options.type == "expiredItem") {
                            console.log(options);
                            var ticket = showService.getTicketInShowObjByTicketId(options.show, options.item.itemId);
                            var slugOptions = (ticket) ? {date:ticket.date} : {};
                            var showUrl = "spectacle/" + showService.getShowSlug(options.show, slugOptions);
                            scope.popover.title = "Billets retirés du panier";
                            scope.popover.content = "<p>Le spectacle '<strong>" +options.show.name+ "</strong>' a été retiré de votre panier car le délais de réservation a expiré.</p> <a href='#/" +showUrl+ "' class='btn btn-block btn-goevents'>Page du spectacle</a>";
                        }

                        $timeout(function(){
                            $(element).find("#cart-btn").popover({
                                html: true,
                                trigger : 'manual',
                                placement : 'bottom'
                            });

                            $(element).find("#cart-btn").popover('show');                            
                        })

                    }


                }
            }
        }]);
}());