(function(){   
 "use strict";

  angular.module('app')
    .factory('authenticationService', ["$q", "SHOW_API_BASE_URL", "$http",
	function($q, SHOW_API_BASE_URL, $http){
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
			email: "",
			password: ""
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
				email: "john@gmail.com",
				password: ""
			}
		}

		var getUser = function(){
			return user;
		}

		var resetUser = function(){
			user = {
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
		}

		var setUserSocialLogin = function(socialLogin) {
			user.socialLogin = socialLogin;
		}

    	return {
    		getFakeUser: getFakeUser,
    		setUser: setUser,
    		getUser: getUser,
    		resetUser: resetUser,
    		setUserSocialLogin: setUserSocialLogin,

	    	authenticate : function(user){
	    		return $http({
					method: 'POST',
					url: SHOW_API_BASE_URL+'/social/authenticate',
				    headers: { 
				        'Accept': 'application/json',
				        'Content-Type': 'application/json' 
				    },
					data: {
						username: user.email,
						password: user.password
					}
			    });
	    	},

    	
    	}
    }])
})();