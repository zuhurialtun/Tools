<?php
include "kurulum.php";



if(isset($_POST['process'])){
    $process = $_POST['process'];
}
else{
    $process = 'NULL';
}

if(isset($_FILES['files'])){
    $file_name = $_FILES['files']['name'];
    // echo "Gönderilen dosya adı: " . $file_name;
}
else{
    $file_name = 'NULL';
}

$veri = array(
    'process' => $process,
    'files' => $file_name,
);

$veri = json_encode($veri);
$cikti["gelen"] = curl_post($dock_server, $veri);

echo json_encode($veri, JSON_UNESCAPED_UNICODE);

?>