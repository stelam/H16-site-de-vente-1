<header>
	<?php if (isset($_GET['recherche'])) : ?>
		<h1><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> 11 spectacles correspondants à '<?= $_GET['recherche']; ?>'</h1>
	<?php else : ?>
		<h1><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> Tous les spectacles à l'affiche</h1>
	<?php endif; ?>
</header>

<div class="row shows small-gutter">

	<?php for ($i = 1; $i < 12; $i++) : ?>
		<article class="show-item col-sm-12 col-md-6 col-lg-4 <?php echo ($i == 6) ? 'full' : ''; ?>">
			<a href="?page=spectacle<?php echo ($i == 6) ? '&full=true' : ''; ?>">
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

	<?php if (!isset($_GET['recherche'])) : ?>
		<div class="clear"></div>
		<div class="row bottom-actions">
			<a class="btn btn-goevents btn-lg">Afficher plus de spectacles <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></a>
		</div>	
	<?php endif; ?>

</div>


