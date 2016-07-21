
// Node.js의 내장 모듈 File System 가져오기.
var fs = require('fs');

// 08_fs_writed_content.txt 에 사용할 데이터.
var write_data = 'Mujer uno dolor más de, poder mismo si. Belleza voluminoso pillo, amanecer ejercicio patrón justo autoinmune recusado perspicacia pan pan.';

// 09_fs_writed_content.html 에 사용할 데이터
var html_title = 'Node.js - 파일 시스템으로 작성한 HTML 문서';
var fs_h1_content = 'fs.writeFile(fileName, data[, option], callback);';

var write_html_data = [
	'<!DOCTYPE html>',
	'<html lang="ko-KR">',
		'<head>',
			'<meta http-equiv="X-UA-Compatible" content="IE=Edge" />',
			'<meta charset="UTF-8" />',
			'<title>'+ html_title +'</title>',
		'</head>',
		'<body>',
			'<h1>'+ fs_h1_content +'</h1>',
		'</body>',
	'</html>'].join('');

console.log('======================================\n', '시작: 파일 쓰기!!!');

// 비동기(Asynchronous) 작성
// fs.writeFile(filename, data[, options], callback)
fs.writeFile(
	'./08_fs_writed_content.txt', //파일이 저장될 위치와 파일명.
	write_data, 
	{ 'encoding': 'utf-8' }, 
	function(error) {
		if (error) { throw console.error(error.message); }
		console.log('08_fs_writed_content.txt 파일 생성 완료');
	}
);

fs.writeFile(
	'./09_fs_writed_content.html',
	write_html_data, 
	{ 'encoding': 'utf-8' }, 
	function(error) {
		if (error) { throw console.error(error.message); }
		console.log('09_fs_writed_content.html 파일 생성 완료');
	}
);

// 동기(Synchronous) 작성
// fs.writeFileSync(filename, data[, options])
fs.writeFileSync('./10_style.css', 'body { margin: 0; }', { 'encoding': 'utf-8' });

console.log('======================================\n', '끝: 파일 쓰기!!!');

// 이런걸 사용하면 gulp 나 그런트를 사용해서 자동으로 파일을 생성 할 수 있도록 만들어 줄 수 있다. 클라인언트 에서는 못하지만 서버 사이드는 nodeJS 라서 가능.