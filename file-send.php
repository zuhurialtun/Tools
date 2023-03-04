<?php

$process = $_POST['process'];
if(isset($_FILES['files'])){
    $file_name = $_FILES['files']['name'];
    // echo "Gönderilen dosya adı: " . $file_name;
}
else{
    $file_name = 'NULL'
}


$veri = array(
    'process' => $process,
    'files' => $file_name,
);

echo json_encode($veri, JSON_UNESCAPED_UNICODE);

?>