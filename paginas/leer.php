<?php 
    include("../includes/conexion.php");
 ?>

<!DOCTYPE html> 
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<!--
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, height=device-height, width=device-width, user-scalable=no"/>
-->


<title>Matinal</title>
    <!-- JQuery -->
    <script src="../includes/js/jquery-1.11.0.min.js"></script>
    
    <!-- Phonegap 
    <script type="text/javascript" src="../includes/cordova/android/cordova.js"></script>
    <script type="text/javascript" src="../includes/cordova/ios/cordova.js"></script>
    -->
    <!-- JQuery Mobile -->    
    <script src="../includes/js/jquery.mobile-1.3.2.min.js"></script>
    
    <!-- TEMA PERSONALIADO -->
    <link rel="stylesheet" type="text/css" href="../includes/css/dark_theme.css">
    <link rel="stylesheet" type="text/css" href="../includes/css/jqm_structure.css">    
    
    <!-- Regresar a "Buscar" -->
    <script type="text/javascript">
        $(document).on('pageinit',function(){
            $("#page").on("swiperight",function(){
                console.log("Swipe");
            });
        });        
    </script>

</head>

<body>
<div data-role="page" id="page" data-theme="a">
	<header data-role="header" data-theme="a" data-position="fixed">
        <a href="buscar.html" class="ui-icon-alt" data-iconpos="notext" data-icon="arrow-l" class="ui-icon-nodisc" data-iconshadow="false">Regresar</a>
        <h1>Buscar</h1>        
	</header>
    
    
	<div data-role="content">
        <script type="text/javascript">
            /*
            function recargar(){
                location.href=location.href
            }
            
            if (actualizar==0) {
                setInterval('recargar()',0);
                actualizar++;
            }            
            

            function GetUrlValue(VarSearch){
                var SearchString = window.location.search.substring(1);
                var VariableArray = SearchString.split('&');
                for(var i = 0; i < VariableArray.length; i++){
                    var KeyValuePair = VariableArray[i].split('=');
                    if(KeyValuePair[0] == VarSearch){
                        return KeyValuePair[1];
                    }
                }
            }
            document.write(GetUrlValue('dia'));
            */
        </script>

        <?php 
        
            $dia = $_POST['dia'];
            $mes = $_POST['mes'];
            $anio = date("Y");

            //Verificar si existe el resultado
            $hay_resultado = mysql_num_rows(mysql_query("SELECT * FROM `reflexiones` WHERE `dia`='$dia' AND `mes`='$mes' AND `anio`='$anio' ")); 

            //NO EXISTE?
            if ($hay_resultado==0) {
                echo "<h4 style='text-align: center;'>No se encontraron resultados de la búsqueda. Intente buscar otra vez.</h4>";
            } else{                
                $result_reflexion = mysql_query("SELECT * FROM `reflexiones` WHERE `dia`='$dia' AND `mes`='$mes' AND `anio`='$anio' ");
                while ($row_reflexion = mysql_fetch_array($result_reflexion)) {
                    $id_reflexionHoy = $row_reflexion["id_reflexion"];
                    $titulo = $row_reflexion["titulo"];
                    $versiculo = $row_reflexion["versiculo"];
                    $contenido = $row_reflexion["contenido"];
                    $idMatinal = $row_reflexion["id_matinal"];                
                }

                //Select de los MATINALES
                $result_matinal = mysql_query("SELECT * FROM `matinales` WHERE `id_matinal`='$idMatinal' ");
                while ($row_matinal = mysql_fetch_array($result_matinal)) {
                    $Matinal = $row_matinal["nombreMatinal"];
                    $idTipoMatinal = $row_matinal["tipo"];
                    $autor = $row_matinal ["autor"];
                    $anio = $row_matinal ["anio"];
                }

                //Select del TIPO DE MATINALES
                $result_tipoMatinal = mysql_query("SELECT * FROM `tipo_matinal` WHERE `id_tipoMatinal`='$idTipoMatinal' ");
                while ($row_tipoMatinal = mysql_fetch_array($result_tipoMatinal)) {
                    $tipoMatinal = $row_tipoMatinal["tipoMatinal"];
                }
            
         
            //<!-- A la derecha -->        
            echo "<div id='fecha' style='text-align: right';>";            
            
            //Poner fecha con los nombres de los meses
            switch ($mes) {
                case '1': $mes = "Enero"; break;
                case '2': $mes = "Febrero"; break;
                case '3': $mes = "Marzo"; break;
                case '4': $mes = "Abril"; break;
                case '5': $mes = "Mayo"; break;
                case '6': $mes = "Junio"; break;
                case '7': $mes = "Julio"; break;
                case '8': $mes = "Agosto"; break;
                case '9': $mes = "Septiembre"; break;
                case '10': $mes = "Octubre"; break;
                case '11': $mes = "Noviembre"; break;
                case '12': $mes = "Diciembre"; break;
            }

            echo $dia."/".$mes."/".$anio;            
            echo "</div>";
        
            //<!-- Centrado -->
            echo "<h1 id='titulo' style='text-align: center;'>$titulo</h1>";
            
            //<!-- Centrado y curisva -->
            echo "<p id='versiculo' style='font-style:italic; text-align: center;'>$versiculo</p>";

            //<!-- Justificado, *Tabulado y *Capital -->
            echo "<div id='contedido' style='text-align: justify; text-indent: 1cm'>$contenido</div>";

            echo "<p id='tipoMatinal' style='text-align: left; font-size: 12px; font-style: italic;'>
            Tomado del $tipoMatinal $anio<br>
            $Matinal<br>
            $autor
            </p>";
        }
        
?>
    </div>

    <!-- Footer -->

</div>    
</body>
</html>
