'use strict';

module.exports = function(grunt) {

  var libInfo = grunt.file.readJSON('package.json');

  var version = require('./lib/version.js');

  grunt.loadTasks('lib');

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: libInfo,

    clean: ['dist'],

    uglify: {
      mainBuild: {
        files: {
          'dist/rc4.min.js': ['dist/rc4.js']
        }
      }
    },

    // Catches the comments that grunt-contrib-concat doesn't
    stripComments: {
      options: {
        'type': 'all'
      },
      main: {
        src: 'dist/rc4.js',
        dest: 'dist/rc4.js'
      }
    },

    writeVersion: {
      versionJSON: {
        srcFile: JSON.stringify(version),
        variable: 'version',
        dest: 'src/version.js'
      }
    },


    eslint: {
      options: {
        configFile: 'conf/eslint.json'
      },
      src: ['src/rc4.js']
    },

    browserify: {
      dist: {
        files: {
          'dist/rc4.js': ['src/rc4.js']
        },
        options: {
          browserifyOptions: {
            standalone: 'RC4'
          },
          transform: [
              ['babelify', {
                presets: ['es2015']
              }]
           ]
        }
      }
    },

    copy: {
      runtime: {
        files: [{
          expand: true,
          cwd: 'node_modules/babel-polyfill/node_modules/babel-regenerator-runtime/',
          src: ['runtime.js'],
          dest: 'src/'
        }]
      }
    },

    mochaTest: {
      test: {
        src: ['test/**/*.js']
      }
    },

    watch: {
      js: {
        files: 'src/**/*.js',
        tasks: ['eslint', 'browserify', 'stripComments']
      }
    }

  });

  // Load all of Grunt's dependencies
  require('matchdep')
    .filterDev('grunt-*')
    .forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['clean', 'writeVersion', 'copy', 'eslint', 'browserify', 'stripComments', 'watch']);

  grunt.registerTask('build', ['clean', 'writeVersion', 'copy', 'eslint', 'browserify', 'stripComments', 'uglify', 'mochaTest']);



};