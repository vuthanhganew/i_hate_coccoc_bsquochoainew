chrome.runtime.onMessage.addListener(
  function(req, sender, sendResponse) {
    if (req.ham == "read"){
		switch (req.t) {
			case "pause":
				chrome.tts.pause();
				break;
			case "resume":
				chrome.tts.resume()
				break;
			case "speak":
				speek(req.d)
				break;
		}
	}
	else if ( req.ham == "luutu") {
		switch (req.t) {
			case "luu":
				if (localStorage.st == null ){localStorage.st = 0}
				var st = Number(localStorage.st)
				var trungkhong = 0
				for (i = st-1; i >= st-5; i--) { //check 5 tu gan nhat xem co trung k
					if( req.c == localStorage.getItem("tc"+i) ){
						trungkhong = 1
						break;
					}
					else {trungkhong = 0}
				}
				if (req.c.toString().length <= 131 && trungkhong == 0){
					savetu(req.c, req.u)
				}
				break;
			case "lay":
				break;
		}
	}
	else if (req.ham == "downloadzingmp3"){
		var downloadoptions = {url:req.link, filename:req.name.replace(/(\\|\/|\:|\*|\?|\"|\<|\>|\|)/g, "")}
		chrome.downloads.download(downloadoptions, function(){})
	}
	else if (req.ham == "tabmoi"){
		chrome.tabs.create({url: req.link, active: req.active}, function(){})
	}
	else if (req.ham == "taixuongyoutube"){
		chrome.windows.create({
		 type: 'detached_panel',
		 url: req.u,
		 width:Math.round(screen.width*80/100),
		 height: 400,
		 left: 100,
		 top: 100
		}, function (newWindow) {});
	}
	else if (req.ham == "hdviet"){
		localStorage.setItem(req.name, req.val) //hdviet_chatluongphim va hdviet_phude
	}
	else if (req.ham == "hdvietdownload"){
		chrome.downloads.download({url: req.link}, function(downloadid){})
	}
	else if (req.ham == "talktochrome"){
		if(req.type=="mo"){
			switch (req.lenh){
				case "từ điển" :
					battatphanmem()
					break;
			}
		} else if (req.type == "keo"){
			switch (req.lenh){
				case "lên":
					chrome.tabs.query({active: true}, function(tab){
						chrome.tabs.executeScript(tab.id, {
							code: "function scrollToAnim(scrollDuration) { const scrollHeight = window.scrollY, maxScroll = 460, total = scrollHeight - maxScroll, scrollStep = Math.PI / (scrollDuration / 15), cosParameter = maxScroll / 2; var scrollCount = 0, scrollMargin, scrollInterval = setInterval(function() { if ( window.scrollY >= total + 10) { scrollCount = scrollCount + 1; scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep); window.scrollTo(0, (scrollHeight - scrollMargin)); } else clearInterval(scrollInterval); }, 15); }; scrollToAnim(800);"
						}, function(){})
					})
					break;
				case "xuống":
					chrome.tabs.query({active: true}, function(tab){
						chrome.tabs.executeScript(tab.id, {
							code: "function scrollToAnim(scrollDuration) { const scrollHeight = window.scrollY, maxScroll = 460, total = scrollHeight + maxScroll, scrollStep = Math.PI / (scrollDuration / 15), cosParameter = maxScroll / 2; var scrollCount = 0, scrollMargin, scrollInterval = setInterval(function() { if (window.scrollY <= total - 10) { scrollCount = scrollCount + 1; scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep); window.scrollTo(0, (scrollHeight + scrollMargin)); } else clearInterval(scrollInterval); }, 15); }; scrollToAnim(800);"
						}, function(){})
					})
				break;
				case "lên cùng":
					chrome.tabs.query({active: true}, function(tab){
						chrome.tabs.executeScript(tab.id, {
							code: "function scrollToTop(scrollDuration) { const   scrollHeight = window.scrollY, scrollStep = Math.PI / ( scrollDuration / 15 ), cosParameter = scrollHeight / 2; var     scrollCount = 0, scrollMargin, scrollInterval = setInterval( function() { if ( window.scrollY != 0 ) { scrollCount = scrollCount + 1; scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep ); window.scrollTo( 0, ( scrollHeight - scrollMargin ) ); } else clearInterval(scrollInterval); }, 15 ); };scrollToTop(1000); "
						}, function(){})
					})
				break;
				case "dưới cùng":
					chrome.tabs.query({active: true}, function(tab){
						chrome.tabs.executeScript(tab.id, {
							code: "function scrollToTop(scrollDuration) { const   scrollHeight = window.scrollY, scrollStep = Math.PI / ( scrollDuration / 15 ), cosParameter = (document.body.clientHeight - window.screen.availHeight) / 2; var     scrollCount = 0, scrollMargin, scrollInterval = setInterval( function() { if ( window.scrollY <= (document.body.clientHeight - window.screen.availHeight -10) ) { scrollCount = scrollCount + 1; scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep ); window.scrollTo( 0, ( scrollHeight + scrollMargin ) ); } else clearInterval(scrollInterval); }, 15 ); };scrollToTop(1000); "
						}, function(){})
					})
				break;
				case "vào":
					chrome.tabs.query({active: true}, function(tab){
						chrome.tabs.getZoom(tab[0].id, function(zom){
							chrome.tabs.setZoom(tab[0].id, zom+0.2, function(){})
						})
					})
				break;
				case "ra":
					chrome.tabs.query({active: true}, function(tab){
						chrome.tabs.getZoom(tab[0].id, function(zom){
							chrome.tabs.setZoom(tab[0].id, zom-0.2, function(){})
						})
					})
				break;
				case "về":
					chrome.tabs.query({active: true}, function(tab){
						chrome.tabs.setZoom(tab[0].id, 1, function(){})
					})
				break;
			}
		} else if (req.type == "tab"){
			if(req.action == "motab"){
				if(!isNaN(req.lenh)){
					req.lenh = Number(req.lenh)
					if (req.lenh == 66){
						chrome.tabs.query({active: true}, function(ctab){
								chrome.tabs.getAllInWindow(function(tabs){
									for (i=0; i<tabs.length; i++){
										if (tabs[i].id == ctab[0].id){
											ctabthutu = i
											break;
										}
									}
									chrome.tabs.update(tabs[ctabthutu+1].id, {active: true, highlighted: true}, function(){
										chrome.windows.update({focused: true})
									})
								})
							})
					} else {
						chrome.tabs.getAllInWindow(function(re){
							chrome.tabs.update(re[req.lenh-1].id, {active: true, highlighted: true}, function(){
								chrome.windows.update({focused: true})
							})
						})
					}
				} else {
					switch (req.lenh){
						case "tập trước":
							chrome.tabs.query({active: true}, function(ctab){
								chrome.tabs.getAllInWindow(function(tabs){
									for (i=0; i<tabs.length; i++){
										if (tabs[i].id == ctab[0].id){
											chrome.tabs.update(tabs[i-1].id, {active: true, highlighted: true}, function(){
												chrome.windows.update({focused: true})
											})
											break;
										}
									}
								})
							})
						break;
						case "tập maximize":
							chrome.windows.getCurrent(function(thiswindow){
								chrome.windows.update(thiswindow.id, {state: "maximized"}, function(){})
							})
						break;
						case "tập fullscreen":
							chrome.windows.getCurrent(function(thiswindow){
								chrome.windows.update(thiswindow.id, {state: "fullscreen"}, function(){})
							})
						break;
					}
				}

			} else if (req.action == "dongtab"){
				switch (req.lenh) {
					case "tập trước":
						chrome.tabs.query({active: true}, function(ctab){
							chrome.tabs.getAllInWindow(function(tabs){
								for (i=0; i<tabs.length; i++){
									if(ctab[0].id == tabs[i].id){
										chrome.tabs.remove(tabs[i-1].id)
										break;
									}
								}
							 })
						})
						break;
					case "tập 66":
						chrome.tabs.query({active: true}, function(ctab){
							chrome.tabs.getAllInWindow(function(tabs){
								for (i=0; i<tabs.length; i++){
									if(ctab[0].id == tabs[i].id){
										chrome.tabs.remove(tabs[i+1].id)
										break;
									}
								}
							 })
						})
						break;
					case "hết bên trái":
						chrome.tabs.query({active: true}, function(ctab){
							chrome.tabs.getAllInWindow(function(tabs){
								for (i=0; i<tabs.length; i++){
									if(tabs[i].url.indexOf("TalkToChrome_codedby_bsquochoai") == -1){
										if(tabs[i].id == ctab[0].id){
											break;
										} else {
											chrome.tabs.remove(tabs[i].id)
										}
									 } else if(ctab[0].url.indexOf("TalkToChrome_codedby_bsquochoai") != -1){
										break;
									 }
								}
							 })
						})
						break;
					case "hết bên phải":
						chrome.tabs.query({active: true}, function(ctab){
							chrome.tabs.getAllInWindow(function(tabs){
								for (i=(tabs.length-1); i>=0; i--){
									if(tabs[i].url.indexOf("TalkToChrome_codedby_bsquochoai") == -1){
										if(tabs[i].id == ctab[0].id){
											break;
										} else {
											chrome.tabs.remove(tabs[i].id)
										}
									 } else if(ctab[0].url.indexOf("TalkToChrome_codedby_bsquochoai") != -1){
										break;
									 }
								}
							 })
						})
						break;
					case "toàn bộ":
						chrome.tabs.query({active: true}, function(ctab){
							chrome.tabs.getAllInWindow(function(tabs){
								for (i=(tabs.length-1); i>=0; i--){
									if(tabs[i].url.indexOf("TalkToChrome_codedby_bsquochoai") == -1){
										if(tabs[i].id != ctab[0].id){
											chrome.tabs.remove(tabs[i].id)
										}
									 }
								}
							 })
						})
						break;
					case "cửa sổ":
						chrome.windows.getCurrent(function(thiswindow){
							chrome.windows.remove(thiswindow.id, function(){})
						})
						break;
					case "cửa sổ xuống":
						chrome.windows.getCurrent(function(thiswindow){
							chrome.windows.update(thiswindow.id, {state: "minimized"}, function(){})
						})
						break;
					case "cái này":
						chrome.tabs.query({active: true}, function(ctab){
							chrome.tabs.remove(ctab[0].id)
						})
						break;
					case "full màn hình":
						chrome.windows.getCurrent(function(thiswindow){
							chrome.windows.update(thiswindow.id, {state: "maximized"}, function(){})
						})
					break;
					}
			} else if (req.action == "xulytab"){
				switch(req.lenh){
					case "tải lại":
						chrome.tabs.reload()
					break;
					case "tải lại tất cả":
						chrome.tabs.getAllInWindow(function(tabs){
							for(i=0;i<tabs.length;i++){
								chrome.tabs.reload(tabs[i].id)
							}
						})
					break;
					case "quay lại":
						chrome.tabs.query({active: true}, function(tab){
							chrome.tabs.executeScript(tab.id, {
								code: "window.history.back()"
							}, function(){})
						})
					break;
					case "tiến lên":
						chrome.tabs.query({active: true}, function(tab){
							chrome.tabs.executeScript(tab.id, {
								code: "window.history.forward()"
							}, function(){})
						})
					break;
					case "lưu lại":
						chrome.bookmarks.search({title: "Talk To Chrome by bsquochoai - from I hate Cốc Cốc"}, function(bmtree){
							if(bmtree.length == 0){
								chrome.bookmarks.create({
									parentId: "1",
									 'title': "Talk To Chrome by bsquochoai - from I hate Cốc Cốc"
								}, function(newfd){
									chrome.bookmarks.move(newfd.id, {index: 0}, function(){})
									chrome.tabs.query({active: true}, function(tab){
										saveBookmark(tab[0], newfd)
									})
								});
							} else {
								chrome.tabs.query({active: true}, function(tab){
									saveBookmark(tab[0], bmtree[0])
								})
							}
						})
					break;
					case "lưu lại tất cả":
						chrome.bookmarks.search({title: "Talk To Chrome by bsquochoai - from I hate Cốc Cốc"}, function(bmtree){
							if(bmtree.length == 0){
								chrome.bookmarks.create({
									parentId: "1",
									 'title': "Talk To Chrome by bsquochoai - from I hate Cốc Cốc"
								}, function(newfd){
									chrome.bookmarks.move(newfd.id, {index: 0}, function(){})
									chrome.tabs.getAllInWindow(function(tabs){
										for(i=0; i<tabs.length; i++){
											saveBookmark(tabs[i], newfd)
										}
									})
								});
							} else {
								chrome.tabs.getAllInWindow(function(tabs){
									for(i=0; i<tabs.length; i++){
										saveBookmark(tabs[i], bmtree[0])
									}
								})
							}
						})
					break;
					case "khóa tập":
						chrome.tabs.query({active: true}, function(tab){
							chrome.tabs.update([0].id, {pinned: true}, function(){})
						})
					break;
					case "im lặng":
						chrome.tabs.query({active: true}, function(tab){
							chrome.tabs.update(tab[0].id, {muted: true}, function(){})
						})
					break;
					case "mở tab mới đóng":
						chrome.storage.local.get("bs_talktochrome", function(re){
							if(typeof re.bs_talktochrome.tab.removeTab != "undefined"){
								chrome.tabs.create({url: re.bs_talktochrome.tab.removeTab[re.bs_talktochrome.tab.removeTab.length-1]}, function(){})
							}
						})
					break;
				}
			} else if(req.action == "xulytab-quaylaidigit"){
				lenh = Number(req.lenh.replace("quay lại ", ""))
				chrome.tabs.query({active: true}, function(tab){
					chrome.tabs.executeScript(tab.id, {
						code: "window.history.go(-"+lenh+")"
					}, function(){})
				})
			} else if(req.action == "xulytab-tienlendigit"){
				lenh = Number(req.lenh.replace("tiến lên ", ""))
				chrome.tabs.query({active: true}, function(tab){
					chrome.tabs.executeScript(tab.id, {
						code: "window.history.go("+lenh+")"
					}, function(){})
				})
			} else if(req.action == "xulytab-tabmoidongdigit"){
				chrome.storage.local.get("bs_talktochrome", function(re){
					chrome.tabs.create({url: re.bs_talktochrome.tab.removeTab[re.bs_talktochrome.tab.removeTab.length-req.lenh]}, function(){})
				})
			} else if(req.action == "xulytab-digittabmoidong"){
				chrome.storage.local.get("bs_talktochrome", function(re){
					dodai = re.bs_talktochrome.tab.removeTab.length
					console.log(dodai)
					for( i = (dodai-1); i>=0; i--){
						if( i >= (dodai-req.lenh)){
							chrome.tabs.create({url: re.bs_talktochrome.tab.removeTab[i]}, function(){})
						} else break;
					}
				})
			}
		} else if(req.type == "hotroduongdan"){
			switch(req.action){
				case "caidat":
					switch(req.lenh){
						case "tạo hỗ trợ":
							chrome.storage.local.get("bs_talktochrome_hotroduondan", function(re){
								re.bs_talktochrome_hotroduondan.turnOn = 1
								chrome.storage.local.set(re)
								chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
								  chrome.tabs.sendMessage(tabs[0].id, {action: "taohotro"}, function(response) {});
								});
							})
						break;
						case "xóa hỗ trợ":
							chrome.storage.local.get("bs_talktochrome_hotroduondan", function(re){
								re.bs_talktochrome_hotroduondan.turnOn = 0
								chrome.storage.local.set(re)
								chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
								  chrome.tabs.sendMessage(tabs[0].id, {action: "xoahotro"}, function(response) {});
								});
							})
						break;
				}
			break;
			case "openlink":
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				  chrome.tabs.sendMessage(tabs[0].id, {action: "openlink", link: req.lenh}, function(response) {});
				});
			break;
			case "writetext":
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				  chrome.tabs.sendMessage(tabs[0].id, {action: "writetext", text: req.lenh, link: req.link}, function(response) {});
				});
			break;
			}
		}
	} else if (req.ham == "hideunwanted"){
		switch (req.action){
			case "add":
				console.log(req.data)
			break;
		}
	}
});
if (localStorage.gtngonngu == null){localStorage.gtngonngu = "vi"}
if (localStorage.batphanmem == null){localStorage.batphanmem = "1"}
if (localStorage.gender == null ) {localStorage.gender = "female"}
if (localStorage.lang == null ) {localStorage.lang = "en-US"}
if (localStorage.rate == null ) {localStorage.rate = "0.9"}
if (localStorage.volume == null ) {localStorage.volume = "1"}
if (localStorage.cddoc == null ) {localStorage.cddoc = "cddocgt"}
if (localStorage.cdnguondich == null ) {localStorage.cdnguondich = "cddichgt"}
if (localStorage.cdrechuot == null ) {localStorage.cdrechuot = "0"}

