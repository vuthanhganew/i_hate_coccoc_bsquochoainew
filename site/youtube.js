bsquochoaiyoutube = function(){
$("#eow-title").data("bsquochoai", "ok")
$(".ytp-title-link.yt-uix-sessionlink").data("bsquochoai", "ok")
//Tải xuống
$("#watch7-subscription-container").after('<span class="yt-uix-button-subscription-container bs-btn-taixuong" style="margin-left: 10px;"><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-subscribe-branded bs-download-btn yt-uix-button-has-icon no-icon-markup yt-uix-subscription-button yt-can-buffer yt-uix-tooltip" type="button" style="background-color: rgb(243, 183, 48);color: black;font-weight: bolder;; "   data-tooltip-text="Tất cả khả năng tải xuống của video này. Sau khi ấn xong, nếu không hiện link download, em hãy reload lại website để lấy lại link nhe." ><span class="yt-uix-button-content"><span class="subscribe-label" aria-label="Subscribec">Tải xuống</span><span class="subscribed-label" aria-label="Unsubscribe">Tải xuống</span><span class="unsubscribe-label" aria-label="Unsubscribe">Hủy tải xuống</span></span></button><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon yt-uix-subscription-preferences-button" type="button" onclick=";return false;" aria-label="Subscription preferences" aria-role="button" aria-live="polite" aria-busy="false"><span class="yt-uix-button-icon-wrapper"><span class="yt-uix-button-icon yt-uix-button-icon-subscription-preferences yt-sprite"></span></span></button><a class="yt-subscription-button-subscriber-count-branded-horizontal " title="Từ bsquochoai.ga" aria-label="138,046" tabindex="0" href="http://www.bsquochoai.ga/2015/08/huong-dan-cai-at-i-hate-coc-coc-tren_18.html" target="_blank">by bsquochoai.ga</a> <div class="yt-uix-overlay " data-overlay-style="primary" data-overlay-shape="tiny">  <div class="yt-dialog hid "> <div class="yt-dialog-base"> <span class="yt-dialog-align"></span> <div class="yt-dialog-fg" role="dialog"> <div class="yt-dialog-fg-content"> <div class="yt-dialog-loading"> <div class="yt-dialog-waiting-content"> <p class="yt-spinner "> <span title="Loading icon" class="yt-spinner-img  yt-sprite"></span>  <span class="yt-spinner-message"> Loading... </span> </p>  </div>  </div> <div class="yt-dialog-content"> <div class="subscription-preferences-overlay-content-container"> <div class="subscription-preferences-overlay-loading "> <p class="yt-spinner "> <span title="Loading icon" class="yt-spinner-img  yt-sprite"></span>  <span class="yt-spinner-message"> Loading... </span> </p>  </div> <div class="subscription-preferences-overlay-content"> </div> </div>  </div> <div class="yt-dialog-working"> <div class="yt-dialog-working-overlay"></div> <div class="yt-dialog-working-bubble"> <div class="yt-dialog-waiting-content"> <p class="yt-spinner "> <span title="Loading icon" class="yt-spinner-img  yt-sprite"></span>  <span class="yt-spinner-message"> Working... </span> </p>  </div> </div>  </div> </div> <div class="yt-dialog-focus-trap" tabindex="0"></div> </div> </div> </div>   </div>  </span> <style>.bs-download-btn:before { background: no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflVV84g4.webp) -8px -128px; background-size: auto; width: 16px; height: 12px; }</style>')
$(".bs-download-btn").off().click(function(){
	if($(this).attr("ok") == "1"){
		return false;
	} else {
		$(this).attr("ok", "1")
	}
	$('#action-panel-details').before('<div class="action-panel-content yt-uix-expander yt-uix-expander-collapsed yt-card yt-card-has-padding"> <div class="yt-uix-button-panel"> <div> <div > <div><strong class="watch-time-text">Ứng dụng tải nhanh video Youtube của <a  href="http://www.bsquochoai.ga/2015/08/huong-dan-cai-at-i-hate-coc-coc-tren_18.html" target="_blank">bsquochoai.ga</a></strong></div> <div class=""> <p id="bs-eow-description" style="margin-top: 10px;">Đang lấy dữ liệu... em hãy chờ trong giây lát.</p> </div> <div id="watch-description-extras" style="margin-top:16px"> <ul class="watch-extras-section"> <li class="watch-meta-item yt-uix-expander-body"> <h4 class="title"> Tác giả </h4> <ul class="content watch-info-tag-list"> <li><a href="http://bsquochoai.ga" class="yt-uix-sessionlink g-hovercard spf-link " target="_blank">Trần Quốc Hoài (bsquochoai) new</a></li> </ul> </li>  <li class="watch-meta-item yt-uix-expander-body"> <h4 class="title"> Trang chủ nhà thầy </h4> <ul class="content watch-info-tag-list"> <li><a href="http://bsquochoai.ga" class="yt-uix-sessionlink g-hovercard spf-link " target="_blank">Trang chủ</a></li> </ul> </li>  </ul> </div> </div> </div> </div> <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-expander yt-uix-expander-head yt-uix-expander-collapsed-body yt-uix-gen204" type="button" onclick=";return false;" data-gen204="feature=watch-show-more-metadata"><span class="yt-uix-button-content">Xem thêm thông tin tác giả</span></button> <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-expander yt-uix-expander-head yt-uix-expander-body" type="button" onclick=""><span class="yt-uix-button-content">Thu gọn lại</span></button> </div>')
	videoId = $('meta[itemprop="videoId"]').attr("content")
	$.ajax({
		url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22keepvid.com%2F%3Furl%3D"+encodeURIComponent(encodeURIComponent("https://www.youtube.com/watch?v="+videoId))+"%22%20and%20xpath%3D'%2F%2F*%5B%40id%3D%22dl%22%5D'&callback=",
		success: function(re){
			var addbuttondownload = function($thiss){
					filetype = ""
					text  = $thiss.text()
					if($thiss.text().toLowerCase().indexOf("mp4") !=-1) filetype = "mp4"
					else if($thiss.text().toLowerCase().indexOf("3gp") !=-1) filetype = "3gp"
					else if($thiss.text().toLowerCase().indexOf("flv") !=-1) filetype = "flv"
					else if($thiss.text().toLowerCase().indexOf("webm") !=-1) filetype = "webm"
					else if($thiss.text().toLowerCase().indexOf("m4a") !=-1) filetype = "m4a"
					else if($thiss.text().toLowerCase().indexOf("mp3") !=-1) return false;
					newstyle = ""
					if(filetype == "mp4"){
						newstyle = "background: rgb(204, 255, 164);border-color: blueviolet;"
					}
					videoquality = $this.next().text().replace("Video Only",  "<b>Chỉ VIDEO</b>, không âm thanh").replace("Audio Only",  "Chỉ </b>ÂM THANH</b>, không video")
					videosize = $this.next().next().text()
					if(videosize != "") videosize += "Mb"
					$("#bs-eow-description").append('<a data-href="'+$thiss.attr('href')+'" class="yt-uix-button yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default bs-btn-download-badao" data-upsell="upload" data-filetype="'+filetype+'" data-quality="'+videoquality.replace(/(\(.*\))/g, "").trim()+'" style="'+newstyle+'"><span class="yt-uix-button-content">.'+filetype+' '+videoquality+ ' '+videosize+'</span></a><br/>')
				}
			caclinkdownload = $(re).find(".l")
			$("#bs-eow-description").html("")
			caclinkdownload.each(function(){
				$this = $(this)
				addbuttondownload($this)
			})
			
			$(".bs-btn-download-badao").click(function(){
				chrome.runtime.sendMessage({ham: "downloadzingmp3", link: $(this).data("href"), name: $("#eow-title").text().trim()+" - "+$(this).data("quality")+" - bsquochoai.ga."+$(this).data("filetype")})
			})
			
		}
	})
	})

//Tự download
if(localStorage.tutaixuong == null){localStorage.tutaixuong ="0"}
$("#watch8-secondary-actions").prepend('<div class=" yt-uix-menu yt-uix-videoactionmenu  checkbox-on-off">  <span class="autoplay-hovercard yt-uix-hovercard"> <span class="autoplay-info-icon yt-uix-button-opacity yt-uix-hovercard-target yt-sprite" data-orientation="vertical" data-position="topright" data-card-timer="8585"></span> </span> <span class="yt-uix-checkbox-on-off "> <input id="bs-tutaixuong-checkbox" class="" type="checkbox"> <label for="bs-tutaixuong-checkbox" id="bs-tutaixuong-checkbox-label"> <span class="checked">&nbsp;</span> <span class="unchecked"></span> <span class="toggle">&nbsp;</span> </label> </span>  <label class="yt-uix-tooltip" for="bs-tutaixuong-checkbox" data-tooltip-text="Tự bắt link tải xuống mỗi lần vào một video mới" aria-labelledby="yt-uix-tooltip37-arialabel">Tự tải</label></div>')
$("#bs-tutaixuong-checkbox").change(function(){
	if($(this).is(':checked')){
		localStorage.tutaixuong = "1"
		$(".bs-download-btn").trigger("click")
	}
	else {
		localStorage.tutaixuong = "0"
	}
})
if(localStorage.tutaixuong == "1"){
	$("#bs-tutaixuong-checkbox").attr("checked","checked")
	$(".bs-download-btn").trigger("click")
}

//Tự tắt Annotation
if(localStorage.tutatannotation == null){localStorage.tutatannotation ="1"}
annotation = ".annotation-shape, .annotation"
$("#watch8-secondary-actions").prepend('<div class=" yt-uix-menu yt-uix-videoactionmenu  checkbox-on-off">  <span class="autoplay-hovercard yt-uix-hovercard"> <span class="autoplay-info-icon yt-uix-button-opacity yt-uix-hovercard-target yt-sprite" data-orientation="vertical" data-position="topright" data-card-timer="8585"></span> </span> <span class="yt-uix-checkbox-on-off "> <input id="bs-autoplay-checkbox" class="" type="checkbox"> <label for="bs-autoplay-checkbox" id="bs-autoplay-checkbox-label"> <span class="checked">&nbsp;</span> <span class="unchecked"></span> <span class="toggle">&nbsp;</span> </label> </span>  <label class="yt-uix-tooltip" for="bs-autoplay-checkbox" data-tooltip-text="Tự tắt Annotations (các quảng cáo trong video của người đăng)" aria-labelledby="yt-uix-tooltip37-arialabel" title="Tự tắt Annotations (các quảng cáo của người đăng video)">Tắt Annot..</label></div>')
$("#bs-autoplay-checkbox").change(function(){
	if($(this).is(':checked')){
		localStorage.tutatannotation = "1"
		$("body").append('<style>'+annotation+'{visibility: hidden;}</style>')
	}
	else {
		localStorage.tutatannotation = "0"
		$("body").append('<style>'+annotation+'{visibility:visible}</style>')
	}
})
if(localStorage.tutatannotation == "1"){
	$("#bs-autoplay-checkbox").attr("checked","checked")
	$("body").append('<style>'+annotation+'{visibility: hidden;}</style>')
}
/*
//Tự chơi lại khi hết video
if(localStorage.tuchoilai == null){localStorage.tuchoilai ="1"}
$("#watch8-secondary-actions").prepend('<div class=" yt-uix-menu yt-uix-videoactionmenu  checkbox-on-off">  <span class="autoplay-hovercard yt-uix-hovercard"> <span class="autoplay-info-icon yt-uix-button-opacity yt-uix-hovercard-target yt-sprite" data-orientation="vertical" data-position="topright" data-card-timer="8585"></span> </span> <span class="yt-uix-checkbox-on-off "> <input id="bs-tuchoilai-checkbox" class="" type="checkbox"> <label for="bs-tuchoilai-checkbox" id="bs-tuchoilai-checkbox-label"> <span class="checked">&nbsp;</span> <span class="unchecked"></span> <span class="toggle">&nbsp;</span> </label> </span>  <label class="yt-uix-tooltip" for="bs-tuchoilai-checkbox" data-tooltip-text="Tự chơi lại video khi hết giờ (thích hợp nghe nhạc trên youtube)" aria-labelledby="yt-uix-tooltip37-arialabel">Chơi lại</label></div>')
$("#bs-tuchoilai-checkbox").change(function(){
	if($(this).is(':checked')){
		localStorage.tuchoilai = "1"
	}
	else {
		localStorage.tuchoilai = "0"
	}
})
if(localStorage.tuchoilai == "1"){
	$("#bs-tuchoilai-checkbox").attr("checked","checked")
}
setInterval( function(){
	if ( $(".videoAdUiSkipButton").length >= 1 ){
		$(".videoAdUiSkipButton").trigger("click")
	}
	if(localStorage.tuchoilai == "1"){
		if($(".ytp-play-button").attr("title") == "Replay"){
			$(".ytp-play-button").trigger("click")
		}
	}
}, 500)
*/
/*
// Tính năng: khởi động và chơi tại một vị trí xác định tính bằng giây
	if(localStorage.starttime == null){localStorage.starttime ="0"}
	$(".bs-btn-taixuong").after('<span class="share-panel-start-at-container" id="bs_tuchoituthoigian"> <label> <span class="yt-uix-form-input-checkbox-container"> <input class="share-panel-start-at"  id="bs-start-time-checkbox" type="checkbox"> <span class="yt-uix-form-input-checkbox-element"></span> </span> Tự chơi từ giây thứ: </label> <input type="text" value="0" title="Ví dụ 1 phút là 60 giây, 1 phút 30 giây là 90 giây" class="yt-uix-form-input-text share-panel-start-at-time" id="bs-start-time-value"> </span>')
	$("#bs-start-time-checkbox").change(function(){
		if($(this).is(':checked')){
			localStorage.starttime = "1"
		}
		else {
			localStorage.starttime = "0"
		}
	})
	$("#bs-start-time-value").change(function(){
		localStorage.starttimeValue = $(this).val()
	})
			//Mặc định
	if(localStorage.starttime == "1"){
		$("#bs-start-time-checkbox").attr("checked","checked")
	}
	if(localStorage.starttimeValue != "0"){
		$("#bs-start-time-value").val(localStorage.starttimeValue)
	}
			//Chạy đặc biệt
	if(localStorage.starttime == "1" && localStorage.starttimeValue != "0"){
		injectScript(chrome.extension.getURL('site/inSite/youtube/change_player_time.js'), 'body')
	}
*/
//Tính năng: mặc định tốc độ chơi video
	$("#bs_tocdomacdinh").off().remove()
	bs_speed_menu='<span class="share-panel-start-at-container"> <label> <span class="yt-uix-form-input-checkbox-container"></span> Tốc độ mặc định: </label>  <span class="yt-uix-form-input-select"><span class="yt-uix-form-input-select-content"><span class="yt-uix-form-input-select-arrow yt-sprite"></span><span class="yt-uix-form-input-select-value">Tốc độ</span></span> <select class="yt-uix-form-input-select-element options-renderer-type-select-input"  id="bs_tocdomacdinh"> <option value="0.25"> 0.25 </option> <option value="0.5"> 0.5 </option> <option value="normal"> 0 (bình thường) </option> <option value="1.25"> 1.25 </option> <option value="1.5"> 1.5 </option> <option value="2"> 2 </option>  </select> </span> </span> '
	$(".bs-btn-taixuong").after(bs_speed_menu)
	if(localStorage.bs_default_speed == undefined){
		localStorage.bs_default_speed="normal"
	}
	$("#bs_tocdomacdinh").val(localStorage.bs_default_speed)
	$("#bs_tocdomacdinh").change(function(){
		localStorage.bs_default_speed = $(this).val()
		player_setspeed()
	})
	player_setspeed()
	
}

bsquochoaiyoutube()

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
function player_setspeed(){
	$(".ytp-settings-button").trigger("click")

	$(".ytp-settings-menu .ytp-menuitem-label").each(function(){
		bs_menu_label = $(this).text().trim().toLowerCase()
		if(bs_menu_label == "speed"){
			$(this).trigger("click")
		}
	})
	$(".ytp-menuitem-label").each(function(){
		bs_menu_label = $(this).text().trim().toLowerCase()
		if(bs_menu_label == localStorage.bs_default_speed){
			$(this).trigger("click")
			$(".ytp-settings-button").trigger("click")
		}
	})
}
setInterval(function(){
	if(($("#eow-title").data("bsquochoai") != "ok" || $(".ytp-title-link.yt-uix-sessionlink").data("bsquochoai")!="ok") && window.location.href.indexOf("watch?v=") > -1){
		bsquochoaiyoutube()
	}
},2000)
