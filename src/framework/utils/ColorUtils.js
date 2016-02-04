var ColorUtils = (function(exports) {


		function blendRGBColor(c1,c2,t)
		{

      var _colorFrom =  /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c1);
      _colorFrom = {r:parseInt(_colorFrom[1], 16),g:parseInt(_colorFrom[2], 16),b:parseInt(_colorFrom[3], 16)}
			var _colorTo =  /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c2);
      _colorTo = {r:parseInt(_colorTo[1], 16),g:parseInt(_colorTo[2], 16),b:parseInt(_colorTo[3], 16)}


			var _randomColor =(_colorFrom.r+(_colorTo.r-_colorFrom.r)*t) << 16 | (_colorFrom.g+(_colorTo.g-_colorFrom.g)*t) << 8 | (_colorFrom.b+(_colorTo.b-_colorFrom.b)*t)
			return "#"+displayInHex(_randomColor);
		}

		function blendARGBColor(c1,c2,t)
		{
  		var _colorFrom =  /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c1);
      _colorFrom = {r:parseInt(_colorFrom[1], 16),g:parseInt(_colorFrom[2], 16),b:parseInt(_colorFrom[3], 16)}
			var _colorTo =  /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c2);
      _colorTo = {r:parseInt(_colorTo[1], 16),g:parseInt(_colorTo[2], 16),b:parseInt(_colorTo[3], 16)}

			var _randomColor =((_colorFrom.r+(_colorTo.r-_colorFrom.r)*t)<<16 | (_colorFrom.g+(_colorTo.g-_colorFrom.g)*t)<<8 | (_colorFrom.b+(_colorTo.b-_colorFrom.b)*t));

      return "#"+displayInHex(_randomColor);
		}

		function displayInHex(c) {

			var r=extractRed(c).toString(16).toUpperCase();
			var g=extractGreen(c).toString(16).toUpperCase();
			var b=extractBlue(c).toString(16).toUpperCase();

			var hs="";
			var zero="0";

			if(r.length==1)	r=zero.concat(r);
			if(g.length==1)	g=zero.concat(g);
			if(b.length==1)	b=zero.concat(b);

			hs=r+g+b;

			return hs;

		}

		function extractRed(c) {
			return (( c >> 16 ) & 0xFF);
		}

		function extractGreen(c) {
			return ( (c >> 8) & 0xFF );
		}

	  function extractBlue(c) {
			return ( c & 0xFF );
		}

    exports.blendRGBColor = blendRGBColor;
    exports.blendARGBColor = blendARGBColor;
    exports.displayInHex = displayInHex;
    exports.extractRed = extractRed;
    exports.extractGreen = extractGreen;
    exports.extractBlue = extractBlue;


    return exports;

}({}));
