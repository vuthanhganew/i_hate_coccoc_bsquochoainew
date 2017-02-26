!function(a,b){"use strict";var c="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,d=function(){for(var a,c,d=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenchange","MSFullscreenerror"]],e=0,f=d.length,g={};f>e;e++)if(a=d[e],a&&a[1]in b){for(e=0,c=a.length;c>e;e++)g[d[0][e]]=a[e];return g}return!1}(),e={request:function(a){var e=d.requestFullscreen;a=a||b.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?a[e]():a[e](c&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){b[d.exitFullscreen]()},toggle:function(a){this.isFullscreen?this.exit():this.request(a)},onchange:function(){},onerror:function(){},raw:d};return d?(Object.defineProperties(e,{isFullscreen:{get:function(){return!!b[d.fullscreenElement]}},element:{enumerable:!0,get:function(){return b[d.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!b[d.fullscreenEnabled]}}}),b.addEventListener(d.fullscreenchange,function(a){e.onchange.call(e,a)}),b.addEventListener(d.fullscreenerror,function(a){e.onerror.call(e,a)}),a.screenfull=e,void 0):(a.screenfull=!1,void 0)}(window,document);
var _pages = [];
var _widthContentElement = 0;
var _heightContentElement = 0;
showDocContent(pageNumber, 1); //show nội dung
var checkShowBox = 0;

$(document).ready(function(){
    loadDocumentDatamining();//datamining
    
    //get share social
    
    var countShareFb = $('#countShareFb'), _url = countShareFb.attr('data-rel');
    $.get('https://graph.facebook.com/?id=' + _url, {}, function(data){
        if(data.shares)
        {
            countShareFb.text(data.shares);
        }
        countShareFb.show();
    }, 'json')
    
//    var API_KEY = 'AIzaSyAyLirKP2i1V-g2n5Snhx1GakPma_wVFdc';
//    var data = 
//{
//    "method":"pos.plusones.get",
//    "id":"p",
//    "params":{
//        "nolog":true,
//        "id": _url,
//        "source":"widget",
//        "userId":"@viewer",
//        "groupId":"@self"
//        },
//    "jsonrpc":"2.0",
//    "key":"p",
//    "apiVersion":"v1"
//};
//    $.post('https://clients6.google.com/rpc?key='+API_KEY, data, function(respond){
//        console.log(respond);
//    }, 'json');
});


/*
* đặt lại src cho background nội dung
*/
function reSrcBg(data,host, filePath, folder)
{
	data.find('div.b').each(function(i, item){
		var srcTemp = '',
			arrySRC = $(item).css('background-image').split('/'),
			nameTemp = (arrySRC[(arrySRC.length-1)]),
			name = nameTemp.replace('"','').replace(')','');
			//'http://localhost:1011'+
		srcTemp = host + '/' + filePath + '/' + folder + '/' + name;
		$(item).css('background-image', 'url('+srcTemp+')');
	});
}
/*
* Lấy tỉ lệ zoom nội dung
*/
function getRatio()
{
	var width	= $('#contentDocument').width() - 10;
	var childWidth = $('.d, .pf').width();
	var ratio = width / childWidth;
	
	return ratio;	
}
/*
* Bắn ajax để láy nội dung
*/
function showDocContent(pageUrl, pageStart)
{
	if(pageStart > pageUrl)
		return;
	datapost = {
			docId       : docId,
			pageMax     : pageMax,
			pageShow    : pageShow,
			folder      : folder,
			filePath    : filePath,
			fileHtml    : fileHtml,
			pageNumber  : pageStart,
			pageLength  : pageMax,
			link        : link,
			ajax        : ajax,
			code        : code,
			time        : time,
			type        : type
		}
	$.ajax({
		type: 'POST',
		url: ajax,
		data:  datapost,
		success: function(data){
			console.log(data)
			var parent 			= $('#contentDocument'),
				 dataDoc			= data.data,
			 	 txtCon			= '';
 	 		parent.find('.loaddingDoc').remove();
			if(dataDoc.data.length > 0)
			{
				var _data = $(dataDoc.data);
				for(i = 0; i < dataDoc.data.length; i++)
				{
					txtCon = '';
					if(dataDoc.data[i].state == 'success')
					{
						txtCon = '<li id="page-rel-'+ dataDoc.data[i].page_number +'">' + dataDoc.data[i].data + '</li>';
						/* Chèn quảng cáo */
						var lastChild	= $('ul li:last-child', parent);
						if(lastChild != 'undefind' && pageStart > 1)
						{
							$(txtCon).insertAfter(lastChild);
						}
						else
						{
							parent.find('ul').append(txtCon);
						}
						reSrcBg(parent, host, filePath, folder);
					}
				}
				
				/* Tính toán lại tỉ lệ để nội dung ra giữa */
				var ratio = getRatio();
				ratioCurr = ratio;
				$('.d, .pf', parent).css({
					'position': 'relative',
					'transform-origin': '0 0',
					'-o-transform':'scale('+ ratio +')',
					'-webkit-transform':'scale('+ ratio +')',
					'-moz-transform':'scale('+ ratio +')',
					'-ms-transform':'scale('+ ratio +')',
					'transform':'scale('+ ratio +')'});
			}
			
			/* Đặt lại width, height cho các li nội dung, tính vị trí của các trang để điều chỉnh thanh tiến độ fix ở dưới */
			var liChilds = $('li', parent).not('.page-content');
			if(liChilds.length > 0)
			{
				for(j = 0; j < liChilds.length; j++)
				{
					var _height = $(liChilds[j]).height();
					$(liChilds[j]).height(_height * ratio);
					$(liChilds[j]).addClass('page-content');
				}
			}
			showDocContent(pageUrl, (pageStart + preLoad));
			var _pages = getPositionPageDoc();
			checkPositionPage(_pages);
			var liCurrent = $('li#page-rel-' + pageUrl);
			if(liCurrent.length > 0 && pageStart > 1)
			{
				var topScroll = $(liCurrent).offset().top;
				$(window).scrollTop(topScroll);
			}
            hideDetailBar();
		}, 
		dataType: 'json'});
}
/*
* Show fullscreen
*/
var documentElement = document.getElementById("contentDocument");
function changeFullScreen(){
	var _width = $(window).width();
	$("#contentDocument").css({
		'width': (_width - 20) + 'px',
		'overflow-y': 'auto',
		'padding': '10px'
	});
	var liChilds = $('li.page-content', '#contentDocument').not('.ads');
	if(liChilds.length > 0)
	{
		for(j = 0; j < liChilds.length; j++)
		{
			var _elementChild = $('.d, .pf', $(liChilds[j]));
			var _widthContentElement = _elementChild.width();
			var _heightContentElement = _elementChild.height();
			var _ratio = (_width - 50) / _widthContentElement;
			_elementChild.css({
				'transform-origin': '0 0',
				'-o-transform':'scale('+ _ratio +')',
				'-webkit-transform':'scale('+ _ratio +')',
				'-moz-transform':'scale('+ _ratio +')',
				'-ms-transform':'scale('+ _ratio +')',
				'transform':'scale('+ _ratio +')'});
			$(liChilds[j]).height(_heightContentElement * _ratio);
		}
	}
}
/**
* CHANGE DEFAULT
**/
function changeDefault(){
	$("#contentDocument").css({
		'width': '100%',
		'overflow-y': 'hidden',
		'padding': '0'
	});
	var ratio = getRatio();
	$('.d, .pf', '#contentDocument').css({
		'position': 'relative',
		'transform-origin': '0 0',
		'-o-transform':'scale('+ ratio +')',
		'-webkit-transform':'scale('+ ratio +')',
		'-moz-transform':'scale('+ ratio +')',
		'-ms-transform':'scale('+ ratio +')',
		'transform':'scale('+ ratio +')'});
	var liChilds = $('li.page-content', '#contentDocument').not('.ads');
	if(liChilds.length > 0)
	{
		for(j = 0; j < liChilds.length; j++)
		{
			var _heightContentElement = $('.d, .pf', $(liChilds[j])).height();
			$(liChilds[j]).height(_heightContentElement * ratio);
		}
	}
}
function toggleFullScreen(){
    if(!!screenfull.enabled){
    		var _doc = $('#contentDocument');
  			screenfull.request(_doc[0]);
    }
	 else
	 {
        alert('Trình duyệt hoặc trang web bạn đang xem không cho phép xem toàn màn hình!');
    }
}
// FULLSCREEN
document.addEventListener(screenfull.raw.fullscreenchange, function () {
	//console.log(screenfull.isFullscreen);
	if (!screenfull.isFullscreen) {
		changeDefault();
	   //console.log('showDefault');
	}else{
		changeFullScreen();
	   //console.log('fullScreen');
	}
});
// NHUNG LINK
function showBoxEmbed(obj){
	$('.docEmbed').removeClass('hidden');
	$(obj).find('i').addClass('active');
	getStringEmbed();
}
function closeBoxEmbed(){
	$('.docEmbed').addClass('hidden');
	$('i.icon.i_link').removeClass('active');
}
$('#opstSizeIF').change(function(){
	getStringEmbed();
});
function getStringEmbed(){
    var _docName = window.docName || '', link = window.link || '', linkEmbed = window.linkEmbed || '';
    var strTitle = '<a target="_blank" title="'+ _docName +' trên 123doc.org" href="'+ link +'" style="margin: 12px auto 6px auto; font-family: Helvetica,Arial,Sans-serif; font-style: normal; font-variant: normal; font-weight: normal; font-size: 14px; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; display: block; text-decoration: underline;">'+ _docName +'</a>',
            size = $('#opstSizeIF').val(), fWidth = '100%', fHeight ='600';
    switch(size){
        case '800x600':
            fWidth = '800';
            fHeight = '600';
            break;
        case '400x600':
            fWidth = '400';
            fHeight = '600';
            break;
        case 'auto':
            fWidth = '100%';
            fHeight = '600';
        default:
            break;
    }
    var strEmbed = '<iframe src="'+linkEmbed+'" width="'+fWidth+'" height="'+fHeight+'" data-auto-height="true" scrolling="true" name="123doc-embed" id="123doc-embed" frameborder="0" style="border: 1px solid #dfdfdf" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>';
    $('#textEmbedIF').val(strTitle+strEmbed);
}
/**
* GIO HANG
*/
function addMart(obj){
	$.post('/documents/ajax/aja_addCart.php', {docId: docId}, function(data){
		if(data.code == 0)
		{
			alert(data.mess);
		}
		else
		{
			$(obj).find('label').text('Thêm thành công');
			var _label = $('span', '.add_mart');
			_label.text(data.count);
			_label.removeClass('hidden');
			if(data.count == 1)
			{
				showCart();
			}
		}
	}, 'json');
}

/**
* check co giỏ hàng cũ hay ko
*/
function checkAddCart(obj){
	$.post('/documents/ajax/aja_checkAddCart.php', {}, function(data){
			if(data.code == 1)
			{
				if(confirm('Bạn có 1 giỏ hàng đã xác nhận nhưng chưa thanh toán. Thanh toán giỏ hàng này?'))
				{
					askPayCart();
				}
				else
				{
					addMart(obj);
				}
			}
			else
			{
				addMart(obj);
			}
	}, 'json');
}

/*
* Show more description
*/
function showFullDes(obj){
    $('.detailDescription .des_content').addClass('des_full');
    $(obj).text('- Rút gọn -');
    $(obj).attr('onclick', 'showSortDes(this)');
}
/*
* Sort description
*/
function showSortDes(obj){
    $('.detailDescription .des_content').removeClass('des_full');
    $(obj).text('- Xem thêm -');
    $(obj).attr('onclick', 'showFullDes(this)');
}
/*
* load datamning
*/
function loadDocumentDatamining()
{
	var _div = $('.detailDatamining');
	if(_div.html() == '')
	{
		$.post('/documents/ajax/aja_document_datamining.php', {doc: docId}, function(data){
			_div.append(data);
		});
	}
}
/*
* Show more danh mục
*/
function showMoreOutLine(obj){
	$('ul', '.outline').addClass('full');
	$(obj).attr('onclick', 'showSortOutLine(this)');
	$(obj).text('Rút gọn');
}
/*
* Rút gọn danh mục
*/
function showSortOutLine(obj){
	$('ul', '.outline').removeClass('full');
	$(obj).attr('onclick', 'showMoreOutLine(this)');
	$(obj).text('Xem thêm');
}
/*
* Lấy tọa độ trang
*/

function getPositionPageDoc(){
	var page_content = $('.page-content').not('.ads');
	var _pages = [];
	$.each(page_content, function(i, e){
		_pages.push($(e).offset().top);
	});
	
	return _pages;
}
/*
*
*/
function checkPositionPage(arr){
	$(window).scroll(function(){
		var _top = $(this).scrollTop();
		$.each(arr, function (i, e){
			if(_top >= e)
			{
				$('#scrollPage').html(i + 1);
			}
		});
	});
}
/**
* SHOW LICH SU DOWNLOAD
*/
function showHistoryDownload(){
	colorbox(2, '/documents/popup/show_history_download.php?docId=' + docId, 'Lịch sử tải tài liệu', 600, 600, undefined , function (){});
}
/*
* HIDE BOX COMMENT FIX
*/
function hideBoxCmtFixed(){
    $('.boxCmt_bottom').addClass('_hidden');
    checkShowBox = 1;
}
/*
* SHOW BOX COMMENT FIX
*/
function showBoxCmtFixed(){
    $('.boxCmt_bottom').removeClass('_hidden');
}
/*
* HIDE BAR
*/
function hideDetailBar(){
    var _topListHotNew = $('.detailListHotNew').offset().top,
        _heightListHotNew = $('.detailBar').height() + 20 + 'px';
    var elementCmtFixBot = $('#showBoxCmtFixed');
//check scroll download
    var _topBtnDownload = $('#contentDocument').offset().top;
//check show box cmt fixed bottom\
    var _topDocdatamining = $('.detailDatamining').offset().top - 600;
    $(window).scroll(function(){
        if($(window).scrollTop() > _topListHotNew)
        {
            $('.detailBar').css('bottom', '-' + _heightListHotNew);
        }
        else
        {
            $('.detailBar').css('bottom', '0');
        }
        
        if($(window).scrollTop() > _topBtnDownload)
        {
            //Hiện nút download trên header
            $('.headerRight .mainBox').not('#detailDownload').addClass('hidden');
            $('.mainBox#detailDownload').removeClass('hidden');
        }
        else
        {
            $('.headerRight .mainBox').not('#detailDownload').removeClass('hidden');
            $('.mainBox#detailDownload').addClass('hidden');
        }
        
        if($(window).scrollTop() > _topDocdatamining)
        {
            if(!checkShowBox)
            {
                $('.boxCmt_bottom').removeClass('_hidden');
            }
        }
    });
}
/*
* DOWNLOAD NOT LOGIN
*/
function showBoxDownload_notLogin(docId)
{
	$('body').find('.boxAddMoney_notLogin').remove();
	var _width = ($(window).width() - 800)/2 + 'px';
	var html = '<div class="bg_transparent" onclick="_closeBox();"></div><div class="boxAddMoney_notLogin"></div>';
	$('body').append(html);
	$.post('/documents/popup/pop_download_not_login.php?docId='+docId, {}, function(data){
		$('.boxAddMoney_notLogin').append(data).css('left', _width);
	});
}
function _closeBox(){
	$('body').find('.boxAddMoney_notLogin').remove();
	$('body').find('.bg_transparent').remove();
}