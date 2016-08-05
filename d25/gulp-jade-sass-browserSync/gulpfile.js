var gulp        = require('gulp'),

	/* 컴파일 엔진 -------------------------------- */
	// Node.js 템플릿 엔젠
	// HTML 프리프로세서(컴파일러)
	jade        = require('gulp-jade'),

	// CSS 프리프로세서
	sass        = require('gulp-sass'),

	/* 유틸리티 ---------------------------------- */
	gulpif      = require('gulp-if'),
	filter      = require('gulp-filter'),
	sourcemaps  = require('gulp-sourcemaps'),

	/* Browser 서버/싱크 ------------------------- */
	browserSync = require('browser-sync'),
	reload      = browserSync.reload;



/**
 * ----------------------------------------------------------------
 * 환경설정
 * ----------------------------------------------------------------
 */
var config = {
	// Jade
	'jade': {
		'pretty': true
	},
	// Sass
	'css_syntax': 'sass', // sass , scss
	// https://github.com/dlmanning/gulp-sass
	'sass': {
		'indentSyntax':true,
		// compact, compressed, nested, expanded
		'outputStyle': 'expanded'
	},
	// 옵션 https://www.npmjs.com/package/gulp-sourcemaps
	'sass_sourcemaps': {
		'dir': 'maps',
		'options': {
			'includeContent' : false,
			'sourceRoot'     : 'source'
		}
	},
	// Browser-sync
	'browserSync': { // 옵션: http://www.browsersync.io/docs/options/
		'server'  : ['dist'],
		'port'    : 8800,
		'notify'  : false,
	}
};





/**
 * ----------------------------------------------------------------
 * Gulp 업무
 * ----------------------------------------------------------------
 */
// 기본 업무
gulp.task('default', 
	['jade','sass'], 
	function() {
		// browserSync({'server': './dist'})
		browserSync(config.browserSync)
		gulp.start('watch');
});

// 관찰 업무
gulp.task('watch', function() {
	gulp.watch(['src/**/*.jade'], ['watch:jade']);
	config.css_syntax === 'sass' ?
	gulp.watch(['src/sass/**/*.sass'], ['sass']) : // sass
	gulp.watch(['src/sass/**/*.scss'], ['sass']); // scss
});

gulp.task('watch:jade', ['jade'], reload);


// 변경 업무: Jade → HTML
gulp.task('jade', function() {
	return gulp.src('src/jade/**/!(_)*.jade')
		.pipe( jade( config.jade ) )
		.on('error', errorLog)
		.pipe( gulp.dest('dist') );
});

// 변경 업무: [node-sass] scss → CSS
gulp.task('sass', function() {
	return gulp.src('src/sass/**/*.'+ config.css_syntax )
		.pipe(sourcemaps.init())
		.pipe( sass( config.sass ).on('error', sass.logError) )
		.pipe( sourcemaps.write(config.sass_sourcemaps.dir, config.sass_sourcemaps.options))
		.pipe( gulp.dest('dist/css') )
		.pipe( reload({stream: true}) );
});




/**
 * ----------------------------------------------------------------
 * 유틸리티
 * ----------------------------------------------------------------
 */
// 오류 출력을 위한 errorLog 함수
// 오류 발생 시에도 watch 업무 중단하지 않음.
function errorLog(error) {
	console.error(error.message);
	this.emit('end');
} 