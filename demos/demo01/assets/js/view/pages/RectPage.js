var RectPage = Page.extend({

	init: function($elem)
	{
		this._super($elem);
	},

	initContent: function() {

		this._container.style.backgroundColor = ColorUtils.blendRGBColorCss("#50C8EA","#c3cc0e",this._data.depth/5)
		this.h = Dom.create("h1", this._container, null, {html:this._data.title});
		TweenMax.from(this._container, .5, {x:240, alpha:0, delay:.2});
		// trace("RectPage !!!  initContent");
	},

	individualHide: function() {
		TweenMax.to(this._container, .5, {x:100, alpha:0, onComplete:this._super, onCompleteScope:this, ease:Quad.easeIn});
	},

	destroyPage:function(){
		this._super();
	}

});