//Long live connect lấy Cài đặt nhanh bên context
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "caidatnhanh");
  port.onMessage.addListener(function(m) {
		if (m.data = "cd"){
			port.postMessage({cddoc: localStorage.cddoc, cdhighlight:localStorage.cdhighlight, cdnghedoc:localStorage.cdnghedoc, cdluutu:localStorage.cdluutu, cdhientudien:localStorage.cdhientudien, cddoctiengviet:localStorage.cddoctiengviet, gtdocngonngu:localStorage.gtdocngonngu, gttudien:localStorage.gttudien, batphanmem: localStorage.batphanmem, cdnguondich:localStorage.cdnguondich, cdrechuot: localStorage.cdrechuot});
		}
  });
});



//Các trang quảng cáo video
chrome.webRequest.onBeforeRequest.addListener(function(details){
			if(details.url.indexOf(".mp4") > 0 || details.url.indexOf(".flv") > 0){
				return {redirectUrl: chrome.extension.getURL('site/inSite/mp4/ads.mp4')}
			}
	},
	{urls: ["*://*.blueseed.tv/*", "*://*.serving-sys.com/*","*://*.videologygroup.com/*", "*://*.adnetwork.vn/*", "*://*.cdnviet.com/*"]},
	["blocking"])

//study.com
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("remVideo.js") > 0){
			return {redirectUrl: chrome.extension.getURL('site/inSite/study.com/remVideo.js')}
		}
},
{urls: ["*://*.study.com/*", "*://study.com/*"]},
["blocking"])
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("lessonQuiz.js") > 0){
			return {redirectUrl: chrome.extension.getURL('site/inSite/study.com/lessonQuiz.js')}
		}
},
{urls: ["*://*.study.com/*", "*://study.com/*"]},
["blocking"])
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("QuizController.js") > 0){
			return {redirectUrl: chrome.extension.getURL('site/inSite/study.com/QuizController.js')}
		}
},
{urls: ["*://*.study.com/*", "*://study.com/*"]},
["blocking"])


