// DEVICE READY
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 2000);

    StatusBar.backgroundColorByHexString("#000000");
    StatusBar.styleLightContent();
}

// CARGANDO...
window.onload = function() {
    var cargando = document.getElementById("cargando");
    var reflexion = document.getElementById("reflexion");

    if (cargando != null) { cargando.style.display = "none" };
    if (reflexion != null) { reflexion.style.display = "block" };
}

// CONFIGURACIÓN MENU
$(function() {
    $('#menu').mmenu({
        position: "left"
    });
});

// ABRIR MENU DESLIZANDO DERECHA
$(document).on('pageinit',function(){
    $("#page").on("swiperight",function(){
        $("#menu").trigger( "open.mm" );
    });
});

// ACTUALIZAR
function actualizar(){
    document.getElementById("reflexion").style.display = "none";
    document.getElementById("cargando").style.display = "block";
    window.location.reload();
}

// ABRIR URL
function abrirURL(url){
    window.open(url, '_system');
}

// ABRIR TWITTER NATIVO 
function abrirTwitter(userName){
    var plataforma = device.platform;
    var twitter;

    if (plataforma == "Android") {
        twitter = "com.twitter.android";
    } else if(plataforma == "iOS"){
        twitter = "twitter://";
    };

    // AppAvailability v0.3.0
    appAvailability.check(
    twitter, // URI Scheme
    function() {  // Success callback
        window.open("twitter://user?screen_name="+userName);
    },
    function() {  // Error callback
        window.open("http://www.twitter.com/"+userName, "_system");
    });
}

// ABRIR FACEBOOK
function abrirFB(userName){
    var plataforma = device.platform;
    var fb;

    if (plataforma == "Android") {
        fb = "com.facebook.katana";
    } else if(plataforma == "iOS"){
        fb = "fb://";
    };

    // AppAvailability v0.3.0
    appAvailability.check(
    fb, // URI Scheme
    function() {  // Success callback
        window.open("fb://profile/"+userName);
    },
    function() {  // Error callback
        window.open("http://www.facebook.com/"+userName, "_system");
    });
}

// AÑO BISIESTO
function bisiesto(anio){
    anio = 0;
    if (anio%4 == 0 && (anio%100 != 0 || anio%400 == 0)) {
        return true;
    } else{
        return false;
    }
}

// BUSCAR
function buscar(){
    var fechaSeleccionada = $("#fecha-buscar").val();
    var arrFecha = fechaSeleccionada.split("-");
    
    var anio = parseInt(arrFecha[0]);
    var mes = parseInt(arrFecha[1]);
    var dia = parseInt(arrFecha[2]);
    
    cargarReflexion(dia, mes, anio);
}


/*
// MAÑANA
function manana(){
    var hoy = new Date();

    var dia = hoy.getDate();
    var mes = hoy.getMonth() + 1;
    var anio = hoy.getFullYear();

    ocultarSelectorFecha();

    // Verificar si es año bisiesto
    if (mes == 2) {
        if (bisiesto(anio)) {
            // Febrero, 29 dias
            if (dia < 29){
                dia++;
            } else{
                dia = 1;
                mes++;
            }
        } else{
            // Febrero 28 dias
            if (dia < 28) {
                dia++;
            } else{
                dia = 1;
                mes++;
            }
        }

    } else if(mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10){
        // Meses de 31 dias
        if (dia < 31) {
            dia++;
        } else{
            dia = 1;
            mes++;
        }

    } else if (mes == 12){
        // Diciembre
        if (dia < 31) {
            dia++;
        } else{
            // Fin de año
            dia = 1;
            mes = 1;
            anio++;
        }
    } else{
        // Meses de 30 dias
        if (dia < 30) {
            dia++;
        } else{
            dia = 1;
            mes++;
        }
    }

    cargarReflexion(dia, mes, anio);
}
*/

function cargarReflexion(dia, mes, anio){
    var output = $('#reflexion-buscada');

    output.html("<p class='centrar'>Buscando...</p>");

    $.ajax({
        url: 'http://jmarqz.site90.net/matinal/server/conex.php?dia='+dia+'&mes='+mes+'&anio='+anio,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data, status){
            //NO EXISTE LA REFLEXIÓN EN LA BASE DE DATOS
            if (data==null || data=="Error") {
                var errorMessage = '<h1 class="centrar">:(</h1>'+
                '<h4 class="centrar">La reflexión que buscas no está disponible.</h4>';

                output.html(errorMessage);
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
                        var reflexion = '<div id="fecha" class="derecha">'+item.dia+'/'+mes+'/'+item.anio+'</div>' +
                        '<h1 id="titulo" class="centrar">'+item.titulo+'</h1>' +
                        '<p id="versiculo" class="versiculo centrar">'+item.versiculo+'</p>'+
                        '<div id="contedido" class="contenido-reflexion">'+item.contenido+'</div>'                    
                        output.html(reflexion);

                    } else if(i==1){
                        var pie_pagina = '<p id="footer_reflexion" class="creditos-reflexion">'+
                        item.nombreMatinal+'<br>'+
                        item.autor+'<br>'+
                        item.anio+'</p>';

                        output.append(pie_pagina);
                    }
                });
            }
        },
        error: function(){
            var errorConexion = '<h1 class="centrar">:(</h1>' + 
            '<h4 class="centrar">¡Ocurrió un error al intentar conectarse al servidor!'+
            '<br>Intenta volver a buscar la reflexión.</h4>';

            output.html(errorConexion);
        }
    });
}
