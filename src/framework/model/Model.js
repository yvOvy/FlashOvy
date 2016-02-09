var Model = (function(exports) {
    var undef;

    var _localVariable = 0;
    var _dispatcher = new EventDispatcher();

    var SECOND_VIEW = "secondView";
    var DEFAULT_VIEW = "defaultView";
    var PMS = [];
    var viewState = [];

    var urlLangs = true;
    var lang = "pl";
    var langs = ["pl", "en"];

    var _homeURLs = {};
    var _parameters = {};
    var _structureData = {};



    function setStructureData($data, $viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        addViewState($viewId);

        _structureData[$viewId] = $data;
        dispatchEvent(new CEvent('blah'));

    }

    function addViewState($viewId) {
        viewState[$viewId] = [new StructureObj()];
    }

    function isLangAvailable($l) {
        for (var i = 0; i < Model.langs.length; i++) {
            if (Model.langs[i] == $l) {
                return true;
            }
        }
        return false;
    }

    function getViewState($viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        return viewState[$viewId];
    };

    function setViewState($value, $viewId) {


        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;

        if (getViewState($viewId)[getViewState($viewId).length - 1].fullUrl != $value[$value.length - 1].fullUrl) {
            dispatchEvent(new CEvent($viewId.toUpperCase() + "_VIEW_CHANGED"));
        }

        viewState[$viewId] = $value;
        changePrimePM($value, $viewId);


        dispatchEvent(new CEvent(ModelEvent.VIEW_CHANGED));

    };

    function changePrimePM($value, $viewId) {
        for (var i = 0; i < Model.PMS[$viewId].length; i++) {
            var _id_0 = $value[i] ? $value[i].id : null;
            var _id_1 = Model.PMS[$viewId][i] ? (Model.PMS[$viewId][i].getPageData() ? Model.PMS[$viewId][i].getPageData().id : null) : null;
            if (_id_0 != _id_1) {
                Model.PMS[$viewId][i].setPageData($value[i]);
                return;
            }
        }
    }

    function getStructureData($viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        return _structureData[$viewId];

    }

    function addPageManager($pm, $level, $viewId) {
        $level = typeof $level !== 'undefined' ? $level : 0;
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;

        if (!Model.PMS[$viewId]) Model.PMS[$viewId] = [];
        Model.PMS[$viewId][$level] = $pm;
    }

    function removePageManager($pm, $level, $viewId) {
        $level = typeof $level !== 'undefined' ? $level : 0;
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;

        var _pmsKey = Model.PMS[$viewId][$level] ? Model.PMS[$viewId][$level].getKey() : null;
        var _pmKey = $pm ? $pm.getKey() : null;

        if (_pmsKey == _pmKey) Model.PMS[$viewId].splice($level, 1);
    }

    function setParameters($value, $viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        _parameters[$viewId] = $value;
    };

    function getParameters($viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        return _parameters[$viewId];
    };

    function setHomeURL($value, $viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        _homeURLs[$viewId] = $value;
    };

    function getHomeURL($viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        return _homeURLs[$viewId] || "";
    };

    function getFullURL($viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        return getViewState($viewId)[getViewState($viewId).length - 1].fullUrl;
    }

    function getBaseURL($level, $viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        var _baseURL = ""

        for (var i = 0; i < $level; i++) {
            _baseURL += getViewState($viewId)[i].url + "/";
        }

        return _baseURL;
    }

    function removeEventListener($type, $listener, $scope) {
        _dispatcher.removeEventListener($type, $listener, $scope);
    }

    function addEventListener($type, $listener, $scope) {
        _dispatcher.addEventListener($type, $listener, $scope);
    }

    function dispatchEvent($event) {
        _dispatcher.dispatchEvent($event);

    }

    exports.removePageManager = removePageManager;
    exports.urlLangs = urlLangs;
    exports.lang = lang;
    exports.langs = langs;
    exports.isLangAvailable = isLangAvailable;
    exports.addPageManager = addPageManager;
    exports.getViewState = getViewState;
    exports.setViewState = setViewState;
    exports.getStructureData = getStructureData;
    exports.getFullURL = getFullURL;
    exports.getBaseURL = getBaseURL;
    exports.setHomeURL = setHomeURL;
    exports.getHomeURL = getHomeURL;
    exports.setParameters = setParameters;
    exports.getParameters = getParameters;
    exports.removeEventListener = removeEventListener;
    exports.addEventListener = addEventListener;
    exports.dispatchEvent = dispatchEvent;
    exports.setStructureData = setStructureData;
    exports.DEFAULT_VIEW = DEFAULT_VIEW;
    exports.SECOND_VIEW = SECOND_VIEW;
    exports.PMS = PMS;

    return exports;

}({}));
