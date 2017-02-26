/*\
|*|
|*|
|*|  A bsquochoai.ga complete cookies reader/writer framework with full unicode support.
|*|
|*|  Syntaxes:
|*|
|*|  * bsCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * bsCookies.getItem(name)
|*|  * bsCookies.removeItem(name[, path[, domain]])
|*|  * bsCookies.hasItem(name)
|*|  * bsCookies.keys()
|*|
\*/

var bsCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
/*
 *	Math module Javascript Library
 *	(c)2013 Bui Van Vu FIT-HNUE --- Edited by bsquochoai.ga
 *	@version: 1.0.1 - For OLM CMS
 */

!function(window){
    //@Audio procedures
    var skillImage = function(){
        this.appendTo = function(id, repeat, attr){
            if(!attr) attr = "";
            for(var i = 0 ;i < repeat; i++){ document.getElementById(id).innerHTML += "<img src='"+this.url+"' "+attr+" />"; }
        }
    };

    function effect(){
        $(document.getElementById("parent-node").parentNode).addClass("animated flyLeftOut");
    }
    var CONNECTION_ERROR = "Chúng tôi không kết nối được tới máy chủ OnlineMath vào lúc này, hãy kiểm tra kết nối Internet của bạn hoặc thử lại !";
    var CANNOT_LOAD_SCRIPT = "Có lỗi khi tải kỹ năng này. Hãy thử tải lại trang !"; // invalid token or time out
    var NO_ANSWER = "<h2>Không trả lời.</h2>";
    var CORRECT = 1;
    var WRONG = 0;
    var NOT_ANSWER =2;
    var CF = function(){}

    CF.audioList = [];
    CF.createAudio = function(){
        var onReady = function(){for(var i = 0; i< CF.audioList.length; i++){
            soundManager.createSound(CF.audioList[i]);
        }
        }
        if(soundManager.readyState!= 3){soundManager.onready(function(){ onReady();}); return "";}
        else{
            onReady();
        }
        return "";
    };
    CF.destroyAudio = function(){
        for(var i = 0; i< CF.audioList.length; i++){
            soundManager.destroySound(CF.audioList[i].id);
        }
    };
    CF.audioText = function(string){
        var patt=/\(|\)|\+|\-|\*|\/|\.|,|\?|\'|\"|\?|\!|-|=|\>|\<|\[|\]|\s|:/g; // Remove: ( ) + - * / . , ? " ' ! - = > < [ ] :
        var url = CF.baseUrl() + "skill/loadaudio.php?q=";
        var astring = string.split("_");
        var dstring = astring.join(" ").replace(/#/g,"");
        dstring = dstring.replace(/@/g,"");
        var l = []
        for(var i = 0; i < astring.length; i++){
            var s = astring[i];
            s = CF.viFilter(s).replace(patt,"");
            l.push(s);
        }
        var info  = l.join("+").toLowerCase();
        url +=  encodeURIComponent(info) + "&d="+CF._idQuestion;
        var info2 = l.join("_");
        CF.audioList.push({id: info2, url: url});
        var text = "<h2 class='audiotext'> <span class='audiobtn' onclick='return soundManager.play(\""+info2+"\")'></span> <span class='audiocont'>"+dstring+"</span></h2>";
        return text;
    }

    CF.viFilter = function(str){
        var from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ";
        from += from.toUpperCase();
        var to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
        to+= to.toUpperCase();
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
		
        return str;
    }

    CF.randNext = function(x,y){
        var d = y -x;
        var res = Math.round(Math.random()*d);
        return parseInt(x + res);
    }

    // @Time counting procedure
    CF._time = 0;
    CF._time_count = false;
    CF._time_interval = false;

    function next(){
        Cf._time += 1;
        // display
        var min = parseInt(Cf._time/60);
        var sec = Cf._time%60;
        var htm = ""; htm += min < 10 ? '0' + min : min;
        htm += " : "; htm += sec < 10 ? '0' + sec : sec;
        $('#time').html(htm);
    }
    CF.timecount = function(){
        if(!CF._time_count){
            CF._time_interval = setInterval(next,20000);
				CF._time_interval_deletecookies = setInterval(function(){
					bsCookies.removeItem("prcc", "/")
				},1000);
            CF._time_count = true;
        }
    }

    CF.timestop = function(){
        CF._time = 0;
        clearInterval(CF._time_interval);
        CF._time_count = false;
    }

    // @
    CF._text = ['Tuyệt vời thầy bá đạo quá!', 'Đúng rồi bsquochoai.ga!', 'Xuất sắc Q.Hoài!', 'Rất tốt I hate Cốc Cốc!', 'Chính xác I hate Cốc Cốc!', 'Yeah I hate Cốc Cốc!!!','Giỏi quá I hate Cốc Cốc!', 'Hay quá I hate Cốc Cốc!','Khá lắm I hate Cốc Cốc!'];
    CF._qcount = 1000000;

    // @Render Question Procedures
    // @Parameters
    CF.check = CF.getContent = CF.getExp = CF.getUA = false; // question procedures
    CF._qparams = CF._aparams = false; // parameter
    CF._div = "question"; // div element for render
    CF._idQuestion = 0; // question id
    CF._index = 0; // question index
    CF._mul = 1; //
    CF._exp_elmid = "dlexp_content";

    CF.saveQparams = function(params){CFrame._qparams = params;}
    CF.saveAparams = function(params){CFrame._aparams = params;}

    // Question Rendering
    // @_list: list of questions
    CF._list = [];
    CF.loadScript = function(string){
        var _url = CF.server + 'index.php?g=banner.script';
        $.ajax({
            url: _url,
            data: CF.data,
            cache: false,
            method:'post',
            success: function(string){
                //document.getElementById("error_panel").innerHTML = string;
                eval(string);
                CFrame.play();
                string1 = string.replace(/window.makeQuestion/g,"window.makeQuestionH").replace(/window.getContent/g,"window.getContentH").replace(/window.getUA/g,"window.getUAH").replace(/window.check/g, "window.checkH").replace(/window.getExp/g,"window.getExpH");

                eval(string1);
            },
            error: function(){
                alert(CANNOT_LOAD_SCRIPT);
            }
        });
    }


    // exec the scripts
    CF.play = function(){
        $("#std_btn").show();
        CF.timecount();
        var score = 0; score= CF.getScore();
        var indList = [];
        for(var i = 0; i <  CFrame._list.length; i++ ){
            if(CFrame._list[i].score <= score){
                indList.push(i);
            }
        }
        var index =	indList[CFrame.randNext(0,indList.length-1)];

        CFrame._index = index;
        var Q = CFrame._list[index];
        CFrame._mul = Q.mul > 1 ? Q.mul : 1;
        CFrame._idQuestion = Q.id;
        if(Q.type != 0){
            var func = "makeQuestion"+Q.id+"(false,'question'); CFrame.check = check" + Q.id + "; CFrame.getContent = getContent" + Q.id + "; CFrame.getUA = getUA" + Q.id +"; CFrame.getExp = getExp" + Q.id + ";" ;
            eval(func);
        }else{
            document.getElementById(CFrame._div).innerHTML = "<div class='question' id='olm_xml_skillblock'></div>";
            $.ajax({type: "POST", url : CFrame.server + "?g=content.xml", data: "id="+Q.id, cache: false,
                success: function(string){
							console.log(string)
                    skillBuilder.parseString(string);
                    CFrame.id("question").getElementsByTagName("input")[0].focus();
                },
                error: function(){
                    CFrame.error(CONNECTION_ERROR);
                }
            });
        }
        var inputs = CFrame.id("question").getElementsByTagName("input");
        if(inputs.length > 0){
            inputs[0].focus();
        }
        if($(iPad.selector).length != 0){
            iPad.defaultBehavior();
            $("#btn-ipad").show();
            $("#btn-ipad").popover({
                content: "Ẩn, hiện bàn phím ảo",
                trigger: "hover"
            });
        }else $("#btn-ipad").hide();
		var btn = document.getElementById("btn-done");
        if(btn) btn.onclick = CF.clickEvent;
        this.timecount();
    }

    CF.clickEvent = function(){
        var type = CFrame._list[Cf._index].type;
		  CFrame.data.isG = false
        if (CFrame.data.isG && Cf.getScore()>15) {
           $("#std_btn").html("<div><b style='font-size: 16px; color: red;'>Bạn vui lòng đăng ký tài khoản để học tiếp !</b> <a href='/?l=user.register' class='btn btn-danger'>Đăng ký tài khoản</a></div>");
			if(document.getElementById('olm_modal')) return;
			var div = document.createElement('div'); div.id='olm_modal';
			div.setAttribute('class','modal-bg');
			var content = "<h3>Hãy đăng ký tài khoản để được học tiếp !</h3><p>Sau khi đăng ký tài khoản, bên cạnh việc học toán hiệu quả với nhiều bài toán hơn, bạn còn có thể sử dụng các chức năng của Online Math để đánh giá quá trình học tập, xem lại những bài học mình đã làm và tham gia vào cộng đồng những người sử dụng Online Math</p><a href='/?l=user.register' class='btn btn-primary btn-large'>Đăng ký tài khoản</a> <a class='btn btn-success btn-large' href='javascript:CFrame.closeModal();'>Đóng lại</a>";
			div.innerHTML = "<div class='modal-container'><div class='modal-inner'>"+content+"</div></div>";
			document.body.appendChild(div);
        } else {
            if(type == 1){
                var r = CFrame.check(CFrame._qparams,CFrame._div);
                if(r == 2){ Cf.openNotice(); return false;}
                iPad.remove();
                if(r == 1){
                    Cf.addScore(true);
                    Cf.sendRequest({
                        qparams: JSON.stringify(Cf._qparams),
                        aparams: JSON.stringify(Cf._aparams),
                        time: Cf._time,
                        result : r,
                        id_skill: Cf.data.id,
                        id_script: Cf._idQuestion,
                        id_lop: CFrame.data.id_lop,
                        score: Cf.getScore()
                    });
                    Cf.timestop();Cf.transition();
                }else{
                    Cf.onWrong();
                }
            }else{

                skillBuilder.check();
            }
            return false;
        }
    }
	
	
    CF.onWrong = function(){
        iPad.remove();
        var time = CF._time;
        CF.timestop(); // // stop timer counting
        $("#std_btn").hide();
        var nextbtn = "<a href='#' class='btn btn-primary resumeproc' onclick= 'return CFrame.play();'>Tiếp tục làm bài !</a>";
        var elm = Cf.id("question");
        var htm = "";
        if(Cf._aparams == "[Không trả lời]") htm ="<h1>Bạn đã không trả lời được câu hỏi này, đáp án đúng là:</h1>"; else htm = "<h1>Câu trả lời của bạn chưa chính xác, đáp án đúng là:</h1>";
        htm += "<div id='conts_new' style='padding-left: 5px;'></div><br />"+nextbtn+" <a href='#_exp_header' class='btn btn-success'>Xem gợi ý</a><br /><br />";
        htm += "<div class='box'><h1 class='box-h'>Bài toán:</h1>";
        htm += "<h2 style='color: #0079b2'>Đề bài:</h2><div id='question_new' style='padding-left: 5px;'></div><h2 style='color: #0079b2'>Bạn đã trả lời:</h2>";
        htm += "<div id='us_ans' style='padding-left: 10px;'></div>";
        htm += "</div><br /><br />";
        htm += "<div id='conts_new' style='padding-left: 5px;'></div>";
        htm += "<div id='_exp_header' class='box'><h1 class='box-h'>Hướng dẫn giải:</h1>";
        htm += "<div id='"+CF._exp_elmid+"' style='padding-left: 5px;'></div>";
        htm += "</div><br/>" + nextbtn;
        elm.innerHTML = htm;
        Cf.data.isVip = true
		if (Cf.getScore()>40 && !Cf.data.isVip) {
			document.getElementById(CF._exp_elmid).innerHTML="<p>Muốn xem hướng dẫn giải bài này, bạn cần tài khoản VIP. <a href='/?l=payment.buy' class='btn btn-danger'>Mua VIP</a> <a href='/tin-tuc/Huong-dan-mua-tai-khoan-VIP.html' class='btn'>Hướng dẫn mua VIP</a></p>";
		} else {
			CFrame.getExp(CF._qparams,CF._exp_elmid);
		}
		Cf.addScore(false);
        CFrame.getContent(CF._qparams,'conts_new');
        if(CF._aparams != "[Không trả lời]"){CFrame.getUA(CFrame._qparams,CFrame._aparams,'us_ans')} else $("#us_ans").html(NO_ANSWER);
        eval("makeQuestion"+CF._list[Cf._index].id+"(CFrame._qparams,'question_new');");
        $("#question_new input").each(function(i,e){ e.disabled = "disabled"});

        Cf.sendRequest({
            qparams: JSON.stringify(Cf._qparams),
            aparams: JSON.stringify(Cf._aparams),
            time: time,
            result : 0,
            id_skill: Cf.data.id,
            id_script: Cf._idQuestion,
            id_lop: CFrame.data.id_lop,
            score: Cf.getScore()
        });
        $(".resumeproc").get(0).focus();
    }
	
    CF.transition = function(){
        $("#qcontainer").hide(); _OLM_.id('question').innerHTML = "";
        var text = this._text[this.randNext(0,this._text.length - 1)];
        $("#good").html(text);
        $("#verygood").fadeIn(500).delay(800).fadeOut(800, function(){$("#qcontainer").show(); _OLM_.play();});
    }

    // save
	function onDailyLimited(){
		$("#count_prc").parent().addClass("alert-error");
		$("#std_btn").html('<p  style="font-size: 18px; line-height: 30px;">Bạn đã làm hết số câu hỏi miễn phí trong hôm nay, vui lòng quay lại thực hành vào ngày mai hoặc nâng cấp lên tài khoản VIP của Online Math để tiếp tục thực hành. Tài khoản miễn phí chỉ được làm <b>'+Cf.data.limit+' bài tập trong 1 ngày</b>. <a class="btn btn-danger" href="/?l=payment.buy">Mua tài khoản VIP</a></p>');
	}
	
    CF.sendRequest = CF.save = function(_data, _callback){
        $.ajax(CF.server + "index.php?g=math.save",{type:'POST', data: _data,
            success: function(s){ if(s != "OK")
            {
				if(s == "LOGOUT_BY_OUTHER_USER"){ s= "Bạn đã bị đăng xuất khỏi Online Math. Tài khoản của bạn đã được máy tính khác sử dụng để đăng nhập. OnlineMath không cho phép một tài khoản sử dụng <b>cùng một lúc trên 2 máy tính</b>."; 
					CF.data.isG =false; CF.data.isVip = true; 
					$("#vipstyle").remove();
					setTimeout(function(){
						location.reload();
					}, 10000);
				}
				
				
                CFrame.error(s);
                //		console.log(s);
            }
            },
            error: function(){ CFrame.error(CONNECTION_ERROR); }});
    }
    ///////

    CF.baseSiteUrl = function(){ return CF.server;}
    CF.getScore = function(){ return parseInt(document.getElementById('score_input').value*2);} //@@bsquochoai Sửa điểm
    CF.bonus = function(count, e){
        html = "";
        for(var i =0; i< count; i++){ html += "<img src='" + this.server + "images/star.png' class='bonus-star' />";}
        e.innerHTML = html;
    }
    CF.closeModal = function(){
        $("#olm_modal").remove();

    }
    CF.error = function(e){ $("#error_panel").html("<p class='alert alert-error'> <button type='button' class='close' data-dismiss='alert'>&times;</button>"+e+"</p>");}
    CF.ignore = function(){ this.closeModal(); this._aparams = "[Không trả lời]";
        var type = CFrame._list[Cf._index].type;
        if(type == 1) this.onWrong(); else{
            skillBuilder.onWrong(Cf._aparams);
        }

    }

    CF.openNotice = function(){
        if(document.getElementById('olm_modal')) return;
        var div = document.createElement('div'); div.id='olm_modal';
        div.setAttribute('class','modal-bg');
        var content = "<h1>Bạn còn chưa trả lời câu hỏi !</h1><p>Nếu thấy quá khó, hãy bỏ qua và làm câu tiếp theo.</p><button class='btn btn-primary' onclick='_OLM_.closeModal();'>Đóng lại và tiếp tục</button> <button onclick='_OLM_.ignore();'class='btn btn-danger'>Bỏ qua câu này</button>";
        div.innerHTML = "<div class='modal-container'><div class='modal-inner'>"+content+"</div></div>";
        document.body.appendChild(div);
    }
    CF.history = [];
    // load tmp practice history
    CF.loadHistory = function(){
        function createHistory(elm, data, flag){
            // get the script type
            var type = 1;
            for(var i = 0; i< CFrame._list.length; i++){
                if(CFrame._list[i].id == data.ids){
                    type =CFrame._list[i].type;
                }
            }
            var toolbar = "<div style='text-align: center; padding-top: 5px;'><button class='btn btn-primary' onclick='Cf.loadHistory.back();'>← Trước</button> <div class='btn-group'><a href='#question-history' onclick='CFrame.loadHistory.header(0);' class='btn'>Câu hỏi</a><a onclick='CFrame.loadHistory.header(1);' class='btn' href='#ua-history'>Trả lời</a><a href='#ct-history' onclick='CFrame.loadHistory.header(2);' class='btn'>Đáp án đúng</a> </div> <button  onclick='Cf.closeModal();' class='btn btn-danger'>Đóng</button> <button onclick='Cf.loadHistory.next();' class='btn btn-primary'>Sau →</button></div>";
            var html = "<span class='close' onclick='CFrame.closeModal();'>&times;</span><h3 style='margin: 3px 0px; color: red;'>Lịch sử thực hành</h3><div class='' style='height: 520px; border: 1px solid #999; overflow-y: auto;'><h3 class='htr-h'>Câu hỏi: ("+data.date_prc+")</h3><div class='htr-block' id='question-history'></div><h3 class='htr-h'>Bạn đã trả lời:</h3><div class='htr-block' id='ua-history'></div><h3 class='htr-h'>Đáp án đúng:</h3><div class='htr-block' id='ct-history'></div></div></div>"+toolbar;
            elm.innerHTML = html;
            if(type == 1){
                data.qparams = JSON.parse(data.q_params);
                data.aparams = JSON.parse(data.a_params);
                var code = "makeQuestionH"+data.ids+"(data.qparams,'question-history');  getContentH"+data.ids+"(data.qparams, 'ct-history'); ";
                if(data.aparams == "[Không trả lời]"){
                    Cf.id("ua-history").innerHTML = "<h2>Không trả lời</h2>";
                }else code += "getUAH"+data.ids+"(data.qparams, data.aparams, 'ua-history');";
                eval(code);
                $("#question-history input").each(function(i,e){
                    e.disabled = "disabled";
                });
            }else{
                var test = data.q_params.match(/\%/g);
                if(test && test.length >=7){
                    data.qparams = unescape(data.q_params);
                    data.aparams = unescape(data.a_params);
                    Cf.id("question-history").innerHTML = data.qparams;
                    var trueAns = Cf.id("question-history").getElementsByTagName("dialog")[0];
                    trueAns.style.display = "none";
                    Cf.id("ct-history").innerHTML = trueAns.innerHTML;
                    Cf.id("ua-history").innerHTML = data.aparams;
                }else{
                    data.qparams = JSON.parse(data.q_params);
                    data.aparams = data.a_params;
                    Cf.id("question-history").innerHTML = data.qparams.question;
                    Cf.id("ct-history").innerHTML = data.qparams.answer;
                    Cf.id("ua-history").innerHTML = data.aparams;
                }
            }
        }
        CF.loadHistory.back = function(){
            var elm = document.getElementById("olm-modal-content");
            if(elm){
                var max = CFrame.history.length;
                var ind = CFrame.loadHistory.ind;
                if(ind < max-1){
                    CFrame.loadHistory.ind++;
                    createHistory(elm, CFrame.history[Cf.loadHistory.ind]);
                }

            }
        };
        CF.loadHistory.next = function(){
            var elm = document.getElementById("olm-modal-content");
            if(elm){
                var max = CFrame.history.length;
                var ind = CFrame.loadHistory.ind;
                if(ind > 0){
                    CFrame.loadHistory.ind--;
                    createHistory(elm, CFrame.history[Cf.loadHistory.ind]);
                }

            }
        };
        CF.loadHistory.header = function(index){
            $(".htr-h").each(function(i,e){
                if(i == index){
                    $(e).addClass("h-active");
                }else{
                    $(e).removeClass("h-active");
                }
            });
        }
        CF.loadHistory.ind = 0;
        function htr_loadData(id){
            var elm = document.getElementById(id);
            if(Cf.data.isG){
                var innerHTML = "<span class='close' onclick='CFrame.closeModal();'>&times;</span><div style='margin: 60px 20px; text-align: center;'>";
                innerHTML += "<img width='225' height='40' src='"+CFrame.server+"images/onlinemath.png' /><h1>Bạn phải đăng nhập để sử dụng chức năng này</h1>";
                innerHTML += "<p>Để xem lại những nội dung vừa thực hành, chúng tôi yêu cầu bạn có tài khoản OnlineMath và đăng nhập. Nếu bạn chưa có tài khoản, <a href='"+CFrame.server+"index.php?l=user.register'>hãy bấm vào đây để đăng ký</a></p>";
                innerHTML += "<p style=''><br /><a href='"+CFrame.server+"index.php?l=user.login&return="+window.location.href+"' class='btn btn-primary'>Đăng nhập</a> <a href='"+CFrame.server+"index.php?l=user.register' class='btn btn-success'>Đăng ký tài khoản mới</a> <button onclick='_OLM_.closeModal();' class='btn btn-danger'>Đóng lại</button></p>";
                innerHTML += "</div>";
                elm.innerHTML = innerHTML;
                return;
            }

            // load

            var o = {
                url: CFrame.server + "index.php?g=stat.getcurent",
                type: "GET",
                cache: "false",
                data: {id_skill: CFrame.data.id, begin: '0'},
                success: function(r){
                    // try{
                    res = JSON.parse(r);
                    if(res.status == "success"){
                        if( res.data == false){
                            var htm = "<h2>Bạn chưa trả lời câu hỏi nào trong bài học này, hãy tiếp tục thực hành - những nội dung đã thực hành sẽ hiện ra ở đây !</h2><button class='btn btn-danger' onclick='CFrame.closeModal();'>Đóng lại</button>";
                            elm.innerHTML = "<div style='margin: 60px 20px; text-align: center;'><span class='close' onclick='CFrame.closeModal();'>&times;</span>"+htm+"</div>";
                            setTimeout(CFrame.closeModal, 8000);
                        }else{
                            CFrame.loadHistory.ind = 0;
                            CFrame.history = res.data;
                            createHistory(elm,res.data[CFrame.loadHistory.ind], true)
                        }
                    }else { CFrame.closeModal(); }
                    // }catch(e){
                    // console.log(e);
                    // CFrame.closeModal();
                    // }
                },
                error: function(){
                    alert("Kết nối tới máy chủ OnlineMath bị gián đoạn !");
                    CFrame.closeModal();
                }
            }
            $.ajax(o);
        }
        if(document.getElementById('olm_modal')) return;
        var div = document.createElement('div'); div.id='olm_modal';
        div.setAttribute('class','modal-bg fade in');
        var modal_style ="style='height: 600px; width: 920px; padding: 5px 20px; background: #ffffff;opacity: 1; box-shadow: 0px 1px 10px #000; margin: 2.5% auto;'";
        var content = "<span class='close' onclick='CFrame.closeModal();'>&times;</span><h1 style='padding-top: 100px; text-align: center;'>Đang nạp dữ liệu</h1><div class=\"progress progress-striped active\"><div id='bar' class=\"bar\" style=\"width: 50%;\"></div></div>";
        var modal = "<div id='olm-modal-content' "+modal_style+">"+content+"<p style='text-align: center;'><br /><button onclick='CFrame.closeModal();' class='btn btn-danger'>Hủy</button></p><br class='clear'/></div>";
        div.innerHTML = modal;
        document.body.appendChild(div);
        htr_loadData("olm-modal-content");
    }
    // @@@ IMAGE PROCEDURES AND DATA
    CF.images = [ // list of images
        {id:'gl1', name:'bộ chìa khóa', img:'bochiakhoa.png'},
        {id:'gl2', name:'bóng đèn', img:'bongden.png'},
        {id:'gl3', name:'bông hoa', img: 'bonghoa.png'},
        {id:'gl4', name:'quả bóng rổ', img:'bongro.png'},
        {id:'gl5', name:'bút lông', img:'butmau.png' },
        {id:'gl6', name:'cái chuông', img:'caichuong.png'},
        {id:'gl7', name:'con chim cánh cụt', img:'chimcanhcut.png'},
        {id:'gl8', name:'con cá', img:'conca.png'},
        {id:'gl9', name:'quả dâu', img: 'dau.png'},
        {id:'gl10', name:'quả dứa', img:'dua.png'},
        {id:'gl11', name:'chiếc kính lúp', img:'kinhlup.png'},
        {id:'gl12', name:'quả lê', img:'le.png'},
        {id:'gl13', name:'bẹ chuối', img:'naichuoi.png'},
        {id:'gl14', name:'ngôi nhà', img:'ngoinha.png'},
        {id:'gl15', name:'ngôi sao', img:'ngoisao.png'},
        {id:'gl16', name:'quả bóng', img:'quabong.png'},
        {id:'gl17', name:'quả bóng bay', img:'quabongbay.png'},
        {id:'gl18', name:'quả cam', img:'quacam.png'},
        {id:'gl19', name:'quả đào', img:'quadao.png'},
        {id:'gl20', name:'cuốn sách', img:'sach.png'},
        {id:'gl21', name:'quả táo', img:'tao.png'},
        {id:'gl22', name:'cục tẩy', img:'taychi.png'}
    ];

    CF.getImage = function(index){
        var img = CF.images[index]; var image = new skillImage;
        image.id = img.id; image.name = img.name; image.url = CFrame.server + 'skill/images/'+img.img; image.html = "<img src='"+image.url+"' />";
        return image;
    }
    CF.randImage = function(){
        var length = this.images.length;
        var index = this.randNext(0, length-1);
        return this.getImage(index);
    }
    CF.getImageById = function(id){
        var index = parseInt(id.substr(2,id.length));
        return this.getImage(index - 1);
    }

    // some useful functions
    CF.id = function(id){return document.getElementById(id);}
    CF.randList = function(list){ // use this function with small array
        list1 = [];
        for(var i = 0; i < list.length;  i++) list1.push(list[i]);
        var result = [];
        le = list.length;
        while(le > 0){
            var rd = CFrame.randNext(0,le - 1);
            var tmp = list1.splice(rd,1)
            result.push(tmp[0]);
            le--;
        }
        return result;
    }
    CF.jsonEncode = function(o){
        return JSON.stringify(o);
    }

    CF.setContent = function(content)
    {
        $('#answerc').html(content);
    }
    CF.addContent = function(content){
        document.getElementById('answerc').innerHTML += content;
    }

    CF.randNext = function(x,y){
        var d = y -x;
        var res = Math.round(Math.random()*d);
        return parseInt(x + res);
    }
    CF.setScore = function(e){
        e = e > 100 ? 100 : e;
        var t = document.getElementById("scoreval");
        t.innerHTML = e;
        document.getElementById("score_input").value = e; //@@bsquochoai Sửa điểm
        var n = ["#fff000", "#ccff00", "#ff00ff", "#00ffff"];
        t.style.textShadow = n[Cf.rN(0, 3)] + " 0px 0px 60px";
        setTimeout(function () {
            document.getElementById("scoreval").style.textShadow = "0px 0px 1px #fff"
        }, 1000);
        if(e >  60){
            $("#score-bonus").show().addClass("rotatez");
        }else{$("#score-bonus").hide();}
        setTimeout(function(){$("#score-bonus").removeClass("rotatez")}, 2300);
    }
    CF.addScore = function(flag,n){
        n = CF._mul;
        var score = parseInt(Cf.getScore());
        if(score == 100){ CF.setScore(100); return; }
        var dsc = parseInt(score/10);
        var asc = 10 - dsc;
        if(!n){n = 1;}
		  Cf.data.isVip = true
		if(!CFrame.data.isVip){
			CF._qcount++; CF._qcount = Math.max(0,CF._qcount);
			$("#count_prc").html(CF._qcount);
			if(CF._qcount <= 0){
				//CFrame.error( "Một tài khoản hoặc một máy tính chỉ được thực hành một số lượng giới hạn các câu hỏi mỗi ngày. Bạn cần nâng cấp lên tài khoản VIP (giá chỉ từ 30.000 đ/ 1 tháng hoặc 100.000 đ/ 6 tháng) để được học tập không giới hạn các nội dung trên Online Math");
				//onDailyLimited();
			}
		}
		
        if(flag) {CF.setScore(score + asc*n); } else CF.setScore(score - dsc*n);
        
    }
    CF.closeDialog = function(){
        $('#w_ans').dialog('close');
        $('#dl_exp').dialog('close');
        clocktimeo = setTimeout("CFrame.next_time()",1000);
        if(this.dialogClose){
            return this.dialogClose.call();
        }

    }
    CF.setExp = function(expc){
        document.getElementById(Cf._exp_elmid).innerHTML = expc;
    }
    CF.addExp = function(expc){document.getElementById('expcontent').innerHTML += expc;}
    CF.message  = function(cont){
        return "<p class='msg_sys'>"+cont+"</p>";
    }


    CF.baseUrl = CF.baseSiteUrl;
    CF.getGradeId = function(){
        return document.getElementById('gradeid').value;
    }

    // rewrite this function
    CF.addStyleSheet = function(css){
        head = document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        style.type = 'text/css';
        if(style.styleSheet){
            style.styleSheet.cssText = css;
        }else{
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    }


    // Macro
    CF.rN = CF.randNext;
    CF.rL = CF.randList;
    CF.rI = CF.randImage;
    //
    // Create the CF Object
    window.CFrame = window.Cf = window._OLM_ = CF;
}(window);

(function(){
    window.iPad = function(){};
    iPad.keys = [0,1,2,3,4,5,6,7,8,9,'+','-','x',':','>','<','='];
    iPad.html  = "";
    iPad.selector = "#question  input[type='text']";
    iPad.current = null;
    iPad.hidden = false;
    iPad.render = function(){
        iPad.html = "<div id='olm_key_pad'>";
        for(var i = 0; i < iPad.keys.length;i++){
            iPad.html += "<button class='btn key-btn keypad'>"+iPad.keys[i]+"</button>";
        }
        iPad.html += "<button onclick='return iPad.backSpace();' class='btn keypad' style='padding: 0px 5px;'><b class='backspace'></b></button></div>";
    }
    iPad.keyPad = function(elm){
        //  neu key pad goi ko thong qua def ---> DEF = false
        $('#olm_keypad').remove();
        iPad.render(); elm.innerHTML = iPad.html;
        $('.key-btn').each(function(index, element) {
            element.onclick = function(){
                iPad.current.value +=$(element).text();
            }
        });
    } // keyPad

    iPad.dropTo = function(selector){
        iPad.selector = selector;
        $(selector).focus(function(){
            iPad.current = this;
        }).get(0).focus();
        iPad.current = $(selector).get(0);
    } // dropTo


    iPad.show = function(){
        if($(iPad.selector).length != 0){
            iPad.keyPad(document.getElementById('ipad_container'));
            iPad.dropTo(iPad.selector);
        }
    }
    iPad.backSpace = function(){
        var val = iPad.current.value;
        val = val.substring(0,val.length-1);
        iPad.current.value = val;

    }
    iPad.toggle = function(){
        if(iPad.hidden){
            iPad.show();
            iPad.hidden = false;
        }else{
            iPad.remove();
            iPad.hidden = true;
        }
    }

    iPad.remove = function(){
        $("#olm_key_pad").remove();
    }

    iPad.defaultBehavior = function(f){
        if(iPad.hidden){
            return;
        }
        iPad.show();

    }

    return false;
})();
$(function(){
    Cf.id("qcontainer").onkeydown = function(event){
		/*if(document.getElementById("vipstyle")){
			$("#olm_modal").remove();
			var div = document.createElement('div'); div.id='olm_modal';
			div.setAttribute('class','modal-bg');
			var content = "<h3>Nội dung này chỉ dành cho tài khoản VIP</h3><p>Cảm ơn bạn đã sử dụng Online Math. Bài toán này chỉ dành cho các tài khoản VIP có thu phí của Online Math. Việc thu phí sẽ giúp chúng tôi có điều kiên duy trì và phát triển trang web tốt hơn. Để nạp VIP hãy bấm vào nút mua tài khoản bên dưới</p><a href='/?l=payment.buy' class='btn btn-primary btn-large'>Mua tài khoản VIP</a>";
			div.innerHTML = "<div class='modal-container'><div class='modal-inner'>"+content+"</div></div>";
			document.body.appendChild(div);
			return;
		}*/
        if((event.keyCode == 13)&&(CFrame._time_count) && document.getElementById("btn-done")){ return CFrame.clickEvent();}
        return true;
    }
	 
$("#std_btn").html(' <button class="btn btn-danger btn-large" title="Làm xong và nộp bài" id="btn-done"><b class="icon icon-white icon-ok"></b>  Nộp bài !</button>&nbsp; <span class="btn-custom" style="float: right;"><button onclick="return _OLM_.ignore();" title="Không trả lời được, chọn bỏ qua - câu hỏi này sẽ tính là câu sai trong thống kê của bạn" class="btn"><b class="icon icon-play"></b> Bỏ qua</button> <button onclick="Cf.loadHistory();" title="Xem lại các câu hỏi trước" class="btn"><b class="icon icon-time"></b></button> <button id="btn-ipad" onclick="iPad.toggle();" data-content="Ẩn/Hiện bàn phím ảo" class="btn" data-original-title="" title=""><b class="icon icon-th"></b></button> </span>')
$("body").off().on("click", "#btn-done", function(){
	return CFrame.clickEvent();
})
$("#error_panel").remove()
});