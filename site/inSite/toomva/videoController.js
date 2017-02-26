var videoConfigs = {
    cachedScrollSub: '',
    cachedScrollUserSub: '',
    playerKey: 'player',
    subLines: "#lst-bestsub li",
    curSubIndex: 0,
    subLength: 0,
    curSubPosition: 0,
    jumpOnPlayer: false,
    showChar: 100,
    ellipsestext: "...",
    moretext: "xem thêm",
    lesstext: "thu gọn",
    EngSub: 'Click để thêm sub tiếng Anh',
    VietSub: 'Click để thêm sub tiếng Việt',
    editSubLoaded: false
};
var video = {
    init: function () {
        $('.tipso-element').hmpTooltip();
        video.getBestSub(function () {
            videoConfigs.subLength = $(videoConfigs.subLines).length;
            video.checkEvalVideo();
            setTimeout(function () {
                video.registerControl();
                video.initControls.subs.allSubEvents();
            }, 80);
            $('#slLevel').val($('#hidLevel').val());
            $('#slSort').val($('#hidSort').val());
            $('#slSub').val($('#hidBest').val());
            setTimeout(function () {
                CKEDITOR.replace('txtGrammarEditor', {
                    customConfig: '/assets/client/js/plugins/ckeditor/article.js',
                });
            }, 5000);
            video.getListEpisode();

            //player init
            var path = video.DecryptData($('#hidPath').val());
            var altPath = video.DecryptData($('#hidAltPath').val());
            var thumbail = $('#hidThumbail').val();
            var enSubFile = video.DecryptData($('#hidEnSubFile').val());
            var vnSubFile = video.DecryptData($('#hidVnSubFile').val());
            var allowHtml5 = $('#hidAllowHtml5').val();

            var enUserSubFile = video.DecryptData($('#hidEnUserSubFile').val());
            var vnUserSubFile = video.DecryptData($('#hidVnUserSubFile').val());
            var totalSubFile = video.DecryptData($('#hidTotalSub').val());
            var totalUserSubFile = video.DecryptData($('#hidTotalUserSubFile').val());
            var freeTime = $('#hidKatana').val();
            var vip = parseInt($('#hidKotonado').val());
            var tracks = [];
            var isVip = "1";

            var isMobile = {
                Android: function () {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function () {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function () {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function () {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function () {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function () {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };


            if (totalSubFile != '') {
                if (allowHtml5 == '1' && isMobile.any()) {
                    if (isVip == '1' || freeTime == null || freeTime == '') {
                        tracks.push({
                            file: totalSubFile,
                            label: 'Sub EN-VI',
                            kind: 'captions',
                            'default': true
                        });
                    } else {

                        tracks.push({
                            file: '/Data/files/vip_required_envi.vtt',
                            label: 'Sub EN-VI',
                            kind: 'captions',
                            'default': true
                        });
                    }
                } else {
                    tracks.push({
                        file: totalSubFile,
                        label: 'Sub EN-VI',
                        kind: 'captions',
                        'default': true
                    });
                }
            }
            if (totalUserSubFile != '') {
                if (allowHtml5 == '1' && isMobile.any()) {
                    if (isVip == '1' || freeTime == null || freeTime == '') {
                        tracks.push({
                            file: totalUserSubFile,
                            label: 'Sub EN-VI của tôi',
                            kind: 'captions',
                            'default': true
                        });
                    } else {

                        tracks.push({
                            file: '/Data/files/vip_required_envi.vtt',
                            label: 'Sub EN-VI của tôi',
                            kind: 'captions',
                            'default': true
                        });
                    }
                } else {
                    tracks.push({
                        file: totalUserSubFile,
                        label: 'Sub EN-VI của tôi',
                        kind: 'captions',
                        'default': true
                    });
                }
            }
            if (enSubFile != '')
                if (navigator.userAgent.match(/iPhone|iPad|iPod/i) != null
                    && (freeTime != null || freeTime != '')
                    && isVip == '0' && allowHtml5 == '1') {
                    tracks.push({
                        file: '/Data/files/vip_required_en.vtt',
                        label: 'Sub Anh',
                        kind: 'captions',
                        'default': true
                    });
                }
                else {
                    tracks.push({
                        file: enSubFile,
                        label: 'Sub Anh',
                        kind: 'captions',
                        'default': false
                    });
                }

            if (vnSubFile != '') {

                if (navigator.userAgent.match(/iPhone|iPad|iPod/i) != null
                    && isVip == '0' && (freeTime != null || freeTime != '') && allowHtml5 == '1') {
                    tracks.push({
                        file: '/Data/files/vip_required_vi.vtt',
                        label: 'Sub Việt',
                        kind: 'captions',
                        'default': true
                    });
                }
                else {

                    tracks.push({
                        file: vnSubFile,
                        label: 'Sub Việt',
                        kind: 'captions'
                    });
                }

            }
            if (enUserSubFile != '') {
                tracks.push({
                    file: enUserSubFile,
                    label: 'EN của tôi',
                    kind: 'captions'
                });
            }
            if (vnUserSubFile != '') {
                tracks.push({
                    file: vnUserSubFile,
                    label: 'VN của tôi',
                    kind: 'captions'
                });
            }
            if (path != '' && altPath != '')
                path = altPath;
            else if (path == '' && altPath != '')
                path = altPath;
            video.initPlayer(path, altPath, thumbail, tracks);
            video.scrollSubToView();
            //prevent out of freetime
        });
        //video.loadPlayerMode();
    },
    registerControl: function () {
        video.checkFavorite();
        video.checkFollowUser();
        $('#btnRemember').off('click').on('click', function () {
            video.rememberVideo();
        });
        $('#btnFollow').off('click').on('click', function () {
            var isLogin = $('#hidIsLogin').val();
            if (isLogin == '1') {
                video.followUser($(this).data('id'));
            } else {
                common.msgWarning({
                    text: 'Bạn cần đăng nhập để sử dụng chức năng này.',
                    modal: false
                });
            }

        });
        $('#btnLikeSub').off('click').on('click', function (e) {
            var isLogin = $('#hidIsLogin').val();
            if (isLogin == '1') {
                video.evalSub(true, function () {
                    //$(this).prop('disabled', true);
                    $(this).addClass('voted');
                    video.checkEvalVideo();
                });
            } else {
                common.msgWarning({
                    text: 'Bạn cần đăng nhập để sử dụng chức năng này.',
                    modal: false
                });
            }
            e.preventDefault();
        });

        video.bindHover();
        $('#btnDisLikeSub').off('click').on('click', function (e) {
            var isLogin = $('#hidIsLogin').val();
            if (isLogin == '1') {
                video.evalSub(false, function () {
                    $(this).prop('disabled', true);
                    video.checkEvalVideo();
                });
            } else {
                common.msgWarning({
                    text: 'Bạn cần đăng nhập để sử dụng chức năng này.',
                    modal: false
                });
            }
            e.preventDefault();
        });
        $('#btnCancelEditSub').off('click').on('click', function () {
            $('#panel_editSub').addClass('edit-sub-hide');
            $('#btnSaveEditSub').hide();
            $('#btnCancelEditSub').hide();
            $('#btnPublicSub').show();
            $('#btnEditSub').show();
        });
        $('#btnSaveEditSub').off('click').on('click', function (e) {
            video.saveEditSub();
            e.preventDefault();
            e.stopPropagation();
        });
        $('#btnEditSub').off('click').on('click', function () {
            var isLogin = $('#hidIsLogin').val();
            if (isLogin == '1') {
                if (videoConfigs.editSubLoaded === false) {
                    return false;
                }
                $('#panel_editSub').removeClass('edit-sub-hide');
                $(this).hide();
                $('#btnSaveEditSub').show();
                $('#btnPublicSub').hide();
                $('#btnCancelEditSub').show();
            } else {
                common.msgWarning({
                    text: 'Bạn cần đăng nhập để sử dụng chức năng này.',
                    modal: false
                });
            }
        });

        $('.btn-cancel-edit-sub').off('click').on('click', function () {
            var index = $(this).data('id');
            $('#panelEditSubDisp_' + index).show();
            $('#panelEditSubEditor_' + index).hide();

        });

        $('.btn-save-edit-sub').off('click').on('click', function () {
            var index = $(this).data('id');
            var newSub = $('#txtEditSub_' + index).val();
            $('#lblEditSub_' + index).text(newSub);
            $('#panelEditSubDisp_' + index).show();
            $('#panelEditSubEditor_' + index).hide();
        });
        $('.tabs .tab-links a').off('click').on('click', function (e) {
            var currentAttrValue = $(this).attr('href');

            // Show/Hide Tabs
            $('.tabs ' + currentAttrValue).show().siblings().hide();

            // Change/remove current tab to active
            $(this).parent('li').removeClass('in-active').siblings().addClass('in-active');

            e.preventDefault();
        });

        //up and down speed
        $('#btnBackSecond').off('click').on('click', function (e) {
            var value = $('#txtBackSecond').val();
            var elapsed = jwplayer("player").getPosition();
            var destination = (+elapsed) - (+value);
            jwplayer(videoConfigs.playerKey).seek(destination);

        });
        $('#btnForwardSecond').off('click').on('click', function (e) {
            var value = $('#txtBackSecond').val();
            var elapsed = jwplayer("player").getPosition();
            var destination = (+elapsed) + (+value);
            jwplayer(videoConfigs.playerKey).seek(destination);

        });
        //change speed
        $('#btnDownSpeed').off('click').on('click', function () {
            var lblSpeed = $('#lblSpeed');
            var value = parseFloat(lblSpeed.text());
            var newRate = (value - 0.1).toFixed(1);

            lblSpeed.text(newRate);
            jwplayer(videoConfigs.playerKey).playbackRate = newRate;
        });
        $('#btnUpSpeed').off('click').on('click', function () {
            var lblSpeed = $('#lblSpeed');
            var value = parseFloat(lblSpeed.text());
            var newRate = (value + 0.1).toFixed(1);

            lblSpeed.text(newRate);
            jwplayer(videoConfigs.playerKey).playbackRate = newRate;
        });
        //Choose Sub
        $('.choose-sub a:not(.showhide-sub-panel)').off('click').click(function (e) {
            if ($(this).attr('disabled') === 'disabled') {
                alert("Bạn vui lòng chờ sub trước tải xong. Xin cảm ơn.");
                e.preventDefault();
                return;
            }
            $(this).addClass('active').siblings().removeClass('active');
            video.fillScrollSub(videoConfigs[$(this).data('type')]);
            video.registerControl();
            e.preventDefault();
        });

        /*public sub to vote*/
        $('#btnPublicSub').off('click').on('click', function () {
            var isLogin = $('#hidIsLogin').val();
            var allowPostSub = $('#hidAllowPostSub').val();
            var userSubId = $('#hidUserSubId').val();
            var loginUserId = $('#hideLoginUserId').val();
            var videoUserId = $('#hidVideoUserId').val();
            if (isLogin == '1') {
                if ((allowPostSub == '' || allowPostSub == "0") && loginUserId != videoUserId) {
                    common.msgWarning({
                        titleHeader: "Thông báo",
                        text: 'Chủ video này không cho người khác đăng sub, bạn vui lòng tìm video khác.',
                        modal: false
                    });
                }
                else if (userSubId == '' || userSubId == '0') {
                    common.msgWarning({
                        titleHeader: "Thông báo",
                        text: 'Bạn chưa có sub nào để đăng. Vui lòng click "Sửa sub" để tạo sub.',
                        modal: false
                    });
                }
                else {
                    $('#modalChooseVote').modal('show');
                    $('#btnSubmitPublishSub').off('click').on('click', function () {
                        var strUrl = "/Subtitle/PublishSub";
                        var videoId = $('#hidVideoId').val();
                        var subId = $('#hidUserSubId').val();
                        var allowVote = $("input[type='radio'][name='allowVote']:checked").val() == '1';
                        $.ajax({
                            type: "POST",
                            url: strUrl,
                            data: { subId: subId, videoId: videoId, allowVote: allowVote },
                            dataType: "json",
                            success: function (response) {
                                $('#modalChooseVote').modal('hide');
                                if (response.status == true) {
                                    common.msgShowSuccess({
                                        text: response.message,
                                        modal: true
                                    });
                                } else {
                                    common.msgError({
                                        text: response.message,
                                        modal: true
                                    });
                                }

                            },
                        });
                    });
                }

            } else {
                common.msgWarning({
                    text: 'Bạn cần đăng nhập để sử dụng chức năng này.',
                    modal: false
                });
            }
        });
        //Show Hide Sub Panel
        $('.ud-extend-player-view .btn').off('click').click(function (e) {
            var that = $(this);
            if (that.hasClass('collapsed')) { //Full View to Smaller View
                that.removeClass('collapsed');
                $('.ct-small').removeClass('full-player-view');
                $('.player-wrapper').removeClass('full-player-wrapper');
                that.attr('data-original-title', 'Xem rộng hơn, ẩn sub cuộn');
                $('.sda').addClass('hide'); //hide ads
                document.cookie = "playermode=normal; expires=Thu, 18 Dec 2020 12:00:00 UTC";
            } else {
                that.addClass('collapsed');
                $('.ct-small').addClass('full-player-view');
                $('.player-wrapper').addClass('full-player-wrapper');
                that.attr('data-original-title', 'Thu nhỏ player, hiện sub cuộn');
                $('.sda').removeClass('hide'); //show ads
                document.cookie = "playermode=full; expires=Thu, 18 Dec 2020 12:00:00 UTC";
            }
            var playerDims = video.getPlayerDimemsions();
            jwplayer().resize(playerDims.width, playerDims.height);
            e.preventDefault();
        });
    },
    initControls: {
        subs: {
            engSubClick: function () {
                //edit eng sub timeline
                $('pre.sl-engsub').off('click').click(function (e) {
                    e.preventDefault();
                    if ($.trim($(this).text()).localeCompare(videoConfigs.EngSub) == 0) {
                        $(this).text('');
                    }
                    $(this).changeElementType('textarea');
                    $('textarea.sl-engsub[data-id=' + $(this).attr('data-id') + ']').putCursorAtEnd();
                    video.initControls.subs.engSubFocusOut();
                });
            },
            engSubFocusOut: function () {
                $('textarea.sl-engsub').off('focusout').focusout(function () {
                    var newSub = $.trim($(this).val());
                    $(this).changeElementType('pre', newSub == '' ? videoConfigs.EngSub : newSub);
                    video.initControls.subs.engSubClick();
                });
            },
            vietSubClick: function () {
                //edit sub timeline
                $('.btn-edit-sub').off('click').on('click', function (e) {
                    e.preventDefault();
                    var textArea = $(this).parents('.subLine').find('.txtEditSubeditor');
                    if ($.trim($(this).text()).localeCompare(videoConfigs.VietSub) == 0) {
                        textArea.val('');
                    }
                    $(this).parents('.edit-sub-content').hide();
                    textArea.parents('.edit-sub-content').show();
                    textArea.putCursorAtEnd();
                });
            },
            vietSubFocusOut: function () {
                $('.txtEditSubeditor').off('focusout').on('focusout', function () {
                    var newSub = $(this).val();
                    newSub = $.trim(newSub) == '' ? videoConfigs.VietSub : newSub;
                    $(this)
                        .parents('.edit-sub-content').hide()
                        .prev()
                        .find('.vietsub-link').text(newSub)
                        .parents('.edit-sub-content').show();

                });
            },
            addNewSubLine: function () {
                $('.btn-add-subline').off('click').click(function (e) {
                    var subLine = $(this).parents('.subLine');
                    var template = $('#tmpl-client-edit-sub').html();
                    //template = template.replace(/{/g, '{{').replace(/}/g, '}}');
                    var subLineId = common.randomText(7);
                    var render = Mustache.render(template, {
                        '0': subLineId,
                        '1': '00:00:00.000',
                        '2': null,
                        '3': videoConfigs.EngSub,
                        '4': videoConfigs.VietSub
                    });
                    $(render).insertAfter(subLine);
                    $('.subLine[data-id=' + subLineId + ']')
                        .find('.sl-start-time').putCursorAtEnd();
                    setTimeout(function () {
                        video.initControls.subs.allSubEvents();
                    }, 100);
                    e.preventDefault();
                });
            },
            removeSubLine: function () {
                $('.btn-delete-sub').off('click').click(function (e) {
                    $(this).parents('.subLine').remove();
                    if ($('.subLine').length == 0) {
                        var item = {
                            '0': 0,
                            '1': '00:00:00.000',
                            '2': '',
                            '3': videoConfigs.EngSub,
                            '4': videoConfigs.VietSub
                        };
                        video.addSubLine(item);
                    }
                    e.preventDefault();
                });
            },
            subScrollClick: function () {
                $('.btn-seek').off('click').on('click', function (e) {
                    var time = video.timeToSeconds($(this).attr('data-start'));
                    jwplayer(videoConfigs.playerKey).seek(time);
                    e.preventDefault();
                });
            },
            timingValidate: function () {
                $('.sl-start-time').off('focusout').focusout(function () {
                    if (!$(this).val().match(/^\d{2}\:{1}\d{2}\:{1}\d{2}\.{1}\d\d\d$/)) {
                        common.msgError({
                            text: "Bạn phải nhập thời gian theo định dạng: HH:MM:SS.FFF. Ví dụ: 00:05:12.500.",
                            model: true
                        });
                        $(this).addClass('error').focus();
                    } else {
                        $(this).removeClass('error');
                    }
                });
            },
            reloadOriginalSub: function () {
                $('.reload-original-sub').off('click').click(function (e) {
                    if (!$(this).hasClass('osub-loading')) {
                        video.reloadOriginalSub();
                    }
                    e.preventDefault();
                });
            },
            allSubEvents: function () {
                $.each(video.initControls.subs, function (i, func) {
                    if (i != 'allSubEvents')
                        func();
                });
            }
        },
    },
    getBestSub: function (callback, loadScrollSub) {
        var isLogin = +$('#hidIsLogin').val();
        var strUrl = "/Subtitle/GetBestSub";
        var videoId = $('#hidVideoId').val();
        var editSubTmpl = $('#tmpl-svr-edit-sub').html().replace(/\s+/g, ' ');
        var scrollSubTmpl = $('#result-data').html().replace(/\s/g, ' ');
        if (isLogin === 0) {
            editSubTmpl = null;
        }
        var data = {
            videoId: videoId,
            editSubTmpl: editSubTmpl,
            scrollSubTmpl: scrollSubTmpl
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            data: data,
            dataType: "json",
            success: function (response) {
                var subTemplate = $('#tmpl-sub-information').html();
                var subRender = '';
                if (response.status == true) {
                    if (loadScrollSub !== false) {
                        video.fillScrollSub(response.GenScrollSub);
                        videoConfigs.cachedScrollSub = response.GenScrollSub;
                    }
                    //get sub information
                    var subEntity = response.SubTitle;
                    //Logined and No User Sub
                    if (isLogin === 1 && response.SubTitle.UserSubId == 0) {
                        setTimeout(function () {
                            video.genEditSubTmpl(response.GenEditSub);
                            videoConfigs.editSubLoaded = true;
                        }, 700);
                    }
                        //Logined and Have User Sub
                    else if (isLogin === 1 && response.SubTitle.UserSubId != 0) {
                        setTimeout(function () { video.getUserSub(); }, 700);
                    }


                    subRender = Mustache.render(subTemplate, {
                        ID: subEntity.ID,
                        SubUserId: subEntity.UserId,
                        SubUserName: subEntity.UserName,
                        LikeCount: subEntity.LikeCount,
                        DislikeCount: subEntity.DisLikeCount
                    });
                    $('#pnlSubInformation').html(subRender);

                    if (subEntity.ID == 0) {
                        $('.best-sub-info').hide();
                    }
                    //display not allow vote sub
                    if (subEntity.ID != 0 && subEntity.AllowVote == false) {
                        $('#divNotAllowVote').removeClass('hide');
                        $('#divVote').hide();
                    }
                    if (subEntity.ID != 0 && subEntity.BestQuality == 1) {
                        $('#subBest').show();
                    }
                    else {

                        $('#subVoting').show();
                    }
                    /*When login user id equal sub voting userid, set hidsubuserid = id of voting sub for user override.*/
                    //var userId = $('#hideLoginUserId').val();
                    //if (subEntity.ID != 0 && subEntity.UserId == userId) {
                    //    $('#hidUserSubId').val(subEntity.ID);
                    //}

                } else {
                    video.fillScrollSub('');
                    subRender = Mustache.render(subTemplate, {});
                    $('#pnlSubInformation').html(subRender);
                    $('#pnlSubInformation').find('.col-sm-2, .col-sm-7').html('');
                }
                if (callback != undefined) {
                    callback();
                }
                video.showHideSubPanel();

                //video.getUserSub();
            },
            error: function (er) {
                console.log(er);
            }
        });
    },
    getUserSub: function (callback) {
        var strUrl = "/Subtitle/GetUserSub";
        var videoId = $('#hidVideoId').val();
        var editSubTmpl = $('#tmpl-svr-edit-sub').html().replace(/\s+/g, ' ');
        var scrollSubTmpl = $('#result-data').html().replace(/\s/g, ' ');
        var data = {
            videoId: videoId,
            editSubTmpl: editSubTmpl,
            scrollSubTmpl: scrollSubTmpl
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status == true) {
                    $('#hidUserSubId').val(response.ID);
                    if (callback != undefined) {
                        callback();
                    }
                    video.genEditSubTmpl(response.GenEditSub);
                    videoConfigs.cachedScrollUserSub = response.GenScrollSub;

                }
            },
            error: function (er) {
                console.log(er);
            }
        }).always(function () {
            videoConfigs.editSubLoaded = true;
        });
    },
    //load new sub for create user sub
    loadSubForEdit: function (data) {
        var templateHeader = $('#tmpl-edit-sub-header').html();
        var template = $('#tmpl-svr-edit-sub').html().replace(/\s+/g, ' ');
        $.ajax({
            type: "POST",
            url: "/Video/GenEditSub",
            data: JSON.stringify({ template: template, listSub: data }),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (res) {
                $('#lst-data-sub-edit').html(templateHeader);
                $('#lst-data-sub-edit').append(res.data);
                setTimeout(function () {
                    video.initControls.subs.allSubEvents();
                    video.registerControl();
                }, 100);
            },
            error: function (er) {
                console.log(er);
            }
        }).always(function () {

        });
    },
    addSubLine: function (item) {
        var template = $('#tmpl-client-edit-sub').html();
        //var item = data[i];
        var render = Mustache.render(template, item);
        setTimeout(function () {
            $('#lst-data-sub-edit').append(render);
            video.initControls.subs.allSubEvents();
        }, 10);
    },
    //save sub from user
    saveEditSub: function () {
        var strUrl = "/Subtitle/SaveSub";
        var subId = $('#hidUserSubId').val();
        var videoId = $('#hidVideoId').val();
        var contentObj = [];
        var totalLine = $('.subLine').length;
        $.each($('.subLine'), function (i, item) {
            var endTime;
            if (i < totalLine - 1) {
                endTime = $('.subLine').eq(i + 1).find('.sl-start-time').val();
            } else {
                endTime = '03:00:00,000';
            }
            contentObj.push({
                Index: (i + 1) + '',
                StartTime: $(item).find('.sl-start-time').val(),
                EndTime: endTime,
                Content: $(item).find('.sl-engsub').text(),
                ContentVn: $(item).find('.vietsub-link').text()
            });
        });

        var data = {
            subId: subId,
            videoId: videoId,
            content: JSON.stringify(contentObj)
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.Message == 'IS') {
                    $('#hidUserSubId').val(response.ID);
                    $('#panel_editSub').addClass('edit-sub-hide');
                    $('#btnSaveEditSub').hide();
                    $('#btnCancelEditSub').hide();
                    $('#btnPublicSub').show();
                    $('#btnEditSub').show();
                    common.msgShowSuccess({
                        text: "Bạn vừa đăng sub thành công",
                        modal: true
                    });
                } else if (response.Message == 'IF') {
                    common.msgError({
                        text: "Đăng sub không thành công.",
                        modal: true
                    });
                } else if (response.Message == 'US') {
                    $('#hidUserSubId').val(response.ID);
                    $('#panel_editSub').addClass('edit-sub-hide');
                    $('#btnSaveEditSub').hide();
                    $('#btnCancelEditSub').hide();
                    $('#btnPublicSub').show();
                    $('#btnEditSub').show();
                    common.msgShowSuccess({
                        text: "Bạn vừa cập nhật sub thành công",
                        modal: true
                    });
                } else if (response.Message == 'UF') {
                    common.msgError({
                        text: "Cập nhật sub không thành công.",
                        modal: true
                    });
                } else {
                    common.msgError({
                        text: response.Message,
                        modal: true
                    });
                }
            }
        }).fail(function (er) {
            console.log(er);
        });
    },
    //click button remember to favorite
    rememberVideo: function () {
        var strUrl = "/Video/RememberVideo";
        var videoId = $('#hidVideoId').val();
        $.ajax({
            type: "POST",
            url: strUrl,
            data: { videoId: videoId },
            dataType: "json",
            success: function (response) {
                if (response.status == true) {
                    video.checkFavorite();
                }
            },
        });
    },
    //check that video is remember before
    checkFavorite: function () {
        var strUrl = "/Video/CheckFavorite";
        var videoId = $('#hidVideoId').val();
        $.ajax({
            type: "POST",
            url: strUrl,
            data: { videoId: videoId },
            dataType: "json",
            success: function (response) {
                if (response.status == true) {
                    $('#btnRemember').html("<i class=\"fa fa-thumbs-o-down\"></i> Bỏ thích (" + response.totalLike + ")");
                } else {
                    $('#btnRemember').html("<i class=\"fa fa-thumbs-o-up\" title=\"Thích\"></i> Yêu thích (" + response.totalLike + ")");
                }
            },
        });
    },
    //rate sub
    evalSub: function (like, callback) {
        var strUrl = "/Subtitle/EvalSub";
        var subId = $('#hidSubId').val();
        var videoId = $('#hidVideoId').val();
        $.ajax({
            type: "POST",
            url: strUrl,
            data: { subId: subId, videoId: videoId, like: like },
            dataType: "json",
            success: function (response) {
                if (response.status == true) {
                    if (like == true)
                        $('#spanLikeCount').text("(" + response.likeCount + ")");
                    else {
                        $('#spanDisLikeCount').text("(" + response.likeCount + ")");
                    }
                    if (callback != undefined) {
                        callback();
                    }
                }
            },
        });
    },
    checkEvalVideo: function () {
        var strUrl = "/Subtitle/CheckSub";
        var subId = $('#hidSubId').val();
        $.ajax({
            type: "POST",
            url: strUrl,
            data: { subId: subId },
            dataType: "json",
            success: function (response) {
                if (response.status == true) {

                    //$('#btnLikeSub').prop('disabled', true);
                    $('#btnLikeSub,#btnDisLikeSub').addClass('voted');
                    //$('#btnDisLikeSub').prop('disabled', true);

                } else {
                    //$('#btnLikeSub').prop('disabled', false);
                    $('#btnLikeSub,#btnDisLikeSub').removeClass('voted');
                    // $('#btnDisLikeSub').prop('disabled', false);

                }
                //video.registerControl();
            },
        });
    },
    getListEpisode: function () {
        var strUrl = "/Video/GetListEpisode";
        var videoId = $('#hidVideoId').val();
        $.ajax({
            type: "GET",
            url: strUrl,
            data: { videoId: videoId },
            dataType: "json",
            success: function (response) {
                if (response.status == true && response.Data.length > 0) {
                    var render = '<p><b>Tập</b></p>';
                    var template = $('#tmpl-episode-list').html();
                    $.each(response.Data, function (i, item) {
                        render += Mustache.render(template, {
                            ID: item.ID,
                            Alias: item.Alias,
                            Class: item.Episode == $('#hidCurrentEpisode').val() ? "active" : "",
                            Episode: item.Episode
                        });
                    });

                    $('#pnlEpisodeList').html(render);
                    $('.episode').show();
                } else {
                    $('.episode').hide();
                }
            },
        }).fail(function () {
            $('.episode').hide();
        });
    },
    fillScrollSub: function (subText) {
        var scrollSubTmpl = $('#result-data').html();
        scrollSubTmpl = scrollSubTmpl.replace(/{/g, '{{').replace(/}/g, '}}');
        if (subText === null || subText === undefined || $.trim(subText) === '') {
            subText = Mustache.render(scrollSubTmpl, {
                '0': 0,
                '1': '00:00:00.000',
                '2': '00:00:00.000',
                '3': 'Chưa có sub',
                '4': ''
            });
        }
        $('#lst-bestsub').html(subText);
        setTimeout(function () {
            video.initControls.subs.subScrollClick();
        }, 80);
    },
    followUser: function (userId) {
        $.ajax({
            type: "POST",
            url: '/User/Follow',
            data: { userId: userId },
            dataType: "json",
            success: function (response) {
                if (response.status == true) {
                    $('#lblFollowCount').text(response.data);
                    video.checkFollowUser();
                }
            }
        });
    },
    checkFollowUser: function () {
        var id = $('#btnFollow').data('id');
        $.ajax({
            type: "POST",
            url: '/User/CheckFollow',
            data: { userId: id },
            dataType: "json",
            success: function (response) {
                if (response.status == true) {
                    $('#btnFollow').html('<i class="fa fa-check"></i>Đã đăng ký');
                    $('#btnFollow').addClass("grey");

                }
                else {
                    $('#btnFollow').html('<i class="fa fa-youtube-play"></i>Đăng ký');
                    $('#btnFollow').removeClass("grey");
                }
            }
        });
    },
    updateQuery: function (key, value, uri) {

        var ret = true;

        if (typeof uri == 'undefined') {
            uri = window.location.href;
            ret = false;
        }

        var params = $.deparam(jQuery.param.querystring(uri));
        if (!value) {
            delete params[key];
        } else {
            params[key] = value;
        }
        delete params['page'];

        if (ret) {
            return $.param.querystring(uri, params, 2);
        }

        window.location.href = jQuery.param.querystring(uri, params, 2);
        return false;
    },
    initPlayer: function (path, altPath, thumbail, tracks) {
        var mode = "html5";
        var playerDims = video.getPlayerDimemsions();
        var isVip = "1";
        var bannerAds = "";
        if ($('#hidAllowHtml5').val() == '1') {
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i) != null) {
                var html = "<video width='100%' poster='" + thumbail + "'";
                html += "crossorigin='anonymous' controls=''><source src='" + altPath + "'";
                html += " type='video/mp4'>";

                $.each(tracks, function (i, item) {
                    html += "<track src='" + item.file + "' kind='" + item.kind + "' label='" + item.label + "'>";
                });
                html += "</video>";

                $('#' + videoConfigs.playerKey).html(html);

            } else {

                if (isVip == '0') {
                    jwplayer(videoConfigs.playerKey).setup({
                        sources: [
                             {
                                 file: path
                             }, {
                                 file: altPath
                             }
                        ],
                        image: thumbail,
                        width: playerDims.width,
                        height: playerDims.height,
                        //width: "100%",
                        //aspectratio: "16:9",
                        tracks: tracks,
                        captions: {
                            back: false,
                            color: '#FFFFFF',
                            fontSize: 15,
                            fontFamily: 'Arial,sans-serif',
                        },
                        autostart: "true",
                        //repeat: "true",
                        primary: mode,
                        //primary: 'html5',
                        skin: "/assets/client/js/plugins/jwplayer/stormtrooper.xml",

                    });
                } else {
                    jwplayer(videoConfigs.playerKey).setup({
                        sources: [
                             {
                                 file: path
                             }, {
                                 file: altPath
                             }
                        ],
                        image: thumbail,
                        width: playerDims.width,
                        height: playerDims.height,
                        //width: "100%",
                        //aspectratio: "16:9",
                        tracks: tracks,
                        captions: {
                            back: false,
                            color: '#FFFFFF',
                            fontSize: 15,
                            fontFamily: 'Arial,sans-serif',
                        },
                        autostart: "true",
                        //repeat: "true",
                        primary: mode,
                        //primary: 'html5',
                        skin: "/assets/client/js/plugins/jwplayer/stormtrooper.xml",

                    });
                }
            }
        } else {
            if (isVip == '0') {
                jwplayer(videoConfigs.playerKey).setup({
                    sources: [
                         {
                             file: path
                         }, {
                             file: altPath
                         }
                    ],
                    image: thumbail,
                    width: playerDims.width,
                    height: playerDims.height,
                    //width: "100%",
                    //aspectratio: "16:9",
                    tracks: tracks,
                    captions: {
                        back: false,
                        color: '#FFFFFF',
                        fontSize: 15,
                        fontFamily: 'Arial,sans-serif',
                    },
                    autostart: "true",
                    //repeat: "true",
                    primary: mode,
                    //primary: 'html5',
                    skin: "/assets/client/js/plugins/jwplayer/stormtrooper.xml"

                });
            } else {
                jwplayer(videoConfigs.playerKey).setup({
                    sources: [
                        {
                            file: path
                        }, {
                            file: altPath
                        }
                    ],
                    image: thumbail,
                    width: playerDims.width,
                    height: playerDims.height,
                    //width: "100%",
                    //aspectratio: "16:9",
                    tracks: tracks,
                    captions: {
                        back: false,
                        color: '#FFFFFF',
                        fontSize: 15,
                        fontFamily: 'Arial,sans-serif',
                    },
                    autostart: "true",
                    //repeat: "true",
                    primary: mode,
                    //primary: 'html5',
                    skin: "/assets/client/js/plugins/jwplayer/stormtrooper.xml",

                });
            }
        }

        video.initPlayerResponsive();
    },
    controlPlayer: function (obj) {
        var player = jwplayer(videoConfigs.playerKey);
        if (player.getState() == 'IDLE' || player.getState() == 'PAUSED') {
            player.play(true);
            $(obj).html('<i class="fa fa-pause"></i>');
        }
        else if (player.getState() == 'PLAYING') {
            player.pause(true);
            $(obj).html('<i class="fa fa-play"></i>');
        }
    },
    bindHover: function () {
        $('#btnLikeSub,#btnDisLikeSub').off('hover').hover(function() {
            if ($(this).hasClass('voted')) {
                $(this).find('.fa').removeClass('fa-thumbs-o-up').addClass('fa-times');
            }
        }, function() {
            if ($(this).hasClass('voted')) {
                $(this).find('.fa').removeClass('fa-times').addClass('fa-thumbs-o-up');
            }
        });
    },
    scrollSubToView: function () {
        /*if ($('.show-sub').length > 0) {
            jwplayer().onTime(function (e) {
                var condition = videoConfigs.curSubIndex + 1;
                var p = e.position;
                if (videoConfigs.curSubIndex === 0) {
                    videoConfigs.subLength = $(videoConfigs.subLines).length;
                }
    
                //When user click timeline on the player
                if (Math.abs(p - videoConfigs.curSubPosition) > 1 || videoConfigs.jumpOnPlayer === true) {
                    $(videoConfigs.subLines).filter('.current').removeClass('current');
                    videoConfigs.curSubIndex = 0;
                    condition = videoConfigs.subLength;
                    videoConfigs.jumpOnPlayer = true;
                }
    
                videoConfigs.curSubPosition = p;
                for (var i = videoConfigs.curSubIndex; i < condition; i++) {
                    var line = $(videoConfigs.subLines).eq(i);
                    var startTime = line.find('.btn-seek').attr('data-start');
                    startTime = video.timeToSeconds(startTime);
                    var endTime = line.find('.btn-seek').attr('data-end');
                    endTime = video.timeToSeconds(endTime);
                    if (startTime <= p && p <= endTime) {
                        if (!line.hasClass('current')) {
                            $(videoConfigs.subLines).filter('.current').removeClass('current');
                            line.addClass('current');
                            if (i < videoConfigs.subLength - 3) {
                                $(videoConfigs.subLines).eq(i + 3).scrollIntoView();
                            } else {
                                line.scrollIntoView();
                            }
                            videoConfigs.curSubIndex = i + 1;
                            videoConfigs.jumpOnPlayer = false;
                            break;
                        }
                    }
                }
            });
        }*/
    },
    showHideSubPanel: function () {
        //show-hide sub area
        $('.expand-sub a').off('click').click(function () {
            var fullHeight = $('.show-sub ul').outerHeight() + 2;
            var showTime = fullHeight > 2000 ? 2000 : fullHeight;
            var hideTime = fullHeight > 2000 ? 200 : fullHeight;
            var $showSubBody = $('.show-sub .shs-body');
            if ($showSubBody.hasClass('full-view')) {
                $('.show-sub .shs-body').animate({ height: 450 }, hideTime, function () {
                    $(this).removeClass('full-view');
                });
            } else {
                $('.show-sub .shs-body').animate({ height: fullHeight }, showTime, function () {
                    $(this).addClass('full-view');
                });
            }
            $(this).toggleClass('collapse');
            return false;
        });
    },
    timeToSeconds: function (hms) {
        var a = hms.replace(',', '.').split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        return seconds;
    },
    preventWhenOutFreeTime: function (freetime, vip) {
        if (freetime != null && freetime != '') {
            jwplayer().onTime(function () {
                if ((jwplayer().getPosition() >= freetime * 60) && (vip == '' || vip == "0")) {
                    jwplayer().play(false);
                }
                if ((jwplayer().getPosition() >= freetime * 60) && (vip == '' || vip == "0")) {
                    common.msgError({
                        text: "Video này bạn chỉ được xem miễn phí " + freetime + " phút. Vui lòng nạp VIP để xem tiếp.",
                        modal: true
                    });
                }
            });
        }

    },
    genEditSubTmpl: function (subText) {
        var tmplEditSubHeader = $('#tmpl-edit-sub-header').html();
        var editSubTmpl = $('#tmpl-client-edit-sub').html();
        if (subText === null || subText === undefined || $.trim(subText) === '') {
            subText = Mustache.render(editSubTmpl, {
                '0': 0,
                '1': '00:00:00.000',
                '2': '00:00:00.000',
                '3': videoConfigs.EngSub,
                '4': videoConfigs.VietSub
            });
        }
        document.getElementById('lst-data-sub-edit').innerHTML = tmplEditSubHeader + subText;
        setTimeout(function () {
            video.initControls.subs.allSubEvents();
        }, 80);
    },
    reloadOriginalSub: function () {
        var isLogin = +$('#hidIsLogin').val();
        var strUrl = "/Subtitle/GetBestSub";
        var videoId = $('#hidVideoId').val();
        var editSubTmpl = $('#tmpl-svr-edit-sub').html().replace(/\s+/g, ' ');
        if (isLogin === 0) {
            editSubTmpl = null;
        }
        var data = {
            videoId: videoId,
            editSubTmpl: editSubTmpl,
            scrollSubTmpl: null,
            reloadOriginalSub: true
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            data: data,
            dataType: "json",
            beforeSend: function () {
                common.startLoading();
                $('.reload-original-sub').addClass('osub-loading');
            },
            success: function (response) {
                if (response.status == true) {
                    setTimeout(function () {
                        video.genEditSubTmpl(response.GenEditSub);
                        videoConfigs.editSubLoaded = true;
                    }, 700);
                } else {
                    alert("Video chưa có sub gốc.");
                }
            },
            error: function (er) {
                console.log(er);
            }
        }).always(function () {
            common.stopLoading();
            $('.reload-original-sub').removeClass('osub-loading');
        });
    },
    DecryptData: function (encryptedData) {
        var decrypted =video.decodeBase64(encryptedData);
        return decrypted;
    },
    decodeBase64 : function(s) {
        return window.atob(s);
    },
    getPlayerDimemsions: function () {
        var adsWidth = 0;
        if ($('.sda').is(':visible')) {
            adsWidth = 4 + $('.sda').width() * 2;
        }
        var playerWidth = $('.player-wrapper').width() - adsWidth;
        var playerHeight = Math.round(playerWidth * 9 / 16);
        return {width: playerWidth, height: playerHeight};
    },
    initPlayerResponsive: function() {
        $(window).resize(function () {
            var playerDims = video.getPlayerDimemsions();
            jwplayer().resize(playerDims.width, playerDims.height);
        });
    },
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    },
    loadPlayerMode: function() {
        var playerMode = video.getCookie('playermode');
        if (playerMode == "normal") {
            $('.ud-extend-player-view .btn').removeClass('collapsed');
            $('.ud-extend-player-view .btn').attr('title', 'Xem rộng hơn, ẩn sub cuộn');
            $('.ct-small').removeClass('full-player-view');
            $('.player-wrapper').removeClass('full-player-wrapper');
            $('.sda').hide(); //hide ads
        }
    }
};

function captionInfo(index, text, style) {
    //index is x2
    if (+index !== 0 && +index % 2 !== 0) {
        var trueIndex = (index - 1) / 2;
        var line = $(videoConfigs.subLines).eq(trueIndex);
        $(videoConfigs.subLines).filter('.current').removeClass('current');
        line.addClass('current');
        if (trueIndex < videoConfigs.subLength - 3) {
            $(videoConfigs.subLines).eq(trueIndex + 3).scrollIntoView();
        } else {
            line.scrollIntoView();
        }
    }
}
video.init();
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/vi_VN/all.js#xfbml=1&appId=170796359666689";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));