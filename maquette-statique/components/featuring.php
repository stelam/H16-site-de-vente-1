<header>
	<h2><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> Des spectacles à ne pas manquer</h2>
</header>

<div class="row featuring small-gutter">

	<?php for ($i = 1; $i < 7; $i++) : ?>
		<article class="show-item col-sm-6">
			<a href="?page=spectacle">
				<img src="images/show-<?= $i ?>.jpg" />

				<span class="show-infos">
					<h3>Titre du spectacle</h3>
					<h4>9 janvier @ Centre Bell</h4>
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
		<a class="btn btn-goevents btn-lg" href="?page=spectacles">Voir tous les spectacles <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></a>
	</div>	

</div>


