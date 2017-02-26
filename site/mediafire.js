$(function(){
	$("a").off().click(function(){
		if($(this).attr("href").indexOf("http://download") != -1){
			download($(this).attr("href"), "g")
		}
	})
})
function download(uri, name) {
		 var link = document.createElement("a");
		 link.download = name;
		 link.href = uri;
		 link.click();
	}