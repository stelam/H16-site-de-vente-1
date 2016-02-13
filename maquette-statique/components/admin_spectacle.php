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
								<input type="text" class="form-control" id="inputName" placeholder="Nom" value="Eminem">
							</div>
						</div>

						<div class="form-group">
							<label for="inputArtiste" class="col-sm-2 control-label">Artiste</label>
							
							<div class="col-sm-10">
								<input type="text" class="form-control" id="inputArtiste" placeholder="Artiste" value="Eminem">
							</div>
						</div>

						<div class="form-group">
							<label for="inputDate" class="col-sm-2 control-label">Date</label>
							
							<div class="col-sm-10">
								<input type="date" class="form-control" id="inputDate" placeholder="Date" value="2016-03-12">
							</div>
						</div>

						<div class="form-group">
							<label for="inputSalle" class="col-sm-2 control-label">Salle</label>
							
							<div class="col-sm-10">
								<input type="text" class="form-control" id="inputSalle" placeholder="Salle" value="Centre Bell">
							</div>
						</div>

						<div class="form-group">
							<label for="inputDescription" class="col-sm-2 control-label">Description</label>
							
							<div class="col-sm-10">
								<textarea class="form-control" rows="3" placeholder="Description">
									Eminem est de retour en ville plus chaud que jamais !
								</textarea>
							</div>
						</div>

						<div class="form-group">
							<label for="inputPrix" class="col-sm-2 control-label">Prix ($)</label>
							
							<div class="col-sm-10">
								<input type="number" class="form-control" id="inputPrix" placeholder="Prix" value="80">
							</div>
						</div>

						<div class="form-group">
							<label for="InputImg" class="col-sm-2 control-label">Image</label>
							
							<div class="col-sm-10">
								<input type="file" id="InputImg">
								<p class="help-block">Image doit être de moins de 100MB</p>
							</div>
						</div>

						<hr>

						<!-- GOD MOD SEULEMENT -->
							<!-- En vedette ou pas -->
							<div class="form-group">
								<label for="radioVedette" class="col-sm-2 control-label">Visible ?</label>
								
								<div class="col-sm-10">
									<label class="radio-inline">
										<input type="radio" name="radioVedette" id="radioVedette1" value="option1"> Oui
									</label>
									
									<label class="radio-inline">
										<input type="radio" name="radioVedette" id="radioVedette2" value="option2" checked> Non
									</label>
								</div>
							</div>

							<!-- Visible ou pas -->
							<div class="form-group">
								<label for="radioVisible" class="col-sm-2 control-label">En vedette ?</label>
								
								<div class="col-sm-10">
									<label class="radio-inline">
										<input type="radio" name="radioVisible" id="radioVisible1" value="option1" checked> Oui
									</label>

									<label class="radio-inline">
										<input type="radio" name="radioVisible" id="radioVisible2" value="option2"> Non
									</label>
								</div>
							</div>
						<!-- FIN GOD MOD SEULEMENT -->

						<div class="form-group">
							<div class="col-sm-offset-2 col-sm-10">
								<button type="button" class="btn btn-success">Enregistrer</button>
								<!-- Remet les valeurs à zéro -->
								<button type="button" class="btn btn-warning">Valeurs initiales</button>
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