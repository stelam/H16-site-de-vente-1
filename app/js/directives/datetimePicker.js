(function(){   
    "use strict";

    angular.module('app')
        .directive('datetimePicker', ['$location', function ($location) {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element) {

			        $(element).datetimepicker({useCurrent: false, debug: false});

			        $(element).on('dp.change', function(e){
			        	var date = moment(e.date._d);
			        	moment.locale("fr-CA");
			        	var dateString = moment(date).format('DD/MM/YYYY');
			        	window.location.href = 'spectacles-date.html'
			        })
                }
            }
        }]);
}());