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
				province: "",
				postalCode: ""
			},
			email: ""
		}


		var setUser = function(u) {
			user = u;
		}

		var getFakeUser = function(){
			return {
				socialLogin : "12341234124",
				firstName: "John",
				lastName: "Doe",
				address : {
					civicNumber: "888",
					street: "Beaubien",
					city: "Montréal",
					province: "Québec",
					postalCode: "H0H0H0"
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