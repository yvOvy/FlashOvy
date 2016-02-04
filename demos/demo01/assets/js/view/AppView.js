var AppView = View.extend({

    init: function() {
        this.initView();
        this.initMenu();
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
