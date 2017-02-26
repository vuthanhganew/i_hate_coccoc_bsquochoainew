(function(e, t) {
    function _(e) {
        var t = M[e] = {};
        return v.each(e.split(y), function(e, n) {
            t[n] = !0
        }), t
    }

    function H(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(P, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r == "string") {
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) : r
                } catch (s) {}
                v.data(e, n, r)
            } else r = t
        }
        return r
    }

    function B(e) {
        var t;
        for (t in e) {
            if (t === "data" && v.isEmptyObject(e[t])) continue;
            if (t !== "toJSON") return !1
        }
        return !0
    }

    function et() {
        return !1
    }

    function tt() {
        return !0
    }

    function ut(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }

    function at(e, t) {
        do e = e[t]; while (e && e.nodeType !== 1);
        return e
    }

    function ft(e, t, n) {
        t = t || 0;
        if (v.isFunction(t)) return v.grep(e, function(e, r) {
            var i = !!t.call(e, r, e);
            return i === n
        });
        if (t.nodeType) return v.grep(e, function(e, r) {
            return e === t === n
        });
        if (typeof t == "string") {
            var r = v.grep(e, function(e) {
                return e.nodeType === 1
            });
            if (it.test(t)) return v.filter(t, r, !n);
            t = v.filter(t, r)
        }
        return v.grep(e, function(e, r) {
            return v.inArray(e, t) >= 0 === n
        })
    }

    function lt(e) {
        var t = ct.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            while (t.length) n.createElement(t.pop());
        return n
    }

    function Lt(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }

    function At(e, t) {
        if (t.nodeType !== 1 || !v.hasData(e)) return;
        var n, r, i, s = v._data(e),
            o = v._data(t, s),
            u = s.events;
        if (u) {
            delete o.handle, o.events = {};
            for (n in u)
                for (r = 0, i = u[n].length; r < i; r++) v.event.add(t, n, u[n][r])
        }
        o.data && (o.data = v.extend({}, o.data))
    }

    function Ot(e, t) {
        var n;
        if (t.nodeType !== 1) return;
        t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), n === "object" ? (t.parentNode && (t.outerHTML = e.outerHTML), v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : n === "input" && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : n === "option" ? t.selected = e.defaultSelected : n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text), t.removeAttribute(v.expando)
    }

    function Mt(e) {
        return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : []
    }

    function _t(e) {
        Et.test(e.type) && (e.defaultChecked = e.checked)
    }

    function Qt(e, t) {
        if (t in e) return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = Jt.length;
        while (i--) {
            t = Jt[i] + n;
            if (t in e) return t
        }
        return r
    }

    function Gt(e, t) {
        return e = t || e, v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e)
    }

    function Yt(e, t) {
        var n, r, i = [],
            s = 0,
            o = e.length;
        for (; s < o; s++) {
            n = e[s];
            if (!n.style) continue;
            i[s] = v._data(n, "olddisplay"), t ? (!i[s] && n.style.display === "none" && (n.style.display = ""), n.style.display === "" && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"), !i[s] && r !== "none" && v._data(n, "olddisplay", r))
        }
        for (s = 0; s < o; s++) {
            n = e[s];
            if (!n.style) continue;
            if (!t || n.style.display === "none" || n.style.display === "") n.style.display = t ? i[s] || "" : "none"
        }
        return e
    }

    function Zt(e, t, n) {
        var r = Rt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function en(e, t, n, r) {
        var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
            s = 0;
        for (; i < 4; i += 2) n === "margin" && (s += v.css(e, n + $t[i], !0)), r ? (n === "content" && (s -= parseFloat(Dt(e, "padding" + $t[i])) || 0), n !== "margin" && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s += parseFloat(Dt(e, "padding" + $t[i])) || 0, n !== "padding" && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0));
        return s
    }

    function tn(e, t, n) {
        var r = t === "width" ? e.offsetWidth : e.offsetHeight,
            i = !0,
            s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";
        if (r <= 0 || r == null) {
            r = Dt(e, t);
            if (r < 0 || r == null) r = e.style[t];
            if (Ut.test(r)) return r;
            i = s && (v.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + en(e, t, n || (s ? "border" : "content"), i) + "px"
    }

    function nn(e) {
        if (Wt[e]) return Wt[e];
        var t = v("<" + e + ">").appendTo(i.body),
            n = t.css("display");
        t.remove();
        if (n === "none" || n === "") {
            Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!Ht || !Pt.createElement) Ht = (Pt.contentWindow || Pt.contentDocument).document, Ht.write("<!doctype html><html><body>"), Ht.close();
            t = Ht.body.appendChild(Ht.createElement(e)), n = Dt(t, "display"), i.body.removeChild(Pt)
        }
        return Wt[e] = n, n
    }

    function fn(e, t, n, r) {
        var i;
        if (v.isArray(t)) v.each(t, function(t, i) {
            n || sn.test(e) ? r(e, i) : fn(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
        });
        else if (!n && v.type(t) === "object")
            for (i in t) fn(e + "[" + i + "]", t[i], n, r);
        else r(e, t)
    }

    function Cn(e) {
        return function(t, n) {
            typeof t != "string" && (n = t, t = "*");
            var r, i, s, o = t.toLowerCase().split(y),
                u = 0,
                a = o.length;
            if (v.isFunction(n))
                for (; u < a; u++) r = o[u], s = /^\+/.test(r), s && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[s ? "unshift" : "push"](n)
        }
    }

    function kn(e, n, r, i, s, o) {
        s = s || n.dataTypes[0], o = o || {}, o[s] = !0;
        var u, a = e[s],
            f = 0,
            l = a ? a.length : 0,
            c = e === Sn;
        for (; f < l && (c || !u); f++) u = a[f](n, r, i), typeof u == "string" && (!c || o[u] ? u = t : (n.dataTypes.unshift(u), u = kn(e, n, r, i, u, o)));
        return (c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)), u
    }

    function Ln(e, n) {
        var r, i, s = v.ajaxSettings.flatOptions || {};
        for (r in n) n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
        i && v.extend(!0, e, i)
    }

    function An(e, n, r) {
        var i, s, o, u, a = e.contents,
            f = e.dataTypes,
            l = e.responseFields;
        for (s in l) s in r && (n[l[s]] = r[s]);
        while (f[0] === "*") f.shift(), i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
        if (i)
            for (s in a)
                if (a[s] && a[s].test(i)) {
                    f.unshift(s);
                    break
                }
        if (f[0] in r) o = f[0];
        else {
            for (s in r) {
                if (!f[0] || e.converters[s + " " + f[0]]) {
                    o = s;
                    break
                }
                u || (u = s)
            }
            o = o || u
        }
        if (o) return o !== f[0] && f.unshift(o), r[o]
    }

    function On(e, t) {
        var n, r, i, s, o = e.dataTypes.slice(),
            u = o[0],
            a = {},
            f = 0;
        e.dataFilter && (t = e.dataFilter(t, e.dataType));
        if (o[1])
            for (n in e.converters) a[n.toLowerCase()] = e.converters[n];
        for (; i = o[++f];)
            if (i !== "*") {
                if (u !== "*" && u !== i) {
                    n = a[u + " " + i] || a["* " + i];
                    if (!n)
                        for (r in a) {
                            s = r.split(" ");
                            if (s[1] === i) {
                                n = a[u + " " + s[0]] || a["* " + s[0]];
                                if (n) {
                                    n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));
                                    break
                                }
                            }
                        }
                    if (n !== !0)
                        if (n && e["throws"]) t = n(t);
                        else try {
                            t = n(t)
                        } catch (l) {
                            return {
                                state: "parsererror",
                                error: n ? l : "No conversion from " + u + " to " + i
                            }
                        }
                }
                u = i
            }
        return {
            state: "success",
            data: t
        }
    }

    function Fn() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function In() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function $n() {
        return setTimeout(function() {
            qn = t
        }, 0), qn = v.now()
    }

    function Jn(e, t) {
        v.each(t, function(t, n) {
            var r = (Vn[t] || []).concat(Vn["*"]),
                i = 0,
                s = r.length;
            for (; i < s; i++)
                if (r[i].call(e, t, n)) return
        })
    }

    function Kn(e, t, n) {
        var r, i = 0,
            s = 0,
            o = Xn.length,
            u = v.Deferred().always(function() {
                delete a.elem
            }),
            a = function() {
                var t = qn || $n(),
                    n = Math.max(0, f.startTime + f.duration - t),
                    r = n / f.duration || 0,
                    i = 1 - r,
                    s = 0,
                    o = f.tweens.length;
                for (; s < o; s++) f.tweens[s].run(i);
                return u.notifyWith(e, [f, i, n]), i < 1 && o ? n : (u.resolveWith(e, [f]), !1)
            },
            f = u.promise({
                elem: e,
                props: v.extend({}, t),
                opts: v.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: qn || $n(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n, r) {
                    var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                    return f.tweens.push(i), i
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? f.tweens.length : 0;
                    for (; n < r; n++) f.tweens[n].run(1);
                    return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
                }
            }),
            l = f.props;
        Qn(l, f.opts.specialEasing);
        for (; i < o; i++) {
            r = Xn[i].call(f, e, l, f.opts);
            if (r) return r
        }
        return Jn(f, l), v.isFunction(f.opts.start) && f.opts.start.call(e, f), v.fx.timer(v.extend(a, {
            anim: f,
            queue: f.opts.queue,
            elem: e
        })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function Qn(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = v.camelCase(n), i = t[r], s = e[n], v.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = v.cssHooks[r];
            if (o && "expand" in o) {
                s = o.expand(s), delete e[r];
                for (n in s) n in e || (e[n] = s[n], t[n] = i)
            } else t[r] = i
        }
    }

    function Gn(e, t, n) {
        var r, i, s, o, u, a, f, l, c, h = this,
            p = e.style,
            d = {},
            m = [],
            g = e.nodeType && Gt(e);
        n.queue || (l = v._queueHooks(e, "fx"), l.unqueued == null && (l.unqueued = 0, c = l.empty.fire, l.empty.fire = function() {
            l.unqueued || c()
        }), l.unqueued++, h.always(function() {
            h.always(function() {
                l.unqueued--, v.queue(e, "fx").length || l.empty.fire()
            })
        })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], v.css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline" ? p.display = "inline-block" : p.zoom = 1)), n.overflow && (p.overflow = "hidden", v.support.shrinkWrapBlocks || h.done(function() {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (r in t) {
            s = t[r];
            if (Un.exec(s)) {
                delete t[r], a = a || s === "toggle";
                if (s === (g ? "hide" : "show")) continue;
                m.push(r)
            }
        }
        o = m.length;
        if (o) {
            u = v._data(e, "fxshow") || v._data(e, "fxshow", {}), "hidden" in u && (g = u.hidden), a && (u.hidden = !g), g ? v(e).show() : h.done(function() {
                v(e).hide()
            }), h.done(function() {
                var t;
                v.removeData(e, "fxshow", !0);
                for (t in d) v.style(e, t, d[t])
            });
            for (r = 0; r < o; r++) i = m[r], f = h.createTween(i, g ? u[i] : 0), d[i] = u[i] || v.style(e, i), i in u || (u[i] = f.start, g && (f.end = f.start, f.start = i === "width" || i === "height" ? 1 : 0))
        }
    }

    function Yn(e, t, n, r, i) {
        return new Yn.prototype.init(e, t, n, r, i)
    }

    function Zn(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t) n = $t[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function tr(e) {
        return v.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
    }
    var n, r, i = e.document,
        s = e.location,
        o = e.navigator,
        u = e.jQuery,
        a = e.$,
        f = Array.prototype.push,
        l = Array.prototype.slice,
        c = Array.prototype.indexOf,
        h = Object.prototype.toString,
        p = Object.prototype.hasOwnProperty,
        d = String.prototype.trim,
        v = function(e, t) {
            return new v.fn.init(e, t, n)
        },
        m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        g = /\S/,
        y = /\s+/,
        b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        S = /^[\],:{}\s]*$/,
        x = /(?:^|:|,)(?:\s*\[)+/g,
        T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        C = /^-ms-/,
        k = /-([\da-z])/gi,
        L = function(e, t) {
            return (t + "").toUpperCase()
        },
        A = function() {
            i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1), v.ready()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", A), v.ready())
        },
        O = {};
    v.fn = v.prototype = {
        constructor: v,
        init: function(e, n, r) {
            var s, o, u, a;
            if (!e) return this;
            if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
            if (typeof e == "string") {
                e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = w.exec(e);
                if (s && (s[1] || !n)) {
                    if (s[1]) return n = n instanceof v ? n[0] : n, a = n && n.nodeType ? n.ownerDocument || n : i, e = v.parseHTML(s[1], a, !0), E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0), v.merge(this, e);
                    o = i.getElementById(s[2]);
                    if (o && o.parentNode) {
                        if (o.id !== s[2]) return r.find(e);
                        this.length = 1, this[0] = o
                    }
                    return this.context = i, this.selector = e, this
                }
                return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
            }
            return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this))
        },
        selector: "",
        jquery: "1.8.3",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return l.call(this)
        },
        get: function(e) {
            return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
        },
        pushStack: function(e, t, n) {
            var r = v.merge(this.constructor(), e);
            return r.prevObject = this, r.context = this.context, t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r
        },
        each: function(e, t) {
            return v.each(this, e, t)
        },
        ready: function(e) {
            return v.ready.promise().done(e), this
        },
        eq: function(e) {
            return e = +e, e === -1 ? this.slice(e) : this.slice(e, e + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","))
        },
        map: function(e) {
            return this.pushStack(v.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: [].sort,
        splice: [].splice
    }, v.fn.init.prototype = v.fn, v.extend = v.fn.extend = function() {
        var e, n, r, i, s, o, u = arguments[0] || {},
            a = 1,
            f = arguments.length,
            l = !1;
        typeof u == "boolean" && (l = u, u = arguments[1] || {}, a = 2), typeof u != "object" && !v.isFunction(u) && (u = {}), f === a && (u = this, --a);
        for (; a < f; a++)
            if ((e = arguments[a]) != null)
                for (n in e) {
                    r = u[n], i = e[n];
                    if (u === i) continue;
                    l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1, o = r && v.isArray(r) ? r : []) : o = r && v.isPlainObject(r) ? r : {}, u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i)
                }
            return u
    }, v.extend({
        noConflict: function(t) {
            return e.$ === v && (e.$ = a), t && e.jQuery === v && (e.jQuery = u), v
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? v.readyWait++ : v.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? --v.readyWait : v.isReady) return;
            if (!i.body) return setTimeout(v.ready, 1);
            v.isReady = !0;
            if (e !== !0 && --v.readyWait > 0) return;
            r.resolveWith(i, [v]), v.fn.trigger && v(i).trigger("ready").off("ready")
        },
        isFunction: function(e) {
            return v.type(e) === "function"
        },
        isArray: Array.isArray || function(e) {
            return v.type(e) === "array"
        },
        isWindow: function(e) {
            return e != null && e == e.window
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return e == null ? String(e) : O[h.call(e)] || "object"
        },
        isPlainObject: function(e) {
            if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e)) return !1;
            try {
                if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            var r;
            for (r in e);
            return r === t || p.call(e, r)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function(e) {
            throw new Error(e)
        },
        parseHTML: function(e, t, n) {
            var r;
            return !e || typeof e != "string" ? null : (typeof t == "boolean" && (n = t, t = 0), t = t || i, (r = E.exec(e)) ? [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null : []), v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes)))
        },
        parseJSON: function(t) {
            if (!t || typeof t != "string") return null;
            t = v.trim(t);
            if (e.JSON && e.JSON.parse) return e.JSON.parse(t);
            if (S.test(t.replace(T, "@").replace(N, "]").replace(x, ""))) return (new Function("return " + t))();
            v.error("Invalid JSON: " + t)
        },
        parseXML: function(n) {
            var r, i;
            if (!n || typeof n != "string") return null;
            try {
                e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
            } catch (s) {
                r = t
            }
            return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n), r
        },
        noop: function() {},
        globalEval: function(t) {
            t && g.test(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(C, "ms-").replace(k, L)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, n, r) {
            var i, s = 0,
                o = e.length,
                u = o === t || v.isFunction(e);
            if (r) {
                if (u) {
                    for (i in e)
                        if (n.apply(e[i], r) === !1) break
                } else
                    for (; s < o;)
                        if (n.apply(e[s++], r) === !1) break
            } else if (u) {
                for (i in e)
                    if (n.call(e[i], i, e[i]) === !1) break
            } else
                for (; s < o;)
                    if (n.call(e[s], s, e[s++]) === !1) break; return e
        },
        trim: d && !d.call("\ufeff\u00a0") ? function(e) {
            return e == null ? "" : d.call(e)
        } : function(e) {
            return e == null ? "" : (e + "").replace(b, "")
        },
        makeArray: function(e, t) {
            var n, r = t || [];
            return e != null && (n = v.type(e), e.length == null || n === "string" || n === "function" || n === "regexp" || v.isWindow(e) ? f.call(r, e) : v.merge(r, e)), r
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (c) return c.call(t, e, n);
                r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                for (; n < r; n++)
                    if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function(e, n) {
            var r = n.length,
                i = e.length,
                s = 0;
            if (typeof r == "number")
                for (; s < r; s++) e[i++] = n[s];
            else
                while (n[s] !== t) e[i++] = n[s++];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            var r, i = [],
                s = 0,
                o = e.length;
            n = !!n;
            for (; s < o; s++) r = !!t(e[s], s), n !== r && i.push(e[s]);
            return i
        },
        map: function(e, n, r) {
            var i, s, o = [],
                u = 0,
                a = e.length,
                f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));
            if (f)
                for (; u < a; u++) i = n(e[u], u, r), i != null && (o[o.length] = i);
            else
                for (s in e) i = n(e[s], s, r), i != null && (o[o.length] = i);
            return o.concat.apply([], o)
        },
        guid: 1,
        proxy: function(e, n) {
            var r, i, s;
            return typeof n == "string" && (r = e[n], n = e, e = r), v.isFunction(e) ? (i = l.call(arguments, 2), s = function() {
                return e.apply(n, i.concat(l.call(arguments)))
            }, s.guid = e.guid = e.guid || v.guid++, s) : t
        },
        access: function(e, n, r, i, s, o, u) {
            var a, f = r == null,
                l = 0,
                c = e.length;
            if (r && typeof r == "object") {
                for (l in r) v.access(e, n, l, r[l], 1, o, i);
                s = 1
            } else if (i !== t) {
                a = u === t && v.isFunction(i), f && (a ? (a = n, n = function(e, t, n) {
                    return a.call(v(e), n)
                }) : (n.call(e, i), n = null));
                if (n)
                    for (; l < c; l++) n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);
                s = 1
            }
            return s ? e : f ? n.call(e) : c ? n(e[0], r) : o
        },
        now: function() {
            return (new Date).getTime()
        }
    }), v.ready.promise = function(t) {
        if (!r) {
            r = v.Deferred();
            if (i.readyState === "complete") setTimeout(v.ready, 1);
            else if (i.addEventListener) i.addEventListener("DOMContentLoaded", A, !1), e.addEventListener("load", v.ready, !1);
            else {
                i.attachEvent("onreadystatechange", A), e.attachEvent("onload", v.ready);
                var n = !1;
                try {
                    n = e.frameElement == null && i.documentElement
                } catch (s) {}
                n && n.doScroll && function o() {
                    if (!v.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (e) {
                            return setTimeout(o, 50)
                        }
                        v.ready()
                    }
                }()
            }
        }
        return r.promise(t)
    }, v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
        O["[object " + t + "]"] = t.toLowerCase()
    }), n = v(i);
    var M = {};
    v.Callbacks = function(e) {
        e = typeof e == "string" ? M[e] || _(e) : v.extend({}, e);
        var n, r, i, s, o, u, a = [],
            f = !e.once && [],
            l = function(t) {
                n = e.memory && t, r = !0, u = s || 0, s = 0, o = a.length, i = !0;
                for (; a && u < o; u++)
                    if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break
                    }
                i = !1, a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable())
            },
            c = {
                add: function() {
                    if (a) {
                        var t = a.length;
                        (function r(t) {
                            v.each(t, function(t, n) {
                                var i = v.type(n);
                                i === "function" ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && i !== "string" && r(n)
                            })
                        })(arguments), i ? o = a.length : n && (s = t, l(n))
                    }
                    return this
                },
                remove: function() {
                    return a && v.each(arguments, function(e, t) {
                        var n;
                        while ((n = v.inArray(t, a, n)) > -1) a.splice(n, 1), i && (n <= o && o--, n <= u && u--)
                    }), this
                },
                has: function(e) {
                    return v.inArray(e, a) > -1
                },
                empty: function() {
                    return a = [], this
                },
                disable: function() {
                    return a = f = n = t, this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return f = t, n || c.disable(), this
                },
                locked: function() {
                    return !f
                },
                fireWith: function(e, t) {
                    return t = t || [], t = [e, t.slice ? t.slice() : t], a && (!r || f) && (i ? f.push(t) : l(t)), this
                },
                fire: function() {
                    return c.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return c
    }, v.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", v.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", v.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", v.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return v.Deferred(function(n) {
                            v.each(t, function(t, r) {
                                var s = r[0],
                                    o = e[t];
                                i[r[1]](v.isFunction(o) ? function() {
                                    var e = o.apply(this, arguments);
                                    e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n : this, [e])
                                } : n[s])
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return e != null ? v.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, v.each(t, function(e, s) {
                var o = s[2],
                    u = s[3];
                r[s[1]] = o.add, u && o.add(function() {
                    n = u
                }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = o.fire, i[s[0] + "With"] = o.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t = 0,
                n = l.call(arguments),
                r = n.length,
                i = r !== 1 || e && v.isFunction(e.promise) ? r : 0,
                s = i === 1 ? e : v.Deferred(),
                o = function(e, t, n) {
                    return function(r) {
                        t[e] = this, n[e] = arguments.length > 1 ? l.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
                    }
                },
                u, a, f;
            if (r > 1) {
                u = new Array(r), a = new Array(r), f = new Array(r);
                for (; t < r; t++) n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
            }
            return i || s.resolveWith(f, n), s.promise()
        }
    }), v.support = function() {
        var t, n, r, s, o, u, a, f, l, c, h, p = i.createElement("div");
        p.setAttribute("className", "t"), p.innerHTML = "<link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0];
        if (!n || !r || !n.length) return {};
        s = i.createElement("select"), o = s.appendChild(i.createElement("option")), u = p.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !!p.getElementsByTagName("link").length,
            style: /top/.test(r.getAttribute("style")),
            hrefNormalized: r.getAttribute("href") === "/a",
            opacity: /^0.5/.test(r.style.opacity),
            cssFloat: !!r.style.cssFloat,
            checkOn: u.value === "on",
            optSelected: o.selected,
            getSetAttribute: p.className !== "t",
            enctype: !!i.createElement("form").enctype,
            html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            boxModel: i.compatMode === "CSS1Compat",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, u.checked = !0, t.noCloneChecked = u.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !o.disabled;
        try {
            delete p.test
        } catch (d) {
            t.deleteExpando = !1
        }!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function() {
            t.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", h)), u = i.createElement("input"), u.value = "t", u.setAttribute("type", "radio"), t.radioValue = u.value === "t", u.setAttribute("checked", "checked"), u.setAttribute("name", "t"), p.appendChild(u), a = i.createDocumentFragment(), a.appendChild(p.lastChild), t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = u.checked, a.removeChild(u), a.appendChild(p);
        if (p.attachEvent)
            for (l in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) f = "on" + l, c = f in p, c || (p.setAttribute(f, "return;"), c = typeof p[f] == "function"), t[l + "Bubbles"] = c;
        return v(function() {
            var n, r, s, o, u = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                a = i.getElementsByTagName("body")[0];
            if (!a) return;
            n = i.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(n, a.firstChild), r = i.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = r.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = s[0].offsetHeight === 0, s[0].style.display = "", s[1].style.display = "none", t.reliableHiddenOffsets = c && s[0].offsetHeight === 0, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = r.offsetWidth === 4, t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1, e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%", t.boxSizingReliable = (e.getComputedStyle(r, null) || {
                width: "4px"
            }).width === "4px", o = i.createElement("div"), o.style.cssText = r.style.cssText = u, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), typeof r.style.zoom != "undefined" && (r.innerHTML = "", r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = r.offsetWidth === 3, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = r.offsetWidth !== 3, n.style.zoom = 1), a.removeChild(n), n = r = s = o = null
        }), a.removeChild(p), n = r = s = o = u = a = p = null, t
    }();
    var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        P = /([A-Z])/g;
    v.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(e) {
            return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando], !!e && !B(e)
        },
        data: function(e, n, r, i) {
            if (!v.acceptData(e)) return;
            var s, o, u = v.expando,
                a = typeof n == "string",
                f = e.nodeType,
                l = f ? v.cache : e,
                c = f ? e[u] : e[u] && u;
            if ((!c || !l[c] || !i && !l[c].data) && a && r === t) return;
            c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++ : c = u), l[c] || (l[c] = {}, f || (l[c].toJSON = v.noop));
            if (typeof n == "object" || typeof n == "function") i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data, n);
            return s = l[c], i || (s.data || (s.data = {}), s = s.data), r !== t && (s[v.camelCase(n)] = r), a ? (o = s[n], o == null && (o = s[v.camelCase(n)])) : o = s, o
        },
        removeData: function(e, t, n) {
            if (!v.acceptData(e)) return;
            var r, i, s, o = e.nodeType,
                u = o ? v.cache : e,
                a = o ? e[v.expando] : v.expando;
            if (!u[a]) return;
            if (t) {
                r = n ? u[a] : u[a].data;
                if (r) {
                    v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t), t in r ? t = [t] : t = t.split(" ")));
                    for (i = 0, s = t.length; i < s; i++) delete r[t[i]];
                    if (!(n ? B : v.isEmptyObject)(r)) return
                }
            }
            if (!n) {
                delete u[a].data;
                if (!B(u[a])) return
            }
            o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null
        },
        _data: function(e, t, n) {
            return v.data(e, t, n, !0)
        },
        acceptData: function(e) {
            var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t
        }
    }), v.fn.extend({
        data: function(e, n) {
            var r, i, s, o, u, a = this[0],
                f = 0,
                l = null;
            if (e === t) {
                if (this.length) {
                    l = v.data(a);
                    if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
                        s = a.attributes;
                        for (u = s.length; f < u; f++) o = s[f].name, o.indexOf("data-") || (o = v.camelCase(o.substring(5)), H(a, o, l[o]));
                        v._data(a, "parsedAttrs", !0)
                    }
                }
                return l
            }
            return typeof e == "object" ? this.each(function() {
                v.data(this, e)
            }) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", v.access(this, function(n) {
                if (n === t) return l = this.triggerHandler("getData" + i, [r[0]]), l === t && a && (l = v.data(a, e), l = H(a, e, l)), l === t && r[1] ? this.data(r[0]) : l;
                r[1] = n, this.each(function() {
                    var t = v(this);
                    t.triggerHandler("setData" + i, r), v.data(this, e, n), t.triggerHandler("changeData" + i, r)
                })
            }, null, n, arguments.length > 1, null, !1))
        },
        removeData: function(e) {
            return this.each(function() {
                v.removeData(this, e)
            })
        }
    }), v.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = v._data(e, t), n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = v.queue(e, t),
                r = n.length,
                i = n.shift(),
                s = v._queueHooks(e, t),
                o = function() {
                    v.dequeue(e, t)
                };
            i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return v._data(e, n) || v._data(e, n, {
                empty: v.Callbacks("once memory").add(function() {
                    v.removeData(e, t + "queue", !0), v.removeData(e, n, !0)
                })
            })
        }
    }), v.fn.extend({
        queue: function(e, n) {
            var r = 2;
            return typeof e != "string" && (n = e, e = "fx", r--), arguments.length < r ? v.queue(this[0], e) : n === t ? this : this.each(function() {
                var t = v.queue(this, e, n);
                v._queueHooks(this, e), e === "fx" && t[0] !== "inprogress" && v.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                v.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = v.fx ? v.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, n) {
            var r, i = 1,
                s = v.Deferred(),
                o = this,
                u = this.length,
                a = function() {
                    --i || s.resolveWith(o, [o])
                };
            typeof e != "string" && (n = e, e = t), e = e || "fx";
            while (u--) r = v._data(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));
            return a(), s.promise(n)
        }
    });
    var j, F, I, q = /[\t\r\n]/g,
        R = /\r/g,
        U = /^(?:button|input)$/i,
        z = /^(?:button|input|object|select|textarea)$/i,
        W = /^a(?:rea|)$/i,
        X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        V = v.support.getSetAttribute;
    v.fn.extend({
        attr: function(e, t) {
            return v.access(this, v.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                v.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return v.access(this, v.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = v.propFix[e] || e, this.each(function() {
                try {
                    this[e] = t, delete this[e]
                } catch (n) {}
            })
        },
        addClass: function(e) {
            var t, n, r, i, s, o, u;
            if (v.isFunction(e)) return this.each(function(t) {
                v(this).addClass(e.call(this, t, this.className))
            });
            if (e && typeof e == "string") {
                t = e.split(y);
                for (n = 0, r = this.length; n < r; n++) {
                    i = this[n];
                    if (i.nodeType === 1)
                        if (!i.className && t.length === 1) i.className = e;
                        else {
                            s = " " + i.className + " ";
                            for (o = 0, u = t.length; o < u; o++) s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ");
                            i.className = v.trim(s)
                        }
                }
            }
            return this
        },
        removeClass: function(e) {
            var n, r, i, s, o, u, a;
            if (v.isFunction(e)) return this.each(function(t) {
                v(this).removeClass(e.call(this, t, this.className))
            });
            if (e && typeof e == "string" || e === t) {
                n = (e || "").split(y);
                for (u = 0, a = this.length; u < a; u++) {
                    i = this[u];
                    if (i.nodeType === 1 && i.className) {
                        r = (" " + i.className + " ").replace(q, " ");
                        for (s = 0, o = n.length; s < o; s++)
                            while (r.indexOf(" " + n[s] + " ") >= 0) r = r.replace(" " + n[s] + " ", " ");
                        i.className = e ? v.trim(r) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                r = typeof t == "boolean";
            return v.isFunction(e) ? this.each(function(n) {
                v(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if (n === "string") {
                    var i, s = 0,
                        o = v(this),
                        u = t,
                        a = e.split(y);
                    while (i = a[s++]) u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i)
                } else if (n === "undefined" || n === "boolean") this.className && v._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : v._data(this, "__className__") || ""
            })
        },
        hasClass: function(e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; n < r; n++)
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function(e) {
            var n, r, i, s = this[0];
            if (!arguments.length) {
                if (s) return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()], n && "get" in n && (r = n.get(s, "value")) !== t ? r : (r = s.value, typeof r == "string" ? r.replace(R, "") : r == null ? "" : r);
                return
            }
            return i = v.isFunction(e), this.each(function(r) {
                var s, o = v(this);
                if (this.nodeType !== 1) return;
                i ? s = e.call(this, r, o.val()) : s = e, s == null ? s = "" : typeof s == "number" ? s += "" : v.isArray(s) && (s = v.map(s, function(e) {
                    return e == null ? "" : e + ""
                })), n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];
                if (!n || !("set" in n) || n.set(this, s, "value") === t) this.value = s
            })
        }
    }), v.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    var t, n, r = e.options,
                        i = e.selectedIndex,
                        s = e.type === "select-one" || i < 0,
                        o = s ? null : [],
                        u = s ? i + 1 : r.length,
                        a = i < 0 ? u : s ? i : 0;
                    for (; a < u; a++) {
                        n = r[a];
                        if ((n.selected || a === i) && (v.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !v.nodeName(n.parentNode, "optgroup"))) {
                            t = v(n).val();
                            if (s) return t;
                            o.push(t)
                        }
                    }
                    return o
                },
                set: function(e, t) {
                    var n = v.makeArray(t);
                    return v(e).find("option").each(function() {
                        this.selected = v.inArray(v(this).val(), n) >= 0
                    }), n.length || (e.selectedIndex = -1), n
                }
            }
        },
        attrFn: {},
        attr: function(e, n, r, i) {
            var s, o, u, a = e.nodeType;
            if (!e || a === 3 || a === 8 || a === 2) return;
            if (i && v.isFunction(v.fn[n])) return v(e)[n](r);
            if (typeof e.getAttribute == "undefined") return v.prop(e, n, r);
            u = a !== 1 || !v.isXMLDoc(e), u && (n = n.toLowerCase(), o = v.attrHooks[n] || (X.test(n) ? F : j));
            if (r !== t) {
                if (r === null) {
                    v.removeAttr(e, n);
                    return
                }
                return o && "set" in o && u && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r)
            }
            return o && "get" in o && u && (s = o.get(e, n)) !== null ? s : (s = e.getAttribute(n), s === null ? t : s)
        },
        removeAttr: function(e, t) {
            var n, r, i, s, o = 0;
            if (t && e.nodeType === 1) {
                r = t.split(y);
                for (; o < r.length; o++) i = r[o], i && (n = v.propFix[i] || i, s = X.test(i), s || v.attr(e, i, ""), e.removeAttribute(V ? i : n), s && n in e && (e[n] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (U.test(e.nodeName) && e.parentNode) v.error("type property can't be changed");
                    else if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            },
            value: {
                get: function(e, t) {
                    return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value : null
                },
                set: function(e, t, n) {
                    if (j && v.nodeName(e, "button")) return j.set(e, t, n);
                    e.value = t
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(e, n, r) {
            var i, s, o, u = e.nodeType;
            if (!e || u === 3 || u === 8 || u === 2) return;
            return o = u !== 1 || !v.isXMLDoc(e), o && (n = v.propFix[n] || n, s = v.propHooks[n]), r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && (i = s.get(e, n)) !== null ? i : e[n]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }), F = {
        get: function(e, n) {
            var r, i = v.prop(e, n);
            return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
        },
        set: function(e, t, n) {
            var r;
            return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n
        }
    }, V || (I = {
        name: !0,
        id: !0,
        coords: !0
    }, j = v.valHooks.button = {
        get: function(e, n) {
            var r;
            return r = e.getAttributeNode(n), r && (I[n] ? r.value !== "" : r.specified) ? r.value : t
        },
        set: function(e, t, n) {
            var r = e.getAttributeNode(n);
            return r || (r = i.createAttribute(n), e.setAttributeNode(r)), r.value = t + ""
        }
    }, v.each(["width", "height"], function(e, t) {
        v.attrHooks[t] = v.extend(v.attrHooks[t], {
            set: function(e, n) {
                if (n === "") return e.setAttribute(t, "auto"), n
            }
        })
    }), v.attrHooks.contenteditable = {
        get: j.get,
        set: function(e, t, n) {
            t === "" && (t = "false"), j.set(e, t, n)
        }
    }), v.support.hrefNormalized || v.each(["href", "src", "width", "height"], function(e, n) {
        v.attrHooks[n] = v.extend(v.attrHooks[n], {
            get: function(e) {
                var r = e.getAttribute(n, 2);
                return r === null ? t : r
            }
        })
    }), v.support.style || (v.attrHooks.style = {
        get: function(e) {
            return e.style.cssText.toLowerCase() || t
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    }), v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    })), v.support.enctype || (v.propFix.enctype = "encoding"), v.support.checkOn || v.each(["radio", "checkbox"], function() {
        v.valHooks[this] = {
            get: function(e) {
                return e.getAttribute("value") === null ? "on" : e.value
            }
        }
    }), v.each(["radio", "checkbox"], function() {
        v.valHooks[this] = v.extend(v.valHooks[this], {
            set: function(e, t) {
                if (v.isArray(t)) return e.checked = v.inArray(v(e).val(), t) >= 0
            }
        })
    });
    var $ = /^(?:textarea|input|select)$/i,
        J = /^([^\.]*|)(?:\.(.+)|)$/,
        K = /(?:^|\s)hover(\.\S+|)\b/,
        Q = /^key/,
        G = /^(?:mouse|contextmenu)|click/,
        Y = /^(?:focusinfocus|focusoutblur)$/,
        Z = function(e) {
            return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1")
        };
    v.event = {
            add: function(e, n, r, i, s) {
                var o, u, a, f, l, c, h, p, d, m, g;
                if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e))) return;
                r.handler && (d = r, r = d.handler, s = d.selector), r.guid || (r.guid = v.guid++), a = o.events, a || (o.events = a = {}), u = o.handle, u || (o.handle = u = function(e) {
                    return typeof v == "undefined" || !!e && v.event.triggered === e.type ? t : v.event.dispatch.apply(u.elem, arguments)
                }, u.elem = e), n = v.trim(Z(n)).split(" ");
                for (f = 0; f < n.length; f++) {
                    l = J.exec(n[f]) || [], c = l[1], h = (l[2] || "").split(".").sort(), g = v.event.special[c] || {}, c = (s ? g.delegateType : g.bindType) || c, g = v.event.special[c] || {}, p = v.extend({
                        type: c,
                        origType: l[1],
                        data: i,
                        handler: r,
                        guid: r.guid,
                        selector: s,
                        needsContext: s && v.expr.match.needsContext.test(s),
                        namespace: h.join(".")
                    }, d), m = a[c];
                    if (!m) {
                        m = a[c] = [], m.delegateCount = 0;
                        if (!g.setup || g.setup.call(e, i, h, u) === !1) e.addEventListener ? e.addEventListener(c, u, !1) : e.attachEvent && e.attachEvent("on" + c, u)
                    }
                    g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), s ? m.splice(m.delegateCount++, 0, p) : m.push(p), v.event.global[c] = !0
                }
                e = null
            },
            global: {},
            remove: function(e, t, n, r, i) {
                var s, o, u, a, f, l, c, h, p, d, m, g = v.hasData(e) && v._data(e);
                if (!g || !(h = g.events)) return;
                t = v.trim(Z(t || "")).split(" ");
                for (s = 0; s < t.length; s++) {
                    o = J.exec(t[s]) || [], u = a = o[1], f = o[2];
                    if (!u) {
                        for (u in h) v.event.remove(e, u + t[s], n, r, !0);
                        continue
                    }
                    p = v.event.special[u] || {}, u = (r ? p.delegateType : p.bindType) || u, d = h[u] || [], l = d.length, f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                    for (c = 0; c < d.length; c++) m = d[c], (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || r === "**" && m.selector) && (d.splice(c--, 1), m.selector && d.delegateCount--, p.remove && p.remove.call(e, m));
                    d.length === 0 && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e, u, g.handle), delete h[u])
                }
                v.isEmptyObject(h) && (delete g.handle, v.removeData(e, "events", !0))
            },
            customEvent: {
                getData: !0,
                setData: !0,
                changeData: !0
            },
            trigger: function(n, r, s, o) {
                if (!s || s.nodeType !== 3 && s.nodeType !== 8) {
                    var u, a, f, l, c, h, p, d, m, g, y = n.type || n,
                        b = [];
                    if (Y.test(y + v.event.triggered)) return;
                    y.indexOf("!") >= 0 && (y = y.slice(0, -1), a = !0), y.indexOf(".") >= 0 && (b = y.split("."), y = b.shift(), b.sort());
                    if ((!s || v.event.customEvent[y]) && !v.event.global[y]) return;
                    n = typeof n == "object" ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y), n.type = y, n.isTrigger = !0, n.exclusive = a, n.namespace = b.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = y.indexOf(":") < 0 ? "on" + y : "";
                    if (!s) {
                        u = v.cache;
                        for (f in u) u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0);
                        return
                    }
                    n.result = t, n.target || (n.target = s), r = r != null ? v.makeArray(r) : [], r.unshift(n), p = v.event.special[y] || {};
                    if (p.trigger && p.trigger.apply(s, r) === !1) return;
                    m = [
                        [s, p.bindType || y]
                    ];
                    if (!o && !p.noBubble && !v.isWindow(s)) {
                        g = p.delegateType || y, l = Y.test(g + y) ? s : s.parentNode;
                        for (c = s; l; l = l.parentNode) m.push([l, g]), c = l;
                        c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g])
                    }
                    for (f = 0; f < m.length && !n.isPropagationStopped(); f++) l = m[f][0], n.type = m[f][1], d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle"), d && d.apply(l, r), d = h && l[h], d && v.acceptData(l) && d.apply && d.apply(l, r) === !1 && n.preventDefault();
                    return n.type = y, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (y !== "click" || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && (y !== "focus" && y !== "blur" || n.target.offsetWidth !== 0) && !v.isWindow(s) && (c = s[h], c && (s[h] = null), v.event.triggered = y, s[y](), v.event.triggered = t, c && (s[h] = c)), n.result
                }
                return
            },
            dispatch: function(n) {
                n = v.event.fix(n || e.event);
                var r, i, s, o, u, a, f, c, h, p, d = (v._data(this, "events") || {})[n.type] || [],
                    m = d.delegateCount,
                    g = l.call(arguments),
                    y = !n.exclusive && !n.namespace,
                    b = v.event.special[n.type] || {},
                    w = [];
                g[0] = n, n.delegateTarget = this;
                if (b.preDispatch && b.preDispatch.call(this, n) === !1) return;
                if (m && (!n.button || n.type !== "click"))
                    for (s = n.target; s != this; s = s.parentNode || this)
                        if (s.disabled !== !0 || n.type !== "click") {
                            u = {}, f = [];
                            for (r = 0; r < m; r++) c = d[r], h = c.selector, u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length), u[h] && f.push(c);
                            f.length && w.push({
                                elem: s,
                                matches: f
                            })
                        }
                d.length > m && w.push({
                    elem: this,
                    matches: d.slice(m)
                });
                for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
                    a = w[r], n.currentTarget = a.elem;
                    for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
                        c = a.matches[i];
                        if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) n.data = c.data, n.handleObj = c, o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g), o !== t && (n.result = o, o === !1 && (n.preventDefault(), n.stopPropagation()))
                    }
                }
                return b.postDispatch && b.postDispatch.call(this, n), n.result
            },
            props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, n) {
                    var r, s, o, u = n.button,
                        a = n.fromElement;
                    return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i, s = r.documentElement, o = r.body, e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e
                }
            },
            fix: function(e) {
                if (e[v.expando]) return e;
                var t, n, r = e,
                    s = v.event.fixHooks[e.type] || {},
                    o = s.props ? this.props.concat(s.props) : this.props;
                e = v.Event(r);
                for (t = o.length; t;) n = o[--t], e[n] = r[n];
                return e.target || (e.target = r.srcElement || i), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    delegateType: "focusin"
                },
                blur: {
                    delegateType: "focusout"
                },
                beforeunload: {
                    setup: function(e, t, n) {
                        v.isWindow(this) && (this.onbeforeunload = n)
                    },
                    teardown: function(e, t) {
                        this.onbeforeunload === t && (this.onbeforeunload = null)
                    }
                }
            },
            simulate: function(e, t, n, r) {
                var i = v.extend(new v.Event, n, {
                    type: e,
                    isSimulated: !0,
                    originalEvent: {}
                });
                r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
            }
        }, v.event.handle = v.event.dispatch, v.removeEvent = i.removeEventListener ? function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        } : function(e, t, n) {
            var r = "on" + t;
            e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null), e.detachEvent(r, n))
        }, v.Event = function(e, t) {
            if (!(this instanceof v.Event)) return new v.Event(e, t);
            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? tt : et) : this.type = e, t && v.extend(this, t), this.timeStamp = e && e.timeStamp || v.now(), this[v.expando] = !0
        }, v.Event.prototype = {
            preventDefault: function() {
                this.isDefaultPrevented = tt;
                var e = this.originalEvent;
                if (!e) return;
                e.preventDefault ? e.preventDefault() : e.returnValue = !1
            },
            stopPropagation: function() {
                this.isPropagationStopped = tt;
                var e = this.originalEvent;
                if (!e) return;
                e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = tt, this.stopPropagation()
            },
            isDefaultPrevented: et,
            isPropagationStopped: et,
            isImmediatePropagationStopped: et
        }, v.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(e, t) {
            v.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, r = this,
                        i = e.relatedTarget,
                        s = e.handleObj,
                        o = s.selector;
                    if (!i || i !== r && !v.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
                    return n
                }
            }
        }), v.support.submitBubbles || (v.event.special.submit = {
            setup: function() {
                if (v.nodeName(this, "form")) return !1;
                v.event.add(this, "click._submit keypress._submit", function(e) {
                    var n = e.target,
                        r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;
                    r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit", function(e) {
                        e._submit_bubble = !0
                    }), v._data(r, "_submit_attached", !0))
                })
            },
            postDispatch: function(e) {
                e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && v.event.simulate("submit", this.parentNode, e, !0))
            },
            teardown: function() {
                if (v.nodeName(this, "form")) return !1;
                v.event.remove(this, "._submit")
            }
        }), v.support.changeBubbles || (v.event.special.change = {
            setup: function() {
                if ($.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") v.event.add(this, "propertychange._change", function(e) {
                        e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                    }), v.event.add(this, "click._change", function(e) {
                        this._just_changed && !e.isTrigger && (this._just_changed = !1), v.event.simulate("change", this, e, !0)
                    });
                    return !1
                }
                v.event.add(this, "beforeactivate._change", function(e) {
                    var t = e.target;
                    $.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change", function(e) {
                        this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0)
                    }), v._data(t, "_change_attached", !0))
                })
            },
            handle: function(e) {
                var t = e.target;
                if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments)
            },
            teardown: function() {
                return v.event.remove(this, "._change"), !$.test(this.nodeName)
            }
        }), v.support.focusinBubbles || v.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = 0,
                r = function(e) {
                    v.event.simulate(t, e.target, v.event.fix(e), !0)
                };
            v.event.special[t] = {
                setup: function() {
                    n++ === 0 && i.addEventListener(e, r, !0)
                },
                teardown: function() {
                    --n === 0 && i.removeEventListener(e, r, !0)
                }
            }
        }), v.fn.extend({
            on: function(e, n, r, i, s) {
                var o, u;
                if (typeof e == "object") {
                    typeof n != "string" && (r = r || n, n = t);
                    for (u in e) this.on(u, n, r, e[u], s);
                    return this
                }
                r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));
                if (i === !1) i = et;
                else if (!i) return this;
                return s === 1 && (o = i, i = function(e) {
                    return v().off(e), o.apply(this, arguments)
                }, i.guid = o.guid || (o.guid = v.guid++)), this.each(function() {
                    v.event.add(this, e, i, r, n)
                })
            },
            one: function(e, t, n, r) {
                return this.on(e, t, n, r, 1)
            },
            off: function(e, n, r) {
                var i, s;
                if (e && e.preventDefault && e.handleObj) return i = e.handleObj, v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if (typeof e == "object") {
                    for (s in e) this.off(s, n, e[s]);
                    return this
                }
                if (n === !1 || typeof n == "function") r = n, n = t;
                return r === !1 && (r = et), this.each(function() {
                    v.event.remove(this, e, r, n)
                })
            },
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            live: function(e, t, n) {
                return v(this.context).on(e, this.selector, t, n), this
            },
            die: function(e, t) {
                return v(this.context).off(e, this.selector || "**", t), this
            },
            delegate: function(e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function(e, t, n) {
                return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
            },
            trigger: function(e, t) {
                return this.each(function() {
                    v.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                if (this[0]) return v.event.trigger(e, t, this[0], !0)
            },
            toggle: function(e) {
                var t = arguments,
                    n = e.guid || v.guid++,
                    r = 0,
                    i = function(n) {
                        var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;
                        return v._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1
                    };
                i.guid = n;
                while (r < t.length) t[r++].guid = n;
                return this.click(i)
            },
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }), v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            v.fn[t] = function(e, n) {
                return n == null && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }, Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks), G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks)
        }),
        function(e, t) {
            function nt(e, t, n, r) {
                n = n || [], t = t || g;
                var i, s, a, f, l = t.nodeType;
                if (!e || typeof e != "string") return n;
                if (l !== 1 && l !== 9) return [];
                a = o(t);
                if (!a && !r)
                    if (i = R.exec(e))
                        if (f = i[1]) {
                            if (l === 9) {
                                s = t.getElementById(f);
                                if (!s || !s.parentNode) return n;
                                if (s.id === f) return n.push(s), n
                            } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f) return n.push(s), n
                        } else {
                            if (i[2]) return S.apply(n, x.call(t.getElementsByTagName(e), 0)), n;
                            if ((f = i[3]) && Z && t.getElementsByClassName) return S.apply(n, x.call(t.getElementsByClassName(f), 0)), n
                        }
                return vt(e.replace(j, "$1"), t, n, r, a)
            }

            function rt(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return n === "input" && t.type === e
                }
            }

            function it(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return (n === "input" || n === "button") && t.type === e
                }
            }

            function st(e) {
                return N(function(t) {
                    return t = +t, N(function(n, r) {
                        var i, s = e([], n.length, t),
                            o = s.length;
                        while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }

            function ot(e, t, n) {
                if (e === t) return n;
                var r = e.nextSibling;
                while (r) {
                    if (r === t) return -1;
                    r = r.nextSibling
                }
                return 1
            }

            function ut(e, t) {
                var n, r, s, o, u, a, f, l = L[d][e + " "];
                if (l) return t ? 0 : l.slice(0);
                u = e, a = [], f = i.preFilter;
                while (u) {
                    if (!n || (r = F.exec(u))) r && (u = u.slice(r[0].length) || u), a.push(s = []);
                    n = !1;
                    if (r = I.exec(u)) s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = r[0].replace(j, " ");
                    for (o in i.filter)(r = J[o].exec(u)) && (!f[o] || (r = f[o](r))) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = o, n.matches = r);
                    if (!n) break
                }
                return t ? u.length : u ? nt.error(e) : L(e, a).slice(0)
            }

            function at(e, t, r) {
                var i = t.dir,
                    s = r && t.dir === "parentNode",
                    o = w++;
                return t.first ? function(t, n, r) {
                    while (t = t[i])
                        if (s || t.nodeType === 1) return e(t, n, r)
                } : function(t, r, u) {
                    if (!u) {
                        var a, f = b + " " + o + " ",
                            l = f + n;
                        while (t = t[i])
                            if (s || t.nodeType === 1) {
                                if ((a = t[d]) === l) return t.sizset;
                                if (typeof a == "string" && a.indexOf(f) === 0) {
                                    if (t.sizset) return t
                                } else {
                                    t[d] = l;
                                    if (e(t, r, u)) return t.sizset = !0, t;
                                    t.sizset = !1
                                }
                            }
                    } else
                        while (t = t[i])
                            if (s || t.nodeType === 1)
                                if (e(t, r, u)) return t
                }
            }

            function ft(e) {
                return e.length > 1 ? function(t, n, r) {
                    var i = e.length;
                    while (i--)
                        if (!e[i](t, n, r)) return !1;
                    return !0
                } : e[0]
            }

            function lt(e, t, n, r, i) {
                var s, o = [],
                    u = 0,
                    a = e.length,
                    f = t != null;
                for (; u < a; u++)
                    if (s = e[u])
                        if (!n || n(s, r, i)) o.push(s), f && t.push(u);
                return o
            }

            function ct(e, t, n, r, i, s) {
                return r && !r[d] && (r = ct(r)), i && !i[d] && (i = ct(i, s)), N(function(s, o, u, a) {
                    var f, l, c, h = [],
                        p = [],
                        d = o.length,
                        v = s || dt(t || "*", u.nodeType ? [u] : u, []),
                        m = e && (s || !t) ? lt(v, h, e, u, a) : v,
                        g = n ? i || (s ? e : d || r) ? [] : o : m;
                    n && n(m, g, u, a);
                    if (r) {
                        f = lt(g, p), r(f, [], u, a), l = f.length;
                        while (l--)
                            if (c = f[l]) g[p[l]] = !(m[p[l]] = c)
                    }
                    if (s) {
                        if (i || e) {
                            if (i) {
                                f = [], l = g.length;
                                while (l--)(c = g[l]) && f.push(m[l] = c);
                                i(null, g = [], f, a)
                            }
                            l = g.length;
                            while (l--)(c = g[l]) && (f = i ? T.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                        }
                    } else g = lt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : S.apply(o, g)
                })
            }

            function ht(e) {
                var t, n, r, s = e.length,
                    o = i.relative[e[0].type],
                    u = o || i.relative[" "],
                    a = o ? 1 : 0,
                    f = at(function(e) {
                        return e === t
                    }, u, !0),
                    l = at(function(e) {
                        return T.call(t, e) > -1
                    }, u, !0),
                    h = [function(e, n, r) {
                        return !o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r))
                    }];
                for (; a < s; a++)
                    if (n = i.relative[e[a].type]) h = [at(ft(h), n)];
                    else {
                        n = i.filter[e[a].type].apply(null, e[a].matches);
                        if (n[d]) {
                            r = ++a;
                            for (; r < s; r++)
                                if (i.relative[e[r].type]) break;
                            return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)), r < s && ht(e = e.slice(r)), r < s && e.join(""))
                        }
                        h.push(n)
                    }
                return ft(h)
            }

            function pt(e, t) {
                var r = t.length > 0,
                    s = e.length > 0,
                    o = function(u, a, f, l, h) {
                        var p, d, v, m = [],
                            y = 0,
                            w = "0",
                            x = u && [],
                            T = h != null,
                            N = c,
                            C = u || s && i.find.TAG("*", h && a.parentNode || a),
                            k = b += N == null ? 1 : Math.E;
                        T && (c = a !== g && a, n = o.el);
                        for (;
                            (p = C[w]) != null; w++) {
                            if (s && p) {
                                for (d = 0; v = e[d]; d++)
                                    if (v(p, a, f)) {
                                        l.push(p);
                                        break
                                    }
                                T && (b = k, n = ++o.el)
                            }
                            r && ((p = !v && p) && y--, u && x.push(p))
                        }
                        y += w;
                        if (r && w !== y) {
                            for (d = 0; v = t[d]; d++) v(x, m, a, f);
                            if (u) {
                                if (y > 0)
                                    while (w--) !x[w] && !m[w] && (m[w] = E.call(l));
                                m = lt(m)
                            }
                            S.apply(l, m), T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l)
                        }
                        return T && (b = k, c = N), x
                    };
                return o.el = 0, r ? N(o) : o
            }

            function dt(e, t, n) {
                var r = 0,
                    i = t.length;
                for (; r < i; r++) nt(e, t[r], n);
                return n
            }

            function vt(e, t, n, r, s) {
                var o, u, f, l, c, h = ut(e),
                    p = h.length;
                if (!r && h.length === 1) {
                    u = h[0] = h[0].slice(0);
                    if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
                        t = i.find.ID(f.matches[0].replace($, ""), t, s)[0];
                        if (!t) return n;
                        e = e.slice(u.shift().length)
                    }
                    for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0; o--) {
                        f = u[o];
                        if (i.relative[l = f.type]) break;
                        if (c = i.find[l])
                            if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
                                u.splice(o, 1), e = r.length && u.join("");
                                if (!e) return S.apply(n, x.call(r, 0)), n;
                                break
                            }
                    }
                }
                return a(e, h)(r, t, s, n, z.test(e)), n
            }

            function mt() {}
            var n, r, i, s, o, u, a, f, l, c, h = !0,
                p = "undefined",
                d = ("sizcache" + Math.random()).replace(".", ""),
                m = String,
                g = e.document,
                y = g.documentElement,
                b = 0,
                w = 0,
                E = [].pop,
                S = [].push,
                x = [].slice,
                T = [].indexOf || function(e) {
                    var t = 0,
                        n = this.length;
                    for (; t < n; t++)
                        if (this[t] === e) return t;
                    return -1
                },
                N = function(e, t) {
                    return e[d] = t == null || t, e
                },
                C = function() {
                    var e = {},
                        t = [];
                    return N(function(n, r) {
                        return t.push(n) > i.cacheLength && delete e[t.shift()], e[n + " "] = r
                    }, e)
                },
                k = C(),
                L = C(),
                A = C(),
                O = "[\\x20\\t\\r\\n\\f]",
                M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
                _ = M.replace("w", "w#"),
                D = "([*^$|!~]?=)",
                P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]",
                H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)",
                B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)",
                j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
                F = new RegExp("^" + O + "*," + O + "*"),
                I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"),
                q = new RegExp(H),
                R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
                U = /^:not/,
                z = /[\x20\t\r\n\f]*[+~]/,
                W = /:not\($/,
                X = /h\d/i,
                V = /input|select|textarea|button/i,
                $ = /\\(?!\\)/g,
                J = {
                    ID: new RegExp("^#(" + M + ")"),
                    CLASS: new RegExp("^\\.(" + M + ")"),
                    NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"),
                    TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + P),
                    PSEUDO: new RegExp("^" + H),
                    POS: new RegExp(B, "i"),
                    CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
                    needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i")
                },
                K = function(e) {
                    var t = g.createElement("div");
                    try {
                        return e(t)
                    } catch (n) {
                        return !1
                    } finally {
                        t = null
                    }
                },
                Q = K(function(e) {
                    return e.appendChild(g.createComment("")), !e.getElementsByTagName("*").length
                }),
                G = K(function(e) {
                    return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== p && e.firstChild.getAttribute("href") === "#"
                }),
                Y = K(function(e) {
                    e.innerHTML = "<select></select>";
                    var t = typeof e.lastChild.getAttribute("multiple");
                    return t !== "boolean" && t !== "string"
                }),
                Z = K(function(e) {
                    return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length === 2)
                }),
                et = K(function(e) {
                    e.id = d + 0, e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>", y.insertBefore(e, y.firstChild);
                    var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;
                    return r = !g.getElementById(d), y.removeChild(e), t
                });
            try {
                x.call(y.childNodes, 0)[0].nodeType
            } catch (tt) {
                x = function(e) {
                    var t, n = [];
                    for (; t = this[e]; e++) n.push(t);
                    return n
                }
            }
            nt.matches = function(e, t) {
                return nt(e, null, null, t)
            }, nt.matchesSelector = function(e, t) {
                return nt(t, null, null, [e]).length > 0
            }, s = nt.getText = function(e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (i === 1 || i === 9 || i === 11) {
                        if (typeof e.textContent == "string") return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += s(e)
                    } else if (i === 3 || i === 4) return e.nodeValue
                } else
                    for (; t = e[r]; r++) n += s(t);
                return n
            }, o = nt.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? t.nodeName !== "HTML" : !1
            }, u = nt.contains = y.contains ? function(e, t) {
                var n = e.nodeType === 9 ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !!(r && r.nodeType === 1 && n.contains && n.contains(r))
            } : y.compareDocumentPosition ? function(e, t) {
                return t && !!(e.compareDocumentPosition(t) & 16)
            } : function(e, t) {
                while (t = t.parentNode)
                    if (t === e) return !0;
                return !1
            }, nt.attr = function(e, t) {
                var n, r = o(e);
                return r || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? typeof e[t] == "boolean" ? e[t] ? t : null : n.specified ? n.value : null : null)
            }, i = nt.selectors = {
                cacheLength: 50,
                createPseudo: N,
                match: J,
                attrHandle: G ? {} : {
                    href: function(e) {
                        return e.getAttribute("href", 2)
                    },
                    type: function(e) {
                        return e.getAttribute("type")
                    }
                },
                find: {
                    ID: r ? function(e, t, n) {
                        if (typeof t.getElementById !== p && !n) {
                            var r = t.getElementById(e);
                            return r && r.parentNode ? [r] : []
                        }
                    } : function(e, n, r) {
                        if (typeof n.getElementById !== p && !r) {
                            var i = n.getElementById(e);
                            return i ? i.id === e || typeof i.getAttributeNode !== p && i.getAttributeNode("id").value === e ? [i] : t : []
                        }
                    },
                    TAG: Q ? function(e, t) {
                        if (typeof t.getElementsByTagName !== p) return t.getElementsByTagName(e)
                    } : function(e, t) {
                        var n = t.getElementsByTagName(e);
                        if (e === "*") {
                            var r, i = [],
                                s = 0;
                            for (; r = n[s]; s++) r.nodeType === 1 && i.push(r);
                            return i
                        }
                        return n
                    },
                    NAME: et && function(e, t) {
                        if (typeof t.getElementsByName !== p) return t.getElementsByName(name)
                    },
                    CLASS: Z && function(e, t, n) {
                        if (typeof t.getElementsByClassName !== p && !n) return t.getElementsByClassName(e)
                    }
                },
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace($, ""), e[3] = (e[4] || e[5] || "").replace($, ""), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), e[1] === "nth" ? (e[2] || nt.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * (e[2] === "even" || e[2] === "odd")), e[4] = +(e[6] + e[7] || e[2] === "odd")) : e[2] && nt.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n;
                        if (J.CHILD.test(e[0])) return null;
                        if (e[3]) e[2] = e[3];
                        else if (t = e[4]) q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t;
                        return e.slice(0, 3)
                    }
                },
                filter: {
                    ID: r ? function(e) {
                        return e = e.replace($, ""),
                            function(t) {
                                return t.getAttribute("id") === e
                            }
                    } : function(e) {
                        return e = e.replace($, ""),
                            function(t) {
                                var n = typeof t.getAttributeNode !== p && t.getAttributeNode("id");
                                return n && n.value === e
                            }
                    },
                    TAG: function(e) {
                        return e === "*" ? function() {
                            return !0
                        } : (e = e.replace($, "").toLowerCase(), function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        })
                    },
                    CLASS: function(e) {
                        var t = k[d][e + " "];
                        return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && k(e, function(e) {
                            return t.test(e.className || typeof e.getAttribute !== p && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, t, n) {
                        return function(r, i) {
                            var s = nt.attr(r, e);
                            return s == null ? t === "!=" : t ? (s += "", t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0
                        }
                    },
                    CHILD: function(e, t, n, r) {
                        return e === "nth" ? function(e) {
                            var t, i, s = e.parentNode;
                            if (n === 1 && r === 0) return !0;
                            if (s) {
                                i = 0;
                                for (t = s.firstChild; t; t = t.nextSibling)
                                    if (t.nodeType === 1) {
                                        i++;
                                        if (e === t) break
                                    }
                            }
                            return i -= r, i === n || i % n === 0 && i / n >= 0
                        } : function(t) {
                            var n = t;
                            switch (e) {
                                case "only":
                                case "first":
                                    while (n = n.previousSibling)
                                        if (n.nodeType === 1) return !1;
                                    if (e === "first") return !0;
                                    n = t;
                                case "last":
                                    while (n = n.nextSibling)
                                        if (n.nodeType === 1) return !1;
                                    return !0
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);
                        return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function(e, n) {
                            var i, s = r(e, t),
                                o = s.length;
                            while (o--) i = T.call(e, s[o]), e[i] = !(n[i] = s[o])
                        }) : function(e) {
                            return r(e, 0, n)
                        }) : r
                    }
                },
                pseudos: {
                    not: N(function(e) {
                        var t = [],
                            n = [],
                            r = a(e.replace(j, "$1"));
                        return r[d] ? N(function(e, t, n, i) {
                            var s, o = r(e, null, i, []),
                                u = e.length;
                            while (u--)
                                if (s = o[u]) e[u] = !(t[u] = s)
                        }) : function(e, i, s) {
                            return t[0] = e, r(t, null, s, n), !n.pop()
                        }
                    }),
                    has: N(function(e) {
                        return function(t) {
                            return nt(e, t).length > 0
                        }
                    }),
                    contains: N(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText || s(t)).indexOf(e) > -1
                        }
                    }),
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return t === "input" && !!e.checked || t === "option" && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    parent: function(e) {
                        return !i.pseudos.empty(e)
                    },
                    empty: function(e) {
                        var t;
                        e = e.firstChild;
                        while (e) {
                            if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4) return !1;
                            e = e.nextSibling
                        }
                        return !0
                    },
                    header: function(e) {
                        return X.test(e.nodeName)
                    },
                    text: function(e) {
                        var t, n;
                        return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) == null || n.toLowerCase() === t)
                    },
                    radio: rt("radio"),
                    checkbox: rt("checkbox"),
                    file: rt("file"),
                    password: rt("password"),
                    image: rt("image"),
                    submit: it("submit"),
                    reset: it("reset"),
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return t === "input" && e.type === "button" || t === "button"
                    },
                    input: function(e) {
                        return V.test(e.nodeName)
                    },
                    focus: function(e) {
                        var t = e.ownerDocument;
                        return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    active: function(e) {
                        return e === e.ownerDocument.activeElement
                    },
                    first: st(function() {
                        return [0]
                    }),
                    last: st(function(e, t) {
                        return [t - 1]
                    }),
                    eq: st(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: st(function(e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: st(function(e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: st(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                        return e
                    }),
                    gt: st(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                        return e
                    })
                }
            }, f = y.compareDocumentPosition ? function(e, t) {
                return e === t ? (l = !0, 0) : (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition : e.compareDocumentPosition(t) & 4) ? -1 : 1
            } : function(e, t) {
                if (e === t) return l = !0, 0;
                if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
                var n, r, i = [],
                    s = [],
                    o = e.parentNode,
                    u = t.parentNode,
                    a = o;
                if (o === u) return ot(e, t);
                if (!o) return -1;
                if (!u) return 1;
                while (a) i.unshift(a), a = a.parentNode;
                a = u;
                while (a) s.unshift(a), a = a.parentNode;
                n = i.length, r = s.length;
                for (var f = 0; f < n && f < r; f++)
                    if (i[f] !== s[f]) return ot(i[f], s[f]);
                return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1)
            }, [0, 0].sort(f), h = !l, nt.uniqueSort = function(e) {
                var t, n = [],
                    r = 1,
                    i = 0;
                l = h, e.sort(f);
                if (l) {
                    for (; t = e[r]; r++) t === e[r - 1] && (i = n.push(r));
                    while (i--) e.splice(n[i], 1)
                }
                return e
            }, nt.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, a = nt.compile = function(e, t) {
                var n, r = [],
                    i = [],
                    s = A[d][e + " "];
                if (!s) {
                    t || (t = ut(e)), n = t.length;
                    while (n--) s = ht(t[n]), s[d] ? r.push(s) : i.push(s);
                    s = A(e, pt(i, r))
                }
                return s
            }, g.querySelectorAll && function() {
                var e, t = vt,
                    n = /'|\\/g,
                    r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                    i = [":focus"],
                    s = [":active"],
                    u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
                K(function(e) {
                    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked")
                }), K(function(e) {
                    e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled")
                }), i = new RegExp(i.join("|")), vt = function(e, r, s, o, u) {
                    if (!o && !u && !i.test(e)) {
                        var a, f, l = !0,
                            c = d,
                            h = r,
                            p = r.nodeType === 9 && e;
                        if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
                            a = ut(e), (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c), c = "[id='" + c + "'] ", f = a.length;
                            while (f--) a[f] = c + a[f].join("");
                            h = z.test(e) && r.parentNode || r, p = a.join(",")
                        }
                        if (p) try {
                            return S.apply(s, x.call(h.querySelectorAll(p), 0)), s
                        } catch (v) {} finally {
                            l || r.removeAttribute("id")
                        }
                    }
                    return t(e, r, s, o, u)
                }, u && (K(function(t) {
                    e = u.call(t, "div");
                    try {
                        u.call(t, "[test!='']:sizzle"), s.push("!=", H)
                    } catch (n) {}
                }), s = new RegExp(s.join("|")), nt.matchesSelector = function(t, n) {
                    n = n.replace(r, "='$1']");
                    if (!o(t) && !s.test(n) && !i.test(n)) try {
                        var a = u.call(t, n);
                        if (a || e || t.document && t.document.nodeType !== 11) return a
                    } catch (f) {}
                    return nt(n, null, null, [t]).length > 0
                })
            }(), i.pseudos.nth = i.pseudos.eq, i.filters = mt.prototype = i.pseudos, i.setFilters = new mt, nt.attr = v.attr, v.find = nt, v.expr = nt.selectors, v.expr[":"] = v.expr.pseudos, v.unique = nt.uniqueSort, v.text = nt.getText, v.isXMLDoc = nt.isXML, v.contains = nt.contains
        }(e);
    var nt = /Until$/,
        rt = /^(?:parents|prev(?:Until|All))/,
        it = /^.[^:#\[\.,]*$/,
        st = v.expr.match.needsContext,
        ot = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    v.fn.extend({
        find: function(e) {
            var t, n, r, i, s, o, u = this;
            if (typeof e != "string") return v(e).filter(function() {
                for (t = 0, n = u.length; t < n; t++)
                    if (v.contains(u[t], this)) return !0
            });
            o = this.pushStack("", "find", e);
            for (t = 0, n = this.length; t < n; t++) {
                r = o.length, v.find(e, this[t], o);
                if (t > 0)
                    for (i = r; i < o.length; i++)
                        for (s = 0; s < r; s++)
                            if (o[s] === o[i]) {
                                o.splice(i--, 1);
                                break
                            }
            }
            return o
        },
        has: function(e) {
            var t, n = v(e, this),
                r = n.length;
            return this.filter(function() {
                for (t = 0; t < r; t++)
                    if (v.contains(this, n[t])) return !0
            })
        },
        not: function(e) {
            return this.pushStack(ft(this, e, !1), "not", e)
        },
        filter: function(e) {
            return this.pushStack(ft(this, e, !0), "filter", e)
        },
        is: function(e) {
            return !!e && (typeof e == "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                s = [],
                o = st.test(e) || typeof e != "string" ? v(e, t || this.context) : 0;
            for (; r < i; r++) {
                n = this[r];
                while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
                    if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
                        s.push(n);
                        break
                    }
                    n = n.parentNode
                }
            }
            return s = s.length > 1 ? v.unique(s) : s, this.pushStack(s, "closest", e)
        },
        index: function(e) {
            return e ? typeof e == "string" ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(e, t) {
            var n = typeof e == "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e),
                r = v.merge(this.get(), n);
            return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r))
        },
        addBack: function(e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }
    }), v.fn.andSelf = v.fn.addBack, v.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function(e) {
            return v.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return v.dir(e, "parentNode", n)
        },
        next: function(e) {
            return at(e, "nextSibling")
        },
        prev: function(e) {
            return at(e, "previousSibling")
        },
        nextAll: function(e) {
            return v.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return v.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return v.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return v.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return v.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return v.sibling(e.firstChild)
        },
        contents: function(e) {
            return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes)
        }
    }, function(e, t) {
        v.fn[e] = function(n, r) {
            var i = v.map(this, t, n);
            return nt.test(e) || (r = n), r && typeof r == "string" && (i = v.filter(r, i)), i = this.length > 1 && !ot[e] ? v.unique(i) : i, this.length > 1 && rt.test(e) && (i = i.reverse()), this.pushStack(i, e, l.call(arguments).join(","))
        }
    }), v.extend({
        filter: function(e, t, n) {
            return n && (e = ":not(" + e + ")"), t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t)
        },
        dir: function(e, n, r) {
            var i = [],
                s = e[n];
            while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r))) s.nodeType === 1 && i.push(s), s = s[n];
            return i
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
    });
    var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        ht = / jQuery\d+="(?:null|\d+)"/g,
        pt = /^\s+/,
        dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        vt = /<([\w:]+)/,
        mt = /<tbody/i,
        gt = /<|&#?\w+;/,
        yt = /<(?:script|style|link)/i,
        bt = /<(?:script|object|embed|option|style)/i,
        wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"),
        Et = /^(?:checkbox|radio)$/,
        St = /checked\s*(?:[^=]|=\s*.checked.)/i,
        xt = /\/(java|ecma)script/i,
        Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        Nt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        Ct = lt(i),
        kt = Ct.appendChild(i.createElement("div"));
    Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td, v.support.htmlSerialize || (Nt._default = [1, "X<div>", "</div>"]), v.fn.extend({
            text: function(e) {
                return v.access(this, function(e) {
                    return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e))
                }, null, e, arguments.length)
            },
            wrapAll: function(e) {
                if (v.isFunction(e)) return this.each(function(t) {
                    v(this).wrapAll(e.call(this, t))
                });
                if (this[0]) {
                    var t = v(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                        var e = this;
                        while (e.firstChild && e.firstChild.nodeType === 1) e = e.firstChild;
                        return e
                    }).append(this)
                }
                return this
            },
            wrapInner: function(e) {
                return v.isFunction(e) ? this.each(function(t) {
                    v(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = v(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = v.isFunction(e);
                return this.each(function(n) {
                    v(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    v.nodeName(this, "body") || v(this).replaceWith(this.childNodes)
                }).end()
            },
            append: function() {
                return this.domManip(arguments, !0, function(e) {
                    (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(e)
                })
            },
            prepend: function() {
                return this.domManip(arguments, !0, function(e) {
                    (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(e, this.firstChild)
                })
            },
            before: function() {
                if (!ut(this[0])) return this.domManip(arguments, !1, function(e) {
                    this.parentNode.insertBefore(e, this)
                });
                if (arguments.length) {
                    var e = v.clean(arguments);
                    return this.pushStack(v.merge(e, this), "before", this.selector)
                }
            },
            after: function() {
                if (!ut(this[0])) return this.domManip(arguments, !1, function(e) {
                    this.parentNode.insertBefore(e, this.nextSibling)
                });
                if (arguments.length) {
                    var e = v.clean(arguments);
                    return this.pushStack(v.merge(this, e), "after", this.selector)
                }
            },
            remove: function(e, t) {
                var n, r = 0;
                for (;
                    (n = this[r]) != null; r++)
                    if (!e || v.filter(e, [n]).length) !t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])), n.parentNode && n.parentNode.removeChild(n);
                return this
            },
            empty: function() {
                var e, t = 0;
                for (;
                    (e = this[t]) != null; t++) {
                    e.nodeType === 1 && v.cleanData(e.getElementsByTagName("*"));
                    while (e.firstChild) e.removeChild(e.firstChild)
                }
                return this
            },
            clone: function(e, t) {
                return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function() {
                    return v.clone(this, e, t)
                })
            },
            html: function(e) {
                return v.access(this, function(e) {
                    var n = this[0] || {},
                        r = 0,
                        i = this.length;
                    if (e === t) return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t;
                    if (typeof e == "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = e.replace(dt, "<$1></$2>");
                        try {
                            for (; r < i; r++) n = this[r] || {}, n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
                            n = 0
                        } catch (s) {}
                    }
                    n && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function(e) {
                return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this : v.isFunction(e) ? this.each(function(t) {
                    var n = v(this),
                        r = n.html();
                    n.replaceWith(e.call(this, t, r))
                }) : (typeof e != "string" && (e = v(e).detach()), this.each(function() {
                    var t = this.nextSibling,
                        n = this.parentNode;
                    v(this).remove(), t ? v(t).before(e) : v(n).append(e)
                }))
            },
            detach: function(e) {
                return this.remove(e, !0)
            },
            domManip: function(e, n, r) {
                e = [].concat.apply([], e);
                var i, s, o, u, a = 0,
                    f = e[0],
                    l = [],
                    c = this.length;
                if (!v.support.checkClone && c > 1 && typeof f == "string" && St.test(f)) return this.each(function() {
                    v(this).domManip(e, n, r)
                });
                if (v.isFunction(f)) return this.each(function(i) {
                    var s = v(this);
                    e[0] = f.call(this, i, n ? s.html() : t), s.domManip(e, n, r)
                });
                if (this[0]) {
                    i = v.buildFragment(e, this, l), o = i.fragment, s = o.firstChild, o.childNodes.length === 1 && (o = s);
                    if (s) {
                        n = n && v.nodeName(s, "tr");
                        for (u = i.cacheable || c - 1; a < c; a++) r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o : v.clone(o, !0, !0))
                    }
                    o = s = null, l.length && v.each(l, function(e, t) {
                        t.src ? v.ajax ? v.ajax({
                            url: t.src,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            "throws": !0
                        }) : v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")), t.parentNode && t.parentNode.removeChild(t)
                    })
                }
                return this
            }
        }), v.buildFragment = function(e, n, r) {
            var s, o, u, a = e[0];
            return n = n || i, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, e.length === 1 && typeof a == "string" && a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a)) && (o = !0, s = v.fragments[a], u = s !== t), s || (s = n.createDocumentFragment(), v.clean(e, n, s, r), o && (v.fragments[a] = u && s)), {
                fragment: s,
                cacheable: o
            }
        }, v.fragments = {}, v.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            v.fn[e] = function(n) {
                var r, i = 0,
                    s = [],
                    o = v(n),
                    u = o.length,
                    a = this.length === 1 && this[0].parentNode;
                if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1) return o[t](this[0]), this;
                for (; i < u; i++) r = (i > 0 ? this.clone(!0) : this).get(), v(o[i])[t](r), s = s.concat(r);
                return this.pushStack(s, e, o.selector)
            }
        }), v.extend({
            clone: function(e, t, n) {
                var r, i, s, o;
                v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML = e.outerHTML, kt.removeChild(o = kt.firstChild));
                if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(e)) {
                    Ot(e, o), r = Mt(e), i = Mt(o);
                    for (s = 0; r[s]; ++s) i[s] && Ot(r[s], i[s])
                }
                if (t) {
                    At(e, o);
                    if (n) {
                        r = Mt(e), i = Mt(o);
                        for (s = 0; r[s]; ++s) At(r[s], i[s])
                    }
                }
                return r = i = null, o
            },
            clean: function(e, t, n, r) {
                var s, o, u, a, f, l, c, h, p, d, m, g, y = t === i && Ct,
                    b = [];
                if (!t || typeof t.createDocumentFragment == "undefined") t = i;
                for (s = 0;
                    (u = e[s]) != null; s++) {
                    typeof u == "number" && (u += "");
                    if (!u) continue;
                    if (typeof u == "string")
                        if (!gt.test(u)) u = t.createTextNode(u);
                        else {
                            y = y || lt(t), c = t.createElement("div"), y.appendChild(c), u = u.replace(dt, "<$1></$2>"), a = (vt.exec(u) || ["", ""])[1].toLowerCase(), f = Nt[a] || Nt._default, l = f[0], c.innerHTML = f[1] + u + f[2];
                            while (l--) c = c.lastChild;
                            if (!v.support.tbody) {
                                h = mt.test(u), p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes : f[1] === "<table>" && !h ? c.childNodes : [];
                                for (o = p.length - 1; o >= 0; --o) v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o])
                            }!v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild), u = c.childNodes, c.parentNode.removeChild(c)
                        }
                    u.nodeType ? b.push(u) : v.merge(b, u)
                }
                c && (u = c = y = null);
                if (!v.support.appendChecked)
                    for (s = 0;
                        (u = b[s]) != null; s++) v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(u.getElementsByTagName("input"), _t);
                if (n) {
                    m = function(e) {
                        if (!e.type || xt.test(e.type)) return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e)
                    };
                    for (s = 0;
                        (u = b[s]) != null; s++)
                        if (!v.nodeName(u, "script") || !m(u)) n.appendChild(u), typeof u.getElementsByTagName != "undefined" && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length)
                }
                return b
            },
            cleanData: function(e, t) {
                var n, r, i, s, o = 0,
                    u = v.expando,
                    a = v.cache,
                    f = v.support.deleteExpando,
                    l = v.event.special;
                for (;
                    (i = e[o]) != null; o++)
                    if (t || v.acceptData(i)) {
                        r = i[u], n = r && a[r];
                        if (n) {
                            if (n.events)
                                for (s in n.events) l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);
                            a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(r))
                        }
                    }
            }
        }),
        function() {
            var e, t;
            v.uaMatch = function(e) {
                e = e.toLowerCase();
                var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                return {
                    browser: t[1] || "",
                    version: t[2] || "0"
                }
            }, e = v.uaMatch(o.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), v.browser = t, v.sub = function() {
                function e(t, n) {
                    return new e.fn.init(t, n)
                }
                v.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function(r, i) {
                    return i && i instanceof v && !(i instanceof e) && (i = e(i)), v.fn.init.call(this, r, i, t)
                }, e.fn.init.prototype = e.fn;
                var t = e(i);
                return e
            }
        }();
    var Dt, Pt, Ht, Bt = /alpha\([^)]*\)/i,
        jt = /opacity=([^)]*)/,
        Ft = /^(top|right|bottom|left)$/,
        It = /^(none|table(?!-c[ea]).+)/,
        qt = /^margin/,
        Rt = new RegExp("^(" + m + ")(.*)$", "i"),
        Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"),
        zt = new RegExp("^([-+])=(" + m + ")", "i"),
        Wt = {
            BODY: "block"
        },
        Xt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Vt = {
            letterSpacing: 0,
            fontWeight: 400
        },
        $t = ["Top", "Right", "Bottom", "Left"],
        Jt = ["Webkit", "O", "Moz", "ms"],
        Kt = v.fn.toggle;
    v.fn.extend({
        css: function(e, n) {
            return v.access(this, function(e, n, r) {
                return r !== t ? v.style(e, n, r) : v.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function() {
            return Yt(this, !0)
        },
        hide: function() {
            return Yt(this)
        },
        toggle: function(e, t) {
            var n = typeof e == "boolean";
            return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function() {
                (n ? e : Gt(this)) ? v(this).show(): v(this).hide()
            })
        }
    }), v.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Dt(e, "opacity");
                        return n === "" ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": v.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, n, r, i) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
            var s, o, u, a = v.camelCase(n),
                f = e.style;
            n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)), u = v.cssHooks[n] || v.cssHooks[a];
            if (r === t) return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s : f[n];
            o = typeof r, o === "string" && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)), o = "number");
            if (r == null || o === "number" && isNaN(r)) return;
            o === "number" && !v.cssNumber[a] && (r += "px");
            if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t) try {
                f[n] = r
            } catch (l) {}
        },
        css: function(e, n, r, i) {
            var s, o, u, a = v.camelCase(n);
            return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)), u = v.cssHooks[n] || v.cssHooks[a], u && "get" in u && (s = u.get(e, !0, i)), s === t && (s = Dt(e, n)), s === "normal" && n in Vt && (s = Vt[n]), r || i !== t ? (o = parseFloat(s), r || v.isNumeric(o) ? o || 0 : s) : s
        },
        swap: function(e, t, n) {
            var r, i, s = {};
            for (i in t) s[i] = e.style[i], e.style[i] = t[i];
            r = n.call(e);
            for (i in t) e.style[i] = s[i];
            return r
        }
    }), e.getComputedStyle ? Dt = function(t, n) {
        var r, i, s, o, u = e.getComputedStyle(t, null),
            a = t.style;
        return u && (r = u.getPropertyValue(n) || u[n], r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)), Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)), r
    } : i.documentElement.currentStyle && (Dt = function(e, t) {
        var n, r, i = e.currentStyle && e.currentStyle[t],
            s = e.style;
        return i == null && s && s[t] && (i = s[t]), Ut.test(i) && !Ft.test(t) && (n = s.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), s.left = t === "fontSize" ? "1em" : i, i = s.pixelLeft + "px", s.left = n, r && (e.runtimeStyle.left = r)), i === "" ? "auto" : i
    }), v.each(["height", "width"], function(e, t) {
        v.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) return e.offsetWidth === 0 && It.test(Dt(e, "display")) ? v.swap(e, Xt, function() {
                    return tn(e, t, r)
                }) : tn(e, t, r)
            },
            set: function(e, n, r) {
                return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0)
            }
        }
    }), v.support.opacity || (v.cssHooks.opacity = {
        get: function(e, t) {
            return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style,
                r = e.currentStyle,
                i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                s = r && r.filter || n.filter || "";
            n.zoom = 1;
            if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
                n.removeAttribute("filter");
                if (r && !r.filter) return
            }
            n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i
        }
    }), v(function() {
        v.support.reliableMarginRight || (v.cssHooks.marginRight = {
            get: function(e, t) {
                return v.swap(e, {
                    display: "inline-block"
                }, function() {
                    if (t) return Dt(e, "marginRight")
                })
            }
        }), !v.support.pixelPosition && v.fn.position && v.each(["top", "left"], function(e, t) {
            v.cssHooks[t] = {
                get: function(e, n) {
                    if (n) {
                        var r = Dt(e, t);
                        return Ut.test(r) ? v(e).position()[t] + "px" : r
                    }
                }
            }
        })
    }), v.expr && v.expr.filters && (v.expr.filters.hidden = function(e) {
        return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display || Dt(e, "display")) === "none"
    }, v.expr.filters.visible = function(e) {
        return !v.expr.filters.hidden(e)
    }), v.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        v.cssHooks[e + t] = {
            expand: function(n) {
                var r, i = typeof n == "string" ? n.split(" ") : [n],
                    s = {};
                for (r = 0; r < 4; r++) s[e + $t[r] + t] = i[r] || i[r - 2] || i[0];
                return s
            }
        }, qt.test(e) || (v.cssHooks[e + t].set = Zt)
    });
    var rn = /%20/g,
        sn = /\[\]$/,
        on = /\r?\n/g,
        un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        an = /^(?:select|textarea)/i;
    v.fn.extend({
        serialize: function() {
            return v.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? v.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type))
            }).map(function(e, t) {
                var n = v(this).val();
                return n == null ? null : v.isArray(n) ? v.map(n, function(e, n) {
                    return {
                        name: t.name,
                        value: e.replace(on, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(on, "\r\n")
                }
            }).get()
        }
    }), v.param = function(e, n) {
        var r, i = [],
            s = function(e, t) {
                t = v.isFunction(t) ? t() : t == null ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional);
        if (v.isArray(e) || e.jquery && !v.isPlainObject(e)) v.each(e, function() {
            s(this.name, this.value)
        });
        else
            for (r in e) fn(r, e[r], n, s);
        return i.join("&").replace(rn, "+")
    };
    var ln, cn, hn = /#.*$/,
        pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        vn = /^(?:GET|HEAD)$/,
        mn = /^\/\//,
        gn = /\?/,
        yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bn = /([?&])_=[^&]*/,
        wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        En = v.fn.load,
        Sn = {},
        xn = {},
        Tn = ["*/"] + ["*"];
    try {
        cn = s.href
    } catch (Nn) {
        cn = i.createElement("a"), cn.href = "", cn = cn.href
    }
    ln = wn.exec(cn.toLowerCase()) || [], v.fn.load = function(e, n, r) {
        if (typeof e != "string" && En) return En.apply(this, arguments);
        if (!this.length) return this;
        var i, s, o, u = this,
            a = e.indexOf(" ");
        return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), v.isFunction(n) ? (r = n, n = t) : n && typeof n == "object" && (s = "POST"), v.ajax({
            url: e,
            type: s,
            dataType: "html",
            data: n,
            complete: function(e, t) {
                r && u.each(r, o || [e.responseText, t, e])
            }
        }).done(function(e) {
            o = arguments, u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e)
        }), this
    }, v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
        v.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), v.each(["get", "post"], function(e, n) {
        v[n] = function(e, r, i, s) {
            return v.isFunction(r) && (s = s || i, i = r, r = t), v.ajax({
                type: n,
                url: e,
                data: r,
                success: i,
                dataType: s
            })
        }
    }), v.extend({
        getScript: function(e, n) {
            return v.get(e, t, n, "script")
        },
        getJSON: function(e, t, n) {
            return v.get(e, t, n, "json")
        },
        ajaxSetup: function(e, t) {
            return t ? Ln(e, v.ajaxSettings) : (t = e, e = v.ajaxSettings), Ln(e, t), e
        },
        ajaxSettings: {
            url: cn,
            isLocal: dn.test(ln[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Tn
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": v.parseJSON,
                "text xml": v.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: Cn(Sn),
        ajaxTransport: Cn(xn),
        ajax: function(e, n) {
            function T(e, n, s, a) {
                var l, y, b, w, S, T = n;
                if (E === 2) return;
                E = 2, u && clearTimeout(u), o = t, i = a || "", x.readyState = e > 0 ? 4 : 0, s && (w = An(c, x, s));
                if (e >= 200 && e < 300 || e === 304) c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (v.lastModified[r] = S), S = x.getResponseHeader("Etag"), S && (v.etag[r] = S)), e === 304 ? (T = "notmodified", l = !0) : (l = On(c, w), T = l.state, y = l.data, b = l.error, l = !b);
                else {
                    b = T;
                    if (!T || e) T = "error", e < 0 && (e = 0)
                }
                x.status = e, x.statusText = (n || T) + "", l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]), x.statusCode(g), g = t, f && p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b]), m.fireWith(h, [x, T]), f && (p.trigger("ajaxComplete", [x, c]), --v.active || v.event.trigger("ajaxStop"))
            }
            typeof e == "object" && (n = e, e = t), n = n || {};
            var r, i, s, o, u, a, f, l, c = v.ajaxSetup({}, n),
                h = c.context || c,
                p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event,
                d = v.Deferred(),
                m = v.Callbacks("once memory"),
                g = c.statusCode || {},
                b = {},
                w = {},
                E = 0,
                S = "canceled",
                x = {
                    readyState: 0,
                    setRequestHeader: function(e, t) {
                        if (!E) {
                            var n = e.toLowerCase();
                            e = w[n] = w[n] || e, b[e] = t
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return E === 2 ? i : null
                    },
                    getResponseHeader: function(e) {
                        var n;
                        if (E === 2) {
                            if (!s) {
                                s = {};
                                while (n = pn.exec(i)) s[n[1].toLowerCase()] = n[2]
                            }
                            n = s[e.toLowerCase()]
                        }
                        return n === t ? null : n
                    },
                    overrideMimeType: function(e) {
                        return E || (c.mimeType = e), this
                    },
                    abort: function(e) {
                        return e = e || S, o && o.abort(e), T(0, e), this
                    }
                };
            d.promise(x), x.success = x.done, x.error = x.fail, x.complete = m.add, x.statusCode = function(e) {
                if (e) {
                    var t;
                    if (E < 2)
                        for (t in e) g[t] = [g[t], e[t]];
                    else t = e[x.status], x.always(t)
                }
                return this
            }, c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"), c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y), c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === ln[1] && a[2] === ln[2] && (a[3] || (a[1] === "http:" ? 80 : 443)) == (ln[3] || (ln[1] === "http:" ? 80 : 443)))), c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)), kn(Sn, c, n, x);
            if (E === 2) return x;
            f = c.global, c.type = c.type.toUpperCase(), c.hasContent = !vn.test(c.type), f && v.active++ === 0 && v.event.trigger("ajaxStart");
            if (!c.hasContent) {
                c.data && (c.url += (gn.test(c.url) ? "&" : "?") + c.data, delete c.data), r = c.url;
                if (c.cache === !1) {
                    var N = v.now(),
                        C = c.url.replace(bn, "$1_=" + N);
                    c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "")
                }
            }(c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType), c.ifModified && (r = r || c.url, v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]), v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])), x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01" : "") : c.accepts["*"]);
            for (l in c.headers) x.setRequestHeader(l, c.headers[l]);
            if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
                S = "abort";
                for (l in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) x[l](c[l]);
                o = kn(xn, c, n, x);
                if (!o) T(-1, "No Transport");
                else {
                    x.readyState = 1, f && p.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (u = setTimeout(function() {
                        x.abort("timeout")
                    }, c.timeout));
                    try {
                        E = 1, o.send(b, T)
                    } catch (k) {
                        if (!(E < 2)) throw k;
                        T(-1, k)
                    }
                }
                return x
            }
            return x.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Mn = [],
        _n = /\?/,
        Dn = /(=)\?(?=&|$)|\?\?/,
        Pn = v.now();
    v.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Mn.pop() || v.expando + "_" + Pn++;
            return this[e] = !0, e
        }
    }), v.ajaxPrefilter("json jsonp", function(n, r, i) {
        var s, o, u, a = n.data,
            f = n.url,
            l = n.jsonp !== !1,
            c = l && Dn.test(f),
            h = l && !c && typeof a == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);
        if (n.dataTypes[0] === "jsonp" || c || h) return s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, o = e[s], c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url += (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function() {
            return u || v.error(s + " was not called"), u[0]
        }, n.dataTypes[0] = "json", e[s] = function() {
            u = arguments
        }, i.always(function() {
            e[s] = o, n[s] && (n.jsonpCallback = r.jsonpCallback, Mn.push(s)), u && v.isFunction(o) && o(u[0]), u = o = t
        }), "script"
    }), v.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(e) {
                return v.globalEval(e), e
            }
        }
    }), v.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), v.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var n, r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;
            return {
                send: function(s, o) {
                    n = i.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, i) {
                        if (i || !n.readyState || /loaded|complete/.test(n.readyState)) n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || o(200, "success")
                    }, r.insertBefore(n, r.firstChild)
                },
                abort: function() {
                    n && n.onload(0, 1)
                }
            }
        }
    });
    var Hn, Bn = e.ActiveXObject ? function() {
            for (var e in Hn) Hn[e](0, 1)
        } : !1,
        jn = 0;
    v.ajaxSettings.xhr = e.ActiveXObject ? function() {
            return !this.isLocal && Fn() || In()
        } : Fn,
        function(e) {
            v.extend(v.support, {
                ajax: !!e,
                cors: !!e && "withCredentials" in e
            })
        }(v.ajaxSettings.xhr()), v.support.ajax && v.ajaxTransport(function(n) {
            if (!n.crossDomain || v.support.cors) {
                var r;
                return {
                    send: function(i, s) {
                        var o, u, a = n.xhr();
                        n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);
                        if (n.xhrFields)
                            for (u in n.xhrFields) a[u] = n.xhrFields[u];
                        n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (u in i) a.setRequestHeader(u, i[u])
                        } catch (f) {}
                        a.send(n.hasContent && n.data || null), r = function(e, i) {
                            var u, f, l, c, h;
                            try {
                                if (r && (i || a.readyState === 4)) {
                                    r = t, o && (a.onreadystatechange = v.noop, Bn && delete Hn[o]);
                                    if (i) a.readyState !== 4 && a.abort();
                                    else {
                                        u = a.status, l = a.getAllResponseHeaders(), c = {}, h = a.responseXML, h && h.documentElement && (c.xml = h);
                                        try {
                                            c.text = a.responseText
                                        } catch (p) {}
                                        try {
                                            f = a.statusText
                                        } catch (p) {
                                            f = ""
                                        }!u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204)
                                    }
                                }
                            } catch (d) {
                                i || s(-1, d)
                            }
                            c && s(u, f, c, l)
                        }, n.async ? a.readyState === 4 ? setTimeout(r, 0) : (o = ++jn, Bn && (Hn || (Hn = {}, v(e).unload(Bn)), Hn[o] = r), a.onreadystatechange = r) : r()
                    },
                    abort: function() {
                        r && r(0, 1)
                    }
                }
            }
        });
    var qn, Rn, Un = /^(?:toggle|show|hide)$/,
        zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"),
        Wn = /queueHooks$/,
        Xn = [Gn],
        Vn = {
            "*": [function(e, t) {
                var n, r, i = this.createTween(e, t),
                    s = zn.exec(t),
                    o = i.cur(),
                    u = +o || 0,
                    a = 1,
                    f = 20;
                if (s) {
                    n = +s[2], r = s[3] || (v.cssNumber[e] ? "" : "px");
                    if (r !== "px" && u) {
                        u = v.css(i.elem, e, !0) || n || 1;
                        do a = a || ".5", u /= a, v.style(i.elem, e, u + r); while (a !== (a = i.cur() / o) && a !== 1 && --f)
                    }
                    i.unit = r, i.start = u, i.end = s[1] ? u + (s[1] + 1) * n : n
                }
                return i
            }]
        };
    v.Animation = v.extend(Kn, {
        tweener: function(e, t) {
            v.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n, r = 0,
                i = e.length;
            for (; r < i; r++) n = e[r], Vn[n] = Vn[n] || [], Vn[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? Xn.unshift(e) : Xn.push(e)
        }
    }), v.Tween = Yn, Yn.prototype = {
        constructor: Yn,
        init: function(e, t, n, r, i, s) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (v.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Yn.propHooks[this.prop];
            return e && e.get ? e.get(this) : Yn.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Yn.propHooks[this.prop];
            return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Yn.propHooks._default.set(this), this
        }
    }, Yn.prototype.init.prototype = Yn.prototype, Yn.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
            },
            set: function(e) {
                v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, v.each(["toggle", "show", "hide"], function(e, t) {
        var n = v.fn[t];
        v.fn[t] = function(r, i, s) {
            return r == null || typeof r == "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, !0), r, i, s)
        }
    }), v.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Gt).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = v.isEmptyObject(e),
                s = v.speed(t, n, r),
                o = function() {
                    var t = Kn(this, v.extend({}, e), s);
                    i && t.stop(!0)
                };
            return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
        },
        stop: function(e, n, r) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop, t(r)
            };
            return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    n = e != null && e + "queueHooks",
                    s = v.timers,
                    o = v._data(this);
                if (n) o[n] && o[n].stop && i(o[n]);
                else
                    for (n in o) o[n] && o[n].stop && Wn.test(n) && i(o[n]);
                for (n = s.length; n--;) s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r), t = !1, s.splice(n, 1));
                (t || !r) && v.dequeue(this, e)
            })
        }
    }), v.each({
        slideDown: Zn("show"),
        slideUp: Zn("hide"),
        slideToggle: Zn("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        v.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), v.speed = function(e, t, n) {
        var r = e && typeof e == "object" ? v.extend({}, e) : {
            complete: n || !n && t || v.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !v.isFunction(t) && t
        };
        r.duration = v.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default;
        if (r.queue == null || r.queue === !0) r.queue = "fx";
        return r.old = r.complete, r.complete = function() {
            v.isFunction(r.old) && r.old.call(this), r.queue && v.dequeue(this, r.queue)
        }, r
    }, v.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, v.timers = [], v.fx = Yn.prototype.init, v.fx.tick = function() {
        var e, n = v.timers,
            r = 0;
        qn = v.now();
        for (; r < n.length; r++) e = n[r], !e() && n[r] === e && n.splice(r--, 1);
        n.length || v.fx.stop(), qn = t
    }, v.fx.timer = function(e) {
        e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval))
    }, v.fx.interval = 13, v.fx.stop = function() {
        clearInterval(Rn), Rn = null
    }, v.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, v.fx.step = {}, v.expr && v.expr.filters && (v.expr.filters.animated = function(e) {
        return v.grep(v.timers, function(t) {
            return e === t.elem
        }).length
    });
    var er = /^(?:body|html)$/i;
    v.fn.offset = function(e) {
        if (arguments.length) return e === t ? this : this.each(function(t) {
            v.offset.setOffset(this, e, t)
        });
        var n, r, i, s, o, u, a, f = {
                top: 0,
                left: 0
            },
            l = this[0],
            c = l && l.ownerDocument;
        if (!c) return;
        return (r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement, v.contains(n, l) ? (typeof l.getBoundingClientRect != "undefined" && (f = l.getBoundingClientRect()), i = tr(c), s = n.clientTop || r.clientTop || 0, o = n.clientLeft || r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, a = i.pageXOffset || n.scrollLeft, {
            top: f.top + u - s,
            left: f.left + a - o
        }) : f)
    }, v.offset = {
        bodyOffset: function(e) {
            var t = e.offsetTop,
                n = e.offsetLeft;
            return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0, n += parseFloat(v.css(e, "marginLeft")) || 0), {
                top: t,
                left: n
            }
        },
        setOffset: function(e, t, n) {
            var r = v.css(e, "position");
            r === "static" && (e.style.position = "relative");
            var i = v(e),
                s = i.offset(),
                o = v.css(e, "top"),
                u = v.css(e, "left"),
                a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1,
                f = {},
                l = {},
                c, h;
            a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), v.isFunction(t) && (t = t.call(e, n, s)), t.top != null && (f.top = t.top - s.top + c), t.left != null && (f.left = t.left - s.left + h), "using" in t ? t.using.call(e, f) : i.css(f)
        }
    }, v.fn.extend({
        position: function() {
            if (!this[0]) return;
            var e = this[0],
                t = this.offsetParent(),
                n = this.offset(),
                r = er.test(t[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : t.offset();
            return n.top -= parseFloat(v.css(e, "marginTop")) || 0, n.left -= parseFloat(v.css(e, "marginLeft")) || 0, r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0, {
                top: n.top - r.top,
                left: n.left - r.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || i.body;
                while (e && !er.test(e.nodeName) && v.css(e, "position") === "static") e = e.offsetParent;
                return e || i.body
            })
        }
    }), v.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, n) {
        var r = /Y/.test(n);
        v.fn[e] = function(i) {
            return v.access(this, function(e, i, s) {
                var o = tr(e);
                if (s === t) return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];
                o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s : v(o).scrollTop()) : e[i] = s
            }, e, i, arguments.length, null)
        }
    }), v.each({
        Height: "height",
        Width: "width"
    }, function(e, n) {
        v.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function(r, i) {
            v.fn[i] = function(i, s) {
                var o = arguments.length && (r || typeof i != "boolean"),
                    u = r || (i === !0 || s === !0 ? "margin" : "border");
                return v.access(this, function(n, r, i) {
                    var s;
                    return v.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? v.css(n, r, i, u) : v.style(n, r, i, u)
                }, n, o ? i : t, o, null)
            }
        })
    }), e.jQuery = e.$ = v, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return v
    })
})(window);
var _0x5e1c = ["\x73\x63\x72\x6F\x6C\x6C\x54\x6F\x70", "\x66\x61\x64\x65\x49\x6E", "\x23\x62\x61\x63\x6B\x2D\x74\x6F\x2D\x74\x6F\x70", "\x66\x61\x64\x65\x4F\x75\x74", "\x73\x63\x72\x6F\x6C\x6C", "\x38\x30\x30", "\x61\x6E\x69\x6D\x61\x74\x65", "\x68\x74\x6D\x6C\x2C\x20\x62\x6F\x64\x79", "\x63\x6C\x69\x63\x6B", "\x23\x62\x61\x63\x6B\x2D\x74\x6F\x2D\x74\x6F\x70\x2C\x20\x2E\x62\x61\x63\x6B\x2D\x74\x6F\x2D\x74\x6F\x70", "\x2F\x73\x74\x61\x74\x69\x73\x74\x69\x63\x2E\x74\x78\x74", "\x6C\x6F\x61\x64", "\x23\x73\x74\x61\x74\x69\x73\x74\x69\x63", "\x66\x6F\x63\x75\x73", "\x23\x69\x6E\x70\x75\x74\x4C\x69\x6E\x6B\x67\x65\x74", "\x23\x61\x75\x74\x6F\x5F\x64\x6C", "\x70\x61\x73\x74\x65", "\x23\x67\x65\x74\x6C\x69\x6E\x6B", "\x6F\x6E", "\x23\x69\x6E\x70\x75\x74\x5F\x70\x61\x73\x73", "", "\x76\x61\x6C", "\x23\x63\x61\x70\x74\x63\x68\x61", "\x74\x61\x69\x6C\x69\x65\x75\x2E\x76\x6E", "\x73\x65\x61\x72\x63\x68", "\x73\x72\x63", "\x69\x6D\x67\x5F\x63\x61\x70\x74\x63\x68\x61", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64", "\x63\x61\x70\x74\x63\x68\x61\x5F\x74\x61\x69\x6C\x69\x65\x75\x2E\x70\x68\x70\x3F", "\x72\x61\x6E\x64\x6F\x6D", "\x64\x6F\x6B\x6F\x2E\x76\x6E", "\x63\x61\x70\x74\x63\x68\x61\x5F\x64\x6F\x6B\x6F\x2E\x70\x68\x70\x3F", "\x63\x61\x70\x74\x63\x68\x61\x2E\x70\x68\x70\x3F", "\x23\x72\x65\x6C\x6F\x61\x64\x5F\x63\x61\x70\x74\x63\x68\x61", "\x68\x69\x64\x65", "\x23\x73\x68\x6F\x77\x47\x75\x69\x64\x65\x46\x69\x6C\x65", "\x23\x62\x74\x6E\x5F\x63\x68\x65\x63\x6B", "\x72\x65\x61\x64\x79", "\x4F\x62\x6A\x65\x63\x74", "\x54\x69\x74\x6C\x65", "\x3F\x72\x65\x66\x3D\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x65\x64", "\x72\x65\x70\x6C\x61\x63\x65\x53\x74\x61\x74\x65", "\x68\x69\x73\x74\x6F\x72\x79", "\x54\u1EA3\x69\x20\x78\x75\u1ED1\x6E\x67\x20\x3C\x69\x20\x63\x6C\x61\x73\x73\x3D\x22\x66\x61\x20\x66\x61\x2D\x63\x6C\x6F\x75\x64\x2D\x64\x6F\x77\x6E\x6C\x6F\x61\x64\x22\x3E", "\x68\x74\x6D\x6C", "\x23\x64\x6F\x77\x6E", "\x64\x69\x73\x61\x62\x6C\x65\x64", "\x72\x65\x6D\x6F\x76\x65\x41\x74\x74\x72", "\x4C\x69\x6E\x6B\x73\x56\x49\x50\x2E\x4E\x65\x74\x32\x30\x31\x34\x65\x43\x72\x56\x74\x42\x79\x4E\x67\x4D\x66\x53\x76\x44\x68\x46\x6A\x47\x69\x48\x6F\x4A\x70\x4B\x6C\x4C\x69\x45\x75\x52\x79\x54\x74\x59\x74\x55\x62\x49\x6E\x4F\x6A\x39\x75\x34\x79\x38\x31\x72\x35\x6F\x32\x36\x71\x34\x61\x30\x76", "\x6C\x65\x6E\x67\x74\x68", "\x66\x6C\x6F\x6F\x72", "\x63\x68\x61\x72\x41\x74", "\x61\x74\x74\x72", "\x62\x75\x74\x74\x6F\x6E", "\x69\x6E\x70\x75\x74", "\x74\x65\x78\x74\x61\x72\x65\x61", "\x66\x61\x73\x74", "\x73\x6C\x69\x64\x65\x55\x70", "\x23\x66\x69\x6C\x65\x5F\x69\x6E\x66\x6F", "\x23\x70\x72\x6F\x78\x79\x5F\x69\x6E\x66\x6F", "\x23\x6C\x69\x76\x65", "\x23\x66\x6F\x72\x6D\x5F\x64\x6F\x77\x6E", "\x23\x6F\x75\x6F", "\x64\x69\x76\x23\x63\x2D\x61\x6C\x65\x72\x74", "\x74\x65\x78\x74", "\x73\x70\x61\x6E\x23\x63\x2D\x65\x72\x72\x6F\x72\x2D\x6D\x65\x73\x73", "\x73\x6C\x69\x64\x65\x44\x6F\x77\x6E", "\x2E\x6F\x76\x65\x72\x6C\x61\x79", "\x2E\x64\x69\x6D", "\x23\x6C\x6F\x61\x64\x69\x6E\x67\x5F\x67\x65\x74\x6C\x69\x6E\x6B", "\x3C\x69\x20\x63\x6C\x61\x73\x73\x3D\x27\x66\x61\x20\x66\x61\x2D\x73\x70\x69\x6E\x6E\x65\x72\x20\x66\x61\x2D\x73\x70\x69\x6E\x27\x3E\x3C\x2F\x69\x3E\x20\u0110\x61\x6E\x67\x20\x74\x68\u1EF1\x63\x20\x74\x68\x69", "\x23\x74\x65\x78\x74\x5F\x6C\x69\x6E\x6B", "\x23\x64\x69\x76\x5F\x63\x61\x70\x74\x63\x68\x61", "\x23\x73\x70\x61\x6E\x5F\x70\x61\x73\x73", "\x75\x6E\x64\x65\x66\x69\x6E\x65\x64", "\x64\x69\x73\x61\x62\x6C\x65", "\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x3C\x69\x20\x63\x6C\x61\x73\x73\x3D\x27\x66\x61\x20\x66\x61\x2D\x61\x72\x72\x6F\x77\x2D\x63\x69\x72\x63\x6C\x65\x2D\x72\x69\x67\x68\x74\x27\x3E\x3C\x2F\x69\x3E", "\x65\x6E\x61\x62\x6C\x65", "\x23\x72\x65\x73\x75\x6C\x74\x43\x68\x6B\x4C\x69\x6E\x6B", "\x23\x6C\x6F\x61\x64\x69\x6E\x67\x5F\x63\x68\x65\x63\x6B\x6C\x69\x6E\x6B", "\x43\x68\x65\x63\x6B\x20\x6C\x69\x6E\x6B\x20\x3C\x69\x20\x63\x6C\x61\x73\x73\x3D\x27\x66\x61\x20\x66\x61\x2D\x63\x68\x65\x63\x6B\x2D\x63\x69\x72\x63\x6C\x65\x27\x3E", "\x2F\x5A\x65\x72\x6F\x43\x6C\x69\x70\x62\x6F\x61\x72\x64\x2E\x73\x77\x66", "\x23\x62\x62\x63\x6F\x64\x65", "\x7A\x63\x6C\x69\x70", "\x23\x63\x6F\x70\x79\x2D\x62\x62\x63\x6F\x64\x65", "\x23\x69\x6E\x70\x75\x74\x4C\x69\x6E\x6B", "\x23\x63\x6F\x70\x79\x2D\x6C\x69\x6E\x6B", "\x6C\x69\x76\x65\x54\x69\x6D\x65\x28\x29", "\x23\x74\x69\x6D\x65\x5F\x6C\x69\x6D\x69\x74", "\x74\x61\x72\x67\x65\x74", "\x5F\x62\x6C\x61\x6E\x6B", "\x61", "\x6F\x6E\x62\x65\x66\x6F\x72\x65\x75\x6E\x6C\x6F\x61\x64", "\x54\u1EAD\x70\x20\x74\x69\x6E\x20\x63\u1EE7\x61\x20\x62\u1EA1\x6E\x20\u0111\x61\x6E\x67\x20\u0111\u01B0\u1EE3\x63\x20\x78\u1EED\x20\x6C\xED\x2E\x20\x43\x68\u1EC9\x20\x63\u1EA7\x6E\x20\x63\x68\u1EDD\x20", "\x20\x67\x69\xE2\x79\x20\x6E\u1EEF\x61\x20\x6C\xE0\x20\x62\u1EA1\x6E\x20\x63\xF3\x20\x74\x68\u1EC3\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x2E\x20\x42\u1EA1\x6E\x20\x63\xF3\x20\x63\x68\u1EAF\x63\x20\x63\x68\u1EAF\x6E\x20\x6D\x75\u1ED1\x6E\x20\x74\x68\x6F\xE1\x74\x3F", "\x74\x69\x74\x6C\x65", "\x50\x6C\x65\x61\x73\x65\x20\x57\x61\x69\x74\x2E\x2E\x2E\x20", "\x73\x20\x2E\x2E\x2E\x20\x2D\x20\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x56\x49\x50\x20\x2D\x20\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x46\x73\x68\x61\x72\x65\x20\x34\x73\x68\x61\x72\x65\x20\x54\x65\x6E\x6C\x75\x61\x20\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x56\x49\x50\x20\x4D\x61\x78\x20\x53\x70\x65\x65\x64", "\x61\x3A\x6E\x6F\x74\x28\x5B\x68\x72\x65\x66\x5E\x3D\x22\x68\x74\x74\x70\x22\x5D\x29", "\x52\x65\x61\x64\x79\x20\x2D\x20\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x56\x49\x50\x20\x2D\x20\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x46\x73\x68\x61\x72\x65\x20\x34\x73\x68\x61\x72\x65\x20\x54\x65\x6E\x6C\x75\x61\x20\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x56\x49\x50\x20\x4D\x61\x78\x20\x53\x70\x65\x65\x64", "\x61\x6C\x65\x72\x74\x20\x61\x6C\x65\x72\x74\x2D\x64\x61\x6E\x67\x65\x72", "\x61\x64\x64\x43\x6C\x61\x73\x73", "\x61\x6C\x65\x72\x74\x20\x61\x6C\x65\x72\x74\x2D\x73\x75\x63\x63\x65\x73\x73", "\x72\x65\x6D\x6F\x76\x65\x43\x6C\x61\x73\x73", "\x23\x63\x2D\x61\x6C\x65\x72\x74", "\x66\x61\x20\x66\x61\x2D\x77\x61\x72\x6E\x69\x6E\x67", "\x66\x61\x20\x66\x61\x2D\x72\x65\x66\x72\x65\x73\x68\x20\x66\x61\x2D\x73\x70\x69\x6E", "\x23\x69\x63\x6F\x6E\x2D\x65\x72\x72\x6F\x72", "\x23\x6C\x69\x6E\x6B\x73", "\x43\x68\u1EB3\x6E\x67\x20\x63\xF3\x20\x67\xEC\x20\u0111\u1EC3\x20\x43\x68\x65\x63\x6B\x20\x63\u1EA3\x2E\x20\x42\u1EA1\x6E\x20\x70\x68\u1EA3\x69\x20\x6E\x68\u1EAD\x70\x20\x63\xE1\x69\x20\x67\xEC\x20\x76\xE0\x6F\x20\x63\x68\u1EE9\x20\x3F", "\x50\x4F\x53\x54", "\x2F\x63\x68\x65\x63\x6B\x5F\x6C\x69\x6E\x6B\x2E\x70\x68\x70", "\x6A\x73\x6F\x6E", "\x61\x63\x74\x69\x6F\x6E\x3D\x63\x68\x65\x63\x6B\x5F\x6C\x69\x6E\x6B\x26\x61\x72\x72\x6C\x69\x6E\x6B\x73\x3D", "\x26\x66\x6F\x72\x6D\x5F\x74\x6F\x6B\x65\x6E\x3D", "\x23\x66\x6F\x72\x6D\x5F\x74\x6F\x6B\x65\x6E", "\x43\xE1\x63\x20\x6D\xE1\x79\x20\x63\x68\u1EE7\x20\x74\u1EA1\x6D\x20\x74\x68\u1EDD\x69\x20\x6B\x68\xF4\x6E\x67\x20\x74\x68\u1EC3\x20\x74\x68\u1EF1\x63\x20\x68\x69\u1EC7\x6E\x20\x79\xEA\x75\x20\x63\u1EA7\x75\x20\x63\u1EE7\x61\x20\x62\u1EA1\x6E\x20\x64\x6F\x20\x68\u1EC7\x20\x74\x68\u1ED1\x6E\x67\x20\u0111\x61\x6E\x67\x20\x62\u1EA3\x6F\x20\x74\x72\xEC\x20\x68\x6F\u1EB7\x63\x20\x62\u1EAD\x6E\x2E\x20\x58\x69\x6E\x20\x76\x75\x69\x20\x6C\xF2\x6E\x67\x20\x74\x68\u1EED\x20\x6C\u1EA1\x69\x20\x73\x61\x75\x2E", "\x63\x68\x6B\x5F\x6C\x69\x6E\x6B\x5F\x72\x65\x63\x6F\x72\x64", "\x62\x62\x63\x6F\x64\x65", "\x68\x72\x65\x66", "\x23\x63\x68\x6B\x4C\x69\x6E\x6B\x52\x65\x73\x75\x6C\x74\x20\x61", "\x61\x6A\x61\x78", "\x7C", "\x73\x70\x6C\x69\x74", "\x74\x72\x69\x6D", "\x43\x68\u1EB3\x6E\x67\x20\x63\xF3\x20\x67\xEC\x20\u0111\u1EC3\x20\x47\x65\x74\x20\x63\u1EA3\x2E\x20\x42\u1EA1\x6E\x20\x70\x68\u1EA3\x69\x20\x6E\x68\u1EAD\x70\x20\x63\xE1\x69\x20\x67\xEC\x20\x76\xE0\x6F\x20\x63\x68\u1EE9\x20\x3F", "\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x69\x6E\x67", "\x55\x52\x4C", "\x42\u1EA1\x6E\x20\x63\xF3\x20\x6B\x68\u1EA3\x20\x6E\u0103\x6E\x67\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x20\x6E\x68\x61\x6E\x68\x20\x62\u1EB1\x6E\x67\x20\x76\u1EAD\x6E\x20\x74\u1ED1\x63\x20\xE1\x6E\x68\x20\x73\xE1\x6E\x67\x3F\x20\x42\u1EA1\x6E\x20\u0111\xE3\x20\x76\u01B0\u1EE3\x74\x20\x71\x75\xE1\x20\x67\x69\u1EDB\x69\x20\x68\u1EA1\x6E\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x20\x74\x72\x6F\x6E\x67\x20\x6D\u1ED9\x74\x20\u0111\u01A1\x6E\x20\x76\u1ECB\x20\x74\x68\u1EDD\x69\x20\x67\x69\x61\x6E\x20\x63\x68\x6F\x20\x70\x68\xE9\x70\x2E", "\x68\x74\x74\x70\x3A\x2F\x2F\x74\x6F\x6F\x6C\x73\x2E\x6C\x69\x6E\x6B\x73\x76\x69\x70\x2E\x6E\x65\x74\x2F\x67\x65\x74\x69\x6E\x66\x6F\x2E\x70\x68\x70", "\x6C\x69\x6E\x6B\x3D", "\x4A\x53\x4F\x4E", "\x66\x69\x6C\x65\x6E\x61\x6D\x65", "\x23\x66\x69\x6C\x65\x6E\x61\x6D\x65", "\x73\x69\x7A\x65", "\x23\x73\x69\x7A\x65", "\x2F\x47\x65\x74\x4C\x69\x6E\x6B\x46\x73", "\x26\x70\x61\x73\x73\x3D", "\x26\x68\x61\x73\x68\x3D", "\x26\x63\x61\x70\x74\x63\x68\x61\x3D", "\x75\x6E\x62\x69\x6E\x64", "\x23\x61\x5F\x64\x6F\x77\x6E", "\x74\x72\x61\x6E\x67\x74\x68\x61\x69", "\x72\x65\x73\x75\x6C\x74", "\x23\x6F\x70\x74\x69\x6F\x6E\x5F\x72\x65\x73\x75\x6C\x74", "\x70\x6C\x61\x63\x65\x68\x6F\x6C\x64\x65\x72", "\x54\xEA\x6E\x20\x74\u1EC7\x70\x20\x74\x69\x6E\x3A\x20\x3C\x66\x6F\x6E\x74\x20\x63\x6F\x6C\x6F\x72\x3D\x22\x23\x30\x30\x43\x43\x30\x30\x22\x3E\x3C\x73\x70\x61\x6E\x20\x69\x64\x3D\x22\x66\x69\x6C\x65\x6E\x61\x6D\x65\x22\x3E", "\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x66\x6F\x6E\x74\x3E\x20\x3C\x66\x6F\x6E\x74\x20\x63\x6F\x6C\x6F\x72\x3D\x22\x23\x46\x46\x36\x36\x46\x46\x22\x3E\x28\x3C\x73\x70\x61\x6E\x20\x69\x64\x3D\x22\x73\x69\x7A\x65\x22\x3E", "\x3C\x2F\x73\x70\x61\x6E\x3E\x29", "\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x66\x6F\x6E\x74\x3E", "\x6C\x69\x6E\x6B\x76\x69\x70", "\x70\x72\x6F\x78\x79", "\x23\x70\x72\x6F\x78\x79", "\x43\x6C\x69\x63\x6B\x20\x63\x68\x75\u1ED9\x74\x20\x70\x68\u1EA3\x69\x20\x76\xE0\x20\x63\x68\u1ECD\x6E\x20\x22\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x20\x77\x69\x74\x68\x20\x49\x44\x4D\x22\x20\x68\x6F\u1EB7\x63\x20\x43\x6F\x70\x79\x20\x6C\x69\x6E\x6B\x20\x76\xE0\x6F\x20\x28\u0110\xE3\x20\x74\x68\xEA\x6D\x20\x70\x72\x6F\x78\x79\x29\x20\u0111\u1EC3\x20\x54\u1EA3\x69\x20\x78\x75\u1ED1\x6E\x67", "\x43\x6C\x69\x63\x6B\x20\x63\x68\x75\u1ED9\x74\x20\x70\x68\u1EA3\x69\x20\x76\xE0\x20\x63\x68\u1ECD\x6E\x20\x22\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x20\x77\x69\x74\x68\x20\x49\x44\x4D\x22\x20\x68\x6F\u1EB7\x63\x20\x43\x6F\x70\x79\x20\x6C\x69\x6E\x6B\x20\x76\xE0\x6F\x20\x49\x44\x4D\x20\x28\u0110\xE3\x20\x74\x68\xEA\x6D\x20\x70\x72\x6F\x78\x79\x29\x20\u0111\u1EC3\x20\x54\u1EA3\x69\x20\x78\x75\u1ED1\x6E\x67", "\x6F\x75\x6F\x2E\x69\x6F", "\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x74\x68\xE0\x6E\x68\x20\x63\xF4\x6E\x67\x21\x0A\x0A\x43\x6C\x69\x63\x6B\x20\x22\x54\u1EA3\x69\x20\x78\x75\u1ED1\x6E\x67\x22\x20\x76\xE0\x20\x74\xED\x63\x68\x20\x76\xE0\x6F\x20\xF4\x20\x22\x54\xF4\x69\x20\x6B\x68\xF4\x6E\x67\x20\x70\x68\u1EA3\x69\x20\x6C\xE0\x20\x6E\x67\u01B0\u1EDD\x69\x20\x6D\xE1\x79\x22\x20\u0111\u1EC3\x20\x6C\u1EA5\x79\x20\x6C\x69\x6E\x6B\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x2E\x0A\x0A\x4E\u1EBF\x75\x20\x62\u1EA1\x6E\x20\x6B\x68\xF4\x6E\x67\x20\x74\x68\u1EC3\x20\x78\xE1\x63\x20\x6E\x68\u1EAD\x6E\x20\x68\xEC\x6E\x68\x20\u1EA3\x6E\x68\x2C\x20\x73\u1EED\x20\x64\u1EE5\x6E\x67\x20\x74\x72\xEC\x6E\x68\x20\x64\x75\x79\u1EC7\x74\x20\x6B\x68\xE1\x63\x20\x68\x6F\u1EB7\x63\x20\x6C\x69\xEA\x6E\x20\x68\u1EC7\x20\x41\x64\x6D\x69\x6E\x20\u0111\u1EC3\x20\u0111\u01B0\u1EE3\x63\x20\x68\u1ED7\x20\x74\x72\u1EE3\x2E\x0A\x0A\x55\x50\x20\x56\x49\x50\x20\u0111\u1EC3\x20\x49\x44\x4D\x20\x74\u1EF1\x20\u0111\u1ED9\x6E\x67\x20\x62\u1EAF\x74\x20\x6C\x69\x6E\x6B\x20\x76\xE0\x20\x6C\x6F\u1EA1\x69\x20\x62\u1ECF\x20\x71\x75\u1EA3\x6E\x67\x20\x63\xE1\x6F\x2E", "\x4C\x69\x6E\x6B\x73\x56\x49\x50\x20\x6E\x68\u1EAD\x6E\x20\x74\x68\u1EA5\x79\x20\x62\u1EA1\x6E\x20\u0111\xE3\x20\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x74\x68\xE0\x6E\x68\x20\x63\xF4\x6E\x67\x20\x6E\x68\u01B0\x6E\x67\x20\x63\x68\u01B0\x61\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x2E\x0A\x0A\x42\u1EA1\x6E\x20\x63\x68\u1EC9\x20\x63\u1EA7\x6E\x20\x63\x6C\x69\x63\x6B\x20\x76\xE0\x6F\x20\x6E\xFA\x74\x20\x22\x54\u1EA3\x69\x20\x78\x75\u1ED1\x6E\x67\x22\x20\x76\xE0\x20\x42\u1ECF\x20\x71\x75\x61\x20\x71\x75\u1EA3\x6E\x67\x20\x63\xE1\x6F\x20\x6C\xE0\x20\x63\xF3\x20\x74\x68\u1EC3\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x20\x74\u1EAD\x70\x20\x74\x69\x6E\x20\x6E\xE0\x79\x2E\x0A\x0A\x4E\u1EBF\x75\x20\x62\u1EA1\x6E\x20\x6B\x68\xF4\x6E\x67\x20\x62\x69\u1EBF\x74\x20\x63\xE1\x63\x68\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x2C\x20\x76\x75\x69\x20\x6C\xF2\x6E\x67\x20\x63\x6C\x69\x63\x6B\x20\x76\xE0\x6F\x20\x6D\u1EE5\x63\x20\x48\u01B0\u1EDB\x6E\x67\x20\x64\u1EAB\x6E\x20\u0111\u1EC3\x20\x78\x65\x6D\x20\x63\x6C\x69\x70\x20\x68\x6F\u1EB7\x63\x20\x6C\x69\xEA\x6E\x20\x68\u1EC7\x20\x41\x64\x6D\x69\x6E\x20\u0111\u1EC3\x20\u0111\u01B0\u1EE3\x63\x20\x68\u1ED7\x20\x74\x72\u1EE3\x2E\x0A\x0A\x42\u1EA1\x6E\x20\x63\xF3\x20\x63\x68\u1EAF\x63\x20\x63\x68\u1EAF\x6E\x20\x6D\x75\u1ED1\x6E\x20\x74\x68\x6F\xE1\x74\x3F", "\x62\x63\x2E\x76\x63", "\x61\x64\x66\x2E\x6C\x79", "\x6C\x69\x6E\x6B\x73\x68\x72\x69\x6E\x6B", "\x2F\x67\x6F\x2F", "\x73\x68\x2E\x73\x74", "\x6C\x69\x6E\x6B\x62\x75\x63\x6B\x73", "\x61\x64\x73\x2E\x6C\x69\x6E\x6B\x73\x76\x69\x70\x2E\x6E\x65\x74", "\x61\x6C\x6C\x64\x65\x62\x72\x69\x64\x2E\x63\x6F\x6D", "\x6F\x6E\x69\x2E\x76\x6E", "\x75\x6C\x74\x72\x61\x66\x69\x6C\x65\x73\x2E\x6E\x65\x74", "\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x74\x68\xE0\x6E\x68\x20\x63\xF4\x6E\x67\x21\x0A\x0A\x43\x6C\x69\x63\x6B\x20\x22\x54\u1EA3\x69\x20\x78\x75\u1ED1\x6E\x67\x22\x20\x76\xE0\x20\x22\x53\x6B\x69\x70\x20\x61\x64\x73\x22\x20\u0111\u1EC3\x20\x6C\u1EA5\x79\x20\x6C\x69\x6E\x6B\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x2E\x0A\x0A\x55\x50\x20\x56\x49\x50\x20\u0111\u1EC3\x20\x49\x44\x4D\x20\x74\u1EF1\x20\u0111\u1ED9\x6E\x67\x20\x62\u1EAF\x74\x20\x6C\x69\x6E\x6B\x20\x76\xE0\x20\x6C\x6F\u1EA1\x69\x20\x62\u1ECF\x20\x71\x75\u1EA3\x6E\x67\x20\x63\xE1\x6F\x2E", "\x2F\x63\x61\x70\x74\x63\x68\x61\x2F", "\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x74\x68\xE0\x6E\x68\x20\x63\xF4\x6E\x67\x21\x0A\x0A\x43\x6C\x69\x63\x6B\x20\x22\x54\u1EA3\x69\x20\x78\x75\u1ED1\x6E\x67\x22\x20\x76\xE0\x20\x4E\x68\u1EAD\x70\x20\x6D\xE3\x20\x62\u1EA3\x6F\x20\x76\u1EC7\x20\u0111\u1EC3\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x20\x6D\x61\x78\x20\x73\x70\x65\x65\x64\x2E\x0A\x0A\x4E\u1EBF\x75\x20\x62\u1EA1\x6E\x20\x6B\x68\xF4\x6E\x67\x20\x62\x69\u1EBF\x74\x20\x63\xE1\x63\x68\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x20\x76\x75\x69\x20\x6C\xF2\x6E\x67\x20\x78\x65\x6D\x20\x48\u01B0\u1EDB\x6E\x67\x20\x64\u1EAB\x6E\x20\x68\x6F\u1EB7\x63\x20\x6C\x69\xEA\x6E\x20\x68\u1EC7\x20\x41\x64\x6D\x69\x6E\x20\u0111\u1EC3\x20\u0111\u01B0\u1EE3\x63\x20\x68\u1ED7\x20\x74\x72\u1EE3\x2E", "\x4C\x69\x6E\x6B\x73\x56\x49\x50\x20\x6E\x68\u1EAD\x6E\x20\x74\x68\u1EA5\x79\x20\x62\u1EA1\x6E\x20\u0111\xE3\x20\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x74\x68\xE0\x6E\x68\x20\x63\xF4\x6E\x67\x20\x6E\x68\u01B0\x6E\x67\x20\x63\x68\u01B0\x61\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x2E\x0A\x0A\x42\u1EA1\x6E\x20\x63\x68\u1EC9\x20\x63\u1EA7\x6E\x20\x63\x6C\x69\x63\x6B\x20\x76\xE0\x6F\x20\x6E\xFA\x74\x20\x22\x54\u1EA3\x69\x20\x78\x75\u1ED1\x6E\x67\x22\x20\x6C\xE0\x20\x63\xF3\x20\x74\x68\u1EC3\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x20\x74\u1EAD\x70\x20\x74\x69\x6E\x20\x6E\xE0\x79\x2E\x0A\x0A\x4E\u1EBF\x75\x20\x62\u1EA1\x6E\x20\x6B\x68\xF4\x6E\x67\x20\x62\x69\u1EBF\x74\x20\x63\xE1\x63\x68\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x2C\x20\x76\x75\x69\x20\x6C\xF2\x6E\x67\x20\x63\x6C\x69\x63\x6B\x20\x76\xE0\x6F\x20\x6D\u1EE5\x63\x20\x48\u01B0\u1EDB\x6E\x67\x20\x64\u1EAB\x6E\x20\u0111\u1EC3\x20\x78\x65\x6D\x20\x63\x6C\x69\x70\x20\x68\x6F\u1EB7\x63\x20\x6C\x69\xEA\x6E\x20\x68\u1EC7\x20\x41\x64\x6D\x69\x6E\x20\u0111\u1EC3\x20\u0111\u01B0\u1EE3\x63\x20\x68\u1ED7\x20\x74\x72\u1EE3\x2E\x0A\x0A\x42\u1EA1\x6E\x20\x63\xF3\x20\x63\x68\u1EAF\x63\x20\x63\x68\u1EAF\x6E\x20\x6D\x75\u1ED1\x6E\x20\x74\x68\x6F\xE1\x74\x3F", "\x2F\x67\x65\x74\x2D\x6C\x69\x6E\x6B\x2F\x74\x61\x69\x2D\x76\x65\x2F", "\x47\x65\x74\x20\x6C\x69\x6E\x6B\x20\x74\x68\xE0\x6E\x68\x20\x63\xF4\x6E\x67\x21\x0A\x0A\x43\x6C\x69\x63\x6B\x20\x22\x54\u1EA3\x69\x20\x78\x75\u1ED1\x6E\x67\x22\x20\x76\xE0\x20\x43\x6F\x70\x79\x20\x43\x68\x75\u1ED7\x69\x20\x6D\xE3\x20\x68\xF3\x61\x20\x76\xE0\x6F\x20\x54\x6F\x6F\x6C\x20\u0111\u1EC3\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x20\x6D\x61\x78\x20\x73\x70\x65\x65\x64\x2E\x0A\x0A\x4E\u1EBF\x75\x20\x62\u1EA1\x6E\x20\x6B\x68\xF4\x6E\x67\x20\x62\x69\u1EBF\x74\x20\x63\xE1\x63\x68\x20\x44\x6F\x77\x6E\x6C\x6F\x61\x64\x20\x76\x75\x69\x20\x6C\xF2\x6E\x67\x20\x78\x65\x6D\x20\x48\u01B0\u1EDB\x6E\x67\x20\x64\u1EAB\x6E\x20\x68\x6F\u1EB7\x63\x20\x6C\x69\xEA\x6E\x20\x68\u1EC7\x20\x41\x64\x6D\x69\x6E\x20\u0111\u1EC3\x20\u0111\u01B0\u1EE3\x63\x20\x68\u1ED7\x20\x74\x72\u1EE3\x2E", "\x66\x3D", "\x6C\x6F\x69", "\x48\x69\u1EC7\x6E\x20\x74\u1EA1\x69\x20\x68\u1EC7\x20\x74\x68\u1ED1\x6E\x67\x20\u0111\x61\x6E\x67\x20\x71\x75\xE1\x20\x74\u1EA3\x69\x20\x64\x6F\x20\x71\x75\xE1\x20\x6E\x68\x69\u1EC1\x75\x20\x79\xEA\x75\x20\x63\u1EA7\x75\x20\x67\x65\x74\x20\x6C\x69\x6E\x6B\x20\x76\xE0\x6F\x20\x6C\xFA\x63\x20\x6E\xE0\x79\x2E\x20\x42\u1EA1\x6E\x20\x76\x75\x69\x20\x6C\xF2\x6E\x67\x20\x74\x68\u1EED\x20\x6C\u1EA1\x69\x20\x73\x61\x75\x20\x76\xE0\x69\x20\x70\x68\xFA\x74\x21", "\x63\u1EA5\x70\x20\x71\x75\x79\u1EC1\x6E\x20\x47\x65\x74\x20\x6C\x69\x6E\x6B", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x68\x74\x74\x70\x3A\x2F\x2F\x6C\x69\x6E\x6B\x73\x76\x69\x70\x2E\x6E\x65\x74\x2F\x70\x65\x72\x6D\x69\x73\x73\x69\x6F\x6E\x67\x65\x74\x6C\x69\x6E\x6B\x2E\x76\x69\x70", "\x63\x61\x70\x74\x63\x68\x61", "\x58\x65\x6D\x20\x63\xE1\x63\x20\x68\x6F\x73\x74", "\x67\x69\xE2\x79\x20\x6E\u1EEF\x61", "\x23\x63\x2D\x65\x72\x72\x6F\x72\x2D\x6D\x65\x73\x73", "\x73\x61\x75\x20\x28\x2E\x2A\x3F\x29\x20\x67\x69\xE2\x79\x20\x6E\u1EEF\x61", "\x6D\x61\x74\x63\x68", "\x3C\x73\x70\x61\x6E\x20\x69\x64\x3D\x22\x74\x69\x6D\x65\x5F\x6C\x69\x6D\x69\x74\x22\x3E", "\x3C\x2F\x73\x70\x61\x6E\x3E", "\x72\x65\x70\x6C\x61\x63\x65", "\x56\x75\x69\x20\x6C\xF2\x6E\x67\x20\x6E\x68\u1EAD\x6E\x20\x74\x68\xEA\x6D\x20\x73\u1ED1\x20\x6C\u1EA7\x6E\x20\x67\x65\x74\x20\x6C\x69\x6E\x6B\x20\u0111\u1EC3\x20\x74\x69\u1EBF\x70\x20\x74\u1EE5\x63", "\u0111\u0103\x6E\x67\x20\x6E\x68\u1EAD\x70", "\x23\x66\x75\x73\x65\x72\x6E\x61\x6D\x65", "\x71\x75\u1EA3\x6E\x67\x20\x63\xE1\x6F", "\x56\x75\x69\x20\x6C\xF2\x6E\x67\x20\x6E\x68\u1EAD\x70\x20\x6D\u1EAD\x74\x20\x6B\x68\u1EA9\x75\x20\u0111\u1EC3\x20\x74\u1EA3\x69\x20\x74\u1EAD\x70\x20\x74\x69\x6E", "\x4D\u1EAD\x74\x20\x6B\x68\u1EA9\x75\x20\x6B\x68\xF4\x6E\x67\x20\x63\x68\xED\x6E\x68\x20\x78\xE1\x63", "\x23\x63\x61\x70\x74\x63\x68\x61\x5F\x69\x6D\x61\x67\x65\x5F\x63\x61\x72\x64", "\x23\x63\x61\x70\x74\x63\x68\x61\x5F\x63\x61\x72\x64", "\x63\x61\x70\x74\x63\x68\x61\x5F\x69\x6D\x61\x67\x65\x5F\x63\x61\x72\x64", "\x63\x61\x70\x74\x63\x68\x61\x5F\x63\x61\x72\x64\x2E\x70\x68\x70\x3F", "\x23\x64\x69\x76\x5F\x63\x61\x70\x74\x63\x68\x61\x5F\x63\x61\x72\x64", "\x70\x6F\x69\x6E\x74", "\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65", "\x23\x63\x6F\x6E\x74\x65\x6E\x74", "\x23\x63\x61\x70\x74\x63\x68\x61\x5F\x70\x6F\x69\x6E\x74", "\x63\x61\x70\x74\x63\x68\x61\x5F\x69\x6D\x61\x67\x65\x5F\x70\x6F\x69\x6E\x74", "\x73\x61\x6C\x65\x73\x70\x6F\x69\x6E\x74\x2F\x63\x61\x70\x74\x63\x68\x61\x5F\x70\x6F\x69\x6E\x74\x2E\x70\x68\x70\x3F", "\x50\x6C\x65\x61\x73\x65\x20\x77\x61\x69\x74\x2E\x2E\x2E", "\x23\x73\x65\x6E\x64", "\x4D\x75\x61\x20\x50\x6F\x69\x6E\x74", "\x23\x64\x69\x76\x5F\x63\x61\x70\x74\x63\x68\x61\x5F\x70\x6F\x69\x6E\x74", "\x64\x6F\x6E\x65", "\x2F\x73\x61\x6C\x65\x73\x70\x6F\x69\x6E\x74\x2F\x67\x65\x74\x5F\x72\x65\x71\x75\x65\x73\x74\x5F\x6B\x65\x79\x2E\x70\x68\x70", "\x62\x6F\x64\x79", "\x23\x52\x65\x63\x68\x61\x72\x67\x65\x43\x61\x72\x64\x46\x6F\x72\x6D\x5F\x53\x65\x72\x69\x61\x6C", "\x69\x6E\x70\x75\x74\x5B\x6E\x61\x6D\x65\x3D\x22\x52\x65\x63\x68\x61\x72\x67\x65\x43\x61\x72\x64\x46\x6F\x72\x6D\x5B\x65\x6D\x6F\x74\x69\x6F\x6E\x5D\x22\x5D\x3A\x63\x68\x65\x63\x6B\x65\x64", "\x23\x52\x65\x63\x68\x61\x72\x67\x65\x43\x61\x72\x64\x46\x6F\x72\x6D\x5F\x50\x69\x6E", "\x23\x62\x6B\x2D\x61\x6C\x65\x72\x74", "\x42\u1EA1\x6E\x20\x63\x68\u01B0\x61\x20\x63\x68\u1ECD\x6E\x20\x6C\x6F\u1EA1\x69\x20\x74\x68\u1EBB", "\x23\x62\x6B\x2D\x61\x6C\x65\x72\x74\x2D\x65\x72\x72\x6F\x72\x2D\x6D\x65\x73\x73", "\x4E\x68\u1EAD\x70\x20\x6D\xE3\x20\x50\x49\x4E\x20\x6B\x68\xF4\x6E\x67\x20\u0111\u01B0\u1EE3\x63\x20\x70\x68\xE9\x70\x20\x72\u1ED7\x6E\x67\x2E", "\x4E\x68\u1EAD\x70\x20\x73\u1ED1\x20\x53\x45\x52\x49\x20\x6B\x68\xF4\x6E\x67\x20\u0111\u01B0\u1EE3\x63\x20\x70\x68\xE9\x70\x20\x72\u1ED7\x6E\x67\x2E", "\x2F\x6E\x61\x70\x74\x68\x65\x61\x63\x74\x2E\x68\x74\x6D\x6C", "\x52\x65\x63\x68\x61\x72\x67\x65\x43\x61\x72\x64\x46\x6F\x72\x6D\x5B\x65\x6D\x6F\x74\x69\x6F\x6E\x5D\x3D", "\x26\x52\x65\x63\x68\x61\x72\x67\x65\x43\x61\x72\x64\x46\x6F\x72\x6D\x5B\x50\x69\x6E\x5D\x3D", "\x26\x52\x65\x63\x68\x61\x72\x67\x65\x43\x61\x72\x64\x46\x6F\x72\x6D\x5B\x53\x65\x72\x69\x61\x6C\x5D\x3D", "\x26\x65\x6D\x61\x69\x6C\x3D", "\x23\x65\x6D\x61\x69\x6C", "\x26\x63\x6F\x6E\x74\x65\x6E\x74\x3D", "\x26\x63\x61\x70\x74\x63\x68\x61\x5F\x63\x61\x72\x64\x3D", "\x26\x63\x61\x70\x74\x63\x68\x61\x5F\x70\x6F\x69\x6E\x74\x3D", "\x23\x62\x6B\x2D\x61\x6C\x65\x72\x74\x2D\x6F\x6B", "\x23\x62\x6B\x2D\x61\x6C\x65\x72\x74\x2D\x77\x61\x69\x74", "\u0110\x61\x6E\x67\x20\x78\u1EED\x20\x6C\xED\x2E\x2E\x2E", "\x42\u1EA1\x6E\x20\u0111\xE3\x20\u0111\u1EC3\x20\x74\x72\xEC\x6E\x68\x20\x64\x75\x79\u1EC7\x74\x20\x71\x75\xE1\x20\x74\x68\u1EDD\x69\x20\x67\x69\x61\x6E\x20\x78\u1EED\x20\x6C\xFD\x2E\x20\u0110\u1EC3\x20\x74\x68\u1EF1\x63\x20\x68\x69\u1EC7\x6E\x20\x63\x68\u1EE9\x63\x20\x6E\u0103\x6E\x67\x20\x76\x75\x69\x20\x6C\xF2\x6E\x67\x20\x6E\x68\u1EA5\x6E\x20\x52\x65\x66\x72\x65\x73\x68\x20\x68\x6F\u1EB7\x63\x20\x46\x35\x20\u0111\u1EC3\x20\x6C\x6F\x61\x64\x20\x6C\u1EA1\x69\x20\x74\x72\x61\x6E\x67\x2E", "\x44\x6F\x6E\x61\x74\x65", "\x73\x74\x61\x74\x75\x73", "\x6D\x65\x73\x73", "\x23\x62\x6B\x2D\x61\x6C\x65\x72\x74\x2D\x6F\x6B\x2D\x6D\x65\x73\x73", "\x2F\x6C\x6F\x67\x69\x6E\x2F\x6C\x6F\x67\x69\x6E\x65\x64\x2E\x70\x68\x70", "\x23\x62\x6F\x78\x6C\x6F\x67\x69\x6E", "\x20\x73\x65\x6C\x65\x63\x74\x65\x64", "\x63\x6C\x61\x73\x73", "\x69\x6D\x61\x67\x65\x73\x2F\x63\x61\x72\x64\x2F", "\x2E\x70\x6E\x67", "\x2E\x63\x61\x72\x64\x2D\x69\x6D\x67", "\x2E\x63\x61\x72\x64\x2D\x64\x69\x76", "\x2E\x65\x6D\x6F\x74\x69\x6F\x6E\x20\x6C\x61\x62\x65\x6C", "\x63\x61\x72\x64", "\x2D\x70\x69\x6E\x2E\x70\x6E\x67", "\x2D\x73\x65\x72\x69\x2E\x70\x6E\x67", "\x69\x6E\x70\x75\x74\x5F\x68\x69\x64\x64\x65\x6E", "\x2E\x65\x6D\x6F\x74\x69\x6F\x6E\x20\x69\x6E\x70\x75\x74\x3A\x72\x61\x64\x69\x6F", "\x5B\x63\x68\x65\x63\x6B\x65\x64\x3D\x22\x63\x68\x65\x63\x6B\x65\x64\x22\x5D", "\x66\x6F\x72", "\x6C\x61\x6E\x67", "\x69\x64", "\x5B\x6E\x61\x6D\x65\x3D\x22\x52\x65\x63\x68\x61\x72\x67\x65\x43\x61\x72\x64\x46\x6F\x72\x6D\x5B\x65\x6D\x6F\x74\x69\x6F\x6E\x5D\x22\x5D", "\x63\x68\x65\x63\x6B\x65\x64", "\x73\x65\x6C\x65\x63\x74\x65\x64", "\x2E\x65\x6D\x6F\x74\x69\x6F\x6E\x20\x3E\x20\x6C\x61\x62\x65\x6C", "\x23", "\x20\x67\x69\xE1\x20\x74\x72\u1ECB\x20\x74\x68\u1EBB\x20\x6E\u1EA1\x70", "\x23\x70\x65\x72\x63\x65\x6E\x74\x43\x61\x72\x64", "\x61\x63\x69\x76\x74\x65\x2D\x63\x61\x72\x64\x2D\x63\x6F\x6E\x74\x65\x6E", "\x70\x61\x72\x65\x6E\x74", "\x68\x6F\x76\x65\x72", "\x69\x6E\x70\x75\x74\x23\x66\x75\x73\x65\x72\x6E\x61\x6D\x65", "\x69\x6E\x70\x75\x74\x23\x66\x70\x61\x73\x73\x77\x6F\x72\x64", "\x2F\x6C\x6F\x67\x69\x6E\x2F", "\x75\x3D", "\x26\x70\x3D", "\x26\x61\x75\x74\x6F\x5F\x6C\x6F\x67\x69\x6E\x3D", "\x23\x61\x75\x74\x6F\x5F\x6C\x6F\x67\x69\x6E", "\x23\x63\x68\x65\x63\x6B\x41\x63\x63\x4D\x65\x73\x73", "\x23\x66\x6C\x6F\x61\x64\x69\x6E\x67\x5F\x6C\x6F\x67\x69\x6E", "\x23\x66\x6F\x72\x6D\x5F\x61\x63\x63\x5F\x66\x73\x68\x61\x72\x65\x20\x69\x6E\x70\x75\x74", "\x23\x66\x6F\x72\x6D\x5F\x61\x63\x63\x5F\x66\x73\x68\x61\x72\x65\x20\x62\x75\x74\x74\x6F\x6E", "\x75\x73\x65\x72", "\x66\x61\x20\x66\x61\x2D\x65\x78\x63\x6C\x61\x6D\x61\x74\x69\x6F\x6E\x2D\x74\x72\x69\x61\x6E\x67\x6C\x65", "\x23\x73\x70\x61\x6E\x63\x68\x65\x63\x6B\x41\x63\x63\x4D\x65\x73\x73", "\x6D\x65\x73\x73\x61\x67\x65", "\x23\x63\x68\x65\x63\x6B\x41\x63\x63\x4D\x65\x73\x73\x20\x73\x70\x61\x6E", "\x53\x61\x69\x20\x74\xEA\x6E\x20\u0111\u0103\x6E\x67\x20\x6E\x68\u1EAD\x70\x20\x68\x6F\u1EB7\x63\x20\x6D\u1EAD\x74\x20\x6B\x68\u1EA9\x75", "\x23\x62\x74\x6E\x5F\x63\x68\x65\x63\x6B\x41\x63\x63", "\x74\x6F\x70", "\x6F\x66\x66\x73\x65\x74", "\x68\x74\x6D\x6C\x2C\x62\x6F\x64\x79", "\x63\x68\x65\x63\x6B", "\x6C\x69\x6E\x6B", "\x70\x72\x6F\x63\x65\x73\x73\x65\x64", "\x72\x65\x66", "\x61\x6C\x6C", "\x68\x69\x67\x68\x6C\x69\x67\x68\x74", "\x77\x72\x69\x74\x65", "\x30\x30", "\x31\x34", "\x32\x38", "\x33\x43", "\x35\x30", "\x36\x34", "\x37\x38", "\x38\x43", "\x41\x30", "\x42\x34", "\x43\x38", "\x44\x43", "\x46\x30", "\x63\x6F\x6C\x6F\x72", "\x73\x74\x79\x6C\x65", "\x63\x68\x61\x6E\x67\x65\x28\x29"];
$(window)[_0x5e1c[4]](function() {
    if ($(window)[_0x5e1c[0]]() > 200) {
        $(_0x5e1c[2])[_0x5e1c[1]](200)
    } else {
        $(_0x5e1c[2])[_0x5e1c[3]](200)
    }
});
$(_0x5e1c[9])[_0x5e1c[8]](function() {
    $(_0x5e1c[7])[_0x5e1c[6]]({
        scrollTop: 0
    }, _0x5e1c[5]);
    return false;
});
$(_0x5e1c[12])[_0x5e1c[11]](_0x5e1c[10]);
$(_0x5e1c[15])[_0x5e1c[8]](function() {
    $(_0x5e1c[14])[_0x5e1c[13]]()
});
$(_0x5e1c[14])[_0x5e1c[18]](_0x5e1c[16], function() {
    setTimeout(function() {
        $(_0x5e1c[17])[_0x5e1c[8]]()
    }, 100)
});
$(_0x5e1c[19])[_0x5e1c[18]](_0x5e1c[16], function() {
    setTimeout(function() {
        $(_0x5e1c[17])[_0x5e1c[8]]()
    }, 100)
});
$(_0x5e1c[33])[_0x5e1c[8]](function() {
    $(_0x5e1c[22])[_0x5e1c[21]](_0x5e1c[20]);
    $(_0x5e1c[22])[_0x5e1c[13]]();
    if ($(_0x5e1c[14])[_0x5e1c[21]]()[_0x5e1c[24]](_0x5e1c[23]) != -1) {
        document[_0x5e1c[27]](_0x5e1c[26])[_0x5e1c[25]] = _0x5e1c[28] + Math[_0x5e1c[29]]()
    } else {
        if ($(_0x5e1c[14])[_0x5e1c[21]]()[_0x5e1c[24]](_0x5e1c[30]) != -1) {
            document[_0x5e1c[27]](_0x5e1c[26])[_0x5e1c[25]] = _0x5e1c[31] + Math[_0x5e1c[29]]()
        } else {
            document[_0x5e1c[27]](_0x5e1c[26])[_0x5e1c[25]] = _0x5e1c[32] + Math[_0x5e1c[29]]()
        }
    };
});
$(document)[_0x5e1c[37]](function() {
    $(_0x5e1c[35])[_0x5e1c[34]]();
    $(_0x5e1c[36])[_0x5e1c[8]](function() {
        checklink()
    });
});
$(_0x5e1c[17])[_0x5e1c[8]](function() {
    getlink($(_0x5e1c[14])[_0x5e1c[21]]())
});

