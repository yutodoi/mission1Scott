module.exports = function(grunt) {
    'use strict';

    var PROJ_ROOT  = __dirname;
    var PROJ_JS    = PROJ_ROOT + '/src/js';
    var PROJ_SCSS  = PROJ_ROOT + '/src/scss';
    var PROJ_LIBS  = PROJ_ROOT + '/src/bower_components';
    var BUILD_ROOT = PROJ_ROOT + '/build';
    var BUILD_JS   = PROJ_ROOT + '/build/js';
    var BUILD_CSS  = PROJ_ROOT + '/build/css';

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({

        // Define the app's package.json file.
        pkg: pkg,

        // Tasks to run concurrently (speeds up build process).
        concurrent: {
            lint: [
                'lintspaces',
                'jshint',
                'scsslint'
            ],
            build: [
                'copy',
                'uglify:libs',
                'compass',
                'browserify'
            ]
        },

        lintspaces: {
            js: {
                src: [
                    PROJ_JS + '/**/*.js',
                    PROJ_ROOT + '/Gruntfile.js',
                    PROJ_ROOT + '/.jshintrc'
                ],
                options: {
                    editorconfig: '.editorconfig'
                }
            },
            scss: {
                src: [PROJ_SCSS + '/**/*.scss'],
                options: {
                    editorconfig: '.editorconfig'
                }
            },
            html: {
                src: [
                    PROJ_ROOT + '/src/**/*.php',
                    '!' + PROJ_ROOT + '/src/bower_components/**/*.php'
                ],
                options: {
                    editorconfig: '.editorconfig'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                PROJ_JS + '/**/*.js',
                PROJ_ROOT + '/Gruntfile.js',
                PROJ_ROOT + '/.jshintrc'
            ]
        },

        scsslint: {
            options: {
                config: '.scss-lint.yml',
                colorizeOutput: true
            },
            files: [PROJ_SCSS + '/**/*.scss']
        },

        // Delete the /build directory.
        clean: [BUILD_ROOT],

        // Copy everything into /build. The tasks are broken out
        // so we can re-run later through our watch tasks.
        copy: {
            root: {
                expand: true,
                cwd: PROJ_ROOT + '/src',
                src: ['*', '.htaccess'],
                dest: BUILD_ROOT,
                filter: 'isFile'
            },
            php: {
                expand: true,
                cwd: 'src/',
                src: ['*.php', 'inc-twu/**', 'api/**'],
                dest: 'build/',
                filter: 'isFile'
            },
            img: {
                expand: true,
                cwd: 'src/img/',
                src: '**',
                dest: 'build/img',
                filter: 'isFile'
            }
        },

        // Third-party JavaScript libraries are treated the same way.
        // Once they've been munged they can be tossed in build and never
        // looked at again.
        uglify: {
            libs: {
                src: [
                    PROJ_LIBS + '/modernizr/modernizr.js',
                    PROJ_LIBS + '/jquery/dist/jquery.js',
                    PROJ_LIBS + '/foundation/js/foundation.js',
                    PROJ_LIBS + '/handlebars/handlebars.js',
                    PROJ_LIBS + '/devbridge-autocomplete/dist/jquery.autocomplete.js'
                ],
                dest: BUILD_JS + '/twu-libs.min.js'
            }
        },

        // The project's own SCSS files are the ones we really care
        // about. We'll run this task any time a .scss file is saved.
        compass: {
            source: {
                options: {
                    sassDir: PROJ_SCSS,
                    cssDir: BUILD_CSS,
                    outputStyle: 'compressed',
                    noLineComments: true
                }
            }
        },

        // Ditto for the project's own JS files. Here we're using
        // browserify to take advantage of the CommonJS module syntax.
        browserify: {
            source: {
                src: PROJ_JS + '/**/*.js',
                dest: BUILD_JS + '/twu.min.js'
            }
        },

        // Leverage the caniuse db to update our CSS file with
        // only the vendor prefixes we need.
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            build: {
                src: BUILD_CSS + '/twu.css',
                dest: BUILD_CSS + '/twu.css'
            }
        },

        // Watch for changes to src files and run the relevant
        // build commands. Only livereload when /build changes.
        watch: {
            app: {
                files: [
                    PROJ_ROOT + '/src/**/*.php'
                ],
                tasks: ['lintspaces:html', 'copy:php'],
                options: {
                    spawn: false
                }
            },
            images: {
                files: [PROJ_ROOT + '/src/img/**'],
                tasks: ['copy:img']
            },
            scss: {
                files: [PROJ_SCSS + '/**/*.scss'],
                tasks: ['lintspaces:scss', 'scsslint', 'compass', 'autoprefixer']
            },
            js: {
                files: [
                    PROJ_JS + '/**/*.js',
                    PROJ_ROOT + '/Gruntfile.js',
                    PROJ_ROOT + '/.jshintrc'
                ],
                tasks: ['lintspaces:js', 'jshint', 'browserify']
            },
            livereload: {
                options: { livereload: true },
                files: [
                    BUILD_ROOT + '/src/**/*'
                ]
            }
        },

        scp: {
            options: {
                host: '104.236.178.14',
                username: 'jenkins',
                password: '&gD0@cfM7XfQ'
            },
            qa: {
                files: [{
                    cwd: BUILD_ROOT,
                    src: '**/*.*',
                    filter: 'isFile',
                    dest: '/var/www/qa/toolsweuse/'
                }]
            }
        }
    });

    // use plugin to load tasks
    require('load-grunt-tasks')(grunt);

    // define tasks
    grunt.registerTask('default', [
        'lint',
        'clean',
        'build',
        'run'
    ]);

    grunt.registerTask('lint', [
        'concurrent:lint'
    ]);

    grunt.registerTask('build', [
        'concurrent:build', 'autoprefixer'
    ]);

    grunt.registerTask('run', [
        'watch'
    ]);

    grunt.registerTask('deploy', [
        'lint',
        'clean',
        'build',
        'scp'
    ]);
};
