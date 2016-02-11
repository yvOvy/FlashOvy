var Dom = (function(exports) {
	


	function queryAll( selector, scope ) {
	  if( typeof selector !== "string" )
	    return selector
	  scope = scope || document;
	  return scope.querySelectorAll( selector );
	};

	function query( selector, scope ) {
	  if( typeof selector !== "string" )
	    return selector
	  scope = scope || document;
	  return scope.querySelector( selector );
	}

	function addClass(cls, node ){

	  if (node.classList) {
	    node.classList.add(cls);
	  } else {
	    var cur = ' ' + (node.getAttribute('class') || '') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      node.setAttribute('class', (cur + cls).trim());
	    }
	  }
	};

	function removeClass(cls, node){
	  if (node.classList) {
	    node.classList.remove(cls);
	  } else {
	    var cur = ' ' + (node.getAttribute('class') || '') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    node.setAttribute('class', cur.trim());
	  }
	};

	function hasClass(className, node) {
	  return new RegExp(' ' + className + ' ').test( ' ' + node.className + ' ' );
	};

	//getOrSetAttribute
	function attr(node, attrName, attrValue){
	  if ( typeof attrValue !== "undefined") {
	    node.setAttribute(attrName, attrValue);
	  }
	  return node.getAttribute(attrName);
	};


	function create(type, c, id, attrs) { 
		type = typeof type !== 'undefined' ? type : "div";
		if(type.substr(0, 3) == "svg"){
			trace("svg! "+type.split(":")[0])
			trace(type.split(":")[1]);
			e = document.createElementNS("http://www.w3.org/2000/svg", type.split(":").length > 1 ? type.split(":")[1] : type.split(":")[0]);
		}else{
			e = document.createElement(type);
		}
		
		var _classes = [];
		if(id){
			if(Object.prototype.toString.call(id) !== '[object Array]'){
				id = [id];
			}
			for (var i = id.length - 1; i >= 0; i--) {
				switch(id[i].charAt(0)) {
				    case ".":
				        _classes.push(id[i].substring(1));
				        break;
				    case "#":
				        e.setAttribute("id", id[i].substring(1));
				        break;
				    default:
				       	e.setAttribute("id", id[i]);
				}	
			};
		}

		for (var idx in attrs) {
	        if ((idx === 'styles' || idx === 'style') && typeof attrs[idx] === 'object') {
	            for (var prop in attrs[idx]){e.style[prop] = attrs[idx][prop];}
	        } else if (idx === 'html') {
	            e.innerHTML = attrs[idx];
	        } else {
	        	if(type == "svg"){
	        		 e.setAttributeNS(null, idx, attrs[idx]);
	        	}else{
	        		 e.setAttribute(idx, attrs[idx]);
	        	}
	           
	        }
	    };

		if(_classes.length)e.className = _classes.join(" ");
		if(c)c.appendChild(e);
		return e;
	};

	function removeChildrens($node) { 
		while ($node.firstChild) {
		    $node.removeChild($node.firstChild);
		}
	};

	function loadSVG($url, $loadedHandler, $scope,$num) { 
		var _ajax = new XMLHttpRequest();
		_ajax.open("GET", $url, true);
		_ajax.responseType = "document";
		_ajax.onload = function(e){
			try {
				$loadedHandler.apply($scope, [_ajax.responseXML.documentElement,$num] )
			}
			catch(e){console.log(e);}
		}
		_ajax.send();
		return _ajax;
	};



	exports.create = create;	
	exports.queryAll = queryAll;	
	exports.query = query;	
	exports.addClass = addClass;	
	exports.removeClass = removeClass;	
	exports.hasClass = hasClass;	
	exports.attr = attr;	
	exports.removeChildrens = removeChildrens;	
	exports.loadSVG = loadSVG;	
	return exports;
	
}({}));