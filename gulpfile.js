var gulp 		 = require('gulp'),
	postcss 	 = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssvars 	 = require('postcss-simple-vars'),
	nested 		 = require('postcss-nested'),
	cssImport 	 = require('postcss-import'),
	watch 		 = require('gulp-watch'),
	mixins 		 = require('postcss-mixins');

gulp.task('styles', function() {
  return gulp.src('./src/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./src'));
});

gulp.task('watch', function() {
	watch('./src/styles/*.css', function() {
   		gulp.start('styles');
	});
});