<div role="tabpanel" class="tab-pane active" id="spectacles">
    <h3>Spectacles non-publiés<h3>
    <?php for ($i = 1; $i < 3; $i++) : ?>
        <div class="row">
            <div class="col-md-6">
                <h4>
                    <a class="titleShow" href="components/admin_spectacle.php">
                        Spectacle non-publiés <?= $i ?>
                    </a>
                </h4>
            </div>

            <div class="col-md-6">
                <button type="button" class="btn btn-default">Modifier</button>
                <button type="button" class="btn btn-warning">Dupliquer</button>
                <button type="button" class="btn btn-danger">Supprimer</button>
            </div>
        </div>
        <br/>
    <?php endfor; ?>

    <hr>

    <h3>Spectacles en vedette<h3>
	<?php for ($i = 1; $i < 7; $i++) : ?>
        <div class="row">
            <div class="col-md-6">
                <h4>
                    <a class="titleShow" href="components/admin_spectacle.php">
                        Spectacle en vedette <?= $i ?>
                    </a>
                    <span class="label label-success">34 bilets vendus</span>
                    <span class="label label-danger">11 billets restants</span>
                </h4>
            </div>

            <div class="col-md-6">
                <button type="button" class="btn btn-default">Modifier</button>
                <button type="button" class="btn btn-warning">Dupliquer</button>
                <button type="button" class="btn btn-danger">Supprimer</button>
            </div>
        </div>
        <br/>
    <?php endfor; ?>

    <hr>

    <h3>Spectacles</h3>
    <?php for ($i = 1; $i < 14; $i++) : ?>
        <div class="row">
            <div class="col-md-6">
                <h4>
                    <a class="titleShow" href="components/admin_spectacle.php">
                        Spectacle <?= $i ?>
                    </a>
                    <span class="label label-success">34 bilets vendus</span>
                    <span class="label label-danger">11 billets restants</span>
                </h4>
            </div>

            <div class="col-md-6">
                <button type="button" class="btn btn-default">Modifier</button>
                <button type="button" class="btn btn-warning">Dupliquer</button>
                <button type="button" class="btn btn-danger">Supprimer</button>
            </div>
        </div>
        <br/>
    <?php endfor; ?>       
</div>