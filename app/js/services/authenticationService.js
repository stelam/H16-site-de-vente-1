(function(){   
 "use strict";

  angular.module('app')
    .factory('authenticationService', ["$q", "AUTH_API_BASE_URL", "$http",
	function($q, AUTH_API_BASE_URL, $http){
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

	    	authenticate : function(){
	    		return $http({
					method: 'POST',
					url: AUTH_API_BASE_URL+'/auth/authorizationrequest',
					data: {
						email : "stelam@gmail.com",
						password : "1212",
						client_id: 2,
						response_type: "code"
					}
			    });
	    	},

    	
    	}
    }])
})();