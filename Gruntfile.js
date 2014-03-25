'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: 'src/js/*.js',
                tasks: ['jshint', 'uglify']
            },
            css: {
                files: 'src/css/*.css',
                tasks: ['copy:prod']
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/pushcartracer.min.js':
                            ['bower_components/phaser/phaser.min.js',
                            'src/js/load-state.js',
                            'src/js/menu-state.js',
                            'src/js/game-state.js',
                            'src/js/init.js']
                }
            }
        },
        jshint: {
            files: ['src/js/*.js'],
            options: {
            // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            },
        },
        imagemin: {
            options: {
                progressive: true,
                optimizationLevel: 3
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: 'dist/img'
                }]
            }
        },
        copy: {
            prod: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    dest: 'dist',
                    src: [
                        'css/*.css'
                    ]
                }]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint', 'uglify']);
    grunt.registerTask('build', ['uglify', 'jshint', 'imagemin', 'copy']);

};