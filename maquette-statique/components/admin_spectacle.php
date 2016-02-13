
<div role="tabpanel" class="tab-pane" id="adminSpectacle">
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
