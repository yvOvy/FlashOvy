var Preloader360 = EventDispatcher.extend({

    init: function($elem) {
        this._elem = $elem;
    },

    initContent: function() {

        this._sprite = Dom.create("div", this._elem)
        this._sprite.style.height = "2px";
        this._sprite.style.width = "1px";
        this._sprite.style.left = "i50%";
        this._sprite.style.position = "absolute";
        this._sprite.style.top = "50%";
        this._sprite.style.backgroundColor = "#5f5b46";
        this._sprite.style.zIndex = 999;
        this._sprite.style.fontSize = "1px";
        this._sprite.style.paddingLeft = "10px";
        this._sprite.style.paddingTop = "0px";
        this._sprite.style.opacity = .99;
    },

    setRatio: function($ratio) {
        var _o = {
            width: $ratio + "%",
            height: "2px",
            overwrite: "all"
        }
        if ($ratio == 100) {
            _o.opacity = 0;
            _o.onComplete = this.finish.bind(this);
            _o.ease = Quad.easeInOut;
        }
        TweenMax.to(this._sprite, .5, _o);
    },

    finish: function($ratio) {
        this.dispatchEvent(new CEvent("FINISH"));
        this._elem.parentNode.removeChild(this._elem);
    }
});