<?php

switch ($_GET['mode']){
    case 'list':
        $directory = 'training/';


        // für jede Datei mit Endung .txt im Verzeichnis training
        $files = scandir($directory);
        $count = count($files);
        $return = array();
        for ($i = 2; $i < $count; $i++) {
            $return[$i-2] = array();
            $return[$i-2]['name'] = 'test1234';
            $return[$i-2]['line_cnt'] = 22;
        }

        echo json_encode($return);
        break;
}

?>
