$(function(){
	$("#tacgia").click(function(){
		chrome.tabs.create({url: "http://www.bsquochoai.ga/chrome-pdfjs-by-bsquochoai"}, function(){})
	})
	$("#caidat").click(function(){
		chrome.tabs.create({url: chrome.runtime.getURL("/bsquochoai_plugins/pdfjs_by_hoai/options/options.html")}, function(){})
	})
})