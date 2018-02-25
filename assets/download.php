<?php
require('fpdf.php');

$from = $_POST ["from"];
$bik = $_POST ["bik"];
$acc_num = $_POST ["acc_num"];
$vat = $_POST ["vat"];
$sum = $_POST ["sum"];

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial','B',16);
$pdf->Cell(40,10,$from);
$pdf->Cell(40,30,$bik);
$pdf->Cell(40,50,$acc_num);
$pdf->Cell(40,70,$vat);
$pdf->Cell(40,90,$sum);
$pdf->Output();
?>