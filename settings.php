<?php ?>

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
                <li><a class="nav-link" href="stats.php">Statistik</a></li>
                <li class="active"><a class="nav-link" href="settings.php">Einstellungen</a></li>
            </ul>
        </div>
    </div>
</div>


<div class="container" style="padding-top: 70px">
    <div class="jumbotron jumbotron-transparent-dark jumbotron-info">
        <div class="page-header">
            <h2>Dateiupload <small class="pull-right">Lektionen hochladen</small></h2>
        </div>
        <p>Hier kannst du Lektionen deiner Wahl im TXT-Format hochladen. Dabei musst du beachten,
            dass die erste Zeile in der Datei die Sprachen </p>
    </div>
    <div class="jumbotron jumbotron-transparent-dark jumbotron-info">
        <div class="page-header">
            <h2>Dateimanager <small class="pull-right">Lektionen verwalten</small></h2>
        </div>
        <p>Hier können Lektionen gelöscht, umbenannt und bearbeitet werden.</p>
    </div>
    <div class="jumbotron jumbotron-transparent-dark jumbotron-info">
        <div class="page-header">
            <h2>Spracheinstellungen</h2>
        </div>
        <p><s>Hier kannst du die Sprache der Oberfläche ändern.</s></p>
    </div>
</div>


<!-- jQuery JavaScript -->
<script src="js/jquery.min.js"></script>
<!-- bootstrap JavaScript -->
<script src="js/bootstrap.min.js"></script>
<!-- own JavaScript -->
<script src="js/settings.js"></script>
</body>
</html>