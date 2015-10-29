'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        name: 'env',
        srcPath: 'src',
        apidocPath: 'api',
        assetsPath: 'assets',
        distPath: 'build',

        clean: ['<%= distPath %>/*', '<%= apidocPath%>/*'],

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['package.json'],
                    dest: '<%= distPath %>'
                }]
            }
        },

        depconcat: {
            options: {
                separator: '\n'
            },

            main: {
                src: ['<%= srcPath %>/<%= name %>.js'],
                dest: '<%= distPath %>/<%= name %>.debug.js'
            }
        },

        uglify: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= distPath %>',
                    src: ['*.debug.js'],
                    dest: '<%= distPath %>',
                    ext: '.js'
                }]
            }
        },


        watch: {
            combo: {
                files: ['package.json'],
                tasks: ['copy:main', 'depcombo']
            },


            js: {
                files: ['<%= srcPath %>/*.js', '<%= srcPath %>/**/*.js'],
                tasks: ['copy', 'depconcat', 'uglify', 'depcombo']
            },

            jsdoc: {
                files: ['<%= srcPath %>/*.js', 'README.md'],
                tasks: ['jsdoc']
            }
        },

        depcombo: {
            debug: {
                options: {
                    useDebug: true,
                    useDaily: true,
                    output: 'url'
                },
                dest: '<%= distPath%>/combo.debug.js'
            },

            main: {
                options: {
                    output: 'file'
                },
                dest: '<%= distPath%>/combo.js'
            }
        },

        cmdwrap: {
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= distPath %>',
                    src: ['env.js'],
                    dest: '<%= distPath %>',
                    ext: '.cmd.js'
                }]
            }
        },

        commonizor: {
            js: {
                files: [{
                    src: ['<%=distPath%>/<%=name%>.js'],
                    dest: '<%=distPath%>',
                    ext: '.common.js'
                }]
            }
        }, 

        jsdoc: {
            main : {
                src: ['<%= srcPath %>/*.js', 'README.md'],
                options: {
                    destination: '<%= apidocPath %>',
                    template: 'bower_components/jsdoc'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-depconcat');
    grunt.loadNpmTasks('grunt-depcombo');
    grunt.loadNpmTasks('grunt-cmdwrap');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('@ali/grunt-commonizor');

    grunt.registerTask('dist', ['clean', 'depconcat', 'uglify', 'depcombo', 'cmdwrap', 'commonizor', 'copy', 'jsdoc']);
    grunt.registerTask('dev', ['watch']);

    grunt.registerTask('default', ['dist']);
}