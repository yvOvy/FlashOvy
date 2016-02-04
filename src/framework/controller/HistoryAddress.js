var HistoryAddress = new function() {

        _init = false;
        _initChange = false;
        _strict = true;
  	    _value = '';
  		  _timer = null;

        var _jsDispatch = function(type) {
            this.dispatchEvent(new ViewAddressEvent(type));
            type = type.substr(0, 1).toUpperCase() + type.substr(1);
            if (typeof this['on' + type] == FUNCTION)
                this['on' + type]();
        };

        this.addEventListener = function(type, listener) {
            if (typeof _listeners[type] == UNDEFINED)
                _listeners[type] = [];
            _listeners[type].push(listener);
        };

        this.dispatchEvent = function(event) {
            if (this.hasEventListener(event.type)) {
                event.target = this;
                for (var i = 0, l; l = _listeners[event.type][i]; i++)
                    l(event);
                return TRUE;
            }
            return FALSE;
        };

        this.hasEventListener = function(type) {
            return (typeof _listeners[type] != UNDEFINED && _listeners[type].length > 0);
        };

        function _strictCheck(value, force) {
              if (SWFAddress.getStrict()) {
                  if (force) {
                      if (value.substr(0, 1) != '/') value = '/' + value;
                  } else {
                      if (value == '') value = '/';
                  }
              }
              return value;
          }

          function _getValue() {
              var value, ids = null;
              if (_availability) {
                  value = ExternalInterface.call('SWFAddress.getValue') as String;
                  var arr:Array = ExternalInterface.call('SWFAddress.getIds') as Array;
                  if (arr != null)
                      ids = arr.toString();
              }
              if (ids == null || !_availability) {
                  value = SWFAddress._value;
              } else {
                  if (value == 'undefined' || value == null) value = '';
              }
              return _strictCheck(value || '', false);
          }

          function _setValueInit(value) {
              SWFAddress._value = value;
              if (!_init) {
                  _dispatchEvent(SWFAddressEvent.INIT);
              } else {
                  _dispatchEvent(SWFAddressEvent.CHANGE);
              }
              _initChange = true;
          }

          function _setValue(value) {
              if (value == 'undefined' || value == null) value = '';
              if (SWFAddress._value == value && SWFAddress._init) return;
              if (!SWFAddress._initChange) return;
              SWFAddress._value = value;
              if (!_init) {
                  SWFAddress._init = true;
                  if (typeof SWFAddress['onInit'] == 'function' || _dispatcher.hasEventListener('init')) {
                      _dispatchEvent(SWFAddressEvent.INIT);
                  }
              }
              _dispatchEvent(SWFAddressEvent.CHANGE);
          }


          function getValue() {
              return _strictCheck(_value || '', false);
          }

          function setValue(value,fromHistory):void {
              if (value == 'undefined' || value == null) value = '';
              value = _strictCheck(value, true);


  		    function getPath() {
              var value:String = SWFAddress.getue();
              if (value.indexOf('?') != -1) {
                  return value.split('?')[0];
              } else {
                  return value;
              }
          }

          function getPathNames() {
              var path:String = SWFAddress.getPath();

              var names:Array = path.split('/');
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
              var value:String = SWFAddress.getue();
              var index:Number = value.indexOf('?');
              if (index != -1 && index < value.length) {
                  return value.substr(index + 1);
              }
              return '';
          }

  		///
  		function setSubPage($str) {
  			var _url:String = getPathNames()[0] + "/" + getPathNames()[1] + "/" + $str + "/";
  			SWFAddress.setValue(_url)
  		}

      function setParametersObj($obj) {
  			var _url:String = ""
  			for (var i:int = 0; i < SWFAddress.getPathNames().length; i++) {
  				_url += SWFAddress.getPathNames()[i];
  				if (i != SWFAddress.getPathNames().length-1)_url += "/";
  			}
  			if ($obj != null) {
  				var _ft:Boolean = false
  				for (var n:String in $obj) {
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
  			SWFAddress.setValue(_url)
          }


          /**
           * Provides the ue of a specific query parameter.
           * @param param Parameter name.
           */
          public static function getParameter(param:String):String {
              var value:String = SWFAddress.getValue();
              var index:Number = value.indexOf('?');
              if (index != -1) {
                  value = value.substr(index + 1);
                  var params:Array = value.split('&');
                  var p:Array;
                  var i:Number = params.length;
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
          function getParameterNames():Array {
              var value:String = SWFAddress.getValue();
              var index:Number = value.indexOf('?');
              var names:Array = new Array();
              if (index != -1) {
                  value = value.substr(index + 1);
                  if (value != '' && value.indexOf('=') != -1) {
                      var params:Array = value.split('&');
                      var i:Number = 0;
                      while(i < params.length) {
                          names.push(params[i].split('=')[0]);
                          i++;
                      }
                  }
              }
              return names;
          }
      }
  }
