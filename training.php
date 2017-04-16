<?php
$id = -1;
//if (isset($_POST['id'])) {
//    $id = $_POST['id'];
//}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
}

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
                <li id="language-1" role="presentation" class="active" onclick="navClick(this, event);"><a href=""></a></li>
                <li id="language-2" role="presentation" onclick="navClick(this, event);"><a href=""></a></li>
            </ul>
            <br>
            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <div id="left-box" class="jumbotron jumbotron-transparent-dark">
                        <h1 id="left-box-h1"></h1>
                        <p id="left-box-p"></p>
                    </div>
                </div>
                <div id="right-box-wrapper" class="col-md-6 col-xs-12">
                    <div id="right-box" class="list-group">
                        <button id="btn-0" type="button" class="list-group-item" onclick="answerChosen(this);"></button>
                        <button id="btn-1" type="button" class="list-group-item" onclick="answerChosen(this);"></button>
                        <button id="btn-2" type="button" class="list-group-item" onclick="answerChosen(this);"></button>
                        <button id="btn-3" type="button" class="list-group-item" onclick="answerChosen(this);"></button>
                        <button id="btn-4" type="button" class="list-group-item" onclick="answerChosen(this);"></button>
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

<script>
    $(document).ready(ready(<?=$id?>));
</script>
</body>
</html>