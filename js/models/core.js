function hex_md5(e) {
    return rstr2hex(rstr_md5(str2rstr_utf8(e)))
}
function b64_md5(e) {
    return rstr2b64(rstr_md5(str2rstr_utf8(e)))
}
function any_md5(e, t) {
    return rstr2any(rstr_md5(str2rstr_utf8(e)), t)
}
function hex_hmac_md5(e, t) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(e), str2rstr_utf8(t)))
}
function b64_hmac_md5(e, t) {
    return rstr2b64(rstr_hmac_md5(str2rstr_utf8(e), str2rstr_utf8(t)))
}
function any_hmac_md5(e, t, n) {
    return rstr2any(rstr_hmac_md5(str2rstr_utf8(e), str2rstr_utf8(t)), n)
}
function md5_vm_test() {
    return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72"
}
function rstr_md5(e) {
    return binl2rstr(binl_md5(rstr2binl(e), e.length * 8))
}
function rstr_hmac_md5(e, t) {
    var n = rstr2binl(e);
    n.length > 16 && (n = binl_md5(n, e.length * 8));
    var r = Array(16),
        i = Array(16);
    for (var s = 0; s < 16; s++) r[s] = n[s] ^ 909522486, i[s] = n[s] ^ 1549556828;
    var o = binl_md5(r.concat(rstr2binl(t)), 512 + t.length * 8);
    return binl2rstr(binl_md5(i.concat(o), 640))
}
function rstr2hex(e) {
    try {
        hexcase
    } catch (t) {
        hexcase = 0
    }
    var n = hexcase ? "0123456789ABCDEF" : "0123456789abcdef",
        r = "",
        i;
    for (var s = 0; s < e.length; s++) i = e.charCodeAt(s), r += n.charAt(i >>> 4 & 15) + n.charAt(i & 15);
    return r
}
function rstr2b64(e) {
    try {
        b64pad
    } catch (t) {
        b64pad = ""
    }
    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        r = "",
        i = e.length;
    for (var s = 0; s < i; s += 3) {
        var o = e.charCodeAt(s) << 16 | (s + 1 < i ? e.charCodeAt(s + 1) << 8 : 0) | (s + 2 < i ? e.charCodeAt(s + 2) : 0);
        for (var u = 0; u < 4; u++) s * 8 + u * 6 > e.length * 8 ? r += b64pad : r += n.charAt(o >>> 6 * (3 - u) & 63)
    }
    return r
}
function rstr2any(e, t) {
    var n = t.length,
        r, i, s, o, u, a = Array(Math.ceil(e.length / 2));
    for (r = 0; r < a.length; r++) a[r] = e.charCodeAt(r * 2) << 8 | e.charCodeAt(r * 2 + 1);
    var f = Math.ceil(e.length * 8 / (Math.log(t.length) / Math.log(2))),
        l = Array(f);
    for (i = 0; i < f; i++) {
        u = Array(), o = 0;
        for (r = 0; r < a.length; r++) {
            o = (o << 16) + a[r], s = Math.floor(o / n), o -= s * n;
            if (u.length > 0 || s > 0) u[u.length] = s
        }
        l[i] = o, a = u
    }
    var c = "";
    for (r = l.length - 1; r >= 0; r--) c += t.charAt(l[r]);
    return c
}
function str2rstr_utf8(e) {
    e = e.toString();
    var t = "",
        n = -1,
        r, i;
    while (++n < e.length) r = e.charCodeAt(n), i = n + 1 < e.length ? e.charCodeAt(n + 1) : 0, 55296 <= r && r <= 56319 && 56320 <= i && i <= 57343 && (r = 65536 + ((r & 1023) << 10) + (i & 1023), n++), r <= 127 ? t += String.fromCharCode(r) : r <= 2047 ? t += String.fromCharCode(192 | r >>> 6 & 31, 128 | r & 63) : r <= 65535 ? t += String.fromCharCode(224 | r >>> 12 & 15, 128 | r >>> 6 & 63, 128 | r & 63) : r <= 2097151 && (t += String.fromCharCode(240 | r >>> 18 & 7, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | r & 63));
    return t
}
function str2rstr_utf16le(e) {
    var t = "";
    for (var n = 0; n < e.length; n++) t += String.fromCharCode(e.charCodeAt(n) & 255, e.charCodeAt(n) >>> 8 & 255);
    return t
}
function str2rstr_utf16be(e) {
    var t = "";
    for (var n = 0; n < e.length; n++) t += String.fromCharCode(e.charCodeAt(n) >>> 8 & 255, e.charCodeAt(n) & 255);
    return t
}
function rstr2binl(e) {
    var t = Array(e.length >> 2);
    for (var n = 0; n < t.length; n++) t[n] = 0;
    for (var n = 0; n < e.length * 8; n += 8) t[n >> 5] |= (e.charCodeAt(n / 8) & 255) << n % 32;
    return t
}
function binl2rstr(e) {
    var t = "";
    for (var n = 0; n < e.length * 32; n += 8) t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
    return t
}
function binl_md5(e, t) {
    e[t >> 5] |= 128 << t % 32, e[(t + 64 >>> 9 << 4) + 14] = t;
    var n = 1732584193,
        r = -271733879,
        i = -1732584194,
        s = 271733878;
    for (var o = 0; o < e.length; o += 16) {
        var u = n,
            a = r,
            f = i,
            l = s;
        n = md5_ff(n, r, i, s, e[o + 0], 7, -680876936), s = md5_ff(s, n, r, i, e[o + 1], 12, -389564586), i = md5_ff(i, s, n, r, e[o + 2], 17, 606105819), r = md5_ff(r, i, s, n, e[o + 3], 22, -1044525330), n = md5_ff(n, r, i, s, e[o + 4], 7, -176418897), s = md5_ff(s, n, r, i, e[o + 5], 12, 1200080426), i = md5_ff(i, s, n, r, e[o + 6], 17, -1473231341), r = md5_ff(r, i, s, n, e[o + 7], 22, -45705983), n = md5_ff(n, r, i, s, e[o + 8], 7, 1770035416), s = md5_ff(s, n, r, i, e[o + 9], 12, -1958414417), i = md5_ff(i, s, n, r, e[o + 10], 17, -42063), r = md5_ff(r, i, s, n, e[o + 11], 22, -1990404162), n = md5_ff(n, r, i, s, e[o + 12], 7, 1804603682), s = md5_ff(s, n, r, i, e[o + 13], 12, -40341101), i = md5_ff(i, s, n, r, e[o + 14], 17, -1502002290), r = md5_ff(r, i, s, n, e[o + 15], 22, 1236535329), n = md5_gg(n, r, i, s, e[o + 1], 5, -165796510), s = md5_gg(s, n, r, i, e[o + 6], 9, -1069501632), i = md5_gg(i, s, n, r, e[o + 11], 14, 643717713), r = md5_gg(r, i, s, n, e[o + 0], 20, -373897302), n = md5_gg(n, r, i, s, e[o + 5], 5, -701558691), s = md5_gg(s, n, r, i, e[o + 10], 9, 38016083), i = md5_gg(i, s, n, r, e[o + 15], 14, -660478335), r = md5_gg(r, i, s, n, e[o + 4], 20, -405537848), n = md5_gg(n, r, i, s, e[o + 9], 5, 568446438), s = md5_gg(s, n, r, i, e[o + 14], 9, -1019803690), i = md5_gg(i, s, n, r, e[o + 3], 14, -187363961), r = md5_gg(r, i, s, n, e[o + 8], 20, 1163531501), n = md5_gg(n, r, i, s, e[o + 13], 5, -1444681467), s = md5_gg(s, n, r, i, e[o + 2], 9, -51403784), i = md5_gg(i, s, n, r, e[o + 7], 14, 1735328473), r = md5_gg(r, i, s, n, e[o + 12], 20, -1926607734), n = md5_hh(n, r, i, s, e[o + 5], 4, -378558), s = md5_hh(s, n, r, i, e[o + 8], 11, -2022574463), i = md5_hh(i, s, n, r, e[o + 11], 16, 1839030562), r = md5_hh(r, i, s, n, e[o + 14], 23, -35309556), n = md5_hh(n, r, i, s, e[o + 1], 4, -1530992060), s = md5_hh(s, n, r, i, e[o + 4], 11, 1272893353), i = md5_hh(i, s, n, r, e[o + 7], 16, -155497632), r = md5_hh(r, i, s, n, e[o + 10], 23, -1094730640), n = md5_hh(n, r, i, s, e[o + 13], 4, 681279174), s = md5_hh(s, n, r, i, e[o + 0], 11, -358537222), i = md5_hh(i, s, n, r, e[o + 3], 16, -722521979), r = md5_hh(r, i, s, n, e[o + 6], 23, 76029189), n = md5_hh(n, r, i, s, e[o + 9], 4, -640364487), s = md5_hh(s, n, r, i, e[o + 12], 11, -421815835), i = md5_hh(i, s, n, r, e[o + 15], 16, 530742520), r = md5_hh(r, i, s, n, e[o + 2], 23, -995338651), n = md5_ii(n, r, i, s, e[o + 0], 6, -198630844), s = md5_ii(s, n, r, i, e[o + 7], 10, 1126891415), i = md5_ii(i, s, n, r, e[o + 14], 15, -1416354905), r = md5_ii(r, i, s, n, e[o + 5], 21, -57434055), n = md5_ii(n, r, i, s, e[o + 12], 6, 1700485571), s = md5_ii(s, n, r, i, e[o + 3], 10, -1894986606), i = md5_ii(i, s, n, r, e[o + 10], 15, -1051523), r = md5_ii(r, i, s, n, e[o + 1], 21, -2054922799), n = md5_ii(n, r, i, s, e[o + 8], 6, 1873313359), s = md5_ii(s, n, r, i, e[o + 15], 10, -30611744), i = md5_ii(i, s, n, r, e[o + 6], 15, -1560198380), r = md5_ii(r, i, s, n, e[o + 13], 21, 1309151649), n = md5_ii(n, r, i, s, e[o + 4], 6, -145523070), s = md5_ii(s, n, r, i, e[o + 11], 10, -1120210379), i = md5_ii(i, s, n, r, e[o + 2], 15, 718787259), r = md5_ii(r, i, s, n, e[o + 9], 21, -343485551), n = safe_add(n, u), r = safe_add(r, a), i = safe_add(i, f), s = safe_add(s, l)
    }
    return Array(n, r, i, s)
}
function md5_cmn(e, t, n, r, i, s) {
    return safe_add(bit_rol(safe_add(safe_add(t, e), safe_add(r, s)), i), n)
}
function md5_ff(e, t, n, r, i, s, o) {
    return md5_cmn(t & n | ~t & r, e, t, i, s, o)
}
function md5_gg(e, t, n, r, i, s, o) {
    return md5_cmn(t & r | n & ~r, e, t, i, s, o)
}
function md5_hh(e, t, n, r, i, s, o) {
    return md5_cmn(t ^ n ^ r, e, t, i, s, o)
}
function md5_ii(e, t, n, r, i, s, o) {
    return md5_cmn(n ^ (t | ~r), e, t, i, s, o)
}
function safe_add(e, t) {
    var n = (e & 65535) + (t & 65535),
        r = (e >> 16) + (t >> 16) + (n >> 16);
    return r << 16 | n & 65535
}
function bit_rol(e, t) {
    return e << t | e >>> 32 - t
}
function hex_sha1(e) {
    return rstr2hex(rstr_sha1(str2rstr_utf8(e)))
}
function b64_sha1(e) {
    return rstr2b64(rstr_sha1(str2rstr_utf8(e)))
}
function any_sha1(e, t) {
    return rstr2any(rstr_sha1(str2rstr_utf8(e)), t)
}
function hex_hmac_sha1(e, t) {
    return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(e), str2rstr_utf8(t)))
}
function b64_hmac_sha1(e, t) {
    return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(e), str2rstr_utf8(t)))
}
function any_hmac_sha1(e, t, n) {
    return rstr2any(rstr_hmac_sha1(str2rstr_utf8(e), str2rstr_utf8(t)), n)
}
function sha1_vm_test() {
    return hex_sha1("abc").toLowerCase() == "a9993e364706816aba3e25717850c26c9cd0d89d"
}
function rstr_sha1(e) {
    return binb2rstr(binb_sha1(rstr2binb(e), e.length * 8))
}
function rstr_hmac_sha1(e, t) {
    var n = rstr2binb(e);
    n.length > 16 && (n = binb_sha1(n, e.length * 8));
    var r = Array(16),
        i = Array(16);
    for (var s = 0; s < 16; s++) r[s] = n[s] ^ 909522486, i[s] = n[s] ^ 1549556828;
    var o = binb_sha1(r.concat(rstr2binb(t)), 512 + t.length * 8);
    return binb2rstr(binb_sha1(i.concat(o), 672))
}
function rstr2hex(e) {
    try {
        hexcase
    } catch (t) {
        hexcase = 0
    }
    var n = hexcase ? "0123456789ABCDEF" : "0123456789abcdef",
        r = "",
        i;
    for (var s = 0; s < e.length; s++) i = e.charCodeAt(s), r += n.charAt(i >>> 4 & 15) + n.charAt(i & 15);
    return r
}
function rstr2b64(e) {
    try {
        b64pad
    } catch (t) {
        b64pad = ""
    }
    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        r = "",
        i = e.length;
    for (var s = 0; s < i; s += 3) {
        var o = e.charCodeAt(s) << 16 | (s + 1 < i ? e.charCodeAt(s + 1) << 8 : 0) | (s + 2 < i ? e.charCodeAt(s + 2) : 0);
        for (var u = 0; u < 4; u++) s * 8 + u * 6 > e.length * 8 ? r += b64pad : r += n.charAt(o >>> 6 * (3 - u) & 63)
    }
    return r
}
function rstr2any(e, t) {
    var n = t.length,
        r = Array(),
        i, s, o, u, a = Array(Math.ceil(e.length / 2));
    for (i = 0; i < a.length; i++) a[i] = e.charCodeAt(i * 2) << 8 | e.charCodeAt(i * 2 + 1);
    while (a.length > 0) {
        u = Array(), o = 0;
        for (i = 0; i < a.length; i++) {
            o = (o << 16) + a[i], s = Math.floor(o / n), o -= s * n;
            if (u.length > 0 || s > 0) u[u.length] = s
        }
        r[r.length] = o, a = u
    }
    var f = "";
    for (i = r.length - 1; i >= 0; i--) f += t.charAt(r[i]);
    var l = Math.ceil(e.length * 8 / (Math.log(t.length) / Math.log(2)));
    for (i = f.length; i < l; i++) f = t[0] + f;
    return f
}
function str2rstr_utf8(e) {
    var t = "",
        n = -1,
        r, i;
    while (++n < e.length) r = e.charCodeAt(n), i = n + 1 < e.length ? e.charCodeAt(n + 1) : 0, 55296 <= r && r <= 56319 && 56320 <= i && i <= 57343 && (r = 65536 + ((r & 1023) << 10) + (i & 1023), n++), r <= 127 ? t += String.fromCharCode(r) : r <= 2047 ? t += String.fromCharCode(192 | r >>> 6 & 31, 128 | r & 63) : r <= 65535 ? t += String.fromCharCode(224 | r >>> 12 & 15, 128 | r >>> 6 & 63, 128 | r & 63) : r <= 2097151 && (t += String.fromCharCode(240 | r >>> 18 & 7, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | r & 63));
    return t
}
function str2rstr_utf16le(e) {
    var t = "";
    for (var n = 0; n < e.length; n++) t += String.fromCharCode(e.charCodeAt(n) & 255, e.charCodeAt(n) >>> 8 & 255);
    return t
}
function str2rstr_utf16be(e) {
    var t = "";
    for (var n = 0; n < e.length; n++) t += String.fromCharCode(e.charCodeAt(n) >>> 8 & 255, e.charCodeAt(n) & 255);
    return t
}
function rstr2binb(e) {
    var t = Array(e.length >> 2);
    for (var n = 0; n < t.length; n++) t[n] = 0;
    for (var n = 0; n < e.length * 8; n += 8) t[n >> 5] |= (e.charCodeAt(n / 8) & 255) << 24 - n % 32;
    return t
}
function binb2rstr(e) {
    var t = "";
    for (var n = 0; n < e.length * 32; n += 8) t += String.fromCharCode(e[n >> 5] >>> 24 - n % 32 & 255);
    return t
}
function binb_sha1(e, t) {
    e[t >> 5] |= 128 << 24 - t % 32, e[(t + 64 >> 9 << 4) + 15] = t;
    var n = Array(80),
        r = 1732584193,
        i = -271733879,
        s = -1732584194,
        o = 271733878,
        u = -1009589776;
    for (var a = 0; a < e.length; a += 16) {
        var f = r,
            l = i,
            c = s,
            h = o,
            p = u;
        for (var d = 0; d < 80; d++) {
            d < 16 ? n[d] = e[a + d] : n[d] = bit_rol(n[d - 3] ^ n[d - 8] ^ n[d - 14] ^ n[d - 16], 1);
            var v = safe_add(safe_add(bit_rol(r, 5), sha1_ft(d, i, s, o)), safe_add(safe_add(u, n[d]), sha1_kt(d)));
            u = o, o = s, s = bit_rol(i, 30), i = r, r = v
        }
        r = safe_add(r, f), i = safe_add(i, l), s = safe_add(s, c), o = safe_add(o, h), u = safe_add(u, p)
    }
    return Array(r, i, s, o, u)
}
function sha1_ft(e, t, n, r) {
    return e < 20 ? t & n | ~t & r : e < 40 ? t ^ n ^ r : e < 60 ? t & n | t & r | n & r : t ^ n ^ r
}
function sha1_kt(e) {
    return e < 20 ? 1518500249 : e < 40 ? 1859775393 : e < 60 ? -1894007588 : -899497514
}
function safe_add(e, t) {
    var n = (e & 65535) + (t & 65535),
        r = (e >> 16) + (t >> 16) + (n >> 16);
    return r << 16 | n & 65535
}
function bit_rol(e, t) {
    return e << t | e >>> 32 - t
}(function(e, t) {
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
        do e = e[t];
        while (e && e.nodeType !== 1);
        return e
    }
    function ft(e, t, n) {
        t = t || 0;
        if (v.isFunction(t)) return v.grep(e, function(e, r) {
            var i = !! t.call(e, r, e);
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
        if (n.createElement) while (t.length) n.createElement(t.pop());
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
            for (n in u) for (r = 0, i = u[n].length; r < i; r++) v.event.add(t, n, u[n][r])
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
        else if (!n && v.type(t) === "object") for (i in t) fn(e + "[" + i + "]", t[i], n, r);
        else r(e, t)
    }
    function Cn(e) {
        return function(t, n) {
            typeof t != "string" && (n = t, t = "*");
            var r, i, s, o = t.toLowerCase().split(y),
                u = 0,
                a = o.length;
            if (v.isFunction(n)) for (; u < a; u++) r = o[u], s = /^\+/.test(r), s && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[s ? "unshift" : "push"](n)
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
        if (i) for (s in a) if (a[s] && a[s].test(i)) {
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
        if (o[1]) for (n in e.converters) a[n.toLowerCase()] = e.converters[n];
        for (; i = o[++f];) if (i !== "*") {
            if (u !== "*" && u !== i) {
                n = a[u + " " + i] || a["* " + i];
                if (!n) for (r in a) {
                    s = r.split(" ");
                    if (s[1] === i) {
                        n = a[u + " " + s[0]] || a["* " + s[0]];
                        if (n) {
                            n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));
                            break
                        }
                    }
                }
                if (n !== !0) if (n && e["throws"]) t = n(t);
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
            for (; i < s; i++) if (r[i].call(e, t, n)) return
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
                    r = 1 - (n / f.duration || 0),
                    i = 0,
                    s = f.tweens.length;
                for (; i < s; i++) f.tweens[i].run(r);
                return u.notifyWith(e, [f, r, n]), r < 1 && s ? n : (u.resolveWith(e, [f]), !1)
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
        var r, i, s, o, u, a, f, l, c = this,
            h = e.style,
            p = {},
            d = [],
            m = e.nodeType && Gt(e);
        n.queue || (f = v._queueHooks(e, "fx"), f.unqueued == null && (f.unqueued = 0, l = f.empty.fire, f.empty.fire = function() {
            f.unqueued || l()
        }), f.unqueued++, c.always(function() {
            c.always(function() {
                f.unqueued--, v.queue(e, "fx").length || f.empty.fire()
            })
        })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], v.css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline" ? h.display = "inline-block" : h.zoom = 1)), n.overflow && (h.overflow = "hidden", v.support.shrinkWrapBlocks || c.done(function() {
            h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
        }));
        for (r in t) {
            s = t[r];
            if (Un.exec(s)) {
                delete t[r];
                if (s === (m ? "hide" : "show")) continue;
                d.push(r)
            }
        }
        o = d.length;
        if (o) {
            u = v._data(e, "fxshow") || v._data(e, "fxshow", {}), m ? v(e).show() : c.done(function() {
                v(e).hide()
            }), c.done(function() {
                var t;
                v.removeData(e, "fxshow", !0);
                for (t in p) v.style(e, t, p[t])
            });
            for (r = 0; r < o; r++) i = d[r], a = c.createTween(i, m ? u[i] : 0), p[i] = u[i] || v.style(e, i), i in u || (u[i] = a.start, m && (a.end = a.start, a.start = i === "width" || i === "height" ? 1 : 0))
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
        jquery: "1.8.2",
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
        for (; a < f; a++) if ((e = arguments[a]) != null) for (n in e) {
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
        isArray: Array.isArray ||
        function(e) {
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
            t && g.test(t) && (e.execScript ||
            function(t) {
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
                    for (i in e) if (n.apply(e[i], r) === !1) break
                } else for (; s < o;) if (n.apply(e[s++], r) === !1) break
            } else if (u) {
                for (i in e) if (n.call(e[i], i, e[i]) === !1) break
            } else for (; s < o;) if (n.call(e[s], s, e[s++]) === !1) break;
            return e
        },
        trim: d && !d.call("﻿ ") ?
        function(e) {
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
                for (; n < r; n++) if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function(e, n) {
            var r = n.length,
                i = e.length,
                s = 0;
            if (typeof r == "number") for (; s < r; s++) e[i++] = n[s];
            else while (n[s] !== t) e[i++] = n[s++];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            var r, i = [],
                s = 0,
                o = e.length;
            n = !! n;
            for (; s < o; s++) r = !! t(e[s], s), n !== r && i.push(e[s]);
            return i
        },
        map: function(e, n, r) {
            var i, s, o = [],
                u = 0,
                a = e.length,
                f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));
            if (f) for (; u < a; u++) i = n(e[u], u, r), i != null && (o[o.length] = i);
            else for (s in e) i = n(e[s], s, r), i != null && (o[o.length] = i);
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
                if (n) for (; l < c; l++) n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);
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
                n && n.doScroll &&
                function o() {
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
                for (; a && u < o; u++) if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
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
                                i === "function" && (!e.unique || !c.has(n)) ? a.push(n) : n && n.length && i !== "string" && r(n)
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
                                i[r[1]](v.isFunction(o) ?
                                function() {
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
        p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0], r.style.cssText = "top:1px;float:left;opacity:.5";
        if (!n || !n.length) return {};
        s = i.createElement("select"), o = s.appendChild(i.createElement("option")), u = p.getElementsByTagName("input")[0], t = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !! p.getElementsByTagName("link").length,
            style: /top/.test(r.getAttribute("style")),
            hrefNormalized: r.getAttribute("href") === "/a",
            opacity: /^0.5/.test(r.style.opacity),
            cssFloat: !! r.style.cssFloat,
            checkOn: u.value === "on",
            optSelected: o.selected,
            getSetAttribute: p.className !== "t",
            enctype: !! i.createElement("form").enctype,
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
        if (p.attachEvent) for (l in {
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
            return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando], !! e && !B(e)
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
                    if (i.nodeType === 1) if (!i.className && t.length === 1) i.className = e;
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
                        for (s = 0, o = n.length; s < o; s++) while (r.indexOf(" " + n[s] + " ") >= 0) r = r.replace(" " + n[s] + " ", " ");
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
            for (; n < r; n++) if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) return !0;
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
                    var t, n, r, i, s = e.selectedIndex,
                        o = [],
                        u = e.options,
                        a = e.type === "select-one";
                    if (s < 0) return null;
                    n = a ? s : 0, r = a ? s + 1 : u.length;
                    for (; n < r; n++) {
                        i = u[n];
                        if (i.selected && (v.support.optDisabled ? !i.disabled : i.getAttribute("disabled") === null) && (!i.parentNode.disabled || !v.nodeName(i.parentNode, "optgroup"))) {
                            t = v(i).val();
                            if (a) return t;
                            o.push(t)
                        }
                    }
                    return a && !o.length && u.length ? v(u[s]).val() : o
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
                return typeof v == "undefined" || !! e && v.event.triggered === e.type ? t : v.event.dispatch.apply(u.elem, arguments)
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
            if (m && (!n.button || n.type !== "click")) for (s = n.target; s != this; s = s.parentNode || this) if (s.disabled !== !0 || n.type !== "click") {
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
            return e.target || (e.target = r.srcElement || i), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, s.filter ? s.filter(e, r) : e
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
    }, v.event.handle = v.event.dispatch, v.removeEvent = i.removeEventListener ?
    function(e, t, n) {
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
    }), function(e, t) {
        function nt(e, t, n, r) {
            n = n || [], t = t || g;
            var i, s, a, f, l = t.nodeType;
            if (!e || typeof e != "string") return n;
            if (l !== 1 && l !== 9) return [];
            a = o(t);
            if (!a && !r) if (i = R.exec(e)) if (f = i[1]) {
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
            var n, r, s, o, u, a, f, l = L[d][e];
            if (l) return t ? 0 : l.slice(0);
            u = e, a = [], f = i.preFilter;
            while (u) {
                if (!n || (r = F.exec(u))) r && (u = u.slice(r[0].length)), a.push(s = []);
                n = !1;
                if (r = I.exec(u)) s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = r[0].replace(j, " ");
                for (o in i.filter)(r = J[o].exec(u)) && (!f[o] || (r = f[o](r, g, !0))) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = o, n.matches = r);
                if (!n) break
            }
            return t ? u.length : u ? nt.error(e) : L(e, a).slice(0)
        }
        function at(e, t, r) {
            var i = t.dir,
                s = r && t.dir === "parentNode",
                o = w++;
            return t.first ?
            function(t, n, r) {
                while (t = t[i]) if (s || t.nodeType === 1) return e(t, n, r)
            } : function(t, r, u) {
                if (!u) {
                    var a, f = b + " " + o + " ",
                        l = f + n;
                    while (t = t[i]) if (s || t.nodeType === 1) {
                        if ((a = t[d]) === l) return t.sizset;
                        if (typeof a == "string" && a.indexOf(f) === 0) {
                            if (t.sizset) return t
                        } else {
                            t[d] = l;
                            if (e(t, r, u)) return t.sizset = !0, t;
                            t.sizset = !1
                        }
                    }
                } else while (t = t[i]) if (s || t.nodeType === 1) if (e(t, r, u)) return t
            }
        }
        function ft(e) {
            return e.length > 1 ?
            function(t, n, r) {
                var i = e.length;
                while (i--) if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }
        function lt(e, t, n, r, i) {
            var s, o = [],
                u = 0,
                a = e.length,
                f = t != null;
            for (; u < a; u++) if (s = e[u]) if (!n || n(s, r, i)) o.push(s), f && t.push(u);
            return o
        }
        function ct(e, t, n, r, i, s) {
            return r && !r[d] && (r = ct(r)), i && !i[d] && (i = ct(i, s)), N(function(s, o, u, a) {
                if (s && i) return;
                var f, l, c, h = [],
                    p = [],
                    d = o.length,
                    v = s || dt(t || "*", u.nodeType ? [u] : u, [], s),
                    m = e && (s || !t) ? lt(v, h, e, u, a) : v,
                    g = n ? i || (s ? e : d || r) ? [] : o : m;
                n && n(m, g, u, a);
                if (r) {
                    c = lt(g, p), r(c, [], u, a), f = c.length;
                    while (f--) if (l = c[f]) g[p[f]] = !(m[p[f]] = l)
                }
                if (s) {
                    f = e && g.length;
                    while (f--) if (l = g[f]) s[h[f]] = !(o[h[f]] = l)
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
            for (; a < s; a++) if (n = i.relative[e[a].type]) h = [at(ft(h), n)];
            else {
                n = i.filter[e[a].type].apply(null, e[a].matches);
                if (n[d]) {
                    r = ++a;
                    for (; r < s; r++) if (i.relative[e[r].type]) break;
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
                            for (d = 0; v = e[d]; d++) if (v(p, a, f)) {
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
                            if (y > 0) while (w--)!x[w] && !m[w] && (m[w] = E.call(l));
                            m = lt(m)
                        }
                        S.apply(l, m), T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l)
                    }
                    return T && (b = k, c = N), x
                };
            return o.el = 0, r ? N(o) : o
        }
        function dt(e, t, n, r) {
            var i = 0,
                s = t.length;
            for (; i < s; i++) nt(e, t[i], n, r);
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
                    if (c = i.find[l]) if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
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
            T = [].indexOf ||
        function(e) {
            var t = 0,
                n = this.length;
            for (; t < n; t++) if (this[t] === e) return t;
            return -1
        }, N = function(e, t) {
            return e[d] = t == null || t, e
        }, C = function() {
            var e = {},
                t = [];
            return N(function(n, r) {
                return t.push(n) > i.cacheLength && delete e[t.shift()], e[n] = r
            }, e)
        }, k = C(), L = C(), A = C(), O = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", _ = M.replace("w", "w#"), D = "([*^$|!~]?=)", P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]", H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)", B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)", j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"), F = new RegExp("^" + O + "*," + O + "*"), I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"), q = new RegExp(H), R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, U = /^:not/, z = /[\x20\t\r\n\f]*[+~]/, W = /:not\($/, X = /h\d/i, V = /input|select|textarea|button/i, $ = /\\(?!\\)/g, J = {
            ID: new RegExp("^#(" + M + ")"),
            CLASS: new RegExp("^\\.(" + M + ")"),
            NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"),
            TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + P),
            PSEUDO: new RegExp("^" + H),
            POS: new RegExp(B, "i"),
            CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
            needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i")
        }, K = function(e) {
            var t = g.createElement("div");
            try {
                return e(t)
            } catch (n) {
                return !1
            } finally {
                t = null
            }
        }, Q = K(function(e) {
            return e.appendChild(g.createComment("")), !e.getElementsByTagName("*").length
        }), G = K(function(e) {
            return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== p && e.firstChild.getAttribute("href") === "#"
        }), Y = K(function(e) {
            e.innerHTML = "<select></select>";
            var t = typeof e.lastChild.getAttribute("multiple");
            return t !== "boolean" && t !== "string"
        }), Z = K(function(e) {
            return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length === 2)
        }), et = K(function(e) {
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
            } else for (; t = e[r]; r++) n += s(t);
            return n
        }, o = nt.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        }, u = nt.contains = y.contains ?
        function(e, t) {
            var n = e.nodeType === 9 ? e.documentElement : e,
                r = t && t.parentNode;
            return e === r || !! (r && r.nodeType === 1 && n.contains && n.contains(r))
        } : y.compareDocumentPosition ?
        function(e, t) {
            return t && !! (e.compareDocumentPosition(t) & 16)
        } : function(e, t) {
            while (t = t.parentNode) if (t === e) return !0;
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
                ID: r ?
                function(e, t, n) {
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
                TAG: Q ?
                function(e, t) {
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
                NAME: et &&
                function(e, t) {
                    if (typeof t.getElementsByName !== p) return t.getElementsByName(name)
                },
                CLASS: Z &&
                function(e, t, n) {
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
                ID: r ?
                function(e) {
                    return e = e.replace($, ""), function(t) {
                        return t.getAttribute("id") === e
                    }
                } : function(e) {
                    return e = e.replace($, ""), function(t) {
                        var n = typeof t.getAttributeNode !== p && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                },
                TAG: function(e) {
                    return e === "*" ?
                    function() {
                        return !0
                    } : (e = e.replace($, "").toLowerCase(), function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    })
                },
                CLASS: function(e) {
                    var t = k[d][e];
                    return t || (t = k(e, new RegExp("(^|" + O + ")" + e + "(" + O + "|$)"))), function(e) {
                        return t.test(e.className || typeof e.getAttribute !== p && e.getAttribute("class") || "")
                    }
                },
                ATTR: function(e, t, n) {
                    return function(r, i) {
                        var s = nt.attr(r, e);
                        return s == null ? t === "!=" : t ? (s += "", t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, r) {
                    return e === "nth" ?
                    function(e) {
                        var t, i, s = e.parentNode;
                        if (n === 1 && r === 0) return !0;
                        if (s) {
                            i = 0;
                            for (t = s.firstChild; t; t = t.nextSibling) if (t.nodeType === 1) {
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
                            while (n = n.previousSibling) if (n.nodeType === 1) return !1;
                            if (e === "first") return !0;
                            n = t;
                        case "last":
                            while (n = n.nextSibling) if (n.nodeType === 1) return !1;
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
                        while (u--) if (s = o[u]) e[u] = !(t[u] = s)
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
                    return t === "input" && !! e.checked || t === "option" && !! e.selected
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
                    return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && ( !! e.type || !! e.href)
                },
                active: function(e) {
                    return e === e.ownerDocument.activeElement
                },
                first: st(function(e, t, n) {
                    return [0]
                }),
                last: st(function(e, t, n) {
                    return [t - 1]
                }),
                eq: st(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: st(function(e, t, n) {
                    for (var r = 0; r < t; r += 2) e.push(r);
                    return e
                }),
                odd: st(function(e, t, n) {
                    for (var r = 1; r < t; r += 2) e.push(r);
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
        }, f = y.compareDocumentPosition ?
        function(e, t) {
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
            for (var f = 0; f < n && f < r; f++) if (i[f] !== s[f]) return ot(i[f], s[f]);
            return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1)
        }, [0, 0].sort(f), h = !l, nt.uniqueSort = function(e) {
            var t, n = 1;
            l = h, e.sort(f);
            if (l) for (; t = e[n]; n++) t === e[n - 1] && e.splice(n--, 1);
            return e
        }, nt.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, a = nt.compile = function(e, t) {
            var n, r = [],
                i = [],
                s = A[d][e];
            if (!s) {
                t || (t = ut(e)), n = t.length;
                while (n--) s = ht(t[n]), s[d] ? r.push(s) : i.push(s);
                s = A(e, pt(i, r))
            }
            return s
        }, g.querySelectorAll &&
        function() {
            var e, t = vt,
                n = /'|\\/g,
                r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                i = [":focus"],
                s = [":active", ":focus"],
                u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
            K(function(e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked")
            }), K(function(e) {
                e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled")
            }), i = new RegExp(i.join("|")), vt = function(e, r, s, o, u) {
                if (!o && !u && (!i || !i.test(e))) {
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
                if (!o(t) && !s.test(n) && (!i || !i.test(n))) try {
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
                for (t = 0, n = u.length; t < n; t++) if (v.contains(u[t], this)) return !0
            });
            o = this.pushStack("", "find", e);
            for (t = 0, n = this.length; t < n; t++) {
                r = o.length, v.find(e, this[t], o);
                if (t > 0) for (i = r; i < o.length; i++) for (s = 0; s < r; s++) if (o[s] === o[i]) {
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
                for (t = 0; t < r; t++) if (v.contains(this, n[t])) return !0
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
            (n = this[r]) != null; r++) if (!e || v.filter(e, [n]).length)!t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])), n.parentNode && n.parentNode.removeChild(n);
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
                if (typeof u == "string") if (!gt.test(u)) u = t.createTextNode(u);
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
            if (!v.support.appendChecked) for (s = 0;
            (u = b[s]) != null; s++) v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(u.getElementsByTagName("input"), _t);
            if (n) {
                m = function(e) {
                    if (!e.type || xt.test(e.type)) return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e)
                };
                for (s = 0;
                (u = b[s]) != null; s++) if (!v.nodeName(u, "script") || !m(u)) n.appendChild(u), typeof u.getElementsByTagName != "undefined" && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length)
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
            (i = e[o]) != null; o++) if (t || v.acceptData(i)) {
                r = i[u], n = r && a[r];
                if (n) {
                    if (n.events) for (s in n.events) l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);
                    a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(r))
                }
            }
        }
    }), function() {
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
        Wt = {},
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
                (n ? e : Gt(this)) ? v(this).show() : v(this).hide()
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
        return u && (r = u[n], r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)), Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)), r
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
        else for (r in e) fn(r, e[r], n, s);
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
                    if (E < 2) for (t in e) g[t] = [g[t], e[t]];
                    else t = e[x.status], x.always(t)
                }
                return this
            }, c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"), c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y), c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()) || !1, c.crossDomain = a && a.join(":") + (a[3] ? "" : a[1] === "http:" ? 80 : 443) !== ln.join(":") + (ln[3] ? "" : ln[1] === "http:" ? 80 : 443)), c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)), kn(Sn, c, n, x);
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
    var Hn, Bn = e.ActiveXObject ?
    function() {
        for (var e in Hn) Hn[e](0, 1)
    } : !1, jn = 0;
    v.ajaxSettings.xhr = e.ActiveXObject ?
    function() {
        return !this.isLocal && Fn() || In()
    } : Fn, function(e) {
        v.extend(v.support, {
            ajax: !! e,
            cors: !! e && "withCredentials" in e
        })
    }(v.ajaxSettings.xhr()), v.support.ajax && v.ajaxTransport(function(n) {
        if (!n.crossDomain || v.support.cors) {
            var r;
            return {
                send: function(i, s) {
                    var o, u, a = n.xhr();
                    n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);
                    if (n.xhrFields) for (u in n.xhrFields) a[u] = n.xhrFields[u];
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
                                    } catch (e) {}
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
                        do a = a || ".5", u /= a, v.style(i.elem, e, u + r);
                        while (a !== (a = i.cur() / o) && a !== 1 && --f)
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
                return e.elem[e.prop] == null || !! e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
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
                else for (n in o) o[n] && o[n].stop && Wn.test(n) && i(o[n]);
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
        var e, t = v.timers,
            n = 0;
        for (; n < t.length; n++) e = t[n], !e() && t[n] === e && t.splice(n--, 1);
        t.length || v.fx.stop()
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
})(window), function(e, t) {
    var n = 0,
        r = {},
        i = Object.prototype.toString,
        s = {},
        o = {},
        u = {},
        a = "[object Function]",
        f = "[object String]",
        l = function(e) {
            return o[e] || (o[e] = $.Deferred()), o[e]
        },
        c = function(e, t) {
            var n = [],
                i;
            for (var s = 0, o = e.length; s < o; s++) i = e[s], n.push(i == "module" ? t : i == "exports" ? t.exports : r[i].exports);
            return n
        },
        h = function(e) {
            var t = r[e],
                n = t.dependencies || [],
                i, s, o;
            for (var u = 0, a = n.length; u < a; u++) i = n[u], s = v(i), t.promises.push(s.promise())
        },
        p = function(s, o, u) {
            o === t && i.call(s) !== f ? (o = [], u = s, s = "__" + n++) : u === t && (u = o, _.isArray(s) ? (o = s, s = "__" + n++) : o = []);
            var p = r[s];
            if (p && !p.noDefinition) return p;
            p = p || {}, o = o || [], o.length == 0 && (o = ["require", "exports", "module"]), p.definition = u, p.dependencies = o, p.dfd = l(s), p.promises = [], p.exports = {}, p.config = m, r[s] = p;
            if (u) {
                p.noDefinition = !1, h(s);
                var d = this;
                $.when.apply($, p.promises).done(function() {
                    try {
                        i.call(u) == f && (p.definition = Function(u), u = p.definition);
                        if (i.call(u) == a) {
                            var e = c(o, p);
                            u.apply(d, e)
                        }
                    } catch (t) {
                        console.log("module failed", s, t, t.stack)
                    }
                    p.dfd.resolve()
                }).fail(function() {
                    console.log("module resolve failed", s, p)
                })
            } else p.noDefinition = !0;
            return p
        },
        d = function(e) {
            return r[e]
        },
        v = function(e) {
            var t = r[e],
                n = l(e);
            if (t && t.path && !t.scriptDfd && n.state() != "resolved") {
                var i = b(t.path);
                u[i] = 1, t.scriptDfd = $.getScript(i).always(function() {
                    delete u[i], delete t.scriptDfd
                })
            }
            return n
        },
        m = function(e) {
            return $.extend(s, e), s
        },
        g = function(e, t) {
            r[e] = {
                dfd: l(e).resolve(),
                exports: t
            }
        };
    g("define", p), g("require", d), g("module", t), g("exports", t), g("global", e);
    var y = e.gsProduction,
        b = function(e) {
            if (!y) return e;
            var t = e.split("/"),
                n, r = "/" + t[t.length - 1];
            if (_.isObject(y.fileMap) && y.fileMap[r]) {
                var i = y.fileMap[r];
                if (i && i.length) {
                    var s = i[i.length - 1].assetPath || "";
                    s && (t = s.split("/"))
                }
            }
            return t.length < 2 || !_.isObject(y.dirMap) ? t.join("/") : (n = t[1], y.dirMap[n] && (t[1] = y.dirMap[n]), t.join("/").replace("//", "/"))
        };
    p.amd = {
        jQuery: !0
    }, e.define = p, e.require = d, e.requireDeferred = v, e.resolvePath = b, e.amdModules = {
        config: m
    }
}(window), function(e, t) {
    "use strict";

    function mt(e) {
        return new gt(e)
    }
    function gt(e) {
        if (e && e._wrapped) return e;
        this._wrapped = e
    }
    function Lt(e, t, n) {
        t || (t = 0);
        var r = e.length,
            i = r - t >= (n || p),
            s = i ? {} : e;
        if (i) {
            var o, u = t - 1;
            while (++u < r) o = e[u] + "", (M.call(s, o) ? s[o] : s[o] = []).push(e[u])
        }
        return function(e) {
            if (i) {
                var n = e + "";
                return M.call(s, n) && In(s[n], e) > -1
            }
            return In(s, e, t) > -1
        }
    }
    function At() {
        var e, t, n, r = -1,
            i = arguments.length,
            s = {
                bottom: "",
                exit: "",
                init: "",
                top: "",
                arrayBranch: {
                    beforeLoop: ""
                },
                objectBranch: {
                    beforeLoop: ""
                }
            };
        while (++r < i) {
            e = arguments[r];
            for (t in e) n = (n = e[t]) == null ? "" : n, /beforeLoop|inLoop/.test(t) ? (typeof n == "string" && (n = {
                array: n,
                object: n
            }), s.arrayBranch[t] = n.array || "", s.objectBranch[t] = n.object || "") : s[t] = n
        }
        var o = s.args,
            a = /^[^,]+/.exec(o)[0],
            f = s.useStrict;
        s.firstArg = a, s.hasDontEnumBug = G, s.isKeysFast = ut, s.noArgsEnum = et, s.shadowed = C, s.useHas = s.useHas !== !1, s.useStrict = f == null ? at : f, s.noCharByIndex == null && (s.noCharByIndex = rt), s.exit || (s.exit = "if (!" + a + ") return result");
        if (a != "collection" || !s.arrayBranch.inLoop) s.arrayBranch = null;
        var l = Function("arrayLikeClasses, ArrayProto, bind, compareAscending, concat, forIn, hasOwnProperty, identity, indexOf, isArguments, isArray, isFunction, isPlainObject, iteratorBind, objectClass, objectTypes, nativeKeys, propertyIsEnumerable, slice, stringClass, toString", "var callee = function(" + o + ") {\n" + yt(s) + "\n};\n" + "return callee");
        return l(lt, u, nr, Ot, O, Kt, M, dr, In, qt, Rt, Ut, zt, Pt, V, dt, I, D, P, J, H)
    }
    function Ot(e, n) {
        var r = e.index,
            i = n.index;
        return e = e.criteria, n = n.criteria, e === t ? 1 : n === t ? -1 : e < n ? -1 : e > n ? 1 : r < i ? -1 : 1
    }
    function Mt(e, t) {
        return A[t]
    }
    function _t(e) {
        return "\\" + vt[e]
    }
    function Dt(e) {
        return ht[e]
    }
    function Pt(e, t) {
        return function(n, r, i) {
            return e.call(t, n, r, i)
        }
    }
    function Ht() {}
    function Bt(e, t) {
        if (e && v.test(t)) return "<e%-" + t + "%>";
        var n = A.length;
        return A[n] = "' +\n__e(" + t + ") +\n'", L + n
    }
    function jt(e, t, n, r) {
        if (r) {
            var i = A.length;
            return A[i] = "';\n" + r + ";\n__p += '", L + i
        }
        return t ? Bt(null, t) : Ft(null, n)
    }
    function Ft(e, t) {
        if (e && v.test(t)) return "<e%=" + t + "%>";
        var n = A.length;
        return A[n] = "' +\n((__t = (" + t + ")) == null ? '' : __t) +\n'", L + n
    }
    function It(e) {
        return pt[e]
    }
    function qt(e) {
        return H.call(e) == q
    }
    function Ut(e) {
        return typeof e == "function"
    }
    function zt(e, t) {
        return e ? e == f || e.__proto__ == f && (t || !qt(e)) : !1
    }
    function Xt(e, t, n, r, i) {
        if (e == null) return e;
        n && (t = !1), i || (i = {
            value: null
        }), i.value == null && (i.value = !! (a.clone || l.clone || c.clone));
        var s = dt[typeof e];
        if ((s || i.value) && e.clone && Ut(e.clone)) return i.value = null, e.clone(t);
        if (s) {
            var o = H.call(e);
            if (!ct[o] || tt && qt(e)) return e;
            var u = o == R;
            s = u || (o == V ? zt(e, !0) : s)
        }
        if (!s || !t) return s ? u ? P.call(e) : Jt({}, e) : e;
        var f = e.constructor;
        switch (o) {
        case U:
            return new f(e == 1);
        case z:
            return new f(+e);
        case X:
        case J:
            return new f(e);
        case $:
            return f(e.source, w.exec(e))
        }
        r || (r = []);
        var h = r.length;
        while (h--) if (r[h].source == e) return r[h].value;
        h = e.length;
        var p = u ? f(h) : {};
        r.push({
            value: p,
            source: e
        });
        if (u) {
            var d = -1;
            while (++d < h) p[d] = Xt(e[d], t, null, r, i)
        } else Qt(e, function(e, n) {
            p[n] = Xt(e, t, null, r, i)
        });
        return p
    }
    function Yt(e, t) {
        return e ? M.call(e, t) : !1
    }
    function Zt(e) {
        return e === !0 || e === !1 || H.call(e) == U
    }
    function en(e) {
        return H.call(e) == z
    }
    function tn(e) {
        return e ? e.nodeType === 1 : !1
    }
    function rn(e, t, n, r) {
        if (e == null || t == null) return e === t;
        r || (r = {
            value: null
        }), r.value == null && (r.value = !! (a.isEqual || l.isEqual || c.isEqual));
        if (dt[typeof e] || dt[typeof t] || r.value) {
            e._chain && (e = e._wrapped), t._chain && (t = t._wrapped);
            if (e.isEqual && Ut(e.isEqual)) return r.value = null, e.isEqual(t);
            if (t.isEqual && Ut(t.isEqual)) return r.value = null, t.isEqual(e)
        }
        if (e === t) return e !== 0 || 1 / e == 1 / t;
        var i = H.call(e);
        if (i != H.call(t)) return !1;
        switch (i) {
        case U:
        case z:
            return +e == +t;
        case X:
            return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
        case $:
        case J:
            return e == t + ""
        }
        var s = lt[i];
        if (tt && !s && (s = qt(e)) && !qt(t)) return !1;
        if (!s && (i != V || it && (typeof e.toString != "function" && typeof(e + "") == "string" || typeof t.toString != "function" && typeof(t + "") == "string"))) return !1;
        n || (n = []);
        var o = n.length;
        while (o--) if (n[o] == e) return !0;
        var u = -1,
            f = !0,
            h = 0;
        n.push(e);
        if (s) {
            h = e.length, f = h == t.length;
            if (f) while (h--) if (!(f = rn(e[h], t[h], n, r))) break;
            return f
        }
        var p = e.constructor,
            d = t.constructor;
        if (p != d && !(Ut(p) && p instanceof p && Ut(d) && d instanceof d)) return !1;
        for (var v in e) if (M.call(e, v)) {
            h++;
            if (!M.call(t, v) || !rn(e[v], t[v], n, r)) return !1
        }
        for (v in t) if (M.call(t, v) && !(h--)) return !1;
        if (G) while (++u < 7) {
            v = C[u];
            if (M.call(e, v) && (!M.call(t, v) || !rn(e[v], t[v], n, r))) return !1
        }
        return !0
    }
    function sn(e) {
        return F(e) && H.call(e) == X
    }
    function on(e) {
        return e ? dt[typeof e] : !1
    }
    function un(e) {
        return H.call(e) == X && e != +e
    }
    function an(e) {
        return e === null
    }
    function fn(e) {
        return H.call(e) == X
    }
    function ln(e) {
        return H.call(e) == $
    }
    function cn(e) {
        return H.call(e) == J
    }
    function hn(e) {
        return e === t
    }
    function mn(e) {
        if (!e) return 0;
        var t = H.call(e),
            n = e.length;
        return lt[t] || tt && qt(e) || t == V && n > -1 && n === n >>> 0 && Ut(e.splice) ? n : pn(e).length
    }
    function An(e, t, n, r) {
        if (!e) return n;
        var i = e.length,
            s = arguments.length < 3;
        r && (t = Pt(t, r));
        if (i > -1 && i === i >>> 0) {
            var o = rt && H.call(e) == J ? e.split("") : e;
            i && s && (n = o[--i]);
            while (i--) n = t(n, o[i], i, e);
            return n
        }
        var u, a = pn(e);
        i = a.length, i && s && (n = e[a[--i]]);
        while (i--) u = a[i], n = t(n, e[u], u, e);
        return n
    }
    function Dn(e) {
        if (!e) return [];
        if (e.toArray && Ut(e.toArray)) return e.toArray();
        var t = e.length;
        return t > -1 && t === t >>> 0 ? (nt ? H.call(e) == J : typeof e == "string") ? e.split("") : P.call(e) : gn(e)
    }
    function Hn(e) {
        var t = [];
        if (!e) return t;
        var n = -1,
            r = e.length;
        while (++n < r) e[n] && t.push(e[n]);
        return t
    }
    function Bn(e) {
        var t = [];
        if (!e) return t;
        var n = -1,
            r = e.length,
            i = O.apply(t, arguments),
            s = Lt(i, r);
        while (++n < r) s(e[n]) || t.push(e[n]);
        return t
    }
    function jn(e, t, n) {
        if (e) return t == null || n ? e[0] : P.call(e, 0, t)
    }
    function Fn(e, t) {
        var n = [];
        if (!e) return n;
        var r, i = -1,
            s = e.length;
        while (++i < s) r = e[i], Rt(r) ? _.apply(n, t ? r : Fn(r)) : n.push(r);
        return n
    }
    function In(e, t, n) {
        if (!e) return -1;
        var r = -1,
            i = e.length;
        if (n) {
            if (typeof n != "number") return r = Kn(e, t), e[r] === t ? r : -1;
            r = (n < 0 ? Math.max(0, i + n) : n) - 1
        }
        while (++r < i) if (e[r] === t) return r;
        return -1
    }
    function qn(e, t, n) {
        return e ? P.call(e, 0, -(t == null || n ? 1 : t)) : []
    }
    function Rn(e) {
        var t = [];
        if (!e) return t;
        var n, r = arguments.length,
            i = [],
            s = -1,
            o = e.length;
        e: while (++s < o) {
            n = e[s];
            if (In(t, n) < 0) {
                for (var u = 1; u < r; u++) if (!(i[u] || (i[u] = Lt(arguments[u])))(n)) continue e;
                t.push(n)
            }
        }
        return t
    }
    function Un(e, t, n) {
        if (e) {
            var r = e.length;
            return t == null || n ? e[r - 1] : P.call(e, -t || r)
        }
    }
    function zn(e, t, n) {
        if (!e) return -1;
        var r = e.length;
        n && typeof n == "number" && (r = (n < 0 ? Math.max(0, r + n) : Math.min(n, r - 1)) + 1);
        while (r--) if (e[r] === t) return r;
        return -1
    }
    function Wn(e, t, n) {
        var r = -Infinity,
            i = r;
        if (!e) return i;
        var s, o = -1,
            u = e.length;
        if (!t) {
            while (++o < u) e[o] > i && (i = e[o]);
            return i
        }
        n && (t = Pt(t, n));
        while (++o < u) s = t(e[o], o, e), s > r && (r = s, i = e[o]);
        return i
    }
    function Xn(e, t, n) {
        var r = Infinity,
            i = r;
        if (!e) return i;
        var s, o = -1,
            u = e.length;
        if (!t) {
            while (++o < u) e[o] < i && (i = e[o]);
            return i
        }
        n && (t = Pt(t, n));
        while (++o < u) s = t(e[o], o, e), s < r && (r = s, i = e[o]);
        return i
    }
    function Vn(e, t, n) {
        e = +e || 0, n = +n || 1, t == null && (t = e, e = 0);
        var r = -1,
            i = Math.max(0, Math.ceil((t - e) / n)),
            s = Array(i);
        while (++r < i) s[r] = e, e += n;
        return s
    }
    function $n(e, t, n) {
        return e ? P.call(e, t == null || n ? 1 : t) : []
    }
    function Jn(e) {
        if (!e) return [];
        var t, n = -1,
            r = e.length,
            i = Array(r);
        while (++n < r) t = Math.floor(Math.random() * (n + 1)), i[n] = i[t], i[t] = e[n];
        return i
    }
    function Kn(e, t, n, r) {
        if (!e) return 0;
        var i, s = 0,
            o = e.length;
        if (n) {
            r && (n = nr(n, r)), t = n(t);
            while (s < o) i = s + o >>> 1, n(e[i]) < t ? s = i + 1 : o = i
        } else while (s < o) i = s + o >>> 1, e[i] < t ? s = i + 1 : o = i;
        return s
    }
    function Qn() {
        var e = -1,
            t = [],
            n = O.apply(t, arguments),
            r = n.length;
        while (++e < r) In(t, n[e]) < 0 && t.push(n[e]);
        return t
    }
    function Gn(e, t, n, r) {
        var i = [];
        if (!e) return i;
        var s, o = -1,
            u = e.length,
            a = [];
        typeof t == "function" && (r = n, n = t, t = !1), n ? r && (n = Pt(n, r)) : n = dr;
        while (++o < u) {
            s = n(e[o], o, e);
            if (t ? !o || a[a.length - 1] !== s : In(a, s) < 0) a.push(s), i.push(e[o])
        }
        return i
    }
    function Yn(e) {
        var t = [];
        if (!e) return t;
        var n = -1,
            r = e.length,
            i = Lt(arguments, 1, 20);
        while (++n < r) i(e[n]) || t.push(e[n]);
        return t
    }
    function Zn(e) {
        if (!e) return [];
        var t = -1,
            n = Wn(kn(arguments, "length")),
            r = Array(n);
        while (++t < n) r[t] = kn(arguments, t);
        return r
    }
    function er(e, t) {
        if (!e) return {};
        var n = -1,
            r = e.length,
            i = {};
        t || (t = []);
        while (++n < r) i[e[n]] = t[n];
        return i
    }
    function tr(e, t) {
        return e < 1 ? t() : function() {
            if (--e < 1) return t.apply(this, arguments)
        }
    }
    function nr(e, t) {
        function s() {
            var o = arguments,
                u = t;
            r || (e = t[n]), i.length && (o = o.length ? i.concat(P.call(o)) : i);
            if (this instanceof s) {
                Ht.prototype = e.prototype, u = new Ht;
                var a = e.apply(u, o);
                return a && dt[typeof a] ? a : u
            }
            return e.apply(u, o)
        }
        var n, r = Ut(e);
        if (!r) n = t, t = e;
        else if (ot || B && arguments.length > 2) return B.call.apply(B, arguments);
        var i = P.call(arguments, 2);
        return s
    }
    function ir() {
        var e = arguments;
        return function() {
            var t = arguments,
                n = e.length;
            while (n--) t = [e[n].apply(this, t)];
            return t[0]
        }
    }
    function sr(e, t, n) {
        function u() {
            o = null, n || e.apply(s, r)
        }
        var r, i, s, o;
        return function() {
            var a = n && !o;
            return r = arguments, s = this, K(o), o = Q(u, t), a && (i = e.apply(s, r)), i
        }
    }
    function or(e, n) {
        var r = P.call(arguments, 2);
        return Q(function() {
            return e.apply(t, r)
        }, n)
    }
    function ur(e) {
        var n = P.call(arguments, 1);
        return Q(function() {
            return e.apply(t, n)
        }, 1)
    }
    function ar(e, t) {
        var n = {};
        return function() {
            var r = t ? t.apply(this, arguments) : arguments[0];
            return M.call(n, r) ? n[r] : n[r] = e.apply(this, arguments)
        }
    }
    function fr(e) {
        var t, n = !1;
        return function() {
            return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t)
        }
    }
    function lr(e) {
        var t = P.call(arguments, 1),
            n = t.length;
        return function() {
            var r, i = arguments;
            return i.length && (t.length = n, _.apply(t, i)), r = t.length == 1 ? e.call(this, t[0]) : e.apply(this, t), t.length = n, r
        }
    }
    function cr(e, t) {
        function u() {
            o = new Date, s = null, e.apply(i, n)
        }
        var n, r, i, s, o = 0;
        return function() {
            var a = new Date,
                f = t - (a - o);
            return n = arguments, i = this, f <= 0 ? (o = a, r = e.apply(i, n)) : s || (s = Q(u, f)), r
        }
    }
    function hr(e, t) {
        return function() {
            var n = [e];
            return arguments.length && _.apply(n, arguments), t.apply(this, n)
        }
    }
    function pr(e) {
        return e == null ? "" : (e + "").replace(T, Dt)
    }
    function dr(e) {
        return e
    }
    function vr(e) {
        xn(Gt(e), function(t) {
            var n = mt[t] = e[t];
            gt.prototype[t] = function() {
                var e = [this._wrapped];
                arguments.length && _.apply(e, arguments);
                var t = n.apply(mt, e);
                return this._chain && (t = new gt(t), t._chain = !0), t
            }
        })
    }
    function mr() {
        return e._ = d, this
    }
    function gr(e, t) {
        if (!e) return null;
        var n = e[t];
        return Ut(n) ? e[t]() : n
    }
    function yr(e, t, o) {
        o || (o = {}), e += "";
        var u, a, f = o.escape,
            l = o.evaluate,
            c = o.interpolate,
            h = mt.templateSettings,
            p = o.variable || h.variable,
            d = p;
        f == null && (f = h.escape), l == null && (l = h.evaluate || !1), c == null && (c = h.interpolate), f && (e = e.replace(f, Bt)), c && (e = e.replace(c, Ft)), l != n && (n = l, s = RegExp("<e%-([\\s\\S]+?)%>|<e%=([\\s\\S]+?)%>" + (l ? "|" + l.source : ""), "g")), u = A.length, e = e.replace(s, jt), u = u != A.length, e = "__p += '" + e.replace(N, _t).replace(x, Mt) + "';\n", A.length = 0, d || (p = r || "obj", u ? e = "with (" + p + ") {\n" + e + "\n}\n" : (p != r && (r = p, i = RegExp("(\\(\\s*)" + p + "\\." + p + "\\b", "g")), e = e.replace(E, "$&" + p + ".").replace(i, "$1__d"))), e = (u ? e.replace(g, "") : e).replace(y, "$1").replace(b, "$1;"), e = "function(" + p + ") {\n" + (d ? "" : p + " || (" + p + " = {});\n") + "var __t, __p = '', __e = _.escape" + (u ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : (d ? "" : ", __d = " + p + "." + p + " || " + p) + ";\n") + e + "return __p\n}", ft && (e += "\n//@ sourceURL=/lodash/template/source[" + k+++"]");
        try {
            a = Function("_", "return " + e)(mt)
        } catch (v) {
            a = function() {
                throw v
            }
        }
        return t ? a(t) : (a.source = e, a)
    }
    function br(e, t, n) {
        var r = -1;
        if (n) while (++r < e) t.call(n, r);
        else while (++r < e) t(r)
    }
    function wr(e) {
        return e == null ? "" : (e + "").replace(m, It)
    }
    function Er(e) {
        var t = h++;
        return e ? e + t : t
    }
    function Sr(e) {
        return e = new gt(e), e._chain = !0, e
    }
    function xr(e, t) {
        return t(e), e
    }
    function Tr() {
        return this._chain = !0, this
    }
    function Nr() {
        return this._wrapped
    }
    var n, r, i, s, o = typeof exports == "object" && exports && (typeof global == "object" && global && global == global.global && (e = global), exports),
        u = Array.prototype,
        a = Boolean.prototype,
        f = Object.prototype,
        l = Number.prototype,
        c = String.prototype,
        h = 0,
        p = 30,
        d = e._,
        v = /[-+=!~*%&^<>|{(\/]|\[\D|\b(?:delete|in|instanceof|new|typeof|void)\b/,
        m = /&(?:amp|lt|gt|quot|#x27);/g,
        g = /\b__p \+= '';/g,
        y = /\b(__p \+=) '' \+/g,
        b = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
        w = /\w*$/,
        E = /(?:__e|__t = )\(\s*(?![\d\s"']|this\.)/g,
        S = RegExp("^" + (f.valueOf + "").replace(/[.*+?^=!:${}()|[\]\/\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$"),
        x = /__token__(\d+)/g,
        T = /[&<>"']/g,
        N = /['\n\r\t\u2028\u2029\\]/g,
        C = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
        k = 0,
        L = "__token__",
        A = [],
        O = u.concat,
        M = f.hasOwnProperty,
        _ = u.push,
        D = f.propertyIsEnumerable,
        P = u.slice,
        H = f.toString,
        B = S.test(B = P.bind) && B,
        j = S.test(j = Array.isArray) && j,
        F = e.isFinite,
        I = S.test(I = Object.keys) && I,
        q = "[object Arguments]",
        R = "[object Array]",
        U = "[object Boolean]",
        z = "[object Date]",
        W = "[object Function]",
        X = "[object Number]",
        V = "[object Object]",
        $ = "[object RegExp]",
        J = "[object String]",
        K = e.clearTimeout,
        Q = e.setTimeout,
        G, Y, Z, et = !0;
    (function() {
        function n() {
            this.x = 1
        }
        var e = {
            0: 1,
            length: 1
        },
            t = [];
        n.prototype = {
            valueOf: 1,
            y: 1
        };
        for (var r in new n) t.push(r);
        for (r in arguments) et = !r;
        G = (t + "").length < 4, Z = t[0] != "x", Y = (t.splice.call(e, 0, 1), e[0])
    })(1);
    var tt = !qt(arguments),
        nt = P.call("x")[0] != "x",
        rt = "x" [0] + Object("x")[0] != "xx";
    try {
        var it = ({
            toString: 0
        } + "", H.call(e.document || 0) == V)
    } catch (st) {}
    var ot = B && /\n|Opera/.test(B + H.call(e.opera)),
        ut = I && /^.+$|true/.test(I + !! e.attachEvent),
        at = !ot;
    try {
        var ft = (Function("//@")(), !e.attachEvent)
    } catch (st) {}
    var lt = {};
    lt[U] = lt[z] = lt[W] = lt[X] = lt[V] = lt[$] = !1, lt[q] = lt[R] = lt[J] = !0;
    var ct = {};
    ct[q] = ct[W] = !1, ct[R] = ct[U] = ct[z] = ct[X] = ct[V] = ct[$] = ct[J] = !0;
    var ht = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;"
    },
        pt = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"',
            "&#x27;": "'"
        },
        dt = {
            "boolean": !1,
            "function": !0,
            object: !0,
            number: !1,
            string: !1,
            "undefined": !1,
            unknown: !0
        },
        vt = {
            "\\": "\\",
            "'": "'",
            "\n": "n",
            "\r": "r",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        };
    mt.templateSettings = {
        escape: /<%-([\s\S]+?)%>/g,
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        variable: ""
    };
    var yt = yr("<% if (useStrict) { %>'use strict';\n<% } %>var index, value, iteratee = <%= firstArg %>, result<% if (init) { %> = <%= init %><% } %>;\n<%= exit %>;\n<%= top %>;\n<% if (arrayBranch) { %>var length = iteratee.length; index = -1;  <% if (objectBranch) { %>\nif (length > -1 && length === length >>> 0) {<% } %>  <% if (noCharByIndex) { %>\n  if (toString.call(iteratee) == stringClass) {\n    iteratee = iteratee.split('')\n  }  <% } %>\n  <%= arrayBranch.beforeLoop %>;\n  while (++index < length) {\n    value = iteratee[index];\n    <%= arrayBranch.inLoop %>\n  }  <% if (objectBranch) { %>\n}<% } %><% } %><% if (objectBranch) { %>  <% if (arrayBranch) { %>\nelse {  <%  } else if (noArgsEnum) { %>\n  var length = iteratee.length; index = -1;\n  if (length && isArguments(iteratee)) {\n    while (++index < length) {\n      value = iteratee[index += ''];\n      <%= objectBranch.inLoop %>\n    }\n  } else {  <% } %>  <% if (!hasDontEnumBug) { %>\n  var skipProto = typeof iteratee == 'function' && \n    propertyIsEnumerable.call(iteratee, 'prototype');\n  <% } %>  <% if (isKeysFast && useHas) { %>\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iteratee] ? nativeKeys(iteratee) : [],\n      length = ownProps.length;\n\n  <%= objectBranch.beforeLoop %>;\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n    <% if (!hasDontEnumBug) { %>if (!(skipProto && index == 'prototype')) {\n  <% } %>    value = iteratee[index];\n    <%= objectBranch.inLoop %>\n    <% if (!hasDontEnumBug) { %>}\n<% } %>  }  <% } else { %>\n  <%= objectBranch.beforeLoop %>;\n  for (index in iteratee) {    <% if (!hasDontEnumBug || useHas) { %>\n    if (<%      if (!hasDontEnumBug) { %>!(skipProto && index == 'prototype')<% }      if (!hasDontEnumBug && useHas) { %> && <% }      if (useHas) { %>hasOwnProperty.call(iteratee, index)<% }    %>) {    <% } %>\n    value = iteratee[index];\n    <%= objectBranch.inLoop %>;\n    <% if (!hasDontEnumBug || useHas) { %>}\n<% } %>  }  <% } %>  <% if (hasDontEnumBug) { %>\n\n  var ctor = iteratee.constructor;\n    <% for (var k = 0; k < 7; k++) { %>\n  index = '<%= shadowed[k] %>';\n  if (<%      if (shadowed[k] == 'constructor') {        %>!(ctor && ctor.prototype === iteratee) && <%      } %>hasOwnProperty.call(iteratee, index)) {\n    value = iteratee[index];\n    <%= objectBranch.inLoop %>\n  }    <% } %>  <% } %>  <% if (arrayBranch || noArgsEnum) { %>\n}<% } %><% } %>\n<%= bottom %>;\nreturn result"),
        bt = {
            args: "collection, callback, thisArg",
            init: "collection",
            top: "if (!callback) {\n  callback = identity\n}\nelse if (thisArg) {\n  callback = iteratorBind(callback, thisArg)\n}",
            inLoop: "if (callback(value, index, collection) === false) return result"
        },
        wt = {
            init: "{}",
            top: "var prop;\nif (typeof callback != 'function') {\n  var valueProp = callback;\n  callback = function(value) { return value[valueProp] }\n}\nelse if (thisArg) {\n  callback = iteratorBind(callback, thisArg)\n}",
            inLoop: "prop = callback(value, index, collection);\n(hasOwnProperty.call(result, prop) ? result[prop]++ : result[prop] = 1)"
        },
        Et = {
            useHas: !1,
            args: "object, callback, thisArg",
            init: "{}",
            top: "var isFunc = typeof callback == 'function';\nif (!isFunc) {\n  var props = concat.apply(ArrayProto, arguments)\n} else if (thisArg) {\n  callback = iteratorBind(callback, thisArg)\n}",
            inLoop: "if (isFunc\n  ? !callback(value, index, object)\n  : indexOf(props, index) < 0\n) result[index] = value"
        },
        St = {
            init: "true",
            inLoop: "if (!callback(value, index, collection)) return !result"
        },
        xt = {
            useHas: !1,
            useStrict: !1,
            args: "object",
            init: "object",
            top: "for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {\n  if (iteratee = arguments[argsIndex]) {",
            inLoop: "result[index] = value",
            bottom: "  }\n}"
        },
        Tt = {
            init: "[]",
            inLoop: "callback(value, index, collection) && result.push(value)"
        },
        Nt = {
            top: "if (thisArg) callback = iteratorBind(callback, thisArg)"
        },
        Ct = {
            inLoop: {
                object: bt.inLoop
            }
        },
        kt = {
            init: "",
            exit: "if (!collection) return []",
            beforeLoop: {
                array: "result = Array(length)",
                object: "result = " + (ut ? "Array(length)" : "[]")
            },
            inLoop: {
                array: "result[index] = callback(value, index, collection)",
                object: "result" + (ut ? "[ownIndex] = " : ".push") + "(callback(value, index, collection))"
            }
        };
    tt && (qt = function(e) {
        return !!e && !! M.call(e, "callee")
    });
    var Rt = j ||
    function(e) {
        return H.call(e) == R
    };
    Ut(/x/) && (Ut = function(e) {
        return H.call(e) == W
    }), zt(dt) || (zt = function(e, t) {
        var n = !1;
        if (!e || typeof e != "object" || !t && qt(e)) return n;
        var r = e.constructor;
        return (!it || typeof e.toString == "function" || typeof(e + "") != "string") && (!Ut(r) || r instanceof r) ? Z ? (Kt(e, function(t, r) {
            return n = !M.call(e, r), !1
        }), n === !1) : (Kt(e, function(e, t) {
            n = t
        }), n === !1 || M.call(e, n)) : n
    });
    var Wt = At({
        args: "object",
        init: "[]",
        inLoop: "result.push(index)"
    }),
        Vt = At(xt, {
            inLoop: "if (result[index] == null) " + xt.inLoop
        }),
        $t = At(Et),
        Jt = At(xt),
        Kt = At(bt, Nt, Ct, {
            useHas: !1
        }),
        Qt = At(bt, Nt, Ct),
        Gt = At({
            useHas: !1,
            args: "object",
            init: "[]",
            inLoop: "if (isFunction(value)) result.push(index)",
            bottom: "result.sort()"
        }),
        nn = At({
            args: "value",
            init: "true",
            top: "var className = toString.call(value),\n    length = value.length;\nif (arrayLikeClasses[className]" + (tt ? " || isArguments(value)" : "") + " ||\n" + "  (className == objectClass && length > -1 && length === length >>> 0 &&\n" + "  isFunction(value.splice))" + ") return !length",
            inLoop: {
                object: "return false"
            }
        }),
        pn = I ?
    function(e) {
        var t = typeof e;
        return t == "function" && D.call(e, "prototype") ? Wt(e) : e && dt[t] ? I(e) : []
    } : Wt, dn = At(xt, {
        args: "object, source, indicator, stack",
        top: "var destValue, found, isArr, stackLength, recursive = indicator == isPlainObject;\nif (!recursive) stack = [];\nfor (var argsIndex = 1, argsLength = recursive ? 2 : arguments.length; argsIndex < argsLength; argsIndex++) {\n  if (iteratee = arguments[argsIndex]) {",
        inLoop: "if (value && ((isArr = isArray(value)) || isPlainObject(value))) {\n  found = false; stackLength = stack.length;\n  while (stackLength--) {\n    if (found = stack[stackLength].source == value) break\n  }\n  if (found) {\n    result[index] = stack[stackLength].value\n  } else {\n    destValue = (destValue = result[index]) && isArr\n      ? (isArray(destValue) ? destValue : [])\n      : (isPlainObject(destValue) ? destValue : {});\n    stack.push({ value: destValue, source: value });\n    result[index] = callee(destValue, value, isPlainObject, stack)\n  }\n} else if (value != null) {\n  result[index] = value\n}"
    }), vn = At(Et, {
        top: "if (typeof callback != 'function') {\n  var prop,\n      props = concat.apply(ArrayProto, arguments),\n      length = props.length;\n  for (index = 1; index < length; index++) {\n    prop = props[index];\n    if (prop in object) result[prop] = object[prop]\n  }\n} else {\n  if (thisArg) callback = iteratorBind(callback, thisArg)",
        inLoop: "if (callback(value, index, object)) result[index] = value",
        bottom: "}"
    }), gn = At({
        args: "object",
        init: "[]",
        inLoop: "result.push(value)"
    }), yn = At({
        args: "collection, target",
        init: "false",
        noCharByIndex: !1,
        beforeLoop: {
            array: "if (toString.call(collection) == stringClass) return collection.indexOf(target) > -1"
        },
        inLoop: "if (value === target) return true"
    }), bn = At(bt, wt), wn = At(bt, St), En = At(bt, Tt), Sn = At(bt, Nt, {
        init: "",
        inLoop: "if (callback(value, index, collection)) return value"
    }), xn = At(bt, Nt), Tn = At(bt, wt, {
        inLoop: "prop = callback(value, index, collection);\n(hasOwnProperty.call(result, prop) ? result[prop] : result[prop] = []).push(value)"
    }), Nn = At(kt, {
        args: "collection, methodName",
        top: "var args = slice.call(arguments, 2),\n    isFunc = typeof methodName == 'function'",
        inLoop: {
            array: "result[index] = (isFunc ? methodName : value[methodName]).apply(value, args)",
            object: "result" + (ut ? "[ownIndex] = " : ".push") + "((isFunc ? methodName : value[methodName]).apply(value, args))"
        }
    }), Cn = At(bt, kt), kn = At(kt, {
        args: "collection, property",
        inLoop: {
            array: "result[index] = value[property]",
            object: "result" + (ut ? "[ownIndex] = " : ".push") + "(value[property])"
        }
    }), Ln = At({
        args: "collection, callback, accumulator, thisArg",
        init: "accumulator",
        top: "var noaccum = arguments.length < 3;\nif (thisArg) callback = iteratorBind(callback, thisArg)",
        beforeLoop: {
            array: "if (noaccum) result = iteratee[++index]"
        },
        inLoop: {
            array: "result = callback(result, value, index, collection)",
            object: "result = noaccum\n  ? (noaccum = false, value)\n  : callback(result, value, index, collection)"
        }
    }), On = At(bt, Tt, {
        inLoop: "!" + Tt.inLoop
    }), Mn = At(bt, St, {
        init: "false",
        inLoop: St.inLoop.replace("!", "")
    }), _n = At(bt, wt, kt, {
        inLoop: {
            array: "result[index] = {\n  criteria: callback(value, index, collection),\n  index: index,\n  value: value\n}",
            object: "result" + (ut ? "[ownIndex] = " : ".push") + "({\n" + "  criteria: callback(value, index, collection),\n" + "  index: index,\n" + "  value: value\n" + "})"
        },
        bottom: "result.sort(compareAscending);\nlength = result.length;\nwhile (length--) {\n  result[length] = result[length].value\n}"
    }), Pn = At(Tt, {
        args: "collection, properties",
        top: "var props = [];\nforIn(properties, function(value, prop) { props.push(prop) });\nvar propsLength = props.length",
        inLoop: "for (var prop, pass = true, propIndex = 0; propIndex < propsLength; propIndex++) {\n  prop = props[propIndex];\n  if (!(pass = value[prop] === properties[prop])) break\n}\npass && result.push(value)"
    }), rr = At({
        useHas: !1,
        useStrict: !1,
        args: "object",
        init: "object",
        top: "var funcs = arguments,\n    length = funcs.length;\nif (length > 1) {\n  for (var index = 1; index < length; index++) {\n    result[funcs[index]] = bind(result[funcs[index]], result)\n  }\n  return result\n}",
        inLoop: "if (isFunction(result[index])) {\n  result[index] = bind(result[index], result)\n}"
    });
    mt.VERSION = "0.6.1", mt.after = tr, mt.bind = nr, mt.bindAll = rr, mt.chain = Sr, mt.clone = Xt, mt.compact = Hn, mt.compose = ir, mt.contains = yn, mt.countBy = bn, mt.debounce = sr, mt.defaults = Vt, mt.defer = ur, mt.delay = or, mt.difference = Bn, mt.drop = $t, mt.escape = pr, mt.every = wn, mt.extend = Jt, mt.filter = En, mt.find = Sn, mt.first = jn, mt.flatten = Fn, mt.forEach = xn, mt.forIn = Kt, mt.forOwn = Qt, mt.functions = Gt, mt.groupBy = Tn, mt.has = Yt, mt.identity = dr, mt.indexOf = In, mt.initial = qn, mt.intersection = Rn, mt.invoke = Nn, mt.isArguments = qt, mt.isArray = Rt, mt.isBoolean = Zt, mt.isDate = en, mt.isElement = tn, mt.isEmpty = nn, mt.isEqual = rn, mt.isFinite = sn, mt.isFunction = Ut, mt.isNaN = un, mt.isNull = an, mt.isNumber = fn, mt.isObject = on, mt.isRegExp = ln, mt.isString = cn, mt.isUndefined = hn, mt.keys = pn, mt.last = Un, mt.lastIndexOf = zn, mt.map = Cn, mt.max = Wn, mt.memoize = ar, mt.merge = dn, mt.min = Xn, mt.mixin = vr, mt.noConflict = mr, mt.once = fr, mt.partial = lr, mt.pick = vn, mt.pluck = kn, mt.range = Vn, mt.reduce = Ln, mt.reduceRight = An, mt.reject = On, mt.rest = $n, mt.result = gr, mt.shuffle = Jn, mt.size = mn, mt.some = Mn, mt.sortBy = _n, mt.sortedIndex = Kn, mt.tap = xr, mt.template = yr, mt.throttle = cr, mt.times = br, mt.toArray = Dn, mt.unescape = wr, mt.union = Qn, mt.uniq = Gn, mt.uniqueId = Er, mt.values = gn, mt.where = Pn, mt.without = Yn, mt.wrap = hr, mt.zip = Zn, mt.zipObject = er, mt.all = wn, mt.any = Mn, mt.collect = Cn, mt.detect = Sn, mt.each = xn, mt.foldl = Ln, mt.foldr = An, mt.head = jn, mt.include = yn, mt.inject = Ln, mt.methods = Gt, mt.omit = $t, mt.select = En, mt.tail = $n, mt.take = jn, mt.unique = Gn, mt._iteratorTemplate = yt, mt._shimKeys = Wt, gt.prototype = mt.prototype, vr(mt), gt.prototype.chain = Tr, gt.prototype.value = Nr, xn(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
        var t = u[e];
        gt.prototype[e] = function() {
            var e = this._wrapped;
            return t.apply(e, arguments), Y && e.length === 0 && delete e[0], this._chain && (e = new gt(e), e._chain = !0), e
        }
    }), xn(["concat", "join", "slice"], function(e) {
        var t = u[e];
        gt.prototype[e] = function() {
            var e = this._wrapped,
                n = t.apply(e, arguments);
            return this._chain && (n = new gt(n), n._chain = !0), n
        }
    }), typeof define == "function" && typeof define.amd == "object" && define.amd ? (e._ = mt, define(function() {
        return mt
    })) : o ? typeof module == "object" && module && module.exports == o ? (module.exports = mt)._ = mt : o._ = mt : e._ = mt
}(this), function() {
    var e = this,
        t = e.Backbone,
        n = Array.prototype.slice,
        r = Array.prototype.splice,
        i;
    typeof exports != "undefined" ? i = exports : i = e.Backbone = {}, i.VERSION = "0.9.2";
    var s = e._;
    !s && typeof require != "undefined" && (s = require("underscore"));
    var o = e.jQuery || e.Zepto || e.ender;
    i.setDomLibrary = function(e) {
        o = e
    }, i.noConflict = function() {
        return e.Backbone = t, this
    }, i.emulateHTTP = !1, i.emulateJSON = !1;
    var u = /\s+/,
        a = i.Events = {
            on: function(e, t, n) {
                var r, i, s, o, a;
                if (!t) return this;
                e = e.split(u), r = this._callbacks || (this._callbacks = {});
                while (i = e.shift()) a = r[i], s = a ? a.tail : {}, s.next = o = {}, s.context = n, s.callback = t, r[i] = {
                    tail: o,
                    next: a ? a.next : s
                };
                return this
            },
            off: function(e, t, n) {
                var r, i, o, a, f, l;
                if (!(i = this._callbacks)) return;
                if (!(e || t || n)) return delete this._callbacks, this;
                e = e ? e.split(u) : s.keys(i);
                while (r = e.shift()) {
                    o = i[r], delete i[r];
                    if (!o || !t && !n) continue;
                    a = o.tail;
                    while ((o = o.next) !== a) f = o.callback, l = o.context, (t && f !== t || n && l !== n) && this.on(r, f, l)
                }
                return this
            },
            trigger: function(e) {
                var t, r, i, s, o, a, f;
                if (!(i = this._callbacks)) return this;
                a = i.all, e = e.split(u), f = n.call(arguments, 1);
                while (t = e.shift()) {
                    if (r = i[t]) {
                        s = r.tail;
                        while ((r = r.next) !== s) r.callback.apply(r.context || this, f)
                    }
                    if (r = a) {
                        s = r.tail, o = [t].concat(f);
                        while ((r = r.next) !== s) r.callback.apply(r.context || this, o)
                    }
                }
                return this
            }
        };
    a.bind = a.on, a.unbind = a.off;
    var f = i.Model = function(e, t) {
            var n;
            e || (e = {}), t && t.parse && (e = this.parse(e));
            if (n = C(this, "defaults")) e = s.extend({}, n, e);
            t && t.collection && (this.collection = t.collection), this.attributes = {}, this._escapedAttributes = {}, this.cid = s.uniqueId("c"), this.changed = {}, this._silent = {}, this._pending = {}, this.set(e, {
                silent: !0
            }), this.changed = {}, this._silent = {}, this._pending = {}, this._previousAttributes = s.clone(this.attributes), this.initialize.apply(this, arguments)
        };
    s.extend(f.prototype, a, {
        changed: null,
        _silent: null,
        _pending: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function(e) {
            return s.clone(this.attributes)
        },
        get: function(e) {
            return this.attributes[e]
        },
        escape: function(e) {
            var t;
            if (t = this._escapedAttributes[e]) return t;
            var n = this.get(e);
            return this._escapedAttributes[e] = s.escape(n == null ? "" : "" + n)
        },
        has: function(e) {
            return this.get(e) != null
        },
        set: function(e, t, n) {
            var r, i, o;
            s.isObject(e) || e == null ? (r = e, n = t) : (r = {}, r[e] = t), n || (n = {});
            if (!r) return this;
            r instanceof f && (r = r.attributes);
            if (n.unset) for (i in r) r[i] = void 0;
            if (!this._validate(r, n)) return !1;
            this.idAttribute in r && (this.id = r[this.idAttribute]);
            var u = n.changes = {},
                a = this.attributes,
                l = this._escapedAttributes,
                c = this._previousAttributes || {};
            for (i in r) {
                o = r[i];
                if (!s.isEqual(a[i], o) || n.unset && s.has(a, i)) delete l[i], (n.silent ? this._silent : u)[i] = !0;
                n.unset ? delete a[i] : a[i] = o, !s.isEqual(c[i], o) || s.has(a, i) != s.has(c, i) ? (this.changed[i] = o, n.silent || (this._pending[i] = !0)) : (delete this.changed[i], delete this._pending[i])
            }
            return n.silent || this.change(n), this
        },
        unset: function(e, t) {
            return (t || (t = {})).unset = !0, this.set(e, null, t)
        },
        clear: function(e) {
            return (e || (e = {})).unset = !0, this.set(s.clone(this.attributes), e)
        },
        fetch: function(e) {
            e = e ? s.clone(e) : {};
            var t = this,
                n = e.success;
            return e.success = function(r, i, s) {
                if (!t.set(t.parse(r, s), e)) return !1;
                n && n(t, r)
            }, e.error = i.wrapError(e.error, t, e), (this.sync || i.sync).call(this, "read", this, e)
        },
        save: function(e, t, n) {
            var r, o;
            s.isObject(e) || e == null ? (r = e, n = t) : (r = {}, r[e] = t), n = n ? s.clone(n) : {};
            if (n.wait) {
                if (!this._validate(r, n)) return !1;
                o = s.clone(this.attributes)
            }
            var u = s.extend({}, n, {
                silent: !0
            });
            if (r && !this.set(r, n.wait ? u : n)) return !1;
            var a = this,
                f = n.success;
            n.success = function(e, t, i) {
                var o = a.parse(e, i);
                n.wait && (delete n.wait, o = s.extend(r || {}, o));
                if (!a.set(o, n)) return !1;
                f ? f(a, e) : a.trigger("sync", a, e, n)
            }, n.error = i.wrapError(n.error, a, n);
            var l = this.isNew() ? "create" : "update",
                c = (this.sync || i.sync).call(this, l, this, n);
            return n.wait && this.set(o, u), c
        },
        destroy: function(e) {
            e = e ? s.clone(e) : {};
            var t = this,
                n = e.success,
                r = function() {
                    t.trigger("destroy", t, t.collection, e)
                };
            if (this.isNew()) return r(), !1;
            e.success = function(i) {
                e.wait && r(), n ? n(t, i) : t.trigger("sync", t, i, e)
            }, e.error = i.wrapError(e.error, t, e);
            var o = (this.sync || i.sync).call(this, "delete", this, e);
            return e.wait || r(), o
        },
        url: function() {
            var e = C(this, "urlRoot") || C(this.collection, "url") || k();
            return this.isNew() ? e : e + (e.charAt(e.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(e, t) {
            return e
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return this.id == null
        },
        change: function(e) {
            e || (e = {});
            var t = this._changing;
            this._changing = !0;
            for (var n in this._silent) this._pending[n] = !0;
            var r = s.extend({}, e.changes, this._silent);
            this._silent = {};
            for (var n in r) this.trigger("change:" + n, this, this.get(n), e);
            if (t) return this;
            while (!s.isEmpty(this._pending)) {
                this._pending = {}, this.trigger("change", this, e);
                for (var n in this.changed) {
                    if (this._pending[n] || this._silent[n]) continue;
                    delete this.changed[n]
                }
                this._previousAttributes = s.clone(this.attributes)
            }
            return this._changing = !1, this
        },
        hasChanged: function(e) {
            return arguments.length ? s.has(this.changed, e) : !s.isEmpty(this.changed)
        },
        changedAttributes: function(e) {
            if (!e) return this.hasChanged() ? s.clone(this.changed) : !1;
            var t, n = !1,
                r = this._previousAttributes;
            for (var i in e) {
                if (s.isEqual(r[i], t = e[i])) continue;
                (n || (n = {}))[i] = t
            }
            return n
        },
        previous: function(e) {
            return !arguments.length || !this._previousAttributes ? null : this._previousAttributes[e]
        },
        previousAttributes: function() {
            return s.clone(this._previousAttributes)
        },
        isValid: function() {
            return !this.validate(this.attributes)
        },
        _validate: function(e, t) {
            if (t.silent || !this.validate) return !0;
            e = s.extend({}, this.attributes, e);
            var n = this.validate(e, t);
            return n ? (t && t.error ? t.error(this, n, t) : this.trigger("error", this, n, t), !1) : !0
        }
    });
    var l = i.Collection = function(e, t) {
            t || (t = {}), t.model && (this.model = t.model), t.comparator && (this.comparator = t.comparator), this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, {
                silent: !0,
                parse: t.parse
            })
        };
    s.extend(l.prototype, a, {
        model: f,
        initialize: function() {},
        toJSON: function(e) {
            return this.map(function(t) {
                return t.toJSON(e)
            })
        },
        add: function(e, t) {
            var n, i, o, u, a, f, l = {},
                c = {},
                h = [];
            t || (t = {}), e = s.isArray(e) ? e.slice() : [e];
            for (n = 0, o = e.length; n < o; n++) {
                if (!(u = e[n] = this._prepareModel(e[n], t))) throw new Error("Can't add an invalid model to a collection");
                a = u.cid, f = u.id;
                if (l[a] || this._byCid[a] || f != null && (c[f] || this._byId[f])) {
                    h.push(n);
                    continue
                }
                l[a] = c[f] = u
            }
            n = h.length;
            while (n--) e.splice(h[n], 1);
            for (n = 0, o = e.length; n < o; n++)(u = e[n]).on("all", this._onModelEvent, this), this._byCid[u.cid] = u, u.id != null && (this._byId[u.id] = u);
            this.length += o, i = t.at != null ? t.at : this.models.length, r.apply(this.models, [i, 0].concat(e)), this.comparator && this.sort({
                silent: !0
            });
            if (t.silent) return this;
            for (n = 0, o = this.models.length; n < o; n++) {
                if (!l[(u = this.models[n]).cid]) continue;
                t.index = n, u.trigger("add", u, this, t)
            }
            return this
        },
        remove: function(e, t) {
            var n, r, i, o;
            t || (t = {}), e = s.isArray(e) ? e.slice() : [e];
            for (n = 0, r = e.length; n < r; n++) {
                o = this.getByCid(e[n]) || this.get(e[n]);
                if (!o) continue;
                delete this._byId[o.id], delete this._byCid[o.cid], i = this.indexOf(o), this.models.splice(i, 1), this.length--, t.silent || (t.index = i, o.trigger("remove", o, this, t)), this._removeReference(o)
            }
            return this
        },
        push: function(e, t) {
            return e = this._prepareModel(e, t), this.add(e, t), e
        },
        pop: function(e) {
            var t = this.at(this.length - 1);
            return this.remove(t, e), t
        },
        unshift: function(e, t) {
            return e = this._prepareModel(e, t), this.add(e, s.extend({
                at: 0
            }, t)), e
        },
        shift: function(e) {
            var t = this.at(0);
            return this.remove(t, e), t
        },
        get: function(e) {
            return e == null ? void 0 : this._byId[e.id != null ? e.id : e]
        },
        getByCid: function(e) {
            return e && this._byCid[e.cid || e]
        },
        at: function(e) {
            return this.models[e]
        },
        where: function(e) {
            return s.isEmpty(e) ? [] : this.filter(function(t) {
                for (var n in e) if (e[n] !== t.get(n)) return !1;
                return !0
            })
        },
        sort: function(e) {
            e || (e = {});
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            var t = s.bind(this.comparator, this);
            return this.comparator.length == 1 ? this.models = this.sortBy(t) : this.models.sort(t), e.silent || this.trigger("reset", this, e), this
        },
        pluck: function(e) {
            return s.map(this.models, function(t) {
                return t.get(e)
            })
        },
        reset: function(e, t) {
            e || (e = []), t || (t = {});
            for (var n = 0, r = this.models.length; n < r; n++) this._removeReference(this.models[n]);
            return this._reset(), this.add(e, s.extend({
                silent: !0
            }, t)), t.silent || this.trigger("reset", this, t), this
        },
        fetch: function(e) {
            e = e ? s.clone(e) : {}, e.parse === undefined && (e.parse = !0);
            var t = this,
                n = e.success;
            return e.success = function(r, i, s) {
                t[e.add ? "add" : "reset"](t.parse(r, s), e), n && n(t, r)
            }, e.error = i.wrapError(e.error, t, e), (this.sync || i.sync).call(this, "read", this, e)
        },
        create: function(e, t) {
            var n = this;
            t = t ? s.clone(t) : {}, e = this._prepareModel(e, t);
            if (!e) return !1;
            t.wait || n.add(e, t);
            var r = t.success;
            return t.success = function(i, s, o) {
                t.wait && n.add(i, t), r ? r(i, s) : i.trigger("sync", e, s, t)
            }, e.save(null, t), e
        },
        parse: function(e, t) {
            return e
        },
        chain: function() {
            return s(this.models).chain()
        },
        _reset: function(e) {
            this.length = 0, this.models = [], this._byId = {}, this._byCid = {}
        },
        _prepareModel: function(e, t) {
            t || (t = {});
            if (e instanceof f) e.collection || (e.collection = this);
            else {
                var n = e;
                t.collection = this, e = new this.model(n, t), e._validate(e.attributes, t) || (e = !1)
            }
            return e
        },
        _removeReference: function(e) {
            this == e.collection && delete e.collection, e.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(e, t, n, r) {
            if ((e == "add" || e == "remove") && n != this) return;
            e == "destroy" && this.remove(t, r), t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], this._byId[t.id] = t), this.trigger.apply(this, arguments)
        }
    });
    var c = ["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy"];
    s.each(c, function(e) {
        l.prototype[e] = function() {
            return s[e].apply(s, [this.models].concat(s.toArray(arguments)))
        }
    });
    var h = i.Router = function(e) {
            e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
        },
        p = /:\w+/g,
        d = /\*\w+/g,
        v = /[-[\]{}()+?.,\\^$|#\s]/g;
    s.extend(h.prototype, a, {
        initialize: function() {},
        route: function(e, t, n) {
            return i.history || (i.history = new m), s.isRegExp(e) || (e = this._routeToRegExp(e)), n || (n = this[t]), i.history.route(e, s.bind(function(r) {
                var s = this._extractParameters(e, r);
                n && n.apply(this, s), this.trigger.apply(this, ["route:" + t].concat(s)), i.history.trigger("route", this, t, s)
            }, this)), this
        },
        navigate: function(e, t) {
            i.history.navigate(e, t)
        },
        _bindRoutes: function() {
            if (!this.routes) return;
            var e = [];
            for (var t in this.routes) e.unshift([t, this.routes[t]]);
            for (var n = 0, r = e.length; n < r; n++) this.route(e[n][0], e[n][1], this[e[n][1]])
        },
        _routeToRegExp: function(e) {
            return e = e.replace(v, "\\$&").replace(p, "([^/]+)").replace(d, "(.*?)"), new RegExp("^" + e + "$")
        },
        _extractParameters: function(e, t) {
            return e.exec(t).slice(1)
        }
    });
    var m = i.History = function() {
            this.handlers = [], s.bindAll(this, "checkUrl")
        },
        g = /^[#\/]/,
        y = /msie [\w.]+/;
    m.started = !1, s.extend(m.prototype, a, {
        interval: 50,
        getHash: function(e) {
            var t = e ? e.location : window.location,
                n = t.href.match(/#(.*)$/);
            return n ? n[1] : ""
        },
        getFragment: function(e, t) {
            if (e == null) if (this._hasPushState || t) {
                e = window.location.pathname;
                var n = window.location.search;
                n && (e += n)
            } else e = this.getHash();
            return e.indexOf(this.options.root) || (e = e.substr(this.options.root.length)), e.replace(g, "")
        },
        start: function(e) {
            if (m.started) throw new Error("Backbone.history has already been started");
            m.started = !0, this.options = s.extend({}, {
                root: "/"
            }, this.options, e), this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !! this.options.pushState, this._hasPushState = !! (this.options.pushState && window.history && window.history.pushState);
            var t = this.getFragment(),
                n = document.documentMode,
                r = y.exec(navigator.userAgent.toLowerCase()) && (!n || n <= 7);
            r && (this.iframe = o('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(t)), this._hasPushState ? o(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !r ? o(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = t;
            var i = window.location,
                u = i.pathname == this.options.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !u) return this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0;
            this._wantsPushState && this._hasPushState && u && i.hash && (this.fragment = this.getHash().replace(g, ""), window.history.replaceState({}, document.title, i.protocol + "//" + i.host + this.options.root + this.fragment));
            if (!this.options.silent) return this.loadUrl()
        },
        stop: function() {
            o(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), m.started = !1
        },
        route: function(e, t) {
            this.handlers.unshift({
                route: e,
                callback: t
            })
        },
        checkUrl: function(e) {
            var t = this.getFragment();
            t == this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe)));
            if (t == this.fragment) return !1;
            this.iframe && this.navigate(t), this.loadUrl() || this.loadUrl(this.getHash())
        },
        loadUrl: function(e) {
            var t = this.fragment = this.getFragment(e),
                n = s.any(this.handlers, function(e) {
                    if (e.route.test(t)) return e.callback(t), !0
                });
            return n
        },
        navigate: function(e, t) {
            if (!m.started) return !1;
            if (!t || t === !0) t = {
                trigger: t
            };
            var n = (e || "").replace(g, "");
            if (this.fragment == n) return;
            this._hasPushState ? (n.indexOf(this.options.root) != 0 && (n = this.options.root + n), this.fragment = n, window.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n)) : this._wantsHashChange ? (this.fragment = n, this._updateHash(window.location, n, t.replace), this.iframe && n != this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, n, t.replace))) : window.location.assign(this.options.root + e), t.trigger && this.loadUrl(e)
        },
        _updateHash: function(e, t, n) {
            n ? e.replace(e.toString().replace(/(javascript:|#).*$/, "") + "#" + t) : e.hash = t
        }
    });
    var b = i.View = function(e) {
            this.cid = s.uniqueId("view"), this._configure(e || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
        },
        w = /^(\S+)\s*(.*)$/,
        E = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
    s.extend(b.prototype, a, {
        tagName: "div",
        $: function(e) {
            return this.$el.find(e)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            return this.$el.remove(), this
        },
        make: function(e, t, n) {
            var r = document.createElement(e);
            return t && o(r).attr(t), n && o(r).html(n), r
        },
        setElement: function(e, t) {
            return this.$el && this.undelegateEvents(), this.$el = e instanceof o ? e : o(e), this.el = this.$el[0], t !== !1 && this.delegateEvents(), this
        },
        delegateEvents: function(e) {
            if (!e && !(e = C(this, "events"))) return;
            this.undelegateEvents();
            for (var t in e) {
                var n = e[t];
                s.isFunction(n) || (n = this[e[t]]);
                if (!n) throw new Error('Method "' + e[t] + '" does not exist');
                var r = t.match(w),
                    i = r[1],
                    o = r[2];
                n = s.bind(n, this), i += ".delegateEvents" + this.cid, o === "" ? this.$el.bind(i, n) : this.$el.delegate(o, i, n)
            }
        },
        undelegateEvents: function() {
            this.$el.unbind(".delegateEvents" + this.cid)
        },
        _configure: function(e) {
            this.options && (e = s.extend({}, this.options, e));
            for (var t = 0, n = E.length; t < n; t++) {
                var r = E[t];
                e.hasOwnProperty(r) && (this[r] = e[r])
            }
            this.options = e
        },
        _ensureElement: function() {
            if (!this.el) {
                var e = C(this, "attributes") || {};
                this.id && (e.id = this.id), this.className && (e["class"] = this.className), this.setElement(this.make(this.tagName, e), !1)
            } else this.setElement(this.el, !1)
        }
    });
    var S = function(e, t) {
            var n = N(this, e, t);
            return n.extend = this.extend, n
        };
    f.extend = l.extend = h.extend = b.extend = S;
    var x = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    i.sync = function(e, t, n) {
        var r = x[e];
        n || (n = {});
        var u = {
            type: r,
            dataType: "json"
        };
        return n.url || (u.url = C(t, "url") || k()), !n.data && t && (e == "create" || e == "update") && (u.contentType = "application/json", u.data = JSON.stringify(t.toJSON())), i.emulateJSON && (u.contentType = "application/x-www-form-urlencoded", u.data = u.data ? {
            model: u.data
        } : {}), i.emulateHTTP && (r === "PUT" || r === "DELETE") && (i.emulateJSON && (u.data._method = r), u.type = "POST", u.beforeSend = function(e) {
            e.setRequestHeader("X-HTTP-Method-Override", r)
        }), u.type !== "GET" && !i.emulateJSON && (u.processData = !1), o.ajax(s.extend(u, n))
    }, i.wrapError = function(e, t, n) {
        return function(r, i) {
            i = r === t ? i : r, e ? e(t, i, n) : t.trigger("error", t, i, n)
        }
    };
    var T = function() {},
        N = function(e, t, n) {
            var r;
            return t && t.hasOwnProperty("constructor") ? r = t.constructor : r = function() {
                e.apply(this, arguments)
            }, s.extend(r, e), T.prototype = e.prototype, r.prototype = new T, t && s.extend(r.prototype, t), n && s.extend(r, n), r.prototype.constructor = r, r.__super__ = e.prototype, r
        },
        C = function(e, t) {
            return !e || !e[t] ? null : s.isFunction(e[t]) ? e[t]() : e[t]
        },
        k = function() {
            throw new Error('A "url" property or function must be specified')
        }
}.call(this);
var store = function() {
        var e = {},
            t = window,
            n = t.document,
            r = "localStorage",
            i = "globalStorage",
            s;
        e.set = function(e, t) {}, e.get = function(e) {}, e.remove = function(e) {}, e.clear = function() {}, e.transact = function(t, n) {
            var r = e.get(t);
            typeof r == "undefined" && (r = {}), n(r), e.set(t, r)
        }, e.serialize = function(e) {
            return $.stringify(e)
        }, e.deserialize = function(e) {
            return typeof e != "string" ? undefined : $.parseJSON(e)
        };
        try {
            if (r in t && t[r]) s = t[r], e.set = function(t, n) {
                s.setItem(t, e.serialize(n))
            }, e.get = function(t) {
                return e.deserialize(s.getItem(t))
            }, e.remove = function(e) {
                s.removeItem(e)
            }, e.clear = function() {
                s.clear()
            };
            else if (i in t && t[i]) s = t[i][t.location.hostname], e.set = function(t, n) {
                s[t] = e.serialize(n)
            }, e.get = function(t) {
                return e.deserialize(s[t] && s[t].value)
            }, e.remove = function(e) {
                delete s[e]
            }, e.clear = function() {
                for (var e in s) delete s[e]
            };
            else if (n.documentElement.addBehavior) {
                s = document.getElementById("userDataTag");
                try {
                    s.load(r)
                } catch (o) {
                    console.log("localStorage turned off"), s.parentNode.removeChild(s), s = null
                }
                function u(t) {
                    return s ?
                    function() {
                        try {
                            var n = Array.prototype.slice.call(arguments, 0);
                            s.load(r);
                            var i = t.apply(e, n);
                            return i
                        } catch (o) {
                            return console.log("localStorage error"), null
                        }
                    } : function() {}
                }
                e.set = u(function(t, n) {
                    t = t.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-"), s.setAttribute(t, e.serialize(n));
                    try {
                        s.save(r)
                    } catch (i) {
                        e.cleanup()
                    }
                }), e.get = u(function(t) {
                    return t = t.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-"), e.deserialize(s.getAttribute(t))
                }), e.remove = u(function(e) {
                    e = e.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-"), s.removeAttribute(e), s.save(r)
                }), e.clear = u(function() {
                    var e = s.XMLDocument.documentElement.attributes;
                    s.load(r);
                    for (var t = 0, n; n = e[t]; t++) s.removeAttribute(n.name);
                    s.save(r)
                }), e.cleanup = u(function() {
                    var e = s.XMLDocument.documentElement.attributes;
                    s.load(r);
                    for (var t = 0, n; n = e[t]; t++) {
                        s.removeAttribute(n.name);
                        try {
                            s.save(r);
                            return
                        } catch (i) {}
                    }
                })
            }
        } catch (o) {}
        return e
    }(),
    swfobject = function() {
        function C() {
            if (b) return;
            try {
                var e = a.getElementsByTagName("body")[0].appendChild(U("span"));
                e.parentNode.removeChild(e)
            } catch (t) {
                return
            }
            b = !0;
            var n = c.length;
            for (var r = 0; r < n; r++) c[r]()
        }
        function k(e) {
            b ? e() : c[c.length] = e
        }
        function L(t) {
            if (typeof u.addEventListener != e) u.addEventListener("load", t, !1);
            else if (typeof a.addEventListener != e) a.addEventListener("load", t, !1);
            else if (typeof u.attachEvent != e) z(u, "onload", t);
            else if (typeof u.onload == "function") {
                var n = u.onload;
                u.onload = function() {
                    n(), t()
                }
            } else u.onload = t
        }
        function A() {
            l ? O() : M()
        }
        function O() {
            var n = a.getElementsByTagName("body")[0],
                r = U(t);
            r.setAttribute("type", i);
            var s = n.appendChild(r);
            if (s) {
                var o = 0;
                (function() {
                    if (typeof s.GetVariable != e) {
                        var t = s.GetVariable("$version");
                        t && (t = t.split(" ")[1].split(","), T.pv = [parseInt(t[0], 10), parseInt(t[1], 10), parseInt(t[2], 10)])
                    } else if (o < 10) {
                        o++, setTimeout(arguments.callee, 10);
                        return
                    }
                    n.removeChild(r), s = null, M()
                })()
            } else M()
        }
        function M() {
            var t = h.length;
            if (t > 0) for (var n = 0; n < t; n++) {
                var r = h[n].id,
                    i = h[n].callbackFn,
                    s = {
                        success: !1,
                        id: r
                    };
                if (T.pv[0] > 0) {
                    var o = R(r);
                    if (o) if (W(h[n].swfVersion) && !(T.wk && T.wk < 312)) V(r, !0), i && (s.success = !0, s.ref = _(r), i(s));
                    else if (h[n].expressInstall && D()) {
                        var u = {};
                        u.data = h[n].expressInstall, u.width = o.getAttribute("width") || "0", u.height = o.getAttribute("height") || "0", o.getAttribute("class") && (u.styleclass = o.getAttribute("class")), o.getAttribute("align") && (u.align = o.getAttribute("align"));
                        var a = {},
                            f = o.getElementsByTagName("param"),
                            l = f.length;
                        for (var c = 0; c < l; c++) f[c].getAttribute("name").toLowerCase() != "movie" && (a[f[c].getAttribute("name")] = f[c].getAttribute("value"));
                        P(u, a, r, i)
                    } else H(o), i && i(s)
                } else {
                    V(r, !0);
                    if (i) {
                        var p = _(r);
                        p && typeof p.SetVariable != e && (s.success = !0, s.ref = p), i(s)
                    }
                }
            }
        }
        function _(n) {
            var r = null,
                i = R(n);
            if (i && i.nodeName == "OBJECT") if (typeof i.SetVariable != e) r = i;
            else {
                var s = i.getElementsByTagName(t)[0];
                s && (r = s)
            }
            return r
        }
        function D() {
            return !w && W("6.0.65") && (T.win || T.mac) && !(T.wk && T.wk < 312)
        }
        function P(t, n, r, i) {
            w = !0, g = i || null, y = {
                success: !1,
                id: r
            };
            var o = R(r);
            if (o) {
                o.nodeName == "OBJECT" ? (v = B(o), m = null) : (v = o, m = r), t.id = s;
                if (typeof t.width == e || !/%$/.test(t.width) && parseInt(t.width, 10) < 310) t.width = "310";
                if (typeof t.height == e || !/%$/.test(t.height) && parseInt(t.height, 10) < 137) t.height = "137";
                a.title = a.title.slice(0, 47) + " - Flash Player Installation";
                var f = T.ie && T.win ? "ActiveX" : "PlugIn",
                    l = "MMredirectURL=" + u.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + f + "&MMdoctitle=" + a.title;
                typeof n.flashvars != e ? n.flashvars += "&" + l : n.flashvars = l;
                if (T.ie && T.win && o.readyState != 4) {
                    var c = U("div");
                    r += "SWFObjectNew", c.setAttribute("id", r), o.parentNode.insertBefore(c, o), o.style.display = "none", function() {
                        o.readyState == 4 ? o.parentNode.removeChild(o) : setTimeout(arguments.callee, 10)
                    }()
                }
                j(t, n, r)
            }
        }
        function H(e) {
            if (T.ie && T.win && e.readyState != 4) {
                var t = U("div");
                e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(B(e), t), e.style.display = "none", function() {
                    e.readyState == 4 ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                }()
            } else e.parentNode.replaceChild(B(e), e)
        }
        function B(e) {
            var n = U("div");
            if (T.win && T.ie) n.innerHTML = e.innerHTML;
            else {
                var r = e.getElementsByTagName(t)[0];
                if (r) {
                    var i = r.childNodes;
                    if (i) {
                        var s = i.length;
                        for (var o = 0; o < s; o++)(i[o].nodeType != 1 || i[o].nodeName != "PARAM") && i[o].nodeType != 8 && n.appendChild(i[o].cloneNode(!0))
                    }
                }
            }
            return n
        }
        function j(n, r, s) {
            var o, u = R(s);
            if (T.wk && T.wk < 312) return o;
            if (u) {
                typeof n.id == e && (n.id = s);
                if (T.ie && T.win) {
                    var a = "";
                    for (var f in n) n[f] != Object.prototype[f] && (f.toLowerCase() == "data" ? r.movie = n[f] : f.toLowerCase() == "styleclass" ? a += ' class="' + n[f] + '"' : f.toLowerCase() != "classid" && (a += " " + f + '="' + n[f] + '"'));
                    var l = "";
                    for (var c in r) r[c] != Object.prototype[c] && (l += '<param name="' + c + '" value="' + r[c] + '" />');
                    u.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + a + ">" + l + "</object>", p[p.length] = n.id, o = R(n.id)
                } else {
                    var h = U(t);
                    h.setAttribute("type", i);
                    for (var d in n) n[d] != Object.prototype[d] && (d.toLowerCase() == "styleclass" ? h.setAttribute("class", n[d]) : d.toLowerCase() != "classid" && h.setAttribute(d, n[d]));
                    for (var v in r) r[v] != Object.prototype[v] && v.toLowerCase() != "movie" && F(h, v, r[v]);
                    u.parentNode.replaceChild(h, u), o = h
                }
            }
            return o
        }
        function F(e, t, n) {
            var r = U("param");
            r.setAttribute("name", t), r.setAttribute("value", n), e.appendChild(r)
        }
        function I(e) {
            var t = R(e);
            t && t.nodeName == "OBJECT" && (T.ie && T.win ? (t.style.display = "none", function() {
                t.readyState == 4 ? q(e) : setTimeout(arguments.callee, 10)
            }()) : t.parentNode.removeChild(t))
        }
        function q(e) {
            var t = R(e);
            if (t) {
                for (var n in t) typeof t[n] == "function" && (t[n] = null);
                t.parentNode.removeChild(t)
            }
        }
        function R(e) {
            var t = null;
            try {
                t = a.getElementById(e)
            } catch (n) {}
            return t
        }
        function U(e) {
            return a.createElement(e)
        }
        function z(e, t, n) {
            e.attachEvent(t, n), d[d.length] = [e, t, n]
        }
        function W(e) {
            var t = T.pv,
                n = e.split(".");
            return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? !0 : !1
        }
        function X(n, r, i, s) {
            if (T.ie && T.mac) return;
            var o = a.getElementsByTagName("head")[0];
            if (!o) return;
            var u = i && typeof i == "string" ? i : "screen";
            s && (E = null, S = null);
            if (!E || S != u) {
                var f = U("style");
                f.setAttribute("type", "text/css"), f.setAttribute("media", u), E = o.appendChild(f), T.ie && T.win && typeof a.styleSheets != e && a.styleSheets.length > 0 && (E = a.styleSheets[a.styleSheets.length - 1]), S = u
            }
            T.ie && T.win ? E && typeof E.addRule == t && E.addRule(n, r) : E && typeof a.createTextNode != e && E.appendChild(a.createTextNode(n + " {" + r + "}"))
        }
        function V(e, t) {
            if (!x) return;
            var n = t ? "visible" : "hidden";
            b && R(e) ? R(e).style.visibility = n : X("#" + e, "visibility:" + n)
        }
        function $(t) {
            var n = /[\\\"<>\.;]/,
                r = n.exec(t) != null;
            return r && typeof encodeURIComponent != e ? encodeURIComponent(t) : t
        }
        var e = "undefined",
            t = "object",
            n = "Shockwave Flash",
            r = "ShockwaveFlash.ShockwaveFlash",
            i = "application/x-shockwave-flash",
            s = "SWFObjectExprInst",
            o = "onreadystatechange",
            u = window,
            a = document,
            f = navigator,
            l = !1,
            c = [A],
            h = [],
            p = [],
            d = [],
            v, m, g, y, b = !1,
            w = !1,
            E, S, x = !0,
            T = function() {
                var s = typeof a.getElementById != e && typeof a.getElementsByTagName != e && typeof a.createElement != e,
                    o = f.userAgent.toLowerCase(),
                    c = f.platform.toLowerCase(),
                    h = c ? /win/.test(c) : /win/.test(o),
                    p = c ? /mac/.test(c) : /mac/.test(o),
                    d = /webkit/.test(o) ? parseFloat(o.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                    v = !1,
                    m = [0, 0, 0],
                    g = null;
                if (typeof f.plugins != e && typeof f.plugins[n] == t) g = f.plugins[n].description, g && (typeof f.mimeTypes == e || !f.mimeTypes[i] || !! f.mimeTypes[i].enabledPlugin) && (l = !0, v = !1, g = g.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), m[0] = parseInt(g.replace(/^(.*)\..*$/, "$1"), 10), m[1] = parseInt(g.replace(/^.*\.(.*)\s.*$/, "$1"), 10), m[2] = /[a-zA-Z]/.test(g) ? parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
                else if (typeof u.ActiveXObject != e) try {
                    var y = new ActiveXObject(r);
                    y && (g = y.GetVariable("$version"), g && (v = !0, g = g.split(" ")[1].split(","), m = [parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10)]))
                } catch (b) {}
                return {
                    w3: s,
                    pv: m,
                    wk: d,
                    ie: v,
                    win: h,
                    mac: p
                }
            }(),
            N = function() {
                if (!T.w3) return;
                (typeof a.readyState != e && a.readyState == "complete" || typeof a.readyState == e && (a.getElementsByTagName("body")[0] || a.body)) && C(), b || (typeof a.addEventListener != e && a.addEventListener("DOMContentLoaded", C, !1), T.ie && T.win && (a.attachEvent(o, function() {
                    a.readyState == "complete" && (a.detachEvent(o, arguments.callee), C())
                }), u == top &&
                function() {
                    if (b) return;
                    try {
                        a.documentElement.doScroll("left")
                    } catch (e) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    C()
                }()), T.wk &&
                function() {
                    if (b) return;
                    if (!/loaded|complete/.test(a.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    C()
                }(), L(C))
            }(),
            J = function() {
                T.ie && T.win && window.attachEvent("onunload", function() {
                    var e = d.length;
                    for (var t = 0; t < e; t++) d[t][0].detachEvent(d[t][1], d[t][2]);
                    var n = p.length;
                    for (var r = 0; r < n; r++) I(p[r]);
                    for (var i in T) T[i] = null;
                    T = null;
                    for (var s in swfobject) swfobject[s] = null;
                    swfobject = null
                })
            }();
        return {
            registerObject: function(e, t, n, r) {
                if (T.w3 && e && t) {
                    var i = {};
                    i.id = e, i.swfVersion = t, i.expressInstall = n, i.callbackFn = r, h[h.length] = i, V(e, !1)
                } else r && r({
                    success: !1,
                    id: e
                })
            },
            getObjectById: function(e) {
                if (T.w3) return _(e)
            },
            embedSWF: function(n, r, i, s, o, u, a, f, l, c) {
                var h = {
                    success: !1,
                    id: r
                };
                T.w3 && !(T.wk && T.wk < 312) && n && r && i && s && o ? (V(r, !1), k(function() {
                    i += "", s += "";
                    var p = {};
                    if (l && typeof l === t) for (var d in l) p[d] = l[d];
                    p.data = n, p.width = i, p.height = s;
                    var v = {};
                    if (f && typeof f === t) for (var m in f) v[m] = f[m];
                    if (a && typeof a === t) for (var g in a) typeof v.flashvars != e ? v.flashvars += "&" + g + "=" + a[g] : v.flashvars = g + "=" + a[g];
                    if (W(o)) {
                        var y = j(p, v, r);
                        p.id == r && V(r, !0), h.success = !0, h.ref = y
                    } else {
                        if (u && D()) {
                            p.data = u, P(p, v, r, c);
                            return
                        }
                        V(r, !0)
                    }
                    c && c(h)
                })) : c && c(h)
            },
            switchOffAutoHideShow: function() {
                x = !1
            },
            ua: T,
            getFlashPlayerVersion: function() {
                return {
                    major: T.pv[0],
                    minor: T.pv[1],
                    release: T.pv[2]
                }
            },
            hasFlashPlayerVersion: W,
            createSWF: function(e, t, n) {
                return T.w3 ? j(e, t, n) : undefined
            },
            showExpressInstall: function(e, t, n, r) {
                T.w3 && D() && P(e, t, n, r)
            },
            removeSWF: function(e) {
                T.w3 && I(e)
            },
            createCSS: function(e, t, n, r) {
                T.w3 && X(e, t, n, r)
            },
            addDomLoadEvent: k,
            addLoadEvent: L,
            getQueryParamValue: function(e) {
                var t = a.location.search || a.location.hash;
                if (t) {
                    /\?/.test(t) && (t = t.split("?")[1]);
                    if (e == null) return $(t);
                    var n = t.split("&");
                    for (var r = 0; r < n.length; r++) if (n[r].substring(0, n[r].indexOf("=")) == e) return $(n[r].substring(n[r].indexOf("=") + 1))
                }
                return ""
            },
            expressInstallCallback: function() {
                if (w) {
                    var e = R(s);
                    e && v && (e.parentNode.replaceChild(v, e), m && (V(m, !0), T.ie && T.win && (v.style.display = "block")), g && g(y)), w = !1
                }
            }
        }
    }(),
    hexcase = 0,
    b64pad = "",
    hexcase = 0,
    b64pad = "";
(function(e) {
    function m(t, n) {
        var r = GS.Views.templateCache[n],
            i = r.match(c),
            s = [],
            o = [];
        if (i && i.length) for (var u = 0; u < i.length; u++) {
            var a = i[u].match(h);
            a.length > 1 && e.indexOf(s, a[1]) === -1 && (s.push(a[1]), o.push(w(a[1])))
        }
        t && $.after(o).then(function() {
            t.resolve(e.template(r))
        })
    }
    function S(t) {
        return function() {
            return this._wrapped[t].apply(this._wrapped, e.toArray(arguments))
        }
    }
    function x(t) {
        function l(e) {
            if (o < e) return;
            if (r >= e - 1) {
                do
                if (!c(e)) break;
                while (e++ < n);
                e = Math.max(0, e - 1), r = Math.max(r, e)
            }
        }
        function c(e) {
            if (!i[e]) return !1;
            if (!i[e].length) return !0;
            var t;
            while (t = i[e][0]) i[e].shift(), typeof t == "function" ? t.call(f) : h(t);
            return t !== null
        }
        function h(e, t) {
            var n = e.deferred,
                r = [];
            for (var i = 0; i < s.length; i++) s[i].deferred === n && (t || (s[i].state === e.state && r.push(s[i].func), a.push(n)), s.splice(i, 1), i--);
            for (i = 0; i < r.length; i++) r[i].apply(n, e.args)
        }
        function p(e) {
            var t;
            while (t = i[e][0]) i[e].shift(), typeof t != "function" && h(t, !0);
            i[e] = []
        }
        function d(e) {
            t.ignoreFails || (o = Math.min(o, e));
            for (var r = 0, i = u.length; r < i; r++) u[r]();
            u = [];
            if (t.ignoreFails) return;
            while (e++ < n) p(e)
        }
        function v(t) {
            n === r && r--;
            var s = n;
            i[s].push(null), t.done(function() {
                i[s].pop(), s <= o && i[s].unshift({
                    deferred: this,
                    state: "resolved",
                    args: e.toArray(arguments)
                }), l(s)
            }), t.fail(function() {
                d(s), i[s].pop(), s <= o && i[s].unshift({
                    deferred: this,
                    state: "rejected",
                    args: e.toArray(arguments)
                }), l(s)
            })
        }
        t = $.extend({}, {
            ignoreFails: !1
        }, t);
        var n = 0,
            r = 0,
            i = {
                0: []
            },
            s = [],
            o = Infinity,
            u = [],
            a = [],
            f = this;
        this.push = this.next = function() {
            n++, i[n] = [];
            var t = e.toArray(arguments);
            for (var r = 0, s = t.length; r < s; r++) v(t[r]);
            return l(n), this
        }, this.add = function() {
            n === 0 && (n = 1, i[n] = []);
            var t = e.toArray(arguments);
            for (var r = 0, s = t.length; r < s; r++) v(t[r]);
            return this
        }, this.bind = function() {
            var t = e.bind.apply(e, e.toArray(arguments));
            return function() {
                if (this === f) t();
                else if (e.indexOf(a, this) > -1) {
                    var n = e.toArray(arguments);
                    t.apply(this, n)
                } else s.push({
                    deferred: this,
                    func: t,
                    state: this.state()
                })
            }
        }, this.done = function(e, t) {
            var s = n,
                u;
            t || (n++, i[n] = []), u = n;
            if (o > s || t && o === s) r < s ? i[n].unshift(e) : (e.call(f), t || l(u));
            return this
        }, this.fail = function(e) {
            return o < Infinity ? e.call(f) : u.push(e), this
        }, this.always = function(e) {
            return this.fail(e).done(e)
        }
    }
    var t = $(document.createElement("div")),
        n = {},
        r = {},
        i = "grooveshark\\.com|wikipedia\\.org|facebook\\.com|twitter\\.com|musicbrainz\\.org|itunes\\.apple\\.com|amazon\\.com|play\\.google\\.com|vimeo\\.com|youtube\\.com|pinterest\\.com|ustream\\.com|reddit\\.com|twitch\\.tv|kickstarter\\.com|indiegogo\\.com|cl\\.ly|ballercast\\.com|flattr\\.com",
        s = new RegExp("(https?:\\/\\/)?((?:[a-z0-9\\-]+\\.)*(" + i + ")(/[a-z0-9_&=%#!;,\\+\\-\\?\\.\\~\\[\\]\\/]+)?)", "gi");
    e.mixin({
        defined: function(e) {
            return e !== undefined && e !== null
        },
        notDefined: function(e) {
            return e === undefined || e === null
        },
        orEqual: function(t, n) {
            return e.defined(t) ? t : n
        },
        orEqualEx: function() {
            var t, n = arguments.length;
            for (t = 0; t < n; t++) if (e.defined(arguments[t])) return arguments[t];
            return arguments[n - 1]
        },
        measure: function(e, t, n) {
            var r;
            return e._wrapped ? e : (r = function() {
                console.time(t), e.apply(n || window, arguments), console.timeEnd(t)
            }, r._wrapped = !0, r)
        },
        getItemType: function(e) {
            var t;
            switch (e.idAttribute) {
            case "PlaylistID":
                t = "playlist";
                break;
            case "SongID":
            case "queueSongID":
            case "playlistSongID":
            case "broadcastSongID":
            case "CalloutID":
                t = "song";
                break;
            case "UserID":
                t = "user";
                break;
            case "AlbumID":
                t = "album";
                break;
            case "ArtistID":
                t = "artist";
                break;
            case "VideoID":
                t = "video";
                break;
            case "EventID":
                t = "event";
                break;
            case "TagID":
                t = "tag";
                break;
            case "BroadcastID":
                t = "broadcast"
            }
            return t
        },
        getCollectionType: function(e) {
            return e && e.models && e.models.length ? this.getItemType(e.models[0]) : e instanceof Array ? this.getItemType(e[0]) : "unknown"
        },
        cleanUrl: function(t, n, r, i, s) {
            var o, u = "";
            return isNaN(parseInt(n, 10)) && (o = n, n = t, t = o), u = "", t = t || "Unknown", t = e.cleanNameForURL(t, r != "user"), r = r.toLowerCase(), s = e.orEqual(s, ""), s.length && (s = "/" + s), r === "s" && !i ? "#!/notFound" : (i ? (r == "song" && (r = "s"), u = "#!/" + r + "/" + t + "/" + i + s + "?src=5") : u = "#!/" + r + "/" + t + "/" + n + s, u)
        },
        makeUrlFromPathName: function(t, n) {
            return n = e.orEqual(n, ""), n.length && (n = "/" + n), "#!/" + t + n
        },
        makeUrlForShare: function(e, t, n) {
            var r = encodeURIComponent("http://grooveshark.com" + n.toUrl().replace("#!", "")),
                i = "";
            switch (t) {
            case "song":
                i = n.get("ArtistName") + " - " + n.get("SongName");
                break;
            case "playlist":
                i = n.get("PlaylistName") + " by " + n.get("UserName");
                break;
            case "album":
                i = n.get("AlbumName") + " by " + n.get("ArtistName");
                break;
            case "artist":
                i = n.get("ArtistName")
            }
            i = encodeURIComponent(i);
            switch (e) {
            case "reddit":
                return "http://www.reddit.com/submit?title=" + i + "&url=" + r;
            case "stumbleupon":
                return "http://www.stumbleupon.com/submit?url=" + r
            }
            return ""
        },
        cleanNameForURL: function(t, n) {
            return n = e.orEqual(n, !0), n && (t = e.ucwords(t, !0)), t = ("" + t).replace(/&/g, " and ").replace(/#/g, " number ").replace(/[^\w]/g, "_"), t = t.replace(/\s+/g, "_"), t = encodeURIComponent(t), t = t.replace(/_+/g, "+"), t = t.replace(/^\++|\++$/g, ""), t === "" && (t = "-"), t
        },
        cleanHash: function(e) {
            e = e || "";
            var t = e.indexOf("#");
            if (t != -1) {
                var n = e.indexOf("#!") !== t;
                return n ? "#!" + e.substring(t + 1) : e.substring(t)
            }
            return t = e.indexOf("/"), t !== 0 ? "#!/" + e : "#!" + e
        },
        getString: function(e, t) {
            var n = $.localize.getString(e),
                r = [],
                i, s = /^[^\{]+/,
                o = /^\{(.*?)\}/;
            n = typeof n == "undefined" ? "" : n;
            if (!t) return n;
            while (n) {
                if (i = s.exec(n)) r.push(i[0]);
                else {
                    if (!(i = o.exec(n))) throw "Error rendering data object";
                    var u = i[1];
                    t[u] !== undefined ? r.push(t[u]) : r.push(i[0])
                }
                n = n.substring(i[0].length)
            }
            return r.join("")
        },
        getStringPluralized: function(t, n, r, i) {
            return e.getString(r === 1 ? t : n, i)
        },
        ucwords: function(e, t) {
            return t || (e = (e + "").toLowerCase()), (e + "").replace(/^(.)|\s(.)/g, function(e) {
                return e.toUpperCase()
            })
        },
        millisToMinutesSeconds: function(t, n) {
            n = e.orEqual(n, !1);
            var r = Math.round((t ? t : 0) / 1e3),
                i = Math.floor(r / 60);
            return r -= i * 60, r < 10 && (r = "0" + r), i < 10 && n && (i = "0" + i), i + ":" + r
        },
        addCommaSeparators: function(t) {
            var n = /(\d+)(\d{3})/;
            t += "";
            while (n.test(t)) t = t.replace(n, "$1,$2");
            return t
        },
        dobToAge: function(t, n, r) {
            var i, s, o, u;
            return t && e.notDefined(n) && e.notDefined(r) ? i = new Date(t) : i = new Date(t, n, r), s = (new Date).getTime() - i.getTime(), o = s / 864e5, u = Math.floor(o / 365.24), isNaN(u) ? !1 : u
        },
        getDateFormatChars: function(t) {
            var n = t.getDay(),
                r = t.getMonth();
            return {
                D: e.daysOfTheWeek[n].substr(0, 3),
                M: e.monthsOfTheYear[r].substr(0, 3),
                j: t.getDate(),
                Y: t.getFullYear()
            }
        },
        globalDragProxyMousewheel: function(e, t) {
            var n = $("#shortcuts_scroll .viewport");
            if (n.within(e.clientX, e.clientY).length > 0) {
                n.scrollTop(n.scrollTop() - 82 * t);
                return
            }
            var r = $("#queue_list_window");
            if (r.within(e.clientX, e.clientY).length > 0) {
                r.scrollLeft(r.scrollLeft() - 82 * t);
                return
            }
            var i = $("#sidebar_pinboard .viewport");
            if (i.within(e.clientX, e.clientY).length > 0) {
                i.scrollTop(i.scrollTop() - 82 * t);
                return
            }
            var s = $("#grid"),
                o = s.data("view"),
                u;
            o && o.$scrollElement ? u = o.$scrollElement : s.length ? u = s.find(".grid-viewport") : (u = $(".grid-viewport"), u.length && (u = $(u[0]))), u.within(e.clientX, e.clientY).length > 0 && u.scrollTop(u.scrollTop() - 82 * t)
        },
        globalDragHandler: function(t, n) {
            var r;
            n.clientX = t.clientX, n.clientY = t.clientY, n.proxyOffsetX = e.orEqual(n.proxyOffsetX, 0), n.proxyOffsetY = e.orEqual(n.proxyOffsetY, 0);
            var i = $(n.proxy),
                s = 0;
            i.css({
                top: t.clientY - n.proxyOffsetY,
                left: t.clientX - n.proxyOffsetX
            });
            var o = t.clientX - 20,
                u = t.clientY;
            o < 0 && (o = t.clientX, u = t.clientY - 20, s = 20);
            var a = $(document.elementFromPoint(o, u)),
                f = 80,
                l = 1e3,
                c = 1.5,
                h = .6,
                p = !1,
                d;
            a && a.length && (r = e.getScrollableParent(a)), n.lastEvent = t;
            var v = n.dragLastScroll && n.dragLastScroll.length && r && n.dragLastScroll[0] == r[0];
            if (n.$tinyScrollbars && r && r.length && r[0] == document.body) {
                var m = n.$tinyScrollbars,
                    g = a.parents();
                for (var y = 0, b = m.length; y < b; y++) if (g.index(m[y]) !== -1) {
                    r = m[y], p = !0;
                    break
                }
            }
            n.dragScroll && n.dragScroll.length && r && r.length && n.dragScroll[0] != r[0] && (clearTimeout(n.dragScrollTimeout), n.dragScroll = null, n.dragLastScroll = null);
            var w = r && r.length && !n.dragScroll;
            w && n.$tinyScrollbars && p && (r[0] == document.body ? d = function() {} : d = function() {
                var e = n.lastEvent,
                    t = v ? 50 : 500,
                    i = r.find(".overview"),
                    s = i.position(),
                    o = r.outerHeight(),
                    u = r.outerWidth(),
                    a = r.offset(),
                    p = s.top * -1,
                    m = s.left * -1,
                    g = o + p,
                    y = u + m,
                    b = i.outerHeight(),
                    w = i.outerWidth(),
                    E = Math.max(0, a.top + f - e.clientY),
                    S = Math.max(0, e.clientY - (a.top + o - f)),
                    x = Math.max(0, a.left + f - e.clientX),
                    T = Math.max(0, e.clientX - (a.left + u - f)),
                    N = Math.max(h, Math.min(c, b / l)),
                    C = Math.max(h, Math.min(c, w / l)),
                    k = null,
                    L = null;
                b && (p > 0 && E > 0 ? k = (p - Math.pow(E, N)) * -1 : b > g && S > 0 && (k = (p + Math.pow(S, N)) * -1)), w && (m > 0 && x > 0 ? L = (m - Math.pow(x, C)) * -1 : w > y && T > 0 && (L = (m + Math.pow(T, C)) * -1)), typeof k == "number" || typeof L == "number" ? (v && (typeof k == "number" && (k = Math.max((b - o) * -1, Math.min(0, k)), i.css("top", k)), typeof L == "number" && (L = Math.max((w - u) * -1, Math.min(0, L)), i.css("left", L)), r.tinyscrollbar_update((L || k) * -1)), n.dragScrollTimeout = setTimeout(d, t), n.dragScroll = r, n.dragLastScroll = r, v = !0) : (n.dragScrollTimeout = null, n.dragScroll = null, n.dragLastScroll = null)
            }), w && !n.dragScroll && typeof d != "function" && (r[0] == document.body ? d = function() {} : d = function() {
                var e = n.lastEvent,
                    t = v ? 50 : 500,
                    i = r.outerHeight(),
                    s = r.offset(),
                    o = r.scrollTop(),
                    u = i + o,
                    a = r[0].scrollHeight,
                    p = Math.max(0, s.top + f - e.clientY),
                    m = Math.max(0, e.clientY - (s.top + i - f)),
                    g = Math.max(h, Math.min(c, a / l)),
                    y = null,
                    b = null;
                a && (o > 0 && p > 0 ? y = o - Math.pow(p, g) : a > u && m > 0 && (y = o + Math.pow(m, g))), typeof y == "number" || typeof b == "number" ? (v && typeof y == "number" && r.scrollTop(y), n.dragScrollTimeout = setTimeout(d, t), n.dragScroll = r, n.dragLastScroll = r, v = !0) : (n.dragScrollTimeout = null, n.dragScroll = null, n.dragLastScroll = null)
            }), typeof d == "function" && d();
            var E = !1,
                S, x, T;
            e.forEach(n.available, function(r) {
                x = $(r), S = x.within(t.clientX, t.clientY).length > 0, S && e.isFunction(r.updateDropOnDrag) && r.updateDropOnDrag(t, n), !E && S && x.data("valid-drop") ? (E = !0, T = r) : E && S && T && !x.data("valid-drop") && $.contains(T, r) && (E = !1, T = null)
            }), E ? $(n.proxy).addClass("valid").removeClass("invalid") : $(n.proxy).addClass("invalid").removeClass("valid")
        },
        globalDragCleanup: function(e, t) {
            t.dragScrollTimeout && (clearTimeout(t.dragScrollTimeout), t.dragScrollTimeout = null), $(t.proxy).remove()
        },
        browserDetect: function() {
            var e = {
                browser: "",
                version: 0
            },
                t = navigator.userAgent.toLowerCase();
            $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()), $.browser.adobeair = /adobeair/.test(navigator.userAgent.toLowerCase());
            var n = 0;
            return $.browser.msie && (t = $.browser.version, t = t.substring(0, t.indexOf(".")), e.browser = "msie", e.version = parseFloat(t)), $.browser.chrome && !$.browser.msie && (t = t.substring(t.indexOf("chrome/") + 7), t = t.substring(0, t.indexOf(".")), e.browser = "chrome", e.version = parseFloat(t), $.browser.safari = !1), $.browser.adobeair && (t = t.substring(t.indexOf("adobeair/") + 9), t = t.substring(0, t.indexOf(".")), e.browser = "adobeair", e.version = parseFloat(t), $.browser.safari = !1), $.browser.safari && (t = t.substring(t.indexOf("safari/") + 7), t = t.substring(0, t.indexOf(".")), e.browser = "safari", e.version = parseFloat(t)), $.browser.mozilla && (navigator.userAgent.toLowerCase().indexOf("firefox") != -1 ? (t = t.substring(t.indexOf("firefox/") + 8), t = t.substring(0, t.indexOf(".")), e.browser = "firefox", e.version = parseFloat(t)) : (e.browser = "mozilla", e.version = parseFloat($.browser.version))), $.browser.opera && (t = t.substring(t.indexOf("version/") + 8), t = t.substring(0, t.indexOf(".")), e.browser = "opera", e.version = parseFloat(t)), e
        },
        getModelSort: function(t, n) {
            return n = n ? 1 : -1, function(r, i) {
                var s = r.get(t),
                    o = i.get(t);
                return t === "TSAdded" && (typeof s == "undefined" && (s = r.get("TSFavorited")), typeof o == "undefined" && (o = i.get("TSFavorited"))), e.isString(s) && (s = s.toLowerCase()), e.isString(o) && (o = o.toLowerCase()), s > o ? n : s < o ? -1 * n : 0
            }
        },
        localeTag: function(t, n, r, i) {
            r = r || {}, r["data-translate-text"] = n;
            var s = $.localize.getString(n);
            return i && (s = $("<span></span>").dataString(s, i).render()), [e.tag(t, r), s, e.tagEnd(t)].join("")
        },
        tag: function(t, n, r) {
            var i = ["<" + t];
            return e.forEach(n, function(e, t) {
                i.push(" " + t + "=" + '"' + e + '"')
            }), i.push(r || ">"), i.join("")
        },
        tagEnd: function(e) {
            return ["</", e, ">"].join("")
        },
        getCenteredCoordinates: function(e, t) {
            var n = 0,
                r = 0;
            if ("innerWidth" in window) n = window.innerWidth, r = window.innerHeight;
            else {
                var i;
                "BackCompat" === window.document.compatMode && "body" in window.document ? i = window.document.body : "documentElement" in window.document && (i = window.document.documentElement), i !== null && (n = i.offsetWidth, r = i.offsetHeight)
            }
            var s = 0,
                o = 0;
            "screenLeft" in window ? (s = window.screenLeft, o = window.screenTop) : "screenX" in window && (s = window.screenX, o = window.screenY);
            var u = s + Math.max(0, Math.floor((n - e) / 2)),
                a = o + Math.max(0, Math.floor((r - t) / 2));
            return u < 0 && (u += screen.width), [u, a]
        },
        cookie: function(e, t, n) {
            if (typeof t == "undefined") {
                var r, i, s = document.cookie.split(";");
                for (var o = 0; o < s.length; o++) {
                    r = $.trim(s[o].substr(0, s[o].indexOf("="))), i = s[o].substr(s[o].indexOf("=") + 1);
                    if (r === e) return unescape(i)
                }
            } else {
                n = n || {}, t ? t = escape(t) : (t = "", n.expires = -365);
                if (n.expires) {
                    var u = new Date;
                    u.setDate(u.getDate() + n.expires), t += "; expires=" + u.toUTCString()
                }
                n.domain && (t += "; domain=" + n.domain), n.path && (t += "; path=" + n.path), document.cookie = e + "=" + t
            }
        },
        getNormalizedAuthorForCommentResponse: function(t, n, r) {
            var i = null;
            if (t.artist) i = t.artist;
            else if (t.user && !t.FromOwner) i = t.user;
            else if ((!t.user || t.FromOwner) && n && r) if (r === GS.Models.Comment.COMMENT_PAGE_TYPES.USER) i = GS.Models.User.getCached(n);
            else if (r === GS.Models.Comment.COMMENT_PAGE_TYPES.ARTIST) i = GS.Models.Artist.getCached(n);
            else if (r === GS.Models.Comment.COMMENT_PAGE_TYPES.ALBUM) {
                var s = GS.Models.Album.getCached(n);
                s && (i = GS.Models.Artist.getCached(s.get("ArtistID")))
            } else if (r === GS.Models.Comment.COMMENT_PAGE_TYPES.PLAYLIST) {
                var o = GS.Models.Playlist.getCached(n);
                o && (i = GS.Models.User.getCached(o.get("UserID")))
            } else if (r === GS.Models.Comment.COMMENT_PAGE_TYPES.SONG) {
                var u = GS.Models.Song.getCached(n);
                u && (i = GS.Models.Artist.getCached(u.get("ArtistID")))
            }
            var a = {
                Name: "",
                getPicture: function(e) {
                    return GS.Models.User.artPath + e + "_user.png"
                },
                Url: "",
                UserID: null
            };
            return i && (a.Name = e.orEqualEx(i.get("Name"), i.get("ArtistName"), ""), a.getPicture = function(t) {
                return e.orEqual(i.getImageURL(t), GS.Models.User.artPath + t + "_user.png")
            }, a.URL = e.orEqual(i.toUrl(), "#"), a.UserID = i.get("UserID")), a
        },
        getFormattedDate: function(t) {
            var n = t * 1e3,
                r = Date.now(),
                i;
            if (r - n < 12e4) return e.getString("SECONDS_AGO");
            if (r - n < 36e5) return e.getString("MINUTES_AGO", {
                minutes: Math.floor((r - n) / 6e4)
            });
            if (r - n < 864e5) {
                var s = Math.floor((r - n) / 36e5);
                return s > 1 ? e.getString("HOURS_AGO", {
                    hours: s
                }) : e.getString("HOUR_AGO")
            }
            if (r - n < 12096e5) {
                var o = Math.floor((r - n) / 864e5);
                if (o > 1) return e.getString("DAYS_AGO", {
                    days: o
                });
                i = new Date, i.setTime(n);
                var u = "",
                    a = i.getHours();
                a > 12 ? (u += " PM", a -= 12) : a === 12 ? u += " PM" : (u += " AM", a === 0 && (a = 12));
                var f = i.getMinutes();
                return f < 10 && (f = "0" + f), e.getString("YESTERDAY")
            }
            return i = new Date, i.setTime(n), e.getString("OVER_A_WEEK_AGO", {
                day: e.getString("WEEK_DAYS").split(",")[i.getDay()],
                date: e.getString("MONTHS").split(",")[i.getMonth()] + " " + i.getDate() + ", " + i.getFullYear()
            })
        },
        setClipboardHandler: function(e, t, i) {
            return i || (i = 0), e.length && (e = e[0]), r[i] = e, n[i] ? n[i].reAttach(r[i]) : (ZeroClipboard.setMoviePath("/webincludes/flash/ZeroClipboard.swf"), n[i] = new ZeroClipboard.Client, n[i].setHandCursor(!0), n[i].setCSSEffects(!0), n[i].glue(r[i]), n[i].addEventListener("complete", function(e, t) {
                n[i] ? ($(r[i]).addClass("copied").text($.localize.getString("SHARE_COPIED")), n[i].reAttach(r[k])) : console.trace && (console.log("reached clipHandler complete without a clipHandler", n[i]), console.trace())
            }), $(n[i].div).css("z-index", 999999), function(e, t) {
                n[e].reAttach = function(r) {
                    if (!r) {
                        this.hide();
                        return
                    }
                    var i = $(r),
                        s = i.offset(),
                        o, u;
                    s && s.top ? (o = s.top - i.scrollTop(), u = s.left - i.scrollLeft(), t.offset({
                        top: o,
                        left: u
                    }).height(i.outerHeight()).width(i.outerWidth()).find("embed").height(i.outerHeight()).width(i.outerWidth())) : console.trace && (console.log("clipHandler reAttach failed", r, n[e]), console.trace())
                }
            }(i, $(n[i].div))), n[i].setText(t), {
                destroy: function() {
                    r[i] = null, n[i].hide()
                }
            }
        },
        resizeClipboardHandler: function(e) {
            for (var t in n) n.hasOwnProperty(t) && n[t].reAttach(r[t])
        },
        getScrollableParent: function(t) {
            var n = ["auto", "scroll"],
                r = document.body;
            while (t.length && t[0] != r && e.indexOf(n, t.css("overflow-x")) == -1 && e.indexOf(n, t.css("overflow-y")) == -1) t = t.parent();
            return t.length || (t = $(document.body)), t
        },
        chainLoading: function(e) {
            return new x(e)
        },
        makeSafeLinks: function(t) {
            return t ? (t = e.escape(t), t = t.replace(s, function(e, t, n, r, i) {
                var s = e,
                    o = "_blank";
                s.length > 33 && (s = e.replace(t, "").substr(0, 30) + "...");
                if (r === "grooveshark.com") {
                    if (!i) return e;
                    i.substr(0, 2) !== "/#" && (i = "#!" + i), o = "", n = i
                } else n = (t ? t : "http://") + n;
                return '<a href="' + n + '" class="inner-comment-link" target="' + o + '" title="' + e + '">' + s + "</a>"
            }), t) : t
        },
        startsWith: function(e, t) {
            return e.slice(0, t.length).toLowerCase() === t.toLowerCase()
        },
        endsWith: function(e, t) {
            return e.slice(-t.length).toLowerCase() === t.toLowerCase()
        },
        getCountryFromID: function(t) {
            if (this.countries) {
                var n = e.find(this.countries, function(e) {
                    return e.code === t
                });
                if (n) return n.name
            }
            return ""
        },
        checkEmailMisspells: function(e) {
            function s(e, t) {
                var r, i = 99,
                    s = null;
                for (var u = 0; u < t.length; u++) r = o(e, t[u]), r < i && (i = r, s = t[u]);
                return i <= n && s !== null && s !== e ? s : !1
            }
            function o(e, t) {
                if (e === null || e.length === 0) return t === null || t.length === 0 ? 0 : t.length;
                if (t === null || t.length === 0) return e.length;
                var n = 0,
                    r = 0,
                    i = 0,
                    s = 0,
                    o = 5;
                while (n + r < e.length && n + i < t.length) {
                    if (e[n + r] == t[n + i]) s++;
                    else {
                        r = 0, i = 0;
                        for (var u = 0; u < o; u++) {
                            if (n + u < e.length && e[n + u] == t[n]) {
                                r = u;
                                break
                            }
                            if (n + u < t.length && e[n] == t[n + u]) {
                                i = u;
                                break
                            }
                        }
                    }
                    n++
                }
                return (e.length + t.length) / 2 - s
            }
            var t = ["yahoo.com", "google.com", "hotmail.com", "gmail.com", "me.com", "aol.com", "mac.com", "live.com", "comcast.net", "googlemail.com", "msn.com", "hotmail.co.uk", "yahoo.co.uk", "facebook.com", "verizon.net", "sbcglobal.net", "att.net", "gmx.com", "mail.com"],
                n = 2,
                r = e.split("@");
            if (r < 2 || !r[1]) return {
                error: "Not an valid e-mail."
            };
            var i = s(r[1], t);
            return i ? {
                address: r[0],
                domain: i,
                full: r[0] + "@" + i
            } : !1
        },
        inputLimitCountdown: function(e, t, n, r) {
            if (!e || !e[0]) return;
            var i = e[0],
                s = i.value.length,
                o = t - s,
                u = !1,
                a = {
                    13: 1,
                    32: 1,
                    186: 1,
                    187: 1,
                    188: 1,
                    189: 1,
                    180: 1,
                    191: 1,
                    192: 1,
                    219: 1,
                    220: 1,
                    221: 1,
                    222: 1
                };
            e.on("keydown", function(e) {
                return s = i.value.length, r && e.which && (a[e.which] || e.which >= 65 && e.which <= 90 || e.which >= 48 && e.which <= 57 || e.which >= 96 && e.which <= 112) && (e.which != 65 || !e.metaKey && !e.ctrlKey) && (e.which != 67 || !e.metaKey && !e.ctrlKey) && s >= t ? (e.preventDefault(), e.stopPropagation(), !1) : (n && (o = t - s, n.text(o), o < 0 && !u ? (n.addClass("over-limit"), u = !0) : o >= 0 && u && (n.removeClass("over-limit"), u = !1)), !0)
            }), e.on("keyup", function(e) {
                n && (e.which === 8 || e.which === 46) && (s = i.value.length, o = t - s, n.text(o), o < 0 && !u ? (n.addClass("over-limit"), u = !0) : o >= 0 && u && (n.removeClass("over-limit"), u = !1))
            }), n && (n.text(o), o < 0 && !u ? (n.addClass("over-limit"), u = !0) : o >= 0 && u && (n.removeClass("over-limit"), u = !1))
        },
        eventToGUTSCoords: function(e) {
            var t = $(window),
                n = t.width(),
                r = t.height(),
                i = 1 * (e.clientX / n),
                s = 1 * (e.clientY / r);
            return {
                eventX: i,
                eventY: s,
                winW: n,
                winH: r
            }
        }
    }), $.browser.msie ? e.toInt = function(e) {
        return ~~e
    } : e.toInt = function(e) {
        return ~~parseInt(e, 10)
    };
    var o = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
        u = 30;
    $.browser.msie && $.browser.version < 9 && (u = 90), o ? e.animationThrottle = function(e, t) {
        var n = !1,
            r = !1,
            i, s = function() {
                e.apply(t, i), n ? (o(s), n = !1) : r = !1
            };
        return function() {
            i = arguments, r ? n = !0 : (o(s), r = !0, n = !1)
        }
    } : e.animationThrottle = function(e, t) {
        var n = !1,
            r, i, s = function() {
                n ? (e.apply(t, i), n = !1) : (clearInterval(r), r = null)
            };
        return function() {
            i = arguments, r ? n = !0 : (e.apply(t, i), r = setInterval(s, u), n = !1)
        }
    }, e.daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], e.monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], e.shortMonthsOfTheYear = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"], e.keyboard = {
        ESC: 27,
        ENTER: 13,
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        TAB: 9,
        BACKSPACE: 8,
        AT: 64
    }, e.states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"], e.countries = [{
        iso: "US",
        name: "United States",
        code: 223
    }, {
        iso: "AF",
        name: "Afghanistan",
        code: 4
    }, {
        iso: "AL",
        name: "Albania",
        code: 7
    }, {
        iso: "DZ",
        name: "Algeria",
        code: 60
    }, {
        iso: "AS",
        name: "American Samoa",
        code: 13
    }, {
        iso: "AD",
        name: "Andorra",
        code: 2
    }, {
        iso: "AO",
        name: "Angola",
        code: 10
    }, {
        iso: "AI",
        name: "Anguilla",
        code: 6
    }, {
        iso: "AQ",
        name: "Antarctica",
        code: 11
    }, {
        iso: "AG",
        name: "Antigua and Barbuda",
        code: 5
    }, {
        iso: "AR",
        name: "Argentina",
        code: 12
    }, {
        iso: "AM",
        name: "Armenia",
        code: 8
    }, {
        iso: "AW",
        name: "Aruba",
        code: 16
    }, {
        iso: "AU",
        name: "Australia",
        code: 15
    }, {
        iso: "AT",
        name: "Austria",
        code: 14
    }, {
        iso: "AX",
        name: "Åland Islands",
        code: 17
    }, {
        iso: "AZ",
        name: "Azerbaijan",
        code: 18
    }, {
        iso: "BS",
        name: "Bahamas",
        code: 32
    }, {
        iso: "BH",
        name: "Bahrain",
        code: 25
    }, {
        iso: "BD",
        name: "Bangladesh",
        code: 21
    }, {
        iso: "BB",
        name: "Barbados",
        code: 20
    }, {
        iso: "BY",
        name: "Belarus",
        code: 36
    }, {
        iso: "BE",
        name: "Belgium",
        code: 22
    }, {
        iso: "BZ",
        name: "Belize",
        code: 37
    }, {
        iso: "BJ",
        name: "Benin",
        code: 27
    }, {
        iso: "BM",
        name: "Bermuda",
        code: 28
    }, {
        iso: "BT",
        name: "Bhutan",
        code: 33
    }, {
        iso: "BO",
        name: "Bolivia",
        code: 30
    }, {
        iso: "BA",
        name: "Bosnia and Herzegovina",
        code: 19
    }, {
        iso: "BW",
        name: "Botswana",
        code: 35
    }, {
        iso: "BV",
        name: "Bouvet Island",
        code: 34
    }, {
        iso: "BR",
        name: "Brazil",
        code: 31
    }, {
        iso: "IO",
        name: "British Indian Ocean Territory",
        code: 102
    }, {
        iso: "BN",
        name: "Brunei Darussalam",
        code: 29
    }, {
        iso: "BG",
        name: "Bulgaria",
        code: 24
    }, {
        iso: "BF",
        name: "Burkina Faso",
        code: 23
    }, {
        iso: "BI",
        name: "Burundi",
        code: 26
    }, {
        iso: "KH",
        name: "Cambodia",
        code: 113
    }, {
        iso: "CM",
        name: "Cameroon",
        code: 46
    }, {
        iso: "CA",
        name: "Canada",
        code: 38
    }, {
        iso: "CV",
        name: "Cape Verde",
        code: 52
    }, {
        iso: "KY",
        name: "Cayman Islands",
        code: 120
    }, {
        iso: "CF",
        name: "Central African Republic",
        code: 40
    }, {
        iso: "TD",
        name: "Chad",
        code: 204
    }, {
        iso: "CL",
        name: "Chile",
        code: 45
    }, {
        iso: "CN",
        name: "China",
        code: 47
    }, {
        iso: "CX",
        name: "Christmas Island",
        code: 242
    }, {
        iso: "CC",
        name: "Cocos (Keeling) Islands",
        code: 241
    }, {
        iso: "CO",
        name: "Colombia",
        code: 48
    }, {
        iso: "KM",
        name: "Comoros",
        code: 115
    }, {
        iso: "CG",
        name: "Congo",
        code: 41
    }, {
        iso: "CD",
        name: "Congo, the Democratic Republic of the",
        code: 39
    }, {
        iso: "CK",
        name: "Cook Islands",
        code: 44
    }, {
        iso: "CR",
        name: "Costa Rica",
        code: 49
    }, {
        iso: "CI",
        name: "Cote D'Ivoire",
        code: 43
    }, {
        iso: "HR",
        name: "Croatia",
        code: 94
    }, {
        iso: "CU",
        name: "Cuba",
        code: 51
    }, {
        iso: "CY",
        name: "Cyprus",
        code: 53
    }, {
        iso: "CZ",
        name: "Czech Republic",
        code: 54
    }, {
        iso: "DK",
        name: "Denmark",
        code: 57
    }, {
        iso: "DJ",
        name: "Djibouti",
        code: 56
    }, {
        iso: "DM",
        name: "Dominica",
        code: 58
    }, {
        iso: "DO",
        name: "Dominican Republic",
        code: 59
    }, {
        iso: "EC",
        name: "Ecuador",
        code: 61
    }, {
        iso: "EG",
        name: "Egypt",
        code: 63
    }, {
        iso: "SV",
        name: "El Salvador",
        code: 200
    }, {
        iso: "GQ",
        name: "Equatorial Guinea",
        code: 84
    }, {
        iso: "ER",
        name: "Eritrea",
        code: 64
    }, {
        iso: "EE",
        name: "Estonia",
        code: 62
    }, {
        iso: "ET",
        name: "Ethiopia",
        code: 66
    }, {
        iso: "FK",
        name: "Falkland Islands (Malvinas)",
        code: 69
    }, {
        iso: "FO",
        name: "Faroe Islands",
        code: 71
    }, {
        iso: "FJ",
        name: "Fiji",
        code: 68
    }, {
        iso: "FI",
        name: "Finland",
        code: 67
    }, {
        iso: "FR",
        name: "France",
        code: 72
    }, {
        iso: "GF",
        name: "French Guiana",
        code: 76
    }, {
        iso: "PF",
        name: "French Polynesia",
        code: 170
    }, {
        iso: "TF",
        name: "French Southern Territories",
        code: 205
    }, {
        iso: "GA",
        name: "Gabon",
        code: 73
    }, {
        iso: "GM",
        name: "Gambia",
        code: 81
    }, {
        iso: "GE",
        name: "Georgia",
        code: 75
    }, {
        iso: "DE",
        name: "Germany",
        code: 55
    }, {
        iso: "GH",
        name: "Ghana",
        code: 78
    }, {
        iso: "GI",
        name: "Gibraltar",
        code: 79
    }, {
        iso: "GR",
        name: "Greece",
        code: 85
    }, {
        iso: "GL",
        name: "Greenland",
        code: 80
    }, {
        iso: "GD",
        name: "Grenada",
        code: 74
    }, {
        iso: "GP",
        name: "Guadeloupe",
        code: 83
    }, {
        iso: "GU",
        name: "Guam",
        code: 88
    }, {
        iso: "GT",
        name: "Guatemala",
        code: 87
    }, {
        iso: "GN",
        name: "Guinea",
        code: 82
    }, {
        iso: "GW",
        name: "Guinea-Bissau",
        code: 89
    }, {
        iso: "GY",
        name: "Guyana",
        code: 90
    }, {
        iso: "HT",
        name: "Haiti",
        code: 95
    }, {
        iso: "HM",
        name: "Heard Island and Mcdonald Islands",
        code: 93
    }, {
        iso: "VA",
        name: "Holy See (Vatican City State)",
        code: 226
    }, {
        iso: "HN",
        name: "Honduras",
        code: 93
    }, {
        iso: "HK",
        name: "Hong Kong",
        code: 91
    }, {
        iso: "HU",
        name: "Hungary",
        code: 96
    }, {
        iso: "IS",
        name: "Iceland",
        code: 105
    }, {
        iso: "IN",
        name: "India",
        code: 101
    }, {
        iso: "ID",
        name: "Indonesia",
        code: 97
    }, {
        iso: "IR",
        name: "Iran, Islamic Republic of",
        code: 104
    }, {
        iso: "IQ",
        name: "Iraq",
        code: 103
    }, {
        iso: "IE",
        name: "Ireland",
        code: 98
    }, {
        iso: "IL",
        name: "Israel",
        code: 99
    }, {
        iso: "IT",
        name: "Italy",
        code: 106
    }, {
        iso: "JM",
        name: "Jamaica",
        code: 108
    }, {
        iso: "JP",
        name: "Japan",
        code: 110
    }, {
        iso: "JE",
        name: "Jersey",
        code: 107
    }, {
        iso: "JO",
        name: "Jordan",
        code: 109
    }, {
        iso: "KZ",
        name: "Kazakhstan",
        code: 121
    }, {
        iso: "KE",
        name: "Kenya",
        code: 111
    }, {
        iso: "KI",
        name: "Kiribati",
        code: 114
    }, {
        iso: "KP",
        name: "Korea, Democratic People's Republic of",
        code: 117
    }, {
        iso: "KR",
        name: "Korea, Republic of",
        code: 118
    }, {
        iso: "KW",
        name: "Kuwait",
        code: 119
    }, {
        iso: "KG",
        name: "Kyrgyzstan",
        code: 112
    }, {
        iso: "LA",
        name: "Lao People's Democratic Republic",
        code: 122
    }, {
        iso: "LV",
        name: "Latvia",
        code: 131
    }, {
        iso: "LB",
        name: "Lebanon",
        code: 123
    }, {
        iso: "LS",
        name: "Lesotho",
        code: 128
    }, {
        iso: "LR",
        name: "Liberia",
        code: 127
    }, {
        iso: "LY",
        name: "Libyan Arab Jamahiriya",
        code: 132
    }, {
        iso: "LI",
        name: "Liechtenstein",
        code: 125
    }, {
        iso: "LT",
        name: "Lithuania",
        code: 129
    }, {
        iso: "LU",
        name: "Luxembourg",
        code: 130
    }, {
        iso: "MO",
        name: "Macao",
        code: 143
    }, {
        iso: "MK",
        name: "Macedonia, the Former Yugoslav Republic of",
        code: 139
    }, {
        iso: "MG",
        name: "Madagascar",
        code: 137
    }, {
        iso: "MW",
        name: "Malawi",
        code: 151
    }, {
        iso: "MY",
        name: "Malaysia",
        code: 153
    }, {
        iso: "MV",
        name: "Maldives",
        code: 150
    }, {
        iso: "ML",
        name: "Mali",
        code: 140
    }, {
        iso: "MT",
        name: "Malta",
        code: 148
    }, {
        iso: "MH",
        name: "Marshall Islands",
        code: 138
    }, {
        iso: "MQ",
        name: "Martinique",
        code: 145
    }, {
        iso: "MR",
        name: "Mauritania",
        code: 146
    }, {
        iso: "MU",
        name: "Mauritius",
        code: 149
    }, {
        iso: "YT",
        name: "Mayotte",
        code: 236
    }, {
        iso: "MX",
        name: "Mexico",
        code: 152
    }, {
        iso: "FM",
        name: "Micronesia, Federated States of",
        code: 70
    }, {
        iso: "MD",
        name: "Moldova, Republic of",
        code: 135
    }, {
        iso: "MC",
        name: "Monaco",
        code: 134
    }, {
        iso: "MN",
        name: "Mongolia",
        code: 142
    }, {
        iso: "ME",
        name: "Montenegro",
        code: 136
    }, {
        iso: "MS",
        name: "Montserrat",
        code: 147
    }, {
        iso: "MA",
        name: "Morocco",
        code: 133
    }, {
        iso: "MZ",
        name: "Mozambique",
        code: 154
    }, {
        iso: "MM",
        name: "Myanmar",
        code: 141
    }, {
        iso: "NA",
        name: "Namibia",
        code: 155
    }, {
        iso: "NR",
        name: "Nauru",
        code: 164
    }, {
        iso: "NP",
        name: "Nepal",
        code: 163
    }, {
        iso: "NL",
        name: "Netherlands",
        code: 161
    }, {
        iso: "AN",
        name: "Netherlands Antilles",
        code: 9
    }, {
        iso: "NC",
        name: "New Caledonia",
        code: 156
    }, {
        iso: "NZ",
        name: "New Zealand",
        code: 166
    }, {
        iso: "NI",
        name: "Nicaragua",
        code: 160
    }, {
        iso: "NE",
        name: "Niger",
        code: 157
    }, {
        iso: "NG",
        name: "Nigeria",
        code: 159
    }, {
        iso: "NU",
        name: "Niue",
        code: 165
    }, {
        iso: "NF",
        name: "Norfolk Island",
        code: 158
    }, {
        iso: "MP",
        name: "Northern Mariana Islands",
        code: 144
    }, {
        iso: "NO",
        name: "Norway",
        code: 162
    }, {
        iso: "OM",
        name: "Oman",
        code: 167
    }, {
        iso: "PK",
        name: "Pakistan",
        code: 173
    }, {
        iso: "PW",
        name: "Palau",
        code: 178
    }, {
        iso: "PS",
        name: "Palestinian Territory, Occupied",
        code: 246
    }, {
        iso: "PA",
        name: "Panama",
        code: 168
    }, {
        iso: "PG",
        name: "Papua New Guinea",
        code: 171
    }, {
        iso: "PY",
        name: "Paraguay",
        code: 179
    }, {
        iso: "PE",
        name: "Peru",
        code: 169
    }, {
        iso: "PH",
        name: "Philippines",
        code: 172
    }, {
        iso: "PN",
        name: "Pitcairn",
        code: 175
    }, {
        iso: "PL",
        name: "Poland",
        code: 174
    }, {
        iso: "PT",
        name: "Portugal",
        code: 177
    }, {
        iso: "PR",
        name: "Puerto Rico",
        code: 176
    }, {
        iso: "QA",
        name: "Qatar",
        code: 180
    }, {
        iso: "RE",
        name: "Reunion",
        code: 181
    }, {
        iso: "RO",
        name: "Romania",
        code: 182
    }, {
        iso: "RU",
        name: "Russian Federation",
        code: 184
    }, {
        iso: "RW",
        name: "Rwanda",
        code: 185
    }, {
        iso: "SH",
        name: "Saint Helena",
        code: 247
    }, {
        iso: "KN",
        name: "Saint Kitts and Nevis",
        code: 116
    }, {
        iso: "LC",
        name: "Saint Lucia",
        code: 124
    }, {
        iso: "PM",
        name: "Saint Pierre and Miquelon",
        code: 245
    }, {
        iso: "VC",
        name: "Saint Vincent and the Grenadines",
        code: 227
    }, {
        iso: "WS",
        name: "Samoa",
        code: 234
    }, {
        iso: "SM",
        name: "San Marino",
        code: 195
    }, {
        iso: "ST",
        name: "Sao Tome and Principe",
        code: 199
    }, {
        iso: "SA",
        name: "Saudi Arabia",
        code: 186
    }, {
        iso: "SN",
        name: "Senegal",
        code: 196
    }, {
        iso: "RS",
        name: "Serbia",
        code: 183
    }, {
        iso: "SC",
        name: "Seychelles",
        code: 188
    }, {
        iso: "SL",
        name: "Sierra Leone",
        code: 194
    }, {
        iso: "SG",
        name: "Singapore",
        code: 191
    }, {
        iso: "SK",
        name: "Slovakia",
        code: 193
    }, {
        iso: "SI",
        name: "Slovenia",
        code: 192
    }, {
        iso: "SB",
        name: "Solomon Islands",
        code: 187
    }, {
        iso: "SO",
        name: "Somalia",
        code: 197
    }, {
        iso: "ZA",
        name: "South Africa",
        code: 237
    }, {
        iso: "GS",
        name: "South Georgia and the South Sandwich Islands",
        code: 86
    }, {
        iso: "ES",
        name: "Spain",
        code: 65
    }, {
        iso: "LK",
        name: "Sri Lanka",
        code: 126
    }, {
        iso: "SD",
        name: "Sudan",
        code: 189
    }, {
        iso: "SR",
        name: "Suriname",
        code: 198
    }, {
        iso: "SJ",
        name: "Svalbard and Jan Mayen",
        code: 248
    }, {
        iso: "SZ",
        name: "Swaziland",
        code: 202
    }, {
        iso: "SE",
        name: "Sweden",
        code: 190
    }, {
        iso: "CH",
        name: "Switzerland",
        code: 42
    }, {
        iso: "SY",
        name: "Syrian Arab Republic",
        code: 201
    }, {
        iso: "TW",
        name: "Taiwan",
        code: 217
    }, {
        iso: "TJ",
        name: "Tajikistan",
        code: 208
    }, {
        iso: "TZ",
        name: "Tanzania, United Republic of",
        code: 218
    }, {
        iso: "TH",
        name: "Thailand",
        code: 207
    }, {
        iso: "TL",
        name: "Timor-Leste",
        code: 210
    }, {
        iso: "TG",
        name: "Togo",
        code: 206
    }, {
        iso: "TK",
        name: "Tokelau",
        code: 209
    }, {
        iso: "TO",
        name: "Tonga",
        code: 213
    }, {
        iso: "TT",
        name: "Trinidad and Tobago",
        code: 215
    }, {
        iso: "TN",
        name: "Tunisia",
        code: 212
    }, {
        iso: "TR",
        name: "Turkey",
        code: 214
    }, {
        iso: "TM",
        name: "Turkmenistan",
        code: 211
    }, {
        iso: "TC",
        name: "Turks and Caicos Islands",
        code: 203
    }, {
        iso: "TV",
        name: "Tuvalu",
        code: 216
    }, {
        iso: "UG",
        name: "Uganda",
        code: 220
    }, {
        iso: "UA",
        name: "Ukraine",
        code: 219
    }, {
        iso: "AE",
        name: "United Arab Emirates",
        code: 3
    }, {
        iso: "GB",
        name: "United Kingdom",
        code: 221
    }, {
        iso: "US",
        name: "United States",
        code: 223
    }, {
        iso: "UM",
        name: "United States Minor Outlying Islands",
        code: 222
    }, {
        iso: "UY",
        name: "Uruguay",
        code: 224
    }, {
        iso: "UZ",
        name: "Uzbekistan",
        code: 225
    }, {
        iso: "VU",
        name: "Vanuatu",
        code: 232
    }, {
        iso: "VE",
        name: "Venezuela",
        code: 228
    }, {
        iso: "VN",
        name: "Vietnam",
        code: 231
    }, {
        iso: "VG",
        name: "Virgin Islands, British",
        code: 229
    }, {
        iso: "VI",
        name: "Virgin Islands, U.S.",
        code: 230
    }, {
        iso: "WF",
        name: "Wallis and Futuna",
        code: 233
    }, {
        iso: "EH",
        name: "Western Sahara",
        code: 243
    }, {
        iso: "YE",
        name: "Yemen",
        code: 235
    }, {
        iso: "ZM",
        name: "Zambia",
        code: 238
    }, {
        iso: "ZW",
        name: "Zimbabwe",
        code: 239
    }];
    if (!Date.now || !e.isFunction(Date.now)) Date.now = function() {
        return +(new Date)
    };
    e.isFunction(Date.prototype.getWeek) || (Date.prototype.getWeek = function() {
        var e = new Date(this.getFullYear(), 0, 1);
        return Math.ceil(((this - e) / 864e5 + e.getDay() + 1) / 7)
    });
    var c = /nest\((.*?)\)/g,
        h = /['|"](.*?)['|"]/,
        p = {},
        d = {},
        v = e.template("");
    Backbone.View.prototype.templatePath = "";
    var g = undefined,
        y = function() {
            g = {}, e.each(GS.Views.viewBundles, function(t, n) {
                var r, i;
                if (e.isArray(t.directories)) for (r = 0, i = t.directories.length; r < i; r++) g[t.directories[r]] = n;
                if (e.isArray(t.files)) for (r = 0, i = t.files.length; r < i; r++) g[t.files[r]] = n
            })
        },
        b = function(e) {
            !g && GS.Views.viewBundles && y();
            var t = (e || "").replace("//", "/").split("/"),
                n = "";
            if (t.length <= 1) return undefined;
            t.shift();
            for (var r = 0, i = t.length, s; r < i; r++) {
                n = n + "/" + t[r], s = g[n];
                if (s) return s
            }
            return g["/" + t.join("/")]
        },
        w = Backbone.View.prototype.fetchTemplate = function(t) {
            var n = $.Deferred(),
                r = ["gs", "templates"],
                i = "";
            t.match(/^themes/) || this.templatePath && this.templatePath.match && this.templatePath.match(/^themes/) ? (window.gsConfig && window.gsConfig.themeVersion && (i = window.gsConfig.themeVersion), r = [t], this.templatePath && this.templatePath.match && this.templatePath.match(/^themes/) && r.unshift(this.templatePath)) : t.match(/^\//) ? r.push(t.replace(/^\//, "")) : (this.templatePath && r.push(this.templatePath), r.push(t)), r = "/" + r.join("/"), r += ".ejs";
            var s = r;
            r = resolvePath(r);
            var o = s,
                u = b(s),
                a = p[o];
            if (GS.Views.templateCache[o]) e.isFunction(GS.Views.templateCache[o]) ? n.resolve(GS.Views.templateCache[o]) : m(n, o);
            else {
                if (a && a.state() == "pending") return a.promise();
                var f;
                if (u) {
                    var l = resolvePath("/gs/" + u + ".json");
                    f = {
                        contentType: "application/json",
                        dataType: "json",
                        url: l,
                        type: "GET",
                        cache: !0
                    }, window.gsConfig && window.gsConfig.viewsJSONP && (f.url = gsConfig.assetHost + url, f.dataType = "jsonp", f.jsonp = !1, f.jsonpCallback = window.gsConfig.viewsJSONP + u)
                } else f = {
                    dataType: "text",
                    url: r,
                    type: "GET",
                    cache: !0
                }, i && (f.url += "?" + i);
                p[o] = n;
                if (u) {
                    if (d[u] && d[u].state() == "pending") return n.promise();
                    d[u] = $.Deferred()
                }
                $.ajax(f).then(function(r, i, s) {
                    if (!r) {
                        console.log("Failed to fetch template, empty result", t), n.reject(v), u && d[u].reject("");
                        return
                    }
                    if (!u) {
                        var a = r;
                        r = {}, r[o] = a
                    }
                    e.each(r, function(e, t) {
                        var n = p[t];
                        n = n && n.state() == "pending" ? n : null, e = e.replace(/(\s+$|^\s+|\n)/mg, ""), GS.Views.templateCache[t] = e, m(n, t)
                    }), u && d[u].resolve(r)
                }, function(e, r, i) {
                    console.log("Failed to fetch template", i, t), n.reject(v), u && d[u].reject("")
                })
            }
            return n.promise()
        };
    Backbone.View.prototype.renderTemplate = function T(t, n) {
        return n = n || this.model, n.nest = function(e, t) {
            t = t || n;
            var r = "/gs/templates" + e + ".ejs",
                i = GS.Views.templateCache[r];
            return i ? T(i, t) : ""
        }, e.isFunction(t) || (t = e.template(t)), t(n)
    }, Backbone.View.prototype.cleanupChildViews = function(t) {
        if (this.childViews) {
            var n = this.childViews;
            for (var r = 0, i = n.length; r < i; r++) if (t || !n[r].persist) e.isFunction(n[r].destroy) && n[r].destroy(), n.splice(r, 1), r--, i--
        }
    }, Backbone.View.prototype.destroy = function(t) {
        t = e.orEqual(t, !0), this.destroyed = !0, t ? this.$el.remove() : (this.undelegateEvents(), this.$el.empty()), this.unbind(), this.cleanupChildViews(!0), e.isFunction(this.onDestroy) && this.onDestroy()
    };
    var E = function(t) {
            this._superStack || (this._superStack = {});
            var n = "__" + t,
                r = this._superStack[n] ? this._superStack[n][t] : arguments.callee.caller,
                i = this._superStack[n] || this,
                s, o;
            do i = i.constructor.__super__;
            while (i[t] === r);
            s = i, this._superStack[n] = s;
            try {
                o = s[t].apply(this, e.rest(arguments))
            } catch (u) {
                console.log("_super failed", u, s, s.prototype, arguments), console.log("_super stack", u.stack, arguments.callee)
            }
            return delete this._superStack[n], o
        };
    e.each(["Model", "Collection", "Router", "View"], function(e) {
        Backbone[e].prototype._super = E
    }), Backbone.CachedModel = Backbone.Model.extend({
        constructor: function() {
            var t = e.toArray(arguments),
                n = arguments[0],
                r = n[this.idAttribute];
            if (r && !n._noCache) {
                var i = this.constructor.getCached(r);
                if (i) return i.updateFromNew(n), i
            }
            this._super.apply(this, ["constructor"].concat(t))
        },
        destroy: function() {
            return this.constructor.uncache(this), this._super.apply(this, ["destroy"].concat(e.toArray(arguments)))
        },
        sync: function() {
            return !1
        },
        initialize: function() {
            this.constructor.cache(this)
        },
        updateFromNew: function(t) {
            this.set(e.defaults(this.attributes, t))
        }
    }, {
        cache: function(e) {
            if (e && e.attributes && e.attributes._noCache) return;
            this._cache || (this._cache = {});
            if (this._cache.hasOwnProperty(e.id)) {
                if (this._cache[e.id].cid !== e.cid) throw ["Attempt to overwrite cached instance for ", e.idAttribute, ":", e.id].join("");
                return
            }
            this._cache[e.id] = e
        },
        uncache: function(e) {
            this._cache && this._cache.hasOwnProperty(e.id) && delete this._cache[e.id]
        },
        uncacheID: function(e) {
            this._cache && this._cache.hasOwnProperty(e) && delete this._cache[e]
        },
        getCached: function(e) {
            return !this._cache || !this._cache.hasOwnProperty(e) ? null : this._cache[e]
        },
        genericGet: function(t, n, r) {
            var i = $.Deferred();
            if (this._cache && this._cache.hasOwnProperty(r)) i.resolve(this._cache[r]);
            else {
                var s = t(r);
                s.done(e.bind(function(e) {
                    e && e[n] ? i.resolve(new this(e)) : i.reject(e)
                }, this)), s.fail(function(e) {
                    i.reject(e)
                })
            }
            return i
        },
        replaceCacheAttributes: function(t, n) {
            if (n && !e.isEmpty(n)) {
                var r = new this($.extend({}, n, {
                    _noCache: !0
                }));
                r.unset("_noCache"), t.set($.extend({}, t.attributes, r.attributes))
            }
            return t
        }
    }), Backbone.MagicModelWrapper = Backbone.Model.extend({
        myAttributes: [],
        wrappedClass: Backbone.Model,
        constructor: function() {
            var t = arguments[0],
                n = e.toArray(arguments).splice(1),
                r, i, s = {};
            for (r = 0, i = this.myAttributes.length; r < i; r++) t[this.myAttributes[r]] !== undefined && (s[this.myAttributes[r]] = t[this.myAttributes[r]], delete t[this.myAttributes[r]]);
            !s.hasOwnProperty(this.idAttribute) && t.hasOwnProperty(this.idAttribute) && (s[this.idAttribute] = t[this.idAttribute]), this._wrapped = e.isFunction(this.makeWrappedModel) ? this.makeWrappedModel(t) : new this.wrappedClass(t), this._wrapped.on("change", function(e, t) {
                var n = this._wrapped.changedAttributes();
                for (var r in n) n.hasOwnProperty(r) && this.trigger("change:" + r, this, n[r], t);
                this.trigger("change", this, t)
            }, this), n.unshift(s), Backbone.Model.prototype.constructor.apply(this, n)
        },
        toJSON: function() {
            return e.extend(this._super.apply(this, ["toJSON"]), this._wrapped.toJSON())
        },
        get: function(e) {
            return this.myAttributesHash.hasOwnProperty(e) ? this.attributes[e] : this._wrapped.attributes[e]
        },
        escape: function(e) {
            return this.myAttributesHash.hasOwnProperty(e) ? this._wrapped.escape.call(this, e) : this._wrapped.escape(e)
        },
        has: function(e) {
            return this.get(e) != null
        },
        set: function(t, n, r) {
            var i, s, o;
            e.isObject(t) || t === null ? (i = t, r = n) : (i = {}, i[t] = n), r || (r = {});
            if (!i) return this;
            i instanceof Backbone.Model && (i = i.attributes);
            if (r.unset) for (s in i) i[s] = void 0;
            if (!this._validate(i, r)) return !1;
            this.idAttribute in i && (this.id = i[this.idAttribute]), this._wrapped.idAttribute in i && (this._wrapped.id = i[this._wrapped.idAttribute]);
            var u = r.changes = {},
                a = this.attributes,
                f = this._escapedAttributes,
                l = this._previousAttributes || {};
            for (s in i) if (i.hasOwnProperty(s)) {
                o = i[s];
                if (this.myAttributesHash.hasOwnProperty(s)) {
                    if (!e.isEqual(a[s], o) || r.unset && e.has(a, s)) delete f[s], (r.silent ? this._silent : u)[s] = !0;
                    r.unset ? delete a[s] : a[s] = o, !e.isEqual(l[s], o) || e.has(a, s) != e.has(l, s) ? (this.changed[s] = o, r.silent || (this._pending[s] = !0)) : (delete this.changed[s], delete this._pending[s])
                } else this._wrapped.set(s, o, r)
            }
            return r.silent || this.change(r), this
        },
        clone: function() {
            return new this.constructor(e.extend(this.attributes, this._wrapped.attributes))
        },
        hasChanged: function(t) {
            return arguments.length ? this.myAttributesHash.hasOwnProperty(t) ? e.has(this.changed, t) : e.has(this._wrapped.changed, t) : !e.isEmpty(this.changed) || !e.isEmpty(this._wrapped.changed)
        },
        changedAttributes: function(t) {
            if (!t) return this.hasChanged() ? e.extend(e.clone(this.changed), e.clone(this._wrapped.changed)) : !1;
            var n, r = !1,
                i = this._previousAttributes,
                s = this._wrapped._previousAttributes;
            for (var o in t) if (this.myAttributesHash.hasOwnProperty(o)) {
                if (e.isEqual(i[o], n = t[o])) continue;
                (r || (r = {}))[o] = n
            } else {
                if (e.isEqual(s[o], n = t[o])) continue;
                (r || (r = {}))[o] = n
            }
            return r
        },
        previous: function(e) {
            return !arguments.length || !this._previousAttributes && !this._wrapped._previousAttributes ? null : this.myAttributesHash.hasOwnProperty(e) ? this._previousAttributes[e] : this._wrapped._previousAttributes[e]
        },
        previousAttributes: function() {
            return e.extend(this._super.apply(this, ["previousAttributes"]), this._wrapped.previousAttributes())
        }
    }, {
        wrapMethods: function(t, n, r) {
            var i = t.prototype,
                s = n.prototype;
            for (var o = 0, u = r.length; o < u; o++) {
                var a = r[o];
                if (s.hasOwnProperty(a)) throw ["Trying to overwrite existing method '", a, "' in MagicModelWrapper"].join("");
                e.isFunction(i[a]) && (s[a] = S(a))
            }
        },
        createMyAttributesHash: function(e) {
            var t = e.prototype,
                n = {};
            if (t.myAttributes) for (var r = 0, i = t.myAttributes.length; r < i; r++) n[t.myAttributes[r]] = !0;
            t.myAttributesHash = n
        }
    }), Backbone.Model.prototype.defineProperty = function() {
        var e = {},
            t = !1;
        try {
            Object.defineProperty(e, "b", {
                value: 1,
                writable: !1
            }), e.b = 2, t = e.b === 1
        } catch (n) {}
        return t ?
        function(e, t) {
            return Object.defineProperty(this.attributes, e, t)
        } : function(e, t) {
            return this.attributes[e] = t.value || t.get()
        }
    }(), Backbone.Model.prototype.freeze = function(e) {
        if (typeof Object.freeze != "function") return;
        e ? e && this.attributes[e] instanceof "Object" && Object.freeze(this.attributes[e]) : Object.freeze(this.attributes)
    }, e.$one = function() {
        var e = jQuery([1]),
            t = function(e) {
                return arguments.length ? (!e && typeof e == "undefined" && (e = ""), this[0].innerText = e, this) : this[0].innerText
            },
            n = function(e) {
                return arguments.length ? (!e && typeof e == "undefined" && (e = ""), this[0].textContent = e, this) : this[0].textContent
            };
        return e.innerText = document.documentElement.textContent !== undefined ? n : t, function(t) {
            return (e[0] = t) && e
        }
    }(), Backbone.PageableCollection = Backbone.Collection.extend({
        _pageableItemsPerPage: 10,
        _initialPageableItemLimit: 50,
        _pageableItemsPerLoad: 50,
        _pageableLoadFunc: function(e, t, n) {
            var r = $.Deferred(),
                i = !1;
            return r.resolve([], i), r.promise()
        },
        _pageableCurrentOffset: 0,
        _pageableHasMore: !0,
        _pageableLoadingDfds: null,
        constructor: function(t, n) {
            return this._pageableOptions = e.orEqual(n, {}), this._pageableOptions.initialPageableItemLimit ? this._initialPageableItemLimit = this._pageableOptions.initialPageableItemLimit : this._pageableOptions.initialPageableItemLimit = this._initialPageableItemLimit, this._pageableOptions.pageableItemsPerLoad ? this._pageableItemsPerLoad = this._pageableOptions.pageableItemsPerLoad : this._pageableOptions.pageableItemsPerLoad = this._pageableItemsPerLoad, this._pageableOptions.pageableItemsPerPage ? this._pageableItemsPerPage = this._pageableOptions.pageableItemsPerPage : this._pageableOptions.pageableItemsPerPage = this._pageableItemsPerPage, this._super.apply(this, ["constructor", t])
        },
        initialize: function() {
            var t = e.toArray(arguments);
            t[0] && t[0].length < Math.min(this._initialPageableItemLimit, this._pageableItemsPerLoad) && (this._pageableHasMore = !1), this._pageableCurrentOffset = 0, this._pageableLoadingDfds = {}
        },
        hasMore: function() {
            return this._pageableHasMore
        },
        getCurrentPage: function() {
            var e = this.models.slice(this._pageableCurrentOffset, this._pageableCurrentOffset + this._pageableItemsPerPage);
            return new this.constructor(e)
        },
        setPerPage: function(t, n) {
            var r = e.orEqual(arguments[2], new $.Deferred),
                i = this.models.length,
                s = Math.min(i - this._pageableCurrentOffset, this._pageableItemsPerPage);
            if (t <= 0) return r.reject(), r.promise();
            if (i >= t + this._pageableCurrentOffset || s >= t || !this._pageableHasMore && !this._pageableCurrentOffset) {
                var o = this.models.slice(this._pageableCurrentOffset, this._pageableCurrentOffset + t);
                r.resolve(new this.constructor(o))
            } else {
                if ( !! this._pageableHasMore) return this.loadMore().done(e.bind(this.setPerPage, this, t, n, r)).fail(e.bind(r.reject, r)), r.promise();
                this._pageableCurrentOffset = Math.max(this._pageableCurrentOffset - (t - s), 0);
                var o = this.models.slice(this._pageableCurrentOffset, this._pageableCurrentOffset + t);
                r.resolve(new this.constructor(o))
            }
            return this._pageableItemsPerPage = t, n || (this._pageableOptions.pageableItemsPerPage = t), r.promise()
        },
        showMore: function() {
            var e = this._pageableItemsPerPage + this.__pageableOptions.pageableItemsPerPage;
            return this.setPerPage(e, !0)
        },
        hasPrevPage: function() {
            return this._pageableCurrentOffset > 0
        },
        getPrevPage: function() {
            var t = e.orEqual(arguments[0], new $.Deferred);
            if (this._pageableCurrentOffset > 0 && this._pageableCurrentOffset >= this._pageableItemsPerPage) {
                this._pageableCurrentOffset -= this._pageableItemsPerPage;
                var n = this.models.slice(this._pageableCurrentOffset, this._pageableCurrentOffset + this._pageableItemsPerPage);
                t.resolve(new this.constructor(n))
            } else if (this._pageableCurrentOffset > 0) {
                this._pageableCurrentOffset = 0;
                var n = this.models.slice(this._pageableCurrentOffset, this._pageableCurrentOffset + this._pageableItemsPerPage);
                t.resolve(new this.constructor(n))
            } else t.reject();
            return t.promise()
        },
        hasNextPage: function() {
            return this.models.length - this._pageableCurrentOffset >= this._pageableItemsPerPage || this._pageableHasMore
        },
        getNextPage: function() {
            var t = e.orEqual(arguments[0], new $.Deferred),
                n = this.models.length,
                r = n - (this._pageableCurrentOffset + this._pageableItemsPerPage);
            if (r >= this._pageableItemsPerPage || !this._pageableHasMore && r > 0) {
                var i = this.models.slice(this._pageableCurrentOffset + this._pageableItemsPerPage, this._pageableCurrentOffset + this._pageableItemsPerPage * 2);
                this._pageableCurrentOffset += i.length, t.resolve(new this.constructor(i)), this._pageableItemsPerPage * 2 + this._pageableCurrentOffset > n && this._pageableHasMore && this.loadMore()
            } else this._pageableHasMore ? this.loadMore().done(e.bind(this.getNextPage, this, t)).fail(e.bind(t.reject, t)) : t.reject();
            return t.promise()
        },
        loadMore: function() {
            var t = new $.Deferred;
            if (!this._pageableHasMore) t.reject();
            else {
                var n = Math.max(this._pageableItemsPerLoad, this._pageableItemsPerPage) + 1,
                    r = this.models.length + ":" + n;
                if (this._pageableLoadingDfds[r]) return this._pageableLoadingDfds[r].promise();
                this._pageableLoadFunc.call(this, this.models.length, n, this._pageableOptions).done(e.bind(function(n, r) {
                    if (!e.isArray(n)) t.reject();
                    else {
                        n.length > this._pageableItemsPerLoad && (n.length < this._pageableItemsPerPage && !r && (this._pageableHasMore = !1), n = n.slice(0, n.length - 1));
                        var i = this.models.length;
                        if (n.length) {
                            var s = this.last();
                            this.add(n), this._pageableCurrentOffset += this.indexOf(s) - (i - 1)
                        }
                        var o = this.models.length - i;
                        (!o || o < this._pageableItemsPerLoad) && !r && (this._pageableHasMore = !1), !this._pageableHasMore && r ? this._pageableHasMore = r : this._pageableHasMore && r === !1 && (this._pageableHasMore = r), t.resolve(this)
                    }
                }, this)).fail(e.bind(t.reject, t)), this._pageableLoadingDfds[r] = t
            }
            return t.promise()
        }
    }, {}), $.after = function(t) {
        return arguments.length > 1 ? $.when.apply(this, e.toArray(arguments)) : e.isArray(t) && t.length ? $.when.apply(this, t) : $.when(t)
    }, $.getStylesheet = function(t) {
        var n = document.createElement("link"),
            r = $.Deferred(),
            i = hex_md5(t),
            s = $("#getStylesheet" + i);
        if (!s || !s.length) {
            n.id = "getStylesheet" + i, n.rel = "stylesheet", n.type = "text/css", n.href = t;
            var u = function() {
                    $("#getStylesheet" + i).remove()
                },
                a = e.isFunction(n.addEventListener);
            a && n.addEventListener("error", u), n.onerror = u, setTimeout(function() {
                a && n.removeEventListener && n.removeEventListener("error", u), n.onerror = $.noop, u = null
            }, 6e4)
        }
        var f = document.getElementsByTagName("link"),
            l = f[f.length - 1];
        return linkParent = l.parentNode, linkParent.insertBefore(n, l), e.delay(function() {
            r.resolve()
        }, 0), r
    }, jQuery.fn.offsetTo = function(e) {
        if (!e || !this[0]) return null;
        var t = {
            top: 0,
            left: 0
        },
            n = this,
            r = this,
            i = 0,
            s;
        if ((e[0].tagName || "").toLowerCase() == "body" && e[0] == $("body")[0]) {
            var o = e.offset();
            if (o.top == 0 && o.left == 0) {
                var u = this.offset(),
                    a = e.offset();
                return t.top = u.top - a.top, t.left = u.left - a.left, t
            }
        }
        do i++, n[0] == r[0] && (s = n.position(), t.top += s.top, t.left += s.left, r = r.offsetParent()), n = n.parent();
        while (n[0] != e[0] && i < 1e4);
        return n[0] != e[0] ? null : (t.top += e.scrollTop(), t.left += e.scrollLeft(), t)
    }, e.emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "i")
})(window._), function($) {
    function listener(e) {
        try {
            if ($(e.target).hasClass("jj_menu_item_more") || $(e.target).parent().hasClass("jj_menu_item_more")) return;
            if (previousJJ && previousJJ.target === e.target && previousJJ.which === e.which) {
                hideAllMenus(!0);
                return
            }
            initialEvent && e.target !== initialEvent.target ? hideAllMenus(!0) : previousJJ = {
                target: e.target,
                which: e.which
            }
        } catch (t) {
            console.log("listener in jjmenu.js failed", t, t.trace)
        }
    }
    var initialEvent, previousJJ, curJJ, curParents = [],
        hideAllMenus = function(e) {
            e = e || !1, $(".jjmenu.settings-dropdown").length && GS.Models.Ad.showFlashElements(), $(".active-context").removeClass("active-context"), $("div[id^=jjmenu]").remove(), curJJ && curJJ.copy && curJJ.copy.remove(), e === !0 && (previousJJ = null), curParents.jquery && curParents.off("scroll", hideAllMenus)
        },
        focusedBefore;
    $(window).bind("resize", function() {
        try {
            $(".jjmenu").length && hideAllMenus()
        } catch (e) {
            console.log("window resize in jjmenu.js failed", e, e.trace)
        }
    }), $(document).bind("click contextmenu", listener), $.hideJJMenu = function() {
        hideAllMenus(!0)
    }, $.fn.jjmenu = function(event, param, myReplaces, effect) {
        function menu(id, param, myReplaces, el, effect) {
            function positionMenu() {
                if (!$(el).length) return;
                var e = $(el).offset(),
                    t = e.left,
                    n = e.top;
                effect.xposition == "left" || effect.xposition == "auto" ? t = e.left : t = e.left + $(el).outerWidth(), effect.xposition == "mouse" && (t = Math.max(self.pageX, 0)), effect.yposition == "mouse" && (n = Math.max(self.pageY, 0)), effect.className == "settings-dropdown" && (n += 5, t += 14), $(m).css({
                    position: "absolute",
                    top: n + "px",
                    left: t + "px"
                })
            }
            function checkPosition() {
                var e = $(m).css("display") == "none",
                    t = $(m);
                t.show().css("visibility", "hidden"), $(".jj_menu_item:first", m).addClass("first_menu_item"), $(".jj_menu_item:last", m).addClass("last_menu_item");
                var n = t.offset().top,
                    r = t.offset().left,
                    i = parseInt(t.outerHeight(), 10),
                    s = Math.max(parseInt(t.outerWidth(), 10), 155),
                    o = $("body"),
                    u = o.height(),
                    a = n - $(window).scrollTop();
                t.css({
                    top: 0,
                    left: 0
                }), e && t.hide(), t.css({
                    left: r + "px"
                });
                var f = r;
                effect.spill === "left" ? (f = r - s, t.addClass("spill_left").prevAll(".jjmenu").each(function(e, t) {
                    f -= $(t).outerWidth() + 1
                })) : r + s > o.width() ? (f = r - s + 1, t.attr("id") == "jjmenu_main" && effect.xposition == "auto" && (f += $(el).outerWidth()), t.prev(".jjmenu").addClass("spill_left").each(function(e, t) {
                    f -= $(t).outerWidth() + 1, f += 7
                })) : t.attr("id").match("jjmenu_main_sub") && (f += 5, t.hasClass("settings-dropdown") && (f -= 14));
                var l = !0;
                effect.yposition == "auto" && effect.xposition == "left" ? a + i + $(el).outerHeight() > u && (l = !1) : a + i > u && (l = !1);
                var c = !0,
                    h;
                n - i < 0 && (c = !1), effect.yposition == "bottom" && (n += $(el).outerHeight()), effect.orientation == "auto" && (l || !c || t.attr("id").match("jjmenu_main_sub")) || effect.orientation == "bottom" ? (n + i > u ? h = $(window).height() - i : (effect.yposition == "auto" && effect.xposition == "left" ? n = n + $(el).outerHeight() + 1 : t.attr("id").match("jjmenu_main_sub") && (n -= 7), h = n), t.addClass("bottomOriented")) : (n - i < 0 ? h = $(window).height() - i : t.attr("id").match("jjmenu_main_sub") ? h = n - i + 6 + $(el).outerHeight() : effect.yposition == "mouse" ? h = n - i + 10 : h = n - i, t.addClass("topOriented")), t.css({
                    top: h + "px",
                    left: f + "px",
                    visibility: "visible"
                })
            }
            function showMenu() {
                if (!effect || effect.show == "default") $(m).show();
                else {
                    var e = parseInt(effect.speed);
                    e = isNaN(e) ? 500 : e;
                    switch (effect.show) {
                    case "fadeIn":
                        $(m).fadeIn(e);
                        break;
                    case "slideDown":
                        $(m).slideDown(e);
                        break;
                    case "slideToggle":
                        $(m).slideToggle(e);
                        break;
                    default:
                        $(m).show()
                    }
                }
            }
            function putItem(e) {
                if (!e.hasOwnProperty("title") && (!_.defined(e.customClass) || e.customClass !== "separator")) return;
                var t = document.createElement("div");
                $(t).append($('<span class="more"></span>')), $(t).hover(function() {
                    $(this).addClass("jj_menu_item_hover");
                    if ($(".jj_menu_item_parent").length) {
                        var e = $(t).parent().parent().attr("id");
                        $("#" + e + " .jj_menu_item_parent").removeClass("jj_menu_item_parent")
                    }
                }, function() {
                    $(this).removeClass("jj_menu_item_hover")
                }), $(t).click(function() {
                    doAction(e.action), e.type != "sub" && ($("div[id^=jjmenu]").remove(), self.removeClass("active-context"), previousJJ = null, curJJ = null), e.action && $.isFunction(e.action.log) && shouldLog ? e.action.log() : shouldLog
                });
                var n = document.createElement("span");
                $(t).append(n), $(n).addClass("jj_menu_item_text");
                switch (e.type) {
                case "sub":
                    t.className = "jj_menu_item jj_menu_item_more", $(t).append($('<span class="more"></span>')), $(t).mouseenter(function() {
                        var t = new menu(id + "_sub", e.src, myReplaces, this, effect);
                        doAction(e.action)
                    });
                    break;
                default:
                    $(t).hover(function() {
                        $("div[id^=jjmenu_" + id + "_sub]").remove()
                    }), t.className = "jj_menu_item"
                }
                e.customClass && e.customClass.length > 0 && jQuery(t).addClass(e.customClass), e.useEllipsis ? ($(n).addClass("ellipsis").attr("title", uReplace(e.title)), $(n).html(uReplace(e.title))) : e.title && ($(n).html(uReplace(e.title)).attr("title", uReplace(e.title)), $(n).html(uReplace(e.title))), $(ms).append(t)
            }
            function doAction(act) {
                if (act) switch (act.type) {
                case "gourl":
                    if (act.target) {
                        var newWindow = window.open(uReplace(act.url), act.target);
                        return newWindow.focus(), !1
                    }
                    document.location.href = uReplace(act.url);
                    break;
                case "ajax":
                    $.getJSON(uReplace(act.url), function(data) {
                        var cb = eval(act.callback);
                        typeof cb == "function" && cb(data)
                    });
                    break;
                case "fn":
                    var cb = eval(act.callback);
                    typeof cb == "function" && cb(myReplaces)
                }
            }
            function uReplace(str) {
                if (myReplaces) for (var u in myReplaces) str = str.replace("#" + u + "#", eval("myReplaces." + u));
                return str
            }
            function getEffect(e, t) {
                var n = {
                    show: "default",
                    xposition: "right",
                    yposition: "auto",
                    orientation: "auto",
                    append: document.body
                };
                if (!t) return n;
                t.show || (t.show = "default");
                var r = t.show;
                t.xposition || (t.xposition = "right"), t.yposition || (t.yposition = "auto"), t.orientation || (t.orientation = "auto"), t.spill || (t.spill = "auto"), t.append || (t.append = document.body);
                if (e != "main") {
                    var i = t.className;
                    t = n, t.className = i, t.show = r
                }
                return t
            }
            effect = getEffect(id, effect), id == "main" && (window.triggerElement = el), id.substring(id.length - 3, id.length) == "sub" && $(el).addClass("jj_menu_item_parent");
            var m = document.createElement("div"),
                ms = document.createElement("span");
            $("div[id^=jjmenu_" + id + "]").remove(), $(m).append(ms), m.className = "jjmenu", effect.className && (m.className += " " + effect.className), m.id = "jjmenu_" + id, $(m).css({
                display: "none"
            }), !self.copy && self.is(".jjcopy") && (self.copy = self.clone(), $(effect.append).append(self.copy), self.copy.css({
                position: "absolute",
                "z-index": 100001,
                top: self.offset().top,
                left: self.offset().left
            }).addClass("active-context copy")), $(effect.append).append(m), positionMenu();
            var dynamicItems = !1,
                uF;
            for (var i in param) if (param.hasOwnProperty(i)) if (param[i].getByFunction) {
                typeof param[i].getByFunction == "function" ? uF = param[i].getByFunction : uF = eval(param[i].getByFunction);
                var uItems = uF(myReplaces);
                for (var ii in uItems) uItems.hasOwnProperty(ii) && putItem(uItems[ii]);
                checkPosition()
            } else putItem(param[i]);
            dynamicItems || checkPosition(), showMenu()
        }
        if (!param || !param.length) return !1;
        var self = this,
            copy = null,
            shouldLog = !1;
        self.pageX = event.pageX, self.pageY = event.pageY, event.preventDefault(), initialEvent = event, curJJ = self, hideAllMenus(!1), effect && effect.shouldLog && (shouldLog = effect.shouldLog);
        if (typeof effect.keepState != "undefined") {
            var targetElement = $(effect.keepState);
            targetElement.addClass("active-context"), focusedBefore && focusedBefore[0] !== targetElement[0] && focusedBefore.blur();
            if (targetElement[0].nodeName.toUpperCase() === "A") {
                var href = targetElement.attr("href");
                typeof href == "undefined", focusedBefore = targetElement
            } else focusedBefore = undefined;
            targetElement.trigger("focus").one("mousedown", function() {
                targetElement.unbind("blur")
            }).one("blur", function() {
                targetElement.removeClass("active-context")
            })
        }
        return curParents = $(this).parents().one("scroll", hideAllMenus), new menu("main", param, myReplaces, this, effect), self
    }
}(jQuery), jQuery.extend({
    stringify: function() {
        return window.JSON && window.JSON.stringify ? JSON.stringify : function e(t) {
            var n = typeof t;
            if (n != "object" || t === null) return n == "string" ? t = '"' + t + '"' : n == "number" && !isFinite(t) && (t = "null"), String(t);
            if (n == "undefined") return undefined;
            var r = [],
                i = t && t.constructor == Array,
                s, o;
            for (s in t) if (t.hasOwnProperty(s)) {
                o = t[s], n = typeof o;
                if (n == "string") o = '"' + o + '"';
                else if (n == "number" && !isFinite(o)) o = "null";
                else if (n == "object" && o !== null) o = e(o);
                else if (n == "undefined") continue;
                r.push((i ? "" : '"' + s + '":') + String(o))
            }
            return (i ? "[" : "{") + String(r) + (i ? "]" : "}")
        }
    }()
}), function(e, t) {
    function n(t, n) {
        var i = t.nodeName.toLowerCase();
        if ("area" === i) {
            var s = t.parentNode,
                o = s.name,
                u;
            return !t.href || !o || s.nodeName.toLowerCase() !== "map" ? !1 : (u = e("img[usemap=#" + o + "]")[0], !! u && r(u))
        }
        return (/input|select|textarea|button|object/.test(i) ? !t.disabled : "a" == i ? t.href || n : n) && r(t)
    }
    function r(t) {
        return !e(t).parents().andSelf().filter(function() {
            return e.curCSS(this, "visibility") === "hidden" || e.expr.filters.hidden(this)
        }).length
    }
    e.ui = e.ui || {};
    if (e.ui.version) return;
    e.extend(e.ui, {
        version: "1.8.22",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    }), e.fn.extend({
        propAttr: e.fn.prop || e.fn.attr,
        _focus: e.fn.focus,
        focus: function(t, n) {
            return typeof t == "number" ? this.each(function() {
                var r = this;
                setTimeout(function() {
                    e(r).focus(), n && n.call(r)
                }, t)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var t;
            return e.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(e.curCSS(this, "position", 1)) && /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
            }).eq(0) : t = this.parents().filter(function() {
                return /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        },
        zIndex: function(n) {
            if (n !== t) return this.css("zIndex", n);
            if (this.length) {
                var r = e(this[0]),
                    i, s;
                while (r.length && r[0] !== document) {
                    i = r.css("position");
                    if (i === "absolute" || i === "relative" || i === "fixed") {
                        s = parseInt(r.css("zIndex"), 10);
                        if (!isNaN(s) && s !== 0) return s
                    }
                    r = r.parent()
                }
            }
            return 0
        },
        disableSelection: function() {
            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                e.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(n) {
                return !!e.data(n, t)
            }
        }) : function(t, n, r) {
            return !!e.data(t, r[3])
        },
        focusable: function(t) {
            return n(t, !isNaN(e.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var r = e.attr(t, "tabindex"),
                i = isNaN(r);
            return (i || r >= 0) && n(t, !i)
        }
    }), e(function() {
        var t = document.body,
            n = t.appendChild(n = document.createElement("div"));
        n.offsetHeight, e.extend(n.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), e.support.minHeight = n.offsetHeight === 100, e.support.selectstart = "onselectstart" in n, t.removeChild(n).style.display = "none"
    }), e.curCSS || (e.curCSS = e.css), e.extend(e.ui, {
        plugin: {
            add: function(t, n, r) {
                var i = e.ui[t].prototype;
                for (var s in r) i.plugins[s] = i.plugins[s] || [], i.plugins[s].push([n, r[s]])
            },
            call: function(e, t, n) {
                var r = e.plugins[t];
                if (!r || !e.element[0].parentNode) return;
                for (var i = 0; i < r.length; i++) e.options[r[i][0]] && r[i][1].apply(e.element, n)
            }
        },
        contains: function(e, t) {
            return document.compareDocumentPosition ? e.compareDocumentPosition(t) & 16 : e !== t && e.contains(t)
        },
        hasScroll: function(t, n) {
            if (e(t).css("overflow") === "hidden") return !1;
            var r = n && n === "left" ? "scrollLeft" : "scrollTop",
                i = !1;
            return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
        },
        isOverAxis: function(e, t, n) {
            return e > t && e < t + n
        },
        isOver: function(t, n, r, i, s, o) {
            return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
        }
    })
}(jQuery), function(e, t) {
    if (e.cleanData) {
        var n = e.cleanData;
        e.cleanData = function(t) {
            for (var r = 0, i;
            (i = t[r]) != null; r++) try {
                e(i).triggerHandler("remove")
            } catch (s) {}
            n(t)
        }
    } else {
        var r = e.fn.remove;
        e.fn.remove = function(t, n) {
            return this.each(function() {
                return n || (!t || e.filter(t, [this]).length) && e("*", this).add([this]).each(function() {
                    try {
                        e(this).triggerHandler("remove")
                    } catch (t) {}
                }), r.call(e(this), t, n)
            })
        }
    }
    e.widget = function(t, n, r) {
        var i = t.split(".")[0],
            s;
        t = t.split(".")[1], s = i + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][s] = function(n) {
            return !!e.data(n, t)
        }, e[i] = e[i] || {}, e[i][t] = function(e, t) {
            arguments.length && this._createWidget(e, t)
        };
        var o = new n;
        o.options = e.extend(!0, {}, o.options), e[i][t].prototype = e.extend(!0, o, {
            namespace: i,
            widgetName: t,
            widgetEventPrefix: e[i][t].prototype.widgetEventPrefix || t,
            widgetBaseClass: s
        }, r), e.widget.bridge(t, e[i][t])
    }, e.widget.bridge = function(n, r) {
        e.fn[n] = function(i) {
            var s = typeof i == "string",
                o = Array.prototype.slice.call(arguments, 1),
                u = this;
            return i = !s && o.length ? e.extend.apply(null, [!0, i].concat(o)) : i, s && i.charAt(0) === "_" ? u : (s ? this.each(function() {
                var r = e.data(this, n),
                    s = r && e.isFunction(r[i]) ? r[i].apply(r, o) : r;
                if (s !== r && s !== t) return u = s, !1
            }) : this.each(function() {
                var t = e.data(this, n);
                t ? t.option(i || {})._init() : e.data(this, n, new r(i, this))
            }), u)
        }
    }, e.Widget = function(e, t) {
        arguments.length && this._createWidget(e, t)
    }, e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: !1
        },
        _createWidget: function(t, n) {
            e.data(n, this.widgetName, this), this.element = e(n), this.options = e.extend(!0, {}, this.options, this._getCreateOptions(), t);
            var r = this;
            this.element.bind("remove." + this.widgetName, function() {
                r.destroy()
            }), this._create(), this._trigger("create"), this._init()
        },
        _getCreateOptions: function() {
            return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(n, r) {
            var i = n;
            if (arguments.length === 0) return e.extend({}, this.options);
            if (typeof n == "string") {
                if (r === t) return this.options[n];
                i = {}, i[n] = r
            }
            return this._setOptions(i), this
        },
        _setOptions: function(t) {
            var n = this;
            return e.each(t, function(e, t) {
                n._setOption(e, t)
            }), this
        },
        _setOption: function(e, t) {
            return this.options[e] = t, e === "disabled" && this.widget()[t ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", t), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _trigger: function(t, n, r) {
            var i, s, o = this.options[t];
            r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
            if (s) for (i in s) i in n || (n[i] = s[i]);
            return this.element.trigger(n, r), !(e.isFunction(o) && o.call(this.element[0], n, r) === !1 || n.isDefaultPrevented())
        }
    }
}(jQuery), function(e, t) {
    var n = !1;
    e(document).mouseup(function(e) {
        n = !1
    }), e.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function(n) {
                if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(t) {
            if (n) return;
            this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
            var r = this,
                i = t.which == 1,
                s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
            if (!i || s || !this._mouseCapture(t)) return !0;
            this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                r.mouseDelayMet = !0
            }, this.options.delay));
            if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
                this._mouseStarted = this._mouseStart(t) !== !1;
                if (!this._mouseStarted) return t.preventDefault(), !0
            }
            return !0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                return r._mouseMove(e)
            }, this._mouseUpDelegate = function(e) {
                return r._mouseUp(e)
            }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
        },
        _mouseMove: function(t) {
            return !e.browser.msie || document.documentMode >= 9 || !! t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
        },
        _mouseUp: function(t) {
            return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target == this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
        },
        _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function(e) {
            return this.mouseDelayMet
        },
        _mouseStart: function(e) {},
        _mouseDrag: function(e) {},
        _mouseStop: function(e) {},
        _mouseCapture: function(e) {
            return !0
        }
    })
}(jQuery), function(e, t) {
    e.ui = e.ui || {};
    var n = /left|center|right/,
        r = /top|center|bottom/,
        i = "center",
        s = {},
        o = e.fn.position,
        u = e.fn.offset;
    e.fn.position = function(t) {
        if (!t || !t.of) return o.apply(this, arguments);
        t = e.extend({}, t);
        var u = e(t.of),
            a = u[0],
            f = (t.collision || "flip").split(" "),
            l = t.offset ? t.offset.split(" ") : [0, 0],
            c, h, p;
        return a.nodeType === 9 ? (c = u.width(), h = u.height(), p = {
            top: 0,
            left: 0
        }) : a.setTimeout ? (c = u.width(), h = u.height(), p = {
            top: u.scrollTop(),
            left: u.scrollLeft()
        }) : a.preventDefault ? (t.at = "left top", c = h = 0, p = {
            top: t.of.pageY,
            left: t.of.pageX
        }) : (c = u.outerWidth(), h = u.outerHeight(), p = u.offset()), e.each(["my", "at"], function() {
            var e = (t[this] || "").split(" ");
            e.length === 1 && (e = n.test(e[0]) ? e.concat([i]) : r.test(e[0]) ? [i].concat(e) : [i, i]), e[0] = n.test(e[0]) ? e[0] : i, e[1] = r.test(e[1]) ? e[1] : i, t[this] = e
        }), f.length === 1 && (f[1] = f[0]), l[0] = parseInt(l[0], 10) || 0, l.length === 1 && (l[1] = l[0]), l[1] = parseInt(l[1], 10) || 0, t.at[0] === "right" ? p.left += c : t.at[0] === i && (p.left += c / 2), t.at[1] === "bottom" ? p.top += h : t.at[1] === i && (p.top += h / 2), p.left += l[0], p.top += l[1], this.each(function() {
            var n = e(this),
                r = n.outerWidth(),
                o = n.outerHeight(),
                u = parseInt(e.curCSS(this, "marginLeft", !0)) || 0,
                a = parseInt(e.curCSS(this, "marginTop", !0)) || 0,
                d = r + u + (parseInt(e.curCSS(this, "marginRight", !0)) || 0),
                v = o + a + (parseInt(e.curCSS(this, "marginBottom", !0)) || 0),
                m = e.extend({}, p),
                g;
            t.my[0] === "right" ? m.left -= r : t.my[0] === i && (m.left -= r / 2), t.my[1] === "bottom" ? m.top -= o : t.my[1] === i && (m.top -= o / 2), s.fractions || (m.left = Math.round(m.left), m.top = Math.round(m.top)), g = {
                left: m.left - u,
                top: m.top - a
            }, e.each(["left", "top"], function(n, i) {
                e.ui.position[f[n]] && e.ui.position[f[n]][i](m, {
                    targetWidth: c,
                    targetHeight: h,
                    elemWidth: r,
                    elemHeight: o,
                    collisionPosition: g,
                    collisionWidth: d,
                    collisionHeight: v,
                    offset: l,
                    my: t.my,
                    at: t.at
                })
            }), e.fn.bgiframe && n.bgiframe(), n.offset(e.extend(m, {
                using: t.using
            }))
        })
    }, e.ui.position = {
        fit: {
            left: function(t, n) {
                var r = e(window),
                    i = n.collisionPosition.left + n.collisionWidth - r.width() - r.scrollLeft();
                t.left = i > 0 ? t.left - i : Math.max(t.left - n.collisionPosition.left, t.left)
            },
            top: function(t, n) {
                var r = e(window),
                    i = n.collisionPosition.top + n.collisionHeight - r.height() - r.scrollTop();
                t.top = i > 0 ? t.top - i : Math.max(t.top - n.collisionPosition.top, t.top)
            }
        },
        flip: {
            left: function(t, n) {
                if (n.at[0] === i) return;
                var r = e(window),
                    s = n.collisionPosition.left + n.collisionWidth - r.width() - r.scrollLeft(),
                    o = n.my[0] === "left" ? -n.elemWidth : n.my[0] === "right" ? n.elemWidth : 0,
                    u = n.at[0] === "left" ? n.targetWidth : -n.targetWidth,
                    a = -2 * n.offset[0];
                t.left += n.collisionPosition.left < 0 ? o + u + a : s > 0 ? o + u + a : 0
            },
            top: function(t, n) {
                if (n.at[1] === i) return;
                var r = e(window),
                    s = n.collisionPosition.top + n.collisionHeight - r.height() - r.scrollTop(),
                    o = n.my[1] === "top" ? -n.elemHeight : n.my[1] === "bottom" ? n.elemHeight : 0,
                    u = n.at[1] === "top" ? n.targetHeight : -n.targetHeight,
                    a = -2 * n.offset[1];
                t.top += n.collisionPosition.top < 0 ? o + u + a : s > 0 ? o + u + a : 0
            }
        }
    }, e.offset.setOffset || (e.offset.setOffset = function(t, n) {
        /static/.test(e.curCSS(t, "position")) && (t.style.position = "relative");
        var r = e(t),
            i = r.offset(),
            s = parseInt(e.curCSS(t, "top", !0), 10) || 0,
            o = parseInt(e.curCSS(t, "left", !0), 10) || 0,
            u = {
                top: n.top - i.top + s,
                left: n.left - i.left + o
            };
        "using" in n ? n.using.call(t, u) : r.css(u)
    }, e.fn.offset = function(t) {
        var n = this[0];
        return !n || !n.ownerDocument ? null : t ? e.isFunction(t) ? this.each(function(n) {
            e(this).offset(t.call(this, n, e(this).offset()))
        }) : this.each(function() {
            e.offset.setOffset(this, t)
        }) : u.call(this)
    }), function() {
        var t = document.getElementsByTagName("body")[0],
            n = document.createElement("div"),
            r, i, o, u, a;
        r = document.createElement(t ? "div" : "body"), o = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, t && e.extend(o, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (var f in o) r.style[f] = o[f];
        r.appendChild(n), i = t || document.documentElement, i.insertBefore(r, i.firstChild), n.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", u = e(n).offset(function(e, t) {
            return t
        }).offset(), r.innerHTML = "", i.removeChild(r), a = u.top + u.left + (t ? 2e3 : 0), s.fractions = a > 21 && a < 22
    }()
}(jQuery), function(e, t) {
    var n = 0;
    e.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null
        },
        pending: 0,
        _create: function() {
            var t = this,
                n = this.element[0].ownerDocument,
                r;
            this.isMultiLine = this.element.is("textarea"), this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete", function(n) {
                if (t.options.disabled || t.element.propAttr("readOnly")) return;
                r = !1;
                var i = e.ui.keyCode;
                switch (n.keyCode) {
                case i.PAGE_UP:
                    t._move("previousPage", n);
                    break;
                case i.PAGE_DOWN:
                    t._move("nextPage", n);
                    break;
                case i.UP:
                    t._keyEvent("previous", n);
                    break;
                case i.DOWN:
                    t._keyEvent("next", n);
                    break;
                case i.ENTER:
                case i.NUMPAD_ENTER:
                    t.menu.active && (r = !0, n.preventDefault());
                case i.TAB:
                    if (!t.menu.active) return;
                    t.menu.select(n);
                    break;
                case i.ESCAPE:
                    t.element.val(t.term), t.close(n);
                    break;
                default:
                    clearTimeout(t.searching), t.searching = setTimeout(function() {
                        t.term != t.element.val() && (t.selectedItem = null, t.search(null, n))
                    }, t.options.delay)
                }
            }).bind("keypress.autocomplete", function(e) {
                r && (r = !1, e.preventDefault())
            }).bind("focus.autocomplete", function() {
                if (t.options.disabled) return;
                t.selectedItem = null, t.previous = t.element.val()
            }).bind("blur.autocomplete", function(e) {
                if (t.options.disabled) return;
                clearTimeout(t.searching), t.closing = setTimeout(function() {
                    t.close(e), t._change(e)
                }, 150)
            }), this._initSource(), this.menu = e("<ul></ul>").addClass("ui-autocomplete").appendTo(e(this.options.appendTo || "body", n)[0]).mousedown(function(n) {
                var r = t.menu.element[0];
                e(n.target).closest(".ui-menu-item").length || setTimeout(function() {
                    e(document).one("mousedown", function(n) {
                        n.target !== t.element[0] && n.target !== r && !e.ui.contains(r, n.target) && t.close()
                    })
                }, 1), setTimeout(function() {
                    clearTimeout(t.closing)
                }, 13)
            }).menu({
                focus: function(e, n) {
                    var r = n.item.data("item.autocomplete");
                    !1 !== t._trigger("focus", e, {
                        item: r
                    }) && /^key/.test(e.originalEvent.type) && t.element.val(r.value)
                },
                selected: function(e, r) {
                    var i = r.item.data("item.autocomplete"),
                        s = t.previous;
                    t.element[0] !== n.activeElement && (t.element.focus(), t.previous = s, setTimeout(function() {
                        t.previous = s, t.selectedItem = i
                    }, 1)), !1 !== t._trigger("select", e, {
                        item: i
                    }) && t.element.val(i.value), t.term = t.element.val(), t.close(e), t.selectedItem = i
                },
                blur: function(e, n) {
                    t.menu.element.is(":visible") && t.element.val() !== t.term && t.element.val(t.term)
                }
            }).zIndex(this.element.zIndex() + 1).css({
                top: 0,
                left: 0
            }).hide().data("menu"), e.fn.bgiframe && this.menu.element.bgiframe(), t.beforeunloadHandler = function() {
                t.element.removeAttr("autocomplete")
            }, e(window).bind("beforeunload", t.beforeunloadHandler)
        },
        destroy: function() {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), this.menu.element.remove(), e(window).unbind("beforeunload", this.beforeunloadHandler), e.Widget.prototype.destroy.call(this)
        },
        _setOption: function(t, n) {
            e.Widget.prototype._setOption.apply(this, arguments), t === "source" && this._initSource(), t === "appendTo" && this.menu.element.appendTo(e(n || "body", this.element[0].ownerDocument)[0]), t === "disabled" && n && this.xhr && this.xhr.abort()
        },
        _initSource: function() {
            var t = this,
                n, r;
            e.isArray(this.options.source) ? (n = this.options.source, this.source = function(t, r) {
                r(e.ui.autocomplete.filter(n, t.term))
            }) : typeof this.options.source == "string" ? (r = this.options.source, this.source = function(n, i) {
                t.xhr && t.xhr.abort(), t.xhr = e.ajax({
                    url: r,
                    data: n,
                    dataType: "json",
                    success: function(e, t) {
                        i(e)
                    },
                    error: function() {
                        i([])
                    }
                })
            }) : this.source = this.options.source
        },
        search: function(e, t) {
            e = e != null ? e : this.element.val(), this.term = this.element.val();
            if (e.length < this.options.minLength) return this.close(t);
            clearTimeout(this.closing);
            if (this._trigger("search", t) === !1) return;
            return this._search(e)
        },
        _search: function(e) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({
                term: e
            }, this._response())
        },
        _response: function() {
            var e = this,
                t = ++n;
            return function(r) {
                t === n && e.__response(r), e.pending--, e.pending || e.element.removeClass("ui-autocomplete-loading")
            }
        },
        __response: function(e) {
            !this.options.disabled && e && e.length ? (e = this._normalize(e), this._suggest(e), this._trigger("open")) : this.close()
        },
        close: function(e) {
            clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", e))
        },
        _change: function(e) {
            this.previous !== this.element.val() && this._trigger("change", e, {
                item: this.selectedItem
            })
        },
        _normalize: function(t) {
            return t.length && t[0].label && t[0].value ? t : e.map(t, function(t) {
                return typeof t == "string" ? {
                    label: t,
                    value: t
                } : e.extend({
                    label: t.label || t.value,
                    value: t.value || t.label
                }, t)
            })
        },
        _suggest: function(t) {
            var n = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(n, t), this.menu.deactivate(), this.menu.refresh(), n.show(), this._resizeMenu(), n.position(e.extend({
                of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next(new e.Event("mouseover"))
        },
        _resizeMenu: function() {
            var e = this.menu.element;
            e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(t, n) {
            var r = this;
            e.each(n, function(e, n) {
                r._renderItem(t, n)
            })
        },
        _renderItem: function(t, n) {
            return e("<li></li>").data("item.autocomplete", n).append(e("<a></a>").text(n.label)).appendTo(t)
        },
        _move: function(e, t) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, t);
                return
            }
            if (this.menu.first() && /^previous/.test(e) || this.menu.last() && /^next/.test(e)) {
                this.element.val(this.term), this.menu.deactivate();
                return
            }
            this.menu[e](t)
        },
        widget: function() {
            return this.menu.element
        },
        _keyEvent: function(e, t) {
            if (!this.isMultiLine || this.menu.element.is(":visible")) this._move(e, t), t.preventDefault()
        }
    }), e.extend(e.ui.autocomplete, {
        escapeRegex: function(e) {
            return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        },
        filter: function(t, n) {
            var r = new RegExp(e.ui.autocomplete.escapeRegex(n), "i");
            return e.grep(t, function(e) {
                return r.test(e.label || e.value || e)
            })
        }
    })
}(jQuery), function(e) {
    e.widget("ui.menu", {
        _create: function() {
            var t = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function(n) {
                if (!e(n.target).closest(".ui-menu-item a").length) return;
                n.preventDefault(), t.select(n)
            }), this.refresh()
        },
        refresh: function() {
            var t = this,
                n = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
            n.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(n) {
                t.activate(n, e(this).parent())
            }).mouseleave(function() {
                t.deactivate()
            })
        },
        activate: function(e, t) {
            this.deactivate();
            if (this.hasScroll()) {
                var n = t.offset().top - this.element.offset().top,
                    r = this.element.scrollTop(),
                    i = this.element.height();
                n < 0 ? this.element.scrollTop(r + n) : n >= i && this.element.scrollTop(r + n - i + t.height())
            }
            this.active = t.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), this._trigger("focus", e, {
                item: t
            })
        },
        deactivate: function() {
            if (!this.active) return;
            this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null
        },
        next: function(e) {
            this.move("next", ".ui-menu-item:first", e)
        },
        previous: function(e) {
            this.move("prev", ".ui-menu-item:last", e)
        },
        first: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        last: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        move: function(e, t, n) {
            if (!this.active) {
                this.activate(n, this.element.children(t));
                return
            }
            var r = this.active[e + "All"](".ui-menu-item").eq(0);
            r.length ? this.activate(n, r) : this.activate(n, this.element.children(t))
        },
        nextPage: function(t) {
            if (this.hasScroll()) {
                if (!this.active || this.last()) {
                    this.activate(t, this.element.children(".ui-menu-item:first"));
                    return
                }
                var n = this.active.offset().top,
                    r = this.element.height(),
                    i = this.element.children(".ui-menu-item").filter(function() {
                        var t = e(this).offset().top - n - r + e(this).height();
                        return t < 10 && t > -10
                    });
                i.length || (i = this.element.children(".ui-menu-item:last")), this.activate(t, i)
            } else this.activate(t, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
        },
        previousPage: function(t) {
            if (this.hasScroll()) {
                if (!this.active || this.first()) {
                    this.activate(t, this.element.children(".ui-menu-item:last"));
                    return
                }
                var n = this.active.offset().top,
                    r = this.element.height(),
                    i = this.element.children(".ui-menu-item").filter(function() {
                        var t = e(this).offset().top - n + r - e(this).height();
                        return t < 10 && t > -10
                    });
                i.length || (i = this.element.children(".ui-menu-item:first")), this.activate(t, i)
            } else this.activate(t, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
        },
        hasScroll: function() {
            return this.element.height() < this.element[e.fn.prop ? "prop" : "attr"]("scrollHeight")
        },
        select: function(e) {
            this._trigger("selected", e, {
                item: this.active
            })
        }
    })
}(jQuery), function(e, t) {
    var n = 5;
    e.widget("ui.slider", e.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null
        },
        _create: function() {
            var t = this,
                r = this.options,
                i = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                s = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                o = r.values && r.values.length || 1,
                u = [];
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (r.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = e([]), r.range && (r.range === !0 && (r.values || (r.values = [this._valueMin(), this._valueMin()]), r.values.length && r.values.length !== 2 && (r.values = [r.values[0], r.values[0]])), this.range = e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (r.range === "min" || r.range === "max" ? " ui-slider-range-" + r.range : "")));
            for (var a = i.length; a < o; a += 1) u.push(s);
            this.handles = i.add(e(u.join("")).appendTo(t.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(e) {
                e.preventDefault()
            }).hover(function() {
                r.disabled || e(this).addClass("ui-state-hover")
            }, function() {
                e(this).removeClass("ui-state-hover")
            }).focus(function() {
                r.disabled ? e(this).blur() : (e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), e(this).addClass("ui-state-focus"))
            }).blur(function() {
                e(this).removeClass("ui-state-focus")
            }), this.handles.each(function(t) {
                e(this).data("index.ui-slider-handle", t)
            }), this.handles.keydown(function(r) {
                var i = e(this).data("index.ui-slider-handle"),
                    s, o, u, a;
                if (t.options.disabled) return;
                switch (r.keyCode) {
                case e.ui.keyCode.HOME:
                case e.ui.keyCode.END:
                case e.ui.keyCode.PAGE_UP:
                case e.ui.keyCode.PAGE_DOWN:
                case e.ui.keyCode.UP:
                case e.ui.keyCode.RIGHT:
                case e.ui.keyCode.DOWN:
                case e.ui.keyCode.LEFT:
                    r.preventDefault();
                    if (!t._keySliding) {
                        t._keySliding = !0, e(this).addClass("ui-state-active"), s = t._start(r, i);
                        if (s === !1) return
                    }
                }
                a = t.options.step, t.options.values && t.options.values.length ? o = u = t.values(i) : o = u = t.value();
                switch (r.keyCode) {
                case e.ui.keyCode.HOME:
                    u = t._valueMin();
                    break;
                case e.ui.keyCode.END:
                    u = t._valueMax();
                    break;
                case e.ui.keyCode.PAGE_UP:
                    u = t._trimAlignValue(o + (t._valueMax() - t._valueMin()) / n);
                    break;
                case e.ui.keyCode.PAGE_DOWN:
                    u = t._trimAlignValue(o - (t._valueMax() - t._valueMin()) / n);
                    break;
                case e.ui.keyCode.UP:
                case e.ui.keyCode.RIGHT:
                    if (o === t._valueMax()) return;
                    u = t._trimAlignValue(o + a);
                    break;
                case e.ui.keyCode.DOWN:
                case e.ui.keyCode.LEFT:
                    if (o === t._valueMin()) return;
                    u = t._trimAlignValue(o - a)
                }
                t._slide(r, i, u)
            }).keyup(function(n) {
                var r = e(this).data("index.ui-slider-handle");
                t._keySliding && (t._keySliding = !1, t._stop(n, r), t._change(n, r), e(this).removeClass("ui-state-active"))
            }), this._refreshValue(), this._animateOff = !1
        },
        destroy: function() {
            return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this
        },
        _mouseCapture: function(t) {
            var n = this.options,
                r, i, s, o, u, a, f, l, c;
            return n.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), r = {
                x: t.pageX,
                y: t.pageY
            }, i = this._normValueFromMouse(r), s = this._valueMax() - this._valueMin() + 1, u = this, this.handles.each(function(t) {
                var n = Math.abs(i - u.values(t));
                s > n && (s = n, o = e(this), a = t)
            }), n.range === !0 && this.values(1) === n.min && (a += 1, o = e(this.handles[a])), f = this._start(t, a), f === !1 ? !1 : (this._mouseSliding = !0, u._handleIndex = a, o.addClass("ui-state-active").focus(), l = o.offset(), c = !e(t.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = c ? {
                left: 0,
                top: 0
            } : {
                left: t.pageX - l.left - o.width() / 2,
                top: t.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(t, a, i), this._animateOff = !0, !0))
        },
        _mouseStart: function(e) {
            return !0
        },
        _mouseDrag: function(e) {
            var t = {
                x: e.pageX,
                y: e.pageY
            },
                n = this._normValueFromMouse(t);
            return this._slide(e, this._handleIndex, n), !1
        },
        _mouseStop: function(e) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function() {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(e) {
            var t, n, r, i, s;
            return this.orientation === "horizontal" ? (t = this.elementSize.width, n = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, n = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), r = n / t, r > 1 && (r = 1), r < 0 && (r = 0), this.orientation === "vertical" && (r = 1 - r), i = this._valueMax() - this._valueMin(), s = this._valueMin() + r * i, this._trimAlignValue(s)
        },
        _start: function(e, t) {
            var n = {
                handle: this.handles[t],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("start", e, n)
        },
        _slide: function(e, t, n) {
            var r, i, s;
            this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (t === 0 && n > r || t === 1 && n < r) && (n = r), n !== this.values(t) && (i = this.values(), i[t] = n, s = this._trigger("slide", e, {
                handle: this.handles[t],
                value: n,
                values: i
            }), r = this.values(t ? 0 : 1), s !== !1 && this.values(t, n, !0))) : n !== this.value() && (s = this._trigger("slide", e, {
                handle: this.handles[t],
                value: n
            }), s !== !1 && this.value(n))
        },
        _stop: function(e, t) {
            var n = {
                handle: this.handles[t],
                value: this.value()
            };
            this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("stop", e, n)
        },
        _change: function(e, t) {
            if (!this._keySliding && !this._mouseSliding) {
                var n = {
                    handle: this.handles[t],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("change", e, n)
            }
        },
        value: function(e) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0);
                return
            }
            return this._value()
        },
        values: function(t, n) {
            var r, i, s;
            if (arguments.length > 1) {
                this.options.values[t] = this._trimAlignValue(n), this._refreshValue(), this._change(null, t);
                return
            }
            if (!arguments.length) return this._values();
            if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
            r = this.options.values, i = arguments[0];
            for (s = 0; s < r.length; s += 1) r[s] = this._trimAlignValue(i[s]), this._change(null, s);
            this._refreshValue()
        },
        _setOption: function(t, n) {
            var r, i = 0;
            e.isArray(this.options.values) && (i = this.options.values.length), e.Widget.prototype._setOption.apply(this, arguments);
            switch (t) {
            case "disabled":
                n ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
                break;
            case "orientation":
                this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                break;
            case "value":
                this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                break;
            case "values":
                this._animateOff = !0, this._refreshValue();
                for (r = 0; r < i; r += 1) this._change(null, r);
                this._animateOff = !1
            }
        },
        _value: function() {
            var e = this.options.value;
            return e = this._trimAlignValue(e), e
        },
        _values: function(e) {
            var t, n, r;
            if (arguments.length) return t = this.options.values[e], t = this._trimAlignValue(t), t;
            n = this.options.values.slice();
            for (r = 0; r < n.length; r += 1) n[r] = this._trimAlignValue(n[r]);
            return n
        },
        _trimAlignValue: function(e) {
            if (e <= this._valueMin()) return this._valueMin();
            if (e >= this._valueMax()) return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1,
                n = (e - this._valueMin()) % t,
                r = e - n;
            return Math.abs(n) * 2 >= t && (r += n > 0 ? t : -t), parseFloat(r.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var t = this.options.range,
                n = this.options,
                r = this,
                i = this._animateOff ? !1 : n.animate,
                s, o = {},
                u, a, f, l;
            this.options.values && this.options.values.length ? this.handles.each(function(t, a) {
                s = (r.values(t) - r._valueMin()) / (r._valueMax() - r._valueMin()) * 100, o[r.orientation === "horizontal" ? "left" : "bottom"] = s + "%", e(this).stop(1, 1)[i ? "animate" : "css"](o, n.animate), r.options.range === !0 && (r.orientation === "horizontal" ? (t === 0 && r.range.stop(1, 1)[i ? "animate" : "css"]({
                    left: s + "%"
                }, n.animate), t === 1 && r.range[i ? "animate" : "css"]({
                    width: s - u + "%"
                }, {
                    queue: !1,
                    duration: n.animate
                })) : (t === 0 && r.range.stop(1, 1)[i ? "animate" : "css"]({
                    bottom: s + "%"
                }, n.animate), t === 1 && r.range[i ? "animate" : "css"]({
                    height: s - u + "%"
                }, {
                    queue: !1,
                    duration: n.animate
                }))), u = s
            }) : (a = this.value(), f = this._valueMin(), l = this._valueMax(), s = l !== f ? (a - f) / (l - f) * 100 : 0, o[r.orientation === "horizontal" ? "left" : "bottom"] = s + "%", this.handle.stop(1, 1)[i ? "animate" : "css"](o, n.animate), t === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[i ? "animate" : "css"]({
                width: s + "%"
            }, n.animate), t === "max" && this.orientation === "horizontal" && this.range[i ? "animate" : "css"]({
                width: 100 - s + "%"
            }, {
                queue: !1,
                duration: n.animate
            }), t === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[i ? "animate" : "css"]({
                height: s + "%"
            }, n.animate), t === "max" && this.orientation === "vertical" && this.range[i ? "animate" : "css"]({
                height: 100 - s + "%"
            }, {
                queue: !1,
                duration: n.animate
            }))
        }
    }), e.extend(e.ui.slider, {
        version: "1.8.22"
    })
}(jQuery), jQuery.effects ||
function(e, t) {
    function n(t) {
        var n;
        return t && t.constructor == Array && t.length == 3 ? t : (n = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t)) ? [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10)] : (n = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(t)) ? [parseFloat(n[1]) * 2.55, parseFloat(n[2]) * 2.55, parseFloat(n[3]) * 2.55] : (n = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(t)) ? [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)] : (n = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(t)) ? [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)] : (n = /rgba\(0, 0, 0, 0\)/.exec(t)) ? i.transparent : i[e.trim(t).toLowerCase()]
    }
    function r(t, r) {
        var i;
        do {
            i = (e.curCSS || e.css)(t, r);
            if (i != "" && i != "transparent" || e.nodeName(t, "body")) break;
            r = "backgroundColor"
        } while (t = t.parentNode);
        return n(i)
    }
    function u() {
        var e = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
            t = {},
            n, r;
        if (e && e.length && e[0] && e[e[0]]) {
            var i = e.length;
            while (i--) n = e[i], typeof e[n] == "string" && (r = n.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            }), t[r] = e[n])
        } else for (n in e) typeof e[n] == "string" && (t[n] = e[n]);
        return t
    }
    function a(t) {
        var n, r;
        for (n in t) r = t[n], (r == null || e.isFunction(r) || n in o || /scrollbar/.test(n) || !/color/i.test(n) && isNaN(parseFloat(r))) && delete t[n];
        return t
    }
    function f(e, t) {
        var n = {
            _: 0
        },
            r;
        for (r in t) e[r] != t[r] && (n[r] = t[r]);
        return n
    }
    function l(t, n, r, i) {
        typeof t == "object" && (i = n, r = null, n = t, t = n.effect), e.isFunction(n) && (i = n, r = null, n = {});
        if (typeof n == "number" || e.fx.speeds[n]) i = r, r = n, n = {};
        return e.isFunction(r) && (i = r, r = null), n = n || {}, r = r || n.duration, r = e.fx.off ? 0 : typeof r == "number" ? r : r in e.fx.speeds ? e.fx.speeds[r] : e.fx.speeds._default, i = i || n.complete, [t, n, r, i]
    }
    function c(t) {
        return !t || typeof t == "number" || e.fx.speeds[t] ? !0 : typeof t == "string" && !e.effects[t] ? !0 : !1
    }
    e.effects = {}, e.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function(t, i) {
        e.fx.step[i] = function(e) {
            e.colorInit || (e.start = r(e.elem, i), e.end = n(e.end), e.colorInit = !0), e.elem.style[i] = "rgb(" + Math.max(Math.min(parseInt(e.pos * (e.end[0] - e.start[0]) + e.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(e.pos * (e.end[1] - e.start[1]) + e.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(e.pos * (e.end[2] - e.start[2]) + e.start[2], 10), 255), 0) + ")"
        }
    });
    var i = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    },
        s = ["add", "remove", "toggle"],
        o = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
    e.effects.animateClass = function(t, n, r, i) {
        return e.isFunction(r) && (i = r, r = null), this.queue(function() {
            var o = e(this),
                l = o.attr("style") || " ",
                c = a(u.call(this)),
                h, p = o.attr("class") || "";
            e.each(s, function(e, n) {
                t[n] && o[n + "Class"](t[n])
            }), h = a(u.call(this)), o.attr("class", p), o.animate(f(c, h), {
                queue: !1,
                duration: n,
                easing: r,
                complete: function() {
                    e.each(s, function(e, n) {
                        t[n] && o[n + "Class"](t[n])
                    }), typeof o.attr("style") == "object" ? (o.attr("style").cssText = "", o.attr("style").cssText = l) : o.attr("style", l), i && i.apply(this, arguments), e.dequeue(this)
                }
            })
        })
    }, e.fn.extend({
        _addClass: e.fn.addClass,
        addClass: function(t, n, r, i) {
            return n ? e.effects.animateClass.apply(this, [{
                add: t
            },
            n, r, i]) : this._addClass(t)
        },
        _removeClass: e.fn.removeClass,
        removeClass: function(t, n, r, i) {
            return n ? e.effects.animateClass.apply(this, [{
                remove: t
            },
            n, r, i]) : this._removeClass(t)
        },
        _toggleClass: e.fn.toggleClass,
        toggleClass: function(n, r, i, s, o) {
            return typeof r == "boolean" || r === t ? i ? e.effects.animateClass.apply(this, [r ? {
                add: n
            } : {
                remove: n
            },
            i, s, o]) : this._toggleClass(n, r) : e.effects.animateClass.apply(this, [{
                toggle: n
            },
            r, i, s])
        },
        switchClass: function(t, n, r, i, s) {
            return e.effects.animateClass.apply(this, [{
                add: n,
                remove: t
            },
            r, i, s])
        }
    }), e.extend(e.effects, {
        version: "1.8.22",
        save: function(e, t) {
            for (var n = 0; n < t.length; n++) t[n] !== null && e.data("ec.storage." + t[n], e[0].style[t[n]])
        },
        restore: function(e, t) {
            for (var n = 0; n < t.length; n++) t[n] !== null && e.css(t[n], e.data("ec.storage." + t[n]))
        },
        setMode: function(e, t) {
            return t == "toggle" && (t = e.is(":hidden") ? "show" : "hide"), t
        },
        getBaseline: function(e, t) {
            var n, r;
            switch (e[0]) {
            case "top":
                n = 0;
                break;
            case "middle":
                n = .5;
                break;
            case "bottom":
                n = 1;
                break;
            default:
                n = e[0] / t.height
            }
            switch (e[1]) {
            case "left":
                r = 0;
                break;
            case "center":
                r = .5;
                break;
            case "right":
                r = 1;
                break;
            default:
                r = e[1] / t.width
            }
            return {
                x: r,
                y: n
            }
        },
        createWrapper: function(t) {
            if (t.parent().is(".ui-effects-wrapper")) return t.parent();
            var n = {
                width: t.outerWidth(!0),
                height: t.outerHeight(!0),
                "float": t.css("float")
            },
                r = e("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }),
                i = document.activeElement;
            try {
                i.id
            } catch (s) {
                i = document.body
            }
            return t.wrap(r), (t[0] === i || e.contains(t[0], i)) && e(i).focus(), r = t.parent(), t.css("position") == "static" ? (r.css({
                position: "relative"
            }), t.css({
                position: "relative"
            })) : (e.extend(n, {
                position: t.css("position"),
                zIndex: t.css("z-index")
            }), e.each(["top", "left", "bottom", "right"], function(e, r) {
                n[r] = t.css(r), isNaN(parseInt(n[r], 10)) && (n[r] = "auto")
            }), t.css({
                position: "relative",
                top: 0,
                left: 0,
                right: "auto",
                bottom: "auto"
            })), r.css(n).show()
        },
        removeWrapper: function(t) {
            var n, r = document.activeElement;
            return t.parent().is(".ui-effects-wrapper") ? (n = t.parent().replaceWith(t), (t[0] === r || e.contains(t[0], r)) && e(r).focus(), n) : t
        },
        setTransition: function(t, n, r, i) {
            return i = i || {}, e.each(n, function(e, n) {
                var s = t.cssUnit(n);
                s[0] > 0 && (i[n] = s[0] * r + s[1])
            }), i
        }
    }), e.fn.extend({
        effect: function(t, n, r, i) {
            var s = l.apply(this, arguments),
                o = {
                    options: s[1],
                    duration: s[2],
                    callback: s[3]
                },
                u = o.options.mode,
                a = e.effects[t];
            return e.fx.off || !a ? u ? this[u](o.duration, o.callback) : this.each(function() {
                o.callback && o.callback.call(this)
            }) : a.call(this, o)
        },
        _show: e.fn.show,
        show: function(e) {
            if (c(e)) return this._show.apply(this, arguments);
            var t = l.apply(this, arguments);
            return t[1].mode = "show", this.effect.apply(this, t)
        },
        _hide: e.fn.hide,
        hide: function(e) {
            if (c(e)) return this._hide.apply(this, arguments);
            var t = l.apply(this, arguments);
            return t[1].mode = "hide", this.effect.apply(this, t)
        },
        __toggle: e.fn.toggle,
        toggle: function(t) {
            if (c(t) || typeof t == "boolean" || e.isFunction(t)) return this.__toggle.apply(this, arguments);
            var n = l.apply(this, arguments);
            return n[1].mode = "toggle", this.effect.apply(this, n)
        },
        cssUnit: function(t) {
            var n = this.css(t),
                r = [];
            return e.each(["em", "px", "%", "pt"], function(e, t) {
                n.indexOf(t) > 0 && (r = [parseFloat(n), t])
            }), r
        }
    }), e.easing.jswing = e.easing.swing, e.extend(e.easing, {
        def: "easeOutQuad",
        swing: function(t, n, r, i, s) {
            return e.easing[e.easing.def](t, n, r, i, s)
        },
        easeInQuad: function(e, t, n, r, i) {
            return r * (t /= i) * t + n
        },
        easeOutQuad: function(e, t, n, r, i) {
            return -r * (t /= i) * (t - 2) + n
        },
        easeInOutQuad: function(e, t, n, r, i) {
            return (t /= i / 2) < 1 ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n
        },
        easeInCubic: function(e, t, n, r, i) {
            return r * (t /= i) * t * t + n
        },
        easeOutCubic: function(e, t, n, r, i) {
            return r * ((t = t / i - 1) * t * t + 1) + n
        },
        easeInOutCubic: function(e, t, n, r, i) {
            return (t /= i / 2) < 1 ? r / 2 * t * t * t + n : r / 2 * ((t -= 2) * t * t + 2) + n
        },
        easeInQuart: function(e, t, n, r, i) {
            return r * (t /= i) * t * t * t + n
        },
        easeOutQuart: function(e, t, n, r, i) {
            return -r * ((t = t / i - 1) * t * t * t - 1) + n
        },
        easeInOutQuart: function(e, t, n, r, i) {
            return (t /= i / 2) < 1 ? r / 2 * t * t * t * t + n : -r / 2 * ((t -= 2) * t * t * t - 2) + n
        },
        easeInQuint: function(e, t, n, r, i) {
            return r * (t /= i) * t * t * t * t + n
        },
        easeOutQuint: function(e, t, n, r, i) {
            return r * ((t = t / i - 1) * t * t * t * t + 1) + n
        },
        easeInOutQuint: function(e, t, n, r, i) {
            return (t /= i / 2) < 1 ? r / 2 * t * t * t * t * t + n : r / 2 * ((t -= 2) * t * t * t * t + 2) + n
        },
        easeInSine: function(e, t, n, r, i) {
            return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
        },
        easeOutSine: function(e, t, n, r, i) {
            return r * Math.sin(t / i * (Math.PI / 2)) + n
        },
        easeInOutSine: function(e, t, n, r, i) {
            return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
        },
        easeInExpo: function(e, t, n, r, i) {
            return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
        },
        easeOutExpo: function(e, t, n, r, i) {
            return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
        },
        easeInOutExpo: function(e, t, n, r, i) {
            return t == 0 ? n : t == i ? n + r : (t /= i / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + n : r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
        },
        easeInCirc: function(e, t, n, r, i) {
            return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
        },
        easeOutCirc: function(e, t, n, r, i) {
            return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
        },
        easeInOutCirc: function(e, t, n, r, i) {
            return (t /= i / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + n : r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
        },
        easeInElastic: function(e, t, n, r, i) {
            var s = 1.70158,
                o = 0,
                u = r;
            if (t == 0) return n;
            if ((t /= i) == 1) return n + r;
            o || (o = i * .3);
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else var s = o / (2 * Math.PI) * Math.asin(r / u);
            return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
        },
        easeOutElastic: function(e, t, n, r, i) {
            var s = 1.70158,
                o = 0,
                u = r;
            if (t == 0) return n;
            if ((t /= i) == 1) return n + r;
            o || (o = i * .3);
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else var s = o / (2 * Math.PI) * Math.asin(r / u);
            return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
        },
        easeInOutElastic: function(e, t, n, r, i) {
            var s = 1.70158,
                o = 0,
                u = r;
            if (t == 0) return n;
            if ((t /= i / 2) == 2) return n + r;
            o || (o = i * .3 * 1.5);
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else var s = o / (2 * Math.PI) * Math.asin(r / u);
            return t < 1 ? -0.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n : u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
        },
        easeInBack: function(e, n, r, i, s, o) {
            return o == t && (o = 1.70158), i * (n /= s) * n * ((o + 1) * n - o) + r
        },
        easeOutBack: function(e, n, r, i, s, o) {
            return o == t && (o = 1.70158), i * ((n = n / s - 1) * n * ((o + 1) * n + o) + 1) + r
        },
        easeInOutBack: function(e, n, r, i, s, o) {
            return o == t && (o = 1.70158), (n /= s / 2) < 1 ? i / 2 * n * n * (((o *= 1.525) + 1) * n - o) + r : i / 2 * ((n -= 2) * n * (((o *= 1.525) + 1) * n + o) + 2) + r
        },
        easeInBounce: function(t, n, r, i, s) {
            return i - e.easing.easeOutBounce(t, s - n, 0, i, s) + r
        },
        easeOutBounce: function(e, t, n, r, i) {
            return (t /= i) < 1 / 2.75 ? r * 7.5625 * t * t + n : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        },
        easeInOutBounce: function(t, n, r, i, s) {
            return n < s / 2 ? e.easing.easeInBounce(t, n * 2, 0, i, s) * .5 + r : e.easing.easeOutBounce(t, n * 2 - s, 0, i, s) * .5 + i * .5 + r
        }
    })
}(jQuery), function(e, t, n) {
    "$:nomunge";

    function f(e) {
        return e = e || location.href, "#" + e.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var r = "hashchange",
        i = document,
        s, o = e.event.special,
        u = i.documentMode,
        a = "on" + r in t && (u === n || u > 7);
    e.fn[r] = function(e) {
        return e ? this.bind(r, e) : this.trigger(r)
    }, e.fn[r].delay = 50, o[r] = e.extend(o[r], {
        setup: function() {
            if (a) return !1;
            e(s.start)
        },
        teardown: function() {
            if (a) return !1;
            e(s.stop)
        }
    }), s = function() {
        function p() {
            var n = f(),
                i = h(u);
            n !== u ? (c(u = n, i), e(t).trigger(r)) : i !== u && (location.href = location.href.replace(/#.*/, "") + i), o = setTimeout(p, e.fn[r].delay)
        }
        var s = {},
            o, u = f(),
            l = function(e) {
                return e
            },
            c = l,
            h = l;
        return s.start = function() {
            o || p()
        }, s.stop = function() {
            o && clearTimeout(o), o = n
        }, e.browser.msie && !a &&
        function() {
            var t, n;
            s.start = function() {
                t || (n = e.fn[r].src, n = n && n + f(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                    n || c(f()), p()
                }).attr("src", n || "javascript:0").insertAfter("body")[0].contentWindow, i.onpropertychange = function() {
                    try {
                        event.propertyName === "title" && (t.document.title = i.title)
                    } catch (e) {}
                })
            }, s.stop = l, h = function() {
                return f(t.location.href)
            }, c = function(n, s) {
                var o = t.document,
                    u = e.fn[r].domain;
                n !== s && (o.title = i.title, o.open(), u && o.write('<script>document.domain="' + u + '"</script>'), o.close(), t.location.hash = n)
            }
        }(), s
    }()
}(jQuery, this), function(e) {
    function t(t, n) {
        function m() {
            return r.update(), y(), r
        }
        function g() {
            f.obj.css(c, p / u.ratio), o.obj.css(c, -p), v.start = f.obj.offset()[c];
            var e = h.toLowerCase();
            u.obj.css(e, a[n.axis]), a.obj.css(e, a[n.axis]), f.obj.css(e, f[n.axis]), n.onscroll && n.onscroll(r, p)
        }
        function y() {
            f.obj.bind("mousedown", b), f.obj[0].ontouchstart = function(e) {
                return e.preventDefault(), f.obj.unbind("mousedown"), b(e.touches[0]), !1
            }, a.obj.bind("mouseup", S), n.scroll && this.addEventListener ? (i[0].addEventListener("DOMMouseScroll", w, !1), i[0].addEventListener("mousewheel", w, !1)) : n.scroll && (i[0].onmousewheel = w)
        }
        function b(t) {
            v.start = l ? t.pageX : t.pageY;
            var n = parseInt(f.obj.css(c));
            return d.start = n == "auto" ? 0 : n, e(document).bind("mousemove", S), document.ontouchmove = function(t) {
                e(document).unbind("mousemove"), S(t.touches[0])
            }, e(document).bind("mouseup", E), f.obj.bind("mouseup", E), f.obj[0].ontouchend = document.ontouchend = function(t) {
                e(document).unbind("mouseup"), f.obj.unbind("mouseup"), E(t.touches[0])
            }, !1
        }
        function w(t) {
            if (!(o.ratio >= 1)) {
                var t = t || window.event,
                    i = t.wheelDelta ? t.wheelDelta / 120 : -t.detail / 3;
                p -= i * n.wheel, p = Math.min(o[n.axis] - s[n.axis], Math.max(0, p)), f.obj.css(c, p / u.ratio), o.obj.css(c, -p);
                if (n.lockscroll || p !== o[n.axis] - s[n.axis] && p !== 0) t = e.event.fix(t), t.preventDefault();
                n.onscroll && n.onscroll(r, p)
            }
        }
        function E(t) {
            return e(document).unbind("mousemove", S), e(document).unbind("mouseup", E), f.obj.unbind("mouseup", E), document.ontouchmove = f.obj[0].ontouchend = document.ontouchend = null, !1
        }
        function S(e) {
            return o.ratio >= 1 || (d.now = Math.min(a[n.axis] - f[n.axis], Math.max(0, d.start + ((l ? e.pageX : e.pageY) - v.start))), p = d.now * u.ratio, o.obj.css(c, -p), f.obj.css(c, d.now), n.onscroll && n.onscroll(r, p)), !1
        }
        var r = this,
            i = t,
            s = {
                obj: e(".viewport", t)
            },
            o = {
                obj: e(".overview", t)
            },
            u = {
                obj: e(".scrollbar", t)
            },
            a = {
                obj: e(".track", u.obj)
            },
            f = {
                obj: e(".thumb", u.obj)
            },
            l = n.axis == "x",
            c = l ? "left" : "top",
            h = l ? "Width" : "Height",
            p, d = {
                start: 0,
                now: 0
            },
            v = {};
        return this.update = function(e) {
            s[n.axis] = s.obj[0]["offset" + h], o[n.axis] = o.obj["outer" + h](!0), o.ratio = s[n.axis] / o[n.axis], u.obj.toggleClass("disable", o.ratio >= 1), a[n.axis] = n.size == "auto" ? s[n.axis] : n.size, f[n.axis] = Math.min(a[n.axis], Math.max(0, n.sizethumb == "auto" ? a[n.axis] * o.ratio : n.sizethumb)), u.ratio = n.sizethumb == "auto" ? o[n.axis] / a[n.axis] : (o[n.axis] - s[n.axis]) / (a[n.axis] - f[n.axis]), p = e == "relative" && o.ratio <= 1 ? Math.min(o[n.axis] - s[n.axis], Math.max(0, p)) : 0, p = e == "bottom" && o.ratio <= 1 ? o[n.axis] - s[n.axis] : isNaN(parseInt(e)) ? p : parseInt(e), g()
        }, this.forceScroll = function(e) {
            console.log("actual tsb forceScroll", e), d.now = e / u.ratio, p = e, o.obj.css(c, -p), f.obj.css(c, d.now), n.onscroll && n.onscroll(r, p)
        }, m()
    }
    e.tiny = e.tiny || {}, e.tiny.scrollbar = {
        options: {
            axis: "y",
            wheel: 40,
            scroll: !0,
            lockscroll: !0,
            size: "auto",
            sizethumb: "auto",
            onscroll: null
        }
    }, e.fn.tinyscrollbar = function(n) {
        var n = e.extend({}, e.tiny.scrollbar.options, n);
        return this.each(function() {
            e(this).data("tsb", new t(e(this), n))
        }), this
    }, e.fn.tinyscrollbar_update = function(t) {
        return e(this).data("tsb") ? e(this).data("tsb").update(t) : e()
    }, e.fn.tinyscrollbar_forceScroll = function(t) {
        return e(this).data("tsb") ? e(this).data("tsb").forceScroll(t) : e()
    }
}(jQuery), function(e) {
    function t(t, n) {
        function g() {
            l = m ? e(o[0]).outerWidth(!0) : e(o[0]).outerHeight(!0);
            var t = Math.ceil((m ? i.outerWidth() : i.outerHeight()) / (l * n.display) - 1);
            return c = Math.max(1, Math.ceil(o.length / n.display) - t), h = Math.min(c, Math.max(1, n.start)) - 2, s.css(m ? "width" : "height", l * o.length), r.move(1), y(), r
        }
        function y() {
            n.controls && a.length > 0 && u.length > 0 && (a.click(function() {
                return r.move(-1), !1
            }), u.click(function() {
                return r.move(1), !1
            })), n.interval && t.hover(r.stop, r.start), n.pager && f.length > 0 && e("a", f).click(w)
        }
        function b() {
            n.controls && (a.toggleClass("disable", !(h > 0)), u.toggleClass("disable", !(h + 1 < c)));
            if (n.pager) {
                var t = e(".pagenum", f);
                t.removeClass("active"), e(t[h]).addClass("active")
            }
        }
        function w(t) {
            return e(this).hasClass("pagenum") && r.move(parseInt(this.rel), !0), !1
        }
        function E() {
            n.interval && !d && (clearTimeout(p), p = setTimeout(function() {
                h = h + 1 == c ? -1 : h, v = h + 1 == c ? !1 : h == 0 ? !0 : v, r.move(v ? 1 : -1)
            }, n.intervaltime))
        }
        var r = this,
            i = e(".viewport:first", t),
            s = e(".overview:first", t),
            o = s.children(),
            u = e(".next:first", t),
            a = e(".prev:first", t),
            f = e(".pager:first", t),
            l, c, h, p, d, v = !0,
            m = n.axis == "x";
        return this.stop = function() {
            clearTimeout(p), d = !0
        }, this.start = function() {
            d = !1, E()
        }, this.move = function(e, t) {
            h = t ? e : h += e;
            if (h > -1 && h < c) {
                var r = {};
                r[m ? "left" : "top"] = -(h * l * n.display), s.animate(r, {
                    queue: !1,
                    duration: n.animation ? n.duration : 0,
                    complete: function() {
                        typeof n.callback == "function" && n.callback.call(this, o[h], h)
                    }
                }), b(), E()
            }
        }, g()
    }
    e.tiny = e.tiny || {}, e.tiny.carousel = {
        options: {
            start: 1,
            display: 1,
            axis: "x",
            controls: !0,
            pager: !1,
            interval: !1,
            intervaltime: 3e3,
            rewind: !1,
            animation: !0,
            duration: 1e3,
            callback: null
        }
    }, e.fn.tinycarousel = function(n) {
        var n = e.extend({}, e.tiny.carousel.options, n);
        return this.each(function() {
            e(this).data("tcl", new t(e(this), n))
        }), this
    }, e.fn.tinycarousel_start = function() {
        e(this).data("tcl").start()
    }, e.fn.tinycarousel_stop = function() {
        e(this).data("tcl").stop()
    }, e.fn.tinycarousel_move = function(t) {
        e(this).data("tcl").move(t - 1, !0)
    }
}(jQuery), function(e) {
    e.fn.drag = function(t, n, r) {
        var i = typeof t == "string" ? t : "",
            s = e.isFunction(t) ? t : e.isFunction(n) ? n : null;
        return i.indexOf("drag") !== 0 && (i = "drag" + i), r = (t == s ? n : r) || {}, s ? this.bind(i, r, s) : this.trigger(i)
    };
    var t = e.event,
        n = t.special,
        r = n.drag = {
            defaults: {
                which: 1,
                distance: 0,
                not: ":input",
                handle: null,
                relative: !1,
                drop: !0,
                click: !1
            },
            datakey: "dragdata",
            noBubble: !0,
            add: function(t) {
                var n = e.data(this, r.datakey),
                    i = t.data || {};
                n.related += 1, e.each(r.defaults, function(e, t) {
                    i[e] !== undefined && (n[e] = i[e])
                })
            },
            remove: function() {
                e.data(this, r.datakey).related -= 1
            },
            setup: function() {
                if (e.data(this, r.datakey)) return;
                var n = e.extend({
                    related: 0
                }, r.defaults);
                e.data(this, r.datakey, n), t.add(this, "touchstart mousedown", r.init, n), this.attachEvent && this.attachEvent("ondragstart", r.dontstart)
            },
            teardown: function() {
                var n = e.data(this, r.datakey) || {};
                if (n.related) return;
                e.removeData(this, r.datakey), t.remove(this, "touchstart mousedown", r.init), r.textselect(!0), this.detachEvent && this.detachEvent("ondragstart", r.dontstart)
            },
            init: function(i) {
                if (r.touched) return;
                var s = i.data,
                    o;
                if (i.which != 0 && s.which > 0 && i.which != s.which) return;
                if (e(i.target).is(s.not)) return;
                if (s.handle && !e(i.target).closest(s.handle, i.currentTarget).length) return;
                r.touched = i.type == "touchstart" ? this : null, s.propagates = 1, s.mousedown = this, s.interactions = [r.interaction(this, s)], s.target = i.target, s.pageX = i.pageX, s.pageY = i.pageY, s.dragging = null, o = r.hijack(i, "draginit", s);
                if (!s.propagates) return;
                o = r.flatten(o), o && o.length && (s.interactions = [], e.each(o, function() {
                    s.interactions.push(r.interaction(this, s))
                })), s.propagates = s.interactions.length, s.drop !== !1 && n.drop && n.drop.handler(i, s), r.textselect(!1), r.touched ? t.add(r.touched, "touchmove touchend", r.handler, s) : t.add(document, "mousemove mouseup", r.handler, s);
                if (!r.touched || s.live) return !1
            },
            interaction: function(t, n) {
                var i = e(t)[n.relative ? "position" : "offset"]() || {
                    top: 0,
                    left: 0
                };
                return {
                    drag: t,
                    callback: new r.callback,
                    droppable: [],
                    offset: i
                }
            },
            handler: function(i) {
                var s = i.data;
                switch (i.type) {
                case !s.dragging && "touchmove":
                    i.preventDefault();
                case !s.dragging && "mousemove":
                    if (Math.pow(i.pageX - s.pageX, 2) + Math.pow(i.pageY - s.pageY, 2) < Math.pow(s.distance, 2)) break;
                    i.target = s.target, r.hijack(i, "dragstart", s), s.propagates && (s.dragging = !0);
                case "touchmove":
                    i.preventDefault();
                case "mousemove":
                    if (s.dragging) {
                        r.hijack(i, "drag", s);
                        if (s.propagates) {
                            s.drop !== !1 && n.drop && n.drop.handler(i, s);
                            break
                        }
                        i.type = "mouseup"
                    };
                case "touchend":
                case "mouseup":
                default:
                    r.touched ? t.remove(r.touched, "touchmove touchend", r.handler) : t.remove(document, "mousemove mouseup", r.handler), s.dragging && (s.drop !== !1 && n.drop && n.drop.handler(i, s), r.hijack(i, "dragend", s)), r.textselect(!0), s.click === !1 && s.dragging && e.data(s.mousedown, "suppress.click", (new Date).getTime() + 5), s.dragging = r.touched = !1
                }
            },
            hijack: function(n, i, s, o, u) {
                if (!s) return;
                var a = {
                    event: n.originalEvent,
                    type: n.type
                },
                    f = i.indexOf("drop") ? "drag" : "drop",
                    l, c = o || 0,
                    h, p, d, v = isNaN(o) ? s.interactions.length : o;
                n.type = i, n.originalEvent = null, s.results = [];
                do
                if (h = s.interactions[c]) {
                    if (i !== "dragend" && h.cancelled) continue;
                    d = r.properties(n, s, h), h.results = [], e(u || h[f] || s.droppable).each(function(o, u) {
                        d.target = u, n.isPropagationStopped = function() {
                            return !1
                        }, l = u ? t.dispatch.call(u, n, d) : null, l === !1 ? (f == "drag" && (h.cancelled = !0, s.propagates -= 1), i == "drop" && (h[f][o] = null)) : i == "dropinit" && h.droppable.push(r.element(l) || u), i == "dragstart" && (h.proxy = e(r.element(l) || h.drag)[0]), h.results.push(l), delete n.result;
                        if (i !== "dropinit") return l
                    }), s.results[c] = r.flatten(h.results), i == "dropinit" && (h.droppable = r.flatten(h.droppable)), i == "dragstart" && !h.cancelled && d.update()
                }
                while (++c < v);
                return n.type = a.type, n.originalEvent = a.event, r.flatten(s.results)
            },
            properties: function(e, t, n) {
                var i = n.callback;
                return i.drag = n.drag, i.proxy = n.proxy || n.drag, i.startX = t.pageX, i.startY = t.pageY, i.deltaX = e.pageX - t.pageX, i.deltaY = e.pageY - t.pageY, i.originalX = n.offset.left, i.originalY = n.offset.top, i.offsetX = i.originalX + i.deltaX, i.offsetY = i.originalY + i.deltaY, i.drop = r.flatten((n.drop || []).slice()), i.available = r.flatten((n.droppable || []).slice()), i
            },
            element: function(e) {
                if (e && (e.jquery || e.nodeType == 1)) return e
            },
            flatten: function(t) {
                return e.map(t, function(t) {
                    return t && t.jquery ? e.makeArray(t) : t && t.length ? r.flatten(t) : t
                })
            },
            textselect: function(t) {
                e(document)[t ? "unbind" : "bind"]("selectstart", r.dontstart).css("MozUserSelect", t ? "" : "none"), document.unselectable = t ? "off" : "on"
            },
            dontstart: function() {
                return !1
            },
            callback: function() {}
        };
    r.callback.prototype = {
        update: function() {
            n.drop && this.available.length && e.each(this.available, function(e) {
                n.drop.locate(this, e)
            })
        }
    };
    var i = t.dispatch;
    t.dispatch = function(t) {
        if (e.data(this, "suppress." + t.type) - (new Date).getTime() > 0) {
            e.removeData(this, "suppress." + t.type);
            return
        }
        return i.apply(this, arguments)
    };
    var s = t.fixHooks.touchstart = t.fixHooks.touchmove = t.fixHooks.touchend = t.fixHooks.touchcancel = {
        props: "clientX clientY pageX pageY screenX screenY".split(" "),
        filter: function(t, n) {
            if (n) {
                var r = n.touches && n.touches[0] || n.changedTouches && n.changedTouches[0] || null;
                r && e.each(s.props, function(e, n) {
                    t[n] = r[n]
                })
            }
            return t
        }
    };
    n.draginit = n.dragstart = n.dragend = r
}(jQuery), function(e) {
    e.fn.drop = function(t, n, r) {
        var i = typeof t == "string" ? t : "",
            s = e.isFunction(t) ? t : e.isFunction(n) ? n : null;
        return i.indexOf("drop") !== 0 && (i = "drop" + i), r = (t == s ? n : r) || {}, s ? this.bind(i, r, s) : this.trigger(i)
    }, e.drop = function(t) {
        t = t || {}, r.multi = t.multi === !0 ? Infinity : t.multi === !1 ? 1 : isNaN(t.multi) ? r.multi : t.multi, r.delay = t.delay || r.delay, r.tolerance = e.isFunction(t.tolerance) ? t.tolerance : t.tolerance === null ? null : r.tolerance, r.mode = t.mode || r.mode || "intersect"
    };
    var t = e.event,
        n = t.special,
        r = e.event.special.drop = {
            multi: 1,
            delay: 20,
            mode: "overlap",
            targets: [],
            datakey: "dropdata",
            noBubble: !0,
            add: function(t) {
                var n = e.data(this, r.datakey);
                n.related += 1
            },
            remove: function() {
                e.data(this, r.datakey).related -= 1
            },
            setup: function() {
                if (e.data(this, r.datakey)) return;
                var t = {
                    related: 0,
                    active: [],
                    anyactive: 0,
                    winner: 0,
                    location: {}
                };
                e.data(this, r.datakey, t), r.targets.push(this)
            },
            teardown: function() {
                var t = e.data(this, r.datakey) || {};
                if (t.related) return;
                e.removeData(this, r.datakey);
                var n = this;
                r.targets = e.grep(r.targets, function(e) {
                    return e !== n
                })
            },
            handler: function(t, i) {
                var s, o;
                if (!i) return;
                switch (t.type) {
                case "mousedown":
                case "touchstart":
                    o = e(r.targets), typeof i.drop == "string" && (o = o.filter(i.drop)), o.each(function() {
                        var t = e.data(this, r.datakey);
                        t.active = [], t.anyactive = 0, t.winner = 0
                    }), i.droppable = o, n.drag.hijack(t, "dropinit", i);
                    break;
                case "mousemove":
                case "touchmove":
                    r.event = t, r.timer || r.tolerate(i);
                    break;
                case "mouseup":
                case "touchend":
                    r.timer = clearTimeout(r.timer), i.propagates && (n.drag.hijack(t, "drop", i), n.drag.hijack(t, "dropend", i))
                }
            },
            locate: function(t, n) {
                var i = e.data(t, r.datakey),
                    s = e(t),
                    o = s.offset() || {},
                    u = s.outerHeight(),
                    a = s.outerWidth(),
                    f = {
                        elem: t,
                        width: a,
                        height: u,
                        top: o.top,
                        left: o.left,
                        right: o.left + a,
                        bottom: o.top + u
                    };
                return i && (i.location = f, i.index = n, i.elem = t), f
            },
            contains: function(e, t) {
                return (t[0] || t.left) >= e.left && (t[0] || t.right) <= e.right && (t[1] || t.top) >= e.top && (t[1] || t.bottom) <= e.bottom
            },
            modes: {
                intersect: function(e, t, n) {
                    return this.contains(n, [e.pageX, e.pageY]) ? 1e9 : this.modes.overlap.apply(this, arguments)
                },
                overlap: function(e, t, n) {
                    return Math.max(0, Math.min(n.bottom, t.bottom) - Math.max(n.top, t.top)) * Math.max(0, Math.min(n.right, t.right) - Math.max(n.left, t.left))
                },
                fit: function(e, t, n) {
                    return this.contains(n, t) ? 1 : 0
                },
                middle: function(e, t, n) {
                    return this.contains(n, [t.left + t.width * .5, t.top + t.height * .5]) ? 1 : 0
                }
            },
            sort: function(e, t) {
                return t.winner - e.winner || e.index - t.index
            },
            tolerate: function(t) {
                var i, s, o, u, a, f, l, c = 0,
                    h, p = t.interactions.length,
                    d = [r.event.pageX, r.event.pageY],
                    v = r.tolerance || r.modes[r.mode];
                do
                if (h = t.interactions[c]) {
                    if (!h) return;
                    h.drop = [], a = [], f = h.droppable.length, v && (o = r.locate(h.proxy)), i = 0;
                    do
                    if (l = h.droppable[i]) {
                        u = e.data(l, r.datakey), s = u.location;
                        if (!s) continue;
                        u.winner = v ? v.call(r, r.event, o, s) : r.contains(s, d) ? 1 : 0, a.push(u)
                    }
                    while (++i < f);
                    a.sort(r.sort), i = 0;
                    do
                    if (u = a[i]) u.winner && (h.drop.length < r.multi || e.contains(h.drop[0], u.elem)) ? (!u.active[c] && !u.anyactive && (n.drag.hijack(r.event, "dropstart", t, c, u.elem)[0] !== !1 ? (u.active[c] = 1, u.anyactive += 1) : u.winner = 0), u.winner && h.drop.push(u.elem), h.drop.length > r.multi && h.drop.splice(0, h.drop.length - r.multi)) : u.active[c] && u.anyactive == 1 && (n.drag.hijack(r.event, "dropend", t, c, u.elem), u.active[c] = 0, u.anyactive -= 1);
                    while (++i < f)
                }
                while (++c < p);
                r.last && d[0] == r.last.pageX && d[1] == r.last.pageY ? delete r.timer : r.timer = setTimeout(function() {
                    r.tolerate(t)
                }, r.delay), r.last = r.event
            }
        };
    n.dropinit = n.dropstart = n.dropend = r
}(jQuery), function(e) {
    function r(t) {
        var n = t || window.event,
            r = [].slice.call(arguments, 1),
            i = 0,
            s = !0,
            o = 0,
            u = 0;
        return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (i = n.wheelDelta / 120), n.detail && (i = -n.detail / 3), u = i, n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS && (u = 0, o = -1 * i), n.wheelDeltaY !== undefined && (u = n.wheelDeltaY / 120), n.wheelDeltaX !== undefined && (o = -1 * n.wheelDeltaX / 120), r.unshift(t, i, o, u), (e.event.dispatch || e.event.handle).apply(this, r)
    }
    var t = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks) for (var n = t.length; n;) e.event.fixHooks[t[--n]] = e.event.mouseHooks;
    e.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener) for (var e = t.length; e;) this.addEventListener(t[--e], r, !1);
            else this.onmousewheel = r
        },
        teardown: function() {
            if (this.removeEventListener) for (var e = t.length; e;) this.removeEventListener(t[--e], r, !1);
            else this.onmousewheel = null
        }
    }, e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
}(jQuery), function(e) {
    var t = {};
    e.publish = function(n, r) {
        r = e.makeArray(r), t[n] && e.each(t[n].concat(), function() {
            try {
                this.apply(e, r || [])
            } catch (t) {
                console.error("pub/sub. topic: ", n, ", error: ", t, "msg:", t.message, "stack:", t.stack, ", func: ", this)
            }
        })
    }, e.subscribe = function(e, n) {
        return t[e] || (t[e] = []), t[e].push(n), [e, n]
    }, e.unsubscribe = function(n) {
        var r = n[0];
        t[r] && e.each(t[r], function(e) {
            this == n[1] && t[r].splice(e, 1)
        })
    }, e.subscriptions = t
}(jQuery), function(e) {
    function s(e) {
        return e || (e = "en-US"), e = e.replace(/_/, "-").toLowerCase(), e.length > 3 && (e = e.substring(0, 3) + e.substring(3).toUpperCase()), e
    }
    var t = {},
        n = {};
    e.localize = function(r, i) {
        function f(t, n, r) {
            r = r || 1;
            var s;
            i && i.loadBase && r == 1 ? (u = {}, s = t + ".json" + e.localize.cachebuster, l(s, t, n, r)) : r == 1 ? (u = {}, f(t, n, 2)) : r == 2 && n.length >= 2 ? (s = t + "-" + n.substring(0, 2) + ".json" + e.localize.cachebuster, l(s, t, n, r)) : r == 3 && n.length >= 5 && (s = t + "-" + n.substring(0, 5) + ".json" + e.localize.cachebuster, l(s, t, n, r))
        }
        function l(r, s, o, f) {
            function l(n) {
                o === "en" && (e.localize.defaultLangData = n), u = e.extend({}, e.localize.defaultLangData, u, n), t[r] = u, p(u)
            }
            function c(e) {
                delete n[r], a.reject()
            }
            i.pathPrefix && (r = i.pathPrefix + "/" + r);
            if (t[r]) p(t[r]);
            else if (n[r]) n[r].done(l);
            else if (e.localize.jsonpCallback) {
                var h = e.localize.jsonpCallback + o;
                n[r] = e.ajax({
                    url: window.gsConfig.assetHost + r,
                    async: !0,
                    dataType: "jsonp",
                    jsonp: !1,
                    jsonpCallback: h,
                    data: null,
                    cache: !0
                }).done(l).fail(c)
            } else n[r] = e.ajax({
                url: r,
                async: !0,
                dataType: "json",
                data: null,
                cache: !0
            }).done(l).fail(c)
        }
        function c(t) {
            e.localize.data[r] = t;
            var n, i, s = e([1]);
            e(o).each(function() {
                s[0] = this, n = s.attr("data-translate-text"), i = d(n, t), s.data("localize-text") !== i && (s[0].tagName == "INPUT" ? s.val(i) : s[0].innerHTML = i, s.data("localize-text", i))
            })
        }
        function h(t) {
            e.localize.data[r] = t;
            var n, i, s = e([1]);
            e(o).each(function() {
                s[0] = this, n = s.attr("data-translate-title"), i = d(n, t), s.data("localize-title") !== i && (s.attr("title", i), s.data("localize-text", i))
            })
        }
        function p(e) {
            i.callback ? i.callback === "titleCallback" ? h(e) : i.callback(e, c) : c(e), a.resolve(e)
        }
        function d(e, t) {
            var n = e.split(/\./),
                r = t;
            while (n.length > 0) {
                if (!r) return null;
                r = r[n.shift()]
            }
            return r
        }
        function v(e) {
            if (typeof e == "string") return "^" + e + "$";
            if (e.length) {
                var t = [],
                    n = e.length;
                while (n--) t.push(v(e[n]));
                return t.join("|")
            }
            return e
        }
        var o = this.selector,
            u = {},
            a = new e.Deferred;
        i = i || {}, i.pathPrefix = "/locales";
        var m = s(i && i.language ? i.language : e.defaultLanguage);
        if (i.skipLanguage && m.match(v(i.skipLanguage))) return;
        return f(r, m, 1), a.promise()
    };
    var r = new e.Deferred;
    e.fn.localize = e.localize, e.localize.data = {}, e.localize.defaultLangData = {}, e.localize.cachebuster = "", e.localize.ready = r.promise(), _.defined(window.gsConfig) && window.gsConfig.snapVersion && (e.localize.cachebuster = "?v=" + window.gsConfig.snapVersion), _.defined(window.gsConfig) && window.gsConfig.localeJSONP ? e.localize.jsonpCallback = window.gsConfig.localeJSONP : e.localize.jsonpCallback = !1;
    if (_.defined(window.gsLocale)) {
        e.localize.data.gs = gsLocale;
        for (var i in gsLocale) gsLocale.hasOwnProperty(i) && (e.localize.defaultLangData[i] = gsLocale[i])
    }
    setTimeout(function() {
        e.localize("gs", {
            language: "en",
            callback: function() {
                r.resolve()
            }
        })
    }, 0), e.localize.getString = function(e) {
        return this.data.gs[e] || this.defaultLangData[e]
    }, e.defaultLanguage = s(navigator.language ? navigator.language : navigator.userLanguage)
}(jQuery), function(e) {
    var t = /^[A-z0-9\._+-]+@[A-z0-9][A-z0-9-]*(\.[A-z0-9_-]+)*\.([A-z]{2,6})$/;
    e.widget("ui.gstagging", {
        options: {
            source: [],
            maxItemDisplay: 3,
            minSearchLength: 3,
            allowDuplicates: !1,
            width: 400,
            allowEmails: !1,
            deleteOnBackspace: !1,
            splitOnSpace: !0,
            multi: !0,
            allowNonTags: !0,
            initialValues: null
        },
        _create: function() {
            function u(e) {
                return e.replace(/[\(\\\*\+\?\|\{\[\)\^\$\.\#]/g, "\\$&").replace(/\s/g, "\\s")
            }
            function a(e) {
                if (!n.options.allowNonTags && !n.options.multi) {
                    n.beginFrom = 0;
                    return
                }
                n.beginFrom = c(e) - 1;
                var t = n.element.val();
                for (; n.beginFrom > 0; n.beginFrom--) if (t.charAt(n.beginFrom) == " ") {
                    n.beginFrom++;
                    break
                }
                n.beginFrom < 0 && (n.beginFrom = 0)
            }
            function f(e, t, n, r) {
                return r === void 0 && (r = 0), e.substring(0, r) + e.substring(r).replace(t, n)
            }
            function l() {
                var e = [];
                _.each(n.selected, function(t) {
                    e.push(t.text)
                }), n.element.val(e.join(" "))
            }
            function c(e) {
                if (typeof e.target.selectionStart == "undefined") {
                    if (typeof e.target.selectionStartCalc == "undefined") {
                        var t = document.selection.createRange(),
                            n = document.selection.createRange().text.length;
                        return t.moveStart("character", -e.target.value.length), t.text.length
                    }
                    return e.target.selectionStartCalc
                }
                return e.target.selectionStart
            }
            function h(r, i, s) {
                var o = r.substring(i, s).replace(/(^\s+|\s+$)/g, "");
                if (o && !n.values[o] && o.match(t)) {
                    var u = e("<div>").append(n.highlightWrapper.text(o).clone()).html(),
                        a, f = 0;
                    for (a = 0; a < n.selected.length; a++) i > n.selected[a].start && f++;
                    return n.options.multi || (n.values = {}, n.selected.splice(0, n.selected.length)), n.selected.splice(f, 0, {
                        text: o,
                        val: o,
                        html: u,
                        start: i
                    }), n.values[o] = 1, !0
                }
                return !1
            }
            var n = this,
                r = !1;
            this.activeSearch = !1, this.searchTerm = "", this.searchTermWhole = "", this.beginFrom = 0;
            var i = this.options.width,
                s = this.element.css("padding-left"),
                o = this.element.css("padding-right");
            s && (i -= ~~this.element.css("padding-left").substr(0, s.length - 2)), o && (i -= ~~this.element.css("padding-left").substr(0, o.length - 2)), this.element.width(i), this.wrapper = e("<div>").addClass("ui-tagging-wrap").width(this.options.width), this.highlight = e("<div></div>").addClass("tag-highlight").width(i), this.highlightWrapper = e("<span></span>").addClass("ui-corner-all"), this.highlightContainer = e("<div>").addClass("ui-tagging-highlight").append(this.highlight), this.container = e("<div></div>").width(this.options.width).insertBefore(this.element).addClass("ui-tagging").append(this.highlightContainer, this.element.wrap(this.wrapper).parent()), this.values = {}, this.selected = [], this.lineHeight = this.element.css("lineHeight"), this.element.height(this.lineHeight).css("min-height", this.lineHeight + "px");
            var p = 0,
                d = n.highlight.height(),
                v;
            this.element.keypress(function(e) {
                n.options.multi && e.which == 32 && n.activeSearch ? (n.setActiveSearch(!1), n.element.autocomplete("close")) : n.activeSearch ? n.currentPos = c(e) : (n.setActiveSearch(!0), n.currentPos = c(e), a(e))
            }).bind("keyup change", function(e) {
                var t = _.escape(n.element.val()) || "",
                    r = t,
                    i = {};
                n.currentPos = c(e);
                if (e.which && e.which >= 37 && e.which <= 40) {
                    n.activeSearch && a(e);
                    return
                }
                if (n.options.allowEmails && e.which && (e.which === 32 || e.which === 13)) {
                    var s = t.lastIndexOf(" ", n.currentPos - 2);
                    s < 0 && (s = 0), h(t, s, n.currentPos)
                }
                var o = 0,
                    l = 0,
                    p, m, g, y, b, w;
                for (var E = 0; E < n.selected.length; E++) {
                    g = n.selected[E], w = _.escape(g.text), g.start && g.start >= o && g.start - o <= 1 && (p = o, o = Math.max(0, g.start - 1), l += o - p), m = t.indexOf(w, o);
                    if (m > -1 && (!g.end || m < g.end - 1)) g.start = m, g.end = m + w.length, n.options.splitOnSpace && (g.middle = g.text.indexOf(" ")) > 0 ? g.middle += m : g.middle = null, t.charAt(g.end) === " " ? r = f(r, new RegExp(u(w) + "\\s?"), g.html + " ", l) : r = f(r, new RegExp(u(w)), g.html, l), o = g.end, l += g.html.length, i[g.val] = 1;
                    else {
                        if (n.currentPos >= g.start && n.currentPos <= g.end && g.middle && n.currentPos > g.middle) {
                            g.firstPart || (g.firstPart = w.substring(0, w.indexOf(" ")));
                            if (t.substr(g.start, g.firstPart.length) === g.firstPart) {
                                g.html = g.html.replace(w, g.firstPart), r = f(r, new RegExp(u(g.firstPart) + "\\s?"), g.html, l), e.which === 8 ? Math.abs(n.currentPos - g.end) < 2 && (r = f(r, new RegExp(u(t.substring(g.middle + 1, n.currentPos)) + "(?:\\s?$)?"), "", l), n.element.val(t.substring(0, g.middle) + " " + t.substring(g.end))) : e.which === 46 && Math.abs(n.currentPos - g.middle) < 2 && (r = f(r, new RegExp(u(t.substring(g.middle + 1, n.currentPos)) + "(?:\\s?$)?"), "", l), n.element.val(t.substring(0, g.middle) + " " + t.substring(g.end))), o = g.end, l += g.html.length, i[g.val] = 1, n.selected[E].html = g.html, n.selected[E].text = g.firstPart;
                                continue
                            }
                        }
                        y = t.indexOf(w.slice(0, w.length - 1), o), n.options.deleteOnBackspace && t && y === g.start && (b = g.start === 0 && t[g.end] === " ", r = f(r, new RegExp(u(t.substring(g.start, g.end - 1))), "", l), t = t.substring(0, g.start) + t.substring(g.end - (b ? 0 : 1)), b && (r = r.substring(1)), n.element.val(t), o = g.start, l -= w.length), n.selected.splice(E, 1), E--, GS.trigger("guts:log", "gsTaggingRemove", {
                            removedValue: g.val
                        }), GS.trigger("guts:gatrack", "site", "gsTaggingRemove", g.val)
                    }
                }
                n.values = i, n.highlight.html(r + "&nbsp;&nbsp;"), v = n.highlight.height();
                if (v != d) {
                    var S = n.element.height();
                    S < v || S === d ? n.element.height(v).css("min-height", v + "px") : n.element.css("min-height", v + "px")
                }
                d = v;
                if (e.which && e.which < 48 && e.which !== 32) {
                    if (!n.activeSearch) {
                        if (n.currentPos <= o || !n.currentPos || t.charAt(n.currentPos) == " ") return;
                        n.setActiveSearch(!0)
                    }
                    a(e), n.element.autocomplete("search", n.element.val())
                }
            }).bind("focus click", function(e) {
                n.activeSearch && (n.currentPos = c(e), a(e)), p = 0
            }).bind("keydown", function(t) {
                if (r && t.which === 9) {
                    t.preventDefault();
                    var i = n.element.autocomplete().data("autocomplete"),
                        s = i.widget().children(".ui-menu-item")[0];
                    if (s) {
                        var o = e(s).data("item.autocomplete");
                        o && (i._trigger("select", t, {
                            item: o
                        }), i.close())
                    }
                    return !1
                }
            }).bind("blur", function(e) {
                if (n.options.allowEmails) {
                    var t = n.element.val(),
                        r = t.replace(/\s+$/g, "").lastIndexOf(" ", t.length - 2);
                    r < 0 && (r = 0), h(t, r, t.length) && n.element.change()
                }!n.options.allowNonTags && !n.disableNonTagClearing && l()
            }).autocomplete({
                minLength: 0,
                delay: 0,
                maxDisplay: this.options.maxItemDisplay,
                open: function(t, i) {
                    var s = e(this).autocomplete("widget");
                    s.position({
                        my: "left top",
                        at: "left bottom",
                        of: n.container
                    }).width(n.container.width() - 4), r = !0;
                    var o = e(this).data("autocomplete"),
                        u = o.menu;
                    u.activate(e.Event({
                        type: "mouseenter"
                    }), u.element.children().first()), n.disableNonTagClearing = !0
                },
                close: function(t, i) {
                    r = !1, n.disableNonTagClearing = !1, e(this).is(":focus") || l()
                },
                source: function(t, r) {
                    if (n.activeSearch) {
                        var i = t.term.indexOf(" ", n.beginFrom);
                        n.searchTermWhole = "", i > -1 && (n.searchTermWhole = t.term.substring(n.beginFrom, i)), i = n.currentPos + 1, n.searchTerm = t.term.substring(n.beginFrom, i), !n.options.allowNonTags && !n.options.multi && (n.searchTermWhole = n.searchTerm), n.searchTerm.length < 3 && (n.searchTerm = n.searchTermWhole, n.searchTermWhole = "");
                        if (n.searchTerm.length > n.options.minSearchLength - 1) if (e.type(n.options.source) == "function") n.options.source(t, r);
                        else {
                            var s = n.searchTerm.toLowerCase().replace(/^\W+/, ""),
                                o = new RegExp("(?:^|\\s)" + u(s) + "\\w*", "i"),
                                a = null,
                                f = [];
                            n.searchTermWhole && (s = n.searchTermWhole.toLowerCase().replace(/^\W+/, ""), a = new RegExp("(?:^|\\s)" + u(s) + "\\w*", "i")), e.each(n.options.source, function() {
                                if (f.length == n.options.maxItemDisplay) return !1;
                                (this.text.match(o) || a && this.text.match(a)) && (n.options.allowDuplicates || !n.values[this.value]) && f.push(this)
                            }), r(f)
                        } else this.close()
                    }
                },
                focus: function() {
                    return !1
                },
                select: function(t, r) {
                    n.searchTermWhole && r.item.text.indexOf(n.searchTermWhole) > -1 && (n.searchTerm = n.searchTermWhole);
                    var i = this.value.indexOf(n.searchTerm, n.beginFrom - 1);
                    if (r.item.text.indexOf(" ") > -1) {
                        var s = r.item.text.substring(0, r.item.text.indexOf(n.searchTerm)),
                            o = this.value.indexOf(s, i - s.length);
                        o > -1 && (n.searchTerm = s + n.searchTerm, i -= s.length)
                    }
                    this.value = f(this.value, n.searchTerm, r.item.label + " ", i - 1), n.setActiveSearch(!1);
                    var u = e("<div>").append(n.highlightWrapper.text(r.item.label).clone()).html();
                    if (i > 0) {
                        var a = _.escape(this.value.substring(0, i)).length;
                        a != i && (i = a)
                    }
                    var l, c = 0,
                        h = _.escape(r.item.label).length - n.searchTerm.length;
                    for (l = 0; l < n.selected.length; l++) i <= n.selected[l].start ? (n.selected[l].start += h, n.selected[l].end && (n.selected[l].end += h)) : c++;
                    return n.options.multi || (n.values = {}, n.selected.splice(0, n.selected.length)), n.selected.splice(c, 0, {
                        text: r.item.label,
                        val: r.item.value,
                        html: u,
                        start: i
                    }), n.values[r.item.value] = 1, n.element.change(), GS.trigger("guts:log", "gsTaggingSelect", {
                        selectedValue: r.item.value
                    }), GS.trigger("guts:gatrack", "site", "gsTaggingSelect", r.item.value), !1
                }
            }), this.msg = function() {
                var e = n.element.val(),
                    t = e,
                    r = 0,
                    i = 0,
                    s;
                for (var o = 0; o < n.selected.length; o++) t = f(t, n.selected[o].text, "[" + f(n.selected[o].text, "]", "\\]", 0) + ":" + n.selected[o].val + "] ", n.selected[o].start + r - 2), r += 3 + (n.selected[o].val + "").length, i += n.selected[o].text.length;
                return e.replace(" ", "").length <= i ? "" : t.replace(/(^\s+|\s+$)/g, "")
            }, this.vals = function() {
                var e = [];
                for (var t = 0; t < n.selected.length; t++) e.push(n.selected[t].val);
                return e
            }, this.objects = function() {
                return e.extend(!0, [], n.selected)
            }, this.setActiveSearch = function(e) {
                e && n.selected.length == 0 && !n.options.multi || n.options.multi ? n.activeSearch = e : e || (n.activeSearch = e)
            };
            if (this.options.initialValues) {
                var m = "",
                    g;
                e.each(this.options.initialValues, function(t, r) {
                    r && r.value && r.label && (!n.values[r.value] || n.options.allowDuplicates) && (g = e("<div>").append(n.highlightWrapper.text(r.label).clone()).html(), n.selected.push({
                        text: r.label,
                        val: r.value,
                        html: g,
                        start: m.length
                    }), n.values[r.value] = 1, m += r.label + " ")
                }), m && (this.element.val(m), this.element.change())
            }
        }
    }), e.parseGSTagMessage = function(e) {
        var t = new RegExp("(.*?)(?:\\[([^\\]]+(?:\\\\\\])?)+:([0-9]+)\\]([^:]|$))", "gm"),
            n = [],
            r, i = 0;
        if (e.indexOf("[") === -1) return [e];
        while (r = t.exec(e)) i = r.index + r[0].length, r[1] && n.push(r[1]), r[2] && r[3] && n.push({
            name: r[2].replace("\\]", "]"),
            id: parseInt(r[3], 10)
        });
        var s = e.substr(i);
        return s && n.push(s), n
    }
}(jQuery), function(e) {
    var t = function(e, t, n, r, i, s) {
            return t >= r && t < r + s && e >= n && e < n + i
        };
    e.fn.within = function(e, n, r) {
        var i = [];
        return this.each(function() {
            var s = jQuery(this);
            if (this == document.documentElement) return i.push(this);
            var o = r ? jQuery.data(this, "offset", s.offset()) : s.offset(),
                u = t(e, n, o.left, o.top, this.offsetWidth, this.offsetHeight);
            u && i.push(this)
        }), this.pushStack(jQuery.unique(i), "within", e + "," + n)
    }, e.fn.withinBox = function(e, t, n, r, i) {
        var s = [];
        return this.each(function() {
            var o = jQuery(this);
            if (this == document.documentElement) return this.ret.push(this);
            var u = i ? jQuery.data(this, "offset", o.offset()) : o.offset(),
                a = o.width(),
                f = o.height();
            res = !(u.top > t + r || u.top + f < t || u.left > e + n || u.left + a < e), res && s.push(this)
        }), this.pushStack(jQuery.unique(s), "withinBox", jQuery.makeArray(arguments).join(","))
    }
}(jQuery), function(e) {
    function t(t) {
        if (typeof t.data != "string") return;
        var n = t.handler,
            r = t.data.toLowerCase().split(" ");
        t.handler = function(t) {
            if (this !== t.target && /textarea|select/i.test(t.target.nodeName) && t.target.type === "text") return;
            var i = t.type !== "keypress" && e.hotkeys.specialKeys[t.which],
                s = String.fromCharCode(t.which).toLowerCase(),
                o, u = "",
                a = {};
            t.altKey && i !== "alt" && (u += "alt+"), t.ctrlKey && i !== "ctrl" && (u += "ctrl+"), t.metaKey && !t.ctrlKey && i !== "meta" && (u += "meta+"), t.shiftKey && i !== "shift" && (u += "shift+"), i ? a[u + i] = !0 : (a[u + s] = !0, a[u + e.hotkeys.shiftNums[s]] = !0, u === "shift+" && (a[e.hotkeys.shiftNums[s]] = !0));
            for (var f = 0, l = r.length; f < l; f++) if (a[r[f]]) return n.apply(this, arguments)
        }
    }
    e.hotkeys = {
        version: "0.8",
        specialKeys: {
            8: "backspace",
            9: "tab",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "del",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "numlock",
            145: "scroll",
            191: "/",
            224: "meta"
        },
        shiftNums: {
            "`": "~",
            1: "!",
            2: "@",
            3: "#",
            4: "$",
            5: "%",
            6: "^",
            7: "&",
            8: "*",
            9: "(",
            0: ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": '"',
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        }
    }, e.each(["keydown", "keyup", "keypress"], function() {
        e.event.special[this] = {
            add: t
        }
    })
}(jQuery), function(e, t, n) {
    t === n && (function() {
        var n = /^[\],:{}\s]*$/,
            r = /(?:^|:|,)(?:\s*\[)+/g,
            i = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            s = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g;
        t = {
            fn: {},
            now: function() {
                return (new Date).getTime()
            },
            browser: {
                opera: !1
            },
            parseJSON: function(o) {
                return !o || typeof o != "string" ? null : (o = t.trim(o), e.JSON && e.JSON.parse ? e.JSON.parse(o) : n.test(o.replace(i, "@").replace(s, "]").replace(r, "")) ? (new Function("return " + o))() : null)
            },
            Deferred: function() {
                var e = {},
                    t = [];
                e.notify = function(n) {
                    var r = t.length;
                    while (r--) t[r](n);
                    return e
                }, e.progress = function(n) {
                    return t.push(n), e
                }
            }
        }
    }(), /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(navigator.userAgent.toLowerCase()) && (t.browser.opera = !0), e.jQuery = t), t.stringify || (t.stringify = e.JSON && e.JSON.stringify ||
    function(e) {
        var t = typeof e;
        if (t != "object" || e === null) return t == "string" ? e = '"' + e + '"' : t == "number" && !isFinite(e) && (e = "null"), String(e);
        if (t == "undefined") return n;
        var r = [],
            s = e && e.constructor == Array,
            o, u;
        for (o in e) if (e.hasOwnProperty(o)) {
            u = e[o], t = typeof u;
            if (t == "string") u = '"' + u + '"';
            else if (t == "number" && !isFinite(u)) u = "null";
            else if (t == "object" && u !== null) u = i(u);
            else if (t == "undefined") continue;
            r.push((s ? "" : '"' + o + '":') + String(u))
        }
        return (s ? "[" : "{") + String(r) + (s ? "]" : "}")
    });
    var r = "postMessage",
        i = t.stringify,
        s = e[r] && !t.browser.opera,
        o = 0,
        u;
    t.fn[r] = t[r] = function(e, n, u) {
        if (!n) return;
        e = i(e), u = this.jquery && this[0] || u || parent, s ? u[r](e, n.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : u.location = n.replace(/#.*$/, "") + "#" + t.now() + o+++"&" + e
    };
    var a = t.parseJSON,
        f = e.addEventListener,
        l = {},
        c = function(e) {
            e && l[e.origin] && l[e.origin].notify(a(e.data))
        },
        h = function() {
            var e = document.location.hash,
                t = /^#?\d+&/;
            e !== u && t.test(e) && (u = e, l.all.notify(a(e.replace(t, ""))))
        },
        p;
    t.receiveMessage = function(n) {
        return p || (p = !0, s ? f ? f("message", c, !1) : e.attachEvent("onmessage", c) : (n = "all", setInterval(h, 100))), l[n] || (l[n] = t.Deferred()), l[n]
    }
}(window, window.jQuery, undefined), jQuery &&
function(e) {
    e.extend(e.fn, {
        miniColors: function(t, n) {
            var r = function(t, n, r) {
                    var i = w(t.val()) || "ffffff",
                        s = N(i),
                        f = E(s),
                        l = parseFloat(t.attr("data-opacity")).toFixed(2);
                    l > 1 && (l = 1), l < 0 && (l = 0);
                    var c = e('<a class="miniColors-trigger" style="background-color: #' + i + '" href="#"></a>');
                    c.insertAfter(t), c.wrap('<span class="miniColors-triggerWrap"></span>'), n.opacity && c.css("backgroundColor", "rgba(" + f.r + ", " + f.g + ", " + f.b + ", " + l + ")"), t.addClass("miniColors").data("original-maxlength", t.attr("maxlength") || null).data("original-autocomplete", t.attr("autocomplete") || null).data("letterCase", n.letterCase === "uppercase" ? "uppercase" : "lowercase").data("opacity", n.opacity ? !0 : !1).data("alpha", l).data("trigger", c).data("hsb", s).data("change", n.change ? n.change : null).data("close", n.close ? n.close : null).data("open", n.open ? n.open : null).attr("maxlength", 7).attr("autocomplete", "off").val("#" + v(i, n.letterCase)), (n.readonly || t.prop("readonly")) && t.prop("readonly", !0), (n.disabled || t.prop("disabled")) && o(t), c.on("click.miniColors", function(e) {
                        e.preventDefault(), t.val() === "" && t.val("#"), u(t)
                    }), t.on("focus.miniColors", function(e) {
                        t.val() === "" && t.val("#"), u(t)
                    }), t.on("blur.miniColors", function(e) {
                        var n = w(C(t.data("hsb")));
                        t.val(n ? "#" + v(n, t.data("letterCase")) : "")
                    }), t.on("keydown.miniColors", function(e) {
                        e.keyCode === 9 && a(t)
                    }), t.on("keyup.miniColors", function(e) {
                        d(t)
                    }), t.on("paste.miniColors", function(e) {
                        setTimeout(function() {
                            d(t)
                        }, 5)
                    })
                },
                i = function(t) {
                    a(), t = e(t), t.data("trigger").parent().remove(), t.attr("autocomplete", t.data("original-autocomplete")).attr("maxlength", t.data("original-maxlength")).removeData().removeClass("miniColors").off(".miniColors"), e(document).off(".miniColors")
                },
                s = function(e) {
                    e.prop("disabled", !1).data("trigger").parent().removeClass("disabled")
                },
                o = function(e) {
                    a(e), e.prop("disabled", !0).data("trigger").parent().addClass("disabled")
                },
                u = function(t) {
                    if (t.prop("disabled")) return !1;
                    a();
                    var n = e('<div class="miniColors-selector"></div>');
                    n.append('<div class="miniColors-hues"><div class="miniColors-huePicker"></div></div>').append('<div class="miniColors-colors" style="background-color: #FFF;"><div class="miniColors-colorPicker"><div class="miniColors-colorPicker-inner"></div></div>').css("display", "none").addClass(t.attr("class")), t.data("opacity") && n.addClass("opacity").prepend('<div class="miniColors-opacity"><div class="miniColors-opacityPicker"></div></div>');
                    var r = t.data("hsb");
                    n.find(".miniColors-colors").css("backgroundColor", "#" + C({
                        h: r.h,
                        s: 100,
                        b: 100
                    })).end().find(".miniColors-opacity").css("backgroundColor", "#" + C({
                        h: r.h,
                        s: r.s,
                        b: r.b
                    })).end();
                    var i = t.data("colorPosition");
                    i || (i = m(r)), n.find(".miniColors-colorPicker").css("top", i.y + "px").css("left", i.x + "px");
                    var s = t.data("huePosition");
                    s || (s = g(r)), n.find(".miniColors-huePicker").css("top", s + "px");
                    var o = t.data("opacityPosition");
                    o || (o = y(t.attr("data-opacity"))), n.find(".miniColors-opacityPicker").css("top", o + "px"), t.data("selector", n).data("huePicker", n.find(".miniColors-huePicker")).data("opacityPicker", n.find(".miniColors-opacityPicker")).data("colorPicker", n.find(".miniColors-colorPicker")).data("mousebutton", 0), e("BODY").append(n);
                    var u = t.data("trigger"),
                        h = !t.is(":visible"),
                        p = h ? u.offset().top + u.outerHeight() : t.offset().top + t.outerHeight(),
                        d = h ? u.offset().left : t.offset().left,
                        v = n.outerWidth(),
                        b = n.outerHeight(),
                        w = u.outerWidth(),
                        S = u.outerHeight(),
                        x = e(window).height(),
                        T = e(window).width(),
                        N = e(window).scrollTop(),
                        k = e(window).scrollLeft();
                    p + b > x + N && (p = p - b - S), d + v > T + k && (d = d - v + w), n.css({
                        top: p,
                        left: d
                    }).fadeIn(100), n.on("selectstart", function() {
                        return !1
                    }), (!e.browser.msie || e.browser.msie && e.browser.version >= 9) && e(window).on("resize.miniColors", function(e) {
                        a(t)
                    }), e(document).on("mousedown.miniColors touchstart.miniColors", function(n) {
                        t.data("mousebutton", 1);
                        var r = e(n.target).parents().andSelf();
                        r.hasClass("miniColors-colors") && (n.preventDefault(), t.data("moving", "colors"), f(t, n)), r.hasClass("miniColors-hues") && (n.preventDefault(), t.data("moving", "hues"), l(t, n)), r.hasClass("miniColors-opacity") && (n.preventDefault(), t.data("moving", "opacity"), c(t, n));
                        if (r.hasClass("miniColors-selector")) {
                            n.preventDefault();
                            return
                        }
                        if (r.hasClass("miniColors")) return;
                        a(t)
                    }).on("mouseup.miniColors touchend.miniColors", function(e) {
                        e.preventDefault(), t.data("mousebutton", 0).removeData("moving")
                    }).on("mousemove.miniColors touchmove.miniColors", function(e) {
                        e.preventDefault(), t.data("mousebutton") === 1 && (t.data("moving") === "colors" && f(t, e), t.data("moving") === "hues" && l(t, e), t.data("moving") === "opacity" && c(t, e))
                    }), t.data("open") && t.data("open").call(t.get(0), "#" + C(r), e.extend(E(r), {
                        a: parseFloat(t.attr("data-opacity"))
                    }))
                },
                a = function(t) {
                    t || (t = e(".miniColors")), t.each(function() {
                        var n = e(this).data("selector");
                        e(this).removeData("selector"), e(n).fadeOut(100, function() {
                            if (t.data("close")) {
                                var n = t.data("hsb"),
                                    r = C(n);
                                t.data("close").call(t.get(0), "#" + r, e.extend(E(n), {
                                    a: parseFloat(t.attr("data-opacity"))
                                }))
                            }
                            e(this).remove()
                        })
                    }), e(document).off(".miniColors")
                },
                f = function(e, t) {
                    var n = e.data("colorPicker");
                    n.hide();
                    var r = {
                        x: t.pageX,
                        y: t.pageY
                    };
                    t.originalEvent.changedTouches && (r.x = t.originalEvent.changedTouches[0].pageX, r.y = t.originalEvent.changedTouches[0].pageY), r.x = r.x - e.data("selector").find(".miniColors-colors").offset().left - 6, r.y = r.y - e.data("selector").find(".miniColors-colors").offset().top - 6, r.x <= -5 && (r.x = -5), r.x >= 144 && (r.x = 144), r.y <= -5 && (r.y = -5), r.y >= 144 && (r.y = 144), e.data("colorPosition", r), n.css("left", r.x).css("top", r.y).show();
                    var i = Math.round((r.x + 5) * .67);
                    i < 0 && (i = 0), i > 100 && (i = 100);
                    var s = 100 - Math.round((r.y + 5) * .67);
                    s < 0 && (s = 0), s > 100 && (s = 100);
                    var o = e.data("hsb");
                    o.s = i, o.b = s, p(e, o, !0)
                },
                l = function(e, t) {
                    var n = e.data("huePicker");
                    n.hide();
                    var r = t.pageY;
                    t.originalEvent.changedTouches && (r = t.originalEvent.changedTouches[0].pageY), r = r - e.data("selector").find(".miniColors-colors").offset().top - 1, r <= -1 && (r = -1), r >= 149 && (r = 149), e.data("huePosition", r), n.css("top", r).show();
                    var i = Math.round((150 - r - 1) * 2.4);
                    i < 0 && (i = 0), i > 360 && (i = 360);
                    var s = e.data("hsb");
                    s.h = i, p(e, s, !0)
                },
                c = function(e, t) {
                    var n = e.data("opacityPicker");
                    n.hide();
                    var r = t.pageY;
                    t.originalEvent.changedTouches && (r = t.originalEvent.changedTouches[0].pageY), r = r - e.data("selector").find(".miniColors-colors").offset().top - 1, r <= -1 && (r = -1), r >= 149 && (r = 149), e.data("opacityPosition", r), n.css("top", r).show();
                    var i = parseFloat((150 - r - 1) / 150).toFixed(2);
                    i < 0 && (i = 0), i > 1 && (i = 1), e.data("alpha", i).attr("data-opacity", i), p(e, e.data("hsb"), !0)
                },
                p = function(t, n, r) {
                    t.data("hsb", n);
                    var i = C(n),
                        s = e(t.data("selector"));
                    r && t.val("#" + v(i, t.data("letterCase"))), s.find(".miniColors-colors").css("backgroundColor", "#" + C({
                        h: n.h,
                        s: 100,
                        b: 100
                    })).end().find(".miniColors-opacity").css("backgroundColor", "#" + i).end();
                    var o = E(n);
                    t.data("trigger").css("backgroundColor", "#" + i), t.data("opacity") && t.data("trigger").css("backgroundColor", "rgba(" + o.r + ", " + o.g + ", " + o.b + ", " + t.attr("data-opacity") + ")");
                    if (t.data("change")) {
                        if (i + "," + t.attr("data-opacity") === t.data("lastChange")) return;
                        t.data("change").call(t.get(0), "#" + i, e.extend(E(n), {
                            a: parseFloat(t.attr("data-opacity"))
                        })), t.data("lastChange", i + "," + t.attr("data-opacity"))
                    }
                },
                d = function(t) {
                    t.val("#" + b(t.val()));
                    var n = w(t.val());
                    if (!n) return !1;
                    var r = N(n),
                        i = m(r),
                        s = e(t.data("colorPicker"));
                    s.css("top", i.y + "px").css("left", i.x + "px"), t.data("colorPosition", i);
                    var o = g(r),
                        u = e(t.data("huePicker"));
                    u.css("top", o + "px"), t.data("huePosition", o);
                    var a = y(t.attr("data-opacity")),
                        f = e(t.data("opacityPicker"));
                    return f.css("top", a + "px"), t.data("opacityPosition", a), p(t, r), !0
                },
                v = function(e, t) {
                    return t === "uppercase" ? e.toUpperCase() : e.toLowerCase()
                },
                m = function(e) {
                    var t = Math.ceil(e.s / .67);
                    t < 0 && (t = 0), t > 150 && (t = 150);
                    var n = 150 - Math.ceil(e.b / .67);
                    return n < 0 && (n = 0), n > 150 && (n = 150), {
                        x: t - 5,
                        y: n - 5
                    }
                },
                g = function(e) {
                    var t = 150 - e.h / 2.4;
                    return t < 0 && (h = 0), t > 150 && (h = 150), t
                },
                y = function(e) {
                    var t = 150 * e;
                    return t < 0 && (t = 0), t > 150 && (t = 150), 150 - t
                },
                b = function(e) {
                    return e.replace(/[^A-F0-9]/ig, "")
                },
                w = function(e) {
                    return e = b(e), e ? (e.length === 3 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), e.length === 6 ? e : null) : null
                },
                E = function(e) {
                    var t = {},
                        n = Math.round(e.h),
                        r = Math.round(e.s * 255 / 100),
                        i = Math.round(e.b * 255 / 100);
                    if (r === 0) t.r = t.g = t.b = i;
                    else {
                        var s = i,
                            o = (255 - r) * i / 255,
                            u = (s - o) * (n % 60) / 60;
                        n === 360 && (n = 0), n < 60 ? (t.r = s, t.b = o, t.g = o + u) : n < 120 ? (t.g = s, t.b = o, t.r = s - u) : n < 180 ? (t.g = s, t.r = o, t.b = o + u) : n < 240 ? (t.b = s, t.r = o, t.g = s - u) : n < 300 ? (t.b = s, t.g = o, t.r = o + u) : n < 360 ? (t.r = s, t.g = o, t.b = s - u) : (t.r = 0, t.g = 0, t.b = 0)
                    }
                    return {
                        r: Math.round(t.r),
                        g: Math.round(t.g),
                        b: Math.round(t.b)
                    }
                },
                S = function(t) {
                    var n = [t.r.toString(16), t.g.toString(16), t.b.toString(16)];
                    return e.each(n, function(e, t) {
                        t.length === 1 && (n[e] = "0" + t)
                    }), n.join("")
                },
                x = function(e) {
                    return e = parseInt(e.indexOf("#") > -1 ? e.substring(1) : e, 16), {
                        r: e >> 16,
                        g: (e & 65280) >> 8,
                        b: e & 255
                    }
                },
                T = function(e) {
                    var t = {
                        h: 0,
                        s: 0,
                        b: 0
                    },
                        n = Math.min(e.r, e.g, e.b),
                        r = Math.max(e.r, e.g, e.b),
                        i = r - n;
                    return t.b = r, t.s = r !== 0 ? 255 * i / r : 0, t.s !== 0 ? e.r === r ? t.h = (e.g - e.b) / i : e.g === r ? t.h = 2 + (e.b - e.r) / i : t.h = 4 + (e.r - e.g) / i : t.h = -1, t.h *= 60, t.h < 0 && (t.h += 360), t.s *= 100 / 255, t.b *= 100 / 255, t
                },
                N = function(e) {
                    var t = T(x(e));
                    return t.s === 0 && (t.h = 360), t
                },
                C = function(e) {
                    return S(E(e))
                };
            switch (t) {
            case "readonly":
                return e(this).each(function() {
                    if (!e(this).hasClass("miniColors")) return;
                    e(this).prop("readonly", n)
                }), e(this);
            case "disabled":
                return e(this).each(function() {
                    if (!e(this).hasClass("miniColors")) return;
                    n ? o(e(this)) : s(e(this))
                }), e(this);
            case "value":
                if (n === undefined) {
                    if (!e(this).hasClass("miniColors")) return;
                    var k = e(this),
                        L = w(k.val());
                    return L ? "#" + v(L, k.data("letterCase")) : null
                }
                return e(this).each(function() {
                    if (!e(this).hasClass("miniColors")) return;
                    e(this).val(n), d(e(this))
                }), e(this);
            case "opacity":
                if (n === undefined) {
                    if (!e(this).hasClass("miniColors")) return;
                    return e(this).data("opacity") ? parseFloat(e(this).attr("data-opacity")) : null
                }
                return e(this).each(function() {
                    if (!e(this).hasClass("miniColors")) return;
                    n < 0 && (n = 0), n > 1 && (n = 1), e(this).attr("data-opacity", n).data("alpha", n), d(e(this))
                }), e(this);
            case "destroy":
                return e(this).each(function() {
                    if (!e(this).hasClass("miniColors")) return;
                    i(e(this))
                }), e(this);
            default:
                return t || (t = {}), e(this).each(function() {
                    if (e(this)[0].tagName.toLowerCase() !== "input") return;
                    if (e(this).data("trigger")) return;
                    r(e(this), t, n)
                }), e(this)
            }
        }
    })
}(jQuery);
var OAuth;
OAuth == null && (OAuth = {}), OAuth.setProperties = function(t, n) {
    if (t != null && n != null) for (var r in n) t[r] = n[r];
    return t
}, OAuth.setProperties(OAuth, {
    percentEncode: function(t) {
        if (t == null) return "";
        if (t instanceof Array) {
            var n = "";
            for (var r = 0; r < t.length; ++t) n != "" && (n += "&"), n += OAuth.percentEncode(t[r]);
            return n
        }
        return t = encodeURIComponent(t), t = t.replace(/\!/g, "%21"), t = t.replace(/\*/g, "%2A"), t = t.replace(/\'/g, "%27"), t = t.replace(/\(/g, "%28"), t = t.replace(/\)/g, "%29"), t
    },
    decodePercent: function(t) {
        return t != null && (t = t.replace(/\+/g, " ")), decodeURIComponent(t)
    },
    getParameterList: function(t) {
        if (t == null) return [];
        if (typeof t != "object") return OAuth.decodeForm(t + "");
        if (t instanceof Array) return t;
        var n = [];
        for (var r in t) n.push([r, t[r]]);
        return n
    },
    getParameterMap: function(t) {
        if (t == null) return {};
        if (typeof t != "object") return OAuth.getParameterMap(OAuth.decodeForm(t + ""));
        if (t instanceof Array) {
            var n = {};
            for (var r = 0; r < t.length; ++r) {
                var i = t[r][0];
                n[i] === undefined && (n[i] = t[r][1])
            }
            return n
        }
        return t
    },
    getParameter: function(t, n) {
        if (t instanceof Array) {
            for (var r = 0; r < t.length; ++r) if (t[r][0] == n) return t[r][1];
            return null
        }
        return OAuth.getParameterMap(t)[n]
    },
    formEncode: function(t) {
        var n = "",
            r = OAuth.getParameterList(t);
        for (var i = 0; i < r.length; ++i) {
            var s = r[i][1];
            s == null && (s = ""), n != "" && (n += "&"), n += OAuth.percentEncode(r[i][0]) + "=" + OAuth.percentEncode(s)
        }
        return n
    },
    decodeForm: function(t) {
        var n = [],
            r = t.split("&");
        for (var i = 0; i < r.length; ++i) {
            var s = r[i];
            if (s == "") continue;
            var o = s.indexOf("="),
                u, a;
            o < 0 ? (u = OAuth.decodePercent(s), a = null) : (u = OAuth.decodePercent(s.substring(0, o)), a = OAuth.decodePercent(s.substring(o + 1))), n.push([u, a])
        }
        return n
    },
    setParameter: function(t, n, r) {
        var i = t.parameters;
        if (i instanceof Array) {
            for (var s = 0; s < i.length; ++s) i[s][0] == n && (r === undefined ? i.splice(s, 1) : (i[s][1] = r, r = undefined));
            r !== undefined && i.push([n, r])
        } else i = OAuth.getParameterMap(i), i[n] = r, t.parameters = i
    },
    setParameters: function(t, n) {
        var r = OAuth.getParameterList(n);
        for (var i = 0; i < r.length; ++i) OAuth.setParameter(t, r[i][0], r[i][1])
    },
    completeRequest: function(t, n) {
        t.method == null && (t.method = "GET");
        var r = OAuth.getParameterMap(t.parameters);
        r.oauth_consumer_key == null && OAuth.setParameter(t, "oauth_consumer_key", n.consumerKey || ""), r.oauth_token == null && n.token != null && OAuth.setParameter(t, "oauth_token", n.token), r.oauth_version == null && OAuth.setParameter(t, "oauth_version", "1.0"), r.oauth_timestamp == null && OAuth.setParameter(t, "oauth_timestamp", OAuth.timestamp()), r.oauth_nonce == null && OAuth.setParameter(t, "oauth_nonce", OAuth.nonce(6)), OAuth.SignatureMethod.sign(t, n)
    },
    setTimestampAndNonce: function(t) {
        OAuth.setParameter(t, "oauth_timestamp", OAuth.timestamp()), OAuth.setParameter(t, "oauth_nonce", OAuth.nonce(6))
    },
    addToURL: function(t, n) {
        newURL = t;
        if (n != null) {
            var r = OAuth.formEncode(n);
            if (r.length > 0) {
                var i = t.indexOf("?");
                i < 0 ? newURL += "?" : newURL += "&", newURL += r
            }
        }
        return newURL
    },
    getAuthorizationHeader: function(t, n) {
        var r = 'OAuth realm="' + OAuth.percentEncode(t) + '"',
            i = OAuth.getParameterList(n);
        for (var s = 0; s < i.length; ++s) {
            var o = i[s],
                u = o[0];
            u.indexOf("oauth_") == 0 && (r += "," + OAuth.percentEncode(u) + '="' + OAuth.percentEncode(o[1]) + '"')
        }
        return r
    },
    correctTimestamp: function(t) {
        OAuth.timeCorrectionMsec = t * 1e3 - (new Date).getTime()
    },
    timeCorrectionMsec: 0,
    timestamp: function() {
        var t = (new Date).getTime() + OAuth.timeCorrectionMsec;
        return Math.floor(t / 1e3)
    },
    nonce: function(t) {
        var n = OAuth.nonce.CHARS,
            r = "";
        for (var i = 0; i < t; ++i) {
            var s = Math.floor(Math.random() * n.length);
            r += n.substring(s, s + 1)
        }
        return r
    }
}), OAuth.nonce.CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz", OAuth.declareClass = function(t, n, r) {
    var i = t[n];
    t[n] = r;
    if (r != null && i != null) for (var s in i) s != "prototype" && (r[s] = i[s]);
    return r
}, OAuth.declareClass(OAuth, "SignatureMethod", function() {}), OAuth.setProperties(OAuth.SignatureMethod.prototype, {
    sign: function(t) {
        var n = OAuth.SignatureMethod.getBaseString(t),
            r = this.getSignature(n);
        return OAuth.setParameter(t, "oauth_signature", r), r
    },
    initialize: function(t, n) {
        var r;
        n.accessorSecret != null && t.length > 9 && t.substring(t.length - 9) == "-Accessor" ? r = n.accessorSecret : r = n.consumerSecret, this.key = OAuth.percentEncode(r) + "&" + OAuth.percentEncode(n.tokenSecret)
    }
}), OAuth.setProperties(OAuth.SignatureMethod, {
    sign: function(t, n) {
        var r = OAuth.getParameterMap(t.parameters).oauth_signature_method;
        if (r == null || r == "") r = "HMAC-SHA1", OAuth.setParameter(t, "oauth_signature_method", r);
        OAuth.SignatureMethod.newMethod(r, n).sign(t)
    },
    newMethod: function(t, n) {
        var r = OAuth.SignatureMethod.REGISTERED[t];
        if (r != null) {
            var i = new r;
            return i.initialize(t, n), i
        }
        var s = new Error("signature_method_rejected"),
            o = "";
        for (var u in OAuth.SignatureMethod.REGISTERED) o != "" && (o += "&"), o += OAuth.percentEncode(u);
        throw s.oauth_acceptable_signature_methods = o, s
    },
    REGISTERED: {},
    registerMethodClass: function(t, n) {
        for (var r = 0; r < t.length; ++r) OAuth.SignatureMethod.REGISTERED[t[r]] = n
    },
    makeSubclass: function(t) {
        var n = OAuth.SignatureMethod,
            r = function() {
                n.call(this)
            };
        return r.prototype = new n, r.prototype.getSignature = t, r.prototype.constructor = r, r
    },
    getBaseString: function(t) {
        var n = t.action,
            r = n.indexOf("?"),
            i;
        if (r < 0) i = t.parameters;
        else {
            i = OAuth.decodeForm(n.substring(r + 1));
            var s = OAuth.getParameterList(t.parameters);
            for (var o = 0; o < s.length; ++o) i.push(s[o])
        }
        return OAuth.percentEncode(t.method.toUpperCase()) + "&" + OAuth.percentEncode(OAuth.SignatureMethod.normalizeUrl(n)) + "&" + OAuth.percentEncode(OAuth.SignatureMethod.normalizeParameters(i))
    },
    normalizeUrl: function(t) {
        var n = OAuth.SignatureMethod.parseUri(t),
            r = n.protocol.toLowerCase(),
            i = n.authority.toLowerCase(),
            s = r == "http" && n.port == 80 || r == "https" && n.port == 443;
        if (s) {
            var o = i.lastIndexOf(":");
            o >= 0 && (i = i.substring(0, o))
        }
        var u = n.path;
        return u || (u = "/"), r + "://" + i + u
    },
    parseUri: function(t) {
        var n = {
            key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
            parser: {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
        },
            r = n.parser.strict.exec(t),
            i = {},
            s = 14;
        while (s--) i[n.key[s]] = r[s] || "";
        return i
    },
    normalizeParameters: function(t) {
        if (t == null) return "";
        var n = OAuth.getParameterList(t),
            r = [];
        for (var i = 0; i < n.length; ++i) {
            var s = n[i];
            s[0] != "oauth_signature" && r.push([OAuth.percentEncode(s[0]) + " " + OAuth.percentEncode(s[1]), s])
        }
        r.sort(function(e, t) {
            return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0
        });
        var o = [];
        for (var u = 0; u < r.length; ++u) o.push(r[u][1]);
        return OAuth.formEncode(o)
    }
}), OAuth.SignatureMethod.registerMethodClass(["PLAINTEXT", "PLAINTEXT-Accessor"], OAuth.SignatureMethod.makeSubclass(function(t) {
    return this.key
})), OAuth.SignatureMethod.registerMethodClass(["HMAC-SHA1", "HMAC-SHA1-Accessor"], OAuth.SignatureMethod.makeSubclass(function(t) {
    b64pad = "=";
    var n = b64_hmac_sha1(this.key, t);
    return n
}));
try {
    OAuth.correctTimestamp(gsConfig.timestamp)
} catch (e) {}
Date.prototype.format = function(e) {
    var t = "",
        n = Date.replaceChars;
    for (var r = 0; r < e.length; r++) {
        var i = e.charAt(r);
        n[i] ? t += n[i].call(this) : t += i
    }
    return t
}, Date.replaceChars = {
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    longMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    longDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    d: function() {
        return (this.getDate() < 10 ? "0" : "") + this.getDate()
    },
    D: function() {
        return Date.replaceChars.shortDays[this.getDay()]
    },
    j: function() {
        return this.getDate()
    },
    l: function() {
        return Date.replaceChars.longDays[this.getDay()]
    },
    N: function() {
        return this.getDay() + 1
    },
    S: function() {
        return this.getDate() % 10 == 1 && this.getDate() != 11 ? "st" : this.getDate() % 10 == 2 && this.getDate() != 12 ? "nd" : this.getDate() % 10 == 3 && this.getDate() != 13 ? "rd" : "th"
    },
    w: function() {
        return this.getDay()
    },
    z: function() {
        return "Not Yet Supported"
    },
    W: function() {
        return "Not Yet Supported"
    },
    F: function() {
        return Date.replaceChars.longMonths[this.getMonth()]
    },
    m: function() {
        return (this.getMonth() < 9 ? "0" : "") + (this.getMonth() + 1)
    },
    M: function() {
        return Date.replaceChars.shortMonths[this.getMonth()]
    },
    n: function() {
        return this.getMonth() + 1
    },
    t: function() {
        return "Not Yet Supported"
    },
    L: function() {
        return this.getFullYear() % 4 == 0 && this.getFullYear() % 100 != 0 || this.getFullYear() % 400 == 0 ? "1" : "0"
    },
    o: function() {
        return "Not Supported"
    },
    Y: function() {
        return this.getFullYear()
    },
    y: function() {
        return ("" + this.getFullYear()).substr(2)
    },
    a: function() {
        return this.getHours() < 12 ? "am" : "pm"
    },
    A: function() {
        return this.getHours() < 12 ? "AM" : "PM"
    },
    B: function() {
        return "Not Yet Supported"
    },
    g: function() {
        return this.getHours() % 12 || 12
    },
    G: function() {
        return this.getHours()
    },
    h: function() {
        return ((this.getHours() % 12 || 12) < 10 ? "0" : "") + (this.getHours() % 12 || 12)
    },
    H: function() {
        return (this.getHours() < 10 ? "0" : "") + this.getHours()
    },
    i: function() {
        return (this.getMinutes() < 10 ? "0" : "") + this.getMinutes()
    },
    s: function() {
        return (this.getSeconds() < 10 ? "0" : "") + this.getSeconds()
    },
    e: function() {
        return "Not Yet Supported"
    },
    I: function() {
        return "Not Supported"
    },
    O: function() {
        return (-this.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? "0" : "") + Math.abs(this.getTimezoneOffset() / 60) + "00"
    },
    P: function() {
        return (-this.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? "0" : "") + Math.abs(this.getTimezoneOffset() / 60) + ":" + (Math.abs(this.getTimezoneOffset() % 60) < 10 ? "0" : "") + Math.abs(this.getTimezoneOffset() % 60)
    },
    T: function() {
        var e = this.getMonth();
        this.setMonth(0);
        var t = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, "$1");
        return this.setMonth(e), t
    },
    Z: function() {
        return -this.getTimezoneOffset() * 60
    },
    c: function() {
        return this.format("Y-m-d") + "T" + this.format("H:i:sP")
    },
    r: function() {
        return this.toString()
    },
    U: function() {
        return this.getTime() / 1e3
    }
};
var ZeroClipboard = {
    version: "1.0.7",
    clients: {},
    moviePath: "ZeroClipboard.swf",
    nextId: 1,
    $: function(e) {
        return typeof e == "string" && (e = document.getElementById(e)), e.addClass || (e.hide = function() {
            this.style.display = "none"
        }, e.show = function() {
            this.style.display = ""
        }, e.addClass = function(e) {
            this.removeClass(e), this.className += " " + e
        }, e.removeClass = function(e) {
            var t = this.className.split(/\s+/),
                n = -1;
            for (var r = 0; r < t.length; r++) t[r] == e && (n = r, r = t.length);
            return n > -1 && (t.splice(n, 1), this.className = t.join(" ")), this
        }, e.hasClass = function(e) {
            return !!this.className.match(new RegExp("\\s*" + e + "\\s*"))
        }), e
    },
    setMoviePath: function(e) {
        this.moviePath = e
    },
    dispatch: function(e, t, n) {
        var r = this.clients[e];
        r && r.receiveEvent(t, n)
    },
    register: function(e, t) {
        this.clients[e] = t
    },
    getDOMObjectPosition: function(e, t) {
        var n = {
            left: 0,
            top: 0,
            width: e.width ? e.width : e.offsetWidth,
            height: e.height ? e.height : e.offsetHeight
        };
        while (e && e != t) n.left += e.offsetLeft, n.top += e.offsetTop, e = e.offsetParent;
        return n
    },
    Client: function(e) {
        this.handlers = {}, this.id = ZeroClipboard.nextId++, this.movieId = "ZeroClipboardMovie_" + this.id, ZeroClipboard.register(this.id, this), e && this.glue(e)
    }
};
ZeroClipboard.Client.prototype = {
    id: 0,
    ready: !1,
    movie: null,
    clipText: "",
    handCursorEnabled: !0,
    cssEffects: !0,
    handlers: null,
    glue: function(e, t, n) {
        this.domElement = ZeroClipboard.$(e);
        var r = 99;
        this.domElement.style && this.domElement.style.zIndex && (r = parseInt(this.domElement.style.zIndex, 10) + 1), typeof t == "string" ? t = ZeroClipboard.$(t) : typeof t == "undefined" && (t = document.getElementsByTagName("body")[0]);
        var i = ZeroClipboard.getDOMObjectPosition(this.domElement, t);
        this.div = document.createElement("div");
        var s = this.div.style;
        s.position = "absolute", s.left = "" + i.left + "px", s.top = "" + i.top + "px", s.width = "" + i.width + "px", s.height = "" + i.height + "px", s.zIndex = r;
        if (typeof n == "object") for (addedStyle in n) s[addedStyle] = n[addedStyle];
        t.appendChild(this.div), this.div.innerHTML = this.getHTML(i.width, i.height)
    },
    getHTML: function(e, t) {
        var n = "",
            r = "id=" + this.id + "&width=" + e + "&height=" + t;
        if (navigator.userAgent.match(/MSIE/)) {
            var i = location.href.match(/^https/i) ? "https://" : "http://";
            n += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + i + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + e + '" height="' + t + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + r + '"/><param name="wmode" value="transparent"/></object>'
        } else n += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + e + '" height="' + t + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + r + '" wmode="transparent" />';
        return n
    },
    hide: function() {
        this.div && (this.div.style.left = "-2000px")
    },
    show: function() {
        this.reposition()
    },
    destroy: function() {
        if (this.domElement && this.div) {
            this.hide(), this.div.innerHTML = "";
            var e = document.getElementsByTagName("body")[0];
            try {
                e.removeChild(this.div)
            } catch (t) {}
            this.domElement = null, this.div = null
        }
    },
    reposition: function(e) {
        e && (this.domElement = ZeroClipboard.$(e), this.domElement || this.hide());
        if (this.domElement && this.div) {
            var t = ZeroClipboard.getDOMObjectPosition(this.domElement),
                n = this.div.style;
            n.left = "" + t.left + "px", n.top = "" + t.top + "px"
        }
    },
    setText: function(e) {
        this.clipText = e, this.ready && this.movie.setText(e)
    },
    addEventListener: function(e, t) {
        e = e.toString().toLowerCase().replace(/^on/, ""), this.handlers[e] || (this.handlers[e] = []), this.handlers[e].push(t)
    },
    setHandCursor: function(e) {
        this.handCursorEnabled = e, this.ready && this.movie.setHandCursor(e)
    },
    setCSSEffects: function(e) {
        this.cssEffects = !! e
    },
    receiveEvent: function(e, t) {
        e = e.toString().toLowerCase().replace(/^on/, "");
        switch (e) {
        case "load":
            this.movie = document.getElementById(this.movieId);
            if (!this.movie) {
                var n = this;
                setTimeout(function() {
                    n.receiveEvent("load", null)
                }, 1);
                return
            }
            if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                var n = this;
                setTimeout(function() {
                    n.receiveEvent("load", null)
                }, 100), this.ready = !0;
                return
            }
            this.ready = !0, this.movie.setText(this.clipText), this.movie.setHandCursor(this.handCursorEnabled);
            break;
        case "mouseover":
            this.domElement && this.cssEffects && (this.domElement.addClass("hover"), this.recoverActive && this.domElement.addClass("active"));
            break;
        case "mouseout":
            this.domElement && this.cssEffects && (this.recoverActive = !1, this.domElement.hasClass("active") && (this.domElement.removeClass("active"), this.recoverActive = !0), this.domElement.removeClass("hover"));
            break;
        case "mousedown":
            this.domElement && this.cssEffects && this.domElement.addClass("active");
            break;
        case "mouseup":
            this.domElement && this.cssEffects && (this.domElement.removeClass("active"), this.recoverActive = !1)
        }
        if (this.handlers[e]) for (var r = 0, i = this.handlers[e].length; r < i; r++) {
            var s = this.handlers[e][r];
            typeof s == "function" ? s(this, t) : typeof s == "object" && s.length == 2 ? s[0][s[1]](this, t) : typeof s == "string" && window[s](this, t)
        }
    }
}
