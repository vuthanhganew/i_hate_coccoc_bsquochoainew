videoId = $("#tabAdd").data("id")
playerId = "_player"
$.ajax({
	url: "http://api.mp3.zing.vn/api/mobile/video/getvideoinfo?keycode=fafd463e2131914934b73310aa34a23f&requestdata={%22id%22:%22"+videoId+"%22}",
	success: function(re){
		sources=[], downloadHTML='<div class="service-container fn-sub-panel fn-sub-dl" style="width: 450px;"><div class="row mb0"><ul class="dl-service">'
		$.each(re.source, function(key, val){
			sources.push({
				file: val,
				label: key + " - bsquochoai.ga",
				type: "mp4"
			})
			downloadHTML+='<li><a title="Tải video '+key+'p" class="button btn-dark-blue small-button fn-'+key+' bsquochoai_taivideo" data-download="'+val+'" data-quality="'+key+'"><i class="zicon icon-dl"></i>'+key+'p</a><b>Cùng thầy tải xuống video chất lượng '+key+'p nhe.</b></li>'
		})
		downloadHTML+='</ul></div></div>'
		sources[sources.length-1]["default"] ="true"
		playerInstance = jwplayer(playerId).setup({
			  image: "http://mp3.zing.vn/"+re.thumbnail,
				sources: sources,
			  aboutlink:"http://bsquochoai.ga",
			  abouttext:"Trang chủ nhà thầy",
			  primary: "html5",
			  width: 860,
			  height: 522,
			  autostart: true
		}).addButton(
			"http://icons.iconarchive.com/icons/graphicloads/100-flat/32/download-icon.png",
			"Tải xuống video này với thầy", 
			function() {
				$("#confirmBox .popup-content").html(downloadHTML)
				$("#confirmBox .popup-footer .fn-ok").hide()
				zmp3UI.confirm("Em hãy chọn chất lượng video để tải xuống", downloadHTML,function(){})
			},
			"bsquochoai_download"
		);
	}
})