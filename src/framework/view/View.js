var View = Class.extend({

    init: function() {

        this.initDom();
        this.initView();
        this.initEvents();
        this.initController()
    },
    initDom: function() {
      this.elem = Dom.create("div", document.body, [".View", "view"]);
    },

    initView: function() {

    },

    initController:function(){
      AddressController.init();
    },

    initEvents:function(){
        Model.addEventListener(ModelEvent.DEFAULT_VIEW_CHANGED, this.viewChangedHandler.bind(this));
        this.resizeEventID = this.resize.bind(this);
        this.orientationEventID = this.orientationchange.bind(this);
        window.addEventListener("resize", this.resizeEventID);
        window.addEventListener("orientationchange", this.orientationEventID);


        this.resize();
    },

    viewChangedHandler: function() {
        setTimeout(this.resizeEventID, 100);
    },

    orientationchange: function() {
        setTimeout(this.resizeEventID, 100);
    },

    resize: function() {
       //
    },
});
