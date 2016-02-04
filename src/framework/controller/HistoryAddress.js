var HistoryAddress = (function(exports) {

        var  _init = false;
        var  _initChange = false;
        var  _strict = true;
    	  var  _value = '';
    		var  _timer = null;
        var _dispatcher = new EventDispatcher();

        function strictCheck(value, force) {
              if (force) {
                  if (value.substr(0, 1) != '/') value = '/' + value;
              } else {
                  if (value == '') value = '/';
              }
              return value;
          }

          function setValue(value) {
              if (value == 'undefined' || value == null) value = '';
              if (_value == value && _init) return;
              if (!_initChange) return;
              _value = value;
              if (!_init) {
                  _init = true;
                  dispatchEvent(HistoryAddressEvent.INIT);
              }
              dispatchEvent(HistoryAddressEvent.CHANGE);
          }


          function getValue() {
              return strictCheck(_value || '', false);
          }


  		    function getPath() {
              var value:String = getValue();
              if (value.indexOf('?') != -1) {
                  return value.split('?')[0];
              } else {
                  return value;
              }
          }

          function getPathNames() {
              var path:String = getPath();

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
              var value:String = getValue();
              var index:Number = value.indexOf('?');
              if (index != -1 && index < value.length) {
                  return value.substr(index + 1);
              }
              return '';
          }

  		///
  		function setSubPage($str) {
  			var _url:String = getPathNames()[0] + "/" + getPathNames()[1] + "/" + $str + "/";
  			setValue(_url)
  		}

      function setParametersObj($obj) {
  			var _url:String = ""
  			for (var i:int = 0; i < getPathNames().length; i++) {
  				_url += getPathNames()[i];
  				if (i != getPathNames().length-1)_url += "/";
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
  			setValue(_url)
      }


          /**
           * Provides the ue of a specific query parameter.
           * @param param Parameter name.
           */
        function getParameter(param) {
              var value:String = getValue();
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
          function getParameterNames() {
              var value:String = getValue();
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

      exports.PMS = PMS;

      return exports;

  }({}));
