<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="This is social network html5 template available in themeforest......" />
		<meta name="keywords" content="Social Network, Social Media, Make Friends, Newsfeed, Profile Page" />
		<meta name="robots" content="index, follow" />
		<title>Plan'Inona</title>

    <!-- Stylesheets
    ================================================= -->
		<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="assets/css/style.css" />
		<link rel="stylesheet" href="assets/css/ionicons.min.css" />
    <link rel="stylesheet" href="assets/css/font-awesome.min.css" />
    <!--Google Webfont-->
		<link href="assets/css/css.css" rel='stylesheet' type='text/css'>
    <!--Favicon-->
    <link rel="shortcut icon" type="image/png" href="assets/assets/images/fav.png"/>
	</head>
  <body>

    <!-- Header
    ================================================= -->
		<header id="header">
      <nav class="navbar navbar-default navbar-fixed-top menu">
        <div class="container">

          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.html"><img src="design/logo.png" alt="logo" width="150" height="40" /></a>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right main-menu">
              <li class="dropdown"><a onclick="deconnexion()">Deconnexion</a></li>
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container -->
      </nav>
    </header>
    <!--Header End-->

    <div class="google-maps">
      <div id="map" class="map contact-map"></div>
    </div>
    <div id="page-contents">
    	<div class="container">
    		<div class="row">
    			<div class="col-md-10 col-md-offset-1">
            <div class="contact-us">
            	<div class="row">
            		<div class="col-md-8 col-sm-7">
                  <h4 class="grey">Créer un plan</h4>
                  <form class="contact-form">
                    <div class="form-group">
                      <i class="icon ion-person"></i>
                      <input id="titre" type="text" name="titre" class="form-control" placeholder="Titre *" required="required" data-error="Name is required.">
                    </div>
                    <div class="form-group">
                      <i class="icon ion-date"></i>
                      <input id="daty" type="date" name="daty" class="form-control" placeholder="Date *" required="required" data-error="Email is required.">
                    </div>
                    <div class="form-group">
                      <i class=""></i>
                      <select id="interet" name="interet" class="form-control">
                        <option value="5a795cd7e6046621ec6d33f4">Sport</option>
                        <option value="5a795ceee6046621ec6d33f5">Shooting</option>
                        <option value="5a795cf9e6046621ec6d33f6">Karaoke</option>
                        <option value="5a795d10e6046621ec6d33f7">Revy</option>
                        <option value="5a795d2be6046621ec6d33f8">Games</option>
                        <option value="5a795d3ee6046621ec6d33f9">Spectacle</option>
                        <option value="5a795d49e6046621ec6d33fa">Sakafo</option>
                      </select>
                    </div>
					<div class="form-group">
                      <i class=""></i>
                      <select id="lieu" name="lieu" class="form-control">
                        <option value="5a795bb9e6046621ec6d33ef">Andoharanofotsy</option>
                        <option value="5a795c69e6046621ec6d33f0">Analakely</option>
                      </select>
                    </div>
					<div class="form-group">
                      <i class=""></i>
                      <input id="participation" type="text" name="phone" class="form-control" placeholder="Participation (Ar) *" required="required" data-error="Phone is required.">
                    </div>
                    <div class="form-group">
                      <textarea id="detail" name="message" class="form-control" placeholder="Detail..." rows="4" required="required" data-error="Please,leave us a message."></textarea>
                    </div>
                  </form>
                  <a onclick="creerPlan()" class="btn-primary">Créer</a>
                </div>
            		<div class="col-md-4 col-sm-5">
                  <h4 class="grey">Plan'Inona</h4>
                  <a href=""><img src="design/logo.png" alt="" class="footer-logo" width="300" height="200" /></a>
                  <ul class="list-inline social-icons">
                    <li><a href="#"><i class="icon ion-social-facebook"></i></a></li>
                    <li><a href="#"><i class="icon ion-social-twitter"></i></a></li>
                    <li><a href="#"><i class="icon ion-social-googleplus"></i></a></li>
                    <li><a href="#"><i class="icon ion-social-pinterest"></i></a></li>
                    <li><a href="#"><i class="icon ion-social-linkedin"></i></a></li>
                  </ul>
                </div>
            	</div>
            </div>
          </div>
    		</div>
    	</div>
    </div>

    <!-- Footer
    ================================================= -->
    <footer id="footer">
      <div class="container">
      	<div class="row">
          <div class="footer-wrapper">
            <div class="col-md-3 col-sm-3">
              <a href=""><img src="design/logo.png" alt="" class="footer-logo" width="150" height="40" /></a>
              <ul class="list-inline social-icons">
              	<li><a href="#"><i class="icon ion-social-facebook"></i></a></li>
              	<li><a href="#"><i class="icon ion-social-twitter"></i></a></li>
              	<li><a href="#"><i class="icon ion-social-googleplus"></i></a></li>
              	<li><a href="#"><i class="icon ion-social-pinterest"></i></a></li>
              	<li><a href="#"><i class="icon ion-social-linkedin"></i></a></li>
              </ul>
            </div>
            <div class="col-md-2 col-sm-2">
              <h6>For individuals</h6>
              <ul class="footer-links">
                <li><a href="">Signup</a></li>
                <li><a href="">login</a></li>
                <li><a href="">Explore</a></li>
                <li><a href="">Finder app</a></li>
                <li><a href="">Features</a></li>
                <li><a href="">Language settings</a></li>
              </ul>
            </div>
            <div class="col-md-2 col-sm-2">
              <h6>For businesses</h6>
              <ul class="footer-links">
                <li><a href="">Business signup</a></li>
                <li><a href="">Business login</a></li>
                <li><a href="">Benefits</a></li>
                <li><a href="">Resources</a></li>
                <li><a href="">Advertise</a></li>
                <li><a href="">Setup</a></li>
              </ul>
            </div>
            <div class="col-md-2 col-sm-2">
              <h6>About</h6>
              <ul class="footer-links">
                <li><a href="">About us</a></li>
                <li><a href="">Contact us</a></li>
                <li><a href="">Privacy Policy</a></li>
                <li><a href="">Terms</a></li>
                <li><a href="">Help</a></li>
              </ul>
            </div>
            <div class="col-md-3 col-sm-3">
              <h6>Contact Us</h6>
                <ul class="contact">
                	<li><i class="icon ion-ios-telephone-outline"></i>+1 (234) 222 0754</li>
                	<li><i class="icon ion-ios-email-outline"></i>info@thunder-team.com</li>
                  <li><i class="icon ion-ios-location-outline"></i>228 Park Ave S NY, USA</li>
                </ul>
            </div>
          </div>
      	</div>
      </div>
      <div class="copyright">
        <p>Thunder Team � 2016. All rights reserved</p>
      </div>
		</footer>
    
    <!--preloader-->
    <div id="spinner-wrapper">
      <div class="spinner"></div>
    </div>
    
    <!-- Scripts
    ================================================= -->
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTMXfmDn0VlqWIyoOxK8997L-amWbUPiQ&callback=initMap"></script>
    <script src="assets/js/jquery-3.1.1.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/script.js"></script>
     <script src="assets/myJs/ajax.js"></script>
  </body>
</html>
