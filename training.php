<?php
$id = -1;
if (isset($_POST['id'])) {
    $id = $_POST['id'];
}
//if (isset($_GET['id'])) {
//    $id = $_GET['id'];
//}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Training</title>

    <!-- material icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/training.css">
    <link rel="stylesheet" href="css/index.css">

    <!--<script>sameHeight();</script>-->
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
                <li><a class="nav-link" href="training.php">Training</a></li>
                <li><a class="nav-link" href="#">Statistik</a></li>
                <li><a class="nav-link" href="#">Einstellungen</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="bg-image">
    <div class="bg-overlay">
        <div class="container" style="padding-top: 70px">
            <ul id="language-bar" class="nav nav-pills">
                <li id="language-1" role="presentation" class="active" onclick="navClick(this, event);"><a href="">Deutsch - Englisch</a></li>
                <li id="language-2" role="presentation" onclick="navClick(this, event);"><a href="">Englisch - Deutsch</a></li>
            </ul>
            <br>
            <div class="row" onresize="sameHeight()">
                <div class="col-sm-6 col-xs-12">
                    <div id="left-box" class="jumbotron jumbotron-transparent-dark">
                        <h1>Test <?=$id?></h1>
                        <p>Das ist ein Beispiel.</p>
                    </div>
                </div>
                <div class="col-sm-6 col-xs-12">
                    <div id="right-box" class="list-group">
                        <button type="button" class="list-group-item">Cras justo odio</button>
                        <button type="button" class="list-group-item">Dapibus ac facilisis in</button>
                        <button type="button" class="list-group-item">Morbi leo risus</button>
                        <button type="button" class="list-group-item">Porta ac consectetur ac</button>
                        <button type="button" class="list-group-item">Vestibulum at eros</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>




<!-- jQuery JavaScript -->
<script src="js/jquery.min.js"></script>

<!-- bootstrap JavaScript -->
<script src="js/bootstrap.min.js"></script>

<script src="js/training.js"></script>
</body>
</html>