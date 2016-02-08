var PixiView = View.extend({

    init: function() {
        this.initDom();
        this.initPixi();
        this.initView();
        this.initMenu();
        this.initEvents();
        this.initController();

        this.renderBind = this.render.bind(this);
        requestAnimationFrame(this.renderBind);
    },

    initPixi:function(){
      // Create a pixi renderer
        this.view = new PIXI.Container();

        this.renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
        this.renderer.autoResize = true;
      	this.renderer.view.className = "rendererView";

      	// add render view to DOM
      	this.elem.appendChild(this.renderer.view);
    },


    initView:function(){

      this.pm = new PixiPageManager(this.view,0,true,true);
      this.pm.start();

    },

    initMenu:function(){
      this.menu = new StructMenu(this.elem,Model.getStructureData());
      this.menu.useHash(false);
      this.menu.initContent();

    },

    initController:function(){
      Model.setHomeURL("home");
      this._super();
    },

    render:function(){
      this.renderer.render(this.view);
      requestAnimationFrame(this.renderBind);
    },

    resize: function() {
        trace("resize")

    },
});
