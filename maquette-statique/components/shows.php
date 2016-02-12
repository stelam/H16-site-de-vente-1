<header class="shows-header">
	<?php if (isset($_GET['recherche'])) : ?>
		<h1><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> 11 spectacles correspondants à '<?= $_GET['recherche']; ?>'</h1>
	<?php else : ?>
		<h1><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> 
			<?php if (isset($_GET['date'])) : ?>
				Spectacles du <?= $_GET['date'] ?>
			<?php else : ?>
				Tous les spectacles à l'affiche 
			<?php endif; ?>
			
			<div id="calendar" class='input-group date'>
				<input type='text' class='' />
				<span class="input-group-addon">
					<span class="glyphicon glyphicon-calendar" title="Voir les spectacles pour une date spécifique" aria-hidden="true"></span>
				</span>
			</div>
		</h1>
	<?php endif; ?>
</header>

  
<div class="row shows small-gutter">

	<?php for ($i = 1; $i < 12; $i++) : ?>
		<article class="show-item col-sm-12 col-md-6 col-lg-4 <?php echo ($i == 6) ? 'full' : ''; ?>">
			<a href="?page=spectacle&id=<?= $i ?><?php echo ($i == 6) ? '&full=true' : ''; ?>">
				<img alt="image du spectacle" src="images/show-<?= $i ?>.jpg" />

				<span class="show-infos">
					<h2>Titre du spectacle</h2>
					<h3>9 janvier au 12 janvier @ Centre Bell</h3>
				</span>

			</a>

			<div class="quick-links">
				<a href="#"></a>
				<a href="#"></a>
			</div>
		</article>

		<?php if ($i == 6) : ?>
			<a onclick="window.open('http://google.com');" title="Publicité" class="paraxify col-sm-12" style='background-image:url("/maquette-statique/images/pseudo-pub-7.jpg")'></a>
		<?php endif; ?>

	<?php endfor; ?>

	<?php if (!isset($_GET['recherche'])) : ?>
		<div class="clear"></div>
		<div class="row bottom-actions">
			<a class="btn btn-goevents btn-lg">Afficher plus de spectacles <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></a>
		</div>	
	<?php endif; ?>

</div>


