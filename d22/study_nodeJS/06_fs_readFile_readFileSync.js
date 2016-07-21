/**
 * --------------------------------
 * Node.js의 내장 모듈
 * File System 모듈 사용
 * --------------------------------
 */

var fs = require('fs');

console.log('============================\n', '시작: 파일 읽기!!!');

// 비동기(Asynchronous) 호출
// fs.readFile(filename[, options], callback)
fs.readFile(

	// 읽고자 하는 파일이름 (String)
	'./01_dirname_filename.js',

	// 옵션 (Object)
	{'encoding': 'utf-8'},// 파일 내용 보여줌.
	// <Buffer 2f 2a 0a 09 4e 6f ... 옵션설정 안하면 이렇게 보임.

	// 콜백 (Function)
	function(err, data) {
		if ( err ) { throw err.message; }
		console.log('=========\n', '비동기 호출:\n', data);
	}											// 데이터 출력.

);

// 동기(Synchronous) 호출
// fs.readFileSync(filename[, options])
var readed = fs.readFileSync('03_checkType_test.js', 'utf-8');
console.log('동기 호출:\n', '=========\n', readed);

console.log('============================\n', '끝: 파일 읽기!!!');

// ============================
//  시작 : 파일 읽기!!
// =========
//  동기호출 :
//  <Buffer 2f 2a 0a 09 4e 6f 64 65 2e 6a 73 .. >
// ============================
//  끝 : 파일 읽기!!
// =========
//  비동기 호출:
//  <Buffer 2f 2a 0a 09 4e 6f 64 65 2e 6a 73 .. >

//동기 방식은 순서대로 실행중 처리 완료가 되어야 다음 코드가 실행되는것.
//비동기는 순서대로 실행중 처리 완료가 안되어도 다음 코드 실행 되는것.