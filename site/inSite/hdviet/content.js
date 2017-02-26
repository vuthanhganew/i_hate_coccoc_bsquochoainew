var s = document.createElement('script');
s.src = chrome.extension.getURL('/site/inSite/hdviet/changevariable.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);