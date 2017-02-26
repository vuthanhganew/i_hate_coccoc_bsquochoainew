bschrome = {
	init: function(){
			//Cài đặt openLinkInNewTab cho Chrome <p>Em có thể <a data-href="chrome://extensions/configureCommands" target="_blank" data-chrome="openLinkInNewTab">bấm vào đây để <b>cài đặt phím tắt</b> cho phần mềm</a></p>
			$("[data-chrome='openLinkInNewTab']").click(function(){
				chrome.tabs.create({url: $(this).data('href')}, function(){})
				return false;
			})
			//<button class="btn btn-warning" data-chrome-openExtensionLink data-href="/bsquochoai_plugins/Chromedothi_by_hoai/index.html">Mở và thử ngay</button>
			$("[data-chrome-openExtensionLink]").click(function(){
				chrome.tabs.create({url: chrome.runtime.getURL($(this).data('href'))}, function(){})
				return false;
			})
	}
}
function bscopy(b){
	var input = document.createElement('textarea');
	document.body.appendChild(input);
	input.value = b;
	input.focus();
	input.select();
	document.execCommand('Copy');
	input.remove();
}