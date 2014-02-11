$(document).ready(function(){
	var output = $('#reflexion');

	$.ajax({
		url: 'http://jmarqz.w.pw/Matinal/server/conex.php',
		//url: 'http://jmarqz.w.pw/Matinal/includes/js/reflexiones.json',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			//NO EXISTE LA REFLEXIÓN EN LA BASE DE DATOS
			if (data==null || data=="Error") {
				var errorMessage = '<h1 style="text-align: center;">:(</h1>'+
				'<h4 style="text-align: center;">La reflexión de hoy no está disponible.<br>Por favor, intente más tarde.</h4>';

				output.append(errorMessage);
			}
			else{
				$.each(data, function(i,item){
					//Convertir el mes (número -> texto)
					var mes = Number(item.mes);
					switch (mes) {
		                case 1: mes = "Enero"; break;
		                case 2: mes = "Febrero"; break;
		                case 3: mes = "Marzo"; break;
		                case 4: mes = "Abril"; break;
		                case 5: mes = "Mayo"; break;
		                case 6: mes = "Junio"; break;
		                case 7: mes = "Julio"; break;
		                case 8: mes = "Agosto"; break;
		                case 9: mes = "Septiembre"; break;
		                case 10: mes = "Octubre"; break;
		                case 11: mes = "Noviembre"; break;
		                case 12: mes = "Diciembre"; break;
		            }

		            if (i==0) {
						var reflexion = '<div id="fecha" style="text-align: right;">'+item.dia+'/'+mes+'/'+item.anio+'</div>' +
						'<h1 id="titulo" style="text-align: center;">'+item.titulo+'</h1>' +
						'<p id="versiculo" style="font-style:italic; text-align: center;">'+item.versiculo+'</p>'+
						'<div id="contedido" style="text-align: justify; text-indent: 1cm">'+item.contenido+'</div>'					
						output.append(reflexion);

					} else if(i==1){
						var pie_pagina = '<p id="footer_reflexion" style="text-align: left; font-size: 12px; font-style: italic;">'+
						item.nombreMatinal+'<br>'+
						item.autor+'<br>'+
						item.anio+'</p>';

						output.append(pie_pagina);
					}
				});
			}
		},
		error: function(){
			//NO EXISTE CONEXIÓN A INTERNET
			/*
			var online = navigator.onLine;

			if (online == false) {
				var errorInternet = '<h1 style="text-align: center;">!</h1>'+
				'<h4 style="text-align: center;">¡No existe conexión a internet y no se puede mostrar la reflexión de hoy!<h4/>';

				output.append(errorInternet);
			}

			//OCURRIÓ UN ERROR EN LA CONEXIÓN
			else {
				*/
				var errorConexion = "<h4 style='text-align: center;'>Ocurrió un error al intentar conectarse al servidor y ver la reflexión de hoy. Intente volver a cargar la reflexión con el botón de actualizar.</h4>";
				output.append(errorConexion);
			//}
		}
	});
});