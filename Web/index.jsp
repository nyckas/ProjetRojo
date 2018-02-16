<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en"><head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="This is social network html5 template available in themeforest......">
		<meta name="keywords" content="Social Network, Social Media, Make Friends, Newsfeed, Profile Page">
		<meta name="robots" content="index, follow">
		<title>Plan'Inona</title>

    <!-- Stylesheets
    ================================================= -->
		<link rel="stylesheet" href="design/bootstrap.css">
		<link rel="stylesheet" href="design/style.css">
		<link rel="stylesheet" href="design/ionicons.css">
    <link rel="stylesheet" href="design/font-awesome.css">
    
    <!--Google Font-->
    <link href="design/css.css" rel="stylesheet">
    
    <!--Favicon-->
    <link rel="shortcut icon" type="image/png" href="https://thunder-team.com/friend-finder/images/fav.png">
	</head>
	<body>

    <!-- Header
    ================================================= -->
		<header id="header-inverse">
      <nav class="navbar navbar-default navbar-fixed-top menu">
        <div class="container">

          <!-- Brand and toggle get grouped for better mobile display -->
		<!-- /.navbar-collapse -->
        </div><!-- /.container -->
      </nav>
    </header>
    <!--Header End-->
    
    <!-- Landing Page Contents
    ================================================= -->
    <div id="lp-register">
    	<div class="container wrapper">
        <div class="row">
        	<div class="col-sm-5">
            <div class="intro-texts">
            	<img src="design/logo.png">
            </div>
          </div>
        	<div class="col-sm-6 col-sm-offset-1">
            <div class="reg-form-container"> 
            
              <!-- Register/Login Tabs-->
              <div class="reg-options">
                <ul class="nav nav-tabs">
                  <li class=""><a href="#register" data-toggle="tab" aria-expanded="false">S'inscrire</a></li>
                  <li class="active"><a href="#login" data-toggle="tab" aria-expanded="true">Se connecter</a></li>
                </ul><!--Tabs End-->
              </div>
              
              <!--Registration Form Contents-->
              <div class="tab-content">
                <div class="tab-pane" id="register">
                  <h3>Inscription</h3>
                  
                  <!--Register Form-->
                  <form name="connexion_planinona" id="registration_form" class="form-inline">
                    <div class="row">
                      <div class="form-group col-xs-6">
                        <label for="firstname" class="sr-only">Nom</label>
                        <input id="nom" required="" class="form-control input-group-lg" name="firstname" title="Enter first name" placeholder="Nom" type="text">
                      </div>
                      <div class="form-group col-xs-6">
                        <label for="lastname" class="sr-only">Prenom</label>
                        <input id="prenom" required="" class="form-control input-group-lg" name="lastname" title="Enter last name" placeholder="Prenom" type="text">
                      </div>
                    </div>
					
					<div class="row">
						<div class="form-group col-xs-6">
							<label>Date de naissance</label>
						</div>
						<div class="form-group col-xs-6">
							<input id="naissance" required="" class="form-control input-group-lg" name="mot de passe" title="Enter password" placeholder="Mot de passe" type="date">
						</div>
					</div>
                    <div class="row">
                      <div class="form-group col-xs-12">
                        <label for="email" class="sr-only">Adresse mail</label>
                        <input id="email" required="" class="form-control input-group-lg" name="Email" title="Enter Email" placeholder="Adresse mail" type="text">
                      </div>
                    </div>
                    <div class="row">
                      <div class="form-group col-xs-12">
                        <label for="password" class="sr-only">Mot de passe</label>
                        <input id="password" required="" class="form-control input-group-lg" name="password" title="Enter password" placeholder="Mot de passe" type="password">
                      </div>
                    </div>
					
					<div class="row">
                      <div class="form-group col-xs-12">
                        <label for="password" class="sr-only">Confirmer mot de passe</label>
                        <input id="confirm" required="" class="form-control input-group-lg" name="password" title="Enter password" placeholder="Confirmer mot de passe" type="password">
                      </div>
                    </div>
                  </form><!--Register Now Form Ends-->
                  <p><a href="#login" data-toggle="tab" aria-expanded="true">Vous avez déja un compte?</a></p>
                  <a onclick="inscription()" class="btn btn-primary">S'inscrire</a>
                </div><!--Registration Form Contents Ends-->
                
                <!--Login-->
                <div class="tab-pane active" id="login">
                  <h3>Se connecter</h3>
                  <p class="text-muted">Connecter à votre compte</p>
                  
                  <!--Login Form-->
                  <form name="connexion_planinona" id="connexion_planinona">
                     <div class="row">
                      <div class="form-group col-xs-12">
                        <label for="my-email" class="sr-only">Identifiant</label>
                        <input id="my-email" class="form-control input-group-lg" name="login" title="login" placeholder="Adresse mail" type="mail">
                      </div>
                    </div>
                    <div class="row">
                      <div class="form-group col-xs-12">
                        <label for="my-password" class="sr-only">Mot de passe</label>
                        <input id="my-password" class="form-control input-group-lg" name="password" title="Enter password" placeholder="Mot de passe" type="password">
                      </div>
                    </div>
                    <a onclick="connexion()" class="btn btn-primary">Se connecter</a>
                  </form><!--Login Form Ends--> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--preloader-->
    <div id="spinner-wrapper" style="display: none;">
      <div class="spinner"></div>
    </div>

    <!-- Scripts
    ================================================= -->
    <script src="design/jquery-3.js"></script>
    <script src="design/bootstrap.js"></script>
    <script src="design/jquery.js"></script>
    <script src="design/jquery_002.js"></script>
    <script src="design/script.js"></script>
    <script src="assets/myJs/ajax.js"></script>
</body></html>