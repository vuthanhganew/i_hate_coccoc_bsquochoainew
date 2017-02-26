var toeic_url=window.location.protocol + "//" + location.host+'/';

var msg_vip='Bạn phải là <a href="http://www.tienganh123.com/huong-dan/214-quyen-loi-thanh-vien-vip-cua-tienganh123.html" target="_blank" title="quyền lợi thành viên VIP"  style="color:#0d6af7; text-decoration:underline">thành viên VIP</a> của TiếngAnh123.Com mới được xem <strong>kết quả</strong>, <strong>đáp án</strong> và <strong>lời giải thích</strong>.';
var d_start = new Date();
var n_start = d_start.getTime();
function loadSocial(){
   if (typeof (FB) != 'undefined'){
        FB.init({ status: true, cookie: true, xfbml: true,appId : '958315130849745' });
    } else {
        $.getScript("http://connect.facebook.net/en_US/all.js#xfbml=1", function () {
            FB.init({ status: true, cookie: true, xfbml: true,appId : '958315130849745' });
	});
    }
	console.log(FB);
}
function toeicNext(cmd){
	if ($(cmd).hasClass('toeic_next_dis')){
		$(cmd).after('<div class="tbao_nb">Đã hết câu hỏi! Bạn hãy kiểm tra lại và nộp bài để biết kết quả.<div class="img_close"></div></div>');
			  $('.img_close').click(function(){
				$('.tbao_nb').remove();
			  });
    }else{
		$('.toeic_back').removeClass('toeic_back_dis').addClass('toeic_back_active');
		if($('.box_current').next().is('.toeic_segment')){
			$('.box_current').removeClass('box_current').next().addClass('box_current');
			if((' .jquery_jplayer_long').length>0){
				$('.jquery_jplayer_long').each(function(i){
					addAudioLong(this,i);
				});
			}
			var cont_seg=$('.box_current .toeic_segment_content').html();
			$('.toeic_cont_part').html(cont_seg);
			var n_segn=$('.box_current').attr('inx_ques');
			$('#toeic_option option[value='+n_segn+']').attr('selected','selected');
			var toeic_inx=$('.box_current').attr('inx_ques');
			$('.toeic_inx').text(toeic_inx);
			 toPos('.toeic_main');
		}
		if($('.box_current').next().is('.toeic_segment')){
		}else{
			 $(cmd).addClass('toeic_next_dis').removeClass('toeic_next_active');
		}
	}

}
function toeicBack(cmd){
	if ($(cmd).hasClass('toeic_back_dis')) {
    } else{
		 $(cmd).addClass('toeic_back_active').removeClass('toeic_back_dis');
		if($('.toeic_next').hasClass('toeic_next_dis')){
			$('.toeic_next').removeClass('toeic_next_dis').addClass('toeic_next_active');
		}
		if($('.box_current').prev().is('.toeic_segment')){
			$('.box_current').removeClass('box_current').prev().addClass('box_current');
			if(('.box_current .jquery_jplayer_long').length>0){
				$('.jquery_jplayer_long').each(function(i){
					addAudioLong(this,i);
				});
			}
			var cont_seg=$('.box_current .toeic_segment_content').html();
			$('.toeic_cont_part').html(cont_seg);
			var n_seg=$('.box_current').attr('inx_ques');
			$('#toeic_option option[value='+n_seg+']').attr('selected','selected');
			$('.toeic_inx').text(n_seg);
			toPos('.toeic_main');
		}
		if($('.box_current').prev().is('.toeic_segment')){
		}else{
		  $(cmd).addClass('toeic_back_dis').removeClass('toeic_back_active');
		}
	}
}
var toeic_data_post=[];
function toeic_post_radio(){
	var result=""
	$('.toeic_select').each(function(){
		var ar_re=[];
		result=$(this).attr('value');
		ar_re.push(result);
		toeic_data_post.push(ar_re);

	});

}
function toeic_showRadio(val,i){
    var inx_q=$('.toeic_select:eq('+i+')').attr('inx');
      if($('.toeic_select:eq('+i+')').attr('value')!=0){
          $('.toeic_select:eq('+i+')').find('.r_on').removeClass('toeic_elm_true').css('color','red').prev().addClass('toeic_false');
      }
     $('.toeic_select:eq('+i+')').find('.label_radio_'+inx_q+'[value='+val[0]+']').prev().addClass('toeic_rad_hidden toeic_true');

  }
