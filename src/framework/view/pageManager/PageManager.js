var PageManager = EventDispatcher.extend({

    init: function($level, $autoFirstPage, $atOnce, $viewId, $data) {
        $level = typeof $level !== 'undefined' ? $level : 0;
        $autoFirstPage = typeof $autoFirstPage !== 'undefined' ? $autoFirstPage : false;
        $atOnce = typeof $atOnce !== 'undefined' ? $atOnce : false;
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        this._level = $level;
        this._key = Math.random() * 100000000000000000;
        this._page;
        this._pageClass;
        this._pageData;
        this._pageURL;
        this._autoFirstPage = false;
        this._randomPage;

        this._kill = true;
        this._atOnce = $atOnce;
        this._viewId = $viewId;
        this._data = $data;
        this._elem = null;
    },

    start: function($elem) {
        this._elem = $elem;
        Model.addPageManager(this, this._level, this._viewId);
        Model.setViewState(Model.getViewState(this._viewId), this._viewId);
        if (Model.getViewState(this._viewId)[this._level - 1]) this._pageURL = Model.getViewState(this._viewId)[this._level - 1].fullUrl;
    },

    setPageData: function(value) {
        this._pageData = value;

        var _v1 = Model.getViewState(this._viewId)[this._level - 1];
        var _v2 = Model.getViewState(this._viewId)[this._level - 2];

        this._kill = !(Model.getViewState(this._viewId)[this._level - 1] && Model.getViewState(this._viewId)[this._level - 1].fullUrl == this._pageURL) || !Model.PMS[this._viewId][0].getPageData();
        if (value) {
            this.setPageClass(this._pageData.className);
        } else {
            this.setPageClass(null);
        }
    },

    getPageData: function() {
        return this._pageData;
    },

    getLevel: function() {
        return this._level;
    },

    getCurrentPage: function() {
        return this._page;
    },


    setPageClass: function(value) {
        this._pageClass = value;
        this.switchPage();
    },

    switchPage: function() {
        if (this._page) {
            this.unloadPage();
        } else if (this._pageClass) {
            this.loadPage();
        } else {
            this.clear();
        }
    },

    loadPage: function() {

        this._pageData.structureLevel = this._level;
        // trace("||| || | pageClass ---- > "+this._pageClass)
        this._page = new window[this._pageClass](this._elem);
        this._page.setViewId(this._viewId);
        this._page.setKey(Math.random() * 100000000000000000);
        this._page.addEventListener(PageEvent.ON_CLEAR, this.onPageUnload, this);

        this._page.activate(this._pageData);
        this.dispatchEvent(new CEvent(PageEvent.ON_LOAD_PAGE));
    },


    unloadPage: function() {
        if (this._page) {
            this._page.hide();
            if (this._atOnce && this._pageData) this.loadPage();
            if (this._atOnce && this._kill && this._level) {
                Model.removePageManager(this, this._level, this._viewId);
            }
            this.dispatchEvent(new CEvent(PageManagerEvent.PAGE_HIDE));
        } else {
            this.clear();
        }
    },

    onPageUnload: function($e) {
        $e.target.removeEventListener(PageEvent.ON_CLEAR, this.onPageUnload, this);

        if (!this._atOnce) this._page = null;
        if (this._pageClass) {
            if (!this._atOnce) this.loadPage();
        } else {
            this._page = null;
            this.clear();
        }
    },

    getAtOnce: function() {
        return this._atOnce;
    },

    setAtOnce: function($bool) {

        this._atOnce = $bool;
    },

    clear: function() {
        // remove from PMS list
        if (this._level) {
            if (this._kill) {
                Model.removePageManager(this, this._level, this._viewId);
                this._elem.parentNode.removeChild(this._elem);
                this.dispatchEvent(new CEvent(PageEvent.ON_PAGE_MANAGER_CLEAR));
            }
        } else {
            this.dispatchEvent(new CEvent(PageManagerEvent.VIEW_CLEAR_HANDLER));
        }
    },

    getKey: function() {
        return this._key;
    },

    toString: function() {
        return "[ PageManager ][_viewId: " + this._viewId + "][_level: " + this._level + "]";
    }

});