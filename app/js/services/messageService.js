(function(){   
 "use strict";

  angular.module('app')
    .factory('messageService', ["$q", "CART",
	function($q, CART){
		var message = {
			type: "",
			code: "",
			title: "",
			message: ""
		};

		var status = {
			show : false
		};

		var messages = {
			"ERROR_API_CALL" : {
				type: "error",
				code: "API1",
				title: "Erreur",
				message: "Erreur, veuillez recommencer."
			},

			"ERROR_ADD_ITEM_TO_CART" : {
				type: "error",
				code: "CS1",
				title: "Erreur",
				message: "Erreur lors de l'ajout de l'article au panier."
			},

			"ERROR_ITEM_UNAVAILABLE" : {
				type: "error",
				code: "CS2",
				title: "Erreur",
				message: "L'item n'est plus disponible"
			},

			"ERROR_MAX_PURCHASE_QUANTITY_EXCEEDED" : {
				type: "error",
				code: "CS3",
				title: "Erreur",
				message: "Désolé, vous ne pouvez réserver un total de plus de " + CART.MAX_SHOW_PURCHASE_QUANTITY + " billets pour un spectacle."
			}
		};

    	return {
    		showMessage: function(msg){
    			message.type = msg.type;
    			message.code = msg.code;
    			message.title = msg.title;
    			message.message = msg.message;
				status.show = true;
    		},

    		getMessage: function(messageIdent, options){
    			var m = {
					type: "",
					code: "",
					title: "",
					message: ""
    			};

    			for (var ident in messages) {
    				if (ident === messageIdent) {
    					m = messages[ident];
    				}
    			}

    			if (options && options.messageOverride) {
    				m.message = options.messageOverride;
    			}

    			return m;
    		},

    		message : message,
    		status: status

    	}
    }])
})();