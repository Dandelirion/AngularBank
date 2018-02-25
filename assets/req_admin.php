<?php
require('verify.php');

class RowObj {
    public $id;
    public $inn;
    public $bik;
    public $acc_num;
    public $nds;
    public $sum;
    public $telly;
    public $email;

    function __construct($id, $inn, $bik, $acc_num, $nds, $sum, $telly, $email) {
        $this->id = $id;
        $this->inn = $inn;
        $this->bik = $bik;
        $this->acc_num = $acc_num;
        $this->nds = $nds;
        $this->sum = $sum;
        $this->telly = $telly;
        $this->email = $email;
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
    'ИНН' => 'inn',
    'БИК' => 'bik',
    'Номер счета' => 'accNum',
    'НДС' => 'nds',
    'Сумма' => 'sum',
    'Телефон' => 'telly',
    'email' => 'email'
);

$link = mysqli_connect('localhost', 'root', '', 'bank_db') 
    or die("Ошибка " . mysqli_error($link)); 

$sort_field = $_POST["sort_field"];
$sort_option = $_POST["sort_option"];
$filter_field = $_POST["filter_field"];
$filter_text = $_POST["filter_text"];

$query ="SELECT * FROM req_payments";
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
        $obj = new RowObj($row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6], $row[7]);
        array_push($objToSend, $obj);
    }
    echo json_encode($objToSend);
    mysqli_free_result($result);
}

mysqli_close($link);

function auth_error() {
    $errorObj->authError = "Ошибка авторизации, некорректный токен";
    echo json_encode($errorObj);
}
?>