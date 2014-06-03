/* FUNCTIONS */

/* Function to Open in Browser, not inApp */
openURL: function(url){
	if(device.platform === 'Android') {
        navigator.app.loadUrl(url, {openExternal:true});
    } else {
        window.open(url, '_system');
    }
}