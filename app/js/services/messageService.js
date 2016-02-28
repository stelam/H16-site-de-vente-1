(function(){   
 "use strict";

  angular.module('app')
    .factory('messageService', ["$q",
	function($q){
		var message = {
			type: "",
			code: "",
			title: "",
			message: ""
		};

		var status = {
			show : false
		};

    	return {
    		showMessage: function(msg){
    			message.type = msg.type;
    			message.code = msg.code;
    			message.title = msg.title;
    			message.message = msg.message;
				status.show = true;
    		},

    		message : message,
    		status: status

    	}
    }])
})();