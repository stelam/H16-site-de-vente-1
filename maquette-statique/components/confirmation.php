
<div class="col-sm-2">
	<!-- SOURCE : http://codepen.io/ashleygalante/pen/nwoKh -->
	<div class="checkmark">
	  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 161.2 161.2" enable-background="new 0 0 161.2 161.2" xml:space="preserve">
	<path class="path" fill="none" stroke="#f5f5f5" stroke-miterlimit="10" d="M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4
		c-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5
		c0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z"/>
	<circle class="path" fill="none" stroke="#f5f5f5" stroke-width="4" stroke-miterlimit="10" cx="80.6" cy="80.6" r="62.1"/>
	<polyline class="path" fill="none" stroke="#f5f5f5" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="113,52.8 
		74.1,108.4 48.2,86.4 "/>

	<circle class="spin" fill="none" stroke="#f5f5f5" stroke-width="4" stroke-miterlimit="10" stroke-dasharray="12.2175,12.2175" cx="80.6" cy="80.6" r="73.9"/>

	</svg>
	  
	</div>
</div>

<div class="col-sm-10 confirmation">
	<div class="col-sm-12">
		<h1>Votre commande a été placée avec succès</h1>
	</div>

	<div class="col-sm-12 instructions">
		<?php if (isset($_SESSION['oauth']) && $_SESSION['oauth'] == true) : ?>
			<p class=""><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> Vos billets peuvent être récupérés de façon électronique sur le site de portefeuille de billets, ainsi que par l'entremise de l'application mobile. </p>

			<a class="btn btn-goevents btn-lg" href="?page=confirmation">Aller sur le site de portefeuille de billets<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>

		<?php else : ?>
			<p class=""><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> Vos billets pourront être récupérés sur place, lors de la journée des événements : </p>
		<?php endif; ?>
	</div>

	<div class="col-sm-10 cart-items">
		<h2>Détails de la commande <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span> </h2>
		<div class="col-sm-12 head">
			<label class="col-sm-4">&nbsp;</label>
			<label class="col-sm-3">Date</label>
			<label class="col-sm-3">Lieu</label>
			<label class="col-sm-2">Quantité</label>
		</div>

		<?php for ($i = 0; $i < 3; $i++) : ?>
			<article class="col-sm-12 cart-item">
				<div class="col-sm-4">
					Nom de l'artiste - Nom du spectacle
				</div>

				<div class="col-sm-3">
					<p>06/02/2016</p>
				</div>

				<div class="col-sm-3">
					<p>Centre Bell</p>
				</div>

				<div class="col-sm-2 center">
					<p class="center">1</p>
				</div>
			</article>
		<?php endfor; ?>
	</div>
</div>