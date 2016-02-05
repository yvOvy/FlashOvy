
var BrowserDetect = {
    init: function() {
        BrowserDetect.MOBILE = BrowserDetect.checkMobile();
        BrowserDetect.TABLET = BrowserDetect.checkTablet();
        BrowserDetect.MOBILE || BrowserDetect.TABLET || (BrowserDetect.DESKTOP = !0);
        BrowserDetect.MOBILE ? BrowserDetect.DEVICE = "mobile" : BrowserDetect.TABLET ? BrowserDetect.DEVICE = "tablet" : BrowserDetect.DESKTOP && (BrowserDetect.DEVICE = "desktop");
        BrowserDetect.BROWSER_NAME = this.searchString(this.dataBrowser) || "An unknown browser";
        BrowserDetect.BROWSER_VERSION = this.searchVersion(navigator.userAgent) ||
            this.searchVersion(navigator.appVersion) || "an unknown version";
        BrowserDetect.OS = this.searchString(this.dataOS) || "an unknown OS";
        window.chrome && !window.chrome.webstore && (BrowserDetect.BROWSER_NAME = "Opera");
        "Firefox" == BrowserDetect.BROWSER_NAME ? BrowserDetect.FIREFOX = !0 : "Chrome" == BrowserDetect.BROWSER_NAME ? BrowserDetect.CHROME = !0 : "Safari" == BrowserDetect.BROWSER_NAME ? BrowserDetect.SAFARI = !0 : "Explorer" == BrowserDetect.BROWSER_NAME ? BrowserDetect.IE = !0 : "Opera" == BrowserDetect.BROWSER_NAME && (BrowserDetect.OPERA = !0);
        BrowserDetect.IE && 8 >= BrowserDetect.BROWSER_VERSION && (BrowserDetect.IE8 = !0);
        BrowserDetect.IE && 9 == BrowserDetect.BROWSER_VERSION && (BrowserDetect.IE9 = !0);
        BrowserDetect.IE && 10 == BrowserDetect.BROWSER_VERSION && (BrowserDetect.IE10 = !0);
        "Mozilla" == BrowserDetect.BROWSER_NAME && 11 == BrowserDetect.BROWSER_VERSION && (BrowserDetect.IE11 = !0);
        BrowserDetect.FIREFOX && 10 <= BrowserDetect.BROWSER_VERSION && (BrowserDetect.TRANSLATE3D_SUPPORT = !0)
    },
    searchString: function(d) {
        for (var c = 0; c < d.length; c++) {
            var a = d[c].string,
                e = d[c].prop;
            BrowserDetect.BROWSER_VERSIONSearchString = d[c].versionSearch || d[c].identity;
            if (a) {
                if (-1 != a.indexOf(d[c].subString)) return d[c].identity
            } else if (e) return d[c].identity
        }
    },
    searchVersion: function(d) {
        var c = d.indexOf(BrowserDetect.BROWSER_VERSIONSearchString);
        if (-1 != c) return parseFloat(d.substring(c + BrowserDetect.BROWSER_VERSIONSearchString.length + 1))
    },
    getOlderSafariVersion: function(d) {
        if (100 > d) return 1;
        if (125.2 > d) return 1.1;
        if (312.1 > d) return 1.2;
        if (412 > d) return 1.3;
        if (523.1 > d) return 2;
        if (523.12 >= d) return 3
    }
};
BrowserDetect.dataBrowser = [{
    string: navigator.userAgent,
    subString: "Chrome",
    identity: "Chrome"
}, {
    string: navigator.userAgent,
    subString: "OmniWeb",
    versionSearch: "OmniWeb/",
    identity: "OmniWeb"
}, {
    string: navigator.vendor,
    subString: "Apple",
    identity: "Safari",
    versionSearch: "Version"
}, {
    prop: window.opera,
    identity: "Opera"
}, {
    string: navigator.vendor,
    subString: "iCab",
    identity: "iCab"
}, {
    string: navigator.vendor,
    subString: "KDE",
    identity: "Konqueror"
}, {
    string: navigator.userAgent,
    subString: "Firefox",
    identity: "Firefox"
}, {
    string: navigator.vendor,
    subString: "Camino",
    identity: "Camino"
}, {
    string: navigator.userAgent,
    subString: "Netscape",
    identity: "Netscape"
}, {
    string: navigator.userAgent,
    subString: "MSIE",
    identity: "Explorer",
    versionSearch: "MSIE"
}, {
    string: navigator.userAgent,
    subString: "Gecko",
    identity: "Mozilla",
    versionSearch: "rv"
}, {
    string: navigator.userAgent,
    subString: "Mozilla",
    identity: "Netscape",
    versionSearch: "Mozilla"
}];
BrowserDetect.dataOS = [{
    string: navigator.platform,
    subString: "Win",
    identity: "Windows"
}, {
    string: navigator.platform,
    subString: "Mac",
    identity: "Mac"
}, {
    string: navigator.userAgent,
    subString: "iPhone",
    identity: "iPhone/iPod"
}, {
    string: navigator.userAgent,
    subString: "iPad",
    identity: "iPad"
}, {
    string: navigator.userAgent,
    subString: "Android",
    identity: "Android"
}, {
    string: navigator.userAgent,
    subString: "Windows CE",
    identity: "Windows CE"
}, {
    string: navigator.userAgent,
    subString: "Palm",
    identity: "Palm"
}, {
    string: navigator.userAgent,
    subString: "Blackberry",
    identity: "Blackberry"
}, {
    string: navigator.platform,
    subString: "Linux",
    identity: "Linux"
}];
BrowserDetect.checkMobile = function() {
    var d = /iphone|ipod|kindle|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase());
    1 == d && (BrowserDetect.TABLET = !1);
    return !0 === d ? !0 : !1
};
BrowserDetect.checkTablet = function() {
    var d = /ipad|sch-i800|playbook|xoom|tablet|gt-p1000|gt-p7510|sgh-t849|nexus 7|nexus 10|shw-m180s|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase());
    if (!0 === /android/i.test(navigator.userAgent.toLowerCase()) || !0 === d) {
        var d = screen.height,
            c = screen.width;
        d > c && (c = screen.height, d = screen.width);
        736 <= d && 1024 <= c ? d = !0 : (BrowserDetect.MOBILE = !0, d = !1)
    }
    1 == d && (BrowserDetect.MOBILE = !1);
    return !0 === d ? !0 : !1
};
BrowserDetect.has3d = function() {
    var d = document.createElement("p"),
        c, a = {
            webkitTransform: "-webkit-transform",
            OTransform: "-o-transform",
            msTransform: "-ms-transform",
            MozTransform: "-moz-transform",
            transform: "transform"
        };
    document.body.insertBefore(d, null);
    for (var e in a) void 0 !== d.style[e] && (d.style[e] = "translate3d(1px,1px,1px)", c = window.getComputedStyle(d).getPropertyValue(a[e]));
    document.body.removeChild(d);
    return void 0 !== c && 0 < c.length && "none" !== c
};
BrowserDetect.BROWSER_NAME = null;
BrowserDetect.BROWSER_VERSION = null;
BrowserDetect.OS = null;
BrowserDetect.DEVICE = "";
BrowserDetect.MOBILE = !1;
BrowserDetect.TABLET = !1;
BrowserDetect.DESKTOP = !1;
BrowserDetect.CHROME = !1;
BrowserDetect.SAFARI = !1;
BrowserDetect.FIREFOX = !1;
BrowserDetect.OPERA = !1;
BrowserDetect.IE = !1;
BrowserDetect.IE8 = !1;
BrowserDetect.IE9 = !1;
BrowserDetect.TRANSLATE3D_SUPPORT = BrowserDetect.has3d();
BrowserDetect.init();




