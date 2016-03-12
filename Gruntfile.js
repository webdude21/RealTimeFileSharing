'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		project: {
			app: 'public/src',
			build: 'public/compiled',
			serverApp: 'server',
			root: './'
		},
		eslint: {
			app: ['Gruntfile.js', '<%= project.app %>/scripts/**/*.js', '<%= project.serverApp %>/**/*.js']
		},
		concat: {
			js: {
				files: {
					'.tmp/concat/scripts/build.js': ['<%= project.app %>/scripts/**/*.js',
						'<%= project.app %>/vendor/**/*.js'
					],
					'.tmp/concat/scripts/socket.js': ['<%= project.app %>/socket-stream/**/*.js',
						'<%= project.app %>/socket/event-handlers.js', '<%= project.app %>/socket/client-config.js'
					]

				}
			},
			css: {
				files: {
					'.tmp/concat/styles/build.css': ['<%= project.app %>/styles/**/*.css']
				}
			}
		},
		uglify: {
			js: {
				files: {
					'.tmp/min/scripts/build.min.js': '.tmp/concat/scripts/build.js',
					'.tmp/min/scripts/socket.min.js': '.tmp/concat/scripts/socket.js'
				}
			}
		},
		cssmin: {
			css: {
				files: {
					'.tmp/min/styles/build.min.css': '.tmp/concat/styles/build.css'
				}
			}
		},
		copy: {
			img: {
				files: [
					{ expand: true, cwd: '<%= project.app %>', src: ['img/**'], dest: '<%= project.build %>' }
				]
			},
			favicon: {
				files: {
					'<%= project.build %>/favicon.ico': '<%= project.app %>/favicon.ico'
				}
			},
			js: {
				files: {
					'<%= project.build %>/scripts/build.min.js': '.tmp/min/scripts/build.min.js',
					'<%= project.build %>/scripts/socket.min.js': '.tmp/min/scripts/socket.min.js'
				}
			},
			css: {
				files: {
					'<%= project.build %>/styles/build.min.css': '.tmp/min/styles/build.min.css'
				}
			}
		},
		clean: {
			build: {
				src: ['.tmp', '<%= project.build %>']
			}
		},
		jsbeautifier: {
			default: {
				src: ['server/**/*.js', 'public/src/**/*.js']
			},
			options: {
				config: '.jsbeautifyrc'
			}
		},
		less: {
			build: {
				options: {
					strictMath: true,
					compress: false
				},
				files: [{
					expand: true,
					src: ['<%= project.app %>/styles/**/*.less'],
					ext: '.css',
					extDot: 'first'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.registerTask('build', ['jsbeautifier', 'eslint', 'clean', 'less', 'concat', 'uglify', 'cssmin', 'copy']);
};