//toomva.com
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("videoController.js") > 0){
			return {redirectUrl: chrome.extension.getURL('site/inSite/toomva/videoController.js')}
		}
},
{urls: ["*://*.toomva.com/*", "*://toomva.com/*"]},
["blocking"])

//google translate
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("translate_m.js") > 0){
			return {redirectUrl: chrome.extension.getURL('site/google_translate_m.js')}
		}
},
{urls: ["*://translate.google.com/*"]},
["blocking"])

//tuoitre.vn
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("comment/js/function.js") > 0){
			return {redirectUrl: chrome.extension.getURL('site/inSite/tuoitre/function.js')}
		}
},
{urls: ["*://*.tuoitre.vn/*"]},
["blocking"])

//hdviet.com
/* 	chrome.webRequest.onBeforeRequest.addListener(function(details){
			if(details.url.indexOf(".ts") > 0 && details.url.indexOf("-vip.vn-hd.com/") == -1 && details.url.indexOf("clip.") == -1){
				q = {b270: 700000, b360:1000000, b450:15000000, bmHD: 2000000, b720:2700000, b1080:2700000}
				return {redirectUrl: details.url.replace(/\.vn-hd/g, "-vip.vn-hd").replace(/700000_/g, q.bmHD+"_").replace(/1000000_/g, q.bmHD+"_").replace(/1500000_/g, q.bmHD+"_") }
			}
	},
	{urls: ["*://*.vn-hd.com/*"]},
	["blocking"])
	chrome.webRequest.onBeforeRequest.addListener(function(details){
			q = {b320: 320, b480:480, b640:640, b800: 800, b1024:1024, b1280:1280, b1920: 1920}
			macdinh =q.b1280
			if(details.url.indexOf(".ts") > 0 || details.url.indexOf(".m3u8") > 0 && details.url.indexOf("/"+macdinh) == -1 && details.url.indexOf("playlist.m3u8") == -1){
				return {redirectUrl: details.url.replace(/\/480/g,"/"+macdinh).replace(/\/640/g,"/"+macdinh).replace(/\/320/g,"/"+macdinh).replace(/\/800/g,"/"+macdinh)}
			}
	},
	{urls: ["*://*.flix-cdn.com/*"]},
	["blocking"])
 */
