'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('writeVersion', 'Write to specified file', function(){

    this.files.forEach(function(config){
      grunt.file.write(config.dest, 'var '+ config.variable + ' = ' + config.srcFile);
    });

  });

};