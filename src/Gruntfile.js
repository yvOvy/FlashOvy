module.exports = function(grunt){
  grunt.initConfig({
    uglify:{
      js:{
        src:[
            'framework/events/CEvent.js',
            'framework/events/EventDispatcher.js',
            'framework/model/ModelEvent.js',
            'framework/view/page/PageEvent.js',
            'framework/view/pageManager/PageManagerEvent.js',
            'framework/Class.js',
            'framework/controller/ViewAddress.js',
            'framework/model/Model.js',
            'framework/view/View.js',
            'framework/view/page/Page.js',
            'framework/view/pageManager/PageManager.js',
            'framework/controller/AddressController.js',
            'framework/controller/HistoryController.js'
         ],
        // dest:'../bin/flashovy.min.js'
        dest:'../demos/demo01/flashovy.min.js'
      }
    }

  })
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('js', ['uglify:js']);
  grunt.registerTask('default', ['uglify:js']);
}