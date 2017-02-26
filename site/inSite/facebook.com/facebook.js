//Variables by bsquochoai
links = {
	trangchu: ["https://www.facebook.com/", "https://www.facebook.com/#", "https://www.facebook.com/?sk=h_chr", "https://www.facebook.com/?sk=h_nor", "https://www.facebook.com/?sk=h_chr#", "https://www.facebook.com/?sk=h_nor#", "https://www.facebook.com/?ref=logo", "https://www.facebook.com/?ref=logo#"]
}
cons = {
	loadingImg: '<img class="img bs_loading" src="https://fbstatic-a.akamaihd.net/rsrc.php/v2/yb/r/GsNJNwuI-UM.gif" alt="" width="16" height="11">'
}
all_lang = {
	vi : {
		"groups you're in": "các nhóm bạn tham gia",
		"Add to Favorites": "thêm vào mục yêu thích",
		"Added to Favorites": "đã thêm vào mục yêu thích",
		"Cancel": "hủy",
		"Leave group": "rời khỏi nhóm",
		"Sponsored": "được tài trợ",
		"Like": "thích",
		"Unlike": "bỏ thích",
		"Like this": "Thích điều này",
		"Unlike this": "Bỏ thích điều này",
		"Like this comment": "Thích bình luận này",
		"Confirm": "chấp nhận",
		"Delete Request": "xóa yêu cầu",
		"Add friend": "Thêm bạn bè",
		"Remove": "xóa",
		"Delete": "xóa",
		"Friends": "Bạn",
		"Close friends": "bạn thân",
		"Unfriend": "hủy kết bạn"
	},
	en: {
		"groups you're in": "groups you're in",
		"Add to Favorites": "add to favorites",
		"Added to Favorites": "added to favorites",
		"Cancel": "cancel",
		"Leave group": "leave group",
		"Sponsored": "sponsored",
		"Like": "like",
		"Unlike": "unlike",
		"Like this": "Like this",
		"Unlike this": "Unlike this",
		"Like this comment": "Like this comment",
		"Confirm": "confirm",
		"Delete Request": "delete request",
		"Add friend": "add friend",
		"Delete": "delete",
		"Remove": "remove",
		"Friends": "friends",
		"Close friends": "close friends",
		"Unfriend": "unfriend"
	}
}
//CSS
$("body").append('<style></style>')
//Nút lên trên cùng
$("body").append('<div class="bs_top_btn"><img class=" img" src="https://fbstatic-a.akamaihd.net/rsrc.php/v2/y4/r/-PAXP-deijE.gif" alt="" width="8" height="9" style="background-image: url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yC/r/ls-aeUEZ2rK.png);"/></div>')

chrome.storage.local.get("bs_facebook_tool", function(re){
	if (typeof re.bs_facebook_tool["caidat_top_btn"] != "undefined"){
		$(".bs_top_btn").css({left: re.bs_facebook_tool.caidat_top_btn.left, top: re.bs_facebook_tool.caidat_top_btn.top})
	}
})
$(".bs_top_btn").click(function(){
	if ($(this).data("isDragging") == 0){
		$('html, body').animate({
				scrollTop: 0
			 }, 400)
	}
})
			
$(".bs_top_btn").draggable({
	start: function() {
	  $(this).data("isDragging", 1)
	},
	stop: function(even, ui) {
		chrome.storage.local.get("bs_facebook_tool", function(re){
			re.bs_facebook_tool["caidat_top_btn"] = {left: ui.position.left, top: ui.position.top}
			chrome.storage.local.set(re)
		})
	  $(this).data("isDragging", 0)
	}
})
//Chỉnh lại ngôn ngữ

lang = all_lang[$("html").attr("lang")]
//Lấy thông tin hiện tại

//Group membership
tranghientai = ""
mainFBUrlCheck = setInterval(function(){
	currentPage = window.location.href
	if(currentPage != tranghientai){
		tranghientai = currentPage
		changePage()
	}
}, 1500)
function changePage(){
	$("#bs_caidat_all, #bs_caidat_hide").remove()
	if(currentPage.indexOf("/groups/?category=membership") > -1){
		in_group_membership()
	} else if (currentPage.indexOf("media_set?set=") > -1 || currentPage.indexOf("/photos") == (currentPage.length - 7) || currentPage.indexOf("/photos_of")  == (currentPage.length - 10) || currentPage.indexOf("/photos_albums")  == (currentPage.length - 14) || currentPage.indexOf("/photos_all")  == (currentPage.length - 11)){
		in_media_set()
	} else if (currentPage.indexOf("/settings") > -1 || currentPage.indexOf("/messages/") > -1 || currentPage.indexOf("allactivity?privacy_source=activity_log") > -1){
		//Do nothing
	} else if (currentPage.indexOf("/posts/") > -1){
		in_singlePostPage()
	} else if (currentPage.indexOf("/videos/") > -1){
		in_singleVideoPage()
	} else if (currentPage.indexOf("/friends/requests/") > -1){
		in_friendsRequest()
	} else if (currentPage.indexOf("/friends") > -1){
		in_friendsManager()
	}
	else { // if (links.trangchu.indexOf(currentPage) > -1)
		if($("#pagelet_timeline_main_column").length > 0){
			in_personalPage()
		} else {
			in_trangchu()
		}
	}
	after_add_panel()
}
function after_add_panel(){
	$("#bs_caidat_all").before('<li><button value="1" id="bs_caidat_hide" class="_42ft _4jy0 _ej1 _4jy3 _4jy1 selected _51sy" type="submit">Ẩn</button></li>')
	
	$("#bs_caidat_hide").click(function(){
		if ($("#bs_caidat_all").is(":visible")){
			$("#bs_caidat_all").hide(500)
			$(this).text("Hiện")
			chrome.storage.local.get("bs_facebook_tool", function(re){
				re.bs_facebook_tool["bs_trangchu_hidePanel"] = true
				chrome.storage.local.set(re)
			})
		} else {
			$("#bs_caidat_all").show(400)
			$(this).text("Ẩn")
			chrome.storage.local.get("bs_facebook_tool", function(re){
				re.bs_facebook_tool["bs_trangchu_hidePanel"] = false
				chrome.storage.local.set(re)
			})
		}
		
	})
	chrome.storage.local.get("bs_facebook_tool", function(re){
		if (re.bs_facebook_tool["bs_trangchu_hidePanel"]){
			$("#bs_caidat_hide").trigger("click")
		}
	})
}

