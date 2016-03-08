(function(){   
 "use strict";

  angular.module('app')
    .factory('checkoutService', ["$q", "CART",
	function($q, CART){
		var steps = [
            {
            	name : "review",
                state : "inactive",
                completed : false
            },

            {
            	name : "identification",
                state : "inactive",
                completed : false
            },

            {
            	name : "payment",
                state : "inactive",
                completed : false
            },
        ]

		var getSteps = function(){
			return steps;
		}

		var setCompletedStep = function(stepName){

			steps.forEach(function(s, i){
				if (s.name == stepName){
					s.state = "inactive clickable";
					s.completed = true;
				}
			})


		}

		var resetSteps = function(){
			steps.forEach(function(s, i){

				s.state = "inactive";
				s.completed = false;

			})
		}

		var isStepCompleted = function(stepName){
			var completed = false;
			steps.forEach(function(s, i){
				if (s.name == stepName){
					completed = s.completed;
				}
			})		
			return completed;	
		}

    	return {
    		getSteps : getSteps,
    		setCompletedStep : setCompletedStep,
    		resetSteps : resetSteps,
    		isStepCompleted : isStepCompleted
    	
    	}
    }])
})();