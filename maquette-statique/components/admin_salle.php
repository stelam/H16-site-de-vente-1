<html lang="en">
    <head>
        <meta charset="utf-8">

        <title>GOEVENTS! - Panneau administrateur</title>
        <meta name="description" content="Static site - GOEVENTS!">

        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="css/styles.css?v=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/less" href="/goevents/css/styles.less">

    </head>

    <body id="admin">
        <?php include("admin_menu.php"); ?>

        <div class="container">
            <div class="tab-content">
               <div role="tabpanel">
					<form class="form-horizontal">
						<div class="form-group">
							<label for="inputName" class="col-sm-2 control-label">Nom</label>

							<div class="col-sm-10">
								<input type="text" class="form-control" id="inputName" placeholder="Nom" value="Centre Bell">
							</div>
						</div>

						<div class="form-group">
							<label for="inputAdresse" class="col-sm-2 control-label">Adresse</label>
							
							<div class="col-sm-10">
								<input type="text" class="form-control" id="inputAdresse" placeholder="Adresse" value="1909 Avenue des Canadiens-de-Montréal, Montréal, QC H4B 5G0">
							</div>
						</div>

						<div class="form-group">
							<label for="inputCapacite" class="col-sm-2 control-label">Capacite</label>
							
							<div class="col-sm-10">
								<input type="number" class="form-control" id="inputCapacite" placeholder="Capacite" value="21273">
							</div>
						</div>

						<div class="form-group">
							<div class="col-sm-offset-2 col-sm-10">
								<button type="button" class="btn btn-success">Enregistrer</button>
								<!-- Remet les valeurs à zéro -->
								<button type="button" class="btn btn-warning">Reset</button>
							</div>
						</div>
					</form>
				</div>

				<?php include("components/admin_spectacles.php"); ?>

	            <?php include("components/admin_salles.php"); ?>

	            <?php include("components/admin_creationSpectacle.php"); ?>

	            <?php include("components/admin_creationSalle.php"); ?>

	            <?php include("components/admin_aide.php"); ?>
            </div>
        </div>

        <?php include("components/footer_admin.php"); ?>

        <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

        <script>less = { env: 'development'};</script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.6.0/less.min.js"></script>
        <script>less.watch();</script>

        <script src="js/static-scripts.js"></script>
    </body>
</html>