$("body").on("click", ".bsquochoai_download", function(evt){
	link = "http:///"+$(evt.target).data("download")
	name = $("title").text().split("|")[0].trim()+" - "+$(evt.target).data("quality")+"p bsquochoai.ga .mp4"
	chrome.runtime.sendMessage({ham: "downloadzingmp3", link: link, name: name})
	return false;
})
$(".ytb-box").html('<div class="g-ytsubscribe sytb" data-channelid="UChtMUdkzlLgpklOXSf-ODlg" data-layout="default" data-count="hidden"></div>')
var actualCode = ['gapi.ytsubscribe.go("body");'].join('\n');
var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);