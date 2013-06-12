<?php 
	$gravatar_hash = md5( "joaopclopes@gmail.com" );
	$img_url = "http://www.gravatar.com/avatar/$gravatar_hash?s=200";
 ?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta content="True" name="HandheldFriendly">
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
	<meta name="viewport" content="width=device-width">
	<title>João Lopes</title>
	<link rel="stylesheet" href="css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">
	<link href='http://fonts.googleapis.com/css?family=Arimo:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
	<script src="js/bootstrap.js"></script>
</head>
<body>
	<div class="container">
 		<div class="tabbable tabs-left row">
			<div class="tabbable tabs-left span2">
				<ul class="nav nav-tabs">
					<img src="img/joaolopes.png" alt="">
					<li class="active">
						<a href="#tab1" data-toggle="tab" class="nav-lang">
							<div class="en">About</div><div class="pt">Sobre</div>
							<div class="clearfix"></div>
						</a>
					</li>
					<li>
						<a href="#tab2" data-toggle="tab" class="nav-lang">
							<div class="en">Portfolio</div><div class="pt">Portólio</div>
							<div class="clearfix"></div>
						</a>
					</li>
					<li>
						<a href="#tab3" data-toggle="tab" class="nav-lang">
							<div class="en">Curriculum</div><div class="pt">Currículo</div>
							<div class="clearfix"></div>
						</a>
					</li>
					<li>
						<a href="#tab4" data-toggle="tab" class="nav-lang">
							<div class="en">Contacts</div><div class="pt">Contacto</div>
							<div class="clearfix"></div>
						</a>
					</li>
				</ul>

			</div>
			<div class="tab-content span9">
				<div class="tab-pane fade in active" id="tab1">
					<?php require_once("about.php"); ?>
				</div>
				<div class="tab-pane fade" id="tab2">portfolio page</div>
				<div class="tab-pane fade" id="tab3">curriculum page</div>
				<div class="tab-pane fade" id="tab4">contacts page</div>
			</div>
		</div>
	</div>
</body>

<script>
	$('.tabs-left.span2').css({
	    'height': $('.tab-content').height()
	});
</script>

</html>