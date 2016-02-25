var Page = EventDispatcher.extend({

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
        this._pageManagerClass = "PageManager";

    },
    // ----->>>
    activate: function($data) {
        this._data = $data;
        if (!this._active) {
            this._active = true;
            this.loadData();
        };
    },

    loadData: function() {
        this.initialize();
    },


    initialize: function() {
        this._container = document.createElement("div");

        this._container.setAttribute('page-id', this._data.title);
        this._container.setAttribute('class', this._data.className);
        this._container.setAttribute('Page', this._data.url);

        this._elem.appendChild(this._container);
        this._pageManager = new window[this._pageManagerClass](this._data.structureLevel + 1, true, Utils.stringToBoolean(this._data.atOnce), this.getViewId(), this._data);
        
        this.startPageManager();

        this._pageManager.addEventListener(PageEvent.ON_PAGE_MANAGER_CLEAR, this.pageManagerClearHandler, this);
        this.initContent();
    },

    startPageManager: function() {
        this._pageManager.start(this._container);
    },

    initContent: function() {
        this._div = document.createElement("div");
        this._div.setAttribute('class', "rect-green");

        this._container.appendChild(this._div);

    },

    // <<<-----
    hide: function() {
        if (this._active) {
            this._active = false;
            this.individualHide();
        }
    },

    individualHide: function() {
        if (this._pageManager) this._pageManager.setPageData(null);
    },


    hideAndDestroy: function() {
        this.destroyPage();
    },

    pageManagerClearHandler: function(e) {
        if (this._pageManager) {
            this._pageManager.removeEventListener(PageEvent.ON_PAGE_MANAGER_CLEAR, this.pageManagerClearHandler, this);
            if(this._container.parentNode)this._container.parentNode.removeChild(this._container);
            this._pageManager = null;
        }
        this.hideAndDestroy();
    },

    destroyPage: function() {
        this.dispatchEvent(new CEvent(PageEvent.ON_CLEAR));
    },


    //
    getKey: function() {
        return this._key;
    },

    setKey: function(value) {
        this._key = value;
    },

    getPageManagerLevel: function() {
        return this._pageManagerLevel;
    },

    setPageManagerLevel: function(value) {
        this._pageManagerLevel = value;
    },

    getData: function() {
        return this._data;
    },

    setData: function(value) {
        this._data = value;
    },

    getPageManager: function() {
        return this._pageManager;
    },

    setPageManager: function(value) {
        this._pageManager = value;
    },

    getViewId: function() {
        return this._viewId;
    },

    setViewId: function(value) {
        this._viewId = value;
    },

    getCurrent: function() {
        return ((this._data.fullUrl == "/" + Model.getHomeURL(this._viewId) && (Model.getFullURL(this._viewId) == this._data.fullUrl || Model.getFullURL(this._viewId) == "/")) || Model.getFullURL(this._viewId) == this._data.fullUrl);
    },

    getActive: function() {
        return this._active;
    },

    getPageManagerClass: function() {
        return this._pageManagerClass;
    },

    setPageManagerClass: function(value) {
        this._pageManagerClass = value;
    }


});