function in_group_membership(){
		$("body").append('<ul class="uiList mhm mtm _4kg _6-h _704 _6-i _4-u2 mvm _495i _4-u8" id="bs_caidat_all" ><li><a id="bs_hientatca">Hiện tất cả nhóm <span class="bs_tongsonhom"></span></a></li>    <li><a id="bs_thoatnhomkhonguathich">Thoát các nhóm không ưa thích (<span class="bs_thoatnhomkhonguathich_total"></span>)</a></li></ul>')
		
		//Thoát các nhóm không ưa thích
		function addDanhsachnhom(){
			if($(".bs_danhsachnhom").length == 0 ){
				$("._38my").each(function(){
					if($(this).text().trim().toLowerCase().indexOf(lang["groups you're in"]) > -1 ){
						$(this).parent().parent().parent().addClass("bs_danhsachnhom")
					}
				})
			}
		}
		
		//Hiện tất cả các nhóm
		$("#bs_hientatca").click(function(){
			addDanhsachnhom()
			$(this).prepend(cons.loadingImg)
			$(this).off()
			intervalClick = setInterval(function(){
				$(".bs_tongsonhom").text('('+$(".bs_danhsachnhom").find("div[id^='group_browse_']").length+' nhóm)')
				if($("#group-browse-seemoremembership i.img").length > 0){
					$("#group-browse-seemoremembership i.img").trigger("click")
				} else {
					$(".bs_loading").remove()
					clearInterval(intervalClick);
				}
			}, 500);
		})
		$("#bs_thoatnhomkhonguathich").click(function(){
			addDanhsachnhom()
			$(this).prepend(cons.loadingImg)
			function xoa(){
				if(typeof(xoaTimeout) != "undefined"){clearTimeout(xoaTimeout);}
				current_group = $(".bs_danhsachnhom").find("div[id^='group_browse_']").not('.bs_okroi').first()
				if(typeof(bs_interval_leavegroup) != "undefined"){clearInterval(bs_interval_leavegroup);}
				if(current_group.length == 0 ){
					$(".bs_loading").remove()
					return false;
				}
				$(".bs_thoatnhomkhonguathich_total").text($(".bs_danhsachnhom").find("div[id^='group_browse_']").length)
				if(current_group.find("a[id^='favorites_button_']").text().trim().toLowerCase() != lang["Added to Favorites"] ){
					current_group.find(".uiPopover i.img").trigger("click")
					current_group.remove()
					$(".__MenuItem a[ajaxify^='/ajax/groups/membership/leave.php?group_id='] span:last").trigger("click")
					bs_interval_leavegroup = setInterval(function(){
						bs_cancel_button = $("form[action^='/ajax/groups/membership/leave.php?group_id'] .uiOverlayFooterGrid .layerConfirm")
						if(bs_cancel_button.length > 0 && bs_cancel_button.text().trim().toLowerCase()==lang["Leave group"]){
							bs_cancel_button.trigger("click")
							xoaTimeout = setTimeout(function(){
								xoa()
							}, 650)
						}
					}, 500)
				} else {
					current_group.addClass("bs_okroi")
					xoa()
				}
			}
			xoa()
			
		})
}
function in_trangchu(){
	//$("body").append('<span id="bs_caidaticon" style="position:fixed; bottom:20px; left:10px; border: dotted 1px rgba(0,0,0,1); border-radius: 50%; display: inline-block; color: rgba(0,0,0,1);padding:20px">Cài đặt</span>')
	$("body").append('<ul class="_4-u2 mvm _495i _4-u8" id="bs_caidat_all" ><li class="uiInputLabel clearfix uiInputLabelLegacy "><input type="checkbox" class="uiInputLabelInput uiInputLabelCheckbox " data-localStorage="hideSponsore"/><label for="bs_caidat_hideSponsor" class="uiInputLabelLabel fcg">Xóa quảng cáo (Sponsored)</label></li>     <li class="uiInputLabel clearfix uiInputLabelLegacy "><input  type="checkbox" class="uiInputLabelInput uiInputLabelCheckbox " data-localStorage="hideVideo"/><label for="bs_caidat_hideVideo" class="uiInputLabelLabel"><span class="fcg">Xóa bài có videos</span></label></li>      <li class="uiInputLabel clearfix uiInputLabelLegacy "><input  type="checkbox" class="uiInputLabelInput uiInputLabelCheckbox " data-localStorage="PostToGroup"/><label for="bs_caidat_bs_hide_PostToGroup" class="uiInputLabelLabel"><span class="fcg">Ẩn bài đăng vào Groups</span></label></li>          <li class="uiInputLabel clearfix uiInputLabelLegacy "><input  type="checkbox" class="uiInputLabelInput uiInputLabelCheckbox " data-localStorage="hideTintuc"/><label class="uiInputLabelLabel fcg">Ẩn bài có tin tức (links)</label></li>      <li class="uiInputLabel clearfix uiInputLabelLegacy "><input  type="checkbox" class="uiInputLabelInput uiInputLabelCheckbox " data-localStorage="hideAnh"/><label for="bs_caidat_hideAnh" class="uiInputLabelLabel"><span class="fcg">Ẩn bài có Ảnh</span></label></li>         <li class="uiInputLabel clearfix uiInputLabelLegacy "><input  type="checkbox" class="uiInputLabelInput uiInputLabelCheckbox " data-localStorage="hideChiase"/><label class="uiInputLabelLabel fcg">Xóa bài có nút "Like Page"</label></li>         <li class="uiInputLabel clearfix uiInputLabelLegacy "><input  type="checkbox" class="uiInputLabelInput uiInputLabelCheckbox " data-localStorage="StatusThuanTuy"/><label class="uiInputLabelLabel fcg">Chỉ hiện các status chữ</label></li>         <li class="uiInputLabel clearfix uiInputLabelLegacy "><input  type="checkbox" class="uiInputLabelInput uiInputLabelCheckbox " data-localStorage="ThichTatca"/><label class="uiInputLabelLabel fcg">"Thích" tất cả bài đăng hiện có</label></li>         <li class="uiInputLabel clearfix uiInputLabelLegacy "><input  type="checkbox" class="uiInputLabelInput uiInputLabelCheckbox " data-localStorage="TuExpand"/><label class="uiInputLabelLabel fcg">Tải thêm bài viết</label></li>        <li class="uiInputLabel clearfix uiInputLabelLegacy "><input  type="checkbox" class="uiInputLabelInput uiInputLabelCheckbox " data-localStorage="TreoMay"/><label class="uiInputLabelLabel fcg">Treo máy (Auto like bài mới)</label></li>        <li class="uiInputLabel clearfix uiInputLabelLegacy "><a class="uiInputLabelLabel" target="_blank" href="http://www.bsquochoai.ga/ihatecococ-facebook">Xem hướng dẫn</a></li></ul>')
	
	$(".rightColumnWrapper").append('<div class="pagelet" data-referrer="pagelet_reminders"> <div class=" pagelet _y92 _5qrt _1snm egoOrganicColumn"> <div> <div class="fbReminders"> <div class="clearfix fbRemindersStory"> <a href="/drquochoai/friends" role="button"> <div class="clearfix"><i class="fbRemindersIcon _8o _8r lfloat _ohe img sp_76NlImcJRee sx_4d7d2b"></i> <div class="_8u _42ef"><span class="_50f8"><span class="fbRemindersTitle"><strong>Tool Bạn bè</strong></span></span> </div> </div> </a> </div> <div class="clearfix fbRemindersStory"> <a href="/groups/?category=membership" role="button"> <div class="clearfix"><i class="fbRemindersIcon _8o _8r lfloat _ohe img sp_76NlImcJRee sx_fe49d2"></i> <div class="_8u _42ef"><span class="_50f8"><span class="fbRemindersTitle"><strong>Tool Groups</strong></span></span> </div> </div> </a> </div> <div class="clearfix fbRemindersStory"> <a href="/friends/requests/?fcref=jwl" role="button"> <div class="clearfix"><i class="fbRemindersIcon _8o _8r lfloat _ohe img sp_jFfmiGtbVVN sx_240006"></i> <div class="_8u _42ef"><span class="_50f8"><span class="fbRemindersTitle"><strong>Tool Kết bạn</strong></span></span> </div> </div> </a> </div> <div class="clearfix fbRemindersStory"> <a href="/drquochoai" role="button"> <div class="clearfix"> <div class="_8u _42ef"><span class="_50f8"><span class="fbRemindersTitle"><img class="_s0 fbxWelcomeBoxImg fbxWelcomeBoxProfilePic _54rv img" style="margin-right:3px" src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xla1/v/t1.0-1/c2.2.21.21/p24x24/378268_445329585490073_962515320_n.jpg?oh=3a845781889aee643d11ef0aa5fbfc85&amp;oe=56EC0F11&amp;__gda__=1461497695_da523ffa5905b267498b0c17d8dc0dd9"><strong> drquochoai (thầy)</strong></span></span> </div> </div> </a> </div> </div> </div> </div> </div>')
	
	//Cài đặt lúc đầu
	
	function likeAllInTrangChu(){
		likeBtn = $("div[id^='substream_'] div[data-ft]:not(.bs_hide_tintuc):not(.bs_hide_anh):not(.bs_hide_PostToGroup) .UFILikeLink[data-testid='fb-ufi-likelink']:not(.bs_liked), div[id^='mall_post_'] div[data-gt] .UFILikeLink[data-testid='fb-ufi-likelink']:not(.bs_liked)").first()
		timeClick = timeNextF(1300,4000)
		likeAllTimeout = setTimeout(function(){
			clickLink(likeBtn)
			try {
				$('html, body').animate({
					scrollTop: likeBtn.closest("div[data-ft]").offset().top-60
				}, 400);
				setTimeout(function(){
					hideKeepHeight = $("div[data-ft]").first()
					hideKeepHeight.before('<div style="height: '+hideKeepHeight.height()+'px"></div>');
					hideKeepHeight.remove()
				}, timeNextF(1300,4000))
				
			}
			catch(err) {
				
			}
			likeBtn.addClass("bs_liked")
			likeAllInTrangChu()
		}, timeClick)
	}
	
	function TreoMay(){
		chrome.storage.local.get("bs_facebook_tool", function(re){
			if(!re.bs_facebook_tool.bs_trangchu_ThichTatca){
				$('input[data-localStorage="ThichTatca"]').trigger("click")
			}
			if( window.location.href != "https://www.facebook.com/?sk=h_chr"){
				window.location.assign("https://www.facebook.com/?sk=h_chr")
			}
			$('input[data-localStorage="TuExpand"]').trigger("click")
			TreoMayTimeOut = setTimeout(function(){
				window.location.reload()
			}, 20000)
		})
	}
	
	 function intervalFunction(re){
		bs_count_tuexpand = 0
		$("#bs_caidat_all input").each(function(){
			_this = $(this)
			stor_name = "bs_trangchu_"+_this.attr("data-localStorage")
			data = re.bs_facebook_tool[stor_name] || false;
			_this.prop("checked", data)
		})
		setInterval(function(){
				chrome.storage.local.get("bs_facebook_tool", function(re){
					if(re.bs_facebook_tool.bs_trangchu_hideSponsore){
						$("div[id^='substream_'] div[data-ft][data-xt-vimp]").remove()
					}
					if(re.bs_facebook_tool.bs_trangchu_hideAnh){
						$("div[id^='substream_'] div[data-ft]:has(.uiScaledImageContainer)").addClass("bs_hide_anh")
					} else {
						$(".bs_hide_anh").removeClass("bs_hide_anh")
					}
					if(re.bs_facebook_tool.bs_trangchu_hideTintuc){
						//Xóa hết ảnh thường, chỉ hiện ảnh của albums hoặc tin tức
						$("div[id^='substream_'] div[data-ft]:has(.fbStoryAttachmentImage)").addClass("bs_hide_tintuc")
					} else {
						$(".bs_hide_tintuc").removeClass("bs_hide_tintuc")
					}
					if(re.bs_facebook_tool.bs_trangchu_hideVideo){
						$("div[id^='substream_'] div[data-ft]:has(video)").remove()
					}
					if(re.bs_facebook_tool.bs_trangchu_hideChiase){
						$("div[id^='substream_'] div[data-ft]:has(.uiLikePageButton)").remove()
					}
					if(re.bs_facebook_tool.bs_trangchu_StatusThuanTuy){
						$("div[data-ft]").each(function(){
							if($(this).find("div[data-ft='{\"tn\":\"H\"}']").height() > 0){
								$(this).addClass("bs_hide_statusthuantuy")
							}
						})
					} else {
						$(".bs_hide_statusthuantuy").removeClass("bs_hide_statusthuantuy")
					}
					
					if(re.bs_facebook_tool.bs_trangchu_PostToGroup){
						$("div[id^='substream_'] div[data-ft]").each(function(){
							if($(this).find("a[href^='/groups/']").length > 0){
								$(this).addClass("bs_hide_PostToGroup")
							}
						})
					} else {
						$(".bs_hide_PostToGroup").removeClass("bs_hide_PostToGroup")
					}
					
					if(re.bs_facebook_tool.bs_trangchu_TuExpand){
						if(bs_count_tuexpand%2 == 0 && bs_count_tuexpand <= 8){
							$("div[id^='more_pager_pagelet_'] .fsxl.fcg").trigger("click")
							bs_count_tuexpand++
						} else {
							re.bs_facebook_tool.bs_trangchu_TuExpand = false;
							chrome.storage.local.set(re)
							$('#bs_caidat_all input[data-localStorage="TuExpand"]').prop("checked", false)
							bs_count_tuexpand = 0
						}
					}
					if(re.bs_facebook_tool.bs_trangchu_ThichTatca ){
						if (typeof(likeAllTimeout) == "undefined") likeAllInTrangChu()
					} else {
						if (typeof(likeAllTimeout) != "undefined") {
							clearTimeout(likeAllTimeout)
							delete likeAllTimeout
						}
					}
					
					if(re.bs_facebook_tool.bs_trangchu_TreoMay ){
						if (typeof(TreoMayTimeOut) == "undefined") TreoMay()
					} else {
						if (typeof(TreoMayTimeOut) != "undefined") {
						clearTimeout(TreoMayTimeOut)
						delete TreoMayTimeOut
						}
					}
				})
			}, 400)
	}
	chrome.storage.local.get("bs_facebook_tool", function(re){
		if(typeof re.bs_facebook_tool == "undefined"){
			re.bs_facebook_tool={}
			re.bs_facebook_tool.bs_trangchu_hideSponsore = true
			re.bs_facebook_tool.bs_trangchu_hideVideo = true
			chrome.storage.local.set(re, function(){
				intervalFunction(re)
			})
		} else intervalFunction(re)
	})
	
	//Cài đặt thay đổi trong input
		$("#bs_caidat_all input").change(function(){
			_this = $(this)
			chrome.storage.local.get("bs_facebook_tool", function(re){
				re.bs_facebook_tool["bs_trangchu_"+_this.attr("data-localStorage")] = _this.prop("checked")
				chrome.storage.local.set(re)
			})
		})
	//Cài đặt thay đổi trong input
	$("#bs_caidat_all label").click(function(){
		$(this).prev("input").trigger("click")
	})
		

}
function in_media_set(){
	$("body").append('<ul class="uiList mhm mtm _4kg _6-h _704 _6-i _4-u2 mvm _495i _4-u8" id="bs_caidat_all" ><li><a id="bs_hientatca">Hiện tất cả ảnh của album<span id="bs_total"></span></a></li>    <li><a id="bs_thichtatca">Thích tất cả ảnh hiện có<span class="bs_total_thichtatca"></span></a></li>    <li><a id="bs_bothichtatca">Bỏ thích tất cả ảnh <span class="bs_total_bothichtatca"></span></a></li>    <li><a id="bs_thichAlbum">Thích album</a></li>    <li><a id="bs_downloadAlbum">Tải Album (HD)</a></li></ul>')
		$("#bs_caidat_all").css({"z-index": "9999"})
		$("#bs_total").text('('+ $("#fbTimelinePhotosContent ._53s.fbPhotoCurationControlWrapper.fbPhotoStarGridElement").length +' ảnh)')
		//Hiện tất cả các nhóm
		updateThichAlbum = function(){
			$(".UIActionLinks.UIActionLinks_bottom a").each(function(){
				if($(this).text().trim().toLowerCase() == lang["Like"]){
					$("#bs_thichAlbum").text("Thích Album")
				} else if($(this).text().trim().toLowerCase() == lang["Unlike"]){
					$("#bs_thichAlbum").text("Bỏ thích Album")
				}
			})
		}
		setTimeout(function(){updateThichAlbum()}, 1000)
	$("#bs_hientatca").click(function(){
			if($(this).text().indexOf("Dừng") > -1){
				if(typeof(timeout) != "undefined"){clearTimeout(timeout)}
				$(".bs_dung, .bs_loading").remove()
				return false;
			}
			$(this).prepend(cons.loadingImg)
			$(this).append("<span class='bs_dung'> - Dừng</span>")
			timeToOut = 1000;
			hientatcaanh = function(){
				if($("#album_feedback_pagelet").length == 0){
					scrollToWhat = $("._51m-.vTop.lastChild._51mw").last()
				} else {
					scrollToWhat = $("#album_feedback_pagelet")
				}
				$('html, body').animate({
					  scrollTop: scrollToWhat.offset().top-100
				 }, 500, "swing", function(){
					tonganhsau = $("#fbTimelinePhotosContent ._53s.fbPhotoCurationControlWrapper.fbPhotoStarGridElement").length
					if(tonganhsau>280){timeToOut = 2000}
					$("#bs_total").text('('+ tonganhsau +' ảnh)')
					if(typeof(timeout) != "undefined"){clearTimeout(timeout)}
					timeout = setTimeout(function(){
						if( isScrolledIntoView(scrollToWhat) ){
							$(".bs_loading, .bs_dung").remove()
							$('html, body').animate({
								  scrollTop: scrollToWhat.offset().top-500
							 }, 500)
						} else {
							hientatcaanh()
						}
					}, timeToOut)
				 });
			 }
			 hientatcaanh()
		})
		
	$("#bs_thichtatca").click(function(){
		timeThich = 0
		allAnh = $("#fbTimelinePhotosContent ._53s.fbPhotoCurationControlWrapper.fbPhotoStarGridElement")
		soanhhientai = 0
		intervalLikeAnh = setInterval(function(){
			timeThich = timeNextF(1000,5000)
			$(".bs_total_thichtatca").text('('+soanhhientai+'/'+allAnh.length+')')
			if(soanhhientai >= allAnh.length){
				clearInterval(intervalLikeAnh)
				return false;
			}
			anhhientai = $(allAnh[soanhhientai])
			if(anhhientai.has("._53a").length > 0) {
				soanhhientai++
				return false;
			}
			anhhientai.find("a._5glz._53o._53b").each(function(){
				if($(this).text().trim().toLowerCase() == lang["Like"]){
					clickLink($(this))
				}
			})
			soanhhientai++
		}, timeThich)
	})
	
	$("#bs_bothichtatca").click(function(){
		allAnh = $("#fbTimelinePhotosContent ._53s.fbPhotoCurationControlWrapper.fbPhotoStarGridElement")
		soanhhientai = 0
		intervalLikeAnh = setInterval(function(){
			$(".bs_total_bothichtatca").text('('+soanhhientai+'/'+allAnh.length+')')
			if(soanhhientai >= allAnh.length){
				clearInterval(intervalLikeAnh)
				return false;
			}
			anhhientai = $(allAnh[soanhhientai])
			anhhientai.find("._53a a._5glz._53p._53b").each(function(){
				if($(this).text().trim().toLowerCase() == lang["Unlike"]){
					clickLink($(this))
				}
			})
			soanhhientai++
		}, 100)
	})
	//Thích album
	$("#bs_thichAlbum").click(function(){
		$(".UIActionLinks.UIActionLinks_bottom a").each(function(){
			if($(this).text().trim().toLowerCase() == lang["Like"]){
				clickLink($(this))
			} else if($(this).text().trim().toLowerCase() == lang["Unlike"]){
				clickLink($(this))
			}
			updateThichAlbum()
		})
	})
	//Tải album
	$("#bs_downloadAlbum").click(function(){
		ok = confirm("Tính năng này sẽ tải xuống toàn bộ hình ảnh đang hiển thị trong album này.\nBạn nên chọn \"Hiện tất cả\" ảnh trong album trước khi thực hiện tính năng này.\n\nBạn muốn tải "+$("#fbTimelinePhotosContent ._53s.fbPhotoCurationControlWrapper.fbPhotoStarGridElement").length+" ảnh?")
		if(ok){
			downloadAlbum()
		}
	})
}
function in_personalPage(){
	$("body").append('<ul class="uiList mhm mtm _4kg _6-h _704 _6-i _4-u2 mvm _495i _4-u8" id="bs_caidat_all" >    <li><a id="bs_thichtatca_cua">Thích những bài đăng bởi <span class="bs_pageAuthorName" style="font-weight:bold"></span> <span class="bs_total_thichtatca_cua"></span></a></li>    <li><a id="bs_thichtatca">Thích tất cả bài đăng<span class="bs_total_thichtatca"></span></a></li>    <li><a id="bs_bothichtatca">Bỏ thích tất cả bài đăng <span class="bs_total_bothichtatca"></span></a></li>    </ul>')
	$(".bs_pageAuthorName").text($('#fb-timeline-cover-name').text().trim())
	setName = setInterval(function(){
		if($(".bs_pageAuthorName").text() == ""){
			$(".bs_pageAuthorName").text($('#fb-timeline-cover-name').text().trim())
		} else {
			clearInterval(setName)
		}
	}, 1000)
	$("#bs_thichtatca_cua").click(function(){
		sttE = 0
		timeNext = 0
		function likeAll(){
			timeoutLike = setTimeout(function(){
				allE = $("div[id^='tl_unit_']")
				clearTimeout(timeoutLike)
				timeNext=timeNextF(700)
				$(".bs_total_thichtatca_cua").text('('+sttE+'/'+allE.length+')')
				if(sttE >= allE.length){
					return false;
				}
				curE = $(allE[sttE])
				if(curE.find(".profileLink").text().trim() == $('#fb-timeline-cover-name').text().trim().replace(/\s\(.*\)/g,"") || curE.find(".profileLink").text().trim() == ""){
					curE = $(allE[sttE]).find(".UFILikeLink")
					clickLink(curE)
				}
				$('html, body').animate({
					  scrollTop: curE.offset().top-200
				 }, 500)
				sttE++
				likeAll()
			}, timeNext)
		}
		likeAll()
	})
	
	$("#bs_thichtatca").click(function(){
		sttE = 0
		timeNext = 0
		function likeAll(){
			timeoutLike = setTimeout(function(){
				allE = $("div[id^='tl_unit_']")
				clearTimeout(timeoutLike)
				timeNext=timeNextF(700)
				$(".bs_total_thichtatca").text('('+sttE+'/'+allE.length+')')
				if(sttE >= allE.length){
					return false;
				}
				curE = $(allE[sttE]).find(".UFILikeLink")
				clickLink(curE)
				sttE++
				$('html, body').animate({
					  scrollTop: curE.offset().top-200
				 }, 500)
				likeAll()
			}, timeNext)
		}
		likeAll()
	})
	
	$("#bs_bothichtatca").click(function(){
		allE = $("div[id^='tl_unit_']")
		sttE = 0
		function likeAll(){
			timeoutLike = setTimeout(function(){
				clearTimeout(timeoutLike)
				$(".bs_total_bothichtatca").text('('+sttE+'/'+allE.length+')')
				if(sttE >= allE.length){
					return false;
				}
				curE = $(allE[sttE]).find(".UFILikeLink")
				clickLink(curE)
				sttE++
				likeAll()
			}, 100)
		}
		likeAll()
	})
}
function in_singlePostPage(){
	$("body").append('<ul class="uiList mhm mtm _4kg _6-h _704 _6-i _4-u2 mvm _495i _4-u8" id="bs_caidat_all" >    <li><a id="bs_thichtatca">Thích tất cả bài đăng <span class="bs_total_thichtatca"></span></a></li>    <li><a id="bs_bothichtatca">Bỏ thích tất cả bài đăng <span class="bs_total_bothichtatca"></span></a></li>    </ul>')
	$("#bs_thichtatca").click(function(){
		allE = $("#stream_pagelet .UFIRow.UFIComment")
		sttE = 0
		function likeAll(){
			timeoutLike = setTimeout(function(){
				clearTimeout(timeoutLike)
				$(".bs_total_thichtatca").text('('+sttE+'/'+allE.length+')')
				if(sttE >= allE.length){
					return false;
				}
				curE = $(allE[sttE]).find(".UFILikeLink[title='"+lang["Like this comment"]+"']")
				//clickLink(curE)
				curE.append("sadfas")
				sttE++
				likeAll()
			}, Math.floor(((Math.random() * 2) )*400))
		}
		likeAll()
	})
	
	$("#bs_bothichtatca").click(function(){
		allE = $("#stream_pagelet .UFIRow.UFIComment")
		sttE = 0
		function likeAll(){
			timeoutLike = setTimeout(function(){
				clearTimeout(timeoutLike)
				$(".bs_total_bothichtatca").text('('+sttE+'/'+allE.length+')')
				if(sttE >= allE.length){
					return false;
				}
				curE = $(allE[sttE]).find(".UFILikeLink[title='"+lang["Unlike this comment"]+"']")
				clickLink(curE)
				sttE++
				likeAll()
			}, 100)
		}
		likeAll()
	})
}
function in_friendsRequest(){
	$("body").append('<ul class="uiList mhm mtm _4kg _6-h _704 _6-i _4-u2 mvm _495i _4-u8" id="bs_caidat_all" ><li class="fwb">MỤC "Lời mời kết bạn"</li>    <li><a id="bs_hientatca">Hiện tất cả mời mời kết bạn <span class="bs_total_loimoi"></span></a></li>    <li><a id="bs_chapnhantatca">Chấp nhận tất cả <span class="bs_total_chapnhan"></span></a></li>     <li><a id="bs_xoatatca">Xóa hết Yêu cầu kết bạn <span class="bs_total_xoatatca"></span></a></li>    <li class="fwb">MỤC "Những người bạn có thể biết"</li>     <li><a id="bs_bancobiet_themtatca">Thêm bạn tất cả <span class="bs_total_bancobiet_themtatca"></span></a></li>    <li><a id="bs_bancobiet_xoatatca">Xóa tất cả <span class="bs_total_bancobiet_xoatatca"></span></a></li>     </ul>')
	//Hiện tất cả các nhóm
		$("#bs_hientatca").click(function(){
			$(this).prepend(cons.loadingImg)
			$(this).off()
			intervalClick = setInterval(function(){
				$(".bs_total_loimoi").text('('+$(".phl").find("div.clearfix.ruUserBox._3-z").length+' bạn)')
				if($("#FriendRequestMorePager a.uiMorePagerPrimary").length > 0){
					clickLink($("#FriendRequestMorePager a.uiMorePagerPrimary"))
				} else {
					$(".bs_loading").remove()
					clearInterval(intervalClick);
				}
			}, 500);
		})
	//Chấp nhận tất cả
		$("#bs_chapnhantatca").click(function(){
			$(this).prepend(cons.loadingImg)
			nextTime = 0
			sttE = 0
			allE = $(".ruResponseButtons")
			function timeoutFunc(){
				$(".bs_total_chapnhan").text('('+(sttE)+'/'+allE.length+')')
				timeoutF = setTimeout(function(){
					if(sttE >= allE.length){
						$(".bs_loading").remove()
						return false;
					}
					nextTime = timeNextF(200)
					thisE = $(allE[sttE]).find("button:first")
					$('html, body').animate({
						  scrollTop: thisE.offset().top-120
					 }, 500)
					if( thisE.text().trim().toLowerCase() == lang["Confirm"]){
							thisE.trigger("click")
					}
					sttE++
					timeoutFunc()
				},nextTime)
			}
			timeoutFunc()
		})
	//Xóa hết tất cả yêu cầu kết bạn
		$("#bs_xoatatca").click(function(){
			var r = confirm("Tran Quoc Hoai: Nếu bạn đồng ý, tôi sẽ miễn cưỡng xóa toàn bộ yêu cầu kết bạn giúp bạn. Tình bạn có thể sẽ đẹp hơn nếu bạn cho người khác một cơ hội, và nhất là những người đã mở lòng và muốn làm bạn thật sự với bạn.\nBi, bạn nỡ tuyệt tình đến thế sao?");
			if (r == true) {
					$(this).prepend(cons.loadingImg)
					nextTime = 0
					sttE = 0
					allE = $(".ruResponseButtons")
					function timeoutFunc(){
						$(".bs_total_xoatatca").text('('+(sttE)+'/'+allE.length+')')
						timeoutF = setTimeout(function(){
							if(sttE >= allE.length){
								$(".bs_loading").remove()
								return false;
							}
							nextTime = timeNextF(100, 500)
							thisE = $(allE[sttE]).find("button:last")
							$('html, body').animate({
								  scrollTop: thisE.offset().top-120
							 }, 500)
							if( thisE.text().trim().toLowerCase() == lang["Delete Request"]){
								thisE.trigger("click")
							}
							sttE++
							timeoutFunc()
						},nextTime)
					}
					timeoutFunc()
			}
		})
	//Thêm bạn tất cả
		$("#bs_bancobiet_themtatca").click(function(){
			$(this).prepend(cons.loadingImg)
			nextTime = 0
			sttE = 0
			function timeoutFunc(){
				allE = $(".friendBrowserListUnit .FriendButton")
				$(".bs_total_bancobiet_themtatca").text('('+(sttE)+'/'+allE.length+')')
				timeoutF = setTimeout(function(){
					if(sttE >= allE.length){
						$(".bs_loading").remove()
						return false;
					}
					nextTime = timeNextF(1000, 5000)
					thisE = $(allE[sttE]).find("button:first")
					$('html, body').animate({
						  scrollTop: thisE.offset().top-120
					 }, 700)
					 console.log(thisE.text().trim().toLowerCase())
					if( thisE.text().trim().toLowerCase() == lang["Add friend"]){
						thisE.trigger("click")
					}
					sttE++
					timeoutFunc()
				},nextTime)
			}
			timeoutFunc()
		})
		//Xóa hết tất cả gợi ý kết bạn
		$("#bs_bancobiet_xoatatca").click(function(){
			var r = confirm("Tran Quoc Hoai: tình bạn sẽ chỉ đến một lần, nếu bạn xóa tất cả, bạn sẽ khó có thể gặp lại những người bạn đầy hứa hẹn này, tôi nghĩ bạn nên mở lòng và nhanh chóng nắm bắt cơ hội này để mở rộng các mối quan hệ của mình.\nBạn muốn bỏ lỡ các cơ hội này?");
			if (r == true) {
					$(this).prepend(cons.loadingImg)
					nextTime = 0
					sttE = 0
					allE = $(".friendBrowserListUnit .friendBrowserAddAsFriend")
					function timeoutFunc(){
						$(".bs_total_bancobiet_xoatatca").text('('+(sttE)+'/'+allE.length+')')
						timeoutF = setTimeout(function(){
							if(sttE >= allE.length){
								$(".bs_loading").remove()
								return false;
							}
							nextTime = timeNextF(100, 500)
							thisE = $(allE[sttE]).find("a:first")
							$('html, body').animate({
								  scrollTop: thisE.offset().top-120
							 }, 200)
							 console.log(thisE.text().trim().toLowerCase())
							if( thisE.text().trim().toLowerCase() == lang["Remove"]){
								clickLink(thisE)
							}
							sttE++
							timeoutFunc()
						},nextTime)
					}
					timeoutFunc()
			}
		})
}
function in_friendsManager(){
	
	$("body").append('<ul class="uiList mhm mtm _4kg _6-h _704 _6-i _4-u2 mvm _495i _4-u8" id="bs_caidat_all" ><li  class="fwb">Nhấp vào khoảng trống để chọn bạn</li><li class="fwb" style="font-size:90%; color:rgba(88, 144, 255, 0.33); margin-top:-6px">(màu xanh là đã chọn)</li>   <li><a id="bs_copyselect">Tải chọn từ bộ nhớ</a></li>   <li><a id="bs_invert">Đảo chọn <span class="bs_invert_total"></span></a></li>    <li><a id="bs_deleteselect">Bỏ chọn</a> - <a id="bs_rawdeleteselect">Xóa bộ nhớ chọn</a></li>   <li class="fwb">--- Với các bạn đã chọn ---</li>    <li><a id="bs_hientatca">Hiện tất cả bạn <span class="bs_hientatca_total"></span></a></li>     <li><a id="bs_thembanthan">Thêm vào nhóm <b>Bạn thân</b> <span class="bs_invert_total bs_thembanthan_total"></span></a></li>      <li><a id="bs_xoaban">Xóa tình bạn <span class="bs_xoaban_total bs_invert_total"></span></a></li>     <li class="fwb">--- Xuất bạn ra Excel (chưa làm)---</li>    <li><a id="bs_export_select">Xuất các bạn <b>đã chọn</b> <span class="bs_export_select_total"></span></a></li>    <li><a id="bs_export_all">Xuất <b>tất cả bạn</b> <span class="bs_export_all_total"></span></a></li></ul>')
	bs_tongsobanhienco =  Number($("#fbTimelineHeadline a._6-6._6-7 ._gs6").text().trim().replace(",", ""))
	$('.bs_hientatca_total').text('('+$("li._698").length+'/'+ bs_tongsobanhienco +')')
	
	function copySelected(){
		chrome.storage.local.get("bs_facebook_tool", function(re){
			bs_selectedFriend = re.bs_facebook_tool.bs_selectedFriend
			if (bs_selectedFriend.length != "undefined"){
				$.each(bs_selectedFriend, function(i,v){
					$("li._698").has('.uiProfileBlockContent a[href="'+bs_selectedFriend[i]+'"]').addClass("friends_select")
				})
			}
		})
	}
	
	if($(document).data("okli698") != "1"){
		if(typeof(localStorage["bs_selectedFriend"]) == "undefined"){
			localStorage["bs_selectedFriend"] = "[]"
		}
		copySelected()
		$(document).on("mouseover", "li._698", function(){
			$(this).addClass("friends_hover")
		})
		$(document).on("mouseout", "li._698", function(){
			$(this).removeClass("friends_hover")
		})
		$(document).on("click", "li._698", function(){
			_this = $(this)
			if(_this.hasClass("friends_select")){
				_this.removeClass("friends_select")
			} else {
				_this.addClass("friends_select")
			}
			
			chrome.storage.local.get("bs_facebook_tool", function(re){
				bs_selectedFriend = re.bs_facebook_tool.bs_selectedFriend || []
				thisUser = _this.find(".uiProfileBlockContent a[data-hovercard^='/ajax/hovercard/user.php?id=']").attr("href")
				if(bs_selectedFriend.indexOf(thisUser) > -1 && !_this.hasClass("friends_select")){
					bs_selectedFriend.splice(bs_selectedFriend.indexOf(thisUser), 1)
				} else {
					bs_selectedFriend.push(thisUser)
				}
				re.bs_facebook_tool.bs_selectedFriend = bs_selectedFriend
				chrome.storage.local.set(re)
			})
			
		})
		$(document).data("okli698", "1")
	}
	
	//Hiện tất cả
	$("#bs_hientatca").off().click(function(){
		if(typeof(showallsetInterval) != "undefined"){
			$(".bs_loading, .bs_nhapdedung").remove()
			for(i=1; i<=50; i++){
				clearInterval(showallsetInterval)
				delete window.showallsetInterval;
			}
		} else {
			$(this).prepend(cons.loadingImg)
			$(this).append("<span class='bs_nhapdedung'> - Nhấp để dừng</span>")
			timeToOut = 700;
			hientatcaanh = function(){
				$('html, body').animate({
					  scrollTop: $(document).height()
				 }, 500, "swing", function(){
					if(typeof(showallsetInterval) != "undefined") clearInterval(showallsetInterval)
					showallsetInterval = setInterval(function(){
						bandahienthi = $("li._698").length
						$(".bs_hientatca_total").text('('+ bandahienthi +'/'+ bs_tongsobanhienco +')')
						if(bandahienthi == bs_tongsobanhienco){
							$(".bs_loading").remove()
							clearInterval(showallsetInterval)
						} else {
							hientatcaanh()
						}
					}, timeToOut)
				 });
			 }
			 hientatcaanh()
		}
	})
	//Đảo chọn lại
	$("#bs_invert").off().click(function(){
		$("li._698").not(".friends_select").addClass("friends_select_temp")
		$(".friends_select").removeClass("friends_select")
		$(".friends_select_temp").addClass("friends_select")
		$(".friends_select_temp").removeClass("friends_select_temp")
		$(".bs_invert_total").text("("+$(".friends_select").length+" bạn)")
	})
	//Copy lần chọn trước
	$("#bs_copyselect").off().click(function(){
		copySelected()
	})
	//Đảo chọn lại
	$("#bs_deleteselect").off().click(function(){
		$(".friends_select").removeClass("friends_select")
	})
	$("#bs_rawdeleteselect").off().click(function(){
		$(".friends_select").removeClass("friends_select")
		chrome.storage.local.get("bs_facebook_tool", function(re){
			re.bs_facebook_tool.bs_selectedFriend = []
			chrome.storage.local.set(re)
		})
	})
	//Thêm vào nhóm bạn thân
	$("#bs_thembanthan").off().click(function(){
			$(".bs_okroi").removeClass("bs_okroi")
			function themnhombanthan(){
				current_group = $(".friends_select").not(".bs_okroi").first()
				if(current_group.length == 0 ){return false;}
				if(current_group.find(".FriendRequestFriends.friendButton.enableFriendListFlyout").text().trim().toLowerCase() != lang["Friends"] ){
					current_group.find(".FriendRequestFriends.friendButton.enableFriendListFlyout i").trigger("click")
					setTimeout(function(){
						$("#friendFlyoutContent .FriendListItem a").each(function(i,v){
							if($(this).text().trim().toLowerCase() == lang["Close friends"] && $(this).attr("aria-checked") != "true"){
								clickLink($(this))
								current_group.addClass("bs_okroi")
								themnhombanthan()
							}
						})
					}, 500)
				} else {
					current_group.addClass("bs_okroi")
					themnhombanthan()
				}
			}
			themnhombanthan()
	})
	//Xóa bạn
	$("#bs_xoaban").off().click(function(){
		ok = confirm("Bạn có thật sự muốn cắt đứt những mối quan hệ này?\nMột khi hành động này diễn ra là những người bạn ấy có thể sẽ rời xa bạn mãi mãi, cuộc chia ly không diễn ra trực tiếp trước mắt bạn nhưng ở đâu đó có một nỗi buồn khôn xiết, một tình bạn đẹp có thể được gầy dựng dựa trên một chút sự quan tâm và một ít chia sẽ cùng nhau.\nBạn vẫn muốn tiếp tục xóa chứ?")
		if(ok){
			function xoaketban(){
				current_group = $(".friends_select").not(".bs_okroi").first()
				if(current_group.length == 0 ){return false;}
				if(current_group.find(".FriendRequestFriends.friendButton.enableFriendListFlyout").text().trim().toLowerCase() != lang["Friends"] ){
					current_group.find(".FriendRequestFriends.friendButton.enableFriendListFlyout i").trigger("click")
					setTimeout(function(){
						$("#friendFlyoutContent .uiMenuItem.FriendListUnfriend a").each(function(i,v){
							if($(this).text().trim().toLowerCase() == lang["Unfriend"]){
								clickLink($(this))
								current_group.addClass("bs_okroi")
								xoaketban()
							}
						})
					}, 500)
				} else {
					current_group.addClass("bs_okroi")
					xoaketban()
				}
			}
			xoaketban()
		}
	})
	
}
function in_singleVideoPage(){
	$("body").append('<ul class="uiList mhm mtm _4kg _6-h _704 _6-i _4-u2 mvm _495i _4-u8" id="bs_caidat_all" >    <li><a id="bs_taivideo">Tải video (HD)</a></li></ul>')
	$("#bs_taivideo").click(function(){
		$("i._2bs_.img.sp_UUnDRCevEVi.sx_baa45f").trigger("click")
		name = $("#fbPhotoPageAuthorName").text().trim() + " - "+$("#fbPhotoPageMediaInfo span.fcg:not([id])").text().trim()+" - by bsquochoai.mp4"
		chrome.runtime.sendMessage({ham: "downloadzingmp3", link: $("video").attr("src"), name: name})
	})
}

function downloadAlbum(){
	albumName = $(".fbPhotoAlbumTitle").text().trim()+" - "+ $("#fb-timeline-cover-name").text().trim() + " - "
	$.each($("#fbTimelinePhotosContent ._53s.fbPhotoCurationControlWrapper.fbPhotoStarGridElement"), function(i,v){
		name = albumName+(i+1)+" - by bsquochoai.ga.jpg"
		chrome.runtime.sendMessage({ham: "downloadzingmp3", link: "https://www.facebook.com/photo/download/?fbid="+$(this).data("fbid"), name: name})
	})
}
function isScrolledIntoView(elem){
    var $elem = elem;
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
function clickLink($linkselector){
	$linkselector.append("<button id='bs_temp_click'></button>")
	
	$("#bs_temp_click").trigger("click").remove()
}
function timeNextF(lowlimit, highlimit){
			lowlimit = lowlimit || 700
			highlimit = highlimit || 2000
			thisTime = Math.floor(Math.random()*highlimit)
			if(thisTime<lowlimit){
				return lowlimit
			} else if(thisTime > highlimit){
				return highlimit
			} else {
				return thisTime
			}
		}
function dangStatus(){
	
}