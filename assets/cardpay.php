<?php
$con_str=mysql_connect('localhost', 'root', '', 'bank_db');
mysql_select_db('bank_db',$con_str);

$card_num = $_POST ["cardNum"];
$valid_thru = $_POST ["validThru"];
$cvc = $_POST ["cvc"];
$sum = $_POST ["sum"];
$comment = $_POST ["comment"];
$email = $_POST ["email"];

$query_str="INSERT INTO `bank_db`.`card_payments`(`ID`, `cardNum`, `validThru`, `cvc`, `sum`, `comment`, `email`, `isSafe`) 
VALUES (NULL, '$card_num', '$valid_thru', '$cvc', '$sum', '$comment', '$email', 1)";
mysql_query($query_str);
echo 'Платеж успешно сохранен';
mysql_close();
?>