<?php 
$host = "mysql.hostinger.es";
$usuario = "u210666913_jmat";
$pass = "matinal.app";

$conn = mysql_connect($host, $usuario, $pass) or die ('Error conectando a la base de datos');

$bdnombre = "u210666913_mat";
mysql_select_db($bdnombre);

 ?>