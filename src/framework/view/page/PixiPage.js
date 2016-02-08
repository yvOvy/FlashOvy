var PixiPage = Page.extend({

    init: function($elem) {
        if (typeof($elem) == "undefined") {
            trace("Page: ELEM NIE MOZE BYC null");
        }

        this._container;
        this._elem = $elem;
        this._key;
        this._active;
        this._freeze = true;
        this._current;
        this._pageManager;
        this._pageManagerLevel = 0;
        this._data;
        this._viewId;
        this._pageManagerClass = "PixiPageManager";

    },

    initialize: function() {
        this._pmcontainer = new PIXI.Container();
        this._container = new PIXI.Container();
        this._content =  new PIXI.Container();

        this._pageManager = new window[this._pageManagerClass](this._pmcontainer, this._data.structureLevel + 1, true, Utils.stringToBoolean(this._data.atOnce), this.getViewId(), this._data);
        this._pageManager.start();
        this._pageManager.addEventListener(PageEvent.ON_PAGE_MANAGER_CLEAR, this.pageManagerClearHandler, this);

        this._elem.addChild(this._container);
        this._container.addChild(this._content);
        this._container.addChild(this._pmcontainer);



        this.initContent();
    },

    initContent: function() {
        this._graphics = new PIXI.Graphics();
        this._graphics.beginFill(0x4cafaf);
        this._graphics.drawRect(30,30,300,300);
        this._graphics.endFill();


        this._container.addChild(this._graphics);
    }


});
