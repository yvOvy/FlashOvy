(function(w) {

    function loadStructureData() {
        Model.lang = "pl";
        var langID = window.location.hash.split("/")[0].replace("#", '');
        if (Model.isLangAvailable(langID)) {
            Model.lang = langID;
        }
        var langID = window.location.hash.split("/")[1];
        if (Model.isLangAvailable(langID)) {
            Model.lang = langID;
        }
        AppModel.live = document.location.hostname.split("live.com.pl").length > 1;
        
        var _structureURL = "wp/?json=getPage&page_id=554&children=1";
        // var _structureURL = "http://seatx.gsub.pl/wp/?json=getPage&page_id=554&children=1";
        StructureLoader.load({
            url: _structureURL,
            type: "json",
            callback: loadAssets
        })
    }

    function loadAssets(data) {
        AppModel.md = new MobileDetect(window.navigator.userAgent);
        AppModel.mobile = AppModel.md.mobile();
        Model.setStructureData(StructureUtils.getStructureFromJSON(JSON.parse(data)));

        var _preloaderDiv = document.createElement("div");
        Utils.SCROLLBAR_WIDTH = Utils.getScrollbarWidth();
        this._preloader = new Preloader360(_preloaderDiv);
        this._preloader.addEventListener("FINISH", dataCompleteHandler);
        this._preloader.initContent();
        document.body.appendChild(_preloaderDiv);

        AppModel.debug = document.location.hostname.split("ethos-warsaw.com").length < 2;
        Trace.isEnabled = AppModel.debug;
        if (AppModel.debug) {
            trace("We are in debug world");
        } else {
            console.log("liveS")
        }
        AssetManager.init(AppModel.imagesDir, "0.1");
        que = [
            "ptrn.png",
        ],

        this.__lst = new Date().getTime();
        console.log("this.__lst: "+ this.__lst);

        AssetManager.loadGroup(new AssetGroup(que, {
            onComplete: function() {
                assetsComplete();
            },
            onUpdate: assetsUpdate
        }))

    }

    function assetsUpdate(data) {
        this._preloader.setRatio(data);
    }

    function assetsComplete(data) {
        //
    }

    function dataCompleteHandler() {
        var _view = new View();
    }

    var mainClass = {};

    mainClass.init = function() {
        loadStructureData();
    };
    w.Main = mainClass
})(window);
window.onload = Main.init;

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - Math.abs(currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());