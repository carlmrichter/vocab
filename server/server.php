<?php

//ini_set('xdebug.var_display_max_depth', -1);
//ini_set('xdebug.var_display_max_children', -1);
//ini_set('xdebug.var_display_max_data', -1);

function getFileContent($id) {
    $directory = '../training/';
    $files = scandir($directory);

    // open file represented by id
    $file = fopen($directory.$files[$id + 2], 'r');

    // build return array
    $return = array();

    $return['content'] = array();
    for($i = 0, $count = 0; !feof($file); $i++, $count++) {
        $line = explode(';', trim(preg_replace('/\s+/', ' ', fgetss($file))), 2);
        if($line[0] == '\n' || $line[0] == ''){
            $count--;
            continue;
        }
        $return['content'][$i] = array();
        $return['content'][$i][0] = $line[0];
        $return['content'][$i][1] = $line[1];
    }
    $return['count'] = $count;
    fclose($file);
    //var_dump($return);

    return json_encode($return);
}

function setStat($id) {
    $dir_training = '../training/';
    if (!file_exists($dir_training)) {
        mkdir($dir_training);
    }
    $filename = scandir($dir_training)[$id + 2];
    $dir_stats = '../stats/';
    if (!file_exists($dir_stats)) {
        mkdir($dir_stats);
    }
    $stats = getStatsFilename();
    //$exist = file_exists($stats);

    $content = json_decode(file_get_contents($stats));
    //if (!$exist) chmod($stats, 0777);
    if (!isset($content)) $content = new stdClass();
    if (!isset($content->$filename)) $content->$filename = new stdClass();
    $content->$filename->answered++;
    if ($_POST['answer']) $content->$filename->correct++;
    $file = fopen($stats, 'w');
    fwrite($file, json_encode($content));
    fclose($file);
}

function getList() {
    $directory = '../training/';
    if (!file_exists($directory)) {
        mkdir($directory);
    }
    $dir_stats = '../stats/';
    if (!file_exists($dir_stats)) {
        mkdir($dir_stats);
    }
    $lang = new stdClass();
    if (file_exists('../stats/lang.json')) {
        $lang = json_decode(file_get_contents('../stats/lang.json'));
    }
    // filenames of directory
    $files = scandir($directory);
    $count = count($files);
    $return = array();
    // scandir() returns array with first elements: '.' and '..' --> $i = 2
    for ($i = 2; $i < $count; $i++) {
        $line_cnt = 0;
        $file = fopen($directory.$files[$i], 'r');
        // count lines
        for (; !feof($file); $line_cnt++) {
            $line = explode(';', trim(preg_replace('/\s+/', ' ', fgets($file))), 2);
            if ($line[0] === '\n' || $line[0] === '' || $line[1] === '\n' || $line[1] === '') {
                $line_cnt--;
            }
        }
        fclose($file);
        // get rid of filename extension
        $filename_no_ext = explode('.', $files[$i]);
        // get languages

        //build answer array
        $return[$i - 2] = array();
        $return[$i - 2]['name'] = $filename_no_ext[0];
        $return[$i - 2]['ext'] = $filename_no_ext[1];
        $return[$i - 2]['line_cnt'] = $line_cnt;
        $return[$i - 2]['lang1'] = $lang->$files[$i]->lang1;
        $return[$i - 2]['lang2'] = $lang->$files[$i]->lang2;
    }
    // return answer array in json format
    return json_encode($return);
}

function deleteStat($id, $file) {
    $files = scandir("../training/");
    $content = json_decode(file_get_contents($file));
    $content_array = (array)$content;

    $return['ids'] = array();
    if (count($content_array) < 2 || $id == -1) {
        unlink($file);
        $return['ids'][0] = -1;
        // array key is some filename, array key of array key is an Integer
        $return['ids'] = array_merge($return['ids'], array_keys(array_keys($content_array)));
        return json_encode($return);
    }
    //var_dump($content->$files[$id+2]);
    unset($content->$files[$id+2]);
    file_put_contents($file, json_encode($content));
    $return['ids'][0] = $id;
    $return['content'] = $content;
    return json_encode($return);
}

function getStatsFilename() {
    return '../stats/'.str_replace(':','',$_SERVER['REMOTE_ADDR']).'.json';
}

if (isset($_POST['mode'])) {

    switch ($_POST['mode']) {
        case 'get_file_content':
            if (isset($_POST['id'])) {
                echo getFileContent($_POST['id']);
            }
            break;

        case 'set_stat':
            $id = $_POST['id'];
            if (isset($_POST['id'])) {
                setStat($_POST['id']);
            }
            break;


        case 'get_stats':
            $dir = '../training/';
            $dir_stats = '../stats/';
            if (!file_exists($dir)) {
                mkdir($dir);
            }
            if (!file_exists($dir_stats)) {
                mkdir($dir_stats);
            }
            $files = scandir($dir);

            $stats = new stdClass();
            $lang = new stdClass();
            if (file_exists(getStatsFilename())) {
                $stats = json_decode(file_get_contents(getStatsFilename()));
            }
            if (file_exists('../stats/lang.json')) {
                $lang = json_decode(file_get_contents('../stats/lang.json'));
            }

            $return = array();
            $count = count((array)$stats);
            for ($i = 0; $i <= $count; $i++) {

                $return[$i] = array();
                $return[$i]['filename'] = $files[$i+2];
                if (isset($stats->$files[$i+2])) {
                    $return[$i]['stats'] = $stats->$files[$i+2];
                }
                if (isset($lang->$files[$i+2])) {
                    $return[$i]['lang'] = $lang->$files[$i+2];
                }
            }
            echo json_encode($return);
            break;


        case 'get_list':
            echo getList();
            break;


        case 'delete_stat':
            if (isset($_POST['id'])) {
                $id = $_POST['id'] - 1;
                $stats = getStatsFilename();
                echo deleteStat($id, $stats);
            }
            break;


        case 'delete_file':
            // TODO delete file physically
            $id = $_POST['id'];
            $files = scandir('../training');
            $file = '../training/'.$files[$id + 2];
            unlink($file);

            // TODO delete stats for that lesson
            $stats = getStatsFilename();
            deleteStat($id,$stats);

            // TODO rearrange ids in stats file (they will get messed up)
//            $content_read = json_decode(file_get_contents($stats));
//            $content_write = array();
//            $difference = 0;
//            foreach ($content_read as $key => $value) {
//                if ($key == $id) $difference--;
//                $key2 = $ke
//                $content_write->($key-$difference)
//
//            }
            break;

        default:
            break;
    }
}
?>