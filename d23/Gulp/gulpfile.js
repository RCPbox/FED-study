// 사용하기 위해 commonjs방식으로 gulp 모듈을 불러온다.
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass');

/** --------------------------------
 * Gulp Command
 * --------------------------------
 * .task()
 * .src()
 * .dest()
 * .watch()
 * .start()
 * --------------------------------*/
/**--------------------------------
 * 환경설정 객체.
 * --------------------------------*/
var config = {
    'jade':{ 'pretty':true },
    'sass': { 'outputStyle': 'compact' }
};

/** --------------------------------
 * Gulp 업무
 * ------------------------------- */
// 기본 업무.
gulp.task('default',['jade','sass','watch']);

// 관찰 업무.
gulp.task('watch', function () {
    gulp.watch(['src/**/*.jade'], ['jade']);
    gulp.watch(['src/sass/**/*.scss'], ['sass']);
});         // 감시 파일 , 실행 명령.

// Jade → HTML.
gulp.task('jade', function () {
    // console.log(this === gulp);// true
    // console.log(process.env.username);//cms
    gulp.src('src/**/*.jade')
        .pipe( jade( config.jade ) )
        .pipe( gulp.dest('dist') );
});

// Sass → Css
gulp.task('sass', function () {
    //gulp.src('src/sass/style.scss')
    gulp.src('src/sass/**/*.scss')
        .pipe( sass( config.sass ).on('error',sass.logError) )
        .pipe( gulp.dest('dist/css') );
});

// **/* 모든 하위 폴더 까지 다 포함해서 