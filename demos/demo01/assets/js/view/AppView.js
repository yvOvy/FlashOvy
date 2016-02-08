var AppView = View.extend({

    init: function() {
        this._super();
        this.initMenu();
    },

    initView:function(){
      this.pmContainer = Dom.create("div", this.elem, [".PageManager", "#mainPM"]);
      this.pmContainer.style.zIndex = 50;
      this.pm = new PageManager(this.pmContainer,0,true,true);
      this.pm.start();

      this.pm2Container = Dom.create("div", this.elem, [".PageManager", "#secondPM"]);
      this.pm2Container.style.zIndex = 50;
      this.pm2 = new PageManager(this.pm2Container,0,true,true,Model.SECOND_VIEW);
      this.pm2.start();

    },

    initMenu:function(){
      this.menu = new StructMenu(this.elem,Model.getStructureData());
      this.menu.useHash(true);
      this.menu.initContent();
    },

    initController:function(){
      Model.setHomeURL("home");
      Model.setHomeURL("home",Model.SECOND_VIEW);
      this._super();
    },

    resize: function() {
        trace("resize")

    },
});
