<?php
$con_str=mysql_connect('localhost', 'root', '', 'bank_db');
mysql_select_db('bank_db',$con_str);

$inn = $_POST ["inn"];
$bik = $_POST ["bik"];
$acc_num = $_POST ["accNum"];
$nds = $_POST ["nds"];
$sum = $_POST ["sum"];
$telly = $_POST ["telly"];
$email = $_POST ["email"];

$query_str="INSERT INTO `bank_db`.`req_payments`(`ID`, `inn`, `bik`, `accNum`, `nds`, `sum`, `telly`, `email`) 
VALUES (NULL, '$inn', '$bik', '$acc_num', '$nds', '$sum', '$telly', '$email')";
mysql_query($query_str);
echo 'Операция успешно выполнена';
mysql_close();
?>