 var AddressController = (function(exports) {
    var undef;

    function AddressController() {}

    var _trackingString;

    function AddressController() {}

    function init($trackingString, $prefix) {
        _trackingString = $trackingString || "";
        HistoryAddress.setPrefix($prefix || "")

        HistoryAddress.addEventListener(HistoryAddressEvent.CHANGE, handleHistoryController);
        SWFAddress.addEventListener(SWFAddressEvent.CHANGE, handleSWFAddress);

        ViewAddress.addEventListener(ViewAddressEvent.CHANGE, handleViewAddress);

        SWFAddress.dispatchEvent(new SWFAddressEvent(SWFAddressEvent.CHANGE));
        HistoryAddress.dispatchEvent(new HistoryAddressEvent(HistoryAddressEvent.CHANGE));
        ViewAddress.dispatchEvent(new ViewAddressEvent(ViewAddressEvent.CHANGE));
    }


    function handleHistoryController($e) {
      var _oldParams = Model.getParameters();
      $e.parameters.string = String($e.value).split("?")[1] || "";
      Model.setParameters($e.parameters);
      var _names = HistoryAddress.removePrefix($e.pathNames);
      if (Model.urlLangs && _names.length && Model.isLangAvailable(_names[0]))
      {
          var _langNow = _names.shift();
      } else {
          //trace("no lang!");
      }
      structureDataToViewState(_names, $e.path);

      if (_oldParams != Model.getParameters().string) Model.dispatchEvent(new CEvent(ModelEvent.PARAMETERS_CHANGED));

    }

    function handleViewAddress($e) {
        if (Model.PMS[ViewAddress.getViewID()]) {
            // TO DO - ViewAddress parameters
            // $e.parameters.string = String($e.value).split("?")[1] || ""
            // Model.setParameters($e.parameters, ViewAddress.getViewID());
            var _oldParams = Model.getParameters(ViewAddress.getViewID());
            $e.parameters.string = String($e.value).split("?")[1] || "";
            Model.setParameters($e.parameters, ViewAddress.getViewID());
            structureDataToViewState($e.pathNames, $e.path, ViewAddress.getViewID());
        }
    }

    function handleSWFAddress($e) {
        var _oldParams = Model.getParameters();
        $e.parameters.string = String($e.value).split("?")[1] || "";
        Model.setParameters($e.parameters);

        if (Model.urlLangs && $e.pathNames.length && Model.isLangAvailable($e.pathNames[0]))
        {
            var _langNow = $e.pathNames.shift();
        } else {
            //trace("no lang!");
        }
        structureDataToViewState($e.pathNames, $e.path,Model.SECOND_VIEW);

        if (_oldParams != Model.getParameters().string) Model.dispatchEvent(new CEvent(ModelEvent.PARAMETERS_CHANGED));
    }

    function getURL($url, $viewId) {
          $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
          if (typeof $url !== 'undefined') {
            if ($url.split("#").length > 1) {
              $viewId = $url.split("#")[0];
              $url = $url.split("#")[$url.split("#").length - 1];
            }
          }
          if ($url.indexOf("http://") != -1 ) {
            window.open($url, "_blank");
            return;
          }
          if ($viewId == Model.DEFAULT_VIEW) {
            if (Model.urlLangs) {
              $url = Model.lang + "/" + $url;
            }
            HistoryAddress.setValue($url);

          } else if($viewId == Model.SECOND_VIEW){
                SWFAddress.setValue($url);
          }else{
                ViewAddress.setValue($viewId + "#" + $url.split("#")[$url.split("#").length - 1]);
          }

    };


    function gotoHome($viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        getURL(Model.getHomeURL($viewId), $viewId);
    }


    function structureDataToViewState($path, $p, $viewId) {
        $viewId = typeof $viewId !== 'undefined' ? $viewId : Model.DEFAULT_VIEW;
        var _tempObj = Model.getStructureData($viewId);
        var _newViewState = [];
        for (var i = 0; i < $path.length; i++) {
            if (_tempObj) {
                if (getChildren($path[i], _tempObj)) {
                    _newViewState.push(getChildren($path[i], _tempObj));
                    _tempObj = getChildren($path[i], _tempObj).children;
                } else {
                    gotoHome($viewId);
                    return;
                }
            }
        }

        if (!$path.length) {
            _s = getChildren(Model.getHomeURL($viewId), _tempObj);
            if (_s) _newViewState.push(_s);
        }

        if (_newViewState.length) {

            while (_newViewState[_newViewState.length - 1] && _newViewState[_newViewState.length - 1].autoFirstPage && _newViewState[_newViewState.length - 1].getChildrenArray().length) {

                var childrenArray = _newViewState[_newViewState.length - 1].getChildrenArray();
                var num = childrenArray.length - 1;

                if (_newViewState[_newViewState.length - 1].randomPage && num > 0) {

                    var random = Math.round(Math.random() * num);
                    _s = getChildren(childrenArray[random].url, _newViewState[_newViewState.length - 1].children);
                } else {
                    _s = getChildren(childrenArray[0].url, _newViewState[_newViewState.length - 1].children);
                }
                if (_s) _newViewState.push(_s);
            }
        }
        if(_newViewState.length)  Model.setViewState(_newViewState, $viewId);

    }

    function getChildren($url, $obj) {
        for (var i in $obj) {
            if ($url == $obj[i].url) {
                return $obj[i];
            }
        }
        return null;
    }

    exports.init = init;
    exports.getURL = getURL;
    return exports;

}({}));
