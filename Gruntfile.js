module.exports = function (grunt) {
    "use strict";


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                livereload: true
            },
            MyScss: {
                files: ['sass/*.sass'],
                tasks: ['sass']
            }
        },

        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/style.css': 'sass/style.sass'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', 'watch');
    grunt.registerTask('build', 'sass');
};