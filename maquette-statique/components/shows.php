<header>
	<?php if (isset($_GET['recherche'])) : ?>
		<h1><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> Spectacles correspondant à '<?= $_GET['recherche']; ?>'</h1>
	<?php else : ?>
		<h1><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> Tous les spectacles à l'affiche</h1>

	<?php endif; ?>
</header>

<div class="row shows small-gutter">

	<?php for ($i = 1; $i < 12; $i++) : ?>
		<article class="show-item col-sm-3">
			<a href="?page=spectacle">
				<img src="images/show-<?= $i ?>.jpg" />

				<span class="show-infos">
					<h2>Titre du spectacle</h2>
					<h3>9 janvier @ Centre Bell</h3>
				</span>

			</a>

			<div class="quick-links">
				<a href="#"></a>
				<a href="#"></a>
			</div>
		</article>
	<?php endfor; ?>


	<div class="clear"></div>
	<div class="row bottom-actions">
		<a class="btn btn-goevents btn-lg">Afficher plus de spectacles <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></a>
	</div>	

</div>


