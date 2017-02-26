$(function(){
/* template = {
	form: '<form action="" class="sky-form"> <header style="font-size: 20px;padding: 8px 30px;color: #F5CC2A;background-color: black;">Cài đặt VIP HDViet - by <a href="http://bsquochoai.ga" target="_blank" style="color:#F5CC2A">bsquochoai.ga</a></header>  <fieldset> <section> <label class="label">Chất lượng phim mặc định (không phụ thuộc vào cài đặt của player)</label> <div class="row"> <div class="col col-5"> <label class="radio"><input type="radio" name="hdviet_chatluongphim" value="360" ><i></i>360</label> <label class="radio"><input type="radio" name="hdviet_chatluongphim" value="450"><i></i>450</label> <label class="radio"><input type="radio" name="hdviet_chatluongphim" value="mHD"><i></i>mHD</label> </div> <div class="col col-5"> <label class="radio"><input type="radio" name="hdviet_chatluongphim" checked="" value="720"><i></i>HD 720p</label> <label class="radio"><input type="radio" name="hdviet_chatluongphim" value="1080" ><i></i>HD 1080p+</label> </div>  </div> </section>  </fieldset><fieldset><section><label class="label">Cài đặt phụ đề (Subtitles)</label> <div class="inline-group"> <label class="radio"><input type="radio" name="radio-inline" checked="" name="hdviet_phude" value="vi"><i></i>Tiếng việt</label> <label class="radio"><input type="radio" name="radio-inline" name="hdviet_phude" value="en"><i></i>English</label> </div> </section> </fieldset></form>',
	buttonsetup: '<nav class="cir-btn" style="position:fixed; bottom:0px; left:0px; z-index:10001"> <ul class="nav">  <li><a  class="cir-btn-icon-cog" id="bsquochoai_caidat"></a></li> </ul> </nav>'
}
	$("body").append(template.buttonsetup)
	$("#bsquochoai_caidat").data('powertipjq', $(template.form))
	$("#bsquochoai_caidat").powerTip({
		 placement: 'ne',
		 mouseOnToPopup: true
	});
	$('#bsquochoai_caidat').on({
		powerTipOpen: function() {
			$("input[name^='hdviet_']").off().change(function(){
				val= $(this).val()
				name= $(this).attr("name")
				alert(val)
				chrome.runtime.sendMessage({ham: "hdviet",val:val, name: name}, function(re) {});
			})
		}
	}) */
	if (window.location.href.indexOf("bsquochoai=getvideo") != -1){
			getallvideo()
	}
	if (window.location.href.indexOf("bsquochoai=getVideoinfo") != -1){
			AllLinks = []
			$.each(localStorage, function(key, val){
				if(key.indexOf("http://movies.hdviet.com/") == 0){
					AllLinks.push(key)
				}
			})
			getVideoinfo()
	}
	if (window.location.href.indexOf("bsquochoai=createxml") != -1){
			allvideo = []
			i = 0
			$.each(localStorage, function(key, val){
				if(key.indexOf("http://movies.hdviet.com/") == 0 && val.indexOf('{') == 0){
					if(i >= 100){
						
					}
					i = i+1
					allvideo.push(JSON.parse(val))
				}
			})
			console.log(allvideo)
			createXML()
	}
	
	if (window.location.href.indexOf("bsquochoai=getm3u8") != -1){
		alllink = []
		$.each(localStorage, function(key,val){
			if( key.indexOf("http://movies") == 0){
				alllink.push(key)
			}
		})
		getm3u8()
	}
	
	function createXML(){
		myxmlwindow = window.open("","XML")
		$.each(allvideo, function(ind, val){
			noidungbaiviet = "<div class='bsquochoai-seo-title'>Để xem với đầy đủ tính năng VIP của HDViet, em hãy sử dụng Extension <a target='_blank' title='I hate cốc cốc chrome bsquochoai' href='http://www.bsquochoai.ga/2015/08/huong-dan-cai-at-i-hate-coc-coc-tren_18.html'>I hate Cốc Cốc Chrome</a> của thầy</div><br/>"
			noidungbaiviet +=  '<div class="separator" style="clear: both; text-align: center;"><a href="'+val.thumbnails+'" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="'+val.thumbnails+'" /></a></div><br/>'
			noidungbaiviet +=  '<div class="bsquochoai-seo-hdviet">Sau khi đã cài đặt xong I hate cốc cốc, em hãy truy cập vào HD Việt để xem phim <a title="Xem phim online 1080 Full HD - '+escapeHtml(val.title)+' - HDVIET free VIP - Hack vip HDVIET - bsquochoai drquochoai" href="'+val.linkgoc+'"><b>'+val.title+'</b></a>.</div>'
			noidungbaiviet +=  '<div class="bsquochoai-seo-hdvietinfo">'+val.noidung.replace(/\n/g, "<br/>")+"</div>"
			noidungbaiviet +=  '<br><div class="bsquochoai-seo-tags">Xem phim online 1080 Full HD, HDVIET free VIP, Hack vip HDVIET, i hate coc coc, hack vip tienganh123</div>'
			var content="";
							content += "<entry>";
							content += "        <id>tag:blogger.com,1999:blog-426426866888714960.post-2336910807172643453<\/id>";
							content += "        <published>2014-05-21T14:01:00.002+07:00<\/published>";
							content += "        <updated>2014-05-21T14:03:13.113+07:00<\/updated>";
							content += "        <category scheme=\"http:\/\/schemas.google.com\/g\/2005#kind\" term=\"http:\/\/schemas.google.com\/blogger\/2008\/kind#post\" \/>";
							content += "        <category scheme=\"http:\/\/www.blogger.com\/atom\/ns#\" term=\"Dành cho Google\" \/>";
							content += "        <title type=\"text\">Xem phim online 1080 Full HD - "+escapeHtml(val.title)+" - HDVIET free VIP - Hack vip HDVIET<\/title>";
							content += "        <content type=\"html\">"+escapeHtml(noidungbaiviet)+"<\/content>";
							content += "        <link rel=\"replies\" type=\"application\/atom+xml\" href=\"http:\/\/backuptrangchu2.blogspot.com\/feeds\/2336910807172643453\/comments\/default\" title=\"Đăng Nhận xét\" \/>";
							content += "        <link rel=\"replies\" type=\"text\/html\" href=\"http:\/\/backuptrangchu2.blogspot.com\/2015\/08\/saved-link.html#comment-form\" title=\"0 Nhận xét\" \/>";
							content += "        <link rel=\"edit\" type=\"application\/atom+xml\" href=\"https:\/\/www.blogger.com\/feeds\/426426866888714960\/posts\/default\/2336910807172643453\" \/>";
							content += "        <link rel=\"self\" type=\"application\/atom+xml\" href=\"https:\/\/www.blogger.com\/feeds\/426426866888714960\/posts\/default\/2336910807172643453\" \/>";
							content += "        <link rel=\"alternate\" type=\"text\/html\" href=\"http:\/\/backuptrangchu2.blogspot.com\/2015\/08\/saved-link.html\" title=\"saved link\" \/>";
							content += "        <author>";
							content += "            <name>Trần Quốc Hoài<\/name>";
							content += "            <uri>https:\/\/plus.google.com\/105829220521957530878<\/uri>";
							content += "            <email>noreply@blogger.com<\/email>";
							content += "            <gd:image rel=\"http:\/\/schemas.google.com\/g\/2005#thumbnail\" width=\"32\" height=\"32\" src=\"\/\/lh4.googleusercontent.com\/-HF__VPoKqyw\/AAAAAAAAAAI\/AAAAAAAAABA\/xyqpwJZJHcE\/s32-c\/photo.jpg\" \/>";
							content += "        <\/author>";
							content += "        <thr:total>0<\/thr:total>";
							content += "    <\/entry>";
			myxmlwindow.document.write(escapeHtml(content))
		})
		
	}
	
	function getVideoinfo(){
		VideoDango = Number(localStorage.VideoDango) || 0
		totalget = AllLinks.length
		if(VideoDango > totalget){
			return ;
		}
		$.ajax({
			url: AllLinks[VideoDango],
			mydata: {link : AllLinks[VideoDango]},
			success: function(re){
				re= $(re);
				videoinfo = {}
				videoinfo.noidung = re.find("#pn_info").html()
				//videoinfo.noidung = $(videoinfo.noidung).remove(".box_play_star_rating").html()
				videoinfo.title= re.find(".h2-ttl4").html().trim() + " - "+ re.find(".h2-ttl4-name2").html().trim()
				videoinfo.linkgoc= this.mydata.link
				videoinfo.thumbnails = re.find(".sectionplay").find("img").attr("src")
				infostring=JSON.stringify(videoinfo)
				localStorage.setItem(videoinfo.linkgoc, infostring)
				localStorage.VideoDango = VideoDango + 1
				getVideoinfo()
			}
		})
	}
	
	function getallvideo(){
		dango = Number(localStorage.dango) || 1
		//dango = 1
		totalpage = 152
		if (dango > totalpage){
			return false;
		}
		if (dango == 1) {
			url = "http://movies.hdviet.com/phim-au-my.html"
		} else {
			url = "http://movies.hdviet.com/phim-au-my/trang-"+dango+".html"
		}
		console.log(url)
		$.ajax({
			url: url,
			success: function(re){
				re = $(re)
				movitem = re.find(".box-movie-list .mov-item")
				console.log(movitem)
				movitem.each(function(){
					localStorage[$(this).find("a").attr("href")] = "1"
				})
				localStorage.dango = dango+1
				getallvideo()
			}
		})
	}
	function getm3u8(options){
		//{from, end}
		from = Number(localStorage["options.from"]) || 0
		end = Number(localStorage["options.end"]) || alllink.length
		console.log("[[[["+from+"]]]] "+alllink[from])
		$.ajax({
			url: alllink[from],
			success: function(re){
				id = $(re).find(".stars li").data("id")
				link = "http://plist.vn-hd.com/mp4/fb9592d21f933d19740325eb5c215f23/"+id+"_320_1920_vip_ivdc.smil/playlist.m3u8"
				$.ajax({
					url: link,
					success: function(re){
						sublink = re.match(/(https?:\/\/[^\s]+)/g)
						if(sublink == null){
							localStorage["options.error"] = localStorage["options.error"]+","+alllink[from]
							localStorage["options.from"] = from+1
							getm3u8()
							return false;
						}
						chrome.runtime.sendMessage({ham: "hdvietdownload", link: link}, function(re) {})
						$.each(sublink, function(ind, va){
							chrome.runtime.sendMessage({ham: "hdvietdownload", link: va}, function(re) {})
						})
						localStorage["options.from"] = from+1
						localStorage[alllink[from]] = id
						getm3u8()
					},
					error: function(){
						console.log("@@ERROR: "+alllink[from])
						getm3u8()
					}
				})
				//chrome.runtime.sendMessage({ham: "hdvietdownload", link: link}, function(re) {});
				
			}
		})
	}
})
var entityMap = {
    "<": "&lt;",
    ">": "&gt;",
	 "&":"&amp;"
  };

  function escapeHtml(string) {
    return String(string).replace(/[<>&]/g, function (s) {
      return entityMap[s];
    });
  }