videoId = $("#_playSuggest").attr("mediaid")
if( $("._insideBackground").attr("ok") == "1" ){

} else {
$("._insideBackground").attr("id", "bsquochoai_player").attr("ok", "1")
playerId = "bsquochoai_player"
$.ajax({
	url: "http://api.tv.zing.vn/3.0/media/info?api_key=7d3343b073f9fb9ec75e53335111dcc1&media_id="+videoId,
	success: function(re){
		re = re.response
		sources=[], downloadHTML = ''
		sources.push({
			file: "http://"+re.file_url,
			label: "360p - bsquochoai.ga",
			type: "mp4"
		})
		downloadHTML+= '<a href="#" class="button button-green bsquochoai_download" data-download="'+re.file_url+'" data-quality="360">Tải xuống 360p</a>'
		$.each(re.other_url, function(key, val){
			if(key.indexOf("3GP") != -1){
				return;
			}
			if(key.indexOf("720") != -1){
				defaultV = "true"
			} else defaultV = "false"
			quality =  key.replace(/Video/g,"")
			sources.push({
				file: "http://"+val,
				label: quality+"p - bsquochoai.ga",
				type: "mp4",
				"default": defaultV
			})
			downloadHTML+= '<a href="#" class="button button-green bsquochoai_download" data-download="'+val+'" data-quality="'+quality+'">Tải xuống '+quality+'p</a>'
		})
		playeroption = {
			  aboutlink:"http://bsquochoai.ga",
			  abouttext:"Trang chủ nhà thầy",
			  primary: "html5",
			  width: "100%",
			  height: 520,
			  autostart: true
		}
		if(sources.length == 1){
			playeroption.file = sources[0].file
			playeroption.type = "mp4"
		} else {
			playeroption.sources = sources
		}
		playerInstance = jwplayer(playerId).setup(playeroption).addButton(
			"http://icons.iconarchive.com/icons/graphicloads/100-flat/32/download-icon.png",
			"Tải xuống video này với thầy", 
			function() {
				$("body").append('<div style="width:500px; height:300px;position:fixed;margin: 5% auto;left: 0;right: 0; background-color:white; z-index:9999999999999; top: 5%;box-shadow: #2DADD2 2px 2px 3px;" id="bs_download_contain">'+downloadHTML+'<span style="position: absolute;top: 0px;right: 15px;font-size: 30px;cursor: pointer;" onclick="$(\'#bs_download_contain\').remove()">x</span></div>')
			},
			"bsquochoai_download"
		);
	}
})

}