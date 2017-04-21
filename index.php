<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>VocabTrainer</title>
    <!-- using Bootstrap v4
    <!-- bootstrap css -->
    <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
    <!-- material icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- own css -->
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
    <div id="training-list" class="list-group list-transparent">
    </div>
</div>

<!-- jQuery JavaScript -->
<script src="js/jquery.min.js"></script>
<!-- bootstrap JavaScript -->
<script src="js/bootstrap.min.js"></script>
<!-- own JavaScript -->
<script src="js/index.js"></script>
</body>
</html>