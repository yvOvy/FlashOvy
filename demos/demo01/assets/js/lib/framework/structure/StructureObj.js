/**
 * ...
 * @author m@szypnicki
 */

var StructureObj = (function() {
	
	var undef;

    function StructureObj() {}
	var _p = StructureObj.prototype;
	
	_p.id = 0;
	_p.name = ""; 
	_p.url = ""; 
	_p.className = ""; 
	
	_p.depth = 0 
	_p.parent_id; 
	_p.fullUrl = "";
	_p.children;
	_p.parent;
	_p.autoFirstPage = false;
	_p.randomPage = false;
	_p.hidden = false;
	_p.JSON;
	
	function getChildrensArray(){ 
		var _a = [];
		for(var k in this.children)
		{
			if(this.children[k].constructor == StructureObj)
			{
				_a.push(this.children[k]);
			}
		}
		return _a
		// return Utils.orderArray(childrens); 
	}
	function getAsArray(){
		var _a = [];
		for(var k in this)
		{
			if(this[k].constructor == StructureObj)
			{
				_a.push(this[k]);
			}
		}
		return _a
	};
		
	_p.getChildrensArray = getChildrensArray;
	_p.getAsArray = getAsArray;
	return StructureObj
})();