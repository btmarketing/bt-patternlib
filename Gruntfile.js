module.exports = function(grunt) {

    // configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Task configuration
        shell: {
            patternlab: {
                command: "php core/builder.php -gp"
            }
        },
        //start a server
        express: {
          all: {
            options: {
              port: 9000,
              bases: "public"
            }
          }
        },
        //open the directory
        open: {
          all: {
            path: 'http://localhost:<%= express.all.options.port%>'
          }
        },
        sass: {
            dist: {
                files: {
                    'public/css/style.css': 'source/scss/style.scss',
                    'public/styleguide/css/styleguide-specific.css': 'core/styleguide/css/styleguide-specific.scss'
                }
            }
        },
        watch: {
            //re-build patternlib when mustache or json files are updated
            html: {
                files: [
                    'source/_patterns/**/*.mustache', 
                    'source/_patterns/**/*.json', 
                    'source/**/*.json'
                ],
                tasks: ['shell:patternlab'],
                options: {
                    spawn: false,
                    livereload:true

                }
            },
            //compile when any SCSS file is updated
            css: {
                files: [
                    'source/scss/bootstrap/*.scss',
                    'source/scss/btstyles/*.scss',
                    'source/scss/style.scss',
                    'core/styleguide/css/styleguide-specific.scss',
                    ],
                tasks: ['sass'],
                options: {
                    spawn: false,
                    livereload:true
                }
            }
        },


    });

    //load plugins
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    grunt.registerTask('default', ['build', 'server', 'watch']);
    grunt.registerTask('build', ['shell:patternlab', 'sass']);
    grunt.registerTask('buildcss',  ['sass']);
    grunt.registerTask('server', ['express','open',]);

};