/*  chrome.webRequest.onBeforeRequest.addListener(function(details){
			if(details.url.indexOf("/jwplayer.js") != -1){
				return {redirectUrl: chrome.extension.getURL('site/inSite/jwplayer/jwplayer.js')}
			}
	},
	{urls: ["*://t.hdviet.com/*"]},
	["blocking"])  */
chrome.webRequest.onBeforeRequest.addListener(function(details){
			if(details.url.indexOf("/hdv.v2.info.min.js") != -1){
				return {redirectUrl: chrome.extension.getURL('site/inSite/hdviet/hdv.v2.info.js')}
			}
			/* if(details.url.indexOf("/jwplayer.js") != -1){
				return {redirectUrl: chrome.extension.getURL('site/inSite/hdviet/jwplayer.js')}
			} */
	},
	{urls: ["*://t.hdviet.com/*"]},
	["blocking"])

//VIVO.vn
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("/paginator.min.js") != -1){
			return {redirectUrl: chrome.extension.getURL('site/inSite/vivovn/paginator.min.js')}
		}
		/* if(details.url.indexOf("/jwplayer.js") != -1){
			return {redirectUrl: chrome.extension.getURL('site/inSite/hdviet/jwplayer.js')}
		} */
},
{urls: ["*://files.vivo.vn/*"]},
["blocking"])
//kites
chrome.webRequest.onBeforeRequest.addListener(function(details){
			if(details.url.indexOf("/js/episode-video.") != -1){
				return {redirectUrl: chrome.extension.getURL('site/inSite/kites/episode-video.min.js')}
			}
			if(details.url.indexOf("html5-player.min.js") != -1){
				return {redirectUrl: chrome.extension.getURL('site/inSite/kites/html5-player.min.js')}
			}
	},
	{urls: ["*://skin.kites.vn/*"]},
	["blocking"])
