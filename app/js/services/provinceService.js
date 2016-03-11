(function(){   
 "use strict";

  angular.module('app')
    .factory('provinceService', ["$q",
	function($q){
		
		var provinces = [
			{
				provinceName: "Alberta"
			},{
				provinceName: "Colombie-Britannique"
			},{
				provinceName: "Île-du-Prince-Édouard"
			},{
				provinceName: "Manitoba"
			},{
				provinceName: "Nouveau-Brunswick"
			},{
				provinceName: "Nouvelle-Écosse"
			},{
				provinceName: "Ontario"
			},{
				provinceName: "Quebec"
			},{
				provinceName: "Saskatchewan"
			},{
				provinceName: "Terre-Neuve-et-Labrador"
			},{
				provinceName: "Nunavut"
			},{
				provinceName: "Territoire du Nord-Ouest"
			},{
				provinceName: "Yukon"
			},


		]


    	return {
	    	

	    	provinces : provinces
    	}
    }])
})();
