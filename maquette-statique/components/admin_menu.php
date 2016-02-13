<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="admin.php">Panneau administrateur</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    	<ul class="nav navbar-nav">
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Voir <span class="caret"></span></a>
	          <ul class="dropdown-menu">
	            <li role="presentation" class="">
	              <a href="#spectacles" aria-controls="spectacles" role="tab" data-toggle="tab">
	                Spectacles <span class="sr-only">(current)</span>
	              </a>
	            </li>

	            <li role="presentation">
	              <a href="#salles" aria-controls="salles" role="tab" data-toggle="tab">
	                Salles
	              </a>
	            </li>
	          </ul>
	        </li>

	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Création <span class="caret"></span></a>
	          <ul class="dropdown-menu">
	            <li role="presentation">
	              <a href="#creationSpectacle" aria-controls="creationSpectacle" role="tab" data-toggle="tab">
	                Créer un spectacle
	              </a>
	            </li>

	            <li role="presentation">
	              <a href="#creationSalle" aria-controls="creationSalle" role="tab" data-toggle="tab">
	                Créer une salle
	              </a>
	            </li>

	            <li role="presentation hidden">
	              <a href="#adminSalle" aria-controls="adminSalle" role="tab" data-toggle="tab">
	                Gérer une salle
	              </a>
	            </li>

	            <li role="presentation hidden">
	              <a href="#adminSpectacle" aria-controls="adminSpectacle" role="tab" data-toggle="tab">
	                Gérer un spectacle
	              </a>
	            </li>
	          </ul>
	        </li>
      	</ul>

      	<ul class="nav navbar-nav navbar-right">
      		<li role="presentation">
	        	<a href="#aide" aria-controls="aide" role="tab" data-toggle="tab">
	        		<span class="glyphicon glyphicon-question-sign"></span>
	        	</a>
	        </li>

    		<li>
    			<a href="admin_login.php">
    				Déconnexion
    			</a>
    		</li>
      	</ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>