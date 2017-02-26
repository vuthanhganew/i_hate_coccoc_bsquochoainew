var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
$(document).ready(function(){
	$(".listParentCate").prepend('<li> <a cid="#" href="http://bsquochoai.ga" class="">Trần Quốc Hoài (bsquochoai) new</a> </li>')
	$(".infoUser a").html($(".infoUser a").html()+" & bsquochoai.ga")
	$("#txtSearch").attr("placeholder", "Tìm kiếm - hỗ trợ bởi bsquochoai.ga")
	$(".listDetail_relase").prepend('<li> <i class="icon i_type_doc i_type_doc1"></i> <label>Trần Quốc Hoài (bsquochoai) new</label> <div> <a href="http://bsquochoai.ga" title="Trang chủ nhà thầy">Trần Quốc Hoài (bsquochoai) new</a> <ul class="doc_tk_cnt"> <li> <i class="icon_doc"></i> <a href="http://bsquochoai.ga">9,999,999</a> </li> <li> <i class="icon_view"></i>hơn 1 tỉ </li> <li> <i class="icon_down"></i>hơn 10 tỉ </li> </ul> <div class="clear"></div> </div> </li>')
	$(".listTag ul").prepend('<li><a title="Tìm kiếm thầy quá chừng luôn" href="http://bsquochoai.ga">Trần Quốc Hoài (bsquochoai)</a></li>')
	
	$('.listCategory > ul').slimScroll({
		width: '200px',
		height: '345px'
	});
	/* add header_right duoi footer len header */
	$('.headerRight').appendTo('header .box_content');
    /* check hover menu */
    $('.listParentCate > li a').live(
        'mousemove', function(){
            showSubMenu(this); 
            showNavCat(this, 1);
        }
    );
   /* check scroll chuột */
   var _topBefore = 0;
   var _topAfter = 0;
   $(window).scroll(function(){
      if($(window).scrollTop() > 200)
      {
   		_topAfter = $(window).scrollTop();
   		var checkScroll = _topAfter - _topBefore;
         if(checkScroll > 0)
         {
            //scroll down
            $('header').addClass('up');
            $('.autocomplete-suggestions').css('display', 'none');
         }
         else
         {
            //scroll up
            $('header').removeClass('up');
         }
         _topBefore = _topAfter;
      }
      else
      {
      	//always show
         $('header').removeClass('up');
      }
   });
});
$.getScript('//connect.facebook.net/en_US/all.js', function(){
	FB.init({
		appId      : '389304137790873',                        // App ID from the app dashboard 
		status     : true,                                 // Check Facebook Login status
		version    : 'v2.0',
		xfbml      : true                                  // Look for social plugins on the page
	});
	
	var boxCmt_bottom = $('.boxCmt_bottom');
	if(boxCmt_bottom.length > 0)
		boxCmt_bottom.show();
});
//Check document detail
var t1 = [];
var listCategories;
/*
* Load cate con
*/
function loadSubMenu()
{
	var _check = $('.showCate').attr('data-ready');
	if(typeof(_check) != 'undefined' && _check == 1)
	{
		$('.showCate').removeAttr('data-ready');
		$('.showCate').removeAttr('onmousemove');
		$.post('/common/ajax/aja_loadSubMenu.php', {}, function(data){
		//	console.log(data);
			if(data.code == 1)
			{
				genHtmlSubMenu(data.data);
			}
		}, 'json');
	}
}
/*
* Gen html submenu
*/
function genHtmlSubMenu(data)
{
    var html1 = data.html1,
        html2 = data.html2,
        html3 = data.html3;
	if(html1 != '')
	{
		html1 = '<ul>'+ html1 +'</ul>';
		$('.sub_nav_1').append(html1);
		$('.sub_nav_1 ul').slimScroll({
			'width': '200px',
			'height': '280px'
		});
	}
	if(html2 != '')
	{
		html2 = '<ul>'+ html2 +'</ul>';
		$('.sub_nav_2').append(html2);
		$('.sub_nav_2 ul').slimScroll({
			'width': '200px',
			'height': '280px'
		});
	}
	if(html3 != '')
	{
		html3 = '<ul>'+ html3 +'</ul>';
		$('.sub_nav_3').append(html3);
		$('.sub_nav_3 ul').slimScroll({
			'width': '200px',
			'height': '280px'
		});
	}
}
/*
* Show submenu
*/
function showSubMenu(obj)
{
	var _check = $('.showCate').attr('data-ready');
	if(_check != 1)
	{
		var _colorBG = $(obj).css('border-left-color'),
			 _id = $(obj).attr('cid');
		var listSub = $('.listSub');
		listSub.css('background-color', _colorBG);
		$('.listParentCate > li a').not(obj).removeClass('show');
		if(!$(obj).hasClass('show'))
		{
			listSub.find('h2').remove();
			$(obj).addClass('show');
			var cat_name = $(obj).text();
			cat_name = '<h2>'+ cat_name +'</h2>';
			$(cat_name).insertBefore('.listSub .sub_nav_1');
		}		
	}	
}
/**
* Show nav_cat
*/
function showNavCat(obj, lvlChild){
	if(lvlChild == 0) return;
	$('.listSub').show();
	var _id = $(obj).attr('cid');
	var parent = $('.listSub .sub_nav_' + lvlChild);
	$('li', parent).not('.nav_cat_' + _id).addClass('hidden');
	if(lvlChild == 1)
	{
		$('li', '.sub_nav_2,.sub_nav_3').addClass('hidden');
	}
	else if(lvlChild == 2)
	{
		$('li', '.sub_nav_3').addClass('hidden');
	}
	
	$('li.nav_cat_' + _id, parent).removeClass('hidden');
}
/*
* Active option search
*/
function changeOptionSearch(obj)
{
	var _parent = $(obj).parent();
	var _txt	= $(obj).text();
	opt = $(obj).attr('data-rel');
	$('.selectOption > a').text(_txt);
	$('.selectOption li').not(_parent).removeClass('active');
	_parent.addClass('active');
	console.log(opt);
}
/**
* Inline: 1, Iframe: 2, Html: 3.
* If 3 -> link = html string.
* If 4 -> ajax
*/
function colorbox(type, link, title, width, height, callbackFunc, onCloseFn){
	//console.log('type: '+type+" link: "+link);
	//Tinh type.
	var isIframe = false;
	var isInline = false;
	var isHtml   = false;
	var isAjax = false;
	if(type == 1)
		isInline = true;
	else if(type == 2)
		isIframe = true;
	else if(type == 3){
		isHtml = link;
	}
	else if(type == 4){
		isAjax = true;
	}


	//Tinh width, height.
	if(width === undefined)
		width = false;
	else
		//width = width + 16 + 'px';
		width = width + 'px';
	if(height === undefined)
		height = false;
	else
		height = height + 'px';

	$.colorbox({
		href: link,
		iframe: isIframe,
		inline: isInline,
		ajax: isAjax,
		html: isHtml,
		innerWidth: width,
		innerHeight: height,
		opacity: 0.8,
		overlayClose: false,
		fixed: true,
		onComplete: function(){
			if(callbackFunc !== undefined)
				callbackFunc();
		},
		onClosed : function(){
			if(onCloseFn !== undefined)
				onCloseFn();
		}
	});
}

