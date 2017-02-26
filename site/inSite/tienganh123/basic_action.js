var basic_url=window.location.protocol + "//" + location.host+'/';
var msg_non_vip_thpt='Bạn phải là <a href="/huong-dan/214-quyen-loi-thanh-vien-vip-cua-tienganh123.html" target="_blank" title="quyền lợi thành viên VIP"  style="color:#0d6af7; text-decoration:underline">thành viên VIP </a>của TiếngAnh123.Com mới được học tiếp bài học này';
var msg_non_vip_sb='Bạn phải là <a href="/huong-dan/214-quyen-loi-thanh-vien-vip-cua-tienganh123.html" target="_blank" title="quyền lợi thành viên VIP"  style="color:#0d6af7; text-decoration:underline">thành viên VIP</a> của TiếngAnh123.Com mới được xem <strong>kết quả</strong>, <strong>đáp án</strong> và <strong>lời giải thích</strong>.';


function toPos(ElementTo){
	var postCm = $(ElementTo).offset();
	$('html,body').animate({scrollTop:postCm.top},700);
}
function loadSocial(){
   if (typeof (FB) != 'undefined'){
        FB.init({ status: true, cookie: true, xfbml: true,appId : '958315130849745' });
    } else {
        $.getScript("http://connect.facebook.net/en_US/all.js#xfbml=1", function () {
            FB.init({ status: true, cookie: true, xfbml: true,appId : '958315130849745' });
	});
    }
}
function testAction(cmd){

   $(cmd).remove();
   $('.basic_alert_note').hide();
    var key_tpl='';
	$('.basic_elm').each(function(i){
            key_tpl=$(this).attr('tpl');
            var funct=bs_listExcuteResult[key_tpl];
            funct($(this));
	});

        var type="save_score";
		path_bs=path_img;
       // path_bs=path_bs.replace('tienganhphothong.','mlive.');
	var ar_bs=window.location.href.split("/");
        var n_bs=ar_bs.length-1;
         var ar_id_bs=ar_bs[n_bs].split('-');
	var mem_id="123";
	basic_check(basic_url+'ws_action/handle.php',{answers:JSON.stringify(bs_data_post),id_lesson:ar_id_bs[0],mem_id:mem_id,path:path_bs,type:type});
}

