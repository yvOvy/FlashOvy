var AppModel = (function(exports) {

    var trackingString = "";
    var live = false;
    var mobile = true;
    var imagesDir = "assets/img/";

    var _dispatcher = new EventDispatcher();

    function setImagesQuality(size) {
        AppModel.imagesDir = "assets/img-md/";
        if (size.width < 1200) {
            //AppModel.imagesDir = "assets/img-sd/" ;
        }
    }

    function track(section) {
        if (AppModel.trackingString != section) {
            AppModel.trackingString = section;
        }
    }

    function removeEventListener($type, $listener, $scope) {
        _dispatcher.removeEventListener($type, $listener, $scope);
    }

    function addEventListener($type, $listener, $scope) {
        _dispatcher.addEventListener($type, $listener, $scope);
    }

    function dispatchEvent($event) {
        _dispatcher.dispatchEvent($event);
    }



    
    exports.removeEventListener = removeEventListener;
    exports.addEventListener = addEventListener;
    exports.dispatchEvent = dispatchEvent;

    exports.imagesDir = imagesDir;
    exports.setImagesQuality = setImagesQuality;
    exports.mobile = mobile;
    exports.live = live;

    exports.track = track;
    exports.trackingString = trackingString;

    return exports;

}({}));