var PixiPageManager = PageManager.extend({

  init: function($elem, $level, $autoFirstPage, $atOnce, $viewId, $data) {
    this._super($elem, $level, $autoFirstPage, $atOnce, $viewId, $data);
  },
  clear: function() {
        // remove from PMS list
        if (this._level) {
            if (this._kill) {
                Model.removePageManager(this, this._level, this._viewId);
                this._elem.parent.removeChild(this._elem);
                this.dispatchEvent(new CEvent(PageEvent.ON_PAGE_MANAGER_CLEAR));
            }
        } else {
            this.dispatchEvent(new CEvent(PageManagerEvent.VIEW_CLEAR_HANDLER));
        }
    },

    toString: function() {
        return "[ PixiPageManager ][_viewId: " + this._viewId + "][_level: " + this._level + "]";
    }

});
