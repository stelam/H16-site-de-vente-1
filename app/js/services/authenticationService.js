(function(){   
 "use strict";

  angular.module('app')
    .factory('authenticationService', ["$q",
	function($q){
		var user = {
			socialLogin : false,
			firstName: "",
			lastName: "",
			address : {
				civicNumber: "",
				street: "",
				city: "",
				province: ""
			},
			email: ""
		}


		var setUser = function(u) {
			user = u;
		}

		var getFakeUser = function(){
			return {
				socialLogin : true,
				firstName: "John",
				lastName: "Doe",
				address : {
					civicNumber: "888",
					street: "Beaubien",
					city: "Montréal",
					province: "Québec"
				},
				email: "john@gmail.com"
			}
		}

		var getUser = function(){
			return user;
		}

    	return {
    		getFakeUser: getFakeUser,
    		setUser: setUser,
    		getUser: getUser
    	
    	}
    }])
})();