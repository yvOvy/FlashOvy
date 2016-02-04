var ViewAddress = new function() {

    this.getValue = function() {
        return _value;
    };

    this.getViewID = function() {
        return _viewID;
    };

    this.getPath = function() {
        var value = this.getValue();
        if (value.indexOf('?') != -1) {
            return value.split('?')[0];
        } else if (value.indexOf('#') != -1) {
            return value.split('#')[0];
        } else {
            return value;
        }
    };

    this.getPathNames = function() {
        var path = this.getPath(),
            names = path.split('/');
        if (path.substr(0, 1) == '/' || path.length == 0)
            names.splice(0, 1);
        if (path.substr(path.length - 1, 1) == '/')
            names.splice(names.length - 1, 1);
        return names;
    };

    this.getParameter = function(param) {
        var value = this.getValue();
        var index = value.indexOf('?');
        if (index != -1) {
            value = value.substr(index + 1);
            var p, params = value.split('&'),
                i = params.length,
                r = [];
            while (i--) {
                p = params[i].split('=');
                if (p[0] == param)
                    r.push(p[1]);
            }
            if (r.length != 0)
                return r.length != 1 ? r : r[0];
        }
    };

    this.getParameterNames = function() {
        var value = this.getValue();
        var index = value.indexOf('?');
        var names = [];
        if (index != -1) {
            value = value.substr(index + 1);
            if (value != '' && value.indexOf('=') != -1) {
                var params = value.split('&'),
                    i = 0;
                while (i < params.length) {
                    names.push(params[i].split('=')[0]);
                    i++;
                }
            }
        }
        return names;
    };

    this.setValue = function(value) {
        _viewID = value.split('#')[0];
        value = value.split('#')[1];
        // trace(ID + " - - - - - ["+_viewID+"] " + " setValue("+value+")  from: "+_value);
        if (typeof value == UNDEFINED) value = "";
        if (value == 'null') value = "";
        if (value == '/') value = "";
        if (_value == value) return;
        _justset = TRUE;
        _value = value;


        _jsDispatch.call(this, 'change');
    };

    var _jsDispatch = function(type) {
        this.dispatchEvent(new ViewAddressEvent(type));
        type = type.substr(0, 1).toUpperCase() + type.substr(1);
        if (typeof this['on' + type] == FUNCTION)
            this['on' + type]();
    };

    function removeEventListener($type, $listener, $scope) {
        _dispatcher.removeEventListener($type, $listener, $scope);
    }

    function addEventListener($type, $listener, $scope) {
        _dispatcher.addEventListener($type, $listener, $scope);
    }

    function dispatchEvent($event) {
        _dispatcher.dispatchEvent($event);

    }

    var ID = 'viewaddress',
        FUNCTION = 'function',
        UNDEFINED = 'undefined',
        _listeners = {},
        TRUE = true,
        FALSE = false,
        _justset = TRUE,
        _viewID = "viewaddress",
        _values = [];
    _value = "";
}

var ViewAddressEvent = function(type) {

    this.toString = function() {
        return '[object ViewAddressEvent]';
    };

    this.type = type;
    this.target = [ViewAddress][0];
    this.value = ViewAddress.getValue();
    this.path = ViewAddress.getPath();
    this.pathNames = ViewAddress.getPathNames();
    this.parameters = {};

    var _parameterNames = ViewAddress.getParameterNames();
    for (var i = 0, l = _parameterNames.length; i < l; i++)
        this.parameters[_parameterNames[i]] = ViewAddress.getParameter(_parameterNames[i]);

    this.parameterNames = _parameterNames;

}

ViewAddressEvent.INIT = 'init';
ViewAddressEvent.CHANGE = 'change';
ViewAddressEvent.INTERNAL_CHANGE = 'internalChange';
ViewAddressEvent.EXTERNAL_CHANGE = 'externalChange';
