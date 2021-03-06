var SWFAddressOptimizer = new function() {
    var m = function() {
        try {
            top.document;
            return top
        } catch (i) {
            return window
        }
    };
    var h = function(y) {
        var E = y.toString().split(".");
        for (var z = 0; z < 3; z++) {
            E[z] = typeof E[z] != v ? parseInt(E[z]) : 0
        }
        var A = [0, 0, 0];
        var C = null;
        if (typeof w.plugins != v && typeof w.plugins[b] == j) {
            C = w.plugins[b].description;
            if (C && !(typeof w.mimeTypes != v && w.mimeTypes[a] && !w.mimeTypes[a].enabledPlugin)) {
                C = C.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                A[0] = parseInt(C.replace(/^(.*)\..*$/, "$1"), 10);
                A[1] = parseInt(C.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                A[2] = /r/.test(C) ? parseInt(C.replace(/^.*r(.*)$/, "$1"), 10) : 0
            }
        } else {
            if (typeof window.ActiveXObject != v) {
                var p = null;
                var D = false;
                try {
                    p = new ActiveXObject(x + ".7")
                } catch (B) {
                    try {
                        p = new ActiveXObject(x + ".6");
                        A = [6, 0, 21];
                        p.AllowScriptAccess = "always"
                    } catch (B) {
                        if (A[0] == 6) {
                            D = true
                        }
                    }
                    if (!D) {
                        try {
                            p = new ActiveXObject(x)
                        } catch (B) {}
                    }
                }
                if (!D && typeof p == j) {
                    try {
                        C = p.GetVariable("$version");
                        if (C) {
                            C = C.split(" ")[1].split(",");
                            A = [parseInt(C[0], 10), parseInt(C[1], 10), parseInt(C[2], 10)]
                        }
                    } catch (B) {}
                }
            }
        }
        return (A[0] > E[0] || (A[0] == E[0] && A[1] > E[1]) || (A[0] == E[0] && A[1] == E[1] && A[2] >= E[2])) ? true : false
    };
    var n = function(z, p) {
        var i = c.href.split(c.hostname)[1].replace(p, "");
        if (z != "/" && (!o || u == c.href.length - 1) && (i != "" && i != "/")) {
            var A;
            if (window.XMLHttpRequest) {
                A = new XMLHttpRequest()
            } else {
                if (window.ActiveXObject) {
                    try {
                        try {
                            A = new ActiveXObject("Msxml2.XMLHTTP")
                        } catch (y) {
                            A = new ActiveXObject("Microsoft.XMLHTTP")
                        }
                    } catch (y) {}
                }
            }
            if (A) {
                A.open("get", ((typeof p != v) ? p : "") + "/?" + z + (c.hash != "" ? "&hash=" + c.hash.replace(/^#/, "") : ""), false);
                A.setRequestHeader("Content-Type", "application/x-swfaddress");
                A.send("");
                (new Function(A.responseText.replace(/^([^(]*)\(([^)]*)\);?$/, "$1($2);")))()
            }
        } else {
            if (/webkit/i.test(w.userAgent.toLowerCase()) && e.referrer == c.href.replace(/#\/?/, "")) {
                c.reload()
            }
        }
    };
    var j = "object",
        b = "Shockwave Flash",
        x = "ShockwaveFlash.ShockwaveFlash",
        a = "application/x-shockwave-flash",
        v = "undefined",
        g, s = m(),
        e = s.document,
        c = s.location,
        w = navigator,
        u = c.href.indexOf("#"),
        o = (u != -1),
        d = {};
    var l = function(A) {
        if (A.childNodes) {
            for (var y = 0, p = A.childNodes.length, z; y < p; y++) {
                if (A.childNodes[y].src) {
                    g = String(A.childNodes[y].src)
                }
                if (z = l(A.childNodes[y])) {
                    return z
                }
            }
        }
    };
    l(document);
    var r = g ? g.indexOf("?") : -1;
    if (r != -1) {
        var f, t = g.substr(r + 1).split("&");
        for (var q = 0, k; k = t[q]; q++) {
            f = k.split("=");
            if (/^(base|flash|swfaddress)$/.test(f[0])) {
                d[f[0]] = unescape(f[1])
            }
        }
    }
    if (o && (u - (c.href.indexOf(c.pathname, c.protocol.length + 2) + c.pathname.indexOf(d.base) + d.base.length)) > 1) {
        o = false
    }
    if (typeof d.flash != v) {
        if (h(d.flash)) {
            n(d.swfaddress, d.base)
        } else {
            if (o) {
                c.replace(c.href.replace(/#\/?/, ""))
            }
        }
    } else {
        n(d.swfaddress, d.base)
    }
    this.toString = function() {
        return "[class SWFAddressOptimizer]"
    }
};