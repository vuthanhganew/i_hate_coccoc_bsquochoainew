/**
 * Created with JetBrains PhpStorm.
 * User: Manh Nguyen
 * Date: 8/20/13
 * Time: 1:37 PM
 * To change this template use File | Settings | File Templates.
 */

var json_file = $("#json_file").attr("link");
var vip = 1;

var _var = {
    items: [],
    q: 0,
    scores: 0,
    play: false,
    current_word: '',
    tmp_word: '',
    tmp_phonic: '',
    tmp_letter_index: 0,
    tmp_phonic_index: 0,
    finished: false,
    is_clock: false,
    i_vowel: [],
    run_clock: 0
};

var game = {
    init: function(){
        game.reset_variables();
        game.load_json();
    },
    count_pa:function(str){
		var str_ph= ' <span class="vowel">/';
        var arr_ph=str.split('_');
		for(var j=0;j<arr_ph.length;j++){		
			str_ph +='<span class="item_phonic item_ph">*</span>';
		}
		str_ph += '/</span>';
		return str_ph;
	},
    start: function(){
        game.show_score();		
		var str_ph=game.count_pa(_var.items[_var.q].phonic);		
        game.show_word(_var.items[_var.q].correct+str_ph);
		game.load_audio(_var.items[_var.q].sound);
        game.play_audio_bg();
        $("#keys a.start").hide();
		$('.gpa_hint').show();
    },
    next: function(){
		console.log(_var.q);
        _var.tmp_word = '';
        _var.tmp_phonic = '';
        _var.tmp_letter_index = 0;
        _var.tmp_phonic_index = 0;
        $(".gpa_tf_icon").hide();
        _var.q++;
        if(vip == 0 && _var.q >= 3){
        	$("#g_lpa_nonvip").show(300);
			game.load_audio('http://www.tienganh123.com/file/dungchung/libAudio/vip_only_audio.mp3');        	
			game.play_audio_bg();
        	return false;
        }else{
        	game.show_score();
            if(_var.items.length >= _var.q+1)
            {
                _var.current_word = _var.items[_var.q].correct;
                game.load_audio(_var.items[_var.q].sound);
                game.play_audio_bg();
				var str_ph=game.count_pa(_var.items[_var.q].phonic);		
				game.show_word(_var.items[_var.q].correct+str_ph);
            }
            else
            {
            	clearInterval(_var.run_clock);
                $("#keys a.start").show();
                $("#keys a.again").show();
                _var.finished = true;
                game.finish();
            }
        }
        
    },
    show_score: function(){
        $("#g-lpa-score").html(_var.scores + "/" + _var.items.length);
        $("#g-lpa-timer").show();
    },	
    play_again: function(){
        _var.items = [];
        game.init();
        timeout = setTimeout('game.start()', 1000);
    },
    reset_variables: function(){
        _var.tmp_word = '';
        _var.tmp_letter_index = 0;
        _var.tmp_phonic_index = 0;
        _var.q = 0;
        _var.current_word = '';
        _var.scores = 0;
        _var.is_clock = false;
        _var.items = [];
        $("#g-lpa-show_word").empty();
    },
    // load du lieu tu file json
    load_json: function(){
        $.getJSON(json_file, function(data) {
            len = data.bai.length;
            for (var i=0;i<data.bai.length;i++)
            {
                num = data.bai.length; // Lay so luong cac cau hoi
                _var.items.push(data.bai[i]); // Nap du lieu cac cau hoi vao mang items
            }
        })
            .done(function(){  // Load du lieu thanh con
                console.log("success");
                //khoi tao ban dau
                _var.items = game.random_arr(_var.items);
                //game.load_audio(_var.items[0].sound);
                _var.current_word = _var.items[0].correct;
                //lay random cac chu cai trong tu
            })
            .fail(function(){ console.log("error");}) // Neu load du lieu that bai
            .always(function(){ console.log("complete");});
        
        $.getJSON(_loc_game2 + "vowel.json", function(_data) {
            for (var i=0;i<_data.items.length;i++)
            {
				if(_data.items[i]._vowel){
					vowel_item=_data.items[i]._vowel;
				}else{
					vowel_item=_data.items[i].vowel;
				}
				$('.gpa_key_item[item='+i+']').attr('media-url',_data.items[i].s_vowel).attr('vowel',vowel_item);
                _var.i_vowel.push(_data.items[i]); // Nap du lieu cac cau hoi vao mang items
            }
        })
            .done(function(){  // Load du lieu thanh con
                console.log("success load vowel");
                //khoi tao ban dau
            })
            .fail(function(){ console.log("error load vowel");}) // Neu load du lieu that bai
            .always(function(){ console.log("complete vowel");});
    },
    // load audio hien tai
    load_audio: function(url){
        $("#load_audio_phonetic").attr("media-url",url);
    },
    check_vip: function(){
        return "no";
    },
    check_string_correct: function(s, word){
        if(s == word.substr(0,s.length)){
            return true;
        }
        else{
            return false;
        }
    },
    check_phonic_correct: function(_tmp,_phonic){
    	var _arr = _phonic.split("_");
        _phonic = _phonic.replace(/_/g,'');
        var str = '';
        for(var i=0; i < _var.tmp_phonic_index+1; i++){
        	str += _arr[i];
        }
        if($.trim(_tmp) == $.trim(str)){
            return true;
        }
        else{
            return false;
        }
    },
    // goi audio chay ngam
    play_audio_bg: function(){  		
    	$("#load_audio_phonetic").click(); 		
    },
    show_word: function(str){
        $("#g-lpa-show_word").html(str);
    },
    hide_word: function(){
        $("#g-lpa-show_word").delay(1000).animate({
            top: '-10px',
            opacity: 0
        });
    },
    clock_count: function(){
    	$("#g-lpa-timer").empty();
        if(_var.is_clock == false){
            _var.run_clock = setInterval(setTime, 1000);
        }
        var totalSeconds = 0;
        function setTime()
        {
            ++totalSeconds;
            var _str = '';
            _str += pad(parseInt(totalSeconds/60));
            _str += ":"+ pad(totalSeconds%60);
            $("#g-lpa-timer").html(_str);
        }

        function pad(val)
        {
            var valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }
    },
    finish: function(){
    	$("#g-lpa-points").html(_var.scores);
    	$("#g-lpa-questions").html(_var.items.length);
    	$("#g-lpa-result").show();
    },
	hint:function(){
		var arr_phone=_var.items[_var.q].phonic.split('_');
		var inx=$('.item_ph:eq(0)').index('.item_phonic');	
		if(arr_phone[inx].indexOf("ː")){
					arr_phone[inx]=arr_phone[inx].replace("ː","-");
		}
		if(arr_phone[inx].indexOf(":")){
			arr_phone[inx]=arr_phone[inx].replace(":","-");
		}
		$('.gpa_key_item_hint[vowel='+arr_phone[inx]+']').click();	
			
	},
    vowel_bnt_click: function(i){
    	$(".gpa_tf_icon").hide();
    	var _key = $.trim(_var.i_vowel[i].vowel);
        var _tmp = _var.tmp_phonic + _key;
        _tmp = $.trim(_tmp);

        if(game.check_phonic_correct(_tmp,_var.items[_var.q].phonic) == true){
            _var.tmp_phonic = _tmp;
			$('.item_ph:eq(0)').text(_key).removeClass('item_ph');
            _var.tmp_phonic_index++;
            if(_tmp == _var.items[_var.q].phonic.replace(/_/g,'')){
            	_var.scores++;
            	$(".gpa_tf_icon img").attr("src",_loc_game2 + "images/ico_icon.png");
            	$(".gpa_tf_icon").show();                
                timeout1 = setTimeout('game.next()', 2000);
            }
        }
        else{
        	$(".gpa_tf_icon img").attr("src",_loc_game2 + "images/icor_icon.png");
        	$(".gpa_tf_icon").show();        	
        }       
    },
    random_arr: function(arr){
    	for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    }
};
function pa_hint(cmd){
	game.hint();
}
function PlayingAudioHide(element){
    if(element.hasClass('uba_hideAudio')){
        element.children('.stt_par_hideaudio').children(0).attr('src','/file/dungchung/button_img/speaker-playing.gif');
        if(prev_element != null){
            if(element.attr('media-url') != prev_element.attr('media-url')){
                stopAudioHide(prev_element);
            }
        }
        prev_element = element;
    }
}



$(document).ready(function(){
    // khoi tao ban dau
    game.init();    
    $(".gpa_key_item").click(function(){
    	var i = $(this).attr("item");    
    	game.vowel_bnt_click(i);
    });
    
    $(".gpa_key_item_").click(function(){
    	var i = $(this).attr("item");    	
    	game.vowel_bnt_click(i);
    });
    
    //
    $("#g-lpa-btn_again").click(function(){
    	$(".ga_vcab_outl_bg").hide();    		 
    	clearInterval(_var.run_clock);    	
    	_var.is_clock = false; 
		game.clock_count();
		 _var.items =game.random_arr(_var.items);
		_var.q=0;
		_var.scores=0;	
       game.start();
    });
    
    $("#g-lpa-btn_close").click(function(){
    	$("#g_lpa_nonvip").hide();	
    	clearInterval(_var.run_clock);
		_var.is_clock = false; 		
    	game.clock_count();    	
		_var.q=0;
		_var.scores=0;		
		
       game.start();		
    });
    
    $(".gpa_start_bt").click(function(){
    	game.clock_count();
        _var.is_clock = true;
        game.start();
        $(this).hide();
    });
});
