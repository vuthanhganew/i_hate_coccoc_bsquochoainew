$(function(){
	hienlen()
	chrome.runtime.onMessage.addListener(
	  function(msg, sender, sendResponse) {
		 if (msg.action == "taohotro"){
			if(window.taoroi == 1){
				$("a:not([data-talktochrome])").each(function(){
					$(this).prepend('<span class="bstalktochrome">'+sohientai+'</span>')
					$(this).attr("data-talktochrome", sohientai)
					sohientai++
				})
				$("button:not([data-talktochrome])").each(function(){
					$(this).prepend("("+sohientai+")")
					$(this).attr("data-talktochrome", sohientai)
					sohientai++
				})
				$("input[type='text']:not([data-talktochrome]), textarea:not([data-talktochrome])").each(function(){
					$(this).wrap("<div style='position: relative'></div>");
					$(this).before('<span class="bstalktochrome" title="'+sohientai+'">'+sohientai+'</span>');
					$(this).attr("data-talktochrome", sohientai)
					sohientai++
				})
				$(".bstalktochrome").show()
			} else {
				hienlen()
			}
		 } else if (msg.action == "xoahotro"){
			$(".bstalktochrome").hide()
		 } else if (msg.action == "openlink"){
			if($('[data-talktochrome="'+msg.link+'"]').prop("tagName") == "A"){
				$('[data-talktochrome="'+msg.link+'"]').append('<button id="bs_talktochrome_btn'+msg.link+'" class="bstalktochrome_btn"></button>')
				$('#bs_talktochrome_btn'+msg.link).trigger("click")
			} else if ($('[data-talktochrome="'+msg.link+'"]').prop("tagName") == "BUTTON"){
				$('[data-talktochrome="'+msg.link+'"]').trigger("click")
			}
			
		 } else if (msg.action == "writetext"){
			if(msg.text == "xóa hết"){
				$('[data-talktochrome="'+msg.link+'"]').val('')
			}
			else  {
				$('[data-talktochrome="'+msg.link+'"]').val($('[data-talktochrome="'+msg.link+'"]').val()+" "+msg.text)
			}
		 }
	 });
})
function hienlen(){
	chrome.storage.local.get("bs_talktochrome_hotroduondan", function(re){
		if( typeof re.bs_talktochrome_hotroduondan == "undefined"){
			re.bs_talktochrome_hotroduondan = {turnOn: 0, font: "9", color: "#AD0B0B"}
			chrome.storage.local.set(re)
		}
		if(re.bs_talktochrome_hotroduondan.turnOn){
			sohientai = 1
			$("body").append("<style>.bstalktochrome_btn {display:none}.bstalktochrome {font-size: "+re.bs_talktochrome_hotroduondan.font+"px;padding: 0px 1px !important;font-weight: bold;position: absolute !important;top: -3px !important;left: 0px !important;line-height: normal;z-index:9;background-color: rgba(236, 2, 2, 0.7) !important; color: rgba(255, 255, 255, 0.85) !important;margin: 0px !important;} [data-talktochrome]{position:relative !important;} </style>")
			$("a").each(function(){
				$(this).prepend('<span class="bstalktochrome" title="'+sohientai+'">'+sohientai+'</span>')
				$(this).attr("data-talktochrome", sohientai)
				sohientai++
			})
			$("button").each(function(){
				$(this).prepend("("+sohientai+")")
				$(this).attr("data-talktochrome", sohientai)
				sohientai++
			})
			
			$("input[type='text'], textarea").each(function(){
				$(this).wrap("<div style='position: relative'></div>");
				$(this).before('<span class="bstalktochrome" title="'+sohientai+'">K'+sohientai+'</span>');
				$(this).attr("data-talktochrome", sohientai)
				sohientai++
			})
			window.taoroi = 1
		}
	})
}
