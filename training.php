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

    <meta name="author" content="Carl Richter">
    <title>VocabTrainer - Training</title>

    <!-- material icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- tether css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/css/tether.min.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/vocab.min.css">
</head>
<body>

<div class="container navbar-wrapper">
    <nav class="navbar navbar-toggleable-sm navbar-inverse">

        <button id="menu-toggler" class="navbar-toggler navbar-toggler-left" type="button" data-toggle="collapse"
                data-target="#mainNavBar" aria-controls="mainNavBar" aria-expanded="false"
                aria-label="Toggle navigation">
            <i class="material-icons">menu</i>
        </button>
        <a href="." class="navbar-brand unselectable">VocabTrainer</a>

        <div class="collapse navbar-collapse" id="mainNavBar">
            <ul class="navbar-nav mr-auto"></ul>
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link unselectable" href=".">Lektionen</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link unselectable" href="stats.html">Statistik</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link unselectable" href="settings.html">Einstellungen</a>
                </li>
            </ul>
        </div>
    </nav>
</div>

<div id="content-wrapper" class="container content-wrapper">
    <div class="row">
        <div class="col-12">
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
        <div id="left-box-wrapper" class="col-lg-6 col-sm-12">
            <div id="left-box" class="jumbotron jumbotron-transparent wordwrap">
                <button id="language-swap" class="material-icons float-right unselectable">swap_horiz</button>
                <h1 id="left-box-h1"></h1>
                <p id="left-box-p"></p>
            </div>
        </div>
        <div id="right-box-wrapper" class="col-lg-6 col-sm-12">
            <div id="right-box" class="list-group list-transparent">
            </div>
        </div>

    </div>
</div>



<!-- jQuery JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!-- tether JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
<!-- bootstrap JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>

<script src="js/training.js"></script>
<script>
    $(document).ready(ready(<?=$id?>));
</script>
</body>
</html>