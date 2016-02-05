(function() {
    var d = document.getElementsByTagName("head")[0] || document.documentElement;
    this.load = function(c) {
        var a;
        a = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
        c.url = c.url || location.href;
        c.data = c.data || null;
        c.type = c.type || "json";
        c.action = c.action || "GET";
        var e = c.callback || function() {},
            k = c.callbackError || function() {};
        if ("jsonp" == c.type) {
            var f = "_" + Math.random().toString(36).substring(7),
                h = document.createElement("script");
            window[f] = function(a) {
                e(a)
            };
            c.url = c.url.replace("callback=?",
                "callback=" + f);
            h.src = c.url;
            d.appendChild(h)
        } else "json" == c.type && (a.onreadystatechange = function() {
            4 == a.readyState && (300 > a.status ? (e(a.responseText), a = a.onreadystatechange = null) : 300 < a.status && (k(), a = a.onreadystatechange = null))
        });
        a.open(c.action, c.url, !0);
        a.send(c.data);
        return a
    };
    window.StructureLoader = this;
    return this
})();