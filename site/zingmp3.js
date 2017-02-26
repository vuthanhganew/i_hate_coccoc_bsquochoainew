$(function(){
	url =window.location.href
	if(url.indexOf("/album/") != -1){
		album()
	} else if(url.indexOf("/bai-hat/") != -1){
		baihat()
	} else if(url.indexOf("/video-clip/") != -1){
		videoclip()
	}
	$(".fn-ytsubscribe").html('<div class="g-ytsubscribe sytb" data-channelid="UChtMUdkzlLgpklOXSf-ODlg" data-layout="default" data-count="hidden"></div>')
	$(".btn-sub-ytb").html('<div class="g-ytsubscribe sytb" data-channelid="UChtMUdkzlLgpklOXSf-ODlg" data-layout="default" data-count="hidden"></div>')
	var actualCode = ['gapi.ytsubscribe.go("body");'].join('\n');
	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
})
function album(){
	$("#tabAdd").before('<a id="bsquochoai_downloadall_album_128" href="#" class="button-style-1 pull-left fn-tab"><i class="zicon icon-download" title="http://bsquochoai.ga - This button is created by Trần Quốc Hoài"></i><span style="color:red">Tải tất cả 128K</span></a>')
	$("#tabAdd").before('<a id="bsquochoai_downloadall_album_320" href="#" class="button-style-1 pull-left fn-tab"><i class="zicon icon-download" title="http://bsquochoai.ga - This button is created by Trần Quốc Hoài"></i><span style="color:red">Tải tất cả 320K</span></a>')
	$("#bsquochoai_downloadall_album_128").click(function(){
		xmllink = $("#player5").data("xml")
		xmlDoc=loadXMLDoc(xmllink);
		links=xmlDoc.getElementsByTagName('item')
		$.each(links, function(ind, val){
			name = ''
			$.each(val.children, function(i2, v2){
				if(v2.nodeName == "title"){
					name+=v2.textContent.trim()
				} else if(v2.nodeName == "performer"){
					name+= " - "+v2.textContent.trim()
				} else if(v2.nodeName == "source"){
					link = v2.textContent.trim()
				}
			})
			name += " - bsquochoai.ga 128K .mp3"
			chrome.runtime.sendMessage({ham: "downloadzingmp3", link: link, name: name})
		})
		return false;
	})
	
	$("#bsquochoai_downloadall_album_320").click(function(){
		bs_playlist_items = []
		$.each($("#playlistItems .playlist li"), function(){
			_this = $(this)
			name = _this.find("a.fn-name").attr("title").trim()+" - bsquochoai.ga 320K.mp3"
			bs_playlist_items.push({name: name, id: _this.data("id")})
		})
		currentsong = 0
		info={
			type:"320",
			id: bs_playlist_items[currentsong].id,
			name: bs_playlist_items[currentsong].name,
			callback: function(){
				currentsong++
				info.id = bs_playlist_items[currentsong].id
				info.name = bs_playlist_items[currentsong].name
				downloadSong(info)
			}
		}
		downloadSong(info)
		return false;
	})
	
}
function baihat(){
	$("#tabAdd").before('<a id="bsquochoai_downloadall_baihat_128" href="#" class="button-style-1 pull-left fn-tab" title="http://bsquochoai.ga - This button is created by Trần Quốc Hoài"><i class="zicon icon-download"></i><span style="color:red">Tải 128K</span></a>')
	$("#tabAdd").before('<a id="bsquochoai_downloadall_baihat_320" href="#" class="button-style-1 pull-left fn-tab" title="http://bsquochoai.ga - This button is created by Trần Quốc Hoài"><i class="zicon icon-download"></i><span style="color:red">Tải 320K</span></a>')
	
	$("#tabReport").remove()
	$("#bsquochoai_downloadall_baihat_128").click(function(){
		xmllink = $("#html5player").data("xml")
		xmlDoc=loadXMLDoc(xmllink);
		link=xmlDoc.getElementsByTagName('source')[0].textContent;
		name = $('meta[property="og:title"]').attr("content").split("|")[0].trim()+" - bsquochoai.ga 128K.mp3"
		chrome.runtime.sendMessage({ham: "downloadzingmp3", link: link, name: name})
		return false;
	})
	$("#bsquochoai_downloadall_baihat_320").click(function(){
		name = $('meta[property="og:title"]').attr("content").split("|")[0].trim()+" - bsquochoai.ga 320K.mp3"
		info={type:"320", id: $("#tabAdd").data("id"), name: name}
		downloadSong(info)
		return false;
	})
}
function downloadSong(info){ //info={type:"320", id:"songID", name: }
	$.ajax(
		{
			url: 'http://api.mp3.zing.vn/api/mobile/song/getsonginfo?requestdata={%22id%22:%22'+info.id+'%22}',
			success: function(re){
				console.log(re)
				chrome.runtime.sendMessage({ham: "downloadzingmp3", link: re.link_download[info.type].replace(/\/download\//, "/source/"), name: info.name})
				if ($.isFunction(info.callback)){info.callback()}
			}
		}
	)
}
function videoclip(){
	$("#confirmBox").on("click", ".bsquochoai_taivideo", function(evt){
		link = $(evt.target).data("download")
		name = $('meta[property="og:title"]').attr("content").split("|")[0].trim()+" - bsquochoai.ga VIDEO "+$(evt.target).data("quality")+"P.mp4"
		chrome.runtime.sendMessage({ham: "downloadzingmp3", link: link, name: name})
		return false;
	})
}
function loadXMLDoc(dname) {
if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET",dname,false);
xhttp.send();
return xhttp.responseXML;
}