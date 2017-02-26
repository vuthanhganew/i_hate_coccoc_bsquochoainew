$(function(){
	$.material.init()
	$('[data-toggle="tooltip"]').tooltip()
	
	chrome.storage.local.get("bs_chanquangcao", function(re){
		if(typeof re.bs_chanquangcao == "undefined"){
			re.bs_chanquangcao = {}
			defaultServer = "http://d1.violet.vn/ads/* (quảng cáo trong violet), http://s.ad360.vn/* (quảng cáo nhiều trang Việt Nam), http://static.adtimaserver.vn/resource/*, *://api.adtimaserver.vn/zad/*, http://rtax.criteo.com/delivery/*,http://asianmedia.com/GAAN/www/delivery/*, *://ad.doubleclick.net/*, *://*.revsci.net/*, *://adi.vcmedia.vn/*, *://admicro1.vcmedia.vn/*,*://*.g.doubleclick.net/* (quảng cáo Google),*://www.googleadservices.com/pagead/* (quảng cáo Google), *://*.polyad.net/*,*://s.tuoitre.vn/*, *://api.nas.nct.vn/v2/delivery*,*://api.nas.nct.vn/v2/ads*,*://*.chitika.net/*,*://*.adk2x.com/*,*://*.2xbpub.com/*,*://*.ad131m.com/*, *://*.adnetwork.vn/*, *://*.innity.net/*, *://*.gamelumi.com/*, *://*.somo.vn/*, *://*.adtop.vn/*, *://*.adsquangcao.com/*, *://*.m-viet.com/*, *://*.adsvidsdouble.com/*, *://adsvidsdouble.com/*, *://*.padstm.com/*, *://cdn.engine.4dsply.com/*, *://coinurl.com/*, *://clktag.com/*, *://clkrev.com/*, *://eclkmpbn.com/*, *://*.oclaserver.com/*, *://asset.pagefair.net/*, *://ads.uptobox.com/*, *://*.directrev.com/*, *://*.bentdownload.com/*, *://*.click.aliexpress.com/*, *://c.eclick.vn/*, *://s.eclick.vn/*, *://*.terraclicks.com/*, *://*.edomz.net/*, *://*.popads.net/*, *://go.oclasrv.com/*, *://*.popcash.net/*, *://clktag.com/adServe/*, *://eclkspbn.com/adServe/*, *://eclkmpsa.com/adServe/*, *://*.clkoffers.com/*, *://yllix.com/*, *://resources.infolinks.com/*, *://cdn.shorte.st/link-converter.min.js, *://*.clicksor.net/*, *://*.exoclick.com/*, *://*.anthill.vn/*,*://*.pub2srv.com/*,*://onclickads.net/*, *://*.novanet.vn/*, *://cdn.ouo.io/js/full-page-script.js, http://cm.tuoitre.vn/like/unlikecomment/, *://adserver.adtech.de/*", "*://static.gammaplatform.com/*"
			re.bs_chanquangcao.server = defaultServer
			re.bs_chanquangcao.title = "porn, sex"
			chrome.storage.local.set(re)
		}
		$.each(re.bs_chanquangcao, function(k, v){
			$("[data-chrome-input='"+k+"']").val(v.replace(/\s?\,\s?/g, ",\n"))
		})
	})
	//Lưu lại
	$("[data-chrome-function]").click(function(events){
		events.preventDefault()
		goiham = $(events.target).data("chrome-function").split(",")
		$.each(goiham, function(i, ham){
			window[ham.trim()]()
		})
	})
})
function save(){
	luu = {bs_chanquangcao: {}}
	$("[data-chrome-input]").each(function(){
		$this = $(this)
		val = $this.val().replace(/\n/g,"")
										
		luu.bs_chanquangcao[$this.data("chrome-input")] = val
	})
	chrome.storage.local.set(luu, function(){
		toastr.success('Đã cập nhật các server của em thành công.', 'Thành công!')
	})
}
function reload(){
	toastr.error('Hate sẽ tự reload lại để áp dụng các cài đặt trong 1.5 giây.', 'Cảnh báo!')
	setTimeout(function(){chrome.runtime.reload()}, 1500)
}
function capnhat(){

}