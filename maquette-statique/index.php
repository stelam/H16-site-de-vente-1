<?php
	session_start();
	$page = (isset($_GET['page'])) ? $_GET['page'] : 'accueil';

	$template_map= array (
		"accueil" => "featuring",
		"spectacle" => "show",
		"spectacles" => "shows",
		"panier" => "cart",
		"confirmation" => "confirmation"
	);
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">

		<title><?= ucfirst($page) ?> - GOEVENTS!</title>
		<meta name="description" content="Static site - GOEVENTS!">

		<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="css/styles.css?v=1.0">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/less" href="css/vendors/bootstrap-datetimepicker.min.css">

		<link rel="stylesheet" type="text/less" href="css/styles.less">


	</head>

	<body class="page-<?= $page; ?>">

		<div class="container-fluid">
			<?php include("components/nav.php"); ?>

			<section class="content">

				<?php include("components/" . $template_map[$page] . ".php"); ?>

			</section>

			<?php include("components/footer.php"); ?>
		</div>
		
		

		<script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

		<script>less = { env: 'development'};</script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.6.0/less.min.js"></script>
		<script>//less.watch();</script>

		<script src="js/vendors/moments.min.js"></script>
		<script src="js/vendors/locale/fr-ca.js"></script>
		<script src="js/vendors/bootstrap-datetimepicker.js"></script>

		<script src="js/static-scripts.js"></script>
		
	</body>
</html>