/**
 * ...
 * @author Bartłomiej JERZY
 */

var Utils = (function(exports) {
	
	var undef;

	var SCROLLBAR_WIDTH = 0;

	function getWindowWidth() {
		if(Utils.isScrollbar()){
			return document.documentElement.clientWidth - Utils.SCROLLBAR_WIDTH;
		}else{
			return document.documentElement.clientWidth;
		}
        // return document.documentElement.clientWidth - Utils.SCROLLBAR_WIDTH;
    }

    function getWindowHeight() {
        return window.innerHeight;
    }

    function isScrollbar() {
    	return AppModel.scrolledView.offsetWidth != document.getElementById("mainPM").offsetWidth;
    }

    function getScrollbarWidth() {
        var d = document.createElement("div");
        d.style.width = "100%";
        d.style.height = "100%";
        d.style.overflow = "scroll";
        d.style.position = "-9999px";
        d.style.top = "absolute";
        d.className = "scrollbar-measure";
        document.body.appendChild(d);
        var c = d.offsetWidth - d.clientWidth;
        document.body.removeChild(d);
        return c;
    }

	function getDepthString($depth) {
		var _str = "[]";
		for (var i = 0; i < $depth; i++) {
			_str += "------[]";
		}
		return _str;
	}

	function toArray(iterable) {
		 var ret = [];
		 for (var i in iterable){
			 ret.push(iterable[i]);
		 }
		 return ret;
	}
	
	function extend(d, c) {
		var a = d.apply(d, c);
		a._super = a._super || {};
		a.override = function(a, c) {
			void 0 !== this[a] && (this._super[a] = this[a]);
			this[a] = c;
		};
		return a;
	};
	
	
	function orderArray($obj, $prop) {
		var _array = [];
		for (var i in $obj) {
			_array.push($obj[i]);
		}
		_array.sort(function(a,b) { return a[$prop] - b[$prop] });
		return _array;
	}
	
	function stringToBoolean($str) {
		switch($str) {
			case "1":
			case "true":
			case "yes":
				return true;
			case "0":
			case "false":
			case "no":
			case "undefined":
				return false;
			default:
				return typeof($str) != undefined;
				
		};
	}

	function removeWidows($str) {
		return $str.replace(/(\s)([\S])[\s]+/g,"$1$2&nbsp;")
		//tekst = tekst.replace(/(\s)([^<][\S]{1})[\s]+/g,"$1$2&nbsp;"); //dwuznakowe
		//tekst = tekst.replace(/(\s)([^<][\S]{2})[\s]+/g,"$1$2&nbsp;"); //trzyznakowe
	}


	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	//

	function createCookie(name,value,days) {
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime()+(days*24*60*60*1000));
	        var expires = "; expires="+date.toGMTString();
	    }
	    else var expires = "";
	    document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	}



	function eraseCookie(name) {
	    createCookie(name,"",-1);
	}
	
	function addEmbedEvent($target, $type, $listener, $scope) {
		var _id = $listener.bind($scope);
		$target.addEventListener($type, _id);
		return _id;
	}
	
	function removeEmbedEvent($target,$type,$id) {
		$target.removeEventListener($type, $id);
	}

	exports.extend = extend;
	exports.stringToBoolean = stringToBoolean;
	exports.addEmbedEvent = addEmbedEvent;
	exports.removeEmbedEvent = removeEmbedEvent;
	exports.removeWidows = removeWidows;
	exports.getParameterByName = getParameterByName;
	exports.eraseCookie = eraseCookie;
	exports.readCookie = readCookie;
	exports.createCookie = createCookie;
	exports.getScrollbarWidth = getScrollbarWidth;
	exports.isScrollbar = isScrollbar;
	exports.getWindowHeight = getWindowHeight;
	exports.getWindowWidth = getWindowWidth;
	exports.SCROLLBAR_WIDTH = SCROLLBAR_WIDTH;
	
	return exports;
	
}({}));