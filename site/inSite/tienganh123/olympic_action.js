var olym_url=window.location.protocol + "//" + location.host+'/';
var olym_url1=window.location.href;
var msg_vip='Bạn phải là <a title="Quyền lợi của thành vien VIP" href="http://www.tienganh123.com/huong-dan/214-quyen-loi-thanh-vien-vip-cua-tienganh123.html" target="_blank" class="a-link" style="color:#0E74F5">thành viên VIP</a> của TiengAnh123.com mới được làm tiếp bài này !<br><a title="Quyền lợi của thành vien VIP" href="http://www.tienganh123.com/huong-dan/214-quyen-loi-thanh-vien-vip-cua-tienganh123.html" target="_blank"  class="a-link" ><span class="qz_pop_bt"  style="color:#0E74F5">Đăng ký thành viên VIP</span></a><br>';

var ur_fb=["http://www.tienganh123.com/file/common/share/sharefb_all.js"];    
var msg_non_vip_thpt='Bạn phải là <a href="http://www.tienganh123.com/huong-dan/214-quyen-loi-thanh-vien-vip-cua-tienganh123.html" target="_blank" title="quyền lợi thành viên VIP"  style="color:#0d6af7; text-decoration:underline">thành viên VIP </a>của TiếngAnh123.Com mới được học tiếp bài học này';
var msg_non_vip_sb='Bạn phải là <a href="http://www.tienganh123.com/huong-dan/214-quyen-loi-thanh-vien-vip-cua-tienganh123.html" target="_blank" title="quyền lợi thành viên VIP"  style="color:#0d6af7; text-decoration:underline">thành viên VIP</a> của TiếngAnh123.Com mới được xem <strong>kết quả</strong>, <strong>đáp án</strong> và <strong>lời giải thích</strong>.';
function toPos(ElementTo){
	var postCm = $(ElementTo).offset();	
	$('html,body').animate({scrollTop:postCm.top},300);
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
function delSpace(str){	
    str=$.trim(str);	
	var p=0;
	var n=str.length;	
	while(p<n){
		if(str[p]==' '&& str[p+1]==' ')
            str=str.replace("  "," ");
		else
		p++;
		
	}
	
	return str;
}
var listExcuteResult={};
    listExcuteResult['multiple_choice']=getRadio;
    listExcuteResult['blank_part']=getBlankPart;
    listExcuteResult['blank_row']=getBlankRow;
    listExcuteResult['matching']=getMatching;  
	listExcuteResult['fill_blank']=getFillBlank;	
	listExcuteResult['sequence']=getSequence;
	listExcuteResult['mistake']=getMistake;
var listExcuteAnswer={}
    listExcuteAnswer['multiple_choice']=showRadio;
    listExcuteAnswer['blank_row']=showBlankRow;
    listExcuteAnswer['blank_part']=showBlankpart;
    listExcuteAnswer['matching']=showMatching;
	listExcuteAnswer['fill_blank']=showFillBlank;
    listExcuteAnswer['sequence']=showSequence;
	listExcuteAnswer['mistake']=showMistake;
    function showRadio(elm,val){        
        if(elm.children('.olym_select:eq('+val+')').attr('value')!=''){
            elm.children('.olym_select:eq('+val+')').find('.r_on').removeClass('olym_elm_true').css('color','red').prev().addClass('olym_false'); 
            $('.r_on img').css('border','3px solid red');
			$('.olym_elm_true img').css('border','3px solid #3B9609');
			
		}else{
             elm.children('.olym_select:eq('+val+')').find('.olym_alert_re').text('Bạn chưa làm câu này');            
        }
		
    }
    function showBlankRow(elm,val){ 
      var inx_bl=elm.attr('inx');  
        if($('.olym_blank_r[inx='+inx_bl+']:eq('+val+')').val()!=''){
           $('.olym_blank_r[inx='+inx_bl+']:eq('+val+')').removeClass('olym_elm_true').css('color','red').prev().addClass('olym_false'); 
            
        }else{
          $('.olym_blank_r[inx='+inx_bl+']:eq('+val+')').removeClass('olym_elm_true');  
          elm.children('.olym_ques_item_blr:eq('+val+')').find('.olym_alert_re').text('Bạn chưa làm câu này');  
        }
      
    }
    function showBlankpart(elm,val){ 
      var inx_bl=elm.attr('inx');  
        var bl_curr=$(elm).children('.olym_blank_p:eq('+val+')');
        if(bl_curr.val()!=''){
           bl_curr.removeClass('olym_elm_true').css('color','red').prev().addClass('olym_false'); 
        }else{
          bl_curr.removeClass('olym_elm_true');  
        }
      
    }
	
    function showMatching(elm,val){       
        var bl_curr=$(elm).children('.olym_mt_drop').children('.olym_mt_drp:eq('+val+')');       
        bl_curr.children('.olym_mt_index').removeClass('olym_elm_true_mt').css('background','red');
    }
	function showSequence(elm,val){       
        var bl_curr=$(elm).children('.olym_box_seq').children('.olym_sequence_drop:eq('+val+')');       
        bl_curr.next('.olym_mt_index').removeClass('olym_elm_true_mt').css('background','red');
    }
	
	function showFillBlank(elm,val){ 
      var inx_bl=elm.attr('inx');  
        var bl_curr=$(elm).find('.olym_blank_input:eq('+val+')');
        if(bl_curr.val()!=''){
           bl_curr.removeClass('olym_elm_true').css('color','red').prev().addClass('olym_false'); 
        }else{
          bl_curr.removeClass('olym_elm_true');
		  elm.children('.olym_elm_fill_blank:eq('+val+')').find('.olym_alert_re').text('Bạn chưa làm câu này');  
        }
    }   
	function showMistake(elm,val){
		if(elm.find('.user_mistake').length>0){
			elm.find('.user_mistake').removeClass('user_mistake').after(' <span class="olym_text_check olym_false"></span>');
		}else{
			 elm.find('.olym_alert_re').text('Bạn chưa làm câu này');
		}
	}	
var data_post={};
function getFillBlank(elm){   
   var id_ques='',val='';
   id_ques=elm.attr('ix'); 
   var inx_bl=elm.attr('inx');  
   var data = [];    
      $('.olym_blank_input[inx='+inx_bl+']').each(function(i){
            val=delSpace($(this).val());            
			var arr_val=[];
			arr_val[0]=val;
			data[i]=arr_val; 
        });
		console.log(data);	
         data_post[id_ques]=data;
   
}    
function getRadio(elm){         
        var id_ques='',val='';  
        id_ques=elm.attr('ix');       
        var data = [];
        elm.children('.olym_select').each(function(i){            
        val= $(this).attr('value');                
		val=parseInt(val);
                arr_val=[];
                arr_val[0]=val;
                data[i]=arr_val;
         });
         data_post[id_ques] =data ;
         
}
function getMistake(elm){         
	var id_ques='',val='';  
	id_ques=elm.attr('ix');       
	var inx_bl=elm.attr('inx');  
   var data = []; 
	if(elm.find('.selectedText').length>0){
		elm.find('.selectedText').each(function(i){
			val=$(this).index();
			var arr_val=[];
			arr_val[0]=val;
			data[i]=arr_val; 
		 });
	}    
    data_post[id_ques]=data;
}
function getBlankPart(elm){   
   var id_ques='',val='';
   id_ques=elm.attr('ix'); 
   var inx_bl=elm.attr('inx');  
   var data = [];    
     elm.children('input').each(function(i){
            $(this).attr('ix',id_ques);
            val=delSpace($(this).val());
            // if(val!=''){
            
		arr_val=[];
                arr_val[0]=val;
                data[i]=arr_val;               
             // }
        }); 
         data_post[id_ques]=data;
   
}

function getBlankRow(elm){
   var id_ques='',val='';
   id_ques=elm.attr('ix'); 
   var inx_bl=elm.attr('inx');  
   var data = []; 
    $('.olym_blank_r[inx='+inx_bl+']').each(function(i){
            val=delSpace($(this).val());           
		var arr_val=[];
                arr_val[0]=val;
                data[0]=arr_val;               
            
	});		 
    data_post[id_ques]=data;
}
function getMatching(elm){
	var id_ques='',val='';  
	var data = [];  
         id_ques=elm.attr('ix'); 
	var inx_bl=elm.attr('inx');  
	$('.olym_mt_drp[tmp_inx='+inx_bl+']').each(function(i){
		val=$(this).attr('droped');
		var arr_val=[];
		arr_val[0]=val;
		data[i]=arr_val;       
	});
	data_post[id_ques]=data;
}		
function getSequence(elm){
	var id_ques='',val='';  
	var data = [];  
        id_ques=elm.attr('ix'); 
	var inx_bl=elm.attr('inx');  
	$('.olym_sequence_drag_'+inx_bl).each(function(i){
		val=$(this).attr('draged');
		var arr_val=[];
		arr_val[0]=val;
		data[i]=arr_val;       
	});
	data_post[id_ques]=data;
}
 
var olym_total=0;
function testAction(cmd){
    toPos('.olym_footer');		
	$('.olym_tbao').show();	
	$('.olym_tbao_text').html('Bạn còn <span>'+timer.minutes+' </span> phút <span>'+timer.seconds+'</span> giây để làm bài! Bạn có chắc chắn muốn nộp bài?<br/>');
        $('.olym_box_ctrl').hide();
}
function olymActionYes(){
    stoptime();	    
	var round=$("#round").text();
    var key_tpl='';
        $('.olym_elm').each(function(){
            key_tpl=$(this).attr('tpl');            
            funct=listExcuteResult[key_tpl];          
            funct($(this));
        });       
        console.log(JSON.stringify(data_post));
        var type="olympic_contest";   
	  olymSaveScore(olym_url+'ws_action/handle.php',{answers:JSON.stringify(data_post),round:round,type:type});	 
    toPos('.olym_box'); 
}
function olymActionNo(){
    $('.olym_tbao').hide();
    toPos('.olym_active');
    $('.olym_box_ctrl').show();
}
function olymSaveScore(link,str_data){
	$('.olym_main').hide();  
    $('.olym_ctrl').hide();
    $('.olym_footer').hide();	
    $('.olym_main').after('<center class="olym_processing"><img src="http://www.tienganh123.com/file/common/images/processing.gif" width="200px" height="200px" /></center>');
  
    $.ajax({
    url:link,
    data:str_data,
    type:"POST",		
    dataType:"json",
    success:function(obj){			
		$('.olym_processing').remove();     
		var olym_sos1=0,olym_sop1=0;
		var tg=parseInt($('#timer').text())/60; 	
		console.log(tg+'_p:'+timer.minutes+'_s:'+timer.seconds);	
		if(timer.seconds==0 && timer.minutes==0){
			olym_sos1=0;
			olym_sop1=20;
		}else{
			olym_sos1=60-timer.seconds;
			olym_sop1=tg-timer.minutes-1;
		}
		var olym_sos=olym_sos1;
		if(olym_sos1<10){
			olym_sos='0'+olym_sos1;
		}
		var olym_sop=olym_sop1;
		if(olym_sop1<10){
			olym_sop='0'+olym_sop1;
		}
            var get_time_=$('#time_current').val();
            if(get_time_){            
            }else{
				if($('.active').find('.text').length==1){
					$('.active').find('.text').html(' <p class="point"><span style="color: #58960f"><b>'+obj.success.score+'</b></span> / <span style="color: #737373"><b>'+obj.success.score_total+'</b></span> điểm <span class="ta123_st_tf"></span></p><p class="time">(<span style="color: #f27b00;">'+olym_sop+'</span> phút  <span style="color: #f27b00;">'+olym_sos+'</span> giây)</p>');
				}else{
				$('.active').append('<div class="text"></div>');
				$('.active').find('.text').html('<p class="point"><span style="color: #58960f"><b>'+obj.success.score+'</b></span> / <span style="color: #737373"><b>'+obj.success.score_total+'</b></span> điểm <span class="ta123_st_tf"></span></p><p class="time">(<span style="color: #f27b00;">'+olym_sop+'</span> phút  <span style="color: #f27b00;">'+olym_sos+'</span> giây)</p>');
              	}				
				var pass=Math.round(obj.success.score*100/obj.success.score_total);				
                if(pass>=75){
					$('.ta123_st_tf').addClass('ta123_tick');
                    $('.olym_pass').text(obj.success.score+'/'+obj.success.score_total); 
                    $('.olym_box_true').show();  
                    loadSocial();
                    loadScript(ur_fb,"load_js_fb");								
                    $('.fbuser_score').text(obj.success.score+'/'+obj.success.score_total);      
                }else{  
					$('.ta123_st_tf').addClass('ta123_untick');
                    $('.olym_pass_f').text(obj.success.score+'/'+obj.success.score_total); 
                    $('.olym_box_false').show();                     
                }
            }
     // show answer
     $('.olym_answer').show();    
      for (var key in obj.success.failed){        
           var re_obj = obj.success.failed[key];
           for (var x in re_obj){
            
            var elm_curr= $('.olym_elm[ix="'+x+'"]'); 
            var tpl_curr=elm_curr.attr('tpl');          
              var functAns=listExcuteAnswer[tpl_curr];
               functAns(elm_curr,re_obj[x]);
            }  
           }
		    if($('.olym_elm_true').length>0){
			   $('.olym_elm_true').each(function(){
				   $(this).css('color','#3B9609');
				   $(this).prev().addClass('olym_true');
				   
			   });
		   }
		    if($('.olym_elm_true_mt').length>0){
            $('.olym_elm_true_mt').each(function(){
               $(this).css('background','#3B9609');
               $(this).prev().addClass('olym_true');
            });
		   }
		   if($('.user_mistake').length>0){
			$('.user_mistake').each(function(){              
               $(this).after('<span class="olym_text_check olym_true"></span>');
			});
		   }
    
	}
	});
}
function showAnswers(cmd){
   $('.olym_main').show();  
   $('.olym_footer').show();    
     $('.olym_hidden').show(); 
   $('.olym_active').removeClass('olym_active');
   $('.olym_segment:eq(0)').addClass('olym_active');
   $(cmd).hide();
   $('.olym_next_dis').removeClass('olym_next_dis').addClass('olym_next_active');
   $('#olym_option option:eq(0)').attr('selected','selected');
   var olym_inx=$('.olym_active').attr('inx_ques');
	if(olym_inx.length<3){
			$('.olym_text_r1').text('Question');
		}else{
			$('.olym_text_r1').text('Questions');
	}
	$('.olym_inx').text(olym_inx);
    toPos('.olym_active');     
}
function shareFB(){ 
        var pas=$('.fbuser_score').text(); 
	$('.fb_tb_success').show();
	$('.fb_tb_success').html('<img src="/file/common/share/loading.gif" />sharing...');      
	var msg=' đã làm đúng '+pas;
	var url=olym_url1;
	var name=$('.active .number').text();	
	postFBLesson(msg,url,name);	

}
function olymNext(cmd){
	
	if ($(cmd).hasClass('olym_next_dis')){
		if(!paidmember()){
			$(cmd).after('<div class="tbao_nb">'+msg_vip+'<div class="img_close"></div></div>');		
		}else{
			$(cmd).after('<div class="tbao_nb">Đã hết câu hỏi! Bạn hãy kiểm tra lại và nộp bài để biết kết quả.<div class="img_close"></div></div>');		
			 $(document).mousedown(function(){
			  $('.tbao_nb').remove();
		  });
		}	
		$('.img_close').click(function(){
				$('.tbao_nb').remove();
		});
		 
    }else{
        $('.olym_back').removeClass('olym_back_dis').addClass('olym_back_active');	
        if($('.olym_active').next().is('.olym_segment')){			
                $('.olym_active').removeClass('olym_active').next().addClass('olym_active');
                if($('.olym_active .jquery_jplayer_long').length>0){
                        $('.olym_active .jquery_jplayer_long').each(function(i){	
                             addAudioLong_test(this,i);	
                        });	
                }			
                var n_segn=$('.olym_active').attr('inx_ques');			
                $('#olym_option option[value='+n_segn+']').attr('selected','selected');	
                var olym_inx=$('.olym_active').attr('inx_ques');
				if(olym_inx.length<3){
					$('.olym_text_r1').text('Question');
				}else{
					$('.olym_text_r1').text('Questions');
				}	
                $('.olym_inx').text(olym_inx);
                 toPos('.olym_active');		
        }
        if($('.olym_active').next().is('.olym_segment')){						
        }else{			
                 $(cmd).addClass('olym_next_dis').removeClass('olym_next_active');				  
        }	
	}
	
}

function olymBack(cmd){
	if ($(cmd).hasClass('olym_back_dis')) {
    } else{
		 $(cmd).addClass('olym_back_active').removeClass('olym_back_dis');
		if($('.olym_next').hasClass('olym_next_dis')){
			$('.olym_next').removeClass('olym_next_dis').addClass('olym_next_active');				
		}
		if($('.olym_active').prev().is('.olym_segment')){			
			$('.olym_active').removeClass('olym_active').prev().addClass('olym_active');
			if($('.olym_active .jquery_jplayer_long').length>0){
				$('.olym_active .jquery_jplayer_long').each(function(i){	
					addAudioLong_test(this,i);		
				});	
			}			
			var n_seg=$('.olym_active').attr('inx_ques');
			$('#olym_option option[value='+n_seg+']').attr('selected','selected');				
			if(n_seg.length<3){
					$('.olym_text_r1').text('Question');
				}else{
					$('.olym_text_r1').text('Questions');
			}
			$('.olym_inx').text(n_seg);
			toPos('.olym_active');
		}	
		if($('.olym_active').prev().is('.olym_segment')){					
		}else{
		  $(cmd).addClass('olym_back_dis').removeClass('olym_back_active');	
		}
	}
}
function getQuestion(inx_ques){	
	$('.olym_active').removeClass('olym_active');	
	$('.olym_segment[inx_ques='+inx_ques+']').addClass('olym_active');
	if($('.olym_active .jquery_jplayer_long').length>0){
		$('.olym_active .jquery_jplayer_long').each(function(i){	
			addAudioLong_test(this,i);		
		});	
	}  
	var olym_inx=$('.olym_active').attr('inx_ques');
	if(olym_inx.length<3){
			$('.olym_text_r1').text('Question');
		}else{
			$('.olym_text_r1').text('Questions');
	}	
	$('.olym_inx').text(olym_inx);	
	if($('.olym_active').next().is('.olym_segment')){
		$('.olym_next').removeClass('olym_next_dis').addClass('olym_next_active');	
	}else{			
		 $('.olym_next').addClass('olym_next_dis').removeClass('olym_next_active');	
	}
	if($('.olym_active').prev().is('.olym_segment')){
		$('.olym_back').removeClass('olym_back_dis').addClass('olym_back_active');	
	}else{			
		  $('.olym_back').addClass('olym_back_dis').removeClass('olym_back_active');	
	}	
	toPos('.olym_active');
}	
