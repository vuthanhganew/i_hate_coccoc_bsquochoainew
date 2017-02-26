//mirrorcreator.com
if(window.location.href.indexOf("mirrorcreator.com") != -1){
	if(window.location.href.indexOf("showlink.php") != -1){
		window.location.assign($(".redirecturl").text())
	}
}

//zippyshare.com
if(window.location.href.indexOf("zippyshare.com") != -1){
	$("#dlbutton").append("<button id='bs_downloadme'></button>")
	$("#bs_downloadme").trigger("click")
}

//mediafire.com
if(window.location.href.indexOf("mediafire.com") != -1){
	exeScript("if(window.kNO!=undefined){$('body').append('<iframe src=\"'+window.kNO+'\" style=\"display:none\"></iframe>')}")
}

//uptobox.com
if(window.location.href.indexOf("http://uptobox.com/") != -1){
	$("#btn_download").trigger("click")
	setInterval(function(){
		$("a").each(function(){
			if($(this).text().trim() == "Click here to start your download" && $(this).attr("downloadroi") != "ok"){
				download($(this).attr("href"), "g")
				$(this).attr("downloadroi", "ok")
			}
		})
	}, 1000)
}
$(function(){
	//The download link is locked SHARE TWITTER FACEBOOK G+
	$("[data-lock-id]")
										.prepend("<div style='padding: 4px; background-color:#3E95F9; color:white'><b>Đã sử dụng mẹo hiển thị link bởi bsquochoai.ga</b></div>")
										.removeAttr("style").css({"display": "block !important", "background-color": "rgba(255,0,0,0.18)"})
})

//function section
function download(uri, name) {
		 var link = document.createElement("a");
		 link.download = name;
		 link.href = uri;
		 link.click();
}
function exeScript(script){
	var scr = document.createElement("script");
	scr.type="text/javascript";
	scr.innerHTML = script
	document.body.appendChild(scr)
}