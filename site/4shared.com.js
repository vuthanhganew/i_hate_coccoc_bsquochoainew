href= window.location.href
isDownload = href.match(/\/(mp3|get|rar|zip|file|android|software|program|office)\//g)
if(isDownload.length > 0 ){
	$.get('http://www.4server.info/find.php', {
			data: window.location.href,
		 }).then(function (data) {
		 downloadlink = $(data).find('a[href*="4shared.com/download/"]').attr("href")
		 console.log(downloadlink)
		 //window.location.assign(downloadlink)
	 });
}