function downloaded() {
    window[_0x5e1c[42]][_0x5e1c[41]](_0x5e1c[38], _0x5e1c[39], _0x5e1c[40]);
    $(_0x5e1c[45])[_0x5e1c[44]](_0x5e1c[43]);
    $(_0x5e1c[45])[_0x5e1c[47]](_0x5e1c[46]);
}

function hash(_0x35cbx3) {
    var _0x35cbx4 = _0x35cbx3 || 9;
    s = _0x5e1c[20], code = _0x5e1c[48];
    for (var _0x35cbx5 = 0; _0x35cbx5 < _0x35cbx4; _0x35cbx5++) {
        s += code[_0x5e1c[51]](Math[_0x5e1c[50]](Math[_0x5e1c[29]]() * code[_0x5e1c[49]]))
    };
    return s;
}

function bnt_getlink(b) {
    switch (b) {
        case _0x5e1c[75]:
            $(_0x5e1c[53])[_0x5e1c[52]](_0x5e1c[46], true);
            $(_0x5e1c[54])[_0x5e1c[52]](_0x5e1c[46], true);
            $(_0x5e1c[55])[_0x5e1c[52]](_0x5e1c[46], true);
            $(_0x5e1c[58])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[59])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[60])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[61])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[62])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[63])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[65])[_0x5e1c[64]](_0x5e1c[20]);
            $(_0x5e1c[67])[_0x5e1c[66]](_0x5e1c[56]);
            $(_0x5e1c[68])[_0x5e1c[1]](_0x5e1c[56]);
            $(_0x5e1c[69])[_0x5e1c[66]](_0x5e1c[56]);
            $(_0x5e1c[71])[_0x5e1c[44]](_0x5e1c[70]);
            $(_0x5e1c[72])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[73])[_0x5e1c[34]](_0x5e1c[56]);
            $(_0x5e1c[19])[_0x5e1c[34]](_0x5e1c[56]);
            if (typeof time_limit != _0x5e1c[74]) {
                stopinterval()
            };
            break;;
        case _0x5e1c[77]:
            $(_0x5e1c[53])[_0x5e1c[52]](_0x5e1c[46], false);
            $(_0x5e1c[54])[_0x5e1c[52]](_0x5e1c[46], false);
            $(_0x5e1c[55])[_0x5e1c[52]](_0x5e1c[46], false);
            $(_0x5e1c[67])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[68])[_0x5e1c[3]](_0x5e1c[56]);
            $(_0x5e1c[69])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[71])[_0x5e1c[44]](_0x5e1c[76]);
            $(_0x5e1c[22])[_0x5e1c[21]](_0x5e1c[20]);
            $(_0x5e1c[19])[_0x5e1c[21]](_0x5e1c[20]);;
    }
}

