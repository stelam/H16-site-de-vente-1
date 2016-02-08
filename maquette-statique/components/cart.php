<!-- <header>
	<h1><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> Passer à la caisse</h1>
</header> -->

<div class="row upperNavigationContainer">
	<ul class="upperNavigation">	
		<li title="1" class="<?= ($_GET['step'] == 'review') ? 'active' : '' ?> externalNavIcon">
			<a data-guide-toggle="tab" href="?page=panier&step=review">
				<span>Revue des items <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></span>
			</a>
			<span class="step-nb">1</span>			
		</li>	
		<li title="2" class="<?= ($_GET['step'] == 'identification') ? 'active' : '' ?> externalNavIcon">
			<a data-guide-toggle="tab" href="?page=panier&step=identification">
				<span>Identification <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></span>
			</a>	
			<span class="step-nb">2</span>		
		</li>	
		<li title="3" class="<?= ($_GET['step'] == 'payment') ? 'active' : '' ?> externalNavIcon" href="?page=panier&step=payment">
			<a data-guide-toggle="tab" href="?page=panier&step=payment">
				<span>Paiement et confirmation <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></span>
			</a> 
			<span class="step-nb">3</span>
		</li>
	</ul>
</div>

<?php if ($_GET['step'] == 'review') : ?>
	<div class="col-sm-9 cart-items">
		<div class="col-sm-12 head">
			<label class="col-sm-3">&nbsp;</label>
			<label class="col-sm-2">Date</label>
			<label class="col-sm-2">Lieu</label>
			<label class="col-sm-2">Prix</label>
			<label class="col-sm-2">Quantité</label>
			<label class="col-sm-1">&nbsp;</label>
		</div>

		<?php for ($i = 0; $i < 3; $i++) : ?>
			<article class="col-sm-12 cart-item">
				<div class="col-sm-3">
					Nom de l'artiste - Nom du spectacle
				</div>

				<div class="col-sm-2">
					<p>06/02/2016</p>
				</div>

				<div class="col-sm-2">
					<p>Centre Bell</p>
				</div>

				<div class="col-sm-2">
					19.99 $
				</div>

				<div class="col-sm-2">
					<input type="number" class="form-control input-lg" value="1" />
				</div>

				<div class="col-sm-1 actions">
					<a class="btn btn-goevents btn-lg"> x</a>
				</div>
			</article>
		<?php endfor; ?>
	</div>

	<div class="col-sm-3 subtotal-container">
		<h3>Sous-total : </h3>
		<div class="subtotal">
			<span><sup class="dollar-sign">$</sup>57<sup class="cents">99</sup></span>
		</div>

		<a class="btn btn-goevents btn-lg btn-continue" href="?page=panier&step=identification">Continuer <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
	</div>
<?php endif; ?>