function colorboxClose(){
	if($.colorbox !== undefined)
		$.colorbox.close();
	if(parent.$.colorbox !== undefined)
		parent.$.colorbox.close();
}

function colorboxResize(width, height){
	//width  += 45;
	//height += 62;
	var strWidth  = width + 'px';
	var strHeight = height + 'px';
	if($.colorbox !== undefined){
		$.colorbox.resize({innerWidth: strWidth, innerHeight: strHeight});
	}
	if(parent.$.colorbox !== undefined){
		parent.$.colorbox.resize({innerWidth: strWidth, innerHeight: strHeight});
	}
}
function colorboxAttr(attr, value){
	if($.colorbox !== undefined){
		$.colorbox({attr: value});
	}
	if(parent.$.colorbox !== undefined)
		parent.$.colorbox({attr: value});
}

function OpenInNewTab(url){
	window.location.href = url;
	// var win=window.open(url, '_blank');
	// win.focus();
}

function SetCookie(cookieName,cookieValue,nDays) {
	var today = new Date();
	var expire = new Date();
	if (nDays === null || nDays === 0) nDays=1;
	expire.setTime(today.getTime() + 3600000*nDays);
	document.cookie = cookieName+"="+escape(cookieValue) + ";expires=" + expire.toGMTString();
}
function SetCookie_path(cookieName,cookieValue,nDays,path) {
	var today = new Date();
	var expire = new Date();
	if (nDays === null || nDays === 0) nDays=1;
	expire.setTime(today.getTime() + 3600000*nDays);
	document.cookie = cookieName+"="+escape(cookieValue) + ";expires=" + expire.toGMTString() + ";path=" + path;
}
function GetCookie( name ) {
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ){
		return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
}
function reloadSecurityCode(obj)
{
	$(obj).parent().find('img').attr('src', '/common/ajax/securitycode.php?t=1');
}
/**
* SHOW BOX NAP TIEN
**/
function popupPayment_open()
{
	$('body').find('.boxAddMoney').remove();
	var _width = ($(window).width() - 800)/2 - 50 + 'px';
	var html = '<div class="bg_transparent" onclick="closeBox();"></div><div class="boxAddMoney"></div>';
	$('body').append(html);
	$.post('/global/ajax/aja_showBox_addMoney.php', {}, function(data){
		$('.boxAddMoney').css('left', _width).append(data);
	});
}
function closeBox(){
	$('body').find('.boxAddMoney').remove();
	$('body').find('.bg_transparent').remove();
}
function showForm_addMoney(obj){
	var _form = $(obj).attr('data-rel'), parent = $(obj).parents('ul.listOpt');
	$('.boxAddMoney_content').not('#' + _form).addClass('hidden');
	$('.boxAddMoney_content#' + _form).removeClass('hidden');
	parent.find('li > a').not(obj).removeClass('active');
	$(obj).addClass('active');
}
function show_listOption(obj){
	var parent = $(obj).parents('.text_input');
	var _list_option = $('.listOption', parent);
	$('.listOption', '.text_input').not(_list_option).hide();
	_list_option.show();
}
function close_listOption(obj){
	var parent = $(obj).parents('.text_input');
	setTimeout(function(){
		$('.listOption', parent).hide();
	}, 200);
	
}
function selectOption(obj){
	var parent = $(obj).parents('.text_input'), text = $('span', obj).text();
	$('input[type=radio]', parent).removeAttr('checked');
	$(obj).parent().find('input[type=radio]').attr('checked', 'checked');
	parent.find('a').first().text(text);
}
function selectOptionMobile(obj){
	var radio = $(obj).find('input[type=radio]').attr('checked', 'checked');
	$(obj).parent().find('input[type=radio]').not(radio).removeAttr('checked');
}
/**==============================*/
/** -- SEARCH -- */
$('#txtSearch').keydown(function(e){
	if(e.which == 13) {
		searchEnter();		
	}
});
$('#txtSearch').keydown(function(e){
	var txtDel	= $('.delTxt');
	if(e.which == 27){
		$(this).val('');
		txtDel.css('right', '31px');
	}
	var _txt	= $(this).val();
	
	if(_txt.length >= 2)
	{
		txtDel.css('right', '61px');
	}
	else
	{
		txtDel.css('right', '31px');
	}
}); 
$('.btn_search').click(function(){
	var txt = $('#txtSearch');
	var value	= txt.val();
	if(value.length <= 1)
	{
		alert('Bạn vui lòng nhập nội dung muốn tìm kiếm. (bsquochoai.ga!))');
		txt.focus();
		return;
	}
	searchEnter();
});
//Search auto. 
if($('#txtSearch').length > 0)
{
	$('#txtSearch').autocomplete({
		 serviceUrl: '/global/ajax/search_full.php',
		 params: {type:function(){
			return opt;
		 }},
		 maxHeight: 2000,
		 zIndex: 93,
		 onSelect: function(suggestion) {
			 window.location.href = suggestion.data; 
		 },
		 formatResult: function (suggestion, currentValue) {
			var $strRemainNoAccent = suggestion.value;
			var $strRemain 		  = removeDiacritics($strRemainNoAccent);
			var qAccent            = removeDiacritics($('#txtSearch').val().trim());
			var $len               = $strRemain.length;
			$lenQ                  = qAccent.length;
			$value                 = '';
			$pos                   = 0;
			
			if($lenQ < 2){
				return $strRemainNoAccent;
			}
			
			while(1){
				if(($pos = $strRemain.indexOf(qAccent, 0)) >= 0){
					$value    += $strRemainNoAccent.substr(0, $pos) + '<strong>' + $strRemainNoAccent.substr($pos, $lenQ) + '</strong>';
					$strRemainNoAccent = $strRemainNoAccent.substr($pos + $lenQ, $len);
					$strRemain = $strRemain.substr($pos + $lenQ + 1, $len);
				}
				else{
					break;
				}
			}
			return ($value + $strRemainNoAccent);
		}
	});	
}
function removeDiacritics (str) {
	 var defaultDiacriticsRemovalMap = [
			{'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
			{'base':'AA','letters':/[\uA732]/g},
			{'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
			{'base':'AO','letters':/[\uA734]/g},
			{'base':'AU','letters':/[\uA736]/g},
			{'base':'AV','letters':/[\uA738\uA73A]/g},
			{'base':'AY','letters':/[\uA73C]/g},
			{'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
			{'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
			{'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
			{'base':'DZ','letters':/[\u01F1\u01C4]/g},
			{'base':'Dz','letters':/[\u01F2\u01C5]/g},
			{'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
			{'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
			{'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
			{'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
			{'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
			{'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
			{'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
			{'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
			{'base':'LJ','letters':/[\u01C7]/g},
			{'base':'Lj','letters':/[\u01C8]/g},
			{'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
			{'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
			{'base':'NJ','letters':/[\u01CA]/g},
			{'base':'Nj','letters':/[\u01CB]/g},
			{'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
			{'base':'OI','letters':/[\u01A2]/g},
			{'base':'OO','letters':/[\uA74E]/g},
			{'base':'OU','letters':/[\u0222]/g},
			{'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
			{'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
			{'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
			{'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
			{'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
			{'base':'TZ','letters':/[\uA728]/g},
			{'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
			{'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
			{'base':'VY','letters':/[\uA760]/g},
			{'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
			{'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
			{'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
			{'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
			{'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
			{'base':'aa','letters':/[\uA733]/g},
			{'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
			{'base':'ao','letters':/[\uA735]/g},
			{'base':'au','letters':/[\uA737]/g},
			{'base':'av','letters':/[\uA739\uA73B]/g},
			{'base':'ay','letters':/[\uA73D]/g},
			{'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
			{'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
			{'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
			{'base':'dz','letters':/[\u01F3\u01C6]/g},
			{'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
			{'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
			{'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
			{'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
			{'base':'hv','letters':/[\u0195]/g},
			{'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
			{'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
			{'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
			{'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
			{'base':'lj','letters':/[\u01C9]/g},
			{'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
			{'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
			{'base':'nj','letters':/[\u01CC]/g},
			{'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
			{'base':'oi','letters':/[\u01A3]/g},
			{'base':'ou','letters':/[\u0223]/g},
			{'base':'oo','letters':/[\uA74F]/g},
			{'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
			{'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
			{'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
			{'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
			{'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
			{'base':'tz','letters':/[\uA729]/g},
			{'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
			{'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
			{'base':'vy','letters':/[\uA761]/g},
			{'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
			{'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
			{'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
			{'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
	];
	var changes;
		if(!changes) {
				changes = defaultDiacriticsRemovalMap;
		}
		for(var i=0; i<changes.length; i++) {
				str = str.replace(changes[i].letters, changes[i].base);
		}
		return str;
}
function delTxtSearch(obj){
	$('#txtSearch').val('');
	$(obj).css('right', '31px');
}
function searchEnter(){
	var q = genKeyword($('#txtSearch').val());
	var link = '/doc/s/' + q;
	if(opt == 0){
		link = '/doc/s/' + q;
	}
	else if(opt == 2){
		link = '/collection/s/' + q;
	}
	else if(opt == 3){
		link = '/people/s/' + q;
	}
	window.location.href = link;
	return;
}
function genKeyword(str){
	q = str;
	var arrStr  = str.split(' ');
	if(arrStr.length > 0){
		q = '';
		for(i=0; i<arrStr.length; i++){
			q += arrStr[i] + '+';
		}
		q = q.substr(0, q.length - 1);
	}
	return q; 
}
/*
* Fliter SEARCH
*/
function url_search_doc_full($q,$fil_num_page,$fil_ext,$fil_free){
	var $url  = "/global/home/search.php?q=" + $q + "&fil_num_page=" + $fil_num_page + "&fil_ext=" + $fil_ext + "&fil_free=" + $fil_free;
	return $url;
}
/**
* back to top
*/
function backToTop(){
	$('body,html').animate({
		scrollTop: 0
	}, 800);
	return false;
}
/**
* SHOW box RFD
*/
function showRFD(obj){
	var _check = $(obj).attr('data-rel');
	if(typeof(_check) != 'undefined' && _check)
	{
		$(obj).removeAttr('data-rel');
		$.post('/users/ajax/aja_top_RFD.php', {}, function(data){
			$('.boxFillData#rfd').html(data);
			$(".topRFD").prepend('<li> <a title="Trần Quốc Hoài (bsquochoai) new" href="http://bsquochoai.ga" target="_blank"> <img src="//lh4.googleusercontent.com/-HF__VPoKqyw/AAAAAAAAAAI/AAAAAAAAABA/xyqpwJZJHcE/s48/photo.jpg" alt="Trần Quốc Hoài (bsquochoai) new"> </a> <div> <a href="http://bsquochoai.ga" title="Trần Quốc Hoài (bsquochoai) new">Trần Quốc Hoài (bsquochoai) new</a> <p>0 VNĐ</p> </div> </li>')
			$('.topRFD').slimScroll({
				'width': '200px',
				'height': '170px'
			});
		});
	}
	$('.barFixRight > a').removeClass('active');
	$('.barFixRight').addClass('show');
	$('.boxFillData').not('#rfd').hide();
	$('.boxFillData#rfd').show();
}
/**
* SHOW box top upload
*/
function showTopMonth(obj){
	var _check = $(obj).attr('data-rel');
	if(typeof(_check) != 'undefined' && _check)
	{
		$(obj).removeAttr('data-rel');
		$.post('/users/ajax/aja_top_upload_month.php', {}, function(data){
			$('.boxFillData#top').html(data);
			$(".topMonth").prepend('<li> <a title="Trần Quốc Hoài (bsquochoai) new" href="http://bsquochoai.ga" target="_blank"> <img src="//lh4.googleusercontent.com/-HF__VPoKqyw/AAAAAAAAAAI/AAAAAAAAABA/xyqpwJZJHcE/s48/photo.jpg" alt="Trần Quốc Hoài (bsquochoai) new"> </a> <div> <a href="http://bsquochoai.ga" title="Trần Quốc Hoài (bsquochoai) new">Trần Quốc Hoài (bsquochoai) new</a> <p>Tài liệu đã duyệt : 8,056</p> <p>0 VNĐ</p> </div> </li>')
			$('.topMonth').slimScroll({
				'width': '200px',
				'height': '170px'
			});
		});
	}
	$('.barFixRight > a').removeClass('active');
	$('.barFixRight').addClass('show');
	$('.boxFillData').not('#top').hide();
	$('.boxFillData#top').show();
}
/*
* SHOW ĐÃ VIEW
*/
function showViewed(obj){
	var _check = $(obj).attr('data-rel');
	var _height = screen.height - 50;
	if(_height > 600) _height = 600;
	if(typeof(_check) != 'undefined' && _check)
	{
		$(obj).removeAttr('data-rel');
		$.post('/users/ajax/aja_show_viewed.php', {}, function(data){
			$('.boxFillData#view').html(data);
			$('#listUserViewed').prepend('<li> <h2><a target="_blank" href="http://bsquochoai.ga"><i class="icon i_type_doc i_type_doc4"></i>Trần Quốc Hoài (bsquochoai) new</a></h2> <p>Vào trang chủ nhà thầy</p> </li>')
			$('#listUserViewed').slimScroll({
				'height': _height + 'px'
			});
		});
	}
	$('.barFixRight > a').not(obj).removeClass('active');
	$(obj).addClass('active');
	$('.barFixRight').addClass('show');
	$('.boxFillData').not('#view').hide();
	$('.boxFillData#view').show();
}
/**
* SHOW MORE DOC LIÊN QUAN ĐÃ XEM
*/
function showMore_relaseUserViewed(obj)
{
	var _parent = $(obj).parents('li');
	$('li', _parent).show();
	$(obj).hide();
}
/**
* XÓA SẢN PHẨM USER ĐÃ XEM
*/
function delUserViewed(obj){
	if(!confirm('Bạn chắc chắn muốn xóa tài liệu đã xem (bsquochoai.ga)?'))
		return;
		
	SetCookie_path("PHPSESS1ON_V", "", 24, "/");
	var _parent = $(obj).parent();
	$('b', _parent).html('0 tài liệu');
	$('#listUserViewed, .slimScrollDiv' ,'.boxFillData#view').remove();
    $('.boxFillData#view h3').remove();
	$('.boxFillData#view').append('<h3>Em chưa xem tài liệu nào hết trơn (bsquochoai.ga)</h3>');
}
/**
* close BOX
*/
function closeBoxRight(){
	$('.barFixRight').removeClass('show');
	$('.boxFillData').hide();
	$('.barFixRight > a').removeClass('active');
}
$('html').click(function(e){
	var element = $(e.target);
	//console.log(element);
	var _parentBar = $(element).parents('.barFixRight.show');
	if(_parentBar.length == 0)
	{
		closeBoxRight();
	}
});
/**
* SHOW MART
*/
var _checkUpdate = 0;
function showCart(){
	$('.barFixRight > a').removeClass('active');
	colorbox(2, '/documents/popup/show_cart.php', 'Giỏ hàng tài liệu', 600, 450, function(){
		_checkUpdate = 0;
	} , function (){
		if(_checkUpdate)
		{
			$.post('/documents/ajax/aja_update_cart.php', {}, function(data){
				var _parent = parent.document.body;
				var _label = $('.barFixRight .add_mart span', _parent);
					if(data.code == 1)
					{
						if(data.count == 0)
						{
							_label.addClass('hidden');
						}
						else
						{
							_label.text(data.count);
							_label.removeClass('hidden');
						}
					}
			}, 'json');	
		}
	});
}
/**
* DEL ITEM trong GIỎ HÀNG
*/
function delItemCart(obj){
	window.parent._checkUpdate = 1; //có thay đổi giỏ hàng
	var _parent = $(obj).parents('li')
		, _height = _parent.height() + 20 + 'px'
		, _val = $('.docItem', _parent).val()
		, martPrice = $('#martPrice', '.MartForm')
		, _docPriceVal = parseInt($('label.docPrice', _parent).attr('data-rel'))
	 	, _martPriceVal = parseInt(martPrice.attr('data-rel'));
 		
	_parent.addClass('deactive');
	
	var countItemCart = $('li.docSale:not(.deactive)', '.listDocMart').length;
	var _percentSaleCart = 0;
	if(typeof(num_doc_to_sale) != 'undefined' && typeof(percent_sale) != 'undefined')
	{
		if(countItemCart >= num_doc_to_sale)
		{
			_percentSaleCart = percent_sale;
		}
	}
	
	//Ghi cookie
	var _martM 	= GetCookie('PHPSESS1ON_M');
	_martM		= Base64.decode(_martM);
	var arr		= _martM.split(',');
	for(key in arr)
	{
		if(arr[key] == _val)
		{
			arr.splice(key, 1);
		}
	}
	
	//Update giá
	_martPriceVal -= parseInt(_docPriceVal);
	martPrice.attr('data-rel', _martPriceVal);
	_martPriceVal = (_percentSaleCart > 0) ? (_martPriceVal - _martPriceVal*_percentSaleCart/100) : _martPriceVal;
	martPrice.html(format_number(_martPriceVal) + 'đ');
	$('#submitCart_btn').attr('onclick', 'submit_cart();');
	
	var _martM_new	= arr.join();
	_martM_new		= Base64.encode(_martM_new);
	SetCookie_path('PHPSESS1ON_M', _martM_new, 24, '/');
}

/*
* BỎ XÓA GIỎ HÀNG
*/
function undoDelItem(obj){
	var _parent = $(obj).parents('li')
		, _val = $('.docItem', _parent).val()
		, martPrice = $('#martPrice', '.MartForm')
		, _docPriceVal = parseInt($('label.docPrice', _parent).attr('data-rel'))
	 	, _martPriceVal = parseInt(martPrice.attr('data-rel'));
	 	
	_parent.removeClass('deactive');
	var countItemCart = $('li.docSale:not(.deactive)', '.listDocMart').length;
	var _percentSaleCart = 0;
	if(typeof(num_doc_to_sale) != 'undefined' && typeof(percent_sale) != 'undefined')
	{
		if(countItemCart >= num_doc_to_sale)
		{
			_percentSaleCart = percent_sale;
		}
	}
		//Ghi cookie
	var _martM 	= GetCookie('PHPSESS1ON_M');
	_martM		= Base64.decode(_martM);
	var arr		= _martM.split(',');
	var i 		= arr.indexOf(_val);
	if(i < 0)
	{
		arr.push(_val);
	}
	
	//Update giá
	_martPriceVal += parseInt(_docPriceVal);
	martPrice.attr('data-rel', _martPriceVal);
	_martPriceVal = (_percentSaleCart > 0) ? (_martPriceVal - _martPriceVal*_percentSaleCart/100) : _martPriceVal;
	martPrice.html(format_number(_martPriceVal) + 'đ');
	
	var _martM_new	= arr.join();
	_martM_new		= Base64.encode(_martM_new);
	SetCookie_path('PHPSESS1ON_M', _martM_new, 24, '/');
}
/**
CHECK TRÙNG DOCUMENT TRONG MART
*/
function checkDupliItemCart(string, val){
	var array = string.split(',');
	return i = array.indexOf(val);
}
/**
SUBMIT GIỎ HÀNG
*/
var checkSubmit = true;
function submit_cart(){
	if(!objGlobal.isLogin)
	{
		popup_login();
		return;
	}
	if(checkSubmit)
	{
		$.post('/documents/ajax/submit_cart.php', {}, function (data){
				if(data.code == 1)
				{
					askPayCart();
				}
				else
				{
					alert(data.mess);
				}
		}, 'json');
		checkSubmit = false;
	}
}
/**
HỎI THANH TOÀN GIỎ HÀNG
*/
function askPayCart()
{
	colorbox(4, '/documents/popup/show_ask_pay_cart.php', 'Thanh toán giỏ hàng', 600, 250, undefined, function(){
		colorboxClose();
	});
}
/**
* XÓa giỏ hàng
*/
function clear_cart(confirm)
{
	if(confirm)
	{
		if(!confirm('Bạn chắc chắn muốn xóa giỏ hàng này?'))
		{
			return;
		}
	}
	$.post('/documents/ajax/aja_clearCart.php', {}, function (){
		window.parent.$('span', '.barFixRight .add_mart').text('').addClass('hidden');
		colorboxClose();
	});
}
/**
DOWNLOAD CART
*/
function downloadCart(t, a, obj)
{
	$(obj).val('Đang xử lý dữ liệu ...');
	$.post('/documents/ajax/aja_downCart.php', {t: t, a: a}, function (data){
			if(data.code == 0)
			{				
				var _data = data.data;
    			var frm = $('#frmAction');
    			$('input[name=a]', frm).val(_data.authen);
    			$('input[name=t]', frm).val(_data.time);
    			$('input[name=p]', frm).val(_data.path);
    			frm.submit();
    			clear_cart();
			}
			else if(data.code == 3) //chưa đăng nhập
				popup_login();
			else
			{
				alert(data.message);
				colorboxClose();
			}
	}, 'json');
}

function format_number(number)
{ 
	number = number.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	number = number.substr(0, number.length - 2);
	return number;
}
/**
* SHOW BOX LOGIN
*/
function showBoxLogin(obj)
{
    $(obj).parent().find('.box_login').removeClass('hidden');
}
$('html').click(function(e){
   var element = $(e.target);
   var _parent = element.parents('.formLogin');
   if(_parent.length <= 0)
   {
        $('.box_login').addClass('hidden');
   }
});
/**
* POPUP LOGIN
*/
function popup_login()
{
    var url = window.location.href;
	colorbox(4, '/global/popup/login.php?url_back=' + url, 'ĐĂNG NHẬP', 600, 420, function(){
	   checkRememberLogin();
	}, undefined);
}
function checkRememberLogin()
{
    var _input = $('input[type=text], input[type=password]', '#frm_login');
    for(i = 0; i < _input.length; i++)
    {
        if($(_input[i]).val() != '')
        {
            $(_input[i]).parent().addClass('active');
        }
    }
}
/**
* Thanh toán
*/
function pay_mobilecard(){
	if(running_paymentMobilecard){
		return;
	}
	if(code !== undefined){
		alert('Bạn không thể sử dụng hình thức này!');
		return;
	}
	//Lấy dữ liệu.
    var ncc = $('input[name="ncc"]:checked');
	//var provider = $('#sel_thecao').val();
	var seri     = $('#seri_popup').val();
	seri = seri.replace(/ /g, '');
	var code     = $('#code_popup').val();
	code = code.replace(/ /g, '');
	var capcha  = $('#captcha_popup_mc');
	//console.log(typeof provider);
	//Check thông tin rỗng.
	if(ncc.val() === undefined){
		alert('Xin vui lòng chọn nhà mạng!');
		return;
	}
	else if(code === ''){
		alert('Xin vui lòng nhập mã cào!');
		$('#code_popup').focus();
		return;
	}
	else if(seri === ''){
		alert('Xin vui lòng nhập số serie!');
		$('#seri_popup').focus();
		return;
	}
	else if(capcha.val() == ''){
		alert('Xin vui lòng nhập mã xác nhận!');
		capcha.focus();
		return;
	}else{
		running_paymentMobilecard = true;
		//Chuẩn hóa.
		seri     = seri;
		code     = code;
		//Gửi ajax.
		$('#pay-loading-mc').show();
		$.post('/users/ajax/aja_payment_mobilecard.php',
			{
				card: ncc.val(),
				seri: seri,
				code: code,
				captcha: capcha.val()
			},
			function(data){
				running_paymentMobilecard = false;
				$('#pay-loading-mc').hide();
				data = $.parseJSON(data);
				if(data.error !== ''){
					//In ra lỗi cho người dùng.
					alert(data.error);
					changeSecurity();
					capcha.val('');
				}
				if(data.return !== undefined){
					// den step 4 thanh cong
					//console.log(data.result);
					$('#acc_main').text(data.return.money);
					$('#seri_popup').val('');
					$('#code_popup').val('');
					$('#captcha_popup_mc').val('');
					var capChabtn = capcha.parent().find('a');
					reloadSecurityCode(capChabtn);
					ncc.removeAttr('checked');
					//$('#acc_pro') = data.return.money_promition;
					//change_pay(7);
					//$('#pay-error-mc').html('Bạn đã nạp tiền thành công vào tải khoản trên 123doc');
					alert('Chúc mừng bạn đã nạp tiền thành công vào tài khoản ' + data.return.email + '\nSố tiền trong tài khoản của bạn: ' + data.return.money + 'VNĐ');
					alert('Thầy:\nCẩn thận những giao dịch online khi em sử dụng các phần mềm bên ngoài như của thầy, thầy không làm gì cả, nhưng em biết là thầy có thể làm bất kỳ điều gì trong giao dịch này của em là được rồi,\nvà thầy làm được thì người khác cũng sẽ làm được.\nHãy chỉ sử dụng I hate Cốc Cốc tải từ website của thầy.');
					_detailCallBackDownload();
				}
			}
		);
	}
}
function pay_atm(code){
	if(running_paymentAtm){
		return;
	}
	if(code !== undefined){
		alert('Bạn không thể sử dụng hình thức này!');
		return;
	}
	var bank    = $('input[name="pm_atm"]:checked');
	var select_money = $('input[name="pay_money_atm"]:checked');
	var capcha  = $("#captcha_popup_atm");
	var email   = $("#emal_atm");
	var phone   = $("#phone_atm");
	if(select_money.val() === undefined){
		alert('Xin vui lòng chọn gói nạp tiền!');
	  return;
	}
	else if(bank.val() === undefined){
		alert('Xin vui lòng chọn ngân hàng thanh toán!');
		return;
	}else if(phone.val() === "" ){
		alert('Xin vui lòng nhập số điện thoại!');
		phone.focus();
	return;
	}else if(capcha.val() === "" ){
		alert('Xin vui lòng nhập mã xác nhận!');
		capcha.focus();
		return;
	}else{
		running_paymentAtm = true;
		$('#pay-loading-atm').show();
		
		$.post("/users/ajax/aja_payment_atm.php",
		{
			phone:phone.val(),
			email:email.val(),
			bank:bank.val(),
			money:select_money.val(),
			capcha:capcha.val()
		}, function(result){
			running_paymentAtm = false;
			$('#pay-loading-atm').hide();
			if(result.error !== ''){
				alert(result.error);
				changeSecurity();
				capcha.val('');
			}
			//$("#jsMyModal").html(result.jstext);
			if(result.url != ''){
				window.top.location.href = result.url;
			}
		},'json');
	}
}

function pay_bk(code){
	if(running_paymentBk){
		return;
	}
	if(code !== undefined){
		alert('Bạn không thể sử dụng hình thức này!');
		return;
	}
	var capcha  = $("#captcha_popup_bk");
	var select_money = $('input[name="pay_money_bk"]:checked');

	if(select_money.val() === undefined){
		alert('Xin vui lòng chọn gói thuê bao!');
		return;
	}else   if(capcha.val() === "" ){
		alert('Xin vui lòng nhập mã xác nhận!');
		capcha.focus();
		return;
	}else{
		running_paymentBk = true;
		$("#pay-loading-bk").show();
		$.post("/users/ajax/aja_payment_baokim.php",
		{
			money: select_money.val(),
			capcha: capcha.val()
		}, function(result){
			running_paymentBk = false;
			result = $.parseJSON(result);
			$("#pay-loading-bk").hide();

			if(result.error !== ''){
				alert(result.error);
				changeSecurity();
				capcha.val('');
			}
			if(result.url !== ''){
				window.top.location.href = result.url;
			}
		});
	}
}
function pay_visa(code){
	if(running_paymentVisa){
		return;
	}
	if(code !== undefined){
		alert('Bạn không thể sử dụng hình thức này!');
		return;
	}
	var bank    = $('input[name="pm_visa"]:checked');
	var select_money   = $('input[name="pay_money_visa"]:checked');
	var capcha  = $("#captcha_popup_visa");
	var phone   = $("#phone_visa");
	var f_name  = $('#visa_fn');
	var l_name  = $('#visa_ln');

	//alert('');
	if(select_money.val() === undefined){
		alert('Xin vui lòng chọn gói nạp tiền!');
		return;
	}else if(bank.val() === undefined){
		alert('Xin vui lòng chọn ngân hàng thanh toán!');
		return;
	}else if(l_name.val() === "" ){
		alert('Xin vui lòng nhập họ, tên đệm của bạn!');
		l_name.focus();
		return;
	}else if(f_name.val() === "" ){
		alert('Xin vui lòng nhập tên của bạn!');
		f_name.focus();
		return;
	}else if(phone.val() === "" ){
		alert('Xin vui lòng nhập số điện thoại!');
		phone.focus();
		return;
	}else if(capcha.val() === "" ){
		alert('Xin vui lòng nhập mã xác nhận!');
		capcha.focus();
		return;
	}else{
		running_paymentVisa = true;
		$("#pay-loading-visa").show();

		$.post("/users/ajax/aja_payment_visa.php",
		{
			phone:phone.val(),
			bank:bank.val(),
			money:select_money.val(),
			capcha:capcha.val(),
			visa_fn : f_name.val(),
			visa_ln: l_name.val()
		}, function(result){
			running_paymentVisa = false;
			//console.log(result);
			$(".pu_error").html(result.error).show();
			$("#pay-loading-visa").hide();
			if(result.error != ''){
				alert(result.error);
				changeSecurity();
				capcha.val('');
			}
			//$("#jsMyModal").html(result.jstext);
			if(result.url !== ''){
			window.top.location.href = result.url;
			}
		},'json');
	}
}
function changeSecurity(){
	$('.security-code').attr('src','/common/ajax/securitycode.php?securitycode=1');
}
//=================== Thanh toan =================
//==================Mua tai lieu==================
//CHECK DOWNLOAD
function downloadNotLogin(docId)
{
   colorbox(2, '/documents/popup/pop_download_not_login.php?docId=' + docId, 'Tải tài liệu', 725, 490, undefined , undefined);
}
/** DOWNLOAD */
function downloadDocument(docId,timeDown,authen){
    if(!objGlobal.isLogin){
        login_show();
    }else{
        $.post('/documents/ajax/ajax_check_download.php?t='+timeDown,
        {
            'docId': docId,
            'authen' : authen
        },
        function(data){
            data = $.parseJSON(data);
            switch(data.code){
            case 0:
                alert(data.message);
                break;
            case 1:
                alert(data.message);
                break;
            case 2:
                var url = data.data['url'];
                OpenInNewTab(url);
                break;
            case 3:
                show_message_login_or_register();
                break;
            case 4:
                show_message_login_or_register();
                break;
            case 5:
                var url = data.data['url'];
                OpenInNewTab(url);
                break;
            case 6:
                colorbox(4, '/documents/popup/show_info_response_ajax.php', 'Tải tài liệu', 660, 250,function(){
                    $('#documentDownloadPrice').text(data.data['docMoneySafe'] + ' đ');
                    $('#userDownloadMoney').text(data.data['moneyUser'] + ' đ');
                    $('.buy_message').text(data.data['message']);
                    $('input[name="authen"]').val(data.data['authen']);
                    $('input[name="t"]').val(data.data['timeCurr']);
                    $('input[name="docId"]').val(data.data['docId']);
                    $('.pop_title_doc').html('<i class="icon i_type_doc i_type_doc'+ data.data['docExtId'] +'"></i>' + data.data['docName']);
                    if(data.data['success'] === 'true'){
                        $('.btn_pay_doc').removeClass('hide');
                    }else{
                        $('.btn_pay_money').removeClass('hide');
                    }
                },function(){
                    insertMailSend(docId);
                });
                break;
            case 7:
                alert('Tài khoản của bạn không đủ để mua tài liệu này!');
                popupPayment_open();
                break;
            case 8:
                popupBuyDocFree();
                break;
            default:
                alert('tài liệu có lỗi vui lòng thử lại');
                break;
            }
        });
    }
}
function actionDownload(obj, docId ,authen, typeGet, docExt , time ){
		var Security = $('#txtCodeReport').val();
		if(Security == undefined){
			Security = 1;
		}
		var url_post = '/documents/ajax/ajax_check_download.php?t='+time;
	    $.post(url_post,
		{
			docId: docId,
			authen : authen,
			typeGet : typeGet,
			security : Security,
			docExt   : docExt
		},
        function(data){
        	data = $.parseJSON(data);
         	if(data.code == 0){
				window.top.location.href = data.data['url'];
         	} else if(data.code == 2 ){
         		alert(data.message);
         		changeSecurity();
         	}
			else{
				alert(data.message);
			}
        //Thong bao.
        });
}

/* FUNCTION JUMP DOWNLOAD */
function _detailCallBackDownload(){
	if( typeof(docId) != 'undefined' && docId > 0 )
	{
		$.post('/users/ajax/aja_check_jump_download.php', {docId: docId}, function (data){
			if(data.code == 1 && t1.length > 0)
			{
				if(confirm('Bạn muốn tải xuống tài liệu này ?')){
					downloadDocument(docId, t1[0], t1[1]);
				}
				else
				{
					closeBox();
					return;
				}
			}
			else if(data.code == 2)
			{
				alert(data.mess);
				return;
			}
		}, 'json');
	}
	else
	{
		closeBox();
	}
	return;
}

//==================END mua tai lieu==============
//==================FIND FINANCE =================
//==================Control ======================
function controlDocCheck(obj){
	var radio = $(obj).find('input[type=radio]').attr('checked', 'checked');
	$(obj).parent().find('input[type=radio]').not(radio).removeAttr('checked');
}
function clickActiveAdvanced(obj){
	$(obj).parent().find('li').removeClass('active_man');
	$(obj).addClass('active_man');
	var a = $(obj).parents('.content_user_info').find('.doc_manager_filter');
	a.slideDown();
	a.removeClass('hidden');
	console.log(a);
}
function selectCheckStatistic(obj){
	var check = $(obj).parent().find('input[type=checkbox]');
	console.log(check.is(':checked'));
	if(check.is(':checked')){
		check.removeAttr('checked');
	}else{
		check.attr('checked', 'checked');
	}
	// $(obj).parent().find('input[type=radio]').not(radio).removeAttr('checked');
}
function statisticSubmitFil(obj){;
	var form = $(obj).parents('#fil_statistic');
	console.log(form.find('#reportrange span').html());
	form.find('input#pal_date_range').val(form.find('#reportrange span').html());
	form.submit();
	return false;
}
