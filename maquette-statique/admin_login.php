<html lang="en">
  <head>
    <meta charset="utf-8">

    <title>GOEVENTS! - Connexion administrateur</title>
    <meta name="description" content="Static site - GOEVENTS!">

    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/styles.css?v=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/less" href="css/styles.less">
  </head>

  <body id="adminLogin">
    <div class="container">
      <form class="form-signin">
        <h2 class="form-signin-heading ">Panneau administrateur</h2>

        <label for="inputEmail" class="sr-only">Nom d'utilisateur</label>

        <input type="username" id="inputUsername" class="form-control" placeholder="Nom d'utilisateur" required="" autofocus="">

        <label for="inputPassword" class="sr-only">Mot de passe</label>

        <input type="password" id="inputPassword" class="form-control" placeholder="Mot de passe" required="">

        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Se rappeler de moi
          </label>
        </div>

        <button class="btn btn-lg btn-primary btn-block" type="submit">Se connecter</button>
      </form>
    </div>

    <?php include("components/footer_admin.php"); ?>

    <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

    <script>less = { env: 'development'};</script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.6.0/less.min.js"></script>
    <script>less.watch();</script>
  </body>
</html>