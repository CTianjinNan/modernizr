'use strict';
module.exports = function(grunt) {
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    modernizr: {
	  dist: {
		  "crawl": false,
		  "customTests": [],
		  "dest": "dist/js_library/modernizr-output.js",
		  "tests": [
			  "applicationcache",
			  "batteryapi"
		  ],
		  "options": [
			  "setClasses"
		  ],
		  "uglify": true
	  }
},

	  //jshint插件配置信息
	  jshint:{
		  files: [ 'src/js/*.js'],
		  options: {
			  jshintrc: '.jshintrc'
		  }
	  },

	  //watch插件配置信息
	  watch: {
		  livereload: {
			  options: {
				  livereload: true
			  },
			  files: [
				  'src/*.html',
				  'src/css/{,*/}*.css',
				  'src/js/{,*/}*.js',
				  'src/less/{,*/}*.less'
			  ],
			  tasks:['jshint', 'less']
		  }
	  },

	  //concat配置信息
	  concat: {
		  options: {
			  //定义一个用于插入合并输出文件之间的字符
			  separator: ';'
		  },
		  //js文件合并
		  dist: {
			  //将要被合并的文件
			  src: ['src/js/*.js'],
			  //合并后的JS文件的存放位置
			  dest: 'dist/js/<%=pkg.name%>-<%=pkg.version%>.concat.js'
		  },

		  //css文件合并
		  css: {
			  //将要合并的css文件
			  src: ['src/css/*.css'],
			  dest: 'dist/css/<%=pkg.name%>-<%=pkg.version%>.concat.css'
		  }

	  },

	  //将合并后的js文件进行压缩
	  uglify: {
		  options: {
			  stripBanners: true,
			  banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
		  },
		  build: {
			  src: 'dist/js/<%=pkg.name%>-<%=pkg.version%>.concat.js',
			  dest: 'dist/js/<%= pkg.name %>-<%=pkg.version%>.min.js'
		  }
	  },
	  //搭建本地服务器
	  connect: {
			options:{
				port:9000,
				hostname:'localhost',
				livereload: 35729
			},

		    server: {
				options: {
					open:true,
					base: ['src/']
				}
			}
	  },

      //压缩css文件
	  cssmin:{
		  css:{
			  src: 'dist/css/<%=pkg.name%>-<%=pkg.version%>.concat.css',
	          dest: 'dist/css/<%= pkg.name %>-<%=pkg.version%>.min.css'
		  }
	  },
	  less: {
		  compile:{
			  files: {
				  'src/less_css/less_css.concat.css': 'src/less/*.less'
			  },
			  dev: {
				  options: {
					  compress: true,
					  yuicompress: false
				  }
			  }
		  }
	  }

  });

	//'modernizr:dist'
	grunt.registerTask('build', [ 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('default', [ 'jshint','less', 'connect:server', 'watch']);
};