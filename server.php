<?php

switch ($_GET['mode']){
    case 'list':
        // für jede Datei mit Endung .txt im Verzeichnis training
        $files = scandir('training/');
        $length = count($files) - 2;

        for ($x = 2; $x < $length; $x++) {
?>
            <button type="button" class="list-group-item list-item-custom-1">
                <div class="pull-left" style="margin-top: 3px"><?php echo '<span>'.$files[$x].'</span>';?></div>
                <div class="pull-right vertical-align">
                    <span class="badge" style="margin-right: 5px">123</span>
                    <i class="material-icons">chevron_right</i>
                </div>
            </button>
<?php
        break;
        }
}

?>
