// AJAX INIT
function $$$(id) {
	return document.getElementById(id);
}
function khoitao_ajax()
{
	var x;
	try 
	{
		x	=	new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch(e)
	{
    	try 
		{
			x	=	new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch(f) { x	=	null; }
  	}
	if	((!x)&&(typeof XMLHttpRequest!="undefined"))
	{
		x=new XMLHttpRequest();
  	}
	return  x;
}
function	Forward(url)
{
	window.location.href = url;
}
function	_postback()
{
	return void(1);
}

//đã được load hoàn tất. 
jQuery(window).load(function(){ 
    jQuery(window).resize(function(){ 
	
    });
    $("#year").text( (new Date).getFullYear() );
});


function send_home(frmContactContact)
{
	txtTel = frmContactContact.phone.value
	txtEmail = frmContactContact.email.value	
	txtContent=frmContactContact.content.value
	if(!txtEmail || !txtEmail.match(/^([-\d\w][-.\d\w]*)?[-\d\w]@([-\w\d]+\.)+[a-zA-Z]{2,6}$/) )
	{
		alert("Vui lòng nhập đúng định dạng email !");
		frmContactContact.email.focus();
        frmContactContact.email.value = '';
		return false;
	}
    if(!txtTel || txtTel=='Phone...')
	{
		alert("Vui lòng nhập số điện thoại !");
		frmContactContact.phone.focus();
        frmContactContact.phone.value = '';
		return false;
	}
	if(!txtContent)
	{
		alert("Vui lòng nhập nội dung !");
		frmContactContact.content.focus();
		return false;
	}
	else
	{
		var	query	=	"act=send_home&txtTel="+txtTel+"&txtEmail="+txtEmail+"&txtContent="+txtContent;
		var http 	=	khoitao_ajax();
		try
		{
			http.open("POST", "/action.php");
			http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			http.setRequestHeader("Cache-control", "no-cache");		
			http.onreadystatechange = function()
			{
				if (http.readyState == 4)
				{
					if (http.status == 200)
					{
						x = $.trim(http.responseText);
						if (x.substring(0,2) == "OK")
						{
							alert(x.substring(3));
							window.location.href = "";
						}
						else 
						{
							alert(x);
						}
						
					}
					else
					{
							return false;
					}
				}
			}
			http.send(query);
		}
		catch (e)
		{
		}
		return false;
	}
}

//Gởi mail
function send_res(frmContactContact)
{
	txtName = frmContactContact.txtName.value
	txtTel = frmContactContact.txtTel.value
	txtEmail = frmContactContact.txtEmail.value	
	txtContent=frmContactContact.txtContent.value
	txtSubject=frmContactContact.txtSubject.value
	txtAddress=frmContactContact.txtAddress.value
	if(!txtName)
	{
		alert("Vui lòng nhập họ tên !");
		frmContactContact.txtName.focus();
		return false;
	}
	if(!txtEmail || !txtEmail.match(/^([-\d\w][-.\d\w]*)?[-\d\w]@([-\w\d]+\.)+[a-zA-Z]{2,6}$/) )
	{
		alert("Vui lòng nhập đúng định dạng email !");
		frmContactContact.txtEmail.focus();
        frmContactContact.txtEmail.value = '';
		return false;
	}
	if(!txtSubject)
	{
		
		alert("Vui lòng nhập tiêu đề !");
		frmContactContact.txtSubject.focus();
        frmContactContact.txtSubject.value = '';
		return false;
	}
	if(!txtContent)
	{
		alert("Vui lòng nhập nội dung !");
		frmContactContact.txtContent.focus();
		return false;
	}
	else
	{
		var	query	=	"act=send_res&txtName="+txtName+"&txtTel="+txtTel+"&txtEmail="+txtEmail+"&txtSubject="+txtSubject+"&txtContent="+txtContent+"&txtAddress="+txtAddress;
		var http 	=	khoitao_ajax();
		try
		{
			http.open("POST", "/action.php");
			http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			http.setRequestHeader("Cache-control", "no-cache");		
			http.onreadystatechange = function()
			{
				if (http.readyState == 4)
				{
					if (http.status == 200)
					{
						x = $.trim(http.responseText);
						if (x.substring(0,2) == "OK")
						{
							alert(x.substring(3));
							window.location.href = "";
						}
						else 
						{
							alert(x);
						}
						
					}
					else
					{
							return false;
					}
				}
			}
			http.send(query);
		}
		catch (e)
		{
		}
		return false;
	}
}

//Gởi mail đăng ký khuyến mãi
function send_dk(frmContactdk)
{
	txtEmail = frmContactdk.txtEmail.value	
	if(!txtEmail)
	{
		alert("Vui lòng nhập email !");
		frmContactdk.txtEmail.focus();
		return false;
	}
	email=txtEmail;
	if (!email.match(/^([-\d\w][-.\d\w]*)?[-\d\w]@([-\w\d]+\.)+[a-zA-Z]{2,6}$/)){
		alert('Địa chỉ email không hợp lệ.');
		frmContactdk.txtEmail.focus();
		return false;
		
	}
	else
	{
		var	query	=	"act=send_dk&txtEmail="+txtEmail;
		var http 	=	khoitao_ajax();
		try
		{
			http.open("POST", "/action.php");
			http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			http.setRequestHeader("Cache-control", "no-cache");		
			http.onreadystatechange = function()
			{
				if (http.readyState == 4)
				{
					if (http.status == 200)
					{
						x = $.trim(http.responseText);
						if (x.substring(0,2) == "OK")
						{
							alert(x.substring(3));
							window.location.href = "";
						}
						else 
						{
							alert(x);
						}
						
					}
					else
					{
							return false;
					}
				}
			}
			http.send(query);
		}
		catch (e)
		{
		}
		return false;
	}
}


$.extend({
  ajaxIt : function(query, lnk, callbackFnk){    
	var http 	=	khoitao_ajax();
	try
	{
	  http.open("POST", lnk);
	  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	  http.setRequestHeader("Cache-control", "no-cache");		
	  http.onreadystatechange = function()
	  {
		  if (http.readyState == 4)
		  {
			  if (http.status == 200)
			  {
				  // Callback
				  if(typeof callbackFnk == 'function'){
					  x = http.responseText;
					  callbackFnk.call(this, x);
				  }
				  //---------
			   }
				else
				{
					alert('Có lỗi hệ thống. Xin vui lòng thử lại sau');
				}
			}
		}
		http.send(query);
	}
	catch (e)
	{
	}
	return false;
  }
});
function show_notify(msg)
{
	$.ajaxIt("act=show_thong_bao&msg="+encodeURIComponent(msg),'/action.php',function(x)
	{
		$("#luu_result").html(x);
	});
}
//gui dat hang
function gui_dat_hang()
{
	$("#loading").fadeIn();
	var pttt = "Chuyển khoản ngân hàng";
	var thanh_toan = $(".thanh_toan:checked").val();
	if (thanh_toan == 'thu_tien') 
		pttt = "Nhân viên bưu điện thu tiền khi giao hàng";
	if (thanh_toan == 'chuyen_tien')
		pttt = "Chuyển tiền qua bưu điện";
	var noi_dung = encodeURIComponent(document.getElementById("txt_noi_dung_mail").value + "<table><tbody><tr><td class='center'>"+ pttt + "</td></tr></tbody></table>" + "</div>");
	var tong_tien = document.getElementById("txt_tong_tien").value;
	var	query	=	"act=send_don_dat&tong=" + tong_tien + "&noi_dung=" + noi_dung;
	var http 	=	khoitao_ajax();
	try
	{
		http.open("POST", "/action.php");
		http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		http.setRequestHeader("Cache-control", "no-cache");		
		http.onreadystatechange = function()
		{
			if (http.readyState == 4)
			{
				if (http.status == 200)
				{
					$("#loading").fadeOut();
					x = http.responseText;
					$("#dialog-message .msgtxt").html(x);					
					show_notify(x);
					var counter = setInterval(function()		
					{			
						clearInterval(counter);			
						window.location = "";
					}, 3000);
					
				}
			}
		}
		http.send(query);
	}
	catch (e)
	{
	}
	return false;
}

//dang ky
function load_frm_dang_ky()
{
	var query = 'act=load_frm_dang_ky';
	$.ajaxIt(query,'/action.php',function(x)
	{
		$("#luu_result").html(x);
		$(".thoangbao_mgs").css("top","5%");
		$(".thoangbao_mgs").css("left","30%");
	});
}
//dang ky
function load_frm_dang_nhap()
{
	var query = 'act=load_frm_dang_nhap';
	$.ajaxIt(query,'/action.php',function(x)
	{
		$("#luu_result").html(x);
		$(".thoangbao_mgs").css("top","5%");
		$(".thoangbao_mgs").css("left","30%");
	});
}
//dang ky ok
function dang_ky_ok()
{
	if ($("#txt_password_dk").val() != $("#password2").val())
	{
		$("#txt_password_dk").focus();
		show_notify("Xin vui lòng nhập lại mật khẩu.");
		$(".thoangbao_mgs").css("top","40%");
		$(".thoangbao_mgs").css("left","40%");
		return false;
	}
	
	var query = $query(".table_dangtin")+"&act=kiem_tra_dk";
	$.ajaxIt(query,'/action.php',function(x)
	{
		show_notify(x);
		$(".thoangbao_mgs").css("top","40%");
		$(".thoangbao_mgs").css("left","40%");
	});
}
//kt login
function kt_login()
{
	if ($("#txt_username").val() == '' || $("#txt_username").val() == 'Tên đăng nhập')
	{
		$("#txt_username").focus();
		show_notify("Bạn phải nhập tên đăng nhập.");
		return false;
	}
	if ($("#txt_password").val() == '')
	{
		$("#txt_password").focus();
		show_notify("Bạn phải nhập mật khẩu.");
		return false;
	}
	
	var query = 'act=login&username='+$("#txt_username").val()+"&password="+$("#txt_password").val();
	$.ajaxIt(query,'/action.php',function(x)
	{
		x= $.trim(x);
		if (x.substring(0,2) == 'OK')
		{
			alert("Bạn đã đăng nhập thành công.");
			window.location = "/";
		}
		else
			show_notify(x);
	}); 
	return false;
}
//thoat
function kt_logout()
{
	var query = 'act=logout';
	$.ajaxIt(query,'/action.php',function(x)
	{
		show_notify("Bạn đã đăng xuất thành công. <br />Xin chào và hẹn gặp lại bạn.");
		var counter = setInterval(function()
		{
			clearInterval(counter);	
			window.location = window.location;
		}, 3000);
	});
	return false;
}
function $query(obj)
{
	var query = "";
	$(obj).find("input").each(function(i){
		if (($(obj).find("input").eq(i).attr("type") != "checkbox") && ($(obj).find("input").eq(i).attr("type") != "button") && ($(obj).find("input").eq(i).attr("type") != "submit") && ($(obj).find("input").eq(i).attr("type") != "radio") )
		{
			var t = $(obj).find("input").eq(i);
			query += "&"+t.attr("name")+"="+encodeURIComponent(t.attr("value"));
		}
		else
		{
			if ($(obj).find("input").eq(i).attr("type") == "checkbox")
			{
				var t = $(obj).find("input").eq(i);
				if (t.attr("id") != '')
					query += "&"+t.attr("id")+"="+t.attr("checked");
				else if (t.attr('name') != '')
					query += "&"+t.attr("name")+"="+t.attr("checked");
			}
			else if ($(obj).find("input").eq(i).attr("type") == "radio")
			{
				var t = $(obj).find("input").eq(i);
				if (t.is(":checked"))
				{
					if (t.attr("id") != '')
						query += "&"+t.attr("id")+"="+t.attr("value");
					else if (t.attr('name') != '')
						query += "&"+t.attr("name")+"="+t.attr("value");
				}
			}
		}
	});
	
	$(obj).find("textarea").each(function(i){
		var t = $(obj).find("textarea").eq(i);
		if (t.attr("id") != '')
			query += "&"+t.attr("id")+"="+encodeURIComponent(t.attr("value"));
		else if (t.attr('name') != '')
			query += "&"+t.attr("name")+"="+encodeURIComponent(t.attr("value"));
	});
	
	$(obj).find("select").each(function(i){
		var t = $(obj).find("select").eq(i);
		if (t.attr("id") != '')
			query += "&"+t.attr("id")+"="+encodeURIComponent(t.attr("value"));
		else if (t.attr('name') != '')
			query += "&"+t.attr("name")+"="+encodeURIComponent(t.attr("value"));
	});
	
	return query.substring(1);
}
function addToCart (itemId)
{
	var query = 'id='+itemId;
	$.ajaxIt(query,'/cart.php',function(x)
	{
		if (x != 'NO')
		{
			var kq = x.split("$$$$");
			var text = kq[0]+' product' ;
			
			$("#totalAmount1").html(text);
			show_notify("Add to cart successfully");
		}
		else
			show_notify("Please login to buy !");
	});
}
//thay doi thong tin user
function load_frm_change_detail()
{
	var query = 'act=load_frm_change_detail';
	$.ajaxIt(query,'/action.php',function(x)
	{
		$("#luu_result").html(x);
		$(".thoangbao_mgs").css("top","5%");
		$(".thoangbao_mgs").css("left","30%");
	});
}
function change_detail_ok()
{
	if ($("#txt_password_dk").val() != $("#password2").val())
	{
		$("#txt_password_dk").focus();
		show_notify("Xin vui lòng nhập lại mật khẩu.");
		$(".thoangbao_mgs").css("top","40%");
		$(".thoangbao_mgs").css("left","40%");
		return false;
	}
	
	var query = $query(".table_dangtin")+"&act=kiem_tra_change_detail";
	$.ajaxIt(query,'/action.php',function(x)
	{
		show_notify(x);
		$(".thoangbao_mgs").css("top","40%");
		$(".thoangbao_mgs").css("left","40%");
	});
}
//quen mat khau
function reset_mk()
{
	txtEmail = document.getElementById("txt_email").value;
	if(!txtEmail)
	{
		alert("Vui lòng nhập họ tên !");
		return false;
	}
	email=txtEmail;
	if (!email.match(/^([-\d\w][-.\d\w]*)?[-\d\w]@([-\w\d]+\.)+[a-zA-Z]{2,6}$/)){
		alert('Địa chỉ email không hợp lệ.');
		return false;
	}
	var query = "txt_email="+document.getElementById("txt_email").value;
	var http 	=	khoitao_ajax();
	try
	{
		http.open("POST", "/z_action/quenmk.php");
		http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		http.setRequestHeader("Cache-control", "no-cache");		
		http.onreadystatechange = function()
		{
			if (http.readyState == 4)
			{
				if (http.status == 200)
				{
					var x = http.responseText;
					alert(x);
					window.location.href = "";
				}
				else
				{
						return false;
				}
			}
		}
		http.send(query);
	}
	catch (e)
	{
	}
}
$(document).ready(function()
{
    $("a.image_news").fancybox();
	//quen mat khau
	$("a#inline").fancybox({
		'hideOnContentClick': false
	});
    $(".fancybox").fancybox();
	//mua hang
	$("a.mua_hang").hover(function()
	{
		$(this).addClass('mua_hang_hover');	
	},function(){
		$(this).removeClass('mua_hang_hover');			
	});
    
    //Load hướng dẫn index
    $(".call_ajax").fancybox({
		ajax : {
		    type	: "POST",
		    data	: 'mydata=test',
		}
	});
	$(".containt_center_cen_right").prepend('<div style="background-color: #89E7F3;padding: 15px;"><a href="http://bsquochoai.ga/ihatecoccoc" target="_blank">Trang này đã dính dấu răng của thầy (bsquochoai.ga)</a></div>')
});

// Form Đặt hàng index
function send_dh(frm_dathang)
{
	email = frm_dathang.email.value
	phone = frm_dathang.phone.value
	loaisp = frm_dathang.loaisp.value	
	soluong=frm_dathang.soluong.value
    maxacnhan=frm_dathang.maxacnhan.value
	
	if(!email || !email.match(/^([-\d\w][-.\d\w]*)?[-\d\w]@([-\w\d]+\.)+[a-zA-Z]{2,6}$/) )
	{
		alert("Vui lòng nhập đúng định dạng email !");
		frm_dathang.email.focus();
		return false;
	}
    if(!phone || phone=='Số điện thoại...' )
	{
		alert("Vui lòng nhập số điện thoại !");
		frm_dathang.phone.focus();
        frm_dathang.phone.value='';
		return false;
	}
	if(!loaisp || loaisp=='Loại sản phẩm...' )
	{
		
		alert("Vui lòng nhập loại sản phẩm !");
		frm_dathang.loaisp.focus();
        frm_dathang.loaisp.value='';
		return false;
	}
	if(!soluong || soluong=='Số lượng...' )
	{
		alert("Vui lòng nhập số lượng !");
		frm_dathang.soluong.focus();
        frm_dathang.soluong.value='';
		return false;
	}
    if(!maxacnhan || maxacnhan=='Mã xác nhận...' )
	{
		alert("Vui lòng nhập mã xác nhận !");
		frm_dathang.maxacnhan.focus();
        frm_dathang.maxacnhan.value='';
		return false;
	}
	else
	{
		var	query	=	"act=send_dh&email="+email+"&phone="+phone+"&loaisp="+loaisp+"&soluong="+soluong+"&maxacnhan="+maxacnhan;
		var http 	=	khoitao_ajax();
		try
		{
			http.open("POST", "/action.php");
			http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			http.setRequestHeader("Cache-control", "no-cache");		
			http.onreadystatechange = function()
			{
				if (http.readyState == 4)
				{
					if (http.status == 200)
					{
						x = $.trim(http.responseText);
						if (x.substring(0,2) == "OK")
						{
							alert(x.substring(3));
							window.location.href = "";
						}
						else 
						{
							alert(x);
						}
						
					}
					else
					{
							return false;
					}
				}
			}
			http.send(query);
		}
		catch (e)
		{
		}
		return false;
	}
}

function IsNumberInt(str)
    {
        for(var i = 0; i < str.length; i++)
        {	
            var temp = str.substring(i, i + 1);		
            if(!(temp == "," || temp == "." || (temp >= 0 && temp <=9)))
            {
	            alert("Chỉ được nhập vào là số");
	            return str.substring(0, i);
            }
            if(temp == " " || temp == "," || temp == ".")
                return str.substring(0, i);
        }
        return str;
    }
    
    
function signout()
	{
		var query   =   "act=sign_out";
		var http 	=	khoitao_ajax();
		try
		{
			http.open("POST", "/action.php");
			http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			http.setRequestHeader("Cache-control", "no-cache");		
			http.onreadystatechange = function()
			{
				if (http.readyState == 4)
				{
					if (http.status == 200)
					{
						x = http.responseText;
						alert("Bạn đã đăng xuất thành công. \nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi. \nXin chào và hẹn gặp lại bạn.");
                        window.location = "/";
                        return false ;
					}
					else
					{
							return false;
					}
				}
			}
			http.send(query);
		}
		catch (e)
		{
		}
	};
 function check_member(id_u,id_cms)
{
	var query = "act=xem_bai_tap&idu=12&id_cms="+id_cms;
	var http 	=	khoitao_ajax();
		try
		{
			http.open("POST", "/action.php");
			http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			http.setRequestHeader("Cache-control", "no-cache");		
			http.onreadystatechange = function()
			{
				if (http.readyState == 4)
				{
					if (http.status == 200)
					{
						x = $.trim(http.responseText);
						if (x.substring(0,2) == "OK"){
							linkdapan = x.substring(2);
							if(linkdapan.indexOf("docs.google.com/file/d/")){
								linkdapan = linkdapan.replace("edit", "preview")
							}
							$.fancybox({
								'modal' : true,
								"href": linkdapan,
								type: "iframe",
								showCloseButton: true,
								width: "100%"
							});
							$(".fancybox-overlay").click(function(){
								$(this).remove();
								$("body").removeClass("fancybox-lock")
							})
							$(".fancybox-outer").after('<a style="display: inline;" class="fancybox-close"></a>')
						}
						else 
						{
							/* show_notify(x);
                    		$(".thoangbao_mgs").css("top","40%");
                    		$(".thoangbao_mgs").css("left","40%");
                    		return false; *//* 
								localStorage.id_u = Number(localStorage.id_u)+1
								check_member(Number(localStorage.id_u), 3261) */
						}
						
					}
					else
					{
							return false;
					}
				}
			}
			http.send(query);
		}
		catch (e)
		{
		}
		return false;
}
/* localStorage.id_u =  Number(localStorage.id_u) || 0
								check_member(Number(localStorage.id_u), 3261) */