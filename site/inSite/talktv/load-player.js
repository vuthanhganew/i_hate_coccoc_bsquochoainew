/**

 * js file to handle everything about to load player

 */

function detectIE() {
  var ua = window.navigator.userAgent;

  // test values
  // IE 10
  //ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  // IE 11
  //ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  // IE 12 / Spartan
  //ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return true;
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return true;
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // IE 12 => return version number
    return true;
  }

  // other browser
  return false;
}

var loadPlayer = {

    channel : null,

    autostart: true,

    limit: 0,

    originalChannel: null,

    notifHost : null,

    notifPort : null,

    playDiv: null,

    offlineImage : null,

    onlineImage: null,

    live: 0,

    backgroundImage : null,

    trailer: null,

    manifestUrl : null,

    androidUrl : null,

    iosUrl : null,

    serverInfo : null,

    countdownVideo : null,

    redirectUrl: null,

    redirectType: null,

    disableSetup: false,

    logo: null,

    startTime: null,

    lastTrack: null,

    hlsSetup: false,

    playDuration: 0,

    currentViewers: '',

    popout: true,

    isPopout: false,

    vn_viewer: false,

    status: "off",

    title: '',

    embedPage: '',

    provider: '',

    isStart: false,

    countLogedInUserPrefix: 'countLogedInUserPrefix-',

    adsStart: null,

    adsDuration: null,

    requestKey: '',

    requestToken: '',

    initialize: function(){

        loadPlayer.adsStart = Cookie.readCookie("ads_start_time");

        loadPlayer.adsDuration = Cookie.readCookie("ads_duration");

        loadPlayer.status = loadPlayer.live ? "on" : "off";

        if(! loadPlayer.ismobile()) {

            /*

             * check if flash is wrong, notif to update

             */

            if (! FlashDetect.installed) {

                $(loadPlayer.playDiv).hide();

                if(detectIE()) {

                    $('#error-content').html('<div class="flashNoti"> Bạn chưa cài đặt Flash Player, vui lòng cài đặt Flash Player bản ActiveX, mở Internet Explorer và tải tại <a target="_blank" href="http://get.adobe.com/flashplayer/">http://get.adobe.com/flashplayer/</a></div>')

                } else {

                    $('#error-content').html('<div class="flashNoti"> Bạn chưa cài đặt Flash Player, vui lòng cài đặt, tải <a target="_blank" href="http://get.adobe.com/flashplayer/">tại đây</a></div>')

                }

                $('#unsupportedbrowser').show();

            } else if (!FlashDetect.versionAtLeast(9)) {

                $(loadPlayer.playDiv).hide();

                $('#error-content').html('<div class="flashNoti"> Flash Player quá cũ, vui lòng cập nhật mới <a target="_blank" href="http://get.adobe.com/flashplayer/">tại đây</a></div>')

                $('#unsupportedbrowser').show();

            }

        }


        /*

         * if not, load trailer or image

         */

        if(loadPlayer.trailer) {

            loadPlayer.loadMp4('channel-mediaplayer', loadPlayer.backgroundImage, loadPlayer.trailer);

        } else {

            loadPlayer.loadStream('channel-mediaplayer', loadPlayer.backgroundImage, loadPlayer.manifestUrl, loadPlayer.androidUrl, loadPlayer.iosUrl);

        }

        /*

         * load player and notification

         */

        if(loadPlayer.originalChannel != loadPlayer.channel) {

            notification.load(loadPlayer.originalChannel, loadPlayer.notifHost, loadPlayer.notifPort, 'global');

        } 

        notification.load(loadPlayer.channel, loadPlayer.notifHost, loadPlayer.notifPort, 'normal');

        

        //subscribe when user logged in

        if(loadPlayer.isLogin){

            //notification.load(loadPlayer.countLogedInUserPrefix + loadPlayer.channel, loadPlayer.notifHost, loadPlayer.notifPort, 'normal', 'countLogedInUser');

        }

    },

    /*

     * load stream

     */

    loadStream : function(divId, backgroundImage, manifestUrl, androidUrl, iosUrl)

    {

        ua = navigator.userAgent.toLowerCase();

        isAndroid = ua.indexOf("android") > -1; // && ua.indexOf("mobile");

        if (isAndroid || navigator.userAgent.match(/Windows Phone/i)) {

            document.getElementById(divId).innerHTML = "<a target=\"_blank\" href=\"" + androidUrl + "\">" + "<img class='imageOffline' border=\"0\" src=\"" + backgroundImage + "\" /></a><div style=\"position: absolute;  top: 60px;  font-size: 30px;  background: white;\">Bấm vào hình để xem</div>";

        } else if(loadPlayer.ismobile()){

            document.getElementById(divId).innerHTML = '<video width="100%" height="100%" autoplay="autoplay" controls="controls"><source src="' + iosUrl + '" type="video/mp4"></video>';

        } else{

            if(loadPlayer.disableSetup) {

                return;

            }

            if(loadPlayer.status == "off"){

                manifestUrl = "test";

            }

            if(loadPlayer.hlsSetup) {

                $('.show-notif').html('');

                jwplayer(divId).setup({
                    width : '100%',

                    height : '100%',

                    //stretching: "none",

                    autostart : true,

                    startparam : "start",

                    vn_streaming: 'true',

                    vn_viewer : loadPlayer.vn_viewer,
                    
                    vn_roomid : loadPlayer.roomId,

                    vn_popout: loadPlayer.popout,

                    playlist : [{

                        image : backgroundImage,

                        file : manifestUrl,

                        provider: loadPlayer.provider,

                        type: 'hls',

                        key: loadPlayer.requestToken + "_" + loadPlayer.requestKey

                    }],

                    vn_status: loadPlayer.status,

                    vn_redirect: {

                        href: loadPlayer.redirectUrl,

                        target: loadPlayer.redirectType

                    },

                    primary : "flash"



                }).onError(function(error){

                    if (window.console) {

                        console.log(error);

                    }

                    var url = 'http://report.talktv.vn?PlayerError|'+ loadPlayer.channel + '|' + error.type + "|" + error.message;
                    $.ajax({
                        url : url,
                        type : 'GET',
                        success : function(result)
                        {
                        }
                    });
                    if(error.type == 'jwplayerError' && error.message == 'Cannot load M3U8: Error #2032' && manifestUrl != "test") {

                        jwplayer('channel-mediaplayer').remove();

                        $('#channel-mediaplayer').css('background-color', 'black');

                        $('.show-notif').html('Stream đang được xử lý, vui lòng đợi...');

                        setTimeout(function() {

                            loadPlayer.initialize();

                        }, 15000);

                    }

                    if(error.type == 'jwplayerError' && error.message == 'Cannot load M3U8: Error #2032' && manifestUrl == "test") {
                        jwplayer("channel-mediaplayer").load({file: loadPlayer.countdownVideo, image:backgroundImage});
                        jwplayer("channel-mediaplayer").play();
                    }

                    if(error.type == 'jwplayerError' && error.message == 'Manifest is not a valid M3U8 file' && manifestUrl == "test") {
                        jwplayer("channel-mediaplayer").load({file: loadPlayer.countdownVideo, image:backgroundImage});
                        jwplayer("channel-mediaplayer").play();
                    }



                    /*if(error.message == 'Error loading stream: Could not connect to server') {

                        $(loadPlayer.playDiv).html('<div class="flashNoti"> Nếu bạn là thành viên phòng GPI, GSD, GSO, click <a href="' +  location.href + '?specialdept=1' + '">vào đây</a>  để xem</div>');

                        $(loadPlayer.playDiv).append('<div class="flashNoti"> Nếu bạn là thành viên phòng khác, click <a href="' +  location.href + '">vào đây</a>  để xem</div>');

                    }*/

                });

            }

            

            if(! detectIE()  && ! navigator.userAgent) {

                var event = new CustomEvent('player-setup', { 'detail': divId});

                document.dispatchEvent(event);

            }

            loadPlayer.isStart = true;

            day = new Date();

            loadPlayer.lastTrack = day.getTime();

            /*jwplayer(divId).onPlay(function() {

                loadPlayer.playHandler();

                loadPlayer.isStart = false;

                jwplayer("channel-mediaplayer").callInternal("jwSetOnOffImage", loadPlayer.onlineImage);

            });*/

            jwplayer(divId).onComplete(function() {

                jwplayer("channel-mediaplayer").callInternal("jwSetOnOffImage", loadPlayer.offlineImage);

            });

            jwplayer(divId).onPause(function() {

                loadPlayer.pauseHandler();

                loadPlayer.isStart = true;

            });

            jwplayer(divId).onIdle(function() {

                jwplayer("channel-mediaplayer").callInternal("jwSetOnOffImage", loadPlayer.offlineImage);

                loadPlayer.pauseHandler();

            });

        }

    },

    /*

     * load mp4 file

     */

    loadMp4: function (divId, backgroundImage, mp4) {

        if(loadPlayer.status == "off"){

            manifestUrl = "test";

        }

        jwplayer(divId).setup({
            width : '100%',

            height : '100%',

            autostart : loadPlayer.autostart,

            startparam : "start",

            vn_streaming: 'true',

            vn_popout: loadPlayer.popout,

            playlist : [{

                image : backgroundImage,

                sources : [{

                    file : mp4

                }]

            }],

            vn_status: loadPlayer.status,

            vn_redirect: {

                href: loadPlayer.redirectUrl,

                target: loadPlayer.redirectType

            },

            primary : "flash"

        });

        if ($("#channel-viewer-count").length > 0){

            $("#channel-viewer-count").html('Offline');

        }

        /*jwplayer(divId).onPlay(function() {

            jwplayer("channel-mediaplayer").callInternal("jwSetOnOffImage", loadPlayer.onlineImage);

        });*/

        jwplayer(divId).onComplete(function() {

            jwplayer("channel-mediaplayer").callInternal("jwSetOnOffImage", loadPlayer.offlineImage);

        });

        

        jwplayer(divId).onIdle(function() {

            jwplayer("channel-mediaplayer").callInternal("jwSetOnOffImage", loadPlayer.offlineImage);

        });

    },

    loadCountdown: function (divId){

        if(loadPlayer.disableSetup) {

            return;

        }

        jwplayer(divId).setup({

            width : '100%',

            height : '100%',

            autostart : loadPlayer.autostart,

            startparam : "start",

            vn_streaming: 'true',

            vn_viewer : loadPlayer.vn_viewer,

            vn_popout: loadPlayer.popout,

            playlist : [{

                sources : [{

                    file : loadPlayer.countdownVideo

                }]

            }],

            primary : "flash"

        });

    },

    loadImage: function(divId, backgroundImage){
        if(loadPlayer.disableSetup) {

            return;

        } 

        if(loadPlayer.ismobile()){

            document.getElementById(divId).innerHTML = "<div>" + "<img class='imageOffline' border=\"0\" src=\"" + backgroundImage + "\" /></div><div style=\"position: absolute;  top: 60px;  font-size: 30px;  background: white;\">Offline</div>";

        } else {

            jwplayer(divId).setup({

                file: loadPlayer.countdownVideo,

                width : '100%',

                height : '100%',

                image : backgroundImage,

                vn_viewer : loadPlayer.vn_viewer,

                vn_popout: loadPlayer.popout,

                vn_redirect: {

                    href: loadPlayer.redirectUrl,

                    target: loadPlayer.redirectType

                },

                primary : "flash"

            });
            jwplayer(divId).onComplete(function() {

            jwplayer("channel-mediaplayer").callInternal("jwSetOnOffImage", loadPlayer.offlineImage);

	        });

	        

	        jwplayer(divId).onIdle(function() {

	            jwplayer("channel-mediaplayer").callInternal("jwSetOnOffImage", loadPlayer.offlineImage);

	        });

        }
    	loadPlayer.streamOff();

        if ($("#channel-viewer-count").length > 0){

            $("#channel-viewer-count").html('Offline');

        }

    },

    /*

     * handle when stream toggle

     */

    streamOnOff : function(params)

    {

        // if player is popout, do nothing

        if(loadPlayer.isPopout) {

            return;

        }

        /*

         * stream on

         */

        if (params[0] == 1) {

            loadPlayer.streamOn();

        } else {

            /*

             * stream off

             */

           loadPlayer.streamOff();

        }

    },

    streamOn : function()

    {

        if(loadPlayer.hlsSetup) {

            jwplayer('channel-mediaplayer').remove();

            $('#channel-mediaplayer').css('background-color', 'black');

            $('.show-notif').html('Stream đang được xử lý, vui lòng đợi...');

            setTimeout(function() {

                $('.show-notif').html('');

                loadPlayer.loadCountdown('channel-mediaplayer');

                jwplayer('channel-mediaplayer').setControls(false);

                setTimeout(function() {

                    loadPlayer.reloadPlayer(loadPlayer.channel, false);

                }, 3000);

                $('#schedule-edit-view-on').removeClass('hide').show();

                $('#schedule-edit-view-off').hide();

                $('#channel-status').html('Trực tiếp');

            }, 27000);

        } else {

            loadPlayer.loadCountdown('channel-mediaplayer');

            jwplayer('channel-mediaplayer').setControls(false);

            setTimeout(function() {

                loadPlayer.reloadPlayer(loadPlayer.channel, false);

            }, 3000);

            $('#schedule-edit-view-on').removeClass('hide').show();

            $('#schedule-edit-view-off').hide();

            $('#channel-status').html('Trực tiếp');

        }

    },

    streamOff: function()

    {

        $('.show-notif').html('');

        loadPlayer.live = 0;

        jwplayer("channel-mediaplayer").callInternal("jwSetStreamOff");

        jwplayer("channel-mediaplayer").callInternal("jwSetOnOffImage", loadPlayer.offlineImage);

        loadPlayer.pauseHandler();

        $('#schedule-edit-view-off').removeClass('hide').show();

        $('#schedule-edit-view-on').hide();

        $('#channel-status').html('Offline');

    },

    reloadPlayer : function(channel, redirect)

    {

        $.ajax({

            url : '/streaming/play/get-stream-data/channel/' + channel + '/limit/' + loadPlayer.limit,

            type : 'GET',

            dataType:"JSON",

            success : function(result)

            {

                loadPlayer.backgroundImage = result.background;

                loadPlayer.channel = result.channel;

                loadPlayer.manifestUrl = result.manifestUrl;

                loadPlayer.androidUrl =  result.androidUrl;

                loadPlayer.iosUrl = result.iosUrl;

                loadPlayer.live = result.live;

                loadPlayer.trailer = result.trailer;

                loadPlayer.hlsSetup = result.hlsSetup;

                loadPlayer.currentViewers = result.currentViewers;

                if(redirect) {

                    loadPlayer.redirectUrl = result.redirectUrl;

                    loadPlayer.redirectType = result.redirectType;

                }

                loadPlayer.adsStart = Cookie.readCookie("ads_start_time");
					 
                loadPlayer.adsDuration = Cookie.readCookie("ads_duration");

                loadPlayer.status = loadPlayer.live ? "on" : "off";

                if(loadPlayer.trailer) {

                    loadPlayer.loadMp4('channel-mediaplayer', loadPlayer.backgroundImage, loadPlayer.trailer);

                } else {

                    loadPlayer.loadStream('channel-mediaplayer', loadPlayer.backgroundImage, loadPlayer.manifestUrl, loadPlayer.androidUrl, loadPlayer.iosUrl);

                }

            }

        });

    },

    /*

     * check if ie is below 6, notif to update

     */

    ieBelow6 : function()

    {

        $(loadPlayer.playDiv).hide();

        $('#error-content').html('<div class="flashNoti"> Internet Explorer quá cũ, vui lòng cập nhật <a target="_blank" href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">Internet Explorer</a>  6.0  trở lên</div>')

        $('#unsupportedbrowser').show();

    },

    ismobile : function()

    {

        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)

                || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {

            return true;

        }

        return false;

    },

    isApple: function()

    {

        if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)) {

            return true;

        }

        return false;

    },

    playHandler: function()

    {

        day = new Date();

        milisecondTime = day.getTime();

        secondTime = Math.round(milisecondTime / 1000);

        if(! loadPlayer.startTime) {

            loadPlayer.startTime = secondTime;

        }

        

        loadPlayer.trackPlayingTime();

    },

    trackPlayingTime: function()

    {

        setTimeout(function(){

            if(jwplayer('channel-mediaplayer').getState() == "PLAYING"){

                day = new Date();

                milisecondTime = day.getTime();

                var uin = Cookie.readCookie('talktv_session_uin');

                uin = uin ? uin : 0;

                isTrack = milisecondTime - loadPlayer.lastTrack;

                if (isTrack >= 60000 && loadPlayer.channel != '') {

                    var url = 'http://report.talktv.vn?PlayingTime|'+ loadPlayer.channel + '|' + uin;

                    $.ajax({

                        url : url,

                        type : 'GET',

                        success : function(result)

                        {

                        }



                    });

                    loadPlayer.lastTrack = milisecondTime;

                    loadPlayer.trackPlayingTime();

                }

                

            }

        }, 60000);

        

    }, 

    pauseHandler: function()

    {

        if(! loadPlayer.playDuration) {

            if(! isNaN(jwplayer('channel-mediaplayer').getPosition())) {

                loadPlayer.playDuration = jwplayer('channel-mediaplayer').getPosition();

            }

        } else {

            if(! isNaN(jwplayer('channel-mediaplayer').getPosition())) {

                loadPlayer.playDuration += jwplayer('channel-mediaplayer').getPosition();

            }

        }

    },

    closePlayerHandler: function()

    {

        if(! loadPlayer.startTime) {

            return;

        }

        key = loadPlayer.channel;

        if(! key){

            return;

        }

        day = new Date();

        milisecondTime = day.getTime();

        secondTime = Math.round(milisecondTime / 1000);

        if(jwplayer('channel-mediaplayer').getState() == 'PLAYING') {

            if(! loadPlayer.playDuration) {

                if(! isNaN(jwplayer('channel-mediaplayer').getPosition())) {

                    loadPlayer.playDuration = jwplayer('channel-mediaplayer').getPosition();

                }

            } else {

                if(! isNaN(jwplayer('channel-mediaplayer').getPosition())) {

                    loadPlayer.playDuration += jwplayer('channel-mediaplayer').getPosition();

                }

            }

        }

        var playerTime = SGN.Core.getCookie('viewTime');

        if(! playerTime){

            playerTime = {};

        } else {

            playerTime = JSON.parse(playerTime);

        }

        if (typeof playerTime[key] != 'undefined') {

            playerTime[key]['startTime'] = loadPlayer.startTime;

            playerTime[key]['endTime'] = secondTime;

            playerTime[key]['duration'] = loadPlayer.playDuration;

        } else {

            playerTime[key] = {};

            playerTime[key]['startTime'] = loadPlayer.startTime;

            playerTime[key]['endTime'] = secondTime;

            playerTime[key]['duration'] = loadPlayer.playDuration;

        }

        if(playerTime[key]['duration'] > 5) {

            result = JSON.stringify(playerTime);

            SGN.Core.setCookie('viewTime', result, 31536000, '/');

        }

    },

    loadAds: function(params){

        loadPlayer.adsStart = Math.round(new Date().getTime()/1000);
		  
		  console.log(loadPlayer)

        Cookie.createCookie("ads_start_time", loadPlayer.adsStart);

        loadPlayer.adsDuration = parseInt(params["duration"]);

        Cookie.createCookie("ads_duration", loadPlayer.adsDuration);

        jwplayer("channel-mediaplayer").callInternal("jwStartAds");

    }

};

function getStartAdsTime() {

    return loadPlayer.adsStart;

}



function getStartAdsDuration() {

    return loadPlayer.adsDuration;

}

function onPlay(type) {

    if(type == 1){

        return;

    }

    loadPlayer.playHandler();

    loadPlayer.isStart = false;

    jwplayer("channel-mediaplayer").callInternal("jwSetOnOffImage", loadPlayer.onlineImage);

}



