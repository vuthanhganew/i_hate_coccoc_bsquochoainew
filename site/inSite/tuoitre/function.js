$(function() {
	/**************************** COMMENT ****************************/
	// View more comment
	$('#view_more_comment').on('click', function() {
		var url = $('#host').val() + '/comment/ttocreateiframe';
		var offset = parseInt($('#offset').val()) + 1;
		var object_id = $('#object_id').val();
		var app_id = $('#app_id').val();
		var layout = $('#comment_layout').val();
	 	var number_all_comments = $('#number_all_comments').val();

		$.ajax({
			type: 'POST',
			url: url,
			data: {offset: offset, app_id: app_id, object_id: object_id, layout: layout}
		}).done(function(result) {
			document.domain = 'tuoitre.vn';

			$('.lst-comment').append(result);
			$('#offset').val(offset);

			// Increase height of iframe
			var iframe = $('#comment_frame', window.parent.document);
            var height = $(".container").height() + 70;
            iframe.height(height);
		});
	});

	/**************************** LIKE ****************************/
	// Like comment
	$('body').on('click', '.like_btn', function() {
		var id = $(this).attr('id');
		id = id.split('-');
		var c = id[1];
		var app_id = $('#app_id').val();
		var o = $('#object_id').val();
		var object_id = $('#object').val();
		var comment_id = $('#comment').val();
		var object_title = $('#object_title').val();

		var like_number_element = $(this).parent().siblings('.like_number');
		var like_button_element = $(this);

		$.ajax({
			type: 'POST',
			url: $('#host').val() + '/like/likecomment',
			data: {app_id: app_id, o: o, c: c, object_id: object_id, comment_id: comment_id, object_title: object_title}
		}).done(function(result) {
			resultArr = result.split('-');
			if (parseInt(resultArr[0]) > 0) {
				var like_number = parseInt(like_number_element.html()) + 1;
				like_number_element.html(like_number);
			}
		});
	});

	//  Unlike comment
	$('body').on('click', '.unlike_btn', function() {
		var id = $(this).attr('id');
		id = id.split('-');
		var c = id[1];
		var app_id = $('#app_id').val();
		var o = $('#object_id').val();
		var object_id = $('#object').val();
		var comment_id = $('#comment').val();

		var like_number_element = $(this).parent().siblings('.like_number');
		var unlike_button_element = $(this);

		$.ajax({
			type: 'POST',
			url: $('#host').val() + '/like/unlikecomment',
			data: {app_id: app_id, c: c, o: o, object_id: object_id, comment_id: comment_id}
		}).done(function(result) {
			resultArr = result.split('-');
			if (parseInt(resultArr[0]) >= 0) {
				var like_number = parseInt(like_number_element.html()) - 1;
				like_number_element.html(like_number);
				$('<a href="javascript:void(0);" class="like_btn btn-like-cm" id="like_comment_id-' + c + '">Thích</a>').insertAfter(unlike_button_element);
				unlike_button_element.remove();
			} else if (resultArr[0] == 'time_not_expire') {
				alert('Bạn vui lòng đợi ' + resultArr[1] + ' để tiếp tục thực hiện thao tác này.');
			} else {
				alert('Bạn không được phép thực hiện thao tác này!');
			}
		});
	});

	// Like article
	$('.object_like_btn').click(function() {
		var app_id = $('#app_id').val();
		var o = $('#object_id').val();
		var object_id = $('#object').val();
		var object_title = $('#object_title').val();

 		var like_number = $(this).parent().siblings('.sl');
		var like_button = $(this);

		$.ajax({
			type: 'POST',
			url: $('#host').val() + '/like/likeobject',
			data: {app_id: app_id, o: o, object_id: object_id, object_title: object_title}
		}).done(function(result) {
			resultArr = result.split('-');
			if (parseInt(resultArr[0]) >= 0) {
				like_number.html(result);
				// $('<a href="javascript:void(0);" class="object_unlike_btn"><img src="../images/btn-unlike.png" /></a>').insertAfter(like_button);
				like_button.removeClass('tto_object_like_btn');
				like_button.css('background-color', '#a2a2a2');
			} else if (resultArr[0] == 'time_not_expire') {
				alert('Bạn vui lòng đợi ' + resultArr[1] + ' để tiếp tục thực hiện thao tác này.');
			} else if (resultArr[0] == 'save_error') {
				alert('Save error!');
			} else {
				alert('Bạn không được phép thực hiện thao tác này!');
			}
		});
	})

	// Unlike article
	$('.object_unlike_btn').click(function() {
		var app_id = $('#app_id').val();
		var o = $('#object_id').val();
		var object_id = $('#object').val();

		var like_number = $(this).parent().siblings('.sl');
		var unlike_button = $(this);

		$.ajax({
			type: 'POST',
			url: $('#host').val() + '/like/unlikeobject',
			data: {app_id: app_id, o: o, object_id: object_id}
		}).done(function(result) {
			resultArr = result.split('-');
			if (parseInt(resultArr[0]) >= 0) {
				like_number.html(result);
				$('<a href="javascript:void(0);" class="object_like_btn"><img src="../images/btn-like.png" /></a>').insertAfter(unlike_button);
				unlike_button.remove();
			} else if (resultArr[0] == 'time_not_expire') {
				alert('Bạn vui lòng đợi ' + resultArr[1] + ' để tiếp tục thực hiện thao tác này.');
			} else if (resultArr[0] == 'save_error') {
				alert('Save error!');
			} else {
				alert('Bạn không được phép thực hiện thao tác này!');
			}
		});
	})

	// Get cookie to show whether like or dislike button - Like Object
	var key_timeout = 'likeobjecttimeout' + $('#object_id').val() + $('#app_id').val();
	var key_flag = 'likeobjectflag' + $('#object_id').val() + $('#app_id').val();

	var like_object_flag = 1;
	var flag = getCookie(key_flag);
	if (flag != null && flag != '') {
		var timeout = getCookie(key_timeout);
		if (timeout != null && timeout != '' && flag == 0) {
			var current_time = Math.round(new Date().getTime() / 1000);
			if (timeout < current_time) {
				like_object_flag = 1;

				var like_number = parseInt($('.sl').text());
				$('.sl').text(like_number + 1);
			} else {
				like_object_flag = 0;
			}
		}
	}

	if (like_object_flag == 1) {
		var like_object_btn = '<a href="javascript:;" class="object_like_btn"><img src="../images/btn-like.png" /></a>';
	} else {
		var like_object_btn = '<a href="javascript:;" class="object_unlike_btn"><img src="../images/btn-unlike.png" /></a>'
	}

	$('.like_div').append(like_object_btn);

	/**************************** REPLY ****************************/

	// Like article
	$('.tto_object_like_btn').one('click', function() {
		var app_id = $('#app_id').val();
		var o = $('#object_id').val();
		var object_id = $('#object').val();
		var object_title = $('#object_title').val();
		var app_id_tracker = $('#app_id_tracker').val();
		var cat_id = $('#cat_id').val();
		var host_url = $('#host_url').val();
		var user_agent = $('#user_agent').val();
var say_hello = 'hi kid!';

 		var like_number_element = $(this).siblings('.sl');
		var like_button = $(this);

		$.ajax({
			type: 'POST',
			url: $('#host').val() + '/like/likeobject',
			data: {app_id: app_id, app_id_tracker: app_id_tracker, o: o, cat_id:cat_id, object_id: object_id, object_title: object_title, user_agent: user_agent, host_url:host_url, say:say_hello}
		}).done(function(result) {
			resultArr = result.split('-');
			if (parseInt(resultArr[0]) >= 0) {
				temp = (like_number_element.html()).split('<span></span>');
				var like_number = parseInt(temp[1]) + 1;
				like_number_element.html(like_number);
				like_button.removeClass('tto_object_like_btn');
				like_button.css('background-color', '#a2a2a2');
			} else if (resultArr[0] == 'time_not_expire') {
				alert('Bạn vui lòng đợi ' + resultArr[1] + ' để tiếp tục thực hiện thao tác này.');
			} else if (resultArr[0] == 'save_error') {
				alert('Save error!');
			} else {
				alert('Bạn không được phép thực hiện thao tác này!');
			}
		});
	})

	// Sub comment
	$('.list-select .option').click(function() {
		var select = $(this);

		var type_arr = ($(this).attr('id')).split('-');
		var sort = type_arr[1];

		var app_id = $('#app_id').val();
		var object_id = $('#object_id').val();
		var layout = $('#comment_layout').val();

		$.ajax({
			type: 'POST',
			url: $('#site_url').val() + 'comment/ttocreateiframe',
			data: {app_id:app_id, object_id:object_id, sort:sort, layout:layout}
		}).done(function(result) {
			$('.list-select li').removeClass('active');
			select.parent().addClass('active');

			$('.lst-comment').html(result);
		});
	})

	if ($('.btn-reply').length > 0) {
		
		$('body').on('click', '.btn-reply', function() {
			document.domain = 'tuoitre.vn';

			$('.wra-comment').removeClass('active');

			$('.content-warning').hide();

			if ($(this).parent('.block-tool').next('.wra-comment').hasClass('active')){
				$(this).parent('.block-tool').next('.wra-comment').removeClass('active');
			} else {
				// Increase height of iframe
				var iframe = $('#comment_frame', window.parent.document);
				var height = $('.container').height() + 160;
				iframe.height(height);

				$(this).parent('.block-tool').next('.wra-comment').addClass('active');
			}
		});

		$('body').on('click', '.btn-sub', function() {
			document.domain = 'tuoitre.vn';

			var comment_timeout = getCookie('comment-timeout-' + $('#object_id').val());
    		var now = getDateTime();

    		// Check comment timeout
    		if (comment_timeout == '') {
				var object_id = $('#object_id').val();
				var parent_id = $(this).siblings('.parent-id').val();
				var content = $(this).parent().siblings('.cm_sub_content').val();

				parent.openIframePopup('infoForm', object_id, content, parent_id);
			} else {
				var remain_time = parseInt(getDiffDate(comment_timeout, now, 'seconds'));
				remain_time = 30 - remain_time;
				parent.closeCommentPopup('infoForm');
				parent.openCommentPopup('errorForm');
			}
		});	
		$('body').on('click', '.btn-close-s', function() {
			$('.wra-comment').removeClass('active');
		});
	}
})

