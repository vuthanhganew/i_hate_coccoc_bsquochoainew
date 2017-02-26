var s = document.createElement('script');
s.src = chrome.extension.getURL('/site/inSite/hochoctv/changevariable.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

$(function(){
	$("#button_download").after('<button class="btn btn-danger" id="bs_download" type="button"><i style="color:#EEFD20" class="fa fa-download"></i> Tải (thầy)</button>')
	$("#bs_download").click(function(){
		name = $("h1.name.text-success").text().trim()+" - by bsquochoai.ga"
		
		if( $("#myplayer").length > 0 ){
			link = $("#myplayer source").attr("src")
		} else {
			link = $("#myplayer_html5_api source").attr("src")
		}
		
		chrome.runtime.sendMessage({ham: "downloadzingmp3", link: link, name: name+".mp4"})
		
		
		if( $("#myplayer").length > 0 ){
			$("#myplayer track").each(function(){
				link = $(this).attr("src")
				name1 = name + " - " + $(this).attr("srclang")+ link.substring(link.length-4)
				chrome.runtime.sendMessage({ham: "downloadzingmp3", link: link, name: name1})
			})
		}
		
	})
})