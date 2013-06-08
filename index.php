<?php 

 ?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>João Lopes</title>
	<link rel="stylesheet" href="css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">
	<link href='http://fonts.googleapis.com/css?family=Josefin+Slab' rel='stylesheet' type='text/css'>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
	<script src="js/bootstrap.js"></script>
</head>
<body>
	<div class="container id">
		<div class="row" id="header">
			<div class="span2">
				<img src="img/joaolopes.png" alt="">
			</div>
		</div>
 		<div class="tabbable tabs-left">
			<ul class="nav nav-tabs">
				<li class="active">
					<a href="#tab1" data-toggle="tab">
						<div class="en">About</div><div class="pt">Sobre</div>
					</a>
				</li>
				<li>
					<a href="#tab2" data-toggle="tab">
						<div class="en">Portfolio</div><div class="pt">Portólio</div>
					</a>
				</li>
				<li>
					<a href="#tab3" data-toggle="tab">
						<div class="en">Curriculum</div><div class="pt">Currículo</div>
					</a>
				</li>
				<li>
					<a href="#tab4" data-toggle="tab">
						<div class="en">Contacts</div><div class="pt">Contacto</div>
					</a>
				</li>
			</ul>
			<div class="tab-content">
				<div class="tab-pane fade in active" id="tab1">
					<?php require_once("about.php"); ?>
				</div>
				<div class="tab-pane fade" id="tab2">portfolio page</div>
				<div class="tab-pane fade" id="tab3">curriculum page</div>
				<div class="tab-pane fade" id="tab4">contacts page</div>
			</div>
		</div>
		<div class="copyright">
			&copy João Lopes 2013
		</div>
	</div>
</body>
</html>