function bnt_checklink(b) {
    switch (b) {
        case _0x5e1c[75]:
            $(_0x5e1c[54])[_0x5e1c[52]](_0x5e1c[46], true);
            $(_0x5e1c[55])[_0x5e1c[52]](_0x5e1c[46], true);
            $(_0x5e1c[35])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[78])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[67])[_0x5e1c[66]](_0x5e1c[56]);
            $(_0x5e1c[68])[_0x5e1c[1]](_0x5e1c[56]);
            $(_0x5e1c[79])[_0x5e1c[66]](_0x5e1c[56]);
            $(_0x5e1c[36])[_0x5e1c[44]](_0x5e1c[70]);
            break;;
        case _0x5e1c[77]:
            $(_0x5e1c[54])[_0x5e1c[52]](_0x5e1c[46], false);
            $(_0x5e1c[55])[_0x5e1c[52]](_0x5e1c[46], false);
            $(_0x5e1c[67])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[68])[_0x5e1c[3]](_0x5e1c[56]);
            $(_0x5e1c[79])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[36])[_0x5e1c[44]](_0x5e1c[80]);;
    }
}

function copy() {
    setTimeout(function() {
        $(_0x5e1c[84])[_0x5e1c[83]]({
            path: _0x5e1c[81],
            copy: function() {
                return $(_0x5e1c[82])[_0x5e1c[21]]()
            }
        });
        $(_0x5e1c[86])[_0x5e1c[83]]({
            path: _0x5e1c[81],
            copy: function() {
                return $(_0x5e1c[85])[_0x5e1c[21]]()
            }
        });
    }, 100)
}

