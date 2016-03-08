/*
* Plugin jquery qui affiche un overlay de loading
*
* Auteur : Stéphane Lam
*
*/

(function() {

	var loadingScreen = Class.extend({
		init: function(){
			loadingScreen = this;
			this.$loadingScreenContainer = $("<div/>");
			this.$loadingScreenContainer.attr("id", "loading-screen");
			this.$loadingScreenContainer.addClass("hide").addClass("hidden");

			this.$loadingSpinner = $("<div/>");
			this.$loadingSpinner.addClass("spinner");
			this.$loadingCube1 = $("<div/>");
			this.$loadingCube1.addClass("double-bounce1");

			this.$loadingCube2 = $("<div/>");
			this.$loadingCube2.addClass("double-bounce2");

			this.$loadingSpinner.append(this.$loadingCube1);
			this.$loadingSpinner.append(this.$loadingCube2);

			this.$loadingScreenContainer.append(this.$loadingSpinner);

			
			$(document).ready(function(){
				$('body').append(loadingScreen.$loadingScreenContainer);
			})

			
		},

		show: function() {
			this.$loadingScreenContainer.removeClass("hide").addClass("show").removeClass("hidden");
		},

		hide: function() {
			this.$loadingScreenContainer.removeClass("show").addClass("hide");
			instance = this;
			setTimeout(function() {
				instance.$loadingScreenContainer.addClass("hidden");
			}, 1000)
		},

		showFor: function(time, callback) {
			instance = this;
			instance.show();
			setTimeout(function() {
				instance.hide();
				if (typeof callback == "function")
					callback();
		    }, time);
		}




	});

	window.loadingScreen = new loadingScreen();
})();