function onDeviceReady(){setTimeout(function(){navigator.splashscreen.hide()},2e3),StatusBar.backgroundColorByHexString("#000000"),StatusBar.styleLightContent()}function actualizar(){document.getElementById("reflexion").style.display="none",document.getElementById("cargando").style.display="block",window.location.reload()}function abrirURL(e){window.open(e,"_system")}function compartir(){var e=document.getElementById("reflexion").innerHTML,t="Reflexión del Matinal de Jóvenes";window.plugins.socialsharing.shareViaEmail(e,t)}function abrirTwitter(e){var t=device.platform,n;"Android"==t?n="com.twitter.android":"iOS"==t&&(n="twitter://"),appAvailability.check(n,function(){window.open("twitter://user?screen_name="+e)},function(){window.open("http://www.twitter.com/"+e,"_system")})}function abrirFB(e){var t=device.platform,n;"Android"==t?n="com.facebook.katana":"iOS"==t&&(n="fb://"),appAvailability.check(n,function(){window.open("fb://profile/"+e)},function(){window.open("http://www.facebook.com/"+e,"_system")})}function buscar(){$("#btnCompartir").addClass("ui-state-disabled");var e=$("#fecha-buscar").val(),t=e.split("-"),n=parseInt(t[0]),o=parseInt(t[1]),i=parseInt(t[2]);cargarReflexion(i,o,n)}function cargarReflexion(e,t,n){var o=$("#reflexion");o.html("<p class='centrar'>Buscando...</p>"),$.ajax({url:"http://jmarqz.site90.net/matinal/server/conex.php?dia="+e+"&mes="+t+"&anio="+n,dataType:"jsonp",jsonp:"jsoncallback",timeout:5e3,success:function(e,t){if(null==e||"Error"==e){var n='<h1 class="centrar">:(</h1><h4 class="centrar">La reflexión que buscas no está disponible.</h4>';o.html(n)}else $.each(e,function(e,t){var n=Number(t.mes);switch(n){case 1:n="Enero";break;case 2:n="Febrero";break;case 3:n="Marzo";break;case 4:n="Abril";break;case 5:n="Mayo";break;case 6:n="Junio";break;case 7:n="Julio";break;case 8:n="Agosto";break;case 9:n="Septiembre";break;case 10:n="Octubre";break;case 11:n="Noviembre";break;case 12:n="Diciembre"}if(0==e){var i='<div id="fecha" class="derecha">'+t.dia+"/"+n+"/"+t.anio+'</div><h2 id="titulo" class="centrar">'+t.titulo+'</h2><p id="versiculo" class="versiculo">'+t.versiculo+'</p><div id="contedido" class="contenido-reflexion">'+t.contenido+"</div>";o.html(i)}else if(1==e){var r='<p id="footer_reflexion" class="creditos-reflexion">'+t.nombreMatinal+"<br>"+t.autor+"<br>"+t.anio+"</p>";o.append(r)}}),$("#btnCompartir").removeClass("ui-state-disabled")},error:function(){var e='<h1 class="centrar">:(</h1><h4 class="centrar">No se pudo establecer conexión con el servidor.<br>Verifica tu conexión a internet e intenta recargar la reflexión.</h4>';o.html(e)}})}document.addEventListener("deviceready",onDeviceReady,!1),window.onload=function(){var e=document.getElementById("cargando"),t=document.getElementById("reflexion"),n=document.getElementById("fecha-buscar");if(null!=e&&(e.style.display="none"),null!=t&&(t.style.display="block"),null!=n){var o=new Date,i=o.getDate(),r=o.getMonth()+1,a=o.getFullYear();10>r&&(r="0"+r),10>i&&(i="0"+i),o=a+"-"+r+"-"+i,$("#fecha-buscar").attr("value",o)}},function(){"use strict";/**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */
function e(t,o){function i(e,t){return function(){return e.apply(t,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=t,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!e.notNeeded(t)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,l=a.length;l>s;s++)c[a[s]]=i(c[a[s]],c);n&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,o){var i=Node.prototype.removeEventListener;"click"===e?i.call(t,e,n.hijacked||n,o):i.call(t,e,n,o)},t.addEventListener=function(e,n,o){var i=Node.prototype.addEventListener;"click"===e?i.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),o):i.call(t,e,n,o)}),"function"==typeof t.onclick&&(r=t.onclick,t.addEventListener("click",function(e){r(e)},!1),t.onclick=null)}}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(o&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,o;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),o=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return n&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(e){var t;o&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,r;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n},e.prototype.onTouchMove=function(e){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,a,c,s,l,u=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(l=e.changedTouches[0],u=document.elementFromPoint(l.pageX-window.pageXOffset,l.pageY-window.pageYOffset)||u,u.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=u.tagName.toLowerCase(),"label"===c){if(t=this.findControl(u)){if(this.focus(u),n)return!1;u=t}}else if(this.needsFocus(u))return e.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(u),this.sendClick(u,e),o&&"select"===c||(this.targetElement=null,e.preventDefault()),!1);return o&&!i&&(s=u.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(u)||(e.preventDefault(),this.sendClick(u,e)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;n&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,o,i;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===e.style.msTouchAction?!0:"none"===e.style.touchAction},e.attach=function(t,n){return new e(t,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e}();