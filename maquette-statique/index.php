<?php
	$page = (isset($_GET['page'])) ? $_GET['page'] : 'accueil';

	$template_map= array (
		"accueil" => "featuring",
		"spectacle" => "show",
		"spectacles" => "shows"
	);
?>

<html lang="en">
	<head>
		<meta charset="utf-8">

		<title><?= ucfirst($page) ?> - GOEVENTS!</title>
		<meta name="description" content="Static site - GOEVENTS!">

		<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="css/styles.css?v=1.0">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/less" href="css/styles.less">


	</head>

	<body class="page-<?= $page; ?>">

		<div class="container-fluid">
			<?php include("components/nav.php"); ?>

			<section class="content">

				<?php include("components/" . $template_map[$page] . ".php"); ?>

			</section>

		</div>
		
		<script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

		<script>less = { env: 'development'};</script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.6.0/less.min.js"></script>
		<script>less.watch();</script>

		<script src="js/static-scripts.js"></script>
		
	</body>
</html>