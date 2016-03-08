<!DOCTYPE html>
<html lang="en" ng-app="app">
    <head>
        <meta charset="utf-8">
        <title>GOEVENTS! - Panneau administrateur</title>
        <meta name="description" content="Panneau administrateur - GOEVENTS!">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="css/styles.css?v=1.0">
        <link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css">
        <link rel="stylesheet" type="text/less" href="css/styles.less">
    </head>

    <body id="admin">
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
              <a class="navbar-brand" href="#/admin.php">Panneau administrateur</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Voir <span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li role="presentation" class="">
                          <a href="#/spectacles" aria-controls="spectacles" role="tab" data-toggle="tab">
                            Spectacles <span class="sr-only">(current)</span>
                          </a>
                        </li>

                        <li role="presentation">
                          <a href="#/salles" aria-controls="salles" role="tab" data-toggle="tab">
                            Salles
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Création <span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li role="presentation">
                          <a href="#/creationSpectacle" aria-controls="creationSpectacle" role="tab" data-toggle="tab">
                            Créer un spectacle
                          </a>
                        </li>

                        <li role="presentation">
                          <a href="#/creationSalle" aria-controls="creationSalle" role="tab" data-toggle="tab">
                            Créer une salle
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

        <div class="container">
            <div class="tab-content" ng-view>
            </div>
        </div>

        <footer class="footer">
            <div class="navbar-left">
                <div class="navbar-header">
                    <a class="navbar-brand" href="index.html">GOevents!</a>
                </div>

                <p class="text-muted">
                    GOevents, all rights reserved.
                </p>
            </div>
        </footer>

        <!-- BOWER components -->
        <script src="bower_components/jquery/dist/jquery.min.js"></script>
        <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

        <script>less = { env: 'development'};</script>
        <script src="bower_components/less/dist/less.min.js"></script>
        <script>//less.watch();</script>
        <script src="bower_components/moment/min/moment.min.js"></script>
        <script src="bower_components/moment/locale/fr-ca.js"></script>
        <script src="bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>
        <script src="bower_components/lodash/dist/lodash.min.js"></script>

        <script src="bower_components/angular/angular.min.js"></script>
        <script src="bower_components/angular-route/angular-route.min.js"></script>
        <script src="bower_components/angular-animate/angular-animate.min.js"></script>
        <script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>
        <script src="bower_components/angular-slugify/angular-slugify.js"></script>
        <script src="bower_components/angular-local-storage/dist/angular-local-storage.min.js"></script>

        <!-- NON BOWER VENDOR SCRIPTS -->
        <script src="js/vendors/class.js"></script>

        <!-- custom plugins -->
        <script src="js/custom-plugins/loading-screen.jquery.js"></script>


        <script src="js/app.js"></script>
        <script src="js/angular-routes.js"></script>

        <!-- controllers -->
        <script src="js/controllers/featuredShowListController.js"></script>
        <script src="js/controllers/showListController.js"></script>
        <script src="js/controllers/showDetailsController.js"></script>
        <script src="js/controllers/checkoutReviewController.js"></script>

        <!-- services -->
        <script src="js/services/showService.js"></script>
        <script src="js/services/cartService.js"></script>
        <script src="js/services/messageService.js"></script>
        <script src="js/services/checkoutService.js"></script>

        <!-- directives -->
        <script src="js/directives/activeMenu.js"></script>
        <script src="js/directives/datetimePicker.js"></script>
        <script src="js/directives/routeClass.js"></script>
        <script src="js/directives/backButton.js"></script>
        <script src="js/directives/cart.js"></script>
        <script src="js/directives/modal.js"></script>
        <script src="js/directives/checkoutSteps.js"></script>

        <script src="js/static-scripts.js"></script>
    </body>
</html>