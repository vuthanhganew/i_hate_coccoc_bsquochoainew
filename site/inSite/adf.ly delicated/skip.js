function crack(code) {
	var N = '';
	var M = '';
	
	for(var i = 0; i < code.length; i++) {
		if(i%2 == 0) {
			N += code[i];
		} else {
			M = code[i] + M;
		}
	}
	
	var key = N + M;

	key = window.atob(key);
	key = key.substring(2);
	
	return key;
}

if (typeof ysmm === 'undefined') {
	// no code
} else {
	var code = ysmm;
	var url = crack(code);

	if(url && url !== "") {
		window.onbeforeunload = function(evt) {return;}
		window.location = url;
	}
}