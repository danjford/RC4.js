'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('stripComments', 'Strip comments from everywhere', function(){

    /**
     * Available options are - block, inline & all
     */
    var options = this.options({
        'type': 'block'
      }),
      blockComments = new RegExp(/(\/\*[\-\!\$\%\^\&\*\(\)\_\+\|\~\=\`\{\}\[\]\:\"\;\'\<\>\?\,\.\sa-z\@]*\/)/gi),
      inlineComments = new RegExp(/\/\/[^\n]*/gi);

    this.files.forEach(function(config){

      var file = grunt.file.read(config.src);

      if(options.type === 'all'){
        file = file.replace(blockComments, '')
          .replace(inlineComments, '');
      } else if (options.type === 'inline'){
        file = file.replace(inlineComments, '');
      } else {
        file = file.replace(blockComments, '');
      }

      grunt.file.write(config.dest, file);

    });


  });

  grunt.registerMultiTask('writeVersion', 'Write to specified file', function(){

    this.files.forEach(function(config){
      grunt.file.write(config.dest, 'var '+ config.variable + ' = ' + config.srcFile);
    });

  });

};