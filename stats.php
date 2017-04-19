<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>VocabCoach</title>
    <!-- using Bootstrap v3.3.7
    <!-- bootstrap css -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- material icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- own css -->
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/training.css">
</head>
<body>
<!--NAVBAR -->
<div class="navbar navbar-inverse navbar-fixed-top" id="navBar">
    <div class="container">
        <div class="navbar-header">
            <a href="index.php" class="navbar-brand">VocabCoach</a>
            <button id="buttonNavBarToggle" type="button" class="navbar-toggle" data-toggle="collapse" data-target="#mainNavBar">
                <i class="material-icons" style="color: white;vertical-align: middle">menu</i>
            </button>
        </div>
        <div class="collapse navbar-collapse" id="mainNavBar">
            <ul class="nav navbar-nav">
                <li><a class="nav-link" href=".">Lektionen</a></li>
                <li class="active"><a class="nav-link" href="stats.php">Statistik</a></li>
                <li><a class="nav-link" href="settings.php">Einstellungen</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="container" style="padding-top: 60px">

    <div id="stats-wrapper" class="row">
        <!--<div class="col-md-12" style="padding: 1rem">
            <div class="jumbotron jumbotron-transparent-dark" style="margin: 0;">
                <h1>Alle Lektionen</h1>
                <div class="progress" style="background-color: transparent; height: 3rem">
                    <div id="correct-0" class="progress-bar progress-bar-success" style="width: 0"></div>
                    <div id="wrong-0" class="progress-bar progress-bar-danger" style="width: 0"></div>
                </div>
                <p>Gesamt: 50 | Richtig: 32 | Falsch: 18</p>
            </div>
        </div>-->
        <!--<div class="col-lg-4 col-sm-6 col-xs-12" style="padding: 1rem">
            <div class="jumbotron jumbotron-transparent-dark" style="margin: 0;">
                <h2>test.txt</h2>
                <div class="progress" style="background-color: transparent">
                    <div id="correct-0" class="progress-bar progress-bar-success" style="width: 0"></div>
                    <div id="wrong-0" class="progress-bar progress-bar-danger" style="width: 0"></div>
                </div>
                Gesamt: 50 | Richtig: 32 | Falsch: 18
            </div>
        </div>-->

    </div>
</div>

<!-- jQuery JavaScript -->
<script src="js/jquery.min.js"></script>
<!-- bootstrap JavaScript -->
<script src="js/bootstrap.min.js"></script>
<!-- own JavaScript -->
<script src="js/stats.js"></script>
</body>
</html>

