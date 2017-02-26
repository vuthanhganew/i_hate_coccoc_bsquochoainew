! function e(t, n, r) {
    function s(i, o) {
        if (!n[i]) {
            if (!t[i]) {
                var l = "function" == typeof require && require;
                if (!o && l) return l(i, !0);
                if (a) return a(i, !0);
                var c = new Error("Cannot find module '" + i + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var m = n[i] = {
                exports: {}
            };
            t[i][0].call(m.exports, function(e) {
                var n = t[i][1][e];
                return s(n ? n : e)
            }, m, m.exports, e, t, n, r)
        }
        return n[i].exports
    }
    for (var a = "function" == typeof require && require, i = 0; i < r.length; i++) s(r[i]);
    return s
}({
    1: [function(e, t, n) {
        var r, s, a, i, o, l, c, m, u, p, g, d, h;
        r = window.Bacon, i = window.React, m = e("../events"), a = e("./views/index"), s = e("../message_handler"), g = e("loglevel"), u = window.locales.getLocalization, o = new s("page"), r.fromEvent(o, "response:signUp").merge(r.fromEvent(o, "response:signIn")).onValue(function(e) {
           //@@ sửa hash/ return location.hash = e.is_premium ? "premium" : "#exit" === location.hash || "#signup" === location.hash ? "verify" : e.is_anonymous ? "exit" : e.is_verified !== !0 ? "exit-unverified" : "exit-verified" //@@ page premium hack
				chrome.storage.local.get("bs_chromevpn", function(re){
					re.bs_chromevpn.isActivated = true
					chrome.storage.local.set(re)
				}) //@@ 2. cài đặt sự kích hoạt
            return location.hash =  "premium"
        }), r.fromEvent(o, "response:forgotPassword").onValue(function(e) {
            return "undefined" != typeof d && null !== d ? d.setState({
                modalView: "login-forgot"
            }) : void 0
        }), r.fromEvent(o, "response:confirmAccount").onValue(function(e) {
            return "#exit-unverified" === location.hash ? location.hash = "verify" : void 0
        }), r.fromEvent(m, "signIn").onValue(function(e) {
            return ("#exit" === location.hash || "#signup" === location.hash) && o.send("request:confirmAccount"), o.send("request:signIn", e)
        }), r.fromEvent(m, "changeLanguage").onValue(function(e) {
            return o.send("request:changeLanguage", e)
        }), r.fromEvent(m, "signUp").onValue(function(e) {
            return o.send("request:signUp", e)
        }), r.fromEventTarget(m, "openPage").onValue(o, "send", "request:openPage"), r.fromEvent(m, "closePage").onValue(function() {
            return o.send("request:closePage")
        }), r.fromEvent(m, "anonSignUp").onValue(function() {
            return o.send("request:signUp", {
                anonymous: !0
            })
        }), r.fromEvent(m, "confirmAccount").onValue(function() {
            return o.send("request:confirmAccount")
        }), r.fromEvent(m, "forgotPassword").onValue(function(e) {
            return o.send("request:forgotPassword", e)
        }), r.fromEvent(m, "openPurchase").onValue(function(e) {
            return o.send("request:openPage", {
                url: "https://secure.zenmate.com#/upgrade",
                params: {
                    uuid: e.uuid,
                    token: e.token,
                    src: "{browser}",
                    promo_code: "show"
                },
                ga: {
                    utm_medium: "exitpage-verified"
                }
            })
        }), c = r.fromEvent(o, "error:signUp").merge(r.fromEvent(o, "error:signIn")).merge(r.fromEvent(o, "error:forgotPassword")).merge(r.fromEvent(o, "error:confirmAccount")), c.onValue(function(e) {
            return "undefined" != typeof d && null !== d ? d.__handleError(e) : void 0
        }), p = r.fromEvent(o, "response:language").map(u).toProperty(), l = r.fromEvent(o, "response:data").toProperty(), d = null, h = e("../router").router("welcome"), r.combineAsArray(l, h, p).onValue(function(e) {
            var t, n, r;
            return t = e[0], r = e[1], n = e[2], d = i.render(i.createElement(a, i.__spread({
                routes: r
            }, t, n)), document.getElementById("app-container"))
        }), o.send("request:language"), o.send("request:data"), null != chrome.tabs.getZoom && null != chrome.tabs.setZoom && chrome.tabs.getZoom(null, function(e) {
            return e > 1.25 ? chrome.tabs.setZoom(null, 1.25) : void 0
        }), null != chrome.tabs.onZoomChange && chrome.tabs.onZoomChange.addListener(function(e) {
            return e.newZoomFactor > 1.25 ? chrome.tabs.setZoom(null, 1.25) : void 0
        })
    }, {
        "../events": 4,
        "../message_handler": 6,
        "../router": 24,
        "./views/index": 14,
        loglevel: 2
    }],
    2: [function(e, t, n) {
        ! function(n, r) {
            "object" == typeof t && t.exports && "function" == typeof e ? t.exports = r() : "function" == typeof define && "object" == typeof define.amd ? define(r) : n.log = r()
        }(this, function() {
            function e(e) {
                return typeof console === l ? !1 : void 0 !== console[e] ? t(console, e) : void 0 !== console.log ? t(console, "log") : o
            }

            function t(e, t) {
                var n = e[t];
                if ("function" == typeof n.bind) return n.bind(e);
                try {
                    return Function.prototype.bind.call(n, e)
                } catch (r) {
                    return function() {
                        return Function.prototype.apply.apply(n, [e, arguments])
                    }
                }
            }

            function n(e, t) {
                return function() {
                    typeof console !== l && (r(t), i[e].apply(i, arguments))
                }
            }

            function r(e) {
                for (var t = 0; t < c.length; t++) {
                    var n = c[t];
                    i[n] = e > t ? o : i.methodFactory(n, e)
                }
            }

            function s(e) {
                var t = (c[e] || "silent").toUpperCase();
                try {
                    return void(window.localStorage.loglevel = t)
                } catch (n) {}
                try {
                    window.document.cookie = "loglevel=" + t + ";"
                } catch (n) {}
            }

            function a() {
                var e;
                try {
                    e = window.localStorage.loglevel
                } catch (t) {}
                if (typeof e === l) try {
                    e = /loglevel=([^;]+)/.exec(window.document.cookie)[1]
                } catch (t) {}
                void 0 === i.levels[e] && (e = "WARN"), i.setLevel(i.levels[e])
            }
            var i = {},
                o = function() {},
                l = "undefined",
                c = ["trace", "debug", "info", "warn", "error"];
            i.levels = {
                TRACE: 0,
                DEBUG: 1,
                INFO: 2,
                WARN: 3,
                ERROR: 4,
                SILENT: 5
            }, i.methodFactory = function(t, r) {
                return e(t) || n(t, r)
            }, i.setLevel = function(e, t) {
                if ("string" == typeof e && void 0 !== i.levels[e.toUpperCase()] && (e = i.levels[e.toUpperCase()]), !("number" == typeof e && e >= 0 && e <= i.levels.SILENT)) throw "log.setLevel() called with invalid level: " + e;
                return t !== !1 && s(e), r(e), typeof console === l && e < i.levels.SILENT ? "No console available for logging" : void 0
            }, i.enableAll = function(e) {
                i.setLevel(i.levels.TRACE, e)
            }, i.disableAll = function(e) {
                i.setLevel(i.levels.SILENT, e)
            };
            var m = typeof window !== l ? window.log : void 0;
            return i.noConflict = function() {
                return typeof window !== l && window.log === i && (window.log = m), i
            }, a(), i
        })
    }, {}],
    3: [function(e, t, n) {
        var r;
        r = function() {
            function e() {
                this.listeners = {}
            }
            return e.prototype.off = function(e) {
                return this.listeners[e] = null
            }, e.prototype.on = function(e, t) {
                return this.listeners[e] = t
            }, e.prototype.trigger = function(e, t) {
                var n;
                return "function" == typeof(n = this.listeners)[e] ? n[e](t) : void 0
            }, e
        }(), t.exports = r
    }, {}],
    4: [function(e, t, n) {
        var r;
        r = e("../../background/emitter"), t.exports = new r
    }, {
        "../../background/emitter": 3
    }],
    5: [function(e, t, n) {
        var r, s;
        r = window.React, s = e("./events"), t.exports = r.createClass({
            displayName: "Link",
            _openLink: function(e) {
                var t;
                return e.preventDefault(), (null != (t = this.props) ? t.clickAction : void 0) && this.props.clickAction(), s.trigger("openPage", {
                    url: this.props.url,
                    ga: this.props.ga,
                    params: this.props.params
                })
            },
            render: function() {
                return r.createElement("a", r.__spread({
                    href: this.props.url,
                    onClick: this._openLink
                }, this.props), this.props.children)
            }
        })
    }, {
        "./events": 4
    }],
    6: [function(e, t, n) {
        var r, s, a, i = {}.hasOwnProperty,
            o = function(e, t) {
                function n() {
                    this.constructor = e
                }
                for (var r in t) i.call(t, r) && (e[r] = t[r]);
                return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
            };
        r = e("../../background/emitter"), a = e("loglevel"), s = function(e) {
            function t(e) {
                var n, r;
                this.name = e, t.__super__.constructor.call(this), this.port = null != ("undefined" != typeof chrome && null !== chrome && null != (n = chrome.runtime) ? n.connect : void 0) ? chrome.runtime.connect({
                    name: this.name
                }) : ("undefined" != typeof addon && null !== addon ? addon.port : void 0) ? addon.port : null != ("undefined" != typeof self && null !== self ? self.port : void 0) ? self.port : void 0, null != (null != (r = this.port.onMessage) ? r.addListener : void 0) ? this.port.onMessage.addListener(this.handleMessage.bind(this)) : null != this.port.on && this.port.on(this.name, this.handleMessage.bind(this))
            }
            return o(t, e), t.prototype.handleMessage = function(e) {
                var t, n;
                return "function" == typeof(t = this.listeners)[n = e.subject] ? t[n](e.payload) : void 0
            }, t.prototype.send = function(e, t) {
                var n;
                return null == t && (t = null), n = {
                    subject: e,
                    payload: t,
                    timestamp: (new Date).valueOf()
                }, null != this.port.postMessage ? this.port.postMessage(n) : null != this.port.emit ? this.port.emit(this.name, n) : void 0
            }, t
        }(r), t.exports = s
    }, {
        "../../background/emitter": 3,
        loglevel: 2
    }],
    7: [function(e, t, n) {
        t.exports = {
            getInitialState: function() {
                return {
                    error: null
                }
            },
            handleErrors: function(e) {
                return this.errorHandler = e
            },
            errorHandler: null,
            componentDidMount: function() {
                var e;
                return "function" == typeof(e = this.props).letThis ? e.letThis(this) : void 0
            },
            componentWillUnmount: function() {
                var e;
                return "function" == typeof(e = this.props).letThis ? e.letThis(null) : void 0
            },
            __handleError: function(e) {
                return null != this.errorHandler ? this.errorHandler.__handleError(e) : this.handleError ? this.handleError(e) : this.setState({
                    error: e
                })
            },
            getIntlErrorMessage: function(e) {
                try {
                    return this.getIntlMessage(e)
                } catch (t) {
                    return this.getIntlMessage("errors.unknown")
                }
            }
        }
    }, {}],
    8: [function(e, t, n) {
        var r, s, a, i, o, l, c, m;
        c = window.React, a = e("./../features"), m = e("./../../../events"), i = window.ReactIntl.IntlMixin, s = e("./../error_handler"), o = e("./../modal"), l = e("./family"), r = e("./arrow"), t.exports = c.createClass({
            displayName: "Anon",
            mixins: [i, s],
            propTypes: {
                messages: c.PropTypes.object.isRequired
            },
            _closePage: function(e) {
                return e.preventDefault(), m.trigger("closePage")
            },
            _showSignUp: function(e) {
                return e.preventDefault(), this.setState({
                    modal: !0
                })
            },
            _hideModal: function() {
                return this.setState({
                    modal: !1
                })
            },
            render: function() {
                return c.createElement("div", {
                    className: "anon page container"
                }, c.createElement("div", {
                    className: "logo logo--center"
                }, c.createElement("img", {
                    height: "59",
                    src: "images/zenmateLogoBlack.png",
                    srcSet: "images/zenmateLogoBlack@2x.png 2x"
                })), c.createElement(r, null), c.createElement("div", {
                    className: "exit container"
                }, c.createElement("div", {
                    className: "content"
                }, c.createElement("h1", {
                    className: "protected-headline"
                }, this.getIntlMessage("page.exit.headline")), c.createElement("h2", {
                    className: "slogan"
                }, this.getIntlMessage("page.exit.slogan")), c.createElement("h3", null, this.getIntlMessage("page.exit.slogan_sub")), c.createElement(a, {
                    type: "exit"
                }), c.createElement("button", {
                    onClick: this._showSignUp,
                    className: "btn btn-blue btn--xl"
                }, c.createElement("span", {
                    className: "text text--main"
                }, this.getIntlMessage("page.exit.cta_button"))), c.createElement("h4", {
                    className: "subtext"
                }, this.getIntlMessage("page.exit.cta_button_sub"))), c.createElement("hr", {
                    className: "medium"
                }), c.createElement(l, {
                    medium: "exit",
                    messages: this.props.messages
                }), c.createElement("button", {
                    onClick: this._showSignUp,
                    className: "btn btn-blue btn--xl content"
                }, c.createElement("span", {
                    className: "text text--main"
                }, this.getIntlMessage("page.exit.cta_button")))), c.createElement("button", {
                    onClick: this._closePage,
                    className: "got-it-btn btn--light"
                }, this.getIntlMessage("page.exit.got_it_button")), this.state.modal ? c.createElement(o, {
                    modalHash: "signup",
                    hideModal: this._hideModal,
                    letThis: this.handleErrors,
                    ref: "errorHandler"
                }) : void 0)
            }
        })
    }, {
        "./../../../events": 4,
        "./../error_handler": 7,
        "./../features": 13,
        "./../modal": 18,
        "./arrow": 9,
        "./family": 10
    }],
    9: [function(e, t, n) {
        var r;
        r = window.React, t.exports = r.createClass({
            render: function() {
                return r.createElement("div", {
                    className: "pointer-container"
                }, r.createElement("span", {
                    className: "arrow-top"
                }), r.createElement("span", {
                    className: "arrow-mid"
                }), r.createElement("span", {
                    className: "arrow-bot"
                }))
            }
        })
    }, {}],
    10: [function(e, t, n) {
        var r, s, a, i, o, l;
        o = window.React, a = e("../../../link"), l = window.ReactIntl, s = l.IntlMixin, r = l.FormattedMessage, i = o.addons.PureRenderMixin, t.exports = o.createClass({
            displayName: "Family",
            mixins: [s, i],
            propTypes: {
                medium: o.PropTypes.string
            },
            render: function() {
                var e;
                return e = o.createElement(a, {
                    url: "https://play.google.com/store/apps/details",
                    params: {
                        id: "com.zenmate.android",
                        referrer: "utm_medium%3D" + this.props.medium + "%26utm_source%3D{browser}%26utm_campaign%3DExtension"
                    }
                }, this.getIntlMessage("page.exit.android_link")), o.createElement("div", {
                    className: "content"
                }, o.createElement("h2", {
                    className: "slogan explain-family-headline"
                }, this.getIntlMessage("page.exit.family_headline")), o.createElement("p", {
                    className: "subtext explain-family"
                }, o.createElement(r, {
                    message: this.getIntlMessage("page.exit.family_copy_first"),
                    ios: o.createElement(a, {
                        url: "http://go.zenmate.com/ZPcDQ"
                    }, this.getIntlMessage("page.exit.ios_link")),
                    android: e
                })), o.createElement("p", {
                    className: "subtext explain-family"
                }, this.getIntlMessage("page.exit.family_copy_second")), o.createElement("div", {
                    className: "product-family-container"
                }, o.createElement("img", {
                    src: "images/product_family.png",
                    height: "300",
                    srcSet: "images/product_family@2x.png 2x"
                })))
            }
        })
    }, {
        "../../../link": 5
    }],
    11: [function(e, t, n) {
        var r, s, a, i, o, l, c, m;
        c = window.React, a = e("./../features"), m = e("./../../../events"), i = window.ReactIntl.IntlMixin, s = e("./../error_handler"), o = e("./../modal"), l = e("./family"), r = e("./arrow"), t.exports = c.createClass({
            displayName: "UnverifiedExit",
            mixins: [i, s],
            propTypes: {
                messages: c.PropTypes.object.isRequired
            },
            handleError: function(e) {
                return this.setState({
                    loading: !1,
                    error: e
                })
            },
            _closePage: function(e) {
                return e.preventDefault(), m.trigger("closePage")
            },
            _confirmAccount: function(e) {
                return e.preventDefault(), this.setState({
                    loading: !0,
                    error: null
                }), m.trigger("confirmAccount")
            },
            render: function() {
                return c.createElement("div", {
                    className: "unverified page container"
                }, c.createElement("div", {
                    className: "logo logo--center"
                }, c.createElement("img", {
                    height: "59",
                    src: "images/zenmateLogoBlack.png",
                    srcSet: "images/zenmateLogoBlack@2x.png 2x"
                })), c.createElement(r, null), c.createElement("div", {
                    className: "exit container"
                }, c.createElement("div", {
                    className: "content"
                }, c.createElement("h1", {
                    className: "protected-headline"
                }, this.getIntlMessage("page.exit.headline")), c.createElement("h2", {
                    className: "slogan"
                }, this.getIntlMessage("page.exit.slogan")), c.createElement("h3", null), c.createElement(a, {
                    type: "exit"
                }), c.createElement("p", {
                    className: "error"
                }, this.state.error ? this.getIntlErrorMessage(this.state.error) : void 0), c.createElement("button", {
                    onClick: this._confirmAccount,
                    className: "btn btn--xl"
                }, this.state.loading ? c.createElement("div", {
                    className: "loader small"
                }) : c.createElement("span", {
                    className: "text text--main"
                }, this.getIntlMessage("page.exit.cta_button"))), c.createElement("h4", {
                    className: "subtext"
                }, this.getIntlMessage("page.exit.cta_button_sub"))), c.createElement("hr", {
                    className: "medium"
                }), c.createElement(l, {
                    medium: "exit-unverified",
                    messages: this.props.messages
                }), c.createElement("button", {
                    onClick: this._confirmAccount,
                    className: "btn btn--xl content"
                }, this.state.loading ? c.createElement("div", {
                    className: "loader"
                }) : c.createElement("span", {
                    className: "text text--main"
                }, this.getIntlMessage("page.exit.cta_button")))), c.createElement("button", {
                    onClick: this._closePage,
                    className: "got-it-btn btn--light"
                }, this.getIntlMessage("page.exit.got_it_button")), this.state.modal ? c.createElement(o, {
                    modalHash: "signup",
                    hideModal: this._hideModal,
                    letThis: this.handleErrors,
                    ref: "errorHandler"
                }) : void 0)
            }
        })
    }, {
        "./../../../events": 4,
        "./../error_handler": 7,
        "./../features": 13,
        "./../modal": 18,
        "./arrow": 9,
        "./family": 10
    }],
    12: [function(e, t, n) {
        var r, s, a, i, o, l, c, m;
        c = window.React, a = e("./../features"), m = e("./../../../events"), i = window.ReactIntl.IntlMixin, s = e("./../error_handler"), o = e("./../modal"), l = e("./family"), r = e("./arrow"), t.exports = c.createClass({
            displayName: "VerifiedExit",
            mixins: [i, s],
            propTypes: {
                device: c.PropTypes.object.isRequired,
                messages: c.PropTypes.object.isRequired
            },
            _closePage: function(e) {
                return e.preventDefault(), m.trigger("closePage")
            },
            _openPurchase: function(e) {
                return e.preventDefault(), m.trigger("openPurchase", this.props.device)
            },
            _hideModal: function() {
                return this.setState({
                    modal: !1
                })
            },
            render: function() {
                return c.createElement("div", {
                    className: "verified page container"
                }, c.createElement("div", {
                    className: "logo logo--center"
                }, c.createElement("img", {
                    height: "59",
                    src: "images/zenmateLogoBlack.png",
                    srcSet: "images/zenmateLogoBlack@2x.png 2x"
                })), c.createElement(r, null), c.createElement("div", {
                    className: "exit container"
                }, c.createElement("div", {
                    className: "content"
                }, c.createElement("h1", {
                    className: "protected-headline"
                }, this.getIntlMessage("page.exit.headline")), c.createElement("h2", {
                    className: "slogan"
                }, this.getIntlMessage("page.exit.verified.slogan")), c.createElement("h3", null), c.createElement(a, {
                    type: "exit"
                }), c.createElement("button", {
                    onClick: this._openPurchase,
                    className: "btn btn--xl"
                }, c.createElement("span", {
                    className: "text text--main"
                }, this.getIntlMessage("page.exit.verified.cta_button"))), c.createElement("h4", {
                    className: "subtext"
                })), c.createElement("hr", {
                    className: "medium"
                }), c.createElement(l, {
                    medium: "exit-verified",
                    messages: this.props.messages
                }), c.createElement("button", {
                    onClick: this._openPurchase,
                    className: "btn btn--xl content"
                }, c.createElement("span", {
                    className: "text text--main"
                }, this.getIntlMessage("page.exit.verified.cta_button")))), c.createElement("button", {
                    onClick: this._closePage,
                    className: "got-it-btn btn--light"
                }, this.getIntlMessage("page.exit.got_it_button")), this.state.modal ? c.createElement(o, {
                    modalHash: "signup",
                    hideModal: this._hideModal,
                    letThis: this.handleErrors,
                    ref: "errorHandler"
                }) : void 0)
            }
        })
    }, {
        "./../../../events": 4,
        "./../error_handler": 7,
        "./../features": 13,
        "./../modal": 18,
        "./arrow": 9,
        "./family": 10
    }],
    13: [function(e, t, n) {
        var r, s, a, i;
        i = window.React, s = window.ReactIntl.IntlMixin, a = i.addons.PureRenderMixin, r = i.createClass({
            displayName: "ViewFeatures",
            mixins: [s, a],
            propTypes: {
                img: i.PropTypes.string.isRequired,
                title: i.PropTypes.string.isRequired
            },
            render: function() {
                return i.createElement("div", {
                    className: "feature"
                }, i.createElement("div", {
                    className: "image-container"
                }, i.createElement("img", {
                    height: "80",
                    src: "images/" + this.props.img + ".png",
                    srcSet: "images/" + this.props.img + "@2x.png 2x",
                    alt: ""
                })), i.createElement("h4", {
                    className: "feature-explanation"
                }, this.getIntlMessage("page.features." + this.props.title)))
            }
        }), t.exports = i.createClass({
            mixins: [s, a],
            propTypes: {
                type: i.PropTypes.string
            },
            render: function() {
                return "free" === this.props.type ? i.createElement("div", {
                    className: "features"
                }, i.createElement(r, {
                    img: "bestEffortSpeedIcon",
                    title: "free.speed"
                }), i.createElement(r, {
                    img: "freeLocationIcon",
                    title: "free.locations"
                }), i.createElement(r, {
                    img: "mobileOnlyClientLightBg",
                    title: "free.clients"
                })) : "logged_premium" === this.props.type ? i.createElement("div", {
                    className: "features"
                }, i.createElement(r, {
                    img: "premiumSpeedIcon",
                    title: "premium.speed"
                }), i.createElement(r, {
                    img: "premiumLocationIcon",
                    title: "premium.locations"
                }), i.createElement(r, {
                    img: "desktopClientsIcon",
                    title: "premium.clients"
                })) : "logged_free" === this.props.type ? i.createElement("div", {
                    className: "features"
                }, i.createElement(r, {
                    img: "premiumSpeedIcon",
                    title: "premium.speed"
                }), i.createElement(r, {
                    img: "premiumLocationIcon",
                    title: "premium.locations"
                }), i.createElement(r, {
                    img: "desktopClientsIcon",
                    title: "premium.clients"
                })) : "exit" === this.props.type ? i.createElement("div", {
                    className: "features"
                }, i.createElement(r, {
                    img: "premiumSpeedIcon",
                    title: "exit.speed"
                }), i.createElement(r, {
                    img: "premiumLocationIcon",
                    title: "exit.locations"
                }), i.createElement(r, {
                    img: "desktopClientsIcon",
                    title: "exit.clients"
                })) : void 0
            }
        })
    }, {}],
    14: [function(e, t, n) {
        var r, s, a, i, o, l, c, m, u, p;
        m = window.React, p = e("./welcome"), c = e("./premium"), s = e("./exit/anon"), a = e("./exit/unverified"), i = e("./exit/verified"), u = e("./verify"), o = window.ReactIntl.IntlMixin, r = e("./error_handler"), l = e("./locale_box"), t.exports = m.createClass({
            displayName: "MainView",
            mixins: [o, r],
            propTypes: {
                routes: m.PropTypes.object.isRequired,
                messages: m.PropTypes.object.isRequired,
                country_code: m.PropTypes.string.isRequired,
                locale_name: m.PropTypes.string.isRequired,
                user: m.PropTypes.object,
                device: m.PropTypes.object,
                error: m.PropTypes.string
            },
            getInitialState: function() {
                return {}
            },
            render: function() {
                var e;
                return e = function() {
                    switch (this.props.routes.current) {
                        case "exit":
                            return m.createElement(s, {
                                letThis: this.handleErrors,
                                modalView: this.state.modalView,
                                messages: this.props.messages
                            });
                        case "exit-unverified":
                            return m.createElement(a, {
                                letThis: this.handleErrors,
                                modalView: this.state.modalView,
                                messages: this.props.messages
                            });
                        case "exit-verified":
                            return m.createElement(i, {
                                letThis: this.handleErrors,
                                modalView: this.state.modalView,
                                messages: this.props.messages,
                                device: this.props.device
                            });
                        case "verify":
                            return m.createElement(u, {
                                letThis: this.handleErrors,
                                email: this.props.user.email,
                                error: this.props.error
                            });
                        case "premium":
                            return m.createElement(c, {
                                error: this.props.error
                            });
                        case "login":
                            return m.createElement(p, {
                                letThis: this.handleErrors,
                                modal: !0,
                                modalView: this.state.modalView,
                                user: this.props.user
                            });
                        case "signup":
                            return m.createElement(p, {
                                letThis: this.handleErrors,
                                modal: !0,
                                modalView: "signup",
                                user: this.props.user
                            });
                        default:
                            return m.createElement(p, {
                                letThis: this.handleErrors,
                                user: this.props.user
                            })
                    }
                }.call(this), m.createElement("div", {
                    className: this.props.routes.current
                }, m.createElement(l, {
                    current: this.props.country_code
                }), e)
            }
        })
    }, {
        "./error_handler": 7,
        "./exit/anon": 8,
        "./exit/unverified": 11,
        "./exit/verified": 12,
        "./locale_box": 15,
        "./premium": 21,
        "./verify": 22,
        "./welcome": 23
    }],
    15: [function(e, t, n) {
        var r, s, a, i;
        s = window.React, a = e("./../../events"), r = s.addons.PureRenderMixin, i = window.locales.locales, t.exports = s.createClass({
            displayName: "LocaleBox",
            mixins: [r],
            propTypes: {
                current: s.PropTypes.string.isRequired
            },
            _changeLanguage: function(e) {
                return a.trigger("changeLanguage", e)
            },
            render: function() {
                var e, t, n;
                return e = i[this.props.current], s.createElement("ul", {
                    className: "language-container btn--light"
                })
            }
        })
    }, {
        "./../../events": 4
    }],
    16: [function(e, t, n) {
        var r, s, a, i, o, l;
        o = window.React, l = e("./../../../events"), s = window.ReactIntl.IntlMixin, r = e("../error_handler"), a = e("./form_mixin"), i = o.addons.PureRenderMixin, t.exports = o.createClass({
            displayName: "ForgotPassword",
            mixins: [s, r, a, i],
            propTypes: {
                email: o.PropTypes.string.isRequired,
                persistEmail: o.PropTypes.func.isRequired,
                setView: o.PropTypes.func.isRequired
            },
            componentDidMount: function() {
                return this.focusInput(this.refs.email, "email")
            },
            getInitialState: function() {
                return {
                    loading: !1
                }
            },
            handleError: function(e) {
                return this.setState({
                    loading: !1,
                    error: e
                })
            },
            _forgotPassword: function(e) {
                return e.preventDefault(), this.props.persistEmail(this.refs.email.getDOMNode().value), this.setState({
                    loading: !0,
                    error: null
                }), l.trigger("forgotPassword", {
                    email: this.refs.email.getDOMNode().value
                })
            },
            _showLogin: function(e) {
                return e.preventDefault(), this.props.setView("login")
            },
            render: function() {
                return o.createElement("div", null, o.createElement("img", {
                    height: "100",
                    src: "images/logo.png",
                    srcSet: "images/logo@2x.png 2x"
                }), o.createElement("h2", null, this.getIntlMessage("page.modal.forgot.heading")), o.createElement("h3", {
                    className: "error error-forgot"
                }, this.state.error ? this.getIntlErrorMessage(this.state.error) : void 0), o.createElement("form", {
                    ref: "login_modal",
                    className: "form-container",
                    onSubmit: this._forgotPassword,
                    action: ""
                }, o.createElement("div", {
                    className: "input-container"
                }, o.createElement("input", {
                    type: "email",
                    ref: "email",
                    maxLength: 254,
                    placeholder: this.getIntlMessage("page.modal.forgot.placeholder"),
                    defaultValue: this.props.email
                }), o.createElement("button", {
                    type: "submit",
                    className: "btn btn--sm"
                }, this.state.loading ? o.createElement("div", {
                    className: "loader small"
                }) : o.createElement("span", {
                    className: "text text--main"
                }, this.getIntlMessage("page.modal.forgot.reset_button"))), o.createElement("h4", {
                    className: "forgot-password"
                }, o.createElement("a", {
                    href: "#",
                    onClick: this._showLogin
                }, this.getIntlMessage("page.modal.forgot.back"))))))
            }
        })
    }, {
        "../error_handler": 7,
        "./../../../events": 4,
        "./form_mixin": 17
    }],
    17: [function(e, t, n) {
        t.exports = {
            focusInput: function(e, t) {
                var n, r;
                return null == t && (t = "text"), n = e.getDOMNode(), n.focus(), r = n.value.length, n.type = "text", n.setSelectionRange(r, r), n.type = t
            }
        }
    }, {}],
    18: [function(e, t, n) {
        var r, s, a, i, o, l, c, m;
        l = window.React, m = e("./../../../events"), i = e("./login"), c = e("./signup"), s = e("./forgot"), a = window.ReactIntl.IntlMixin, r = e("../error_handler"), o = l.addons.PureRenderMixin, t.exports = l.createClass({
            displayName: "ModalView",
            mixins: [a, r, o],
            propTypes: {
                hideModal: l.PropTypes.func.isRequired,
                modalHash: l.PropTypes.string
            },
            componentDidMount: function() {
                return window.addEventListener("keydown", this._handleKeyDown)
            },
            componentWillUnmount: function() {
                return window.removeEventListener("keydown", this._handleKeyDown)
            },
            componentWillReceiveProps: function(e) {
                return this._setView(e.modalHash)
            },
            getInitialState: function() {
                return {
                    view: this.props.modalHash
                }
            },
            _handleKeyDown: function(e) {
                return 27 === e.keyCode ? this._hideModal() : void 0
            },
            _persistEmail: function(e) {
                return this.setState({
                    globalEmail: e
                })
            },
            _setView: function(e) {
                return this.setState({
                    view: e
                })
            },
            _hideModal: function() {
                return this.props.hideModal()
            },
            render: function() {
                return l.createElement("div", null, l.createElement("div", {
                    className: "overlay",
                    onClick: this._hideModal
                }), l.createElement("div", {
                    className: "modal " + this.state.view
                }, function() {
                    switch (this.state.view) {
                        case "forgot":
                            return l.createElement(s, {
                                letThis: this.handleErrors,
                                email: this.state.globalEmail,
                                persistEmail: this._persistEmail,
                                setView: this._setView
                            });
                        case "signup":
                            return l.createElement(c, {
                                letThis: this.handleErrors,
                                email: this.state.globalEmail,
                                persistEmail: this._persistEmail,
                                setView: this._setView
                            });
                        case "login-forgot":
                            return l.createElement(i, {
                                letThis: this.handleErrors,
                                message: "page.modal.login.forgot_sent",
                                email: this.state.globalEmail,
                                persistEmail: this._persistEmail,
                                setView: this._setView
                            });
                        default:
                            return l.createElement(i, {
                                letThis: this.handleErrors,
                                email: this.state.globalEmail,
                                persistEmail: this._persistEmail,
                                setView: this._setView
                            })
                    }
                }.call(this)))
            }
        })
    }, {
        "../error_handler": 7,
        "./../../../events": 4,
        "./forgot": 16,
        "./login": 19,
        "./signup": 20
    }],
    19: [function(e, t, n) {
        var r, s, a, i, o, l;
        o = window.React, l = e("./../../../events"), s = window.ReactIntl.IntlMixin, r = e("../error_handler"), a = e("./form_mixin"), i = o.addons.PureRenderMixin, t.exports = o.createClass({
            displayName: "Login",
            mixins: [s, r, a, i],
            propTypes: {
                persistEmail: o.PropTypes.func.isRequired,
                setView: o.PropTypes.func.isRequired,
                message: o.PropTypes.string,
                email: o.PropTypes.string
            },
            componentDidMount: function() {
                return this.focusInput(this.refs.email, "email")
            },
            getInitialState: function() {
                return {
                    loading: !1
                }
            },
            handleError: function(e) {
                return this.setState({
                    loading: !1,
                    error: e
                })
            },
            _login: function(e) {
                return e.preventDefault(), this.setState({
                    loading: !0,
                    error: null
                }), l.trigger("signIn", {
                    email: this.refs.email.getDOMNode().value,
                    password: this.refs.password.getDOMNode().value
                })
            },
            _showForgot: function(e) {
                return e.preventDefault(), this.props.persistEmail(this.refs.email.getDOMNode().value), this.props.setView("forgot")
            },
            render: function() {
                return o.createElement("div", null, o.createElement("img", {
                    height: "100",
                    src: "images/logo.png",
                    srcSet: "images/logo@2x.png 2x"
                }), o.createElement("h2", null, this.getIntlMessage("page.modal.login.heading")), this.state.error ? o.createElement("h3", {
                    className: "error"
                }, this.getIntlErrorMessage(this.state.error)) : o.createElement("h3", {
                    className: "message"
                }, this.props.message ? this.getIntlMessage(this.props.message) : void 0), o.createElement("form", {
                    ref: "login_modal",
                    className: "form-container",
                    onSubmit: this._login
                }, o.createElement("div", {
                    className: "input-container"
                }, o.createElement("input", {
                    ref: "email",
                    type: "email",
                    maxLength: "254",
                    placeholder: this.getIntlMessage("page.modal.login.placeholder_email"),
                    defaultValue: this.props.email,
                    required: !0
                }), o.createElement("input", {
                    ref: "password",
                    type: "password",
                    minLength: 6,
                    maxLength: 128,
                    placeholder: this.getIntlMessage("page.modal.login.placeholder_password"),
                    required: !0
                }), o.createElement("button", {
                    type: "submit",
                    className: "btn btn--sm"
                }, this.state.loading ? o.createElement("div", {
                    className: "loader small"
                }) : o.createElement("span", {
                    className: "text text--main"
                }, this.getIntlMessage("page.modal.login.login_button"))), o.createElement("h4", {
                    className: "forgot-password"
                }, o.createElement("a", {
                    href: "#",
                    onClick: this._showForgot
                }, this.getIntlMessage("page.modal.login.forgot_password"))))))
            }
        })
    }, {
        "../error_handler": 7,
        "./../../../events": 4,
        "./form_mixin": 17
    }],
    20: [function(e, t, n) {
        var r, s, a, i, o, l;
        o = window.React, l = e("./../../../events"), s = window.ReactIntl.IntlMixin, r = e("../error_handler"), a = e("./form_mixin"), i = o.addons.PureRenderMixin, t.exports = o.createClass({
            displayName: "Signup",
            mixins: [s, r, a, i],
            propTypes: {
                email: o.PropTypes.string,
                persistEmail: o.PropTypes.func.isRequired,
                setView: o.PropTypes.func.isRequired
            },
            componentDidMount: function() {
                return this.focusInput(this.refs.email, "email")
            },
            getInitialState: function() {
                return {
                    loading: !1
                }
            },
            handleError: function(e) {
                return this.setState({
                    loading: !1,
                    error: e
                })
            },
            _signUp: function(e) {
                return e.preventDefault(), this.setState({
                    loading: !0,
                    error: null
                }), l.trigger("signUp", {
                    email: this.refs.email.getDOMNode().value,
                    password: this.refs.password.getDOMNode().value
                })
            },
            _showLogin: function(e) {
                return e.preventDefault(), this.props.persistEmail(this.refs.email.getDOMNode().value), this.props.setView("login")
            },
            render: function() {
                return o.createElement("div", null, o.createElement("img", {
                    height: "100",
                    src: "images/zenmate-hero.png",
                    srcSet: "images/zenmate-hero@2x.png 2x"
                }), o.createElement("h3", {
                    className: this.state.error ? "sign-up-heading error" : "sign-up-heading"
                }, this.state.error ? "errors.user.email.taken" === this.state.error ? o.createElement("a", {
                    className: "email-taken-error",
                    href: "#",
                    onClick: this._showLogin
                }, this.getIntlErrorMessage(this.state.error)) : this.getIntlErrorMessage(this.state.error) : this.getIntlMessage("page.modal.signup.heading")), o.createElement("form", {
                    ref: "login_modal",
                    className: "form-container",
                    onSubmit: this._signUp
                }, o.createElement("div", {
                    className: "input-container"
                }, o.createElement("input", {
                    ref: "email",
                    type: "email",
                    maxLength: 254,
                    placeholder: this.getIntlMessage("page.modal.signup.placeholder_email"),
                    defaultValue: this.props.email,
                    required: !0
                }), o.createElement("input", {
                    ref: "password",
                    type: "password",
                    minLength: 6,
                    maxLength: 128,
                    placeholder: this.getIntlMessage("page.modal.signup.placeholder_password"),
                    required: !0
                }), o.createElement("button", {
                    type: "submit",
                    className: "btn btn--sm"
                }, this.state.loading ? o.createElement("div", {
                    className: "loader small"
                }) : o.createElement("span", {
                    className: "text text--main"
                }, this.getIntlMessage("page.modal.signup.login_button")))), o.createElement("strong", {
                    className: "sign-up-sub"
                }, this.getIntlMessage("page.modal.signup.subtext_head")), o.createElement("span", {
                    className: "sign-up-sub"
                }, this.getIntlMessage("page.modal.signup.subtext_copy")), o.createElement("h4", {
                    className: "forgot-password"
                }, o.createElement("a", {
                    href: "#",
                    onClick: this._showLogin
                }, this.getIntlMessage("page.modal.signup.signin_existing_account")))))
            }
        })
    }, {
        "../error_handler": 7,
        "./../../../events": 4,
        "./form_mixin": 17
    }],
    21: [function(e, t, n) {
        var r, s, a, i, o, l, c;
        o = window.React, r = e("./features"), l = e("./../../events"), i = o.addons.PureRenderMixin, c = window.ReactIntl, a = c.IntlMixin, s = c.FormattedMessage, t.exports = o.createClass({
            displayName: "Premium",
            mixins: [a, i],
            propTypes: {
                error: o.PropTypes.string
            },
            _closePage: function(e) {
					chrome.storage.local.get("bs_chromevpn", function(re){
						if(typeof re == "undefined"){return false;}
						re.bs_chromevpn.isActivated = true
					 })
                return e.preventDefault(), l.trigger("closePage")
            },
            render: function() {
                return o.createElement("div", {
                    className: "loggedpremium page container"
                }, o.createElement("div", {
                    className: "logo logo--center"
                }, o.createElement("img", {
                    height: "59",
                    src: "images/zenmateLogoBlack.png",
                    srcSet: "images/zenmateLogoBlack@2x.png 2x"
                })), o.createElement("hr", {
                    className: "medium"
                }), o.createElement("h2", {
                    className: "slogan"
                }, o.createElement(s, {
                    message: this.getIntlMessage("page.premium.thankyou"),
                    premium: o.createElement("strong", null, this.getIntlMessage("brand.premium"))
                }), o.createElement("br", null), this.getIntlMessage("page.premium.thankyou_sub")), o.createElement("hr", {
                    className: "medium"
                }), o.createElement("p", {
                    className: "premium--subhead"
                }, this.getIntlMessage("page.premium.subheader")), o.createElement(r, {
                    type: "logged_free"
                }), o.createElement("hr", {
                    className: "medium"
                }), o.createElement("p", {
                    className: "error"
                }, this.props.error), o.createElement("button", {
                    onClick: this._closePage,
                    className: "btn btn--xl"
                }, o.createElement("span", {
                    className: "text text--main"
                }, this.getIntlMessage("page.premium.got_it_button"))))
            }
        })
    }, {
        "./../../events": 4,
        "./features": 13
    }],
    22: [function(e, t, n) {
        var r, s, a, i, o, l, c;
        o = window.React, r = e("./features"), l = e("./../../events"), i = o.addons.PureRenderMixin, c = window.ReactIntl, a = c.IntlMixin, s = c.FormattedMessage, t.exports = o.createClass({
            displayName: "Verify",
            mixins: [a, i],
            propTypes: {
                email: o.PropTypes.string.isRequired,
                error: o.PropTypes.string
            },
            _closePage: function(e) {
                return e.preventDefault(), l.trigger("closePage")
            },
            render: function() {
                return o.createElement("div", {
                    className: "verify page container"
                }, o.createElement("div", {
                    className: "logo logo--center"
                }, o.createElement("img", {
                    height: "59",
                    src: "images/zenmateLogoBlack.png",
                    srcSet: "images/zenmateLogoBlack@2x.png 2x"
                })), o.createElement("hr", {
                    className: "medium"
                }), o.createElement("h2", {
                    className: "slogan"
                }, this.getIntlMessage("page.verify.thankyou"), o.createElement("br", null), o.createElement(s, {
                    message: this.getIntlMessage("page.verify.thankyou_sub"),
                    email: this.props.email
                })), o.createElement("hr", {
                    className: "medium"
                }), o.createElement("p", {
                    className: "premium--subhead"
                }, this.getIntlMessage("page.verify.premium.subheader")), o.createElement(r, {
                    type: "logged_free"
                }), o.createElement("hr", {
                    className: "medium"
                }), o.createElement("p", {
                    className: "error"
                }, this.props.error), o.createElement("button", {
                    onClick: this._closePage,
                    className: "btn btn--xl"
                }, o.createElement("span", {
                    className: "text text--main"
                }, this.getIntlMessage("page.premium.got_it_button"))))
            }
        })
    }, {
        "./../../events": 4,
        "./features": 13
    }],
    23: [function(e, t, n) {
        var r, s, a, i, o, l, c, m;
        l = window.React, s = e("./features"), c = e("./../../events"), o = e("./modal"), r = e("./error_handler"), m = window.ReactIntl, i = m.IntlMixin, a = m.FormattedMessage, t.exports = l.createClass({
            displayName: "Welcome",
            mixins: [i, r],
            propTypes: {
                user: l.PropTypes.shape({
                    is_anonymous: l.PropTypes.bool
                }),
                modal: l.PropTypes.bool,
                modalView: l.PropTypes.string
            },
            getInitialState: function() {
                return {
                    loading: !1
                }
            },
            handleError: function(e) {
                return this.setState({
                    loading: !1,
                    error: e
                })
            },
            _hideModal: function() {
                return location.hash = ""
            },
            _anonSignup: function(e) {
                return e.preventDefault(), this.setState({
                    loading: !0,
                    error: null
                }), c.trigger("anonSignUp")
            },
            render: function() {
                return l.createElement("div", null, l.createElement("div", {
                    className: "welcome page container"
                }, l.createElement("div", {
                    className: "logo logo--center"
                }, l.createElement("img", {
                    height: "59",
                    src: "images/zenmateLogoBlack.png",
                    srcSet: "images/zenmateLogoBlack@2x.png 2x"
                })), l.createElement("hr", {
                    className: "medium"
                }), l.createElement("h2", {
                    className: "slogan"
                }, this.getIntlMessage("page.welcome.slogan_first"), l.createElement("br", null), this.getIntlMessage("page.welcome.slogan_second")), l.createElement(s, {
                    type: "free"
                }), l.createElement("hr", {
                    className: "medium"
                }), l.createElement("p", {
                    className: "error"
                }, this.state.error ? this.getIntlErrorMessage(this.state.error) : void 0), l.createElement("button", {
                    onClick: this._anonSignup,
                    className: "btn btn--xl"
                }, this.state.loading ? l.createElement("div", {
                    className: "loader"
                }) : l.createElement("span", null, l.createElement("span", {
                    className: "text text--main"
                }, l.createElement("span", null, l.createElement(a, {
                    message: this.getIntlMessage("page.welcome.cta_start_using"),
                    zenmate: l.createElement("strong", null, this.getIntlMessage("brand.zenmate"))
                }))), l.createElement("span", {
                    className: "text text--sub"
                }, this.getIntlMessage("page.welcome.cta_subtext")))), l.createElement("h4", {
                    className: "subtext"
                }, l.createElement(a, {
                    message: this.getIntlMessage("page.welcome.cta_privacy_policy"),
                    terms_of_service: l.createElement("a", {
                        target: "_blank",
                        href: "https://zenmate.com/tos/"
                    }, this.getIntlMessage("page.welcome.terms_of_service")),
                    privacy_policy: l.createElement("a", {
                        target: "_blank",
                        href: "https://zenmate.com/privacy-policy"
                    }, this.getIntlMessage("page.welcome.privacy_policy"))
                })), l.createElement("hr", {
                    className: "large"
                }), null == this.props.user || this.props.user.is_anonymous ? l.createElement("h4", {
                    className: "have-account"
                }) : void 0), this.props.modal ? l.createElement(o, {
                    hideModal: this._hideModal,
                    modalHash: this.props.modalView,
                    letThis: this.handleErrors,
                    ref: "errorHandler"
                }) : void 0)
            }
        })
    }, {
        "./../../events": 4,
        "./error_handler": 7,
        "./features": 13,
        "./modal": 18
    }],
    24: [function(e, t, n) {
        var r;
        r = window.Bacon, n.router = function(e) {
            var t;
            return null == e && (e = "home"), t = r.fromEventTarget(window, "hashchange").bufferingThrottle(500).merge(r.once()).map(function() {
                var e;
                return null != (e = location.hash) ? e.slice(1) : void 0
            }).scan({
                stack: [e],
                direction: "right"
            }, function(e, t) {
                var n;
                return t = t || "home", n = e.stack.indexOf(t), ~n ? (e.direction = "left", e.stack = e.stack.slice(0, n + 1)) : (e.direction = "right", e.stack.push(t)), e
            }).skip(1), t.map(function(e) {
                return {
                    direction: e.direction,
                    current: e.stack[e.stack.length - 1],
                    previous: e.stack[e.stack.length - 2]
                }
            })
        }
    }, {}]
}, {}, [1]);