function playinterval(_0x35cbxb) {
    timer = setInterval(_0x5e1c[87], _0x35cbxb);
    return false;
}

function stopinterval() {
    clearInterval(timer);
    return false;
}

function liveTime() {
    time_limit = parseInt($(_0x5e1c[88])[_0x5e1c[64]]());
    if (time_limit < 1) {
        stopinterval()
    };
    if (time_limit > 0) {
        $(_0x5e1c[88])[_0x5e1c[64]](time_limit - 1);
        $(_0x5e1c[53])[_0x5e1c[52]](_0x5e1c[46], true);
        $(_0x5e1c[54])[_0x5e1c[52]](_0x5e1c[46], true);
        $(_0x5e1c[55])[_0x5e1c[52]](_0x5e1c[46], true);
        $(_0x5e1c[91])[_0x5e1c[52]](_0x5e1c[89], _0x5e1c[90]);
        window[_0x5e1c[92]] = function() {
            return _0x5e1c[93] + time_limit + _0x5e1c[94]
        };
        document[_0x5e1c[95]] = _0x5e1c[96] + time_limit + _0x5e1c[97];
    } else {
        $(_0x5e1c[17])[_0x5e1c[8]]();
        $(_0x5e1c[98])[_0x5e1c[47]](_0x5e1c[89]);
        window[_0x5e1c[92]] = null;
        document[_0x5e1c[95]] = _0x5e1c[99];
        $(_0x5e1c[104])[_0x5e1c[103]](_0x5e1c[102])[_0x5e1c[101]](_0x5e1c[100]);
        $(_0x5e1c[107])[_0x5e1c[103]](_0x5e1c[106])[_0x5e1c[101]](_0x5e1c[105]);
    };
}

