var h, aa = aa || {},
    n = this,
    ba = function(a) {
        return void 0 !== a
    },
    ca = function(a, b) {
        var c = a.split("."),
            d = n;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) !c.length && ba(b) ? d[e] = b : d[e] ? d = d[e] : d = d[e] = {}
    },
    da = function(a, b) {
        for (var c = a.split("."), d = b || n, e; e = c.shift();)
            if (null != d[e]) d = d[e];
            else return null;
        return d
    },
    q = function() {},
    fa = function(a) {
        a.I = function() {
            return a.pe ? a.pe : a.pe = new a
        }
    },
    ga = function(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    },
    r = function(a) {
        return "array" == ga(a)
    },
    ha = function(a) {
        var b = ga(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    },
    t = function(a) {
        return "string" == typeof a
    },
    ia = function(a) {
        return "number" == typeof a
    },
    ja = function(a) {
        return "function" == ga(a)
    },
    ka = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    },
    oa = function(a) {
        return a[ma] || (a[ma] = ++na)
    },
    ma = "closure_uid_" + (1E9 * Math.random() >>> 0),
    na = 0,
    pa = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    },
    qa = function(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    },
    u = function(a, b, c) {
        u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? pa : qa;
        return u.apply(null, arguments)
    },
    ra = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    },
    sa = Date.now || function() {
        return +new Date
    },
    v = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.o = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Si = function(a, c, f) {
            for (var g = Array(arguments.length - 2), k = 2; k < arguments.length; k++) g[k - 2] = arguments[k];
            return b.prototype[c].apply(a, g)
        }
    };
var ta = function(a) {
        return eval("(" + a + ")")
    },
    xa = function(a) {
        var b = [];
        ua(new wa, a, b);
        return b.join("")
    },
    wa = function() {},
    ua = function(a, b, c) {
        if (null == b) c.push("null");
        else {
            if ("object" == typeof b) {
                if (r(b)) {
                    var d = b;
                    b = d.length;
                    c.push("[");
                    for (var e = "", f = 0; f < b; f++) c.push(e), ua(a, d[f], c), e = ",";
                    c.push("]");
                    return
                }
                if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
                else {
                    c.push("{");
                    e = "";
                    for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (f = b[d], "function" != typeof f && (c.push(e), ya(d,
                        c), c.push(":"), ua(a, f, c), e = ","));
                    c.push("}");
                    return
                }
            }
            switch (typeof b) {
                case "string":
                    ya(b, c);
                    break;
                case "number":
                    c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                    break;
                case "boolean":
                    c.push(String(b));
                    break;
                case "function":
                    c.push("null");
                    break;
                default:
                    throw Error("Unknown type: " + typeof b);
            }
        }
    },
    za = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    },
    Aa = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
    ya = function(a,
        b) {
        b.push('"', a.replace(Aa, function(a) {
            var b = za[a];
            b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), za[a] = b);
            return b
        }), '"')
    };
var Ba = function(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, Ba);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a))
};
v(Ba, Error);
Ba.prototype.name = "CustomError";
var Ca;
var Da = function(a, b) {
        for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
        return d + c.join("%s")
    },
    Fa = function(a) {
        return /^[\s\xa0]*$/.test(a)
    },
    Ga = function(a) {
        return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
    },
    Ha = String.prototype.trim ? function(a) {
        return a.trim()
    } : function(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    },
    Ia = function(a) {
        return encodeURIComponent(String(a))
    },
    Ja = function(a) {
        return decodeURIComponent(a.replace(/\+/g,
            " "))
    },
    Ra = function(a) {
        if (!Ka.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(La, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(Ma, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(Na, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(Oa, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(Pa, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(Qa, "&#0;"));
        return a
    },
    La = /&/g,
    Ma = /</g,
    Na = />/g,
    Oa = /"/g,
    Pa = /'/g,
    Qa = /\x00/g,
    Ka = /[\x00&<>"']/,
    Va = function(a) {
        return Sa(a, "&") ? "document" in n ? Ta(a) : Ua(a) : a
    },
    Ta = function(a) {
        var b = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"'
            },
            c;
        c = n.document.createElement("div");
        return a.replace(Wa, function(a, e) {
            var f = b[a];
            if (f) return f;
            if ("#" == e.charAt(0)) {
                var g = Number("0" + e.substr(1));
                isNaN(g) || (f = String.fromCharCode(g))
            }
            f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
            return b[a] = f
        })
    },
    Ua = function(a) {
        return a.replace(/&([^;]+);/g, function(a, c) {
            switch (c) {
                case "amp":
                    return "&";
                case "lt":
                    return "<";
                case "gt":
                    return ">";
                case "quot":
                    return '"';
                default:
                    if ("#" == c.charAt(0)) {
                        var d = Number("0" + c.substr(1));
                        if (!isNaN(d)) return String.fromCharCode(d)
                    }
                    return a
            }
        })
    },
    Wa = /&([^;\s<&]+);?/g,
    Sa = function(a, b) {
        return -1 != a.indexOf(b)
    },
    Xa = String.prototype.repeat ? function(a, b) {
        return a.repeat(b)
    } : function(a, b) {
        return Array(b + 1).join(a)
    },
    Ya = function(a) {
        return null == a ? "" : String(a)
    },
    Za = function(a) {
        return Array.prototype.join.call(arguments, "")
    },
    ab = function(a, b) {
        for (var c = 0, d = Ha(String(a)).split("."), e = Ha(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
            var k = d[g] || "",
                l = e[g] || "",
                m = RegExp("(\\d*)(\\D*)", "g"),
                p = RegExp("(\\d*)(\\D*)", "g");
            do {
                var w = m.exec(k) || ["", "", ""],
                    z = p.exec(l) || ["", "", ""];
                if (0 == w[0].length && 0 == z[0].length) break;
                c = $a(0 == w[1].length ? 0 : parseInt(w[1], 10), 0 == z[1].length ? 0 : parseInt(z[1], 10)) || $a(0 == w[2].length, 0 == z[2].length) || $a(w[2], z[2])
            } while (0 == c)
        }
        return c
    },
    $a = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    },
    bb = 2147483648 * Math.random() | 0,
    cb = function(a) {
        return String(a).replace(/\-([a-z])/g, function(a, c) {
            return c.toUpperCase()
        })
    },
    db = function(a) {
        var b = t(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") :
            "\\s";
        return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function(a, b, e) {
            return b + e.toUpperCase()
        })
    };
var eb = function(a, b) {
    b.unshift(a);
    Ba.call(this, Da.apply(null, b));
    b.shift()
};
v(eb, Ba);
eb.prototype.name = "AssertionError";
var fb = function(a, b, c, d) {
        var e = "Assertion failed";
        if (c) var e = e + (": " + c),
            f = d;
        else a && (e += ": " + a, f = b);
        throw new eb("" + e, f || []);
    },
    x = function(a, b, c) {
        a || fb("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    },
    hb = function(a, b) {
        throw new eb("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    },
    ib = function(a, b, c) {
        ia(a) || fb("Expected number but got %s: %s.", [ga(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    },
    jb = function(a, b, c) {
        t(a) || fb("Expected string but got %s: %s.", [ga(a),
            a
        ], b, Array.prototype.slice.call(arguments, 2));
        return a
    },
    kb = function(a, b, c) {
        ja(a) || fb("Expected function but got %s: %s.", [ga(a), a], b, Array.prototype.slice.call(arguments, 2))
    },
    lb = function(a, b, c) {
        ka(a) || fb("Expected object but got %s: %s.", [ga(a), a], b, Array.prototype.slice.call(arguments, 2))
    },
    mb = function(a, b, c) {
        ka(a) && 1 == a.nodeType || fb("Expected Element but got %s: %s.", [ga(a), a], b, Array.prototype.slice.call(arguments, 2))
    },
    ob = function(a, b, c, d) {
        a instanceof b || fb("Expected instanceof %s but got %s.", [nb(b), nb(a)], c, Array.prototype.slice.call(arguments, 3))
    },
    nb = function(a) {
        return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    };
var pb = function(a) {
    pb[" "](a);
    return a
};
pb[" "] = q;
var qb = function(a, b) {
    try {
        return pb(a[b]), !0
    } catch (c) {}
    return !1
};
var rb = function(a) {
        return a[a.length - 1]
    },
    sb = Array.prototype.indexOf ? function(a, b, c) {
        x(null != a.length);
        return Array.prototype.indexOf.call(a, b, c)
    } : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (t(a)) return t(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    },
    y = Array.prototype.forEach ? function(a, b, c) {
        x(null != a.length);
        Array.prototype.forEach.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f,
            a)
    },
    tb = Array.prototype.filter ? function(a, b, c) {
        x(null != a.length);
        return Array.prototype.filter.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = [], f = 0, g = t(a) ? a.split("") : a, k = 0; k < d; k++)
            if (k in g) {
                var l = g[k];
                b.call(c, l, k, a) && (e[f++] = l)
            }
        return e
    },
    ub = Array.prototype.map ? function(a, b, c) {
        x(null != a.length);
        return Array.prototype.map.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = Array(d), f = t(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
        return e
    },
    vb = Array.prototype.some ? function(a, b,
        c) {
        x(null != a.length);
        return Array.prototype.some.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a)) return !0;
        return !1
    },
    wb = Array.prototype.every ? function(a, b, c) {
        x(null != a.length);
        return Array.prototype.every.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && !b.call(c, e[f], f, a)) return !1;
        return !0
    },
    xb = function(a, b) {
        var c = 0;
        y(a, function(a, e, f) {
            b.call(void 0, a, e, f) && ++c
        }, void 0);
        return c
    },
    yb = function(a,
        b) {
        var c;
        a: {
            c = a.length;
            for (var d = t(a) ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) {
                    c = e;
                    break a
                }
            c = -1
        }
        return 0 > c ? null : t(a) ? a.charAt(c) : a[c]
    },
    zb = function(a, b) {
        return 0 <= sb(a, b)
    },
    Ab = function(a, b) {
        var c = sb(a, b),
            d;
        if (d = 0 <= c) x(null != a.length), Array.prototype.splice.call(a, c, 1);
        return d
    },
    Bb = function(a) {
        return Array.prototype.concat.apply(Array.prototype, arguments)
    },
    Db = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    },
    Eb = function(a, b) {
        for (var c =
                1; c < arguments.length; c++) {
            var d = arguments[c];
            if (ha(d)) {
                var e = a.length || 0,
                    f = d.length || 0;
                a.length = e + f;
                for (var g = 0; g < f; g++) a[e + g] = d[g]
            } else a.push(d)
        }
    },
    Gb = function(a, b, c, d) {
        x(null != a.length);
        Array.prototype.splice.apply(a, Fb(arguments, 1))
    },
    Fb = function(a, b, c) {
        x(null != a.length);
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
    };
var Hb = function(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    },
    Ib = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    },
    Jb = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    },
    Kb = function(a, b) {
        for (var c in a)
            if (a[c] == b) return !0;
        return !1
    },
    Lb = function(a) {
        for (var b in a) return !1;
        return !0
    },
    Mb = function(a, b, c) {
        if (null !== a && b in a) throw Error('The object already contains the key "' + b + '"');
        a[b] = c
    },
    Nb = function(a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c];
        return b
    },
    Ob = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
    Pb = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < Ob.length; f++) c = Ob[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    },
    Qb = function(a) {
        var b = arguments.length;
        if (1 == b && r(arguments[0])) return Qb.apply(null, arguments[0]);
        if (b % 2) throw Error("Uneven number of arguments");
        for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
        return c
    },
    Rb = function(a) {
        var b = arguments.length;
        if (1 == b && r(arguments[0])) return Rb.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
        return c
    };
var Sb;
a: {
    var Tb = n.navigator;
    if (Tb) {
        var Ub = Tb.userAgent;
        if (Ub) {
            Sb = Ub;
            break a
        }
    }
    Sb = ""
}
var A = function(a) {
    return Sa(Sb, a)
};
var Wb = function() {
        return A("Safari") && !(Vb() || A("Coast") || A("Opera") || A("Edge") || A("Silk") || A("Android"))
    },
    Vb = function() {
        return (A("Chrome") || A("CriOS")) && !A("Edge")
    };
var Xb = function() {
        return A("iPhone") && !A("iPod") && !A("iPad")
    },
    Yb = function() {
        return Xb() || A("iPad") || A("iPod")
    },
    Zb = function() {
        var a = Sb,
            b = "";
        A("Windows") ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : Yb() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : A("Macintosh") ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : A("Android") ? (b = /Android\s+([^\);]+)(\)|;)/, b = (a = b.exec(a)) && a[1]) : A("CrOS") && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,
            b = (a = b.exec(a)) && a[1]);
        return 0 <= ab(b || "", 9)
    };
var $b = A("Opera"),
    B = A("Trident") || A("MSIE"),
    ac = A("Edge"),
    bc = ac || B,
    cc = A("Gecko") && !(Sa(Sb.toLowerCase(), "webkit") && !A("Edge")) && !(A("Trident") || A("MSIE")) && !A("Edge"),
    E = Sa(Sb.toLowerCase(), "webkit") && !A("Edge"),
    dc = E && A("Mobile"),
    ec = A("Macintosh"),
    fc = A("Windows"),
    gc = A("Android"),
    hc = Xb(),
    ic = A("iPad"),
    jc = A("iPod"),
    kc = function() {
        var a = n.document;
        return a ? a.documentMode : void 0
    },
    lc;
a: {
    var mc = "",
        nc = function() {
            var a = Sb;
            if (cc) return /rv\:([^\);]+)(\)|;)/.exec(a);
            if (ac) return /Edge\/([\d\.]+)/.exec(a);
            if (B) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (E) return /WebKit\/(\S+)/.exec(a);
            if ($b) return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();nc && (mc = nc ? nc[1] : "");
    if (B) {
        var oc = kc();
        if (null != oc && oc > parseFloat(mc)) {
            lc = String(oc);
            break a
        }
    }
    lc = mc
}
var pc = lc,
    qc = {},
    F = function(a) {
        return qc[a] || (qc[a] = 0 <= ab(pc, a))
    },
    sc = function(a) {
        return Number(rc) >= a
    },
    tc = n.document,
    rc = tc && B ? kc() || ("CSS1Compat" == tc.compatMode ? parseInt(pc, 10) : 5) : void 0;
var uc = !B || sc(9),
    vc = !B || sc(9),
    wc = B && !F("9");
!E || F("528");
cc && F("1.9b") || B && F("8") || $b && F("9.5") || E && F("528");
cc && !F("8") || B && F("9");
var xc = function() {
    this.S = this.S;
    this.fa = this.fa
};
xc.prototype.S = !1;
xc.prototype.sa = function() {
    this.S || (this.S = !0, this.H())
};
var yc = function(a, b) {
    a.S ? b.call(void 0) : (a.fa || (a.fa = []), a.fa.push(ba(void 0) ? u(b, void 0) : b))
};
xc.prototype.H = function() {
    if (this.fa)
        for (; this.fa.length;) this.fa.shift()()
};
var zc = function(a) {
    a && "function" == typeof a.sa && a.sa()
};
var H = function(a, b) {
    this.type = a;
    this.b = this.target = b;
    this.g = !1;
    this.Ce = !0
};
H.prototype.c = function() {
    this.g = !0
};
H.prototype.preventDefault = function() {
    this.Ce = !1
};
var Ac = B ? "focusin" : "DOMFocusIn",
    Bc = B ? "focusout" : "DOMFocusOut";
var Cc = function(a, b) {
    H.call(this, a ? a.type : "");
    this.h = this.b = this.target = null;
    this.keyCode = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.l = this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.a = null;
    if (a) {
        var c = this.type = a.type,
            d = a.changedTouches ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.b = b;
        var e = a.relatedTarget;
        e ? cc && (qb(e, "nodeName") || (e = null)) : "mouseover" == c ? e = a.fromElement : "mouseout" == c && (e = a.toElement);
        this.h = e;
        null === d ? (this.clientX = void 0 !== a.clientX ?
            a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
        this.keyCode = a.keyCode || 0;
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.l = ec ? a.metaKey : a.ctrlKey;
        this.a = a;
        a.defaultPrevented && this.preventDefault()
    }
};
v(Cc, H);
var Dc = [1, 4, 2],
    Ec = function(a) {
        return (uc ? 0 == a.a.button : "click" == a.type ? !0 : !!(a.a.button & Dc[0])) && !(E && ec && a.ctrlKey)
    };
Cc.prototype.c = function() {
    Cc.o.c.call(this);
    this.a.stopPropagation ? this.a.stopPropagation() : this.a.cancelBubble = !0
};
Cc.prototype.preventDefault = function() {
    Cc.o.preventDefault.call(this);
    var a = this.a;
    if (a.preventDefault) a.preventDefault();
    else if (a.returnValue = !1, wc) try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
    } catch (b) {}
};
var Fc = "closure_listenable_" + (1E6 * Math.random() | 0),
    Gc = function(a) {
        return !(!a || !a[Fc])
    },
    Hc = 0;
var Ic = function(a, b, c, d, e) {
        this.listener = a;
        this.a = null;
        this.src = b;
        this.type = c;
        this.xc = !!d;
        this.Ic = e;
        this.fe = ++Hc;
        this.$b = this.wc = !1
    },
    Jc = function(a) {
        a.$b = !0;
        a.listener = null;
        a.a = null;
        a.src = null;
        a.Ic = null
    };
var Kc = function(a) {
        this.src = a;
        this.a = {};
        this.b = 0
    },
    Nc = function(a, b, c, d, e, f) {
        var g = b.toString();
        b = a.a[g];
        b || (b = a.a[g] = [], a.b++);
        var k = Lc(b, c, e, f); - 1 < k ? (a = b[k], d || (a.wc = !1)) : (a = new Ic(c, a.src, g, !!e, f), a.wc = d, b.push(a));
        return a
    },
    Oc = function(a, b) {
        var c = b.type;
        c in a.a && Ab(a.a[c], b) && (Jc(b), 0 == a.a[c].length && (delete a.a[c], a.b--))
    },
    Pc = function(a, b, c, d, e) {
        a = a.a[b.toString()];
        b = -1;
        a && (b = Lc(a, c, d, e));
        return -1 < b ? a[b] : null
    },
    Lc = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.$b && f.listener == b &&
                f.xc == !!c && f.Ic == d) return e
        }
        return -1
    };
var Qc = "closure_lm_" + (1E6 * Math.random() | 0),
    Rc = {},
    Sc = 0,
    I = function(a, b, c, d, e) {
        if (r(b)) {
            for (var f = 0; f < b.length; f++) I(a, b[f], c, d, e);
            return null
        }
        c = Tc(c);
        return Gc(a) ? a.D(b, c, d, e) : Uc(a, b, c, !1, d, e)
    },
    Uc = function(a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var g = !!e,
            k = Vc(a);
        k || (a[Qc] = k = new Kc(a));
        c = Nc(k, b, c, d, e, f);
        if (c.a) return c;
        d = Wc();
        c.a = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) a.addEventListener(b.toString(), d, g);
        else if (a.attachEvent) a.attachEvent(Xc(b.toString()), d);
        else throw Error("addEventListener and attachEvent are unavailable.");
        Sc++;
        return c
    },
    Wc = function() {
        var a = Yc,
            b = vc ? function(c) {
                return a.call(b.src, b.listener, c)
            } : function(c) {
                c = a.call(b.src, b.listener, c);
                if (!c) return c
            };
        return b
    },
    Zc = function(a, b, c, d, e) {
        if (r(b))
            for (var f = 0; f < b.length; f++) Zc(a, b[f], c, d, e);
        else c = Tc(c), Gc(a) ? Nc(a.G, String(b), c, !0, d, e) : Uc(a, b, c, !0, d, e)
    },
    $c = function(a, b, c, d, e) {
        if (r(b))
            for (var f = 0; f < b.length; f++) $c(a, b[f], c, d, e);
        else c = Tc(c), Gc(a) ? (a = a.G, b = String(b).toString(), b in a.a && (f = a.a[b], c = Lc(f, c, d, e), -1 < c && (Jc(f[c]), x(null != f.length), Array.prototype.splice.call(f,
            c, 1), 0 == f.length && (delete a.a[b], a.b--)))) : a && (a = Vc(a)) && (c = Pc(a, b, c, !!d, e)) && ad(c)
    },
    ad = function(a) {
        if (!ia(a) && a && !a.$b) {
            var b = a.src;
            if (Gc(b)) Oc(b.G, a);
            else {
                var c = a.type,
                    d = a.a;
                b.removeEventListener ? b.removeEventListener(c, d, a.xc) : b.detachEvent && b.detachEvent(Xc(c), d);
                Sc--;
                (c = Vc(b)) ? (Oc(c, a), 0 == c.b && (c.src = null, b[Qc] = null)) : Jc(a)
            }
        }
    },
    Xc = function(a) {
        return a in Rc ? Rc[a] : Rc[a] = "on" + a
    },
    cd = function(a, b, c, d) {
        var e = !0;
        if (a = Vc(a))
            if (b = a.a[b.toString()])
                for (b = b.concat(), a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.xc ==
                        c && !f.$b && (f = bd(f, d), e = e && !1 !== f)
                }
            return e
    },
    bd = function(a, b) {
        var c = a.listener,
            d = a.Ic || a.src;
        a.wc && ad(a);
        return c.call(d, b)
    },
    Yc = function(a, b) {
        if (a.$b) return !0;
        if (!vc) {
            var c = b || da("window.event"),
                d = new Cc(c, this),
                e = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                a: {
                    var f = !1;
                    if (0 == c.keyCode) try {
                        c.keyCode = -1;
                        break a
                    } catch (l) {
                        f = !0
                    }
                    if (f || void 0 == c.returnValue) c.returnValue = !0
                }
                c = [];
                for (f = d.b; f; f = f.parentNode) c.push(f);
                for (var f = a.type, g = c.length - 1; !d.g && 0 <= g; g--) {
                    d.b = c[g];
                    var k = cd(c[g], f, !0, d),
                        e = e && k
                }
                for (g =
                    0; !d.g && g < c.length; g++) d.b = c[g],
                k = cd(c[g], f, !1, d),
                e = e && k
            }
            return e
        }
        return bd(a, new Cc(b, this))
    },
    Vc = function(a) {
        a = a[Qc];
        return a instanceof Kc ? a : null
    },
    dd = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
    Tc = function(a) {
        x(a, "Listener can not be null.");
        if (ja(a)) return a;
        x(a.handleEvent, "An object listener must have handleEvent method.");
        a[dd] || (a[dd] = function(b) {
            return a.handleEvent(b)
        });
        return a[dd]
    };
var K = function() {
    xc.call(this);
    this.G = new Kc(this);
    this.Yc = this;
    this.zb = null
};
v(K, xc);
K.prototype[Fc] = !0;
h = K.prototype;
h.zc = function() {
    return this.zb
};
h.Oc = function(a) {
    this.zb = a
};
h.removeEventListener = function(a, b, c, d) {
    $c(this, a, b, c, d)
};
h.dispatchEvent = function(a) {
    ed(this);
    var b, c = this.zc();
    if (c) {
        b = [];
        for (var d = 1; c; c = c.zc()) b.push(c), x(1E3 > ++d, "infinite loop")
    }
    c = this.Yc;
    d = a.type || a;
    if (t(a)) a = new H(a, c);
    else if (a instanceof H) a.target = a.target || c;
    else {
        var e = a;
        a = new H(d, c);
        Pb(a, e)
    }
    var e = !0,
        f;
    if (b)
        for (var g = b.length - 1; !a.g && 0 <= g; g--) f = a.b = b[g], e = fd(f, d, !0, a) && e;
    a.g || (f = a.b = c, e = fd(f, d, !0, a) && e, a.g || (e = fd(f, d, !1, a) && e));
    if (b)
        for (g = 0; !a.g && g < b.length; g++) f = a.b = b[g], e = fd(f, d, !1, a) && e;
    return e
};
h.H = function() {
    K.o.H.call(this);
    if (this.G) {
        var a = this.G,
            b = 0,
            c;
        for (c in a.a) {
            for (var d = a.a[c], e = 0; e < d.length; e++) ++b, Jc(d[e]);
            delete a.a[c];
            a.b--
        }
    }
    this.zb = null
};
h.D = function(a, b, c, d) {
    ed(this);
    return Nc(this.G, String(a), b, !1, c, d)
};
var fd = function(a, b, c, d) {
        b = a.G.a[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.$b && g.xc == c) {
                var k = g.listener,
                    l = g.Ic || g.src;
                g.wc && Oc(a.G, g);
                e = !1 !== k.call(l, d) && e
            }
        }
        return e && 0 != d.Ce
    },
    ed = function(a) {
        x(a.G, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
    };
var gd = function(a, b, c) {
    this.h = c;
    this.c = a;
    this.g = b;
    this.b = 0;
    this.a = null
};
gd.prototype.get = function() {
    var a;
    0 < this.b ? (this.b--, a = this.a, this.a = a.next, a.next = null) : a = this.c();
    return a
};
var hd = function(a, b) {
    a.g(b);
    a.b < a.h && (a.b++, b.next = a.a, a.a = b)
};
var id = function(a) {
        n.setTimeout(function() {
            throw a;
        }, 0)
    },
    jd, kd = function() {
        var a = n.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !A("Presto") && (a = function() {
            var a = document.createElement("IFRAME");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow,
                a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random(),
                d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
                a = u(function(a) {
                    if (("*" == d || a.origin == d) && a.data == c) this.port1.onmessage()
                }, this);
            b.addEventListener("message", a, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    b.postMessage(c, d)
                }
            }
        });
        if ("undefined" !== typeof a && !A("Trident") && !A("MSIE")) {
            var b = new a,
                c = {},
                d = c;
            b.port1.onmessage = function() {
                if (ba(c.next)) {
                    c = c.next;
                    var a = c.Td;
                    c.Td = null;
                    a()
                }
            };
            return function(a) {
                d.next = {
                    Td: a
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ?
            function(a) {
                var b = document.createElement("SCRIPT");
                b.onreadystatechange = function() {
                    b.onreadystatechange = null;
                    b.parentNode.removeChild(b);
                    b = null;
                    a();
                    a = null
                };
                document.documentElement.appendChild(b)
            } : function(a) {
                n.setTimeout(a, 0)
            }
    };
var nd = new gd(function() {
        return new md
    }, function(a) {
        a.reset()
    }, 100),
    pd = function() {
        var a = od,
            b = null;
        a.a && (b = a.a, a.a = a.a.next, a.a || (a.b = null), b.next = null);
        return b
    },
    md = function() {
        this.next = this.b = this.a = null
    };
md.prototype.set = function(a, b) {
    this.a = a;
    this.b = b;
    this.next = null
};
md.prototype.reset = function() {
    this.next = this.b = this.a = null
};
var td = function(a, b) {
        qd || rd();
        sd || (qd(), sd = !0);
        var c = od,
            d = nd.get();
        d.set(a, b);
        c.b ? c.b.next = d : (x(!c.a), c.a = d);
        c.b = d
    },
    qd, rd = function() {
        if (n.Promise && n.Promise.resolve) {
            var a = n.Promise.resolve(void 0);
            qd = function() {
                a.then(ud)
            }
        } else qd = function() {
            var a = ud;
            !ja(n.setImmediate) || n.Window && n.Window.prototype && !A("Edge") && n.Window.prototype.setImmediate == n.setImmediate ? (jd || (jd = kd()), jd(a)) : n.setImmediate(a)
        }
    },
    sd = !1,
    od = new function() {
        this.b = this.a = null
    },
    ud = function() {
        for (var a; a = pd();) {
            try {
                a.a.call(a.b)
            } catch (b) {
                id(b)
            }
            hd(nd,
                a)
        }
        sd = !1
    };
var vd = function(a) {
        a.prototype.then = a.prototype.then;
        a.prototype.$goog_Thenable = !0
    },
    wd = function(a) {
        if (!a) return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    };
var zd = function(a, b) {
        this.a = 0;
        this.m = void 0;
        this.g = this.b = this.c = null;
        this.h = this.l = !1;
        if (a != q) try {
            var c = this;
            a.call(b, function(a) {
                xd(c, 2, a)
            }, function(a) {
                if (!(a instanceof yd)) try {
                    if (a instanceof Error) throw a;
                    throw Error("Promise rejected.");
                } catch (b) {}
                xd(c, 3, a)
            })
        } catch (d) {
            xd(this, 3, d)
        }
    },
    Ad = function() {
        this.next = this.g = this.c = this.b = this.a = null;
        this.h = !1
    };
Ad.prototype.reset = function() {
    this.g = this.c = this.b = this.a = null;
    this.h = !1
};
var Bd = new gd(function() {
        return new Ad
    }, function(a) {
        a.reset()
    }, 100),
    Cd = function(a, b, c) {
        var d = Bd.get();
        d.b = a;
        d.c = b;
        d.g = c;
        return d
    },
    Ed = function(a, b, c) {
        Dd(a, b, c, null) || td(ra(b, a))
    },
    Fd = function(a) {
        return new zd(function(b, c) {
            var d = a.length,
                e = [];
            if (d)
                for (var f = function(a, c) {
                        d--;
                        e[a] = c;
                        0 == d && b(e)
                    }, g = function(a) {
                        c(a)
                    }, k = 0, l; k < a.length; k++) l = a[k], Ed(l, ra(f, k), g);
            else b(e)
        })
    };
zd.prototype.then = function(a, b, c) {
    null != a && kb(a, "opt_onFulfilled should be a function.");
    null != b && kb(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
    return Gd(this, ja(a) ? a : null, ja(b) ? b : null, c)
};
vd(zd);
zd.prototype.cancel = function(a) {
    0 == this.a && td(function() {
        var b = new yd(a);
        Hd(this, b)
    }, this)
};
var Hd = function(a, b) {
        if (0 == a.a)
            if (a.c) {
                var c = a.c;
                if (c.b) {
                    for (var d = 0, e = null, f = null, g = c.b; g && (g.h || (d++, g.a == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                    e && (0 == c.a && 1 == d ? Hd(c, b) : (f ? (d = f, x(c.b), x(null != d), d.next == c.g && (c.g = d), d.next = d.next.next) : Id(c), Jd(c, e, 3, b)))
                }
                a.c = null
            } else xd(a, 3, b)
    },
    Ld = function(a, b) {
        a.b || 2 != a.a && 3 != a.a || Kd(a);
        x(null != b.b);
        a.g ? a.g.next = b : a.b = b;
        a.g = b
    },
    Gd = function(a, b, c, d) {
        var e = Cd(null, null, null);
        e.a = new zd(function(a, g) {
            e.b = b ? function(c) {
                    try {
                        var e = b.call(d, c);
                        a(e)
                    } catch (m) {
                        g(m)
                    }
                } :
                a;
            e.c = c ? function(b) {
                try {
                    var e = c.call(d, b);
                    !ba(e) && b instanceof yd ? g(b) : a(e)
                } catch (m) {
                    g(m)
                }
            } : g
        });
        e.a.c = a;
        Ld(a, e);
        return e.a
    };
zd.prototype.G = function(a) {
    x(1 == this.a);
    this.a = 0;
    xd(this, 2, a)
};
zd.prototype.F = function(a) {
    x(1 == this.a);
    this.a = 0;
    xd(this, 3, a)
};
var xd = function(a, b, c) {
        0 == a.a && (a == c && (b = 3, c = new TypeError("Promise cannot resolve to itself")), a.a = 1, Dd(c, a.G, a.F, a) || (a.m = c, a.a = b, a.c = null, Kd(a), 3 != b || c instanceof yd || Md(a, c)))
    },
    Dd = function(a, b, c, d) {
        if (a instanceof zd) return null != b && kb(b, "opt_onFulfilled should be a function."), null != c && kb(c, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"), Ld(a, Cd(b || q, c || null, d)), !0;
        if (wd(a)) return a.then(b, c, d), !0;
        if (ka(a)) try {
            var e = a.then;
            if (ja(e)) return Nd(a,
                e, b, c, d), !0
        } catch (f) {
            return c.call(d, f), !0
        }
        return !1
    },
    Nd = function(a, b, c, d, e) {
        var f = !1,
            g = function(a) {
                f || (f = !0, c.call(e, a))
            },
            k = function(a) {
                f || (f = !0, d.call(e, a))
            };
        try {
            b.call(a, g, k)
        } catch (l) {
            k(l)
        }
    },
    Kd = function(a) {
        a.l || (a.l = !0, td(a.w, a))
    },
    Id = function(a) {
        var b = null;
        a.b && (b = a.b, a.b = b.next, b.next = null);
        a.b || (a.g = null);
        null != b && x(null != b.b);
        return b
    };
zd.prototype.w = function() {
    for (var a; a = Id(this);) Jd(this, a, this.a, this.m);
    this.l = !1
};
var Jd = function(a, b, c, d) {
        if (3 == c && b.c && !b.h)
            for (; a && a.h; a = a.c) a.h = !1;
        if (b.a) b.a.c = null, Od(b, c, d);
        else try {
            b.h ? b.b.call(b.g) : Od(b, c, d)
        } catch (e) {
            Pd.call(null, e)
        }
        hd(Bd, b)
    },
    Od = function(a, b, c) {
        2 == b ? a.b.call(a.g, c) : a.c && a.c.call(a.g, c)
    },
    Md = function(a, b) {
        a.h = !0;
        td(function() {
            a.h && Pd.call(null, b)
        })
    },
    Pd = id,
    yd = function(a) {
        Ba.call(this, a)
    };
v(yd, Ba);
yd.prototype.name = "cancel";
var Qd = function(a, b) {
    K.call(this);
    this.c = a || 1;
    this.b = b || n;
    this.h = u(this.m, this);
    this.l = sa()
};
v(Qd, K);
Qd.prototype.g = !1;
Qd.prototype.a = null;
var Td = function(a, b) {
    a.c = b;
    a.a && a.g ? (Rd(a), Sd(a)) : a.a && Rd(a)
};
Qd.prototype.m = function() {
    if (this.g) {
        var a = sa() - this.l;
        0 < a && a < .8 * this.c ? this.a = this.b.setTimeout(this.h, this.c - a) : (this.a && (this.b.clearTimeout(this.a), this.a = null), this.dispatchEvent("tick"), this.g && (this.a = this.b.setTimeout(this.h, this.c), this.l = sa()))
    }
};
var Sd = function(a) {
        a.g = !0;
        a.a || (a.a = a.b.setTimeout(a.h, a.c), a.l = sa())
    },
    Rd = function(a) {
        a.g = !1;
        a.a && (a.b.clearTimeout(a.a), a.a = null)
    };
Qd.prototype.H = function() {
    Qd.o.H.call(this);
    Rd(this);
    delete this.b
};
var Ud = function(a, b, c) {
    if (ja(a)) c && (a = u(a, c));
    else if (a && "function" == typeof a.handleEvent) a = u(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(b) ? -1 : n.setTimeout(a, b || 0)
};
var L = function() {
    this.c = [];
    this.b = {};
    this.a = {};
    this.h = !1;
    this.Bd = 1;
    this.cc = {};
    this.g = "";
    I(window, "beforeunload", this.m, !1, this)
};
fa(L);
var Vd = function(a, b, c) {
        if (null == b) return "1";
        switch (ga(b)) {
            case "string":
                return a = b, !(64 < a.length) || null != c && c || (a = a.substr(0, 64)), Ia(a);
            case "number":
                return "" + b;
            case "boolean":
                return b ? "1" : "0";
            case "array":
                var d = [],
                    e;
                for (e in b) d.push(Vd(a, b[e], c));
                return d.join(",");
            case "object":
                d = [];
                for (e in b) d.push(Wd(a, e, b[e], c));
                return d.join(",");
            default:
                return ""
        }
    },
    Wd = function(a, b, c, d) {
        return [Ia(b), Vd(a, c, d || "smtalt" == b)].join("=")
    };
L.prototype.log = function(a, b) {
    this.c.push([a, b]);
    this.h || (this.h = !0, Ud(this.l, 0, this))
};
var M = function(a, b, c, d, e) {
        b = "https://translate.google.com/gen204?" + Wd(a, c, d) + "&" + Wd(a, "client", b, !0);
        e && (b += Xd(a, e));
        Yd(a, b)
    },
    Xd = function(a, b) {
        var c = "";
        ba(b) && Hb(b, function(a, b) {
            if (a instanceof Array)
                for (var f = 0; f < a.length; f++) c += "&" + Wd(this, b, a[f]);
            else c += "&" + Wd(this, b, a)
        }, a);
        return c
    };
L.prototype.l = function() {
    for (var a = 0; a < this.c.length; a++) {
        var b = this.c[a];
        Yd(this, "https://translate.google.com/gen204?" + Wd(this, b[0], b[1]))
    }
    this.c = [];
    this.h = !1
};
var Yd = function(a, b) {
        var c = new Image,
            d = a.Bd++;
        a.cc[d] = c;
        c.onload = c.onerror = function() {
            delete L.I().cc[d]
        };
        c.src = b;
        c = null
    },
    $d = function(a, b, c, d) {
        var e = null;
        b in a.b && (e = a.b[b]);
        a = a.b;
        if ("object" == ga(c)) {
            "object" != ga(e) && (e = {});
            for (var f in c) e[f] = Zd(f in e ? e[f] : null, c[f], d)
        } else e = Zd(e, c, d);
        a[b] = e
    },
    Zd = function(a, b, c) {
        null != b || (b = 1);
        "accumulate" == c ? (isNaN(a) && (a = parseInt(a, 10)), isNaN(b) && (b = parseInt(b, 10)), a += b) : a = b;
        return a
    };
L.prototype.m = function() {
    this.l();
    for (var a in this.a)
        if (0 != this.a[a]) {
            var b = a;
            Yd(this, "https://translate.google.com/gen204?" + Wd(this, b, this.a[b][1]));
            b in this.a && (n.clearTimeout(this.a[b][0]), delete this.a[b])
        }
};
var ae = function(a, b) {
    try {
        return ta(a)
    } catch (d) {
        var c = L.I();
        b.js = a;
        b.error = d.message;
        c.log("jsonParseErr", b);
        throw d;
    }
};
var ce = function(a, b) {
        this.a = be;
        this.b = a;
        this.c = Rb(b)
    },
    be = null,
    ee = function(a, b) {
        var c = ["sl", "tl", "src", "trg", "ts"];
        if (!be && "openDatabase" in window) try {
            be = window.openDatabase("GoogleTranslateMobileWebApp", "1.0", "Google Translate Mobile Web App", 5E5)
        } catch (e) {}
        if (be) {
            var d = new ce(a, c);
            de(d, a, c, function(a) {
                b && b(a, d)
            })
        } else b && b(!1, null)
    },
    fe = function(a) {
        return function(b) {
            a && a(!1, b.code)
        }
    },
    de = function(a, b, c, d) {
        var e = [];
        e.push("CREATE TABLE IF NOT EXISTS", b);
        b = [];
        for (var f = 0, g = c.length; f < g; f++) b.push(c[f] +
            " TEXT");
        e.push("(", b.join(","), ")");
        a.a.transaction(function(a) {
            a.executeSql(e.join(" "))
        }, fe(d), d ? ra(d, !0, null) : q)
    },
    ge = function(a, b) {
        for (var c in b) {
            var d = a.c;
            if (!(null !== d && c in d)) return !1
        }
        return !0
    },
    ie = function(a, b, c, d) {
        var e = [
            ["ts"]
        ];
        if (ge(a, b)) {
            var f = [];
            f.push("SELECT * FROM", a.b);
            var g = [],
                k = [];
            he(b, g, k);
            g.length && f.push("WHERE", g.join(" AND "));
            if (e && 0 < e.length) {
                b = [];
                for (g = 0; g < e.length; ++g) b.push(e[g][0] + " " + (e[g][1] ? "ASC" : "DESC"));
                f.push("ORDER BY", b.join(","))
            }
            c && f.push("LIMIT", c);
            var l = [];
            a.a.transaction(function(a) {
                a.executeSql(f.join(" "), k, function(a, b) {
                    for (var c = 0, d = b.rows.length; c < d; c++) l.push(b.rows.item(c))
                })
            }, fe(d), d ? ra(d, !0, l || null) : q)
        } else d && d(!1, -1)
    },
    ke = function(a, b, c) {
        je(a, [b], c)
    },
    je = function(a, b, c) {
        for (var d = 0, e = b.length; d < e; d++)
            if (!ge(a, b[d])) {
                c && c(!1, -1);
                return
            }
        for (var f = [], d = 0, e = b.length; d < e; d++) {
            var g = b[d],
                k = [],
                l = [],
                m = [],
                p;
            for (p in g) k.push(p), l.push(g[p]), m.push("?");
            f.push([
                ["INSERT INTO", a.b, "(", k.join(","), ") VALUES (", m.join(","), ")"].join(" "), l
            ])
        }
        a.a.transaction(function(a) {
            for (var b =
                    0, c = f.length; b < c; b++) a.executeSql(f[b][0], f[b][1])
        }, fe(c), c ? ra(c, !0, null) : q)
    },
    le = function(a, b, c) {
        if (ge(a, b)) {
            var d = [];
            d.push("DELETE FROM", a.b);
            var e = [],
                f = [];
            he(b, e, f);
            e.length && d.push("WHERE", e.join(" AND "));
            a.a.transaction(function(a) {
                a.executeSql(d.join(" "), f)
            }, fe(c), c ? ra(c, !0, null) : q)
        } else c && c(!1, -1)
    },
    he = function(a, b, c) {
        for (var d in a) b.push(d + "=?"), c.push(a[d])
    };
var me = function(a) {
        this.a = a
    },
    ne = function(a, b) {
        ee(a, function(a, d) {
            var e = null;
            a && (e = new me(d));
            b && b(a, e)
        })
    },
    pe = function(a, b, c, d, e, f) {
        oe(a, b, c, d, function(g) {
            g ? (g = {}, g.sl = b, g.tl = c, g.src = d, g.trg = xa(e), g.ts = (new Date).getTime(), ke(a.a, g, function(a) {
                f && f(a)
            })) : f && f(!1)
        })
    },
    oe = function(a, b, c, d, e) {
        var f = {};
        b && (f.sl = b);
        c && (f.tl = c);
        d && (f.src = d);
        le(a.a, f, function(a) {
            e && e(a)
        })
    },
    qe = function(a, b, c, d, e, f) {
        var g = {};
        b && (g.sl = b);
        c && (g.tl = c);
        d && (g.src = d);
        ie(a.a, g, e, function(a, b) {
            var c = [];
            if (a)
                for (var d = 0, e = b.length; d <
                    e; d++) {
                    var g = {},
                        C;
                    for (C in b[d]) g[C] = b[d][C];
                    var G = ae(g.trg, {
                        "class": "trans.common.SavedTranslations"
                    });
                    g.trg = G;
                    c.push(g)
                }
            f && f(a, c)
        })
    },
    re = function(a, b, c, d, e, f) {
        qe(a, b, c, d, e, function(a, b) {
            f && f(a, b)
        })
    };
var se = function(a) {
        this.a = a
    },
    te = function(a) {
        ne("TranslationHistory", function(b, c) {
            var d = b ? new se(c) : null;
            a && a(b, d)
        })
    };
se.prototype.clear = function(a, b, c, d) {
    oe(this.a, a, b, c, d)
};
var ue = function(a) {
        this.a = a
    },
    ve = function(a) {
        ne("TranslationStarred", function(b, c) {
            var d = b ? new ue(c) : null;
            a && a(b, d)
        })
    };
ue.prototype.Pc = function(a, b, c, d, e) {
    pe(this.a, a, b, c, d, e)
};
var xe = function(a, b, c, d) {
        oe(we.a, a, b, c, d)
    },
    ye = function(a, b, c, d) {
        re(we.a, a, b, c, 0, d)
    };
var ze = function(a, b) {
    window.__gaTracker && __gaTracker("send", "event", a, b, "", 1)
};
var Ae = function(a) {
        if (a.classList) return a.classList;
        a = a.className;
        return t(a) && a.match(/\S+/g) || []
    },
    Be = function(a, b) {
        return a.classList ? a.classList.contains(b) : zb(Ae(a), b)
    },
    N = function(a, b) {
        a.classList ? a.classList.add(b) : Be(a, b) || (a.className += 0 < a.className.length ? " " + b : b)
    },
    Ce = function(a, b) {
        if (a.classList) y(b, function(b) {
            N(a, b)
        });
        else {
            var c = {};
            y(Ae(a), function(a) {
                c[a] = !0
            });
            y(b, function(a) {
                c[a] = !0
            });
            a.className = "";
            for (var d in c) a.className += 0 < a.className.length ? " " + d : d
        }
    },
    De = function(a, b) {
        a.classList ?
            a.classList.remove(b) : Be(a, b) && (a.className = tb(Ae(a), function(a) {
                return a != b
            }).join(" "))
    },
    Ee = function(a, b) {
        a.classList ? y(b, function(b) {
            De(a, b)
        }) : a.className = tb(Ae(a), function(a) {
            return !zb(b, a)
        }).join(" ")
    },
    Fe = function(a, b, c) {
        c ? N(a, b) : De(a, b)
    };
var Ge = A("Firefox"),
    He = Xb() || A("iPod"),
    Ie = A("iPad"),
    Je = A("Android") && !(Vb() || A("Firefox") || A("Opera") || A("Silk")),
    Ke = Vb(),
    Le = Wb() && !Yb();
var Me = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
};
var Ne = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i,
    Oe = function(a) {
        return Ne.test(a)
    };
var Qe = function() {
    this.a = "";
    this.b = Pe
};
Qe.prototype.rb = !0;
Qe.prototype.Za = function() {
    return this.a
};
Qe.prototype.toString = function() {
    return "Const{" + this.a + "}"
};
var Re = function(a) {
        if (a instanceof Qe && a.constructor === Qe && a.b === Pe) return a.a;
        hb("expected object of type Const, got '" + a + "'");
        return "type_error:Const"
    },
    Pe = {},
    Se = function(a) {
        var b = new Qe;
        b.a = a;
        return b
    };
var Ue = function() {
    this.a = "";
    this.b = Te
};
Ue.prototype.rb = !0;
var Te = {};
Ue.prototype.Za = function() {
    return this.a
};
Ue.prototype.toString = function() {
    return "SafeStyle{" + this.a + "}"
};
var Ve = function(a) {
        var b = new Ue;
        b.a = a;
        return b
    },
    We = Ve(""),
    Xe = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/;
var Ze = function() {
    this.a = "";
    this.b = Ye
};
Ze.prototype.rb = !0;
var Ye = {};
Ze.prototype.Za = function() {
    return this.a
};
Ze.prototype.toString = function() {
    return "SafeStyleSheet{" + this.a + "}"
};
var $e = function(a) {
    var b = new Ze;
    b.a = a;
    return b
};
$e("");
var bf = function() {
    this.a = "";
    this.b = af
};
h = bf.prototype;
h.rb = !0;
h.Za = function() {
    return this.a
};
h.rd = !0;
h.Db = function() {
    return 1
};
h.toString = function() {
    return "SafeUrl{" + this.a + "}"
};
var cf = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i,
    af = {},
    df = function(a) {
        var b = new bf;
        b.a = a;
        return b
    };
df("about:blank");
var ff = function() {
    this.a = "";
    this.b = ef
};
h = ff.prototype;
h.rb = !0;
h.Za = function() {
    return this.a
};
h.rd = !0;
h.Db = function() {
    return 1
};
h.toString = function() {
    return "TrustedResourceUrl{" + this.a + "}"
};
var gf = function(a) {
        if (a instanceof ff && a.constructor === ff && a.b === ef) return a.a;
        hb("expected object of type TrustedResourceUrl, got '" + a + "' of type " + ga(a));
        return "type_error:TrustedResourceUrl"
    },
    ef = {},
    hf = function(a) {
        var b = new ff;
        b.a = a;
        return b
    };
var kf = function() {
    this.a = "";
    this.c = jf;
    this.b = null
};
h = kf.prototype;
h.rd = !0;
h.Db = function() {
    return this.b
};
h.rb = !0;
h.Za = function() {
    return this.a
};
h.toString = function() {
    return "SafeHtml{" + this.a + "}"
};
var lf = function(a) {
        if (a instanceof kf && a.constructor === kf && a.c === jf) return a.a;
        hb("expected object of type SafeHtml, got '" + a + "' of type " + ga(a));
        return "type_error:SafeHtml"
    },
    nf = function(a) {
        if (a instanceof kf) return a;
        var b = null;
        a.rd && (b = a.Db());
        a = Ra(a.rb ? a.Za() : String(a));
        return mf(a, b)
    },
    of = function(a) {
        if (a instanceof kf) return a;
        a = nf(a);
        var b = lf(a).replace(/(\r\n|\r|\n)/g, "<br>");
        return mf(b, a.Db())
    },
    pf = /^[a-zA-Z0-9-]+$/,
    qf = {
        action: !0,
        cite: !0,
        data: !0,
        formaction: !0,
        href: !0,
        manifest: !0,
        poster: !0,
        src: !0
    },
    rf = {
        APPLET: !0,
        BASE: !0,
        EMBED: !0,
        IFRAME: !0,
        LINK: !0,
        MATH: !0,
        META: !0,
        OBJECT: !0,
        SCRIPT: !0,
        STYLE: !0,
        SVG: !0,
        TEMPLATE: !0
    },
    tf = function(a, b, c) {
        if (!pf.test(a)) throw Error("Invalid tag name <" + a + ">.");
        if (a.toUpperCase() in rf) throw Error("Tag name <" + a + "> is not allowed for SafeHtml.");
        return sf(a, b, c)
    },
    uf = function(a) {
        var b = 0,
            c = "",
            d = function(a) {
                r(a) ? y(a, d) : (a = nf(a), c += lf(a), a = a.Db(), 0 == b ? b = a : 0 != a && b != a && (b = null))
            };
        y(arguments, d);
        return mf(c, b)
    },
    jf = {},
    mf = function(a, b) {
        var c = new kf;
        c.a = a;
        c.b = b;
        return c
    },
    sf = function(a, b, c) {
        var d = null,
            e, f = "";
        if (b)
            for (e in b) {
                if (!pf.test(e)) throw Error('Invalid attribute name "' + e + '".');
                var g = b[e];
                if (null != g) {
                    var k, l = a;
                    k = e;
                    if (g instanceof Qe) g = Re(g);
                    else if ("style" == k.toLowerCase()) {
                        if (!ka(g)) throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof g + " given: " + g);
                        if (!(g instanceof Ue)) {
                            var l = "",
                                m = void 0;
                            for (m in g) {
                                if (!/^[-_a-zA-Z0-9]+$/.test(m)) throw Error("Name allows only [-_a-zA-Z0-9], got: " + m);
                                var p = g[m];
                                if (null != p) {
                                    if (p instanceof Qe) p = Re(p), x(!/[{;}]/.test(p), "Value does not allow [{;}].");
                                    else if (Xe.test(p)) {
                                        for (var w = !0, z = !0, C = 0; C < p.length; C++) {
                                            var G = p.charAt(C);
                                            "'" == G && z ? w = !w : '"' == G && w && (z = !z)
                                        }
                                        w && z || (hb("String value requires balanced quotes, got: " + p), p = "zClosurez")
                                    } else hb("String value allows only [-,.\"'%_!# a-zA-Z0-9], rgb() and rgba(), got: " + p), p = "zClosurez";
                                    l += m + ":" + p + ";"
                                }
                            }
                            l ? (x(!/[<>]/.test(l), "Forbidden characters in style string: " + l), g = Ve(l)) : g = We
                        }
                        g instanceof Ue && g.constructor === Ue && g.b === Te ? g = g.a : (hb("expected object of type SafeStyle, got '" +
                            g + "' of type " + ga(g)), g = "type_error:SafeStyle")
                    } else {
                        if (/^on/i.test(k)) throw Error('Attribute "' + k + '" requires goog.string.Const value, "' + g + '" given.');
                        if (k.toLowerCase() in qf)
                            if (g instanceof ff) g = gf(g);
                            else if (g instanceof bf) g instanceof bf && g.constructor === bf && g.b === af ? g = g.a : (hb("expected object of type SafeUrl, got '" + g + "' of type " + ga(g)), g = "type_error:SafeUrl");
                        else if (t(g)) g instanceof bf || (g = g.rb ? g.Za() : String(g), cf.test(g) || (g = "about:invalid#zClosurez"), g = df(g)), g = g.Za();
                        else throw Error('Attribute "' +
                            k + '" on tag "' + l + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + g + '" given.');
                    }
                    g.rb && (g = g.Za());
                    x(t(g) || ia(g), "String or number value expected, got " + typeof g + " with value: " + g);
                    k = k + '="' + Ra(String(g)) + '"';
                    f += " " + k
                }
            }
        e = "<" + a + f;
        null != c ? r(c) || (c = [c]) : c = [];
        !0 === Me[a.toLowerCase()] ? (x(!c.length, "Void tag <" + a + "> does not allow content."), e += ">") : (d = uf(c), e += ">" + lf(d) + "</" + a + ">", d = d.Db());
        (a = b && b.dir) && (/^(ltr|rtl|auto)$/i.test(a) ? d = 0 : d = null);
        return mf(e, d)
    };
mf("<!DOCTYPE html>", 0);
var vf = mf("", 0),
    wf = mf("<br>", 0);
var O = function(a, b) {
    this.x = ba(a) ? a : 0;
    this.y = ba(b) ? b : 0
};
O.prototype.clone = function() {
    return new O(this.x, this.y)
};
O.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")"
};
var xf = function(a, b) {
    return new O(a.x - b.x, a.y - b.y)
};
O.prototype.ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this
};
O.prototype.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this
};
O.prototype.translate = function(a, b) {
    a instanceof O ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), ia(b) && (this.y += b));
    return this
};
var yf = function(a, b) {
    this.width = a;
    this.height = b
};
yf.prototype.clone = function() {
    return new yf(this.width, this.height)
};
yf.prototype.toString = function() {
    return "(" + this.width + " x " + this.height + ")"
};
yf.prototype.ceil = function() {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
};
yf.prototype.round = function() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
var zf = !B || sc(9),
    Af = !cc && !B || B && sc(9) || cc && F("1.9.1"),
    Bf = B && !F("9"),
    Cf = B || $b || E,
    Df = B && !sc(9);
var Ff = function(a) {
        return a ? new Ef(P(a)) : Ca || (Ca = new Ef)
    },
    Gf = function(a, b) {
        return t(b) ? a.getElementById(b) : b
    },
    If = function(a, b) {
        var c = b || document;
        return c.querySelectorAll && c.querySelector ? c.querySelectorAll("." + a) : Hf(document, "*", a, b)
    },
    Q = function(a, b) {
        var c = b || document,
            d = null;
        c.getElementsByClassName ? d = c.getElementsByClassName(a)[0] : c.querySelectorAll && c.querySelector ? d = c.querySelector("." + a) : d = Hf(document, "*", a, b)[0];
        return d || null
    },
    Hf = function(a, b, c, d) {
        a = d || a;
        b = b && "*" != b ? b.toUpperCase() : "";
        if (a.querySelectorAll &&
            a.querySelector && (b || c)) return a.querySelectorAll(b + (c ? "." + c : ""));
        if (c && a.getElementsByClassName) {
            a = a.getElementsByClassName(c);
            if (b) {
                d = {};
                for (var e = 0, f = 0, g; g = a[f]; f++) b == g.nodeName && (d[e++] = g);
                d.length = e;
                return d
            }
            return a
        }
        a = a.getElementsByTagName(b || "*");
        if (c) {
            d = {};
            for (f = e = 0; g = a[f]; f++) b = g.className, "function" == typeof b.split && zb(b.split(/\s+/), c) && (d[e++] = g);
            d.length = e;
            return d
        }
        return a
    },
    Kf = function(a, b) {
        Hb(b, function(b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor =
                b : Jf.hasOwnProperty(d) ? a.setAttribute(Jf[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    },
    Jf = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    },
    Mf = function(a) {
        var b = Lf(a);
        a = a.parentWindow || a.defaultView;
        return B && F("10") && a.pageYOffset != b.scrollTop ? new O(b.scrollLeft, b.scrollTop) :
            new O(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
    },
    Lf = function(a) {
        return a.scrollingElement ? a.scrollingElement : !E && Nf(a) ? a.documentElement : a.body || a.documentElement
    },
    Of = function(a) {
        return a ? a.parentWindow || a.defaultView : window
    },
    R = function(a, b, c) {
        return Pf(document, arguments)
    },
    Pf = function(a, b) {
        var c = b[0],
            d = b[1];
        if (!zf && d && (d.name || d.type)) {
            c = ["<", c];
            d.name && c.push(' name="', Ra(d.name), '"');
            if (d.type) {
                c.push(' type="', Ra(d.type), '"');
                var e = {};
                Pb(e, d);
                delete e.type;
                d = e
            }
            c.push(">");
            c = c.join("")
        }
        c =
            a.createElement(c);
        d && (t(d) ? c.className = d : r(d) ? c.className = d.join(" ") : Kf(c, d));
        2 < b.length && Qf(a, c, b, 2);
        return c
    },
    Qf = function(a, b, c, d) {
        function e(c) {
            c && b.appendChild(t(c) ? a.createTextNode(c) : c)
        }
        for (; d < c.length; d++) {
            var f = c[d];
            !ha(f) || ka(f) && 0 < f.nodeType ? e(f) : y(Rf(f) ? Db(f) : f, e)
        }
    },
    Nf = function(a) {
        return "CSS1Compat" == a.compatMode
    },
    Sf = function(a, b) {
        Qf(P(a), a, arguments, 1)
    },
    Tf = function(a) {
        for (var b; b = a.firstChild;) a.removeChild(b)
    },
    Uf = function(a, b) {
        a.insertBefore(b, a.childNodes[0] || null)
    },
    S = function(a) {
        a &&
            a.parentNode && a.parentNode.removeChild(a)
    },
    Vf = function(a) {
        return Af && void 0 != a.children ? a.children : tb(a.childNodes, function(a) {
            return 1 == a.nodeType
        })
    },
    Wf = function(a) {
        if (ba(a.firstElementChild)) a = a.firstElementChild;
        else
            for (a = a.firstChild; a && 1 != a.nodeType;) a = a.nextSibling;
        return a
    },
    Xf = function(a) {
        return ka(a) && 1 == a.nodeType
    },
    Yf = function(a) {
        var b;
        if (Cf && !(B && F("9") && !F("10") && n.SVGElement && a instanceof n.SVGElement) && (b = a.parentElement)) return b;
        b = a.parentNode;
        return Xf(b) ? b : null
    },
    Zf = function(a, b) {
        if (!a ||
            !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    },
    bg = function(a, b) {
        if (a == b) return 0;
        if (a.compareDocumentPosition) return a.compareDocumentPosition(b) & 2 ? 1 : -1;
        if (B && !sc(9)) {
            if (9 == a.nodeType) return -1;
            if (9 == b.nodeType) return 1
        }
        if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
            var c = 1 == a.nodeType,
                d = 1 == b.nodeType;
            if (c && d) return a.sourceIndex -
                b.sourceIndex;
            var e = a.parentNode,
                f = b.parentNode;
            return e == f ? $f(a, b) : !c && Zf(e, b) ? -1 * ag(a, b) : !d && Zf(f, a) ? ag(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex)
        }
        d = P(a);
        c = d.createRange();
        c.selectNode(a);
        c.collapse(!0);
        d = d.createRange();
        d.selectNode(b);
        d.collapse(!0);
        return c.compareBoundaryPoints(n.Range.START_TO_END, d)
    },
    ag = function(a, b) {
        var c = a.parentNode;
        if (c == b) return -1;
        for (var d = b; d.parentNode != c;) d = d.parentNode;
        return $f(d, a)
    },
    $f = function(a, b) {
        for (var c = b; c = c.previousSibling;)
            if (c ==
                a) return -1;
        return 1
    },
    cg = function(a) {
        var b, c = arguments.length;
        if (!c) return null;
        if (1 == c) return arguments[0];
        var d = [],
            e = Infinity;
        for (b = 0; b < c; b++) {
            for (var f = [], g = arguments[b]; g;) f.unshift(g), g = g.parentNode;
            d.push(f);
            e = Math.min(e, f.length)
        }
        f = null;
        for (b = 0; b < e; b++) {
            for (var g = d[0][b], k = 1; k < c; k++)
                if (g != d[k][b]) return f;
            f = g
        }
        return f
    },
    P = function(a) {
        x(a, "Node cannot be null or undefined.");
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    },
    dg = function(a) {
        return a.contentDocument || a.contentWindow.document
    },
    T = function(a, b) {
        x(null != a, "goog.dom.setTextContent expects a non-null value for node");
        if ("textContent" in a) a.textContent = b;
        else if (3 == a.nodeType) a.data = b;
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild;) a.removeChild(a.lastChild);
            a.firstChild.data = b
        } else {
            Tf(a);
            var c = P(a);
            a.appendChild(c.createTextNode(String(b)))
        }
    },
    eg = {
        SCRIPT: 1,
        STYLE: 1,
        HEAD: 1,
        IFRAME: 1,
        OBJECT: 1
    },
    fg = {
        IMG: " ",
        BR: "\n"
    },
    gg = function(a, b) {
        b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
    },
    hg = function(a) {
        a =
            a.getAttributeNode("tabindex");
        return null != a && a.specified
    },
    ig = function(a) {
        a = a.tabIndex;
        return ia(a) && 0 <= a && 32768 > a
    },
    kg = function(a) {
        if (Bf && null !== a && "innerText" in a) a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n");
        else {
            var b = [];
            jg(a, b, !0);
            a = b.join("")
        }
        a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
        a = a.replace(/\u200B/g, "");
        Bf || (a = a.replace(/ +/g, " "));
        " " != a && (a = a.replace(/^\s*/, ""));
        return a
    },
    lg = function(a) {
        var b = [];
        jg(a, b, !1);
        return b.join("")
    },
    jg = function(a, b, c) {
        if (!(a.nodeName in eg))
            if (3 == a.nodeType) c ?
                b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
            else if (a.nodeName in fg) b.push(fg[a.nodeName]);
        else
            for (a = a.firstChild; a;) jg(a, b, c), a = a.nextSibling
    },
    Rf = function(a) {
        if (a && "number" == typeof a.length) {
            if (ka(a)) return "function" == typeof a.item || "string" == typeof a.item;
            if (ja(a)) return "function" == typeof a.item
        }
        return !1
    },
    ng = function(a) {
        return mg(a, function(a) {
            return t(a.className) && zb(a.className.split(/\s+/), "gt-baf-entry-clickable")
        }, void 0)
    },
    mg = function(a, b, c) {
        for (var d = 0; a &&
            (null == c || d <= c);) {
            x("parentNode" != a.name);
            if (b(a)) return a;
            a = a.parentNode;
            d++
        }
        return null
    },
    Ef = function(a) {
        this.a = a || n.document || document
    };
Ef.prototype.j = function(a) {
    return Gf(this.a, a)
};
Ef.prototype.b = function(a, b, c) {
    return Pf(this.a, arguments)
};
var og = function(a) {
    a = a.a;
    return a.parentWindow || a.defaultView
};
h = Ef.prototype;
h.appendChild = function(a, b) {
    a.appendChild(b)
};
h.be = Sf;
h.ce = Tf;
h.$d = Wf;
h.Rf = Xf;
h.contains = Zf;
var qg = function(a, b) {
        var c = Array.prototype.slice.call(arguments),
            d = c.shift();
        if ("undefined" == typeof d) throw Error("[goog.string.format] Template required");
        return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(a, b, d, k, l, m, p, w) {
            if ("%" == m) return "%";
            var z = c.shift();
            if ("undefined" == typeof z) throw Error("[goog.string.format] Not enough arguments");
            arguments[0] = z;
            return pg[m].apply(null, arguments)
        })
    },
    pg = {
        s: function(a, b, c) {
            return isNaN(c) || "" == c || a.length >= Number(c) ? a : a = -1 < b.indexOf("-", 0) ?
                a + Xa(" ", Number(c) - a.length) : Xa(" ", Number(c) - a.length) + a
        },
        f: function(a, b, c, d, e) {
            d = a.toString();
            isNaN(e) || "" == e || (d = parseFloat(a).toFixed(e));
            var f;
            f = 0 > Number(a) ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
            0 <= Number(a) && (d = f + d);
            if (isNaN(c) || d.length >= Number(c)) return d;
            d = isNaN(e) ? Math.abs(Number(a)).toString() : Math.abs(Number(a)).toFixed(e);
            a = Number(c) - d.length - f.length;
            return d = 0 <= b.indexOf("-", 0) ? f + d + Xa(" ", a) : f + Xa(0 <= b.indexOf("0", 0) ? "0" : " ", a) + d
        },
        d: function(a, b, c, d, e, f, g, k) {
            return pg.f(parseInt(a,
                10), b, c, d, 0, f, g, k)
        }
    };
pg.i = pg.d;
pg.u = pg.d;
var sg = function(a) {
        rg();
        return $e(a)
    },
    rg = q;
var tg = function(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d
};
h = tg.prototype;
h.clone = function() {
    return new tg(this.top, this.right, this.bottom, this.left)
};
h.toString = function() {
    return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
};
h.contains = function(a) {
    return this && a ? a instanceof tg ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
};
h.ceil = function() {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this
};
h.round = function() {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this
};
h.translate = function(a, b) {
    a instanceof O ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (ib(a), this.left += a, this.right += a, ia(b) && (this.top += b, this.bottom += b));
    return this
};
var ug = function(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d
};
h = ug.prototype;
h.clone = function() {
    return new ug(this.left, this.top, this.width, this.height)
};
h.toString = function() {
    return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
};
h.contains = function(a) {
    return a instanceof ug ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
};
h.ceil = function() {
    this.left = Math.ceil(this.left);
    this.top = Math.ceil(this.top);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
};
h.round = function() {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
h.translate = function(a, b) {
    a instanceof O ? (this.left += a.x, this.top += a.y) : (this.left += ib(a), ia(b) && (this.top += b));
    return this
};
var wg = function(a, b, c) {
        if (t(b))(b = vg(a, b)) && (a.style[b] = c);
        else
            for (var d in b) {
                c = a;
                var e = b[d],
                    f = vg(c, d);
                f && (c.style[f] = e)
            }
    },
    xg = {},
    vg = function(a, b) {
        var c = xg[b];
        if (!c) {
            var d = cb(b),
                c = d;
            void 0 === a.style[d] && (d = (E ? "Webkit" : cc ? "Moz" : B ? "ms" : $b ? "O" : null) + db(d), void 0 !== a.style[d] && (c = d));
            xg[b] = c
        }
        return c
    },
    yg = function(a, b) {
        var c = P(a);
        return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : ""
    },
    zg = function(a, b) {
        return yg(a, b) || (a.currentStyle ?
            a.currentStyle[b] : null) || a.style && a.style[b]
    },
    Bg = function(a, b, c) {
        var d;
        b instanceof O ? (d = b.x, b = b.y) : (d = b, b = c);
        a.style.left = Ag(d, !1);
        a.style.top = Ag(b, !1)
    },
    Cg = function(a) {
        var b;
        try {
            b = a.getBoundingClientRect()
        } catch (c) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
        B && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    },
    Dg = function(a) {
        if (B && !sc(8)) return x(a && "offsetParent" in a), a.offsetParent;
        var b = P(a),
            c = zg(a, "position"),
            d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode)
            if (11 == a.nodeType && a.host && (a = a.host), c = zg(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
        return null
    },
    Fg = function(a) {
        for (var b = new tg(0, Infinity, Infinity, 0), c = Ff(a), d = c.a.body, e = c.a.documentElement, f = Lf(c.a); a = Dg(a);)
            if (!(B && 0 == a.clientWidth || E && 0 == a.clientHeight && a == d) && a != d &&
                a != e && "visible" != zg(a, "overflow")) {
                var g = Eg(a),
                    k = new O(a.clientLeft, a.clientTop);
                g.x += k.x;
                g.y += k.y;
                b.top = Math.max(b.top, g.y);
                b.right = Math.min(b.right, g.x + a.clientWidth);
                b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
                b.left = Math.max(b.left, g.x)
            }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = (og(c) || window).document;
        c = Nf(c) ? c.documentElement : c.body;
        c = new yf(c.clientWidth, c.clientHeight);
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, f + c.height);
        return 0 <=
            b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
    },
    Eg = function(a) {
        var b = P(a);
        lb(a, "Parameter is required");
        var c = new O(0, 0),
            d;
        d = b ? P(b) : document;
        d = !B || sc(9) || Nf(Ff(d).a) ? d.documentElement : d.body;
        if (a == d) return c;
        a = Cg(a);
        b = Mf(Ff(b).a);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    },
    Hg = function(a, b) {
        var c = Gg(a),
            d = Gg(b);
        return new O(c.x - d.x, c.y - d.y)
    },
    Ig = function(a) {
        a = Cg(a);
        return new O(a.left, a.top)
    },
    Gg = function(a) {
        x(a);
        if (1 == a.nodeType) return Ig(a);
        a = a.changedTouches ? a.changedTouches[0] : a;
        return new O(a.clientX,
            a.clientY)
    },
    Ag = function(a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    },
    Kg = function(a) {
        var b = Jg;
        if ("none" != zg(a, "display")) return b(a);
        var c = a.style,
            d = c.display,
            e = c.visibility,
            f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a
    },
    Jg = function(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight,
            d = E && !b && !c;
        return ba(b) && !d || !a.getBoundingClientRect ? new yf(b, c) : (a = Cg(a), new yf(a.right - a.left, a.bottom - a.top))
    },
    Lg = function(a) {
        var b =
            Eg(a);
        a = Kg(a);
        return new ug(b.x, b.y, a.width, a.height)
    },
    U = function(a, b) {
        a.style.display = b ? "" : "none"
    },
    Ng = function(a) {
        a = sg(a);
        var b = Ff(void 0),
            c, d = b.a;
        B && d.createStyleSheet ? (c = d.createStyleSheet(), Mg(c, a)) : (d = Hf(b.a, "HEAD", void 0, void 0)[0], d || (c = Hf(b.a, "BODY", void 0, void 0)[0], d = b.b("HEAD"), c.parentNode.insertBefore(d, c)), c = b.b("STYLE"), Mg(c, a), b.appendChild(d, c));
        return c
    },
    Mg = function(a, b) {
        var c;
        b instanceof Ze && b.constructor === Ze && b.b === Ye ? c = b.a : (hb("expected object of type SafeStyleSheet, got '" +
            b + "' of type " + ga(b)), c = "type_error:SafeStyleSheet");
        B && ba(a.cssText) ? a.cssText = c : T(a, c)
    },
    Og = function(a) {
        return "rtl" == zg(a, "direction")
    },
    Pg = cc ? "MozUserSelect" : E || ac ? "WebkitUserSelect" : null,
    Qg = function(a, b, c) {
        c = c ? null : a.getElementsByTagName("*");
        if (Pg) {
            if (b = b ? "none" : "", a.style && (a.style[Pg] = b), c) {
                a = 0;
                for (var d; d = c[a]; a++) d.style && (d.style[Pg] = b)
            }
        } else if (B || $b)
            if (b = b ? "on" : "", a.setAttribute("unselectable", b), c)
                for (a = 0; d = c[a]; a++) d.setAttribute("unselectable", b)
    },
    Rg = function(a, b) {
        if (/^\d+px?$/.test(b)) return parseInt(b,
            10);
        var c = a.style.left,
            d = a.runtimeStyle.left;
        a.runtimeStyle.left = a.currentStyle.left;
        a.style.left = b;
        var e = a.style.pixelLeft;
        a.style.left = c;
        a.runtimeStyle.left = d;
        return e
    },
    Sg = function(a, b) {
        var c = a.currentStyle ? a.currentStyle[b] : null;
        return c ? Rg(a, c) : 0
    },
    Tg = function(a, b) {
        if (B) {
            var c = Sg(a, b + "Left"),
                d = Sg(a, b + "Right"),
                e = Sg(a, b + "Top"),
                f = Sg(a, b + "Bottom");
            return new tg(e, d, f, c)
        }
        c = yg(a, b + "Left");
        d = yg(a, b + "Right");
        e = yg(a, b + "Top");
        f = yg(a, b + "Bottom");
        return new tg(parseFloat(e), parseFloat(d), parseFloat(f), parseFloat(c))
    },
    Ug = {
        thin: 2,
        medium: 4,
        thick: 6
    },
    Vg = function(a, b) {
        if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null)) return 0;
        var c = a.currentStyle ? a.currentStyle[b + "Width"] : null;
        return c in Ug ? Ug[c] : Rg(a, c)
    },
    Xg = function(a) {
        if (B && !sc(9)) {
            var b = Vg(a, "borderLeft"),
                c = Vg(a, "borderRight"),
                d = Vg(a, "borderTop");
            a = Vg(a, "borderBottom");
            return new tg(d, c, a, b)
        }
        b = yg(a, "borderLeftWidth");
        c = yg(a, "borderRightWidth");
        d = yg(a, "borderTopWidth");
        a = yg(a, "borderBottomWidth");
        return new tg(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
    };
var Yg = function(a) {
    xc.call(this);
    this.F = a;
    this.l = {}
};
v(Yg, xc);
var Zg = [];
Yg.prototype.D = function(a, b, c, d) {
    r(b) || (b && (Zg[0] = b.toString()), b = Zg);
    for (var e = 0; e < b.length; e++) {
        var f = I(a, b[e], c || this.handleEvent, d || !1, this.F || this);
        if (!f) break;
        this.l[f.fe] = f
    }
    return this
};
Yg.prototype.b = function(a, b, c, d, e) {
    if (r(b))
        for (var f = 0; f < b.length; f++) this.b(a, b[f], c, d, e);
    else c = c || this.handleEvent, e = e || this.F || this, c = Tc(c), d = !!d, b = Gc(a) ? Pc(a.G, String(b), c, d, e) : a ? (a = Vc(a)) ? Pc(a, b, c, d, e) : null : null, b && (ad(b), delete this.l[b.fe]);
    return this
};
var $g = function(a) {
    Hb(a.l, function(a, c) {
        this.l.hasOwnProperty(c) && ad(a)
    }, a);
    a.l = {}
};
Yg.prototype.H = function() {
    Yg.o.H.call(this);
    $g(this)
};
Yg.prototype.handleEvent = function() {
    throw Error("EventHandler.handleEvent not implemented");
};
var ah = function() {};
fa(ah);
ah.prototype.a = 0;
var ch = function(a) {
    K.call(this);
    this.b = a || Ff();
    this.yb = bh;
    this.U = null;
    this.Z = !1;
    this.v = null;
    this.O = void 0;
    this.w = this.g = this.h = this.lb = null;
    this.uc = !1
};
v(ch, K);
ch.prototype.Uf = ah.I();
var bh = null,
    dh = function(a, b) {
        switch (a) {
            case 1:
                return b ? "disable" : "enable";
            case 2:
                return b ? "highlight" : "unhighlight";
            case 4:
                return b ? "activate" : "deactivate";
            case 8:
                return b ? "select" : "unselect";
            case 16:
                return b ? "check" : "uncheck";
            case 32:
                return b ? "focus" : "blur";
            case 64:
                return b ? "open" : "close"
        }
        throw Error("Invalid component state");
    },
    eh = function(a) {
        return a.U || (a.U = ":" + (a.Uf.a++).toString(36))
    },
    fh = function(a, b) {
        if (a.h && a.h.w) {
            var c = a.h.w,
                d = a.U;
            d in c && delete c[d];
            Mb(a.h.w, b, a)
        }
        a.U = b
    };
ch.prototype.j = function() {
    return this.v
};
var gh = function(a) {
        a = a.v;
        x(a, "Can not call getElementStrict before rendering/decorating.");
        return a
    },
    hh = function(a, b) {
        return a.v ? Q(b, a.v || a.b.a) : null
    },
    ih = function(a) {
        a.O || (a.O = new Yg(a));
        return a.O
    },
    kh = function(a, b) {
        if (a == b) throw Error("Unable to set parent component");
        if (b && a.h && a.U && jh(a.h, a.U) && a.h != b) throw Error("Unable to set parent component");
        a.h = b;
        ch.o.Oc.call(a, b)
    };
ch.prototype.F = function() {
    return this.h
};
ch.prototype.Oc = function(a) {
    if (this.h && this.h != a) throw Error("Method not supported");
    ch.o.Oc.call(this, a)
};
ch.prototype.Ea = function() {
    this.v = this.b.a.createElement("DIV")
};
var lh = function(a, b, c) {
        if (a.Z) throw Error("Component already rendered");
        a.v || a.Ea();
        b ? b.insertBefore(a.v, c || null) : a.b.a.body.appendChild(a.v);
        a.h && !a.h.Z || a.Y()
    },
    mh = function(a, b) {
        if (a.Z) throw Error("Component already rendered");
        if (b && a.fd(b)) {
            a.uc = !0;
            var c = P(b);
            a.b && a.b.a == c || (a.b = Ff(b));
            a.ra(b);
            a.Y()
        } else throw Error("Invalid element to decorate");
    };
h = ch.prototype;
h.fd = function() {
    return !0
};
h.ra = function(a) {
    this.v = a
};
h.Y = function() {
    this.Z = !0;
    nh(this, function(a) {
        !a.Z && a.j() && a.Y()
    })
};
h.Ra = function() {
    nh(this, function(a) {
        a.Z && a.Ra()
    });
    this.O && $g(this.O);
    this.Z = !1
};
h.H = function() {
    this.Z && this.Ra();
    this.O && (this.O.sa(), delete this.O);
    nh(this, function(a) {
        a.sa()
    });
    !this.uc && this.v && S(this.v);
    this.h = this.lb = this.v = this.w = this.g = null;
    ch.o.H.call(this)
};
h.Va = function(a, b) {
    this.Tc(a, oh(this), b)
};
h.Tc = function(a, b, c) {
    x(!!a, "Provided element must not be null.");
    if (a.Z && (c || !this.Z)) throw Error("Component already rendered");
    if (0 > b || b > oh(this)) throw Error("Child component index out of bounds");
    this.w && this.g || (this.w = {}, this.g = []);
    if (a.F() == this) {
        var d = eh(a);
        this.w[d] = a;
        Ab(this.g, a)
    } else Mb(this.w, eh(a), a);
    kh(a, this);
    Gb(this.g, b, 0, a);
    a.Z && this.Z && a.F() == this ? (c = this.Fb(), b = c.childNodes[b] || null, b != a.j() && c.insertBefore(a.j(), b)) : c ? (this.v || this.Ea(), b = ph(this, b + 1), lh(a, this.Fb(), b ? b.v : null)) :
        this.Z && !a.Z && a.v && a.v.parentNode && 1 == a.v.parentNode.nodeType && a.Y()
};
h.Fb = function() {
    return this.v
};
var qh = function(a) {
        null == a.yb && (a.yb = Og(a.Z ? a.v : a.b.a.body));
        return a.yb
    },
    oh = function(a) {
        return a.g ? a.g.length : 0
    },
    jh = function(a, b) {
        var c;
        a.w && b ? (c = a.w, c = (null !== c && b in c ? c[b] : void 0) || null) : c = null;
        return c
    },
    ph = function(a, b) {
        return a.g ? a.g[b] || null : null
    },
    nh = function(a, b, c) {
        a.g && y(a.g, b, c)
    },
    rh = function(a, b) {
        return a.g && b ? sb(a.g, b) : -1
    };
ch.prototype.removeChild = function(a, b) {
    if (a) {
        var c = t(a) ? a : eh(a);
        a = jh(this, c);
        if (c && a) {
            var d = this.w;
            c in d && delete d[c];
            Ab(this.g, a);
            b && (a.Ra(), a.v && S(a.v));
            kh(a, null)
        }
    }
    if (!a) throw Error("Child is not in parent component");
    return a
};
var sh = function(a) {
    for (var b = []; a.g && 0 != a.g.length;) b.push(a.removeChild(ph(a, 0), !0))
};
var th = function(a, b) {
        a[b] || (a[b] = []);
        return a[b]
    },
    V = function(a, b) {
        return a[b] ? a[b].length : 0
    },
    uh = function(a, b) {
        this.type = a;
        this.label = b;
        x(!ba(void 0) || "m" == a, "Only messages should give a message descriptor.")
    },
    vh = function(a) {
        switch (a) {
            case "d":
            case "f":
            case "i":
            case "j":
            case "u":
            case "v":
            case "x":
            case "y":
            case "g":
            case "h":
            case "n":
            case "o":
            case "e":
                break;
            case "s":
            case "z":
            case "B":
                break;
            case "b":
                break;
            default:
                x("Message descriptors must provide a default value.")
        }
    },
    wh = function(a) {
        ba(void 0) || vh(a);
        new uh(a, 1)
    },
    xh = function(a) {
        ba(void 0) || vh(a);
        new uh(a, 2)
    },
    yh = function(a) {
        new uh(a, 3)
    };
wh("d");
xh("d");
yh("d");
wh("f");
xh("f");
yh("f");
wh("i");
xh("i");
yh("i");
wh("j");
xh("j");
yh("j");
wh("u");
xh("u");
yh("u");
wh("v");
xh("v");
yh("v");
wh("b");
xh("b");
yh("b");
wh("e");
xh("e");
yh("e");
wh("s");
xh("s");
yh("s");
wh("B");
xh("B");
yh("B");
wh("x");
xh("x");
yh("x");
wh("y");
xh("y");
yh("y");
wh("g");
xh("g");
yh("g");
wh("h");
xh("h");
yh("h");
wh("n");
xh("n");
yh("n");
wh("o");
xh("o");
yh("o");
var zh = function(a) {
        this.a = a || []
    },
    Ah = function(a) {
        this.a = a || []
    },
    Bh = {
        text: [0, null, null, !1],
        source: [1, null, null, !1],
        link: [2, null, null, !1],
        translation: [3, null, null, !1],
        source_type: [4, null, null, !1],
        definition_id: [5, null, null, !1]
    },
    Ch = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in Bh)
                    if (f = Bh[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
zh.prototype.toString = function() {
    return JSON.stringify(Ch(this.a))
};
zh.prototype.N = function() {
    return this.a
};
zh.prototype.dc = function() {
    0 in this.a && delete this.a[0]
};
var Dh = {
        example: [0, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = Bh[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new zh(b)
        }, function(a) {
            return Ch(a)
        }, !0]
    },
    Eh = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in Dh)
                    if (f = Dh[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] =
                            f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Ah.prototype.toString = function() {
    return JSON.stringify(Eh(this.a))
};
Ah.prototype.N = function() {
    return this.a
};
var Fh = function(a) {
        this.a = a || []
    },
    Gh = function(a) {
        this.a = a || []
    },
    Hh = function(a) {
        this.a = a || []
    },
    Ih = function(a) {
        this.a = a || []
    },
    Jh = function(a) {
        this.kb = a || []
    },
    Kh = function(a) {
        this.a = a || []
    },
    Lh = function(a) {
        this.a = a || []
    },
    Mh = function(a) {
        this.a = a || []
    },
    Nh = function(a) {
        this.a = a || []
    },
    Oh = function(a) {
        this.a = a || []
    },
    Ph = function(a) {
        this.a = a || []
    },
    Qh = function(a) {
        this.a = a || []
    },
    Rh = function(a) {
        this.a = a || []
    },
    Sh = function(a) {
        this.a = a || []
    },
    Th = function(a) {
        this.a = a || []
    },
    Uh = function(a) {
        this.X = a || []
    },
    Vh = {
        word: [0, null, null, !1],
        styles: [1,
            null, null, !0
        ],
        has_preceeding_space: [2, null, null, !1],
        attach_to_next_token: [3, null, null, !1],
        confidence: [4, null, null, !1],
        start_pos: [5, null, null, !1],
        end_pos: [6, null, null, !1],
        not_from_first_segment: [7, null, null, !1]
    },
    Wh = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in Vh)
                    if (f = Vh[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Fh.prototype.toString = function() {
    return JSON.stringify(Wh(this.a))
};
Fh.prototype.N = function() {
    return this.a
};
var ai = {
        src_phrase: [0, null, null, !1],
        style: [1, null, null, !1],
        alternative: [2, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = Xh[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Hh(b)
        }, function(a) {
            return Yh(a)
        }, !0],
        srcunicodeoffsets: [3, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = Zh[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Ih(b)
        }, function(a) {
            return $h(a)
        }, !0],
        raw_src_segment: [4, null, null, !1],
        start_pos: [5, null, null, !1],
        end_pos: [6, null, null, !1]
    },
    bi = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in ai)
                    if (f = ai[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Gh.prototype.toString = function() {
    return JSON.stringify(bi(this.a))
};
Gh.prototype.N = function() {
    return this.a
};
var ci = function(a) {
        a = a.a[4];
        return null != a ? a : ""
    },
    Xh = {
        word_postproc: [0, null, null, !1],
        score: [1, null, null, !1],
        has_preceeding_space: [2, null, null, !1],
        attach_to_next_token: [3, null, null, !1]
    },
    Yh = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in Xh)
                    if (f = Xh[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Hh.prototype.toString = function() {
    return JSON.stringify(Yh(this.a))
};
Hh.prototype.N = function() {
    return this.a
};
var Zh = {
        begin: [0, null, null, !1],
        end: [1, null, null, !1]
    },
    $h = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in Zh)
                    if (f = Zh[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Ih.prototype.toString = function() {
    return JSON.stringify($h(this.a))
};
Ih.prototype.N = function() {
    return this.a
};
var di = {
        trans: [0, null, null, !1],
        orig: [1, null, null, !1],
        translit: [2, null, null, !1],
        src_translit: [3, null, null, !1],
        backend: [4, null, null, !1]
    },
    ei = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in di)
                    if (f = di[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Jh.prototype.toString = function() {
    return JSON.stringify(ei(this.kb))
};
Jh.prototype.N = function() {
    return this.kb
};
var fi = function(a) {
        a = a.kb[0];
        return null != a ? a : ""
    },
    gi = function(a) {
        a = a.kb[3];
        return null != a ? a : ""
    },
    hi = {
        word: [0, null, null, !1],
        reverse_translation: [1, null, null, !0],
        synset_id: [2, null, null, !0],
        score: [3, null, null, !1],
        previous_word: [4, null, null, !1]
    },
    ii = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in hi)
                    if (f = hi[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] =
                    a[c]
            }
        return b
    };
Kh.prototype.toString = function() {
    return JSON.stringify(ii(this.a))
};
Kh.prototype.N = function() {
    return this.a
};
var ji = function(a, b) {
        return th(a.a, 1)[b]
    },
    ki = {
        pos: [0, null, null, !1],
        terms: [1, null, null, !0],
        entry: [2, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = hi[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Kh(b)
        }, function(a) {
            return ii(a)
        }, !0],
        base_form: [3, null, null, !1],
        pos_enum: [4, null, null, !1]
    },
    li = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in ki)
                    if (f =
                        ki[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Lh.prototype.toString = function() {
    return JSON.stringify(li(this.a))
};
Lh.prototype.N = function() {
    return this.a
};
var mi = function(a) {
        a = a.a[0];
        return null != a ? a : ""
    },
    ni = {
        gloss: [0, null, null, !1],
        definition_id: [1, null, null, !1],
        example: [2, null, null, !1]
    },
    oi = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in ni)
                    if (f = ni[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Mh.prototype.toString = function() {
    return JSON.stringify(oi(this.a))
};
Mh.prototype.N = function() {
    return this.a
};
var pi = {
        pos: [0, null, null, !1],
        entry: [1, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = ni[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Mh(b)
        }, function(a) {
            return oi(a)
        }, !0],
        base_form: [2, null, null, !1]
    },
    qi = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in pi)
                    if (f = pi[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Nh.prototype.toString = function() {
    return JSON.stringify(qi(this.a))
};
Nh.prototype.N = function() {
    return this.a
};
var ri = {
        synonym: [0, null, null, !0],
        definition_id: [1, null, null, !1]
    },
    si = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in ri)
                    if (f = ri[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Oh.prototype.toString = function() {
    return JSON.stringify(si(this.a))
};
Oh.prototype.N = function() {
    return this.a
};
var ti = {
        pos: [0, null, null, !1],
        entry: [1, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = ri[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Oh(b)
        }, function(a) {
            return si(a)
        }, !0],
        base_form: [2, null, null, !1]
    },
    ui = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in ti)
                    if (f = ti[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Ph.prototype.toString = function() {
    return JSON.stringify(ui(this.a))
};
Ph.prototype.N = function() {
    return this.a
};
var vi = {
        word: [0, null, null, !0]
    },
    wi = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in vi)
                    if (f = vi[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Qh.prototype.toString = function() {
    return JSON.stringify(wi(this.a))
};
Qh.prototype.N = function() {
    return this.a
};
var xi = {
        spell_html_res: [0, null, null, !1],
        spell_res: [1, null, null, !1],
        correction_type: [2, null, null, !0],
        correction_translation: [3, null, null, !1],
        related: [4, null, null, !1],
        confident: [5, null, null, !1]
    },
    yi = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in xi)
                    if (f = xi[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Rh.prototype.toString = function() {
    return JSON.stringify(yi(this.a))
};
Rh.prototype.N = function() {
    return this.a
};
var zi = function(a) {
        a = a.a[1];
        return null != a ? a : ""
    },
    Ai = {
        srclangs: [0, null, null, !0],
        extended_srclangs: [3, null, null, !0],
        detected_target: [1, null, null, !1],
        srclangs_confidences: [2, null, null, !0]
    },
    Bi = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in Ai)
                    if (f = Ai[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Sh.prototype.toString = function() {
    return JSON.stringify(Bi(this.a))
};
Sh.prototype.N = function() {
    return this.a
};
var Ci = {
        title: [0, null, null, !1],
        description: [1, null, null, !1],
        image_url: [2, null, null, !1],
        image_ref_url: [3, null, null, !1]
    },
    Di = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in Ci)
                    if (f = Ci[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Th.prototype.toString = function() {
    return JSON.stringify(Di(this.a))
};
Th.prototype.N = function() {
    return this.a
};
var Ei = {
        sentences: [0, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = di[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Jh(b)
        }, function(a) {
            return ei(a)
        }, !0],
        dict: [1, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = ki[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Lh(b)
        }, function(a) {
            return li(a)
        }, !0],
        src: [2, null, null, !1],
        err: [3, null, null, !1],
        styled_words: [4, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = Vh[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Fh(b)
        }, function(a) {
            return Wh(a)
        }, !0],
        alternative_translations: [5, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = ai[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] =
                    f
            }
            return new Gh(b)
        }, function(a) {
            return bi(a)
        }, !0],
        confidence: [6, null, null, !1],
        spell: [7, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = xi[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Rh(b)
        }, function(a) {
            return yi(a)
        }, !1],
        autocorrection: [10, null, null, !1],
        ld_result: [8, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = Ai[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Sh(b)
        }, function(a) {
            return Bi(a)
        }, !1],
        server_time: [9, null, null, !1],
        synsets: [11, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = ti[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Ph(b)
        }, function(a) {
            return ui(a)
        }, !0],
        definitions: [12, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = pi[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Nh(b)
        }, function(a) {
            return qi(a)
        }, !0],
        examples: [13, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = Dh[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Ah(b)
        }, function(a) {
            return Eh(a)
        }, !1],
        related_words: [14, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = vi[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Qh(b)
        }, function(a) {
            return wi(a)
        }, !1],
        knowledge_results: [15, function(a) {
            var b = [],
                c, d;
            for (d in a) {
                var e = Ci[d],
                    f = a[d];
                if (e[1])
                    if (f instanceof Array)
                        for (b[e[0]] = [], c = 0; c < f.length; c++) b[e[0]].push(e[1](f[c]).N());
                    else b[e[0]] = e[1](f).N();
                else b[e[0]] = f
            }
            return new Th(b)
        }, function(a) {
            return Di(a)
        }, !0]
    },
    Fi = function(a) {
        var b = {},
            c;
        for (c = 0; c < a.length; c++)
            if (void 0 !== a[c] && null !== a[c]) {
                var d = !1,
                    e = void 0,
                    f = void 0,
                    g;
                for (g in Ei)
                    if (f = Ei[g], e = g, f[0] == c) {
                        d = !0;
                        break
                    }
                if (d)
                    if (f[2])
                        if (f[3])
                            for (b[e] = [], d = 0; d < a[c].length; d++) b[e].push(f[2](a[c][d]));
                        else b[e] = f[2](a[c]);
                else b[e] = a[c]
            }
        return b
    };
Uh.prototype.toString = function() {
    return JSON.stringify(Fi(this.X))
};
Uh.prototype.N = function() {
    return this.X
};
var Gi = function(a) {
        a = a.X[2];
        return null != a ? a : ""
    },
    Hi = new Rh,
    Ii = function(a) {
        return (a = a.X[7]) ? new Rh(a) : Hi
    },
    Ji = new Sh,
    Ki = function(a) {
        return (a = a.X[8]) ? new Sh(a) : Ji
    },
    Li = new Ah,
    Mi = function(a, b) {
        return new Jh(th(a.X, 0)[b])
    },
    Ni = function(a, b) {
        return new Lh(th(a.X, 1)[b])
    },
    Oi = function(a, b) {
        return new Gh(th(a.X, 5)[b])
    },
    Pi = function(a, b) {
        return new Nh(th(a.X, 12)[b])
    };
var Ti = function(a) {
        this.b = !1;
        this.a = [];
        this.c = {};
        for (var b = 0; b < V(a.X, 1); b++) {
            var c = Ni(a, b),
                d = mi(c),
                e = "";
            null != c.a[3] && (c = c.a[3], e = null != c ? c : "");
            d in this.c ? d = this.c[d] : (c = new Qi(d, e), this.c[d] = c, this.a.push(c), d = c);
            for (c = 0; c < V(Ni(a, b).a, 2); c++) {
                var f, e = Ni(a, b),
                    g = c,
                    e = f = new Kh(th(e.a, 2)[g]),
                    e = 0 == V(e.a, 2) ? -oa(e) : th(e.a, 2)[0];
                g = d;
                if (e in g.b) e = g.b[e];
                else {
                    var k = new Ri;
                    g.b[e] = k;
                    g.a.push(k);
                    e = k
                }
                var g = f.a[0],
                    g = null != g ? g : "",
                    k = f.a[4],
                    k = null != k ? k : "",
                    l;
                null != f.a[3] ? (l = f.a[3], l = null != l ? l : 0) : l = -1;
                var m;
                m = [];
                for (var p =
                        0; p < V(f.a, 1); p++) m.push(ji(f, p));
                f = e;
                g in f.b || (k = new Si(g, k, l, m), f.b[g] = k, f.a.push(k));
                this.b |= 1 < e.a.length
            }
        }
    },
    Ui = function(a) {
        for (var b = 0, c = 0; c < a.a.length; c++) {
            for (var d = a.a[c], e = 0, f = 0; f < d.a.length; f++) e += d.a[f].a.length;
            b += e
        }
        for (d = c = 0; d < a.a.length; d++) {
            for (var e = a.a[d], g = f = 0; g < e.a.length; g++) {
                for (var k = e.a[g], l = 0, m = 0; m < k.a.length; m++) l += k.a[m].visible ? 1 : 0;
                f += l
            }
            c += f
        }
        return b - c
    },
    Vi = function(a) {
        for (var b = [], c = 0; c < a.a.length; c++)
            for (var d = 0; d < a.a[c].a.length; d++) Array.prototype.push.apply(b, a.a[c].a[d].a);
        return b
    },
    Wi = function(a) {
        for (var b = 0; b < a.a.length; b++)
            for (var c = 0; c < a.a[b].a.length; c++) a.a[b].a[c].a.sort(function(a, b) {
                return b.a - a.a
            })
    },
    Qi = function(a, b) {
        this.g = a;
        this.c = b;
        this.a = [];
        this.b = {}
    };
Qi.prototype.visible = function() {
    for (var a = 0; a < this.a.length; a++)
        if (this.a[a].visible()) return !0;
    return !1
};
var Ri = function() {
    this.a = [];
    this.b = {}
};
Ri.prototype.visible = function() {
    for (var a = 0; a < this.a.length; a++)
        if (this.a[a].visible) return !0;
    return !1
};
var Si = function(a, b, c, d) {
    this.text = a;
    this.c = b;
    this.a = c;
    this.g = d;
    this.visible = !1;
    this.b = 0
};
var Xi, Yi = {
    Kg: "activedescendant",
    Qg: "atomic",
    Rg: "autocomplete",
    Ug: "busy",
    Xg: "checked",
    bh: "controls",
    eh: "describedby",
    hh: "disabled",
    jh: "dropeffect",
    lh: "expanded",
    mh: "flowto",
    nh: "grabbed",
    rh: "haspopup",
    HIDDEN: "hidden",
    vh: "invalid",
    xh: "label",
    yh: "labelledby",
    Bh: "level",
    Gh: "live",
    Rh: "multiline",
    Sh: "multiselectable",
    Wh: "orientation",
    Xh: "owns",
    Yh: "posinset",
    $h: "pressed",
    gi: "readonly",
    ki: "relevant",
    li: "required",
    ui: "selected",
    xi: "setsize",
    zi: "sort",
    Oi: "valuemax",
    Pi: "valuemin",
    Qi: "valuenow",
    Ri: "valuetext"
};
var Zi = {
    Lg: "alert",
    Mg: "alertdialog",
    Og: "application",
    Pg: "article",
    Sg: "banner",
    Vg: "button",
    Wg: "checkbox",
    Yg: "columnheader",
    Zg: "combobox",
    $g: "complementary",
    ah: "contentinfo",
    dh: "definition",
    fh: "dialog",
    gh: "directory",
    ih: "document",
    FORM: "form",
    oh: "grid",
    ph: "gridcell",
    qh: "group",
    sh: "heading",
    uh: "img",
    Ch: "link",
    Dh: "list",
    Eh: "listbox",
    Fh: "listitem",
    Hh: "log",
    Ih: "main",
    Jh: "marquee",
    Kh: "math",
    Lh: "menu",
    Mh: "menubar",
    Nh: "menuitem",
    Oh: "menuitemcheckbox",
    Ph: "menuitemradio",
    Th: "navigation",
    Uh: "note",
    Vh: "option",
    Zh: "presentation",
    ai: "progressbar",
    di: "radio",
    ei: "radiogroup",
    ii: "region",
    ni: "row",
    oi: "rowgroup",
    pi: "rowheader",
    ri: "scrollbar",
    ti: "search",
    wi: "separator",
    yi: "slider",
    Ai: "spinbutton",
    Bi: "status",
    Di: "tab",
    Ei: "tablist",
    Fi: "tabpanel",
    Gi: "textbox",
    Hi: "textinfo",
    Ii: "timer",
    Ji: "toolbar",
    Ki: "tooltip",
    Li: "tree",
    Mi: "treegrid",
    Ni: "treeitem"
};
var $i = "combobox grid group listbox menu menubar radiogroup row rowgroup tablist textbox toolbar tree treegrid".split(" "),
    aj = function(a, b) {
        b ? (x(Kb(Zi, b), "No such ARIA role " + b), a.setAttribute("role", b)) : a.removeAttribute("role")
    },
    cj = function(a, b, c) {
        r(c) && (c = c.join(" "));
        var d = bj(b);
        "" === c || void 0 == c ? (Xi || (Xi = {
            atomic: !1,
            autocomplete: "none",
            dropeffect: "none",
            haspopup: !1,
            live: "off",
            multiline: !1,
            multiselectable: !1,
            orientation: "vertical",
            readonly: !1,
            relevant: "additions text",
            required: !1,
            sort: "none",
            busy: !1,
            disabled: !1,
            hidden: !1,
            invalid: "false"
        }), c = Xi, b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d, c)
    },
    dj = function(a, b) {
        var c = a.getAttribute(bj(b));
        return null == c || void 0 == c ? "" : String(c)
    },
    ej = function(a) {
        var b = dj(a, "activedescendant");
        return P(a).getElementById(b)
    },
    fj = function(a, b) {
        var c = "";
        b && (c = b.id, x(c, "The active element should have an id."));
        cj(a, "activedescendant", c)
    },
    bj = function(a) {
        x(a, "ARIA attribute cannot be empty.");
        x(Kb(Yi, a), "No such ARIA attribute " + a);
        return "aria-" + a
    };
var gj = function() {},
    hj;
fa(gj);
var ij = {
    button: "pressed",
    checkbox: "checked",
    menuitem: "selected",
    menuitemcheckbox: "checked",
    menuitemradio: "checked",
    radio: "checked",
    tab: "selected",
    treeitem: "selected"
};
gj.prototype.ob = function() {};
gj.prototype.wa = function(a) {
    return a.b.b("DIV", jj(this, a).join(" "), a.oa())
};
gj.prototype.xa = function(a) {
    return a
};
var lj = function(a, b, c) {
    if (a = a.j ? a.j() : a) {
        var d = [b];
        B && !F("7") && (d = kj(Ae(a), b), d.push(b));
        (c ? Ce : Ee)(a, d)
    }
};
gj.prototype.Rb = function() {
    return !0
};
gj.prototype.ha = function(a, b) {
    b.id && fh(a, b.id);
    var c = this.xa(b);
    c && c.firstChild ? mj(a, c.firstChild.nextSibling ? Db(c.childNodes) : c.firstChild) : a.Jb = null;
    var d = 0,
        e = this.M(),
        f = this.M(),
        g = !1,
        k = !1,
        l = !1,
        m = Db(Ae(b));
    y(m, function(a) {
        g || a != e ? k || a != f ? d |= this.c(a) : k = !0 : (g = !0, f == e && (k = !0));
        1 == this.c(a) && (mb(c), hg(c) && ig(c) && gg(c, !1))
    }, this);
    a.qb = d;
    g || (m.push(e), f == e && (k = !0));
    k || m.push(f);
    var p = a.Ga;
    p && m.push.apply(m, p);
    if (B && !F("7")) {
        var w = kj(m);
        0 < w.length && (m.push.apply(m, w), l = !0)
    }
    if (!g || !k || p || l) b.className =
        m.join(" ");
    return b
};
gj.prototype.je = function(a) {
    qh(a) && this.jd(a.j(), !0);
    a.isEnabled() && this.Sb(a, a.V())
};
var nj = function(a, b, c) {
        if (a = c || a.ob()) x(b, "The element passed as a first parameter cannot be null."), c = b.getAttribute("role") || null, a != c && aj(b, a)
    },
    pj = function(a, b, c) {
        x(b);
        x(c);
        b.V() || cj(c, "hidden", !b.V());
        b.isEnabled() || a.Na(c, 1, !b.isEnabled());
        oj(b, 8) && a.Na(c, 8, W(b, 8));
        oj(b, 16) && a.Na(c, 16, W(b, 16));
        oj(b, 64) && a.Na(c, 64, W(b, 64))
    };
h = gj.prototype;
h.Fc = function(a, b) {
    Qg(a, !b, !B && !$b)
};
h.jd = function(a, b) {
    lj(a, this.M() + "-rtl", b)
};
h.hd = function(a) {
    var b;
    return oj(a, 32) && (b = a.j()) ? hg(b) && ig(b) : !1
};
h.Sb = function(a, b) {
    var c;
    if (oj(a, 32) && (c = a.j())) {
        if (!b && W(a, 32)) {
            try {
                c.blur()
            } catch (d) {}
            W(a, 32) && a.Gc(null)
        }(hg(c) && ig(c)) != b && gg(c, b)
    }
};
h.K = function(a, b) {
    U(a, b);
    a && cj(a, "hidden", !b)
};
h.Ib = function(a, b, c) {
    var d = a.j();
    if (d) {
        var e = this.a(b);
        e && lj(a, e, c);
        this.Na(d, b, c)
    }
};
h.Na = function(a, b, c) {
    hj || (hj = {
        1: "disabled",
        8: "selected",
        16: "checked",
        64: "expanded"
    });
    x(a, "The element passed as a first parameter cannot be null.");
    b = hj[b];
    var d = a.getAttribute("role") || null;
    d && (d = ij[d] || b, b = "checked" == b || "selected" == b ? d : b);
    b && cj(a, b, c)
};
h.pb = function(a, b) {
    var c = this.xa(a);
    if (c && (Tf(c), b))
        if (t(b)) T(c, b);
        else {
            var d = function(a) {
                if (a) {
                    var b = P(c);
                    c.appendChild(t(a) ? b.createTextNode(a) : a)
                }
            };
            r(b) ? y(b, d) : !ha(b) || "nodeType" in b ? d(b) : y(Db(b), d)
        }
};
h.M = function() {
    return "goog-control"
};
var jj = function(a, b) {
        var c = a.M(),
            d = [c],
            e = a.M();
        e != c && d.push(e);
        c = b.qb;
        for (e = []; c;) {
            var f = c & -c;
            e.push(a.a(f));
            c &= ~f
        }
        d.push.apply(d, e);
        (c = b.Ga) && d.push.apply(d, c);
        B && !F("7") && d.push.apply(d, kj(d));
        return d
    },
    kj = function(a, b) {
        var c = [];
        b && (a = Bb(a, [b]));
        y([], function(d) {
            !wb(d, ra(zb, a)) || b && !zb(d, b) || c.push(d.join("_"))
        });
        return c
    };
gj.prototype.a = function(a) {
    this.b || qj(this);
    return this.b[a]
};
gj.prototype.c = function(a) {
    if (!this.S) {
        this.b || qj(this);
        var b = this.b,
            c = {},
            d;
        for (d in b) c[b[d]] = d;
        this.S = c
    }
    a = parseInt(this.S[a], 10);
    return isNaN(a) ? 0 : a
};
var qj = function(a) {
    var b = a.M(),
        c = !Sa(b.replace(/\xa0|\s/g, " "), " ");
    x(c, "ControlRenderer has an invalid css class: '" + b + "'");
    a.b = {
        1: b + "-disabled",
        2: b + "-hover",
        4: b + "-active",
        8: b + "-selected",
        16: b + "-checked",
        32: b + "-focused",
        64: b + "-open"
    }
};
var rj = function() {};
v(rj, gj);
fa(rj);
h = rj.prototype;
h.ob = function() {
    return "button"
};
h.Na = function(a, b, c) {
    switch (b) {
        case 8:
        case 16:
            x(a, "The button DOM element cannot be null.");
            cj(a, "pressed", c);
            break;
        default:
        case 64:
        case 1:
            rj.o.Na.call(this, a, b, c)
    }
};
h.wa = function(a) {
    var b = rj.o.wa.call(this, a);
    sj(b, a.A);
    var c = a.W();
    c && this.Ec(b, c);
    oj(a, 16) && this.Na(b, 16, W(a, 16));
    return b
};
h.ha = function(a, b) {
    b = rj.o.ha.call(this, a, b);
    var c = this.W(b);
    a.Ua = c;
    a.A = b.title;
    oj(a, 16) && this.Na(b, 16, W(a, 16));
    return b
};
h.W = q;
h.Ec = q;
var sj = function(a, b) {
        a && (b ? a.title = b : a.removeAttribute("title"))
    },
    uj = function(a, b, c) {
        var d = qh(b),
            e = a.M() + "-collapse-left";
        a = a.M() + "-collapse-right";
        tj(b, d ? a : e, !!(c & 1));
        tj(b, d ? e : a, !!(c & 2))
    };
rj.prototype.M = function() {
    return "goog-button"
};
var xj = function(a, b, c, d, e) {
        if (!(B || ac || E && F("525"))) return !0;
        if (ec && e) return vj(a);
        if (e && !d) return !1;
        ia(b) && (b = wj(b));
        if (!c && (17 == b || 18 == b || ec && 91 == b)) return !1;
        if ((E || ac) && d && c) switch (a) {
            case 220:
            case 219:
            case 221:
            case 192:
            case 186:
            case 189:
            case 187:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
                return !1
        }
        if (B && d && b == a) return !1;
        switch (a) {
            case 13:
                return !0;
            case 27:
                return !(E || ac)
        }
        return vj(a)
    },
    vj = function(a) {
        if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || (E || ac) && 0 == a) return !0;
        switch (a) {
            case 32:
            case 43:
            case 63:
            case 64:
            case 107:
            case 109:
            case 110:
            case 111:
            case 186:
            case 59:
            case 189:
            case 187:
            case 61:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
            case 219:
            case 220:
            case 221:
                return !0;
            default:
                return !1
        }
    },
    wj = function(a) {
        if (cc) a = yj(a);
        else if (ec && E) a: switch (a) {
            case 93:
                a = 91;
                break a
        }
        return a
    },
    yj = function(a) {
        switch (a) {
            case 61:
                return 187;
            case 59:
                return 186;
            case 173:
                return 189;
            case 224:
                return 91;
            case 0:
                return 224;
            default:
                return a
        }
    };
var Aj = function(a, b) {
    K.call(this);
    a && zj(this, a, b)
};
v(Aj, K);
h = Aj.prototype;
h.v = null;
h.Lc = null;
h.vd = null;
h.Mc = null;
h.Fa = -1;
h.sb = -1;
h.Wc = !1;
var Bj = {
        3: 13,
        12: 144,
        63232: 38,
        63233: 40,
        63234: 37,
        63235: 39,
        63236: 112,
        63237: 113,
        63238: 114,
        63239: 115,
        63240: 116,
        63241: 117,
        63242: 118,
        63243: 119,
        63244: 120,
        63245: 121,
        63246: 122,
        63247: 123,
        63248: 44,
        63272: 46,
        63273: 36,
        63275: 35,
        63276: 33,
        63277: 34,
        63289: 144,
        63302: 45
    },
    Cj = {
        Up: 38,
        Down: 40,
        Left: 37,
        Right: 39,
        Enter: 13,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        "U+007F": 46,
        Home: 36,
        End: 35,
        PageUp: 33,
        PageDown: 34,
        Insert: 45
    },
    Dj = B || ac || E && F("525"),
    Ej = ec && cc;
Aj.prototype.a = function(a) {
    if (E || ac)
        if (17 == this.Fa && !a.ctrlKey || 18 == this.Fa && !a.altKey || ec && 91 == this.Fa && !a.metaKey) this.sb = this.Fa = -1; - 1 == this.Fa && (a.ctrlKey && 17 != a.keyCode ? this.Fa = 17 : a.altKey && 18 != a.keyCode ? this.Fa = 18 : a.metaKey && 91 != a.keyCode && (this.Fa = 91));
    Dj && !xj(a.keyCode, this.Fa, a.shiftKey, a.ctrlKey, a.altKey) ? this.handleEvent(a) : (this.sb = wj(a.keyCode), Ej && (this.Wc = a.altKey))
};
Aj.prototype.b = function(a) {
    this.sb = this.Fa = -1;
    this.Wc = a.altKey
};
Aj.prototype.handleEvent = function(a) {
    var b = a.a,
        c, d, e = b.altKey;
    B && "keypress" == a.type ? c = this.sb : (E || ac) && "keypress" == a.type ? c = this.sb : $b && !E ? c = this.sb : (c = b.keyCode || this.sb, d = b.charCode || 0, Ej && (e = this.Wc), ec && 63 == d && 224 == c && (c = 191));
    d = c = wj(c);
    var f = b.keyIdentifier;
    c ? 63232 <= c && c in Bj ? d = Bj[c] : 25 == c && a.shiftKey && (d = 9) : f && f in Cj && (d = Cj[f]);
    this.Fa = d;
    a = new Fj(d, 0, 0, b);
    a.altKey = e;
    this.dispatchEvent(a)
};
Aj.prototype.j = function() {
    return this.v
};
var zj = function(a, b, c) {
        a.Mc && Gj(a);
        a.v = b;
        a.Lc = I(a.v, "keypress", a, c);
        a.vd = I(a.v, "keydown", a.a, c, a);
        a.Mc = I(a.v, "keyup", a.b, c, a)
    },
    Gj = function(a) {
        a.Lc && (ad(a.Lc), ad(a.vd), ad(a.Mc), a.Lc = null, a.vd = null, a.Mc = null);
        a.v = null;
        a.Fa = -1;
        a.sb = -1
    };
Aj.prototype.H = function() {
    Aj.o.H.call(this);
    Gj(this)
};
var Fj = function(a, b, c, d) {
    Cc.call(this, d);
    this.type = "key";
    this.keyCode = a
};
v(Fj, Cc);
var Ij = function(a, b) {
        if (!a) throw Error("Invalid class name " + a);
        if (!ja(b)) throw Error("Invalid decorator function " + b);
        Hj[a] = b
    },
    Jj = {},
    Hj = {};
var X = function(a, b, c) {
    ch.call(this, c);
    if (!b) {
        b = this.constructor;
        for (var d; b;) {
            d = oa(b);
            if (d = Jj[d]) break;
            b = b.o ? b.o.constructor : null
        }
        b = d ? ja(d.I) ? d.I() : new d : null
    }
    this.c = b;
    this.Jb = ba(a) ? a : null
};
v(X, ch);
h = X.prototype;
h.Jb = null;
h.qb = 0;
h.sc = 39;
h.Wa = 255;
h.rc = 0;
h.Hc = !0;
h.Ga = null;
h.od = !0;
h.vc = !1;
h.Ad = null;
var Lj = function(a, b) {
        a.Z && b != a.od && Kj(a, b);
        a.od = b
    },
    tj = function(a, b, c) {
        c ? b && (a.Ga ? zb(a.Ga, b) || a.Ga.push(b) : a.Ga = [b], lj(a, b, !0)) : b && a.Ga && Ab(a.Ga, b) && (0 == a.Ga.length && (a.Ga = null), lj(a, b, !1))
    };
h = X.prototype;
h.Ea = function() {
    var a = this.c.wa(this);
    this.v = a;
    nj(this.c, a, this.hc());
    this.vc || this.c.Fc(a, !1);
    this.V() || this.c.K(a, !1)
};
h.hc = function() {
    return this.Ad
};
h.Fb = function() {
    return this.c.xa(this.j())
};
h.fd = function(a) {
    return this.c.Rb(a)
};
h.ra = function(a) {
    this.v = a = this.c.ha(this, a);
    nj(this.c, a, this.hc());
    this.vc || this.c.Fc(a, !1);
    this.Hc = "none" != a.style.display
};
h.Y = function() {
    X.o.Y.call(this);
    pj(this.c, this, gh(this));
    this.c.je(this);
    if (this.sc & -2 && (this.od && Kj(this, !0), oj(this, 32))) {
        var a = this.j();
        if (a) {
            var b = this.J || (this.J = new Aj);
            zj(b, a);
            ih(this).D(b, "key", this.ya).D(a, "focus", this.uf).D(a, "blur", this.Gc)
        }
    }
};
var Kj = function(a, b) {
    var c = ih(a),
        d = a.j();
    b ? (c.D(d, "mouseover", a.qd).D(d, "mousedown", a.Ja).D(d, "mouseup", a.za).D(d, "mouseout", a.pd), a.kc != q && c.D(d, "contextmenu", a.kc), B && (F(9) || c.D(d, "dblclick", a.le), a.L || (a.L = new Mj(a), yc(a, ra(zc, a.L))))) : (c.b(d, "mouseover", a.qd).b(d, "mousedown", a.Ja).b(d, "mouseup", a.za).b(d, "mouseout", a.pd), a.kc != q && c.b(d, "contextmenu", a.kc), B && (F(9) || c.b(d, "dblclick", a.le), zc(a.L), a.L = null))
};
X.prototype.Ra = function() {
    X.o.Ra.call(this);
    this.J && Gj(this.J);
    this.V() && this.isEnabled() && this.c.Sb(this, !1)
};
X.prototype.H = function() {
    X.o.H.call(this);
    this.J && (this.J.sa(), delete this.J);
    delete this.c;
    this.L = this.Ga = this.Jb = null
};
X.prototype.oa = function() {
    return this.Jb
};
X.prototype.B = function(a) {
    this.c.pb(this.j(), a);
    this.Jb = a
};
var mj = function(a, b) {
    a.Jb = b
};
h = X.prototype;
h.Pb = function() {
    var a = this.oa();
    if (!a) return "";
    a = t(a) ? a : r(a) ? ub(a, lg).join("") : kg(a);
    return Ga(a)
};
h.V = function() {
    return this.Hc
};
h.K = function(a, b) {
    if (b || this.Hc != a && this.dispatchEvent(a ? "show" : "hide")) {
        var c = this.j();
        c && this.c.K(c, a);
        this.isEnabled() && this.c.Sb(this, a);
        this.Hc = a;
        return !0
    }
    return !1
};
h.isEnabled = function() {
    return !W(this, 1)
};
h.ia = function(a) {
    var b = this.F();
    b && "function" == typeof b.isEnabled && !b.isEnabled() || !Nj(this, 1, !a) || (a || (Oj(this, !1), Pj(this, !1)), this.V() && this.c.Sb(this, a), Qj(this, 1, !a, !0))
};
var Pj = function(a, b) {
        Nj(a, 2, b) && Qj(a, 2, b)
    },
    Oj = function(a, b) {
        Nj(a, 4, b) && Qj(a, 4, b)
    };
X.prototype.Fd = function(a) {
    Nj(this, 8, a) && Qj(this, 8, a)
};
X.prototype.va = function(a) {
    Nj(this, 16, a) && Qj(this, 16, a)
};
X.prototype.$ = function(a) {
    Nj(this, 32, a) && Qj(this, 32, a)
};
X.prototype.ma = function(a) {
    Nj(this, 64, a) && Qj(this, 64, a)
};
var W = function(a, b) {
        return !!(a.qb & b)
    },
    Qj = function(a, b, c, d) {
        d || 1 != b ? oj(a, b) && c != W(a, b) && (a.c.Ib(a, b, c), a.qb = c ? a.qb | b : a.qb & ~b) : a.ia(!c)
    },
    oj = function(a, b) {
        return !!(a.sc & b)
    };
X.prototype.ea = function(a, b) {
    if (this.Z && W(this, a) && !b) throw Error("Component already rendered");
    !b && W(this, a) && Qj(this, a, !1);
    this.sc = b ? this.sc | a : this.sc & ~a
};
var Rj = function(a, b) {
        return !!(a.Wa & b) && oj(a, b)
    },
    Nj = function(a, b, c) {
        return oj(a, b) && W(a, b) != c && (!(a.rc & b) || a.dispatchEvent(dh(b, c))) && !a.S
    };
h = X.prototype;
h.qd = function(a) {
    (!a.h || !Zf(this.j(), a.h)) && this.dispatchEvent("enter") && this.isEnabled() && Rj(this, 2) && Pj(this, !0)
};
h.pd = function(a) {
    a.h && Zf(this.j(), a.h) || !this.dispatchEvent("leave") || (Rj(this, 4) && Oj(this, !1), Rj(this, 2) && Pj(this, !1))
};
h.kc = q;
h.Ja = function(a) {
    this.isEnabled() && (Rj(this, 2) && Pj(this, !0), Ec(a) && (Rj(this, 4) && Oj(this, !0), this.c && this.c.hd(this) && this.j().focus()));
    !this.vc && Ec(a) && a.preventDefault()
};
h.za = function(a) {
    this.isEnabled() && (Rj(this, 2) && Pj(this, !0), W(this, 4) && this.tb(a) && Rj(this, 4) && Oj(this, !1))
};
h.le = function(a) {
    this.isEnabled() && this.tb(a)
};
h.tb = function(a) {
    Rj(this, 16) && this.va(!W(this, 16));
    Rj(this, 8) && this.Fd(!0);
    Rj(this, 64) && this.ma(!W(this, 64));
    var b = new H("action", this);
    a && (b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.l = a.l);
    return this.dispatchEvent(b)
};
h.uf = function() {
    Rj(this, 32) && this.$(!0)
};
h.Gc = function() {
    Rj(this, 4) && Oj(this, !1);
    Rj(this, 32) && this.$(!1)
};
h.ya = function(a) {
    return this.V() && this.isEnabled() && this.Tb(a) ? (a.preventDefault(), a.c(), !0) : !1
};
h.Tb = function(a) {
    return 13 == a.keyCode && this.tb(a)
};
if (!ja(X)) throw Error("Invalid component class " + X);
if (!ja(gj)) throw Error("Invalid renderer class " + gj);
var Sj = oa(X);
Jj[Sj] = gj;
Ij("goog-control", function() {
    return new X(null)
});
var Mj = function(a) {
    xc.call(this);
    this.b = a;
    this.a = !1;
    this.c = new Yg(this);
    yc(this, ra(zc, this.c));
    a = gh(this.b);
    this.c.D(a, "mousedown", this.l).D(a, "mouseup", this.h).D(a, "click", this.g)
};
v(Mj, xc);
var Tj = !B || sc(9);
Mj.prototype.l = function() {
    this.a = !1
};
Mj.prototype.h = function() {
    this.a = !0
};
var Uj = function(a, b) {
    if (!Tj) return a.button = 0, a.type = b, a;
    var c = document.createEvent("MouseEvents");
    c.initMouseEvent(b, a.bubbles, a.cancelable, a.view || null, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, a.relatedTarget || null);
    return c
};
Mj.prototype.g = function(a) {
    if (this.a) this.a = !1;
    else {
        var b = a.a,
            c = b.button,
            d = b.type,
            e = Uj(b, "mousedown");
        this.b.Ja(new Cc(e, a.b));
        e = Uj(b, "mouseup");
        this.b.za(new Cc(e, a.b));
        Tj || (b.button = c, b.type = d)
    }
};
Mj.prototype.H = function() {
    this.b = null;
    Mj.o.H.call(this)
};
var Vj = function() {};
v(Vj, rj);
fa(Vj);
h = Vj.prototype;
h.ob = function() {};
h.wa = function(a) {
    Lj(a, !1);
    a.Wa &= -256;
    a.ea(32, !1);
    return a.b.b("BUTTON", {
        "class": jj(this, a).join(" "),
        disabled: !a.isEnabled(),
        title: a.A || "",
        value: a.W() || ""
    }, a.Pb() || "")
};
h.Rb = function(a) {
    return "BUTTON" == a.tagName || "INPUT" == a.tagName && ("button" == a.type || "submit" == a.type || "reset" == a.type)
};
h.ha = function(a, b) {
    Lj(a, !1);
    a.Wa &= -256;
    a.ea(32, !1);
    if (b.disabled) {
        var c = jb(this.a(1));
        N(b, c)
    }
    return Vj.o.ha.call(this, a, b)
};
h.je = function(a) {
    ih(a).D(a.j(), "click", a.tb)
};
h.Fc = q;
h.jd = q;
h.hd = function(a) {
    return a.isEnabled()
};
h.Sb = q;
h.Ib = function(a, b, c) {
    Vj.o.Ib.call(this, a, b, c);
    (a = a.j()) && 1 == b && (a.disabled = c)
};
h.W = function(a) {
    return a.value
};
h.Ec = function(a, b) {
    a && (a.value = b)
};
h.Na = q;
var Wj = function(a, b, c) {
    X.call(this, a, b || Vj.I(), c)
};
v(Wj, X);
h = Wj.prototype;
h.W = function() {
    return this.Ua
};
h.ge = function(a) {
    this.Ua = a;
    this.c.Ec(this.j(), a)
};
h.H = function() {
    Wj.o.H.call(this);
    delete this.Ua;
    delete this.A
};
h.Y = function() {
    Wj.o.Y.call(this);
    if (oj(this, 32)) {
        var a = this.j();
        a && ih(this).D(a, "keyup", this.Tb)
    }
};
h.Tb = function(a) {
    return 13 == a.keyCode && "key" == a.type || 32 == a.keyCode && "keyup" == a.type ? this.tb(a) : 32 == a.keyCode
};
Ij("goog-button", function() {
    return new Wj(null)
});
var Xj = function() {};
v(Xj, rj);
fa(Xj);
h = Xj.prototype;
h.wa = function(a) {
    var b = jj(this, a),
        b = a.b.b("DIV", {
            "class": "goog-inline-block " + b.join(" ")
        }, this.yc(a.oa(), a.b));
    sj(b, a.A);
    return b
};
h.ob = function() {
    return "button"
};
h.xa = function(a) {
    return a && a.firstChild && a.firstChild.firstChild
};
h.yc = function(a, b) {
    return b.b("DIV", "goog-inline-block " + (this.M() + "-outer-box"), b.b("DIV", "goog-inline-block " + (this.M() + "-inner-box"), a))
};
h.Rb = function(a) {
    return "DIV" == a.tagName
};
h.ha = function(a, b) {
    x(b);
    Yj(b, !0);
    Yj(b, !1);
    var c;
    a: {
        c = a.b.$d(b);
        var d = this.M() + "-outer-box";
        if (c && Be(c, d) && (c = a.b.$d(c), d = this.M() + "-inner-box", c && Be(c, d))) {
            c = !0;
            break a
        }
        c = !1
    }
    c || b.appendChild(this.yc(b.childNodes, a.b));
    Ce(b, ["goog-inline-block", this.M()]);
    return Xj.o.ha.call(this, a, b)
};
h.M = function() {
    return "goog-custom-button"
};
var Yj = function(a, b) {
    if (a)
        for (var c = b ? a.firstChild : a.lastChild, d; c && c.parentNode == a;) {
            d = b ? c.nextSibling : c.previousSibling;
            if (3 == c.nodeType) {
                var e = c.nodeValue;
                if ("" == Ha(e)) a.removeChild(c);
                else {
                    c.nodeValue = b ? e.replace(/^[\s\xa0]+/, "") : e.replace(/[\s\xa0]+$/, "");
                    break
                }
            } else break;
            c = d
        }
};
var Zj = function(a, b, c) {
    Wj.call(this, a, b || Xj.I(), c);
    this.ea(16, !0)
};
v(Zj, Wj);
Ij("goog-toggle-button", function() {
    return new Zj(null)
});
var ak = function(a, b, c) {
    xc.call(this);
    this.a = a;
    this.h = b || 0;
    this.c = c;
    this.g = u(this.b, this)
};
v(ak, xc);
ak.prototype.U = 0;
ak.prototype.H = function() {
    ak.o.H.call(this);
    bk(this);
    delete this.a;
    delete this.c
};
var ck = function(a, b) {
        bk(a);
        a.U = Ud(a.g, ba(b) ? b : a.h)
    },
    bk = function(a) {
        0 != a.U && n.clearTimeout(a.U);
        a.U = 0
    };
ak.prototype.b = function() {
    this.U = 0;
    this.a && this.a.call(this.c)
};
var fk = function(a) {
        return Va(Ha(a.replace(dk, function(a, c) {
            return ek.test(c) ? "" : " "
        }).replace(/[\t\n ]+/g, " ")))
    },
    ek = /^(?:abbr|acronym|address|b|em|i|small|strong|su[bp]|u)$/i,
    dk = /<[!\/]?([a-z0-9]+)([\/ ][^>]*)?>/gi;
var hk = function(a, b, c, d, e, f, g, k, l) {
        x(c);
        var m, p;
        if (m = c.offsetParent) {
            var w = "HTML" == m.tagName || "BODY" == m.tagName;
            w && "static" == zg(m, "position") || (p = Eg(m), w || (w = (w = Og(m)) && cc ? -m.scrollLeft : !w || bc && F("8") || "visible" == zg(m, "overflowX") ? m.scrollLeft : m.scrollWidth - m.clientWidth - m.scrollLeft, p = xf(p, new O(w, m.scrollTop))))
        }
        m = p || new O;
        p = Lg(a);
        if (w = Fg(a)) {
            var z = new ug(w.left, w.top, w.right - w.left, w.bottom - w.top),
                w = Math.max(p.left, z.left),
                C = Math.min(p.left + p.width, z.left + z.width);
            if (w <= C) {
                var G = Math.max(p.top,
                        z.top),
                    z = Math.min(p.top + p.height, z.top + z.height);
                G <= z && (p.left = w, p.top = G, p.width = C - w, p.height = z - G)
            }
        }
        w = Ff(a);
        G = Ff(c);
        if (w.a != G.a) {
            C = w.a.body;
            var G = og(G),
                z = new O(0, 0),
                J = Of(P(C));
            if (qb(J, "parent")) {
                var la = C;
                do {
                    var ea = J == G ? Eg(la) : Ig(x(la));
                    z.x += ea.x;
                    z.y += ea.y
                } while (J && J != G && J != J.parent && (la = J.frameElement) && (J = J.parent))
            }
            C = xf(z, Eg(C));
            !B || sc(9) || Nf(w.a) || (C = xf(C, Mf(w.a)));
            p.left += C.x;
            p.top += C.y
        }
        a = gk(a, b);
        b = p.left;
        a & 4 ? b += p.width : a & 2 && (b += p.width / 2);
        b = new O(b, p.top + (a & 1 ? p.height : 0));
        b = xf(b, m);
        e && (b.x +=
            (a & 4 ? -1 : 1) * e.x, b.y += (a & 1 ? -1 : 1) * e.y);
        var D;
        if (g)
            if (l) D = l;
            else if (D = Fg(c)) D.top -= m.y, D.right -= m.x, D.bottom -= m.y, D.left -= m.x;
        e = D;
        l = b.clone();
        D = gk(c, d);
        d = Kg(c);
        a = k ? k.clone() : d.clone();
        k = l;
        l = a;
        k = k.clone();
        l = l.clone();
        a = 0;
        if (f || 0 != D) D & 4 ? k.x -= l.width + (f ? f.right : 0) : D & 2 ? k.x -= l.width / 2 : f && (k.x += f.left), D & 1 ? k.y -= l.height + (f ? f.bottom : 0) : f && (k.y += f.top);
        g && (e ? (f = k, D = l, a = 0, 65 == (g & 65) && (f.x < e.left || f.x >= e.right) && (g &= -2), 132 == (g & 132) && (f.y < e.top || f.y >= e.bottom) && (g &= -5), f.x < e.left && g & 1 && (f.x = e.left, a |= 1), g & 16 &&
            (b = f.x, f.x < e.left && (f.x = e.left, a |= 4), f.x + D.width > e.right && (D.width = Math.min(e.right - f.x, b + D.width - e.left), D.width = Math.max(D.width, 0), a |= 4)), f.x + D.width > e.right && g & 1 && (f.x = Math.max(e.right - D.width, e.left), a |= 1), g & 2 && (a |= (f.x < e.left ? 16 : 0) | (f.x + D.width > e.right ? 32 : 0)), f.y < e.top && g & 4 && (f.y = e.top, a |= 2), g & 32 && (b = f.y, f.y < e.top && (f.y = e.top, a |= 8), f.y + D.height > e.bottom && (D.height = Math.min(e.bottom - f.y, b + D.height - e.top), D.height = Math.max(D.height, 0), a |= 8)), f.y + D.height > e.bottom && g & 4 && (f.y = Math.max(e.bottom -
                D.height, e.top), a |= 2), g & 8 && (a |= (f.y < e.top ? 64 : 0) | (f.y + D.height > e.bottom ? 128 : 0)), g = a) : g = 256, a = g);
        f = new ug(0, 0, 0, 0);
        f.left = k.x;
        f.top = k.y;
        f.width = l.width;
        f.height = l.height;
        g = a;
        g & 496 || (Bg(c, new O(f.left, f.top)), a = new yf(f.width, f.height), d == a || d && a && d.width == a.width && d.height == a.height || (f = a, k = P(c), d = Nf(Ff(k).a), !B || F("10") || d && F("8") ? (c = c.style, cc ? c.MozBoxSizing = "border-box" : E ? c.WebkitBoxSizing = "border-box" : c.boxSizing = "border-box", c.width = Math.max(f.width, 0) + "px", c.height = Math.max(f.height, 0) + "px") :
            (k = c.style, d ? (d = Tg(c, "padding"), c = Xg(c), k.pixelWidth = f.width - c.left - d.left - d.right - c.right, k.pixelHeight = f.height - c.top - d.top - d.bottom - c.bottom) : (k.pixelWidth = f.width, k.pixelHeight = f.height))));
        return g
    },
    gk = function(a, b) {
        return (b & 8 && Og(a) ? b ^ 4 : b) & -9
    };
var ik = function() {};
ik.prototype.c = function() {};
var jk = function(a, b) {
    this.g = a;
    this.m = !!b;
    this.l = {
        0: this.g + "-arrowright",
        1: this.g + "-arrowup",
        2: this.g + "-arrowdown",
        3: this.g + "-arrowleft"
    }
};
v(jk, ik);
h = jk.prototype;
h.ud = !1;
h.Xc = 2;
h.Od = 20;
h.$c = 3;
h.zd = -5;
h.Vc = !1;
var kk = function(a, b, c, d, e) {
    null != b && (a.$c = b);
    null != c && (a.Xc = c);
    ia(d) && (a.Od = Math.max(d, 15));
    ia(e) && (a.zd = e)
};
jk.prototype.c = function(a, b, c) {
    x(this.h, "Must call setElements first.");
    a = this.Xc;
    2 == a && (a = 0);
    lk(this, this.$c, a, 2 == this.Xc ? mk(this.$c) ? this.a.offsetHeight / 2 : this.a.offsetWidth / 2 : this.Od, 0, c)
};
var lk = function(a, b, c, d, e, f) {
        if (a.b) {
            var g = nk(b, c),
                k, l = a.b;
            k = Kg(l);
            k = (mk(b) ? k.height / 2 : k.width / 2) - d;
            var m = gk(l, g),
                p;
            if (p = Fg(l)) l = Lg(l), l = new tg(l.top, l.left + l.width, l.top + l.height, l.left), mk(b) ? l.top < p.top && !(m & 1) ? k -= p.top - l.top : l.bottom > p.bottom && m & 1 && (k -= l.bottom - p.bottom) : l.left < p.left && !(m & 4) ? k -= p.left - l.left : l.right > p.right && m & 4 && (k -= l.right - p.right);
            k = mk(b) ? new O(a.zd, k) : new O(k, a.zd);
            m = mk(b) ? 6 : 9;
            a.Vc && 2 == e && (m = mk(b) ? 4 : 1);
            p = b ^ 3;
            mk(b) && "rtl" == a.b.dir && (p = b);
            g = hk(a.b, nk(p, c), a.a, g, k, f, a.ud ? m :
                0, void 0, null);
            if (2 != e && g & 496) {
                lk(a, b ^ 3, c, d, a.Vc && 0 == e ? 1 : 2, f);
                return
            }!a.m || g & 496 || (e = parseFloat(a.a.style.left), f = parseFloat(a.a.style.top), x(!isNaN(e) && !isNaN(f), "Could not parse position."), isFinite(e) && 0 == e % 1 && isFinite(f) && 0 == f % 1 || Bg(a.a, Math.round(e), Math.round(f)))
        }
        ok(a, b, c, d)
    },
    ok = function(a, b, c, d) {
        var e = a.h;
        Hb(a.l, function(a) {
            Fe(e, a, !1)
        }, a);
        N(e, a.l[b]);
        e.style.top = e.style.left = e.style.right = e.style.bottom = "";
        a.b ? (c = Hg(a.b, a.a), d = pk(a.b, b), mk(b) ? e.style.top = qk(c.y + d.y, a.a.offsetHeight - 15) + "px" :
            e.style.left = qk(c.x + d.x, a.a.offsetWidth - 15) + "px") : e.style[0 == c ? mk(b) ? "top" : "left" : mk(b) ? "bottom" : "right"] = d + "px"
    },
    qk = function(a, b) {
        return 15 > b ? 15 : Math.min(Math.max(a, 15), b)
    },
    nk = function(a, b) {
        switch (a) {
            case 2:
                return 0 == b ? 1 : 5;
            case 1:
                return 0 == b ? 0 : 4;
            case 0:
                return 0 == b ? 12 : 13;
            default:
                return 0 == b ? 8 : 9
        }
    },
    pk = function(a, b) {
        var c = 0,
            d = 0,
            e = Kg(a);
        switch (b) {
            case 2:
                c = e.width / 2;
                break;
            case 1:
                c = e.width / 2;
                d = e.height;
                break;
            case 0:
                d = e.height / 2;
                break;
            case 3:
                c = e.width, d = e.height / 2
        }
        return new O(c, d)
    },
    mk = function(a) {
        return 0 ==
            a || 3 == a
    };
var rk = function(a) {
    xc.call(this);
    this.b = a || Ff()
};
v(rk, xc);
rk.prototype.h = function() {
    aj(this.j(), "tooltip");
    cj(this.j(), "live", "polite")
};
var tk = function(a) {
    rk.call(this, a);
    this.a = this.b.b("div", sk() + "-contentId");
    this.g = this.b.b("div", sk() + "-arrow", this.b.b("div", sk() + "-arrowimplbefore"), this.b.b("div", sk() + "-arrowimplafter"));
    this.c = this.b.b("div", {
        "class": sk(),
        role: "tooltip"
    }, this.a, this.g);
    this.h()
};
v(tk, rk);
var sk = function() {
    return "jfk-tooltip"
};
tk.prototype.j = function() {
    return this.c
};
tk.prototype.H = function() {
    this.c && S(this.c)
};
var uk = function(a) {
    tk.call(this, a)
};
v(uk, tk);
uk.prototype.h = function() {
    aj(this.j(), "tooltip")
};
var xk = function(a, b) {
        var c;
        c = b instanceof kf ? fk(lf(b)) : b;
        a.removeAttribute("title");
        a.removeAttribute("data-tooltip-contained");
        a.removeAttribute("data-tooltip");
        b ? (b instanceof kf ? a.a = b : (a.setAttribute("data-tooltip", b), a.a = null), a.setAttribute("aria-label", c)) : (a.a = null, a.removeAttribute("aria-label"));
        c = Ff(a) || Ff();
        var d = oa(c.a);
        vk[d] || (vk[d] = new wk(c))
    },
    vk = {},
    wk = function(a) {
        Yg.call(this);
        this.A = a;
        this.O = new ak(this.T, 0, this);
        yc(this, ra(zc, this.O));
        var b = Of();
        this.m = ja(b.MutationObserver) ? new b.MutationObserver(u(this.L,
            this)) : null;
        a = a.a;
        this.D(a, ["mouseout", "mousedown", "click", "blur", Bc, "keydown"], this.J, !0);
        this.D(a, ["mouseover", "focus", Ac], this.R, !0)
    };
v(wk, Yg);
wk.prototype.H = function() {
    yk(this);
    wk.o.H.call(this)
};
var zk = function(a, b) {
    switch (b.type) {
        case "mousedown":
        case "mouseover":
        case "mouseout":
        case "click":
            a.B = !1;
            break;
        case "keydown":
            a.B = !0
    }
};
wk.prototype.R = function(a) {
    this.m && this.m.disconnect();
    zk(this, a);
    var b = a.target;
    a = "focus" == a.type || a.type == Ac;
    var c = this.a && Zf(this.a.a, b);
    if (this.B || !a || c) {
        this.P = a;
        if (a = b && b.getAttribute && this.m) a = b.getAttribute("role") || null, a = zb($i, a);
        a && (this.m.observe(b, {
            attributes: !0
        }), (a = ej(b)) && (b = a));
        this.g = b
    } else this.g = null;
    Ak(this)
};
wk.prototype.J = function(a) {
    zk(this, a);
    var b = a.target;
    a = "mousedown" == a.type || "click" == a.type;
    b = this.a && Zf(this.a.a, b);
    a && b || (this.g = null, Ak(this))
};
wk.prototype.L = function(a) {
    y(a, u(function(a) {
        var c = ej(a.target);
        c && "aria-activedescendant" == a.attributeName && (this.g = c, Ak(this))
    }, this))
};
var Ak = function(a) {
        yk(a);
        ck(a.O, a.c ? 50 : 300)
    },
    yk = function(a) {
        a.w && (n.clearTimeout(a.w), a.w = 0, a.c = null)
    };
wk.prototype.T = function() {
    if (!this.g) Bk(this), this.c = null;
    else if (!(this.c && this.a && Zf(this.a.j(), this.g)) || this.c.getAttribute("data-tooltip-unhoverable")) {
        var a = mg(this.g, function(a) {
                return a.getAttribute && (a.getAttribute("data-tooltip-contained") || a.getAttribute("data-tooltip") || a.a) && !a.getAttribute("data-tooltip-suspended")
            }),
            b = !1;
        this.c && this.c != a && (Bk(this), this.c = null, b = !0);
        if (!this.c && a && (this.c = a, Ck(this, a))) {
            var c = vf;
            if (a.getAttribute("data-tooltip-contained"))
                for (var d = If("jfk-tooltip-data",
                        a), e = 0; e < d.length; e++) {
                    if (d[e].parentNode == a) {
                        c = d[e].cloneNode(!0);
                        break
                    }
                } else c = a.a ? a.a : of(a.getAttribute("data-tooltip"));
            var d = a.getAttribute("data-tooltip-align"),
                e = a.getAttribute("data-tooltip-class"),
                f = a.getAttribute("data-tooltip-offset"),
                f = Fa(Ya(f)) ? -1 : Number(f);
            if (!b && (a = a.getAttribute("data-tooltip-delay"), a = Math.max(0, a - 300))) {
                this.w = Ud(ra(this.C, this.c, c, d, f, e), a, this);
                return
            }
            this.C(this.c, c, d, f, e)
        }
    }
};
var Ck = function(a, b) {
        return b.getAttribute("data-tooltip-only-on-overflow") && b.offsetWidth >= b.scrollWidth && b.offsetHeight >= b.scrollHeight || a.P && "mouse" == b.getAttribute("data-tooltip-trigger") ? !1 : !0
    },
    Dk = function(a) {
        if (a) switch (a.toLowerCase().split(",")[0]) {
            case "l":
                return 0;
            case "t":
                return 2;
            case "r":
                return 3
        }
        return 1
    };
wk.prototype.C = function(a, b, c, d, e) {
    this.w = 0;
    if (!this.a) {
        this.a = new uk(this.A);
        Bk(this);
        this.A.a.body.appendChild(this.a.j());
        yc(this, ra(zc, this.a));
        this.h = new jk(sk(), !0);
        this.h.ud = !0;
        this.h.Vc = !0;
        var f = this.h,
            g = this.a.g;
        f.a = this.a.j();
        f.h = g
    }
    a: {
        if (c) switch (c.toLowerCase().split(",")[1]) {
            case "l":
                f = 0;
                break a;
            case "r":
                f = 1;
                break a
        }
        f = 2
    }
    kk(this.h, Dk(c), f, void 0, d);
    De(this.a.j(), "jfk-tooltip-hide");
    this.G != e && (this.G && !Fa(Ya(this.G)) && De(this.a.j(), this.G), Fa(Ya(e)) || N(this.a.j(), e), this.G = e);
    Bg(this.a.j(),
        0, 0);
    if (b instanceof kf) this.a.a.innerHTML = lf(b);
    else
        for (Tf(this.a.a); c = b.firstChild;) this.a.a.appendChild(c);
    this.h.b = a;
    this.h.c(null, 0)
};
var Bk = function(a) {
    a.a && N(a.a.j(), "jfk-tooltip-hide")
};
var Ek = function(a, b, c, d) {
    Zj.call(this, a, c || rj.I(), d);
    this.C = a;
    this.a = b || null
};
v(Ek, Zj);
Ek.prototype.va = function(a) {
    Ek.o.va.call(this, a);
    null != this.a && this.B(W(this, 16) ? this.a : this.C)
};
var Fk = function(a, b) {
    this.g = a;
    this.h = b || !1
};
v(Fk, rj);
Fk.prototype.wa = function(a) {
    var b = a.b.b("div", jj(this, a).join(" ") + " goog-inline-block"),
        c = a.b.b("span");
    this.g && N(b, this.g);
    c.className = "jfk-button-img";
    b.appendChild(c);
    a.oa() && this.pb(b, a.oa());
    return b
};
Fk.prototype.pb = function(a, b) {
    a && !this.h && (xk(a, b), a.setAttribute("data-tooltip-align", "t,c"))
};
Fk.prototype.M = function() {
    return "goog-toolbar-button"
};
Fk.prototype.ha = function(a, b) {
    var c = a.b.b("span");
    this.g && N(b, this.g);
    c.className = "jfk-button-img";
    Tf(b);
    b.appendChild(c);
    a.oa() && this.pb(b, a.oa());
    return b = Fk.o.ha.call(this, a, b)
};
var Gk = "StopIteration" in n ? n.StopIteration : {
        message: "StopIteration",
        stack: ""
    },
    Hk = function() {};
Hk.prototype.next = function() {
    throw Gk;
};
Hk.prototype.Ab = function() {
    return this
};
var Ik = function(a) {
    if (a instanceof Hk) return a;
    if ("function" == typeof a.Ab) return a.Ab(!1);
    if (ha(a)) {
        var b = 0,
            c = new Hk;
        c.next = function() {
            for (;;) {
                if (b >= a.length) throw Gk;
                if (b in a) return a[b++];
                b++
            }
        };
        return c
    }
    throw Error("Not implemented");
};
var Jk = function(a, b) {
    this.b = {};
    this.a = [];
    this.g = this.c = 0;
    var c = arguments.length;
    if (1 < c) {
        if (c % 2) throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
    } else if (a) {
        a instanceof Jk ? (c = a.Ya(), d = a.Ca()) : (c = Jb(a), d = Ib(a));
        for (var e = 0; e < c.length; e++) this.set(c[e], d[e])
    }
};
Jk.prototype.Ca = function() {
    Kk(this);
    for (var a = [], b = 0; b < this.a.length; b++) a.push(this.b[this.a[b]]);
    return a
};
Jk.prototype.Ya = function() {
    Kk(this);
    return this.a.concat()
};
Jk.prototype.clear = function() {
    this.b = {};
    this.g = this.c = this.a.length = 0
};
var Kk = function(a) {
    if (a.c != a.a.length) {
        for (var b = 0, c = 0; b < a.a.length;) {
            var d = a.a[b];
            Lk(a.b, d) && (a.a[c++] = d);
            b++
        }
        a.a.length = c
    }
    if (a.c != a.a.length) {
        for (var e = {}, c = b = 0; b < a.a.length;) d = a.a[b], Lk(e, d) || (a.a[c++] = d, e[d] = 1), b++;
        a.a.length = c
    }
};
h = Jk.prototype;
h.get = function(a, b) {
    return Lk(this.b, a) ? this.b[a] : b
};
h.set = function(a, b) {
    Lk(this.b, a) || (this.c++, this.a.push(a), this.g++);
    this.b[a] = b
};
h.forEach = function(a, b) {
    for (var c = this.Ya(), d = 0; d < c.length; d++) {
        var e = c[d],
            f = this.get(e);
        a.call(b, f, e, this)
    }
};
h.clone = function() {
    return new Jk(this)
};
h.Ab = function(a) {
    Kk(this);
    var b = 0,
        c = this.g,
        d = this,
        e = new Hk;
    e.next = function() {
        if (c != d.g) throw Error("The map has changed since the iterator was created");
        if (b >= d.a.length) throw Gk;
        var e = d.a[b++];
        return a ? e : d.b[e]
    };
    return e
};
var Lk = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
var Mk = function(a) {
        if (a.Ca && "function" == typeof a.Ca) return a.Ca();
        if (t(a)) return a.split("");
        if (ha(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        return Ib(a)
    },
    Nk = function(a, b, c) {
        if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c);
        else if (ha(a) || t(a)) y(a, b, c);
        else {
            var d;
            if (a.Ya && "function" == typeof a.Ya) d = a.Ya();
            else if (a.Ca && "function" == typeof a.Ca) d = void 0;
            else if (ha(a) || t(a)) {
                d = [];
                for (var e = a.length, f = 0; f < e; f++) d.push(f)
            } else d = Jb(a);
            for (var e = Mk(a), f = e.length, g = 0; g < f; g++) b.call(c,
                e[g], d && d[g], a)
        }
    };
B && F(8);
var Ok = {
        Ui: !0
    },
    Pk = {
        Ti: !0
    },
    Qk = {
        Vi: !0
    },
    Rk = function() {
        throw Error("Do not instantiate directly");
    };
Rk.prototype.Mb = null;
Rk.prototype.oa = function() {
    return this.content
};
Rk.prototype.toString = function() {
    return this.content
};
var Sk = function(a) {
        if (a.Qa === Qk) return nf(a.toString());
        if (a.Qa !== Ok) throw Error("Sanitized content was not of kind TEXT or HTML.");
        var b = Se("Soy SanitizedContent of kind HTML produces SafeHtml-contract-compliant value."),
            c = a.toString();
        a = a.Mb;
        jb(Re(b), "must provide justification");
        x(!Fa(Re(b)), "must provide non-empty justification");
        return mf(c, a || null)
    },
    Tk = function() {
        Rk.call(this)
    };
v(Tk, Rk);
var Xk = function(a) {
        x(a, "Soy template may not be null.");
        var b = Ff();
        a = a(Uk, void 0, void 0);
        var c = Vk(a);
        Wk(c);
        a instanceof Rk ? a = Sk(a) : (rg(), a = mf(c, null));
        b = b.a;
        c = a;
        a = b.createElement("DIV");
        B ? (c = uf(wf, c), a.innerHTML = lf(c), a.removeChild(a.firstChild)) : a.innerHTML = lf(c);
        if (1 == a.childNodes.length) b = a.removeChild(a.firstChild);
        else
            for (b = b.createDocumentFragment(); a.firstChild;) b.appendChild(a.firstChild);
        return b
    },
    Yk = function(a, b, c, d) {
        x(a, "Soy template may not be null.");
        a: if (a = a(b || Uk, void 0, c), d = (d || Ff()).a.createElement("DIV"),
            a = Vk(a), Wk(a), d.innerHTML = a, 1 == d.childNodes.length && (a = d.firstChild, 1 == a.nodeType)) {
            d = a;
            break a
        }
        return d
    },
    Vk = function(a) {
        if (!ka(a)) return String(a);
        if (a instanceof Rk) {
            if (a.Qa === Ok) return jb(a.oa());
            if (a.Qa === Qk) return Ra(a.oa())
        }
        hb("Soy template output is unsafe for use as HTML: " + a);
        return "zSoyz"
    },
    Wk = function(a) {
        var b = a.match(Zk);
        x(!b, "This template starts with a %s, which cannot be a child of a <div>, as required by soy internals. Consider using goog.soy.renderElement instead.\nTemplate output: %s",
            b && b[0], a)
    },
    Zk = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i,
    Uk = {};
var $k = function(a) {
        if (null != a) switch (a.Mb) {
            case 1:
                return 1;
            case -1:
                return -1;
            case 0:
                return 0
        }
        return null
    },
    al = function() {
        Rk.call(this)
    };
v(al, Rk);
al.prototype.Qa = Ok;
var Y = function(a) {
        return null != a && a.Qa === Ok ? (x(a.constructor === al), a) : a instanceof kf ? bl(lf(a), a.Db()) : bl(Ra(String(String(a))), $k(a))
    },
    cl = function() {
        Rk.call(this)
    };
v(cl, Rk);
cl.prototype.Qa = Pk;
cl.prototype.Mb = 1;
var dl = function(a, b) {
    this.content = String(a);
    this.Mb = null != b ? b : null
};
v(dl, Tk);
dl.prototype.Qa = Qk;
var bl = function(a) {
        function b(a) {
            this.content = a
        }
        b.prototype = a.prototype;
        return function(a, d) {
            var e = new b(String(a));
            void 0 !== d && (e.Mb = d);
            return e
        }
    }(al),
    el = function(a, b) {
        return Yk(a, b, void 0, new Ef(void 0))
    };
(function(a) {
    function b(a) {
        this.content = a
    }
    b.prototype = a.prototype;
    return function(a, d) {
        var e = String(a);
        if (!e) return "";
        e = new b(e);
        void 0 !== d && (e.Mb = d);
        return e
    }
})(al);
var jl = function(a) {
        return null != a && a.Qa === Ok ? (x(a.constructor === al), String(String(a.oa()).replace(fl, "").replace(gl, "&lt;")).replace(hl, il)) : Ra(String(a))
    },
    kl = function(a) {
        return null != a && a.Qa === Qk ? (hb("Tainted SanitizedContentKind.TEXT for |noAutoescape: `%s`", [a.oa()]), "zSoyz") : a
    },
    ll = {
        "\x00": "&#0;",
        "\t": "&#9;",
        "\n": "&#10;",
        "\x0B": "&#11;",
        "\f": "&#12;",
        "\r": "&#13;",
        " ": "&#32;",
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "-": "&#45;",
        "/": "&#47;",
        "<": "&lt;",
        "=": "&#61;",
        ">": "&gt;",
        "`": "&#96;",
        "\u0085": "&#133;",
        "\u00a0": "&#160;",
        "\u2028": "&#8232;",
        "\u2029": "&#8233;"
    },
    il = function(a) {
        return ll[a]
    },
    hl = /[\x00\x22\x27\x3c\x3e]/g,
    ml = /^(?!on|src|(?:style|action|archive|background|cite|classid|codebase|data|dsync|href|longdesc|usemap)\s*$)(?:[a-z0-9_$:-]*)$/i,
    fl = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
    gl = /</g;
var nl = function() {
    return '<div class="gt-cc-t"><span class="gt-cc-tc"></span><span class="gt-cc-bc"></span></div><div class="gt-cc"><div class="gt-cc-l"><div class="gt-cc-l-i"></div><div class="gt-cc-exp" style="display:none"><div class="cd-exp-ar"></div></div></div><div class="gt-cc-r"><div class="gt-cc-r-i"></div></div></div>'
};
nl.a = "trans.desktop.templates.cardContainer";
var ol = function() {
    return '<div class="gt-cd-t"><div class="gt-cd-tl"></div><div class="gt-cd-tr"></div></div><div class="gt-cd-c"></div><div class="cd-expand-button"><span class="jfk-button-img"></span><span class="cd-expand-label"></span></div>'
};
ol.a = "trans.desktop.templates.card";
var pl = function() {
    return '<span class="gt-ct-text"></span><span class="gt-ct-translit" style="display:none"></span><div class="gt-ct-tts goog-inline-block"></div>'
};
pl.a = "trans.desktop.templates.lexiconTitle";
var ql = function(a) {
    return '<div class="gt-ex-info"><div class="gt-ex-top"><div class="gt-ex-text" dir="' + Y(a.pg) + '">' + kl(a.rg) + '</div></div><div class="gt-ex-mt" style="display:none"><span class="gt-cd-mt" dir="' + Y(a.Md) + '"></span><br><span class="gt-cd-mt-label">' + Y(a.Eg) + '</span><span class="gt-ex-credit"><a class="gt-ex-link" target="_blank" href="' + Y(a.Sf) + '">' + Y(a.Tf) + "</a></span></div></div>"
};
ql.a = "trans.desktop.templates.exampleSentence";
var rl = function(a) {
    var b = '<div class="gt-def-info"><div class="gt-def-row">' + Y(a.df) + '<div class="gt-mt-md" style="display:none"><span class="gt-cd-mt"></span></div></div>' + (a.Zd ? '<div class="gt-def-example"><q>' + Y(a.Zd) + '</q><div class="gt-mt-ex" style="display:none"><q class="gt-cd-mt" dir="' + Y(a.Md) + '"></q></div></div>' : "");
    if (0 < a.He.length) {
        for (var b = b + ('<div class="gt-def-synonym"><span class="gt-def-synonym-title">' + Y(a.ug) + ': </span><span class="gt-def-synonyms-group"></span><span class="gt-def-synonyms-group"></span>'),
                c = a.He, d = c.length, e = 0; e < d; e++)
            for (var f = c[e], g = f.length, k = 0; k < g; k++) var l = f[k],
                b = b + ((a.$e ? '<span class="gt-cd-cl">' + Y(l) + "</span>" : "<span>" + Y(l) + "</span>") + (k != g - 1 ? ", " : e != d - 1 ? "; " : ""));
        b += "</div>"
    }
    return b + "</div>"
};
rl.a = "trans.desktop.templates.definitionRow";
var sl = function(a) {
    var b;
    a = a || {};
    var c = bl,
        d = '<div role="button"' + (a.id ? ' id="' + jl(a.id) + '"' : "") + ' class="',
        e, f;
    e = a || {};
    var g = "goog-inline-block jfk-button ";
    switch (ka(f = e.style) ? f.toString() : f) {
        case 0:
            g += "jfk-button-standard";
            break;
        case 2:
            g += "jfk-button-action";
            break;
        case 3:
            g += "jfk-button-primary";
            break;
        case 1:
            g += "jfk-button-default";
            break;
        case 4:
            g += "jfk-button-flat";
            break;
        case 5:
            g += "jfk-button-mini";
            break;
        case 6:
            g += "jfk-button-contrast";
            break;
        default:
            g += "jfk-button-standard"
    }
    g += (1 == e.width ? " jfk-button-narrow" :
        "") + (e.checked ? " jfk-button-checked" : "") + (e.We ? " " + e.We : "") + (e.disabled ? " jfk-button-disabled" : "");
    d = d + jl(new dl(g, void 0)) + '"' + (a.disabled ? ' aria-disabled="true"' : ' tabindex="' + (a.vg ? jl(a.vg) : "0") + '"') + (a.title ? " " + (a.Hg ? "data-tooltip" : "title") + '="' + jl(a.title) + '"' : "") + (a.value ? ' value="' + jl(a.value) + '"' : "");
    a.attributes ? (e = a.attributes, null != e && e.Qa === Pk ? (x(e.constructor === cl), e = e.oa().replace(/([^"'\s])$/, "$1 ")) : (e = String(e), ml.test(e) || (hb("Bad value `%s` for |filterHtmlAttributes", [e]), e = "zSoyz")),
        e = " " + e) : e = "";
    return c(d + e + ">" + Y(null == (b = a.content) ? "" : b) + "</div>")
};
sl.a = "jfk.templates.button.strict";
var ul = function(a, b, c, d) {
    Wj.call(this, a, tl.I(), b);
    this.a = c || 0;
    this.C = d || 0;
    this.Lb = !1
};
v(ul, Wj);
ul.prototype.ia = function(a) {
    this.isEnabled() != a && (ul.o.ia.call(this, a), vl(this))
};
ul.prototype.$ = function(a) {
    ul.o.$.call(this, a);
    wl(this, !1)
};
ul.prototype.Ja = function(a) {
    ul.o.Ja.call(this, a);
    this.isEnabled() && wl(this, !0)
};
ul.prototype.za = function(a) {
    ul.o.za.call(this, a);
    this.isEnabled() && wl(this, !0)
};
var wl = function(a, b) {
        a.j() && Fe(a.j(), "jfk-button-clear-outline", b)
    },
    vl = function(a) {
        a.j() && xl(a.c, a)
    },
    tl = function() {
        this.B = this.M() + "-standard";
        this.g = this.M() + "-action";
        this.A = this.M() + "-primary";
        this.m = this.M() + "-default";
        this.w = this.M() + "-flat";
        this.F = this.M() + "-narrow";
        this.G = this.M() + "-mini";
        this.l = this.M() + "-contrast"
    };
v(tl, rj);
fa(tl);
h = tl.prototype;
h.xb = function(a, b, c) {
    a && c.a != a && (c.a = a, vl(c));
    b && c.C != b && (c.C = b, vl(c))
};
h.M = function() {
    return "jfk-button"
};
h.wa = function(a) {
    ob(a, ul, "Button is expected to be instance of jfk.Button");
    var b = a.b,
        c = Yk(sl, {
            disabled: !a.isEnabled(),
            checked: W(a, 16),
            style: a.a,
            title: a.A,
            Hg: a.Lb,
            value: a.W(),
            width: a.C
        }, void 0, b);
    b.be(c, a.oa());
    this.ha(a, c);
    return c
};
h.ha = function(a, b) {
    tl.o.ha.call(this, a, b);
    this.h || (this.h = Qb(this.B, ra(this.xb, 0, null), this.g, ra(this.xb, 2, null), this.A, ra(this.xb, 3, null), this.m, ra(this.xb, 1, null), this.w, ra(this.xb, 4, null), this.G, ra(this.xb, 5, null), this.l, ra(this.xb, 6, null), this.F, ra(this.xb, null, 1)));
    for (var c = Ae(b), d = 0; d < c.length; ++d) {
        var e = this.h[c[d]];
        e && e(a)
    }
    if (c = b.getAttribute("data-tooltip")) a.A = c, a.Lb = !0;
    return b
};
h.W = function(a) {
    return a.getAttribute("value") || ""
};
h.Ec = function(a, b) {
    a && a.setAttribute("value", b)
};
var xl = function(a, b) {
    function c(a, b) {
        (a ? d : e).push(b)
    }
    x(b.j(), "Button element must already exist when updating style.");
    var d = [],
        e = [],
        f = b.a;
    c(0 == f, a.B);
    c(2 == f, a.g);
    c(3 == f, a.A);
    c(4 == f, a.w);
    c(5 == f, a.G);
    c(1 == f, a.m);
    c(6 == f, a.l);
    c(1 == b.C, a.F);
    c(!b.isEnabled(), a.M() + "-disabled");
    Ee(b.j(), e);
    Ce(b.j(), d)
};
var yl = function(a, b, c, d, e) {
    this.reset(a, b, c, d, e)
};
yl.prototype.a = null;
var zl = 0;
yl.prototype.reset = function(a, b, c, d, e) {
    "number" == typeof e || zl++;
    d || sa();
    this.b = b;
    delete this.a
};
var Al = function(a) {
        this.h = a;
        this.b = this.c = this.a = null
    },
    Bl = function(a, b) {
        this.name = a;
        this.value = b
    };
Bl.prototype.toString = function() {
    return this.name
};
var Cl = new Bl("SEVERE", 1E3),
    Dl = new Bl("WARNING", 900),
    El = new Bl("INFO", 800),
    Fl = new Bl("CONFIG", 700),
    Gl = new Bl("FINE", 500),
    Hl = function(a) {
        if (a.c) return a.c;
        if (a.a) return Hl(a.a);
        hb("Root logger has no level set.");
        return null
    };
Al.prototype.log = function(a, b, c) {
    if (a.value >= Hl(this).value)
        for (ja(b) && (b = b()), a = new yl(a, String(b), this.h), c && (a.a = c), c = "log:" + a.b, n.console && (n.console.timeStamp ? n.console.timeStamp(c) : n.console.markTimeline && n.console.markTimeline(c)), n.msWriteProfilerMark && n.msWriteProfilerMark(c), c = this; c;) c = c.a
};
Al.prototype.g = function(a, b) {
    this.log(Dl, a, b)
};
var Il = {},
    Jl = null,
    Kl = function(a) {
        Jl || (Jl = new Al(""), Il[""] = Jl, Jl.c = Fl);
        var b;
        if (!(b = Il[a])) {
            b = new Al(a);
            var c = a.lastIndexOf("."),
                d = a.substr(c + 1),
                c = Kl(a.substr(0, c));
            c.b || (c.b = {});
            c.b[d] = b;
            b.a = c;
            Il[a] = b
        }
        return b
    };
var Ll = function(a, b) {
        a && a.log(Cl, b, void 0)
    },
    Ml = function(a, b) {
        a && a.log(El, b, void 0)
    },
    Nl = function(a, b) {
        a && a.log(Gl, b, void 0)
    };
var Ol = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,
    Pl = function(a, b) {
        if (a)
            for (var c = a.split("&"), d = 0; d < c.length; d++) {
                var e = c[d].indexOf("="),
                    f, g = null;
                0 <= e ? (f = c[d].substring(0, e), g = c[d].substring(e + 1)) : f = c[d];
                b(f, g ? Ja(g) : "")
            }
    };
var Ql = function() {};
Ql.prototype.a = null;
var Sl = function(a) {
    var b;
    (b = a.a) || (b = {}, Rl(a) && (b[0] = !0, b[1] = !0), b = a.a = b);
    return b
};
var Tl, Ul = function() {};
v(Ul, Ql);
var Vl = function(a) {
        return (a = Rl(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    },
    Rl = function(a) {
        if (!a.b && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.b = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.b
    };
Tl = new Ul;
var Wl = function(a) {
    K.call(this);
    this.aa = new Jk;
    this.O = a || null;
    this.c = !1;
    this.B = this.a = null;
    this.l = this.L = this.h = "";
    this.g = this.J = this.w = this.C = !1;
    this.m = 0;
    this.F = null;
    this.R = "";
    this.A = this.T = !1
};
v(Wl, K);
Wl.prototype.b = Kl("goog.net.XhrIo");
var Xl = /^https?$/i,
    Yl = ["POST", "PUT"],
    Zl = [],
    am = function(a, b, c, d) {
        var e = new Wl;
        Zl.push(e);
        b && e.D("complete", b);
        Nc(e.G, "ready", e.$, !0, void 0, void 0);
        $l(e, a, c, d)
    };
Wl.prototype.$ = function() {
    this.sa();
    Ab(Zl, this)
};
var $l = function(a, b, c, d) {
        if (a.a) throw Error("[goog.net.XhrIo] Object is active with another request=" + a.h + "; newUri=" + b);
        c = c ? c.toUpperCase() : "GET";
        a.h = b;
        a.l = "";
        a.L = c;
        a.C = !1;
        a.c = !0;
        a.a = a.O ? Vl(a.O) : Vl(Tl);
        a.B = a.O ? Sl(a.O) : Sl(Tl);
        a.a.onreadystatechange = u(a.P, a);
        try {
            Nl(a.b, bm(a, "Opening Xhr")), a.J = !0, a.a.open(c, String(b), !0), a.J = !1
        } catch (g) {
            Nl(a.b, bm(a, "Error opening Xhr: " + g.message));
            cm(a, g);
            return
        }
        b = d || "";
        d = a.aa.clone();
        var e = yb(d.Ya(), dm),
            f = n.FormData && b instanceof n.FormData;
        !zb(Yl, c) || e || f || d.set("Content-Type",
            "application/x-www-form-urlencoded;charset=utf-8");
        d.forEach(function(a, b) {
            this.a.setRequestHeader(b, a)
        }, a);
        a.R && (a.a.responseType = a.R);
        "withCredentials" in a.a && a.a.withCredentials !== a.T && (a.a.withCredentials = a.T);
        try {
            em(a), 0 < a.m && (a.A = fm(a.a), Nl(a.b, bm(a, "Will abort after " + a.m + "ms if incomplete, xhr2 " + a.A)), a.A ? (a.a.timeout = a.m, a.a.ontimeout = u(a.vb, a)) : a.F = Ud(a.vb, a.m, a)), Nl(a.b, bm(a, "Sending request")), a.w = !0, a.a.send(b), a.w = !1
        } catch (g) {
            Nl(a.b, bm(a, "Send error: " + g.message)), cm(a, g)
        }
    },
    fm = function(a) {
        return B &&
            F(9) && ia(a.timeout) && ba(a.ontimeout)
    },
    dm = function(a) {
        return "content-type" == a.toLowerCase()
    };
Wl.prototype.vb = function() {
    "undefined" != typeof aa && this.a && (this.l = "Timed out after " + this.m + "ms, aborting", Nl(this.b, bm(this, this.l)), this.dispatchEvent("timeout"), this.a && this.c && (Nl(this.b, bm(this, "Aborting")), this.c = !1, this.g = !0, this.a.abort(), this.g = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), gm(this)))
};
var cm = function(a, b) {
        a.c = !1;
        a.a && (a.g = !0, a.a.abort(), a.g = !1);
        a.l = b;
        hm(a);
        gm(a)
    },
    hm = function(a) {
        a.C || (a.C = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    };
Wl.prototype.H = function() {
    this.a && (this.c && (this.c = !1, this.g = !0, this.a.abort(), this.g = !1), gm(this, !0));
    Wl.o.H.call(this)
};
Wl.prototype.P = function() {
    this.S || (this.J || this.w || this.g ? im(this) : this.ba())
};
Wl.prototype.ba = function() {
    im(this)
};
var im = function(a) {
        if (a.c && "undefined" != typeof aa)
            if (a.B[1] && 4 == jm(a) && 2 == km(a)) Nl(a.b, bm(a, "Local request error detected and ignored"));
            else if (a.w && 4 == jm(a)) Ud(a.P, 0, a);
        else if (a.dispatchEvent("readystatechange"), 4 == jm(a)) {
            Nl(a.b, bm(a, "Request complete"));
            a.c = !1;
            try {
                if (lm(a)) a.dispatchEvent("complete"), a.dispatchEvent("success");
                else {
                    var b;
                    try {
                        b = 2 < jm(a) ? a.a.statusText : ""
                    } catch (c) {
                        Nl(a.b, "Can not get status: " + c.message), b = ""
                    }
                    a.l = b + " [" + km(a) + "]";
                    hm(a)
                }
            } finally {
                gm(a)
            }
        }
    },
    gm = function(a, b) {
        if (a.a) {
            em(a);
            var c = a.a,
                d = a.B[0] ? q : null;
            a.a = null;
            a.B = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {
                Ll(a.b, "Problem encountered resetting onreadystatechange: " + e.message)
            }
        }
    },
    em = function(a) {
        a.a && a.A && (a.a.ontimeout = null);
        ia(a.F) && (n.clearTimeout(a.F), a.F = null)
    },
    lm = function(a) {
        var b = km(a),
            c;
        a: switch (b) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
                c = !0;
                break a;
            default:
                c = !1
        }
        if (!c) {
            if (b = 0 === b) a = String(a.h).match(Ol)[1] || null, !a && n.self && n.self.location && (a = n.self.location.protocol,
                a = a.substr(0, a.length - 1)), b = !Xl.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    },
    jm = function(a) {
        return a.a ? a.a.readyState : 0
    },
    km = function(a) {
        try {
            return 2 < jm(a) ? a.a.status : -1
        } catch (b) {
            return -1
        }
    },
    mm = function(a) {
        try {
            return a.a ? a.a.responseText : ""
        } catch (b) {
            return Nl(a.b, "Can not get responseText: " + b.message), ""
        }
    },
    bm = function(a, b) {
        return b + " [" + a.L + " " + a.h + " " + km(a) + "]"
    };
var nm = function(a, b) {
    this.c = this.w = this.b = "";
    this.m = null;
    this.l = this.h = "";
    this.g = !1;
    var c;
    a instanceof nm ? (this.g = ba(b) ? b : a.g, om(this, a.b), this.w = a.w, this.c = a.c, pm(this, a.m), this.h = a.h, qm(this, a.a.clone()), this.l = a.l) : a && (c = String(a).match(Ol)) ? (this.g = !!b, om(this, c[1] || "", !0), this.w = rm(c[2] || ""), this.c = rm(c[3] || "", !0), pm(this, c[4]), this.h = rm(c[5] || "", !0), qm(this, c[6] || "", !0), this.l = rm(c[7] || "")) : (this.g = !!b, this.a = new sm(null, 0, this.g))
};
nm.prototype.toString = function() {
    var a = [],
        b = this.b;
    b && a.push(tm(b, um, !0), ":");
    var c = this.c;
    if (c || "file" == b) a.push("//"), (b = this.w) && a.push(tm(b, um, !0), "@"), a.push(Ia(c).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.m, null != c && a.push(":", String(c));
    if (c = this.h) this.c && "/" != c.charAt(0) && a.push("/"), a.push(tm(c, "/" == c.charAt(0) ? vm : wm, !0));
    (c = this.a.toString()) && a.push("?", c);
    (c = this.l) && a.push("#", tm(c, xm));
    return a.join("")
};
nm.prototype.clone = function() {
    return new nm(this)
};
var om = function(a, b, c) {
        a.b = c ? rm(b, !0) : b;
        a.b && (a.b = a.b.replace(/:$/, ""))
    },
    pm = function(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
            a.m = b
        } else a.m = null
    },
    qm = function(a, b, c) {
        b instanceof sm ? (a.a = b, ym(a.a, a.g)) : (c || (b = tm(b, zm)), a.a = new sm(b, 0, a.g))
    },
    rm = function(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    },
    tm = function(a, b, c) {
        return t(a) ? (a = encodeURI(a).replace(b, Am), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    },
    Am = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    },
    um = /[#\/\?@]/g,
    wm = /[\#\?:]/g,
    vm = /[\#\?]/g,
    zm = /[\#\?@]/g,
    xm = /#/g,
    sm = function(a, b, c) {
        this.b = this.a = null;
        this.c = a || null;
        this.g = !!c
    },
    Cm = function(a) {
        a.a || (a.a = new Jk, a.b = 0, a.c && Pl(a.c, function(b, c) {
            Bm(a, Ja(b), c)
        }))
    },
    Bm = function(a, b, c) {
        Cm(a);
        a.c = null;
        b = Dm(a, b);
        var d = a.a.get(b);
        d || a.a.set(b, d = []);
        d.push(c);
        a.b = ib(a.b) + 1
    },
    Em = function(a, b) {
        Cm(a);
        b = Dm(a, b);
        if (Lk(a.a.b, b)) {
            a.c = null;
            a.b = ib(a.b) - a.a.get(b).length;
            var c = a.a,
                d = b;
            Lk(c.b, d) && (delete c.b[d], c.c--,
                c.g++, c.a.length > 2 * c.c && Kk(c))
        }
    };
sm.prototype.clear = function() {
    this.a = this.c = null;
    this.b = 0
};
var Fm = function(a, b) {
    Cm(a);
    b = Dm(a, b);
    return Lk(a.a.b, b)
};
sm.prototype.Ya = function() {
    Cm(this);
    for (var a = this.a.Ca(), b = this.a.Ya(), c = [], d = 0; d < b.length; d++)
        for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c
};
sm.prototype.Ca = function(a) {
    Cm(this);
    var b = [];
    if (t(a)) Fm(this, a) && (b = Bb(b, this.a.get(Dm(this, a))));
    else {
        a = this.a.Ca();
        for (var c = 0; c < a.length; c++) b = Bb(b, a[c])
    }
    return b
};
sm.prototype.set = function(a, b) {
    Cm(this);
    this.c = null;
    a = Dm(this, a);
    Fm(this, a) && (this.b = ib(this.b) - this.a.get(a).length);
    this.a.set(a, [b]);
    this.b = ib(this.b) + 1;
    return this
};
sm.prototype.get = function(a, b) {
    var c = a ? this.Ca(a) : [];
    return 0 < c.length ? String(c[0]) : b
};
var Gm = function(a, b, c) {
    Em(a, b);
    0 < c.length && (a.c = null, a.a.set(Dm(a, b), Db(c)), a.b = ib(a.b) + c.length)
};
sm.prototype.toString = function() {
    if (this.c) return this.c;
    if (!this.a) return "";
    for (var a = [], b = this.a.Ya(), c = 0; c < b.length; c++)
        for (var d = b[c], e = Ia(d), d = this.Ca(d), f = 0; f < d.length; f++) {
            var g = e;
            "" !== d[f] && (g += "=" + Ia(d[f]));
            a.push(g)
        }
    return this.c = a.join("&")
};
sm.prototype.clone = function() {
    var a = new sm;
    a.c = this.c;
    this.a && (a.a = this.a.clone(), a.b = this.b);
    return a
};
var Dm = function(a, b) {
        var c = String(b);
        a.g && (c = c.toLowerCase());
        return c
    },
    ym = function(a, b) {
        b && !a.g && (Cm(a), a.c = null, a.a.forEach(function(a, b) {
            var e = b.toLowerCase();
            b != e && (Em(this, b), Gm(this, e, a))
        }, a));
        a.g = b
    };
sm.prototype.h = function(a) {
    for (var b = 0; b < arguments.length; b++) Nk(arguments[b], function(a, b) {
        Bm(this, b, a)
    }, this)
};
var Hm = null != window.INPUT_SUGGESTION_TRANSLATED,
    Im = null != window.INPUT_SUGGESTION_TRANSLATION_RENDERED,
    Jm = null != window.KNOWLEDGE_PANEL;
var Km = function(a) {
        return function() {
            return a
        }
    },
    Lm = function(a, b) {
        for (var c = 0; c < b.length - 2; c += 3) {
            var d = b.charAt(c + 2);
                d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
                d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
            a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
        }
        return a
    },
    Mm = null,
    Nm = function(a) {
        var b;
        b = "407122.2815929551"
        var d = Km(String.fromCharCode(116)),
            c = Km(String.fromCharCode(107)),
            d = [d(), d()];
        d[1] = c();
        c = "&" + d.join("") +
            "=";
        d = b.split(".");
        b = Number(d[0]) || 0;
        for (var e = [], f = 0, g = 0; g < a.length; g++) {
            var k = a.charCodeAt(g);
            128 > k ? e[f++] = k : (2048 > k ? e[f++] = k >> 6 | 192 : (55296 == (k & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (k = 65536 + ((k & 1023) << 10) + (a.charCodeAt(++g) & 1023), e[f++] = k >> 18 | 240, e[f++] = k >> 12 & 63 | 128) : e[f++] = k >> 12 | 224, e[f++] = k >> 6 & 63 | 128), e[f++] = k & 63 | 128)
        }
        a = b;
        for (f = 0; f < e.length; f++) a += e[f], a = Lm(a, "+-a^+6");

        a = Lm(a, "+-3^+b+-f");
        a ^= Number(d[1]) || 0;

		console.log(a)
        0 > a && (a = (a & 2147483647) + 2147483648);
        a %= 1E6;
		console.log(a)
        return c + (a.toString() + "." +
            (a ^ b))
    };
var Om = function(a, b) {
        this.c = a;
        this.a = "";
        b && (this.a = b);
        this.b = 0
    },
    Pm = {
        Ng: "at",
        Tg: "bd",
        kh: "ex",
        wh: "kr",
        Ah: "ld",
        Qh: "md",
        bi: "qc",
        ci: "qca",
        ji: "rw",
        mi: "rm",
        Ci: "ss",
        TRANSLATION: "t"
    },
    Qm = function(a) {
        a = a.Ca("q").join("");
		console.log(Nm)
        return Nm(a)
    },
    Rm = function(a, b, c, d, e) {
        c = c.toString();
        c += Qm(d);
		console.log(Qm)
        d = d.toString();
        var f = "POST";
        b += "?" + c;
        2E3 > b.length + d.length && (f = "GET", b += "&" + d, d = "");
        ++a.b;
        am(b, function(b) {
            --a.b;
            e(b)
        }, f, d)
    },
    Sm = function(a, b, c, d, e, f) {
        var g = "https://translate.google.com/translate_a/t",
            k = new sm,
            l = new sm;
        k.set("client", a.c);
        k.set("sl", b);
        k.set("tl",
            c);
        k.set("hl", d);
        k.set("v", "1.0");
        k.set("source", "is");
        (b = !r(e) || r(e) && 1 == e.length) ? l.set("q", e): Gm(l, "q", e);
        e = u(a.h, a, b, f);
        Rm(a, g, k, l, e)
    },
    Tm = function(a, b, c, d, e, f, g, k) {
        var l = "https://translate.google.com/translate_a/single",
            m = new sm,
            p = new sm;
        m.set("client", a.c);
        m.set("sl", b);
        m.set("tl", c);
        m.set("hl", d);
        Gm(m, "dt", f);
        k && m.h(k);
        p.set("q", e);
        Rm(a, l, m, p, u(a.g, a, g))
    };
Om.prototype.g = function(a, b) {
    var c = b.target;
    !lm(c) || "[" != mm(c)[0] && "{" != mm(c)[0] ? (Um(c), a(null)) : (c = Vm(c, "handleSingleResult_"), r(c) && (c = new Uh(c)), a(c))
};
Om.prototype.h = function(a, b, c) {
    c = c.target;
    if (lm(c)) {
        c = Vm(c, "handleTextResult_");
        var d = [];
        if (a) d.push(r(c) ? c[0] : c);
        else if (r(c))
            for (a = 0; a < c.length; ++a) d.push(r(c[a]) ? c[a][0] : c[a]);
        b(d)
    } else Um(c), b(null)
};
var Vm = function(a, b) {
        return ae(mm(a), {
            "class": "trans.common.TranslationAPI",
            func: b,
            url: String(a.h)
        })
    },
    Um = function(a) {
        var b = L.I(),
            c = String(a.h);
        a = mm(a);
        b.log("invalidResponse", {
            q: c.substring(0, 500),
            ql: c.length,
            r: a.substring(0, 500),
            rl: a.length
        })
    };
Om.prototype.l = function() {
    return this.b
};
var Wm = function(a, b) {
    ch.call(this);
    this.T = b;
    this.A = a;
    this.Zc = this.text = this.l = this.c = "";
    this.data = null;
    this.ld = L.I()
};
v(Wm, ch);
h = Wm.prototype;
h.update = function(a, b, c, d) {
    this.text = a;
    this.c = b;
    this.l = c;
    this.data = d;
    this.K(!1);
    return !1
};
h.K = function(a) {
    var b = this.j();
    b && U(b, a)
};
h.V = function() {
    var a = this.j();
    return a ? "none" != a.style.display : !1
};
h.ae = function() {
    return {}
};
h.Ba = function() {
    return this.T
};
h.log = function(a, b) {
    var c = {};
    c.dt = this.T;
    c.sl = this.c;
    c.tl = this.l;
    c.hl = this.A;
    c.q = this.text;
    c.e = a;
    null != b && Pb(c, b);
    Pb(c, this.ae());
    this.ld.log("lexicon", c);
    var c = this.c,
        d = this.l;
    window.__gaTracker && (__gaTracker("set", "dimension1", this.A), __gaTracker("set", "dimension2", c + "|" + d), __gaTracker("set", "dimension3", c), __gaTracker("set", "dimension4", d));
    ze("lexicon", this.T + ":" + a)
};
var Xm = function(a, b, c, d) {
    Wm.call(this, a, b);
    this.wb = this.m = null;
    this.R = c;
    this.Me = d;
    this.P = this.B = null;
    this.J = !1;
    this.$ = "More";
    this.fc = !1;
    this.na = "Less";
    this.pa = [];
    this.Se = !1
};
v(Xm, Wm);
h = Xm.prototype;
h.Ea = function() {
    Xm.o.Ea.call(this);
    this.ra(document.createElement("DIV"))
};
h.ra = function(a) {
    Xm.o.ra.call(this, a);
    N(this.j(), "gt-cd");
    N(this.j(), "gt-cd-" + this.T);
    this.j().appendChild(Xk(ol));
    this.wb = Q("gt-cd-tl", this.j());
    this.m = Q("gt-cd-c", this.j());
    this.B = Q("cd-expand-button", this.j());
    this.P = Q("cd-expand-label", this.j());
    U(this.B, !1)
};
h.update = function(a, b, c, d) {
    Xm.o.update.call(this, a, b, c, d);
    this.J = this.fc = !1;
    S(null);
    U(this.B, !1);
    De(this.B, "collapse");
    Ym(this, a);
    return !1
};
h.Y = function() {
    Xm.o.Y.call(this);
    ih(this).D(this.B, "click", this.xg, !1);
    ih(this).D(this, "a", u(this.te, this, "clks"), !1);
    ih(this).D(this, "b", u(this.te, this, "clkt"), !1)
};
h.xg = function() {
    this.J = !this.J;
    this.ba(this.J);
    this.J ? (N(this.B, "collapse"), T(this.P, this.na), this.log("expand")) : (De(this.B, "collapse"), T(this.P, this.$), this.log("collapse"))
};
h.te = function(a, b) {
    var c = kg(b.target);
    this.log(a, {
        clk: c
    })
};
var Ym = function(a, b) {
        var c = R("DIV"),
            d = a.R.indexOf("%1$s");
        if (-1 != d) {
            var e = a.R.slice(0, d),
                d = a.R.slice(d + 4, a.R.length);
            e && Sf(c, e);
            e = R("SPAN", {
                "class": "gt-card-ttl-txt"
            });
            wg(e, "direction", Oe(a.c) ? "rtl" : "ltr");
            T(e, b);
            c.appendChild(e);
            d && Sf(c, d);
            a.wb && (Tf(a.wb), a.wb.appendChild(c))
        } else a.wb && T(a.wb, a.Me)
    },
    Zm = function(a, b, c) {
        a.fc = !0;
        U(a.B, !0);
        null != b && (a.$ = b);
        null != c && (a.na = c);
        T(a.P, a.$)
    };
Xm.prototype.ba = function(a) {
    for (var b, c, d = If("gt-card-expand-wrapper", this.j()), e = 0; e < d.length; e++) {
        b = d[e];
        c = b.firstChild;
        var f = Tg(c, "margin");
        c = Kg(c).height + f.top + f.bottom;
        wg(b, "max-height", a ? c + "px" : 0)
    }
};
var $m = function(a, b) {
    return b ? a : R("DIV", {
        "class": "gt-card-expand-wrapper"
    }, a)
};
var an = function(a, b, c, d, e) {
    var f = "bd";
    null != d && d && (f = "m" + f);
    Xm.call(this, a, f, MSG_TRANSLATIONS_OF, "");
    this.Aa = "";
    this.Aa = d ? "gt-baf-cell gt-baf-word" : c ? "gt-baf-word-clickable" : "gt-baf-word";
    this.ua = c && !d ? "gt-baf-back" : null;
    this.C = null;
    this.aa = !1;
    this.lc = c;
    this.a = null != d ? d : !1;
    this.Oa = null != e ? e : !0;
    this.L = {};
    this.L[1] = b[2];
    this.L[2] = b[1];
    this.L[3] = b[0];
    this.Ua = b[3].replace("%1$s", "%d")
};
v(an, Xm);
an.prototype.update = function(a, b, c, d) {
    an.o.update.call(this, a, b, c, d);
    if (!d || 0 == V(d.X, 1)) return !1;
    Tf(this.m);
    this.C = new Ti(d);
    bn(this, this.C);
    if (this.a) a = R("DIV");
    else {
        a = R("TBODY");
        var e = R("TABLE", {
            "class": "gt-baf-table"
        }, a)
    }
    b = this.C.a;
    for (c = 0; c < b.length; c++) {
        var f = b[c],
            g;
        var k = f;
        g = k.visible();
        var l = k.c,
            m = k.g,
            k = R("DIV", {
                "class": "gt-baf-cell gt-baf-pos-head"
            });
        l && (this.Zc = l, Ym(this, l));
        "" !== m && (l = R("SPAN", {
            "class": "gt-cd-pos"
        }, m), k.appendChild(l));
        g = $m(k, g);
        this.a ? g = R("DIV", null, g) : (g = R("TD", {
                colspan: 4
            },
            g), g = R("TR", null, g));
        a.appendChild(g);
        if (this.a) {
            var p = R("DIV", "gt-baf-pos-section");
            c != b.length - 1 && null != b[c + 1] && b[c + 1].visible() && wg(p, "margin-bottom", "32px");
            a.appendChild(p)
        }
        f = f.a;
        for (l = g = 0; l < f.length; l++) {
            k = f[l];
            if (!this.a && this.C.b && 0 < l) {
                var m = a,
                    w;
                w = k.visible();
                var z = R("DIV", {
                    "class": "gt-baf-cell gt-baf-sep"
                });
                w = $m(z, w);
                this.a || (w = R("TD", {
                    colspan: 4
                }, w), w = R("TR", null, w));
                m.appendChild(w)
            }
            k = k.a;
            for (m = 0; m < k.length; m++) {
                z = k[m];
                w = fi(Mi(d, 0));
                var C = z,
                    G = g,
                    z = C.text,
                    J = C.c,
                    la, ea = C.g;
                la = [];
                for (var D = 0; D <
                    ea.length; D++) {
                    var va = R("SPAN", null, ea[D]);
                    null != this.ua && N(va, this.ua);
                    la.push(va);
                    D < ea.length - 1 && la.push(document.createTextNode(", "))
                }
                ea = C.visible;
                D = C.b;
                if (this.aa && this.Oa) {
                    var Ea = D,
                        D = ea,
                        va = R("DIV", {
                            "class": "gt-baf-cell gt-baf-marker-container",
                            title: this.L[Ea]
                        }),
                        Ea = qg("width: %dpx", 8 * Ea),
                        Ea = R("DIV", {
                            "class": "gt-baf-cts",
                            style: Ea
                        });
                    va.appendChild(Ea);
                    D = $m(va, D)
                } else D = R("DIV", {
                    "class": "gt-baf-cell"
                }), D = $m(D, ea);
                D = R("TD", null, D);
                va = null;
                J && (va = this.a ? !0 : ea, Ea = R(this.a ? "SPAN" : "DIV", {
                        "class": "gt-baf-cell gt-baf-previous-word"
                    }),
                    this.a && N(Ea, "gt-baf-previous-word-mobile"), T(Ea, J), va = $m(Ea, va), va = this.a ? va : R("TD", null, va));
                Ea = this.a ? !0 : ea;
                if (Oe(this.l) != Oe(this.A)) var Cb = qg("direction: %s", Oe(this.l) ? "rtl" : "ltr");
                var gb = R("SPAN", this.Aa, z),
                    Mc = R("DIV", "gt-baf-cell", gb),
                    gb = $m(this.a ? gb : Mc, Ea);
                Ea || N(gb, "gt-card-widen-wrapper");
                J = this.a ? gb : R("TD", J ? null : {
                    colspan: 2,
                    style: Cb
                }, gb);
                if (Oe(this.c) != Oe(this.A)) var Wg = qg("direction: %s", Oe(this.c) ? "rtl" : "ltr");
                la = R("DIV", {
                    "class": "gt-baf-cell gt-baf-translations",
                    style: Wg
                }, la);
                this.a &&
                    N(la, "gt-baf-translations-mobile");
                ea = $m(la, ea);
                ea = this.a ? ea : R("TD", {
                    style: "width: 100%"
                }, ea);
                if (this.a) {
                    G = R("SPAN", "", va, J);
                    if (Oe(this.l) != Oe(this.A)) var ld = qg("direction: %s", Oe(this.l) ? "rtl" : "ltr");
                    J = R("DIV", {
                        "class": "gt-baf-cell",
                        style: ld
                    }, G);
                    wg(J, "margin-top", "17px");
                    C = $m(J, C.visible);
                    J = this.lc && this.a ? R("DIV", "gt-baf-entry-clickable") : R("DIV", "gt-baf-entry");
                    J.appendChild(C);
                    J.appendChild(ea);
                    wg(G, "padding-right", "4px");
                    z == w && N(G, "gt-baf-word-selected");
                    w = J
                } else w = R("TR", null, D, va, J, ea), Oe(this.c) !=
                    Oe(this.A) && 1 == G % 2 && N(w, "gt-baf-translations-alt");
                this.a ? p.appendChild(w) : a.appendChild(w);
                g++
            }
        }
        this.a ? this.m.appendChild(a) : this.m.appendChild(e);
        0 < Ui(this.C) && (f = qg(this.Ua, Ui(this.C)), Zm(this, f, MSG_FEWER_TRANSLATIONS_LABEL))
    }
    this.K(!0);
    return !0
};
an.prototype.Y = function() {
    an.o.Y.call(this);
    N(this.j(), "gt-cd-baf");
    ih(this).D(this.j(), "click", this.oc);
    ih(this).D(this.j(), "mouseover", this.Cb);
    ih(this).D(this.j(), "mouseout", this.Lb)
};
var bn = function(a, b) {
    var c = Vi(b),
        c = c.sort(function(a, b) {
            return b.a - a.a
        }),
        d = 0;
    a.aa = !1;
    for (var e = 0; e < c.length; e++) {
        var f = c[e]; - 1 < f.a && (a.aa = !0);
        f.b = .05 <= f.a ? 3 : .0025 <= f.a ? 2 : 1;
        f.visible = 12 > e || 3 == f.b;
        d += f.visible ? 0 : 1
    }
    if (4 >= d)
        for (e = 0; e < c.length; e++) c[e].visible = !0;
    b.b && Wi(b)
};
an.prototype.ba = function(a) {
    an.o.ba.call(this, a);
    for (var b = If("gt-card-widen-wrapper", this.j()), c = 0; c < b.length; c++) {
        var d = b[c],
            e = Q("gt-baf-cell", d),
            f = Tg(e, "margin"),
            e = e.scrollWidth + f.left + f.right + 1;
        wg(d, "max-width", a ? e + "px" : 0)
    }
};
an.prototype.oc = function(a) {
    var b;
    b = ng(a.target);
    null != b ? (a = Q("gt-baf-word", b), null != a && this.dispatchEvent(new H("b", a))) : Be(a.target, "gt-baf-word-clickable") ? this.dispatchEvent(new H("b", a.target)) : Be(a.target, "gt-baf-back") && this.dispatchEvent(new H("a", a.target))
};
an.prototype.Cb = function(a) {
    if (Be(a.target, "gt-baf-back")) {
        var b = Hf(document, null, "gt-baf-back", this.j());
        a = kg(a.target);
        for (var c = 0; c < b.length; c++) kg(b[c]) == a && N(b[c], "gt-baf-hl")
    }
};
an.prototype.Lb = function() {
    for (var a = Hf(document, null, "gt-baf-hl", this.j()), b = 0; b < a.length; b++) De(a[b], "gt-baf-hl")
};
var cn = function(a, b, c, d) {
        this.text = a;
        this.a = b;
        this.b = c;
        this.data = d
    },
    dn = function(a, b, c, d) {
        this.g = a;
        this.c = b;
        this.l = c;
        this.h = d;
        this.b = [];
        this.a = -1;
        I(this.g, "action", this.dg, !1, this);
        I(this.c, "action", this.Wf, !1, this);
        I(this.l, "action", this.Ze, !1, this)
    };
h = dn.prototype;
h.push = function(a, b, c, d) {
    this.b.splice(++this.a);
    this.b.push(new cn(a, b, c, d));
    en(this)
};
h.reset = function() {
    this.b = [];
    this.a = -1
};
h.dg = function() {
    0 < this.a && (--this.a, en(this));
    L.I().log("lxprev")
};
h.Wf = function() {
    this.a < this.b.length - 1 && (++this.a, en(this));
    L.I().log("lxnext")
};
h.Ze = function() {
    1 < this.b.length && (this.b.splice(1), this.a = 0, en(this));
    L.I().log("lxclear")
};
var en = function(a) {
    var b = a.b[a.a];
    a.h.update(b.text, b.a, b.b, b.data);
    a.g.ia(1 < a.a);
    a.c.ia(a.a < a.b.length - 1)
};
var fn = !1,
    gn = function(a) {
        if (a = a.match(/[\d]+/g)) a.length = 3
    };
(function() {
    if (navigator.plugins && navigator.plugins.length) {
        var a = navigator.plugins["Shockwave Flash"];
        if (a && (fn = !0, a.description)) {
            gn(a.description);
            return
        }
        if (navigator.plugins["Shockwave Flash 2.0"]) {
            fn = !0;
            return
        }
    }
    if (navigator.mimeTypes && navigator.mimeTypes.length && (a = navigator.mimeTypes["application/x-shockwave-flash"], fn = !!a && a.enabledPlugin)) {
        gn(a.enabledPlugin.description);
        return
    }
    try {
        var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
        fn = !0;
        gn(b.GetVariable("$version"));
        return
    } catch (c) {}
    try {
        b =
            new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
        fn = !0;
        return
    } catch (c) {}
    try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), fn = !0, gn(b.GetVariable("$version"))
    } catch (c) {}
})();
var hn = fn;
var jn = function() {
    this.b = 0;
    this.a = []
};
fa(jn);
jn.prototype.c = function(a) {
    var b = new Image,
        c = this.b++;
    this.a[c] = b;
    b.onload = b.onerror = function() {
        delete jn.I().a[c]
    };
    b.src = a;
    b = null
};
var kn = function() {
    K.call(this);
    this.url = ""
};
v(kn, K);
kn.prototype.bc = function() {
    this.dispatchEvent(new ln(this.url))
};
kn.prototype.play = function(a) {
    this.url = a
};
kn.prototype.c = function() {
    this.dispatchEvent(new mn(this.url))
};
var nn = function(a) {
    H.call(this, "sound_play_start");
    this.url = a
};
v(nn, H);
var on = function(a) {
    H.call(this, "sound_finished");
    this.url = a
};
v(on, H);
var ln = function(a) {
    H.call(this, "sound_interrupted");
    this.url = a
};
v(ln, H);
var mn = function(a) {
    H.call(this, "sound_error");
    this.url = a
};
v(mn, H);
var pn = function() {
    kn.call(this);
    this.l = Audio;
    this.a = new this.l;
    this.b = {}
};
v(pn, kn);
pn.prototype.Ld = function() {
    return !this.a.paused
};
pn.prototype.bc = function() {
    pn.o.bc.call(this);
    this.a.pause()
};
pn.prototype.play = function(a) {
    pn.o.play.call(this, a);
    qn(this, this.a);
    this.a = null;
    null != this.b[a] ? (this.a = this.b[a], this.b[a] = null, this.a.play()) : (this.a = rn(this, a), this.a.autoplay = !0)
};
pn.prototype.Pe = function(a) {
    n.setTimeout(u(this.m, this, a), 1E3)
};
var rn = function(a, b) {
        var c = new a.l;
        c.setAttribute("src", b);
        I(c, "play", a.h, !1, a);
        I(c, "ended", a.g, !1, a);
        I(c, "error", a.c, !1, a);
        c.load();
        return c
    },
    qn = function(a, b) {
        $c(b, "play", a.h);
        $c(b, "ended", a.g)
    };
pn.prototype.m = function(a) {
    null != this.b[a] && (qn(this, this.b[a]), this.b[a] = null);
    this.b[a] = rn(this, a)
};
pn.prototype.h = function() {
    $c(this.a, "play", this.h);
    this.dispatchEvent(new nn(this.url))
};
pn.prototype.g = function() {
    $c(this.a, "ended", this.g);
    this.dispatchEvent(new on(this.url))
};
var sn = function(a) {
    kn.call(this);
    this.a = a;
    this.b = !1
};
v(sn, kn);
h = sn.prototype;
h.Ld = function() {
    return this.b
};
h.bc = function() {
    this.b = !1;
    null != this.a.h && this.a.h();
    tn();
    sn.o.bc.call(this)
};
h.play = function(a) {
    sn.o.play.call(this, a);
    n.setTimeout(u(this.ig, this), 0)
};
h.ig = function() {
    this.b = !0;
    var a = u(this.yg, this);
    n.SoundStopCB_ = a;
    null != this.a.c && this.a.c("SoundStopCB_");
    try {
        if (null != this.a.b) this.a.b(this.Oe());
        else {
            this.b = !1;
            tn();
            this.c();
            return
        }
        var b = u(this.Oe, this);
        n._TTSSoundFile = b
    } catch (c) {
        this.b = !1;
        tn();
        this.c();
        return
    }
    null != this.a.g ? this.a.g() : (this.b = !1, tn(), this.c())
};
h.Pe = function(a) {
    var b = jn.I();
    n.setTimeout(u(b.c, b, a), 1E3)
};
h.Oe = function() {
    return this.url.substring(1)
};
h.yg = function() {
    this.b = !1;
    tn();
    this.dispatchEvent(new on(this.url))
};
var tn = function() {
        n.SoundStopCB_ = null
    },
    un = function() {
        this.a = "";
        this.b = null;
        this.g = !1;
        this.c = null
    };
fa(un);
un.prototype.get = function() {
    if (null != this.a && 0 != this.a.length) {
        var a = Gf(document, this.a);
        if (!this.g && (vn("audio/mpeg") ? (this.b = new pn, a = "html5") : null != a && "OBJECT" == a.tagName && hn ? (this.b = new sn(a), a = "flash") : (this.b = null, a = "none"), this.g = !0, !this.h && this.c)) {
            this.h = !0;
            var b = vn("audio/mpeg") ? 1 : 0,
                c = vn("audio/ogg") ? 1 : 0,
                d = vn("audio/wav") ? 1 : 0,
                e;
            a: {
                try {
                    var f = R("audio");
                    if (null != f && null != f.volume) {
                        e = f.volume;
                        break a
                    }
                } catch (g) {}
                e = -1
            }
            this.c.log("ttsaudio", {
                mp3: b,
                ogg: c,
                wav: d,
                vol: e,
                type: a
            })
        }
    }
    return this.b
};
var vn = function(a) {
    try {
        var b = R("audio");
        return null != b && null != b.canPlayType && null != b.load && null != b.play && null != b.paused && null != b.pause && "no" != b.canPlayType(a) && "" != b.canPlayType(a)
    } catch (c) {
        return !1
    }
};
var wn = function(a, b) {
    K.call(this);
    this.A = b;
    this.m = un.I();
    this.m.a = a;
    this.m.c = b;
    this.a = this.m.get();
    this.h = null;
    this.b = 0;
    this.c = {};
    this.g = 0;
    this.l = !1
};
v(wn, K);
wn.prototype.set = function(a, b) {
    this.h = a;
    null != b && (this.c = Nb(b));
    this.c.total = a.length;
    xn(this)
};
var An = function(a) {
        if (a.h && a.a.Ld()) {
            var b = Nb(a.c);
            b.idx = a.b;
            b.time = (new Date).getTime() - a.g;
            yn(a, "ttsstop", b);
            xn(a);
            a.a.bc();
            a.dispatchEvent(new zn)
        }
    },
    xn = function(a) {
        a.b = 0;
        a.l = !1;
        $c(a.a, "sound_play_start", a.O, !1, a);
        $c(a.a, "sound_finished", a.B, !1, a);
        $c(a.a, "sound_interrupted", a.F, !1, a);
        $c(a.a, "sound_error", a.w, !1, a)
    },
    yn = function(a, b, c) {
        a.A && a.A.log(b, c)
    };
wn.prototype.O = function() {
    if (!this.l) {
        this.dispatchEvent(new Bn);
        var a = Nb(this.c);
        a.idx = this.b;
        a.time = (new Date).getTime() - this.g;
        yn(this, "ttsplaystart", a);
        this.l = !0
    }
};
wn.prototype.B = function() {
    this.b += 1;
    if (this.b < this.h.length) this.a.play(this.h[this.b]), Cn(this);
    else {
        this.dispatchEvent(new zn);
        xn(this);
        var a = Nb(this.c);
        a.idx = this.b;
        a.time = (new Date).getTime() - this.g;
        yn(this, "ttsfinish", a)
    }
};
wn.prototype.F = function() {
    var a = Nb(this.c);
    a.idx = this.b;
    a.time = (new Date).getTime() - this.g;
    yn(this, "ttsinterrupted", a);
    this.dispatchEvent(new zn);
    xn(this)
};
wn.prototype.w = function() {
    var a = Nb(this.c);
    a.idx = this.b;
    a.time = (new Date).getTime() - this.g;
    yn(this, "ttserror", a);
    this.dispatchEvent(new zn);
    xn(this)
};
var Cn = function(a) {
        var b = a.h[a.b + 1];
        null != b && a.a.Pe(b)
    },
    Bn = function() {
        H.call(this, "play_start_playlist")
    };
v(Bn, H);
var zn = function() {
    H.call(this, "stop_playlist")
};
v(zn, H);
var Dn = function(a) {
    this.a = a
};
Dn.prototype.h = function(a, b, c) {
    En(a, b, c, u(this.c, this), u(this.g, this))
};
var En = function(a, b, c, d, e) {
    var f = [];
    d(f, b);
    b = "";
    for (d = 0; d < f.length; d++) {
        var g = Ha(b + f[d]);
        g.length <= c ? b += f[d] : (Fa(b) || (a.push(Ha(b)), b = ""), g = Ha(f[d]), g.length <= c ? b = f[d] : e(a, g, c))
    }
    Fa(b) || a.push(Ha(b))
};
Dn.prototype.g = function(a, b, c) {
    for (var d = 0; d < b.length; d += c) a.push(b.substr(d, c))
};
var Fn = RegExp(" ", "g"),
    Gn = RegExp("([?.,;:!][ ]+)|([\u3001\u3002\uff01\uff08\uff09\uff0c\uff0e\uff1a\uff1b\uff1f][ ]?)", "g");
Dn.prototype.c = function(a, b) {
    Hn(a, b, Fn)
};
Dn.prototype.b = function(a, b) {
    Hn(a, b, Gn);
    for (var c = 0; c < a.length; c++) {
        var d = {
            length: a[c].length
        };
        this.a && this.a.log("tbphrase", d)
    }
};
var Hn = function(a, b, c) {
    for (var d = 0; c.test(b);) {
        var e = c.lastIndex;
        e > d && a.push(b.substr(d, e - d));
        d = e
    }
    b.length > d && a.push(b.substr(d))
};
var In = [0, 200],
    Jn = {
        af: 1,
        ar: 1,
        bn: 1,
        bs: 1,
        ca: 1,
        cs: 1,
        cy: 1,
        da: 1,
        de: 1,
        el: 1,
        en: 1,
        eo: 1,
        es: 1,
        fi: 1,
        fr: 1,
        hi: 1,
        hr: 1,
        hu: 1,
        hy: 1,
        id: 1,
        is: 1,
        it: 1,
        ja: 1,
        ko: 1,
        la: 1,
        lv: 1,
        mk: 1,
        nl: 1,
        no: 1,
        pl: 1,
        pt: 1,
        ro: 1,
        ru: 1,
        sk: 1,
        sq: 1,
        sr: 1,
        sv: 1,
        sw: 1,
        ta: 1,
        th: 1,
        tr: 1,
        vi: 1,
        zh: 1,
        "zh-cn": 1,
        "zh-tw": 1
    };
var Kn = function(a, b, c) {
    xc.call(this);
    this.h = a;
    this.P = new Dn(L.I());
    this.R = b;
    this.F = this.C = this.c = this.g = "";
    this.O = 0;
    this.A = !1;
    this.a = new wn("tts", L.I());
    this.J = null != this.a.a;
    this.m = Ie || He;
    I(this.a, "stop_playlist", this.G, !1, this);
    I(this.h, "action", this.L, !1, this);
    this.B = (a = /(sa=[^#&]+)/.exec(window.location.href)) ? a[0] : null;
    this.w = (a = /ttsspeed=([^&]+)/.exec(window.location.href)) ? a[0] : null;
    this.b = 0;
    this.T = !!c;
    this.l = ""
};
v(Kn, xc);
Kn.prototype.H = function() {
    Kn.o.H.call(this);
    $c(this.a, "stop_playlist", this.G, !1, this);
    $c(this.h, "action", this.L, !1, this)
};
Kn.prototype.G = function() {
    this.h.va(!1)
};
var Ln = function(a, b, c, d, e, f) {
    return Za("/translate_tts?ie=UTF-8&q=", Ia(b), "&tl=", c, "&total=", d, "&idx=", e, "&textlen=", b.length, Nm(b), a.R, f)
};
Kn.prototype.update = function(a, b, c) {
    var d = RegExp("([^?.,;:!\"#$%&'()*+\\-/<=>?@[\\]^_`{|}~\u3001\u3002\uff01\uff08\uff09\uff0c\uff0e\uff1a\uff1b\uff1f])");
    this.l = "";
    if (null != c)
        for (var e = 0; e < V(c.X, 5); e++) {
            var f = Oi(c, e),
                g;
            g = (new Ih(th(f.a, 3)[0])).a[0];
            g = null != g ? g : 0;
            var k = (new Ih(th(f.a, 3)[0])).a[1];
            g = ci(f).substring(g, null != k ? k : 0);
            f = (new Hh(th(f.a, 2)[0])).a[0];
            if (g == (null != f ? f : "") && d.test(g)) {
                this.l = Gi(c);
                break
            }
        }
    this.b = 0;
    this.J ? (a != this.g || b != this.c ? (this.g = a, this.c = b, c = !1) : c = !0, c || (An(this.a), this.A = !this.J || !b || Fa(a) || this.m && a.length > In[Jn[b.toLowerCase()]] ? !1 : b.toLowerCase() in Jn), a = this.A, this.h.K(a), a || An(this.a)) : (this.h.K(!1), An(this.a))
};
Kn.prototype.play = function() {
    if (this.g != this.C || this.c != this.F || this.b != this.O) {
        var a;
        if (this.m) a = [this.g];
        else {
            a = In[Jn[this.c.toLowerCase()]];
            var b = [],
                c = this.P,
                d = this.g.replace(/[ \u3000\n\r\t\s]+/g, " ");
            En(b, d, a, u(c.b, c), u(c.h, c));
            a = b
        }
        b = [];
        c = "";
        null != this.B && (c += "&" + this.B);
        null != this.w ? c += "&ttsspeed=" + this.w : 0 != this.b && (c += "&ttsspeed=" + this.b);
        this.l && (c += "&hint=" + this.l);
        for (d = 0; d < a.length; d++) b.push(Ln(this, a[d], this.c, a.length, d, c));
        this.a.set(b, {
            textlen: this.g.length,
            tl: this.c
        });
        this.C = this.g;
        this.F = this.c;
        this.O = this.b
    }
    a = this.a;
    a.a.Ld() && a.a.bc();
    I(a.a, "sound_play_start", a.O, !1, a);
    I(a.a, "sound_finished", a.B, !1, a);
    I(a.a, "sound_interrupted", a.F, !1, a);
    I(a.a, "sound_error", a.w, !1, a);
    a.g = (new Date).getTime();
    yn(a, "ttsstart", a.c);
    a.a.play(a.h[a.b]);
    Cn(a);
    this.T && (this.b = 0 == this.b ? .24 : 0)
};
Kn.prototype.L = function() {
    W(this.h, 16) ? this.play() : An(this.a)
};
var Mn = function(a) {
    Wm.call(this, a, "ttl");
    this.a = this.m = null;
    this.B = new Ek(MSG_LISTEN, void 0, new Fk("trans-listen-button"));
    this.C = new Kn(this.B, "&client=t&prev=lc")
};
v(Mn, Wm);
Mn.prototype.Ea = function() {
    Mn.o.Ea.call(this);
    this.ra(document.createElement("DIV"))
};
Mn.prototype.ra = function(a) {
    Mn.o.ra.call(this, a);
    this.j().appendChild(Xk(pl));
    this.m = Q("gt-ct-text", this.j());
    a = Q("gt-ct-tts", this.j());
    this.a = Q("gt-ct-translit", this.j());
    mh(this.B, a)
};
Mn.prototype.update = function(a, b, c, d) {
    Mn.o.update.call(this, a, b, c, d);
    T(this.m, a);
    this.C.update(a, b);
    if (this.data) {
        a = [];
        if (0 < V(this.data.X, 0))
            for (b = 0; b < V(this.data.X, 0); b++) c = Mi(this.data, b), null != c.kb[3] && "" != gi(c) && a.push(gi(c));
        0 < a.length ? (T(this.a, a.join(" ")), U(this.a, !0)) : U(this.a, !1)
    }
    this.K(!0);
    return !0
};
var Nn = function(a, b, c) {
    Wm.call(this, a, "cm");
    this.aa = new Mn(a);
    this.L = null;
    this.ba = c;
    this.m = new ch;
    this.Va(this.m);
    this.a = new ch;
    this.Va(this.a);
    this.J = this.C = this.P = this.R = this.$ = null;
    this.B = []
};
v(Nn, Wm);
h = Nn.prototype;
h.Ea = function() {
    Nn.o.Ea.call(this);
    this.ra(document.createElement("DIV"))
};
h.ra = function(a) {
    Nn.o.ra.call(this, a);
    this.j().appendChild(Xk(nl));
    mh(this.aa, Q("gt-cc-tc", this.j()));
    this.L = Q("gt-cc-t", this.j());
    U(this.L, !1);
    mh(this.m, Q("gt-cc-l-i", this.j()));
    mh(this.a, Q("gt-cc-r-i", this.j()));
    a = Q("gt-cc-bc", this.j());
    this.$ = new Wj("", new Fk("prev-button"));
    lh(this.$, a);
    this.R = new Wj("", new Fk("next-button"));
    lh(this.R, a);
    this.P = new Wj("", new Fk("big-clear-button"));
    lh(this.P, a);
    this.C = Q("gt-cc-exp", this.j());
    this.J = new dn(this.$, this.R, this.P, this)
};
h.Y = function() {
    Nn.o.Y.call(this);
    ih(this).D(this, "a", this.Nf);
    ih(this).D(this, "b", this.Of);
    ih(this).D(this.C, "click", this.Cf)
};
h.Cf = function() {
    U(this.C, !1);
    y(this.B, function(a) {
        a.K(!0)
    });
    var a = {};
    nh(this.m, function(b) {
        b.V() && (a[b.Ba()] = b.fc ? "e" : "ne")
    });
    this.log("expand", a)
};
h.Nf = function(a) {
    a = kg(a.target);
    On(this, this.c, this.l, a, "clks")
};
h.Of = function(a) {
    a = kg(a.target);
    On(this, this.l, this.c, a, "clkt")
};
var On = function(a, b, c, d, e) {
    if (d != a.text || b != a.c) "zh-TW" == b && (b = "zh-CN"), a.ba.translate(b, c, d, e)
};
Nn.prototype.update = function(a, b, c, d) {
    Nn.o.update.call(this, a, b, c, d);
    U(this.L, 1 != this.J.b.length);
    var e = 0,
        f = 0,
        g = !0;
    this.B = [];
    nh(this.m, function(f) {
        var k = f.update(a, b, c, d);
        e |= k;
        k && (g ? g = !1 : f.Se || (f.K(!1), this.B.push(f)))
    }, this);
    Pn(this, this.m);
    var k = 0 < this.B.length;
    U(this.C, k);
    nh(this.a, function(e) {
        f |= e.update(a, b, c, d)
    }, this);
    var l = e || f;
    this.K(l);
    this.aa.update(a, b, c, d);
    if (l) {
        var m = {};
        nh(this.m, function(a) {
            a.V() && (m[a.Ba()] = a.fc ? "e" : "ne")
        });
        nh(this.a, function(a) {
            a.V() && (m[a.Ba()] = a.fc ? "e" : "ne")
        });
        m[this.Ba()] =
            k ? "e" : "ne";
        this.log("show", m)
    }
    return l
};
var Pn = function(a, b) {
    var c = [];
    nh(b, function(a) {
        if (a.V() || zb(this.B, a)) {
            var b = a.Zc || a.text;
            zb(c, b) ? a.wb && T(a.wb, a.Me) : c.push(b)
        }
    }, a)
};
var Qn = function(a, b, c) {
    var d = "md";
    null != c && c && (d = "m" + d);
    Xm.call(this, a, d, MSG_DEFINITIONS_OF, "");
    this.L = null != b ? b : !0
};
v(Qn, Xm);
Qn.prototype.update = function(a, b, c, d) {
    Qn.o.update.call(this, a, b, c, d);
    if (!d || 0 == V(d.X, 12) && 0 == V(d.X, 15)) return !1;
    Tf(this.m);
    this.a = 0;
    a = V(d.X, 12);
    b = 3 > a;
    for (var e = c = 0; e < V(d.X, 12); e++) c += V(Pi(d, e).a, 1);
    c = 5 > c ? c : 3;
    for (e = this.C = 0; e < a; ++e) {
        var f = Pi(d, e),
            g;
        g = Pi(d, e).a[2];
        g = null != g ? g : "";
        var k = R("DIV", {
            "class": "gt-cd-pos"
        });
        this.m.appendChild(k);
        var l = f.a[0];
        T(k, null != l ? l : "");
        var k = d,
            l = b,
            m = c,
            p = Math.ceil(m / a),
            w = R("DIV", {
                "class": "gt-def-list"
            }),
            z = Oe(this.c) ? "rtl" : "ltr";
        wg(w, {
            direction: z
        });
        for (z = 0; z < V(f.a, 1); ++z) {
            var C,
                G = z;
            C = new Mh(th(f.a, 1)[G]);
            var G = C.a[0],
                G = null != G ? G : "",
                J;
            J = C.a[2];
            J = null != J ? J : "";
            for (var la = k, ea = [], D = 0; D < V(la.X, 11); ++D) {
                var va;
                va = D;
                va = new Ph(th(la.X, 11)[va]);
                for (var Ea = 0; Ea < V(va.a, 1); ++Ea) {
                    var Cb;
                    Cb = Ea;
                    Cb = new Oh(th(va.a, 1)[Cb]);
                    var gb = C.a[1],
                        Mc = Cb.a[1];
                    if ((null != gb ? gb : "") == (null != Mc ? Mc : "")) {
                        gb = [];
                        for (Mc = 0; Mc < V(Cb.a, 0); ++Mc) {
                            var Wg = gb,
                                ld;
                            ld = Mc;
                            ld = th(Cb.a, 0)[ld];
                            zb(Wg, ld) || Wg.push(ld)
                        }
                        Cb = ea;
                        zb(Cb, gb) || Cb.push(gb)
                    }
                }
            }
            C = ea;
            if (la = 1 > z || l && z < p && this.C < m) this.C += 1;
            ea = Oe(this.l) ? "rtl" : "ltr";
            C = Yk(rl, {
                df: G,
                Zd: J,
                ug: MSG_SYNONYMS_LOWERCASE,
                He: C,
                Md: ea,
                $e: this.L
            });
            ea = Q("gt-mt-md", C);
            this.pa.push([ea, G]);
            (G = Q("gt-ex-mt", C)) && this.pa.push([G, J]);
            (G = Q("gt-def-synonym-title", C)) && Oe(this.A) != Oe(this.c) && (J = Oe(this.A), wg(G, "direction", J ? "rtl" : "ltr"), wg(G, "padding-" + (J ? "left" : "right"), "8px"), G.style[B ? "styleFloat" : "cssFloat"] = J ? "right" : "left");
            G = $m(C, la);
            w.appendChild(G);
            this.a += 1
        }
        this.m.appendChild(w)
    }
    for (e = 0; e < V(d.X, 15); e++) k = e, k = new Th(th(d.X, 15)[k]), f = k.a[1], m = null != f ? f : "", f = k.a[2], f = null != f ? f : "", l = R("DIV", {
        "class": "gt-def-row"
    }), m = R("DIV", {
        "class": "gt-kp-desc"
    }, m), p = R("A"), k = k.a[3], p.setAttribute("href", null != k ? k : ""), p.setAttribute("target", "_blank"), k = R("IMG", {
        "class": "gt-kp-image"
    }), k.setAttribute("src", f), p.appendChild(k), l.appendChild(p), l.appendChild(m), this.m.appendChild(l);
    g && (this.Zc = g, Ym(this, g));
    if (!b && this.a > 1 * a || b && this.a > c) d = MSG_N_MORE_DEFINITIONS_LABEL.replace("%1$s", this.a - this.C), Zm(this, d, MSG_FEWER_DEFINITIONS_LABEL);
    else
        for (d = If("gt-card-expand-wrapper", this.j()), g = 0; g < d.length; g++) a =
            d[g], Q("gt-def-synonym", a) && De(a, "gt-card-expand-wrapper");
    this.K(!0);
    return !0
};
Qn.prototype.Y = function() {
    Qn.o.Y.call(this);
    ih(this).D(this.j(), "click", this.aa)
};
Qn.prototype.ra = function(a) {
    Qn.o.ra.call(this, a)
};
Qn.prototype.aa = function(a) {
    Be(a.target, "gt-cd-cl") && this.dispatchEvent(new H("a", a.target))
};
var Sn = function(a, b, c, d, e, f, g) {
    ch.call(this);
    this.pa = a;
    this.Ua = b;
    this.Oa = c;
    this.ua = e;
    this.Aa = f;
    this.na = d;
    this.ba = new Om(Rn(this));
    this.l = g;
    this.m = "";
    this.J = g;
    this.aa = null;
    this.R = L.I()
};
v(Sn, ch);
var Rn = function(a) {
        return a.na ? "webapp" : "t"
    },
    Tn = function(a) {
        var b = R("DIV", {
            id: "gt-res-formal"
        });
        a.j().appendChild(b);
        var c = new ul("");
        c.ea(16, !0);
        lh(c, b);
        c.B(a.Ua);
        uj(c.c, c, 2);
        0 == a.J && c.va(!0);
        I(c, "action", a.Df, !1, a);
        a.T = c;
        b = R("DIV", {
            id: "gt-res-informal"
        });
        a.j().appendChild(b);
        c = new ul("");
        c.ea(16, !0);
        lh(c, b);
        c.B(a.Oa);
        uj(c.c, c, 1);
        1 == a.J && c.va(!0);
        I(c, "action", a.Ef, !1, a);
        a.$ = c;
        a.K(!1)
    };
h = Sn.prototype;
h.Df = function() {
    this.A && (W(this.T, 16) ? (this.$.va(!1), this.l = 0, M(this.R, Rn(this), "formality", "formal", {
        hl: this.B,
        sl: this.a,
        tl: this.c,
        source: this.A,
        trans: this.m,
        changed: this.L != this.m
    })) : (this.l = 2, M(this.R, Rn(this), "formality", "unpressformal", {
        hl: this.B,
        sl: this.a,
        tl: this.c,
        source: this.A,
        trans: this.m,
        changed: this.C != this.m
    })), this.aa = !0, this.pa.translate("", "", this.A, "fmcl"), Un(this))
};
h.Ef = function() {
    this.A && (W(this.$, 16) ? (this.T.va(!1), this.l = 1, M(this.R, Rn(this), "formality", "informal", {
        hl: this.B,
        sl: this.a,
        tl: this.c,
        source: this.A,
        trans: this.m,
        changed: this.P != this.m
    })) : (this.l = 2, M(this.R, Rn(this), "formality", "unpressinformal", {
        hl: this.B,
        sl: this.a,
        tl: this.c,
        source: this.A,
        trans: this.m,
        changed: this.C != this.m
    })), this.aa = !0, this.pa.translate("", "", this.A, "fmcl"), Un(this))
};
h.update = function(a, b, c, d, e) {
    this.A = d;
    this.m = e;
    this.B = c;
    this.a = a;
    this.c = b;
    if (this.aa) this.aa = !1;
    else {
        this.P = this.L = this.C = null;
        switch (this.l) {
            case 0:
                this.L = e;
                break;
            case 1:
                this.P = e;
                break;
            case 2:
                this.C = e
        }
        if (this.ua && "en" == a && "de" == b) {
            if (0 != this.l) {
                c = 0;
                e = new sm;
                Bm(e, "tco", c);
                e.set("source", "fmcp");
                var f = Pm;
                Tm(this.ba, a, b, "en", d, [f.TRANSLATION], u(this.Kd, this, c), e)
            }
            1 != this.l && (c = 1, e = new sm, Bm(e, "tco", c), e.set("source", "fmcp"), f = Pm, Tm(this.ba, a, b, "en", d, [f.TRANSLATION], u(this.Kd, this, c), e));
            2 != this.l &&
                (c = 2, e = new sm, Bm(e, "tco", c), e.set("source", "fmcp"), f = Pm, Tm(this.ba, a, b, "en", d, [f.TRANSLATION], u(this.Kd, this, c), e))
        } else this.K(!1)
    }
};
h.Kd = function(a, b) {
    if (null != b) {
        var c = [];
        if (0 < V(b.X, 0))
            for (var d = 0; d < V(b.X, 0); d++) {
                var e = Mi(b, d);
                null != e.kb[0] && c.push(fi(e))
            }
        0 == a ? this.L = c.join("") : 1 == a ? this.P = c.join("") : 2 == a && (this.C = c.join(""));
        null != this.L && null != this.P && null != this.C && ((c = this.L != this.P) ? M(this.R, Rn(this), "formality", "show", {
            hl: this.B,
            sl: this.a,
            tl: this.c,
            source: this.A,
            trans: this.m,
            changed: this.m != this.C
        }) : this.Aa || (this.T.va(!1), this.$.va(!1), this.l = this.J, 0 == this.J ? this.T.va(!0) : 1 == this.J && this.$.va(!0)), this.K(c))
    }
};
h.K = function(a) {
    U(this.j(), a)
};
var Un = function(a) {
    "en" != a.B || a.ib || (a.ib = document.createElement("script"), a.ib.setAttribute("async", ""), a.ib.setAttribute("defer", ""), .5 > Math.random() && (a.na ? a.ib.setAttribute("src", "//www.google.com/insights/consumersurveys/async_survey?site=drqa77owbzzvrx2eybe2mmchse") : a.ib.setAttribute("src", "//www.google.com/insights/consumersurveys/async_survey?site=7yga3yj2jydgysdmekrlxqfowu")), document.head.appendChild(a.ib))
};
var Wn = function(a) {
    K.call(this);
    this.v = a;
    I(a, Vn, this.b, !1, this);
    I(a, "click", this.a, !1, this)
};
v(Wn, K);
var Vn = cc ? "keypress" : "keydown";
Wn.prototype.b = function(a) {
    (13 == a.keyCode || E && 3 == a.keyCode) && Xn(this, a)
};
Wn.prototype.a = function(a) {
    Xn(this, a)
};
var Xn = function(a, b) {
    var c = new Yn(b);
    if (a.dispatchEvent(c)) {
        c = new Zn(b);
        try {
            a.dispatchEvent(c)
        } finally {
            b.c()
        }
    }
};
Wn.prototype.H = function() {
    Wn.o.H.call(this);
    $c(this.v, Vn, this.b, !1, this);
    $c(this.v, "click", this.a, !1, this);
    delete this.v
};
var Zn = function(a) {
    Cc.call(this, a.a);
    this.type = "action"
};
v(Zn, Cc);
var Yn = function(a) {
    Cc.call(this, a.a);
    this.type = "beforeaction"
};
v(Yn, Cc);
var $n = function(a, b) {
    xc.call(this);
    this.g = this.c = 0;
    this.a = a;
    this.h = b;
    this.b = new ak(u(this.l, this), 0, this)
};
v($n, xc);
$n.prototype.H = function() {
    this.b.sa();
    delete this.a;
    delete this.h;
    $n.o.H.call(this)
};
$n.prototype.l = function() {
    if (!this.a.call(this.h))
        if (0 > this.g) ck(this.b, this.c);
        else {
            var a = this.g - sa();
            0 >= a || ck(this.b, Math.min(this.c, a))
        }
};
var bo = function(a) {
    K.call(this);
    this.v = a;
    this.a = this.v.value;
    this.g = new Yg(this);
    this.c = sa();
    ao ? this.g.D(a, "paste", this.Nb) : this.g.D(a, ["keydown", "blur", "focus", "mouseover", "input"], this.pf);
    this.b = new $n(u(this.Ud, this))
};
v(bo, K);
var ao = E || B || ac || cc && F("1.9");
h = bo.prototype;
h.Ta = "init";
h.Da = Kl("goog.events.PasteHandler");
h.H = function() {
    bo.o.H.call(this);
    this.g.sa();
    this.g = null;
    this.b.sa();
    this.b = null
};
h.Ud = function() {
    if (this.a == this.v.value) return !1;
    Ml(this.Da, "detected textchange after paste");
    this.dispatchEvent("after_paste");
    return !0
};
h.Nb = function(a) {
    a = new Cc(a.a);
    a.type = "paste";
    this.dispatchEvent(a);
    Ud(function() {
        if (!this.Ud()) {
            var a = this.b;
            bk(a.b);
            a.c = Math.max(50, 0);
            a.g = sa() + 200;
            ck(a.b, Math.min(a.c, 200))
        }
    }, 0, this)
};
h.pf = function(a) {
    switch (this.Ta) {
        case "init":
            switch (a.type) {
                case "blur":
                    this.Ta = "init";
                    break;
                case "focus":
                    this.Ta = "focused";
                    break;
                case "mouseover":
                    this.Ta = "init";
                    this.v.value != this.a && (Ml(this.Da, "paste by dragdrop while on init!"), this.Nb(a));
                    break;
                default:
                    Ll(this.Da, "unexpected event " + a.type + "during init")
            }
            break;
        case "focused":
            switch (a.type) {
                case "input":
                    var b = this.c + 400;
                    if (sa() > b || "focus" == this.h) Ml(this.Da, "paste by textchange while focused!"), this.Nb(a);
                    break;
                case "blur":
                    this.Ta = "init";
                    break;
                case "keydown":
                    Ml(this.Da, "key down ... looking for ctrl+v");
                    if (ec && $b && 0 == a.keyCode || ec && $b && 17 == a.keyCode) break;
                    this.Ta = "typing";
                    break;
                case "mouseover":
                    this.v.value != this.a && (Ml(this.Da, "paste by dragdrop while focused!"), this.Nb(a));
                    break;
                default:
                    Ll(this.Da, "unexpected event " + a.type + " during focused")
            }
            break;
        case "typing":
            switch (a.type) {
                case "input":
                    this.Ta = "focused";
                    break;
                case "blur":
                    this.Ta = "init";
                    break;
                case "keydown":
                    if (a.ctrlKey && 86 == a.keyCode || a.shiftKey && 45 == a.keyCode || a.metaKey && 86 == a.keyCode) Ml(this.Da,
                        "paste by ctrl+v while keypressed!"), this.Nb(a);
                    break;
                case "mouseover":
                    this.v.value != this.a && (Ml(this.Da, "paste by dragdrop while keypressed!"), this.Nb(a));
                    break;
                default:
                    Ll(this.Da, "unexpected event " + a.type + " during keypressed")
            }
            break;
        default:
            Ll(this.Da, "invalid " + this.Ta + " state")
    }
    this.c = sa();
    this.a = this.v.value;
    Ml(this.Da, a.type + " -> " + this.Ta);
    this.h = a.type
};
var co = function() {};
v(co, gj);
fa(co);
h = co.prototype;
h.ob = function() {};
h.ha = function(a, b) {
    Lj(a, !1);
    a.Wa &= -256;
    a.ea(32, !1);
    co.o.ha.call(this, a, b);
    a.B(b.value);
    return b
};
h.wa = function(a) {
    Lj(a, !1);
    a.Wa &= -256;
    a.ea(32, !1);
    return a.b.b("TEXTAREA", {
        "class": jj(this, a).join(" "),
        disabled: !a.isEnabled()
    }, a.oa() || "")
};
h.Rb = function(a) {
    return "TEXTAREA" == a.tagName
};
h.jd = q;
h.hd = function(a) {
    return a.isEnabled()
};
h.Sb = q;
h.Ib = function(a, b, c) {
    co.o.Ib.call(this, a, b, c);
    (a = a.j()) && 1 == b && (a.disabled = c)
};
h.Na = q;
h.pb = function(a, b) {
    a && (a.value = b)
};
h.M = function() {
    return "goog-textarea"
};
var eo = function(a, b, c) {
    X.call(this, a, b || co.I(), c);
    Lj(this, !1);
    this.vc = !0;
    (b = this.j()) && this.c.Fc(b, !0);
    this.Vb = "" != a;
    a || (this.Jb = "")
};
v(eo, X);
var fo = !(B && !sc(11));
h = eo.prototype;
h.Wb = !1;
h.Jc = !1;
h.Vb = !1;
h.gb = 0;
h.ke = 0;
h.ve = 0;
h.ne = !1;
h.Nc = !1;
h.Ed = !1;
h.Dd = !1;
h.Zb = "";
var go = function(a) {
        return a.C.top + a.C.bottom + a.na.top + a.na.bottom
    },
    ho = function(a) {
        var b = a.ve,
            c = a.j();
        b && c && a.Nc && (b -= go(a));
        return b
    };
eo.prototype.a = function(a) {
    this.B(String(a))
};
eo.prototype.W = function() {
    return this.j().value != this.Zb || io(this) || this.Vb ? this.j().value : ""
};
eo.prototype.B = function(a) {
    eo.o.B.call(this, a);
    this.Vb = "" != a;
    jo(this)
};
eo.prototype.ia = function(a) {
    eo.o.ia.call(this, a);
    this.j().disabled = !a
};
var jo = function(a) {
        a.j() && a.R()
    },
    io = function(a) {
        x(a.j());
        return "placeholder" in a.j()
    },
    ko = function(a) {
        a.Zb && (io(a) ? a.j().placeholder = a.Zb : !a.j() || a.Vb || a.Jc || (N(x(a.j()), "textarea-placeholder-input"), a.j().value = a.Zb))
    };
eo.prototype.Y = function() {
    eo.o.Y.call(this);
    var a = this.j();
    wg(a, {
        overflowY: "hidden",
        overflowX: "auto",
        boxSizing: "border-box",
        MsBoxSizing: "border-box",
        WebkitBoxSizing: "border-box",
        MozBoxSizing: "border-box"
    });
    this.C = Tg(a, "padding");
    this.na = Xg(a);
    ih(this).D(a, "scroll", this.R).D(a, "focus", this.R).D(a, "keyup", this.R).D(a, "mouseup", this.yd).D(a, "blur", this.Cb);
    ko(this);
    jo(this)
};
var lo = function(a) {
        if (!a.ne) {
            var b = a.j().cloneNode(!1);
            wg(b, {
                position: "absolute",
                height: "auto",
                top: "-9999px",
                margin: "0",
                padding: "1px",
                border: "1px solid #000",
                overflow: "hidden"
            });
            a.b.a.body.appendChild(b);
            var c = b.scrollHeight;
            b.style.padding = "10px";
            var d = b.scrollHeight;
            a.Ed = d > c;
            b.style.borderWidth = "10px";
            a.Dd = b.scrollHeight > d;
            b.style.height = "100px";
            100 != b.offsetHeight && (a.Nc = !0);
            S(b);
            a.ne = !0
        }
        b = a.j();
        isNaN(a.C.top) && (a.C = Tg(b, "padding"), a.na = Xg(b));
        var c = a.j().scrollHeight,
            e = a.j(),
            d = e.offsetHeight -
            e.clientHeight;
        if (!a.Ed) var f = a.C,
            d = d - (f.top + f.bottom);
        a.Dd || (e = Xg(e), d -= e.top + e.bottom);
        c += 0 < d ? d : 0;
        a.Nc ? c -= go(a) : (a.Ed || (d = a.C, c += d.top + d.bottom), a.Dd || (a = Xg(b), c += a.top + a.bottom));
        return c
    },
    mo = function(a, b) {
        a.gb != b && (a.gb = b, a.j().style.height = b + "px")
    },
    no = function(a) {
        var b = a.j();
        b.style.height = "auto";
        var c = b.value.match(/\n/g) || [];
        b.rows = c.length + 1;
        a.gb = 0
    };
eo.prototype.Cb = function() {
    io(this) || (this.Jc = !1, "" == this.j().value && (this.Vb = !1, ko(this)))
};
eo.prototype.R = function(a) {
    if (!this.Wb) {
        var b = this.j();
        !io(this) && a && "focus" == a.type && (b.value == this.Zb && this.Zb && !this.Jc && (De(b, "textarea-placeholder-input"), b.value = ""), this.Jc = !0, this.Vb = "" != b.value);
        var c = !1;
        this.Wb = !0;
        a = this.gb;
        if (b.scrollHeight) {
            var d = !1,
                e = !1,
                f = lo(this),
                g = b.offsetHeight,
                k = ho(this),
                l;
            l = this.ke;
            var m = this.j();
            l && m && this.Nc && (l -= go(this));
            k && f < k ? (mo(this, k), d = !0) : l && f > l ? (mo(this, l), b.style.overflowY = "", e = !0) : g != f ? mo(this, f) : this.gb || (this.gb = f);
            d || e || !fo || (c = !0)
        } else no(this);
        this.Wb = !1;
        c && (b = this.j(), this.Wb || (this.Wb = !0, (e = b.scrollHeight) ? (f = lo(this), c = ho(this), c && f <= c || (d = this.C, b.style.paddingBottom = d.bottom + 1 + "px", lo(this) == f && (b.style.paddingBottom = d.bottom + e + "px", b.scrollTop = 0, e = lo(this) - e, e >= c ? mo(this, e) : mo(this, c)), b.style.paddingBottom = d.bottom + "px")) : no(this), this.Wb = !1));
        a != this.gb && this.dispatchEvent("resize")
    }
};
eo.prototype.yd = function() {
    var a = this.j(),
        b = a.offsetHeight;
    a.filters && a.filters.length && (a = a.filters.item("DXImageTransform.Microsoft.DropShadow")) && (b -= a.offX);
    b != this.gb && (this.gb = this.ve = b)
};
var oo = function(a) {
    eo.call(this, a);
    this.Oa = "";
    this.Aa = null;
    this.T = 0;
    this.pa = this.ua = !1
};
v(oo, eo);
oo.prototype.a = function(a) {
    oo.o.a.call(this, a);
    this.ba("set")
};
oo.prototype.Y = function() {
    oo.o.Y.call(this);
    I(this.j(), "compositionstart", u(this.oc, this), !1, this);
    I(this.j(), "compositionend", u(this.lc, this), !1, this);
    I(new Aj(this.j()), "key", function(a) {
        po(this, "key", {
            keyCode: a.keyCode
        })
    }, !1, this);
    I(this.j(), "input", function() {
        po(this, "input")
    }, !1, this);
    I(new bo(this.j()), "paste", function() {
        this.ua = !0;
        po(this, "paste")
    }, !1, this);
    I(this.j(), "drop", function() {
        po(this, "drop")
    }, !1, this);
    this.Aa = new Qd(1E3);
    I(this.Aa, "tick", function() {
        this.ba("timer")
    }, !1, this);
    Sd(this.Aa)
};
oo.prototype.oc = function() {
    this.pa = !0
};
oo.prototype.lc = function() {
    this.pa = !1;
    po(this, "input")
};
var po = function(a, b, c) {
    Ud(u(a.ba, a, b, c), 0, a)
};
oo.prototype.ba = function(a, b) {
    if (!this.pa) {
        var c = this.W();
        c != this.Oa && (this.T += 1, this.Oa = c, c = new H("change"), this.ua && (this.ua = !1, a = "paste"), c.m = a, null != b && Pb(c, b), this.dispatchEvent(c))
    }
};
var qo = function(a, b) {
    K.call(this);
    this.b = a;
    this.a = [];
    null != b && this.Oc(b)
};
v(qo, K);
qo.prototype.update = function(a, b) {
    for (var c = this.a.length = 0; c < a.length; ++c) this.a.push(a[c]);
    this.dispatchEvent({
        type: this.b,
        data: this.a,
        selected: null != b ? b : null
    })
};
var ro = function() {
    K.call(this);
    this.c = this.b = this.a = "";
    this.F = new qo("srcSuggestionUpdated", this);
    this.A = new qo("staticSrcSuggestionUpdated", this);
    this.B = new qo("staticTgtSuggestionUpdated", this);
    this.C = [];
    new qo("srcEmphasizeUpdated", this);
    this.L = new qo("tgtEmphasizeUpdated", this);
    this.O = this.w = 0;
    this.J = [];
    this.P = [];
    this.m = !1;
    this.l = ""
};
v(ro, K);
var so = function(a, b) {
    var c = [],
        d;
    if (b) {
        d = "auto" == a.a ? a.c : a.a;
        for (var e = -1, f = 0; f < b.length; ++f) b[f] == d ? "auto" != a.a && (e = f) : c.push(b[f]);
        d = -1 != e && 3 > e
    } else d = !1;
    d || a.m || a.F.update(c ? c.slice(0, 3) : [])
};
ro.prototype.g = function(a, b) {
    var c = null != b ? b : 0;
    if (3 == c || 4 == c || 5 == c) this.m = !0;
    6 == c && (this.l = a);
    "zh-TW" == a && (a = "zh-CN");
    "auto" != a && to(this, "");
    uo(this.A, a, this.J);
    if (this.a != a) {
        var d = this.a;
        this.a = a;
        d = "auto" == d ? void 0 : u(this.h, this, d, 6);
        this.w = c;
        vo(this, this.a, "srcLanguageUpdated", c, d)
    }
};
ro.prototype.h = function(a, b) {
    var c = null != b ? b : 0;
    6 != c && 5 != c || "zh-CN" != a || "zh-TW" != this.l || (a = "zh-TW");
    5 == c && (this.l = this.b);
    uo(this.B, a, this.P);
    if (this.b != a) {
        var d = this.b;
        this.b = a;
        this.O = c;
        vo(this, this.b, "tgtLanguageUpdated", c, u(this.g, this, d, 6))
    }
};
var uo = function(a, b, c) {
        for (var d = Db(a.a), e = "auto" != b, f = 0; f < d.length; f++)
            if (b == d[f]) {
                e = !1;
                break
            }
        if (e)
            for (e = {}, 0 < c.length && (e[c[0]] = !0), 1 < c.length && (e[c[1]] = !0), f = d.length - 1; 0 <= f; f--)
                if (!e[d[f]]) {
                    d[f] = b;
                    break
                }
        a.update(d, b)
    },
    to = function(a, b) {
        "auto" == b && (b = "");
        a.c != b && (a.c = b, a.dispatchEvent({
            type: "detectSrcUpdated",
            data: a.c
        }))
    },
    wo = function(a) {
        if (!a || 0 == a.length) return "";
        for (var b = [], c = 0; c < a.length; ++c) b.push(a[c]);
        return b.join("|")
    },
    vo = function(a, b, c, d, e) {
        a.dispatchEvent({
            type: c,
            data: b,
            Qd: 6 == d
        });
        e &&
            (3 == d || 4 == d) && a.a == a.b && "zh-CN" != a.a && e();
        4 != d && 3 != d || a.dispatchEvent("languageSelected")
    };
var xo = function() {};
v(xo, rj);
fa(xo);
h = xo.prototype;
h.wa = function(a) {
    var b = jj(this, a),
        b = a.b.b("DIV", {
            "class": "goog-inline-block " + b.join(" ")
        }, a.oa());
    sj(b, a.A);
    return b
};
h.ob = function() {
    return "button"
};
h.Rb = function(a) {
    return "DIV" == a.tagName
};
h.ha = function(a, b) {
    x(b);
    N(b, "goog-inline-block");
    return xo.o.ha.call(this, a, b)
};
h.W = function() {
    return ""
};
h.M = function() {
    return "goog-flat-button"
};
Ij("goog-flat-button", function() {
    return new Wj(null, xo.I())
});
var yo = function(a) {
    this.b = a
};
fa(yo);
var zo = function(a, b) {
    a && (a.tabIndex = b ? 0 : -1)
};
yo.prototype.l = function(a) {
    return a.b.b("DIV", Ao(this, a).join(" "))
};
yo.prototype.g = function(a) {
    return a
};
yo.prototype.a = function(a) {
    return "DIV" == a.tagName
};
var Do = function(a, b, c) {
        c.id && fh(b, c.id);
        var d = a.M(),
            e = !1,
            f = Ae(c);
        f && y(f, function(a) {
            a == d ? e = !0 : a && (a == d + "-disabled" ? b.ia(!1) : a == d + "-horizontal" ? Bo(b, "horizontal") : a == d + "-vertical" && Bo(b, "vertical"))
        }, a);
        e || N(c, d);
        Co(a, b, a.g(c));
        return c
    },
    Co = function(a, b, c) {
        if (c)
            for (var d = c.firstChild, e; d && d.parentNode == c;) {
                e = d.nextSibling;
                if (1 == d.nodeType) {
                    var f = a.c(d);
                    f && (f.v = d, b.isEnabled() || f.ia(!1), b.Va(f), mh(f, d))
                } else d.nodeValue && "" != Ha(d.nodeValue) || c.removeChild(d);
                d = e
            }
    };
yo.prototype.c = function(a) {
    a: {
        var b;x(a);a = Ae(a);
        for (var c = 0, d = a.length; c < d; c++)
            if (b = a[c], b = b in Hj ? Hj[b]() : null) {
                a = b;
                break a
            }
        a = null
    }
    return a
};
yo.prototype.h = function(a) {
    a = a.j();
    x(a, "The container DOM element cannot be null.");
    Qg(a, !0, cc);
    B && (a.hideFocus = !0);
    var b = this.b;
    b && aj(a, b)
};
yo.prototype.M = function() {
    return "goog-container"
};
var Ao = function(a, b) {
        var c = a.M(),
            d = [c, "horizontal" == b.Kb ? c + "-horizontal" : c + "-vertical"];
        b.isEnabled() || d.push(c + "-disabled");
        return d
    },
    Eo = function() {
        return "vertical"
    };
var Fo = function(a, b, c) {
    ch.call(this, c);
    this.eb = b || yo.I();
    this.Kb = a || Eo()
};
v(Fo, ch);
h = Fo.prototype;
h.wd = null;
h.Hb = null;
h.eb = null;
h.Kb = null;
h.fb = !0;
h.Gb = !0;
h.Ob = !0;
h.ka = -1;
h.qa = null;
h.hb = !1;
h.Xa = null;
var Go = function(a) {
    return a.wd || a.j()
};
h = Fo.prototype;
h.Ea = function() {
    this.v = this.eb.l(this)
};
h.Fb = function() {
    return this.eb.g(this.j())
};
h.fd = function(a) {
    return this.eb.a(a)
};
h.ra = function(a) {
    this.v = Do(this.eb, this, a);
    "none" == a.style.display && (this.fb = !1)
};
h.Y = function() {
    Fo.o.Y.call(this);
    nh(this, function(a) {
        a.Z && Ho(this, a)
    }, this);
    var a = this.j();
    this.eb.h(this);
    this.K(this.fb, !0);
    ih(this).D(this, "enter", this.md).D(this, "highlight", this.rf).D(this, "unhighlight", this.tf).D(this, "open", this.Jf).D(this, "close", this.qf).D(a, "mousedown", this.sf).D(P(a), "mouseup", this.Bf).D(a, ["mousedown", "mouseup", "mouseover", "mouseout", "contextmenu"], this.xf);
    this.Ob && Io(this, !0)
};
var Io = function(a, b) {
    var c = ih(a),
        d = Go(a);
    b ? c.D(d, "focus", a.ie).D(d, "blur", a.he).D(a.Hb || (a.Hb = new Aj(Go(a))), "key", a.ya) : c.b(d, "focus", a.ie).b(d, "blur", a.he).b(a.Hb || (a.Hb = new Aj(Go(a))), "key", a.ya)
};
h = Fo.prototype;
h.Ra = function() {
    this.ub(-1);
    this.qa && this.qa.ma(!1);
    this.hb = !1;
    Fo.o.Ra.call(this)
};
h.H = function() {
    Fo.o.H.call(this);
    this.Hb && (this.Hb.sa(), this.Hb = null);
    this.eb = this.qa = this.Xa = this.wd = null
};
h.md = function() {
    return !0
};
h.rf = function(a) {
    var b = rh(this, a.target);
    if (-1 < b && b != this.ka) {
        var c = Jo(this);
        c && Pj(c, !1);
        this.ka = b;
        c = Jo(this);
        this.hb && Oj(c, !0);
        this.qa && c != this.qa && (oj(c, 64) ? c.ma(!0) : this.qa.ma(!1))
    }
    b = this.j();
    x(b, "The DOM element for the container cannot be null.");
    null != a.target.j() && cj(b, "activedescendant", a.target.j().id)
};
h.tf = function(a) {
    a.target == Jo(this) && (this.ka = -1);
    a = this.j();
    x(a, "The DOM element for the container cannot be null.");
    a.removeAttribute(bj("activedescendant"))
};
h.Jf = function(a) {
    (a = a.target) && a != this.qa && a.F() == this && (this.qa && this.qa.ma(!1), this.qa = a)
};
h.qf = function(a) {
    a.target == this.qa && (this.qa = null);
    var b = this.j(),
        c = a.target.j();
    b && W(a.target, 2) && c && fj(b, c)
};
h.sf = function(a) {
    this.Gb && (this.hb = !0);
    var b = Go(this);
    b && hg(b) && ig(b) ? b.focus() : a.preventDefault()
};
h.Bf = function() {
    this.hb = !1
};
h.xf = function(a) {
    var b;
    a: {
        b = a.target;
        if (this.Xa)
            for (var c = this.j(); b && b !== c;) {
                var d = b.id;
                if (d in this.Xa) {
                    b = this.Xa[d];
                    break a
                }
                b = b.parentNode
            }
        b = null
    }
    if (b) switch (a.type) {
        case "mousedown":
            b.Ja(a);
            break;
        case "mouseup":
            b.za(a);
            break;
        case "mouseover":
            b.qd(a);
            break;
        case "mouseout":
            b.pd(a);
            break;
        case "contextmenu":
            b.kc(a)
    }
};
h.ie = function() {};
h.he = function() {
    this.ub(-1);
    this.hb = !1;
    this.qa && this.qa.ma(!1)
};
h.ya = function(a) {
    return this.isEnabled() && this.V() && (0 != oh(this) || this.wd) && this.gd(a) ? (a.preventDefault(), a.c(), !0) : !1
};
h.gd = function(a) {
    var b = Jo(this);
    if (b && "function" == typeof b.ya && b.ya(a) || this.qa && this.qa != b && "function" == typeof this.qa.ya && this.qa.ya(a)) return !0;
    if (a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) return !1;
    switch (a.keyCode) {
        case 27:
            if (this.Ob) Go(this).blur();
            else return !1;
            break;
        case 36:
            Ko(this);
            break;
        case 35:
            Lo(this);
            break;
        case 38:
            if ("vertical" == this.Kb) Mo(this);
            else return !1;
            break;
        case 37:
            if ("horizontal" == this.Kb) qh(this) ? No(this) : Mo(this);
            else return !1;
            break;
        case 40:
            if ("vertical" == this.Kb) No(this);
            else return !1;
            break;
        case 39:
            if ("horizontal" == this.Kb) qh(this) ? Mo(this) : No(this);
            else return !1;
            break;
        default:
            return !1
    }
    return !0
};
var Ho = function(a, b) {
    var c = b.j(),
        c = c.id || (c.id = eh(b));
    a.Xa || (a.Xa = {});
    a.Xa[c] = b
};
Fo.prototype.Va = function(a, b) {
    ob(a, X, "The child of a container must be a control");
    Fo.o.Va.call(this, a, b)
};
Fo.prototype.Tc = function(a, b, c) {
    ob(a, X);
    a.rc |= 2;
    a.rc |= 64;
    a.ea(32, !1);
    Lj(a, !1);
    var d = a.F() == this ? rh(this, a) : -1;
    Fo.o.Tc.call(this, a, b, c);
    a.Z && this.Z && Ho(this, a);
    a = d; - 1 == a && (a = oh(this));
    a == this.ka ? this.ka = Math.min(oh(this) - 1, b) : a > this.ka && b <= this.ka ? this.ka++ : a < this.ka && b > this.ka && this.ka--
};
Fo.prototype.removeChild = function(a, b) {
    a = t(a) ? jh(this, a) : a;
    ob(a, X);
    if (a) {
        var c = rh(this, a); - 1 != c && (c == this.ka ? (Pj(a, !1), this.ka = -1) : c < this.ka && this.ka--);
        var d = a.j();
        d && d.id && this.Xa && (c = this.Xa, d = d.id, d in c && delete c[d])
    }
    a = Fo.o.removeChild.call(this, a, b);
    Lj(a, !0);
    return a
};
var Bo = function(a, b) {
    if (a.j()) throw Error("Component already rendered");
    a.Kb = b
};
Fo.prototype.V = function() {
    return this.fb
};
Fo.prototype.K = function(a, b) {
    if (b || this.fb != a && this.dispatchEvent(a ? "show" : "hide")) {
        this.fb = a;
        var c = this.j();
        c && (U(c, a), this.Ob && zo(Go(this), this.Gb && this.fb), b || this.dispatchEvent(this.fb ? "aftershow" : "afterhide"));
        return !0
    }
    return !1
};
Fo.prototype.isEnabled = function() {
    return this.Gb
};
Fo.prototype.ia = function(a) {
    this.Gb != a && this.dispatchEvent(a ? "enable" : "disable") && (a ? (this.Gb = !0, nh(this, function(a) {
        a.Qe ? delete a.Qe : a.ia(!0)
    })) : (nh(this, function(a) {
        a.isEnabled() ? a.ia(!1) : a.Qe = !0
    }), this.hb = this.Gb = !1), this.Ob && zo(Go(this), a && this.fb))
};
var Oo = function(a, b) {
    b != a.Ob && a.Z && Io(a, b);
    a.Ob = b;
    a.Gb && a.fb && zo(Go(a), b)
};
Fo.prototype.ub = function(a) {
    (a = ph(this, a)) ? Pj(a, !0): -1 < this.ka && Pj(Jo(this), !1)
};
var Jo = function(a) {
        return ph(a, a.ka)
    },
    Ko = function(a) {
        Po(a, function(a, c) {
            return (a + 1) % c
        }, oh(a) - 1)
    },
    Lo = function(a) {
        Po(a, function(a, c) {
            a--;
            return 0 > a ? c - 1 : a
        }, 0)
    },
    No = function(a) {
        Po(a, function(a, c) {
            return (a + 1) % c
        }, a.ka)
    },
    Mo = function(a) {
        Po(a, function(a, c) {
            a--;
            return 0 > a ? c - 1 : a
        }, a.ka)
    },
    Po = function(a, b, c) {
        c = 0 > c ? rh(a, a.qa) : c;
        var d = oh(a);
        c = b.call(a, c, d);
        for (var e = 0; e <= d;) {
            var f = ph(a, c);
            if (f && a.Sd(f)) {
                a.ub(c);
                break
            }
            e++;
            c = b.call(a, c, d)
        }
    };
Fo.prototype.Sd = function(a) {
    return a.V() && a.isEnabled() && oj(a, 2)
};
var Qo = function() {};
v(Qo, gj);
fa(Qo);
Qo.prototype.M = function() {
    return "goog-menuheader"
};
var Ro = function(a, b, c) {
    X.call(this, a, c || Qo.I(), b);
    this.ea(1, !1);
    this.ea(2, !1);
    this.ea(4, !1);
    this.ea(32, !1);
    this.qb = 1
};
v(Ro, X);
Ij("goog-menuheader", function() {
    return new Ro(null)
});
var So = function() {
    this.g = []
};
v(So, gj);
fa(So);
var To = function(a, b) {
    var c = a.g[b];
    if (!c) {
        switch (b) {
            case 0:
                c = a.M() + "-highlight";
                break;
            case 1:
                c = a.M() + "-checkbox";
                break;
            case 2:
                c = a.M() + "-content"
        }
        a.g[b] = c
    }
    return c
};
h = So.prototype;
h.ob = function() {
    return "menuitem"
};
h.wa = function(a) {
    var b = a.b.b("DIV", jj(this, a).join(" "), Uo(this, a.oa(), a.b));
    Vo(this, a, b, oj(a, 8) || oj(a, 16));
    return b
};
h.xa = function(a) {
    return a && a.firstChild
};
h.ha = function(a, b) {
    x(b);
    var c = Wf(b),
        d = To(this, 2);
    c && Be(c, d) || b.appendChild(Uo(this, b.childNodes, a.b));
    Be(b, "goog-option") && (a.ea(16, !0), a && b && Vo(this, a, b, !0));
    return So.o.ha.call(this, a, b)
};
h.pb = function(a, b) {
    var c = this.xa(a),
        d = Wo(this, a) ? c.firstChild : null;
    So.o.pb.call(this, a, b);
    d && !Wo(this, a) && c.insertBefore(d, c.firstChild || null)
};
var Uo = function(a, b, c) {
        a = To(a, 2);
        return c.b("DIV", a, b)
    },
    Wo = function(a, b) {
        var c = a.xa(b);
        if (c) {
            var c = c.firstChild,
                d = To(a, 1);
            return !!c && Xf(c) && Be(c, d)
        }
        return !1
    },
    Vo = function(a, b, c, d) {
        nj(a, c, b.hc());
        pj(a, b, c);
        d != Wo(a, c) && (Fe(c, "goog-option", d), c = a.xa(c), d ? (a = To(a, 1), c.insertBefore(b.b.b("DIV", a), c.firstChild || null)) : c.removeChild(c.firstChild))
    };
So.prototype.a = function(a) {
    switch (a) {
        case 2:
            return To(this, 0);
        case 16:
        case 8:
            return "goog-option-selected";
        default:
            return So.o.a.call(this, a)
    }
};
So.prototype.c = function(a) {
    var b = To(this, 0);
    switch (a) {
        case "goog-option-selected":
            return 16;
        case b:
            return 2;
        default:
            return So.o.c.call(this, a)
    }
};
So.prototype.M = function() {
    return "goog-menuitem"
};
var Xo = function(a, b, c, d) {
    X.call(this, a, d || So.I(), c);
    this.lb = b
};
v(Xo, X);
h = Xo.prototype;
h.W = function() {
    var a = this.lb;
    return null != a ? a : this.Pb()
};
h.ea = function(a, b) {
    Xo.o.ea.call(this, a, b);
    switch (a) {
        case 8:
            W(this, 16) && !b && this.va(!1);
            var c = this.j();
            c && this && c && Vo(this.c, this, c, b);
            break;
        case 16:
            (c = this.j()) && this && c && Vo(this.c, this, c, b)
    }
};
h.Pb = function() {
    var a = this.oa();
    return r(a) ? (a = ub(a, function(a) {
        return Xf(a) && (Be(a, "goog-menuitem-accel") || Be(a, "goog-menuitem-mnemonic-separator")) ? "" : lg(a)
    }).join(""), Ga(a)) : Xo.o.Pb.call(this)
};
h.za = function(a) {
    var b = this.F();
    if (b) {
        var c = b.a;
        b.a = null;
        if (b = c && ia(a.clientX)) b = new O(a.clientX, a.clientY), b = c == b ? !0 : c && b ? c.x == b.x && c.y == b.y : !1;
        if (b) return
    }
    Xo.o.za.call(this, a)
};
h.Tb = function(a) {
    return a.keyCode == this.we && this.tb(a) ? !0 : Xo.o.Tb.call(this, a)
};
h.nf = function() {
    return this.we
};
Ij("goog-menuitem", function() {
    return new Xo(null)
});
Xo.prototype.hc = function() {
    return oj(this, 16) ? "menuitemcheckbox" : oj(this, 8) ? "menuitemradio" : Xo.o.hc.call(this)
};
Xo.prototype.F = function() {
    return X.prototype.F.call(this)
};
Xo.prototype.zc = function() {
    return X.prototype.zc.call(this)
};
var Yo = function() {};
v(Yo, gj);
fa(Yo);
Yo.prototype.wa = function(a) {
    return a.b.b("DIV", this.M())
};
Yo.prototype.ha = function(a, b) {
    b.id && fh(a, b.id);
    if ("HR" == b.tagName) {
        var c = b;
        b = this.wa(a);
        c.parentNode && c.parentNode.insertBefore(b, c);
        S(c)
    } else N(b, this.M());
    return b
};
Yo.prototype.pb = function() {};
Yo.prototype.M = function() {
    return "goog-menuseparator"
};
var Zo = function(a, b) {
    X.call(this, null, a || Yo.I(), b);
    this.ea(1, !1);
    this.ea(2, !1);
    this.ea(4, !1);
    this.ea(32, !1);
    this.qb = 1
};
v(Zo, X);
Zo.prototype.Y = function() {
    Zo.o.Y.call(this);
    var a = this.j();
    x(a, "The DOM element for the separator cannot be null.");
    aj(a, "separator")
};
Ij("goog-menuseparator", function() {
    return new Zo
});
var $o = function(a) {
    this.b = a || "menu"
};
v($o, yo);
fa($o);
$o.prototype.a = function(a) {
    return "UL" == a.tagName || $o.o.a.call(this, a)
};
$o.prototype.c = function(a) {
    return "HR" == a.tagName ? new Zo : $o.o.c.call(this, a)
};
$o.prototype.M = function() {
    return "goog-menu"
};
$o.prototype.h = function(a) {
    $o.o.h.call(this, a);
    a = a.j();
    x(a, "The menu DOM element cannot be null.");
    cj(a, "haspopup", "true")
};
Ij("goog-menuseparator", function() {
    return new Zo
});
var ap = function(a, b) {
    Fo.call(this, "vertical", b || $o.I(), a);
    Oo(this, !1)
};
v(ap, Fo);
h = ap.prototype;
h.Uc = !0;
h.M = function() {
    return this.eb.M()
};
h.K = function(a, b, c) {
    (b = ap.o.K.call(this, a, b)) && a && this.Z && this.Uc && Go(this).focus();
    a && c && ia(c.clientX) ? this.a = new O(c.clientX, c.clientY) : this.a = null;
    return b
};
h.md = function(a) {
    this.Uc && Go(this).focus();
    return ap.o.md.call(this, a)
};
h.Sd = function(a) {
    return a.isEnabled() && a.V() && oj(a, 2)
};
h.ra = function(a) {
    for (var b = this.eb, c = Hf(this.b.a, "DIV", b.M() + "-content", a), d = c.length, e = 0; e < d; e++) Co(b, this, c[e]);
    ap.o.ra.call(this, a)
};
h.gd = function(a) {
    var b = ap.o.gd.call(this, a);
    b || nh(this, function(c) {
        !b && c.nf && c.we == a.keyCode && (this.isEnabled() && this.ub(rh(this, c)), b = c.ya(a))
    }, this);
    return b
};
h.ub = function(a) {
    ap.o.ub.call(this, a);
    var b = ph(this, a);
    if (b) {
        a = this.j() || Lf(document);
        var b = b.j(),
            c = a || Lf(document),
            d = Eg(b),
            e = Eg(c),
            f = Xg(c);
        if (c == Lf(document)) {
            var g = d.x - c.scrollLeft,
                d = d.y - c.scrollTop;
            B && !sc(10) && (g += f.left, d += f.top)
        } else g = d.x - e.x - f.left, d = d.y - e.y - f.top;
        var f = c.clientHeight - b.offsetHeight,
            e = c.scrollLeft,
            k = c.scrollTop,
            e = e + Math.min(g, Math.max(g - (c.clientWidth - b.offsetWidth), 0)),
            k = k + Math.min(d, Math.max(d - f, 0)),
            b = new O(e, k);
        a.scrollLeft = b.x;
        a.scrollTop = b.y
    }
};
var bp = function(a, b, c) {
    this.a = a;
    this.b = b;
    this.m = c
};
v(bp, ik);
bp.prototype.c = function(a, b, c) {
    hk(this.a, this.b, a, b, void 0, c, this.m)
};
var cp = function(a, b, c, d) {
    bp.call(this, a, b);
    this.g = c ? 5 : 0;
    this.h = d || void 0
};
v(cp, bp);
cp.prototype.l = function() {
    return this.g
};
cp.prototype.w = function(a) {
    this.g = a
};
cp.prototype.c = function(a, b, c, d) {
    var e = hk(this.a, this.b, a, b, null, c, 10, d, this.h);
    if (e & 496) {
        var f = dp(e, this.b);
        b = dp(e, b);
        e = hk(this.a, f, a, b, null, c, 10, d, this.h);
        e & 496 && (f = dp(e, f), b = dp(e, b), hk(this.a, f, a, b, null, c, this.g, d, this.h))
    }
};
var dp = function(a, b) {
    a & 48 && (b ^= 4);
    a & 192 && (b ^= 1);
    return b
};
var ep = function(a, b, c, d) {
    cp.call(this, a, b, c || d);
    (c || d) && this.w(65 | (d ? 32 : 132))
};
v(ep, cp);
var fp = function() {};
v(fp, Xj);
fa(fp);
fp.prototype.xa = function(a) {
    return fp.o.xa.call(this, a && a.firstChild)
};
fp.prototype.ha = function(a, b) {
    var c = Hf(document, "*", "goog-menu", b)[0];
    if (c) {
        U(c, !1);
        P(c).body.appendChild(c);
        var d = new ap;
        mh(d, c);
        a.ac(d)
    }
    return fp.o.ha.call(this, a, b)
};
fp.prototype.yc = function(a, b) {
    return fp.o.yc.call(this, [b.b("DIV", "goog-inline-block " + (this.M() + "-caption"), a), b.b("DIV", "goog-inline-block " + (this.M() + "-dropdown"), "\u00a0")], b)
};
fp.prototype.M = function() {
    return "goog-menu-button"
};
var gp = function(a, b, c, d, e) {
    Wj.call(this, a, c || fp.I(), d);
    this.ea(64, !0);
    this.C = new ep(null, 9);
    b && this.ac(b);
    this.R = new Qd(500);
    !He && !Ie || F("533.17.9") || (this.Kc = !0);
    this.Xf = e || $o.I()
};
v(gp, Wj);
h = gp.prototype;
h.Kc = !1;
h.Y = function() {
    gp.o.Y.call(this);
    hp(this, !0);
    this.a && ip(this, this.a, !0);
    cj(gh(this), "haspopup", !!this.a)
};
h.Ra = function() {
    gp.o.Ra.call(this);
    hp(this, !1);
    if (this.a) {
        this.ma(!1);
        this.a.Ra();
        ip(this, this.a, !1);
        var a = this.a.j();
        a && S(a)
    }
};
h.H = function() {
    gp.o.H.call(this);
    this.a && (this.a.sa(), delete this.a);
    delete this.bg;
    this.R.sa()
};
h.Ja = function(a) {
    gp.o.Ja.call(this, a);
    W(this, 4) && (this.ma(!W(this, 64), a), this.a && (this.a.hb = W(this, 64)))
};
h.za = function(a) {
    gp.o.za.call(this, a);
    this.a && !W(this, 4) && (this.a.hb = !1)
};
h.tb = function() {
    Oj(this, !1);
    return !0
};
h.Af = function(a) {
    this.a && this.a.V() && !this.kd(a.target) && this.ma(!1)
};
h.kd = function(a) {
    var b;
    if (!(b = a && Zf(this.j(), a)) && (b = this.a)) a: if (b = this.a, Zf(b.j(), a)) b = !0;
        else {
            for (var c = 0, d = oh(b); c < d; c++) {
                var e = ph(b, c);
                if ("function" == typeof e.kd && e.kd(a)) {
                    b = !0;
                    break a
                }
            }
            b = !1
        }
    return b || !1
};
h.Tb = function(a) {
    if (32 == a.keyCode) {
        if (a.preventDefault(), "keyup" != a.type) return !0
    } else if ("key" != a.type) return !1;
    if (this.a && this.a.V()) {
        var b = 13 == a.keyCode || 32 == a.keyCode,
            c = this.a.ya(a);
        return 27 == a.keyCode || b ? (this.ma(!1), !0) : c
    }
    return 40 == a.keyCode || 38 == a.keyCode || 32 == a.keyCode || 13 == a.keyCode ? (this.ma(!0, a), !0) : !1
};
h.nd = function() {
    this.ma(!1)
};
h.If = function() {
    W(this, 4) || this.ma(!1)
};
h.Gc = function(a) {
    this.Kc || this.ma(!1);
    gp.o.Gc.call(this, a)
};
h.ac = function(a) {
    var b = this.a;
    if (a != b && (b && (this.ma(!1), this.Z && ip(this, b, !1), delete this.a), this.Z && cj(gh(this), "haspopup", !!a), a)) {
        this.a = a;
        kh(a, this);
        a.K(!1);
        var c = this.Kc;
        (a.Uc = c) && Oo(a, !0);
        this.Z && ip(this, a, !0)
    }
    return b
};
h.K = function(a, b) {
    var c = gp.o.K.call(this, a, b);
    c && !this.V() && this.ma(!1);
    return c
};
h.ia = function(a) {
    gp.o.ia.call(this, a);
    this.isEnabled() || this.ma(!1)
};
h.ma = function(a, b) {
    gp.o.ma.call(this, a);
    if (this.a && W(this, 64) == a) {
        if (a) this.a.Z || lh(this.a, void 0), this.ua = Fg(this.j()), this.pa = Lg(this.j()), jp(this), !b || 40 != b.keyCode && 38 != b.keyCode ? this.a.ub(-1) : Ko(this.a);
        else {
            Oj(this, !1);
            this.a.hb = !1;
            var c = this.j();
            c && (cj(c, "activedescendant", ""), cj(c, "owns", ""));
            if (null != this.T && (this.T = void 0, c = this.a.j())) {
                var d = "",
                    e;
                d instanceof yf ? (e = d.height, d = d.width) : e = "";
                c.style.width = Ag(d, !0);
                c.style.height = Ag(e, !0)
            }
        }
        this.a.K(a, !1, b);
        this.S || (c = ih(this), d = a ? c.D : c.b,
            d.call(c, this.b.a, "mousedown", this.Af, !0), this.Kc && d.call(c, this.a, "blur", this.If), d.call(c, this.R, "tick", this.lc), a ? Sd(this.R) : Rd(this.R))
    }
    this.a && this.a.j() && gh(this.a).removeAttribute(bj("hidden"))
};
var jp = function(a) {
    if (a.a.Z) {
        var b = a.C;
        a.C.a = a.bg || a.j();
        var c = a.a.j();
        a.a.V() || (c.style.visibility = "hidden", U(c, !0));
        !a.T && a.C.l && a.C.g & 32 && (a.T = Kg(c));
        b.c(c, b.b ^ 1, null, a.T);
        a.a.V() || (U(c, !1), c.style.visibility = "visible")
    }
};
gp.prototype.lc = function() {
    var a = Lg(this.j()),
        b = Fg(this.j()),
        c;
    c = this.pa;
    (c = !(c == a || c && a && c.left == a.left && c.width == a.width && c.top == a.top && c.height == a.height)) || (c = this.ua, c = !(c == b || c && b && c.top == b.top && c.right == b.right && c.bottom == b.bottom && c.left == b.left));
    c && (this.pa = a, this.ua = b, jp(this))
};
var ip = function(a, b, c) {
        var d = ih(a);
        c = c ? d.D : d.b;
        c.call(d, b, "action", a.nd);
        c.call(d, b, "close", a.Aa);
        c.call(d, b, "highlight", a.Oa);
        c.call(d, b, "unhighlight", a.Cb)
    },
    hp = function(a, b) {
        var c = ih(a);
        (b ? c.D : c.b).call(c, a.j(), "keydown", a.oc)
    };
gp.prototype.Oa = function(a) {
    (a = a.target.j()) && kp(this, a)
};
gp.prototype.oc = function(a) {
    oj(this, 32) && this.j() && this.a && this.a.V() && a.c()
};
gp.prototype.Cb = function() {
    if (!Jo(this.a)) {
        var a = this.j();
        x(a, "The menu button DOM element cannot be null.");
        cj(a, "activedescendant", "");
        cj(a, "owns", "")
    }
};
gp.prototype.Aa = function(a) {
    if (W(this, 64) && a.target instanceof Xo) {
        a = a.target;
        var b = a.j();
        a.V() && W(a, 2) && null != b && kp(this, b)
    }
};
var kp = function(a, b) {
    var c = a.j();
    x(c, "The menu button DOM element cannot be null.");
    var d = ej(b) || b;
    if (!d.id) {
        var e = ah.I();
        d.id = ":" + (e.a++).toString(36)
    }
    fj(c, d);
    cj(c, "owns", d.id)
};
Ij("goog-menu-button", function() {
    return new gp(null)
});
var lp = function() {};
v(lp, xo);
fa(lp);
lp.prototype.wa = function(a) {
    var b = jj(this, a),
        b = a.b.b("DIV", {
            "class": "goog-inline-block " + b.join(" ")
        }, [mp(this, a.oa(), a.b), np(this, a.b)]);
    sj(b, a.A);
    return b
};
lp.prototype.xa = function(a) {
    return a && a.firstChild
};
lp.prototype.ha = function(a, b) {
    var c = Hf(document, "*", "goog-menu", b)[0];
    if (c) {
        U(c, !1);
        a.b.a.body.appendChild(c);
        var d = new ap;
        mh(d, c);
        a.ac(d)
    }
    Hf(document, "*", this.M() + "-caption", b)[0] || b.appendChild(mp(this, b.childNodes, a.b));
    Hf(document, "*", this.M() + "-dropdown", b)[0] || b.appendChild(np(this, a.b));
    return lp.o.ha.call(this, a, b)
};
var mp = function(a, b, c) {
        return c.b("DIV", "goog-inline-block " + (a.M() + "-caption"), b)
    },
    np = function(a, b) {
        return b.b("DIV", {
            "class": "goog-inline-block " + (a.M() + "-dropdown"),
            "aria-hidden": !0
        }, "\u00a0")
    };
lp.prototype.M = function() {
    return "goog-flat-menu-button"
};
Ij("goog-flat-menu-button", function() {
    return new gp(null, null, lp.I())
});
var op = function(a, b, c) {
    Xo.call(this, a, b, c);
    this.ea(8, !0)
};
v(op, Xo);
op.prototype.tb = function() {
    return this.dispatchEvent("action")
};
Ij("goog-option", function() {
    return new op(null)
});
var qp = function(a) {
    K.call(this);
    this.a = [];
    pp(this, a)
};
v(qp, K);
qp.prototype.b = null;
var pp = function(a, b) {
        b && (y(b, function(a) {
            rp(a, !1)
        }, a), Eb(a.a, b))
    },
    sp = function(a) {
        var b = a.b;
        return b ? sb(a.a, b) : -1
    };
qp.prototype.clear = function() {
    var a = this.a;
    if (!r(a))
        for (var b = a.length - 1; 0 <= b; b--) delete a[b];
    a.length = 0;
    this.b = null
};
qp.prototype.H = function() {
    qp.o.H.call(this);
    delete this.a;
    this.b = null
};
var rp = function(a, b) {
    a && "function" == typeof a.Fd && a.Fd(b)
};
var tp = function(a, b, c, d, e) {
    gp.call(this, a, b, c, d, e || new $o("listbox"));
    this.ba = this.oa();
    this.na = null;
    this.Ad = "listbox"
};
v(tp, gp);
h = tp.prototype;
h.ga = null;
h.Y = function() {
    tp.o.Y.call(this);
    up(this);
    vp(this)
};
h.ra = function(a) {
    tp.o.ra.call(this, a);
    (a = this.Pb()) ? (this.ba = a, up(this)) : wp(this) || this.ga && xp(this, this.ga.a[0] || null)
};
h.H = function() {
    tp.o.H.call(this);
    this.ga && (this.ga.sa(), this.ga = null);
    this.ba = null
};
h.nd = function(a) {
    xp(this, a.target);
    tp.o.nd.call(this, a);
    a.c();
    this.dispatchEvent("action")
};
h.Lf = function() {
    var a = wp(this);
    tp.o.ge.call(this, a && a.W());
    up(this)
};
h.ac = function(a) {
    var b = tp.o.ac.call(this, a);
    a != b && (this.ga && this.ga.clear(), a && (this.ga ? nh(a, function(a) {
        yp(a);
        var b = this.ga,
            e = b.a.length;
        a && (rp(a, !1), Gb(b.a, e, 0, a))
    }, this) : zp(this, a)));
    return b
};
var xp = function(a, b) {
    if (a.ga) {
        var c = wp(a),
            d = a.ga;
        b != d.b && (rp(d.b, !1), d.b = b, rp(b, !0));
        d.dispatchEvent("select");
        b != c && a.dispatchEvent("change")
    }
};
tp.prototype.ge = function(a) {
    if (null != a && this.ga)
        for (var b = 0, c; c = this.ga.a[b] || null; b++)
            if (c && "function" == typeof c.W && c.W() == a) {
                xp(this, c);
                return
            }
    xp(this, null)
};
tp.prototype.W = function() {
    var a = wp(this);
    return a ? a.W() : null
};
var wp = function(a) {
        return a.ga ? a.ga.b : null
    },
    zp = function(a, b) {
        a.ga = new qp;
        b && nh(b, function(a) {
            yp(a);
            var b = this.ga,
                e = b.a.length;
            a && (rp(a, !1), Gb(b.a, e, 0, a))
        }, a);
        vp(a)
    },
    vp = function(a) {
        a.ga && ih(a).D(a.ga, "select", a.Lf)
    },
    up = function(a) {
        var b = wp(a);
        a.B(b ? b.Pb() : a.ba);
        var c = a.c.xa(a.j());
        c && a.b.Rf(c) && (null == a.na && (a.na = dj(c, "label")), b = (b = b ? b.j() : null) ? dj(b, "label") : a.na, cj(c, "label", b), Ap(a))
    },
    Ap = function(a) {
        var b = a.c;
        if (b && (b = b.xa(a.j()))) {
            var c = gh(a);
            b.id || (b.id = ":" + (ah.I().a++).toString(36));
            aj(b, "option");
            cj(c, "activedescendant", b.id);
            a.ga && (c = Db(a.ga.a), cj(b, "setsize", Bp(c)), a = sp(a.ga), cj(b, "posinset", 0 <= a ? Bp(Fb(c, 0, a + 1)) : 0))
        }
    },
    Bp = function(a) {
        return xb(a, function(a) {
            return a instanceof Xo
        })
    },
    yp = function(a) {
        a.Ad = a instanceof Xo ? "option" : "separator"
    };
tp.prototype.ma = function(a, b) {
    tp.o.ma.call(this, a, b);
    W(this, 64) ? (this.a || this.ac(new ap(this.b, this.Xf)), (this.a || null).ub(this.ga ? sp(this.ga) : -1)) : Ap(this)
};
Ij("goog-select", function() {
    return new tp(null)
});
var Cp = function(a) {
        return (a = a.exec(Sb)) ? a[1] : ""
    },
    Dp = function() {
        if (Ge) return Cp(/Firefox\/([0-9.]+)/);
        if (B || ac || $b) return pc;
        if (Ke) return Cp(/Chrome\/([0-9.]+)/);
        if (Le && !Yb()) return Cp(/Version\/([0-9.]+)/);
        if (He || Ie) {
            var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(Sb);
            if (a) return a[1] + "." + a[2]
        } else if (Je) return (a = Cp(/Android\s+([0-9.]+)/)) ? a : Cp(/Version\/([0-9.]+)/);
        return ""
    }();
Ff(window.document);
new K;
var Ep = function() {
    xc.call(this)
};
v(Ep, xc);
Kl("goog.dom.SavedRange");
var Gp = function(a, b, c, d, e) {
    this.a = !!b;
    this.node = null;
    this.h = 0;
    this.S = !1;
    this.A = !c;
    a && Fp(this, a, d);
    this.g = void 0 != e ? e : this.h || 0;
    this.a && (this.g *= -1)
};
v(Gp, Hk);
var Fp = function(a, b, c, d) {
    if (a.node = b) a.h = ia(c) ? c : 1 != a.node.nodeType ? 0 : a.a ? -1 : 1;
    ia(d) && (a.g = d)
};
Gp.prototype.ab = function(a) {
    this.node = a.node;
    this.h = a.h;
    this.g = a.g;
    this.a = a.a;
    this.A = a.A
};
Gp.prototype.clone = function() {
    return new Gp(this.node, this.a, !this.A, this.h, this.g)
};
Gp.prototype.next = function() {
    var a;
    if (this.S) {
        if (!this.node || this.A && 0 == this.g) throw Gk;
        a = this.node;
        var b = this.a ? -1 : 1;
        if (this.h == b) {
            var c = this.a ? a.lastChild : a.firstChild;
            c ? Fp(this, c) : Fp(this, a, -1 * b)
        } else(c = this.a ? a.previousSibling : a.nextSibling) ? Fp(this, c) : Fp(this, a.parentNode, -1 * b);
        this.g += this.h * (this.a ? -1 : 1)
    } else this.S = !0;
    a = this.node;
    if (!this.node) throw Gk;
    return a
};
Gp.prototype.splice = function(a) {
    var b = this.node,
        c = this.a ? 1 : -1;
    this.h == c && (this.h = -1 * c, this.g += this.h * (this.a ? -1 : 1));
    this.a = !this.a;
    Gp.prototype.next.call(this);
    this.a = !this.a;
    for (var c = ha(arguments[0]) ? arguments[0] : arguments, d = c.length - 1; 0 <= d; d--) b.parentNode && b.parentNode.insertBefore(c[d], b.nextSibling);
    S(b)
};
var Hp = function() {},
    Ip = function(a) {
        if (a.getSelection) return a.getSelection();
        a = a.document;
        var b = a.selection;
        if (b) {
            try {
                var c = b.createRange();
                if (c.parentElement) {
                    if (c.parentElement().document != a) return null
                } else if (!c.length || c.item(0).document != a) return null
            } catch (d) {
                return null
            }
            return b
        }
        return null
    },
    Jp = function(a) {
        for (var b = [], c = 0, d = a.ic(); c < d; c++) b.push(a.Qb(c));
        return b
    };
Hp.prototype.nc = function() {
    return !1
};
var Kp = function(a, b) {
    Gp.call(this, a, b, !0)
};
v(Kp, Gp);
var Lp = function() {};
v(Lp, Hp);
var Mp = function(a, b, c, d, e) {
    this.c = this.b = null;
    this.G = this.F = 0;
    var f;
    a && (this.b = a, this.F = b, this.c = c, this.G = d, 1 == a.nodeType && "BR" != a.tagName && (a = a.childNodes, (b = a[b]) ? (this.b = b, this.F = 0) : (a.length && (this.b = rb(a)), f = !0)), 1 == c.nodeType && ((this.c = c.childNodes[d]) ? this.G = 0 : this.c = c));
    Gp.call(this, e ? this.c : this.b, e, !0);
    if (f) try {
        this.next()
    } catch (g) {
        if (g != Gk) throw g;
    }
};
v(Mp, Kp);
h = Mp.prototype;
h.Dc = function() {
    return this.b
};
h.mc = function() {
    return this.S && this.node == this.c && (!this.G || 1 != this.h)
};
h.next = function() {
    if (this.mc()) throw Gk;
    return Mp.o.next.call(this)
};
h.ab = function(a) {
    this.b = a.b;
    this.c = a.c;
    this.F = a.F;
    this.G = a.G;
    this.l = a.l;
    Mp.o.ab.call(this, a)
};
h.clone = function() {
    var a = new Mp(this.b, this.F, this.c, this.G, this.l);
    a.ab(this);
    return a
};
var Np = function() {},
    Op = function(a, b) {
        var c = b.gc();
        try {
            return 0 <= a.Pa(c, 0, 0) && 0 >= a.Pa(c, 1, 1)
        } catch (d) {
            if (!B) throw d;
            return !1
        }
    };
Np.prototype.Ab = function() {
    return new Mp(this.Ha(), this.cb(), this.bb(), this.nb())
};
var Pp = function(a) {
    this.a = a
};
v(Pp, Np);
var Rp = function(a) {
        var b = P(a).createRange();
        if (3 == a.nodeType) b.setStart(a, 0), b.setEnd(a, a.length);
        else if (Qp(a)) {
            for (var c, d = a;
                (c = d.firstChild) && Qp(c);) d = c;
            b.setStart(d, 0);
            for (d = a;
                (c = d.lastChild) && Qp(c);) d = c;
            b.setEnd(d, 1 == d.nodeType ? d.childNodes.length : d.length)
        } else c = a.parentNode, a = sb(c.childNodes, a), b.setStart(c, a), b.setEnd(c, a + 1);
        return b
    },
    Sp = function(a, b, c, d) {
        var e = P(a).createRange();
        e.setStart(a, b);
        e.setEnd(c, d);
        return e
    };
h = Pp.prototype;
h.clone = function() {
    return new this.constructor(this.a.cloneRange())
};
h.gc = function() {
    return this.a
};
h.ed = function() {
    return this.a.commonAncestorContainer
};
h.Ha = function() {
    return this.a.startContainer
};
h.cb = function() {
    return this.a.startOffset
};
h.bb = function() {
    return this.a.endContainer
};
h.nb = function() {
    return this.a.endOffset
};
h.Pa = function(a, b, c) {
    return this.a.compareBoundaryPoints(1 == c ? 1 == b ? n.Range.START_TO_START : n.Range.START_TO_END : 1 == b ? n.Range.END_TO_START : n.Range.END_TO_END, a)
};
h.Ia = function() {
    return this.a.collapsed
};
h.ee = function() {
    return this.a.toString()
};
h.select = function(a) {
    var b = Of(P(this.Ha()));
    this.qc(b.getSelection(), a)
};
h.qc = function(a) {
    a.removeAllRanges();
    a.addRange(this.a)
};
var Tp = function(a) {
    this.a = a
};
v(Tp, Pp);
Tp.prototype.qc = function(a, b) {
    !b || this.Ia() ? Tp.o.qc.call(this, a, b) : (a.collapse(this.bb(), this.nb()), a.extend(this.Ha(), this.cb()))
};
var Up = function(a, b) {
    this.c = this.b = this.l = null;
    this.h = this.g = -1;
    this.a = a;
    this.m = b
};
v(Up, Np);
var Vp = Kl("goog.dom.browserrange.IeRange"),
    Wp = function(a) {
        var b = P(a).body.createTextRange();
        if (1 == a.nodeType) b.moveToElementText(a), Qp(a) && !a.childNodes.length && b.collapse(!1);
        else {
            for (var c = 0, d = a; d = d.previousSibling;) {
                var e = d.nodeType;
                if (3 == e) c += d.length;
                else if (1 == e) {
                    b.moveToElementText(d);
                    break
                }
            }
            d || b.moveToElementText(a.parentNode);
            b.collapse(!d);
            c && b.move("character", c);
            b.moveEnd("character", a.length)
        }
        return b
    };
Up.prototype.clone = function() {
    var a = new Up(this.a.duplicate(), this.m);
    a.l = this.l;
    a.b = this.b;
    a.c = this.c;
    return a
};
Up.prototype.gc = function() {
    return this.a
};
Up.prototype.ed = function() {
    if (!this.l) {
        var a = this.a.text,
            b = this.a.duplicate(),
            c = a.replace(/ +$/, "");
        (c = a.length - c.length) && b.moveEnd("character", -c);
        c = b.parentElement();
        b = b.htmlText.replace(/(\r\n|\r|\n)+/g, " ").length;
        if (this.Ia() && 0 < b) return this.l = c;
        for (; b > c.outerHTML.replace(/(\r\n|\r|\n)+/g, " ").length;) c = c.parentNode;
        for (; 1 == c.childNodes.length && c.innerText == Xp(c.firstChild) && Qp(c.firstChild);) c = c.firstChild;
        0 == a.length && (c = Yp(this, c));
        this.l = c
    }
    return this.l
};
var Yp = function(a, b) {
    for (var c = b.childNodes, d = 0, e = c.length; d < e; d++) {
        var f = c[d];
        if (Qp(f)) {
            var g = Wp(f),
                k = g.htmlText != f.outerHTML;
            if (a.Ia() && k ? 0 <= a.Pa(g, 1, 1) && 0 >= a.Pa(g, 1, 0) : a.a.inRange(g)) return Yp(a, f)
        }
    }
    return b
};
h = Up.prototype;
h.Ha = function() {
    this.b || (this.b = Zp(this, 1), this.Ia() && (this.c = this.b));
    return this.b
};
h.cb = function() {
    0 > this.g && (this.g = $p(this, 1), this.Ia() && (this.h = this.g));
    return this.g
};
h.bb = function() {
    if (this.Ia()) return this.Ha();
    this.c || (this.c = Zp(this, 0));
    return this.c
};
h.nb = function() {
    if (this.Ia()) return this.cb();
    0 > this.h && (this.h = $p(this, 0), this.Ia() && (this.g = this.h));
    return this.h
};
h.Pa = function(a, b, c) {
    return this.a.compareEndPoints((1 == b ? "Start" : "End") + "To" + (1 == c ? "Start" : "End"), a)
};
var Zp = function(a, b, c) {
        c = c || a.ed();
        if (!c || !c.firstChild) return c;
        for (var d = 1 == b, e = 0, f = c.childNodes.length; e < f; e++) {
            var g = d ? e : f - e - 1,
                k = c.childNodes[g],
                l;
            try {
                l = aq(k)
            } catch (p) {
                continue
            }
            var m = l.gc();
            if (a.Ia())
                if (!Qp(k)) {
                    if (0 == a.Pa(m, 1, 1)) {
                        a.g = a.h = g;
                        break
                    }
                } else {
                    if (Op(l, a)) return Zp(a, b, k)
                }
            else {
                if (Op(a, l)) {
                    if (!Qp(k)) {
                        d ? a.g = g : a.h = g + 1;
                        break
                    }
                    return Zp(a, b, k)
                }
                if (0 > a.Pa(m, 1, 0) && 0 < a.Pa(m, 0, 1)) return Zp(a, b, k)
            }
        }
        return c
    },
    $p = function(a, b) {
        var c = 1 == b,
            d = c ? a.Ha() : a.bb();
        if (1 == d.nodeType) {
            for (var d = d.childNodes, e = d.length,
                    f = c ? 1 : -1, g = c ? 0 : e - 1; 0 <= g && g < e; g += f) {
                var k = d[g];
                if (!Qp(k) && 0 == a.a.compareEndPoints((1 == b ? "Start" : "End") + "To" + (1 == b ? "Start" : "End"), aq(k).gc())) return c ? g : g + 1
            }
            return -1 == g ? 0 : g
        }
        e = a.a.duplicate();
        f = Wp(d);
        e.setEndPoint(c ? "EndToEnd" : "StartToStart", f);
        e = e.text.length;
        return c ? d.length - e : e
    },
    Xp = function(a) {
        return 3 == a.nodeType ? a.nodeValue : a.innerText
    };
Up.prototype.Ia = function() {
    return 0 == this.a.compareEndPoints("StartToEnd", this.a)
};
Up.prototype.ee = function() {
    return this.a.text
};
Up.prototype.select = function() {
    this.a.select()
};
var bq = function(a) {
    this.a = a
};
v(bq, Pp);
bq.prototype.qc = function(a) {
    a.collapse(this.Ha(), this.cb());
    this.bb() == this.Ha() && this.nb() == this.cb() || a.extend(this.bb(), this.nb());
    0 == a.rangeCount && a.addRange(this.a)
};
var cq = function(a) {
    this.a = a
};
v(cq, Pp);
cq.prototype.Pa = function(a, b, c) {
    return F("528") ? cq.o.Pa.call(this, a, b, c) : this.a.compareBoundaryPoints(1 == c ? 1 == b ? n.Range.START_TO_START : n.Range.END_TO_START : 1 == b ? n.Range.START_TO_END : n.Range.END_TO_END, a)
};
cq.prototype.qc = function(a, b) {
    b ? a.setBaseAndExtent(this.bb(), this.nb(), this.Ha(), this.cb()) : a.setBaseAndExtent(this.Ha(), this.cb(), this.bb(), this.nb())
};
var dq = function(a) {
        return Df ? new Up(a, P(a.parentElement())) : E ? new cq(a) : cc ? new Tp(a) : $b ? new bq(a) : new Pp(a)
    },
    aq = function(a) {
        if (B && !sc(9)) {
            var b = new Up(Wp(a), P(a));
            if (Qp(a)) {
                for (var c, d = a;
                    (c = d.firstChild) && Qp(c);) d = c;
                b.b = d;
                b.g = 0;
                for (d = a;
                    (c = d.lastChild) && Qp(c);) d = c;
                b.c = d;
                b.h = 1 == d.nodeType ? d.childNodes.length : d.length;
                b.l = a
            } else b.b = b.c = b.l = a.parentNode, b.g = sb(b.l.childNodes, a), b.h = b.g + 1;
            a = b
        } else a = E ? new cq(Rp(a)) : cc ? new Tp(Rp(a)) : $b ? new bq(Rp(a)) : new Pp(Rp(a));
        return a
    },
    Qp = function(a) {
        var b;
        a: if (1 !=
                a.nodeType) b = !1;
            else {
                switch (a.tagName) {
                    case "APPLET":
                    case "AREA":
                    case "BASE":
                    case "BR":
                    case "COL":
                    case "COMMAND":
                    case "EMBED":
                    case "FRAME":
                    case "HR":
                    case "IMG":
                    case "INPUT":
                    case "IFRAME":
                    case "ISINDEX":
                    case "KEYGEN":
                    case "LINK":
                    case "NOFRAMES":
                    case "NOSCRIPT":
                    case "META":
                    case "OBJECT":
                    case "PARAM":
                    case "SCRIPT":
                    case "SOURCE":
                    case "STYLE":
                    case "TRACK":
                    case "WBR":
                        b = !1;
                        break a
                }
                b = !0
            }
        return b || 3 == a.nodeType
    };
var eq = function() {
    this.g = this.c = this.h = this.b = this.a = null;
    this.l = !1
};
v(eq, Hp);
var fq = function(a, b) {
    var c = new eq;
    c.a = a;
    c.l = !!b;
    return c
};
h = eq.prototype;
h.clone = function() {
    var a = new eq;
    a.a = this.a && this.a.clone();
    a.b = this.b;
    a.h = this.h;
    a.c = this.c;
    a.g = this.g;
    a.l = this.l;
    return a
};
h.Ba = function() {
    return "text"
};
h.dd = function() {
    return gq(this).gc()
};
h.ic = function() {
    return 1
};
h.Qb = function() {
    return this
};
var gq = function(a) {
    var b;
    if (!(b = a.a)) {
        b = a.Sa();
        var c = a.$a(),
            d = a.mb(),
            e = a.Eb();
        if (B && !sc(9)) {
            var f = b,
                g = c,
                k = d,
                l = e,
                m = !1;
            1 == f.nodeType && (g > f.childNodes.length && Ll(Vp, "Cannot have startOffset > startNode child count"), g = f.childNodes[g], m = !g, f = g || f.lastChild || f, g = 0);
            var p = Wp(f);
            g && p.move("character", g);
            f == k && g == l ? p.collapse(!0) : (m && p.collapse(!1), m = !1, 1 == k.nodeType && (l > k.childNodes.length && Ll(Vp, "Cannot have endOffset > endNode child count"), k = (g = k.childNodes[l]) || k.lastChild || k, l = 0, m = !g), f = Wp(k), f.collapse(!m),
                l && f.moveEnd("character", l), p.setEndPoint("EndToEnd", f));
            l = new Up(p, P(b));
            l.b = b;
            l.g = c;
            l.c = d;
            l.h = e;
            b = l
        } else b = E ? new cq(Sp(b, c, d, e)) : cc ? new Tp(Sp(b, c, d, e)) : $b ? new bq(Sp(b, c, d, e)) : new Pp(Sp(b, c, d, e));
        b = a.a = b
    }
    return b
};
h = eq.prototype;
h.Ac = function() {
    return gq(this).ed()
};
h.Sa = function() {
    return this.b || (this.b = gq(this).Ha())
};
h.$a = function() {
    return null != this.h ? this.h : this.h = gq(this).cb()
};
h.mb = function() {
    return this.c || (this.c = gq(this).bb())
};
h.Eb = function() {
    return null != this.g ? this.g : this.g = gq(this).nb()
};
h.nc = function() {
    return this.l
};
h.Cc = function() {
    return gq(this).Ia()
};
h.Bc = function() {
    return gq(this).ee()
};
h.Ab = function() {
    return new Mp(this.Sa(), this.$a(), this.mb(), this.Eb())
};
h.select = function() {
    gq(this).select(this.l)
};
h.Cd = function() {
    return new hq(this)
};
var hq = function(a) {
    xc.call(this);
    a.nc() ? a.mb() : a.Sa();
    a.nc() ? a.Eb() : a.$a();
    a.nc() ? a.Sa() : a.mb();
    a.nc() ? a.$a() : a.Eb()
};
v(hq, Ep);
hq.prototype.H = function() {
    hq.o.H.call(this)
};
var iq = function() {
    this.c = this.b = this.a = null
};
v(iq, Lp);
var jq = function(a) {
        var b = new iq;
        b.a = a;
        return b
    },
    kq = function(a) {
        for (var b = P(arguments[0]).body.createControlRange(), c = 0, d = arguments.length; c < d; c++) b.addElement(arguments[c]);
        return jq(b)
    };
h = iq.prototype;
h.clone = function() {
    return kq.apply(this, lq(this))
};
h.Ba = function() {
    return "control"
};
h.dd = function() {
    return this.a || document.body.createControlRange()
};
h.ic = function() {
    return this.a ? this.a.length : 0
};
h.Qb = function(a) {
    a = this.a.item(a);
    return fq(aq(a), void 0)
};
h.Ac = function() {
    return cg.apply(null, lq(this))
};
h.Sa = function() {
    return mq(this)[0]
};
h.$a = function() {
    return 0
};
h.mb = function() {
    var a = mq(this),
        b = rb(a);
    return yb(a, function(a) {
        return Zf(a, b)
    })
};
h.Eb = function() {
    return this.mb().childNodes.length
};
var lq = function(a) {
        if (!a.b && (a.b = [], a.a))
            for (var b = 0; b < a.a.length; b++) a.b.push(a.a.item(b));
        return a.b
    },
    mq = function(a) {
        a.c || (a.c = lq(a).concat(), a.c.sort(function(a, c) {
            return a.sourceIndex - c.sourceIndex
        }));
        return a.c
    };
h = iq.prototype;
h.Cc = function() {
    return !this.a || !this.a.length
};
h.Bc = function() {
    return ""
};
h.Ab = function() {
    return new nq(this)
};
h.select = function() {
    this.a && this.a.select()
};
h.Cd = function() {
    return new oq(this)
};
var oq = function(a) {
    this.a = lq(a)
};
v(oq, Ep);
oq.prototype.H = function() {
    oq.o.H.call(this);
    delete this.a
};
var nq = function(a) {
    this.m = this.c = this.b = null;
    a && (this.m = mq(a), this.b = this.m.shift(), this.c = rb(this.m) || this.b);
    Gp.call(this, this.b, !1, !0)
};
v(nq, Kp);
h = nq.prototype;
h.Dc = function() {
    return this.b
};
h.mc = function() {
    return !this.g && !this.m.length
};
h.next = function() {
    if (this.mc()) throw Gk;
    if (!this.g) {
        var a = this.m.shift();
        Fp(this, a, 1, 1);
        return a
    }
    return nq.o.next.call(this)
};
h.ab = function(a) {
    this.m = a.m;
    this.b = a.b;
    this.c = a.c;
    nq.o.ab.call(this, a)
};
h.clone = function() {
    var a = new nq(null);
    a.ab(this);
    return a
};
var pq = function() {
    this.h = Kl("goog.dom.MultiRange");
    this.a = [];
    this.g = [];
    this.c = this.b = null
};
v(pq, Lp);
h = pq.prototype;
h.clone = function() {
    var a = this.a,
        b = new pq;
    b.a = Db(a);
    return b
};
h.Ba = function() {
    return "mutli"
};
h.dd = function() {
    if (1 < this.a.length) {
        var a = this.h;
        a && a.g("getBrowserRangeObject called on MultiRange with more than 1 range", void 0)
    }
    return this.a[0]
};
h.ic = function() {
    return this.a.length
};
h.Qb = function(a) {
    this.g[a] || (this.g[a] = fq(dq(this.a[a]), void 0));
    return this.g[a]
};
h.Ac = function() {
    if (!this.c) {
        for (var a = [], b = 0, c = this.ic(); b < c; b++) a.push(this.Qb(b).Ac());
        this.c = cg.apply(null, a)
    }
    return this.c
};
var rq = function(a) {
    a.b || (a.b = Jp(a), a.b.sort(function(a, c) {
        var d = a.Sa(),
            e = a.$a(),
            f = c.Sa(),
            g = c.$a();
        return d == f && e == g ? 0 : qq(d, e, f, g) ? 1 : -1
    }));
    return a.b
};
h = pq.prototype;
h.Sa = function() {
    return rq(this)[0].Sa()
};
h.$a = function() {
    return rq(this)[0].$a()
};
h.mb = function() {
    return rb(rq(this)).mb()
};
h.Eb = function() {
    return rb(rq(this)).Eb()
};
h.Cc = function() {
    return 0 == this.a.length || 1 == this.a.length && this.Qb(0).Cc()
};
h.Bc = function() {
    return ub(Jp(this), function(a) {
        return a.Bc()
    }).join("")
};
h.Ab = function() {
    return new sq(this)
};
h.select = function() {
    var a = Ip(Of(P(B ? this.Ac() : this.Sa())));
    a.removeAllRanges();
    for (var b = 0, c = this.ic(); b < c; b++) a.addRange(this.Qb(b).dd())
};
h.Cd = function() {
    return new tq(this)
};
var tq = function(a) {
    this.a = ub(Jp(a), function(a) {
        return a.Cd()
    })
};
v(tq, Ep);
tq.prototype.H = function() {
    tq.o.H.call(this);
    y(this.a, function(a) {
        a.sa()
    });
    delete this.a
};
var sq = function(a) {
    this.w = null;
    this.B = 0;
    a && (this.w = ub(rq(a), function(a) {
        return Ik(a)
    }));
    Gp.call(this, a ? this.Dc() : null, !1, !0)
};
v(sq, Kp);
h = sq.prototype;
h.Dc = function() {
    return this.w[0].Dc()
};
h.mc = function() {
    return this.w[this.B].mc()
};
h.next = function() {
    try {
        var a = this.w[this.B],
            b = a.next();
        Fp(this, a.node, a.h, a.g);
        return b
    } catch (c) {
        if (c !== Gk || this.w.length - 1 == this.B) throw c;
        this.B++;
        return this.next()
    }
};
h.ab = function(a) {
    this.w = Db(a.w);
    sq.o.ab.call(this, a)
};
h.clone = function() {
    var a = new sq(null);
    a.ab(this);
    return a
};
var vq = function() {
        var a = Ip(window);
        return a && uq(a)
    },
    uq = function(a) {
        var b, c = !1;
        if (a.createRange) try {
            b = a.createRange()
        } catch (e) {
            return null
        } else if (a.rangeCount) {
            if (1 < a.rangeCount) {
                c = new pq;
                b = 0;
                for (var d = a.rangeCount; b < d; b++) c.a.push(a.getRangeAt(b));
                return c
            }
            b = a.getRangeAt(0);
            c = qq(a.anchorNode, a.anchorOffset, a.focusNode, a.focusOffset)
        } else return null;
        return (a = b) && a.addElement ? jq(a) : fq(dq(a), c)
    },
    qq = function(a, b, c, d) {
        if (a == c) return d < b;
        var e;
        if (1 == a.nodeType && b)
            if (e = a.childNodes[b]) a = e, b = 0;
            else if (Zf(a,
                c)) return !0;
        if (1 == c.nodeType && d)
            if (e = c.childNodes[d]) c = e, d = 0;
            else if (Zf(c, a)) return !1;
        return 0 < (bg(a, c) || b - d)
    };
var wq = function(a) {
        var b = a.getBoundingClientRect();
        if (B) {
            var c = Gg(a);
            a = Kg(a);
            b.left = c.x;
            b.right = c.x + a.width;
            b.top = c.y;
            b.bottom = c.y + a.height
        }
        return b
    },
    xq = function(a, b) {
        var c = Ff(a),
            d = 0;
        if (ia(b)) d = b;
        else if (B && !F(9)) {
            var e = c.a.selection.createRange();
            if (e) try {
                var f = a.createTextRange(),
                    g = f.duplicate();
                f.moveToBookmark(e.getBookmark());
                g.setEndPoint("EndToStart", f);
                d = g.text.length
            } catch (p) {}
        } else d = a.selectionStart;
        var e = "_h#" + oa(a),
            k = c.j(e);
        k ? c.ce(k) : k = c.b("PRE", {
            id: e
        });
        k.parentNode || c.a.body.appendChild(k);
        var l = [];
        y(a.value, function(a, b, c) {
            l.push(" " == a && b + 1 != c.length && " " == c[b + 1] ? "\u00a0" : a)
        });
        l = l.join("");
        c.appendChild(k, c.a.createTextNode(String(l.substring(0, d))));
        e = c.a.createElement("SPAN");
        e.appendChild(c.a.createTextNode("\u200b"));
        c.appendChild(k, e);
        c.appendChild(k, c.a.createTextNode(String(l.substring(d) + " ")));
        c = Ae(a);
        y(c, function(a) {
            N(k, a)
        });
        var m = "white-space:pre-wrap;word-wrap:pre-wrap;position:absolute;z-index:-9;visibility:hidden;display:block;";
        y("font-family font-size font-weight font-style text-transform text-decoration letter-spacing word-spacing line-height text-align vertical-align direction width height margin-top margin-right margin-bottom margin-left padding-top padding-right padding-bottom padding-left border-top-width border-right-width border-bottom-width border-left-width border-top-style border-right-style border-bottom-style border-left-style overflow-x overflow-y".split(" "),
            function(b) {
                try {
                    var c;
                    (c = yg(a, b) || (a.currentStyle ? a.currentStyle[b] : null) || a.style[b]) && (m += b + ":" + c + ";")
                } catch (d) {}
            });
        k.style.cssText = m;
        c = zg(a, "overflowX");
        k.style.overflowX = c && "visible" != c ? c : "auto";
        c = zg(a, "overflowY");
        k.style.overflowY = c && "visible" != c ? c : "auto";
        k.scrollTop = a.scrollTop;
        k.scrollLeft = a.scrollLeft;
        Bg(k, Eg(a));
        c = wq(e);
        return "INPUT" == a.tagName.toUpperCase() ? new O(c.left, Math.ceil(Gg(a).y + Kg(a).height)) : new O(c.left, Math.ceil(c.bottom))
    };
var yq = function(a, b) {
    ch.call(this, b);
    this.c = a
};
v(yq, ch);
yq.prototype.a = "info";
yq.prototype.l = !1;
var zq = {
    info: "jfk-butterBar-info",
    error: "jfk-butterBar-error",
    warning: "jfk-butterBar-warning",
    promo: "jfk-butterBar-promo"
};
yq.prototype.Ba = function() {
    return this.a
};
var Aq = function(a, b) {
    a.c = b;
    var c = a.j();
    if (c) {
        var d = a.b;
        d.ce(c);
        d.be(c, a.c)
    }
};
yq.prototype.V = function() {
    var a = this.j();
    return null != a && Be(a, "jfk-butterBar-shown")
};
yq.prototype.K = function(a) {
    x(this.Z, "setVisible must only be called after the butter bar is rendered.");
    Fe(this.j(), "jfk-butterBar-shown", a)
};
yq.prototype.Ea = function() {
    this.v = this.b.b("div", "jfk-butterBar");
    x(this.j(), "The DOM element for the butter bar cannot be null.");
    var a = this.j();
    a && (cj(a, "live", "assertive"), cj(a, "atomic", "true"));
    Aq(this, this.c);
    this.l = this.l;
    (a = this.j()) && Fe(a, "jfk-butterBar-mini", this.l);
    a = this.a;
    if (this.Fb()) {
        var b = this.j(),
            c = zq[a];
        De(b, zq[this.a]);
        N(b, c)
    }
    this.a = a
};
var Bq = function(a, b) {
    this.a = a;
    this.b = b || null
};
Bq.prototype.m = function() {
    return this.a
};
Bq.prototype.aa = function() {
    return this.b
};
var Cq = function() {};
v(Cq, gj);
fa(Cq);
h = Cq.prototype;
h.ob = function() {
    return "menuitem"
};
h.wa = function(a) {
    var b = R("SPAN", null, a.m());
    N(b, "gt-is-sg");
    var c = R("DIV", null, "");
    N(c, a.ld ? "gt-is-ld-top" : "gt-is-ld");
    var c = ["DIV", jj(this, a), c],
        d = R("SPAN");
    if (a.P) {
        var e = new Wj(null, new Fk);
        lh(e, d);
        N(e.j(), "gt-is-flag");
        xk(e.j(), a.Jg);
        e.K(!1);
        a.l = e;
        d.id = eh(e)
    }
    c = c.concat([b, d]);
    a.gg && (b = R("DIV", null, a.aa()), c.push(b), N(b, "gt-is-tr"));
    b = R.apply(null, c);
    b.id = eh(a);
    return a.v = b
};
h.Rb = function(a) {
    return "DIV" == a.tagName
};
h.M = function() {
    return "gt-is-itm"
};
h.Ib = function(a, b, c) {
    Cq.o.Ib.call(this, a, b, c);
    2 == b && a.P && a.l && !a.a && a.l.K(c)
};
var Dq = function(a, b, c, d, e, f, g) {
    X.call(this, a.m(), f || Cq.I(), g);
    this.C = a;
    this.P = b;
    this.Jg = c;
    this.ld = d;
    this.gg = e;
    this.a = !1;
    this.ea(1, !1)
};
v(Dq, X);
Dq.prototype.m = function() {
    return this.C.m()
};
Dq.prototype.aa = function() {
    return this.C.aa()
};
Dq.prototype.Ja = function(a) {
    this.P && Zf(this.l.j(), a.target) ? (this.a = !0, this.l.Ja(a)) : Dq.o.Ja.call(this, a)
};
Dq.prototype.za = function(a) {
    this.P && Zf(this.l.j(), a.target) && this.a ? (this.l.za(a), this.a = !1, W(this, 2) || this.l.K(!1)) : (this.P && y(Eq(this.F()), function(a) {
        a.a && (a.a = !1, Oj(a.l, !1));
        a != this && a.l.K(!1)
    }), Dq.o.za.call(this, a))
};
var Fq = function(a) {
    this.b = a || "menu"
};
v(Fq, yo);
fa(Fq);
Fq.prototype.M = function() {
    return "gt-is"
};
Fq.prototype.g = function(a) {
    return Wf(a)
};
Fq.prototype.a = function(a) {
    return "DIV" == a.tagName && a.firstChild && "DIV" == a.firstChild.tagName ? !0 : !1
};
Fq.prototype.l = function() {
    var a = R("DIV", "gt-is"),
        b = R("DIV", "gt-is-ctr");
    a.appendChild(b);
    return a
};
var Iq = function(a, b, c, d, e, f, g, k, l, m, p, w, z, C, G, J, la) {
        this.G = a;
        this.S = b;
        this.b = c;
        this.h = d;
        this.L = !1;
        this.w = e;
        this.O = f;
        this.F = g;
        this.B = k;
        this.yb = l;
        this.ua = m;
        this.J = p;
        this.P = w;
        this.T = z;
        this.fa = 0;
        this.m = {};
        this.$ = C;
        this.zb = G;
        this.R = J;
        this.lb = la;
        a = new yq("");
        lh(a, Gf(document, "gt-bbar"));
        a.K(!1);
        this.C = a;
        this.c = this.a = this.l = "";
        this.A = L.I();
        "async_translate_onebox" == this.G && (this.A.g = "/translate");
        this.g = new Yg(this);
        this.pa = new Aj(this.h.j());
        this.R && Gq(this);
        a = Oe(this.F.a) ? "rtl" : "ltr";
        Hq(this.b.j(), a);
        "webapp" == this.G && (this.P ? N(this.b.j(), "gt-is-tr-on") : N(this.b.j(), "gt-is-tr-off"))
    },
    Gq = function(a) {
        a.g.D(a.pa, "key", a.Ff).D(a.h, "change", a.Gf).D(a.h.j(), "blur", a.na).D(a.b, "action", a.Mf).D(a.F, "srcLanguageUpdated", a.me).D(a.F, "tgtLanguageUpdated", a.me);
        null != a.O && a.g.D(a.O, "change", a.Hf)
    };
h = Iq.prototype;
h.update = function() {
    0 == this.l.length ? this.clear() : (this.fa++, this.m[this.fa] = {}, this.m[this.fa][0] = sa(), Jq(this.yb, this.l, this.a, this.c, u(this.eg, this, this.l, this.a, this.c, this.fa)))
};
h.Hf = function() {
    this.O.a() && this.clear()
};
h.Ff = function(a) {
    if (!this.b.V()) return !1;
    if (27 == a.keyCode) {
        var b = Kq(this.S.a);
        M(this.A, this.G, "is", "0", {
            q: this.l,
            sl: this.a,
            tl: this.c,
            sn: b.length,
            s: b
        });
        this.clear()
    }
    13 == a.keyCode && -1 == this.b.ka && this.clear();
    if (36 == a.keyCode || 35 == a.keyCode) return !1;
    b = this.b.ya(a);
    38 != a.keyCode && 40 != a.keyCode || -1 == this.b.ka || (a = Jo(this.b), this.h.W() != a.m() && (this.L = !0, this.h.a(a.m()), null != this.w && this.w.a("")));
    return b
};
h.Gf = function(a) {
    this.L ? this.L = !1 : this.O && this.O.a() ? this.clear() : Ud(u(this.zg, this, a), 0)
};
h.zg = function() {
    var a = Sa(this.h.W(), "\n") ? "" : Lq(this.h.W()),
        b = this.F.a,
        c = this.F.b;
    if (a != this.l || b != this.a || c != this.c) {
        var d = b != this.a;
        this.l = a;
        this.a = b;
        this.c = c;
        this.update();
        d && (a = Oe(b) ? "rtl" : "ltr", Hq(this.b.j(), a))
    }
};
var Lq = function(a) {
    return a.replace(/[ \n\t\r\f,\.\?!]+/g, " ").replace(/^ /, "")
};
h = Iq.prototype;
h.Mf = function(a) {
    a = a.target.m();
    for (var b = Kq(this.S.a), c = 0, d = 0; d < b.length; d++)
        if (b[d] == a) {
            c = d + 1;
            break
        }
    M(this.A, this.G, "is", "2", {
        q: this.l,
        sl: this.a,
        tl: this.c,
        sn: b.length,
        s: b,
        si: c
    });
    this.l = Lq(a);
    this.h.a(a);
    this.clear()
};
h.me = function() {
    this.clear()
};
h.eg = function(a, b, c, d, e) {
    this.m[d][1] = sa();
    0 == e.length || 0 == this.l.length ? this.clear() : this.a != b || this.c != c ? this.clear() : this.J ? (this.m[d][2] = sa(), Sm(this.ua, this.a, this.c, this.B, e, u(this.fg, this, a, d, e))) : Mq(this, a, ub(e, function(a) {
        return new Bq(a)
    }), d)
};
h.fg = function(a, b, c, d) {
    this.m[b][3] = sa();
    c.length == d.length ? Mq(this, a, ub(c, function(a, b) {
        return new Bq(c[b], d[b])
    }), b) : (Nq(this), Mq(this, a, ub(c, function(a) {
        return new Bq(a)
    }), b))
};
h.clear = function() {
    this.b.K(!1);
    sh(this.b);
    this.S.clear();
    null != this.w && this.w.a("")
};
var Mq = function(a, b, c, d) {
        var e = a.m[d][1] - a.m[d][0];
        if (a.J) var f = a.m[d][3] - a.m[d][2];
        delete a.m[d];
        if (0 != c.length) {
            var g = c;
            c.length > a.T && (g = Fb(c, 0, a.T));
            a.S.clear();
            Eb(a.S.a, g);
            c = {};
            a.J && (c.td = f);
            a.fa > d ? Oq(a, e, b, g, c, !1) : (Oq(a, e, b, g, c, !0), sh(a.b), y(g, function(a, b) {
                    var c = new Dq(a, this.$, this.zb, 0 == b, this.P);
                    this.b.Va(c, !0);
                    var d = "gt-is-si-" + b;
                    hh(c, "gt-is-sg").id = d
                }, a), Pq(a, g[0]), a.lb || (b = Mf(Ff(document).a), d = xq(a.h.j(), a.h.W().length), e = Eg(Yf(a.b.j())), d.x = 0, d.y += b.y, d.y -= e.y, Bg(a.b.j(), d)), a.$ && Qq(a),
                a.b.K(!0), a.P && (b = Oe(a.F.a), d = Oe(a.F.b), b != d && Rq(a.b, d ? "rtl" : "ltr")))
        }
    },
    Pq = function(a, b) {
        if (a.w) {
            var c = a.h.W();
            0 == b.m().lastIndexOf(c, 0) ? a.w.a(b.m()) : a.w.a(c)
        }
    },
    Qq = function(a) {
        var b = Eq(a.b);
        y(b, function(a) {
            a.l && I(a.l, "action", this.ba, !1, this)
        }, a)
    };
Iq.prototype.ba = function(a) {
    var b = Eq(this.b);
    y(b, function(c, d) {
        if (c.l == a.target) {
            var e = R("SPAN", null, (window.MSG_SUGGESTION_FLAGGED || "").replace("%1$s", c.m())),
                f = R("SPAN", null, " "),
                g = R("A", {
                    href: "javascript:;"
                }, window.MSG_DISMISS || ""),
                e = R("DIV", null, e, f, g);
            Aq(this.C, e);
            this.C.K(!0);
            I(g, "click", this.aa, !1, this);
            Sq(this, d + 1, b)
        }
    }, this)
};
Iq.prototype.aa = function() {
    this.C.K(!1)
};
Iq.prototype.na = function() {
    this.b && this.b.K(!1);
    this.w && this.w.a("")
};
var Sq = function(a, b, c) {
        c = ub(c, function(a) {
            return a.m()
        });
        M(a.A, a.G, "is", "3", {
            q: a.l,
            sl: a.a,
            tl: a.c,
            sn: c.length,
            s: c,
            si: b
        })
    },
    Kq = function(a) {
        return a ? ub(a, function(a) {
            return a ? a.m() : ""
        }) : []
    },
    Tq = function(a) {
        if (!a) return [];
        a = ub(a, function(a) {
            return a ? a.aa() : ""
        });
        return tb(a, function(a) {
            return null != a
        })
    },
    Oq = function(a, b, c, d, e, f) {
        d = Kq(d);
        b = {
            q: c,
            sl: a.a,
            tl: a.c,
            sd: b,
            sn: d.length,
            s: d
        };
        for (var g in e) b[g] = e[g];
        M(a.A, a.G, "is", f ? "1" : "7", b)
    },
    Nq = function(a) {
        var b = a.S.a,
            c = Kq(b),
            b = Tq(b);
        M(a.A, a.G, "is", "6", {
            q: a.l,
            sl: a.a,
            tl: a.c,
            sn: c.length,
            s: c,
            tn: b.length,
            st: b
        })
    };
var Uq = function(a, b, c, d, e, f) {
    this.m = a;
    this.a = b;
    this.g = c;
    this.A = d;
    this.fa = e;
    this.G = f;
    this.b = "";
    this.c = new ak(this.O, 300, this);
    this.l = 0;
    this.F = null;
    this.w = !1;
    this.h = L.I();
    this.g && (this.F = new Wn(this.g), I(this.F, "action", this.S, !1, this));
    I(this.m, "change", this.B, !1, this);
    ck(this.c, void 0)
};
Uq.prototype.B = function(a) {
    var b = "";
    a.m && (b = a.m);
    "paste" == b && (this.l++, $d(this.h, "pc", 1, "accumulate"));
    ck(this.c, void 0)
};
Uq.prototype.O = function() {
    if (this.a) {
        bk(this.c);
        var a = Ha(this.m.W());
        if (a != this.b)
            if (this.G && this.G()) ck(this.c, 300);
            else if (!(2E3 < Ia(a).length && 0 == this.l)) {
            this.l = 0;
            var b = a.substring(0, this.b.length) == this.b;
            (a = this.b.substring(0, a.length) == a) || 0 != this.b.length && b && !this.w ? $d(this.h, "otf", "2") : $d(this.h, "otf", "1");
            this.w = a;
            this.fa()
        }
    }
};
Uq.prototype.reset = function(a) {
    bk(this.c);
    this.b = Ha(this.m.W());
    a || (this.w = !1)
};
Uq.prototype.S = function(a) {
    a.preventDefault();
    this.a = !this.a;
    this.g && (this.g.innerHTML = this.a ? msg_disable_otf : msg_enable_otf);
    if (this.A) {
        a = this.A;
        var b = this.a;
        b != a.R && ((a.R = b) ? Gq(a) : $g(a.g))
    }
    Yd(this.h, "/translate/uc?ua=eotf&uav=" + (this.a ? 1 : 0))
};
var Vq = function() {
    var a;
    return fc ? (a = /Windows NT ([0-9.]+)/, (a = a.exec(Sb)) ? a[1] : "0") : ec ? (a = /10[_.][0-9_.]+/, (a = a.exec(Sb)) ? a[0].replace(/_/g, ".") : "10") : gc ? (a = /Android\s+([^\);]+)(\)|;)/, (a = a.exec(Sb)) ? a[1] : "") : hc || ic || jc ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/, (a = a.exec(Sb)) ? a[1].replace(/_/g, ".") : "") : ""
}();
var Wq = function() {},
    Xq = function(a) {
        var b = R("span");
        b.style.color = "transparent";
        b.style.background = "transparent";
        b.style.top = "-1000px";
        b.style.left = "-1000px";
        b.style.position = "absolute";
        document.body.appendChild(b);
        T(b, a);
        a = b.offsetWidth;
        S(b);
        return a
    };
fa(Wq);
var Yq = function() {
    Wq.I()
};
fa(Yq);
var Zq = function(a) {
    var b = Xq(a);
    a = Xq(a.substr(0, 1));
    return b != a
};
var $q = function(a) {
    this.b = Ng("");
    this.a = (r(a) ? a.join(",") : a) + "{font-family:%FONT%arial,sans-serif!important}"
};
$q.prototype.set = function(a) {
    a = "" == a ? "" : this.a.replace("%FONT%", '"' + a + '",');
    Mg(this.b, sg(a))
};
var ar = function() {
    Yq.I();
    this.a = {
        am: Xq("\u1288") == Xq("\u1290"),
        bn: Zq("\u09a5\u09cd"),
        km: Zq("\u1780\u17d1"),
        lo: Zq("\u0e81\u0ec8"),
        ml: Zq("\u0d15\u0d4d"),
        my: Zq("\u1001\u1039\u1010"),
        ps: !0,
        sd: !0,
        si: Zq("\u0da5\u0dca"),
        ta: Zq("\u0ba4\u0bcd") || Xq("\u0bb1\u0bc6\u0bbe") + Xq("\u0bb1") != Xq("\u0bb1\u0bc6") + Xq("\u0bb1\u0bbe")
    }
};
fa(ar);
var br = {
        "Noto Sans Ethiopic": "notosansethiopic",
        "Noto Naskh Arabic": "notonaskharabic",
        "Noto Sans Malayalam": "notosansmalayalam",
        "Noto Sans Myanmar": "notosansmyanmar",
        "Noto Sans Sinhala": "notosanssinhala"
    },
    cr = {
        Dhyana: Le || $b || Je || Ie || He
    },
    dr = {
        lo: fc && 0 <= ab(Vq, "6.0")
    },
    er = {
        am: "Noto Sans Ethiopic",
        bn: "Lohit Bengali",
        lo: "Dhyana",
        km: "Nokora",
        ml: "Noto Sans Malayalam",
        my: "Noto Sans Myanmar",
        ps: "Noto Naskh Arabic",
        sd: "Noto Naskh Arabic",
        si: "Noto Sans Sinhala",
        ta: "Lohit Tamil"
    },
    fr = function() {
        this.a = {};
        ar.I()
    };
fa(fr);
var jr = function() {
        this.h = ar.I();
        this.b = fr.I();
        this.a = new $q(gr);
        this.c = new $q(hr);
        this.g = new $q(ir)
    },
    gr = ["body", "#gb"],
    hr = "#source .gt-hl-layer .gt-baf-translations .round-trip-content .vk-cap .vk-t .orig".split(" "),
    ir = "#result_box .gt-baf-word .gt-baf-word-clickable .alt-menu .gt-ex-translate #alt-input-text .text-wrap".split(" "),
    kr = function(a, b, c) {
        a: {
            var d = dr[c],
                e = a.h.a[c];
            if ((null == d || !d) && null != e && e && (c = er[c], null != c && (d = cr[c], null == d || !d))) break a;c = ""
        }
        a = a.b;
        if ("" != c && null == a.a[c]) {
            a = a.a;
            var e =
                d = c,
                f = new nm;
            null != br[e] ? f.h = "/earlyaccess/" + br[e] + ".css" : (f.h = "/css", f.a.set("family", e));
            a[d] = Ng("@import url(//fonts.googleapis.com" + f.toString() + ");")
        }
        b.set(c)
    },
    lr = function(a) {
        kr(a, a.a, DATA.DisplayLanguage)
    },
    mr = function(a, b) {
        kr(a, a.c, b)
    },
    nr = function(a, b) {
        kr(a, a.g, b)
    };
var or = function(a, b) {
    var c = "ex";
    null != b && b && (c = "m" + c);
    Xm.call(this, a, c, MSG_EXAMPLES_OF, MSG_EXAMPLES);
    this.a = new Ah;
    this.L = this.C = "ltr"
};
v(or, Xm);
or.prototype.update = function(a, b, c, d) {
    or.o.update.call(this, a, b, c, d);
    Tf(this.m);
    this.a = (a = d.X[13]) ? new Ah(a) : Li;
    if (0 == V(this.a.a, 0)) return !1;
    this.K(!0);
    3 <= V(this.a.a, 0) && (a = MSG_N_MORE_EXAMPLES_LABEL.replace("%1$s", V(this.a.a, 0) - 1), Zm(this, a, MSG_FEWER_EXAMPLES_LABEL));
    this.C = Oe(this.c) ? "rtl" : "ltr";
    this.L = Oe(this.l) ? "rtl" : "ltr";
    for (a = 0; a < V(this.a.a, 0); ++a) {
        b = 0 == a || 1 == a && 2 == V(this.a.a, 0);
        var e;
        c = a;
        e = new zh(th(this.a.a, 0)[c]);
        c = e.a[0];
        d = e.a[1];
        e = e.a[2];
        c = Yk(ql, {
            pg: this.C,
            rg: null != c ? c : "",
            Sf: null != e ? e : "",
            Tf: null != d ? d : "",
            Md: this.L,
            Eg: MSG_MT_FROM_GOOGLE
        });
        b = $m(c, b);
        this.m.appendChild(b)
    }
    return !0
};
or.prototype.ae = function() {
    var a = {};
    a.total = V(this.a.a, 0);
    return a
};
var pr = function() {
    return !(A("iPad") || A("Android") && !A("Mobile") || A("Silk")) && (A("iPod") || A("iPhone") || A("Android") || A("IEMobile"))
};
var qr = function(a, b) {
    for (var c = [a], d = b.length - 1; 0 <= d; --d) c.push(typeof b[d], b[d]);
    return c.join("\x0B")
};
var rr = function(a, b) {
    H.call(this, "navigate");
    this.G = a;
    this.w = b
};
v(rr, H);
var xr = function(a, b, c, d) {
    K.call(this);
    if (a && !b) throw Error("Can't use invisible history without providing a blank page.");
    var e;
    if (c) e = c;
    else {
        e = "history_state" + sr;
        var f = tf("input", {
            type: "text",
            name: e,
            id: e,
            style: Se("display:none")
        });
        document.write(lf(f));
        e = Gf(document, e)
    }
    this.m = e;
    this.a = c ? Of(P(c)) : window;
    this.F = b;
    B && !b && (this.F = "https" == window.location.protocol ? hf(Re(Se("https:///"))) : hf(Re(Se('javascript:""'))));
    this.b = new Qd(150);
    yc(this, ra(zc, this.b));
    this.c = !a;
    this.g = new Yg(this);
    if (a || tr) {
        var g;
        if (d) g = d;
        else {
            a = "history_iframe" + sr;
            d = this.F;
            b = {
                id: a,
                style: Se("display:none"),
                sandbox: void 0
            };
            d && gf(d);
            c = {};
            c.src = d || null;
            c.srcdoc = null;
            d = {
                sandbox: ""
            };
            e = {};
            for (g in c) x(g.toLowerCase() == g, "Must be lower case"), e[g] = c[g];
            for (g in d) x(g.toLowerCase() == g, "Must be lower case"), e[g] = d[g];
            for (g in b) {
                f = g.toLowerCase();
                if (f in c) throw Error('Cannot override "' + f + '" attribute, got "' + g + '" with value "' + b[g] + '"');
                f in d && delete e[f];
                e[g] = b[g]
            }
            g = sf("iframe", e, void 0);
            document.write(lf(g));
            g = Gf(document, a)
        }
        this.A =
            g;
        this.J = !0
    }
    tr && (this.g.D(this.a, "load", this.Yf), this.C = this.B = !1);
    this.c ? ur(this, vr(this), !0) : wr(this, this.m.value);
    sr++
};
v(xr, K);
xr.prototype.w = !1;
xr.prototype.l = !1;
xr.prototype.h = null;
var yr = function(a, b) {
        var c = b || qr;
        return function() {
            var b = this || n,
                b = b.closure_memoize_cache_ || (b.closure_memoize_cache_ = {}),
                e = c(oa(a), arguments);
            return b.hasOwnProperty(e) ? b[e] : b[e] = a.apply(this, arguments)
        }
    }(function() {
        return B ? sc(8) : "onhashchange" in n
    }),
    tr = B && !sc(8);
h = xr.prototype;
h.Yb = null;
h.H = function() {
    xr.o.H.call(this);
    this.g.sa();
    this.ia(!1)
};
h.ia = function(a) {
    if (a != this.w)
        if (tr && !this.B) this.C = a;
        else if (a)
        if ($b ? this.g.D(this.a.document, zr, this.L) : cc && this.g.D(this.a, "pageshow", this.$f), yr() && this.c) this.g.D(this.a, "hashchange", this.Zf), this.w = !0, this.dispatchEvent(new rr(vr(this), !1));
        else {
            if (!B || pr() || this.B) this.g.D(this.b, "tick", u(this.O, this, !0)), this.w = !0, tr || (this.h = vr(this), this.dispatchEvent(new rr(vr(this), !1))), Sd(this.b)
        }
    else this.w = !1, $g(this.g), Rd(this.b)
};
h.Yf = function() {
    this.B = !0;
    this.m.value && wr(this, this.m.value, !0);
    this.ia(this.C)
};
h.$f = function(a) {
    a.a.persisted && (this.ia(!1), this.ia(!0))
};
h.Zf = function() {
    var a = Ar(this.a);
    a != this.h && Br(this, a, !0)
};
var vr = function(a) {
        return null != a.Yb ? a.Yb : a.c ? Ar(a.a) : Cr(a) || ""
    },
    Ar = function(a) {
        a = a.location.href;
        var b = a.indexOf("#");
        return 0 > b ? "" : a.substring(b + 1)
    },
    Dr = function(a, b, c) {
        vr(a) != b && (a.c ? (ur(a, b, c), yr() || B && !pr() && wr(a, b, c, void 0), a.w && a.O(!1)) : (wr(a, b, c), a.Yb = a.h = a.m.value = b, a.dispatchEvent(new rr(b, !1))))
    },
    ur = function(a, b, c) {
        a = a.a.location;
        var d = a.href.split("#")[0],
            e = Sa(a.href, "#");
        if (tr || e || b) d += "#" + b;
        d != a.href && (c ? a.replace(d) : a.href = d)
    },
    wr = function(a, b, c, d) {
        if (a.J || b != Cr(a))
            if (a.J = !1, b = Ia(b),
                B) {
                var e = dg(a.A);
                e.open("text/html", c ? "replace" : void 0);
                c = uf(tf("title", {}, d || a.a.document.title), tf("body", {}, b));
                e.write(lf(c));
                e.close()
            } else if (ob(a.F, ff, "this.iframeSrc_ must be set on calls to setIframeToken_"), e = gf(a.F) + "#" + b, a = a.A.contentWindow) c ? a.location.replace(e) : a.location.href = e
    },
    Cr = function(a) {
        if (B) return a = dg(a.A), a.body ? Ja(a.body.innerHTML) : null;
        var b = a.A.contentWindow;
        if (b) {
            var c;
            try {
                c = Ja(Ar(b))
            } catch (d) {
                return a.l || (1 != a.l && Td(a.b, 1E4), a.l = !0), null
            }
            a.l && (0 != a.l && Td(a.b, 150), a.l = !1);
            return c || null
        }
        return null
    };
xr.prototype.O = function(a) {
    if (this.c) {
        var b = Ar(this.a);
        b != this.h && Br(this, b, a)
    }
    if (!this.c || tr)
        if (b = Cr(this) || "", null == this.Yb || b == this.Yb) this.Yb = null, b != this.h && Br(this, b, a)
};
var Br = function(a, b, c) {
    a.h = a.m.value = b;
    a.c ? (tr && wr(a, b), ur(a, b)) : wr(a, b);
    a.dispatchEvent(new rr(vr(a), c))
};
xr.prototype.L = function() {
    Rd(this.b);
    Sd(this.b)
};
var zr = ["mousedown", "keydown", "mousemove"],
    sr = 0;
var Er = function() {
    this.a = new xr;
    this.b = null;
    this.c = 0;
    I(this.a, "navigate", this.g, !1, this)
};
Er.prototype.g = function(a) {
    a.w && Fr(this, a.G)
};
var Fr = function(a, b) {
    var c = Ja(b),
        d = c.split(/[|\/]/, 2);
    if (2 == d.length && (d.push(c.substring(d[0].length + d[1].length + 2)), !Fa(Ya(d[0])) && !Fa(Ya(d[1])))) {
        a.b.translate(d[0], d[1], d[2], "bh");
        return
    }
    a.b.translate("", "", "", "bh")
};
var Gr = function(a, b) {
    this.h = L.I();
    this.g = b;
    this.b = this.c = this.a = 0;
    this.Bb = new ak(this.ue, 3E3, this);
    I(a, "copy", this.zf, !1, this);
    I(a, "mouseup", this.Bg, !1, this);
    I(a, "contextmenu", this.yf, !1, this);
    I(a, "click", this.Ag, !1, this)
};
h = Gr.prototype;
h.zf = function() {
    bk(this.Bb);
    this.ue(1)
};
h.ue = function(a) {
    var b = 0;
    a && (b = a);
    this.h.log(this.g, {
        cpy: b,
        clk: this.a,
        sel: this.c,
        ctx: this.b
    });
    this.b = this.c = this.a = 0
};
h.Bg = function() {
    var a = vq();
    null != a && !a.Cc() && 0 < a.Bc().length && (this.c++, ck(this.Bb))
};
h.Ag = function(a) {
    Ec(a) && (this.a++, ck(this.Bb))
};
h.yf = function() {
    this.b++;
    ck(this.Bb)
};
var Hr = function(a) {
        this.a = a;
        this.c = this.h = this.w = this.m = this.l = this.g = null;
        this.b = L.I()
    },
    Kr = function(a, b) {
        b.Fe && (a.g = b.Fe, Ir(a, a.g, a.B), Jr(a, a.a, "srcLanguageUpdated", a.A), Jr(a, a.a, "detectSrcUpdated", a.F));
        b.Ie && (a.l = b.Ie, Ir(a, a.l, a.C), Jr(a, a.a, "tgtLanguageUpdated", a.fa));
        b.qg && (a.m = b.qg, Jr(a, a.m, "click", a.S), a.m.a(a.a, "staticSrcSuggestionUpdated"), a.m.b(a.a));
        b.wg && (a.w = b.wg, Jr(a, a.w, "click", a.J), a.w.a(a.a, "staticTgtSuggestionUpdated"));
        b.tc && (a.h = b.tc, Jr(a, a.h, "action", a.O));
        b.Le && (a.c = b.Le, Jr(a,
            new Aj(a.c.j()), "key", a.G), Jr(a, new bo(a.c.j()), "paste", a.G))
    },
    Jr = function(a, b, c, d) {
        b && I(b, c, d, !1, a)
    };
Hr.prototype.B = function() {
    Lr(this, this.g, this.a.g, wo(this.a.C), "slc")
};
Hr.prototype.C = function() {
    Lr(this, this.l, this.a.h, wo(this.a.L.a), "tlc", !0)
};
var Lr = function(a, b, c, d, e, f) {
    var g = Mr(b),
        k = Nr(a, g),
        l = Or(a, f);
    c.call(a.a, g, 4);
    b.yd && (k.ct = b.yd);
    "" != d && (k.emphlang = d);
    b = wo(a.a.F.a);
    f || "" == b || (k.bslang = b);
    "" != l && (k.sugglang = l);
    a.b.log(e, k)
};
Hr.prototype.A = function(a) {
    if (Mr(this.g) != a.data) {
        var b = this.g,
            c = a.data;
        "SELECT" == b.tagName ? b.value = c : b.hg(c)
    }
    Pr(this);
    a.Qd && (a = Nr(this), this.b.log("slauto", a))
};
Hr.prototype.F = function() {
    Pr(this)
};
Hr.prototype.fa = function(a) {
    if (Mr(this.l) != a.data) {
        var b = this.l,
            c = a.data;
        "SELECT" == b.tagName ? b.value = c : b.hg(c)
    }
    Pr(this);
    a.Qd && (a = Nr(this), this.b.log("tlauto", a))
};
var Mr = function(a) {
        return "SELECT" == a.tagName ? a.value : a.W()
    },
    Ir = function(a, b, c) {
        "SELECT" == b.tagName ? Jr(a, b, "change", c) : Jr(a, b, "action", c)
    };
Hr.prototype.S = function(a) {
    if (a.data != this.a.a) {
        var b = this.a.g,
            c = Or(this),
            d = Nr(this, a.data);
        b.call(this.a, a.data, 3);
        d.sugglang = c;
        this.b.log("ssuggclick", d)
    }
};
Hr.prototype.J = function(a) {
    if (a.data != this.a.b) {
        var b = this.a.h,
            c = Or(this, !0),
            d = Nr(this, a.data);
        b.call(this.a, a.data, 3);
        d.sugglang = c;
        this.b.log("tsuggclick", d)
    }
};
Hr.prototype.O = function() {
    var a = Nr(this),
        b = this.a.a,
        c = this.a.b,
        d = b;
    if ("auto" == b && (d = this.a.c, !d)) return;
    this.b.log("swapclick", a);
    a = this.a;
    a.g(c, 5);
    a.h(d, 5);
    a.dispatchEvent("languageSelected");
    $d(this.b, "swap", 1, "accumulate")
};
Hr.prototype.G = function(a) {
    if ("paste" == a.type || 2 > Ha(this.c.W()).length) this.a.m = !1
};
var Nr = function(a, b) {
        var c = {};
        c.sl = a.a.a;
        c.tl = a.a.b;
        b && (c.val = b);
        var d = a.a.c;
        d && (c.dsl = d);
        a.c && (c.ql = Ha(a.c.W()).length);
        return c
    },
    Or = function(a, b) {
        return b ? wo(a.a.B.a) : wo(a.a.A.a)
    },
    Pr = function(a) {
        if (a.h) {
            var b = a.a.a;
            "auto" == b && (b = a.a.c);
            "zh-CN" == b && "zh-TW" == a.a.l && (b = "zh-TW");
            "" == b || b == a.a.b ? a.h.ia(!1) : a.h.ia(!0)
        }
    };
var Qr = function(a, b, c, d, e) {
    ch.call(this);
    this.P = a;
    this.$ = b;
    this.ba = c;
    this.aa = d || "";
    this.na = e || "";
    this.l = this.a = this.A = "";
    this.c = !1;
    this.J = !0;
    this.C = [];
    this.B = "";
    this.R = !1;
    this.L = new ak(this.T, 1E3, this);
    this.m = L.I()
};
v(Qr, ch);
Qr.prototype.K = function(a) {
    a || (this.R = this.c = !1, bk(this.L));
    U(this.j(), a)
};
Qr.prototype.V = function() {
    return "none" != this.j().style.display
};
var Rr = function(a, b) {
    if ("" == b.ec) a.K(!1);
    else {
        if (b.Jd) {
            if (a.R) return
        } else a.R = !0;
        a.B = b.Jd || "";
        a.A = b.Ae;
        a.a = b.Ge;
        a.l = b.ec;
        var c = b.cf || Ra(b.ec),
            d;
        d = b.Jd ? a.$ : b.Wd && a.J ? a.aa : a.ba;
        a.c = b.Wd && a.J;
        if (a.c && zb(b.cd, 6)) {
            if (a.K(!1), T(Gf(document, "src-translit"), a.l), b.result)
                for (var e = 0; e < V(b.result.X, 0); e++) Mi(b.result, e).kb[3] = 0 == e ? a.l : ""
        } else a.c ? (e = a.j(), De(e, "gt-spell-correct-message"), N(e, "gt-related-suggest-message")) : (e = a.j(), De(e, "gt-related-suggest-message"), N(e, "gt-spell-correct-message")), a.K(!0);
        T(a.j(), d + " ");
        a.C = b.cd;
        d = R("a", {
            tabindex: 0,
            href: "javascript:void(0)"
        });
        wg(d, {
            direction: Oe(a.a) ? "rtl" : "ltr"
        });
        wg(d, {
            "text-decoration": "none"
        });
        d.innerHTML = c;
        I(d, "click", a.pa, !1, a);
        a.j().appendChild(d);
        a.c && !zb(b.cd, 6) && (c = R("div"), T(c, a.na + " "), d = R("a", {
            tabindex: 1,
            href: "javascript:void(0)"
        }), I(d, "click", a.ua, !1, a), T(d, a.A), c.appendChild(d), a.j().appendChild(c), N(c, "gt-revert-correct-message"));
        ck(a.L)
    }
};
Qr.prototype.T = function() {
    var a = {};
    a.orig = this.A;
    a.sl = this.a;
    this.c && (a.autocorrect = this.c);
    this.B ? (a.corrlang = this.B, this.m.log("langidshow", a)) : (a.corr = this.l, a.corrtype = this.C, this.m.log("spell", a))
};
Qr.prototype.pa = function() {
    var a = this.A;
    64 < a.length && (a = a.substr(0, 64));
    $d(this.m, "orig", a);
    this.B ? ($d(this.m, "psl", this.a), this.P.translate(this.B, "", this.A, "tws_lsugg")) : ($d(this.m, "corrtype", this.C), this.c ? this.P.translate("", "", this.l, "tws_confirm") : this.P.translate("", "", this.l, "tws_spell"));
    a = this.L;
    0 != a.U && (bk(a), a.b());
    this.K(!1)
};
Qr.prototype.ua = function() {
    var a = this.l;
    64 < a.length && (a = a.substr(0, 64));
    $d(this.m, "corr", a);
    $d(this.m, "corrtype", this.C);
    this.J = !1;
    this.P.translate("", "", this.A, "tws_revert");
    a = this.L;
    0 != a.U && (bk(a), a.b());
    this.K(!1)
};
var Sr = {
    ascii_tlds: "AC AD AE AERO AF AG AI AL AM AN AO AQ AR ARPA AS ASIA AT AU AW AX AZ BA BB BD BE BF BG BH BI BIZ BJ BM BN BO BR BS BT BV BW BY BZ CA CAT CC CD CF CG CH CI CK CL CM CN CO COM COOP CR CU CV CX CY CZ DE DJ DK DM DO DZ EC EDU EE EG ER ES ET EU FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GOV GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN INFO INT IO IQ IR IS IT JE JM JO JOBS JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MG MH MIL MK ML MM MN MO MOBI MP MQ MR MS MT MU MUSEUM MV MW MX MY MZ NA NAME NC NE NET NF NG NI NL NO NP NR NU NZ OM ORG PA PE PF PG PH PK PL PM PN PR PRO PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR ST SU SV SY SZ TC TD TEL TF TG TH TJ TK TL TM TN TO TP TR TRAVEL TT TV TW TZ UA UG UK US UY UZ VA VC VE VG VI VN VU WF WS XN--0ZWM56D XN--11B5BS3A9AJ6G XN--80AKHBYKNJ4F XN--9T4B11YI5A XN--DEBA0AD XN--FIQS8S XN--FIQZ9S XN--FZC2C9E2C XN--G6W251D XN--HGBK6AJ7F53BBA XN--HLCJ6AYA9ESC7A XN--J6W193G XN--JXALPDLP XN--KGBECHTV XN--KPRW13D XN--KPRY57D XN--MGBAAM7A8H XN--MGBAYH7GPA XN--MGBERP4A5D4AR XN--O3CW4H XN--P1AI XN--PGBS0DH XN--WGBH1C XN--XKC2AL3HYE2A XN--YGBI2AMMX XN--ZCKZAH YE YT ZA ZM ZW".split(" "),
    unicode_tlds: "\u6d4b\u8bd5 \u092a\u0930\u0940\u0915\u094d\u0937\u093e \u0438\u0441\u043f\u044b\u0442\u0430\u043d\u0438\u0435 \ud14c\uc2a4\ud2b8 \u05d8\u05e2\u05e1\u05d8 \u4e2d\u56fd \u4e2d\u570b \u0dbd\u0d82\u0d9a\u0dcf \u6e2c\u8a66 \u0622\u0632\u0645\u0627\u06cc\u0634\u06cc \u0baa\u0bb0\u0bbf\u0b9f\u0bcd\u0b9a\u0bc8 \u9999\u6e2f \u03b4\u03bf\u03ba\u03b9\u03bc\u03ae \u0625\u062e\u062a\u0628\u0627\u0631 \u53f0\u6e7e \u53f0\u7063 \u0627\u0645\u0627\u0631\u0627\u062a \u0627\u0644\u0627\u0631\u062f\u0646 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629 \u0e44\u0e17\u0e22 \u0440\u0444 \u062a\u0648\u0646\u0633 \u0645\u0635\u0631 \u0b87\u0bb2\u0b99\u0bcd\u0b95\u0bc8 \u0641\u0644\u0633\u0637\u064a\u0646 \u30c6\u30b9\u30c8".split(" ")
};
var Tr, Ur = {
        http: 1,
        https: 1,
        ftp: 1
    },
    Vr = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,
    Wr = function(a, b) {
        var c;
        try {
            c = a instanceof nm ? a.clone() : new nm(a, void 0)
        } catch (m) {
            return !1
        }
        var d;
        if (!(d = c.b && !Ur[c.b.toLowerCase()] || !c.c)) {
            c = c.c;
            var e;
            a: {
                d = c.split(".");
                for (var f = 0; f < d.length; f++)
                    if (!d[f]) {
                        e = !1;
                        break a
                    }
                if (1 < d.length) {
                    d = d[d.length - 1].toLowerCase();
                    if (!Tr) {
                        try {
                            e = Sr
                        } catch (m) {
                            throw Error("Variable CFG_twsfe_likelyurl_module_file has not been loaded. This is probaly due the configuration data not being properly included.");
                        }
                        for (var f = {}, g = e.ascii_tlds, k = 0; k < g.length; k++) {
                            var l = g[k];
                            f[l.toLowerCase()] = 1
                        }
                        e = e.unicode_tlds;
                        for (k = 0; k < e.length; k++) l = e[k], f[l.toLowerCase()] = 1;
                        Tr = f
                    }
                    e = !!Tr[d]
                } else e = !b
            }
            if (!e) a: if (c = c.match(Vr)) {
                for (e = 1; 4 >= e; e++)
                    if (255 < parseInt(c[e], 10)) {
                        e = !1;
                        break a
                    }
                e = !0
            } else e = !1;
            d = !e
        }
        return d ? !1 : !0
    },
    Xr = function() {
        var a = (new nm(window.location.href)).a,
            b = a.get("e"),
            a = a.get("expid"),
            c = "";
        b && (c += "e=" + b);
        "ForceExperiment" == b && a && (c += "&expid=" + a);
        return c
    };
var Yr = 0,
    Zr = /^[a-zA-Z0-9_\-]*$/,
    $r = function(a) {
        x(a.match(Zr), "ControlType.create contains invalid characters" + a);
        return a + "+" + Yr++
    };
var as = function(a) {
    this.a = [];
    this.name = a
};
as.prototype.b = Kl("wireless.events.browser.Dispatcher");
as.prototype.dispatchEvent = function(a, b, c, d) {
    var e = "*" == b.charAt(0),
        f;
    this.handleEvent(a, b, c, d) && (f = !0);
    var g;
    g = (d || "") + this.name + "->";
    for (var k = -1, l;
        (!f || e) && (l = this.a[++k]);) f = l.dispatchEvent(a, b, c, g) || f;
    f || d || (d = this.b) && d.g("Event not handled: " + b + " type: " + (a ? a.type : "none") + " customArg: " + c, void 0);
    return f
};
var bs = function(a, b) {
    as.call(this, b);
    this.h = a;
    this.g = [];
    this.c = {}
};
v(bs, as);
var cs = new bs(void 0, "root");
ca("_e", function(a, b, c) {
    return cs.dispatchEvent(a, b, c)
});
var ds = function(a, b, c) {
    x(b, a.name + " - registerHandler: Missing controlType.");
    x(c, a.name + " - registerHandler: Missing handlerFunc. controlType: " + b);
    x(!a.c[b], a.name + " - registerHandler: Handler already defined. controlType: " + b);
    c = a.g.push(c, a.h) - 2;
    a.c[b] = c
};
bs.prototype.handleEvent = function(a, b, c, d) {
    var e = this.c[b];
    if (ba(e)) {
        if (El.value >= Hl(this.b).value && ")" != b.slice(-1)) {
            var f = "";
            a && (f = "BrowserType=" + a.type, a.which && (f += " key=" + a.which), f = " (" + f + ")");
            var g = "";
            ba(c) && (g = " customArg: " + c);
            Ml(this.b, (d || "") + this.name + " handling event: " + b + g + f)
        }
        this.g[e].call(this.g[e + 1], a, b, c);
        return !0
    }
};
B || cc || $b && ab(pc, "15.0");
B || cc || $b && ab(pc, "15.0");
"WebKitCSSMatrix" in window && new WebKitCSSMatrix("");
var es = /Mac OS X.+Silk\//;
/iPhone|iPod|iPad/.test(navigator.userAgent) || Sa(navigator.userAgent, "Android") || es.test(navigator.userAgent);
Kl("wireless.events.clickbuster");
bb++;
var fs = /^[\w+/]+[=]{0,2}$/;
var gs = function(a, b, c) {
    a.timeOfStartCall = (new Date).getTime();
    var d = c || n,
        e = d.document,
        f;
    (f = (f = (f = (d || n).document.querySelector("script[nonce]")) && f.getAttribute("nonce")) && fs.test(f) ? f : void 0) && (a.nonce = f);
    if ("help" == a.flow) {
        var g = da("document.location.href", d);
        !a.helpCenterContext && g && (a.helpCenterContext = g.substring(0, 1200));
        g = !0;
        if (b && JSON && JSON.stringify) {
            var k = JSON.stringify(b);
            (g = 1200 >= k.length) && (a.psdJson = k)
        }
        g || (b = {
            invalidPsd: !0
        })
    }
    b = [a, b, c];
    d.GOOGLE_FEEDBACK_START_ARGUMENTS = b;
    c = a.serverUri ||
        "//www.google.com/tools/feedback";
    if (g = d.GOOGLE_FEEDBACK_START) g.apply(d, b);
    else {
        var d = c + "/load.js?",
            l;
        for (l in a) b = a[l], null != b && !ka(b) && (d += encodeURIComponent(l) + "=" + encodeURIComponent(b) + "&");
        a = e.createElement("script");
        f && a.setAttribute("nonce", f);
        a.src = d;
        e.body.appendChild(a)
    }
};
/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
var hs = function(a, b) {
    this.h = [];
    this.S = a;
    this.B = b || null;
    this.g = this.a = !1;
    this.c = void 0;
    this.G = this.F = this.m = !1;
    this.l = 0;
    this.b = null;
    this.w = 0
};
hs.prototype.cancel = function(a) {
    if (this.a) this.c instanceof hs && this.c.cancel();
    else {
        if (this.b) {
            var b = this.b;
            delete this.b;
            a ? b.cancel(a) : (b.w--, 0 >= b.w && b.cancel())
        }
        this.S ? this.S.call(this.B, this) : this.G = !0;
        this.a || is(this, new js)
    }
};
hs.prototype.A = function(a, b) {
    this.m = !1;
    ks(this, a, b)
};
var ks = function(a, b, c) {
        a.a = !0;
        a.c = c;
        a.g = !b;
        ls(a)
    },
    ns = function(a) {
        if (a.a) {
            if (!a.G) throw new ms;
            a.G = !1
        }
    };
hs.prototype.ad = function(a) {
    ns(this);
    os(a);
    ks(this, !0, a)
};
var is = function(a, b) {
        ns(a);
        os(b);
        ks(a, !1, b)
    },
    os = function(a) {
        x(!(a instanceof hs), "An execution sequence may not be initiated with a blocking Deferred.")
    },
    ps = function(a, b, c, d) {
        x(!a.F, "Blocking Deferreds can not be re-used");
        a.h.push([b, c, d]);
        a.a && ls(a)
    };
hs.prototype.then = function(a, b, c) {
    var d, e, f = new zd(function(a, b) {
        d = a;
        e = b
    });
    ps(this, d, function(a) {
        a instanceof js ? f.cancel() : e(a)
    });
    return f.then(a, b, c)
};
vd(hs);
var qs = function(a) {
        return vb(a.h, function(a) {
            return ja(a[1])
        })
    },
    ls = function(a) {
        if (a.l && a.a && qs(a)) {
            var b = a.l,
                c = rs[b];
            c && (n.clearTimeout(c.U), delete rs[b]);
            a.l = 0
        }
        a.b && (a.b.w--, delete a.b);
        for (var b = a.c, d = c = !1; a.h.length && !a.m;) {
            var e = a.h.shift(),
                f = e[0],
                g = e[1],
                e = e[2];
            if (f = a.g ? g : f) try {
                var k = f.call(e || a.B, b);
                ba(k) && (a.g = a.g && (k == b || k instanceof Error), a.c = b = k);
                if (wd(b) || "function" === typeof n.Promise && b instanceof n.Promise) d = !0, a.m = !0
            } catch (l) {
                b = l, a.g = !0, qs(a) || (c = !0)
            }
        }
        a.c = b;
        d && (k = u(a.A, a, !0), d = u(a.A,
            a, !1), b instanceof hs ? (ps(b, k, d), b.F = !0) : b.then(k, d));
        c && (b = new ss(b), rs[b.U] = b, a.l = b.U)
    },
    ms = function() {
        Ba.call(this)
    };
v(ms, Ba);
ms.prototype.message = "Deferred has already fired";
ms.prototype.name = "AlreadyCalledError";
var js = function() {
    Ba.call(this)
};
v(js, Ba);
js.prototype.message = "Deferred was canceled";
js.prototype.name = "CanceledError";
var ss = function(a) {
    this.U = n.setTimeout(u(this.b, this), 0);
    this.a = a
};
ss.prototype.b = function() {
    x(rs[this.U], "Cannot throw an error that is not scheduled.");
    delete rs[this.U];
    throw this.a;
};
var rs = {};
var xs = function(a, b) {
        var c = b || {},
            d = c.document || document,
            e = document.createElement("SCRIPT"),
            f = {
                ib: e,
                vb: void 0
            },
            g = new hs(ts, f),
            k = null,
            l = null != c.timeout ? c.timeout : 5E3;
        0 < l && (k = window.setTimeout(function() {
            us(e, !0);
            is(g, new vs(1, "Timeout reached for loading script " + a))
        }, l), f.vb = k);
        e.onload = e.onreadystatechange = function() {
            e.readyState && "loaded" != e.readyState && "complete" != e.readyState || (us(e, c.Ye || !1, k), g.ad(null))
        };
        e.onerror = function() {
            us(e, !0, k);
            is(g, new vs(0, "Error while loading script " + a))
        };
        f = c.attributes || {};
        Pb(f, {
            type: "text/javascript",
            charset: "UTF-8",
            src: a
        });
        Kf(e, f);
        ws(d).appendChild(e);
        return g
    },
    ws = function(a) {
        var b = a.getElementsByTagName("HEAD");
        return b && 0 != b.length ? b[0] : a.documentElement
    },
    ts = function() {
        if (this && this.ib) {
            var a = this.ib;
            a && "SCRIPT" == a.tagName && us(a, !0, this.vb)
        }
    },
    us = function(a, b, c) {
        null != c && n.clearTimeout(c);
        a.onload = q;
        a.onerror = q;
        a.onreadystatechange = q;
        b && window.setTimeout(function() {
            S(a)
        }, 0)
    },
    vs = function(a, b) {
        var c = "Jsloader error (code #" + a + ")";
        b && (c += ": " + b);
        Ba.call(this, c);
        this.code = a
    };
v(vs, Ba);
var ys = function(a, b) {
        this.b = new nm(a);
        this.a = b ? b : "callback";
        this.vb = 5E3
    },
    zs = 0;
ys.prototype.cancel = function(a) {
    a && (a.Yd && a.Yd.cancel(), a.U && As(a.U, !1))
};
var Bs = function(a, b, c) {
        return function() {
            As(a, !1);
            c && c(b)
        }
    },
    Cs = function(a, b) {
        return function(c) {
            As(a, !0);
            b.apply(void 0, arguments)
        }
    },
    As = function(a, b) {
        var c = "_callbacks___" + a;
        if (n[c])
            if (b) try {
                delete n[c]
            } catch (d) {
                n[c] = void 0
            } else n[c] = q
    };
var Ds = function(a, b, c) {
        this.g = new ys(b);
        this.g.vb = 500;
        this.a = null;
        this.h = 0;
        this.c = !1;
        this.F = L.I();
        this.G = a;
        this.m = c || "translate"
    },
    Jq = function(a, b, c, d, e) {
        Es(a);
        if (0 == b.length || 64 < b.length || "auto" == c) e([]);
        else {
            c = "zh-CN" == c || "zh-TW" == c ? "zh" : c;
            var f = 167 - (sa() - a.h);
            0 > f && (f = 0);
            a.b = Ud(function() {
                if (this.b) {
                    this.b = void 0;
                    var a = c;
                    this.h = sa();
                    var f = {};
                    f.q = b;
                    f.client = "translate_separate_corpus";
                    f.ds = this.m;
                    f.hl = a;
                    f.requiredfields = "tl:" + d;
                    var l = this.g,
                        m = u(this.w, this, b, a, d, e),
                        a = u(this.l, this, "4", b, a, d),
                        f = f ||
                        null,
                        p = "_" + (zs++).toString(36) + sa().toString(36),
                        w = "_callbacks___" + p,
                        z = l.b.clone();
                    if (f)
                        for (var C in f)
                            if (!f.hasOwnProperty || f.hasOwnProperty(C)) {
                                var G = z,
                                    J = C,
                                    la = f[C];
                                r(la) || (la = [String(la)]);
                                Gm(G.a, J, la)
                            }
                    m && (n[w] = Cs(p, m), m = l.a, C = w, r(C) || (C = [String(C)]), Gm(z.a, m, C));
                    l = xs(z.toString(), {
                        timeout: l.vb,
                        Ye: !0
                    });
                    ps(l, null, Bs(p, f, a), void 0);
                    this.a = {
                        U: p,
                        Yd: l
                    }
                }
            }, f, a)
        }
    },
    Es = function(a) {
        a.a && (a.c = !0, a.g.cancel(a.a), a.a = null);
        a.b && (n.clearTimeout(a.b), a.b = void 0)
    };
Ds.prototype.l = function(a, b, c, d, e, f) {
    this.c || (b = {
        q: b,
        sl: c,
        tl: d
    }, e && (b.se = e.substring(0, 64)), f && (b.msg = f.substring(0, 64)), M(this.F, this.G, "is", a, b));
    this.c = !1
};
Ds.prototype.w = function(a, b, c, d, e) {
    try {
        var f = ub(e[1], function(a) {
            return Va(a[0])
        }, this);
        d(f)
    } catch (g) {
        this.l("5", a, b, c, xa(e), g.message)
    }
    this.a = null
};
var Fs = function() {
    this.a = []
};
Fs.prototype.clear = function() {
    this.a = []
};
var Gs = function(a, b, c) {
    Fo.call(this, a || Eo(Fq.I()), b || Fq.I(), c);
    Oo(this, !1)
};
v(Gs, Fo);
Gs.prototype.ya = function(a) {
    return 27 == a.keyCode ? (this.K(!1), a.c(), a.preventDefault(), !0) : Gs.o.ya.call(this, a)
};
var Hq = function(a, b) {
        if ("ltr" == b) var c = "left";
        else if ("rtl" == b) c = "right";
        else return;
        wg(a, "direction", b);
        wg(a, "text-align", c)
    },
    Rq = function(a, b) {
        ub(a.v ? If("gt-is-tr", a.v || a.b.a) : [], function(a) {
            Hq(a, b)
        })
    },
    Eq = function(a) {
        var b = [];
        nh(a, function(a) {
            b.push(a)
        });
        return b
    };
var Hs = function(a) {
    var b = '<div class="gp-footer">' + (a.ff ? '<a class="ft-bigger" href="javascript:void(0);" onclick="_e(event, \'' + a.Qf + "')\">" + Y(a.history) + '</a><a class="ft-bigger" href="javascript:void(0);" onclick="_e(event, \'' + a.tg + "')\">" + Y(a.sg) + "</a>" : "") + (a.ef ? '<br/><br/><div class="footer-bottom">' + kl(a.bf) + '&nbsp;-&nbsp;<a href="/?vi=c">' + Y(a.Xe) + '</a>&nbsp;-&nbsp;<a href="http://translate.google.com/about/intl/en_ALL/">' + Y(a.Re) + '</a>&nbsp;-&nbsp;<a href="http://translate.google.com/community?source=mobile">' +
            Y(a.Vd) + '</a>&nbsp;-&nbsp;<a href="javascript:void(0);" onclick="_e(event, \'' + a.lf + "')\">" + Y(a.kf) + "</a></div>" : '<br/><br/><div class="community-bottom"><a href="http://translate.google.com/community?source=mfooter"><span class="community-icon"></span>' + Y(a.Vd) + "</a></div>") + '<div class="toast" style="display:none">' + Y(a.Dg) + "</div>",
        c;
    c = a.vf;
    var d = a.pc,
        e = a.Qc;
    c = '<div class="ad-panel gsa-promo"><div><span class="gsa-icon-animated"></span></div><div class="ad-panel-title">' + Y(a.wf) + '</div><div class="ad-panel-subtitle">' +
        Y(c) + '</div><div class="ad-panel-buttons"><span class="dismiss-promo">' + Y(d) + '</span><span class="accept-promo">' + Y(e) + "</span></div></div>";
    b += c;
    c = a.pc;
    d = a.Qc;
    c = '<div class="ad-panel at-promo"><div><span class="translate-icon"></span></div><div class="ad-panel-title">' + Y(a.Ve) + '</div><div class="ad-panel-buttons"><span class="dismiss-promo">' + Y(c) + '</span><span class="accept-promo">' + Y(d) + "</span></div></div>";
    b += c;
    c = a.Ue;
    var d = a.Te,
        e = a.pc,
        f = a.Fg;
    a = '<div class="ad-panel at5-promo"><div><span class="tap-to-translate-icon"></span></div><div class="ad-panel-title"><span style="color: red">' +
        Y(a.Vf) + "</span> " + Y(c) + '</div><div class="ad-panel-subtitle">' + Y(d) + '</div><div class="ad-panel-buttons"><span class="dismiss-promo">' + Y(e) + '</span><span class="accept-promo">' + Y(f) + "</span></div></div>";
    return b + a + "</div>"
};
Hs.a = "trans.mobile.widget.footer";
var Is = function(a) {
        return '<div class="starbutton jfk-button-flat" aria-label="' + Y(a.Pc) + '"><div class="jfk-button-img"></div></div>'
    },
    Js = function(a) {
        for (var b = '<div class="' + Y(a.className) + '-selector lang_list"><div class="lang-btn"><div class="arrow jfk-button-img"></div><select class="ls-select ' + Y(a.className) + '" aria-label="' + Y(a.label) + '">', c = a.re, d = c.length, e = 0; e < d; e++) var f = c[e],
            b = b + ('<option value="' + Y(f.Code) + '"' + (f.Code == a.selected ? ' selected="selected"' : "") + ">" + Y(f.Name) + "</option>");
        return b +
            "</select></div></div>"
    },
    Ks = function(a) {
        var b = '<div class="main-header"><div class="ls-wrap">' + Js({
            className: "sl",
            re: a.Rc,
            selected: a.jf,
            label: a.jg
        }) + '<div class="swap-wrap"><div class="swap jfk-button-narrow jfk-button-standard" aria-label="' + Y(a.Gg) + '"><div class="jfk-button-img"></div></div></div>' + Js({
            className: "tl",
            re: a.Sc,
            selected: a.mf,
            label: a.Ig
        }) + '</div><div class="source-wrap">';
        a = '<div class="source-input"><div class="source-header" style="display:none"><div class="src-tts ttsbutton jfk-button-flat" aria-label="' +
            Y(a.D) + '"><div class="jfk-button-img"></div></div><span class="source-lang"></span><div class="clear-wrap"><div class="clear jfk-button-flat" aria-label="' + Y(a.dc) + '"><div class="jfk-button-img"></div></div></div></div><div id="input-wrap"><textarea id="source" class="orig" rows="1" maxlength="200" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea><div class="go-wrap"><div class="go-button"><div class="go jfk-button-action"><div class="jfk-button-img"></div></div></div></div><div id=gt-src-is style="display:none" class="gt-is-mobile gt-is"><div id=gt-src-is-list class=gt-is-ctr></div></div></div><div id="src-translit"></div></div>';
        return b + a + "</div></div>"
    };
Ks.a = "trans.mobile.widget.input";
var Ls = function() {
    return '<div class="toolbar"><div class="backbutton"><div class="jfk-button-img"></div><div class="backbutton-label"></div></div></div>'
};
Ls.a = "trans.mobile.widget.toolbar";
var Ms = function(a) {
    return '<div class="result-dict-wrapper"><div class="result"><div class="result-header"><div class="res-tts ttsbutton ttsbutton-res jfk-button-flat" aria-label="' + jl(a.D) + '"><div class="jfk-button-img"></div></div><span class="target-lang"></span><div class="gt-res-formality"></div>' + Is(a) + '</div><div class="text-wrap"><div class="translation"></div><span class="transliteration-target"></span></div><div class="result-footer"><div class="copybutton jfk-button-flat" aria-label="' +
        jl(a.bd) + '"><div class="jfk-button-img"></div></div>' + (a.gf ? '<div class="result-search"><div class="result-search-icon"></div></div>' : "") + "</div></div></div>"
};
Ms.a = "trans.mobile.widget.result";
var Ns = function(a) {
    return '<div class="item_wrapper">' + Is(a) + '<div class="translate_item" onclick="_e(event, \'' + Y(a.ad) + "', '" + Y(a.id) + '\')"><div class="translated">' + Y(a.ag) + '</div><div class="translation">' + Y(a.jb) + "</div></div></div>"
};
Ns.a = "trans.mobile.widget.translationItem";
var Os = function(a) {
    return '<div class="share-mail">' + (a.Gd ? '<div class="share-button jfk-button-flat" aria-label="' + Y(a.Gd) + '"><span class="share-button-icon"></span></div><div class="share-panel" aria-hidden="true"><div class="share-panel-wrap"><h3>' + Y(a.Gd) + "</h3>" + (a.Nd ? '<div id="not_installed"><span class="warning-icon"></span><span class="warning-msg">' + Y(a.Nd) + "</span></div>" : "") + "<ul>" + (a.hf ? '<li><a href="sms:' + (a.oe ? "&" : "?") + "body=" + Y(a.jb) + '" class="sms"><span class="share-link-icon"></span><span> ' +
            Y(a.lg) + " </span></a></li>" : "") + '<li><a href="mailto:?body=' + Y(a.jb) + '" target="_top" class="email"><span class="share-link-icon"></span><span> ' + Y(a.kg) + " </span></a></li>" + (a.Nd ? '<li><a href="whatsapp://send?text=' + Y(a.jb) + '" class="whatsapp"><span class="share-link-icon"></span><span> WhatsApp </span></a></li>' : "") + '<li><a href="https://twitter.com/intent/tweet?text=' + Y(a.jb) + '" class="twitter"><span class="share-link-icon"></span><span> Twitter </span></a></li><li><a href="https://plus.google.com/share?prefilltext=' +
        Y(a.jb) + '" class="gplus"><span class="share-link-icon"></span><span> Google+ </span></a></li></ul></div></div>' : '<a href="mailto:?body=' + Y(a.jb) + '" target="_top" class="result-mail"><span class="result-mail-icon"></span></a>') + "</div>"
};
Os.a = "trans.mobile.widget.shareMailButton";
var Ps = function() {
    return '<div class="gsaa-btn"><div class="gsaa-btn-img"></div></div>'
};
Ps.a = "trans.mobile.widget.aggressiveGsaAdButton";
var Qs = function(a) {
    return '<div class="gsa-interstitial"><div class="clear-wrap"><div class="clear jfk-button-flat" aria-label="' + Y(a.dc) + '"><div class="jfk-button-img"></div></div></div><div><span class="gsa-icon"></span></div><div class="gsa-int-text">' + Y(a.Je) + (a.Ne ? "<b>" + Y(a.Ne) + "</b>" : "") + Y(a.Ke) + '</div><div class="gsa-int-button">' + Y(a.Rd) + '</div><div class="gsa-int-second-choice">' + Y(a.De) + "</div>"
};
Qs.a = "trans.mobile.widget.iGSAInterstitial";
var Rs = function(a) {
    return '<div class="gsaa-dg"><div class="gsaa-btn-bg"></div><div class="gsaa-dg-title">' + Y(a.title) + '</div><div class="gsaa-dg-content">' + Y(a.content) + '</div><div class="gsaa-dg-footer"><div class="gsaa-dg-no">' + Y(a.pc) + '</div><div class="gsaa-dg-try">' + Y(a.Qc) + "</div></div></div>"
};
Rs.a = "trans.mobile.widget.aggressiveGsaAdDialog";
var Ts = function(a, b, c) {
    this.A = a;
    this.B = b;
    this.b = c;
    this.v = el(Ks, {
        Rc: Ib(DATA.SourceLanguageCodeNameList),
        Sc: Ib(DATA.TargetLanguageCodeNameList),
        jf: this.A,
        mf: this.B,
        jg: DATA.Messages.LABEL_TRANSLATE_FROM,
        Ig: DATA.Messages.LABEL_TRANSLATE_TO_SHORT,
        Gg: DATA.Messages.TOOLTIP_SWAP_LANGUAGES,
        dc: DATA.Messages.CLEAR_TEXT,
        D: DATA.Messages.LISTEN,
        translate: DATA.Messages.TRANSLATE.toUpperCase()
    });
    this.Rc = Q("sl", this.v);
    this.Sc = Q("tl", this.v);
    this.a = new oo("");
    mh(this.a, Q("orig", this.v));
    this.a.j().placeholder = "Touch to type";
    b = this.a;
    b.ke = 120;
    jo(b);
    jo(this.a);
    I(this.a, "change", u(this.O, this, !1), !1, this);
    this.tc = new ul("");
    mh(this.tc, Q("swap", this.v));
    this.g = Q("source-lang", this.v);
    this.w = Q("source-header", this.v);
    T(this.g, Ss(a));
    I(this.b, "srcLanguageUpdated", this.fa, !1, this);
    I(this.b, "detectSrcUpdated", this.S, !1, this);
    this.F = new ul("");
    mh(this.F, Q("go-button", this.v));
    this.c = new ul("");
    mh(this.c, Q("clear", this.v));
    this.c.K(!1);
    I(this.c, "action", this.clear, !1, this);
    this.h = new ul("", void 0, 4);
    this.h.ea(16, !0);
    mh(this.h,
        Q("src-tts", this.v));
    this.C = new Kn(this.h, "&client=webapp&prev=input", !0);
    I(this.a.j(), "focus", this.m, !1, this);
    I(this.a.j(), "touchstart", this.m, !1, this);
    this.L = new Fs;
    this.l = new Gs;
    mh(this.l, Q("gt-is-mobile", this.v));
    this.l.K(!1);
    this.G = new Iq("webapp", this.L, this.l, this.a, null, null, this.b, DATA.DisplayLanguage, new Ds("webapp", INPUT_SUGGESTION_SERVER_URL, INPUT_SUGGESTION_DATASET), new Om("webapp"), Hm, Im, 4, !1, "", !DATA.DisableOtf, !0);
    this.J = L.I()
};
Ts.prototype.j = function() {
    return this.v
};
Ts.prototype.m = function() {
    U(this.w, !0);
    var a = Eg(this.w).y,
        b = document,
        c = b.body,
        b = b.documentElement;
    (new O(c.scrollLeft || b.scrollLeft, c.scrollTop || b.scrollTop)).y > a - 10 || Ud(u(window.scrollTo, window, 0, a - 8), 100, this)
};
Ts.prototype.clear = function() {
    this.a.a("");
    this.a.j().focus();
    $d(this.J, "clearbtn", 1, "accumulate")
};
Ts.prototype.O = function() {
    this.c.K(!!this.a.W())
};
var Us = function(a) {
    var b = a.b.a;
    "auto" == b && (b = a.b.c);
    b && wg(a.a.j(), "direction", Oe(b) ? "rtl" : "ltr")
};
Ts.prototype.fa = function() {
    var a = this.b.a;
    "auto" != a && T(this.g, Ss(a));
    Us(this)
};
Ts.prototype.S = function() {
    var a = this.b.c;
    "" != a && T(this.g, Ss(a));
    Us(this)
};
var Ss = function(a) {
    for (var b = "", c = Ib(DATA.SourceLanguageCodeNameList), d = 0; d < c.length; d++)
        if (c[d].Code == a) {
            b = c[d].Name;
            break
        }
    return b
};
Ts.prototype.update = function(a, b, c) {
    var d = Gf(document, "src-translit"),
        e = [];
    if (Mi(b, 0))
        for (var f = 0; f < V(b.X, 0); f++) {
            var g = Mi(b, f);
            gi(g) && e.push(gi(g))
        }
    T(d, e.join(""));
    wg(d, "display", "block");
    d = zi(Ii(b));
    this.C.update(c ? d : a, Gi(b))
};
var Vs = function() {},
    Ws = new Vs,
    Xs = ["click", cc ? "keypress" : "keydown", "keyup"];
Vs.prototype.D = function(a, b, c, d, e) {
    var f = function(a) {
        var c = Tc(b),
            e = Xf(a.target) ? a.target.getAttribute("role") || null : null;
        "click" == a.type && Ec(a) ? c.call(d, a) : 13 != a.keyCode && 3 != a.keyCode || "keyup" == a.type ? 32 != a.keyCode || "keyup" != a.type || "button" != e && "tab" != e || (c.call(d, a), a.preventDefault()) : (a.type = "keypress", c.call(d, a))
    };
    f.a = b;
    f.b = d;
    e ? e.D(a, Xs, f, c) : I(a, Xs, f, c)
};
var Ys = function() {
    K.call(this);
    this.a = 0;
    this.F = this.h = null
};
v(Ys, K);
Ys.prototype.g = function() {
    this.b("begin")
};
Ys.prototype.l = function() {
    this.b("end")
};
Ys.prototype.b = function(a) {
    this.dispatchEvent(a)
};
var Zs = function(a, b) {
        r(b) || (b = [b]);
        x(0 < b.length, "At least one Css3Property should be specified.");
        var c = ub(b, function(a) {
            if (t(a)) return a;
            lb(a, "Expected css3 property to be an object.");
            var b = a.Be + " " + a.duration + "s " + a.timing + " " + a.Bb + "s";
            x(a.Be && ia(a.duration) && a.timing && ia(a.Bb), "Unexpected css3 property value: %s", b);
            return b
        });
        wg(a, "transition", c.join(","))
    },
    $s = function(a) {
        var b = !1,
            c;
        return function() {
            b || (c = a(), b = !0);
            return c
        }
    }(function() {
        if (B) return F("10.0");
        var a = document.createElement("DIV"),
            b = E ? "-webkit" : cc ? "-moz" : B ? "-ms" : $b ? "-o" : null,
            c = {
                transition: "opacity 1s linear"
            };
        b && (c[b + "-transition"] = "opacity 1s linear");
        b = tf("div", {
            style: c
        });
        a.innerHTML = lf(b);
        a = a.firstChild;
        x(a.nodeType == Node.ELEMENT_NODE);
        b = a.style[cb("transition")];
        return "" != ("undefined" !== typeof b ? b : a.style[vg(a, "transition")] || "")
    });
var at = function(a, b, c, d, e) {
    Ys.call(this);
    this.v = a;
    this.w = b;
    this.A = c;
    this.c = d;
    this.B = r(e) ? e : [e]
};
v(at, Ys);
h = at.prototype;
h.play = function() {
    if (1 == this.a) return !1;
    this.g();
    this.b("play");
    this.h = sa();
    this.a = 1;
    if ($s()) return wg(this.v, this.A), this.m = Ud(this.cg, void 0, this), !0;
    this.Id(!1);
    return !1
};
h.cg = function() {
    Kg(this.v);
    Zs(this.v, this.B);
    wg(this.v, this.c);
    this.m = Ud(u(this.Id, this, !1), 1E3 * this.w)
};
h.jc = function() {
    1 == this.a && this.Id(!0)
};
h.Id = function(a) {
    wg(this.v, "transition", "");
    n.clearTimeout(this.m);
    wg(this.v, this.c);
    this.F = sa();
    this.a = 0;
    a ? this.b("stop") : this.b("finish");
    this.l()
};
h.H = function() {
    this.jc();
    at.o.H.call(this)
};
var bt = function(a, b, c, d) {
    return new at(a, .218, {
        opacity: c
    }, {
        opacity: d
    }, {
        Be: "opacity",
        duration: .218,
        timing: b,
        Bb: 0
    })
};
var dt = function(a, b) {
    K.call(this);
    this.a = new Yg(this);
    var c = a || null;
    ct(this);
    this.v = c;
    b && (this.Ub = b)
};
v(dt, K);
h = dt.prototype;
h.v = null;
h.Pd = null;
h.Xb = !1;
h.xd = -1;
h.Ub = "toggle_display";
h.Ba = function() {
    return this.Ub
};
h.j = function() {
    return this.v
};
var ct = function(a) {
    if (a.Xb) throw Error("Can not change this state of the popup while showing.");
};
dt.prototype.V = function() {
    return this.Xb
};
dt.prototype.K = function(a) {
    this.g && this.g.jc();
    this.c && this.c.jc();
    if (a) {
        if (!this.Xb && this.dispatchEvent("beforeshow")) {
            if (!this.v) throw Error("Caller must call setElement before trying to show the popup");
            this.b();
            a = P(this.v);
            this.a.D(a, "mousedown", this.ye, !0);
            if (B) {
                var b;
                try {
                    b = a.activeElement
                } catch (d) {}
                for (; b && "IFRAME" == b.nodeName;) {
                    try {
                        var c = dg(b)
                    } catch (d) {
                        break
                    }
                    a = c;
                    b = a.activeElement
                }
                this.a.D(a, "mousedown", this.ye, !0);
                this.a.D(a, "deactivate", this.xe)
            } else this.a.D(a, "blur", this.xe);
            "toggle_display" ==
            this.Ub ? (this.v.style.visibility = "visible", U(this.v, !0)) : "move_offscreen" == this.Ub && this.b();
            this.Xb = !0;
            this.xd = sa();
            this.g ? (Zc(this.g, "end", this.ze, !1, this), this.g.play()) : this.ze()
        }
    } else et(this)
};
dt.prototype.b = q;
var et = function(a, b) {
    a.Xb && a.dispatchEvent({
        type: "beforehide",
        target: b
    }) && (a.a && $g(a.a), a.Xb = !1, sa(), a.c ? (Zc(a.c, "end", ra(a.Xd, b), !1, a), a.c.play()) : a.Xd(b))
};
h = dt.prototype;
h.Xd = function(a) {
    "toggle_display" == this.Ub ? this.Pf() : "move_offscreen" == this.Ub && (this.v.style.top = "-10000px");
    this.dispatchEvent({
        type: "hide",
        target: a
    })
};
h.Pf = function() {
    this.v.style.visibility = "hidden";
    U(this.v, !1)
};
h.ze = function() {
    this.dispatchEvent("show")
};
h.ye = function(a) {
    a = a.target;
    Zf(this.v, a) || ft(this, a) || 150 > sa() - this.xd || et(this, a)
};
h.xe = function(a) {
    var b = P(this.v);
    if ("undefined" != typeof document.activeElement) {
        if (a = b.activeElement, !a || Zf(this.v, a) || "BODY" == a.tagName) return
    } else if (a.target != b) return;
    150 > sa() - this.xd || et(this)
};
var ft = function(a, b) {
    return vb(a.Pd || [], function(a) {
        return b === a || Zf(a, b)
    })
};
dt.prototype.H = function() {
    dt.o.H.call(this);
    this.a.sa();
    zc(this.g);
    zc(this.c);
    delete this.v;
    delete this.a;
    delete this.Pd
};
var gt = function(a, b) {
    this.h = b || void 0;
    dt.call(this, a)
};
v(gt, dt);
gt.prototype.b = function() {
    if (this.h) {
        var a = !this.V() && "move_offscreen" != this.Ba(),
            b = this.j();
        a && (b.style.visibility = "hidden", U(b, !0));
        this.h.c(b, 8, this.l);
        a && U(b, !1)
    }
};
var ht = function(a) {
    var b = '<div class="jfk-bubble" role="alertdialog"' + (a.uid ? ' aria-describedby="' + jl(a.uid) + '"' : "") + '><div class="jfk-bubble-content-id"' + (a.uid ? ' id="' + jl(a.uid) + '"' : "") + "></div>";
    a.mg && (a = b, b = "Close".replace(hl, il), b = a + ('<div class="jfk-bubble-closebtn-id jfk-bubble-closebtn" aria-label="' + b + '" role="button" tabindex=0></div>'));
    return bl(b + '<div class="jfk-bubble-arrow-id jfk-bubble-arrow"><div class="jfk-bubble-arrowimplbefore"></div><div class="jfk-bubble-arrowimplafter"></div></div></div>')
};
ht.a = "jfk.templates.bubble.main";
var it = function(a) {
    ch.call(this, a);
    this.c = new jk("jfk-bubble", !0);
    this.a = new gt;
    this.A = []
};
v(it, ch);
it.prototype.l = !0;
it.prototype.m = !1;
var jt = function(a, b) {
        a.c.b = b;
        a.V() && a.a.b()
    },
    kt = function(a) {
        x(!a.Z, "Must call setPosition() before rendering");
        kk(a.c, 1, 0, 0, -20)
    },
    lt = function(a) {
        x(!a.Z, "Must call setShowClosebox() before rendering");
        a.l = !0
    },
    nt = function(a, b) {
        x(t(b) || b.nodeType || b instanceof al || b instanceof kf, "Content must be a string or HTML.");
        a.B = b;
        mt(a, b)
    },
    mt = function(a, b) {
        var c = a.Fb();
        if (b && c)
            if (t(b)) T(c, b);
            else if (b instanceof al) {
            var d = Sk(b);
            c.innerHTML = lf(d)
        } else b instanceof kf ? c.innerHTML = lf(b) : (c.innerHTML = lf(vf), c.appendChild(b))
    };
h = it.prototype;
h.Fb = function() {
    return hh(this, "jfk-bubble-content-id")
};
h.Ea = function() {
    this.v = Yk(ht, {
        mg: this.l,
        uid: "bubble-" + oa(this)
    }, void 0, this.b);
    mt(this, this.B);
    U(this.j(), !1);
    var a = this.a,
        b = this.j();
    ct(a);
    a.v = b;
    if (!dc) {
        var a = this.a,
            b = bt(this.j(), "ease-out", 0, 1),
            c = bt(this.j(), "ease-in", 1, 0);
        a.g = b;
        a.c = c
    }
    Ce(this.j(), this.A)
};
h.Y = function() {
    it.o.Y.call(this);
    ih(this).D(this.a, ["beforeshow", "show", "beforehide", "hide"], this.Kf);
    if (this.l) {
        var a = ih(this),
            b = hh(this, "jfk-bubble-closebtn-id");
        Ws.D(b, ra(this.K, !1), void 0, a.F || a, a)
    }
    a = this.j();
    x(a, "getElement() returns null.");
    b = hh(this, "jfk-bubble-arrow-id");
    x(b, "No arrow element is found!");
    var c = this.c;
    c.a = a;
    c.h = b;
    a = this.a;
    a.h = this.c || void 0;
    a.V() && a.b()
};
h.K = function(a) {
    this.a.K(a)
};
h.V = function() {
    return this.a.V()
};
h.H = function() {
    this.a.sa();
    delete this.a;
    it.o.H.call(this)
};
h.qe = function() {
    Gg(this.j());
    return !1
};
h.Kf = function(a) {
    if ("show" == a.type || "hide" == a.type) {
        var b = ih(this),
            c = this.b,
            c = B ? og(c) : c.a;
        "show" == a.type ? b.D(c, "scroll", this.qe) : b.b(c, "scroll", this.qe)
    }
    b = this.dispatchEvent(a.type);
    this.m && "hide" == a.type && this.sa();
    return b
};
var ot = {},
    pt = null,
    qt = function(a) {
        a = oa(a);
        delete ot[a];
        Lb(ot) && pt && bk(pt)
    },
    st = function() {
        pt || (pt = new ak(function() {
            rt()
        }, 20));
        var a = pt;
        0 != a.U || ck(a)
    },
    rt = function() {
        var a = sa();
        Hb(ot, function(b) {
            tt(b, a)
        });
        Lb(ot) || st()
    };
var ut = function(a, b, c, d) {
    Ys.call(this);
    if (!r(a) || !r(b)) throw Error("Start and end parameters must be arrays");
    if (a.length != b.length) throw Error("Start and end points must be the same length");
    this.w = a;
    this.P = b;
    this.duration = c;
    this.L = d;
    this.m = [];
    this.c = 0;
    this.C = null
};
v(ut, Ys);
ut.prototype.play = function(a) {
    if (a || 0 == this.a) this.c = 0, this.m = this.w;
    else if (1 == this.a) return !1;
    qt(this);
    this.h = a = sa(); - 1 == this.a && (this.h -= this.duration * this.c);
    this.F = this.h + this.duration;
    this.C = this.h;
    this.c || this.g();
    this.b("play"); - 1 == this.a && this.b("resume");
    this.a = 1;
    var b = oa(this);
    b in ot || (ot[b] = this);
    st();
    tt(this, a);
    return !0
};
ut.prototype.jc = function(a) {
    qt(this);
    this.a = 0;
    a && (this.c = 1);
    vt(this, this.c);
    this.b("stop");
    this.l()
};
ut.prototype.H = function() {
    0 == this.a || this.jc(!1);
    this.b("destroy");
    ut.o.H.call(this)
};
var tt = function(a, b) {
        ib(a.h);
        ib(a.F);
        ib(a.C);
        a.c = (b - a.h) / (a.F - a.h);
        1 <= a.c && (a.c = 1);
        a.C = b;
        vt(a, a.c);
        1 == a.c ? (a.a = 0, qt(a), a.b("finish"), a.l()) : 1 == a.a && a.J()
    },
    vt = function(a, b) {
        ja(a.L) && (b = a.L(b));
        a.m = Array(a.w.length);
        for (var c = 0; c < a.w.length; c++) a.m[c] = (a.P[c] - a.w[c]) * b + a.w[c]
    };
ut.prototype.J = function() {
    this.b("animate")
};
ut.prototype.b = function(a) {
    this.dispatchEvent(new wt(a, this))
};
var wt = function(a, b) {
    H.call(this, a);
    this.x = b.m[0];
    this.y = b.m[1];
    this.duration = b.duration
};
v(wt, H);
var xt = function(a, b, c, d, e) {
    ut.call(this, b, c, d, e);
    this.A = a
};
v(xt, ut);
xt.prototype.O = q;
xt.prototype.J = function() {
    this.O();
    xt.o.J.call(this)
};
xt.prototype.l = function() {
    this.O();
    xt.o.l.call(this)
};
xt.prototype.g = function() {
    this.O();
    xt.o.g.call(this)
};
var yt = function(a, b, c, d, e) {
    ia(b) && (b = [b]);
    ia(c) && (c = [c]);
    xt.call(this, a, b, c, d, e);
    if (1 != b.length || 1 != c.length) throw Error("Start and end points must be 1D");
    this.B = -1
};
v(yt, xt);
var zt = 1 / 1024;
yt.prototype.O = function() {
    var a = this.m[0];
    if (Math.abs(a - this.B) >= zt) {
        var b = this.A;
        x(b);
        b = b.style;
        "opacity" in b ? b.opacity = a : "MozOpacity" in b ? b.MozOpacity = a : "filter" in b && (b.filter = "" === a ? "" : "alpha(opacity=" + 100 * Number(a) + ")");
        this.B = a
    }
};
yt.prototype.g = function() {
    this.B = -1;
    yt.o.g.call(this)
};
yt.prototype.l = function() {
    this.B = -1;
    yt.o.l.call(this)
};
var At = function(a, b, c) {
    yt.call(this, a, 1, 0, b, c)
};
v(At, yt);
At.prototype.g = function() {
    this.A.style.display = "";
    At.o.g.call(this)
};
At.prototype.l = function() {
    this.A.style.display = "none";
    At.o.l.call(this)
};
var Bt = function(a, b, c) {
    yt.call(this, a, 0, 1, b, c)
};
v(Bt, yt);
Bt.prototype.g = function() {
    this.A.style.display = "";
    Bt.o.g.call(this)
};
var Dt = function(a) {
        this.c = Math.ceil(8);
        this.a = a;
        this.b = (new Date).getTime();
        Ct(this, 1)
    },
    Ct = function(a, b) {
        Ud(function() {
            (new Date).getTime() - this.b > 500 * b + 200 ? this.a(!0) : b < this.c ? Ct(this, b + 1) : this.a(!1)
        }, 500, a)
    };
var Z = L.I(),
    Et = null,
    Ft = function(a, b, c, d, e) {
        var f = {};
        f.id = b;
        f.sl = c;
        f.tl = d;
        f.query = e.substring(0, 64);
        f.len = e.length;
        f.client = "webapp";
        Z.log(a, f)
    },
    Gt = function() {
        var a = navigator.userAgent;
        return !Sa(a, "MSIE") && !Sa(a, "Firefox")
    },
    Ht = function(a, b) {
        var c = "";
        switch (DATA.CampaignTrackerId) {
            case "0":
                c = "https://goo.gl/ELUFVd";
                break;
            case "1a":
                c = "https://goo.gl/cHnrfS";
                break;
            case "1b":
                c = "https://goo.gl/7apRL6";
                break;
            case "1c":
                c = "https://goo.gl/ozXBPg";
                break;
            case "1f":
                c = "https://goo.gl/R0JqsC";
                break;
            case "1g":
                switch (b) {
                    case 0:
                        c =
                            "http://goo.gl/iosgoogleapp/translate2a";
                        break;
                    case 1:
                        c = "http://goo.gl/iosgoogleapp/translate2b";
                        break;
                    case 2:
                        c = "http://goo.gl/iosgoogleapp/translate2c"
                }
                break;
            case "1h":
                switch (b) {
                    case 0:
                        c = "http://goo.gl/iosgoogleapp/translate2d";
                        break;
                    case 1:
                        c = "http://goo.gl/iosgoogleapp/translate2e";
                        break;
                    case 2:
                        c = "http://goo.gl/iosgoogleapp/translate2f";
                        break;
                    case 3:
                        c = "http://goo.gl/iosgoogleapp/translate2g"
                }
                break;
            default:
                c = "https://goo.gl/F17Wul"
        }
        window.location = a ? c + "?url=google-deeplink://search%3Fq%3D" + Ia(Ia(a)) +
            "&waypoint_id=gt-" + DATA.CampaignTrackerId : c + "?url=google-deeplink://open-url?url=http://www.google.com&waypoint_id=gt-" + DATA.CampaignTrackerId;
        M(Z, "webapp", "gsa", "open", {
            id: DATA.CampaignTrackerId
        });
        ze("gsa", "gsa:open")
    },
    Jt = function(a) {
        var b = document.createElement("DIV");
        b.id = "bg-msk";
        document.body.appendChild(b);
        Ud(function() {
            b.style.opacity = 1
        }, 0);
        Et = I(document.body, "touchmove", function(a) {
            a.preventDefault()
        });
        I(b, "click", function() {
            It();
            a()
        })
    },
    It = function() {
        S(Gf(document, "bg-msk"));
        null != Et && (ad(Et),
            Et = null)
    };
var Lt = function(a, b, c, d, e, f, g) {
        this.La = c;
        this.Ma = d;
        this.Ka = a;
        Kt[this.U] = this;
        this.a = b;
        this.b = new ul("");
        this.b.ea(16, !0);
        (a = Q("starbutton", this.j())) && mh(this.b, a);
        I(this.b, "action", this.F, !1, this);
        g && this.b.va(!0);
        Gt() || this.b.K(!1);
        this.A = e;
        this.B = f
    },
    Mt = 0,
    Kt = {},
    Nt = null,
    Ot = $r("translate"),
    Pt = function(a, b, c) {
        if (a = Kt[c]) a.translate(), Ft("populate", c, a.La, a.Ma, a.Ka)
    },
    Qt = function(a) {
        delete Kt[a.U]
    };
Lt.prototype.j = function() {
    return this.v
};
var Rt = function(a, b) {
        var c = b;
        ba(b) || (c = a.a);
        var d = [];
        if (c.sentences)
            for (var e = 0, f; f = c.sentences[e]; e++) f.trans && d.push(f.trans);
        return d.join("")
    },
    St = function(a, b) {
        var c = b;
        ba(b) || (c = a.a);
        var d = [];
        if (c.sentences)
            for (var e = 0, f; f = c.sentences[e]; e++) f.translit && d.push(f.translit);
        return d.join("")
    },
    Tt = function(a, b) {
        return a.Ka == b.Ka && a.La == b.La && a.Ma == b.Ma
    };
Lt.prototype.F = function() {
    var a = W(this.b, 16);
    this.A(this, a);
    Ft(a ? "star" : "unstar", this.U, this.La, this.Ma, this.Ka)
};
var Ut = function(a, b, c, d, e, f, g) {
    this.U = (Mt++).toString();
    this.v = el(Ns, {
        id: this.U,
        ag: a,
        jb: Rt(this, b),
        ad: Ot,
        Pc: "Star translation"
    });
    Lt.call(this, a, b, c, d, e, f, g)
};
v(Ut, Lt);
Lt.prototype.translate = function() {
    this.B(this.La, this.Ma, this.Ka)
};
var Vt = function(a, b, c) {
    this.U = "main";
    this.g = c;
    c = Yb() && Zb();
    this.v = el(Ms, {
        D: DATA.Messages.LISTEN,
        Pc: "Star translation",
        bd: "Copy translation",
        oe: hc || ic,
        gf: DATA.EnableSearchIcon && c
    });
    DATA.EnableFormality && (mh(this.g, Q("gt-res-formality", this.v)), Tn(this.g));
    this.c = new ul("", void 0, 4);
    this.c.ea(16, !0);
    mh(this.c, Q("res-tts", this.v));
    this.w = new Kn(this.c, "&client=webapp", !0);
    var d = Q("copybutton", this.j());
    Ke && 0 <= ab(Dp, 43) ? (this.m = new ak(this.G, 4E3, this), this.h = new ul(""), mh(this.h, d), I(this.h, "action",
        function() {
            this.bd(this.La, this.Ma, DATA.DisplayLanguage, this.Ka.length)
        }, !1, this)) : S(d);
    if (DATA.EnableSearchIcon && c) {
        var e = "search" + DATA.CampaignTrackerId;
        I(Q("result-search", this.v), "click", function() {
            M(Z, "webapp", e, "click", {
                sl: this.La,
                tl: this.Ma,
                hl: DATA.DisplayLanguage,
                ql: this.Ka.length
            });
            ze("gsa", e + ":click");
            if (0 == DATA.ActionAfterSearch) {
                if (28 > Rt(this, this.a).length) {
                    var a = DATA.Messages.LEARN_MORE_ABOUT.indexOf("%1$s");
                    if (-1 != a) var b = DATA.Messages.LEARN_MORE_ABOUT.slice(0, a),
                        c = DATA.Messages.LEARN_MORE_ABOUT.slice(a +
                            4, DATA.Messages.LEARN_MORE_ABOUT.length);
                    a = Rt(this, this.a)
                } else b = DATA.Messages.LEARN_MORE_ABOUT_THIS, c = a = "";
                var d = el(Qs, {
                    Je: b,
                    Ne: a,
                    Ke: c,
                    Rd: DATA.Messages.TRY_IT.toUpperCase(),
                    De: DATA.Messages.SEARCH_IN_BROWSER,
                    dc: DATA.Messages.CLEAR_TEXT
                });
                document.body.appendChild(d);
                M(Z, "webapp", "gsaIntGsaWeb", "show");
                ze("gsa", "gsaIntGsaWeb:show");
                Jt(function() {
                    S(d);
                    M(Z, "webapp", "gsaIntGsaWeb", "dismissbg");
                    ze("gsa", "gsaIntGsaWeb:dismissbg")
                });
                b = Q("gsa-int-button", d);
                a = Q("gsa-int-second-choice", d);
                c = Q("clear", d);
                I(b, "click", function() {
                    It();
                    S(d);
                    M(Z, "webapp", "gsaIntGsaWeb", "accept");
                    ze("gsa", "gsaIntGsaWeb:accept");
                    Yd(L.I(), "/translate/uc?ua=dismiss&uav=searchgsa");
                    Ht(Rt(this, this.a), 2)
                }, !1, this);
                I(a, "click", function() {
                    It();
                    S(d);
                    M(Z, "webapp", "gsaIntGsaWeb", "webapp");
                    ze("gsa", "gsaIntGsaWeb:webapp");
                    Yd(L.I(), "/translate/uc?ua=dismiss&uav=gsaint");
                    window.location = "https://www.google.com/search?q=" + Ia(Rt(this, this.a)) + "&source=gt-" + DATA.CampaignTrackerId
                }, !1, this);
                I(c, "click", function() {
                    It();
                    S(d);
                    M(Z, "webapp",
                        "gsaIntGsaWeb", "dismiss");
                    ze("gsa", "gsaIntGsaWeb:dismiss")
                }, !1, this)
            } else 1 == DATA.ActionAfterSearch ? (Yd(L.I(), "/translate/uc?ua=dismiss&uav=gsaint"), d = el(Qs, {
                        Je: DATA.Messages.GSA_LETS_YOU_SEE_MORE,
                        jb: "",
                        Ke: "",
                        Rd: DATA.Messages.TRY_IT.toUpperCase(),
                        De: DATA.Messages.NO_THANKS,
                        dc: DATA.Messages.CLEAR_TEXT
                    }), document.body.appendChild(d), M(Z, "webapp", "gsaIntGsaDismiss", "show"), ze("gsa", "gsaIntGsaDismiss:show"), Jt(function() {
                        S(d);
                        M(Z, "webapp", "gsaIntGsaDismiss", "dismissbg");
                        ze("gsa", "gsaIntGsaDismiss:dismissbg")
                    }),
                    b = Q("gsa-int-button", d), a = Q("gsa-int-second-choice", d), c = Q("clear", d), I(b, "click", function() {
                        It();
                        S(d);
                        M(Z, "webapp", "gsaIntGsaDismiss", "accept");
                        ze("gsa", "gsaIntGsaDismiss:accept");
                        Ht(Rt(this, this.a), 2)
                    }, !1, this), I(a, "click", function() {
                        It();
                        S(d);
                        M(Z, "webapp", "gsaIntGsaDismiss", "dismiss");
                        ze("gsa", "gsaIntGsaDismiss:dismiss")
                    }, !1, this), I(c, "click", function() {
                        It();
                        S(d);
                        M(Z, "webapp", "gsaIntGsaDismiss", "dismiss");
                        ze("gsa", "gsaIntGsaDismiss:dismiss")
                    }, !1, this)) : 2 == DATA.ActionAfterSearch ? window.location =
                "https://www.google.com/search?q=" + Ia(Rt(this, this.a)) + "&source=gt-" + DATA.CampaignTrackerId : 3 == DATA.ActionAfterSearch && Ht(Rt(this, this.a), 3)
        }, !1, this)
    }
    Lt.call(this, "", {}, "", "", a, b)
};
v(Vt, Lt);
Vt.prototype.update = function(a, b, c, d, e) {
    this.Ka = a;
    this.a = b;
    this.La = c;
    this.Ma = d;
    for (var f = "", g = Ib(DATA.TargetLanguageCodeNameList), k = 0; k < g.length; k++) g[k].Code == d && (f = g[k].Name);
    T(Q("target-lang", this.v), f);
    DATA.EnableFormality && this.g.update(c, d, DATA.DisplayLanguage, a, Rt(this, b));
    this.w.update(Rt(this, b), d, e);
    wg(Q("translation", this.v), "direction", Oe(d) ? "rtl" : "ltr");
    T(Q("translation", this.v), Rt(this, b));
    St(this, b) ? T(Q("transliteration-target", this.v), St(this, b)) : T(Q("transliteration-target", this.v),
        "");
    (e = Q("copybutton", this.v)) && U(e, !0);
    (e = Q("starbutton", this.v)) && U(e, !0);
    (e = Q("result-search", this.v)) && U(e, !0);
    Q("share-mail", this.v) && S(Q("share-mail", this.v));
    e = !hc || hc && 0 <= ab(Vq, 8);
    var l = Wt(),
        m;
    DATA.Messages.SHARE_MODULE_TITLE && l && (m = DATA.Messages.SHARE_APP_NOT_INSTALLED.replace("%1$s", "WhatsApp"));
    b = el(Os, {
        jb: Rt(this, b),
        Gd: DATA.Messages.SHARE_MODULE_TITLE,
        kg: DATA.Messages.SHARE_MODULE_EMAIL,
        lg: DATA.Messages.SHARE_MODULE_SMS,
        Nd: m,
        hf: e,
        oe: hc || ic
    });
    Uf(Q("result-footer", this.v), b);
    if (DATA.Messages.SHARE_MODULE_TITLE) {
        b =
            Q("share-button", this.v);
        var p = Q("share-panel", this.v);
        this.l = new ul("");
        mh(this.l, b);
        I(this.l, "action", function() {
            N(p, "show-share-panel");
            Jt(function() {
                De(p, "show-share-panel");
                Kf(p, {
                    "aria-hidden": !0
                });
                if (l) {
                    var a = Gf(document, "not_installed");
                    a && "none" != a.style.display && U(a, !1)
                }
            });
            Kf(p, {
                "aria-hidden": !1
            });
            M(Z, "webapp", "share", "share", {
                sl: c,
                tl: d,
                hl: DATA.DisplayLanguage,
                ql: a.length
            })
        }, !1, this);
        b = Q("share-panel-wrap", this.v);
        b = Hf(document, "a", "", b);
        var w = this;
        y(b, function(b) {
            I(b, "click", function() {
                var e =
                    b.className.split(" ")[0];
                M(Z, "webapp", "share", e, {
                    sl: c,
                    tl: d,
                    hl: DATA.DisplayLanguage,
                    ql: a.length
                });
                if (l) {
                    var f = Gf(document, "not_installed");
                    f && "none" != f.style.display && "whatsapp" !== e ? U(f, !1) : "whatsapp" === e && Xt(w, l, function(a) {
                        a ? (a = f.style, a.position = "relative", B && !F("8") ? (a.zoom = "1", a.display = "inline") : a.display = "inline-block") : U(f, !1)
                    })
                }
            }, !1, this)
        })
    } else b = Q("result-mail", this.v), I(b, "click", function() {
        Ft("mail", this.U, this.La, this.Ma, this.Ka)
    }, !1, this);
    b = Yb() && Zb();
    DATA.EnableSearchIcon && b && (b = "search" +
        DATA.CampaignTrackerId, M(Z, "webapp", b, "show"), ze("gsa", b + ":show"))
};
Vt.prototype.bd = function(a, b, c, d) {
    var e = Q("translation");
    vq();
    fq(aq(e), void 0).select();
    e.setAttribute("tabIndex", "-1");
    e = Q("toast");
    try {
        if (document.execCommand("copy")) {
            if (g = "success", 0 == this.m.U) {
                (new Bt(e, 218)).play();
                var f = this.m;
                0 != f.U || ck(f, void 0)
            }
        } else var g = "failure"
    } catch (k) {
        g = "error"
    } finally {
        M(Z, "webapp", "copy", g, {
            sl: a,
            tl: b,
            hl: c,
            ql: d
        })
    }
};
var Xt = function(a, b, c) {
    if (!(Wb() && Yb() && Zb())) var d = setTimeout(function() {
            c(!0);
            new Dt(function(a) {
                a && c(!1)
            })
        }, 200),
        e = I(document, b, function() {
            clearTimeout(d);
            ad(e)
        }, !1, a)
};
Vt.prototype.G = function() {
    var a = Q("toast");
    (new At(a, 218)).play()
};
var Wt = function() {
    var a = {
            hidden: "visibilitychange",
            webkitHidden: "webkitvisibilitychange",
            mozHidden: "mozvisibilitychange",
            msHidden: "msvisibilitychange"
        },
        b, c;
    for (b in a)
        if (b in document) {
            c = a[b];
            break
        }
    return c
};
var Yt = function(a, b, c) {
    xc.call(this);
    this.a = new Vt(a, b, c);
    this.b = this.h = this.c = this.g = !1;
    this.v = R("DIV", "cllist");
    this.v.appendChild(R("DIV", "gt-lc gt-lc-mobile"));
    U(Q("gt-lc", this.v), !1)
};
v(Yt, xc);
Yt.prototype.H = function() {
    Zt(this);
    this.v = null;
    Yt.o.H.call(this)
};
Yt.prototype.j = function() {
    return this.v
};
Yt.prototype.update = function(a, b, c, d, e) {
    Zt(this);
    this.a.update(a, b, c, d, e);
    a = Q("gt-lc", this.v);
    a.parentNode && a.parentNode.insertBefore(this.a.j(), a);
    U(a, !0);
    if (this.g ? this.h && this.c && !this.b : this.h && !this.b) {
        this.b = !0;
        a = L.I();
        Yd(a, "/translate/uc?ua=dismiss&uav=stooltip");
        a = R("div");
        T(a, DATA.Messages.SEARCH_THIS_TRANSLATION);
        wg(a, "white-space", "nowrap");
        c = Q("result-search-icon", this.j());
        var f = new it;
        jt(f, c);
        nt(f, a);
        kt(f);
        f.c.ud = !0;
        lt(f);
        f.m = !0;
        lh(f, void 0);
        N(f.j(), "trans-bubble");
        f.K(!0);
        M(Z, "webapp",
            "searchtooltip", "show");
        ze("gsa", "searchtooltip:show");
        I(Q("jfk-bubble-closebtn", f.j()), "click", function() {
            M(Z, "webapp", "searchtooltip", "dismiss");
            ze("gsa", "searchtooltip:dismiss")
        }, !1, this);
        window.onresize = function() {
            f.V() && f.a.b()
        }
    }
    if (this.g && !this.c) {
        this.c = !0;
        a = L.I();
        Yd(a, "/translate/uc?ua=dismiss&uav=gsaap");
        c = Q("result-search", this.j());
        d = Eg(c);
        var g = el(Rs, {
                title: DATA.Messages.SEARCH_THIS_TRANSLATION,
                content: DATA.Messages.GSA_LETS_YOU_SEE_MORE,
                pc: DATA.Messages.NO_THANKS.toUpperCase(),
                Qc: DATA.Messages.TRY_THE_APP.toUpperCase()
            }),
            k = el(Ps);
        e = Q("gsaa-btn-bg", g);
        a = Q("gsaa-dg-no", g);
        c = Q("gsaa-dg-try", g);
        k.style.left = d.x + "px";
        k.style.top = d.y + "px";
        e.style.left = d.x - 28 + "px";
        g.style.top = d.y + "px";
        document.body.appendChild(g);
        document.body.appendChild(k);
        M(Z, "webapp", "gsaAgg", "show");
        ze("gsa", "gsaAgg:show");
        e = Kg(g);
        d = d.y + e.height + 20 - window.innerHeight;
        0 < d && window.scrollTo(0, d);
        Jt(function() {
            S(k);
            S(g);
            M(Z, "webapp", "gsaAgg", "dismissbg");
            ze("gsa", "gsaAgg:dismissbg")
        });
        Ud(function() {
            N(g, "gsaa-anim")
        }, 0);
        I(a, "click", function() {
            It();
            S(k);
            S(g);
            M(Z, "webapp", "gsaAgg", "dismiss");
            ze("gsa", "gsaAgg:dismiss")
        }, !1, this);
        I(c, "click", function() {
            It();
            S(k);
            S(g);
            M(Z, "webapp", "gsaAgg", "accept");
            ze("gsa", "gsaAgg:accept");
            Ht(Rt(Lt.prototype, b), 1)
        }, !1, this);
        I(k, "click", function() {
            It();
            S(k);
            S(g);
            M(Z, "webapp", "gsaAgg", "search");
            ze("gsa", "gsaAgg:search");
            Ht(Rt(Lt.prototype, b), 1)
        }, !1, this)
    }
};
var Zt = function(a) {
    a.a && Qt(a.a);
    for (var b = 0; b < Vf(a.v).length; b++) {
        var c = Vf(a.v)[b];
        Be(c, "gt-lc") || S(c)
    }
};
var $t = function(a, b, c, d) {
    xc.call(this);
    this.b = {};
    this.c = this.a = null;
    this.v = R("DIV", "list-brief");
    this.c = R("DIV", {
        "class": "list-placeholder"
    });
    T(this.c, c);
    this.v.appendChild(this.c);
    d && (this.a = new ul("Clear history", void 0, 4), lh(this.a, this.v), this.a.j().id = "clearlist", this.a.K(!1), wg(this.a.j(), "text-transform", "uppercase"), I(this.a, "action", function() {
        confirm("Are you sure you want to clear all translations from history?") && this.clear()
    }, !1, this));
    this.g = d || q;
    this.h = a;
    this.l = b
};
v($t, xc);
var au = 0;
$t.prototype.H = function() {
    this.a && $c(this.a, "action", this.clear, !1, this);
    Hb(this.b, function(a) {
        S(a.j());
        Qt(a)
    });
    this.b = {};
    this.v = this.a = null;
    $t.o.H.call(this)
};
$t.prototype.j = function() {
    return this.v
};
var cu = function(a, b, c, d, e, f, g) {
        var k = au++;
        b = new Ut(b, c, d, e, a.h, a.l, g);
        f && bu(a, b);
        a.b[k] = b;
        Uf(a.v, b.j());
        a.a && a.a.K(!0);
        U(a.c, !1);
        return b
    },
    du = function(a, b, c) {
        Hb(a.b, function(a) {
            Tt(a, b) && a.b.va(c)
        })
    };
$t.prototype.clear = function() {
    Hb(this.b, function(a) {
        S(a.j());
        Qt(a)
    });
    this.b = {};
    this.g();
    this.a && this.a.K(!1);
    U(this.c, !0)
};
var bu = function(a, b) {
    Hb(a.b, function(a, d, e) {
        Tt(a, b) && (S(a.j()), Qt(a), delete e[d])
    });
    Lb(a.b) && a.a && a.a.K(!1);
    Lb(a.b) && U(a.c, !0)
};
ca("userfeedback.api.startFeedback", gs);
var eu = $r("showhistory"),
    fu = $r("showstarred"),
    gu = $r("showfeedback"),
    ju = function(a, b, c, d, e, f) {
        this.g = new jr;
        lr(this.g);
        mr(this.g, a);
        nr(this.g, b);
        this.history = new Er;
        this.history.b = this;
        this.aa = c;
        this.Lb = d;
        this.C = e;
        this.yb = f;
        this.T = new Om("webapp");
        this.a = new ro;
        this.pa = new Hr(this.a);
        this.b = new Ts(a, b, this.a);
        Kr(this.pa, {
            Fe: this.b.Rc,
            Ie: this.b.Sc,
            tc: this.b.tc,
            Le: this.b.a
        });
        this.a.g(a);
        this.a.h(b);
        I(this.a, "languageSelected", u(this.zb, this), !1, this);
        I(this.b.F, "action", this.Ua, !1, this);
        this.$ = new Sn(this,
            DATA.Messages.FORMAL, DATA.Messages.INFORMAL, !0, DATA.EnableFormality, DATA.IsStickyFormality, DATA.DefaultFormality);
        this.l = new Yt(this.aa, u(this.translate, this), this.$);
        this.m = new Nn(DATA.DisplayLanguage, 0, this);
        this.J = new an(DATA.DisplayLanguage, ["", "", "", MSG_N_MORE_TRANSLATIONS_LABEL], !0, !0, !1);
        this.S = this.B = null;
        this.w = new $t(this.aa, u(this.translate, this), "Previous translations will appear here.", this.yb);
        this.G = new $t(this.aa, u(this.translate, this), "Star a translation to see it here.");
        this.Aa =
            R("DIV", "outer-wrap", this.w.j(), this.G.j());
        this.R = el(Ls);
        this.lb = new ul;
        mh(this.lb, this.R);
        this.ba = Q("backbutton-label", this.R);
        I(this.lb, "action", this.Ee, !1, this);
        a = Gt();
        DATA.Messages.HISTORY_SECTION_TITLE = DATA.Messages.HISTORY_SECTION_TITLE;
        DATA.Messages.STARRED_SECTION_TITLE = DATA.Messages.STARRED_SECTION_TITLE;
        a = el(Hs, {
            ff: a,
            ef: !DATA.EnableOneGoogle,
            Xe: DATA.Messages.CLASSIC,
            Re: DATA.Messages.MOBILE_ABOUT_SHORT,
            Vd: DATA.EnableOneGoogle ? "Improve translations" : DATA.Messages.FOOTER_COMMUNITY,
            history: DATA.Messages.HISTORY_SECTION_TITLE,
            Qf: eu,
            sg: DATA.Messages.STARRED_SECTION_TITLE,
            tg: fu,
            bf: DATA.Messages.COPYRIGHT_RAW,
            kf: DATA.Messages.MOBILE_FEEDBACK_SHORT,
            lf: gu,
            Dg: "Translation copied",
            wf: DATA.Messages.SEARCH_HANDS_FREE,
            vf: DATA.Messages.GSA_PURE_AD_TEXT,
            Ve: .5 > Math.random() ? DATA.Messages.TRANSLATE_PURE_AD_TEXT_SPEAK : DATA.Messages.TRANSLATE_PURE_AD_TEXT_READ,
            pc: DATA.Messages.NO_THANKS.toUpperCase(),
            Qc: DATA.Messages.TRY_THE_APP.toUpperCase(),
            Vf: DATA.Messages.NEW ? DATA.Messages.NEW.toUpperCase() : "",
            Ue: "Tap to Translate",
            Te: "Now, Google Translate works in any app.",
            Fg: DATA.Messages.TRY_IT.toUpperCase()
        });
        if (b = Gf(document, "trans-onebar-feedback")) I(b, "click", this.Hd, !1, this), I(b, "keypress", function(a) {
            13 == a.keyCode && this.Hd()
        }, !1, this);
        b = R("DIV", {
            id: "spelling-correction"
        });
        this.h = new Qr(this, DATA.Messages.LANGUAGE_CORRECTION, DATA.Messages.DID_YOU_MEAN, DATA.Messages.SPELLING_AUTO_CORRECTION, DATA.Messages.SPELLING_REVERT_CORRECTION);
        mh(this.h, b);
        I(this.a, "srcSuggestionUpdated", this.Yc, !1, this);
        this.O = R("DIV", "page", this.b.j(), b, this.l.j(), a);
        this.F = R("DIV", "page",
            this.R, this.Aa);
        U(this.F, !1);
        this.A = this.O;
        this.v = R("DIV", "frame", this.O, this.F);
        mh(this.m, Q("gt-lc", this.l.j()));
        this.m.a.Va(this.J, !0);
        this.B = new Qn(DATA.DisplayLanguage, !1, !0);
        this.m.a.Va(this.B, !0);
        this.S = new or(DATA.DisplayLanguage, !0);
        this.m.a.Va(this.S, !0);
        this.Oa = new Uq(this.b.a, !DATA.DisableOtf, null, this.b.G, u(this.fa, this, !0), u(this.T.l, this.T));
        this.uc = new Yg(this);
        this.uc.D(Ff().a, "scroll", this.Cb);
        this.na = Mf(document).y;
        this.P = {};
        this.c || (this.c = new bs(this, "Controller"), ds(this.c, eu,
            this.ng), ds(this.c, fu, this.og), ds(this.c, gu, this.Hd), cs.a.push(this.c));
        this.L = Yb() && Zb();
        if (DATA.EnableGSAPureAd && this.L) {
            var g = Q("gsa-promo", this.v);
            a = Q("dismiss-promo", g);
            b = Q("accept-promo", g);
            var k = L.I();
            window.setTimeout(function() {
                N(g, "show-panel")
            }, 400);
            M(Z, "webapp", "gsaAd", "show");
            ze("gsa", "gsaAd:show");
            I(a, "click", function() {
                De(g, "show-panel");
                Yd(k, "/translate/uc?ua=dismiss&uav=gsaad");
                M(Z, "webapp", "gsaAd", "dismiss");
                ze("gsa", "gsaAd:dismiss")
            }, !1, this);
            I(b, "click", function() {
                De(g, "show-panel");
                Yd(k, "/translate/uc?ua=dismiss&uav=gsaad");
                M(Z, "webapp", "gsaAd", "accept");
                ze("gsa", "gsaAd:accept");
                Ht(void 0, 0)
            }, !1, this)
        } else gc && DATA.Messages.NEW ? hu(this) : gc && "en" == DATA.DisplayLanguage && DATA.Messages.TRANSLATE_PURE_AD_TEXT_SPEAK && DATA.Messages.TRANSLATE_PURE_AD_TEXT_READ && iu(this)
    };
ju.prototype.zb = function() {
    mr(this.g, this.a.a);
    nr(this.g, this.a.b);
    this.fa(!1)
};
ju.prototype.j = function() {
    return this.v
};
var ku = function(a, b) {
    a.A != b && (U(a.A, !1), U(b, !0), a.A = b)
};
h = ju.prototype;
h.Ee = function() {
    this.A != this.O && (ku(this, this.O), Ft("show", "homepage", "", "", ""))
};
h.ng = function() {
    T(this.ba, DATA.Messages.HISTORY_SECTION_TITLE);
    U(this.G.v, !1);
    U(this.w.v, !0);
    ku(this, this.F);
    Ft("show", "history", "", "", "")
};
h.og = function() {
    T(this.ba, DATA.Messages.STARRED_SECTION_TITLE);
    U(this.w.v, !1);
    U(this.G.v, !0);
    ku(this, this.F);
    Ft("show", "starred", "", "", "")
};
h.Hd = function() {
    var a = {
            productId: "101820",
            locale: DATA.DisplayLanguage
        },
        b = {};
    0 < EXPERIMENT_IDS.length && (b.EXP = EXPERIMENT_IDS.join(","));
    gs(a, b);
    Ft("show", "feedback", "", "", "")
};
h.Cg = function(a, b, c, d, e) {
    this.h.K(!1);
    e || alert(DATA.Messages.UNABLE_TO_TRANSLATE_REQUEST);
    this.P = {};
    var f;
    f = [];
    for (var g = 0; g < V(e.X, 0); g++) {
        var k = fi(Mi(e, g)),
            l = Mi(e, g).kb[1],
            l = null != l ? l : "",
            m = Mi(e, g).kb[2],
            k = {
                trans: k,
                orig: l,
                translit: null != m ? m : "",
                src_translit: gi(Mi(e, g))
            };
        f[g] = k
    }
    k = [];
    for (g = 0; g < V(e.X, 1); g++) {
        l = [];
        for (m = 0; m < V(Ni(e, g).a, 1); m++) {
            var p = l,
                w = m,
                z;
            z = Ni(e, g);
            var C = m;
            z = th(z.a, 1)[C];
            p[w] = z
        }
        l = {
            pos: mi(Ni(e, g)),
            terms: l
        };
        k[g] = l
    }
    f = {
        sentences: f,
        src: Gi(e),
        dict: k
    };
    a || (a = cu(this.w, d, f, b, c, !0), this.C(b, c,
        d, a), this.Lb(d, f, b, c));
    null != e.X[7] && (a = Ii(e).a[0], g = Ii(e).a[5], Rr(this.h, {
        cf: null != a ? a : "",
        ec: zi(Ii(e)),
        Wd: null != g ? g : !1,
        Ae: Ha(this.b.a.W()),
        cd: th(Ii(e).a, 2),
        Ge: this.a.a,
        result: e
    }), this.h.J = !0);
    "auto" == this.a.a && to(this.a, Gi(e));
    if (Ki(e)) {
        a = [];
        for (g = 0; g < V(Ki(e).a, 0); ++g) k = g, k = th(Ki(e).a, 0)[k], a.push(k);
        so(this.a, a)
    } else so(this.a, null);
    this.b.update(d, e, this.h.c);
    a = "";
    for (g = 0; g < V(e.X, 5); g++) k = Oi(e, g), null != k.a[4] && 0 < ci(k).length ? a = ci(k) : (new Gh(k.a)).a[4] = a;
    this.l.update(d, f, b, c, e);
    this.C(b, c, d, this.l.a);
    b = this.m;
    a = Gi(e);
    b.J.reset();
    b.J.push(d, a, c, e);
    this.na = Mf(document).y;
    this.ua = [];
    lu(this, this.J);
    lu(this, this.B);
    lu(this, this.S);
    (c = Q("show-panel", this.v)) && De(c, "show-panel")
};
h.translate = function(a, b, c, d) {
    if (a) {
        var e = void 0;
        "tws_lsugg" == d && (e = 3);
        this.a.g(a, e);
        mr(this.g, a)
    }
    b && (this.a.h(b), nr(this.g, b));
    this.b.a.a(c);
    d && $d(L.I(), "source", d);
    this.fa(!1);
    this.Ee()
};
var nu = function(a, b) {
    var c = mu,
        d = c.l;
    d.a && Tt(d.a, a) && d.a.b.va(b);
    du(c.w, a, b);
    b ? cu(c.G, a.Ka, a.a, a.La, a.Ma, !0, !0) : bu(c.G, a)
};
ju.prototype.Ua = function() {
    var a = Ha(this.b.a.W()),
        b = this.a.a,
        c = this.a.b,
        d;
    d = Ha(a);
    (0 <= d.search(/[\s\xa0@]/) ? 0 : Wr(d, !1) || Wr("http://" + d, !0)) ? (d = window.location.href.split("#")[0], d = d.replace("/m/translate", "/translate"), b = b ? b : "auto", d += "?sl=" + ("qab" == b ? "en" : b) + "&tl=" + c + "&u=" + escape(a), window.open(d, "webtrans")) : ($d(L.I(), "source", "btn"), this.fa(!1), this.b.G.clear(), window.scrollTo(0, 0), DATA.EnableSearchGSAAggressive && this.L && (this.l.g = !0), DATA.EnableSearchTooltip && this.L && (this.l.h = !0))
};
ju.prototype.fa = function(a) {
    this.Oa.reset(a);
    var b = Ha(this.b.a.W()),
        c = this.a.a,
        d = this.a.b;
    if (Fa(Ya(b))) Rr(this.h, {
        ec: ""
    }), this.m.update("", c, d, new Uh), so(this.a, null);
    else {
        if (!a) {
            var e = this.history,
                f;
            f = c;
            var g = d;
            f = (null != f ? f : "auto") + "/" + (null != g ? g : "en") + "/" + Ia(b);
            g = (new Date).getTime();
            2E3 < g - e.c ? Dr(e.a, f, !1) : Dr(e.a, f, !0);
            e.c = a ? g : 0
        }
        e = L.I();
        f = this.pa;
        $d(f.b, "ssel", f.a.w);
        $d(f.b, "tsel", f.a.O);
        f = [];
        for (var k in e.b) f.push(Wd(e, k, e.b[k]));
        e.b = {};
        k = new sm(f.join("&"));
        k.h(new sm(Xr()));
        e = this.b.a;
        f = e.T;
        e.T = 0;
        Bm(k, "kc", f);
        null != this.$.l && "en" == c && "de" == d && Bm(k, "tco", this.$.l);
        e = this.T;
        f = DATA.DisplayLanguage;
        a = u(this.Cg, this, a, c, d, b);
        g = "at bd ex ld md qca rw rm ss t".split(" ");
        Jm && g.push("kr");
        Tm(e, c, d, f, b, g, a, k)
    }
};
ju.prototype.Yc = function(a) {
    if (a && a.data && 0 < a.data.length) {
        a = a.data[0];
        var b = Ss(a);
        b && (mr(this.g, a), Rr(this.h, {
            ec: b,
            Jd: a,
            Ae: Ha(this.b.a.W()),
            Ge: this.a.a
        }))
    }
};
var iu = function(a) {
        var b = Q("at-promo", a.v),
            c = Q("dismiss-promo", b),
            d = Q("accept-promo", b),
            e = L.I();
        window.setTimeout(function() {
            N(b, "show-panel")
        }, 400);
        M(Z, "webapp", "atPromo", "show");
        I(c, "click", function() {
            De(b, "show-panel");
            Yd(e, "/translate/uc?ua=dismiss&uav=at");
            M(Z, "webapp", "atPromo", "dismiss")
        }, !1, a);
        I(d, "click", function() {
            De(b, "show-panel");
            Yd(e, "/translate/uc?ua=dismiss&uav=at");
            M(Z, "webapp", "atPromo", "accept");
            window.location = "https://play.google.com/store/apps/details?id=com.google.android.apps.translate&referrer=utm_source%3DMobileWebBanner%26utm_content%3DPureAd%26utm_campaign%3DTranslateAndroid&pcampaignid=Translate_022016"
        }, !1, a)
    },
    hu = function(a) {
        var b = Q("at5-promo", a.v),
            c = Q("dismiss-promo", b),
            d = Q("accept-promo", b),
            e = L.I();
        window.setTimeout(function() {
            N(b, "show-panel")
        }, 400);
        M(Z, "webapp", "atPromo", "show");
        I(c, "click", function() {
            De(b, "show-panel");
            Yd(e, "/translate/uc?ua=dismiss&uav=at5");
            M(Z, "webapp", "atPromo", "dismiss")
        }, !1, a);
        I(d, "click", function() {
            De(b, "show-panel");
            Yd(e, "/translate/uc?ua=dismiss&uav=at5");
            M(Z, "webapp", "atPromo", "accept");
            window.location = "https://play.google.com/store/apps/details?id=com.google.android.apps.translate&referrer=utm_source%3DMobileWebBanner%26utm_content%3DPureAd%26utm_campaign%3DTranslateAndroid&pcampaignid=Translate_022016"
        }, !1, a)
    };
ju.prototype.Cb = function() {
    ou(this, this.J);
    ou(this, this.B);
    ou(this, this.S);
    return !1
};
var ou = function(a, b) {
        var c = b.j(),
            d = b.Ba();
        if (null != c) {
            var e = Eg(c).y,
                c = e + Kg(c).height;
            c > window.innerHeight + a.na && (pu(a, e, d, "top"), pu(a, c, d, "bot"))
        }
    },
    pu = function(a, b, c, d) {
        var e = c + "_" + d,
            f = Mf(document).y;
        b > f && b < f + window.innerHeight && !a.P[e] && (a.P[e] = !0, L.I().log("card_scroll", {
            card: c,
            position: d
        }))
    },
    lu = function(a, b) {
        var c = b.j();
        c && a.ua.push(new Gr(c, "ilog" + b.Ba()))
    };
var qu = null,
    we = null,
    mu = null,
    ru = DATA.MaybeDefaultSourceLanguageCode || "auto",
    su = DATA.MaybeDefaultTargetLanguageCode,
    tu = function() {
        window.location.hash.substr(1) && Fr(mu.history, window.location.hash.substr(1));
        mu.history.a.ia(!0)
    },
    wu = function() {
        var a = new zd(function(a) {
                ve(function(b, e) {
                    b && (we = e, uu(a));
                    a()
                })
            }),
            b = new zd(function(a) {
                te(function(b, e) {
                    b ? (qu = e, vu(a)) : a()
                })
            });
        return Fd([b, a])
    },
    vu = function(a) {
        re(qu.a, null, null, null, 100, function(b, c) {
            if (b)
                for (var d = c.length - 1; 0 <= d; d--) {
                    var e = c[d],
                        f = e.sl,
                        g = e.tl,
                        k = e.src,
                        l = e.trg;
                    0 == d && (ru = f, su = g);
                    e = mu;
                    l = cu(e.w, k, l, f, g, !1);
                    e.C(f, g, k, l)
                }
            a()
        })
    },
    uu = function(a) {
        ye(null, null, null, function(b, c) {
            if (b)
                for (var d = c.length - 1; 0 <= d; d--) {
                    var e = c[d];
                    cu(mu.G, e.src, e.trg, e.sl, e.tl, !0, !0)
                }
            a()
        })
    },
    xu = function(a, b, c, d) {
        qu && pe(qu.a, c, d, a, b, void 0)
    },
    yu = function() {
        qu && qu.clear()
    },
    zu = function(a, b) {
        if (we) {
            var c = a.La,
                d = a.Ma,
                e = a.Ka,
                f = a.a;
            b ? we.Pc(c, d, e, f, function() {
                nu(a, b)
            }) : xe(c, d, e, function() {
                nu(a, b)
            })
        }
    },
    Au = function(a, b, c, d) {
        we && ye(a, b, c, function(a, b) {
            a && d && d.b.va(0 < b.length)
        })
    };
ca("init", function() {
    mu = new ju(ru, su, zu, xu, Au, yu);
    document.body.appendChild(mu.j());
    Nt || (Nt = new bs(null, "TranslationItem"), ds(Nt, Ot, Pt), cs.a.push(Nt));
    wu().then(tu);
    DATA.UserInputQuery && mu.b.a.a(DATA.UserInputQuery);
    try {
        window.jstiming.load.tick("prt"), window.jstiming.load.name = "load", window.jstiming.report(window.jstiming.load)
    } catch (a) {}
});
if (window.jstiming) {
    window.jstiming.cc = {};
    window.jstiming.Bd = 1;
    var Bu = function(a, b, c) {
            var d = a.t[b],
                e = a.t.start;
            if (d && (e || c)) return d = a.t[b][0], void 0 != c ? e = c : e = e[0], Math.round(d - e)
        },
        Cu = function(a, b, c) {
            var d = "";
            window.jstiming.srt && (d += "&srt=" + window.jstiming.srt, delete window.jstiming.srt);
            window.jstiming.pt && (d += "&tbsrt=" + window.jstiming.pt, delete window.jstiming.pt);
            try {
                window.external && window.external.tran ? d += "&tran=" + window.external.tran : window.gtbExternal && window.gtbExternal.tran ? d += "&tran=" +
                    window.gtbExternal.tran() : window.chrome && window.chrome.csi && (d += "&tran=" + window.chrome.csi().tran)
            } catch (w) {}
            var e = window.chrome;
            if (e && (e = e.loadTimes)) {
                e().wasFetchedViaSpdy && (d += "&p=s");
                if (e().wasNpnNegotiated) {
                    var d = d + "&npn=1",
                        f = e().npnNegotiatedProtocol;
                    f && (d += "&npnv=" + (encodeURIComponent || escape)(f))
                }
                e().wasAlternateProtocolAvailable && (d += "&apa=1")
            }
            var g = a.t,
                k = g.start,
                e = [],
                f = [],
                l;
            for (l in g)
                if ("start" != l && 0 != l.indexOf("_")) {
                    var m = g[l][1];
                    m ? g[m] && f.push(l + "." + Bu(a, l, g[m][0])) : k && e.push(l + "." + Bu(a,
                        l))
                }
            delete g.start;
            if (b)
                for (var p in b) d += "&" + p + "=" + b[p];
            (b = c) || (b = "https:" == document.location.protocol ? "https://csi.gstatic.com/csi" : "http://csi.gstatic.com/csi");
            return [b, "?v=3", "&s=" + (window.jstiming.sn || "translate_mobileweb") + "&action=", a.name, f.length ? "&it=" + f.join(",") : "", d, "&rt=", e.join(",")].join("")
        },
        Du = function(a, b, c) {
            a = Cu(a, b, c);
            if (!a) return "";
            b = new Image;
            var d = window.jstiming.Bd++;
            window.jstiming.cc[d] = b;
            b.onload = b.onerror = function() {
                window.jstiming && delete window.jstiming.cc[d]
            };
            b.src =
                a;
            b = null;
            return a
        };
    window.jstiming.report = function(a, b, c) {
        if ("prerender" == document.webkitVisibilityState) {
            var d = !1,
                e = function() {
                    if (!d) {
                        b ? b.prerender = "1" : b = {
                            prerender: "1"
                        };
                        var f;
                        "prerender" == document.webkitVisibilityState ? f = !1 : (Du(a, b, c), f = !0);
                        f && (d = !0, document.removeEventListener("webkitvisibilitychange", e, !1))
                    }
                };
            document.addEventListener("webkitvisibilitychange", e, !1);
            return ""
        }
        return Du(a, b, c)
    }
};