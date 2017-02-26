(function () {
	if(!(window.location.hostname == "mega.co.nz" || window.location.hostname == "mega.nz")){
		var s = document.createElement('script');
s.src = chrome.extension.getURL('/site/inSite/adsbypass/safebrowse.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);
	}
})();