/*
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("playlist.m3u8") > 0 && details.url.indexOf("playlist.m3u8?") == -1 ){
			chrome.tabs.executeScript(details.tabId, {
				code: 'localStorage.bsquochoai_playlistm3u8="'+details.url+'"'
			})
			chrome.tabs.executeScript(details.tabId, {
				file: 'site/inSite/hdviet/injectscript.js'
			})
		}
},
{urls: ["*://*.vn-hd.com/*"]},
["blocking"])

chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf(".srt") > 0){
			chrome.tabs.executeScript(details.tabId, {
				code: 'localStorage.bsquochoai_subtitles="'+details.url+'"'
			})
		}
},
{urls: ["*://*.vn-hd.com/*"]},
["blocking"]) */

//Zing mp3 video
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf(".swf") != -1  && details.url.indexOf(".zingmp3.movie") != -1 ){
			chrome.tabs.executeScript(details.tabId, {
				file: 'site/inSite/zingmp3-video/injectscript.js'
			})
			return {cancel: true};
		}
},
{urls: ["*://static.mp3.zdn.vn/*"]},
["blocking"])

//Zing tv video
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf(".swf") != -1  && details.url.indexOf("ZingTV") != -1 ){
			chrome.tabs.executeScript(details.tabId, {
				file: 'site/inSite/zingtv/injectscript.js'
			})
			return {cancel: true};
		}
},
{urls: ["*://stc-tv.zing.vn/*"]},
["blocking"])

