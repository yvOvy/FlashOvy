var PixiDisplayList = EventDispatcher.extend({

    init: function($elem,$data) {
        this._elem = $elem;
        this._data = $data;
        this._usehash = true;
        this._hash = "#";
    },

    useHash:function(bool){
        this._usehash = bool;
        if(this._usehash){
          this._hash = "#"
        }else{
          this._hash = "";
        }
    },

    initContent: function() {

        this._sprite = Dom.create("div", this._elem,".pixi")
        this.parseStructure(this._data,this._sprite)
    },

    parseStructure:function(children,parent){
      trace(children.length,"kalosz")
      for (var i in children) {

          this.createLi("",i,parent)
          if(children[i].children){
            var ul = Dom.create("ul", parent);
            this.parseStructure(children[i].children,ul)
          }

      }
    },

    createLi:function(url,name,parent){
      var li = Dom.create("li", parent,{html:name});
    },


    clickHandler:function(e){
      e.preventDefault();
      AddressController.getURL(e.target.getAttribute("href"));
    }

    



});
