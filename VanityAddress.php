<?php
// Change the value below
$checkString = 'Ab';
// Change the value above

function startsWith ($string, $startString) { 
	$len = strlen($startString);
	return (substr($string, 0, $len) === $startString);
}

include_once 'api/vendor/autoload.php';

$matched = false;
$tron = new \IEXBase\TronAPI\Tron();
while(!$matched) {
    $generateAddress = $tron->generateAddress(); 
    //$tempadd = strtolower(substr($generateAddress->getAddress(true), 1));
    $tempadd = substr($generateAddress->getAddress(true), 1);
    $matched = startsWith($tempadd, $checkString);
    //echo $generateAddress->getAddress(true) . "\n";
}
echo "\n\n ----------Found----------- \n\n";
echo($generateAddress->getAddress(true) . " - " . $generateAddress->getPrivateKey());
$filename = trim($generateAddress->getAddress(true)) . ".txt";

file_put_contents($filename, $generateAddress->getAddress(true) . " - " . $generateAddress->getPrivateKey());
?>
