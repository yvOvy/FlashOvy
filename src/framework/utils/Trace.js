function Trace(d, c, $style) {
    if (Trace.isEnabled) {
        var a = d;
        if (null != c) {
            var e = "";
            try {
                e = "Function" == typeof c ? c.name.toString() + "();" : c.toString()
            } catch (k) {
                try {
                    e = c.toString()
                } catch (f) {
                    e = "null"
                }
            }
            a = e + " => " + a
        }
        Trace.displayOnScreen ? (Trace._onScreenDiv || (Trace._onScreenDiv = document.createElement("div"), Trace._onScreenDiv.style.position = "absolute", Trace._onScreenDiv.style.width = "200px", Trace._onScreenDiv.style.height = "300px", Trace._onScreenDiv.style.overflowY = "scroll", Trace._onScreenDiv.style.color = "#00ff00", Trace._onScreenDiv.style.padding =
                "10px", Trace._onScreenDiv.style.zIndex = 2E7, Trace._onScreenDiv.style.left = "20px", Trace._onScreenDiv.style.top = "20px", Trace._onScreenDiv.style.fontFamily = "Courier New", Trace._onScreenDiv.style.fontSize = "10px", Trace._onScreenDiv.style.backgroundColor = "#000000", Trace._fieldLines = []), Trace._fieldLines.push(a), Trace._fieldLines.length > Trace.onScreenMaxLines && Trace._fieldLines.shift(), Trace._onScreenDiv.innerHTML = Trace._fieldLines.join("<br />"), document.body.appendChild(Trace._onScreenDiv)) : !0 === trace._consoleAvailable &&
				(null != $style ? console.log("%c"+a, $style) :  console.log(a));
			
    }
    Trace._traceArray.push(a)
}
Trace.checkConsole = function() {
    var d = !1;
    "undefined" !== typeof console && (d = !0);
    return d
};
var trace = Trace;
Trace.isEnabled = 1;
Trace.displayOnScreen = !1;
Trace.onScreenMaxLines = 50;
Trace._onScreenDiv = null;
Trace._fieldLines = null;
Trace._traceArray = [];
Trace._consoleAvailable = Trace.checkConsole();