//Zing tv video
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("download.js") != -1){
			return {redirectUrl: chrome.extension.getURL('site/inSite/fshare/download.js')}
		}
},
{urls: ["*://*.fshare.vn/*"]},
["blocking"])

//olm.vn
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("math.js") != -1){
			return {redirectUrl: chrome.extension.getURL('site/inSite/olmvn/math.js')}
		}
},
{urls: ["*://olm.vn/*"]},
["blocking"])

//123doc
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("detail.js") != -1){
			return {redirectUrl: chrome.extension.getURL('site/inSite/123doc/detail.js')}
		}
		if(details.url.indexOf("script.js") != -1){
			return {redirectUrl: chrome.extension.getURL('site/inSite/123doc/script.js')}
		}
},
{urls: ["*://static.store123doc.com/*"]},
["blocking"])

//linksvip
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("LinksVIP.js") != -1){
			return {redirectUrl: chrome.extension.getURL('site/inSite/linksvip/LinksVIP.js')}
		}
},
{urls: ["*://linksvip.net/*"]},
["blocking"])

//hocgioithpt
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("init.js") != -1){
			return {redirectUrl: chrome.extension.getURL('site/inSite/hocgioithpt/init.js')}
		}
},
{urls: ["*://*.hocgioithpt.com/*"]},
["blocking"])

//talktv
chrome.webRequest.onBeforeRequest.addListener(function(details){
		if(details.url.indexOf("load-player.js") != -1){
			return {redirectUrl: chrome.extension.getURL('site/inSite/talktv/load-player.js')}
		}
},
{urls: ["*://tv.csmtalk.vcdn.vn/*"]},
["blocking"])

//Chỉnh Access-Control-Allow-Origin
chrome.webRequest.onHeadersReceived.addListener(function(details){
	details.responseHeaders.forEach(function(v,i,a){
		if(v.name == "access-control-allow-origin"){
			details.responseHeaders.splice(i,1);
		}
	});
	details.responseHeaders.push({name:"Access-Control-Allow-Origin",value:"*"});
   return {responseHeaders:details.responseHeaders};
},
{urls: ["*://*.vn-hd.com/*", "*://api.mp3.zing.vn/*", "*://api.tv.zing.vn/*", "*://*.youtube.com/*", "*://keepvid.com/*", "*://*.0calc.com/*", "*://molview.org/*"]},["responseHeaders","blocking"]);

