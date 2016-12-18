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

	  //jshint���������Ϣ
	  jshint:{
		  files: [ 'src/js/*.js'],
		  options: {
			  jshintrc: '.jshintrc'
		  }
	  },

	  //watch���������Ϣ
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

	  //concat������Ϣ
	  concat: {
		  options: {
			  //����һ�����ڲ���ϲ�����ļ�֮����ַ�
			  separator: ';'
		  },
		  //js�ļ��ϲ�
		  dist: {
			  //��Ҫ���ϲ����ļ�
			  src: ['src/js/*.js'],
			  //�ϲ����JS�ļ��Ĵ��λ��
			  dest: 'dist/js/<%=pkg.name%>-<%=pkg.version%>.concat.js'
		  },

		  //css�ļ��ϲ�
		  css: {
			  //��Ҫ�ϲ���css�ļ�
			  src: ['src/css/*.css'],
			  dest: 'dist/css/<%=pkg.name%>-<%=pkg.version%>.concat.css'
		  }

	  },

	  //���ϲ����js�ļ�����ѹ��
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
	  //����ط�����
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

      //ѹ��css�ļ�
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