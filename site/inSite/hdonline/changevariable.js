Object.defineProperty(window, "BlueseedConfig",
	{ value: {}
	}
);
Object.freeze(window.BlueseedConfig);
$(document).ready(function(){
	console.log(jwplayer("hdoplayer"))
	player = jwplayer("hdoplayer");
	config = player.getConfig();

	//Tự động chơi video
	config.autostart = true;
	//Tắt quảng cáo
	$.each(config.plugins, function(key, val) {
		if (key.indexOf("vplugin.js")!=-1) {
			config.plugins[key].vads= false;
			config.plugins[key].uvip= true;
		}
	});

	player.setup(config)
})