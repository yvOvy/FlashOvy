var PixiRectPage = PixiPage.extend({

	init: function($elem)
	{
		this._super($elem);
	},

	initContent: function() {


		this._graphics = new PIXI.Graphics();

		this._graphics.beginFill( ColorUtils.blendARGBColor(0x50C8EA,0xc3cc0e,this._data.depth/5),0.9);
		this._graphics.drawRect(0,0,300,300);
		this._graphics.endFill();

		this._text = new PIXI.Text(this._data.title,{font : '24px Playfair display SC', fill : 0xffffff, align : 'left'});
		this._text.x = 15;
		this._text.y = 15;

		this._content.addChild(this._graphics);
		this._content.addChild(this._text);

		this._content.x =	this._content.y = this._data.depth*50;

		TweenMax.from(this._container, .5, {x:240, alpha:0, delay:.2});

	},

	individualHide: function() {
		TweenMax.to(this._container, .5, {x:100, alpha:0, onComplete:this._super, onCompleteScope:this, ease:Quad.easeIn});
	},

	destroyPage:function(){
		this._super();
	}

});
