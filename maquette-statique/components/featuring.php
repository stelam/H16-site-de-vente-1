<header>
	<h2><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> Des spectacles à ne pas manquer</h2>
</header>

<div class="row featuring small-gutter">
	

	<?php for ($i = 1; $i < 7; $i++) : ?>
		<article class="show-item col-sm-6">
			<a href="?page=spectacle&id=<?= $i ?>">
				<img alt="image du spectacle" src="images/show-<?= $i ?>.jpg" />

				<div class="show-infos">
					<h2>Titre du spectacle</h2>
					<h3>9 janvier au 12 janvier @ Centre Bell</h3>
				</div>

			</a>

			<div class="quick-links">
				<a href="#"></a>
				<a href="#"></a>
			</div>
		</article>

		<?php if ($i == 4) : ?>
			<a onclick="window.open('http://google.com');" title="Publicité" class="paraxify col-sm-12" style='background-image:url("/maquette-statique/images/pseudo-pub-6.jpg")'></a>
		<?php endif; ?>
	<?php endfor; ?>



	<div class="clear"></div>
	<div class="row bottom-actions">
		<a class="btn btn-goevents btn-lg" href="?page=spectacles">Voir tous les spectacles <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
	</div>	

</div>


