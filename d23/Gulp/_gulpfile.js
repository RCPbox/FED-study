var gulp = require('gulp');

/** --------------------------------
 * Gulp Command
 * --------------------------------
 * .task()
 * .src()
 * .dest()
 * .watch()
 * .start()
 * --------------------------------*/

 // Gulp 업무(Task) 등록.	   배열 로도 처리함.
 // gulp.task('업무이름', 업무를 처리할 함수); 
 gulp.task('default', ['eat:food', 'play-game']);

// gulp.task('default', function() {
// 	console.log('Gulp "Default" Task is Start!!!!');
// 	gulp.start('eat:food');
// 	gulp.start('play-game');
// });   //디폴트 실행되면서 다른 업무도 실행.

gulp.task('eat:food', function() {
	console.log('eating FOOD! :-)');
});

gulp.task('play-game', function() {
	console.log('play the Game! :-)');
});