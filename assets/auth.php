<?php
require('pass.php');

$config = include('config.php');

$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

$link = mysqli_connect('localhost', 'root', '', 'bank_db') 
    or die("Ошибка " . mysqli_error($link)); 

$login = $data["username"];
$password = $data["password"];

$select_query ="SELECT password FROM admins WHERE login='" . $login . "'";
$select_result = mysqli_query($link, $select_query) or die("Ошибка " . mysqli_error($link));
if($select_result)
{
    $row = mysqli_fetch_row($select_result);
    $hashed_passw = $row[0];
    if (password_verify($password, $hashed_passw)) {
        $issuedAt   = time();
        $expire     = $issuedAt + 120;

        $enc_header = base64_encode('{"alg": "HS256","typ": "JWT"}');
        $enc_payload = base64_encode('{"iat": "' . $issuedAt . '", "exp": "' . $expire . '"}');       
        $header_and_payload = $enc_header . '.' . $enc_payload; 
        $secret_key = $config['jwtKey'];       
        $signature = base64_encode(hash_hmac('sha256', $header_and_payload, $secret_key, true));       
        $jwt_token = $header_and_payload . '.' . $signature;

        $tokenObj->token = $jwt_token;
        echo json_encode($tokenObj);
    } else {
        $tokenObj->error = "Ошибка авторизации";
        echo json_encode($tokenObj);
    }
    mysqli_free_result($select_result);
}
?>