module.exports = function(grunt){
  grunt.initConfig({
    uglify:{
      js:{
        src:[
            'framework/Class.js',
            'framework/utils/Utils.js',
            'framework/utils/Trace.js',
            'framework/utils/assets/AssetManager.js',
            'framework/utils/assets/BrowserDetect.js',
            'framework/events/CEvent.js',
            'framework/events/EventDispatcher.js',
            'framework/events/ModelEvent.js',
            'framework/events/PageEvent.js',
            'framework/events/PageManagerEvent.js',
            'framework/controller/ViewAddress.js',
            'framework/model/Model.js',
            'framework/view/View.js',
            'framework/view/page/Page.js',
            'framework/view/pageManager/PageManager.js',
            'framework/controller/HistoryAddress.js',
            'framework/controller/AddressController.js',
            'framework/structure/StructureLoader.js',
            'framework/structure/StructureObj.js',
            'framework/structure/StructureUtils.js', 
         ],
        dest:'../bin/flashovy.min.js'
      }
    }

  })
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('js', ['uglify:js']);
  grunt.registerTask('default', ['uglify:js']);
}

