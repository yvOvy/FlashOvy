(function() {
    function d() {
        function a() {
            for (v; v < p; v++) D = h[v], c.assetExist(D) || (x.push(h[v]), z++);
            if (0 < x.length) {
                var a = 0,
                    d = x.length;
                for (a; a < d; a++) {
                    C = new Image;
                    D = x[a];
                    C.addEventListener("load", e, !0);
                    C.addEventListener("error", k, !0);
                    C.style.position = "absolute";
                    if (/\//.test(x[a]) && c.que[0].stripPath) {
                        var l = x[a],
                            n = void 0;
                        l && (n = l.replace(RegExp("^.*[/]", "g"), ""));
                        D = n
                    }
                    url = null != m ? m + x[a] : c.assetPath + x[a];
                    c.assets.push({
                        asset: C,
                        id: D,
                        isURI: !1
                    });
                    C.src = url + ("" !== c.assetVersion ? "?v=" : "") + c.assetVersion
                }
            } else f()
        }

        function e(a) {
            a.currentTarget.removeEventListener("load", f, !0);
            a.currentTarget.removeEventListener("error", f, !0);
            u++;
            f()
        }

        function k(a) {
            a.currentTarget.removeEventListener("load", f, !0);
            a.currentTarget.removeEventListener("error", f, !0);
            u++;
            f()
        }

        function f() {
            c._percentageLoaded = Math.ceil(u / z * (100 - w) + w);
            null != q && q(c._percentageLoaded);
            u == z && (l && l(), c.que.shift(), 0 < c.que.length ? setTimeout(d, 100) : c.busy = !1)
        }
        c._percentageLoaded = 0;
        var h = c.que[0].data,
            l = c.que[0].onComplete,
            m = c.que[0].customPath,
            q = c.que[0].onUpdate,
            n = c.que[0].dataURIFile,
            t = c.que[0].dataURIFileSizeInBytes,
            w = c.que[0].dataURIFilePercentageOfTotal;
        "Explorer" == BrowserDetect.BROWSER_NAME && 9 >= BrowserDetect.BROWSER_VERSION && (n = null, w = 0);
        var v = 0,
            p = h.length,
            u = 0,
            x = [],
            z = 0,
            C, D;
        if (null != n) {
            var B = function(h) {
                    y.removeEventListener(Event.LOAD, B, !0);
                    h = h.currentTarget.responseText.split("|");
                    for (var f = 0; f < h.length - 1; f++) {
                        var e = h[f];
                        if (0 == f % 2) {
                            var k = new Image;
                            k.src = h[f + 1];
                            c.assets.push({
                                asset: k,
                                id: e.toString(),
                                isURI: !0
                            })
                        }
                    }
                    y = null;
                    a()
                },
                n = n + ("" !== c.assetVersion ? "?v=" :
                    "") + c.assetVersion,
                y = new XMLHttpRequest;
            y.addEventListener("progress", function(a) {
                c._percentageLoaded = Math.ceil(a.loaded / t * w);
                c._percentageLoaded > w && (c._percentageLoaded = w);
                null != q && q(c._percentageLoaded)
            }, !1);
            y.addEventListener(Event.LOAD, B, !0);
            y.open("GET", n, !0);
            y.overrideMimeType && y.overrideMimeType("text/plain; charset=x-user-defined");
            y.send(null)
        } else a()
    }
    var c = {
        assetVersion: "",
        init: function(a, e) {
            c.initialized || (c.assetVersion = e || "", c.assets = [], c.que = [], c.busy = !1, c.assetPath = a, c._percentageLoaded =
                0, c.initialized = !0)
        },
        loadGroup: function(a) {
            if (!c.initialized) throw Error("You need to initialize AssetManager before loading a group");
            c.busy ? c.que.push(a) : (c.busy = !0, c.que.push(a), d())
        },
        getAsset: function(a) {
            if (!c.initialized) throw Error("You need to initialize AssetManager before attempting to retrive an asset - id: " + a);
            var e = 0,
                k = c.assets.length,
                f = null;
            for (e; e < k; e++)
                if (a === c.assets[e].id) return e = c.assets[e].asset, f = e.cloneNode(!0), f.style.position = "absolute", -1 < a.indexOf("@2") ? (a = e.width / 2, e = e.height /
                    2, f.width = a, f.height = e) : (a = e.width, e = e.height), f.width = a, f.height = e, f._orgW = a, f._orgH = e, f._ratio = e / a, f;
            throw Error("AssetManager -> asset with id: " + a + ", not found");
        },
        destroy: function(a) {
            if (!c.initialized) throw Error("You need to initialize AssetManager before attempting to destroy an asset - id: " + a);
            var e = 0,
                k = c.assets.length;
            for (e; e < k; e++)
                if (a === c.assets[e].id) {
                    c.assets[e] = null;
                    c.assets.splice(e, 1);
                    break
                }
        },
        assetExist: function(a) {
            var e = 0,
                k = c.assets.length;
            for (e; e < k; e++)
                if (a === c.assets[e].id) return !0;
            return !1
        }
    };
    window.AssetManager = c
})();

function AssetGroup(d, c) {
    this.data = d;
    c.onComplete && (this.onComplete = c.onComplete);
    null !== c.customPath && (this.customPath = c.customPath);
    c.onUpdate && (this.onUpdate = c.onUpdate);
    c.dataURIFile && (this.dataURIFile = c.dataURIFile);
    c.dataURIFileSizeInBytes && (this.dataURIFileSizeInBytes = c.dataURIFileSizeInBytes);
    this.dataURIFilePercentageOfTotal = c.dataURIFilePercentageOfTotal ? c.dataURIFilePercentageOfTotal : 0;
    this.stripPath = c.stripPath ? c.stripPath : !1;
    return this
}