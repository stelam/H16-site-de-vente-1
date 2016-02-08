<header>
	<h1><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> Passer à la caisse</h1>
</header>

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
