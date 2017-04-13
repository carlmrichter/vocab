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
            <div class="row">
                <div class="col-xs-12 col-sm-9 col-md-6">
                    <div id="training-list" class="list-group">
                        <button type="button" class="list-group-item list-item-custom-1">
                            <div class="pull-left" style="margin-top: 3px">
                                test
                            </div>
                            <div class="pull-right vertical-align">
                                <span class="badge" style="margin-right: 5px">123</span>
                                <i class="material-icons">chevron_right</i>
                            </div>
                        </button>
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
<!-- own JavaScript -->
<script src="js/index.js"></script>
</body>
</html>