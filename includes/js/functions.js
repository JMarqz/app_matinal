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
    //var reflexionBuscar = document.getElementById('fecha-buscar');

    if (cargando != null) { cargando.style.display = "none" };
    if (reflexion != null) { reflexion.style.display = "block" };
    /*
    if (reflexionBuscar != null) {
        var hoy = new Date();

        var dia = hoy.getDate();
        var mes = hoy.getMonth() + 1;
        var anio = hoy.getFullYear();

        if (mes < 10) { mes = "0"+mes };
        if (dia < 10) { dia = "0"+dia };

        hoy = anio + "-" + mes + "-" + dia;

        $('#fecha-buscar').attr('value', hoy);
    };
    */
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

function seleccionadorFechas(){
    var hoy = new Date();

    var dia = hoy.getDate();
    var mes = hoy.getMonth() + 1;
    var anio = hoy.getFullYear();

    hoy = anio + "-" + mes + "-" + dia;

    var options = {
      date: hoy,
      mode: 'date',
      minDate: "2014-09-01",
      maxDate: "2014-12-31"
    };

    datePicker.show(options, function(date){
        alert("date result " + date);
    });
}

function compartir(){
    /*
    var titulo = document.getElementById("titulo").innerHTML;
    var versiculo = document.getElementById("versiculo").innerHTML;
    var contedido = document.getElementById("contedido").innerHTML;
    var copyrigth = document.getElementById("footer_reflexion").innerHTML;
    var matinal = "- Matinal de Jóvenes";

    var mensaje = titulo + "\n\n" + versiculo + "\n\n" + contedido + "\n\n" + copyrigth;
    mensaje = mensaje.replace(/<br>/g, "\n").replace(/<p>/g, "").replace(/<\/p>/g, "");
    */
    var versiculo = document.getElementById("versiculo").innerHTML;
    var matinal = " - Matinal de Jóvenes";
    var mensaje = versiculo.replace(/<br>/g, " ");
    mensaje = mensaje + matinal;

    window.plugins.socialsharing.share(mensaje, 'Matinal de Jóvenes');
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

// BUSCAR
function buscar(){
    $("#btnCompartir").addClass("ui-state-disabled");
    var fechaSeleccionada = $("#fecha-buscar").val();
    var arrFecha = fechaSeleccionada.split("-");
    var anio = parseInt(arrFecha[0]);
    var mes = parseInt(arrFecha[1]);
    var dia = parseInt(arrFecha[2]);
    
    cargarReflexion(dia, mes, anio);
}

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
                        '<h2 id="titulo" class="centrar">'+item.titulo+'</h2>' +
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
                
                $("#btnCompartir").removeClass("ui-state-disabled");
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
