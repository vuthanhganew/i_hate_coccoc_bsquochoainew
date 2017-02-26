//$("body").append('<script src="'+chrome.extension.getURL('site/plugins/jwplayer.js')+'"></script>')
od = {
	init: function(){
		$("body").append('<div id=bs_player_container style="position: fixed; bottom: 0px; right:0px; width: 50%; height: 360px; z-index:10000; background-color: rgba(206, 118, 118, 0.26);"><div id=bs_player></div></div>')
		$("#bs_player_container").draggable();
		player = jwplayer('bs_player');
		od.setupPlayer()
	},
	onhashchange: function(){
		od.getPlaylist(od.setupPlayer)
	},
	getPlaylist: function(functionToExecuteAfterFinish) {
		//https://skyapi.onedrive.live.com/API/2/GetItems?caller=&ft=&sb=0&ps=100&sd=0&gb=0&d=1&m=en%2DUS&iabch=1&pi=5&path=1&lct=1&rset=odweb&v=0%2E7553372022230178&si=0&authkey=%21AGvMh9Cq7xhmqmE&id=B5C245F74CAD4F5B%21175&cid=B5C245F74CAD4F5B
		//https://onedrive.live.com/?authkey=%21AGvMh9Cq7xhmqmE&id=B5C245F74CAD4F5B%21175&cid=B5C245F74CAD4F5B
		playlists = []
		authkeyLink = window.location.href.split("?")[1]
		$.ajax({
			url: 'https://skyapi.onedrive.live.com/API/2/GetItems?caller=&ft=&sb=0&ps=100&sd=0&gb=0&d=1&m=en%2DUS&iabch=1&pi=5&path=1&lct=1&rset=odweb&si=0&'+authkeyLink,
			type: 'GET'
		})
		.done(function(re) {
			$.each(re.items[0].folder.children, function(index, el) {
				console.log(el)
				if (el.iconType == "Video") {
					playlists.push({
						title: el.name,
						sources: [{file: el.urls.download, type: el.extension.substring(1)}]
					})
				}
			});
			console.log(playlists)
			functionToExecuteAfterFinish(playlists);
		})
	},
	setupPlayer: function(playlists){
		/*player.setup({
			playlist: playlists
		});*/
		        player.setup({
        file: "http://jaris.sourceforge.net/files/jaris-intro.flv",
        width: "100%",
        displaytitle: false
        });

        player.addButton(
        //This portion is what designates the graphic used for the button
           "http://icons.jwplayer.com/icons/white/download.svg",
        //This portion determines the text that appears as a tooltip
           "Download Video", 
        //This portion designates the functionality of the button itself
           function() {
        //With the below code, we're grabbing the file that's currently playing
           window.location.href = player.getPlaylistItem()['file'];
         },
        //And finally, here we set the unique ID of the button itself.
        "download"
        );

	}
}
$(function() {
	od.init()
	window.onhashchange = od.onhashchange()
})