function checklink() {
    if (!$(_0x5e1c[108])[_0x5e1c[21]]()) {
        alert(_0x5e1c[109]);
        return false;
    };
    $[_0x5e1c[121]]({
        type: _0x5e1c[110],
        url: _0x5e1c[111],
        dataType: _0x5e1c[112],
        data: _0x5e1c[113] + $(_0x5e1c[108])[_0x5e1c[21]]() + _0x5e1c[114] + $(_0x5e1c[115])[_0x5e1c[21]](),
        beforeSend: function() {
            bnt_checklink(_0x5e1c[75])
        },
        error: function() {
            alert(_0x5e1c[116]);
            bnt_checklink(_0x5e1c[77]);
        },
        success: function(_0x35cbxf) {
            $(_0x5e1c[35])[_0x5e1c[66]](_0x5e1c[56]);
            $(_0x5e1c[78])[_0x5e1c[66]](_0x5e1c[56]);
            $(_0x5e1c[78])[_0x5e1c[44]](_0x35cbxf[_0x5e1c[117]]);
            $(_0x5e1c[82])[_0x5e1c[21]](_0x35cbxf[_0x5e1c[118]]);
            bnt_checklink(_0x5e1c[77]);
            $(_0x5e1c[120])[_0x5e1c[8]](function() {
                scrollToElement(_0x5e1c[44], 600);
                $(_0x5e1c[14])[_0x5e1c[21]](this[_0x5e1c[119]]);
                $(_0x5e1c[17])[_0x5e1c[8]]();
                return false;
            });
            copy();
        }
    });
    return false;
}

