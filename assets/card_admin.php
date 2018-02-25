<?php
require('verify.php');

class RowObj {
    public $id;
    public $cardNum;
    public $validThru;
    public $cvc;
    public $sum;
    public $comment;
    public $email;
    public $isSafe;

    function __construct($id, $cardNum, $validThru, $cvc, $sum, $comment, $email, $isSafe) {
        $this->id = $id;
        $this->cardNum = $cardNum;
        $this->validThru = $validThru;
        $this->cvc = $cvc;
        $this->sum = $sum;
        $this->comment = $comment;
        $this->email = $email;
        $this->isSafe = $isSafe;
    }
}

$http_headers = getallheaders();
$valid = verifyJWT($http_headers);

if (!$valid) {
    auth_error();
    exit;
}

$dict = array(
    'ID' => 'ID',
    'Номер карты' => 'cardNum',
    'Срок действия' => 'validThru',
    'CVC' => 'cvc',
    'Сумма' => 'sum',
    'Комментарий' => 'comment',
    'email' => 'email'
);

$link = mysqli_connect('localhost', 'root', '', 'bank_db') 
    or die("Ошибка " . mysqli_error($link)); 

$sort_field = $_POST["sort_field"];
$sort_option = $_POST["sort_option"];
$filter_field = $_POST["filter_field"];
$filter_text = $_POST["filter_text"];
$upd_id = $_POST["upd_id"];

if ($upd_id) {
    updateTable();
} else {
    selectData();
}

function updateTable() {
    global $link, $upd_id;
    $select_query ="SELECT isSafe FROM card_payments WHERE ID=" . $upd_id;

    $select_result = mysqli_query($link, $select_query) or die("Ошибка " . mysqli_error($link));
    if($select_result)
    {
        $row = mysqli_fetch_row($select_result);
        $cuppent_val = $row[0];
        if ($cuppent_val == 0) {
            $query ="UPDATE card_payments SET isSafe=1 WHERE ID=" . $upd_id;
        } else {
            $query ="UPDATE card_payments SET isSafe=0 WHERE ID=" . $upd_id;
        }

        $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
        mysqli_free_result($select_result);
    }
}

function selectData() {
    global $link, $dict, $sort_field, $sort_option, $filter_field, $filter_text;
    $query ="SELECT * FROM card_payments";
    if ($filter_field != 'Нет') {
        $query = $query . " WHERE " . $dict[$filter_field] . " LIKE '%" . $filter_text . "%'";
    }
    if ($sort_field != 'Нет') {
        $query = $query . " ORDER BY " . $dict[$sort_field] . " " . $sort_option;
    }
    
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
    $objToSend = array();
    if($result)
    {
        $rows = mysqli_num_rows($result);

        for ($i = 0 ; $i < $rows ; ++$i)
        {
            $row = mysqli_fetch_row($result);
            $safety = ($row[7] == 1) ? TRUE : FALSE;
            $obj = new RowObj($row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6], $safety);
            array_push($objToSend, $obj);
        }
        echo json_encode($objToSend);
        mysqli_free_result($result);
    }
}

mysqli_close($link);

function auth_error() {
    $errorObj->authError = "Ошибка авторизации, некорректный токен";
    echo json_encode($errorObj);
}
?>