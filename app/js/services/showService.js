(function(){   
 "use strict";

  angular.module('app')
    .factory('showService', ["$http", "SHOW_API_BASE_URL", "Slug", function($http, SHOW_API_BASE_URL, Slug){
	    return {
	    	getListFeaturedShows : function(){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/shows/featured',
					params: 'limit=10, sort_by=created:desc', // exemple de params
					headers: {'Authorization': 'Token token=xxxxYYYYZzzz'} // exemple de token si on utilise cette méthode d'authentification
			    });
	    	},

	    	getListShows : function(){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/shows/'
			    });
	    	},

	    	getListShowsByDate : function(dd, mm, yyyy){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/shows/date/',
					params: 'dd=' + dd + ', mm=' + mm + ', yyyy=' + yyyy
			    });
	    	},

	    	getShowById : function(){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/show/1' // TODO: mettre le vrai id du spectacle quand le vrai service web sera disponible
			    });
	    	},

	    	getShowsById : function(listShowsId){
	    		listShowsId = [2,6]; // temporaire
	    		var ids = listShowsId.join(",");

	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/shows/' + ids // TODO: mettre les vrais ids des spectacle quand le vrai service web sera disponible
			    });
	    	},

	    	getShowByTicketId : function(){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/ticket/1/show'
			    });	 
	    	},

	    	isTicketAvailable : function(showId, quantity) {
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/ticket/1/available' // TODO: mettre le vrai id du spectacle quand le vrai service web sera disponible
					// et mettre en paramètre la quantité
			    });	    		
	    	},

	    	getShowSlug : function(show, options) {
	    		var slug = Slug.slugify(show.title+"-"+show.artist+"-"+show.id);
				if (options.date) {
					slug += "/" + options.date;
				}
				return slug;
	    	},

	    	getTicketInShowObjByTicketId : function(show, ticketId) {
	    		var found = false;
	    		show.tickets.forEach(function(ticket){
	    			if (parseInt(ticket.id) == parseInt(ticketId)) {
	    				found = ticket;
	    			}
	    		})
	    		return found;
	    	},

	    	getTicketInShowObjByTicketDate : function(show, ticketDate) {
	    		var found = false;
	    		show.tickets.forEach(function(ticket){
	    			if ((ticket.date) == (ticketDate)) {
	    				found = ticket;
	    			}
	    		})
	    		return found;
	    	},

	    	test: function(){
	    		return $http({
					method: 'GET',
					url: 'http://agile-anchorage-60775.herokuapp.com/theater?id=1'
			    });
	    		
	    	}
	    } 
    }])
})();