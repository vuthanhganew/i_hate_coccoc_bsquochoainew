var play_audio_times = 0;
var vip_only_audio = "http://data.tienganh123.com/file/dungchung/vip_only_audio.mp3";
var goldenkids_only_audio = "http://data.tienganh123.com/file/dungchung/goldenkids_only_audio.mp3";
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
function lesson_child() {
	var a = document.getElementById("check_lesson_child");
	if (a != null) {
		return true
	} else {
		return false
	}
}
function checkVIPaudioLink(a) {
	return a
}
function goldenkids_member() {
	return true
}
function checkGOLDENKIDSaudioLink(a) {
	return a
}
function show_msg(i) {
	if (i == null) {
		var a = document.getElementById("show_mes");
		var b = document.getElementById("translate");
		if (dk == 0) {
			a.innerHTML = "<font color='#EE7600'>Bài học đã được dịch, bạn hãy đưa chuột vào các câu tiếng anh để xem.</font>";
			b.innerHTML = '<input type="button" id="translate_button" onclick="show_msg()" value="Đóng bài dịch" class="stt_translate" />';
			dk = 1
		} else {
			a.innerHTML = "<font color='#EE7600'>Đã đóng bài dịch.</font>";
			b.innerHTML = '<input type="button" id="translate_button" onclick="show_msg()" value="Xem bài dịch"  class="stt_translate"/>';
			dk = 0
		}
	} else {
		var a = document.getElementById("show_mes_" + i);
		var b = document.getElementById("translate_" + i);
		if (dk == 0) {
			a.innerHTML = "<font color='#EE7600'>Bài học đã được dịch, bạn hãy đưa chuột vào các câu tiếng anh để xem.</font>";
			b.innerHTML = '<input type="button" id="translate_button_' + i + '" onclick="show_msg(' + i + ')" value="Đóng bài dịch"  class="stt_translate"/>';
			dk = 1
		} else {
			a.innerHTML = "<font color='#EE7600'>Đã đóng bài dịch.</font>";
			b.innerHTML = '<input type="button" id="translate_button_' + i + ' " onclick="show_msg(' + i + ')" value="Xem bài dịch"  class="stt_translate"/>';
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
	var a = "<table border=" + hiendich.borderwidth + " cellspacing=0 cellpadding=0><tr><td valign=top bgcolor=#" + hiendich.backgroundcolor + ">";
	a += "&nbsp;</td></tr></table>";
	return a
}
function getmessagecontent() {
	var a = "<table border=0 cellspacing=0 cellpadding=" + hiendich.tickerpadding + " width=" + hiendich.tickerwidth + " ><tr><td valign=top>";
	a += "<span style='position:relative; font-family:" + hiendich.fnt + ";color:" + hiendich.fntcolor + ";font-size:" + hiendich.fntsize + "pt;font-weight:" + hiendich.fntweight + "'>";
	a += "<font color='" + hiendich.fntcolor + "'>";
	a += hiendich.messagepresubstring;
	a += "</font>";
	a += "</span>";
	a += "</td></tr></table>";
	return a
}
function showticker() {
	var a = document.getElementById("ticker");
	var b = document.getElementById("tickerbg");
	hiendich.messagepresubstring = hiendich.message;
	a.innerHTML = getmessagecontent()
}
function hideticker(a, b) {
	clearTimeout(hiendich.timer);
	hiendich.i_substring = 0;
	hiendich.i_presubstring = 0;
	var c = document.getElementById("ticker");
	var d = document.getElementById("tickerbg");
	c.style.visibility = "hidden";
	d.style.visibility = "hidden";
	a.style.backgroundColor = hiendich.old_bgColor;
	a.style.cursor = "default";
	if (b != null) {
		a.style.cursor = b
	}
}
function showmessage_danhngon(a, b, c) {
	if (a.length <= 30) {
		hiendich.tickerwidth = 8 * a.length + 10;
		hiendich.tickerheight = 30
	} else {
		hiendich.tickerwidth = 240;
		hiendich.tickerheight = (((a.length / 30) + 2) * 20)
	}
	var d = getmessagebackground();
	hiendich.message = a;
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
	var e = document.getElementById("ticker");
	var f = document.getElementById("tickerbg");
	if ((navigator.appName == "Netscape") || (navigator.appVersion.indexOf("MSIE 9.0") > 1) || (navigator.appName == "Opera")) {
		hiendich.leftposition = hiendich.leftposition + "px";
		hiendich.topposition = hiendich.topposition + "px"
	}
	e.style.left = hiendich.leftposition;
	e.style.top = hiendich.topposition;
	e.style.width = hiendich.tickerwidth;
	e.style.visibility = "visible";
	showticker();
	hiendich.old_bgColor = b.style.backgroundColor;
	b.style.backgroundColor = hiendich.new_bgColor;
	b.style.cursor = "pointer"
}
function handlerMM(e) {
	var a, scrollY;
	if ((navigator.appName == "Netscape") || (navigator.appName == "Opera")) {
		hiendich.x = window.pageXOffset + e.clientX;
		hiendich.y = window.pageYOffset + e.clientY
	} else {
		if (document.documentElement && document.documentElement.scrollTop) {
			a = document.documentElement.scrollLeft;
			scrollY = document.documentElement.scrollTop
		} else {
			a = document.body.scrollLeft;
			scrollY = document.body.scrollTop
		}
		hiendich.x = a + event.clientX;
		hiendich.y = scrollY + event.clientY
	}
}
document.onmousemove = handlerMM;