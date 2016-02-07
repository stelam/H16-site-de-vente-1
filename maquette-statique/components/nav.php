<header class="site-nav row">


	<nav class="col-sm-8">
		<h2 class="logo">
			<a href="?page=accueil">
				<img src="images/logo.png" alt="GO EVENTS!" />
			</a>
		</h2>
		
		<ul class="menu">
			<li class="<?php if ($page == 'accueil') echo 'active' ?>">
				<a href="?page=accueil">Accueil</a>
			</li>
			<li class="<?php if ($page == 'spectacles') echo 'active' ?>">
				<a href="?page=spectacles">Spectacles</a>
			</li>
		</ul>
	</nav>

	<div class="col-sm-4 pull-right right-actions">
		<form method="GET" action="" class="search-wrapper col-sm-10">
			<input name="recherche" class="search form-control input-lg" placeholder="Rechercher un spectacle ou un artiste..."/>
			<input type="hidden" name="page" value="spectacles" />
		</form>
		<div class="cart-wrapper col-sm-2">
			<a href="#cart" class="glyphicon glyphicon-shopping-cart">
				<span class="nb-cart-items">0</span>
			</a>
		</div>
		
	</div>

</header>