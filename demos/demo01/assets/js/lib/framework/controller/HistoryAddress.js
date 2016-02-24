var HistoryAddress = (function(exports) {

        var  _strict = true;
        var  _prefix = "vg";
        var  _value = window.location.pathname;
        var  _data = {};
        var  _title = '';
    		var  _timer = null;
        var _dispatcher = new EventDispatcher();
        var _window = window;
        var _history = window.history;
        var _location = window.location;
        var _document = window.document;
        var _supported = !!(window.history && history.pushState);

        _window.addEventListener('popstate',popStateHandler);

        function popStateHandler(e){
          _data = e.state;
          _title = window.title;
          _value = _window.location.pathname;

          dispatchEvent(new HistoryAddressEvent(HistoryAddressEvent.CHANGE));
        }

        function strictCheck(value, force) {
              
              if (force) {
                  if (value.substr(0, 1) != '/') value = '/' + value;
              } else {
                  if (value == '') value = '/';
              }
              return value || '';
          }

          function setValue(value,title,data) {
              title = title || null;
              data = data || null;
              if (value == 'undefined' || value == null) value = '';
              if(value =="/") value = "";
              if (_value == value) return;
              if(_prefix != ""){
                value = value.replace(/^\/|\/$/g, '');
                value =  _prefix + "/" + value;
              }
              value = value.replace(/^\/|\/$/g, '');
              _value = value
              trace("!!! pushState !  "+strictCheck(_value,true))
              _history.pushState(data,title,strictCheck(_value,true));

              dispatchEvent(new HistoryAddressEvent(HistoryAddressEvent.CHANGE));
              trace(_history);
          }


          function getValue() {
              var _path = strictCheck(_value || '', false);
              var names = _path.split('/');
              if(names.length && _prefix == names[0]){
                _path = _path.replace(_prefix + "/", "");
              }
              return _path;
          }


  		    function getPath() {
              var value = getValue();
              if (value.indexOf('?') != -1) {
                  return value.split('?')[0];
              } else {
                  return value;
              }
          }

          function getPathNames() {
              var path = getPath();

              var names = path.split('/');
              if (path.substr(0, 1) == '/' || path.length == 0)
                  names.splice(0, 1);
              if (path.substr(path.length - 1, 1) == '/')
                  names.splice(names.length - 1, 1);
              return names;
          }

          /**
           * Provides the query string part of the deep linking ue.
           */
          function getQueryString() {
              var value = getValue();
              var index = value.indexOf('?');
              if (index != -1 && index < value.length) {
                  return value.substr(index + 1);
              }
              return '';
          }

  		///
  		function setSubPage($str) {
  			var _url = getPathNames()[0] + "/" + getPathNames()[1] + "/" + $str + "/";
  			setValue(_url)
  		}

      function setParametersObj($obj) {
  			var _url = ""
  			for (var i = 0; i < getPathNames().length; i++) {
  				_url += getPathNames()[i];
  				if (i != getPathNames().length-1)_url += "/";
  			}
  			if ($obj != null) {
  				var _ft = false
  				for (var n in $obj) {
  					if (!_ft) {
  						_ft = true
  						_url += "?";
  					}else {
  						_url += "&";
  					}
  					_url += n
  					_url += "=" + $obj[n]
  				}
  			}
  			setValue(_url)
      }


          /**
           * Provides the ue of a specific query parameter.
           * @param param Parameter name.
           */
        function getParameter(param) {
              var value = getValue();
              var index = value.indexOf('?');
              if (index != -1) {
                  value = value.substr(index + 1);
                  var params = value.split('&');
                  var p;
                  var i = params.length;
                  while(i--) {
                      p = params[i].split('=');
                      if (p[0] == param) {
                          return p[1];
                      }
                  }
              }
              return '';
          }

          /**
           * Provides a list of all the query parameter names.
           */
          function getParameterNames() {
              var value = getValue();
              var index = value.indexOf('?');
              var names = [];
              if (index != -1) {
                  value = value.substr(index + 1);
                  if (value != '' && value.indexOf('=') != -1) {
                      var params = value.split('&');
                      var i = 0;
                      while(i < params.length) {
                          names.push(params[i].split('=')[0]);
                          i++;
                      }
                  }
              }
              return names;
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

      exports.dispatchEvent = dispatchEvent;
      exports.addEventListener = addEventListener;
      exports.removeEventListener = removeEventListener;
      exports.getParameterNames = getParameterNames;
      exports.getValue = getValue;
      exports.setValue = setValue;
      exports.getPath = getPath;
      exports.getPathNames = getPathNames;

      return exports;

  }({}));
  var HistoryAddressEvent = function(type) {

      this.toString = function() {
          return '[object ViewAddressEvent]';
      };

      this.type = type;
      this.target = [HistoryAddress][0];
      this.value = HistoryAddress.getValue();
      this.path = HistoryAddress.getPath();
      this.pathNames = HistoryAddress.getPathNames();
      this.parameters = {};

      var _parameterNames = HistoryAddress.getParameterNames();
      for (var i = 0, l = _parameterNames.length; i < l; i++)
          this.parameters[_parameterNames[i]] = HistoryAddress.getParameter(_parameterNames[i]);

      this.parameterNames = _parameterNames;

  }

  HistoryAddressEvent.INIT = 'init';
  HistoryAddressEvent.CHANGE = 'change';
  HistoryAddressEvent.INTERNAL_CHANGE = 'internalChange';
  HistoryAddressEvent.EXTERNAL_CHANGE = 'externalChange';