//tienganh123.com
chrome.webRequest.onBeforeRequest.addListener(function(details){
			if(details.url.indexOf("/js/game.js") > 0){
				return {redirectUrl: chrome.extension.getURL('site/inSite/tienganh123/gamevip.js')}
			}
			if(details.url.indexOf("/dungchung/function.js") > 0){
				return {redirectUrl: chrome.extension.getURL('site/inSite/tienganh123/function.js')}
			}
			if(details.url.indexOf("/js/audio_ddn.js") > 0){
				return {redirectUrl: chrome.extension.getURL('site/inSite/tienganh123/audio_ddn.js')}
			}
			if(details.url.indexOf("/js/libs_audio.js") > 0){
				return {redirectUrl: chrome.extension.getURL('site/inSite/tienganh123/libs_audio.js')}
			}
			if(details.url.indexOf("/olympic/js/action.js") > 0){
				return {redirectUrl: chrome.extension.getURL('site/inSite/tienganh123/action.js')}
			}
			if(details.url.indexOf("basic_action.js") > 0){
				return {redirectUrl: chrome.extension.getURL('site/inSite/tienganh123/basic_action.js')}
			}
			if(details.url.indexOf("function_final.js") > 0){
				return {redirectUrl: chrome.extension.getURL('site/inSite/tienganh123/function_final.js')}
			}
			if(details.url.indexOf("toeic_action.js") > 0){
				return {redirectUrl: chrome.extension.getURL('site/inSite/tienganh123/toeic_action.js')}
			}
			if(details.url.indexOf("audioShort.js") > 0){
				return {redirectUrl: chrome.extension.getURL('site/inSite/tienganh123/audioShort.js')}
			}
	},
	{urls: ["*://*.tienganh123.com/*"]},
	["blocking"])

	//Google Recaptcha
/* chrome.webRequest.onBeforeRequest.addListener(function(details){
			if(details.url.indexOf("recaptcha__en.js") > 0){
				return {redirectUrl: chrome.extension.getURL('site/plugins/recaptcha__en.js')}
			}
	},
	{urls: ["*://*.gstatic.com/recaptcha/*"]},
	["blocking"])  */

 chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
			if (details.url.indexOf("translate.google.com.vn/translate_tts") > 0){
				 for (var i = 0; i < details.requestHeaders.length; ++i) {
					if (details.requestHeaders[i].name === 'Referer') {
					  details.requestHeaders[i].value = "https://translate.google.com.vn/translate_tts?ie=UTF-8&editfrom=bsquochoai.ga"
					  break;
					}
				}
          } //if details.url
			 else if (details.url.indexOf("translate.google.com/m?") > 0){
				 for (var i = 0; i < details.requestHeaders.length; ++i) {
					if (details.requestHeaders[i].name === 'Referer') {
					  details.requestHeaders[i].value = "https://translate.google.com/m?editfrom=bsquochoai.ga"
					  break;
					}
				}
			 }
          return {requestHeaders: details.requestHeaders};
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]);

