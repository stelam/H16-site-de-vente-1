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
					<p class="reservation-timer">Ces billets vous sont réservés pour encore 8:32</p>
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
			<span><sup class="dollar-sign">$</sup>59<sup class="cents">97</sup></span>
		</div>

		<a class="btn btn-goevents btn-lg btn-continue" href="?page=panier&step=identification">Continuer <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
	</div>
<?php endif; ?>


<?php if ($_GET['step'] == 'identification' && !isset($_GET['substep'])) : ?>
	<div class="col-sm-5 identication-federation">
		<h2>Portefeuille de billets</h2>

		<p>Si vous possédez un compte sur le site de portefeuille de billets, vous pouvez vous authentifier directement via leur système.</p>

		<a class="btn btn-goevents btn-lg btn-continue" href="?page=panier&step=payment">S'authentifier <span class="glyphicon glyphicon-user" aria-hidden="true"></span></a>
	</div>

	<div class="col-sm-2 identification-or">
		<h3>- ou -</h3>
	</div>

	<div class="col-sm-5 pull-right identification-anon">
		<h2>Je n'ai pas de compte, je veux juste avoir mes billets %$#!@ !</h2>

		<p>Vous pouvez aussi obtenir vos billets en fournissant vos coordonnées.</p>

		<a class="btn btn-goevents btn-lg btn-continue" href="?page=panier&step=identification&substep=anon">Fournir ses coordonnées <span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></a>
	</div>

<?php elseif (isset($_GET['substep']) && $_GET['substep'] == 'anon') : ?>
	<form class="anon-form col-md-6 col-sm-12 col-md-offset-3">
		<h2>Vos coordonnées</h2>
		<div class="col-sm-6">
			<input type="text" class="form-control input-lg" name="prenom" placeholder="Prénom" />
		</div>

		<div class="col-sm-6 pull-right">
			<input type="text" class="form-control input-lg" placeholder="Nom" />
		</div>

		<div class="col-sm-3">
			<input type="text" class="form-control input-lg" placeholder="Numéro civique" />
		</div>

		<div class="col-sm-9">
			<input type="text" class="form-control input-lg" placeholder="Rue" />
		</div>

		<div class="col-sm-4">
			<input type="text" class="form-control input-lg" placeholder="Ville" />
		</div>

		<div class="col-sm-4">
			<select class="form-control input-lg">
				<option>- Choisir une province -</option>
				<option>Québec</option>
				<option>Ontario</option>
			</select>
		</div>

		<div class="col-sm-4">
			<input type="text" class="form-control input-lg" placeholder="Code postal" />
		</div>


		<div class="col-sm-12">
			<hr/>
			<a class="btn btn-goevents btn-lg" href="?page=panier&step=identification"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Revenir</a>
			<a class="btn btn-goevents btn-lg pull-right" href="?page=panier&step=payment">Continuer<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
		</div>
		
	</form>
<?php endif; ?>