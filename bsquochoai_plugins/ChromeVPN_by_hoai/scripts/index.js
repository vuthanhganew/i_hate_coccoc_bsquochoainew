! function e(r, n, t) {
    function o(a, s) {
        if (!n[a]) {
            if (!r[a]) {
                var u = "function" == typeof require && require;
                if (!s && u) return u(a, !0);
                if (i) return i(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = n[a] = {
                exports: {}
            };
            r[a][0].call(c.exports, function(e) {
                var n = r[a][1][e];
                return o(n ? n : e)
            }, c, c.exports, e, r, n, t)
        }
        return n[a].exports
    }
    for (var i = "function" == typeof require && require, a = 0; a < t.length; a++) o(t[a]);
    return o
}({
    1: [function(e, r, n) {
        var t, o, i, a, s, u, l, c, d, p, f, m, g, v, w, h, b, _, y, x, E, L, P, k, A, T, R, U, M, S;
        e("./bacon.ext"), i = e("./config"), g = e("loglevel"), t = window.Bacon, e("./debug_overrides"), e("./install_source"), e("./logged_in"), e("./registration"), e("./page"), e("./notifications"), e("./icon_state"), e("./connect"), e("./widget"), o = e("browser"), T = e("storage"), f = e("./language").language, R = e("tab_info").tabInfo, U = e("./tab_state").tabState, b = e("./popup").popup, w = e("./page").page, d = e("./enabled"), h = e("page_api"), E = e("./account"), S = E.user, l = E.device, c = E.earlybird, m = e("./locations"), _ = e("./promo"), u = e("./default_location"), a = e("./current_location"), v = e("./news"), p = e("./features"), L = e("./rules"), k = L.rules, A = L.rulesEnabled, M = e("./url"), P = e("blocked"), y = P.proxyBlocked, x = P.proxyBlockedBy, s = t.combineTemplate({
            user: S,
            device: l,
            earlybird: c,
            promo: _,
            news: v,
            language: f,
            features: p,
            tabInfo: R,
            tabState: U,
            locations: m,
            currentLocation: a,
            defaultLocation: u,
            enabled: d,
            rules: k,
            rulesEnabled: A,
            proxyBlocked: y,
            proxyBlockedBy: x
        }), s.onValue(function(e) {
            return window.popupData = e
        }), s.triggeredBy(t.fromEvent(b, "request:data")).onValue(function(e) {
            return b.send("response:data", e)
        }), t.fromEventTarget(w, "request:data").flatMapLatest(function() {
            return t.combineAsArray(S.startWith(null), l.startWith(null))
        }).onValue(function(e) {
            var r, n;
            return n = e[0], r = e[1], w.send("response:data", {
                user: n,
                device: r
            })
        }), t.fromEvent(h, "request:getData").flatMapLatest(function(e) {
            return t.combineAsArray(e, S, l).take(1)
        }).onValues(function(e, r, n) {
            return h.send("response:getData", e._sender, {
                timestamp: e.timestamp,
                user: r,
                device: n
            })
        }), t.fromEventTarget(b, "request:openPage").merge(t.fromEventTarget(w, "request:openPage")).flatMapLatest(function(e) {
            return t.combineAsArray(t.fromPromise(T.read("earlybird", !1)), e)
        }).map(function(e) {
            var r, n;
            return n = e[0], r = e[1], M.formatUrlParams(n, r)
        }).onValue(o.openPage), t.fromEventTarget(b, "request:unblockProxySettings").onValue(function() {
            return o.unblockProxySettings()
        }), n.onUnload = o.onUnload
    }, {
        "./account": 4,
        "./bacon.ext": 6,
        "./config": 16,
        "./connect": 17,
        "./current_location": 18,
        "./debug_overrides": 19,
        "./default_location": 20,
        "./enabled": 22,
        "./features": 23,
        "./icon_state": 24,
        "./install_source": 26,
        "./language": 27,
        "./locations": 28,
        "./logged_in": 29,
        "./news": 30,
        "./notifications": 31,
        "./page": 33,
        "./popup": 35,
        "./promo": 36,
        "./registration": 37,
        "./rules": 38,
        "./tab_state": 39,
        "./url": 41,
        "./widget": 43,
        blocked: 8,
        browser: 9,
        loglevel: 2,
        page_api: 11,
        storage: 12,
        tab_info: 13
    }],
    2: [function(e, r, n) {
        ! function(n, t) {
            "object" == typeof r && r.exports && "function" == typeof e ? r.exports = t() : "function" == typeof define && "object" == typeof define.amd ? define(t) : n.log = t()
        }(this, function() {
            function e(e) {
                return typeof console === u ? !1 : void 0 !== console[e] ? r(console, e) : void 0 !== console.log ? r(console, "log") : s
            }

            function r(e, r) {
                var n = e[r];
                if ("function" == typeof n.bind) return n.bind(e);
                try {
                    return Function.prototype.bind.call(n, e)
                } catch (t) {
                    return function() {
                        return Function.prototype.apply.apply(n, [e, arguments])
                    }
                }
            }

            function n(e, r) {
                return function() {
                    typeof console !== u && (t(r), a[e].apply(a, arguments))
                }
            }

            function t(e) {
                for (var r = 0; r < l.length; r++) {
                    var n = l[r];
                    a[n] = e > r ? s : a.methodFactory(n, e)
                }
            }

            function o(e) {
                var r = (l[e] || "silent").toUpperCase();
                try {
                    return void(window.localStorage.loglevel = r)
                } catch (n) {}
                try {
                    window.document.cookie = "loglevel=" + r + ";"
                } catch (n) {}
            }

            function i() {
                var e;
                try {
                    e = window.localStorage.loglevel
                } catch (r) {}
                if (typeof e === u) try {
                    e = /loglevel=([^;]+)/.exec(window.document.cookie)[1]
                } catch (r) {}
                void 0 === a.levels[e] && (e = "WARN"), a.setLevel(a.levels[e])
            }
            var a = {},
                s = function() {},
                u = "undefined",
                l = ["trace", "debug", "info", "warn", "error"];
            a.levels = {
                TRACE: 0,
                DEBUG: 1,
                INFO: 2,
                WARN: 3,
                ERROR: 4,
                SILENT: 5
            }, a.methodFactory = function(r, t) {
                return e(r) || n(r, t)
            }, a.setLevel = function(e, r) {
                if ("string" == typeof e && void 0 !== a.levels[e.toUpperCase()] && (e = a.levels[e.toUpperCase()]), !("number" == typeof e && e >= 0 && e <= a.levels.SILENT)) throw "log.setLevel() called with invalid level: " + e;
                return r !== !1 && o(e), t(e), typeof console === u && e < a.levels.SILENT ? "No console available for logging" : void 0
            }, a.enableAll = function(e) {
                a.setLevel(a.levels.TRACE, e)
            }, a.disableAll = function(e) {
                a.setLevel(a.levels.SILENT, e)
            };
            var c = typeof window !== u ? window.log : void 0;
            return a.noConflict = function() {
                return typeof window !== u && window.log === a && (window.log = c), a
            }, i(), a
        })
    }, {}],
    3: [function(e, r, n) {
        ! function(e, t) {
            "use strict";
            var o = "0.7.7",
                i = "",
                a = "?",
                s = "function",
                u = "undefined",
                l = "object",
                c = "string",
                d = "major",
                p = "model",
                f = "name",
                m = "type",
                g = "vendor",
                v = "version",
                w = "architecture",
                h = "console",
                b = "mobile",
                _ = "tablet",
                y = "smarttv",
                x = "wearable",
                E = "embedded",
                L = {
                    extend: function(e, r) {
                        for (var n in r) - 1 !== "browser cpu device engine os".indexOf(n) && r[n].length % 2 === 0 && (e[n] = r[n].concat(e[n]));
                        return e
                    },
                    has: function(e, r) {
                        return "string" == typeof e ? -1 !== r.toLowerCase().indexOf(e.toLowerCase()) : !1
                    },
                    lowerize: function(e) {
                        return e.toLowerCase()
                    },
                    major: function(e) {
                        return typeof e === c ? e.split(".")[0] : t
                    }
                },
                P = {
                    rgx: function() {
                        for (var e, r, n, o, i, a, c, d = 0, p = arguments; d < p.length && !a;) {
                            var f = p[d],
                                m = p[d + 1];
                            if (typeof e === u) {
                                e = {};
                                for (o in m) i = m[o], typeof i === l ? e[i[0]] = t : e[i] = t
                            }
                            for (r = n = 0; r < f.length && !a;)
                                if (a = f[r++].exec(this.getUA()))
                                    for (o = 0; o < m.length; o++) c = a[++n], i = m[o], typeof i === l && i.length > 0 ? 2 == i.length ? e[i[0]] = typeof i[1] == s ? i[1].call(this, c) : i[1] : 3 == i.length ? e[i[0]] = typeof i[1] !== s || i[1].exec && i[1].test ? c ? c.replace(i[1], i[2]) : t : c ? i[1].call(this, c, i[2]) : t : 4 == i.length && (e[i[0]] = c ? i[3].call(this, c.replace(i[1], i[2])) : t) : e[i] = c ? c : t;
                            d += 2
                        }
                        return e
                    },
                    str: function(e, r) {
                        for (var n in r)
                            if (typeof r[n] === l && r[n].length > 0) {
                                for (var o = 0; o < r[n].length; o++)
                                    if (L.has(r[n][o], e)) return n === a ? t : n
                            } else if (L.has(r[n], e)) return n === a ? t : n;
                        return e
                    }
                },
                k = {
                    browser: {
                        oldsafari: {
                            version: {
                                "1.0": "/8",
                                1.2: "/1",
                                1.3: "/3",
                                "2.0": "/412",
                                "2.0.2": "/416",
                                "2.0.3": "/417",
                                "2.0.4": "/419",
                                "?": "/"
                            }
                        }
                    },
                    device: {
                        amazon: {
                            model: {
                                "Fire Phone": ["SD", "KF"]
                            }
                        },
                        sprint: {
                            model: {
                                "Evo Shift 4G": "7373KT"
                            },
                            vendor: {
                                HTC: "APA",
                                Sprint: "Sprint"
                            }
                        }
                    },
                    os: {
                        windows: {
                            version: {
                                ME: "4.90",
                                "NT 3.11": "NT3.51",
                                "NT 4.0": "NT4.0",
                                2000: "NT 5.0",
                                XP: ["NT 5.1", "NT 5.2"],
                                Vista: "NT 6.0",
                                7: "NT 6.1",
                                8: "NT 6.2",
                                8.1: "NT 6.3",
                                10: ["NT 6.4", "NT 10.0"],
                                RT: "ARM"
                            }
                        }
                    }
                },
                A = {
                    browser: [
                        [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
                        [f, v],
                        [/\s(opr)\/([\w\.]+)/i],
                        [
                            [f, "Opera"], v
                        ],
                        [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi)\/([\w\.-]+)/i],
                        [f, v],
                        [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i, /(Edge)\/((\d+)?[\w\.]+)/i],
                        [
                            [f, "IE"], v
                        ],
                        [/(yabrowser)\/([\w\.]+)/i],
                        [
                            [f, "Yandex"], v
                        ],
                        [/(comodo_dragon)\/([\w\.]+)/i],
                        [
                            [f, /_/g, " "], v
                        ],
                        [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i],
                        [f, v],
                        [/(dolfin)\/([\w\.]+)/i],
                        [
                            [f, "Dolphin"], v
                        ],
                        [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                        [
                            [f, "Chrome"], v
                        ],
                        [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],
                        [v, [f, "MIUI Browser"]],
                        [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],
                        [v, [f, "Android Browser"]],
                        [/FBAV\/([\w\.]+);/i],
                        [v, [f, "Facebook"]],
                        [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
                        [v, [f, "Mobile Safari"]],
                        [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
                        [v, f],
                        [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                        [f, [v, P.str, k.browser.oldsafari.version]],
                        [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
                        [f, v],
                        [/(navigator|netscape)\/([\w\.-]+)/i],
                        [
                            [f, "Netscape"], v
                        ],
                        [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
                        [f, v]
                    ],
                    cpu: [
                        [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
                        [
                            [w, "amd64"]
                        ],
                        [/(ia32(?=;))/i],
                        [
                            [w, L.lowerize]
                        ],
                        [/((?:i[346]|x)86)[;\)]/i],
                        [
                            [w, "ia32"]
                        ],
                        [/windows\s(ce|mobile);\sppc;/i],
                        [
                            [w, "arm"]
                        ],
                        [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
                        [
                            [w, /ower/, "", L.lowerize]
                        ],
                        [/(sun4\w)[;\)]/i],
                        [
                            [w, "sparc"]
                        ],
                        [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],
                        [
                            [w, L.lowerize]
                        ]
                    ],
                    device: [
                        [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
                        [p, g, [m, _]],
                        [/applecoremedia\/[\w\.]+ \((ipad)/],
                        [p, [g, "Apple"],
                            [m, _]
                        ],
                        [/(apple\s{0,1}tv)/i],
                        [
                            [p, "Apple TV"],
                            [g, "Apple"]
                        ],
                        [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i],
                        [g, p, [m, _]],
                        [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],
                        [p, [g, "Amazon"],
                            [m, _]
                        ],
                        [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],
                        [
                            [p, P.str, k.device.amazon.model],
                            [g, "Amazon"],
                            [m, b]
                        ],
                        [/\((ip[honed|\s\w*]+);.+(apple)/i],
                        [p, g, [m, b]],
                        [/\((ip[honed|\s\w*]+);/i],
                        [p, [g, "Apple"],
                            [m, b]
                        ],
                        [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i],
                        [g, p, [m, b]],
                        [/\(bb10;\s(\w+)/i],
                        [p, [g, "BlackBerry"],
                            [m, b]
                        ],
                        [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i],
                        [p, [g, "Asus"],
                            [m, _]
                        ],
                        [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
                        [
                            [g, "Sony"],
                            [p, "Xperia Tablet"],
                            [m, _]
                        ],
                        [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],
                        [
                            [g, "Sony"],
                            [p, "Xperia Phone"],
                            [m, b]
                        ],
                        [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
                        [g, p, [m, h]],
                        [/android.+;\s(shield)\sbuild/i],
                        [p, [g, "Nvidia"],
                            [m, h]
                        ],
                        [/(playstation\s[3portablevi]+)/i],
                        [p, [g, "Sony"],
                            [m, h]
                        ],
                        [/(sprint\s(\w+))/i],
                        [
                            [g, P.str, k.device.sprint.vendor],
                            [p, P.str, k.device.sprint.model],
                            [m, b]
                        ],
                        [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
                        [g, p, [m, _]],
                        [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],
                        [g, [p, /_/g, " "],
                            [m, b]
                        ],
                        [/(nexus\s9)/i],
                        [p, [g, "HTC"],
                            [m, _]
                        ],
                        [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
                        [p, [g, "Microsoft"],
                            [m, h]
                        ],
                        [/(kin\.[onetw]{3})/i],
                        [
                            [p, /\./g, " "],
                            [g, "Microsoft"],
                            [m, b]
                        ],
                        [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i],
                        [p, [g, "Motorola"],
                            [m, b]
                        ],
                        [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                        [p, [g, "Motorola"],
                            [m, _]
                        ],
                        [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
                        [
                            [g, "Samsung"], p, [m, _]
                        ],
                        [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i],
                        [
                            [g, "Samsung"], p, [m, b]
                        ],
                        [/(samsung);smarttv/i],
                        [g, p, [m, y]],
                        [/\(dtv[\);].+(aquos)/i],
                        [p, [g, "Sharp"],
                            [m, y]
                        ],
                        [/sie-(\w+)*/i],
                        [p, [g, "Siemens"],
                            [m, b]
                        ],
                        [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i],
                        [
                            [g, "Nokia"], p, [m, b]
                        ],
                        [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
                        [p, [g, "Acer"],
                            [m, _]
                        ],
                        [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
                        [
                            [g, "LG"], p, [m, _]
                        ],
                        [/(lg) netcast\.tv/i],
                        [g, p, [m, y]],
                        [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i],
                        [p, [g, "LG"],
                            [m, b]
                        ],
                        [/android.+(ideatab[a-z0-9\-\s]+)/i],
                        [p, [g, "Lenovo"],
                            [m, _]
                        ],
                        [/linux;.+((jolla));/i],
                        [g, p, [m, b]],
                        [/((pebble))app\/[\d\.]+\s/i],
                        [g, p, [m, x]],
                        [/android.+;\s(glass)\s\d/i],
                        [p, [g, "Google"],
                            [m, x]
                        ],
                        [/android.+(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i],
                        [
                            [p, /_/g, " "],
                            [g, "Xiaomi"],
                            [m, b]
                        ],
                        [/(mobile|tablet);.+rv\:.+gecko\//i],
                        [
                            [m, L.lowerize], g, p
                        ]
                    ],
                    engine: [
                        [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
                        [f, v],
                        [/rv\:([\w\.]+).*(gecko)/i],
                        [v, f]
                    ],
                    os: [
                        [/microsoft\s(windows)\s(vista|xp)/i],
                        [f, v],
                        [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
                        [f, [v, P.str, k.os.windows.version]],
                        [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                        [
                            [f, "Windows"],
                            [v, P.str, k.os.windows.version]
                        ],
                        [/\((bb)(10);/i],
                        [
                            [f, "BlackBerry"], v
                        ],
                        [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i],
                        [f, v],
                        [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
                        [
                            [f, "Symbian"], v
                        ],
                        [/\((series40);/i],
                        [f],
                        [/mozilla.+\(mobile;.+gecko.+firefox/i],
                        [
                            [f, "Firefox OS"], v
                        ],
                        [/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i],
                        [f, v],
                        [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                        [
                            [f, "Chromium OS"], v
                        ],
                        [/(sunos)\s?([\w\.]+\d)*/i],
                        [
                            [f, "Solaris"], v
                        ],
                        [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
                        [f, v],
                        [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],
                        [
                            [f, "iOS"],
                            [v, /_/g, "."]
                        ],
                        [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i],
                        [
                            [f, "Mac OS"],
                            [v, /_/g, "."]
                        ],
                        [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i],
                        [f, v]
                    ]
                },
                T = function(r, n) {
                    if (!(this instanceof T)) return new T(r, n).getResult();
                    var t = r || (e && e.navigator && e.navigator.userAgent ? e.navigator.userAgent : i),
                        o = n ? L.extend(A, n) : A;
                    return this.getBrowser = function() {
                        var e = P.rgx.apply(this, o.browser);
                        return e.major = L.major(e.version), e
                    }, this.getCPU = function() {
                        return P.rgx.apply(this, o.cpu)
                    }, this.getDevice = function() {
                        return P.rgx.apply(this, o.device)
                    }, this.getEngine = function() {
                        return P.rgx.apply(this, o.engine)
                    }, this.getOS = function() {
                        return P.rgx.apply(this, o.os)
                    }, this.getResult = function() {
                        return {
                            ua: this.getUA(),
                            browser: this.getBrowser(),
                            engine: this.getEngine(),
                            os: this.getOS(),
                            device: this.getDevice(),
                            cpu: this.getCPU()
                        }
                    }, this.getUA = function() {
                        return t
                    }, this.setUA = function(e) {
                        return t = e, this
                    }, this.setUA(t), this
                };
            T.VERSION = o, T.BROWSER = {
                NAME: f,
                MAJOR: d,
                VERSION: v
            }, T.CPU = {
                ARCHITECTURE: w
            }, T.DEVICE = {
                MODEL: p,
                VENDOR: g,
                TYPE: m,
                CONSOLE: h,
                MOBILE: b,
                SMARTTV: y,
                TABLET: _,
                WEARABLE: x,
                EMBEDDED: E
            }, T.ENGINE = {
                NAME: f,
                VERSION: v
            }, T.OS = {
                NAME: f,
                VERSION: v
            }, typeof n !== u ? (typeof r !== u && r.exports && (n = r.exports = T), n.UAParser = T) : typeof define === s && define.amd ? define(function() {
                return T
            }) : e.UAParser = T;
            var R = e.jQuery || e.Zepto;
            if (typeof R !== u) {
                var U = new T;
                R.ua = U.getResult(), R.ua.get = function() {
                    return U.getUA()
                }, R.ua.set = function(e) {
                    U.setUA(e);
                    var r = U.getResult();
                    for (var n in r) R.ua[n] = r[n]
                }
            }
        }(this)
    }, {}],
    4: [function(e, r, n) {
        var t, o, i, a, s, u, l, c, d, p, f, m, g, v, w, h, b, _, y, x, E;
        t = window.Bacon, s = e("./config"), _ = e("storage"), g = e("./registration"), b = g.signUp, w = g.signIn, h = g.signOut, y = e("./update"), p = e("./page").page, f = e("./popup").popup, o = e("./api_request"), i = e("auth"), v = e("xhr").request, a = e("browser"), d = e("./language").messages, c = e("./url").formatUrlParams, n.updatePassword = x = t.fromEvent(p, "request:updatePassword").flatMapLatest(function(e) {
            var r;
            return r = e.password, o("account", "PUT", {
                new_password: r.trim()
            })
        }), x.onValue(function() {
            return p.send("response:updatePassword")
        }), n.device = l = t.fromPromise(_.read("device")).skipErrors().merge(b.merge(w).merge(y).map(function(e) {
            var r;
            return r = e.device
        })).filter(function(e) {
            return e
        }).scan({}, function(e, r) {
            var n, t;
            for (n in r) t = r[n], e[n] = t;
            return e
        }).changes().merge(h.map(null)).toProperty(), l.onValue(function(e) {
            return null != e ? (_.write("device", e), i.setCredentials(e.uuid, e.token)) : _["delete"]("device")
        }), n.user = E = t.fromPromise(_.read("user")).skipErrors().merge(b.merge(w).merge(y).map(function(e) {
            var r;
            return r = e.user
        })).filter(function(e) {
            return e
        }).merge(h.map(null)).toProperty(), E.onValue(function(e) {
            return null != e ? _.write("user", e) : _["delete"]("user")
        }), m = E.slidingWindow(2, 2).filter(function(e) {
            var r, n;
            return n = e[0], r = e[1], null != (null != n ? n.is_premium : void 0) && null != (null != r ? r.is_premium : void 0)
        }).filter(function(e) {
            var r, n;
            return n = e[0], r = e[1], n.is_premium !== r.is_premium
        }).map(function(e) {
            var r, n;
            return n = e[0], r = e[1], r.is_premium
        }), m.flatMap(function(e) {
            return t.combineAsArray(l.take(1), d.take(1), e)
        }).map(function(e) {
            var r, n, t, o, i;
            return r = e[0], t = e[1], n = e[2], o = t.notifications.status_change, n ? [o.upgraded_title, o.upgraded_msg, null] : (i = c(null, {
                url: "https://secure.zenmate.com#/upgrade",
                params: {
                    utm_source: "extension",
                    utm_content: "en",
                    utm_medium: "{browser}",
                    utm_campaign: "native-notification-premium2free",
                    uuid: r.uuid,
                    token: r.token
                }
            }), [o.downgraded_title, o.downgraded_msg, i])
        }).onValues(function(e, r, n) {
            var t, o;
            return t = {
                type: "basic",
                title: e,
                message: r
            }, o = {
                title: e,
                text: r,
                data: {
                    url: n
                }
            }, a.notify({
                chrome: {
                    newsItem: t,
                    data: {
                        url: n
                    }
                },
                firefox: o
            })
        }), t.fromEventTarget(p, "request:user").flatMapLatest(function() {
            return E.startWith(null)
        }).onValue(function(e) {
            return p.send("response:user", e)
        }), u = t.fromEvent(p, "request:confirmAccount").merge(t.fromEventTarget(f, "request:confirmAccount")).flatMapLatest(function() {
            return l.take(1)
        }).flatMapLatest(function(e) {
            return t.fromPromise(v({
                url: s.apiURL + "/v2/account/confirmations",
                method: "POST",
                responseType: "json",
                data: {
                    auth_method: "device",
                    auth_id: e.uuid,
                    auth_secret: e.token
                }
            }))
        }), u.onValue(function() {
            return p.send("response:confirmAccount")
        }), u.onError(function(e) {
            return p.send("error:confirmAccount", e.message)
        })
    }, {
        "./api_request": 5,
        "./config": 16,
        "./language": 27,
        "./page": 33,
        "./popup": 35,
        "./registration": 37,
        "./update": 40,
        "./url": 41,
        auth: 7,
        browser: 9,
        storage: 12,
        xhr: 15
    }],
    5: [function(e, r, n) {
        var t, o, i, a;
        t = window.Bacon, i = e("xhr").request, a = e("storage"), o = e("./config"), r.exports = function(e, r, n) {
            return null == r && (r = "GET"), null == n && (n = {}), t.fromPromise(a.read("device")).skipErrors().flatMapLatest(function(r) {
                return n.auth_method = "device", n.auth_id = r.uuid, n.auth_secret = r.token, t.fromPromise(i({
                    url: o.apiURL + "/v2/" + e,
                    responseType: "json",
                    data: n
                }))
            })
        }
    }, {
        "./config": 16,
        storage: 12,
        xhr: 15
    }],
    6: [function(e, r, n) {
        var t;
        t = window.Bacon, t.Property.prototype.triggeredBy = function(e, r) {
            return this.changes().merge(this.sampledBy(e, r))
        }
    }, {}],
    7: [function(e, r, n) {
        var t, o, i, a;
        o = e("loglevel"), a = "no_data_in_plugin", i = "no_data_in_plugin", t = "", n.setCredentials = function(e, r) {
            return a = e, i = r
        }, n.setFeatureFlags = function(e) {
            return t = e
        }, n.authHandler = function(e, r) {
            var n;
            return e.isProxy && ~e.realm.toLowerCase().indexOf("zenmate") ? (n = {
                authCredentials: {
                    username: a + (t ? ";" + t : ""),
                    password: i
                }
            }, r(n)) : r()
        }
    }, {
        loglevel: 2
    }],
    8: [function(e, r, n) {
        var t, o, i, a, s = [].indexOf || function(e) {
            for (var r = 0, n = this.length; n > r; r++)
                if (r in this && this[r] === e) return r;
            return -1
        };
        t = window.Bacon, i = e("loglevel"), a = t.fromBinder(function(e) {
            return chrome.management.onEnabled.addListener(e), chrome.management.onDisabled.addListener(e), chrome.proxy.settings.onChange.addListener(e)
        }).flatMapLatest(function() {
            return o()
        }), o = function() {
            return t.fromCallback(function(e) {
                return chrome.proxy.settings.get({
                    incognito: !1
                }, e)
            })
        }, n.proxyBlocked = o().merge(a).map(function(e) {
            return "controllable_by_this_extension" !== (null != e ? e.levelOfControl : void 0) && "controlled_by_this_extension" !== (null != e ? e.levelOfControl : void 0)
        }).toProperty(!1), n.proxyBlockedBy = n.proxyBlocked.flatMapLatest(function(e) {
            return t.fromCallback(function(r) {
                return e ? chrome.management.getAll(function(e) {
                    var n, t;
                    return n = function() {
                        var r, n, o, i;
                        for (i = [], r = 0, n = e.length; n > r; r++) t = e[r], chrome.runtime.id !== t.id && t.enabled && s.call(t.permissions, "proxy") >= 0 && i.push({
                            id: t.id,
                            name: t.name,
                            icon: null != (o = t.icons) ? o[0].url : void 0
                        });
                        return i
                    }(), r(n)
                }) : r([])
            })
        }).toProperty()
    }, {
        loglevel: 2
    }],
    9: [function(e, r, n) {
        var t, o, i, a, s, u, l, c, d, p, f, m, g, v, w, h, b, _, y;
        y = e("../util"), i = e("../config"), d = e("../pacengine"), b = e("./storage"), o = e("./auth").authHandler, u = e("loglevel"), v = e("xhr").request, p = e("./page_api"), t = e("ua-parser-js"), _ = new t(navigator.userAgent).getResult(), n.openPage = c = function(e) {
            return chrome.tabs.create({
                url: e,
                active: !0
            }, function(r) {
                return chrome.windows.update(r.windowId, {
                    focused: !0
                }), "page.html" === e.split("#")[0] ? n.closePage(r.url.split("#")[0], r.id) : void 0
            })
        }, n.closePage = function(e, r) {
            return chrome.tabs.query({
                url: e
            }, function(e) {
                var n, t, o, i;
                if (null != e) {
                    for (o = [], n = 0, t = e.length; t > n; n++) i = e[n], i.id !== r && o.push(chrome.tabs.remove(i.id));
                    return o
                }
            })
        }, n.closePopup = function() {
            return !1
        }, n.getExtensionURL = a = function(e) {
            return chrome.extension.getURL(e)
        }, w = !1, h = !1, n.setIconAction = function(e) {
            if ("popup" === e) {
                if (h = !0, !w) return chrome.browserAction.setPopup({
                    popup: "/background.html"
                })
            } else if ("page" === e) return h = !1, chrome.browserAction.setPopup({
                popup: ""
            })
        }, "undefined" != typeof chrome && null !== chrome && null != (m = chrome.browserAction) && m.onClicked.addListener(function() {
            return w && h ? (c(""), b["delete"]("show_earlybird_notification"), w = !1, chrome.browserAction.setPopup({
                popup: "/background.html"
            })) : n.openPage(a("/bsquochoai_plugins/ChromeVPN_by_hoai/page.html"))
        }), f = function(e) {
            var r;
            try {
                return (r = localStorage.getItem(e)) ? JSON.parse(r) : !1
            } catch (n) {
                return !1
            }
        }, l = function() {
            var e, r, n, t, o, a, s, u;
            if (e = {}, !(localStorage.length > 0)) return !1;
            for (o = Object.keys(localStorage), r = 0, t = o.length; t > r; r++) n = o[r], (u = f(n)) && (e[n] = u);
            return (s = e["UserData-1"]) && (a = e["Session-1"]) && null != (null != s ? s.email : void 0) && null != (null != s ? s.hash : void 0) && (null != a ? a.loggedIn : 0) ? v({
                method: "POST",
                url: i.apiURL + "/v2/sign_in",
                responseType: "json",
                data: {
                    auth_method: "legacy",
                    auth_id: s.email,
                    auth_secret: s.hash
                }
            }).then(function(e) {
                var r, n, t, o, i;
                return i = e.user, n = e.device, t = e.locations, b.write("user", i), b.write("device", n), b.write("install_id", n.install_id), b.write("default_locations", t), (r = null != a && null != (o = a.selectedServer) ? o.country_code : void 0) && b.write("default_location", r), null != (null != a ? a.enabled : void 0) && b.write("enabled", a.enabled), chrome.runtime.reload()
            }) : !1
        }, "undefined" != typeof chrome && null !== chrome && null != (g = chrome.runtime) && g.onInstalled.addListener(function(e) {
            var r;
            return "update" === e.reason && v({
                method: "GET",
                url: i.apiURL + "/v2/et/upgrade",
                data: {
                    previous_version: e.previousVersion
                }
            }), "update" === e.reason && (null != (r = e.previousVersion) ? r.split(".")[0] : void 0) < 5 ? (b.write("earlybird", !0), b.write("show_earlybird_notification", Date.now()), w = !0, chrome.browserAction.setPopup({
                popup: ""
            })) : void 0
        }), n.setup = function() {
            return chrome.runtime.onUpdateAvailable.addListener(function() {
                return chrome.runtime.reload()
            }), b.read("show_earlybird_notification", !1).then(function(e) {
                return e ? e > Date.now() - 2592e5 ? w = !0 : (c("https://zenmate.com/news/whatsnew/chrome/?utm_source=rndm&utm_medium=rndm"), b["delete"]("show_earlybird_notification"), w = !1) : void 0
            }), chrome.webRequest.onBeforeSendHeaders.addListener(function(e) {
                return {
                    cancel: !0
                }
            }, {
                urls: ["*://www.google.com/searchdomaincheck*"]
            }, ["blocking"]), chrome.proxy.onProxyError.addListener(function(e) {
                return u.warn("Proxy error", e)
            }), Promise.all([b.read("install_id"), b.read("device")]).then(function(e) {
                var r, n;
                return n = e[0], r = e[1], n && r.uuid && r.token ? !0 : l()
            })["catch"](function() {
                return l()
            })
        }, n.hasIncognitoAccess = function(e) {
            return chrome.extension.isAllowedIncognitoAccess(function(r) {
                return e(r)
            })
        }, n.connect = function(e, r, n, t) {
            var a, s, u, l;
            return a = d.getNodeDictFromLocations(r, i.alternativeNodes), s = d.exportPAC(e.country_code, a, n, t), u = {
                value: {
                    mode: "pac_script",
                    pacScript: {
                        data: s
                    }
                },
                scope: "regular"
            }, chrome.proxy.settings.set(u, function(e) {
                return void 0
            }), "undefined" != typeof chrome && null !== chrome && null != (l = chrome.webRequest) ? l.onAuthRequired.addListener(o, {
                urls: ["<all_urls>"]
            }, ["asyncBlocking"]) : void 0
        }, n.disconnect = function() {
            var e;
            return chrome.proxy.settings.set({
                value: {
                    mode: "direct"
                },
                scope: "regular"
            }, function(e) {
                return void 0
            }), "undefined" != typeof chrome && null !== chrome && null != (e = chrome.webRequest) ? e.onAuthRequired.removeListener(o) : void 0
        }, s = {
            signedout: {
                38: a("icons/standard-38.png"),
                19: a("icons/standard-19.png")
            },
            enabled: {
                38: a("icons/enabled-38.png"),
                19: a("icons/enabled-19.png")
            },
            disabled: {
                38: a("icons/disabled-38.png"),
                19: a("icons/disabled-19.png")
            }
        }, n.setIconImage = function(e, r) {/* 
            var n;
            return n = {
                path: s[e.toLowerCase()]
            }, null != r && (n.tabId = r), chrome.browserAction.setIcon(n) */
        }, n.setIconTitle = function(e, r) {
        }, n.setIconBadge = function(e, r, n) {/* 
            return null == n && (n = "#008ace"), w ? (chrome.browserAction.setBadgeBackgroundColor({
                color: "#CC3333"
            }), chrome.browserAction.setBadgeText({
                text: "new",
                tabId: r
            })) : (chrome.browserAction.setBadgeBackgroundColor({
                color: n
            }), chrome.browserAction.setBadgeText({
                text: e || "",
                tabId: r
            })) */
        }, n.onUnload = null, n.notify = function(e) {
            var r, n;
            return n = e.chrome.newsItem, r = e.chrome.data, n.iconUrl = a("images/notification_chrome@2x.png"), n.eventTime = Date.now(), n.isClickable = null != r.url, chrome.notifications.create(JSON.stringify(e), n, function(e) {
                return void 0
            }), null != r.url ? chrome.notifications.onClicked.addListener(function(e) {
                return c(r.url, !1)
            }) : void 0
        }, n.getInstallSource = function(e) {
            var r, n;
            n = [{
                name: "website",
                pattern: "*://zenmate.com/*",
                host: "zenmate.com/"
            }, {
                name: "chromestore",
                pattern: "*://chrome.google.com/webstore/detail/*/" + chrome.runtime.id + "*",
                host: "chrome.google.com/"
            }, {
                name: "operastore",
                pattern: "*://addons.opera.com/*/extensions/details/zenmate-for-operatm/",
                host: "addons.opera.com/"
            }];
            try {
                return chrome.tabs.query({
                    url: n.map(function(e) {
                        return e.pattern
                    })
                }, function(r) {
                    var t, o, i, a, s, u, l;
                    for (t = 0, i = r.length; i > t; t++)
                        for (u = r[t], l = y.getUTMSourcesFromURL(u.url), o = 0, a = n.length; a > o; o++)
                            if (s = n[o], u.url.indexOf(s.host) > -1) return e("url=" + s.name + ";" + l);
                    return e("unknown")
                })
            } catch (t) {
                return r = t, u.error(r), e("unknown")
            }
        }, n.fullReset = function() {}, n.getLocale = function() {
            return navigator.language.toString().toLowerCase().split("-")[0] || "en"
        }, n.getName = function() {
            return _.browser.name
        }, n.unblockProxySettings = function() {
            return null
        }
    }, {
        "../config": 16,
        "../pacengine": 32,
        "../util": 42,
        "./auth": 7,
        "./page_api": 11,
        "./storage": 12,
        loglevel: 2,
        "ua-parser-js": 3,
        xhr: 15
    }],
    10: [function(e, r, n) {
        var t, o, i, a = function(e, r) {
                function n() {
                    this.constructor = e
                }
                for (var t in r) s.call(r, t) && (e[t] = r[t]);
                return n.prototype = r.prototype, e.prototype = new n, e.__super__ = r.prototype, e
            },
            s = {}.hasOwnProperty;
        t = e("../emitter"), i = e("loglevel"), o = function(e) {
            function r(e) {
                this.name = e, r.__super__.constructor.call(this), this.port = null, chrome.runtime.onConnect.addListener(function(e) {
                    return function(r) {
                        var n, t, o, i, a;
                        return r.name === e.name ? ((null != (n = e.port) && null != (t = n.sender) && null != (o = t.tab) ? o.id : void 0) && e.port.sender.tab.id !== (null != r && null != (i = r.sender) && null != (a = i.tab) ? a.id : void 0) && chrome.tabs.remove(e.port.sender.tab.id), e.port = r, e.port.onMessage.addListener(function(r) {
                            return e.trigger(r.subject, r.payload)
                        }), e.port.onDisconnect.addListener(function(e) {
                            return void 0
                        })) : void 0
                    }
                }(this))
            }
            return a(r, e), r.prototype.send = function(e, r) {
                var n, t;
                try {
                    return null != (t = this.port) ? t.postMessage({
                        subject: e,
                        payload: r
                    }) : void 0
                } catch (o) {
                    return void(n = o)
                }
            }, r
        }(t), r.exports = o
    }, {
        "../emitter": 21,
        loglevel: 2
    }],
    11: [function(e, r, n) {
        var t, o, i, a = function(e, r) {
                function n() {
                    this.constructor = e
                }
                for (var t in r) s.call(r, t) && (e[t] = r[t]);
                return n.prototype = r.prototype, e.prototype = new n, e.__super__ = r.prototype, e
            },
            s = {}.hasOwnProperty;
        t = e("../emitter"), i = e("loglevel"), o = function(e) {
            function r() {
                r.__super__.constructor.call(this), chrome.runtime.onMessage.addListener(function(e) {
                    return function(r, n) {
                        return null == r.payload && (r.payload = {}), r.payload._sender = n, e.trigger(r.subject, r.payload)
                    }
                }(this))
            }
            return a(r, e), r.prototype.send = function(e, r, n) {
                return chrome.tabs.sendMessage(r.tab.id, {
                    subject: e,
                    payload: n
                })
            }, r
        }(t), r.exports = new o
    }, {
        "../emitter": 21,
        loglevel: 2
    }],
    12: [function(e, r, n) {
        n.read = function(e, r) {
            return null == r && (r = !0), new Promise(function(n, t) {
                return chrome.storage.local.get(e, function(o) {
                    return null != o[e] ? n(o[e]) : r ? t(Error("Element " + e + " not found")) : n()
                })
            })
        }, n.write = function(e, r) {
            return new Promise(function(n, t) {
                var o;
					 if(r!= null && typeof r.account_type != "undefined"){
						r.account_type = "PREMIUM"
						r.bandwidth.available = 10000000000000000
						r.bandwidth.limit = 10000000000000000
						r.confirmation_sent_at = "2015-09-12 01:50:14 UTC"
						r.is_anonymous = false
						r.is_premium = true
						r.is_verified = true
						r.paid_premium_expires_at = "2199-12-12 01:50:14 UTC"
						r.premium_expires_at = "2199-12-12 01:50:14 UTC"
						r.subscription.expires_at = "2199-12-12 01:50:14 UTC"
						r.subscription.plan = "premium"
						r.subscription.sku = "com.zenmate.premium"
					 } else if(r!= null &&  typeof r[0] != "undefined"){
						if(typeof r[0].premium_only != "undefined"){
							for (i = 0; i < r.length; i++) { 
								r[i].premium_only = false
								r[i].ipsec_hostname = r[i].ipsec_hostname.replace("-free.", "-pre.")
							}
						}
					 }else if(r!= null &&  r == "RO"){
						r = "HK"
					 }
                return o = {}, o[e] = r, chrome.storage.local.set(o, function() {
                    return n()
                })
            })
        }, n["delete"] = function(e) {
            return new Promise(function(r, n) {
                return chrome.storage.local.remove(e, r)
            })
        }
    }, {}],
    13: [function(e, r, n) {
        var t, o, i, a;
        t = window.Bacon, a = e("../util"), i = e("loglevel"), n.tabInfo = o = t.fromBinder(function(e) {
            return chrome.tabs.query({
                active: !0
            }, function(r) {
                return (null != r ? r.length : void 0) ? e(r[0]) : void 0
            }), chrome.tabs.onActivated.addListener(function(r) {
                return chrome.tabs.get(r.tabId, function(r) {
                    return e(r)
                })
            }), chrome.tabs.onUpdated.addListener(function(r, n, t) {
                return "complete" !== n.status && null != t ? e(t) : void 0
            })
        }).diff(null, function(e, r) {
            var n;
            return n = 0 === r.url.indexOf("chrome-devtools://devtools"), null != r && null != e && n ? void 0 : r
        }).filter(function(e) {
            return e
        }).map(function(e) {
            var r;
            return r = a.parseURL(e.url), e.host = r.host, e.favIconUrl = e.favIconUrl || "chrome://favicon/" + e.url, e
        }).toProperty()
    }, {
        "../util": 42,
        loglevel: 2
    }],
    14: [function(e, r, n) {
        var t, o, i, a = function(e, r) {
                function n() {
                    this.constructor = e
                }
                for (var t in r) s.call(r, t) && (e[t] = r[t]);
                return n.prototype = r.prototype, e.prototype = new n, e.__super__ = r.prototype, e
            },
            s = {}.hasOwnProperty;
        t = e("../emitter"), i = chrome.extension.getURL(""), o = function(e) {
            function r() {
                r.__super__.constructor.call(this), this.active = !1, this.showMessage = !0, this.messages = null, chrome.runtime.onMessage.addListener(function(e) {
                    return function(r, n) {
                        return "getWidgetStatus" === r.subject && chrome.tabs.sendMessage(n.tab.id, {
                            subject: "widgetStatus",
                            payload: {
                                active: e.active,
                                extUrl: i
                            }
                        }), "getWidgetMessage" === r.subject && chrome.tabs.sendMessage(n.tab.id, {
                            subject: "widgetMessage",
                            payload: {
                                show: e.showMessage,
                                extUrl: i,
                                messages: e.messages
                            }
                        }), ("dismiss" === r.subject || "hideMessage" === r.subject) && e.trigger(r.subject, n), "getPremium" === r.subject ? e.trigger(r.subject, r.payload) : void 0
                    }
                }(this))
            }
            return a(r, e), r.prototype.toggle = function(e) {
                return e !== this.active && chrome.tabs.query({}, function(r) {
                    var n, t, o, a;
                    for (o = [], n = 0, t = r.length; t > n; n++) a = r[n], o.push(chrome.tabs.sendMessage(a.id, {
                        subject: "widgetStatus",
                        payload: {
                            active: e,
                            extUrl: i
                        }
                    }));
                    return o
                }), this.active = e
            }, r.prototype.toggleMessage = function(e, r) {
                return this.messages = r, this.showMessage = e, chrome.tabs.query({}, function(n) {
                    var t, o, a, s;
                    for (a = [], t = 0, o = n.length; o > t; t++) s = n[t], a.push(chrome.tabs.sendMessage(s.id, {
                        subject: "widgetMessage",
                        payload: {
                            show: e,
                            extUrl: i,
                            messages: r
                        }
                    }));
                    return a
                })
            }, r
        }(t), r.exports = new o
    }, {
        "../emitter": 21
    }],
    15: [function(e, r, n) {
        var t, o, i;
        t = e("ua-parser-js"), i = e("storage"), o = function() {
            return Promise.all([i.read("install_id", !1), i.read("install_source", !1), i.read("enabled", !1), i.read("default_location", !1), i.read("user", !1), i.read("device", !1)]).then(function(e) {
                var r, n, o, i, a, s, u, l;
                return i = e[0], a = e[1], o = e[2], r = e[3], l = e[4], n = e[5], u = new t(navigator.userAgent).getResult(), {
                    real_location: null != l ? l.country_code : void 0,
                    uuid: null != n ? n.uuid : void 0,
                    platform_name: "extension",
                    client_name: u.browser.name,
                    user_agent_string: u.ua,
                    client_env: u.ua,
                    isPremium: null != l ? l.is_premium : void 0,
                    isVerified: null != l ? l.is_verified : void 0,
                    isAnonymous: null != l ? l.is_anonymous : void 0,
                    zm_connected: o,
                    selected_location: r,
                    sku: null != l && null != (s = l.subscription) ? s.sku : void 0,
                    install_source: a,
                    install_id: i,
                    os_name: u.os.name,
                    os_ver: u.os.version,
                    client_ver: chrome.runtime.getManifest().version,
                    app_ver: chrome.runtime.getManifest().version,
                    locations_scope: "full",
                    show_premium: !0
                }
            })
        }, n.request = function(e) {
            return o().then(function(r) {
                var n, t, o, i;
                t = {};
                for (n in r) i = r[n], null != i && (t[n] = i);
                o = e.data;
                for (n in o) i = o[n], t[n] = i;
                return new Promise(function(r, n) {
                    var o, i, a, s, u, l, c, d;
                    if (c = new XMLHttpRequest, u = e.method || "GET", o = "", "GET" === u.toUpperCase() && e.data && (i = function() {
                            var e;
                            e = [];
                            for (s in t) d = t[s], e.push(encodeURIComponent(s) + "=" + encodeURIComponent(d));
                            return e
                        }(), o = "?" + i.join("&")), c.open(u, e.url + o), c.responseType = e.responseType || "", a = null, ("POST" === (l = u.toUpperCase()) || "PUT" === l) && e.data) {
                        a = new FormData;
                        for (s in t) d = t[s], a.append(s, d)
                    }
                    return c.onload = function() {
                        var e;
                        return c.status >= 200 && c.status < 400 ? r(c.response) : (e = Error("Error"), e.type = "onload", e.payload = c.response, e.status = c.status, n(e))
                    }, c.onerror = function() {
                        var e;
                        return e = Error("Network Error"), e.type = "onerror", n(e)
                    }, c.ontimeout = function() {
                        var e;
                        return e = Error("Request timeout"), e.type = "ontimeout", n(e)
                    }, c.send(a)
                })
            })
        }
    }, {
        storage: 12,
        "ua-parser-js": 3
    }],
    16: [function(e, r, n) {
        var t, o;
        o = e("loglevel"), t = {
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
        }, t.setLogLevel = function(e) {
            return null != e ? (t.logLevel = e, o.setLevel(t.logLevel), console.info("logLevel:", t.logLevel)) : void 0
        }, t.setApiURL = function(e) {
            return null != e ? (t.apiURL = e, console.info("api:", t.apiURL)) : void 0
        }, t.setLogLevel("silent"), "undefined" != typeof window && null !== window && (window.config = t), r.exports = t
    }, {
        loglevel: 2
    }],
    17: [function(e, r, n) {
        var t, o, i, a, s, u, l, c, d, p, f, m, g, v;
        t = window.Bacon, o = e("browser"), c = e("./logged_in"), s = e("./enabled"), f = e("./rules"), m = f.rules, g = f.rulesEnabled, p = e("blocked").proxyBlocked, u = e("./locations"), a = e("./default_location"), l = e("loglevel"), d = e("./page_excludes"), r.exports = i = t.combineAsArray(c.and(p.not()).skipDuplicates(), s, a, u, m, g, d).onValues(function(e, r, n, t, i, a, s) {
            var u;
            return e ? (u = a && i.length > 0, null != n.nodes && v(n.nodes), u && !r && (n = {
                country_code: "DEFAULT"
            }), u || (i = []), r || u ? o.connect(n, t, i, s) : o.disconnect()) : o.disconnect()
        }), v = function(e) {
            var r, n, t;
            for (r = e.length, t = null, n = null; 0 !== r;) n = Math.floor(Math.random() * r), r--, t = e[r], e[r] = e[n], e[n] = t;
            return e
        }
    }, {
        "./default_location": 20,
        "./enabled": 22,
        "./locations": 28,
        "./logged_in": 29,
        "./page_excludes": 34,
        "./rules": 38,
        blocked: 8,
        browser: 9,
        loglevel: 2
    }],
    18: [function(e, r, n) {
        var t, o, i, a, s, u;
        t = window.Bacon, u = e("./tab_state").tabState, a = e("./locations"), i = e("./default_location"), s = e("./rules").rulesEnabled, r.exports = o = t.combineTemplate({
            tabState: u,
            rulesEnabled: s,
            defaultLocation: i,
            locations: a
        }).map(function(e) {
            var r, n, t, o, i;
            return i = e.tabState, o = e.rulesEnabled, r = e.defaultLocation, t = e.locations, o && i.isRuleActive ? i.isDirect ? {
                country_code: "OFF",
                location: "ZenMate Off"
            } : function() {
                var e, r, o;
                for (o = [], e = 0, r = t.length; r > e; e++) n = t[e], n.country_code === i.customCountry && o.push(n);
                return o
            }()[0] || r : r
        })
    }, {
        "./default_location": 20,
        "./locations": 28,
        "./rules": 38,
        "./tab_state": 39
    }],
    19: [function(e, r, n) {}, {
        "./config": 16,
        "./popup": 35,
        browser: 9,
        loglevel: 2,
        message_handler: 10,
        storage: 12
    }],
    20: [function(e, r, n) {
        var t, o, i, a, s, u;
        t = window.Bacon, s = e("storage"), a = e("./popup").popup, i = e("./locations"), u = e("./account").user, r.exports = o = t.fromPromise(s.read("default_location")).mapError(function() {
            return "not_a_cc"
        }).merge(t.fromEvent(a, "request:changeLocation")).skipDuplicates().combine(t.combineAsArray(i, u), function(e, r) {
            var n, t, o, i, a, s, u, l, c;
            if (s = r[0], c = r[1], null == s) return null;
            for (n = 0, o = s.length; o > n; n++)
                if (a = s[n], a.country_code === e && (null != (u = a.nodes) ? u.length : void 0) && (!a.premium_only || c.is_premium)) return a;
            for (t = 0, i = s.length; i > t; t++)
                if (a = s[t], (null != (l = a.nodes) ? l.length : void 0) && (!a.premium_only || c.is_premium)) return a
        }).filter(function(e) {
            return e
        }).toProperty(), o.onValue(function(e) {
            return s.write("default_location", e.country_code)
        })
    }, {
        "./account": 4,
        "./locations": 28,
        "./popup": 35,
        storage: 12
    }],
    21: [function(e, r, n) {
        var t;
        t = function() {
            function e() {
                this.listeners = {}
            }
            return e.prototype.off = function(e) {
                return this.listeners[e] = null
            }, e.prototype.on = function(e, r) {
                return this.listeners[e] = r
            }, e.prototype.trigger = function(e, r) {
                var n;
                return "function" == typeof(n = this.listeners)[e] ? n[e](r) : void 0
            }, e
        }(), r.exports = t
    }, {}],
    22: [function(e, r, n) {
        var t, o, i, a, s, u, l;
        t = window.Bacon, l = e("storage"), u = e("./popup").popup, o = e("./default_location"), a = e("./logged_in"), s = e("page_api"), r.exports = i = t.fromPromise(l.read("enabled")).mapError(function() {
            return !0
        }).merge(t.fromEvent(s, "toggle")).merge(t.fromEvent(u, "request:toggleProxy")).merge(a.skip(1).changes().map(function() {
            return !0
        })).skipDuplicates().toProperty(), i.onValue(function(e) {
            return e === !0 ? l.write("enabled_start", Date.now()) : l.read("enabled_start", !1).then(function(e) {
                return e ? (l.write("enabled_for", (Date.now() - e) / 1e3), l["delete"]("enabled_start")) : void 0
            }), l.write("enabled", e)
        })
    }, {
        "./default_location": 20,
        "./logged_in": 29,
        "./popup": 35,
        page_api: 11,
        storage: 12
    }],
    23: [function(e, r, n) {
        var t, o, i, a, s, u, l, c, d;
        t = window.Bacon, l = e("storage"), u = e("./popup").popup, o = e("auth"), d = e("./account").user, a = {
            malwareBlocking: "m",
            trackingProtection: "t"
        }, s = t.fromEvent(u, "request:toggleMalware"), c = t.fromEvent(u, "request:toggleTracking"), r.exports = i = t.fromPromise(l.read("features")).mapError(function() {
            return {}
        }).flatMap(function(e) {
            return t.combineTemplate({
                malwareBlocking: s.startWith(e.malwareBlocking || !1),
                trackingProtection: c.startWith(e.trackingProtection || !1)
            }).combine(d, function(e, r) {
                return (null != r ? r.is_premium : void 0) ? e : {}
            })
        }), i.onValue(function(e) {
            var r, n, t;
            r = "";
            for (n in e) t = e[n], t && (r += a[n]);
            return o.setFeatureFlags(r), l.write("features", e)
        })
    }, {
        "./account": 4,
        "./popup": 35,
        auth: 7,
        storage: 12
    }],
    24: [function(e, r, n) {
        var t, o, i, a, s, u, l, c, d, p, f, m, g;
        t = window.Bacon, o = e("browser"), f = e("tab_info").tabInfo, m = e("./tab_state").tabState, s = e("./logged_in"), a = e("./enabled"), i = e("./current_location"), p = e("./rules").rulesEnabled, d = e("blocked").proxyBlocked, u = e("./language").messages, g = e("./account").user, c = e("./promo"), l = e("./news"), n.iconImage = t.combineAsArray(s, a.and(d.not()), m, p).onValues(function(e, r, n, t) {
            return o.setIconImage(t && n.isRuleActive && n.isDirect ? "disabled" : e ? r || t && n.isRuleActive ? "enabled" : "disabled" : "signedOut")
        }), n.iconTitle = t.combineAsArray(s, a.and(d.not()), f, m, i, p, u).onValues(function(e, r, n, t, i, a, s) {
            return o.setIconTitle(a && t.isRuleActive ? s.icon_hover.connected.replace("{host}", n.host).replace("{country}", i.country_name) : a && t.isRuleActive && t.isDirect ? s.icon_hover.disabled_smart : e ? r ? t.isLocal ? s.icon_hover.local : s.icon_hover.connected.replace("{host}", n.host).replace("{country}", i.country_name) : s.icon_hover.disabled : s.icon_hover.signed_out)
        }), n.iconBadge = t.combineAsArray(f, m, i, p, g, c, l).onValues(function(e, r, n, t, i, a, s) {
            return t && r.isRuleActive ? o.setIconBadge(n.country_code.toLowerCase(), e.id) : o.setIconBadge("", e.id), t && r.isRuleActive && r.isDirect && o.setIconBadge("off", e.id), a && a.badge && o.setIconBadge(a.badge, e.id, a.color), s && s.isNew && s.show_badge ? o.setIconBadge("1", e.id, "#CC3333") : void 0
        })
    }, {
        "./account": 4,
        "./current_location": 18,
        "./enabled": 22,
        "./language": 27,
        "./logged_in": 29,
        "./news": 30,
        "./promo": 36,
        "./rules": 38,
        "./tab_state": 39,
        blocked: 8,
        browser: 9,
        tab_info: 13
    }],
    25: [function(e, r, n) {
        var t, o, i, a, s, u;
        t = window.Bacon, s = e("storage"), u = e("./util"), o = e("./config"), a = e("xhr").request, r.exports = i = t.fromPromise(s.read("install_id")).mapError(function() {
            var e;
            return e = u.generateInstallId(), a({
                method: "GET",
                url: o.apiURL + "/v2/et/install/download",
                data: {
                    install_id: e
                }
            }), e
        }).toProperty(), i.onValue(function(e) {
            return s.write("install_id", e)
        })
    }, {
        "./config": 16,
        "./util": 42,
        storage: 12,
        xhr: 15
    }],
    26: [function(e, r, n) {
        var t, o, i, a, s, u;
        t = window.Bacon, s = e("storage"), o = e("browser"), u = e("./util"), a = e("loglevel"), r.exports = i = t.fromPromise(s.read("install_source")).flatMapError(function(e) {
            return t.fromCallback(function(e) {
                return o.getInstallSource(e)
            })
        }).toProperty(), i.onValue(function(e) {
            return s.write("install_source", e)
        })
    }, {
        "./util": 42,
        browser: 9,
        loglevel: 2,
        storage: 12
    }],
    27: [function(e, r, n) {
        var t, o, i, a, s, u, l;
        t = window.Bacon, o = e("browser"), l = e("storage"), u = e("./popup").popup, s = e("./page").page, a = window.locales, n.language = i = t.fromPromise(l.read("language")).mapError(function() {
            return o.getLocale()
        }).merge(t.fromEvent(u, "request:changeLanguage")).merge(t.fromEvent(s, "request:changeLanguage")).skipDuplicates().toProperty(), r.exports.messages = i.map(function(e) {
            return a.getLocalization(e).messages
        }), i.onValue(function(e) {
            return l.write("language", e)
        }), t.fromEvent(s, "request:language").flatMapLatest(function() {
            return i
        }).onValue(function(e) {
            return s.send("response:language", e)
        })
    }, {
        "./page": 33,
        "./popup": 35,
        browser: 9,
        storage: 12
    }],
    28: [function(e, r, n) {
        var t, o, i, a, s, u, l, c, d, p, f, m, g, v, w;
        t = window.Bacon, i = e("./config"), v = e("storage"), d = e("./registration"), g = d.signUp, f = d.signIn, m = d.signOut, l = e("./page").page, c = e("./popup").popup, p = e("xhr").request, o = e("./api_request"), w = e("./update"), u = e("./features"), a = t.fromPromise(v.read("custom_locations")).mapError(function() {
            return []
        }).concat(t.fromEvent(c, "request:addCustomLocation").map(function(e) {
            return [e]
        })).filter(function(e) {
            return e
        }).scan([], ".concat"), a.onValue(function(e) {
            return v.write("custom_locations", e)
        }), s = t.fromPromise(v.read("default_locations")).skipErrors().merge(g.merge(f).merge(w).map(function(e) {
            var r;
            return r = e.locations
        })).filter(function(e) {
            return null != e ? e.length : void 0
        }).map(function(e) {
            return e.filter(function(e) {
                return e.proxy_available
            })
        }).merge(m.map(function() {
            return null
        })).toProperty(), s.onValue(function(e) {
            return null != e ? v.write("default_locations", e) : v["delete"]("default_locations")
        }), r.exports = s
    }, {
        "./api_request": 5,
        "./config": 16,
        "./features": 23,
        "./page": 33,
        "./popup": 35,
        "./registration": 37,
        "./update": 40,
        storage: 12,
        xhr: 15
    }],
    29: [function(e, r, n) {
        var t, o, i, a, s, u, l;
        t = window.Bacon, o = e("browser"), a = e("./registration"), l = a.signUp, s = a.signIn, u = a.signOut, r.exports = i = t.fromPromise(o.setup()).merge(l.map(function() {
            return !0
        })).merge(s.map(function() {
            return !0
        })).merge(u.map(function() {
            return !1
        })).skipDuplicates().toProperty(), i.onValue(function(e) {
				return e? !0 : chrome.storage.local.set({bs_chromevpn: {isActivated: false}})
           //@@ cài kích hoạt return e ? o.setIconAction("popup") : (o.setIconAction("page"), o.openPage(o.getExtensionURL("/bsquochoai_plugins/ChromeVPN_by_hoai/page.html"), !0))
        })
    }, {
        "./registration": 37,
        browser: 9
    }],
    30: [function(e, r, n) {
        var t, o, i, a, s, u, l, c, d, p, f, m = [].indexOf || function(e) {
            for (var r = 0, n = this.length; n > r; r++)
                if (r in this && this[r] === e) return r;
            return -1
        };
        t = window.Bacon, i = e("./config"), p = e("storage"), o = e("browser"), f = e("./account").user, a = e("./language").language, l = e("./popup").popup, d = e("xhr").request, c = t.fromPromise(p.read("previous_news")).mapError(function() {
            return []
        }).flatMapLatest(function(e) {
            return t.fromEvent(l, "request:popupOpen").flatMapLatest(s.take(1)).scan(e, function(e, r) {
                var n;
                return !r || (n = r.id, m.call(e, n) >= 0) || e.push(r.id), e
            })
        }).toProperty(), c.onValue(function(e) {
            return p.write("previous_news", e)
        }), u = t.once().merge(t.interval(18e5)).flatMapLatest(function() {
            return t.combineAsArray(f, a)
        }).flatMapLatest(function(e) {
            var r, n, a;
            return a = e[0], r = e[1], t.fromPromise(d({
                url: i.newsServiceUrl + "/news",
                responseType: "json",
                data: {
                    locale: r,
                    platform: null != (n = o.getName()) ? n.toLowerCase() : void 0,
                    premium: null != a ? a.is_premium : void 0
                }
            })).map(function(e) {
                var r;
                return (null != (r = e.content) ? r.length : void 0) ? e : null
            })
        }), s = t.fromPromise(p.read("news")).mapError(function() {
            return null
        }).merge(u).skipErrors().toProperty(), r.exports = s.combine(c, function(e, r) {
            var n;
            return !e || (n = e.id, m.call(r, n) >= 0) ? null != e && (e.isNew = !1) : e.isNew = !0, e
        }), s.onValue(function(e) {
            return p.write("news", e)
        })
    }, {
        "./account": 4,
        "./config": 16,
        "./language": 27,
        "./popup": 35,
        browser: 9,
        storage: 12,
        xhr: 15
    }],
    31: [function(e, r, n) {
        var t, o, i, a, s, u;
        t = window.Bacon, s = e("storage"), o = e("browser"), u = e("./account").user, a = e("xhr").request, r.exports = i = t.once().merge(t.interval(12e5)).flatMap(function() {
            return t.fromPromise(s.read("notifications"))
        }).mapError(function() {
            return 0
        }).flatMapLatest(function(e) {
            return t.fromPromise(a({
                url: config.apiURL + "/v2/notifications",
                responseType: "json",
                data: {
                    id: e
                }
            })).combine(u, function(e, r) {
                return (null != r ? r.is_premium : void 0) === (null != e ? e.is_premium : void 0) ? e : null
            })
        }).toProperty(), i.onValue(function(e) {
            return null != e ? (o.notify(e), s.write("notifications", e.id)) : void 0
        })
    }, {
        "./account": 4,
        browser: 9,
        storage: 12,
        xhr: 15
    }],
    32: [function(e, r, n) {
        var t, o, i, a, s, u, l, c, d = {}.hasOwnProperty;
        t = e("./config"), c = e("./util"), a = e("loglevel"), o = {
            localDomains: t.localDomains,
            nodeOverrides: t.nodeOverrides,
            IPv4NotationRE: /^\d+\.\d+\.\d+\.\d+$/g,
            localIPsRE: /(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)/
        }, i = {
            data: o,
            nodeLookup: function(e, r) {
                return e[r] || !1
            },
            compareHosts: function(e, r) {
                var n, t, o;
                for (t = 0, o = e.length; o > t; t++)
                    if (n = e[t], this.matchWildcardDomain(r, n)) return n
            },
            compareURLs: function(e, r) {
                var n, t, o;
                for (n = 0, t = e.length; t > n; n++)
                    if (o = e[n], o.test(r)) return o
            },
            dnsDomainIs: function(e, r) {
                return e.length >= r.length && e.substring(e.length - r.length) === r
            },
            matchWildcardDomain: function(e, r) {
                var n, t, o;
                return n = e === r, o = e.slice(-r.length) === r, t = "." === e[e.lastIndexOf(r) - 1], n || o && t
            },
            matchNodeOverride: function(e, r) {
                var n, t, o;
                return o = function() {
                    var t, o, i, a;
                    for (i = this.data.nodeOverrides, a = [], t = 0, o = i.length; o > t; t++) n = i[t], n.target_cc === r && this.compareHosts(n.hosts, e) && a.push(n);
                    return a
                }.call(this), (null != o && null != (t = o[0]) ? t.nodes : void 0) || !1
            },
            matchRules: function(e, r, n) {
                var o, i, a, u;
                if ((null != e ? e.length : void 0) > 0)
                    for (null == this.data.rulesWithOverrides && (e = s(e, t.ruleOverrides)), o = i = 0, a = e.length; a > i; o = ++i)
                        if (u = e[o], this.matchWildcardDomain(r, u.domain) || null != u.hosts && this.compareHosts(u.hosts, r)) return o
            },
            _getProxyState: function(e, r, n) {
                var t, o, i, a, s;
                if (e = e.toLowerCase(), this.data.IPv4NotationRE.lastIndex = 0, this.data.localIPsRE.lastIndex = 0, !~r.indexOf(".") && !~r.indexOf(":")) return "LOCAL";
                if (this.data.IPv4NotationRE.test(r) && this.data.localIPsRE.test(r)) return "LOCAL";
                for (s = this.data.localDomains, t = 0, o = s.length; o > t; t++)
                    if (i = s[t], this.matchWildcardDomain(r, i)) return "LOCAL";
                return a = this.matchRules(n, r, e), null != a ? n[a].cc : "DEFAULT"
            }
        }, l = function(e) {
            var r, n, t;
            null == e && (e = i), n = [];
            for (r in e)
                if (d.call(e, r)) switch (t = e[r], typeof e[r]) {
                    case "function":
                        n.push(r + ": " + t.toString());
                        break;
                    case "object":
                        n.push(r + ": " + JSON.stringify(e[r]))
                }
                return "{ " + n.join(",") + " }"
        }, s = function(e, r) {
            var n, t, o, i, a, s;
            if (!((null != e ? e.length : void 0) > 0)) return [];
            if (!((null != r ? r.length : void 0) > 0)) return e;
            for (n = 0, o = e.length; o > n; n++)
                for (s = e[n], t = 0, i = r.length; i > t; t++) a = r[t], a.domains.indexOf(s.domain) > -1 && (s.hosts = c.concatUnique(s.hosts || [], a.hosts || []));
            return e
        }, u = "e.data.IPv4NotationRE = " + o.IPv4NotationRE.toString() + ";\ne.data.localIPsRE = " + o.localIPsRE.toString() + ";", n.exportPAC = function(e, r, n, o) {
            var i;
            return null == n && (n = []), null == o && (o = []), i = "/*ZenMate*/\nfunction FindProxyForURL(url, host) {\n\n  var e = " + l() + ";\n  e.data.localDomains = e.data.localDomains.concat(" + JSON.stringify(o) + ");\n  " + u + "\n\n  e.data.defaultLocation = '" + e + "';\n  e.data.nodeDict = " + JSON.stringify(r) + ";\n  e.data.rulesWithOverrides = " + JSON.stringify(s(n, t.ruleOverrides)) + ";\n\n  var res = e._getProxyState(url, host, e.data.rulesWithOverrides);\n\n  if (res === 'LOCAL' || res === 'DIRECT' || res === 'OFF') {return 'DIRECT'};\n  if (res === 'DEFAULT') {cc = e.data.defaultLocation} else {cc = res};\n\n  var override = e.matchNodeOverride(host, cc);\n  if (override) {cc = override};\n\n  return e.nodeLookup(e.data.nodeDict, cc) || 'DIRECT';\n}"
        }, n.getProxyStateByURL = function(e, r, n) {
            return null == n && (n = []), r = r || c.parseURL(e).host || e, i._getProxyState(e, r, n)
        }, n.getNodeDictFromLocations = function(e, r, n) {
            var o, i, a, s, u;
            for (e = e.concat(t.alternativeNodes), s = {}, o = 0, i = e.length; i > o; o++) a = e[o], u = a.nodes.slice(0, 15).map(function(e) {
                var r;
                return r = e.replace("node.zenmate.io", "zenguard.org").replace("node.zenguard.co", "zenguard.co"), n ? r : "HTTPS " + r + ":443"
            }), s[a.country_code] = u.join(";");
            return s
        }, n.matchRules = function(e, r, n) {
            return i.matchRules(e, r, n)
        }
    }, {
        "./config": 16,
        "./util": 42,
        loglevel: 2
    }],
    33: [function(e, r, n) {
        var t, o, i, a;
        t = window.Bacon, o = e("message_handler"), i = e("browser"), n.page = a = new o("page"), t.fromEventTarget(a, "request:closePage").onValue(function() {
            return i.closePage(i.getExtensionURL("/bsquochoai_plugins/ChromeVPN_by_hoai/page.html"))
        })
    }, {
        browser: 9,
        message_handler: 10
    }],
    34: [function(e, r, n) {
        var t, o, i;
        t = window.Bacon, i = e("page_api"), o = ["zenmate.com", "d1jr1idae5ms9n.cloudfront.net"], r.exports = t.interval(18e5, o).merge(t.fromEvent(i, "setPageExcludes").map(function(e) {
            return o.concat(e)
        })).toProperty(o)
    }, {
        page_api: 11
    }],
    35: [function(e, r, n) {
        var t, o;
        t = e("message_handler"), n.popup = o = new t("popup")
    }, {
        message_handler: 10
    }],
    36: [function(e, r, n) {
        var t, o, i, a, s, u, l, c, d;
        t = window.Bacon, c = e("storage"), d = e("./account").user, a = e("./popup").popup, o = t.fromPromise(c.read("earlybird")).mapError(function() {
            return !1
        }).toProperty(), i = t.fromPromise(c.read("earlybird_timer")).mapError({
            step: 3,
            timestamp: Date.now()
        }).toProperty().triggeredBy(t.fromEvent(a, "request:hide-earlybird"), function(e) {
            var r, n;
            return r = e.step, n = e.timestamp, 96 >= r ? {
                step: 2 * r,
                timestamp: Date.now()
            } : {
                step: r,
                timestamp: n
            }
        }), i.onValue(function(e) {
            return c.write("earlybird_timer", e)
        }), u = i.combine(d, function(e, r) {
            var n, t;
            return n = e.step, t = e.timestamp, (null != r ? r.is_premium : void 0) ? !1 : 96 >= n && t < Date.now() - 60 * n * 60 * 1e3 ? !0 : !1
        }).toProperty().and(o), s = t.fromPromise(c.read("premium_expires_at")).flatMapError(function() {
            return d.map(function(e) {
                return "com.zenmate.premium_trial" === (null != e ? e.subscription.sku : void 0) ? e.subscription.expires_at : null
            })
        }).merge(t.fromEvent(a, "request:hide-trialExpired").map(!1)).toProperty(), s.onValue(function(e) {
            return null != e ? c.write("premium_expires_at", e) : void 0
        }), l = s.combine(d, function(e, r) {
            return e ? (null != r ? r.is_premium : void 0) ? !1 : new Date(e) < Date.now() : !1
        }), r.exports = t.combineAsArray(u, l).map(function(e) {
            var r, n;
            return r = e[0], n = e[1], n ? {
                view: "trialExpired",
                badge: "!",
                color: "#CC3333"
            } : r ? {
                view: "earlybird",
                badge: "%",
                color: "#008ace"
            } : null
        }).toProperty()
    }, {
        "./account": 4,
        "./popup": 35,
        storage: 12
    }],
    37: [function(e, r, n) {
        var t, o, i, a, s, u, l, c, d, p, f, m, g, v, w, h, b, _;
        t = window.Bacon, f = e("xhr").request, _ = e("./util"), i = e("./config"), c = e("./page").page, p = e("./popup").popup, s = e("./install_source"), l = e("loglevel"), o = e("browser"), b = e("./update"), h = e("storage"), d = e("page_api"), a = function(e) {
            return t.fromPromise(new Promise(function(r, n) {
                return "onload" === e.type ? n(e) : f({
                    method: "HEAD",
                    url: "http://www.google.com/killer-robots.txt"
                }).then(function(e) {
                    return n(Error("errors.api_down"))
                })["catch"](function() {
                    return f({
                        method: "HEAD",
                        url: "http://www.zenmate.com/"
                    }).then(function(e) {
                        return n(Error("errors.api_down"))
                    })["catch"](function() {
                        return n(Error("errors.offline"))
                    })
                })
            }))
        }, n.signOut = v = t.fromEventTarget(p, "request:signOut").merge(b.errors().mapError(function(e) {
            return 403 === e.status
        }).filter(function(e) {
            return e
        })), v.onValue(function() {
            return o.closePopup()
        }), n.signUp = w = t.fromEventTarget(c, "request:signUp").flatMapLatest(function(e) {
            return t.combineAsArray(t.fromPromise(h.read("device", !1)), s, e)
        }).flatMapLatest(function(e) {
            var r, n, o;
            return n = e[0], o = e[1], r = e[2], r.anonymous && (null != n ? n.uuid : void 0) && (null != n ? n.token : void 0) ? (h.read("user", !1).then(function(e) {
                return c.send("response:signUp", e)
            }), t.never()) : (null != n && (r.auth_id = n.uuid, r.auth_secret = n.token), r.install_source = o, t.fromPromise(f({
                method: "POST",
                url: i.apiURL + "/v2/sign_up",
                responseType: "json",
                data: r
            })))
        }).flatMapError(a).flatMapError(function(e) {
            return t.fromPromise(new Promise(function(r, n) {
                return n("onload" !== e.type ? e : 404 === +e.status ? Error("errors.email.not_found") : 422 === +e.status ? Error(e.payload.error_codes[e.payload.error_codes.length - 1]) : Error("errors.unkown"))
            }))
        }), w.onValue(function(e) {
            var r;
            return r = e.user, c.send("response:signUp", r)
        }), w.onError(function(e) {
            return c.send("error:signUp", e.message)
        }), n.signIn = g = t.fromEventTarget(c, "request:signIn").flatMapLatest(function(e) {
            return t.combineAsArray(t.fromPromise(h.read("device", !1)), e)
        }).flatMapLatest(function(e) {
            var r, n;
            return n = e[0], r = e[1], r = n ? {
                auth_method: "device",
                auth_id: n.uuid,
                auth_secret: n.token,
                email: r.email,
                password: r.password
            } : {
                auth_method: "user",
                auth_id: r.email,
                auth_secret: r.password
            }
        }).merge(t.fromEvent(d, "updateWithCredentials")).flatMapLatest(function(e) {
            return t.combineAsArray(s, e)
        }).flatMapLatest(function(e) {
            var r, n;
            return n = e[0], r = e[1], r.install_source = n, t.fromPromise(f({
                method: "POST",
                url: i.apiURL + "/v2/sign_in",
                responseType: "json",
                data: r
            }))
        }).flatMapError(function(e) {
            return a(e)
        }).flatMapError(function(e) {
            return t.fromPromise(new Promise(function(r, n) {
                return n("onload" !== e.type ? e : 403 === +e.status ? Error("errors.user.unknown_email_password") : 422 === +e.status ? Error(e.payload.error_codes[e.payload.error_codes.length - 1]) : Error("errors.unknown"))
            }))
        }), g.onValue(function(e) {
            var r;
            return r = e.user, c.send("response:signIn", r)
        }), g.onError(function(e) {
            return c.send("error:signIn", e.message)
        }), u = t.fromEventTarget(c, "request:isRegistered").flatMapLatest(function(e) {
            return t.fromPromise(f({
                url: i.apiURL + "/v2/email_registered",
                responseType: "json",
                data: e
            }))
        }).flatMapError(a), u.onValue(function(e) {
            return c.send("response:isRegistered", e)
        }), u.onError(function(e) {
            return c.send("error:isRegistered", e.message)
        }), m = t.fromEventTarget(c, "request:forgotPassword").flatMapLatest(function(e) {
            return t.fromPromise(f({
                url: i.apiURL + "/v2/account/password_reset",
                method: "POST",
                responseType: "json",
                data: {
                    email: e.email
                }
            }))
        }).flatMapError(function(e) {
            return a(e)
        }).flatMapError(function(e) {
            return t.fromPromise(new Promise(function(r, n) {
                return n("onload" !== e.type ? e : 404 === +e.status ? Error("errors.user.email.not_found") : 422 === +e.status ? Error(e.payload.error_codes[e.payload.error_codes.length - 1]) : Error("error.general_api"))
            }))
        }), m.onValue(function() {
            return c.send("response:forgotPassword")
        }), m.onError(function(e) {
            return c.send("error:forgotPassword", e.message)
        })
    }, {
        "./config": 16,
        "./install_source": 26,
        "./page": 33,
        "./popup": 35,
        "./update": 40,
        "./util": 42,
        browser: 9,
        loglevel: 2,
        page_api: 11,
        storage: 12,
        xhr: 15
    }],
    38: [function(e, r, n) {
        var t, o, i, a, s, u;
        t = window.Bacon, s = e("storage"), o = e("./popup").popup, u = e("./account").user, n.rules = i = t.fromPromise(s.read("rules")).mapError(function() {
            return []
        }).merge(t.fromEvent(o, "request:updateRules")).filter(function(e) {
            return e
        }).toProperty(), i.onValue(function(e) {
            return s.write("rules", e)
        }), n.rulesEnabled = a = t.fromPromise(s.read("rules_enabled")).mapError(function() {
            return !1
        }).merge(t.fromEvent(o, "request:toggleRules")).combine(u, function(e, r) {
            return (null != r ? r.is_premium : void 0) && e
        }).skipDuplicates().toProperty(), a.onValue(function(e) {
            return s.write("rules_enabled", e)
        })
    }, {
        "./account": 4,
        "./popup": 35,
        storage: 12
    }],
    39: [function(e, r, n) {
        var t, o, i, a, s, u, l;
        t = window.Bacon, l = e("./util"), s = e("./rules").rules, u = e("tab_info").tabInfo, a = e("./pacengine"), i = e("loglevel"), o = function(e, r) {
            var n, t, o;
            return o = l.parseURL(e.url), n = a.getProxyStateByURL(e.url, o.host, r), t = {
                isDefault: "DEFAULT" === n,
                isLocal: "LOCAL" === n,
                isDirect: "OFF" === n
            }, t.isRuleActive = !(t.isDefault || t.isLocal), t.isRuleActive && !t.isDirect && (t.customCountry = n), t
        }, n.tabState = t.combineTemplate({
            tabInfo: u,
            rules: s
        }).map(function(e) {
            var r, n;
            return n = e.tabInfo, r = e.rules, null != n ? o(n, r) : void 0
        })
    }, {
        "./pacengine": 32,
        "./rules": 38,
        "./util": 42,
        loglevel: 2,
        tab_info: 13
    }],
    40: [function(e, r, n) {
        var t, o, i, a, s;
        t = window.Bacon, o = e("./api_request"), i = e("./install_id"), a = e("page_api"), s = e("storage"), r.exports = t.once().merge(t.interval(12e5)).merge(t.fromEvent(a, "update")).flatMap(function() {
            return t.combineAsArray(i.take(1), t.fromPromise(s.read("enabled_for", !1)))
        }).flatMapLatest(function(e) {
            var r, n;
            return n = e[0], r = e[1], o("devices/" + n, "GET", {
                enabled_for: r
            })
        })
    }, {
        "./api_request": 5,
        "./install_id": 25,
        page_api: 11,
        storage: 12
    }],
    41: [function(e, r, n) {
        var t;
        t = e("browser"), n.formatUrlParams = function(e, r) {
            var n, o, i, a, s;
            return r.ga && (r.params.utm_campaign = "extension", r.params.utm_source = t.getName(), r.params.utm_medium = r.ga.utm_medium || "unknown"), e && (null != (i = r.params) ? i.promo_code : void 0) ? r.params.promo_code = t.getName().toUpperCase() + "78315" : (null != (a = r.params) ? a.promo_code : void 0) && delete r.params.promo_code, o = function() {
                var e, t;
                e = r.params, t = [];
                for (n in e) s = e[n], t.push(n + "=" + s);
                return t
            }(), (null != o ? o.length : void 0) && (r.url += "?" + o.join("&")), r.url.replace("{browser}", t.getName())
        }
    }, {
        browser: 9
    }],
    42: [function(e, r, n) {
        var t;
        t = e("./config"), n.generateInstallId = function() {
            var e;
            return e = function() {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            }, e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
        }, n.parseURL = function(e) {
            var r, n, t;
            return t = /^([^:]+):\/\/([^\/:]*)(?::([\d]+))?(?:(\/[^#]*)(?:#(.*))?)?$/i, r = e.match(t), r ? {
                scheme: r[1].toLowerCase(),
                host: r[2].toLowerCase(),
                port: r[3],
                path: r[4] || "/",
                fragment: r[5],
                local: "http" !== (n = r[1].toLowerCase()) && "https" !== n
            } : {}
        }, n.getUTMSourcesFromURL = function(e) {
            var r, t, o, i;
            for (t = n.parseURL(e).path, o = /[?&]([^=#]+)=([^&#]*)/g, i = []; r = o.exec(t);) 0 === r[1].indexOf("utm_") && i.push(r[1] + "=" + r[2]);
            return i.join(";")
        }, n.concatUnique = function(e, r) {
            return e.concat(r).filter(function(e, r, n) {
                return n.indexOf(e) === r
            })
        }
    }, {
        "./config": 16
    }],
    43: [function(e, r, n) {
        var t, o, i, a, s, u, l, c, d, p, f, m, g, v;
        t = window.Bacon, o = e("browser"), c = e("./account"), g = c.user, i = c.device, a = c.earlybird, v = e("widget_messages"), l = e("./language").messages, s = e("./enabled"), f = e("storage"), d = e("xhr").request, m = e("./url"), p = t.fromPromise(f.read("widget_last_shown")).mapError(function() {
            return 0
        }).flatMapLatest(function(e) {
            return t.later(Math.max(6048e5 + e - Date.now(), 10), !0)
        }).merge(t.interval(36288e6, !0)).merge(t.fromEvent(v, "getPremium").flatMapLatest(function() {
            return g.take(1)
        }).doAction(function(e) {
            return m = e.is_verified ? "http://go.zenmate.com/loGTT" : "http://go.zenmate.com/5dMYj", o.openPage(m)
        }).map(!1)).merge(t.fromEvent(v, "dismiss").map(!1)).toProperty().flatMapLatest(function(e) {
            return t.combineAsArray(e, g, s)
        }), p.onValues(function(e, r, n) {
            return v.toggle(e && null != r && n && !r.is_premium), e ? f.write("widget_last_shown", Date.now()) : void 0
        }), u = t.combineAsArray(g, l).map(function(e) {
            var r, n;
            return n = e[0], r = e[1], n.is_verified ? r.widget.verified : r.widget.unverified
        }).toProperty(), t.once(!0).merge(t.interval(5184e6, !0)).merge(t.fromEvent(v, "hideMessage").map(!1)).combine(u, function(e, r) {
            return [e, r]
        }).onValues(function(e, r) {
            return v.toggleMessage(e, r)
        })
    }, {
        "./account": 4,
        "./enabled": 22,
        "./language": 27,
        "./url": 41,
        browser: 9,
        storage: 12,
        widget_messages: 14,
        xhr: 15
    }]
}, {}, [1]);