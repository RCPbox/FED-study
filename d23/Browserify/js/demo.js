/**
 * --------------------------------
 * CommonJS 방식의 모듈 호출
 * Browserify로 웹에서 사용가능하도록 변경
 * --------------------------------*/
//상대경로가 아닌 절대루트위치(node-modules폴더)안에 있는 
//모듈 호출하기 위해서..
//폴더명으로 호출 하기 위해서는 내용파일명은 index.js
var uniqueID       = require('yamoo9-unique-id'),
	$              = require('jquery'),
		//node_modules 안에 있지 않기 때문에 경로 설정
	showMessageBox = require('./yamoo9/showMessageBox');

// 플러그인 호출  boom.js 호출.
require('jquery-boom/boom');

// 외부에서 접근 가능한 변수 설정.
// 외부로 내보낼때는 global 변수를 사용.
// global.jQuery = global.$ = $;


/**
 * --------------------------------
 * jQuery Code
 * --------------------------------
 */

$('body')
	.css({
		'background' : 'red',
		'color'      : 'snow',
	})
	.attr({
		'class': 'using-jquery',
		'id'   : 'body-id-' + uniqueID(),
	});

// console.log(!!$.fn.boom); //있는지만 확인.
//boom은 umd 방식으로 처리가 안됐다.
//commonjs에 호환되게 처리되어있지 않다.
//boom.js를 UMD패턴 스니펫으로 옮겨서 사용.

showMessageBox();