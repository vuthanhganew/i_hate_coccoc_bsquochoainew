var playername = "bsquochoainewplayer";
var GOODHOST = 'http://bsquochoai-webservice.herokuapp.com/';
$(".sectionplay").attr("id", playername);
//_ifpt.m3u8
$.ajax({
	url: localStorage.bsquochoai_playlistm3u8+"?",
	success: function(re0){
				allplayfile = re0.match(/http:\/\/.*m3u8/g) // Tat ca cac file m3u8 dan den video goc
				so1 = 0
				allvideostring  = ""
				getAllVideoLink()
				function getAllVideoLink(){
					$.ajax({
						url : allplayfile[so1].replace("_ivdc.m3u8", "_vip_ivdc.m3u8").replace("_ifpt.m3u8", "_vip_ifpt.m3u8"),
						success: function(videolink){
							if(allvideostring == ""){
								allvideostring = videolink.match(/(https?:\/\/[^\s]+)/g)[0]
							} else {
								allvideostring += ",,"+videolink.match(/(https?:\/\/[^\s]+)/g)[0]
							}
							if (so1 == allplayfile.length - 1){
								$.ajax({
									url: allplayfile[allplayfile.length-1].replace("_ivdc.m3u8", "_vip_ivdc.m3u8").replace("_ifpt.m3u8", "_vip_ifpt.m3u8"),
									success: function(re3){
										alllinkvideo = re3.match(/(https?:\/\/[^\s]+)/g)
										totalvideo = alllinkvideo.length
										playlist = GOODHOST+"?action=hdviet&type=m3u8&file=playlist&contain="+encodeURIComponent(re0)+"&totalvideo="+totalvideo+"&allvideostring="+allvideostring
										finishplaylist(playlist)
									}
								})
								return false;
							} else {
								so1++
								getAllVideoLink()
							}
						}
					})
				}
	}
})

function finishplaylist(playlist){
	tracks = []
	if (typeof localStorage["bsquochoai_subtitles"] != "undefined"){
		if(localStorage["bsquochoai_subtitles"].indexOf("_VIE.srt") != - 1){
			tracks.push({
				file: localStorage["bsquochoai_subtitles"], 
					label: "Tiếng Việt (bsquochoai)",
					kind: "captions",
					"default": true
			})
			tracks.push({
				file: localStorage["bsquochoai_subtitles"].replace("_VIE.srt", "_ENG.srt"),
					label: "Tiếng Anh (bsquochoai)",
					kind: "captions"
			})
		} else {
			tracks.push({
				file: localStorage["bsquochoai_subtitles"], 
				label: "Tiếng Anh (bsquochoai)",
				kind: "captions",
				"default": true
			})
			tracks.push({
				file: localStorage["bsquochoai_subtitles"].replace("_ENG.srt", "_VIE.srt"), 
				label: "Tiếng Việt (bsquochoai)",
				kind: "captions"
			})
		}
	}
	jwplayer(playername).setup({
	  file: playlist,
	  type:"m3u8",
	  aboutlink:"http://bsquochoai.ga",
	  abouttext:"Trang chủ nhà thầy",
	  tracks: tracks,
	  primary: "flash",
	  width: "100%",
	  height: 500,
	  autostart: true
	});
	localStorage.removeItem("bsquochoai_subtitles")
}
