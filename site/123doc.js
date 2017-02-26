if(window.location.href.indexOf("/document/") !=-1 && window.location.href.indexOf("?page=") != -1 ){
	window.location.assign(window.location.href.replace("?page=", "#"))
}
$(function(){
	/* $(".detailDownload").after('<div class="detailDownload bs-print "> <a href="javascript:;"> <span style="background-color:#00a888">IN RA PDF</span> <label>bsquochoai.ga</label> </a> </div>')
	
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('/site/plugins/jQuery.print.js');
	s.onload = function() {
		 this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(s);
	
	$(".bs-print").click(function(){
		var actualCode = ['$("#contentDocument").print();'].join('\n');

		var script = document.createElement('script');
		script.textContent = actualCode;
		(document.head||document.documentElement).appendChild(script);
		script.parentNode.removeChild(script);
	}) */
	$(".detailActionShowMore").hide()
	var actualCode = ["$('.line_action').not('.countDown').removeClass('hidden');$('.countDown').addClass('hidden');"].join('\n');
	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
})