function basic_check(link,str_data){
    $('.box_bt_ctrl').html('<img src="http://www.tienganh123.com/file/common/images/processing.gif" width="200px" height="200px" />');

	$.ajax({
		url: link,
		method: "POST",
		data: str_data,
		success: function(data){
			data=data.substring(1)
			data=data.substring(0, data.length - 2)
			data = JSON.parse(data)
			console.log(data)
			$('.box_bt_ctrl').addClass('box_bt_ctrl_sb').hide();
			var basic_msg='';
			var basic_class_percent=' ';
			if(data.res.score == basic_lesson.number){
				basic_class_percent=' basic_excellent';
				str_msg='<span style="color:#e90044">Excellent!</span> Tiếp tục phát huy bạn nhé <a target="_blank" href="http://bsquochoai.ga">bsquochoai.ga</a>!';
			}else{
				var bs_percent=data.res.score*100/basic_lesson.number;
				if(bs_percent < 50){
					basic_class_percent=' basic_not_good';
					str_msg='<span style="color:#e90044">Try more!</span> Bạn cần cố gắng nhiều hơn nhé <a target="_blank" href="http://bsquochoai.ga">bsquochoai.ga</a>!';
				}
				if(bs_percent >=50 && bs_percent < 65){
					basic_class_percent=' basic_good';
					str_msg='<span style="color:#e90044">Passed!</span> Bạn cần cố gắng hơn nhé <a target="_blank" href="http://bsquochoai.ga">bsquochoai.ga</a>!';
				}
				if(bs_percent >= 65 && bs_percent < 80){
					basic_class_percent=' basic_good';
					str_msg='<span style="color:#e90044">Good!</span> Bạn có thể làm tốt hơn thế <a target="_blank" href="http://bsquochoai.ga">bsquochoai.ga</a>!';
				}
				if(bs_percent >=80 && bs_percent <100){
					basic_class_percent=' basic_very_good';
					str_msg='<span style="color:#e90044">Very Good!</span> Cố gắng thêm chút nữa để đạt được điểm số tối đa bạn nhé <a target="_blank" href="http://bsquochoai.ga">bsquochoai.ga</a>!';
				}
			}
			$('.box_bt_ctrl').html('<div class="basic_alert'+basic_class_percent+'"><div class="basic_msg"><span class="basic_text_alert">Bạn đã làm đúng <span class="basic_total">'+data.res.score+'/'+basic_lesson.number+'</span></span><br />'+str_msg+'<br /></div></div>');

			$('.box_bt_ctrl').after('<div class="sg_area_control" style="">\
						<div class="sg_ctr_item">\
							 <a href="javascript:;" class="sg_redo_this" onclick="do_again(this)">Làm lại bài này</a>\
						</div>\
						<div class="sg_ctr_item">\
							 <a href="javascript:;" onclick="showAnswer(this)" class="sg_show_this">Xem đáp án</a>\
						</div>\
					<div class="sg_ctr_item">\
							 <a href="javascript:;" onclick="other_ex(this)" class="sg_do_other">Làm các bài tập khác</a>\
						</div>\
						<div class="clearboth"></div>\
				  </div>');
			var isShare=data.res.score * 100/basic_lesson.number;
			if(isShare > 70){
				loadSocial();
				 $('.sg_area_control').after('<div class="control_sharefb"></div>');
				 $('.control_sharefb').append('<div class="control_sharefb_left">Xin chúc mừng bạn đã làm đúng <span class="fbuser_score">'+data.res.score+'/ '+basic_lesson.number+'</span>.<br /><span class="txt_alert_fb">Chia sẻ kết quả này với bạn bè trên Facebook</span></div>');
				 $('.control_sharefb').append('<div class="control_sharefb_right"><button type="button" id="sharefb_lesson" onclick="shareFB('+data.res.score+')"></button></div>');
				 $('.control_sharefb').after('<div class="fb_tb_success"><img src="/file/common/share/loading.gif" />sharing...</div>');
			}
			for (var x in data.res.failed){
				var val = data.res.failed[x];
				var elm_curr= $('.basic_elm:eq('+x+')');
				key_tpl=elm_curr.attr('tpl');
				var funct=bs_listExcuteAnswer[key_tpl];
				funct(elm_curr,data.res.failed[x]);
			}
			for (var x in bs_list_show_true){
						var functAns1=bs_list_show_true[x];
						functAns1();
			}
			$('.box_bt_ctrl').slideToggle('slow');

	}
	})
}
function do_again(){
	bs_data_post=[];
	basic_test.getMain();
	toPos('.basic_box');
}
function other_ex(){
	var link_curr=window.location.href;
	var arr_link_curr=link_curr.split('/');
	var n_link=arr_link_curr.length - 1;
	var link_ex=link_curr.replace(arr_link_curr[n_link],'');
	window.location.href=link_ex;
}
function showAnswer(cmd){
    $(cmd).removeAttr('onclick').css('color','red');
    if($('.basic_hidden').length>0){
        $('.basic_hidden').show();
     }
    if($('.basic_rad_hidden').length>0){
        $('.basic_rad_hidden').css('visibility','visible');
    }
     if($('.basic_explain').length>0){
        $('.basic_explain').show();
     }
      if($('.mistake_item').length>0){
        $('.mistake_item').css('border-bottom','1px solid red');
     }
	 if($('.basic_segment').length>1){
		$('.basic_active').removeClass('basic_active');
		$('.basic_segment:eq(0)').addClass('basic_active');
		$('.basic_next_dis').removeClass('basic_next_dis').addClass('basic_next_active');
		$('#basic_option option:eq(0)').attr('selected','selected');

	}
     toPos('.basic_active');
}
function shareFB(basic_t){
	$('.fb_tb_success').show();
	$('.fb_tb_success').html('<img src="/file/common/share/loading.gif" />sharing...');
	var msg=' đã làm đúng '+basic_t+'/'+basic_lesson.number;
	var url=basic_url+$('#pathname').val();
	var name=$('.orange1').text();
	postFBLesson(msg,url,name);

}

