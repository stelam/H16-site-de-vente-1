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
				message: "Calmez-vous, vous ne pouvez réserver un total de plus de " + CART.MAX_SHOW_PURCHASE_QUANTITY + " billets par session."
			},

			"ERROR_DELETE_ITEM" : {
				type: "error",
				code: "CS4",
				title: "Erreur",
				message: "Erreur lors de la suppression de l'item du panier."
			},

			"ERROR_FORM" : {
				type: "error",
				code: "F1",
				title: "Erreur",
				message: "Veuillez vérifier les champs erronnés."
			},

			"ERROR_PREAUTHORIZATION_REJECTED" : {
				type: "error",
				code: "PR1",
				title: "Erreur",
				message: "La préautorisation a été rejetée. Veuillez vérifier que les informations que vous avez entrées sont valides et que le solde disponible à votre compte est suffisant."
			},

			"ERROR_PAYMENT_API" : {
				type: "error",
				code: "PR2",
				title: "Erreur",
				message: "Une erreur s'est produite lors de la préautorisation, veuillez réessayer."
			},

			"INFO_ADD_SUCCESSFUL" : {
				type: "info",
				code: "G1",
				title: "Information",
				message: "Ajout réussi."
			},

			"INFO_SAVE_SUCCESSFUL" : {
				type: "info",
				code: "G2",
				title: "Information",
				message: "Modification réussie."
			},

			"INFO_DELETE_SUCCESSFUL" : {
				type: "info",
				code: "G3",
				title: "Information",
				message: "Suppression réussie."
			},

			"ERROR_ADMIN_LOGIN" : {
				type: "error",
				code: "G3",
				title: "Erreur",
				message: "Échec lors de l'authentification."
			},
			"ERROR_REFERENCE_DELETE" : {
				type: "error",
				code: "G4",
				title: "Erreur",
				message: "Erreur : Cette entité ne peut être supprimée car elle est référencée par une autre."
			},

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