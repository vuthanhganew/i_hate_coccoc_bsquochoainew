$(function() {
    if (typeof (HDV) == "undefined")
        HDV = {};
    if (typeof (HDV.V2) == "undefined")
        HDV.V2 = {};
    /* object Info module */
    HDV.V2.PlayerMedium = {
        isFavorited: false,
        isInited: false,
        callbackFavorite: null,
        Size: {
            Width: $('.boxplay img').width(),
            Height: $('.boxplay img').height()  
        },
        isFlashPrevent: false,
        name: "mediumplayer",
        Show: function() {
            $(".boxplayer-popup").css({'visibility': 'visible'});
            HDV.V2.Info.InitSizePlayer(function() {
                if (!detailConfig.isTrailer || (detailConfig.isTrailer && jwplayer(HDV.V2.PlayerMedium.name).getState() == "PAUSED")) {
                    jwplayer(HDV.V2.PlayerMedium.name).play();
                }
            });
        },
        Hide: function() {
            if (!jwplayer(HDV.V2.PlayerMedium.name).getFullscreen()) {
                $(".boxplayer-popup").css({'visibility': 'hidden'});
                $("#" + HDV.V2.PlayerMedium.name).blur();
                if (jwplayer(HDV.V2.PlayerMedium.name).getState() == "PLAYING" || jwplayer(HDV.V2.PlayerMedium.name).getState() == "BUFFERING")
                    jwplayer(HDV.V2.PlayerMedium.name).pause();
            }
        },
        IsShow: function() {
            return $(".boxplayer-popup").css("visibility") == "visible" ? true : false;
        },
        Favorite: function(callback) {
            if (!isLogined) {
                this.Hide();
                $("#login_link").trigger("click");
                return;
            }
            this.isFlashPrevent = true;
            this.callbackFavorite = callback;
            $("#click-add-favorite-details").trigger("click");
        },
        RequiredLogin: function() {
            this.Hide();
            $("#login_link").trigger("click");
        }
    };
    HDV.V2.Info = {
        SetStylePage: function() {
            if (isShowAds) {
                var offsetLeftRight = $('.sectiondetail').position().left;
                var offsetTop = $('#Header').height() + 5;
                $(".adv-side-left").css({left: offsetLeftRight - $(".adv-side-left").width() - 10, top: offsetTop});
                $(".adv-side-right").css({left: offsetLeftRight + $('.sectiondetail').width() + 10, top: offsetTop});
            }
            $(window).resize(function() {
                if (isShowAds) {
                    var offsetLeftRight = $('.sectiondetail').position().left;
                    var offsetTop = $('#Header').height() + 5;
                    $(".adv-side-left").css({left: offsetLeftRight - $(".adv-side-left").width() - 10, top: offsetTop});
                    $(".adv-side-right").css({left: offsetLeftRight + $('.sectiondetail').width() + 10, top: offsetTop});
                }
            })
            $('.tooltipthumb2').cluetip({
                local: true,
                arrows: true,
                dropShadow: false,
                hoverIntent: true,
                sticky: true,
                mouseOutClose: 'both',
                delayedClose: 100,
                cluezIndex: 10000,
                width: 280,
                arrowPixelAdded: 185,
                closePosition: 'top',
                positionBy: 'auto',
                closeText: ''
            });
        },
        InitSizePlayer: function(callback) {
            var _this = this;
            if (!HDV.V2.PlayerMedium.isInited) {
                var _documentHeight = $(window).height();
                var _playerHeight = 0;
                var _playerWidth = 0;
                if (!detailConfig.isTrailer) {
                    $(".playercontent").html("<div id='" + HDV.V2.PlayerMedium.name + "'></div>");
                    jwplayer(HDV.V2.PlayerMedium.name).setup({
                        'primary': 'flash',
                        'flashplayer': FRONTEND_STATIC_URL + '/player/' + detailConfig.flashVersion + "/jwplayer.flash.swf",
                        'width': parseInt(HDV.V2.PlayerMedium.Size.Width),
                        'height': parseInt(HDV.V2.PlayerMedium.Size.Height),
                        'autostart': 'false',
                        'stretching': 'uniform',
                        'mid': detailConfig.midPlay,
                    });
                } else {
                    $(".playercontent").html("<div id='mediumplayer'></div>");
                    jwplayer(HDV.V2.PlayerMedium.name).setup({
                        'primary': 'flash',
                        'flashplayer': FRONTEND_STATIC_URL + '/player/' + detailConfig.flashVersion + "/jwplayer.flash.swf",
                        'width': parseInt(HDV.V2.PlayerMedium.Size.Width),
                        'height': parseInt(HDV.V2.PlayerMedium.Size.Height),
                        autostart: 'false',
                        'youtube': (detailConfig.youtubeTrailer ? detailConfig.youtubeTrailer : ''),
                        'name': _this.htmlEntities(detailConfig.name)
                    });
                }
                HDV.V2.PlayerMedium.isInited = true;
                $(document).keyup(function(e) {
                    if ($("#" + HDV.V2.PlayerMedium.name).is(":focus"))
                        return;
                    if (e.keyCode == 27) {
                        HDV.V2.PlayerMedium.Hide();
                    } else if (e.keyCode == 32) {
                        if (jwplayer(HDV.V2.PlayerMedium.name).getState() == "PAUSED") {
                            jwplayer(HDV.V2.PlayerMedium.name).play();
                        } else {
                            jwplayer(HDV.V2.PlayerMedium.name).pause();
                        }
                    }
                });
                if (typeof (callback) == "function")
                    callback();
            } else {
                if (typeof (callback) == "function")
                    callback();
            }


        },
        htmlEntities: function(str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        },
        ShowTrailer: function() {
            $("#bt-view-trailer").click(function() {
                HDV.V2.PlayerMedium.Show();
            });
        },
        Rating: function() {
            $(".stars li").mouseover(function() {
                var rateMark = Math.round($(this).attr('value'));
                $(this).parent().prev().css({
                    'width': rateMark * 10 + 'px'
                });
                $(this).find('.stip').stop(true, true).fadeIn('fast');
            }).mouseout(function() {
                $(this).parent().prev().css({
                    'width': $(this).attr("data-old-width") + 'px'
                });
                $(this).find('.stip').stop(true, true).fadeOut('fast');
            }).click(function() {
                if (!isLogined) {
                    $("#login_link").trigger("click");
                } else {
                    var _movieID = $(this).attr("data-id");
                    var _value = $(this).attr("value");
                    $.post(FRONTEND_URL + '/danh-gia-phim.html', {movieid: _movieID, vote: _value}, function() {
                    })
                            .success(function(data)
                            {
                                try {
                                    data = JSON.parse(data);
                                } catch (e) {
                                }
                                ;
                                if (data.e != "0") {
                                    HDV.V2.Core.ShowNotice({
                                        title: 'Thông báo',
                                        content: data.r,
                                        timeAutoHide: 3000
                                    });
                                    return;
                                } else {
                                    var _rate = Math.round(data.r.Rating / data.r.Votes) * 10;
                                    $('.rated').width(_rate);
                                    $(".stars li").attr({"data-old-width": _rate});
                                    HDV.V2.Core.ShowNotice({
                                        title: 'Thông báo',
                                        content: 'Cảm ơn bạn đã đánh giá phim này.',
                                        timeAutoHide: 3000
                                    });
                                }
                            });
                }
            });

        },
        ClickPlay: function() {
            $(".click-auto-play").click(function() {
                var _location = $(this).attr("href");
                var _id = $(this).attr("data-id");
                console.log(_id);
                if ($(this).hasClass("icon-play")) {
                    HDV.V2.autoplay.push(_id);
                } else {
                    HDV.V2.autoplay.remove(_id);
                }
                window.location.href = _location;
                return false;
            });
        },
        AutoPlay: function() {
            if (HDV.V2.autoplay.checkExists(detailConfig.mid) && !detailConfig.isTrailer) {
                HDV.V2.PlayerMedium.Show();
            }
        },
        CheckFavoriteList: function() {
            if (isLogined) {
                $.get(BASE_URL + "/danh-sach-id-yeu-thich.html", function() {
                })
                        .success(function(rs) {
                            try {
                                rs = JSON.parse(rs);
                            } catch (e) {
                            }
                            ;
                            if (rs.e == "0" && rs.r.Total > 0) {
                                $.each(rs.r.Data, function(i, item) {
                                    if (item == detailConfig.mid)
                                        HDV.V2.PlayerMedium.isFavorited = true;
                                });
                            }
                            if (HDV.V2.PlayerMedium.isFavorited) {
                                $("#click-add-favorite-details").removeClass("addfavour").addClass("deletefavour").text("Xóa khỏi phim yêu thích");
                            }
                        });
            } else {
                HDV.V2.PlayerMedium.isFavorited = false;
            }
            $("#click-add-favorite-details").click(function() {
                var _this = this;
                if ($(this).hasClass("addfavour")) {
                    $.post(BASE_URL + "/them-phim-yeu-thich.html", {MovieID: detailConfig.mid}, function() {
                    })
                            .success(function(rs) {
                                rs = JSON.parse(rs, true);
                                if (rs.e == "0") {
                                    if (!HDV.V2.PlayerMedium.isFlashPrevent) {
                                        HDV.V2.Core.ShowNotice({
                                            title: 'Thông báo',
                                            content: rs.r,
                                            timeAutoHide: 3000
                                        });
                                    }
                                    $(_this).removeClass("addfavour").addClass("deletefavour").text("Xóa khỏi phim yêu thích");
                                    HDV.V2.PlayerMedium.isFavorited = true;
                                } else {
                                    if (!HDV.V2.PlayerMedium.isFlashPrevent)
                                        HDV.V2.Core.ShowNotice({
                                            title: 'Thông báo',
                                            content: rs.r,
                                            timeAutoHide: 3000
                                        });
                                }
                                HDV.V2.PlayerMedium.isFlashPrevent = false;
                                if (typeof (HDV.V2.PlayerMedium.callbackFavorite) == "function") {
                                    HDV.V2.PlayerMedium.callbackFavorite();
                                }
                                HDV.V2.PlayerMedium.callbackFavorite = null;
                            });
                } else {
                    $.post(BASE_URL + "/xoa-phim-yeu-thich.html", {MovieID: detailConfig.mid}, function() {
                    })
                            .success(function(rs) {
                                rs = JSON.parse(rs, true);
                                if (rs.e == "0") {
                                    if (!HDV.V2.PlayerMedium.isFlashPrevent) {
                                        HDV.V2.Core.ShowNotice({
                                            title: 'Thông báo',
                                            content: rs.r,
                                            timeAutoHide: 3000
                                        });
                                    }
                                    $(_this).addClass("addfavour").removeClass("deletefavour").text("Thêm vào phim yêu thích");
                                    HDV.V2.PlayerMedium.isFavorited = false;
                                } else {
                                    if (!HDV.V2.PlayerMedium.isFlashPrevent)
                                        HDV.V2.Core.ShowNotice({
                                            title: 'Thông báo',
                                            content: rs.r,
                                            timeAutoHide: 3000
                                        });
                                }
                                HDV.V2.PlayerMedium.isFlashPrevent = false;
                                if (typeof (HDV.V2.PlayerMedium.callbackFavorite) == "function") {
                                    HDV.V2.PlayerMedium.callbackFavorite();
                                }
                                HDV.V2.PlayerMedium.callbackFavorite = null;
                            });
                }
            });
        },
        LoadingEpisode: {
            Config: {
                itemPerPage: 0,
                episode: detailConfig.Episode,
                data: [],
                totalPage: 0,
                currentPage: 1,
                mid: 0,
                defaultMid: detailConfig.mid,
                currentEpisode: detailConfig.CurrentEpisode
            },
            Databypage: function() {
                if (this.Config.episode > 0) {
                    var _from = (this.Config.currentPage - 1) * this.Config.itemPerPage + 1;
                    var _to = (_from + this.Config.itemPerPage) > this.Config.episode ? this.Config.episode : (_from + this.Config.itemPerPage - 1);
                    var _html = "";
                    for (var i = _from; i <= _to; i++) {
                        _html += "<li><a href='" + (this.Config.data[i] == undefined ? 'javascript:;' : this.Config.data[i]) + "' class='" + ((this.Config.data[i] == 'javascript:;' || this.Config.data[i] == undefined) ? ' disable ' : '') + (this.Config.currentEpisode == i ? ' active ' : '') + "'>" + i + "</a></li>";
                    }
                    $(".chap-paging .chappaging").html(_html);
                    $(".chap-paging").show();
                }
            },
            DataPaging: function() {
                var _this = this;
                var _html = "";
                if (this.Config.totalPage > 1) {
                    _html += "<li><a href='javascript:;' data-page='1' " + (1 == this.Config.currentPage ? 'class="active"' : '') + ">1</a></li>";
                    var _from = (this.Config.currentPage - 2) < 2 ? 2 : (this.Config.currentPage - 2);
                    var _to = (this.Config.currentPage + 2) > (this.Config.totalPage - 1) ? (this.Config.totalPage - 1) : (this.Config.currentPage + 2);
                    if (_from > 2) {
                        _html += "<li><a href='javascript:;' data-page='" + (_from - 1) + "'>...</a></li>";
                    }
                    for (var i = _from; i <= _to; i++) {
                        _html += "<li><a href='javascript:;' data-page='" + i + "' " + (i == this.Config.currentPage ? 'class="active"' : '') + ">" + i + "</a></li>";
                    }
                    if (_to < (this.Config.totalPage - 1)) {
                        _html += "<li><a href='javascript:;' data-page='" + (_to + 1) + "'>...</a></li>";
                    }

                    _html += "<li><a href='javascript:;' data-page='" + this.Config.totalPage + "' " + (this.Config.totalPage == this.Config.currentPage ? 'class="active"' : '') + ">" + this.Config.totalPage + "</a></li>";
                }
                $(".chap-paging .paginglist").html(_html);
                $(".chap-paging .paginglist li a").click(function() {
                    if ($(this).hasClass("active"))
                        return;
                    _this.Config.currentPage = parseInt($(this).attr("data-page"));
                    _this.Databypage();
                    _this.DataPaging();
                });
            },
            Init: function(focusItemPaging) {
                var _this = this;
                $.get(BASE_URL + "/lay-danh-sach-tap-phim.html", {id: this.Config.mid}, function() {
                })
                        .success(function(data) {
                            try {
                                data = JSON.parse(data);
                                _this.Config.episode = parseInt(data.Episode);
                                _this.Config.data = data.LinkEpisodes;
                                _this.Config.currentPage = 1;
                            } catch (e) {
                            }

                            if (_this.Config.mid == _this.Config.defaultMid)
                                _this.Config.currentEpisode = detailConfig.CurrentEpisode;
                            else
                                _this.Config.currentEpisode = 0;
                            _this.Config.totalPage = _this.Config.episode % _this.Config.itemPerPage == 0 ? (_this.Config.episode / _this.Config.itemPerPage) : parseInt(_this.Config.episode / _this.Config.itemPerPage) + 1;
                            var _currentPage = (detailConfig.CurrentEpisode > 0) ? (detailConfig.CurrentEpisode % _this.Config.itemPerPage == 0 ? detailConfig.CurrentEpisode / _this.Config.itemPerPage : (parseInt(detailConfig.CurrentEpisode / _this.Config.itemPerPage) + 1)) : 1;
                            if (typeof (focusItemPaging) == "undefined")
                                _this.Config.currentPage = _currentPage;
                            _this.Databypage();
                            _this.DataPaging();
									 
					HDV.V2.PlayerMedium.Show()
                        });
            }
        },
        SeasonPaging: {
            Config: {
                itemPerPage: 6,
                totalPage: 0,
                totalItem: 0,
                currentPage: 1,
                focusIndex: 0
            },
            Databypage: function() {
                if (this.Config.totalItem > 0) {
                    var _from = (this.Config.currentPage - 1) * this.Config.itemPerPage;
                    var _to = _from + this.Config.itemPerPage > this.Config.totalItem ? this.Config.totalItem : _from + this.Config.itemPerPage;
                    $(".seasonpaging li").hide();
                    $(".seasonpaging li").slice(_from, _to).show();
                }
            },
            DataPaging: function() {
                var _this = this;
                var _html = "";
                if (this.Config.totalPage > 1) {
                    _html += "<li><a href='javascript:;' data-page='1' " + (1 == this.Config.currentPage ? 'class="active"' : '') + ">1</a></li>";
                    var _from = (this.Config.currentPage - 2) < 2 ? 2 : (this.Config.currentPage - 2);
                    var _to = (this.Config.currentPage + 2) > (this.Config.totalPage - 1) ? (this.Config.totalPage - 1) : (this.Config.currentPage + 2);
                    if (_from > 2) {
                        _html += "<li><a href='javascript:;' data-page='" + (_from - 1) + "'>...</a></li>";
                    }
                    for (var i = _from; i <= _to; i++) {
                        _html += "<li><a href='javascript:;' data-page='" + i + "' " + (i == this.Config.currentPage ? 'class="active"' : '') + ">" + i + "</a></li>";
                    }
                    if (_to < (this.Config.totalPage - 1)) {
                        _html += "<li><a href='javascript:;' data-page='" + (_to + 1) + "'>...</a></li>";
                    }

                    _html += "<li><a href='javascript:;' data-page='" + this.Config.totalPage + "' " + (this.Config.totalPage == this.Config.currentPage ? 'class="active"' : '') + ">" + this.Config.totalPage + "</a></li>";
                }
                $(".theseasonpaging .paginglist").html(_html);
                $(".theseasonpaging .paginglist li a").click(function() {
                    if ($(this).hasClass("active"))
                        return;
                    _this.Config.currentPage = parseInt($(this).attr("data-page"));
                    _this.Databypage();
                    _this.DataPaging();
                });
            },
            Init: function() {
                var _this = this;
                this.Config.totalItem = $(".seasonpaging li").length;
                this.Config.totalPage = this.Config.totalItem % _this.Config.itemPerPage == 0 ? (this.Config.totalItem / _this.Config.itemPerPage) : parseInt(this.Config.totalItem / _this.Config.itemPerPage) + 1;
                HDV.V2.Info.LoadingEpisode.Config.itemPerPage = (this.Config.totalItem > 0) ? 18 : 26;
                if (this.Config.totalPage > 0) {
                    var _focusIndex = $(".seasonpaging li[season-index='" + detailConfig.seasonIndex + "']").index(".seasonpaging li") + 1;
                    var _currentPage = (_focusIndex > 0) ? (_focusIndex % _this.Config.itemPerPage == 0 ? _focusIndex / _this.Config.itemPerPage : parseInt(_focusIndex / _this.Config.itemPerPage) + 1) : 1;
                    this.Config.currentPage = _currentPage;
                    this.Databypage();
                    this.DataPaging();
                }
                $(".seasonpaging li a").click(function() {
                    var _mid = $(this).attr("data-season");
                    $(".seasonpaging li a").removeClass("active");
                    $(this).addClass("active");
                    HDV.V2.Info.LoadingEpisode.Config.mid = _mid;
                    HDV.V2.Info.LoadingEpisode.Init(false);
                });
            }
        },
        ToggleAds: function() {
            $(".btnoffadv").click(function() {
                if (!isLogined) {
                    $("#login_link").trigger("click");
                    return;
                }
                if (!isHDVip) {
                    window.location.href = BASE_URL + '/dang-ky-hdvip.html';
                    return;
                }
                $.post(BASE_URL + "/tat-mo-quang-cao.html", function() {
                })
                        .success(function(data) {
                            try {
                                data = JSON.parse(data);
                            } catch (e) {
                            }
                            if (data.e == "0")
                                window.location.reload();
                        });
                return false;
            });
        },
        ErrorBox: function() {
            var _this = this;
            $(".btnerror").fancybox({
                helpers: {
                    title: null
                },
                beforeClose: function() {
                },
                afterShow: function() {
                    $("#error_film .error").text("");
                    _this.LoadCaptchaError();
                    $(".refeshCaptcha_report").click(function() {
                        _this.LoadCaptchaError();
                    });
                    $(".select-type-error").change(function() {
                        if ($(this).val() == "99") {
                            $(".row_content").show();
                        } else {
                            $(".row_content").hide();
                        }
                    }).trigger("change");
                    $("#click_send_error").click(function() {
                        if (!_this.isNumber($("#textMinute").val())) {
                            $("#error_film .error").text("Phút phải là số.");
                            return;
                        }
                        if ($(".select-type-error").val() == "99") {
                            if ($(".row_content textarea").val().length < 5) {
                                $("#error_film .error").text("Nội dung báo lỗi quá ngắn.");
                                return;
                            }
                        }
                        if ($("#textCaptcha_report").val() == "") {
                            $("#error_film .error").text("Chưa nhập mã bảo vệ.");
                            return;
                        }
                        $.post(BASE_URL + "/thong-bao-loi.html", {errortype: $(".select-type-error").val(), errormsg: $(".row_content textarea").val(), minute: $("#textMinute").val(), captcha: $("#textCaptcha_report").val(), movieid: detailConfig.mid}, function() {
                        })
                                .success(function(data) {
                                    try {
                                        data = JSON.parse(data);
                                    } catch (e) {
                                    }
                                    if (data.e == '0') {
                                        HDV.V2.Core.ShowNotice({
                                            title: 'Thông báo',
                                            content: data.r,
                                            timeAutoHide: 3000
                                        });
                                    } else {
                                        $("#error_film .error").text(data.r);
                                    }
                                });
                    });

                }
            });
        },
        isNumber: function(n) {
            return Object.prototype.toString.call(n) !== '[object Array]' && !isNaN(parseFloat(n)) && isFinite(n);
        },
        LoadCaptchaError: function() {
            $.post(BASE_URL + "/captcha/get-link.html?field=error", function() {
            })
                    .success(function(rs) {
                        $("#errorCaptcha_report").attr({"src": rs});
                    });
        },
        MoviePlay: function() {
            HDV.V2.Info.InitSizePlayer();
            $(".boxplay").click(function() {
                HDV.V2.Info.CheckTrailerAndPlay();
                return false;
            });
            if (window.location.hash == "#pl") {
                HDV.V2.Info.CheckTrailerAndPlay();
            }
            return false;
        },
        CheckFlashInstalled: function() {
            try {
                var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if (fo) {
                    return true;
                }
            } catch (e) {
                if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] != undefined && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
                    return true;
                }
            }
            return false;
        },
        CheckTrailerAndPlay: function() {
            if (HDV.V2.Info.CheckFlashInstalled() == false) {
                HDV.V2.Core.ShowNotice({
                    'title': 'Thông báo',
                    'content': '<div>Bạn vui lòng cài Flash Player để xem phim trên HDViet.</div>'
                });
            } else if (detailConfig.isTrailer) {
                HDV.V2.Core.ShowNotice({
                    'title': 'Thông báo',
                    'content': '<div>Bộ phim hiện chưa được trình chiếu.</div><br/><div align="center"><input type="submit"  class="mybutton click-to-view-trailer" value="XEM TRAILER"></div>',
                    'afterShow': function() {
                        $(".click-to-view-trailer").click(function() {
                            $.fancybox.close();
                            $("#bt-view-trailer").trigger("click");
                        });
                    }
                });
            } else {
                $(".boxplayer-popup").css({'visibility': 'visible'});
                jwplayer(HDV.V2.PlayerMedium.name).play();
            }
        },
        Init: function() { /* module init */
            this.SetStylePage();
            this.ShowTrailer();
            this.Rating();
            this.ClickPlay();
            this.CheckFavoriteList();
            this.AutoPlay();
            this.SeasonPaging.Init();
            this.LoadingEpisode.Config.mid = detailConfig.mid;
            this.LoadingEpisode.Init();
            this.ToggleAds();
            this.ErrorBox();
            this.MoviePlay();
        }
    };
});
$(document).ready(function() {
    NProgress.done();
    HDV.V2.Info.Init();
});
InventoryTag = function() {
    (function() {
        var cb = new Date().getTime();
        var asiPqTag = false;
        var e = document.createElement("script");
        var src = "http://pq-direct.revsci.net/pql?placementIdList=aBSH0D&cb=" + cb;
        var s = document.getElementsByTagName("script")[0];
        e.async = true;
        e.onload = function() {
            if (typeof (asiPlacements) != "undefined") {
                if (typeof (asiPlacements['aBSH0D']) != "undefined" && typeof (asiPlacements['aBSH0D']["default"]) != "undefined") {
                    gwdTagDataAdGroup = asiPlacements['aBSH0D']["default"].key;
                    gwdTagDataBlob = asiPlacements['aBSH0D'].blob;
                    gwdTagDataAdserver = asiAdserver;
                }
                for (var p in asiPlacements) {
                    window["ASPQ_" + p] = "";
                    for (var key in asiPlacements[p].data) {
                        window["ASPQ_" + p] += "PQ_" + p + "_" + key;
                    }
                }
            }
        }
        e.src = src;
        s.parentNode.insertBefore(e, s);
    })();
}