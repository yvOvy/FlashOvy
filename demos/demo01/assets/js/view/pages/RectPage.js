var RectPage = Page.extend({

	init: function($elem) 
	{
		this._super($elem);
		trace("RectPage !!!");
	},

	initContent: function() {
		this.rect = Dom.create("div", this._elem, ".FlashOvyRect");
		trace(this._data)
		trace(this._data.custom_fields)
		this.h = Dom.create("h1", this.rect, null, {html:this._data.title});
		TweenMax.from(this.rect, .5, {x:240, alpha:0, delay:.2});
		trace("RectPage !!!  initContent");
	},

	individualHide: function() {
		TweenMax.to(this.rect, .5, {x:100, alpha:0, onComplete:this._super, onCompleteScope:this, ease:Quad.easeIn});
	}

});