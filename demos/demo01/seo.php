<?php

error_reporting(~0);
ini_set('display_errors', 1);

$jsonUrl = 'assets/data/structure_pl.json';
$jsonUrl = dirname(__FILE__).'/assets/data/structure_pl.json';
// $jsonUrl = $_SERVER['HTTP_HOST'].'/assets/data/structure_pl.json';
echo($jsonUrl);
$jsonString = file_get_contents($jsonUrl);
print_r($jsonString);


// phpinfo();

?>