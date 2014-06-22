//MENU
$(function() {
    $('#menu').mmenu({
        position: "left"
    });
});

//Función para abrir el menú deslizando el dedo
$(document).on('pageinit',function(){
    $("#page").on("swiperight",function(){
        $("#menu").trigger( "open.mm" );
    });
});


//ACTUALIZAR
function actualizar(){
    $('#cargando').show();
    setTimeout('location.reload(true);',0);
}

/* PROBANDO LAS APLICACIONES INSTALADAS */
function abrirTwitter(){
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady(userName) {
        var plataforma = device.platform;
        var twitter = "";

        //Saber si es Android o iOS
        if (plataforma == "Android") {
            twitter = "com.twitter.android";
        } else if(plataforma == "iOS"){
            twitter = "twitter://";
        };

        //Checar Twitter v0.3.0
        /*
        appAvailability.check(
        twitter, // URI Scheme
        function() {  // Success callback
            alert('Twitter está instalado');
        },
        function() {  // Error callback
            alert('Twitter NO está instalado');
        }
        */

        //Checar Twitter v0.2.1
        appAvailability.check(twitter, function(availability) {
            // availability is either true or false
            if(availability) {
                window.open("twitter://user?screen_name="+userName, "_system");
            } else{
                window.open("http://www.twitter.com/"+userName, "_system");
            }
        });
    }
}