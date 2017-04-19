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
                <li class="active"><a class="nav-link" href="stats.php">Statistik</a></li>
                <li><a class="nav-link" href="#">Einstellungen</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="bg-image">
    <div class="bg-overlay">
        <div class="container" style="padding-top: 70px">
            <div class="jumbotron jumbotron-transparent-dark">
                <h1>Statistik</h1>
            </div>
        </div>
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

