module.exports = function(grunt){
	grunt.initConfig({
		jshint:{
			all: ['js/method.js']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default',['jshint']);
};