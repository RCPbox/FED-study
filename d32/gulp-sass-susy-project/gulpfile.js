/**
 * gulp 로드 플러그인 환경 설정
 * --------------------------------
 */

var config = {
	'gulpLP':
	{
		// https://www.npmjs.com/package/gulp-load-plugins#options
		
		// 해당 패턴의 플러그인만 호출
		pattern: ['gulp-*', 'gulp.*'],

		// 설정된 package.json에 등록된 플러그인만 호출. 파일이 어딨는지 알려준다.
		// config: './package.json',

		// 의존 모듈 영역
		scope: [
			'dependencies',
			'devDependencies'
		],

		// 플러그인 이름에서 제거할 텍스트 설정.
		replaceString: /^gulp(-|\.)/,

		// '-' 가 설정된 플러그인의 이름을 카멜케이스 화. ex) ruby-sass >> rubySass
		camelize: true,

		// 레이지 로딩
		lazy: true,

		// 플러그인 이름 포워딩
		rename: {
			'gulp-autoprefixer' : 'prefixer',
			'gulp-sourcemaps'   : 'maps',
		}
	},

	'html':
	{
		'src': 'source/**/*.html',
		'dest': 'dist/'
	},

	'sass':
	{
		'src' : 'source/sass/**/*.scss',
		'dest': 'dist/css',
		// 참고 URL: https://github.com/sass/node-sass#options
		'options':
		{
			'outputStyle' : 'expanded',
			'indentType'  : 'tab',
			'indentWidth' : 1,
			'sourceMap'   : true
		},
		// 소스맵 파일 저장 위치
		'maps_location' : './maps',
		// 코드 최적화 설정
		'optimize'    : true,
	},

	'prefixer':
	[
		// 모바일 설정
		'Android 2.3',
		'Android >= 4',
		'iOS >= 7',
		// 데스크톱 설정
		'Chrome >= 43',
		'Firefox >= 4', // Firefox ESR 최신 버전
		'Explorer >= 7',
		'Opera >= 11',
		'Safari >= 5'
	],

	'csso':
	{
		'restructure': false,
		'sourceMap': true,
		'debug': true
	},
	
	'optimizeCss':
	{
		// 'max-line-len'  : 500,
		// 'expand-vars'   : !true,
		// 'ugly-comments' : !true,
		// 'cute-comments' : true,
	}
};

/**
 * gulp 플러그인 호출
 * --------------------------------
 */
var gulp = require('gulp'),
	$    = require('gulp-load-plugins')(config.gulpLP);
// gulp-load-plugins 는 node_modules에 있는것을 불러온다.


/**
 * --------------------------------
 * gulp 업무(Tasks)
 * --------------------------------
 */

// gulp.task('default', function() {
// 	console.log(typeof($.autoprefixer));// function  앞에 gulp없이..
// 	console.log(typeof($.csso));// function 
// });
gulp.task('default', ['html:move', 'sass', 'watch']);

/**
 * 관찰 업무
 * --------------------------------
 */
gulp.task('watch', function() {
	gulp.watch([config.html.src], ['html:move']);
	gulp.watch([config.sass.src], ['sass']);
	// config.sass.src 파일 바뀌면 sass 업무를 자동수행.
});

/**
 * html:move 업무
 * --------------------------------
 */
gulp.task('html:move', function() {
	return gulp.src(config.html.src)
		.pipe( gulp.dest(config.html.dest) );
});

/**
 * sass 업무
 * --------------------------------
 */
gulp.task('sass', function() {
	return gulp.src(config.sass.src)
				// 소스맵 초기화
				.pipe( $.maps.init() )
				// $.sass 가 플러그인 불러옴.
				// Sass 컴파일 처리(오류 발생 시에도 계속 watch)
				.pipe( $.sass( config.sass.options ).on('error', $.sass.logError) )
				.pipe( $.prefixer( config.prefixer ) )
				// // CSS 정렬
				// // 옵션 참고 URL: https://github.com/csscomb/csscomb.js/blob/master/doc/options.md
				.pipe( $.csscomb() )
				// // 소스맵 작성.
				.pipe( $.maps.write( config.sass.maps_location ) )
				// // 목적지로 출력
				.pipe( gulp.dest( config.sass.dest ) )
				// CSS 최적화
				// .pipe( $.if( config.sass.optimize ,$.csso( /*config.csso*/ ) ) )
				.pipe( $.if( config.sass.optimize , $.uglifycss( config.optimizeCss ) ) )
				// CSS 최적화한 파일 이름 변환
				.pipe( $.if( config.sass.optimize ,$.rename({suffix: ".min"}) ) )
				// 최적화한  파일 출력
				.pipe( $.if( config.sass.optimize ,gulp.dest(config.sass.dest) ) );

});







