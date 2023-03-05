<?php
include "kurulum.php";

if(isset($_POST['randomID'])){
    $randomID = $_POST['randomID'];
    mkdir('../uploads/'.$randomID);
    foreach($_FILES as $file){
        move_uploaded_file($file['tmp_name'], "../uploads/".$randomID.'/'.$file["name"]);
    }
    
    $process = $_POST['process'];
    $file_list = $_POST['file_list'];
    
    $veri = array(
        'randomID' => $randomID,
        'process' => $process,
        'file_list' => $file_list,
    );
    
    $veri = json_encode($veri);
    $cikti["gelen"] = curl_post($dock_server, $veri);
    
    echo json_encode($cikti, JSON_UNESCAPED_UNICODE);
}
else{
    echo json_encode('NULL', JSON_UNESCAPED_UNICODE);
}

?>