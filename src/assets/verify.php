<?php
    function verifyJWT($http_headers) {
        $config = include('config.php');
        $auth_header = $http_headers['Authorization'];
        $splitted = explode(" ", $auth_header);
        $got_token = $splitted[1];
        $jwt_values = explode('.', $got_token);

        $jwt_header = $jwt_values[0];
        $jwt_payload = $jwt_values[1];
        $jwt_signature = $jwt_values[2];

        $payload_obj = json_decode(base64_decode($jwt_payload));

        $recieved_header_and_payload = $jwt_header . '.' . $jwt_payload;
        $secret_key = $config['jwtKey']; 
        $sig_should_be = base64_encode(hash_hmac('sha256', $recieved_header_and_payload, $secret_key, true));

        if ($sig_should_be != $jwt_signature or $payload_obj->exp < time()) {
            return FALSE;
        }
        return TRUE;
    }
?>