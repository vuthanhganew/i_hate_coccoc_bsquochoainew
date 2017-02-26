var $s = "$$$" //Seperation to store in localStorage
//Lấy hết tất cả phim của toomva
$(".lv-body li").each(function(){
	$this = $(this)
	store =  {} //title+img+link
		store.title = $this.find("h4").find("a").attr("title")+" - "+$this.find("p").text().trim()
		store.img = $this.find(".lv-img").find("img").attr("src")
		store.link = "http://toomva.com"+$this.find(".lv-img").find("a").attr("href")
	add = ""
	$.each(store, function(k,v){
		add += $s+v
	})
	if (localStorage[store.link] != add){
		localStorage[store.link] = add
	}
})
//Every localStorage ajax lấy dữ liệu

//Lấy hết tất cả các đường dẫn và bỏ vào biến allLink
if (window.location.href.indexOf("bsquochoai=upload") != -1 ){allLink = []
	$.each(localStorage, function(keyurl,v){
		if (keyurl.indexOf("http://toomva.com/") == 0){ //Chỉ lấy nhưng key là link mà thôi
			allLink.push(keyurl)
		}
	})
	$i =  0 //current index in localStorage
	store = {}
	getInfoMp4()
	function getInfoMp4(){
		$.ajax({
			url: allLink[$i],
			success: function(re){
				if(allLink[$i] == undefined) {
					return false;
				}
				store.mp4 = $(re).find('#hidAltPath').val().replace(/\s/g, '')
				if (store.mp4 == ""){
					store.mp4 = $(re).find('#hidPath').val().replace(/\s/g, '')
				}
				store.mp4 = DecryptData(store.mp4)
				
				store.thumb = $(re).find('#hidThumbail').val().replace(/\s/g, '')
				if (store.thumb.indexOf("/") == 0) {
					store.thumb = "http://tomva.com"+store.thumb
				} else if (store.thumb.indexOf("http") == 0) {
					
				} else {
					store.thumb = DecryptData(store.thumb)
				}
				
				store.title = $(re).find('.sub-title-en').text().trim()
				if ($(re).find('.sub-title-vi').text().trim() != ""){
					store.title += " - " +$(re).find('.sub-title-vi').text().trim()
				}
				store.sub = {}
				
				store.sub.ev = $(re).find('#hidTotalSub').val().replace(/\s/g, '')
				store.sub.ev = DecryptData(store.sub.ev)
				
				store.sub.en = $(re).find('#hidEnSubFile').val().replace(/\s/g, '')
				store.sub.en = DecryptData(store.sub.en)
				
				store.sub.vn = $(re).find('#hidVnSubFile').val().replace(/\s/g, '')
				store.sub.vn = DecryptData(store.sub.vn)
				
				store.showmore = $(re).find('.content-w-showmore').find("p").text()
				$.each(store, function(k,v){
					if(v!= "" && k != "sub"){
						if ( v.indexOf("/") == 0 ) {
							store[v] = "http://toomva.com"+v
						}
					}
				})
				sendVideo = {}
						sendVideo.theloai = "baihat"
						sendVideo.name = store.title
						sendVideo.link = store.mp4
						sendVideo.matkhau = "bsquochoai.ga"
						
						sendVideo.subtitles = ""
						$.each(store.sub, function(k,sublink){
							if(sublink != ""){
								if( k == "ev") {title = "Anh-Việt"}
								if( k == "en") {title = "Tiếng Anh"}
								if( k == "vn") {title = "Tiếng Việt"}
								if (sendVideo.subtitles == ""){
									sendVideo.subtitles+= "http://toomva.com"+sublink+"?title="+title
								} else {
									sendVideo.subtitles+= ","+"http://toomva.com"+sublink+"?title="+title
								}
							}
						})
						
						sendVideo.poster = store.thumb
						
						sendVideo.mota = store.showmore
						if(sendVideo.mota.length < 17){
							sendVideo.mota += "                                    "
						}
						sendVideo.nguoidang = "Trần Quốc Hoài (new 2015)"
						sendVideo.nguoidangurl = "https://plus.google.com/+TrầnQuốcHoàiga"
						sendVideo.email = "bsquochoainew@gmail.com"
						
						sendVideoString = "themvideo" // Mặc định link baihat.caidat.main.serverBaihat()+ đã là ?action=
						$.each(sendVideo, function(k,v){
							sendVideoString += "&"+k+"="+encodeURIComponent(v)
						})
						$.ajax({
							url: 'https://script.google.com/macros/s/AKfycbyActYenCjhh9_TdkucidATpW2uQhiqdiM8bcuu0pO2fdWWBas/exec?action='+sendVideoString,
							dataType: "jsonp"
						}).success(function(re){
							$i = $i + 1
							getInfoMp4()
						}).error(function(re){
							$i = $i + 1
							getInfoMp4()
						})
						
						
						
				/* add = ""
				$.each(store, function(k,v){
					if(v.indexOf("/") == 0 && k != "sub"){
						v = "http://toomva.com"+v
					}
					add += $s+v
				})
				if (localStorage["ok_"+allLink[$i]] != add){
					localStorage["ok_"+allLink[$i]] = add
				} */
			}
		})
	}

}
/* $.ajax({
			url: keyurl,
			success: function(re){
				mp4 = $(re).find('#hidAltPath').val()
				mp4 = DecryptData(mp4)
				//localStorage["ok_"+keyurl] = dataadd
			}
		}) */
function DecryptData(encryptedData) {
        var decrypted =decodeBase64(encryptedData);
        return decrypted;
    };
function decodeBase64(s) {
  return window.atob(s);
};