(function(){   
 "use strict";

  angular.module('app')
    .factory('showService', ["$http", "SHOW_API_BASE_URL", "Slug", function($http, SHOW_API_BASE_URL, Slug){

    	var _calculateShowDateFromTo = function(show){
    		var fromDate = 0;
    		var toDate = 0;
    		show.showPresentationList.forEach(function(presentation){
    			fromDate = (!fromDate || parseInt(presentation.timeinmillis) < fromDate) ? parseInt(presentation.timeinmillis) : fromDate;
    			toDate = (!toDate || parseInt(presentation.timeinmillis) > toDate) ? parseInt(presentation.timeinmillis) : toDate;
    		})
    		show.fromDate = fromDate;
    		show.toDate = toDate;
    		return show;
    	}

	    return {
	    	getListFeaturedShows : function(){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/show/featured',
					headers: {'Authorization': 'Token token=xxxxYYYYZzzz'} // exemple de token si on utilise cette méthode d'authentification
			    });
	    	},

	    	getListShows : function(){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/show/shows/'
			    });
	    	},

	    	getListShowsByDate : function(dd, mm, yyyy){
	    		
	    		var timeinmillis = moment(dd + "/" + mm + "/" + yyyy, "DD/MM/YYYY");
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/show',
					params: {'timeinmillis' : timeinmillis.valueOf()}
			    });
	    	},

	    	getShowById : function(id){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/show?id=' + id
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
					url: SHOW_API_BASE_URL+'/show/isShowAvailable', // TODO: mettre le vrai id du spectacle quand le vrai service web sera disponible
					params: {presentationShowId: showId, quantity: quantity}
			    });	    		
	    	},

	    	getShowSlug : function(show, options) {
	    		var slug = Slug.slugify(show.name+"-"+show.artistName+"-"+show.id);
				if (options.date) {
					slug += "/" + options.date;
				}
				return slug;
	    	},

	    	getTicketInShowObjByTicketId : function(show, ticketId) {
	    		var found = false;
	    		show.showPresentationList.forEach(function(ticket){
	    			if (parseInt(ticket.id) == parseInt(ticketId)) {
	    				found = ticket;
	    			}
	    		})
	    		return found;
	    	},

	    	getTicketInShowObjByTicketDate : function(show, ticketDate) {
	    		var found = false;
	    		show.showPresentationList.forEach(function(ticket){
	    			if ((ticket.date) == (ticketDate)) {
	    				found = ticket;
	    			}
	    		})
	    		return found;
	    	},

	    	add: function(show){
	    		return $http({
					method: 'POST',
					url: SHOW_API_BASE_URL+'/show/add',
					data: show
			    });
	    		
	    	},

	    	edit: function(show){
	    		return $http({
					method: 'PUT',
					url: SHOW_API_BASE_URL+'/show/edit',
					data: show
			    });
	    		
	    	},

	    	delete: function(show){
	    		return $http({
					method: 'DELETE',
					url: SHOW_API_BASE_URL+'/show/remove',
					params: {id: show.id}
			    });
	    		
	    	},

	    	formatShow : function(show){
	    		return _calculateShowDateFromTo(show);
	    	},

	    	searchByNameOrArtistName: function(query){
	    		return $http({
					method: 'GET',
					url: SHOW_API_BASE_URL+'/show/search',
					params: {query: query}
			    });
	    	},

	    	getEmpty: {
                name: "test",
                artistName: "art",
                imageUrl: "images/show-0.jpg",
                description: "tete",
                isFeatured: true,
                active: false,
                showPresentationList : [
                    {
                        timeinmillis: Date.now() * 1000,
                        formattedDate: moment(Date.now()).format('DD/MM/YYYY'),
                        numberOfPlaces: 0,
                        price: 0.00,
                        theater: {}
                    }
                ]
	    	}
	    } 
    }])
})();