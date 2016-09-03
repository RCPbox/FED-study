var gulp         = require('gulp'),

	/* 컴파일 엔진 -------------------------------- */
	// Node.js 템플릿 엔젠
	// HTML 프리프로세서(컴파일러)
	jade         = require('gulp-jade'),

	// CSS 프리프로세서
	sass         = require('gulp-sass'),
	rubySass     = require('gulp-ruby-sass'),
	compass      = require('gulp-compass'),

	// CSS3 제조사의 접두사 처리 모듈
	autoprefixer = require('gulp-autoprefixer'),

	// 스프라이트 생성 모듈
	spritesmith  = require('gulp.spritesmith'),

	/* 유틸리티 ---------------------------------- */
	gulpif      = require('gulp-if'),
	filter      = require('gulp-filter'),
	sourcemaps  = require('gulp-sourcemaps'),
	shell       = require('gulp-shell'),
	// 미디어 쿼리 병합.
	mq          = require('gulp-combine-mq'),
	merge        = require('merge-stream'),

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
	'sass_engine': process.env.sass || 'ruby', // 'node' or 'ruby' 'compass'
	// 'css_syntax': 'sass', // sass , scss
	// https://github.com/dlmanning/gulp-sass
	'sass': {
		'indentSyntax':true, // true: sass , false: scss
		'outputStyle': 'expanded',// compact, compressed, nested, expanded
	},
	//https://www.npmjs.com/package/gulp-ruby-sass#sass-options
	'ruby_sass': { // 옵션: Git Bash or Terminal ⇒ sass -h
		'defaultEncoding'  : 'UTF-8',    // Windows 환경에서 CP949 오류 발생 시
		'style'            : 'expanded', // compact, compressed, nested, expanded
		'sourcemap'        : true,
		'compass'          : true,
		'require'          : ['bourbon','susy'],// 라이브러리는 많기 때문에 배열로 받는다.
		// 'no-cache'         : true
	},
	// 옵션 https://www.npmjs.com/package/gulp-sourcemaps
	'sass_sourcemaps': {
		'dir': 'maps',
		'options': {
			'includeContent' : false,
			'sourceRoot'     : 'source'
		}
	},
	'compass' : {
		'style'   : 'expanded',
		'css'     : 'dist/css',
		'sass'    : 'src/sass',
		'image'   : 'dist/images',
		'require' : ['bourbon', 'susy']
	},
	// 브라우저 리스트 참고 URL: https://github.com/ai/browserslist#queries
	// 2버전 전 것도 지원
	'autoprefixer': [
		'> 1%',
		'last 2 versions'
	],
	// Browser-sync
	// 옵션: http://www.browsersync.io/docs/options/
	'browserSync': {
		'server'  : ['dist'],
		'port'    : 8800,
		'notify'  : false,
	}
};



/*---------------------------------------------------------------
 * Gulp 업무
 *---------------------------------------------------------------
 */
// 기본 업무
gulp.task('default', 
	['jade', 
	config.sass_engine === 'ruby' ? 
		'sass:ruby' : 
		config.sass_engine === 'compass' ?
			'sass:compass' :
			'sass'
	], function() {
		// browserSync({'server': './dist'})
		browserSync(config.browserSync)
		gulp.start('images');
		gulp.start('watch');
});

// 관찰 업무
gulp.task('watch', function() {
	gulp.watch(['src/**/*.jade'], ['watch:jade']);
	config.sass_engine  === 'ruby' ?
		gulp.watch(['src/sass/**/*'], ['sass:ruby']) : 
		config.sass_engine  === 'compass' ?
			gulp.watch(['src/sass/**/*'], ['sass:compass']) :
			gulp.watch(['src/sass/**/*'], ['sass']);
});

gulp.task('watch:jade', ['jade'], reload);


// 변경 업무: Jade > HTML
gulp.task('jade', function() {
	return gulp.src('src/jade/**/!(_)*.jade')
		.pipe( jade( config.jade ) )
		.on('error', errorLog)
		.pipe( gulp.dest('dist') );
});

// 변경 업무: [node-sass] scss > CSS
gulp.task('sass', function() {
	return gulp.src('src/sass/**/*' )
		.pipe( sourcemaps.init() )
		.pipe( sass( config.sass ).on('error', sass.logError) )
		.pipe( autoprefixer(config.autoprefixer) )
		.pipe( mq() )
		.pipe( sourcemaps.write('./maps') )
		.pipe( gulp.dest('dist/css') )
		.pipe( reload({stream: true}) );
});

// 변경 업무: [ruby-sass] (sass|scss) → CSS
gulp.task('sass:ruby', function() {
	// gulp-ruby-sass 사용 시에는 디렉토리 명만 입력할 것!
	return rubySass('src/sass/', config.ruby_sass)
		.on('error', rubySass.logError)
		.pipe( autoprefixer(config.autoprefixer) )
		.pipe( sourcemaps.write(config.sass_sourcemaps.dir, config.sass_sourcemaps.options) )
		.pipe( gulp.dest('dist/css') )
		.pipe( filter('**/*.css') )
		.pipe( reload({stream: true}) );
});

// compass
gulp.task('sass:compass', function() {
	gulp.src('src/sass/**/*')
		.pipe(compass( config.compass ))
		.on('error', errorLog)
		.pipe( autoprefixer(config.autoprefixer) )
		.pipe( gulp.dest('dist/css') )
		.pipe( filter('**/*.css') )
		.pipe( reload({stream: true}) );
});


// 업무: images 디렉토리 dist 디렉토리 안으로 이동
gulp.task('images', function() {
	return gulp.src('src/images/**/*')
		.pipe( gulp.dest('dist/images') )
});


// 업무: 스프라이트 이미지 생성
gulp.task('sprite', function() {
	var spriteData = gulp.src('src/images/one/*.png')
		.pipe( spritesmith({
			'imgName' : 'sprite.png',
			'cssName' : '_sprite.sass'
		}) );
		// return spriteData.pipe(gulp.dest('dist/'));
		
	var imgStream = spriteData.img.pipe(gulp.dest('dist/images/'));
	var cssStream = spriteData.css.pipe(gulp.dest('src/sass/'));

	return merge(imgStream, cssStream);
});

// ----------------------------------------------------------

// 명령어 환경의 코드를 Gulp에서 수행할 수 있도록 조치
gulp.task('clean', shell.task('rm -rf dist src/output'));

// 필히 Ruby, Sass 설치되어 있어야 사용 가능!
var from   = process.env.from   || 'sass';
var to     = process.env.to     || 'scss';
var input  = process.env.input  || 'src/sass';
var output = process.env.output || 'src/output';
// 외부에서 설정 바꿀수 있게 하기 위해 
gulp.task(
	'convert',
	shell.task('sass-convert -E utf-8 -F '+from+' -T '+to+' -R --indent t '+input + ' ' + output)
);

gulp.task(
	'convert:scss2sass',
	shell.task('sass-convert -E utf-8 -F scss -T sass -R --indent t '+input + ' ' + output)
);
gulp.task(
	'convert:sass2scss',
	shell.task('sass-convert -E utf-8 -F sass -T scss -R --indent t '+input + ' ' + output)
);
gulp.task(
	'convert:css2scss',
	shell.task('sass-convert -E utf-8 -F css -T scss -R --indent t '+input + ' ' + output)
);
gulp.task(
	'convert:css2sass',
	shell.task('sass-convert -E utf-8 -F css -T sass -R --indent t '+input + ' ' + output)
);

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