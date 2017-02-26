
var caidat = {
	math : "cộng thêm {value}px",
	pluginfolder: "bsquochoai_plugins/Pageshot_by_hoai/"
}
$(function(){
	//Click lên menu
	menuInit()
	//Update dữ liệu cài đặt
	caidatInit()
	bschrome.init()
})

 function caidatInit(){
		$("[data-caidat][type='range']").mousemove(function(){
			$this = $(this)
			lcs = $this.data("localstorage")
			$("#"+lcs).val(caidat.math.replace(/{value}/g, $this.val()));
			localStorage[lcs] = $this.val()
		})
		$.each($("[data-caidat][type='range']"), function(){
			lcs = $(this).data("localstorage")
			giatri = localStorage[lcs] || $(this).val()
			$(this).val(giatri)
			$("#"+lcs).val(caidat.math.replace(/{value}/g, giatri));
		})
		$("[data-caidat][type='checkbox']").change(function(){
			localStorage[$(this).data("localstorage")] = $(this).prop("checked")
		})
		$.each($("[data-caidat][type='checkbox']"), function(){
			ischecked = (localStorage[$(this).data("localstorage")] === 'true');
			$(this).prop("checked", ischecked )
		})
 }
function menuInit(){
	$("[data-bsquochoai-tab-content]").hide()
		pointer = localStorage["bs_pageshot_lastmenu"] || "#caidat"
		$(pointer).fadeIn(700, "swing")
		if (pointer == "#cachinhdaluu"){
			window["cachinhdaluu"]();
		}
	$("[data-bsquochoai-tab]").click(function(){
		$this = $(this)
		$("[data-bsquochoai-tab-content]").hide()
		pointer = $this.data("open")
		run = $(this).data("run")
		$(pointer).fadeIn(700, "swing")
		localStorage["bs_pageshot_lastmenu"] = pointer
		if ($this.data("run")){
			window[run]();
		}
		return false;
	})
}
function cachinhdaluu(){
	$("#cachinhdaluu .hinh").html('')
	chrome.storage.local.get("bs_pageshot", function(re){
		if(typeof re.bs_pageshot == "undefined"){
			$("#cachinhdaluu .hinh").append("<h1>Em chưa đăng hình ảnh nào lên mạng</h1><p>Hãy sử dụng nút chức năng Đăng ảnh lên server của thầy để lấy link ảnh trực tuyến và <i><b>sẽ không bao giờ bị xóa khỏi internet</b></i> cả.</p><p><img src='"+chrome.runtime.getURL(caidat.pluginfolder+"img/upload.png")+"'></img></p>")
			return false;
		}
		$.each(re.bs_pageshot.links, function(ind, val){
			$("#cachinhdaluu .hinh").prepend('<div class="col-xs-4 "><img class="img-thumbnail" src="'+val.img+'" title="Nhấp vào để copy đường dẫn này"/><div class="button" data-src="'+val.img+'" ><button type="button" class="btn btn-xs copy btn-success">COPY</button> <button type="button" class="btn xem  btn-xs btn-warning">XEM</button></div></div>')
		})
	})
	$("#cachinhdaluu").on("click", ".copy", function(){
		$this = $(this)
		bscopy($this.parent().data("src"))
		$this.text("Đã copy")
		setTimeout(
			function(){
				$this.text("COPY");
			}, 600
		)
	})
	$("#cachinhdaluu").on("click", ".xem", function(){
		chrome.tabs.create({url: $(this).parent().data("src")}, function(){})
	})
}
