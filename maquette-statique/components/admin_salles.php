<div role="tabpanel" class="tab-pane" id="salles">
	<h3>Salles<h3>
    <?php for ($i = 1; $i < 7; $i++) : ?>
        <div class="row">
            <div class="col-md-6">
                <h4>
                    <a class="titleShow" href="#adminSalle" aria-controls="adminSalle" role="tab" data-toggle="tab">
                        Salles <?= $i ?>
                    </a>
                </h4>
            </div>

            <div class="col-md-6">
                <button type="button" class="btn btn-default">Modifier</button>
                <button type="button" class="btn btn-danger">Supprimer</button>
            </div>
        </div>
        <br/>
    <?php endfor; ?>      
</div>