module.exports = function(grunt){
	grunt.initConfig({
		jshint:{
			all: ['js/method.js']
		},
		jshint:{
			all: ['js/modals.js']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default',['jshint']);
};