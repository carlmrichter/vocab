<?php


if (isset($_POST['mode']) && $_POST['mode'] == 'training'){
    
    echo $_POST['id'];
    exit;
}


switch ($_GET['mode']){
    case 'list':
        $directory = 'training/';
        // für jede Datei mit Endung .txt im Verzeichnis training
        $files = scandir($directory);
        $count = count($files);


        $return = array();
        for ($i = 2; $i < $count; $i++) {
            $line_cnt = 0;
            $file = fopen($directory.$files[$i], 'r');
            $lang = fgets($file);
            $lang = trim(preg_replace('/\s+/', ' ', $lang));
            while(!feof($file)){
                $line = fgets($file);
                $line_cnt++;
            }
            fclose($file);
            $filename_no_ext = explode('.', $files[$i]);
            $return[$i-2] = array();
            $return[$i-2]['name'] = $lang.': '.$filename_no_ext[0];
            $return[$i-2]['line_cnt'] = $line_cnt;
        }

        echo json_encode($return);
        break;
    case 'id':

        break;
    default:
        break;
}

?>