function getlink(link, _0x35cbx12) {
    if (!_0x35cbx12) {
        temp = $[_0x5e1c[124]](link[_0x5e1c[123]](_0x5e1c[122])[1]);
        if (temp) {
            _0x35cbx12 = temp
        };
    };
    if (!_0x35cbx12) {
        if ($(_0x5e1c[19])[_0x5e1c[21]]()) {
            _0x35cbx12 = $(_0x5e1c[19])[_0x5e1c[21]]()
        }
    };
    if (!link) {
        $(_0x5e1c[63])[_0x5e1c[66]](_0x5e1c[56]);
        $(_0x5e1c[65])[_0x5e1c[44]](_0x5e1c[125]);
        return false;
    };
    if (document[_0x5e1c[127]][_0x5e1c[24]](_0x5e1c[126]) > 0) {
        $(_0x5e1c[63])[_0x5e1c[66]](_0x5e1c[56]);
        $(_0x5e1c[65])[_0x5e1c[44]](_0x5e1c[128]);
        return false;
    };
    $[_0x5e1c[121]]({
        url: _0x5e1c[129],
        type: _0x5e1c[110],
        data: _0x5e1c[130] + link,
        dataType: _0x5e1c[131],
        success: function(_0x35cbx13) {
            if (_0x35cbx13[_0x5e1c[132]]) {
                $(_0x5e1c[133])[_0x5e1c[44]](_0x35cbx13[_0x5e1c[132]]);
                $(_0x5e1c[135])[_0x5e1c[44]](_0x35cbx13[_0x5e1c[134]]);
                $(_0x5e1c[58])[_0x5e1c[66]](_0x5e1c[56]);
            }
        }
    });
	 //@@ get Fshare
    $[_0x5e1c[121]]({
        url: _0x5e1c[136],
        type: _0x5e1c[110],
        data: _0x5e1c[130] + link + _0x5e1c[137] + _0x35cbx12 + _0x5e1c[138] + hash(32) + _0x5e1c[139] + $(_0x5e1c[22])[_0x5e1c[21]](),
        dataType: _0x5e1c[131],
        timeout: 180000,
        beforeSend: function() {
            bnt_getlink(_0x5e1c[75])
        },
        error: function() {
            $(_0x5e1c[63])[_0x5e1c[66]](_0x5e1c[56]);
            $(_0x5e1c[65])[_0x5e1c[44]](_0x5e1c[116]);
            bnt_getlink(_0x5e1c[77]);
        },
        success: function(_0x35cbx14) {
            $(_0x5e1c[141])[_0x5e1c[140]](_0x5e1c[8]);
            $(_0x5e1c[141])[_0x5e1c[8]](function() {
                window[_0x5e1c[92]] = null
            });
            if (_0x35cbx14[_0x5e1c[142]] == 2) {
                $(_0x5e1c[144])[_0x5e1c[44]](_0x35cbx14[_0x5e1c[143]]);
                $(_0x5e1c[14])[_0x5e1c[52]](_0x5e1c[145], $(_0x5e1c[14])[_0x5e1c[21]]());
                $(_0x5e1c[14])[_0x5e1c[21]](_0x5e1c[20]);
            } else {
                if (_0x35cbx14[_0x5e1c[142]] == 1) {
                    if (_0x35cbx14[_0x5e1c[134]]) {
                        $(_0x5e1c[58])[_0x5e1c[44]](_0x5e1c[146] + _0x35cbx14[_0x5e1c[132]] + _0x5e1c[147] + _0x35cbx14[_0x5e1c[134]] + _0x5e1c[148]);
                        $(_0x5e1c[58])[_0x5e1c[66]](_0x5e1c[56]);
                    } else {
                        if (_0x35cbx14[_0x5e1c[132]]) {
                            $(_0x5e1c[58])[_0x5e1c[44]](_0x5e1c[146] + _0x35cbx14[_0x5e1c[132]] + _0x5e1c[149]);
                            $(_0x5e1c[58])[_0x5e1c[66]](_0x5e1c[56]);
                        }
                    };
                    $(_0x5e1c[61])[_0x5e1c[66]](_0x5e1c[56]);
                    $(_0x5e1c[14])[_0x5e1c[52]](_0x5e1c[145], $(_0x5e1c[14])[_0x5e1c[21]]());
                    $(_0x5e1c[14])[_0x5e1c[21]](_0x5e1c[20]);
                    $(_0x5e1c[85])[_0x5e1c[21]](_0x35cbx14[_0x5e1c[150]]);
                    $(_0x5e1c[141])[_0x5e1c[52]](_0x5e1c[119], _0x35cbx14[_0x5e1c[150]]);
                    $(_0x5e1c[141])[_0x5e1c[52]](_0x5e1c[89], _0x5e1c[90]);
                    $(_0x5e1c[141])[_0x5e1c[47]](_0x5e1c[95]);
						  //@@ tải xong ấn nút download luôn
						  window.open(_0x35cbx14[_0x5e1c[150]]);
                    setTimeout(function() {
                        if (_0x35cbx14[_0x5e1c[151]]) {
                            $(_0x5e1c[152])[_0x5e1c[44]](_0x35cbx14[_0x5e1c[151]]);
                            $(_0x5e1c[59])[_0x5e1c[66]](_0x5e1c[56]);
                            $(_0x5e1c[141])[_0x5e1c[52]](_0x5e1c[95], _0x5e1c[153]);
                            $(_0x5e1c[141])[_0x5e1c[8]](function() {
                                alert(_0x5e1c[154]);
                                return false;
                            });
                        } else {
                            if (_0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[155]) > 1) {
                                $(_0x5e1c[62])[_0x5e1c[66]](_0x5e1c[56]);
                                //@@ get link thành công
										  //alert(_0x5e1c[156]);
                                window[_0x5e1c[92]] = function() {
                                    return _0x5e1c[157]
                                };
                            } else {
                                if (_0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[158]) > 1 || _0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[159]) > 1 || _0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[160]) > 1 || _0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[161]) > 1 || _0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[162]) > 1 || _0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[163]) > 1 || _0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[164]) > 1 || _0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[165]) > 1 || _0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[166]) > 1 || _0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[167]) > 1) {
                                    //alert(_0x5e1c[168]);
												//@@ get link thành công
                                    window[_0x5e1c[92]] = function() {
                                        return _0x5e1c[157]
                                    };
                                } else {
                                    if (_0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[169]) > 1) {
                                        alert(_0x5e1c[170]);
                                        window[_0x5e1c[92]] = function() {
                                            return _0x5e1c[171]
                                        };
                                    } else {
                                        if (_0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[172]) > 1) {
                                            alert(_0x5e1c[173]);
                                            window[_0x5e1c[92]] = function() {
                                                return _0x5e1c[171]
                                            };
                                        } else {
                                            if (_0x35cbx14[_0x5e1c[150]][_0x5e1c[24]](_0x5e1c[174]) > 1) {
                                                $(_0x5e1c[60])[_0x5e1c[66]](_0x5e1c[56])
                                            } else {}
                                        }
                                    }
                                }
                            }
                        };
                        copy();
                    }, 888);
                } else {
                    if (_0x35cbx14[_0x5e1c[175]] == _0x5e1c[176]) {};
                    if (_0x35cbx14[_0x5e1c[175]][_0x5e1c[24]](_0x5e1c[177]) > 1) {
                        window[_0x5e1c[178]][_0x5e1c[119]] = _0x5e1c[179]
                    };
                    if (_0x35cbx14[_0x5e1c[175]][_0x5e1c[24]](_0x5e1c[180]) > 1) {
                        $(_0x5e1c[72])[_0x5e1c[66]](_0x5e1c[56]);
                        $(_0x5e1c[33])[_0x5e1c[8]]();
                        setTimeout(function() {
                            $(_0x5e1c[22])[_0x5e1c[13]]()
                        }, 500);
                    };
                    if (_0x35cbx14[_0x5e1c[175]][_0x5e1c[24]](_0x5e1c[181]) > 1) {
                        $(_0x5e1c[14])[_0x5e1c[52]](_0x5e1c[145], $(_0x5e1c[14])[_0x5e1c[21]]());
                        $(_0x5e1c[14])[_0x5e1c[21]](_0x5e1c[20]);
                    };
                    $(_0x5e1c[63])[_0x5e1c[66]](_0x5e1c[56]);
                    $(_0x5e1c[65])[_0x5e1c[44]](_0x35cbx14[_0x5e1c[175]]);
                    if ($(_0x5e1c[183])[_0x5e1c[64]]()[_0x5e1c[24]](_0x5e1c[182]) > 0) {
                        wait = $(_0x5e1c[183])[_0x5e1c[64]]()[_0x5e1c[185]](_0x5e1c[184])[1]
                    } else {
                        wait = 0
                    };
                    if (wait) {
                        $(_0x5e1c[104])[_0x5e1c[103]](_0x5e1c[100])[_0x5e1c[101]](_0x5e1c[102]);
                        $(_0x5e1c[107])[_0x5e1c[103]](_0x5e1c[105])[_0x5e1c[101]](_0x5e1c[106]);
                        $(_0x5e1c[183])[_0x5e1c[44]]($(_0x5e1c[183])[_0x5e1c[64]]()[_0x5e1c[188]](wait, _0x5e1c[186] + wait + _0x5e1c[187]));
                        var _0x35cbx15 = null,
                            _0x35cbxb = 1000;
                        playinterval(_0x35cbxb);
                    };
                    if ($(_0x5e1c[183])[_0x5e1c[64]]()[_0x5e1c[24]](_0x5e1c[189]) > 0) {};
                    if ($(_0x5e1c[183])[_0x5e1c[64]]()[_0x5e1c[24]](_0x5e1c[190]) > 0) {
                        setTimeout(function() {
                            $(_0x5e1c[68])[_0x5e1c[3]](_0x5e1c[56]);
                            $(_0x5e1c[67])[_0x5e1c[57]](_0x5e1c[56]);
                            $(_0x5e1c[191])[_0x5e1c[13]]();
                        }, 2000)
                    };
                    if ($(_0x5e1c[183])[_0x5e1c[64]]()[_0x5e1c[24]](_0x5e1c[192]) > 0) {};
                }
            };
            if (_0x35cbx14[_0x5e1c[175]] == _0x5e1c[193] || _0x35cbx14[_0x5e1c[175]] == _0x5e1c[194]) {
                $(_0x5e1c[73])[_0x5e1c[66]](_0x5e1c[56]);
                $(_0x5e1c[19])[_0x5e1c[66]](_0x5e1c[56]);
                setTimeout(function() {
                    $(_0x5e1c[19])[_0x5e1c[13]]()
                }, 100);
            };
            bnt_getlink(_0x5e1c[77]);
        }
    });
}
$(_0x5e1c[213])[_0x5e1c[13]](function() {
    if (!$(_0x5e1c[195])[_0x5e1c[52]](_0x5e1c[25])) {
        $(_0x5e1c[196])[_0x5e1c[21]](_0x5e1c[20]);
        document[_0x5e1c[27]](_0x5e1c[197])[_0x5e1c[25]] = _0x5e1c[198] + Math[_0x5e1c[29]]();
    };
    $(_0x5e1c[199])[_0x5e1c[66]](_0x5e1c[56]);
    if ($(_0x5e1c[202])[_0x5e1c[21]]()[_0x5e1c[201]]()[_0x5e1c[24]](_0x5e1c[200]) > 0) {
        if (!$(_0x5e1c[195])[_0x5e1c[52]](_0x5e1c[25])) {
            $(_0x5e1c[203])[_0x5e1c[21]](_0x5e1c[20]);
            document[_0x5e1c[27]](_0x5e1c[204])[_0x5e1c[25]] = _0x5e1c[205] + Math[_0x5e1c[29]]();
        };
        $(_0x5e1c[207])[_0x5e1c[44]](_0x5e1c[206]);
        $[_0x5e1c[121]]({
            url: _0x5e1c[211],
            context: document[_0x5e1c[212]]
        })[_0x5e1c[210]](function() {
            $(_0x5e1c[207])[_0x5e1c[44]](_0x5e1c[208]);
            $(_0x5e1c[209])[_0x5e1c[66]](_0x5e1c[56]);
        });
    };
});
$(_0x5e1c[207])[_0x5e1c[8]](function() {
    var _0x35cbx16 = $(_0x5e1c[214])[_0x5e1c[21]]();
    Pin = $(_0x5e1c[215])[_0x5e1c[21]]();
    Serial = $(_0x5e1c[213])[_0x5e1c[21]]();
    if (!_0x35cbx16) {
        $(_0x5e1c[216])[_0x5e1c[66]](_0x5e1c[56]);
        $(_0x5e1c[218])[_0x5e1c[64]](_0x5e1c[217]);
        return false;
    };
    if (!Pin) {
        $(_0x5e1c[216])[_0x5e1c[66]](_0x5e1c[56]);
        $(_0x5e1c[218])[_0x5e1c[64]](_0x5e1c[219]);
        return false;
    };
    if (!Serial) {
        $(_0x5e1c[216])[_0x5e1c[66]](_0x5e1c[56]);
        $(_0x5e1c[218])[_0x5e1c[64]](_0x5e1c[220]);
        return false;
    };
    $[_0x5e1c[121]]({
        type: _0x5e1c[110],
        url: _0x5e1c[221],
        data: _0x5e1c[222] + _0x35cbx16 + _0x5e1c[223] + Pin + _0x5e1c[224] + Serial + _0x5e1c[225] + $(_0x5e1c[226])[_0x5e1c[21]]() + _0x5e1c[227] + $(_0x5e1c[202])[_0x5e1c[21]]() + _0x5e1c[228] + $(_0x5e1c[196])[_0x5e1c[21]]() + _0x5e1c[229] + $(_0x5e1c[203])[_0x5e1c[21]](),
        dataType: _0x5e1c[112],
        timeout: 3e4,
        beforeSend: function() {
            $(_0x5e1c[68])[_0x5e1c[1]](_0x5e1c[56]);
            $(_0x5e1c[54])[_0x5e1c[52]](_0x5e1c[46], true);
            $(_0x5e1c[216])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[230])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[231])[_0x5e1c[66]](_0x5e1c[56]);
            $(_0x5e1c[207])[_0x5e1c[44]](_0x5e1c[232]);
        },
        error: function() {
            $(_0x5e1c[68])[_0x5e1c[3]](_0x5e1c[56]);
            $(_0x5e1c[54])[_0x5e1c[52]](_0x5e1c[46], false);
            $(_0x5e1c[216])[_0x5e1c[66]](_0x5e1c[56]);
            $(_0x5e1c[218])[_0x5e1c[44]](_0x5e1c[233]);
            $(_0x5e1c[230])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[231])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[207])[_0x5e1c[44]](_0x5e1c[234]);
            $(_0x5e1c[196])[_0x5e1c[21]](_0x5e1c[20]);
            document[_0x5e1c[27]](_0x5e1c[197])[_0x5e1c[25]] = _0x5e1c[198] + Math[_0x5e1c[29]]();
            if ($(_0x5e1c[202])[_0x5e1c[21]]()[_0x5e1c[201]]()[_0x5e1c[24]](_0x5e1c[200]) > 0) {
                $(_0x5e1c[203])[_0x5e1c[21]](_0x5e1c[20])
            };
            document[_0x5e1c[27]](_0x5e1c[204])[_0x5e1c[25]] = _0x5e1c[205] + Math[_0x5e1c[29]]();
        },
        success: function(b) {
            $(_0x5e1c[68])[_0x5e1c[3]](_0x5e1c[56]);
            $(_0x5e1c[54])[_0x5e1c[52]](_0x5e1c[46], false);
            $(_0x5e1c[216])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[230])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[231])[_0x5e1c[57]](_0x5e1c[56]);
            $(_0x5e1c[207])[_0x5e1c[44]](_0x5e1c[234]);
            $(_0x5e1c[196])[_0x5e1c[21]](_0x5e1c[20]);
            document[_0x5e1c[27]](_0x5e1c[197])[_0x5e1c[25]] = _0x5e1c[198] + Math[_0x5e1c[29]]();
            if (b[_0x5e1c[235]] == 0) {
                $(_0x5e1c[216])[_0x5e1c[66]](_0x5e1c[56]);
                $(_0x5e1c[218])[_0x5e1c[44]](b[_0x5e1c[236]]);
            };
            if (b[_0x5e1c[235]] == 1) {
                $(_0x5e1c[230])[_0x5e1c[66]](_0x5e1c[56]);
                $(_0x5e1c[237])[_0x5e1c[44]](b[_0x5e1c[236]]);
                $(_0x5e1c[202])[_0x5e1c[21]](_0x5e1c[20]);
                $(_0x5e1c[215])[_0x5e1c[21]](_0x5e1c[20]);
                $(_0x5e1c[213])[_0x5e1c[21]](_0x5e1c[20]);
                $(_0x5e1c[226])[_0x5e1c[21]](_0x5e1c[20]);
                $(_0x5e1c[202])[_0x5e1c[13]]();
                $(_0x5e1c[239])[_0x5e1c[11]](_0x5e1c[238]);
            };
            $(_0x5e1c[196])[_0x5e1c[21]](_0x5e1c[20]);
            $(_0x5e1c[203])[_0x5e1c[21]](_0x5e1c[20]);
        }
    });
});
$(document)[_0x5e1c[37]](function() {
    $(_0x5e1c[246])[_0x5e1c[8]](function() {
        card_name = $(this)[_0x5e1c[52]](_0x5e1c[241])[_0x5e1c[188]](_0x5e1c[240], _0x5e1c[20]);
        $(_0x5e1c[244])[_0x5e1c[52]](_0x5e1c[25], _0x5e1c[242] + card_name + _0x5e1c[243]);
        $(_0x5e1c[245])[_0x5e1c[66]]();
        $(_0x5e1c[202])[_0x5e1c[13]]();
    });
    $(_0x5e1c[215])[_0x5e1c[8]](function() {
        $(_0x5e1c[244])[_0x5e1c[52]](_0x5e1c[25], _0x5e1c[242] + _0x5e1c[247] + _0x5e1c[248])
    });
    $(_0x5e1c[213])[_0x5e1c[8]](function() {
        $(_0x5e1c[244])[_0x5e1c[52]](_0x5e1c[25], _0x5e1c[242] + _0x5e1c[247] + _0x5e1c[249])
    });
    $(_0x5e1c[207])[_0x5e1c[8]](function() {
        $(_0x5e1c[244])[_0x5e1c[52]](_0x5e1c[25], _0x5e1c[242] + card_name + _0x5e1c[243])
    });
    $(_0x5e1c[226])[_0x5e1c[8]](function() {
        $(_0x5e1c[244])[_0x5e1c[52]](_0x5e1c[25], _0x5e1c[242] + card_name + _0x5e1c[243])
    });
});
jQuery(function(_0x35cbx17) {
    _0x35cbx17(_0x5e1c[251])[_0x5e1c[101]](_0x5e1c[250]);
    _0x35cbx17(_0x5e1c[246])[_0x5e1c[8]](function() {
        var _0x35cbx18 = _0x35cbx17(_0x5e1c[252])[_0x5e1c[21]]();
        var _0x35cbx19 = _0x35cbx17(this)[_0x5e1c[52]](_0x5e1c[253]);
        var _0x35cbx1a = _0x35cbx17(this)[_0x5e1c[52]](_0x5e1c[254]);
        var _0x35cbx1b = _0x35cbx17(_0x5e1c[256])[_0x5e1c[52]](_0x5e1c[255]);
        _0x35cbx17(_0x5e1c[256])[_0x5e1c[47]](_0x5e1c[257]);
        _0x35cbx17(_0x5e1c[259])[_0x5e1c[103]](_0x5e1c[258]);
        _0x35cbx17(this)[_0x5e1c[101]](_0x5e1c[258]);
        _0x35cbx17(_0x5e1c[260] + _0x35cbx19)[_0x5e1c[52]](_0x5e1c[257], _0x5e1c[257]);
        _0x35cbx17(_0x5e1c[262])[_0x5e1c[44]](_0x35cbx1a + _0x5e1c[261]);
        var _0x35cbx1c = _0x35cbx17(_0x5e1c[252])[_0x5e1c[21]]();
    });
    _0x35cbx17(_0x5e1c[259])[_0x5e1c[265]](function() {
        _0x35cbx17(this)[_0x5e1c[264]]()[_0x5e1c[101]](_0x5e1c[263])
    }, function() {
        _0x35cbx17(this)[_0x5e1c[264]]()[_0x5e1c[103]](_0x5e1c[263])
    });
});
$(_0x5e1c[283])[_0x5e1c[8]](function() {
    var _0x35cbx1d = encodeURIComponent($(_0x5e1c[266])[_0x5e1c[21]]());
    var _0x35cbx1a = encodeURIComponent($(_0x5e1c[267])[_0x5e1c[21]]());
    if (_0x35cbx1d != _0x5e1c[20] && _0x35cbx1a != _0x5e1c[20]) {
        $[_0x5e1c[121]]({
            url: _0x5e1c[268],
            type: _0x5e1c[110],
            data: _0x5e1c[269] + _0x35cbx1d + _0x5e1c[270] + _0x35cbx1a + _0x5e1c[271] + $(_0x5e1c[272])[_0x5e1c[52]](_0x5e1c[257]),
            dataType: _0x5e1c[131],
            beforeSend: function() {
                $(_0x5e1c[273])[_0x5e1c[57]](_0x5e1c[56]);
                $(_0x5e1c[274])[_0x5e1c[66]](_0x5e1c[56]);
                $(_0x5e1c[275])[_0x5e1c[52]](_0x5e1c[46], _0x5e1c[46]);
                $(_0x5e1c[276])[_0x5e1c[52]](_0x5e1c[46], _0x5e1c[46]);
            },
            success: function(_0x35cbx14) {
                $(_0x5e1c[274])[_0x5e1c[57]](_0x5e1c[56]);
                $(_0x5e1c[275])[_0x5e1c[47]](_0x5e1c[46]);
                $(_0x5e1c[276])[_0x5e1c[47]](_0x5e1c[46]);
                $(_0x5e1c[273])[_0x5e1c[66]](_0x5e1c[56]);
                if (_0x35cbx14[_0x5e1c[235]] == 1) {
                    $(_0x5e1c[273])[_0x5e1c[57]](_0x5e1c[56]);
                    $(_0x5e1c[226])[_0x5e1c[21]](_0x35cbx14[_0x5e1c[277]]);
                    $(_0x5e1c[239])[_0x5e1c[11]](_0x5e1c[238]);
                } else {
                    $(_0x5e1c[279])[_0x5e1c[52]](_0x5e1c[241], _0x5e1c[278]);
                    $(_0x5e1c[273])[_0x5e1c[52]](_0x5e1c[241], _0x5e1c[100]);
                };
                $(_0x5e1c[281])[_0x5e1c[64]](_0x35cbx14[_0x5e1c[280]]);
            }
        })
    } else {
        $(_0x5e1c[273])[_0x5e1c[52]](_0x5e1c[241], _0x5e1c[100]);
        $(_0x5e1c[273])[_0x5e1c[66]](_0x5e1c[56]);
        $(_0x5e1c[281])[_0x5e1c[64]](_0x5e1c[282]);
    };
});
var scrollToElement = function(_0x35cbx1f, _0x35cbx20) {
    var speed = (_0x35cbx20) ? _0x35cbx20 : 600;
    $(_0x5e1c[286])[_0x5e1c[6]]({
        scrollTop: $(_0x35cbx1f)[_0x5e1c[285]]()[_0x5e1c[284]] - 10
    }, speed);
};
var check = getURLParameter(_0x5e1c[287]);
var link = getURLParameter(_0x5e1c[288]);
var processed = getURLParameter(_0x5e1c[289]);
var ref = getURLParameter(_0x5e1c[290]);
if (check) {
    $(_0x5e1c[108])[_0x5e1c[21]](check);
    checklink();
};
if (link) {
    $(_0x5e1c[14])[_0x5e1c[21]](link);
    getlink(link);
};
var speed = 80;
if (document[_0x5e1c[291]] || document[_0x5e1c[27]]) {
    var storetext = document[_0x5e1c[27]] ? document[_0x5e1c[27]](_0x5e1c[292]) : document[_0x5e1c[291]][_0x5e1c[292]]
} else {
    document[_0x5e1c[293]](text)
};
var hex = new Array(_0x5e1c[294], _0x5e1c[295], _0x5e1c[296], _0x5e1c[297], _0x5e1c[298], _0x5e1c[299], _0x5e1c[300], _0x5e1c[301], _0x5e1c[302], _0x5e1c[303], _0x5e1c[304], _0x5e1c[305], _0x5e1c[306]);
var r = 1;
var g = 1;
var b = 1;
var seq = 1;

