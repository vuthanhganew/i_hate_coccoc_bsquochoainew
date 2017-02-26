$(function(){
	if(window.location.href.indexOf("/go/") !=-1 && $("#btn-main").length > -1){
		window.location = $("#btn-main").attr("href")
	}
})