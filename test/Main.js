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
        AppModel.live = document.location.hostname.split("ethos-warsaw2").length > 1;
        
        var _structureURL = AppModel.live ? "assets/data/structure_" + Model.lang + ".json" : wpDir()+"?lang=" + Model.lang + "&json=getPage&page_id=5&children=1";
        // var _structureURL = AppModel.live ? "assets/data/structure_" + Model.lang + ".json" : "http://ethos.peryskop.biz/awp/?lang=" + Model.lang + "&json=getPage&page_id=5&children=1";
        StructureLoader.load({
            url: _structureURL,
            type: "json",
            callback: loadMenuViewStructureData
        })
    }

    function loadMenuViewStructureData(data) {
        var _menuStructureURL = AppModel.live ? "assets/data/menuview_" + Model.lang + ".json" : wpDir()+"?lang=" + Model.lang + "&json=getPage&page_id=36&children=1";
        // var _menuStructureURL = AppModel.live ? "assets/data/menuview_" + Model.lang + ".json" : "http://ethos.peryskop.biz/awp/?lang=" + Model.lang + "&json=getPage&page_id=36&children=1";
        Model.setStructureData(StructureUtils.getStructureFromJSON(JSON.parse(data)));
        StructureLoader.load({
            url: _menuStructureURL, 
            type: "json",
            callback: loadAssets
        })
    }

    function wpDir() {
        var _dev = document.location.hostname.split("peryskop.biz").length > 1;
        return _dev ? "http://ethos.peryskop.biz/wp/" : "awp/";
    }

    function loadAssets(data) {
        AppModel.md = new MobileDetect(window.navigator.userAgent);
        AppModel.mobile = AppModel.md.mobile();
        AppModel.autoPlay = !AppModel.mobile;

        AppModel.createDictionary(Model.getStructureData()['dict']);
        Model.setStructureData(StructureUtils.getStructureFromJSON(JSON.parse(data)), "menuView");
        AppModel.setImagesQuality({
            width: window.innerWidth,
            height: window.innerHeight
        });
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
            console.log("ethos-warsaw.com v1.2")
        }
        AssetManager.init(AppModel.imagesDir, "0.1");
        que = [
            "bg/homepage_background.jpg",
            "ui/01-pasek.jpg",
            "ui/02-pasek.jpg",
            "ui/03-pasek.jpg",
            "ui/04-pasek.jpg",
            "bg/ethos_menu_bg.png",
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
        setPreloaderRatio(data);
        this._preloader.setRatio(data);
    }

    function assetsComplete(data) {
        // var __let = new Date().getTime();
        // console.log("t: "+ (new Date().getTime() - this.__lst));
        AppModel.setVideoQuality(new Date().getTime() - this.__lst);
    }

    function dataCompleteHandler() {
        var _view = new View();
    }

    var mainClass = {};

    mainClass.init = function() {
        if (_hsd) {
            loadStructureData();
        }

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