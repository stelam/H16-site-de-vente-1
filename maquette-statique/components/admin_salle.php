
   <div role="tabpanel" class="tab-pane" id="adminSalle">
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