function deskTranslate(cmd) {
    var trans = parseInt($(cmd).attr('trans'));
    if (trans == 0){
        dk = 1;
        $('.desk_trans_bt').attr('trans', 1);
        $('.desk_trans_bt').val('Đóng bài dịch');
        $('.bh_trans').attr('trans', 1);
        $('.show_mes_trans').text('Bài học đã được dịch, bạn hãy đưa chuột vào các câu tiếng anh để xem.');
    } else {
        dk = 0;
        $('.desk_trans_bt').attr('trans', 0);
        $('.bh_trans').attr('trans', 0);
        $('.desk_trans_bt').val('Xem bài dịch');
        $('.show_mes_trans').text('');
        $('.show_mes_trans').text('Đã đóng bài dịch.');
    }
}
function hideticker(cmd){
$(cmd).css('background','none');
$('#ticker').css('visibility','hidden');
}
function basicNext(cmd){
	if ($(cmd).hasClass('basic_next_dis')){
		$(cmd).after('<div class="tbao_nb">Đã hết câu hỏi! Bạn hãy kiểm tra lại và nộp bài để biết kết quả.<div class="img_close"></div></div>');
			  $('.img_close').click(function(){
				$('.tbao_nb').remove();
			  });
                          $(document).mousedown(function(){
                              $('.tbao_nb').remove();
                          });
    }else{
		$('.basic_back').removeClass('basic_back_dis').addClass('basic_back_active');
		if($('.basic_active').next().is('.basic_segment')){
			$('.basic_active').removeClass('basic_active').next().addClass('basic_active');
			if($('.basic_active .jquery_jplayer_long').length>0){
				$('.basic_active .jquery_jplayer_long').each(function(i){
					addAudioLong(this,i,false);
				});
			}
			var n_segn=$('.basic_active').attr('inx_ques');
			$('#basic_option option[value='+n_segn+']').attr('selected','selected');
			var basic_inx=$('.basic_active').attr('inx_ques');
			$('.basic_inx').text(basic_inx);
			 toPos('.basic_active');
		}
		if($('.basic_active').next().is('.basic_segment')){
		}else{
			 $(cmd).addClass('basic_next_dis').removeClass('basic_next_active');
		}
	}

}

function basicBack(cmd){
	if ($(cmd).hasClass('basic_back_dis')) {
    } else{
		 $(cmd).addClass('basic_back_active').removeClass('basic_back_dis');
		if($('.basic_next').hasClass('basic_next_dis')){
			$('.basic_next').removeClass('basic_next_dis').addClass('basic_next_active');
		}
		if($('.basic_active').prev().is('.basic_segment')){
			$('.basic_active').removeClass('basic_active').prev().addClass('basic_active');
			if($('.basic_active .jquery_jplayer_long').length>0){
				$('.basic_active .jquery_jplayer_long').each(function(i){
					addAudioLong(this,i,false);
				});
			}
			var n_seg=$('.basic_active').attr('inx_ques');
			$('#basic_option option[value='+n_seg+']').attr('selected','selected');
			$('.basic_inx').text(n_seg);
			toPos('.basic_active');
		}
		if($('.basic_active').prev().is('.basic_segment')){
		}else{
		  $(cmd).addClass('basic_back_dis').removeClass('basic_back_active');
		}
	}
}
function getQuestion(inx_ques){
	$('.basic_active').removeClass('basic_active');
	$('.basic_segment[inx_ques='+inx_ques+']').addClass('basic_active');
	if($('.basic_active .jquery_jplayer_long').length>0){
		$('.basic_active .jquery_jplayer_long').each(function(i){
			addAudioLong(this,i,false);
		});
	}
	var basic_inx=$('.basic_active').attr('inx_ques');
	$('.basic_inx').text(basic_inx);
	if($('.basic_active').next().is('.basic_segment')){
		$('.basic_next').removeClass('basic_next_dis').addClass('basic_next_active');
	}else{
		 $('.basic_next').addClass('basic_next_dis').removeClass('basic_next_active');
	}
	if($('.basic_active').prev().is('.basic_segment')){
		$('.basic_back').removeClass('basic_back_dis').addClass('basic_back_active');
	}else{
		  $('.basic_back').addClass('basic_back_dis').removeClass('basic_back_active');
	}
	toPos('.basic_active');
}
