var StructureUtils = (function(exports) {
	
	var undef;
	
	function structureTrace($s) {
		// trace($s, null, "color:#43b4b5")
	}
	
	
	function getDepthString($depth) {
		var _str = "[]"
		for (var i = 0; i < $depth; i++) {
			_str += "------[]"
		}
		return _str
	}
	
	///////////////////////////////////////////////////////////////////////////////////////
	//  XML
	///////////////////////////////////////////////////////////////////////////////////////
	function getStructureFromXML($xmlString) {
		if (window.DOMParser)
		{
			parser=new DOMParser();
			xmlDoc=parser.parseFromString($xmlString,"text/xml");
		}
		else // Internet Explorer
		{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML($xmlString);
		} 
		var _structureObj = new StructureObj();
		structureTrace("- S - T - R - U - C - T - U - R - E - - - - - - - - - - - - - - - - - - ");
		var _pagesNode = xmlDoc.getElementsByTagName("pages")[0].childNodes;
		var _uniqueId = 1;
		getPagesXML(getPageNodes(_pagesNode), _structureObj, _uniqueId);
		structureTrace("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ");

		return _structureObj.children;
	}
	
	
	
	function getPageNodes($nodes) {
		var _p = [];
		for (var i = 0; i < $nodes.length; i++) {
			node = $nodes[i];
			if(node.nodeName == "page")
			{
				_p.push(node)
			}
		}
		return _p;
	}
	
	function getPagesXML($node, $structureObj, _uniqueId) {
		var _childrenObj = $structureObj.children || new StructureObj()
		for (var i = 0; i < $node.length; i++) {
			var _nodeChilds = getPageNodes($node[i].childNodes);
			var _attr = $node[i].attributes;
			var _url = _attr["url"].value;
			++_uniqueId
			_childrenObj[_url] = new StructureObj();
			for(var n = 0; n < _attr.length; n++) {
				_childrenObj[_url][_attr[n].name] = _attr[n].value;
			}
			_childrenObj[_url].parentId = $structureObj.id
			_childrenObj[_url].id = _uniqueId
			_childrenObj[_url].fullUrl = ($structureObj.fullUrl || "") + "/" + _childrenObj[_url].url;
			_childrenObj[_url].depth = $structureObj.depth + 1
			_childrenObj[_url].ord = _uniqueId
			_childrenObj[_url].parent = $structureObj
			
			var _childNodes = $node[i].childNodes;
			for (var t = 0; t < _childNodes.length; t++) {
				___node = _childNodes[t];
				if(___node.nodeName == "page")
				{
					getPagesXML(getPageNodes(___node.childNodes), _childrenObj[_url], _uniqueId);
				}else if(___node.nodeName != "#text"){
					// _childrenObj[_url][___node.nodeName] = ___node;
					// trace(___node.childNodes)
					
					_childrenObj[_url][___node.nodeName] = ___node.firstChild.nodeValue
					/*
					for (var p = 0; p < ___node.childNodes.length; p++) {
						trace(___node.nodeName + " :: "+___node.childNodes[p].nodeValue)
						_childrenObj[_url][___node.nodeName][p] = ___node.childNodes[p].nodeValue
						// _childrenObj[_url][___node.nodeName][p] = ___node.childNodes[p].value
						// trace(___node.childNodes[p].nodeValue)
						// trace("$$$ "+p+" ::: "+___node.childNodes[p].value)
					}
					*/
					// _childrenObj[_url][___node.nodeName] = ___node.value;
				}
				
			}
			structureTrace(getDepthString($structureObj.depth + 1) + "["+_url+" | className:"+_childrenObj[_url].className+"] ");
		}
		$structureObj.children = _childrenObj
	}
	
	
	
	
	
	
	///////////////////////////////////////////////////////////////////////////////////////
	//  JSON
	///////////////////////////////////////////////////////////////////////////////////////
	
	function getStructureFromJSON($json) {
		var _structureObj = new StructureObj();
		structureTrace("- S - T - R - U - C - T - U - R - E - - - - - - - - - - - - - - - - - - ");
		getPagesJSON($json.page, _structureObj);
		structureTrace("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ");
		return _structureObj.children;
	}
	
	function getPagesJSON($jsonObj, $structureObj) {
		var _childrenObj = $structureObj.children || new StructureObj()
		
		structureTrace(_childrenObj.url+ " URL");
		
		for (var i = 0; i < $jsonObj.children.length; i++) {

			var url = "";
			var className = "";
			var autoFirstPage = false;

			if($jsonObj.children[i].custom_fields){
				url = $jsonObj.children[i].custom_fields.url
				className = $jsonObj.children[i].custom_fields.className
				autoFirstPage = Utils.stringToBoolean($jsonObj.children[i].custom_fields.autoFirstPage)
			}
			_childrenObj[url] = new StructureObj()
			for (var e in $jsonObj.children[i]) {

				switch(e) {
					case "parent":
					case "children":
						break;
					default:
						_childrenObj[url][e] = $jsonObj.children[i][e]
				}
			}
			
			structureTrace(url + " - URL");
			
			_childrenObj[url].className = className
			_childrenObj[url].url = url
			_childrenObj[url].autoFirstPage = autoFirstPage
			_childrenObj[url].parentId = $structureObj.id
			_childrenObj[url].fullUrl = ($structureObj.fullUrl || "") + "/" + _childrenObj[url].url;
			_childrenObj[url].depth = $structureObj.depth + 1
			_childrenObj[url].ord = i
			_childrenObj[url].parent = $structureObj
			_childrenObj[url].JSON = "vvv";//$jsonObj;

			//dodatkowe elementy, nie <page>
			if ($jsonObj.children[i].children.length) {
				getPagesJSON($jsonObj.children[i], _childrenObj[url])
			}
		}
		$structureObj.children = _childrenObj
	}

	///////////////////////////////////////////////////////////////////////////////////////  exports
	exports.getStructureFromXML = getStructureFromXML;
	exports.getStructureFromJSON = getStructureFromJSON;
	return exports;

}({}));