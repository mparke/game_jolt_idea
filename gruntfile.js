// http://gruntjs.com/configuring-tasks
module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // clean: {
    //   dev: ['public'],
    //   prod: [
    //     'public/js/**/*.js'
    //   ],
    //   temp: ['temp']
    // },

    copy: {
      vendordev: {
        files: [
          // { dest: 'public/js/vendor/modernizr.js', src: 'client/bower_components/modernizr/modernizr.js' },
          { dest: 'public/js/vendor/jquery-2.0.3.js', src: 'vendor/jquery-2.0.3.js' },
          { dest: 'public/js/vendor/lodash.js', src: 'vendor/lodash.js' },
        ]
      },
      srcdev: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['scripts/**/*.js'],
            dest: 'public/js'
          },
          {
            expand: true,
            flatten: true,
            src: ['styles/**/*.css'],
            dest: 'public/css'
          },
          {
            src: ['sprites/sprite_sheet.png'],
            dest: 'public/images/sprite_sheet.png'
          }
        ]
      }
    },

    watch: {
      scripts: {
        files: ['scripts/**/*.js'],
        tasks: ['copy:srcdev']
      }
    }
  });

  grunt.registerTask('dev', [
    'copy:vendordev',
    'copy:srcdev',
    'watch'
  ]);
  // grunt.registerTask('prod', [
  // ]);
};
