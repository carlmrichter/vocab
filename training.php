<?php
$id = 0;
if (isset($_GET['id'])) {
    $id = $_GET['id'];
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>VocabTrainer - Training</title>

    <!-- material icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="css/custom.css">
</head>
<body>

<div id="navbar-wrapper" class="container">
    <nav class="navbar navbar-toggleable-sm navbar-inverse">

        <button id="menu-toggler" class="navbar-toggler navbar-toggler-left" type="button" data-toggle="collapse"
                data-target="#mainNavBar" aria-controls="mainNavBar" aria-expanded="false"
                aria-label="Toggle navigation">
            <i class="material-icons">menu</i>
        </button>
        <a href="." class="navbar-brand">VocabTrainer</a>

        <div class="collapse navbar-collapse" id="mainNavBar">
            <ul class="navbar-nav mr-auto"></ul>
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href=".">Lektionen</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="stats.php">Statistik</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="settings.php">Einstellungen</a>
                </li>
            </ul>
        </div>
    </nav>
</div>

<div id="content-wrapper" class="container">
    <div id="language-nav"><a id="language-1" onclick="navClick(this, event);" class="btn btn-nav active"></a><a id="language-2" onclick="navClick(this, event);" class="btn btn-nav"></a></div>

    <div class="row">
        <div id="left-box-wrapper" class="col-md-6 col-sm-12">
            <div id="left-box" class="jumbotron jumbotron-transparent">
                <h1 id="left-box-h1"></h1>
                <p id="left-box-p"></p>
            </div>
        </div>
        <div id="right-box-wrapper" class="col-md-6 col-sm-12">
            <div id="right-box" class="list-group list-transparent">
                <button id="btn-0" type="button" class="list-group-item" onclick="answerChosen(this);"></button>
                <button id="btn-1" type="button" class="list-group-item" onclick="answerChosen(this);"></button>
                <button id="btn-2" type="button" class="list-group-item" onclick="answerChosen(this);"></button>
                <button id="btn-3" type="button" class="list-group-item" onclick="answerChosen(this);"></button>
                <button id="btn-4" type="button" class="list-group-item" onclick="answerChosen(this);"></button>
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