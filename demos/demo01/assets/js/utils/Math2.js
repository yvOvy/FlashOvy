
var Math2 = (function(exports) {
	
	var undef;
	
	
	function getCenteredRectangle($r, $size, $type) 
	{
		$type = typeof $type !== 'undefined' ? $type : "min";
		var _offsetPoint = {};
		var _factor = Math[$type] ($size.width / $r.width, $size.height / $r.height);
		_offsetPoint.width = parseInt($r.width * _factor);
		_offsetPoint.height = parseInt($r.height * _factor);
		_offsetPoint.x = parseInt(($size.width - _offsetPoint.width) / 2);
		_offsetPoint.y = parseInt(($size.height - _offsetPoint.height) / 2);
			
		return _offsetPoint;
	}
	
	
	


	function convertGeoToPixel(lat, lon, mapLonLeft, mapLonRight, mapLatBottom, mapWidth, mapHeight)  
	{

		var mapWidth = mapWidth; // replace by your image width (without px).
		var mapHeight = mapHeight; // replace by your image height (without px).
		// var mapLonLeft = 1; // get your latest left point on your map (with a good zoom)
		// var mapLonRight = 1; // get your latest right point on your map (with a good zoom)
		var mapLonDelta = mapLonRight - mapLonLeft;
		// var mapLatBottom = 1; // get your latest bottom point on your map (with a good zoom)
		var mapLatBottomDegree = mapLatBottom * Math.PI / 180;

		x = (lon - mapLonLeft) * (mapWidth / mapLonDelta);
		lat = lat * Math.PI / 180;
		worldMapWidth = ((mapWidth / mapLonDelta) * 360) / (2 * Math.PI);
		mapOffsetY = (worldMapWidth / 2 * Math.log((1 + Math.sin(mapLatBottomDegree)) / (1 - Math.sin(mapLatBottomDegree))));
		y = mapHeight - ((worldMapWidth / 2 * Math.log((1 + Math.sin(lat)) / (1 - Math.sin(lat)))) - mapOffsetY);

		return {x:x, y:y};
	}
	

	function placeDiv(x_pos, y_pos, elem) {
		var d = document.getElementById(elem);
		d.style.position = "absolute";
		d.style.left = x_pos+'px';
		d.style.top = y_pos+'px';
	} 
	

	function randRage(min,max)
	{
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	
	exports.convertGeoToPixel = convertGeoToPixel
	exports.getCenteredRectangle = getCenteredRectangle
	exports.randRage = randRage
	
	return exports
	
}({}));