function changetext() {
    rainbow = _0x5e1c[260] + hex[r] + hex[g] + hex[b];
    storetext[_0x5e1c[308]][_0x5e1c[307]] = rainbow;
}

function change() {
    if (seq == 6) {
        b--;
        if (b == 0) {
            seq = 1
        };
    };
    if (seq == 5) {
        r++;
        if (r == 12) {
            seq = 6
        };
    };
    if (seq == 4) {
        g--;
        if (g == 0) {
            seq = 5
        };
    };
    if (seq == 3) {
        b++;
        if (b == 12) {
            seq = 4
        };
    };
    if (seq == 2) {
        r--;
        if (r == 0) {
            seq = 3
        };
    };
    if (seq == 1) {
        g++;
        if (g == 12) {
            seq = 2
        };
    };
    changetext();
}

function starteffect() {
    if (document[_0x5e1c[291]] || document[_0x5e1c[27]]) {
        flash = setInterval(_0x5e1c[309], speed)
    }
}
starteffect();
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one(a.support.transition.end, function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b()
    })
}(jQuery), + function(a) {
    "use strict";
    var b = '[data-dismiss="alert"]',
        c = function(c) {
            a(c).on("click", b, this.close)
        };
    c.prototype.close = function(b) {
        function c() {
            f.trigger("closed.bs.alert").remove()
        }
        var d = a(this),
            e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c())
    };
    var d = a.fn.alert;
    a.fn.alert = function(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.alert");
            e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d)
        })
    }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function() {
        return a.fn.alert = d, this
    }, a(document).on("click.bs.alert.data-api", b, c.prototype.close)
}(jQuery), + function(a) {
    "use strict";
    var b = function(c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.isLoading = !1
    };
    b.DEFAULTS = {
        loadingText: "loading..."
    }, b.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", f.resetText || d.data("resetText", d[e]()), d[e](f[b] || this.options[b]), setTimeout(a.proxy(function() {
            "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, b.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        a && this.$element.toggleClass("active")
    };
    var c = a.fn.button;
    a.fn.button = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof c && c;
            e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c)
        })
    }, a.fn.button.Constructor = b, a.fn.button.noConflict = function() {
        return a.fn.button = c, this
    }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(b) {
        var c = a(b.target);
        c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault()
    })
}(jQuery), + function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, b.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, b.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, b.prototype.to = function(b) {
        var c = this,
            d = this.getActiveIndex();
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }, b.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, b.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, b.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, b.prototype.slide = function(b, c) {
        var d = this.$element.find(".item.active"),
            e = c || d[b](),
            f = this.interval,
            g = "next" == b ? "left" : "right",
            h = "next" == b ? "first" : "last",
            i = this;
        if (!e.length) {
            if (!this.options.wrap) return;
            e = this.$element.find(".item")[h]()
        }
        if (e.hasClass("active")) return this.sliding = !1;
        var j = a.Event("slide.bs.carousel", {
            relatedTarget: e[0],
            direction: g
        });
        return this.$element.trigger(j), j.isDefaultPrevented() ? void 0 : (this.sliding = !0, f && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function() {
            var b = a(i.$indicators.children()[i.getActiveIndex()]);
            b && b.addClass("active")
        })), a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function() {
            e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function() {
                i.$element.trigger("slid.bs.carousel")
            }, 0)
        }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), f && this.cycle(), this)
    };
    var c = a.fn.carousel;
    a.fn.carousel = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c),
                g = "string" == typeof c ? c : f.slide;
            e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = c, this
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(b) {
        var c, d = a(this),
            e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")),
            f = a.extend({}, e.data(), d.data()),
            g = d.attr("data-slide-to");
        g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault()
    }), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var b = a(this);
            b.carousel(b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";
    var b = function(c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    b.DEFAULTS = {
        toggle: !0
    }, b.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, b.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b = a.Event("show.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.$parent && this.$parent.find("> .panel > .in");
                if (c && c.length) {
                    var d = c.data("bs.collapse");
                    if (d && d.transitioning) return;
                    c.collapse("hide"), d || c.data("bs.collapse", null)
                }
                var e = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1;
                var f = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!a.support.transition) return f.call(this);
                var g = a.camelCase(["scroll", e].join("-"));
                this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g])
            }
        }
    }, b.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var d = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return a.support.transition ? void this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
            }
        }
    }, b.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var c = a.fn.collapse;
    a.fn.collapse = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.collapse"),
                f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
            !e && f.toggle && "show" == c && (c = !c), e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = c, this
    }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(b) {
        var c, d = a(this),
            e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""),
            f = a(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : d.data(),
            i = d.attr("data-parent"),
            j = i && a(i);
        g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        a(d).remove(), a(e).each(function() {
            var d = c(a(this)),
                e = {
                    relatedTarget: this
                };
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e))
        })
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }
    var d = ".dropdown-backdrop",
        e = "[data-toggle=dropdown]",
        f = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    f.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                f.toggleClass("open").trigger("shown.bs.dropdown", h), e.focus()
            }
            return !1
        }
    }, f.prototype.keydown = function(b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var f = c(d),
                    g = f.hasClass("open");
                if (!g || g && 27 == b.keyCode) return 27 == b.which && f.find(e).focus(), d.click();
                var h = " li:not(.divider):visible a",
                    i = f.find("[role=menu]" + h + ", [role=listbox]" + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).focus()
                }
            }
        }
    };
    var g = a.fn.dropdown;
    a.fn.dropdown = function(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new f(this)), "string" == typeof b && d[b].call(c)
        })
    }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = g, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu], [role=listbox]", f.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";
    var b = function(b, c) {
        this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    b.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, b.prototype.toggle = function(a) {
        return this[this.isShown ? "hide" : "show"](a)
    }, b.prototype.show = function(b) {
        var c = this,
            d = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function() {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show().scrollTop(0), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function() {
                c.$element.focus().trigger(e)
            }).emulateTransitionEnd(300) : c.$element.focus().trigger(e)
        }))
    }, b.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, b.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
        }, this))
    }, b.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, b.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.removeBackdrop(), a.$element.trigger("hidden.bs.modal")
        })
    }, b.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, b.prototype.backdrop = function(b) {
        var c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var d = a.support.transition && c;
            if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
    };
    var c = a.fn.modal;
    a.fn.modal = function(c, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c);
            f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d)
        })
    }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function() {
        return a.fn.modal = c, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(b) {
        var c = a(this),
            d = c.attr("href"),
            e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")),
            f = e.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(d) && d
            }, e.data(), c.data());
        c.is("a") && b.preventDefault(), e.modal(f, this).one("hide", function() {
            c.is(":visible") && c.focus()
        })
    }), a(document).on("show.bs.modal", ".modal", function() {
        a(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function() {
        a(document.body).removeClass("modal-open")
    })
}(jQuery), + function(a) {
    "use strict";
    var b = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
    };
    b.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, b.prototype.init = function(b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, b.prototype.getDefaults = function() {
        return b.DEFAULTS
    }, b.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, b.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, b.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show()
    }, b.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, b.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(b), b.isDefaultPrevented()) return;
            var c = this,
                d = this.tip();
            this.setContent(), this.options.animation && d.addClass("fade");
            var e = "function" == typeof this.options.placement ? this.options.placement.call(this, d[0], this.$element[0]) : this.options.placement,
                f = /\s?auto?\s?/i,
                g = f.test(e);
            g && (e = e.replace(f, "") || "top"), d.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(e), this.options.container ? d.appendTo(this.options.container) : d.insertAfter(this.$element);
            var h = this.getPosition(),
                i = d[0].offsetWidth,
                j = d[0].offsetHeight;
            if (g) {
                var k = this.$element.parent(),
                    l = e,
                    m = document.documentElement.scrollTop || document.body.scrollTop,
                    n = "body" == this.options.container ? window.innerWidth : k.outerWidth(),
                    o = "body" == this.options.container ? window.innerHeight : k.outerHeight(),
                    p = "body" == this.options.container ? 0 : k.offset().left;
                e = "bottom" == e && h.top + h.height + j - m > o ? "top" : "top" == e && h.top - m - j < 0 ? "bottom" : "right" == e && h.right + i > n ? "left" : "left" == e && h.left - i < p ? "right" : e, d.removeClass(l).addClass(e)
            }
            var q = this.getCalculatedOffset(e, h, i, j);
            this.applyPlacement(q, e), this.hoverState = null;
            var r = function() {
                c.$element.trigger("shown.bs." + c.type)
            };
            a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, r).emulateTransitionEnd(150) : r()
        }
    }, b.prototype.applyPlacement = function(b, c) {
        var d, e = this.tip(),
            f = e[0].offsetWidth,
            g = e[0].offsetHeight,
            h = parseInt(e.css("margin-top"), 10),
            i = parseInt(e.css("margin-left"), 10);
        isNaN(h) && (h = 0), isNaN(i) && (i = 0), b.top = b.top + h, b.left = b.left + i, a.offset.setOffset(e[0], a.extend({
            using: function(a) {
                e.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), e.addClass("in");
        var j = e[0].offsetWidth,
            k = e[0].offsetHeight;
        if ("top" == c && k != g && (d = !0, b.top = b.top + g - k), /bottom|top/.test(c)) {
            var l = 0;
            b.left < 0 && (l = -2 * b.left, b.left = 0, e.offset(b), j = e[0].offsetWidth, k = e[0].offsetHeight), this.replaceArrow(l - f + j, j, "left")
        } else this.replaceArrow(k - g, k, "top");
        d && e.offset(b)
    }, b.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, b.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, b.prototype.hide = function() {
        function b() {
            "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type)
        }
        var c = this,
            d = this.tip(),
            e = a.Event("hide.bs." + this.type);
        return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.hoverState = null, this)
    }, b.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, b.prototype.hasContent = function() {
        return this.getTitle()
    }, b.prototype.getPosition = function() {
        var b = this.$element[0];
        return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
            width: b.offsetWidth,
            height: b.offsetHeight
        }, this.$element.offset())
    }, b.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, b.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, b.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    }, b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, b.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, b.prototype.enable = function() {
        this.enabled = !0
    }, b.prototype.disable = function() {
        this.enabled = !1
    }, b.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, b.prototype.toggle = function(b) {
        var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, b.prototype.destroy = function() {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof c && c;
            (e || "destroy" != c) && (e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]())
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = c, this
    }
}(jQuery), + function(a) {
    "use strict";
    var b = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function() {
        return b.DEFAULTS
    }, b.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, b.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, b.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, b.prototype.tip = function() {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    };
    var c = a.fn.popover;
    a.fn.popover = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof c && c;
            (e || "destroy" != c) && (e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]())
        })
    }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function() {
        return a.fn.popover = c, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        var e, f = a.proxy(this.process, this);
        this.$element = a(a(c).is("body") ? window : c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process()
    }
    b.DEFAULTS = {
        offset: 10
    }, b.prototype.refresh = function() {
        var b = this.$element[0] == window ? "offset" : "position";
        this.offsets = a([]), this.targets = a([]); {
            var c = this;
            this.$body.find(this.selector).map(function() {
                var d = a(this),
                    e = d.data("target") || d.attr("href"),
                    f = /^#./.test(e) && a(e);
                return f && f.length && f.is(":visible") && [
                    [f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]
                ] || null
            }).sort(function(a, b) {
                return a[0] - b[0]
            }).each(function() {
                c.offsets.push(this[0]), c.targets.push(this[1])
            })
        }
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
            d = c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (b >= d) return g != (a = f.last()[0]) && this.activate(a);
        if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    };
    var c = a.fn.scrollspy;
    a.fn.scrollspy = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = c, this
    }, a(window).on("load", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            b.scrollspy(b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";
    var b = function(b) {
        this.element = a(b)
    };
    b.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0],
                f = a.Event("show.bs.tab", {
                    relatedTarget: e
                });
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.parent("li"), c), this.activate(g, g.parent(), function() {
                    b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e
                    })
                })
            }
        }
    }, b.prototype.activate = function(b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }
        var f = c.find("> .active"),
            g = d && a.support.transition && f.hasClass("fade");
        g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in")
    };
    var c = a.fn.tab;
    a.fn.tab = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]()
        })
    }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function() {
        return a.fn.tab = c, this
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(b) {
        b.preventDefault(), a(this).tab("show")
    })
}(jQuery), + function(a) {
    "use strict";
    var b = function(c, d) {
        this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {
        offset: 0
    }, b.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(b.RESET).addClass("affix");
        var a = this.$window.scrollTop(),
            c = this.$element.offset();
        return this.pinnedOffset = c.top - a
    }, b.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, b.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var c = a(document).height(),
                d = this.$window.scrollTop(),
                e = this.$element.offset(),
                f = this.options.offset,
                g = f.top,
                h = f.bottom;
            "top" == this.affixed && (e.top += d), "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), "function" == typeof h && (h = f.bottom(this.$element));
            var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
            if (this.affixed !== i) {
                this.unpin && this.$element.css("top", "");
                var j = "affix" + (i ? "-" + i : ""),
                    k = a.Event(j + ".bs.affix");
                this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), "bottom" == i && this.$element.offset({
                    top: c - h - this.$element.height()
                }))
            }
        }
    };
    var c = a.fn.affix;
    a.fn.affix = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof c && c;
            e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function() {
        return a.fn.affix = c, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var b = a(this),
                c = b.data();
            c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c)
        })
    })
}(jQuery);
(function($) {
    $.fn.zclip = function(params) {
        if (typeof params == "object" && !params.length) {
            var settings = $.extend({
                path: 'ZeroClipboard.swf',
                copy: null,
                beforeCopy: null,
                afterCopy: null,
                clickAfter: true,
                setHandCursor: true,
                setCSSEffects: true
            }, params);
            return this.each(function() {
                var o = $(this);
                if (o.is(':visible') && (typeof settings.copy == 'string' || $.isFunction(settings.copy))) {
                    ZeroClipboard.setMoviePath(settings.path);
                    var clip = new ZeroClipboard.Client();
                    if ($.isFunction(settings.copy)) {
                        o.bind('zClip_copy', settings.copy);
                    }
                    if ($.isFunction(settings.beforeCopy)) {
                        o.bind('zClip_beforeCopy', settings.beforeCopy);
                    }
                    if ($.isFunction(settings.afterCopy)) {
                        o.bind('zClip_afterCopy', settings.afterCopy);
                    }
                    clip.setHandCursor(settings.setHandCursor);
                    clip.setCSSEffects(settings.setCSSEffects);
                    clip.addEventListener('mouseOver', function(client) {
                        o.trigger('mouseenter');
                    });
                    clip.addEventListener('mouseOut', function(client) {
                        o.trigger('mouseleave');
                    });
                    clip.addEventListener('mouseDown', function(client) {
                        o.trigger('mousedown');
                        if (!$.isFunction(settings.copy)) {
                            clip.setText(settings.copy);
                        } else {
                            clip.setText(o.triggerHandler('zClip_copy'));
                        }
                        if ($.isFunction(settings.beforeCopy)) {
                            o.trigger('zClip_beforeCopy');
                        }
                    });
                    clip.addEventListener('complete', function(client, text) {
                        if ($.isFunction(settings.afterCopy)) {
                            o.trigger('zClip_afterCopy');
                        } else {
                            if (text.length > 500) {
                                text = text.substr(0, 500) + "...\n\n(" + (text.length - 500) + " characters not shown)";
                            }
                            o.removeClass('hover');
                            alert("Đã copy v� o clipboard: \n\n" + text);
                        }
                        if (settings.clickAfter) {
                            o.trigger('click');
                        }
                    });
                    clip.glue(o[0], o.parent()[0]);
                    $(window).bind('load resize', function() {
                        clip.reposition();
                    });
                }
            });
        } else if (typeof params == "string") {
            return this.each(function() {
                var o = $(this);
                params = params.toLowerCase();
                var zclipId = o.data('zclipId');
                var clipElm = $('#' + zclipId + '.zclip');
                if (params == "remove") {
                    clipElm.remove();
                    o.removeClass('active hover');
                } else if (params == "hide") {
                    clipElm.hide();
                    o.removeClass('active hover');
                } else if (params == "show") {
                    clipElm.show();
                }
            });
        }
    }
})(jQuery);
var ZeroClipboard = {
    version: "1.0.7",
    clients: {},
    moviePath: 'ZeroClipboard.swf',
    nextId: 1,
    $: function(thingy) {
        if (typeof(thingy) == 'string') thingy = document.getElementById(thingy);
        if (!thingy.addClass) {
            thingy.hide = function() {
                this.style.display = 'none';
            };
            thingy.show = function() {
                this.style.display = '';
            };
            thingy.addClass = function(name) {
                this.removeClass(name);
                this.className += ' ' + name;
            };
            thingy.removeClass = function(name) {
                var classes = this.className.split(/\s+/);
                var idx = -1;
                for (var k = 0; k < classes.length; k++) {
                    if (classes[k] == name) {
                        idx = k;
                        k = classes.length;
                    }
                }
                if (idx > -1) {
                    classes.splice(idx, 1);
                    this.className = classes.join(' ');
                }
                return this;
            };
            thingy.hasClass = function(name) {
                return !!this.className.match(new RegExp("\\s*" + name + "\\s*"));
            };
        }
        return thingy;
    },
    setMoviePath: function(path) {
        this.moviePath = path;
    },
    dispatch: function(id, eventName, args) {
        var client = this.clients[id];
        if (client) {
            client.receiveEvent(eventName, args);
        }
    },
    register: function(id, client) {
        this.clients[id] = client;
    },
    getDOMObjectPosition: function(obj, stopObj) {
        var info = {
            left: 0,
            top: 0,
            width: obj.width ? obj.width : obj.offsetWidth,
            height: obj.height ? obj.height : obj.offsetHeight
        };
        if (obj && (obj != stopObj)) {
            info.left += obj.offsetLeft;
            info.top += obj.offsetTop;
        }
        return info;
    },
    Client: function(elem) {
        this.handlers = {};
        this.id = ZeroClipboard.nextId++;
        this.movieId = 'ZeroClipboardMovie_' + this.id;
        ZeroClipboard.register(this.id, this);
        if (elem) this.glue(elem);
    }
};
ZeroClipboard.Client.prototype = {
    id: 0,
    ready: false,
    movie: null,
    clipText: '',
    handCursorEnabled: true,
    cssEffects: true,
    handlers: null,
    glue: function(elem, appendElem, stylesToAdd) {
        this.domElement = ZeroClipboard.$(elem);
        var zIndex = 99;
        if (this.domElement.style.zIndex) {
            zIndex = parseInt(this.domElement.style.zIndex, 10) + 1;
        }
        if (typeof(appendElem) == 'string') {
            appendElem = ZeroClipboard.$(appendElem);
        } else if (typeof(appendElem) == 'undefined') {
            appendElem = document.getElementsByTagName('body')[0];
        }
        var box = ZeroClipboard.getDOMObjectPosition(this.domElement, appendElem);
        this.div = document.createElement('div');
        this.div.className = "zclip";
        this.div.id = "zclip-" + this.movieId;
        $(this.domElement).data('zclipId', 'zclip-' + this.movieId);
        var style = this.div.style;
        style.position = 'absolute';
        style.left = '' + box.left + 'px';
        style.top = '' + box.top + 'px';
        style.width = '' + box.width + 'px';
        style.height = '' + box.height + 'px';
        style.zIndex = zIndex;
        if (typeof(stylesToAdd) == 'object') {
            for (addedStyle in stylesToAdd) {
                style[addedStyle] = stylesToAdd[addedStyle];
            }
        }
        appendElem.appendChild(this.div);
        this.div.innerHTML = this.getHTML(box.width, box.height);
    },
    getHTML: function(width, height) {
        var html = '';
        var flashvars = 'id=' + this.id + '&width=' + width + '&height=' + height;
        if (navigator.userAgent.match(/MSIE/)) {
            var protocol = location.href.match(/^https/i) ? 'https://' : 'http://';
            html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + protocol + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + height + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + flashvars + '"/><param name="wmode" value="transparent"/></object>';
        } else {
            html += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + width + '" height="' + height + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashvars + '" wmode="transparent" />';
        }
        return html;
    },
    hide: function() {
        if (this.div) {
            this.div.style.left = '-2000px';
        }
    },
    show: function() {
        this.reposition();
    },
    destroy: function() {
        if (this.domElement && this.div) {
            this.hide();
            this.div.innerHTML = '';
            var body = document.getElementsByTagName('body')[0];
            try {
                body.removeChild(this.div);
            } catch (e) {;
            }
            this.domElement = null;
            this.div = null;
        }
    },
    reposition: function(elem) {
        if (elem) {
            this.domElement = ZeroClipboard.$(elem);
            if (!this.domElement) this.hide();
        }
        if (this.domElement && this.div) {
            var box = ZeroClipboard.getDOMObjectPosition(this.domElement);
            var style = this.div.style;
            style.left = '' + box.left + 'px';
            style.top = '' + box.top + 'px';
        }
    },
    setText: function(newText) {
        this.clipText = newText;
        if (this.ready) {
            this.movie.setText(newText);
        }
    },
    addEventListener: function(eventName, func) {
        eventName = eventName.toString().toLowerCase().replace(/^on/, '');
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(func);
    },
    setHandCursor: function(enabled) {
        this.handCursorEnabled = enabled;
        if (this.ready) {
            this.movie.setHandCursor(enabled);
        }
    },
    setCSSEffects: function(enabled) {
        this.cssEffects = !!enabled;
    },
    receiveEvent: function(eventName, args) {
        eventName = eventName.toString().toLowerCase().replace(/^on/, '');
        switch (eventName) {
            case 'load':
                this.movie = document.getElementById(this.movieId);
                if (!this.movie) {
                    var self = this;
                    setTimeout(function() {
                        self.receiveEvent('load', null);
                    }, 1);
                    return;
                }
                if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                    var self = this;
                    setTimeout(function() {
                        self.receiveEvent('load', null);
                    }, 100);
                    this.ready = true;
                    return;
                }
                this.ready = true;
                try {
                    this.movie.setText(this.clipText);
                } catch (e) {}
                try {
                    this.movie.setHandCursor(this.handCursorEnabled);
                } catch (e) {}
                break;
            case 'mouseover':
                if (this.domElement && this.cssEffects) {
                    this.domElement.addClass('hover');
                    if (this.recoverActive) {
                        this.domElement.addClass('active');
                    }
                }
                break;
            case 'mouseout':
                if (this.domElement && this.cssEffects) {
                    this.recoverActive = false;
                    if (this.domElement.hasClass('active')) {
                        this.domElement.removeClass('active');
                        this.recoverActive = true;
                    }
                    this.domElement.removeClass('hover');
                }
                break;
            case 'mousedown':
                if (this.domElement && this.cssEffects) {
                    this.domElement.addClass('active');
                }
                break;
            case 'mouseup':
                if (this.domElement && this.cssEffects) {
                    this.domElement.removeClass('active');
                    this.recoverActive = false;
                }
                break;
        }
        if (this.handlers[eventName]) {
            for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
                var func = this.handlers[eventName][idx];
                if (typeof(func) == 'function') {
                    func(this, args);
                } else if ((typeof(func) == 'object') && (func.length == 2)) {
                    func[0][func[1]](this, args);
                } else if (typeof(func) == 'string') {
                    window[func](this, args);
                }
            }
        }
    }
};