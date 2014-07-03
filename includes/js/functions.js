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
    $('#cargando').show();
    setTimeout('location.reload(true);',0);
}

// ABRIR TWITTER NATIVO 
function abrirTwitter(userName){
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
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
}

// ABRIR FACEBOOK
function abrirFB(userName){
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady(){
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
}
