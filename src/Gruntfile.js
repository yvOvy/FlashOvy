module.exports = function(grunt){
  grunt.initConfig({
    uglify:{
      js:{
        src:[
            'framework/Class.js',
            'framework/controller/ViewAddress.js',
            'framework/model/ModelEvent.js',
            'framework/model/Model.js',
            'framework/view/View.js',
            'framework/view/page/PageEvent.js',
            'framework/view/page/Page.js',
            'framework/view/pageManager/PageManagerEvent.js',
            'framework/view/pageManager/PageManager.js',
            'framework/controller/AddressController.js',
            'framework/controller/HistoryController.js'
         ],
        dest:'assets/bin/ethos.min.js'
      }
    }

  })
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('js', ['uglify:js']);
  grunt.registerTask('default', ['uglify:js']);
}