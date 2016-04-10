(function(){   
    "use strict";

    angular.module('app')
        .directive('datetimePicker', ['$location', function ($location) {
            return {
                restrict: 'A',
                scope: {
                	dateObj : "=",
                    link: "=",
                    dateModel: "="
                },
                link: function (scope, element) {
                	moment.locale("fr-CA");

                	var currentDate = (scope.dateObj) ? moment(scope.dateObj.dd + "/" + scope.dateObj.mm + "/" + scope.dateObj.yyyy, "DD/MM/YYYY") : false;
			        $(element).datetimepicker({useCurrent: false, debug: false, format: "DD/MM/YYYY HH:mm", defaultDate: currentDate});
 
                    if (scope.link == true) {
    			        $(element).on('dp.change', function(e){
    			        	var date = moment(e.date._d);
    			        	
    			        	var dateString = moment(date).format('DD/MM/YYYY');
    			        	//window.location.href = '#spectacles-date.html'
    			        	scope.$apply(function(){
    			        		$location.path("/spectacles/"+dateString);
    			        	})
    			        	
    			        })
                    }


                    // update the angular model
                    if (scope.dateModel) {
                        $(element).on('dp.change', function(e){
                            console.log("app")
                            var date = moment(e.date._d);
                            
                            var dateString = moment(date).format('DD/MM/YYYY');

                            scope.dateModel = dateString;
                        })
                    }
                }
            }
        }]);
}());