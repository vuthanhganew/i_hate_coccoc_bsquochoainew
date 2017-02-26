(function() {
    "use strict";

    /**
     * @param {function(...) : jQuery} $ jQuery
     * @param {Remspect} remspect
     * @param {Guid} Guid
     */
    function init($, remspect, Guid) {
        var wistiaVideoDebug = false;
        var recorded = false;
        var AUTOPLAY_VIDEO_MAX = 4;

        /**
         * @param {string} wistiaEmbedId
         * @param {Object} options Configuration options
         * @param {boolean} [options.videoFoam=true]
         * @param {boolean} [options.hashSeekEnabled=false] if true, allow seeking by url hash fragment in the format #[mm:ss]
         * @param {boolean} [options.isAutoplayable=false]
         * @param {boolean} [options.allowLoadOnClick=false]
         * @param {int} [options.tracking=] Tracking Id
         * @param {Element} element html element representing this video (has a data-wistiaid attribute)
         * @constructor
         */
        function RemVideo(wistiaEmbedId, options, element) {
            try {
                this.wistiaEmbedId = wistiaEmbedId;
                this.$element = $(element);

                var videoFoam = options.videoFoam;
                /*makes things responsive -automatically sets width and height*/
                if (videoFoam === undefined) {
                    videoFoam = true;
                }
                this.wistiaVideo = null;
                this.videoPopups = [];

                //keep track of how many videos have been autoplayed in a row
                if (this.checkLS() === true) {
                    if (localStorage.getItem('fromAutoplay')) {
                        localStorage.removeItem('fromAutoplay');

                        //note - if this is the first autoplayed video it's actually the 2nd video played, thus we start at 2 rather than 1
                        var numAutoplayed = parseInt(localStorage.getItem('numAutoplayed') || '1');
                        localStorage.setItem('numAutoplayed', numAutoplayed + 1);
                    }
                    else {
                        localStorage.removeItem('numAutoplayed');
                    }
                }

                //autoplay option is stored in localstorage under 'autoplay'
                var autoplay;

                if (this.checkLS() === true) {
                    if (options.isAutoplayable) {
                        if (typeof remspect !== 'undefined' && (remspect.isVariation('autoplay', 'default') && localStorage.getItem('autoplay') === null)) {
                            localStorage.setItem('autoplay', true);
                        }
                        autoplay = localStorage.getItem('autoplay') === "true"; //remove when we load from db
                    }
                    else {
                        autoplay = false;
                    }
                }

                this.options = options;
                this.embedOptions = {
                    videoFoam: videoFoam,
                    controlsVisibleOnLoad: false,
                    autoPlay: autoplay,
                    playButton: true,
                    endVideoBehavior: 'default'
                };

                // Autoplay on by Default
                if (remspect.isVariation('defaultAutoplay', 'on')) {
                    if (localStorage.getItem('autoplay') === null) {
                        this.embedOptions['autoPlay'] = true;
                    }

                    this.embedOptions['goToNextVideo'] = false;
                }

                // Animated Play Button
                if (!remspect.isControl("animatedPlayButton")) {
                    this.embedOptions['playButton'] = false;
                }

                // Dim the lights
                if (remspect.isVariation('dimTheLights', 'v1')){
                    this.embedOptions['plugin'] = {
                        dimTheLights: {
                            src: "//fast.wistia.com/labs/dim-the-lights/plugin.js"
                        }
                    };
                }

                this._doEmbed();
            } catch (e) {
                this.$element.children().hide();
                this.$element.find(".error").show();
                throw e;
            }

            $('[data-wistia-play]').bind('click',$.proxy(function () {
                this.wistiaVideo.play()
            },this))
        }

        RemVideo.prototype.checkLS = function() {
            var test = 'oh hay, youre here!';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            }
            catch (e) {
                return false;
            }
        };

        RemVideo.prototype._doEmbed = function() {
            if (typeof define !== "undefined" && define.amd) {
                require(['lib/wistia'], $.proxy(function(Wistia) {
                    try {
                        this._doEmbedResolved(Wistia);
                    }
                    catch (e) {
                        this.$element.children().hide();
                        this.$element.find(".error").show();
                        throw e;
                    }
                }, this));
            }
            else {
                this._doEmbedResolved(window.Wistia);
            }
        };

        RemVideo.prototype._doEmbedResolved = function(Wistia) {
            this.wistiaVideo = Wistia.embed(this.wistiaEmbedId, this.embedOptions);

            if (this.options.tracking) {
                this.videoTracking = new VideoTracking(this.wistiaVideo, this.options.tracking, this.$element);
            }

            this.initializeVideoPopups();

            var self = this;
            //todo paul hack - this should be "on" not delegate, but non-redesign pages only have jquery 1.6.4. Change after redesign
            $(document.body).delegate("[data-marker]", "click", function (e) {
                self.seekTo($(this).data('marker'));
            });

            if (this.options.hashSeekEnabled) {
                this.wistiaVideo.ready(function () {
                    $(window).on("hashchange", function (e) {
                        var time = self._parseSeekTo(location.hash);
                        if (time !== null) {
                            self.seekTo(time);
                        }
                    });

                    var time = self._parseSeekTo(location.hash);
                    if (time !== null) {
                        self.seekTo(time);
                        self.wistiaVideo.play();
                    }
                });
            }

            if (this.checkLS() === true) {
                /*show options at end of video to only logged in users*/
                if (remspect.isVariation('defaultAutoplay', 'on')){

                    console.log('mewo')


                    if(localStorage.getItem('autoplay') == 'false'){

                        var postRoll = new PostRoll(this.wistiaVideo, false);

                    } else if (localStorage.getItem('autoplay') == 'true') {

                        var postRoll = new PostRoll(this.wistiaVideo, true);

                    } else {

                        this.wistiaVideo.ready(function () {
                            self.wistiaVideo.play();
                        });
                        var postRoll = new PostRoll(this.wistiaVideo, null);

                    }

                }
                else if (!remspect.isVariation('defaultAutoplay','on')){
                    var postRoll = new PostRoll(this.wistiaVideo, this.embedOptions.autoPlay);
                }
            }

            if (this.embedOptions.autoPlay || this.embedOptions.loadOnClick) {
                this.wistiaVideo.ready(function() {
                    self.wistiaVideo.play();
                });
            }
        };

        RemVideo.prototype.seekTo = function (time) {
            $('#videoTab, [data-lessonTabLink]').trigger('click');
            this.wistiaVideo.time(time);
            if(this.wistiaVideo.embedType === 'html5') {
                this.wistiaVideo.play();
            }
        };

        RemVideo.prototype._parseSeekTo = function(hash) {
            var match = /\[(\d+):(\d+)]/i.exec(hash);
            if (match) {
                return parseInt(match[1]) * 60 + parseInt(match[2]);
            }
            else {
                return null;
            }
        };

        /**
         * Find popups for this video and initialized them
         */
        RemVideo.prototype.initializeVideoPopups = function () {

            var videoPopupElements = $('*[data-video-popup]');

            $.each(videoPopupElements, $.proxy(function (i, element) {

                var $element = $(element);

                // make sure popup is for this video
                if ($element.data('video-popup') !== this.wistiaEmbedId) {
                    return true;
                }

                var displayTime = $element.data('video-popup-display-time');
                var displayVideoPercent = $element.data('video-popup-display-video-percent');
                var preventContinuation = $element.data('video-popup-prevent-continuation');
                var isPaywall = $element.is('[data-video-popup-is-paywall]');
                var hideVideo = $element.data('hide-video');

                // init popup
                var videoPopup = new VideoPopup(this.wistiaVideo, $element, displayTime, displayVideoPercent, preventContinuation, isPaywall,
                  hideVideo);
                this.videoPopups.push(videoPopup);

            }, this));
        };


        /**
         * @constructor
         */
        function PostRoll(video, autoplay) {
            this.duration = 0;
            this.$overlay = $('[data-postroll-overlay]');
            this.$normalPostroll = $('[data-postroll]');
            this.$autoplayLimit = $('[data-postroll-autoplay-limit]');
            this.$countdown = $('[data-countdown]');
            this.$countdownCounter = $('[data-countdown-counter]');
            this.$replay = $('[data-replay]');
            this.$pointsDisplay = $('[data-pointsDisplay]');
            this.counter = 10;
            this.$comingNext = $('[data-coming-up-next]');
            this.nextLesson = $('[data-postroll-next-lesson]');
            this.nextLessonLink = this.nextLesson.attr('href');
            this.isShowNextLesson = false;
            this.isAutoPlay = autoplay;
            this.toggleAutoPlay = $('[data-toggle-autoplay]');

            this.showAutoplayLimit = localStorage.getItem('numAutoplayed') >= AUTOPLAY_VIDEO_MAX && this.nextLessonLink;
            this._init(video);

            /*event bindings*/
            video.bind('end', $.proxy(function () {
                video.cancelFullscreen();
                if (this.isAutoPlay && this.nextLessonLink && !this.showAutoplayLimit) {
                    video.trigger('end.showCountDownToNextVideo', video);
                }
            }, this));

            video.bind('end.showCountDownToNextVideo', $.proxy(function () {
                this.showCountDownToNextVideo(this);
            }, this));


            video.bind('secondchange', $.proxy(function (second) {
                if (this.isAutoPlay && this.nextLessonLink) {
                    if (second >= this.duration - 10 && !this.$comingNext.is(':visible') && !this.isShowNextLesson) {
                        video.trigger('secondchange.showNextLesson', video);
                        this.isShowNextLesson = true;

                    }
                    else if (second < this.duration - 10) {
                        this.$comingNext.removeClass('in');
                        this.isShowNextLesson = false;
                    }
                }
            }, this));


            video.bind('secondchange.showNextLesson', $.proxy(function () {
                this.showNextLesson(this);
            }, this));

            if (this.$replay.length > 0) {
                this.$replay.on('click', $.proxy(function () {
                    this._hideAndReset();
                    video.time(0).play();
                }, this));
            }

        }

        PostRoll.prototype._init = function (video) {
            this._getDuration(video);
            this.showOptions(video);
            this._autoPlayHandler(video);
        };

        PostRoll.prototype._autoPlayHandler = function (video) {
            var self = this;

            if (this.isAutoPlay) {
                this.toggleAutoPlay.attr('checked', true);
            }

            this.toggleAutoPlay.bind('click', function () {
                if ($(this).is(':checked')) {
                    localStorage.setItem('autoplay', true);

                    self.isAutoPlay = true;
                    //unbind / rebind events so they arent called multiple times
                    video.unbind('end.showCountDownToNextVideo');
                    video.bind('end.showCountDownToNextVideo', function () {
                        self.showCountDownToNextVideo(self);
                    });

                    video.unbind('secondchange.showNextLesson');
                    video.bind('secondchange.showNextLesson', function () {
                        self.showNextLesson(self);
                    });
                }
                else if (!$(this).is(':checked')) {
                    localStorage.setItem('autoplay', false);
                    self.isAutoPlay = false;

                    video.unbind('end.showCountDownToNextVideo');
                    video.unbind('secondchange.showNextLesson');
                }
            });
        };

        PostRoll.prototype.showNextLesson = function (self) {
            self.$comingNext.addClass('in');
        };

        PostRoll.prototype.showCountDownToNextVideo = function (self) {
            var delayAnimation = setInterval($.proxy(function () {
                this.countdownAndGoToNextLesson();
                clearTimeout(delayAnimation);
            }, this), 500);

        };

        PostRoll.prototype._getDuration = function (video) {
            video.bind('play', $.proxy(function () {
                this.duration = video.duration();
            }, this));
        };

        PostRoll.prototype.countdownAndGoToNextLesson = function () {
            this.$countdown.addClass('in');

            this.interval = setInterval($.proxy(function () {
                this.counter--;
                if (this.counter > 0) {
                    this.$countdownCounter.html(this.counter);
                }
                else if (this.counter === 0) {
                    this.$countdownCounter.html(0);
                    this.$countdown.addClass('done');
                }
                else if (this.counter === -1) {
                    var virtualAAString = this.nextLesson.attr('data-virtual');
                    localStorage.setItem('fromAutoplay', true);
                    $.cookie('virtualAA', virtualAAString, {path: this.nextLessonLink});
                    window.location.href = this.nextLessonLink;
                    clearInterval(this.interval);
                    this.counter = 10;
                }
            }, this), 1000);
        };

        PostRoll.prototype.showOptions = function (video) {
            video.bind('end', $.proxy(function () {
                if (this.showAutoplayLimit) {
                    this.$autoplayLimit.addClass('in');
                }
                else {
                    this.$normalPostroll.addClass('in');
                    this.$pointsDisplay.addClass('in');
                }
                this.$overlay.addClass('in');
            }, this));
        };

        PostRoll.prototype._hideAndReset = function () {
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.$countdown.removeClass('in');
            this.$comingNext.removeClass('in');
            this.$overlay.removeClass('in');
            this.$autoplayLimit.removeClass('in');
            this.$normalPostroll.removeClass('in');
            this.$pointsDisplay.addClass('in');
            this.isShowNextLesson = false;
        };

        /**
         * @param {Element} element html element representing this video (has a data-wistiaid attribute)
         * @constructor
         */
        function VideoTracking(video, trackingId, element) {
            var currentView = null;

            function endCurrentView() {
                if (currentView !== null) {
                    currentView.timeEnded = new Date().getTime();
                    if (wistiaVideoDebug) {
                        console.log(currentView);
                    }

                    var event = /** @type {CustomEvent} */ document.createEvent("CustomEvent");
                    event.initCustomEvent("videoEvent", true, true, {videoView: currentView});
                    document.dispatchEvent(event);
                    currentView = null;
                }
            }

            function beginNewView() {
                var videoView = {};
                videoView.requestGuid = document.getElementById("requestGuid").value;
                videoView.embedId = video.hashedId();
                videoView.siteResourceId = trackingId;
                videoView.durationInSeconds = Math.floor(video.duration());
                videoView.timeStarted = new Date().getTime();
                videoView.videoViewGuid = Guid.New();
                currentView = videoView;

                var event = /** @type {CustomEvent} */ document.createEvent("CustomEvent");
                event.initCustomEvent("videoEvent", true, true, {videoView: currentView});
                document.dispatchEvent(event);
            }

            video.bind('play', function () {
                if (wistiaVideoDebug) {
                    console.log('play');
                }

                // If there's no current view, then the student has decided to watch the video. If there's a guid associated with this share,
                // then make an ajax call to store the data. Fail silently.
                if (!recorded) {
                    $.post("/member/teacher-share/record-student-view.ajax", {"academyAssetId": $("#videoLessonWrapper").data("academyassetid")});
                    recorded = true;
                }

                beginNewView();

                $(element).trigger('wistia-play');
            });

            video.bind('end', function () {
                if (wistiaVideoDebug) { console.log('end'); }
                endCurrentView();

                $(element).trigger('wistia-end');
            });

            video.bind('seek', function () {
                if (wistiaVideoDebug) { console.log('seek'); }
                endCurrentView();
                beginNewView();

                $(element).trigger('wistia-seek');
            });

            video.bind('pause', function () {
                if (wistiaVideoDebug) { console.log('pause'); }
                endCurrentView();

                $(element).trigger('wistia-pause');
            });

            video.bind('widthchange', function () {
                // If the video becomes fullscreen
                if (video.width() === $(window).width()) {
                    var event = /** @type {CustomEvent} */ document.createEvent("CustomEvent");
                    event.initCustomEvent('fullscreenEvent', true, true, {videoView: currentView});
                    document.dispatchEvent(event);
                    
                    if (wistiaVideoDebug) { console.log('fullscreenEvent'); }
                }
            });

            video.bind('secondchange', function (second) {
                if (wistiaVideoDebug) {
                    console.log('secondchanged: ' + second);
                }
                if (currentView !== null) {
                    if (!currentView.hasOwnProperty("startSecond") || second < currentView.startSecond) {
                        currentView.startSecond = second;
                    }
                    if (!currentView.hasOwnProperty("endSecond") || second > currentView.endSecond) {
                        currentView.endSecond = second;
                    }
                }

                $(element).trigger('wistia-secondchange');
            });


        }

        /**
         * VideoPopup Object that binds to the correct wistia event listeners
         * @param {!object} video
         * @param {!object} popupElement
         * @param {number} displayTime time to stop the video and show popup, this takes precedence over displayVideoPercent
         * @param {number} displayVideoPercent percent through the video to stop the video and show popup, this is only used if displayTime is not defined
         * @param {boolean} [preventContinuation] true to prevent the user from skipping popup and continuing the video
         * @param {string} [triggerName] name of a trigger to send on the popup showing
         * @constructor
         */
        function VideoPopup(video, popupElement, displayTime, displayVideoPercent, preventContinuation, isPaywall, hideVideo) {

            this.video = video;
            this.popupElement = $(popupElement);
            this.displayTime = displayTime;
            this.displayVideoPercent = displayVideoPercent;
            this.preventContinuation = preventContinuation;
            this.isPaywall = isPaywall;
            this.isPopupSeen = false;
            this.mediaQuery = window.matchMedia("(max-width: 768px)");
            this.$wistiaEmbedContainer = $('.wistia_embed');
            this.closePopupButton = $(this.popupElement).find('[data-close-popquiz]');
            this.hideVideo = hideVideo;
            this.infoBanner = $('[data-info-banner]');
            this.previewEnd = $('[data-preview-end]');
            this.previewCountdown = $('[data-preview-countdown]');
            this.$previewCountdownCounter = $('[data-preview-countdown-counter]');

            if (!this.isMobile() && window.isNoRD) {
                this.video.grid.top_inside.appendChild(this.popupElement[0]);
                this.resizePopup();
                this.video.bind("heightchange", $.proxy(this.resizePopup, this));
            }

            //this.video.bind("secondchange", $.proxy(this.showPopupIfTimestampMatches, this));

            this.closePopupButton.click($.proxy(function () {
                this.hidePopup();
            }, this));

            /*set event listener*/
            $('body').bind('lastQuestionInQuiz', $.proxy(function () {
                this.hidePopup();
            }, this));
        }

        VideoPopup.prototype.showPopup = function () {
            if (this.hideVideo) {
                this.$wistiaEmbedContainer.hide();
                this.popupElement.fadeIn();
            }
            else {
                //this.popupElement.removeClass('displayNone hidden');
                //this.infoBanner.addClass('in');
                //this.previewEnd.addClass('in');
                //this.previewCountdown.removeClass('in');
            }

        };

        VideoPopup.prototype.hidePopup = function () {
            if (this.hideVideo) {
                this.$wistiaEmbedContainer.fadeIn();
                this.volumeFadeIn(this.volume);
                this.video.play();
                this.popupElement.hide();
            }
            else {
                this.popupElement.addClass('displayNone hidden');
            }
        };

        VideoPopup.prototype.volumeFadeOut = function (fadeFrom) {

            var fade = fadeFrom;

            this.fadeFromInterval = setInterval($.proxy(function () {
                if (fade > 0) {
                    /*lower volume 10% of max volume*/
                    fade = fade - 0.10;

                }
                else {
                    fade = 0;
                    clearInterval(this.fadeFromInterval);
                }

                this.video.volume(fade);

            }, this), 100);
        };

        VideoPopup.prototype.volumeFadeIn = function (fadeTo) {
            var fade = this.video.volume(); //set back to volume before fade out

            this.fadeToInterval = setInterval($.proxy(function () {
                if (fadeTo > fade) {

                    /*raise volume 10% of max volume*/
                    fade = fade + 0.10;

                }
                else {
                    fade = this.volume;
                    clearInterval(this.fadeToInterval);
                }

                this.video.volume(fade);

            }, this), 100);
        };

        /**
         *
         * @param currentVideoTime
         */
        VideoPopup.prototype.showPopupIfTimestampMatches = function (currentVideoTime) {

            // initialize display time based on percent of video length if not set
            if (!this.displayTime) {

                var videoDuration = this.video.duration();
                if (!videoDuration || videoDuration === 0) {
                    return;
                }

                this.displayTime = this.displayVideoPercent / 100 * videoDuration;
            }

            var displayPopupWithoutContinuation = this.preventContinuation && (currentVideoTime > this.displayTime);

            var displayOneTimePopup = !this.isPopupSeen && (this.displayTime >= currentVideoTime) && (this.displayTime < currentVideoTime + 1);

            var fadeVolOneTimePopup = !this.isPopupSeen && (this.displayTime - 1 >= currentVideoTime) && (this.displayTime - 1 < currentVideoTime + 1);

            var previewEndCountdown = Math.floor(this.displayTime - currentVideoTime);

            if (previewEndCountdown > 0) {
                this.previewEnd.removeClass('in');
                if (previewEndCountdown <= 30) {
                    this.previewCountdown.addClass('in');
                    this.$previewCountdownCounter.html(previewEndCountdown);
                }
                else {
                    this.previewCountdown.removeClass('in');
                }
            }

            if (fadeVolOneTimePopup) {
                this.volume = this.video.volume();

                this.volumeFadeOut(this.volume);
            }

            if (displayPopupWithoutContinuation || displayOneTimePopup) {

                //this.video.pause();
                this.video.time(this.displayTime);

                /*pulled out so it works on redesign as well. this will close desktop when fullscreened if they dont have a subscription */
                if (this.video.cancelFullscreen) { //for some reason this method doesn't exist in IE
                    this.video.cancelFullscreen();
                }

                this.showPopup();

                $('.videoContainer').addClass('paywall-up');

                if (this.animateToPopup()) {
                    $('body').animate({
                        scrollTop: this.popupElement.offset().top
                    }, 1000);
                }

                if (this.isPaywall) {
                    var event = /** @type {CustomEvent} */ document.createEvent("CustomEvent");
                    event.initCustomEvent("paywallHit", true, true, {paywallLocation: "Video"});
                    document.dispatchEvent(event);
                }

                this.isPopupSeen = true;
            }
        };

        VideoPopup.prototype.animateToPopup = function () {
            return this.isMobile() && this.popupElement.attr('data-scroll-animation').toLowerCase() !== 'noscroll';
        };

        /**
         * Determines if the screen is in a mobile view
         * @returns {Boolean} <code>true</code> if less than or equal to 768px wide, <code>false</code> otherwise.
         */
        VideoPopup.prototype.isMobile = function () {
            if (this.mediaQuery) {
                return this.mediaQuery.matches;
            }
            else {
                return !!document.documentElement.clientWidth;
            }
        };

        /**
         * Resizes the popup to be the same height and width of the video
         */
        VideoPopup.prototype.resizePopup = function () {
            this.popupElement.height(this.video.videoHeight());
            this.popupElement.width(this.video.videoWidth());
        };

        return RemVideo;
    }

    if (typeof define !== 'undefined' && define.amd) {
        define(['jquery', 'util/remspect', 'lib/jquery/guid', 'lib/jquery/cookie'], init);
    }
    else {
        window.RemVideo = init(window.jQuery, window.remspect, window.Guid);
    }
})();
