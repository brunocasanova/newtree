module.exports = function( grunt ){

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON( "package.json" ),

		less: {
			dev: {
				files: {
					"lib/assets/css/source.css" : "lib/assets/less/source.less"
				}
			},
			production: {
				options: {
					compress: true
				},
				files: {
					"lib/assets/css/source.css" : "lib/assets/less/source.less"
				}
			},
		}

	});

	// Load the plugin that provides the  task.
	grunt.loadNpmTasks( "grunt-contrib-less" );

	// Default task(s).
	grunt.registerTask( "default", [ "less" ]);

};