function show_multiple_true(){
    if( $('.toeic_elm_true').length>0){
        $('.toeic_elm_true').each(function(){
           $(this).css('color','#3B9609');
           $(this).prev().addClass('toeic_true');
        });
     }
 }

 function toeicAction(cmd){
   $('.toeic_alert_note').hide();
   if(paidmember()){
	toeic_post_radio();
	var toeic_ur=window.location.href.split("/");
    var n_p=toeic_ur.length-1;
    var toeic_id_p=toeic_ur[n_p].split('-');
    var type="save_score";
	toeic_path_p=toeic_path_p.replace(/ /g,'%20');

    toeic_check(toeic_url+'ws_action/handle.php',{answers:JSON.stringify(toeic_data_post),path:toeic_path_p,id_lesson:toeic_id_p[0],type:type});
	$(cmd).after('<center class="toeic_processing"><img src="http://www.tienganh123.com/file/common/images/processing.gif" width="200px" height="200px" /></center>');

   }else{
        $(cmd).after('<div class="toeic_tbao_text">'+msg_vip+'</div>');
    }
	 $(cmd).remove();
 }
function toeic_check(link,str_data){
    $.post(link,str_data,function(data){
	if(data){
	var toeic_num=$('.toeic_select').length;
        if(data.er==false){
			for (var x in data.res.failed){
				toeic_showRadio(data.res.failed[x],x);
			}
			show_multiple_true();
			$('.toeic_processing').remove();
			$('.toeic_box_sb').after('<center><button type="button" class="toeic_bt_ctrl toeic_bt_sh" onclick="showAnswer(this)">Show Answers</button></center>');
			$('.toeic_box_sb').after('<div class="toeic_alert">Bạn đã làm đúng <span class="toeic_total">'+data.res.score+'</span>/<span class="toeic_sum">'+toeic_num+'</span></div>');
			var isShare=data.res.score*100/toeic_num;
			if(isShare>70){
				loadSocial();
				 $('.toeic_box_sb').parent().after('<div class="control_sharefb"></div>');
				 $('.control_sharefb').append('<div class="control_sharefb_left">Xin chúc mừng bạn đã làm đúng <span class="fbuser_score">'+data.res.score+'/ '+toeic_num+'</span>.<br /><span class="txt_alert_fb">Chia sẻ kết quả này với bạn bè trên Facebook</span></div>');
				 $('.control_sharefb').append('<div class="control_sharefb_right"><button type="button" id="sharefb_lesson" onclick="shareFB('+data.res.score+','+toeic_num+')"></button></div>');
				 $('.control_sharefb').after('<div class="fb_tb_success"><img src="http://www.tienganh123.com/file/common/share/loading.gif" />sharing...</div>');
			}
		}
	}else{
		$('.toeic_processing').html('<div class="toeic_tbao_text">'+msg_vip+'</div>');
	}
    });
}


function showAnswer(cmd){
		$('.toeic_rad_hidden').css('visibility','visible').next().css('color','#3B9609');
       $('.toeic_explain').show();
       $('.box_current').removeClass('box_current');
       $('.toeic_segment:eq(0)').addClass('box_current');
       	toPos('.toeic_main');
       $(cmd).hide();
	   $('#show_text_1').show();
       $('.toeic_next_dis').removeClass('toeic_next_dis').addClass('toeic_next_active');
      $('#toeic_option option:eq(0)').attr('selected','selected');
}
function shareFB(num_t,num){
	$('.fb_tb_success').show();
	$('.fb_tb_success').html('<img src="/file/common/share/loading.gif" />sharing...');
	var msg=' đã làm đúng '+num_t+'/'+num+' câu. ';
	var url=toeic_url+$('#pathname').val();
	var name=$('.orange1').text();
	postFBLesson(msg,url,name);

}

function getQuestion(inx_ques){
	$('.box_current').removeClass('box_current');
	$('.toeic_segment[inx_ques='+inx_ques+']').addClass('box_current');
	if(('.jquery_jplayer_long').length>0){
		$('.jquery_jplayer_long').each(function(i){
			addAudioLong(this,i);
		});
	}
	var cont_seg=$('.box_current .toeic_segment_content').html();
	$('.toeic_cont_part').html(cont_seg);
	var toeic_inx=$('.box_current').attr('inx_ques');
	$('.toeic_inx').text(toeic_inx);
	if($('.box_current').next().is('.toeic_segment')){
		$('.toeic_next').removeClass('toeic_next_dis').addClass('toeic_next_active');
	}else{
		 $('.toeic_next').addClass('toeic_next_dis').removeClass('toeic_next_active');
	}
	if($('.box_current').prev().is('.toeic_segment')){
		$('.toeic_back').removeClass('toeic_back_dis').addClass('toeic_back_active');
	}else{
		  $('.toeic_back').addClass('toeic_back_dis').removeClass('toeic_back_active');
	}
	toPos('.toeic_main');
}

function showTapescript(cmd){
	if (paidmember()){
		var hide_cont=$(cmd).val();
		if(hide_cont=='Xem'){
			$(cmd).val('Ẩn');
			$('.toeic_tapescript').show();
		}else{
			$(cmd).val('Xem');
			$('.toeic_tapescript').hide();
		}
	}else{
			$('.toeic_save_er1').html('Chỉ có <a href="http://www.tienganh123.com/huong-dan/214-quyen-loi-thanh-vien-vip-cua-tienganh123.html" style="color:#099; font-weight:bold">thành viên VIP</a> mới được xem!');
	}
}