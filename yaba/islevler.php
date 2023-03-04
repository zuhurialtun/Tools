<?php
//
//
//
//
//
// curl post
//
//
//
//
//
function curl_post($url, $veri)
{
    // do{
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $veri);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $gelen = curl_exec($curl);
    $gelen = json_decode($gelen, true);
    $info = curl_getinfo($curl);
    
    if($gelen == null) $gelen = $info;
    return $gelen;
}
