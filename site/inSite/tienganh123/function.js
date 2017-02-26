var required = "<font color='red'>Chưa trả lời !</font>";
var error = "<font color='red'> Sai rồi!</font>";
var dk = 0;
var play_audio_times = 0;
var hien_dich_times = 0;
var iframe_id = 1;
var vip_only_audio = "http://data.tienganh123.com/file/dungchung/vip_only_audio.mp3";
var goldenkids_only_audio = "http://data.tienganh123.com/file/dungchung/goldenkids_only_audio.mp3";
var uagent = navigator.userAgent.toLowerCase();
var arrMobi = new Array('midp', 'j2me', 'avantg', 'ipad', 'iphone', 'docomo', 'novarra', 'palmos', 'palmsource', '240x320', 'opwv', 'chtml', 'pda', 'windows ce', 'mmp/', 'mib/', 'symbian', 'wireless', 'nokia', 'hand', 'mobi', 'phone', 'cdm', 'up.b', 'audio', 'sie-', 'sec-', 'samsung', 'htc', 'mot-', 'mitsu', 'sagem', 'sony', 'alcatel', 'lg', 'erics', 'vx', 'nec', 'philips', 'mmm', 'xx', 'panasonic', 'sharp', 'wap', 'sch', 'rover', 'pocket', 'benq', 'java', 'pt', 'pg', 'vox', 'amoi', 'bird', 'compal', 'kg', 'voda', 'sany', 'kdd', 'dbt', 'sendo', 'sgh', 'gradi', 'jb', 'dddi', 'moto', 'opera mobi', 'opera mini', 'android');
var isMobile = false;
for (i = 0; i < arrMobi.length; i++) {
	if (uagent.indexOf(arrMobi[i]) != -1) {
		isMobile = true;
		break
	}
}
$(function(){
	$("body").append("<div id='goldenkids_member'></div>")
})
function check_show(n, answer, action) {
	var boxes = [],
	result = [];
	var complete = true;
	for (var i = 0; i < answer.length; i++) {
		var id_1 = "t" + n + "_" + (i + 1);
		var id_2 = "r" + n + "_" + (i + 1);
		boxes[i] = removespace(document.getElementById(id_1).value);
		result[i] = document.getElementById(id_2);
		if ((boxes[i] == "") || (boxes[i] == "...")) {
			result[i].innerHTML = required;
			complete = false
		}
	}
	if (action == "show") {
		for (i = 0; i < answer.length; i++) {
			result[i].innerHTML = "<font color='blue'>" + answer[i] + "</font>"
		}
		return
	}
	if (complete) {
		var ok = true;
		for (i = 0; i < answer.length; i++) {
			if (boxes[i] != answer[i]) {
				result[i].innerHTML = error;
				ok = false
			}
		}
		if (ok) {
			for (i = 0; i < answer.length; i++) {
				result[i].innerHTML = "<font color='FF00FF' >Perfect! </font>"
			}
		} else {
			var show = document.getElementById("show" + n);
			show.disabled = false
		}
	}
}
function removespace(s) {
	s = s.replace(/^\s*|\s*$/g, '');
	if (s == "") {
		return s
	}
	var t = s.split(" ");
	var r = t[0];
	var i = 1;
	while (i < t.length) {
		if (t[i] != "") {
			r = r + " " + t[i]
		}
		i++
	}
	return r
}
var _a = "";
for (var _i = 0; _i < 3; _i++) {
	_a = _a + (_i + 1)
}
_a = _a + ".";
var _a_n = "n";
_a = "tie" + _a_n + "ga" + _a_n + "h" + _a + "com";
var _cham_a = "." + _a;
var _w = "w";
var _w_a = "http://" + _w + _w + _w + "." + _a;
_a = "http://" + _a;
try {
	var _l = top.location.href;
	if ((_l.toLowerCase().indexOf(_a) >= 0) || (_l.toLowerCase().indexOf(_w_a) >= 0) || (_l.toLowerCase().indexOf(_cham_a) >= 0)) {} else {
		top.location.href = _w_a
	}
} catch(error) {}
var _parent;
try {
	_parent = window.opener.location.href;
	if ((_parent.toLowerCase().indexOf(_a) >= 0) || (_parent.toLowerCase().indexOf(_w_a) >= 0) || (_parent.toLowerCase().indexOf(_cham_a) >= 0)) {} else {
		top.location.href = _w_a
	}
} catch(error) {}
function show_msg(i) {
	if (i == null) {
		var msg = document.getElementById("show_mes");
		var trans = document.getElementById("translate");
		if (dk == 0) {
			msg.innerHTML = "<font color='#EE7600'>Thầy đã dịch được, em hãy đưa chuột vào các câu tiếng Anh để xem.</font>";
			trans.innerHTML = '<input type="button" id="translate_button" onclick="show_msg()" value="Dích đồng" class="stt_translate" />';
			dk = 1
		} else {
			msg.innerHTML = "<font color='#EE7600'>Đã dích đồng thành công :)).</font>";
			trans.innerHTML = '<input type="button" id="translate_button" onclick="show_msg()" value="Xém bài dịch"  class="stt_translate"/>';
			dk = 0
		}
	} else {
		var msg = document.getElementById("show_mes_" + i);
		var trans = document.getElementById("translate_" + i);
		if (dk == 0) {
			msg.innerHTML = "<font color='#EE7600'>Bài học đã được dịch, em hãy đưa chuột vào các câu tiếng Anh để xem.</font>";
			trans.innerHTML = '<input type="button" id="translate_button_' + i + '" onclick="show_msg(' + i + ')" value="Dích đồng"  class="stt_translate"/>';
			dk = 1
		} else {
			msg.innerHTML = "<font color='#EE7600'>Đã dích đồng thành công :)).</font>";
			trans.innerHTML = '<input type="button" id="translate_button_' + i + ' " onclick="show_msg(' + i + ')" value="Xém bài dịch"  class="stt_translate"/>';
			dk = 0
		}
	}
}
var hiendich = {};
hiendich.tickerwidth = '320';
hiendich.tickerheight = '100';
hiendich.tickerpadding = 5;
hiendich.borderwidth = 0;
hiendich.fnt = "Verdana";
hiendich.fntsize = 10;
hiendich.fntsizelastletter = 10;
hiendich.fntcolor = "#880000";
hiendich.fntcolorlastletter = "#880000";
hiendich.fntweight = 3;
hiendich.backgroundcolor = "#EAFFEE";
hiendich.standstill = 2000;
hiendich.speed = 0;
hiendich.xdistance = 10;
hiendich.ydistance = 30;
hiendich.timer = 0;
hiendich.topposition = 0;
hiendich.leftposition = 0;
hiendich.x = 20;
hiendich.y = 20;
hiendich.i_substring = 0;
hiendich.i_presubstring = 0;
hiendich.i_message = 0;
hiendich.message = "";
hiendich.messagepresubstring = "";
hiendich.messageaftersubstring = "";
hiendich.fntweight = hiendich.fntweight * 100;
hiendich.old_bgColor = "white";
hiendich.new_bgColor = "yellow";
function getmessagebackground() {
	var messagebackground = "<table border=" + hiendich.borderwidth + " cellspacing=0 cellpadding=0><tr><td valign=top bgcolor=#" + hiendich.backgroundcolor + ">";
	messagebackground += "&nbsp;</td></tr></table>";
	return messagebackground
}
function getmessagecontent() {
	var messagecontent = "<table border=0 cellspacing=0 cellpadding=" + hiendich.tickerpadding + " width=" + hiendich.tickerwidth + " ><tr><td valign=top>";
	messagecontent += "<span style='position:relative; font-family:" + hiendich.fnt + ";color:" + hiendich.fntcolor + ";font-size:" + hiendich.fntsize + "pt;font-weight:" + hiendich.fntweight + "'>";
	messagecontent += "<font color='" + hiendich.fntcolor + "'>";
	messagecontent += hiendich.messagepresubstring;
	messagecontent += "</font>";
	messagecontent += "</span>";
	messagecontent += "</td></tr></table>";
	return messagecontent
}
function showticker() {
	var ticker = document.getElementById("ticker");
	var tickerbg = document.getElementById("tickerbg");
	hiendich.messagepresubstring = hiendich.message;
	ticker.innerHTML = getmessagecontent()
}
function hideticker(element, cur) {
	clearTimeout(hiendich.timer);
	hiendich.i_substring = 0;
	hiendich.i_presubstring = 0;
	var ticker = document.getElementById("ticker");
	var tickerbg = document.getElementById("tickerbg");
	ticker.style.visibility = "hidden";
	tickerbg.style.visibility = "hidden";
	element.style.backgroundColor = hiendich.old_bgColor;
	element.style.cursor = "default";
	if (cur != null) {
		element.style.cursor = cur
	}
}
function paidpage() {
	var a = document.getElementById("paid_page");
	if (a != null) {
		return true
	} else {
		return false
	}
}
function paidmember() {
	return true
}
function show_download() {
	var non_vip = '<span onclick="popup(\'http://data.tienganh123.com/file/dungchung/download_vip.htm\')"  onmouseout=hideticker(this) onMouseOver="showmessage_danhngon(\'Tải video, audio, hay lời dịch về máy - Chỉ dành cho thành viên VIP\',this)"><img src="http://data.tienganh123.com/file/dungchung/download.jpg" border=0 /> </span>';
	var link_dl = document.getElementById("link_dl");
	if (link_dl != null) {
		var download_txt = "Download file";
		link_dl_text = link_dl.innerHTML;
		var icon_downd = 'vd_ico1';
		if (link_dl_text.indexOf('.pdf') > 0) {
			download_txt = "Download PDF";
			icon_downd = 'vd_ico3'
		}
		if (link_dl_text.indexOf('.mp3') > 0) {
			download_txt = "Download MP3";
			icon_downd = 'vd_ico2'
		}
		if (link_dl_text.indexOf('.wma') > 0) {
			download_txt = "Download video"
		}
		non_vip = '<a href="" onclick="popup(\'http://data.tienganh123.com/file/dungchung/download_vip.htm\')" onmouseout=hideticker(this) onMouseOver="showmessage_danhngon(\'Tải video, audio hay lời dịch về máy - Chỉ dành cho thành viên VIP\',this)"><div class="vd_dl_icon">' + download_txt + '<div class="vd_ico_dl ' + icon_downd + '" style="left:-60px"></div></div></a>';
		vip = '<a href="' + link_dl_text + '" target=_blank><div class="vd_dl_icon">' + download_txt + '<div class="vd_ico_dl ' + icon_downd + '" style="left:-60px"></div></div></a>';
		link_dl.innerHTML = vip
	}
}
function show_button_download() {
	if ($('#download_1').length == 1) {
		var i = 1;
		var str_re = '<div class="vd_download_name">DOWNLOAD BÀI HỌC NÀY :</div>';
		var non_vip = '';
		var vip = '';
		var text = '';
		var arr_link = [];
		var icon_downd = 'vd_ico1';
		$("span:contains(Download)").hide();
		$('#download_1').after('<div class="vdc_download"></div>');
		while ($('#download_' + i).length == 1) {
			text = $('#download_' + i).text();
			arr_link = text.split("|");
			if (arr_link[0].indexOf('MP3') >= 0 || arr_link[0].indexOf('mp3') >= 0) {
				icon_downd = 'vd_ico2'
			}
			if (arr_link[1].indexOf('PDF') >= 0 || arr_link[1].indexOf('pdf') >= 0) {
				icon_downd = 'vd_ico3'
			}
			non_vip += '<a href="" onclick="popup(\'http://data.tienganh123.com/file/dungchung/download_vip.htm\')" onmouseout=hideticker(this) onMouseOver="showmessage_danhngon(\'Tải video, audio, hay lời dịch về máy - Chỉ dành cho thành viên VIP\',this)"><div class="vd_dl_icon">' + arr_link[0] + '<div class="vd_ico_dl ' + icon_downd + '"></div></div></a>';
			vip += '<a href="' + arr_link[1] + '" target=_blank><div class="vd_dl_icon">' + arr_link[0] + '<div class="vd_ico_dl ' + icon_downd + '"></div></div></a>';
			$('#download_' + i).remove();
			i++
		}
		str_re += vip
		if ($('.vd_download').length == 1) {
			$('.vd_download').html(str_re)
		} else {
			$('.vdc_download').html(str_re)
		}
	}
}
function hideGiaiTrichVIP() {
	var i = 1;
	do {
		giaithich_vip = document.getElementById("giaithich_vip_" + i);
		if (giaithich_vip == null) {
			return
		}
		i = i + 1
	} while (true)
}
function showAds_Datthe() {
	dathe = document.getElementById("dat-the");
	if (dathe == null) {
		return
	}
	var randomnumber = Math.floor(Math.random() * 2);
	var banner = [];
	banner[0] = "http://www.tienganh123.com/vip_banner.swf";
	banner[1] = "http://www.tienganh123.com/goldenkids_banner.swf";
	var dathe_html = '';
	dathe_html += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="400" height="80" id="niftyPlayer1" align="">';
	dathe_html += '<param name=movie value="' + banner[randomnumber] + '">';
	dathe_html += '<param name=quality value=high>';
	dathe_html += '<param name=wmode value=opaque>';
	dathe_html += '<param name=bgcolor value=#FFFFFF>';
	dathe_html += '<embed src="' + banner[randomnumber] + '" quality=high bgcolor=#FFFFFF wmode="opaque" width="400" height="80" name="niftyPlayer1" align="" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">';
	dathe_html += '</embed></object>';
	dathe_html += '<br/><center>Tư vấn và đặt thẻ qua điện thoại: 0473053868 (8h-21h)</center>';
	dathe.innerHTML = ""
}
function hideNonPaidMember() {
}
function showmessage_danhngon(linkmessage, element, showed) {
	if (linkmessage.length <= 30) {
		hiendich.tickerwidth = 8 * linkmessage.length + 10;
		hiendich.tickerheight = 30
	} else {
		hiendich.tickerwidth = 240;
		hiendich.tickerheight = (((linkmessage.length / 30) + 2) * 20)
	}
	var messagebackgroud = getmessagebackground();
	hiendich.message = linkmessage;
	hiendich.i_substring = 0;
	hiendich.i_presubstring = 0;
	hiendich.leftposition = hiendich.x + hiendich.xdistance;
	hiendich.topposition = hiendich.y + hiendich.ydistance - 303;
	if (navigator.appVersion.indexOf("MSIE 10.0") >= 0) {
		hiendich.x = hiendich.x - 50;
		hiendich.y = hiendich.y + 5;
		hiendich.leftposition = hiendich.x + hiendich.xdistance + "px";
		hiendich.topposition = hiendich.y + hiendich.ydistance + "px"
	}
	var ticker = document.getElementById("ticker");
	var tickerbg = document.getElementById("tickerbg");
	if ((navigator.appName == "Netscape") || (navigator.appVersion.indexOf("MSIE 9.0") > 1) || (navigator.appName == "Opera")) {
		hiendich.leftposition = hiendich.leftposition + "px";
		hiendich.topposition = hiendich.topposition + "px"
	}
	ticker.style.left = hiendich.leftposition;
	ticker.style.top = hiendich.topposition;
	ticker.style.width = hiendich.tickerwidth;
	ticker.style.visibility = "visible";
	showticker();
	hiendich.old_bgColor = element.style.backgroundColor;
	element.style.backgroundColor = hiendich.new_bgColor;
	element.style.cursor = "pointer"
}
function showmessage(linkmessage, element, showed) {
	if (dk == 1) {
		hien_dich_times += 1;
		if (paidpage() && (!paidmember())) {
			if (hien_dich_times >= 999999999999999) {
				linkmessage = 'Bạn phải là  <a href="http://www.tienganh123.com/huong-dan/214-quyen-loi-thanh-vien-vip-cua-tienganh123.html" target="_blank" title="Quyền lợi thành viên VIP"  style="color:#0d6af7; text-decoration:underline">thành viên VIP của TiếngAnh123.Com</a> mới có thể xem được lời dịch hiện ở đây.'
			}
		}
		if (linkmessage.length <= 30) {
			hiendich.tickerwidth = 8 * linkmessage.length + 10;
			hiendich.tickerheight = 30
		} else {
			hiendich.tickerwidth = 240;
			hiendich.tickerheight = (((linkmessage.length / 30) + 2) * 20)
		}
		var messagebackgroud = getmessagebackground();
		hiendich.message = linkmessage;
		hiendich.i_substring = 0;
		hiendich.i_presubstring = 0;
		hiendich.leftposition = hiendich.x + hiendich.xdistance;
		hiendich.topposition = hiendich.y + hiendich.ydistance - 300;
		if (navigator.appVersion.indexOf("MSIE 10.0") >= 0) {
			hiendich.x = hiendich.x - 50;
			hiendich.y = hiendich.y + 5;
			hiendich.leftposition = hiendich.x + hiendich.xdistance + "px";
			hiendich.topposition = hiendich.y + hiendich.ydistance + "px"
		}
		var ticker = document.getElementById("ticker");
		var tickerbg = document.getElementById("tickerbg");
		if ((navigator.appName == "Netscape") || (navigator.appVersion.indexOf("MSIE 9.0") > 1) || (navigator.appName == "Opera")) {
			hiendich.leftposition = hiendich.leftposition + "px";
			hiendich.topposition = hiendich.topposition + "px"
		}
		if (isMobile) {
			ticker.style.visibility = "hidden";
			tickerbg.style.visibility = "hidden";
			hiendich.old_bgColor = "#fff";
			element.style.backgroundColor = "#fff"
		} else {
			ticker.style.left = hiendich.leftposition;
			ticker.style.top = hiendich.topposition;
			ticker.style.width = hiendich.tickerwidth;
			ticker.style.visibility = "visible";
			hiendich.old_bgColor = element.style.backgroundColor;
			element.style.backgroundColor = hiendich.new_bgColor;
			element.style.cursor = "pointer"
		}
		showticker()
	}
}
function handlerMM(e) {
	var scrollX, scrollY;
	if ((navigator.appName == "Netscape") || (navigator.appName == "Opera")) {
		hiendich.x = window.pageXOffset + e.clientX;
		hiendich.y = window.pageYOffset + e.clientY
	} else {
		if (document.documentElement && document.documentElement.scrollTop) {
			scrollX = document.documentElement.scrollLeft;
			scrollY = document.documentElement.scrollTop
		} else {
			scrollX = document.body.scrollLeft;
			scrollY = document.body.scrollTop
		}
		hiendich.x = scrollX + event.clientX;
		hiendich.y = scrollY + event.clientY
	}
}
document.onmousemove = handlerMM;
function checkVIPaudioLink(audiolink) {
	play_audio_times += 1;
	if (paidpage()) {
		if (play_audio_times >= 999999999999999) {
			if (!paidmember()) {
				return vip_only_audio
			}
		}
	}
	return audiolink
}
function playAudio(audiolink, notDisplay) {
	audiolink = checkVIPaudioLink(audiolink);
	var x = hiendich.x + 85;
	var y = hiendich.y + 35;
	var audio_div = document.getElementById("playaudio");
	if ((navigator.appName == "Netscape") || (navigator.appVersion.indexOf("MSIE 9.0") > 1) || (navigator.appName == "Opera")) {
		x = x + "px";
		y = y + "px"
	}
	if (typeof(notDisplay) == 'undefined') {
		audio_div.style.left = x;
		audio_div.style.top = y
	}
	var id_playaudio = "mp3player" + play_audio_times;
	audio_div.innerHTML = '<div style="width: 165px; height: 20px; background-color: #FF9966;" > <span onclick="stopAudio();" style="cursor:pointer"><img src="/icon/wrong.png" />  Close </span></div>';
	audio_div.innerHTML += "<div id='" + id_playaudio + "'>Audio</div>";
	audio_div.style.visibility = "visible";
	jwplayer(id_playaudio).setup({
		'flashplayer': 'http://www.tienganh123.com/jwplayer/player.swf',
		'file': audiolink,
		'autostart': 'true',
		'controlbar': 'bottom',
		'width': '165',
		'height': '24'
	})
}
function stopAudio() {
	var audio_div = document.getElementById("playaudio");
	audio_div.innerHTML = ""
}
function changecss_2(theClass, element, value) {
	var cssRules;
	var crossrule;
	var added = false;
	for (var S = 0; S < document.styleSheets.length; S++) {
		try {
			if (document.styleSheets[S].cssRules) {
				crossrule = document.styleSheets[S].cssRules
			} else if (document.styleSheets[S].rules) {
				crossrule = document.styleSheets[S].rules
			}
			for (var R = 0; R < crossrule.length; R++) {
				if (crossrule[R].selectorText == theClass) {
					if (crossrule[R].style[element]) {
						crossrule[R].style[element] = value;
						added = true;
						break
					}
				}
			}
		} catch(Exception) {}
	}
	if (!added) {
		if (document.styleSheets[S].insertRule) {
			document.styleSheets[S].insertRule(theClass + ' { ' + element + ': ' + value + '; }', document.styleSheets[S][cssRules].length)
		} else if (document.styleSheets[S].addRule) {
			document.styleSheets[S].addRule(theClass, element + ': ' + value + ';')
		}
	}
}
function show_text() {
	var st = document.getElementById("show_text");
	changecss_2('.answer', 'display', 'block');
	st.innerHTML = '<input type="button" id="xem_text" onclick="hide_text()" value="Giấu bài text" />'
}
function hide_text() {
	changecss_2('.answer', 'display', 'none');
	var st = document.getElementById("show_text");
	st.innerHTML = '<input type="button" id="xem_text" onclick="show_text()" value="Xem bài text" />'
}
function xem_text(i) {
	var st = document.getElementById("show_text_" + i);
	changecss_2('.hidden_' + i, 'display', 'block');
	var html = '<input type="button" id="button_hidden_text_' + i + '" onclick="an_text(' + i + ')" value="Ẩn" />';
	st.innerHTML = html
}
function an_text(i) {
	changecss_2('.hidden_' + i, 'display', 'none');
	var st = document.getElementById("show_text_" + i);
	var html = '<input type="button" id="button_hidden_text_' + i + '" onclick="xem_text(' + i + ')" value="Xem" />';
	st.innerHTML = html
}
function xem_text_kids(i) {
	changecss_2('.hidden_' + i, 'display', 'block')
}
function xemdich(i) {
	var msg = document.getElementById("thongbao_" + i);
	var trans = document.getElementById("xemdich_" + i);
	if (dk == 0) {
		msg.innerHTML = "<font color='#FF0000'>Bài học đã được dịch, bạn hãy đưa chuột vào bài text để xem.</font>";
		trans.innerHTML = '<input type="button" id="xemdich_button_' + i + '" onclick="xemdich(' + i + ')" value="Đóng bài dịch" />';
		dk = 1
	} else {
		msg.innerHTML = "<font color='#FF0000'>Đã đóng bài dịch.</font>";
		trans.innerHTML = '<input type="button" id="xemdich_button_' + i + '" onclick="xemdich(' + i + ')" value="Xem bài dịch" />';
		dk = 0
	}
}
function popup(url) {
	var newwindow;
	newwindow = window.open(url, 'name', 'resizable=1, scrollbars=1, height=600,width=600,left=200');
	if (window.focus) {
		newwindow.focus()
	}
}
function hiendientu() {
	var st = document.getElementById("divdientu");
	changecss_2('.loibh_dich', 'display', 'none');
	changecss_2('.loibh_dientu', 'display', 'block');
	var html = '<input type="button" onclick="andientu();" value="Hiện lời bài hát" />';
	st.innerHTML = html
}
function andientu() {
	changecss_2('.loibh_dientu', 'display', 'none');
	changecss_2('.loibh_dich', 'display', 'block');
	var st = document.getElementById("divdientu");
	var html = '<input type="button" onclick="hiendientu();" value="Làm bài test điền từ" />';
	st.innerHTML = html
}
function removeSpaces(str) {
	return str.split(' ').join('')
}
function check() {
	var n_giau = giau.length;
	var correct_answer = 0;
	var slot = 0;
	for (var i = 0; i < n_giau; i++) {
		if (giau[i] != "") {
			var id = "answer" + i;
			var div = document.getElementById(id);
			if (div == null) {
				break
			}
			slot++;
			var answer = removeSpaces(div.value);
			var dapan = removeSpaces(giau[i]);
			if (dapan.toLowerCase() == answer.toLowerCase()) {
				div.style.color = '#0000FF';
				div.disabled = true;
				correct_answer += 1
			} else {
				div.style.color = '#FF0000'
			}
		}
	}
	alert("Bạn đã làm đúng " + correct_answer + "/" + slot + " câu!")
}
function get_swf_content(id, movie, width, height) {
	var code = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + width + '" height="' + height + '" ID="sf' + id + '" VIEWASTEXT>';
	code += '  <param name="movie" value="' + movie + '" />';
	code += '  <param name="quality" value="high" />';
	code += '  <param name="wmode" value="opaque" />';
	code += '  <param name="allowScriptAccess" value="always" />';
	code += '  <param name="allowFullScreen" value="true" />';
	code += '  <embed src="' + movie + '" quality="high" name="sf' + id + '" allowScriptAccess="always" allowFullScreen="true" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '" />';
	code += '</object>';
	return code
}
function writeSwf(id, movie, width, height) {
	document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + width + '" height="' + height + '" ID="sf' + id + '" VIEWASTEXT>');
	document.write('  <param name="movie" value="' + movie + '" />');
	document.write('  <param name="quality" value="high" />');
	document.write('  <param name="wmode" value="opaque" />');
	document.write('  <param name="wmode" value="window" />');
	document.write('  <param name="allowScriptAccess" value="always" />');
	document.write('  <param name="allowFullScreen" value="true" />');
	document.write('  <embed src="' + movie + '" quality="high" name="sf' + id + '" allowScriptAccess="always" allowFullScreen="true" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '" />');
	document.write('</object>')
}
function writeSwfVIP(id, movie, width, height) {
		writeSwf(id, movie + "_VIP.swf", width, height)
}
function writeTestVocabSWF(xmlfile) {
	document.write('<embed src="/file/dungchung/preloader4eng123.swf" quality="high" bgcolor="#ffffff" height="400" width="550" name="game_as3" flashVars="myFlashVar=' + xmlfile + '&&myFlashVar2=/file/dungchung/game_ochu2.swf"></embed>')
}
function writeTestVocab(xml) {
	writeTestVocabSWF(xml + ".xml")
}
function showmessage_goldenkids(linkmessage, element, showed) {
	if (dk == 1) {
		if (linkmessage.length <= 30) {
			hiendich.tickerwidth = 8 * linkmessage.length + 10;
			hiendich.tickerheight = 30
		} else {
			hiendich.tickerwidth = 240;
			hiendich.tickerheight = (((linkmessage.length / 30) + 2) * 20)
		}
		var messagebackgroud = getmessagebackground();
		hiendich.message = linkmessage;
		hiendich.i_substring = 0;
		hiendich.i_presubstring = 0;
		hiendich.leftposition = hiendich.x + hiendich.xdistance;
		hiendich.topposition = hiendich.y + hiendich.ydistance - 303;
		if (navigator.appVersion.indexOf("MSIE 10.0") >= 0) {
			hiendich.x = hiendich.x - 50;
			hiendich.y = hiendich.y + 5;
			hiendich.leftposition = hiendich.x + hiendich.xdistance + "px";
			hiendich.topposition = hiendich.y + hiendich.ydistance + "px"
		}
		var ticker = document.getElementById("ticker");
		var tickerbg = document.getElementById("tickerbg");
		if ((navigator.appName == "Netscape") || (navigator.appVersion.indexOf("MSIE 9.0") > 1) || (navigator.appName == "Opera")) {
			hiendich.leftposition = hiendich.leftposition + "px";
			hiendich.topposition = hiendich.topposition + "px"
		}
		if (isMobile) {
			ticker.style.visibility = "hidden";
			tickerbg.style.visibility = "hidden";
			hiendich.old_bgColor = "#fff";
			element.style.backgroundColor = "#fff"
		} else {
			ticker.style.left = hiendich.leftposition;
			ticker.style.top = hiendich.topposition;
			ticker.style.width = hiendich.tickerwidth;
			ticker.style.visibility = "visible";
			hiendich.old_bgColor = element.style.backgroundColor;
			element.style.backgroundColor = hiendich.new_bgColor;
			element.style.cursor = "pointer"
		}
		showticker()
	}
}
function goldenkids_page() {
	var goldenkids_id = document.getElementById("goldenkids_page");
	if (goldenkids_id != null) {
		return true
	} else {
		return false
	}
}
function goldenkids_member() {
	return true
}
function lesson_child() {
	var check_lesson_child = document.getElementById("check_lesson_child");
	if (check_lesson_child != null) {
		return true
	} else {
		return false
	}
}
function checkGOLDENKIDSaudioLink(audiolink) {
	return audiolink
}
function playAudio_goldenkids(audiolink, notDisplay) {
	audiolink = checkGOLDENKIDSaudioLink(audiolink);
	var x = hiendich.x + 85;
	var y = hiendich.y + 35;
	var audio_div = document.getElementById("playaudio");
	if ((navigator.appName == "Netscape") || (navigator.appVersion.indexOf("MSIE 9.0") > 1) || (navigator.appName == "Opera")) {
		x = x + "px";
		y = y + "px"
	}
	if (typeof(notDisplay) == 'undefined') {
		audio_div.style.left = x;
		audio_div.style.top = y
	}
	var id_playaudio = "mp3player" + play_audio_times;
	audio_div.innerHTML = '<div style="width: 165px; height: 20px; background-color: #FF9966;" > <span onclick="stopAudio();" style="cursor:pointer"><img src="/icon/wrong.png" />  Close </span></div>';
	audio_div.innerHTML += "<div id='" + id_playaudio + "'>Audio</div>";
	audio_div.style.visibility = "visible";
	jwplayer(id_playaudio).setup({
		'flashplayer': 'http://www.tienganh123.com/jwplayer/player.swf',
		'file': audiolink,
		'autostart': 'true',
		'controlbar': 'bottom',
		'width': '165',
		'height': '24'
	})
}
function hideNonGoldenKidsMember() {
	/* var hide_nonGoldenKids;
	if (!goldenkids_member()) {
		hide_nonGoldenKids = document.getElementById("non_goldenkids_member_hide");
		if (hide_nonGoldenKids != null) {
			hide_nonGoldenKids.innerHTML = "<a href='/huong-dan/2138-chuong-trinh-hoc-tieng-anh-tre-em-online-goldenkids.html' target=_blank><img src='http://data.tienganh123.com/file/dungchung/goldenkids_message.png' border=0 /> </a>"
		}
	} */
}
function writeSwfGoldenKids(id, movie, width, height) {
	writeSwf(id, movie + "_GOLDENKIDS.swf", width, height)
}
function writeSwfCambridge(id, movie, width, height) {
	var path = "http://goldenkids-data.tienganh123.com/";
	writeSwf(id, path + movie, width, height)
}
function getSwfGoldenKids(id, movie, width, height) {
	return get_swf_content(id, movie + "_GOLDENKIDS.swf", width, height)
}
function getFLVGoldenKids(file) {
	return file + "_GOLDENKIDS.flv"
}
function getPhotoShow(file) {
	return file + "_GOLDENKIDS.jpg"
}
function writeIframe(file, width, height) {
	if (width == null) {
		width = 680
	}
	if (height == null) {
		height = 540
	}
	document.write('<iframe width="' + width + '" height="' + height + '" frameborder="0" src="' + file + '" scrolling="no" style="padding:0" id="iframe_quiz' + iframe_id + '" name="iframe_quiz' + iframe_id + '"></iframe>');
	iframe_id = iframe_id + 1
}
function writeIframeVIP(file) {
	writeIframe(file + '_VIP.html')
}
function writeIFrameDirectoryVIP(directory, width, height) {
	writeIframe(directory + '_vip/', width, height)
}
function writeIframeGoldenKids(file) {
	writeIframe(file + '_GOLDENKIDS.html')
}
function writeIframeGameGoldenKids(file) {
	var path = "http://goldenkids-data.tienganh123.com/";
	writeIframe(path + file + 'goldenkids/', 720, 530)
}
var server_youtube = true;
function show_serverVN() {
	var show_server = document.getElementById("show_server");
	if (show_server == null) {
		return
	}
	show_server.innerHTML = "";
	var non_vip = '<span  onmouseout=hideticker(this) onMouseOver="showmessage_danhngon(\'Click để xem video từ máy chủ tại Việt nam - tốc độ cao - chỉ dành cho thành viên VIP hoặc GoldenKids\',this)"><img src="http://data.tienganh123.com/file/dungchung/server_vn.jpg" border=0 /> </span>';
	var vip = '<span onclick="change_server();"  onmouseout=hideticker(this) onMouseOver="showmessage_danhngon(\'Click để xem video từ máy chủ tại Việt nam - tốc độ cao - chỉ dành cho thành viên VIP hoặc GoldenKids\',this)"><img src="http://data.tienganh123.com/file/dungchung/server_vn.jpg" border=0 /></span>';
	show_server.innerHTML = vip
}
function show_serverYoutube() {
	var show_server = document.getElementById("show_server");
	if (show_server == null) {
		return
	}
	show_server.innerHTML = '<span onclick="change_server();"  onmouseout=hideticker(this) onMouseOver="showmessage_danhngon(\'Click để xem video từ Youtube\',this)"><img src="http://data.tienganh123.com/file/dungchung/server_vn.jpg" border=0 /></span>'
}
function change_server() {
	var youtube = document.getElementById("youtube");
	if (youtube == null) {
		return
	}
	var server_vn = document.getElementById("server_vn");
	if (server_vn == null) {
		return
	}
	if (server_youtube) {
		changecss_2('.youtube', 'display', 'none');
		changecss_2('.server_vn', 'display', 'block');
		server_youtube = false;
		show_serverYoutube()
	} else {
		changecss_2('.server_vn', 'display', 'none');
		changecss_2('.youtube', 'display', 'block');
		server_youtube = true;
		show_serverVN()
	}
}
function getLinkVIP(link, type) {
	return link + "_VIP." + type
}
function getLinkGoldenKids(link, type) {
	return link + "_GOLDENKIDS." + type
}
function GameLuyenTu(config) {
	var vip = "http://www.tienganh123.com/file/game/game_luyentu/vip/game_vip.html?";
	var conf;
		conf = config + "_VIP.xml";
		writeIframe(vip + conf, 720, 540)
}
function GamePhatAm(config) {
	var vip = "http://www.tienganh123.com/file/game/game_phatam/vip/game_vip.html?";
	var conf;
		conf = config + "_VIP.xml";
		writeIframe(vip + conf, 720, 540)
}
function GameSpellingBee(config) {
	var vip = "http://www.tienganh123.com/file/game/game_SpellingBee/vip/game_vip.html?";
	var conf;
		conf = config + "_VIP.xml";
		writeIframe(vip + conf, 720, 540)
}
function GameDescriber(config) {
	var vip = "http://www.tienganh123.com/file/game/game_Describer/vip/game_vip.html?";
	var conf;
		conf = config + "_VIP.xml";
		writeIframe(vip + conf, 720, 540)
}
function GameMemory(config) {
	var vip = "http://www.tienganh123.com/file/game/game_Memory/vip/game_vip.html?";
	var conf;
		conf = config + "_VIP.xml";
		writeIframe(vip + conf, 720, 540)
}
var video_player_id = 1;
function PlayVideo(videoID, v_width, v_height, flvvideolink, mp4videolink, imagelink) {
	var x = document.getElementById(videoID);
	var new_height = parseInt(v_height) + 25;
	var topposter = ((parseInt(v_height) / 2) - 30 > 0) ? (parseInt(v_height) / 2) - 30 : 0;
	v_height = new_height.toString();
	var video_html = '';
	video_html = '<video width="' + v_width + '" height="' + v_height + '" id="player' + video_player_id + '" poster="' + imagelink + '" controls="controls" preload="none"><source type="video/mp4" src="' + mp4videolink + '" />';
	if (navigator.userAgent.match(/iPad/i) != null) {
		video_html = '<video style="display: none;" width="' + v_width + '" height="' + v_height + '" id="player' + video_player_id + '" poster="' + imagelink + '" controls="controls" preload="none"><source type="video/mp4" src="' + mp4videolink + '" /></video>';
		video_html = video_html + '<div onclick="this.style.display=\'none\'; this.previousElementSibling.style.display = \'block\'; this.previousElementSibling.play()" style="background-image: url(' + imagelink + '); width: ' + v_width + 'px;height: ' + v_height + 'px; background-size: 100% 100%; cursor: pointer;"><img style="margin-top: ' + topposter + 'px" width="60" height="60" src="http://www.tienganh123.com/file/learn/child/dungchung/lib_new_en/images/videoplay.png"/></div>'
	}
	x.innerHTML = video_html;
	var flashvars = {
		'file': flvvideolink,
		'image': imagelink,
		'autostart': 'false'
	};
	var params = {
		'allowfullscreen': 'true',
		'allowscriptaccess': 'always',
		'bgcolor': '#ffffff',
		'wmode': 'opaque'
	};
	var attributes = {
		'id': 'player' + video_player_id,
		'name': 'player' + video_player_id
	};
	video_player_id += 1;
	swfobject.embedSWF('http://www.tienganh123.com/jwplayer/player.swf', videoID, v_width, v_height, '7', 'false', flashvars, params, attributes)
}
function showContent(cmd, str) {
	if ($(cmd).attr('ta_sh') == 'hide') {
		$(cmd).next().fadeIn('slow');
		$(cmd).html('Ẩn ' + str + '<div class="w_easy_btt_o"></div>');
		$(cmd).attr('ta_sh', 'show')
	} else {
		$(cmd).next().fadeOut();
		$(cmd).attr('ta_sh', 'hide');
		$(cmd).html('Xem ' + str + '<div class="w_easy_btt"></div>')
	}
}