//Command keyboard shortcut
chrome.commands.onCommand.addListener(function(cmd) {
   if (cmd == "doclai"){
		 if(localStorage.cddoc == "cddocchuan"){
				chrome.storage.local.get('tumoidoc', function (re) {
					 chrome.runtime.sendMessage({ham: "read",t:"speak", d: re.tumoidoc})
				});
			} else if(localStorage.cddoc == "cddocgt"){
				/* chrome.tabs.getCurrent(function(tab){
					chrome.tabs.executeScript(tab.id, {code:''}, function(){})
				}) */
			}
	} else if (cmd=="battatphanmem"){
		battatphanmem()
	} else if (cmd=="motalktochrome"){
		chrome.tabs.create({url: "/bsquochoai_plugins/TalkToChrome_codedby_bsquochoai/index.html", selected: false, active: false}, function(){})
	}
});
setInterval(function(){
	chrome.notifications.clear("tb", function(){})
},10000)
chrome.notifications.onClicked.addListener(function(nid,byuser){
	chrome.notifications.clear(nid, function(){
	})
})
var now = new Date();
var thoigianhoc = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 55, 00, 0) ;
chrome.alarms.create("alarmhocanhvancungthay", {
	when: thoigianhoc.getTime(),
	periodInMinutes: 24*60*60
})
chrome.alarms.onAlarm.addListener(function(a){
	if(a.name="alarmhocanhvancungthay"){
		chrome.notifications.create("hocanhvan", {
					type:"basic",
					title:"Tới giờ HỌC ANH VĂN CÙNG THẦY!",
					iconUrl:"/icon/icon128.png",
					message:"20:00 hôm nay trên AloAlo, em hãy nhanh chóng chuẩn bị để học cùng thầy và các bạn nhen."
				},function(){})
		//chrome.tts.speak("It's time to study English with thayy bs walk why, please open Alo Alo to learn at 8 o'clock!");
	}
})
function savetu(c,u){
	var st = Number(localStorage.st)
	var l =""
	if (localStorage.cddoc == "cddocgt"){ l=localStorage.gtdocngonngu }
	else { l=localStorage.lang }
	var d = new Date()
	var t = d.getTime()
	localStorage.setItem("tc"+st, c )
	localStorage.setItem("tl"+st, l )
	localStorage.setItem("tu"+st, u )
	localStorage.setItem("tt"+st, t)

	localStorage.setItem('st',st+1 )
}
function taowindow(url){
		var w = Math.round(screen.width*80/100)
		var h =Math.round(screen.height*85/100)
		var l = Math.round((screen.width/2)-(w/2));
		var t = Math.round((screen.height/2)-(h/2));
		chrome.windows.create({
		 type: 'detached_panel',
		 url: url,
		 width:w,
		 height: h,
		 left: l,
		 top: t
		}, function (newWindow) {
		});
}
function speek(t){
	chrome.tts.stop()
	var lang = localStorage.lang
	var gender = localStorage.gender
	var rate = Number(localStorage.rate)
	var volume = Number(localStorage.volume)
	chrome.tts.speak(t, {'gender':gender, 'lang':lang, 'rate': rate, 'volume':volume });
}
function x(x){console.log(x)}
function battatphanmem(){
	if ( localStorage.batphanmem =="1" ){
			localStorage.setItem("batphanmem","0")
			options= {
					type:"basic",
					title:"Đã tắt!",
					iconUrl:"/icon/icon128.png",
					message:"Em hãy bấm Alt+Q lần nữa để bật phần mềm."
				}
				chrome.notifications.create("tb", options,function(){})
		} else {
			localStorage.setItem("batphanmem","1")
			options= {
					type:"basic",
					title:"Đã bật!",
					iconUrl:"/icon/icon128.png",
					message:"Em hãy bấm Alt+Q lần nữa để tắt phần mềm."
				}
				chrome.notifications.create("tb", options,function(){})

		}
}
function saveBookmark(tab, bmtree){
	chrome.bookmarks.search({url: tab.url}, function(isok){
		if(isok.length == 0){
			chrome.bookmarks.create({
				'parentId': bmtree.id,
				 'title': tab.title+" - bsquochoai.ga",
				 'url': tab.url
			});
		}
	})
}
var tongcactabRemove = 10
var tongcactabRecord = 18
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	chrome.storage.local.get("bs_talktochrome", function(re){
		for(i=0; i<re.bs_talktochrome.tab.recordTab.length; i++){
			tabR = re.bs_talktochrome.tab.recordTab[i];
			if(tabR.id == tabId){
				if(re.bs_talktochrome.tab.removeTab.length >= tongcactabRemove){
					re.bs_talktochrome.tab.removeTab.splice(0,1)
				};
				if(re.bs_talktochrome.tab.removeTab.indexOf(tabR.url) == -1){
					re.bs_talktochrome.tab.removeTab.push(tabR.url)
					chrome.storage.local.set(re)
				}
				break;
			}
		}
	})
})
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(tab.url.indexOf("chrome-devtools://devtools/") == 0 || tab.url.indexOf("chrome://newtab/") == 0 || tab.url.indexOf("/bsquochoai_plugins/TalkToChrome_codedby_bsquochoai/index.html") != -1 || tab.url.indexOf("/bsquochoai_plugins/Pageshot_by_hoai/pageshot.html?id=Pageshot-by-bsquochoai.ga") != -1 || tab.status != "complete") return false;
	chrome.storage.local.get("bs_talktochrome", function(re){
		if(typeof re.bs_talktochrome.tab == "undefined"){
			re.bs_talktochrome.tab = {recordTab: [], removeTab: [] }
		}
		for(i=0; i<re.bs_talktochrome.tab.recordTab.length; i++){
			if(re.bs_talktochrome.tab.recordTab[i].id == tab.id){
				re.bs_talktochrome.tab.recordTab.splice(i,1)
				re.bs_talktochrome.tab.recordTab.push(tab)
				return false;
				break;
			}
		}
		if(re.bs_talktochrome.tab.recordTab.length >= tongcactabRecord){
			re.bs_talktochrome.tab.recordTab.splice(0,1)
		}
		re.bs_talktochrome.tab.recordTab.push({id: tab.id, url: tab.url})
		chrome.storage.local.set(re)
	})
})