function Event() {}

function MouseEvent() {}

function KeyboardEvent() {}

function TouchEvent() {}

function MutationEvent() {}

function MessageEvent() {}

function MediaEvent() {}

function MouseAndTouchEvent() {}
Event.RESIZE = "resize";
Event.ORIENTATIONCHANGE = "orientationchange";
Event.LOAD = "load";
Event.SCROLL = "scroll";
Event.SELECT = "select";
Event.SUBMIT = "submit";
Event.HASHCHANGE = "hashchange";
Event.BLUR = "blur";
Event.PROGRESS = "progress";
Event.CHANGE = "change";
Event.ABORT = "abort";
Event.UNLOAD = "unload";
Event.BEFOREUNLOAD = "beforeunload";
Event.LOAD = "load";
Event.PROGRESS = "progress";
Event.ERROR = "error";
Event.CONTEXTMENU = "contextmenu";
Event.COPY = "copy";
Event.PASTE = "paste";
Event.READY_STATE_CHANGE = "readystatechange";
Event.RESET = "reset";
MouseEvent.CLICK = "click";
MouseEvent.MOUSE_DOWN = "mousedown";
MouseEvent.MOUSE_MOVE = "mousemove";
MouseEvent.MOUSE_UP = "mouseup";
MouseEvent.RIGHT_CLICK = "rightclick";
MouseEvent.MOUSE_OVER = "mouseover";
MouseEvent.MOUSE_OUT = "mouseout";
MouseEvent.DOUBLE_CLICK = "dblclick";
MouseEvent.FOCUS = "focus";
MouseEvent.MOUSE_ENTER = "mouseenter";
MouseEvent.MOUSE_LEAVE = "mouseleave";
MouseEvent.ROLL_OVER = "mouseenter";
MouseEvent.ROLL_OUT = "mouseleave";
MouseEvent.DRAG_END = "dragend";
MouseEvent.DRAG_ENTER = "dragenter";
MouseEvent.DRAG_LEAVE = "dragleave";
MouseEvent.DRAG_OVER = "dragover";
MouseEvent.DRAG_START = "dragstart";
MouseEvent.DROP = "drop";
MouseEvent.MOUSE_WHEEL = "mousewheel";
"Firefox" == BrowserDetect.BROWSER_NAME && (MouseEvent.MOUSE_WHEEL = "DOMMouseScroll");
KeyboardEvent.KEY_DOWN = "keydown";
KeyboardEvent.KEY_UP = "keyup";
KeyboardEvent.KEY_PRESS = "keypress";
TouchEvent.TOUCH_START = "touchstart";
TouchEvent.TOUCH_MOVE = "touchmove";
TouchEvent.TOUCH_END = "touchend";
TouchEvent.TOUCH_CANCEL = "touchcancel";
1 == BrowserDetect.TABLET || 1 == BrowserDetect.MOBILE ? (MouseAndTouchEvent.MOUSE_DOWN = TouchEvent.TOUCH_START, MouseAndTouchEvent.MOUSE_MOVE = TouchEvent.TOUCH_MOVE, MouseAndTouchEvent.MOUSE_UP = TouchEvent.TOUCH_END, MouseAndTouchEvent.RESIZE = Event.ORIENTATIONCHANGE) : (MouseAndTouchEvent.MOUSE_DOWN = MouseEvent.MOUSE_DOWN, MouseAndTouchEvent.MOUSE_MOVE = MouseEvent.MOUSE_MOVE, MouseAndTouchEvent.MOUSE_UP = MouseEvent.MOUSE_UP, MouseAndTouchEvent.RESIZE = Event.RESIZE);
MessageEvent.MESSAGE = "message";
MediaEvent.ABORT = "abort";
MediaEvent.CANPLAY = "canplay";
MediaEvent.CAN_PLAY_THROUGH = "canplaythrough";
MediaEvent.DURATION_CHANGE = "durationchange";
MediaEvent.EMPTIED = "emptied";
MediaEvent.ENDED = "ended";
MediaEvent.ERROR = "error";
MediaEvent.LOADED_DATA = "loadeddata";
MediaEvent.LOADED_METADATA = "loadedmetadata";
MediaEvent.LOAD_START = "loadstart";
MediaEvent.PAUSE = "pause";
MediaEvent.PLAY = "play";
MediaEvent.PLAYING = "playing";
MediaEvent.PROGRESS = "progress";
MediaEvent.RATE_CHANGE = "ratechange";
MediaEvent.SEEKED = "seeked";
MediaEvent.SEEKING = "seeking";
MediaEvent.SUSPEND = "suspend";
MediaEvent.TIME_UPDATE = "timeupdate";
MediaEvent.VOLUME_CHANGE = "volumechange";
MediaEvent.WAITING = "waiting";