chrome.storage.local.get("bs_chanquangcao", function(re){
	//Cài chặn các server mặc định
	if(typeof re.bs_chanquangcao == "undefined"){
		re.bs_chanquangcao = {}
		//, *://stc.id.nixcdn.com/*
			defaultServer = "http://d1.violet.vn/ads/* (quảng cáo trong violet), http://s.ad360.vn/* (quảng cáo nhiều trang Việt Nam), http://static.adtimaserver.vn/resource/*, *://api.adtimaserver.vn/zad/*, http://rtax.criteo.com/delivery/*,http://asianmedia.com/GAAN/www/delivery/*, *://ad.doubleclick.net/*, *://*.revsci.net/*, *://adi.vcmedia.vn/*, *://admicro1.vcmedia.vn/*,*://*.g.doubleclick.net/* (quảng cáo Google),*://www.googleadservices.com/pagead/* (quảng cáo Google), *://*.polyad.net/*,*://s.tuoitre.vn/*, *://api.nas.nct.vn/v2/delivery*,*://api.nas.nct.vn/v2/ads*,*://*.chitika.net/*,*://*.adk2x.com/*,*://*.2xbpub.com/*,*://*.ad131m.com/*,*://*.vetv.vn/*,*://vetv.vn/*, *://*.adnetwork.vn/*, *://*.innity.net/*, *://*.gamelumi.com/*, *://*.somo.vn/*, *://*.adtop.vn/*, *://*.adsquangcao.com/*, *://*.m-viet.com/*, *://*.adsvidsdouble.com/*, *://adsvidsdouble.com/*, *://*.padstm.com/*, *://cdn.engine.4dsply.com/*, *://coinurl.com/*, *://clktag.com/*, *://clkrev.com/*, *://eclkmpbn.com/*, *://*.oclaserver.com/*, *://asset.pagefair.net/*, *://ads.uptobox.com/*, *://*.directrev.com/*, *://*.bentdownload.com/*, *://*.click.aliexpress.com/*, *://c.eclick.vn/*, *://s.eclick.vn/*, *://*.terraclicks.com/*, *://*.edomz.net/*, *://*.popads.net/*, *://go.oclasrv.com/*, *://*.popcash.net/*, *://clktag.com/adServe/*, *://eclkspbn.com/adServe/*, *://eclkmpsa.com/adServe/*, *://*.clkoffers.com/*, *://yllix.com/*, *://resources.infolinks.com/*, *://cdn.shorte.st/link-converter.min.js, *://*.clicksor.net/*, *://*.exoclick.com/*, *://*.anthill.vn/*,*://*.pub2srv.com/*,*://onclickads.net/*, *://*.novanet.vn/*, *://cdn.ouo.io/js/full-page-script.js, http://cm.tuoitre.vn/like/unlikecomment/, *://adserver.adtech.de/*", "*://static.gammaplatform.com/*"
		re.bs_chanquangcao.server = defaultServer
		re.bs_chanquangcao.title = "porn, sex"
		chrome.storage.local.set(re)
	}
	server = toArray(re.bs_chanquangcao.server)
	chrome.webRequest.onBeforeRequest.addListener(
	  function(details) { return {cancel: true}; },
	  {urls: server},
	  ["blocking"]);
})
function toArray(text){
	caccomment = /((\([^\)]*\))|(\{[^\}]*\})|(\[[^\]]*\]))/g
	return text.replace(caccomment, "").replace(/(\n|\s)/g, "").split(",")
}