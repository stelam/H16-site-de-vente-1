<header>
	<h1><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> Des spectacles à ne pas manquer</h1>
</header>

<div class="row featuring small-gutter">
	

	<?php for ($i = 1; $i < 7; $i++) : ?>
		<?php if($i == 2) :  ?>
			<article class="show-item col-sm-6">
				<a href="http://google.com" target="_blank">
					<img alt="Publicité" src="images/pseudo-pub-2.jpg" />

					<div class="show-infos">
						<h3>Publicité</h3>
					</div>

				</a>
			</article>
		<?php else : ?>
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
		<?php endif; ?>

		<?php if ($i == 4) : ?>
			<a onclick="window.open('http://google.com');" title="Publicité" class="paraxify col-sm-12" style='background-image:url("images/pseudo-pub-6.jpg")'></a>
		<?php endif; ?>
	<?php endfor; ?>



	<div class="clear"></div>
	<div class="row bottom-actions">
		<a class="btn btn-goevents btn-lg" href="?page=spectacles">Voir tous les spectacles <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
	</div>	

</div>


