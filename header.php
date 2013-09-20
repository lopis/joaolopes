<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta content="True" name="HandheldFriendly">
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
	<meta name="viewport" content="width=device-width">
	<link rel="shortcut icon" href="img/fav.png">
	<title>João Lopes</title>
<!-- 	<link rel="stylesheet" href="css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/font-awesome/font-awesome.min.css"> -->
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="logo span3">
				<a href="index.php"><img src="img/joaolopes.png" alt=""></a>
			</div>
			<div class="menu span9">
				<ul class="nav">
					<li <?php if($at=='about') echo 'class="active"'; ?>>
						<a href="about.php" data-toggle="tab" class="nav-lang">
							<div class="icon"><i class="icon-user icon-2x"></i></div>
							<div class="en">About</div><div class="pt">Sobre</div>
							
						</a>
					</li>
					<li <?php if($at=='portfolio') echo 'class="active"'; ?>>
						<a href="portfolio.php" data-toggle="tab" class="nav-lang">
							<div class="icon"><i class="icon-briefcase icon-2x"></i></div>
							<div class="en">Portfolio</div><div class="pt">Portólio</div>
							
						</a>
					</li>
					<li <?php if($at=='cv') echo 'class="active"'; ?>>
						<a href="cv.php" data-toggle="tab" class="nav-lang">
							<div class="icon"><i class="icon-tasks icon-2x"></i></div>
							<div class="en">Resume</div><div class="pt">Currículo</div>
							
						</a>
					</li>
					<li <?php if($at=='contact') echo 'class="active"'; ?>>
						<a href="about.php#contact" data-toggle="tab" class="nav-lang">
							<div class="icon"><i class="icon-envelope icon-2x"></i></div>
							<div class="en">Contacts</div><div class="pt">Contacto</div>
							
						</a>
					</li>
					<div class="flags">
						<div id="flag-pt" class="flag active flag-pt"></div>
						<div id="flag-gb" class="flag flag-gb"></div>
					</div>
				</ul>
			</div>
		</div>
		<div class="content">
