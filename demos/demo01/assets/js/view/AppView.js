var AppView = View.extend({

    init: function() {
        this._super();
        this.initMenu();
    },

    initView:function(){
      this.pm2Container = Dom.create("div", this.elem, [".PageManager", "#secondPM"]);
      this.pm2Container.style.zIndex = 50;
      this.pm2 = new PageManager(this.pm2Container,0,true,true,Model.SECOND_VIEW);
      this.pm2.start();

      this._super();
    },

    initMenu:function(){
      this.menu = new StructMenu(this.elem,Model.getStructureData());
      this.menu.useHash(true);
      this.menu.initContent();
    },

    resize: function() {
        trace("resize")

    },
});
