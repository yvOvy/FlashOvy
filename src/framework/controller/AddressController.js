var AddressController = (function(exports) {
    var undef;

    function AddressController() {}

    var _trackingString;

    function AddressController() {}

    function init($trackingString) {
        _trackingString = $trackingString || "";

        SWFAddress.addEventListener(SWFAddressEvent.CHANGE, handleSWFAddress);
        var _startValue = String(SWFAddress.getValue());

        HistoryController.addEventListener(HistoryControllerEvent.CHANGE, handleHistoryController);
        ViewAddress.addEventListener(ViewAddressEvent.CHANGE, handleViewAddress);
        SWFAddress.dispatchEvent(new SWFAddressEvent(SWFAddressEvent.CHANGE));
        ViewAddress.dispatchEvent(new ViewAddressEvent(ViewAddressEvent.CHANGE));
    }


    function handleHistoryController($e) {

    }

    function handleViewAddress($e) {
        if (Model.PMS[ViewAddress.getViewID()]) {
            // TO DO - ViewAddress parameters
            // $e.parameters.string = String($e.value).split("?")[1] || ""
            // Model.setParameters($e.parameters, ViewAddress.getViewID());
            // trace("ViewAddress.getViewID() "+ViewAddress.getViewID())
            var _oldParams = Model.getParameters(ViewAddress.getViewID());
            $e.parameters.string = String($e.value).split("?")[1] || "";
            Model.setParameters($e.parameters, ViewAddress.getViewID());

            structureDataToViewState($e.pathNames, $e.path, ViewAddress.getViewID());
        }
    }

    function handleSWFAddress($e) {
        trace("###  pathNames  " + $e.pathNames);
        trace("###  handleSWFAddress  " + $e.path);
        // trace($e)
        var _oldParams = Model.getParameters();
        $e.parameters.string = String($e.value).split("?")[1] || "";
        Model.setParameters($e.parameters);

        if (Model.urlLangs && $e.pathNames.length && Model.isLangAvailable($e.pathNames[0]))
        {
            var _langNow = $e.pathNames.shift();
            trace(":) got lang: " + _langNow);
        } else {
            trace("no lang!");
        }

        structureDataToViewState($e.pathNames, $e.path);

        if (_oldParams != Model.getParameters().string) Model.dispatchEvent(new CEvent(ModelEvent.PARAMETERS_CHANGED));
    }


    function gotoHome($viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        Model.getURL(Model.getHomeURL($viewId), $viewId);
    }


    function structureDataToViewState($path, $p, $viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        var _tempObj = Model.getStructureData($viewId);
        var _newViewState = [];

        for (var i = 0; i < $path.length; i++) {
            if (_tempObj) {
                if (getChildrens($path[i], _tempObj)) {
                    _newViewState.push(getChildrens($path[i], _tempObj));
                    _tempObj = getChildrens($path[i], _tempObj).children;
                } else {
                    gotoHome($viewId);
                    return;
                }
            }
        }

        if (!$path.length) {
            _s = getChildrens(Model.getHomeURL($viewId), _tempObj);
            if (_s) _newViewState.push(_s);
        }

        if (_newViewState.length) {

            while (_newViewState[_newViewState.length - 1] && _newViewState[_newViewState.length - 1].autoFirstPage && _newViewState[_newViewState.length - 1].getChildrensArray().length) {

                var childrenArray = _newViewState[_newViewState.length - 1].getChildrensArray();
                var num = childrenArray.length - 1;

                if (_newViewState[_newViewState.length - 1].randomPage && num > 0) {

                    var random = Math.round(Math.random() * num);
                    _s = getChildrens(childrenArray[random].url, _newViewState[_newViewState.length - 1].children);
                } else {
                    _s = getChildrens(childrenArray[0].url, _newViewState[_newViewState.length - 1].children);
                }
                if (_s) _newViewState.push(_s);
            }
        }
        Model.setViewState(_newViewState, $viewId);

    }

    function getChildrens($url, $obj) {
        for (var i in $obj) {
            if ($url == $obj[i].url) {
                return $obj[i];
            }
        }
        return null;
    }

    exports.init = init;
    return exports;

}({}));
