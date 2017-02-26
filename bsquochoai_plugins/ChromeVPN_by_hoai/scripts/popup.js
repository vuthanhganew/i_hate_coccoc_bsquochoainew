! function e(t, s, n) {
    function r(i, a) {
        if (!s[i]) {
            if (!t[i]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(i, !0);
                if (o) return o(i, !0);
                var p = new Error("Cannot find module '" + i + "'");
                throw p.code = "MODULE_NOT_FOUND", p
            }
            var c = s[i] = {
                exports: {}
            };
            t[i][0].call(c.exports, function(e) {
                var s = t[i][1][e];
                return r(s ? s : e)
            }, c, c.exports, e, t, s, n)
        }
        return s[i].exports
    }
	chrome.storage.local.get("bs_chromevpn", function(re){
		if(typeof re == "undefined"){return false;}
		if (!re.bs_chromevpn.isActivated){
			chrome.tabs.create({url: "/bsquochoai_plugins/ChromeVPN_by_hoai/page.html"})
		}
	 })
    for (var o = "function" == typeof require && require, i = 0; i < n.length; i++) r(n[i]);
    return r
}({
    1: [function(e, t, s) {
        var n, r, o, i, a, l, p, c, u, m, d, h, g, f, y, v;
        n = window.Bacon, i = window.React, u = e("../events"), o = e("./views/index"), r = e("../message_handler"), m = window.locales.getLocalization, f = e("loglevel"), v = e("../router").router(), a = new r("popup"), h = new n.Bus, p = h.merge(n.fromEvent(a, "response:data")), d = n.fromEvent(u, "header").merge(p.map(function(e) {
            var t;
            return t = e.promo
        }).filter(function(e) {
            return e
        }).map(function(e) {
            return {
                open: !0,
                view: e.view
            }
        })).toProperty({
            open: !1
        }), g = p.map(function(e) {
            var t;
            return t = e.language, m(t)
        }).toProperty(), l = p.combine(g, function(e, t) {
            var s, n, r, o, i, a;
            for (n = {}, i = e.locations, r = 0, o = i.length; o > r; r++) s = i[r], n[s.country_code] = t.messages.locations[null != (a = s.country_code) ? a.toLowerCase() : void 0] || s.location;
            return n
        }), y = v.changes().filter(function(e) {
            var t;
            return t = e.current, "home" === t
        }).map(function() {
            return Math.random()
        }).toProperty(Math.random()).combine(p, function(e, t) {
            var s, n, r; //@@ sửa user
            return n = [], t.user.is_premium && (s = new Date(t.user.premium_expires_at) - new Date(t.user.server_time), s = Math.ceil(s / 1e3 / 60 / 60 / 24), n.push(8 > s && !t.user.has_recurring_subscription ? "renew_subscription" : "premium_desktop_clients")), !t.user.is_premium && t.user.is_anonymous ? n.push("free_sign_up") : t.user.is_premium || (n = n.concat(["free_get_premium", "free_faster_speed", "free_desktop_clients", "free_smart_locations", "free_more_locations", "free_malware_blocking", "free_tracking_protection"])), r = Math.floor(e * n.length), n[r]
        }), c = null, n.combineAsArray(p, v, d, c, g, l, y).onValues(function(e, t, s, n, r, a, l) {
            return i.render(i.createElement(o, i.__spread({
                debug: n,
                header: s,
                routes: t,
                countryNames: a,
                randomNews: l
            }, r, e)), document.getElementById("app-container"))
        }), n.fromEventTarget(u, "toggleProxy").onValue(a, "send", "request:toggleProxy"), n.fromEventTarget(u, "openPage").onValue(a, "send", "request:openPage"), n.fromEventTarget(u, "signOut").onValue(function() {
            return a.send("request:signOut")
        }), n.fromEventTarget(u, "hideHeader").onValue(function(e) {
            return a.send("request:hide-" + e)
        }), n.fromEventTarget(u, "unblockProxySettings").onValue(function() {
            return a.send("request:unblockProxySettings")
        }), n.fromEventTarget(u, "confirmAccount").onValue(function() {
            return a.send("request:openPage", {
                url: "page.html#verify"
            }), a.send("request:confirmAccount")
        }), n.fromEventTarget(u, "changeLanguage").onValue(function(e) {
            return a.send("request:changeLanguage", e), location.hash = "home"
        }), n.fromEventTarget(u, "locations:change").onValue(function(e) {
            return location.hash = "home", a.send("request:changeLocation", e)
        }), n.fromEventTarget(u, "toggleMalware").onValue(function(e) {
            return a.send("request:toggleMalware", e)
        }), n.fromEventTarget(u, "toggleTracking").onValue(function(e) {
            return a.send("request:toggleTracking", e)
        }), n.fromEventTarget(u, "updateRules").onValue(function(e) {
            return a.send("request:updateRules", e)
        }), n.fromEventTarget(u, "toggleRules").onValue(function(e) {
            return a.send("request:toggleRules", e)
        }), a.send("request:popupOpen"), h.push(chrome.extension.getBackgroundPage().window.popupData), document.body.addEventListener("contextmenu", function(e) {
            return e.preventDefault()
        })
    }, {
        "../events": 8,
        "../message_handler": 10,
        "../router": 49,
        "./views/index": 31,
        loglevel: 3
    }],
    2: [function(e, t, s) {
        (function(e) {
            ! function(n) {
                function r(e) {
                    throw RangeError(C[e])
                }

                function o(e, t) {
                    for (var s = e.length; s--;) e[s] = t(e[s]);
                    return e
                }

                function i(e, t) {
                    return o(e.split(q), t).join(".")
                }

                function a(e) {
                    for (var t, s, n = [], r = 0, o = e.length; o > r;) t = e.charCodeAt(r++), t >= 55296 && 56319 >= t && o > r ? (s = e.charCodeAt(r++), 56320 == (64512 & s) ? n.push(((1023 & t) << 10) + (1023 & s) + 65536) : (n.push(t), r--)) : n.push(t);
                    return n
                }

                function l(e) {
                    return o(e, function(e) {
                        var t = "";
                        return e > 65535 && (e -= 65536, t += D(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += D(e)
                    }).join("")
                }

                function p(e) {
                    return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : w
                }

                function c(e, t) {
                    return e + 22 + 75 * (26 > e) - ((0 != t) << 5)
                }

                function u(e, t, s) {
                    var n = 0;
                    for (e = s ? j(e / N) : e >> 1, e += j(e / t); e > S * I >> 1; n += w) e = j(e / S);
                    return j(n + (S + 1) * e / (e + T))
                }

                function m(e) {
                    var t, s, n, o, i, a, c, m, d, h, g = [],
                        f = e.length,
                        y = 0,
                        v = x,
                        b = P;
                    for (s = e.lastIndexOf(k), 0 > s && (s = 0), n = 0; s > n; ++n) e.charCodeAt(n) >= 128 && r("not-basic"), g.push(e.charCodeAt(n));
                    for (o = s > 0 ? s + 1 : 0; f > o;) {
                        for (i = y, a = 1, c = w; o >= f && r("invalid-input"), m = p(e.charCodeAt(o++)), (m >= w || m > j((_ - y) / a)) && r("overflow"), y += m * a, d = b >= c ? R : c >= b + I ? I : c - b, !(d > m); c += w) h = w - d, a > j(_ / h) && r("overflow"), a *= h;
                        t = g.length + 1, b = u(y - i, t, 0 == i), j(y / t) > _ - v && r("overflow"), v += j(y / t), y %= t, g.splice(y++, 0, v)
                    }
                    return l(g)
                }

                function d(e) {
                    var t, s, n, o, i, l, p, m, d, h, g, f, y, v, b, E = [];
                    for (e = a(e), f = e.length, t = x, s = 0, i = P, l = 0; f > l; ++l) g = e[l], 128 > g && E.push(D(g));
                    for (n = o = E.length, o && E.push(k); f > n;) {
                        for (p = _, l = 0; f > l; ++l) g = e[l], g >= t && p > g && (p = g);
                        for (y = n + 1, p - t > j((_ - s) / y) && r("overflow"), s += (p - t) * y, t = p, l = 0; f > l; ++l)
                            if (g = e[l], t > g && ++s > _ && r("overflow"), g == t) {
                                for (m = s, d = w; h = i >= d ? R : d >= i + I ? I : d - i, !(h > m); d += w) b = m - h, v = w - h, E.push(D(c(h + b % v, 0))), m = j(b / v);
                                E.push(D(c(m, 0))), i = u(s, y, n == o), s = 0, ++n
                            }++s, ++t
                    }
                    return E.join("")
                }

                function h(e) {
                    return i(e, function(e) {
                        return M.test(e) ? m(e.slice(4).toLowerCase()) : e
                    })
                }

                function g(e) {
                    return i(e, function(e) {
                        return L.test(e) ? "xn--" + d(e) : e
                    })
                }
                var f = "object" == typeof s && s,
                    y = "object" == typeof t && t && t.exports == f && t,
                    v = "object" == typeof e && e;
                (v.global === v || v.window === v) && (n = v);
                var b, E, _ = 2147483647,
                    w = 36,
                    R = 1,
                    I = 26,
                    T = 38,
                    N = 700,
                    P = 72,
                    x = 128,
                    k = "-",
                    M = /^xn--/,
                    L = /[^ -~]/,
                    q = /\x2E|\u3002|\uFF0E|\uFF61/g,
                    C = {
                        overflow: "Overflow: input needs wider integers to process",
                        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                        "invalid-input": "Invalid input"
                    },
                    S = w - R,
                    j = Math.floor,
                    D = String.fromCharCode;
                if (b = {
                        version: "1.2.4",
                        ucs2: {
                            decode: a,
                            encode: l
                        },
                        decode: m,
                        encode: d,
                        toASCII: g,
                        toUnicode: h
                    }, "function" == typeof define && "object" == typeof define.amd && define.amd) define("punycode", function() {
                    return b
                });
                else if (f && !f.nodeType)
                    if (y) y.exports = b;
                    else
                        for (E in b) b.hasOwnProperty(E) && (f[E] = b[E]);
                else n.punycode = b
            }(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    3: [function(e, t, s) {
        ! function(s, n) {
            "object" == typeof t && t.exports && "function" == typeof e ? t.exports = n() : "function" == typeof define && "object" == typeof define.amd ? define(n) : s.log = n()
        }(this, function() {
            function e(e) {
                return typeof console === l ? !1 : void 0 !== console[e] ? t(console, e) : void 0 !== console.log ? t(console, "log") : a
            }

            function t(e, t) {
                var s = e[t];
                if ("function" == typeof s.bind) return s.bind(e);
                try {
                    return Function.prototype.bind.call(s, e)
                } catch (n) {
                    return function() {
                        return Function.prototype.apply.apply(s, [e, arguments])
                    }
                }
            }

            function s(e, t) {
                return function() {
                    typeof console !== l && (n(t), i[e].apply(i, arguments))
                }
            }

            function n(e) {
                for (var t = 0; t < p.length; t++) {
                    var s = p[t];
                    i[s] = e > t ? a : i.methodFactory(s, e)
                }
            }

            function r(e) {
                var t = (p[e] || "silent").toUpperCase();
                try {
                    return void(window.localStorage.loglevel = t)
                } catch (s) {}
                try {
                    window.document.cookie = "loglevel=" + t + ";"
                } catch (s) {}
            }

            function o() {
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
                a = function() {},
                l = "undefined",
                p = ["trace", "debug", "info", "warn", "error"];
            i.levels = {
                TRACE: 0,
                DEBUG: 1,
                INFO: 2,
                WARN: 3,
                ERROR: 4,
                SILENT: 5
            }, i.methodFactory = function(t, n) {
                return e(t) || s(t, n)
            }, i.setLevel = function(e, t) {
                if ("string" == typeof e && void 0 !== i.levels[e.toUpperCase()] && (e = i.levels[e.toUpperCase()]), !("number" == typeof e && e >= 0 && e <= i.levels.SILENT)) throw "log.setLevel() called with invalid level: " + e;
                return t !== !1 && r(e), n(e), typeof console === l && e < i.levels.SILENT ? "No console available for logging" : void 0
            }, i.enableAll = function(e) {
                i.setLevel(i.levels.TRACE, e)
            }, i.disableAll = function(e) {
                i.setLevel(i.levels.SILENT, e)
            };
            var c = typeof window !== l ? window.log : void 0;
            return i.noConflict = function() {
                return typeof window !== l && window.log === i && (window.log = c), i
            }, o(), i
        })
    }, {}],
    4: [function(e, t, s) {
        var n, r;
        r = e("loglevel"), n = {
            logLevel: "silent",
            apiURL: "https://api.zenguard.biz",
            newsServiceUrl: "https://news.zenmate.io",
            localDomains: ["zenguard.biz", "local", "dev", "ip", "box", "lvh.me", "ripe", "invalid", "intra", "intranet", "onion", "vcap.me", "zeus.pm", "127.0.0.1.xip.io", "smackaho.st", "localtest.me", "site", "about:addons", "about:newtab", "about:preferences", "about:config"],
            blackList: {
                "jid1-4P0kohSJxU1qGg@jetpack": "hola"
            },
            alternativeNodes: [{
                country_code: "US-ALT1",
                nodes: ["us-alt1-1.zenguard.org", "us-alt1-2.zenguard.org", "us-alt1-3.zenguard.org", "us-alt1-4.zenguard.org"]
            }],
            nodeOverrides: [{
                target_cc: "US",
                hosts: ["hulu.com"],
                premium_only: !0,
                nodes: "US-ALT1"
            }, {
                target_cc: "UW",
                hosts: ["hulu.com"],
                premium_only: !0,
                nodes: "US-ALT1"
            }],
            ruleOverrides: [{
                domains: ["facebook.com"],
                hosts: ["facebook.net", "fbcdn.com", "fbcdn.net", "fbstatic-a.akamaihd.net", "fbcdn-dragon-a.akamaihd.net"]
            }]
        }, n.setLogLevel = function(e) {
            return null != e ? (n.logLevel = e, r.setLevel(n.logLevel), console.info("logLevel:", n.logLevel)) : void 0
        }, n.setApiURL = function(e) {
            return null != e ? (n.apiURL = e, console.info("api:", n.apiURL)) : void 0
        }, n.setLogLevel("silent"), "undefined" != typeof window && null !== window && (window.config = n), t.exports = n
    }, {
        loglevel: 3
    }],
    5: [function(e, t, s) {
        var n;
        n = function() {
            function e() {
                this.listeners = {}
            }
            return e.prototype.off = function(e) {
                return this.listeners[e] = null
            }, e.prototype.on = function(e, t) {
                return this.listeners[e] = t
            }, e.prototype.trigger = function(e, t) {
                var s;
                return "function" == typeof(s = this.listeners)[e] ? s[e](t) : void 0
            }, e
        }(), t.exports = n
    }, {}],
    6: [function(e, t, s) {
        var n, r, o, i, a, l, p, c, u = {}.hasOwnProperty;
        n = e("./config"), c = e("./util"), i = e("loglevel"), r = {
            localDomains: n.localDomains,
            nodeOverrides: n.nodeOverrides,
            IPv4NotationRE: /^\d+\.\d+\.\d+\.\d+$/g,
            localIPsRE: /(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)/
        }, o = {
            data: r,
            nodeLookup: function(e, t) {
                return e[t] || !1
            },
            compareHosts: function(e, t) {
                var s, n, r;
                for (n = 0, r = e.length; r > n; n++)
                    if (s = e[n], this.matchWildcardDomain(t, s)) return s
            },
            compareURLs: function(e, t) {
                var s, n, r;
                for (n = 0, r = e.length; r > n; n++)
                    if (s = e[n], s.test(t)) return s
            },
            dnsDomainIs: function(e, t) {
                return e.length >= t.length && e.substring(e.length - t.length) === t
            },
            matchWildcardDomain: function(e, t) {
                var s, n, r;
                return s = e === t, r = e.slice(-t.length) === t, n = "." === e[e.lastIndexOf(t) - 1], s || r && n
            },
            matchNodeOverride: function(e, t) {
                var s, n, r;
                return n = function() {
                    var n, r, o, i;
                    for (o = this.data.nodeOverrides, i = [], n = 0, r = o.length; r > n; n++) s = o[n], s.target_cc === t && this.compareHosts(s.hosts, e) && i.push(s);
                    return i
                }.call(this), (null != n && null != (r = n[0]) ? r.nodes : void 0) || !1
            },
            matchRules: function(e, t, s) {
                var r, o, i, l;
                if ((null != e ? e.length : void 0) > 0)
                    for (null == this.data.rulesWithOverrides && (e = a(e, n.ruleOverrides)), r = i = 0, l = e.length; l > i; r = ++i)
                        if (o = e[r], this.matchWildcardDomain(t, o.domain) || null != o.hosts && this.compareHosts(o.hosts, t)) return r
            },
            _getProxyState: function(e, t, s) {
                var n, r, o, i, a;
                if (e = e.toLowerCase(), this.data.IPv4NotationRE.lastIndex = 0, this.data.localIPsRE.lastIndex = 0, !~t.indexOf(".") && !~t.indexOf(":")) return "LOCAL";
                if (this.data.IPv4NotationRE.test(t) && this.data.localIPsRE.test(t)) return "LOCAL";
                for (a = this.data.localDomains, o = 0, i = a.length; i > o; o++)
                    if (n = a[o], this.matchWildcardDomain(t, n)) return "LOCAL";
                return r = this.matchRules(s, t, e), null != r ? s[r].cc : "DEFAULT"
            }
        }, p = function(e) {
            var t, s, n;
            null == e && (e = o), s = [];
            for (t in e)
                if (u.call(e, t)) switch (n = e[t], typeof e[t]) {
                    case "function":
                        s.push("" + t + ": " + n.toString());
                        break;
                    case "object":
                        s.push("" + t + ": " + JSON.stringify(e[t]))
                }
                return "{ " + s.join(",") + " }"
        }, a = function(e, t) {
            var s, n, r, o, i, a;
            if (!((null != e ? e.length : void 0) > 0)) return [];
            if (!((null != t ? t.length : void 0) > 0)) return e;
            for (r = 0, i = e.length; i > r; r++)
                for (n = e[r], o = 0, a = t.length; a > o; o++) s = t[o], s.domains.indexOf(n.domain) > -1 && (n.hosts = c.concatUnique(n.hosts || [], s.hosts || []));
            return e
        }, l = "e.data.IPv4NotationRE = " + r.IPv4NotationRE.toString() + ";\ne.data.localIPsRE = " + r.localIPsRE.toString() + ";", s.exportPAC = function(e, t, s, r) {
            var o;
            return null == s && (s = []), null == r && (r = []), o = "/*ZenMate*/\nfunction FindProxyForURL(url, host) {\n\n  var e = " + p() + ";\n  e.data.localDomains = e.data.localDomains.concat(" + JSON.stringify(r) + ");\n  " + l + "\n\n  e.data.defaultLocation = '" + e + "';\n  e.data.nodeDict = " + JSON.stringify(t) + ";\n  e.data.rulesWithOverrides = " + JSON.stringify(a(s, n.ruleOverrides)) + ";\n\n  var res = e._getProxyState(url, host, e.data.rulesWithOverrides);\n\n  if (res === 'LOCAL' || res === 'DIRECT' || res === 'OFF') {return 'DIRECT'};\n  if (res === 'DEFAULT') {cc = e.data.defaultLocation} else {cc = res};\n\n  var override = e.matchNodeOverride(host, cc);\n  if (override) {cc = override};\n\n  return e.nodeLookup(e.data.nodeDict, cc) || 'DIRECT';\n}"
        }, s.getProxyStateByURL = function(e, t, s) {
            return null == s && (s = []), t = t || c.parseURL(e).host || e, o._getProxyState(e, t, s)
        }, s.getNodeDictFromLocations = function(e, t, s) {
            var r, o, i, a, l;
            for (e = e.concat(n.alternativeNodes), o = {}, a = 0, l = e.length; l > a; a++) r = e[a], i = r.nodes.slice(0, 15).map(function(e) {
                var t;
                return t = e.replace("node.zenmate.io", "zenguard.org").replace("node.zenguard.co", "zenguard.co"), s ? t : "HTTPS " + t + ":443"
            }), o[r.country_code] = i.join(";");
            return o
        }, s.matchRules = function(e, t, s) {
            return o.matchRules(e, t, s)
        }
    }, {
        "./config": 4,
        "./util": 7,
        loglevel: 3
    }],
    7: [function(e, t, s) {
        var n;
        n = e("./config"), s.generateInstallId = function() {
            var e;
            return e = function() {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            }, e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
        }, s.parseURL = function(e) {
            var t, s, n;
            return s = /^([^:]+):\/\/([^\/:]*)(?::([\d]+))?(?:(\/[^#]*)(?:#(.*))?)?$/i, t = e.match(s), t ? {
                scheme: t[1].toLowerCase(),
                host: t[2].toLowerCase(),
                port: t[3],
                path: t[4] || "/",
                fragment: t[5],
                local: "http" !== (n = t[1].toLowerCase()) && "https" !== n
            } : {}
        }, s.getUTMSourcesFromURL = function(e) {
            var t, n, r, o;
            for (n = s.parseURL(e).path, r = /[?&]([^=#]+)=([^&#]*)/g, o = []; t = r.exec(n);) 0 === t[1].indexOf("utm_") && o.push("" + t[1] + "=" + t[2]);
            return o.join(";")
        }, s.concatUnique = function(e, t) {
            return e.concat(t).filter(function(e, t, s) {
                return s.indexOf(e) === t
            })
        }
    }, {
        "./config": 4
    }],
    8: [function(e, t, s) {
        var n;
        n = e("../../background/emitter"), t.exports = new n
    }, {
        "../../background/emitter": 5
    }],
    9: [function(e, t, s) {
        var n, r;
        n = window.React, r = e("./events"), t.exports = n.createClass({
            displayName: "Link",
            _openLink: function(e) {
                var t;
                return e.preventDefault(), (null != (t = this.props) ? t.clickAction : void 0) && this.props.clickAction(), r.trigger("openPage", {
                    url: this.props.url,
                    ga: this.props.ga,
                    params: this.props.params
                })
            },
            render: function() {
                return n.createElement("a", n.__spread({
                    href: this.props.url,
                    onClick: this._openLink
                }, this.props), this.props.children)
            }
        })
    }, {
        "./events": 8
    }],
    10: [function(e, t, s) {
        var n, r, o, i = {}.hasOwnProperty,
            a = function(e, t) {
                function s() {
                    this.constructor = e
                }
                for (var n in t) i.call(t, n) && (e[n] = t[n]);
                return s.prototype = t.prototype, e.prototype = new s, e.__super__ = t.prototype, e
            };
        n = e("../../background/emitter"), o = e("loglevel"), r = function(e) {
            function t(e) {
                var s, n;
                this.name = e, t.__super__.constructor.call(this), this.port = null != ("undefined" != typeof chrome && null !== chrome && null != (s = chrome.runtime) ? s.connect : void 0) ? chrome.runtime.connect({
                    name: this.name
                }) : ("undefined" != typeof addon && null !== addon ? addon.port : void 0) ? addon.port : null != ("undefined" != typeof self && null !== self ? self.port : void 0) ? self.port : void 0, null != (null != (n = this.port.onMessage) ? n.addListener : void 0) ? this.port.onMessage.addListener(this.handleMessage.bind(this)) : null != this.port.on && this.port.on(this.name, this.handleMessage.bind(this))
            }
            return a(t, e), t.prototype.handleMessage = function(e) {
                var t, s;
                return "function" == typeof(t = this.listeners)[s = e.subject] ? t[s](e.payload) : void 0
            }, t.prototype.send = function(e, t) {
                var s;
                return null == t && (t = null), s = {
                    subject: e,
                    payload: t,
                    timestamp: (new Date).valueOf()
                }, null != this.port.postMessage ? this.port.postMessage(s) : null != this.port.emit ? this.port.emit(this.name, s) : void 0
            }, t
        }(n), t.exports = r
    }, {
        "../../background/emitter": 5,
        loglevel: 3
    }],
    11: [function(e, t, s) {
        var n, r;
        r = window.React, n = e("./header"), t.exports = r.createClass({
            displayName: "DebugPage",
            propTypes: {
                header: r.PropTypes.object.isRequired,
                device: r.PropTypes.object.isRequired,
                routes: r.PropTypes.object.isRequired,
                defaultLocation: r.PropTypes.object.isRequired,
                debug: r.PropTypes.object.isRequired,
                is_premium: r.PropTypes.bool.isRequired
            },
            render: function() {
                var e, t, s;
                return r.createElement("div", null, r.createElement(n, {
                    showBack: !0,
                    header: this.props.header,
                    device: this.props.device,
                    routes: this.props.routes,
                    is_premium: this.props.is_premium
                }), r.createElement("div", {
                    className: "debug-container"
                }, null != this.props.defaultLocation ? r.createElement("section", null, r.createElement("h3", null, "Connection"), r.createElement("p", null, "Currently connected to ", this.props.defaultLocation.country_name), r.createElement("p", null, "Nodes in order of likeliness to be active:"), r.createElement("ol", null, function() {
                    var e, s, n, o;
                    for (n = this.props.defaultLocation.nodes, o = [], e = 0, s = n.length; s > e; e++) t = n[e], o.push(r.createElement("li", {
                        key: t
                    }, t));
                    return o
                }.call(this))) : void 0, r.createElement("section", null, r.createElement("h3", null, "Debug Overrides"), r.createElement("ul", null, function() {
                    var t, n;
                    t = this.props.debug, n = [];
                    for (e in t) s = t[e], n.push(r.createElement("li", {
                        key: e
                    }, r.createElement("strong", null, e), ":", r.createElement("span", null, s)));
                    return n
                }.call(this)))))
            }
        })
    }, {
        "./header": 15
    }],
    12: [function(e, t, s) {
        var n, r;
        r = window.React, n = r.addons.PureRenderMixin, t.exports = r.createClass({
            displayName: "FeatureItem",
            mixins: [n],
            propTypes: {
                onClick: r.PropTypes.func,
                onChange: r.PropTypes.func,
                icon: r.PropTypes.string.isRequired,
                iconRetina: r.PropTypes.string.isRequired,
                label: r.PropTypes.string.isRequired,
                description: r.PropTypes.string.isRequired,
                enabled: r.PropTypes.bool,
                arrow: r.PropTypes.bool
            },
            render: function() {
                return r.createElement("li", {
                    onClick: this.props.onClick,
                    className: "feature-item"
                }, r.createElement("img", {
                    className: "icon " + (this.props.enabled === !1 ? "disabled" : ""),
                    src: this.props.icon,
                    srcSet: "" + this.props.iconRetina + " 2x"
                }), r.createElement("span", {
                    className: "name"
                }, this.props.label), this.props.onChange ? r.createElement("label", {
                    className: "flat-switch"
                }, r.createElement("input", {
                    onChange: this.props.onChange,
                    checked: this.props.enabled,
                    type: "checkbox",
                    className: "flat-switch-checkbox"
                }), r.createElement("div", {
                    className: "flat-toggle"
                })) : void 0, this.props.arrow ? r.createElement("span", {
                    className: "arrow"
                }) : void 0, r.createElement("span", {
                    className: "description"
                }, this.props.description))
            }
        })
    }, {}],
    13: [function(e, t, s) {
        var n, r, o, i, a;
        i = window.React, o = window.ReactIntl.IntlMixin, r = e("../header"), a = e("../../../events"), n = e("./feature_item"), t.exports = i.createClass({
            displayName: "Features",
            mixins: [o],
            propTypes: {
                routes: i.PropTypes.object.isRequired,
                header: i.PropTypes.object.isRequired,
                user: i.PropTypes.object.isRequired,
                device: i.PropTypes.object.isRequired,
                features: i.PropTypes.object.isRequired,
                messages: i.PropTypes.object.isRequired
            },
            toggleMalware: function(e) {
                return a.trigger("toggleMalware", e.target.checked)
            },
            toggleTracking: function(e) {
                return a.trigger("toggleTracking", e.target.checked)
            },
            teaser: function(e) {
                return e.preventDefault(), a.trigger("header", {
                    open: !0
                })
            },
            render: function() {
                return this.props.user ? i.createElement("div", {
                    id: "features"
                }, i.createElement(r, {
                    showBack: !0,
                    header: this.props.header,
                    device: this.props.device,
                    routes: this.props.routes,
                    is_premium: this.props.user.is_premium
                }), i.createElement("section", {
                    className: "feature-head " + (this.props.header.open ? "fade" : "") + " " + (this.props.user.is_premium ? "" : "teaser")
                }, i.createElement("div", {
                    className: "premium-title"
                }, i.createElement("hr", null), i.createElement("span", null, this.getIntlMessage("popup.features.premium_title")), i.createElement("hr", null)), i.createElement("ul", null, i.createElement("a", {
                    href: "#rules"
                }, i.createElement(n, {
                    icon: "images/smartLocationsIcon.png",
                    iconRetina: "images/smartLocationsIcon@2x.png",
                    label: this.getIntlMessage("popup.features.on_demand"),
                    description: this.getIntlMessage("popup.features.on_demand_description"),
                    arrow: !0
                })), i.createElement(n, {
                    onClick: this.props.user.is_premium ? null : this.teaser,
                    onChange: this.toggleMalware,
                    icon: "images/antiMalwareIcon.png",
                    iconRetina: "images/antiMalwareIcon@2x.png",
                    label: this.getIntlMessage("popup.features.malware_blocking"),
                    description: this.getIntlMessage("popup.features.malware_blocking_description"),
                    enabled: this.props.features.malwareBlocking
                }), i.createElement(n, {
                    onClick: this.props.user.is_premium ? null : this.teaser,
                    onChange: this.toggleTracking,
                    icon: "images/trackingProtectionIcon.png",
                    iconRetina: "images/trackingProtectionIcon@2x.png",
                    label: this.getIntlMessage("popup.features.tracking_protection"),
                    description: this.getIntlMessage("popup.features.tracking_protection_description"),
                    enabled: this.props.features.trackingProtection
                }))), i.createElement("section", {
                    className: "features-section"
                }, i.createElement("div", {
                    className: "builtin-title"
                }, i.createElement("span", null, this.getIntlMessage("popup.features.builtin_title")), i.createElement("hr", null)), i.createElement("div", {
                    className: "builtin-container"
                }, i.createElement("span", {
                    className: "builtin-feature always-on"
                }, i.createElement("strong", null, this.getIntlMessage("popup.features.always_on.first")), this.getIntlMessage("popup.features.always_on.second")), i.createElement("div", {
                    className: "info-bubble left"
                }, this.getIntlMessage("popup.features.always_on.description")), i.createElement("span", {
                    className: "builtin-feature nat"
                }, i.createElement("strong", null, this.getIntlMessage("popup.features.nat_firewall.first")), this.getIntlMessage("popup.features.nat_firewall.second")), i.createElement("div", {
                    className: "info-bubble center"
                }, this.getIntlMessage("popup.features.nat_firewall.description")), i.createElement("span", {
                    className: "builtin-feature encryption"
                }, this.getIntlMessage("popup.features.encrypted.first")), i.createElement("div", {
                    className: "info-bubble right"
                }, this.getIntlMessage("popup.features.encrypted.description"))))) : i.createElement("div", null)
            }
        })
    }, {
        "../../../events": 8,
        "../header": 15,
        "./feature_item": 12
    }],
    14: [function(e, t, s) {
        var n, r, o, i, a;
        i = window.React, o = e("../../../link"), a = window.ReactIntl, r = a.IntlMixin, n = a.FormattedMessage, t.exports = i.createClass({
            displayName: "Earlybird",
            mixins: [r],
            propTypes: {
                close: i.PropTypes.func.isRequired,
                params: i.PropTypes.shape
            },
            render: function() {
                return i.createElement("div", {
                    className: "header-body"
                }, i.createElement("div", {
                    className: "features-container"
                }, i.createElement("h3", {
                    className: "earlybird-header"
                }, this.getIntlMessage("popup.premium.earlybird.header")), i.createElement("div", {
                    className: "earlybird-copy"
                }, i.createElement(n, {
                    message: this.getIntlMessage("popup.premium.earlybird.copy"),
                    special_discount: i.createElement("strong", null, this.getIntlMessage("popup.premium.earlybird.special_discount"))
                })), i.createElement("img", {
                    className: "discount-graphic",
                    src: "images/discountGraphic.png",
                    srcSet: "images/discountGraphic@2x.png 2x"
                }), i.createElement("img", {
                    className: "discount-lines",
                    src: "images/linesAndIcons.png",
                    srcSet: "images/linesAndIcons@2x.png 2x"
                }), i.createElement("div", {
                    className: "feature-names"
                }, i.createElement("span", null, this.getIntlMessage("popup.premium.earlybird.speed")), i.createElement("span", null, this.getIntlMessage("popup.premium.earlybird.locations")), i.createElement("span", null, this.getIntlMessage("popup.premium.earlybird.clients")))), i.createElement(o, {
                    clickAction: this.props.close,
                    url: "https://secure.zenmate.com#/upgrade",
                    params: this.props.params,
                    ga: {
                        utm_medium: "earlybird"
                    },
                    className: "cta-button"
                }, this.getIntlMessage("popup.premium.cta")))
            }
        })
    }, {
        "../../../link": 9
    }],
    15: [function(e, t, s) {
        var n, r, o, i, a, l, p;
        i = window.React, p = e("../../../events"), l = e("./trial"), n = e("./earlybird"), o = e("./premium"), r = window.ReactIntl.IntlMixin, a = i.addons.CSSTransitionGroup, t.exports = i.createClass({
            displayName: "Header",
            mixins: [r],
            propTypes: {
                routes: i.PropTypes.object.isRequired,
                header: i.PropTypes.object.isRequired,
                device: i.PropTypes.object.isRequired,
                is_premium: i.PropTypes.bool.isRequired,
                showBack: i.PropTypes.bool.isRequired
            },
            _close: function() {
                return p.trigger("hideHeader", this.props.header.view), p.trigger("header", {
                    open: !1
                })
            },
            render: function() {
                var e, t, s;
                return e = {
                    uuid: this.props.device.uuid,
                    token: this.props.device.token,
                    src: "{browser}",
                    promo_code: "show"
                }, t = this.props.routes.previous ? "" + this.props.routes.previous + "-" : "", s = "" + t + this.props.routes.current, i.createElement("header", {
                    className: this.props.header.open ? "open" : ""
                }, this.props.showBack && !this.props.header.open ? i.createElement("a", {
                    className: "back left",
                    href: "#" + this.props.routes.previous
                }) : this.props.header.open ? i.createElement("button", {
                    className: "close",
                    onClick: this._close
                }) : void 0, this.props.is_premium || this.props.header.open ? i.createElement("img", {
                    className: "logo",
                    src: "images/zenmate-premium.png",
                    srcSet: "images/zenmate-premium@2x.png 2x"
                }) : i.createElement("img", {
                    className: "logo",
                    src: "images/zenmateLogo.png",
                    srcSet: "images/zenmateLogo@2x.png 2x"
                }), i.createElement(a, {
                    component: "div",
                    transitionName: "header-body"
                }, function() {
                    if (this.props.header.open) switch (this.props.header.view) {
                        case "trialExpired":
                            return i.createElement(l, {
                                close: this._close,
                                params: e
                            });
                        case "earlybird":
                            return i.createElement(n, {
                                close: this._close,
                                params: e
                            });
                        default:
                            return i.createElement(o, {
                                utm_medium: s,
                                params: e
                            })
                    }
                }.call(this)))
            }
        })
    }, {
        "../../../events": 8,
        "./earlybird": 14,
        "./premium": 16,
        "./trial": 17
    }],
    16: [function(e, t, s) {
        var n, r, o;
        o = window.React, n = window.ReactIntl.IntlMixin, r = e("../../../link"), t.exports = o.createClass({
            displayName: "PremiumHeader",
            mixins: [n],
            propTypes: {
                utm_medium: o.PropTypes.string.isRequired,
                params: o.PropTypes.shape
            },
            render: function() {
                return o.createElement("div", {
                    className: "header-body"
                }, o.createElement("div", {
                    className: "features-container"
                }, o.createElement("div", {
                    className: "premium-features speed"
                }, o.createElement("h3", null, this.getIntlMessage("popup.premium.speed.heading")), o.createElement("span", null, this.getIntlMessage("popup.premium.speed.copy"))), o.createElement("div", {
                    className: "premium-features locations"
                }, o.createElement("h3", null, this.getIntlMessage("popup.premium.locations.heading")), o.createElement("span", null, this.getIntlMessage("popup.premium.locations.copy"))), o.createElement("div", {
                    className: "premium-features clients"
                }, o.createElement("h3", null, this.getIntlMessage("popup.premium.clients.heading")), o.createElement("span", null, this.getIntlMessage("popup.premium.clients.copy")))), o.createElement(r, {
                    url: "https://secure.zenmate.com#/upgrade",
                    params: this.props.params,
                    ga: {
                        utm_medium: this.props.utm_medium
                    },
                    className: "cta-button"
                }, this.getIntlMessage("popup.premium.cta")))
            }
        })
    }, {
        "../../../link": 9
    }],
    17: [function(e, t, s) {
        var n, r, o;
        o = window.React, n = window.ReactIntl.IntlMixin, r = e("../../../link"), t.exports = o.createClass({
            displayName: "TrialHeader",
            mixins: [n],
            propTypes: {
                close: o.PropTypes.func.isRequired,
                params: o.PropTypes.shape,
                uuid: o.PropTypes.string.isRequired,
                token: o.PropTypes.string.isRequired
            },
            render: function() {
                return o.createElement("div", {
                    className: "header-body"
                }, o.createElement("div", {
                    className: "features-container expired"
                }, o.createElement("h3", {
                    className: "earlybird-header"
                }, this.getIntlMessage("popup.header.trial.trial_ended")), o.createElement("div", {
                    className: "expired-copy"
                }, this.getIntlMessage("popup.header.trial.copy"))), o.createElement("div", {
                    className: "plan-select active"
                }, o.createElement("img", {
                    className: "plan-icon",
                    src: "images/premium-shield-yearly.png",
                    srcSet: "images/premium-shield-yearly@2x.png 2x"
                }), o.createElement("div", {
                    className: "plan-price"
                }, o.createElement("h4", null, this.getIntlMessage("popup.header.trial.yearly.name")), o.createElement("span", null, this.getIntlMessage("popup.header.trial.yearly.price"))), o.createElement("div", {
                    className: "cta-save"
                }, o.createElement(r, {
                    clickAction: this.props.close,
                    url: "https://secure.zenmate.com#/orders/new/com.zenmate.adyen.12month.v1",
                    params: this.props.params,
                    ga: {
                        utm_medium: "expired-yearly"
                    },
                    className: "cta-button plan"
                }, this.getIntlMessage("popup.header.trial.yearly.cta")), o.createElement("span", null, this.getIntlMessage("popup.header.trial.yearly.save")))), o.createElement("div", {
                    className: "plan-select"
                }, o.createElement("img", {
                    className: "plan-icon",
                    src: "images/premium-shield-6-months.png",
                    srcSet: "images/premium-shield-6-months@2x.png 2x"
                }), o.createElement("div", {
                    className: "plan-price"
                }, o.createElement("h4", null, this.getIntlMessage("popup.header.trial.six_monthly.name")), o.createElement("span", null, this.getIntlMessage("popup.header.trial.six_monthly.price"))), o.createElement(r, {
                    clickAction: this.props.close,
                    url: "https://secure.zenmate.com#/orders/new/com.zenmate.adyen.6month.v1",
                    params: this.props.params,
                    ga: {
                        utm_medium: "expired-monthly"
                    },
                    className: "outline-button plan"
                }, this.getIntlMessage("popup.header.trial.six_monthly.cta"))), o.createElement("div", {
                    className: "plan-select"
                }, o.createElement("img", {
                    className: "plan-icon",
                    src: "images/premium-shield-1-month.png",
                    srcSet: "images/premium-shield-1-month@2x.png 2x"
                }), o.createElement("div", {
                    className: "plan-price"
                }, o.createElement("h4", null, this.getIntlMessage("popup.header.trial.monthly.name")), o.createElement("span", null, this.getIntlMessage("popup.header.trial.monthly.price"))), o.createElement(r, {
                    clickAction: this.props.close,
                    url: "https://secure.zenmate.com#/orders/new/com.zenmate.adyen.1month.v1",
                    params: this.props.params,
                    ga: {
                        utm_medium: "expired-monthly"
                    },
                    className: "outline-button plan"
                }, this.getIntlMessage("popup.header.trial.monthly.cta"))))
            }
        })
    }, {
        "../../../link": 9
    }],
    18: [function(e, t, s) {
        var n, r, o, i, a, l, p;
        a = window.React, i = e("./news"), l = e("../../../events"), o = e("../../../link"), p = window.ReactIntl, r = p.IntlMixin, n = p.FormattedMessage, t.exports = a.createClass({
            displayName: "Bottom",
            mixins: [r],
            propTypes: {
                randomNews: a.PropTypes.string.isRequired,
                user: a.PropTypes.object.isRequired,
                device: a.PropTypes.object.isRequired,
                rules: a.PropTypes.array.isRequired,
                news: a.PropTypes.any,
                language: a.PropTypes.string.isRequired
            },
            _onPremiumClick: function(e) {
                return e.preventDefault(), l.trigger("header", {
                    open: !0
                })
            },
            _onEarlyBirdClick: function(e) {
                return e.preventDefault(), l.trigger("header", {
                    open: !0,
                    view: "earlybird"
                })
            },
            _getMessage: function(e) {
                var t, s;
                switch (t = {
                    uuid: this.props.device.uuid,
                    token: this.props.device.token,
                    src: "{browser}",
                    promo_code: "show"
                }, e) {
                    case "premium_account_page":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.premium.all_benefits.copy"),
                            account_page: a.createElement(o, {
                                url: "https://secure.zenmate.com#/",
                                params: t,
                                ga: {
                                    utm_medium: "home-account_page"
                                }
                            }, this.getIntlMessage("popup.home.news.premium.all_benefits.account_page"))
                        });
                    case "premium_support":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.premium.support.copy"),
                            support_team: a.createElement(o, {
                                url: "https://support.zenmate.com",
                                params: {
                                    premium: !0
                                }
                            }, this.getIntlMessage("popup.home.news.premium.support.support_team"))
                        });
                    case "premium_smart_locations":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.premium.smart_locations.copy"),
                            smart_locations: a.createElement("a", {
                                href: "#rules"
                            }, this.getIntlMessage("popup.home.news.premium.smart_locations.smart_locations"))
                        });
                    case "premium_desktop_clients":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.premium.desktop_clients.copy"),
                            desktop_clients: a.createElement(o, {
                                url: "https://secure.zenmate.com#/",
                                params: t,
                                ga: {
                                    utm_medium: "home-premium_desktop_clients"
                                }
                            }, this.getIntlMessage("popup.home.news.premium.desktop_clients.desktop_clients"))
                        });
                    case "premium_malware_blocking":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.premium.malware_blocking.copy"),
                            malware_blocking: a.createElement("a", {
                                href: "#features"
                            }, this.getIntlMessage("popup.home.news.premium.malware_blocking.malware_blocking"))
                        });
                    case "premium_tracking_protection":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.premium.tracking_protection.copy"),
                            tracking_protection: a.createElement("a", {
                                href: "#features"
                            }, this.getIntlMessage("popup.home.news.premium.tracking_protection.tracking_protection"))
                        });
                    case "renew_subscription":
                        return s = new Date(this.props.user.premium_expires_at) - new Date(this.props.user.server_time), s = Math.ceil(s / 1e3 / 60 / 60 / 24), a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.premium.renew_subscription.copy"),
                            num: s,
                            renew_subscription: a.createElement(o, {
                                url: "https://secure.zenmate.com#/",
                                params: t,
                                ga: {
                                    utm_medium: "home-renew_subscription"
                                }
                            }, this.getIntlMessage("popup.home.news.premium.renew_subscription.renew_subscription"))
                        });
                    case "free_earlybird":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.free.earlybird.copy"),
                            premium_discount: a.createElement("a", {
                                href: "#",
                                onClick: this._onEarlyBirdClick
                            }, this.getIntlMessage("popup.home.news.free.earlybird.premium_discount"))
                        });
                    case "free_sign_up":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.free.sign_up.copy"),
                            get_time_free: a.createElement(o, {
                                url: "page.html#signup"
                            }, this.getIntlMessage("popup.home.news.free.sign_up.get_time_free"))
                        });
                    case "free_get_premium":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.free.get_premium"),
                            zenmate_premium: a.createElement("a", {
                                href: "#",
                                onClick: this._onPremiumClick
                            }, this.getIntlMessage("brand.zenmate_premium"))
                        });
                    case "free_faster_speed":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.free.faster_speed"),
                            zenmate_premium: a.createElement(o, {
                                url: "https://secure.zenmate.com#/upgrade",
                                params: t,
                                ga: {
                                    utm_medium: "home-faster_speed"
                                }
                            }, this.getIntlMessage("brand.zenmate_premium"))
                        });
                    case "free_smart_locations":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.free.smart_locations"),
                            zenmate_premium: a.createElement(o, {
                                url: "https://secure.zenmate.com#/upgrade",
                                params: t,
                                ga: {
                                    utm_medium: "home-smart_locations"
                                }
                            }, this.getIntlMessage("brand.zenmate_premium"))
                        });
                    case "free_more_locations":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.free.more_locations"),
                            zenmate_premium: a.createElement(o, {
                                url: "https://secure.zenmate.com#/upgrade",
                                params: t,
                                ga: {
                                    utm_medium: "home-more_locations"
                                }
                            }, this.getIntlMessage("brand.zenmate_premium"))
                        });
                    case "free_malware_blocking":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.free.malware_blocking.copy"),
                            malware_blocking: a.createElement(o, {
                                url: "https://secure.zenmate.com#/upgrade",
                                params: t,
                                ga: {
                                    utm_medium: "home-malware_blocking"
                                }
                            }, this.getIntlMessage("popup.home.news.free.malware_blocking.malware_blocking"))
                        });
                    case "free_desktop_clients":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.free.desktop_clients.copy"),
                            desktop_clients: a.createElement(o, {
                                url: "https://secure.zenmate.com#/upgrade",
                                params: t,
                                ga: {
                                    utm_medium: "home-free_desktop_clients"
                                }
                            }, this.getIntlMessage("popup.home.news.free.desktop_clients.desktop_clients"))
                        });
                    case "free_tracking_protection":
                        return a.createElement(n, {
                            message: this.getIntlMessage("popup.home.news.free.tracking_protection"),
                            zenmate_premium: a.createElement(o, {
                                url: "https://secure.zenmate.com#/upgrade",
                                params: t,
                                ga: {
                                    utm_medium: "home-tracking_protection"
                                }
                            }, this.getIntlMessage("brand.zenmate_premium"))
                        })
                }
            },
            render: function() {
                return a.createElement("section", {
                    className: "footer-news"
                }, a.createElement("hr", null), ''
					 )
            }
        })
    }, {
        "../../../events": 8,
        "../../../link": 9,
        "./news": 28
    }],
    19: [function(e, t, s) {
        var n, r;
        r = window.React, n = window.ReactIntl.IntlMixin, t.exports = r.createClass({
            displayName: "ConnectionDisplay",
            mixins: [n],
            propTypes: {
                type: r.PropTypes.string.isRequired,
                user: r.PropTypes.object.isRequired,
                tabInfo: r.PropTypes.object.isRequired,
                countryNames: r.PropTypes.object.isRequired,
                currentLocation: r.PropTypes.object.isRequired
            },
            componentDidMount: function() {
                var e;
                return e = new Image, e.src = this.props.tabInfo.favIconUrl, e.onerror = function(e) {
                    return function() {
                        return e.refs.host.getDOMNode().style.backgroundImage = null
                    }
                }(this)
            },
            render: function() {
                return r.createElement("div", {
                    className: "connection-details " + this.props.type
                }, r.createElement("div", {
                    className: "text text-1"
                }), r.createElement("div", {
                    className: "text text-2"
                }), r.createElement("div", {
                    className: "mask"
                }), r.createElement("div", {
                    className: "flag flag-user",
                    style: {
                        backgroundImage: "url('images/flags/" + this.props.user.country_code + ".png')"
                    }
                }), r.createElement("div", {
                    className: "flag flag-location",
                    style: {
                        backgroundImage: "url('images/flags/" + this.props.currentLocation.country_code + ".png')"
                    }
                }), r.createElement("div", {
                    className: "host",
                    ref: "host",
                    style: {
                        backgroundImage: "url('" + this.props.tabInfo.favIconUrl + "')"
                    }
                }), r.createElement("div", {
                    className: "overlay overlay-user tt tt-conn tt-left"
                }, r.createElement("span", {
                    className: "overlay-content"
                }, r.createElement("div", null, this.getIntlMessage("popup.home.enabled.overlay.real_location")), r.createElement("div", {
                    className: "space dark"
                }, this.props.countryNames[this.props.user.country_code] || this.props.user.country_name), r.createElement("div", null, "IP: " + this.props.user.current_ip))), r.createElement("a", {
                    href: "#locations",
                    className: "overlay overlay-location tt tt-conn switchLocation"
                }, r.createElement("span", {
                    className: "overlay-content"
                }, r.createElement("div", null, this.getIntlMessage("popup.home.enabled.overlay.public_location")), r.createElement("div", {
                    className: "space dark"
                }, this.props.countryNames[this.props.currentLocation.country_code]), r.createElement("div", null, "(", this.getIntlMessage("popup.home.enabled.overlay.click_to_change"), ")"))), r.createElement("a", {
                    href: "#rules",
                    className: "overlay overlay-rules tt tt-conn tt-right"
                }, r.createElement("span", {
                    className: "overlay-content"
                }, r.createElement("div", null, this.getIntlMessage("popup.home.enabled.overlay.current_page")), r.createElement("div", {
                    className: "space dark hostDomain"
                }, this.props.tabInfo.host), r.createElement("div", null, "(", this.getIntlMessage("popup.home.enabled.overlay.edit_ondemand"), ")"))))
            }
        })
    }, {}],
    20: [function(e, t, s) {
        var n, r, o, i, a, l;
        i = window.React, a = e("../../../../events"), o = e("../../../../link"), l = window.ReactIntl, r = l.IntlMixin, n = l.FormattedMessage, t.exports = i.createClass({
            displayName: "BlockedDescription",
            mixins: [r],
            propTypes: {
                proxyBlocked: i.PropTypes.bool.isRequired,
                proxyBlockedBy: i.PropTypes.array
            },
            _unblock: function() {
                return a.trigger("unblockProxySettings")
            },
            render: function() {
                var e, t;
                return i.createElement("div", {
                    className: "fresh-air"
                }, (t = i.createElement(o, {
                    url: "chrome://extensions"
                }, this.getIntlMessage("popup.home.blocked.extension_settings")), null != this.props.proxyBlockedBy && this.props.proxyBlockedBy.length ? i.createElement(n, {
                    extension_settings: t,
                    message: this.getIntlMessage("popup.home.blocked.extension")
                }) : i.createElement(n, {
                    extension_settings: t,
                    message: this.getIntlMessage("popup.home.blocked.unknown")
                })), function() {
                    var t, s, n, r;
                    if (null != this.props.proxyBlockedBy && this.props.proxyBlockedBy.length) {
                        for (n = this.props.proxyBlockedBy.slice(0, 1), r = [], t = 0, s = n.length; s > t; t++) e = n[t], r.push(i.createElement("div", {
                            className: "blocked-container"
                        }, i.createElement("br", null), e.icon ? i.createElement("img", {
                            className: "blocked-icon",
                            src: "" + e.icon
                        }) : void 0, i.createElement(o, {
                            url: "chrome://extensions/",
                            params: {
                                id: e.id
                            }
                        }, e.name)));
                        return r
                    }
                    return i.createElement("button", {
                        onClick: this._unblock,
                        className: "unblock-settings"
                    }, this.getIntlMessage("popup.home.blocked.unblock"))
                }.call(this))
            }
        })
    }, {
        "../../../../events": 8,
        "../../../../link": 9
    }],
    21: [function(e, t, s) {
        var n, r, o, i;
        o = window.React, i = window.ReactIntl, r = i.IntlMixin, n = i.FormattedMessage, t.exports = o.createClass({
            displayName: "CustomDescription",
            mixins: [r],
            propTypes: {
                rulesEnabled: o.PropTypes.bool.isRequired,
                tabState: o.PropTypes.object.isRequired,
                tabInfo: o.PropTypes.object.isRequired,
                countryNames: o.PropTypes.object.isRequired,
                currentLocation: o.PropTypes.object.isRequired
            },
            render: function() {
                return this.props.rulesEnabled && this.props.tabState.isDirect ? o.createElement("span", null, this.getIntlMessage("popup.home.custom.directinfo")) : o.createElement(n, {
                    message: this.getIntlMessage("popup.home.custom.connection"),
                    domain: o.createElement("strong", {
                        className: "hostDomain",
                        title: "" + this.props.tabInfo.host
                    }, this.props.tabInfo.host),
                    location: o.createElement("strong", null, this.props.countryNames[this.props.currentLocation.country_code])
                })
            }
        })
    }, {}],
    22: [function(e, t, s) {
        var n, r, o, i;
        o = window.React, i = window.ReactIntl, r = i.IntlMixin, n = i.FormattedMessage, t.exports = o.createClass({
            displayName: "CustomDisabledDescription",
            mixins: [r],
            propTypes: {
                rulesEnabled: o.PropTypes.bool.isRequired,
                tabState: o.PropTypes.object.isRequired,
                tabInfo: o.PropTypes.object.isRequired,
                countryNames: o.PropTypes.object.isRequired,
                currentLocation: o.PropTypes.object.isRequired
            },
            render: function() {
                return this.props.rulesEnabled && this.props.tabState.isDirect ? o.createElement("span", null, this.getIntlMessage("popup.home.custom_disabled.directinfo")) : o.createElement(n, {
                    message: this.getIntlMessage("popup.home.custom_disabled.connection"),
                    domain: o.createElement("strong", {
                        className: "hostDomain",
                        title: "" + this.props.tabInfo.host
                    }, this.props.tabInfo.host),
                    location: o.createElement("strong", null, this.props.countryNames[this.props.currentLocation.country_code])
                })
            }
        })
    }, {}],
    23: [function(e, t, s) {
        var n, r, o, i;
        o = window.React, i = window.ReactIntl, r = i.IntlMixin, n = i.FormattedMessage, t.exports = o.createClass({
            displayName: "DisabledDescription",
            mixins: [r],
            propTypes: {
                rulesEnabled: o.PropTypes.bool.isRequired,
                rules: o.PropTypes.array.isRequired
            },
            render: function() {
                return o.createElement("div", {
                    className: "fresh-air"
                }, o.createElement("div", null, this.getIntlMessage("popup.home.disabled.copy2")), this.props.rulesEnabled && this.props.rules.length > 0 ? o.createElement("div", null, o.createElement(n, {
                    message: this.getIntlMessage("popup.home.disabled.smart_locations_enabled"),
                    smart_locations: o.createElement("a", {
                        href: "#rules"
                    }, this.getIntlMessage("popup.home.disabled.smart_locations"))
                })) : o.createElement("div", null, o.createElement(n, {
                    message: this.getIntlMessage("popup.home.disabled.smart_locations_disabled"),
                    smart_locations: o.createElement("a", {
                        href: "#rules"
                    }, this.getIntlMessage("popup.home.disabled.smart_locations"))
                })))
            }
        })
    }, {}],
    24: [function(e, t, s) {
        var n, r, o, i;
        o = window.React, i = window.ReactIntl, r = i.IntlMixin, n = i.FormattedMessage, t.exports = o.createClass({
            displayName: "EnabledDescription",
            mixins: [r],
            propTypes: {
                tabInfo: o.PropTypes.object.isRequired,
                countryNames: o.PropTypes.object.isRequired,
                currentLocation: o.PropTypes.object.isRequired
            },
            render: function() {
                return o.createElement(n, {
                    message: this.getIntlMessage("popup.home.enabled.connection"),
                    domain: o.createElement("strong", {
                        className: "hostDomain",
                        title: "" + this.props.tabInfo.host
                    }, this.props.tabInfo.host),
                    location: o.createElement("strong", null, this.props.countryNames[this.props.currentLocation.country_code])
                })
            }
        })
    }, {}],
    25: [function(e, t, s) {
        var n, r, o, i, a, l, p, c, u, m;
        u = window.React, n = e("./blocked"), a = e("./disabled"), l = e("./enabled"), o = e("./custom"), i = e("./custom_disabled"), r = e("../connection_display"), m = window.ReactIntl, c = m.IntlMixin, p = m.FormattedMessage, t.exports = u.createClass({
            displayName: "Description",
            mixins: [c],
            propTypes: {
                tabState: u.PropTypes.object.isRequired,
                tabInfo: u.PropTypes.object.isRequired,
                currentLocation: u.PropTypes.object.isRequired,
                proxyBlockedBy: u.PropTypes.array,
                user: u.PropTypes.object.isRequired,
                rulesEnabled: u.PropTypes.bool.isRequired,
                rules: u.PropTypes.array.isRequired,
                countryNames: u.PropTypes.object.isRequired,
                type: u.PropTypes.string.isRequired,
                language: u.PropTypes.string.isRequired
            },
            render: function() {
                return u.createElement("section", {
                    key: this.props.type,
                    className: "proxy-state " + this.props.type
                }, u.createElement("div", {
                    className: "connectedTo"
                }, function() {
                    switch (this.props.type) {
                        case "blocked":
                            return u.createElement(n, {
                                proxyBlockedBy: this.props.proxyBlockedBy
                            });
                        case "disabled":
                            return u.createElement(a, {
                                rules: this.props.rules,
                                rulesEnabled: this.props.rulesEnabled,
                                language: this.props.language
                            });
                        case "local":
                            return this.getIntlMessage("popup.home.local.connection");
                        case "custom_disabled":
                            return u.createElement(i, {
                                rulesEnabled: this.props.rulesEnabled,
                                tabState: this.props.tabState,
                                tabInfo: this.props.tabInfo,
                                countryNames: this.props.countryNames,
                                currentLocation: this.props.currentLocation
                            });
                        case "custom":
                            return u.createElement(o, {
                                rulesEnabled: this.props.rulesEnabled,
                                tabState: this.props.tabState,
                                tabInfo: this.props.tabInfo,
                                countryNames: this.props.countryNames,
                                currentLocation: this.props.currentLocation
                            });
                        default:
                            return u.createElement(l, {
                                tabInfo: this.props.tabInfo,
                                countryNames: this.props.countryNames,
                                currentLocation: this.props.currentLocation
                            })
                    }
                }.call(this)), "disabled" !== this.props.type && "blocked" !== this.props.type ? u.createElement(r, {
                    user: this.props.user,
                    type: this.props.type,
                    tabInfo: this.props.tabInfo,
                    countryNames: this.props.countryNames,
                    currentLocation: this.props.currentLocation
                }) : void 0)
            }
        })
    }, {
        "../connection_display": 19,
        "./blocked": 20,
        "./custom": 21,
        "./custom_disabled": 22,
        "./disabled": 23,
        "./enabled": 24
    }],
    26: [function(e, t, s) {
        var n, r, o, i, a, l;
        i = window.React, r = e("./news"), a = e("./toggle_button"), l = e("../../../events"), n = window.ReactIntl.IntlMixin, o = i.addons.PureRenderMixin, t.exports = i.createClass({
            displayName: "Footer",
            mixins: [n, o],
            propTypes: {
                enabled: i.PropTypes.bool.isRequired,
                language: i.PropTypes.string.isRequired
            },
            render: function() {
                return i.createElement("footer", null, i.createElement("ul", {
                    className: "nav"
                }, i.createElement("li", null, i.createElement("a", {
                    href: "#locations"
                }, i.createElement("img", {
                    className: "nav-icon",
                    src: "images/changeLocationIcon.png",
                    srcSet: "images/changeLocationIcon@2x.png 2x"
                }), this.getIntlMessage("popup.home.footer.change_location"))), i.createElement("li", null, i.createElement("a", {
                    href: "#features"
                }, i.createElement("img", {
                    className: "nav-icon",
                    src: "images/featuresIcon.png",
                    srcSet: "images/featuresIcon@2x.png 2x"
                }), this.getIntlMessage("popup.home.footer.features"))), i.createElement(a, {
                    enabled: this.props.enabled
                })))
            }
        })
    }, {
        "../../../events": 8,
        "./news": 28,
        "./toggle_button": 30
    }],
    27: [function(e, t, s) {
        var n, r, o, i, a, l, p;
        l = window.React, a = window.ReactIntl.IntlMixin, i = e("../header"), p = e("./subhead"), r = e("./description"), n = e("./bottom"), o = e("./footer"), t.exports = l.createClass({
            displayName: "Home",
            mixins: [a],
            propTypes: {
                routes: l.PropTypes.object.isRequired,
                enabled: l.PropTypes.bool.isRequired,
                tabState: l.PropTypes.object.isRequired,
                tabInfo: l.PropTypes.object.isRequired,
                currentLocation: l.PropTypes.object.isRequired,
                proxyBlocked: l.PropTypes.bool.isRequired,
                proxyBlockedBy: l.PropTypes.array,
                user: l.PropTypes.object.isRequired,
                device: l.PropTypes.object.isRequired,
                news: l.PropTypes.object,
                rulesEnabled: l.PropTypes.bool.isRequired,
                rules: l.PropTypes.array.isRequired,
                features: l.PropTypes.object.isRequired,
                language: l.PropTypes.string.isRequired
            },
            render: function() {
                var e;
                return e = this.props.proxyBlocked ? "blocked" : this.props.rulesEnabled && this.props.tabState.isRuleActive ? this.props.enabled ? "custom" : "custom_disabled" : this.props.enabled ? this.props.tabState.isLocal ? "local" : "enabled" : "disabled", l.createElement("div", {
                    id: "home"
                }, l.createElement(i, {
                    showBack: !1,
                    header: this.props.header,
                    device: this.props.device,
                    routes: this.props.routes,
                    is_premium: this.props.user.is_premium
                }), l.createElement(p, {
                    type: e,
                    language: this.props.language
                }), l.createElement(r, {
                    type: e,
                    user: this.props.user,
                    tabState: this.props.tabState,
                    tabInfo: this.props.tabInfo,
                    countryNames: this.props.countryNames,
                    currentLocation: this.props.currentLocation,
                    rules: this.props.rules,
                    rulesEnabled: this.props.rulesEnabled,
                    proxyBlockedBy: this.props.proxyBlockedBy,
                    language: this.props.language
                }), l.createElement(n, {
                    randomNews: this.props.randomNews,
                    features: this.props.features,
                    device: this.props.device,
                    rules: this.props.rules,
                    news: this.props.news,
                    user: this.props.user,
                    language: this.props.language
                }), l.createElement(o, {
                    enabled: this.props.enabled,
                    language: this.props.language
                }))
            }
        })
    }, {
        "../header": 15,
        "./bottom": 18,
        "./description": 25,
        "./footer": 26,
        "./subhead": 29
    }],
    28: [function(e, t, s) {/* @@ news
        var n, r;
        r = window.React, n = r.addons.PureRenderMixin, t.exports = r.createClass({
            displayName: "News",
            mixins: [n],
            propTypes: {
                html: r.PropTypes.string.isRequired
            },
            render: function() {
					console.log(this)
                return r.createElement("div", {
                    className: "notifications",
                    dangerouslySetInnerHTML: {
                        __html: this.props.html
                    }
                })
            }
        }) */
    }, {}],
    29: [function(e, t, s) {
        var n, r, o;
        o = window.React, n = window.ReactIntl.IntlMixin, r = o.addons.PureRenderMixin, t.exports = o.createClass({
            displayName: "Subhead",
            mixins: [n, r],
            propTypes: {
                type: o.PropTypes.string.isRequired
            },
            render: function() {
                return o.createElement("section", {
                    className: "subhead " + this.props.type
                }, o.createElement("h1", {
                    key: this.props.type,
                    className: "protection-headline"
                }, this.getIntlMessage("popup.home." + this.props.type + ".heading")), o.createElement("p", null, this.getIntlMessage("popup.home." + this.props.type + ".copy")))
            }
        })
    }, {}],
    30: [function(e, t, s) {
        var n, r, o;
        r = window.React, o = e("../../../events"), n = r.addons.PureRenderMixin, t.exports = r.createClass({
            displayName: "ToggleButton",
            mixins: [n],
            propTypes: {
                enabled: r.PropTypes.bool.isRequired
            },
            componentDidMount: function() {
                return setTimeout(function(e) {
                    return function() {
                        return e.refs["switch"].getDOMNode().classList.add("animating")
                    }
                }(this), 200)
            },
            _toggleProxy: function(e) {
                return o.trigger("toggleProxy", e.target.checked)
            },
            render: function() {
                return r.createElement("li", {
                    id: "proxy_toggle_button"
                }, r.createElement("label", null, r.createElement("input", {
                    ref: "switch",
                    onChange: this._toggleProxy,
                    checked: this.props.enabled,
                    id: "toggle-button",
                    type: "checkbox",
                    className: "ios-switch stateToggle onoffswitch-checkbox"
                }), r.createElement("div", {
                    className: "switch switch-enabled"
                })))
            }
        })
    }, {
        "../../../events": 8
    }],
    31: [function(e, t, s) {
        var n, r, o, i, a, l, p, c, u;
        l = window.React, u = e("./settings/"), o = e("./home/"), a = e("./locations/"), r = e("./features/"), i = e("./language/"), n = e("./debug_page"), c = e("./rules/"), p = l.addons.CSSTransitionGroup, t.exports = l.createClass({
            displayName: "Popup",
            propTypes: {
                routes: l.PropTypes.object.isRequired,
                header: l.PropTypes.object.isRequired,
                enabled: l.PropTypes.bool.isRequired,
                tabState: l.PropTypes.object.isRequired,
                tabInfo: l.PropTypes.object.isRequired,
                currentLocation: l.PropTypes.object.isRequired,
                proxyBlocked: l.PropTypes.bool.isRequired,
                proxyBlockedBy: l.PropTypes.array,
                user: l.PropTypes.object.isRequired,
                device: l.PropTypes.object.isRequired,
                rulesEnabled: l.PropTypes.bool.isRequired,
                rules: l.PropTypes.array.isRequired,
                features: l.PropTypes.object.isRequired,
                countryNames: l.PropTypes.object.isRequired,
                country_code: l.PropTypes.string.isRequired,
                debug: l.PropTypes.object.isRequired,
                defaultLocation: l.PropTypes.object.isRequired,
                language: l.PropTypes.string.isRequired,
                locale_name: l.PropTypes.string.isRequired,
                locations: l.PropTypes.array.isRequired,
                messages: l.PropTypes.object.isRequired,
                news: l.PropTypes.any,
                randomNews: l.PropTypes.string,
                earlybird: l.PropTypes.any,
                promo: l.PropTypes.any
            },
            render: function() {
                var e;
                return e = function() {
                    switch (this.props.routes.current) {
                        case "settings":
                            return l.createElement(u, {
                                header: this.props.header,
                                device: this.props.device,
                                routes: this.props.routes,
                                user: this.props.user,
                                debug: this.props.debug,
                                messages: this.props.messages
                            });
                        case "locations":
                            return l.createElement(a, {
                                header: this.props.header,
                                device: this.props.device,
                                routes: this.props.routes,
                                is_premium: this.props.user.is_premium,
                                locations: this.props.locations,
                                defaultLocation: this.props.defaultLocation,
                                rulesEnabled: this.props.rulesEnabled,
                                tabState: this.props.tabState,
                                currentLocation: this.props.currentLocation,
                                countryNames: this.props.countryNames,
                                messages: this.props.messages
                            });
                        case "features":
                            return l.createElement(r, {
                                header: this.props.header,
                                device: this.props.device,
                                routes: this.props.routes,
                                user: this.props.user,
                                features: this.props.features,
                                messages: this.props.messages
                            });
                        case "language":
                            return l.createElement(i, {
                                header: this.props.header,
                                device: this.props.device,
                                routes: this.props.routes,
                                is_premium: this.props.user.is_premium,
                                locale_name: this.props.locale_name,
                                messages: this.props.messages
                            });
                        case "rules":
                            return l.createElement(c, {
                                header: this.props.header,
                                device: this.props.device,
                                routes: this.props.routes,
                                is_premium: this.props.user.is_premium,
                                locations: this.props.locations,
                                defaultLocation: this.props.defaultLocation,
                                rules: this.props.rules,
                                rulesEnabled: this.props.rulesEnabled,
                                tabState: this.props.tabState,
                                tabInfo: this.props.tabInfo,
                                currentLocation: this.props.currentLocation,
                                countryNames: this.props.countryNames,
                                messages: this.props.messages
                            });
                        case "debug":
                            return l.createElement(n, {
                                device: this.props.device,
                                routes: this.props.routes,
                                is_premium: this.props.user.is_premium,
                                defaultLocation: this.props.defaultLocation,
                                debug: this.props.debug
                            });
                        default:
                            return l.createElement(o, l.__spread({}, this.props))
                    }
                }.call(this), l.createElement(p, {
                    component: "div",
                    transitionName: "popup-router"
                }, l.createElement("div", {
                    key: this.props.routes.current,
                    className: "page " + (this.props.routes.direction || "right")
                }, e))
            }
        })
    }, {
        "./debug_page": 11,
        "./features/": 13,
        "./home/": 27,
        "./language/": 32,
        "./locations/": 33,
        "./rules/": 36,
        "./settings/": 43
    }],
    32: [function(e, t, s) {
        var n, r, o, i, a;
        o = window.React, r = window.ReactIntl.IntlMixin, n = e("../header"), i = e("../../../events"), a = window.locales.locales, t.exports = o.createClass({
            displayName: "Language",
            mixins: [r],
            propTypes: {
                routes: o.PropTypes.object.isRequired,
                header: o.PropTypes.object.isRequired,
                device: o.PropTypes.object.isRequired,
                locale_name: o.PropTypes.string.isRequired,
                is_premium: o.PropTypes.bool.isRequired
            },
            _changeLanguage: function(e) {
                return i.trigger("changeLanguage", e)
            },
            render: function() {
                var e, t;
                return o.createElement("div", {
                    id: "languages"
                }, o.createElement(n, {
                    showBack: !0,
                    header: this.props.header,
                    device: this.props.device,
                    routes: this.props.routes,
                    is_premium: this.props.is_premium
                }), o.createElement("section", {
                    className: "subhead"
                }, o.createElement("div", {
                    className: "text-center"
                }, o.createElement("h1", {
                    className: "location-headline"
                }, this.getIntlMessage("popup.languages.heading")), o.createElement("p", {
                    className: "location-copy"
                }, this.getIntlMessage("popup.languages.copy")))), o.createElement("section", {
                    className: "locale-section"
                }, o.createElement("ul", null, function() {
                    var s;
                    s = [];
                    for (e in a) t = a[e], s.push(o.createElement("li", {
                        onClick: this._changeLanguage.bind(this, e)
                    }, t.locale_name, t.locale_name === this.props.locale_name ? o.createElement("span", {
                        className: "active-tick"
                    }, "✓") : void 0));
                    return s
                }.call(this))))
            }
        })
    }, {
        "../../../events": 8,
        "../header": 15
    }],
    33: [function(e, t, s) {
        var n, r, o, i, a;
        i = window.React, r = window.ReactIntl.IntlMixin, n = e("../header"), o = e("./location_item"), a = e("../../../events"), t.exports = i.createClass({
            displayName: "Locations",
            mixins: [r],
            propTypes: {
                routes: i.PropTypes.object.isRequired,
                header: i.PropTypes.object.isRequired,
                tabState: i.PropTypes.object.isRequired,
                currentLocation: i.PropTypes.object.isRequired,
                device: i.PropTypes.object.isRequired,
                rulesEnabled: i.PropTypes.bool.isRequired,
                countryNames: i.PropTypes.object.isRequired,
                defaultLocation: i.PropTypes.object.isRequired,
                locations: i.PropTypes.array.isRequired,
                messages: i.PropTypes.object.isRequired,
                is_premium: i.PropTypes.bool.isRequired
            },
            getInitialState: function() {
                return {
                    custom_cc: "_unknown",
                    transitionPending: !1
                }
            },
            shouldComponentUpdate: function(e, t) {
                return !(this.state.transitionPending || (null != t ? t.transitionPending : void 0))
            },
            handleChange: function() {
                return this.setState({
                    custom_cc: this.refs.custom_cc.getDOMNode().value || "_unknown"
                })
            },
            _setTransitionToPending: function() {
                return this.setState({
                    transitionPending: !0
                })
            },
            addCustomLocation: function() {
                var e, t;
                return e = this.refs.custom_cc.getDOMNode(), t = this.refs.custom_url.getDOMNode(), e.value && t.value ? (a.trigger("addCustomLocation", {
                    cc: e.value,
                    url: t.value
                }), t.value = "", e.value = "", this.setState({
                    custom_cc: "_unknown"
                })) : void 0
            },
            render: function() {
                var e, t, s, r, a, l;
                return r = this.props.locations, l = null, t = this.props.is_premium, e = this.props.defaultLocation.country_code, a = [], r = this.props.locations.filter(function(s) {
                    return s.premium_only && !t ? (a.push(s), !1) : s.country_code === e ? (l = s, !1) : !0
                }), r = r.concat(a), i.createElement("div", {
                    id: "locations"
                }, i.createElement(n, {
                    showBack: !0,
                    header: this.props.header,
                    device: this.props.device,
                    routes: this.props.routes,
                    is_premium: this.props.is_premium
                }), i.createElement("section", {
                    className: "subhead"
                }, i.createElement("div", {
                    className: "text-center"
                }, i.createElement("h1", {
                    className: "location-headline"
                }, this.getIntlMessage("popup.locations.heading")), i.createElement("p", {
                    className: "location-copy"
                }, this.getIntlMessage("popup.locations.copy")))), i.createElement("section", {
                    className: "scroll-section locations-section"
                }, r ? void 0 : i.createElement("p", {
                    className: "noLocations"
                }, this.getIntlMessage("popup.locations.no_locations")), i.createElement("ul", {
                    className: "locations"
                }, this.props.rulesEnabled && this.props.tabState.isRuleActive ? i.createElement("div", {
                    className: "activerule-hint"
                }, this.getIntlMessage("popup.locations.smart_locations_enabled")) : void 0, this.props.rulesEnabled && this.props.tabState.isRuleActive ? i.createElement("li", {
                    className: "activerule"
                }, i.createElement("a", {
                    href: "#rules",
                    style: {
                        backgroundImage: "url('images/flags/" + this.props.currentLocation.country_code + ".png')"
                    }
                }, i.createElement("span", {
                    className: "location"
                }, this.props.countryNames[this.props.currentLocation.country_code]), i.createElement("span", {
                    className: "btn btn-rule"
                }, this.getIntlMessage("popup.locations.location_item.choose")))) : void 0, l ? i.createElement(o, {
                    key: l.country_code,
                    _setTransitionToPending: this._setTransitionToPending,
                    location: l,
                    is_premium: this.props.is_premium,
                    countryNames: this.props.countryNames,
                    defaultLocation: this.props.defaultLocation
                }) : void 0, function() {
                    var e, t, n;
                    if (r) {
                        for (n = [], e = 0, t = r.length; t > e; e++) s = r[e], n.push(i.createElement(o, {
                            key: s.country_code,
                            _setTransitionToPending: this._setTransitionToPending,
                            location: s,
                            is_premium: this.props.is_premium,
                            countryNames: this.props.countryNames,
                            defaultLocation: this.props.defaultLocation
                        }));
                        return n
                    }
                }.call(this), void 0)))
            }
        })
    }, {
        "../../../events": 8,
        "../header": 15,
        "./location_item": 34
    }],
    34: [function(e, t, s) {
        var n, r, o, i;
        r = window.React, n = window.ReactIntl.IntlMixin, o = e("../../../events"), i = e("loglevel"), t.exports = r.createClass({
            displayName: "LocationItem",
            mixins: [n],
            propTypes: {
                countryNames: r.PropTypes.object.isRequired,
                location: r.PropTypes.object.isRequired,
                defaultLocation: r.PropTypes.object.isRequired,
                is_premium: r.PropTypes.bool.isRequired
            },
            getInitialState: function() {
                return {
                    premium_disabled: this.props.location.premium_only && !this.props.is_premium
                }
            },
            _toggleLocation: function() {
                return this.state.premium_disabled ? o.trigger("header", {
                    open: !0
                }) : (this.props._setTransitionToPending(), o.trigger("locations:change", this.props.location.country_code), o.trigger("toggleProxy", !0))
            },
            render: function() {
                var e;
                return e = this.props.location, r.createElement("li", {
                    className: this.state.premium_disabled ? "premium" : ""
                }, r.createElement("a", {
                    onClick: this._toggleLocation,
                    style: {
                        backgroundImage: "url('images/flags/" + e.country_code + ".png')"
                    }
                }, r.createElement("span", {
                    className: "location"
                }, this.props.countryNames[e.country_code]), this.props.defaultLocation.country_code === e.country_code ? r.createElement("span", {
                    className: "btn btn-primary"
                }, this.getIntlMessage("popup.locations.location_item.current")) : this.state.premium_disabled ? r.createElement("span", {
                    className: "btn btn-premium"
                }, this.getIntlMessage("popup.locations.location_item.premium")) : r.createElement("span", {
                    className: "btn btn-success"
                }, this.getIntlMessage("popup.locations.location_item.choose"))))
            }
        })
    }, {
        "../../../events": 8,
        loglevel: 3
    }],
    35: [function(e, t, s) {
        var n, r, o, i, a;
        o = window.React, i = e("loglevel"), a = window.ReactIntl, r = a.IntlMixin, n = a.FormattedMessage, t.exports = o.createClass({
            displayName: "Hints",
            mixins: [r],
            propTypes: {
                rulesEnabled: o.PropTypes.bool.isRequired,
                rules: o.PropTypes.array,
                active: o.PropTypes.number
            },
            render: function() {
                var e, t, s, r;
                return o.createElement("div", {
                    className: "rule-hints-container"
                }, 0 === (null != (e = this.props.rules) ? e.length : void 0) ? o.createElement("div", {
                    key: 1
                }, o.createElement("img", {
                    className: "logo",
                    src: "images/smartLocations-emptyState.png",
                    srcSet: "images/smartLocations-emptyState@2x.png"
                }), o.createElement("h3", null, this.getIntlMessage("popup.rules.hints.empty.heading"), o.createElement("strong", null, " ", this.getIntlMessage("popup.rules.name"))), o.createElement("ol", {
                    className: "circle-list"
                }, o.createElement("li", null, o.createElement("span", {
                    className: "num"
                }, "1"), this.getIntlMessage("popup.rules.hints.empty.list_1")), o.createElement("li", null, o.createElement("span", {
                    className: "num"
                }, "2"), this.getIntlMessage("popup.rules.hints.empty.list_2")), o.createElement("li", null, o.createElement("span", {
                    className: "num"
                }, "3"), this.getIntlMessage("popup.rules.hints.empty.list_3")))) : 1 === (null != (t = this.props.rules) ? t.length : void 0) && null == this.props.active ? o.createElement("div", {
                    className: "bordered",
                    key: 2
                }, o.createElement("h4", null, this.getIntlMessage("popup.rules.hints.first.heading")), o.createElement("p", null, this.getIntlMessage("popup.rules.hints.first.copy"))) : 1 === (null != (s = this.props.rules) ? s.length : void 0) && null != this.props.active ? o.createElement("div", {
                    className: "bordered",
                    key: 3
                }, o.createElement("h4", null, this.getIntlMessage("popup.rules.hints.selected.heading")), o.createElement("p", null, o.createElement(n, {
                    message: this.getIntlMessage("popup.rules.hints.selected.copy"),
                    current_domain: o.createElement("span", {
                        className: "hostDomain"
                    }, this.props.rules[0].domain)
                }))) : 2 !== (null != (r = this.props.rules) ? r.length : void 0) || this.props.rulesEnabled ? void 0 : o.createElement("div", {
                    className: "bordered",
                    key: 4
                }, o.createElement("h4", null, this.getIntlMessage("popup.rules.hints.disabled.heading")), o.createElement("p", null, this.getIntlMessage("popup.rules.hints.disabled.copy"))))
            }
        })
    }, {
        loglevel: 3
    }],
    36: [function(e, t, s) {
        var n, r, o, i, a, l, p, c, u, m, d;
        o = window.React, r = window.ReactIntl.IntlMixin, n = e("../header"), i = e("./rule_box/"), l = e("./list"), a = e("./hints"), p = e("../../../events"), u = e("../../../../../background/pacengine.coffee"), m = e("punycode"), c = e("loglevel"), d = o.addons.update, t.exports = o.createClass({
            displayName: "Rules",
            mixins: [r],
            propTypes: {
                routes: o.PropTypes.object.isRequired,
                header: o.PropTypes.object.isRequired,
                tabState: o.PropTypes.object.isRequired,
                tabInfo: o.PropTypes.object.isRequired,
                currentLocation: o.PropTypes.object.isRequired,
                device: o.PropTypes.object.isRequired,
                rulesEnabled: o.PropTypes.bool.isRequired,
                rules: o.PropTypes.array.isRequired,
                countryNames: o.PropTypes.object.isRequired,
                defaultLocation: o.PropTypes.object.isRequired,
                locations: o.PropTypes.array.isRequired,
                messages: o.PropTypes.object.isRequired,
                is_premium: o.PropTypes.bool.isRequired
            },
            getInitialState: function() {
                var e;
                return {
                    host: this.props.tabState.isLocal ? "" : null != (e = this.props.tabInfo.host) ? e.replace(/^(www\.)/, "") : void 0,
                    selectedLocation: this.props.defaultLocation.country_code,
                    activeRule: null
                }
            },
            getDefaultProps: function() {
                return {
                    rules: []
                }
            },
            componentDidMount: function(e, t) {
                return this._findRuleByHost(this.state.host)
            },
            componentWillReceiveProps: function(e) {
                var t;
                return null != this.state.activeRule && e.rules.length > 0 && (t = this.state.activeRule, t > e.rules.length - 1 && (t = this.state.activeRule - 1), this._setActiveRule(t)), 0 === e.rules.length || e.rules.length > this.props.rules.length ? this._resetActiveRule() : void 0
            },
            _handleHostChange: function(e) {
                return this.setState({
                    host: e
                }), this._findRuleByHost(e)
            },
            _handleLocationChange: function(e) {
                var t;
                return null == this.state.activeRule ? this.setState({
                    selectedLocation: e
                }) : (t = this.props.rules.slice(), t[this.state.activeRule].cc = e, p.trigger("updateRules", t))
            },
            _handleActionTrigger: function(e) {
                return "SPAN" === e.target.tagName || "DIV" === e.target.tagName ? null != this.state.activeRule ? this._deleteActiveRule() : this._addRule() : null != this.state.activeRule ? this._refreshRuleListUI() : this._addRule()
            },
            _deleteActiveRule: function() {
                var e;
                if (null != this.state.activeRule) return e = this.props.rules.slice(), e.splice(this.state.activeRule, 1), p.trigger("updateRules", e)
            },
            _addRule: function() {
                var e, t, s, n;
                return this.state.host ? (e = this._cleanUpHost(this.state.host), t = {
                    domain: e,
                    cc: this.state.selectedLocation
                }, s = d(this.props.rules, {
                    $push: [t]
                }), p.trigger("updateRules", s)) : null != (n = document.querySelector('input[type="text"].rule-host-input')) ? n.focus() : void 0
            },
            _findRuleByHost: function(e) {
                var t, s;
                return e = this._cleanUpHost(e), s = u.matchRules(this.props.rules, e), t = {
                    activeRule: s
                }, null != s && (t.selectedLocation = this.props.rules[s].cc), void this.setState(t)
            },
            _cleanUpHost: function(e) {
                var t;
                return null == e ? "" : (t = e.trim().toLowerCase(), t = this.parseURL(t).host || t, t.indexOf("/") > 0 && (t = this.parseURL("http://" + t).host || t),
                    t = m.toASCII(t))
            },
            _handleRuleToggleChange: function(e) {
                return this.props.is_premium ? p.trigger("toggleRules", e.target.checked) : p.trigger("header", {
                    open: !0
                })
            },
            _refreshRuleListUI: function() {
                return this.setState({
                    activeRule: this.state.activeRule
                })
            },
            _setActiveRule: function(e) {
                return null == e ? this._resetActiveRule() : this.setState({
                    host: this.props.rules[e].domain,
                    selectedLocation: this.props.rules[e].cc,
                    activeRule: e
                })
            },
            _handleBackgroundClick: function() {
                return null != this.state.activeRule ? this._resetActiveRule() : void 0
            },
            _resetActiveRule: function() {
                return this.setState({
                    host: null,
                    selectedLocation: this.props.defaultLocation.country_code,
                    activeRule: null
                })
            },
            parseURL: function(e) {
                var t, s, n;
                return s = /^([^:]+):\/\/([^\/:]*)(?::([\d]+))?(?:(\/[^#]*)(?:#(.*))?)?$/i, t = e.match(s), t ? {
                    scheme: t[1].toLowerCase(),
                    host: t[2].toLowerCase(),
                    port: t[3],
                    path: t[4] || "/",
                    fragment: t[5],
                    local: "http" !== (n = t[1].toLowerCase()) && "https" !== n
                } : {}
            },
            render: function() {
                return o.createElement("div", {
                    id: "rules"
                }, o.createElement(n, {
                    showBack: !0,
                    header: this.props.header,
                    device: this.props.device,
                    routes: this.props.routes,
                    is_premium: this.props.is_premium
                }), o.createElement("div", {
                    className: "rule-container"
                }, o.createElement(i, {
                    rules: this.props.rules,
                    host: this.state.host,
                    locations: this.props.locations,
                    countryNames: this.props.countryNames,
                    selectedLocation: this.state.selectedLocation,
                    actionIntent: null != this.state.activeRule ? "delete" : "add",
                    onActionTrigger: this._handleActionTrigger,
                    onHostChange: this._handleHostChange,
                    onLocationChange: this._handleLocationChange
                }), o.createElement("section", {
                    className: "scroll-section rule-list-section " + (this.props.rulesEnabled ? "" : "disabled"),
                    onClick: this._handleBackgroundClick
                }, o.createElement(l, {
                    rules: this.props.rules,
                    active: this.state.activeRule,
                    setActiveRule: this._setActiveRule,
                    resetActiveRule: this._resetActiveRule
                }), o.createElement(a, {
                    rulesEnabled: this.props.rulesEnabled,
                    rules: this.props.rules,
                    active: this.state.activeRule
                })), o.createElement("footer", {
                    className: "rule-footer"
                }, o.createElement("label", {
                    className: "rule-toggle-label",
                    htmlFor: "rule-toggle"
                }, this.getIntlMessage(this.props.rulesEnabled ? "popup.rules.toggle_on" : "popup.rules.toggle_off")), o.createElement("label", {
                    className: "flat-switch"
                }, o.createElement("input", {
                    id: "rule-toggle",
                    onChange: this._handleRuleToggleChange,
                    checked: this.props.rulesEnabled,
                    type: "checkbox",
                    className: "flat-switch-checkbox"
                }), o.createElement("div", {
                    className: "flat-toggle"
                })))))
            }
        })
    }, {
        "../../../../../background/pacengine.coffee": 6,
        "../../../events": 8,
        "../header": 15,
        "./hints": 35,
        "./list": 37,
        "./rule_box/": 40,
        loglevel: 3,
        punycode: 2
    }],
    37: [function(e, t, s) {
        var n, r, o, i;
        r = window.React, n = window.ReactIntl.IntlMixin, i = e("loglevel"), o = r.addons.CSSTransitionGroup, t.exports = r.createClass({
            displayName: "RulesList",
            mixins: [n],
            propTypes: {
                rules: r.PropTypes.array,
                active: r.PropTypes.number,
                setActiveRule: r.PropTypes.func.isRequired,
                resetActiveRule: r.PropTypes.func.isRequired
            },
            componentDidUpdate: function(e, t) {
                var s;
                return s = this.props.active, this.props.rules.length > e.rules.length && (s = this.props.rules.length - 1), null != s && this._scrollToItem(s), null != e.active && null != this.props.active && e.active === this.props.active ? this._markItemAsUpdated(s) : void 0
            },
            _handleClick: function(e, t) {
                return t.stopPropagation(), this.props.active === e ? this.props.resetActiveRule() : this.props.setActiveRule(e)
            },
            _scrollToItem: function(e) {
                var t;
                return t = this.refs[e].getDOMNode(), null != t.scrollIntoViewIfNeeded ? t.scrollIntoViewIfNeeded() : t.scrollIntoView(!1)
            },
            _markItemAsUpdated: function(e) {
                var t, s;
                return t = this.refs[e].getDOMNode(), s = function(e) {
                    return t.removeEventListener("webkitAnimationEnd", s, !1), t.removeEventListener("animationend", s, !1), t.classList.remove("-updated")
                }, t.addEventListener("webkitAnimationEnd", s, !1), t.addEventListener("animationend", s, !1), t.classList.add("-updated")
            },
            render: function() {
                var e, t, s, n;
                return t = function() {
                    var t, o, i, a;
                    for (i = this.props.rules, a = [], e = t = 0, o = i.length; o > t; e = ++t) s = i[e], n = this.props.active === e ? "-selected" : "", a.push(r.createElement("div", {
                        key: s.domain,
                        className: "list-item"
                    }, r.createElement("div", {
                        key: e,
                        ref: e,
                        className: "rule-item " + n,
                        onClick: this._handleClick.bind(this, e)
                    }, r.createElement("div", {
                        className: "favicon",
                        style: {
                            backgroundImage: "url('https://www.google.com/s2/favicons?domain=" + s.domain + "')"
                        }
                    }, s.domain), r.createElement("div", {
                        className: "flag",
                        style: {
                            backgroundImage: "url('images/flags/" + s.cc + ".png')"
                        }
                    }))));
                    return a
                }.call(this), r.createElement(o, {
                    component: "div",
                    className: "rule-list " + (null != this.props.active ? "hasSelected" : ""),
                    transitionName: "list-item"
                }, t)
            }
        })
    }, {
        loglevel: 3
    }],
    38: [function(e, t, s) {
        var n, r, o, i, a, l;
        i = window.React, l = window.ReactIntl, r = l.IntlMixin, n = l.FormattedMessage, a = e("loglevel"), o = i.addons.PureRenderMixin, t.exports = i.createClass({
            displayName: "ActionsRuleBox",
            mixins: [r, o],
            propTypes: {
                host: i.PropTypes.string,
                intent: i.PropTypes.string.isRequired,
                onActionTrigger: i.PropTypes.func.isRequired
            },
            _handleKeyDown: function(e) {
                return 13 === e.nativeEvent.keyCode ? this.props.onActionTrigger(e) : void 0
            },
            render: function() {
                var e;
                return e = this.getIntlMessage("popup.rules.button.add"), null != this.props.host && (e = this.formatMessage(this.getIntlMessage("popup.rules.button.add_host"), {
                    site: this.props.host
                })), "add" !== this.props.intent && (e = this.formatMessage(this.getIntlMessage("popup.rules.button.remove_host"), {
                    site: this.props.host
                })), i.createElement("div", {
                    className: "rule-actions"
                }, i.createElement("div", {
                    className: "fab rule-action-" + this.props.intent,
                    tabIndex: "3",
                    onClick: this.props.onActionTrigger,
                    onKeyDown: this._handleKeyDown,
                    title: e
                }, i.createElement("span", {
                    className: "icon-add"
                }, "+")))
            }
        })
    }, {
        loglevel: 3
    }],
    39: [function(e, t, s) {
        var n, r, o, i;
        o = window.React, n = window.ReactIntl.IntlMixin, i = e("loglevel"), r = o.addons.PureRenderMixin, t.exports = o.createClass({
            displayName: "HostRuleBox",
            mixins: [n, r],
            propTypes: {
                host: o.PropTypes.string,
                onHostChange: o.PropTypes.func.isRequired,
                onActionTrigger: o.PropTypes.func.isRequired
            },
            getInitialState: function() {
                return {
                    inputWidth: 0,
                    maxWidth: 0
                }
            },
            componentDidMount: function() {
                return this._updateFavicon(), this._setMaxWidth(), this._setInputWidth(), this._placeCaretAtEnd()
            },
            componentDidUpdate: function(e, t) {
                var s, n;
                return e.host !== this.props.host && (this._setInputWidth(), ((null != (s = this.props.host) ? s.indexOf(".") : void 0) > 0 || (null != e && null != (n = e.host) ? n.indexOf(".") : void 0) > 0) && this._updateFavicon()), null == this.props.host && null != e.host ? this._placeCaretAtEnd() : void 0
            },
            _handleKeyDown: function(e) {
                return 13 === e.nativeEvent.keyCode && this.props.onActionTrigger(e), 32 === e.nativeEvent.keyCode || 13 === e.nativeEvent.keyCode ? e.preventDefault() : void 0
            },
            _handleChange: function(e) {
                var t;
                return t = e.target.value, this.props.onHostChange(t)
            },
            _setMaxWidth: function() {
                var e, t, s, n, r, o, i, a;
                for (n = this.refs.container.getDOMNode().parentElement, s = n.offsetWidth, a = n.children, o = 0, i = a.length; i > o; o++) e = a[o], s -= e.offsetWidth;
                return this.setState({
                    maxWidth: s
                }), t = window.getComputedStyle(this.refs.input.getDOMNode()), r = this.refs.tmp.getDOMNode(), r.style.fontSize = t.fontSize, r.style.fontFamily = t.fontFamily
            },
            _setInputWidth: function() {
                var e, t;
                return e = this.props.host, (null == e || "" === e) && (e = this.getIntlMessage("popup.rules.nlp.host.placeholder")), t = this.refs.tmp.getDOMNode(), t.innerHTML = e, this.setState({
                    inputWidth: t.offsetWidth + 5
                })
            },
            _updateFavicon: function() {
                return this.refs.container.getDOMNode().style.backgroundImage = "url('https://www.google.com/s2/favicons?domain=" + (this.props.host || this.getIntlMessage("popup.rules.nlp.host.placeholder")) + "')"
            },
            _placeCaretAtEnd: function() {
                var e, t;
                return e = this.refs.input.getDOMNode(), e.focus(), t = e.value.length, e.setSelectionRange(t, t)
            },
            render: function() {
                return o.createElement("div", {
                    className: "rule-host",
                    ref: "container"
                }, o.createElement("input", {
                    type: "text",
                    className: "rule-host-input",
                    spellCheck: "false",
                    placeholder: this.getIntlMessage("popup.rules.nlp.host.placeholder"),
                    onChange: this._handleChange,
                    onKeyDown: this._handleKeyDown,
                    tabIndex: "1",
                    ref: "input",
                    style: {
                        maxWidth: this.state.maxWidth,
                        width: this.state.inputWidth
                    },
                    value: null != this.props.host ? this.props.host.toLowerCase() : this.props.host
                }), o.createElement("span", {
                    className: "tmpHidden",
                    ref: "tmp"
                }))
            }
        })
    }, {
        loglevel: 3
    }],
    40: [function(e, t, s) {
        var n, r, o, i, a, l;
        r = window.React, n = window.ReactIntl.IntlMixin, i = e("./host"), a = e("./location"), o = e("./actions"), l = e("loglevel"), t.exports = r.createClass({
            displayName: "RuleBox",
            mixins: [n],
            propTypes: {
                host: r.PropTypes.string,
                onHostChange: r.PropTypes.func.isRequired,
                onLocationChange: r.PropTypes.func.isRequired,
                onActionTrigger: r.PropTypes.func.isRequired,
                selectedLocation: r.PropTypes.string.isRequired,
                locations: r.PropTypes.array.isRequired,
                actionIntent: r.PropTypes.string.isRequired,
                countryNames: r.PropTypes.object
            },
            render: function() {
                return r.createElement("div", {
                    id: "rule-box"
                }, r.createElement("div", {
                    className: "nlp-container"
                }, r.createElement("div", {
                    className: "nlp"
                }, r.createElement("div", {
                    className: "nlp-text"
                }, this.getIntlMessage("popup.rules.nlp.host._pre")), r.createElement(i, {
                    host: this.props.host,
                    onHostChange: this.props.onHostChange,
                    onActionTrigger: this.props.onActionTrigger
                }), r.createElement("div", {
                    className: "nlp-text"
                }, this.getIntlMessage("popup.rules.nlp.host._post"))), r.createElement("div", {
                    className: "nlp"
                }, r.createElement("div", {
                    className: "nlp-text"
                }, this.getIntlMessage("popup.rules.nlp.location._pre")), r.createElement(a, {
                    locations: this.props.locations,
                    countryNames: this.props.countryNames,
                    selectedLocation: this.props.selectedLocation,
                    onLocationChange: this.props.onLocationChange,
                    onActionTrigger: this.props.onActionTrigger
                }), r.createElement("div", {
                    className: "nlp-text"
                }, this.getIntlMessage("popup.rules.nlp.location._post")))), r.createElement(o, {
                    intent: this.props.actionIntent,
                    host: this.props.host,
                    onActionTrigger: this.props.onActionTrigger
                }))
            }
        })
    }, {
        "./actions": 38,
        "./host": 39,
        "./location": 41,
        loglevel: 3
    }],
    41: [function(e, t, s) {
        var n, r, o;
        r = window.React, n = window.ReactIntl.IntlMixin, o = e("loglevel"), t.exports = r.createClass({
            displayName: "LocationRuleBox",
            mixins: [n],
            propTypes: {
                selectedLocation: r.PropTypes.string.isRequired,
                locations: r.PropTypes.array.isRequired,
                onActionTrigger: r.PropTypes.func.isRequired,
                onLocationChange: r.PropTypes.func,
                countryNames: r.PropTypes.object
            },
            componentDidMount: function() {
                return this._updateFlag(), this._setSelectWidth()
            },
            componentDidUpdate: function(e, t) {
                return e.selectedLocation !== this.props.selectedLocation ? (this._updateFlag(), this._setSelectWidth()) : void 0
            },
            _handleKeyDown: function(e) {
                return 13 === e.nativeEvent.keyCode ? this.props.onActionTrigger(e) : void 0
            },
            _handleChange: function(e) {
                var t;
                return t = e.target.value, this.props.onLocationChange(t)
            },
            _setSelectWidth: function() {
                var e, t, s;
                return t = this.refs.select.getDOMNode(), e = t.options[t.selectedIndex].label, s = this.refs.tmp.getDOMNode(), s.innerHTML = e, t.style.width = "" + (s.offsetWidth + 10) + "px"
            },
            _updateFlag: function() {
                var e, t;
                return t = this.props.selectedLocation, e = "url('images/flags/" + t + ".png')", this.refs.container.getDOMNode().style.backgroundImage = e
            },
            render: function() {
                var e;
                return r.createElement("div", {
                    className: "rule-location",
                    ref: "container"
                }, r.createElement("select", {
                    tabIndex: "2",
                    ref: "select",
                    value: this.props.selectedLocation,
                    onKeyDown: this._handleKeyDown,
                    onChange: this._handleChange
                }, function() {
                    var t, s, n, o;
                    if (this.props.locations) {
                        for (n = this.props.locations, o = [], t = 0, s = n.length; s > t; t++) e = n[t], o.push(r.createElement("option", {
                            key: e.country_code,
                            value: e.country_code
                        }, this.props.countryNames[e.country_code]));
                        return o
                    }
                }.call(this), r.createElement("option", {
                    disabled: !0,
                    className: "separator"
                }, "──────────"), r.createElement("option", {
                    value: "OFF"
                }, this.getIntlMessage("popup.rules.nlp.location.off"))), r.createElement("span", {
                    className: "tmpHidden",
                    ref: "tmp"
                }))
            }
        })
    }, {
        loglevel: 3
    }],
    42: [function(e, t, s) {
        var n, r;
        r = window.React, n = r.addons.PureRenderMixin, t.exports = r.createClass({
            displayName: "ClickItem",
            mixins: [n],
            propTypes: {
                onClick: r.PropTypes.func.isRequired,
                label: r.PropTypes.string.isRequired
            },
            render: function() {
                return r.createElement("li", {
                    className: "click-item",
                    onClick: this.props.onClick
                }, this.props.label)
            }
        })
    }, {}],
    43: [function(e, t, s) {
        var n, r, o, i, a, l, p, c, u, m;
        c = window.React, a = window.ReactIntl.IntlMixin, o = e("../header"), m = e("../../../events"), n = e("./settings_category"), i = e("./input_item"), r = e("./click_item"), u = e("./toggle_item"), l = e("./link_item"), p = e("./nav_item"), t.exports = c.createClass({
            displayName: "Settings",
            mixins: [a],
            propTypes: {
                routes: c.PropTypes.object.isRequired,
                header: c.PropTypes.object.isRequired,
                user: c.PropTypes.object.isRequired,
                device: c.PropTypes.object.isRequired,
                debug: c.PropTypes.object.isRequired,
                messages: c.PropTypes.object.isRequired
            },
            changeAPIUrl: function(e) {
                return m.trigger("changeAPIUrl", e), m.trigger("signOut")
            },
            reset: function() {
                return m.trigger("reset")
            },
            confirmAccount: function() {
                return m.trigger("confirmAccount")
            },
            signOut: function() {
                return m.trigger("signOut")
            },
            render: function() {
                var e, t, s;
                return e = {
                    uuid: this.props.device.uuid,
                    token: this.props.device.token,
                    src: "{browser}",
                    promo_code: "show"
                }, t = this.props.routes.previous ? "" + this.props.routes.previous + "-" : "", s = "" + t + this.props.routes.current, c.createElement("div", {
                    id: "settings"
                }, c.createElement(o, {
                    showBack: !0,
                    header: this.props.header,
                    device: this.props.device,
                    routes: this.props.routes,
                    is_premium: this.props.user.is_premium
                }), c.createElement("section", {
                    className: "subhead"
                }, c.createElement("div", {
                    className: "text-center"
                }, c.createElement("h1", {
                    className: "location-headline"
                }, this.getIntlMessage("popup.settings.heading")), c.createElement("p", {
                    className: "location-copy"
                }, this.getIntlMessage("popup.settings.copy")))), c.createElement("section", {
                    className: "settings-section scroll-section"
                }, c.createElement(n, {
                    title: "" + this.getIntlMessage("popup.settings.account.title") + " " + (this.props.user.is_anonymous ? "" : "(" + this.props.user.email + ")")
                }, this.props.user.is_anonymous ? c.createElement("div", null, c.createElement(l, {
                    url: "page.html#signup",
                    label: this.getIntlMessage("popup.settings.account.sign_up")
                }), c.createElement(l, {
                    url: "page.html#login",
                    label: this.getIntlMessage("popup.settings.account.log_in")
                })) : c.createElement(r, {
                    onClick: this.signOut,
                    label: this.getIntlMessage("popup.settings.account.sign_out")
                }), this.props.user.is_premium ? void 0 : c.createElement(l, {
                    url: "https://secure.zenmate.com#/upgrade",
                    params: e,
                    ga: {
                        utm_medium: s
                    },
                    label: this.getIntlMessage("popup.settings.account.get_premium")
                }), this.props.user.is_anonymous || this.props.user.is_verified ? void 0 : c.createElement(r, {
                    onClick: this.confirmAccount,
                    label: this.getIntlMessage("popup.settings.account.verify")
                }), this.props.user.is_anonymous ? void 0 : c.createElement(l, {
                    url: "https://secure.zenmate.com#/",
                    params: e,
                    ga: {
                        utm_medium: s
                    },
                    label: this.getIntlMessage("popup.settings.account.account_dashboard")
                })), c.createElement(n, {
                    title: this.getIntlMessage("popup.settings.general.title")
                }, c.createElement(l, {
                    url: "http://go.zenmate.com/3EMEt",
                    label: this.getIntlMessage("popup.settings.general.support")
                }), c.createElement(p, {
                    link: "#language",
                    label: this.getIntlMessage("popup.settings.general.change_language")
                })), void 0))
            }
        })
    }, {
        "../../../events": 8,
        "../header": 15,
        "./click_item": 42,
        "./input_item": 44,
        "./link_item": 45,
        "./nav_item": 46,
        "./settings_category": 47,
        "./toggle_item": 48
    }],
    44: [function(e, t, s) {
        var n;
        n = window.React, t.exports = n.createClass({
            displayName: "InputItem",
            propTypes: {
                label: n.PropTypes.string.isRequired,
                onClick: n.PropTypes.func,
                button: n.PropTypes.bool,
                value: n.PropTypes.string
            },
            getInitialState: function() {
                return {
                    value: this.props.value
                }
            },
            willReceiveProps: function() {
                return this.setState({
                    value: this.props.value
                })
            },
            onChange: function() {
                return this.setState({
                    value: this.refs.input.getDOMNode().value
                })
            },
            onClick: function() {
                var e;
                return "function" == typeof(e = this.props).onClick ? e.onClick(this.refs.input.getDOMNode().value) : void 0
            },
            render: function() {
                return n.createElement("li", null, n.createElement("label", null, this.props.label), n.createElement("input", {
                    value: this.state.value,
                    onChange: this.onChange,
                    ref: "input"
                }), this.props.button ? n.createElement("button", {
                    onClick: this.onClick
                }, "Submit") : void 0)
            }
        })
    }, {}],
    45: [function(e, t, s) {
        var n, r, o;
        o = window.React, n = e("../../../link"), r = o.addons.PureRenderMixin, t.exports = o.createClass({
            displayName: "LinkItem",
            mixins: [r],
            propTypes: {
                label: o.PropTypes.string.isRequired
            },
            render: function() {
                return o.createElement(n, o.__spread({}, this.props), o.createElement("li", {
                    className: "click-item"
                }, this.props.label))
            }
        })
    }, {
        "../../../link": 9
    }],
    46: [function(e, t, s) {
        var n, r;
        r = window.React, n = r.addons.PureRenderMixin, t.exports = r.createClass({
            displayName: "NavigationItem",
            mixins: [n],
            propTypes: {
                link: r.PropTypes.string.isRequired,
                label: r.PropTypes.string.isRequired
            },
            render: function() {
                return r.createElement("a", {
                    href: this.props.link
                }, r.createElement("li", {
                    className: "click-item"
                }, this.props.label))
            }
        })
    }, {}],
    47: [function(e, t, s) {
        var n, r;
        r = window.React, n = r.addons.PureRenderMixin, t.exports = r.createClass({
            displayName: "SettingsCategory",
            mixins: [n],
            propTypes: {
                title: r.PropTypes.string.isRequired
            },
            render: function() {
                return r.createElement("div", {
                    className: "settings-category"
                }, r.createElement("h3", null, this.props.title), r.createElement("ul", null, this.props.children))
            }
        })
    }, {}],
    48: [function(e, t, s) {
        var n, r, o;
        r = window.React, o = e("../../../events"), n = r.addons.PureRenderMixin, t.exports = r.createClass({
            displayName: "ToggleItem",
            mixins: [n],
            propTypes: {
                label: r.PropTypes.string.isRequired,
                onChange: r.PropTypes.func.isRequired,
                enabled: r.PropTypes.bool.isRequired
            },
            render: function() {
                return r.createElement("li", {
                    className: "toggle-item"
                }, r.createElement("label", null, this.props.label), r.createElement("label", {
                    className: "toggle"
                }, r.createElement("input", {
                    onChange: this.props.onChange,
                    checked: this.props.enabled,
                    type: "checkbox",
                    className: "ios-switch stateToggle onoffswitch-checkbox"
                }), r.createElement("div", {
                    className: "switch " + (this.props.enabled ? "switch-enabled" : "switch-disabled")
                })))
            }
        })
    }, {
        "../../../events": 8
    }],
    49: [function(e, t, s) {
        var n;
        n = window.Bacon, s.router = function(e) {
            var t;
            return null == e && (e = "home"), t = n.fromEventTarget(window, "hashchange").bufferingThrottle(500).merge(n.once()).map(function() {
                var e;
                return null != (e = location.hash) ? e.slice(1) : void 0
            }).scan({
                stack: [e],
                direction: "right"
            }, function(e, t) {
                var s;
                return t = t || "home", s = e.stack.indexOf(t), ~s ? (e.direction = "left", e.stack = e.stack.slice(0, s + 1)) : (e.direction = "right", e.stack.push(t)), e
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