/*
 * Check valid email
 */
function IsEmail(email)
{
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function getId(value)
{
	var id = value.split('-');
	return id[1];
}

function setCookie(cname, cvalue, second) {
    var d = new Date();
    d.setTime(d.getTime() + (second * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function getDateTime() {
    var date = new Date();
    var year    = date.getFullYear();
    var month   = date.getMonth() + 1; 
    var day     = date.getDate();
    var hour    = date.getHours();
    var minute  = date.getMinutes();
    var second  = date.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0' + month;
    }
    if(day.toString().length == 1) {
        var day = '0' + day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0' + hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0' + minute;
    }
    if(second.toString().length == 1) {
        var second = '0' + second;
    }

    var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;   
    return dateTime;
}

function getDiffDate(date1, date2, interval) {
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    date1 = new Date(date1);
    date2 = new Date(date2);
    var timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
        case "years": return date2.getFullYear() - date1.getFullYear();
        case "months": return (
            ( date2.getFullYear() * 12 + date2.getMonth() )
            -
            ( date1.getFullYear() * 12 + date1.getMonth() )
        );
        case "weeks"  : return Math.floor(timediff / week);
        case "days"   : return Math.floor(timediff / day); 
        case "hours"  : return Math.floor(timediff / hour); 
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        default: return undefined;
    }
}

function openPopup(id) {
    $("#"+id).fadeIn(100);   
    var h = $("#"+id+" > .popup").height();
    $("#"+id+" > .popup").css("margin-top", -h/2);
    if ($(".scroll-pane").length > 0) {
        $('.scroll-pane').jScrollPane();
    }
}

function closePopup(id) {

    $("#"+id).fadeOut(100);
    //$("#header > .closepp").remove();
}

function executeJsWhenAjaxComplete() 
{
	var assetUrl = $('#asset_url').val();
	$.getScript(assetUrl + '/js/comment/js/function.js?v=14');
}


// Get cookie to show whether like or dislike button - Like Comment
// $('.view_comment_small').each(function() {
// 	var id = $(this).attr('id');
// 	id = id.split('comment_div-');
// 	var key_comment_timeout = 'likecommenttimeout' + id[1];
// 	var key_comment_flag = 'likecommentflag' + id[1];

// 	var like_comment_flag = 1;

// 	var flag = getCookie(key_comment_flag);
// 	if (flag != null && flag != '') {
// 		var timeout = getCookie(key_comment_timeout);
// 		if (timeout != null && timeout != '' && flag == 0) {
// 			var current_time = Math.round(new Date().getTime() / 1000);
// 			if (timeout < current_time) {
// 				like_comment_flag = 1;

// 				var like_number = parseInt($(this).find('.like_number').text());
// 				$(this).find('.like_number').text(like_number + 1);
// 			} else {
// 				like_comment_flag = 0;
// 			}
// 		}
// 	}

// 	if (like_comment_flag == 1) {
// 		var like_comment_btn = '<a href="javascript:void(0);" class="like_btn" id="like_comment_id-' + id[1] + '">Thích</a>';
// 	} else {
// 		var like_comment_btn = '<a href="javascript:void(0);" class="unlike_btn" id="like_comment_id-' + id[1] + '">Bỏ thích</a>';
// 	}

// 	$(this).find('.like_comment_div').append(like_comment_btn);
// });