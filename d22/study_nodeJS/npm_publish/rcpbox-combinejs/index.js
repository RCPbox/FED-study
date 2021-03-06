/*!
 * combineJS 모듈 역할.
 * 여러 개의 JS 파일을 하나의 JS 파일로 병합하는 일을 수행합니다. 
 * 여러개의 JS파일을 읽어와서 합쳐서 하나의 JS파일로 만들어서 
 * 내보내는 역할을 하기위해 Read와 Write를 다 해야 한다. 
 * 클라이언트는 할수없지만 서버는 할수 있는 일.*/
'use strict';

var fs     = require('fs'),
	minify = require('minify'),
	type   = require('rcpbox-checktype');

// READ
// fs.readFile(path, options, callback_);
// fs.readFileSync(path, options);

// WRITE
// fs.writeFile(path, data, options, callback_);
// fs.writeFileSync(path, data, options);

// 모듈 배포.			//입력된 data파일을 output으로 입력.
module.exports = function(input, output, min, encoding) {

	var input_type = type(input);

	// [유효성 검사] 병합 가능한 파일인지 확인 절차.
	// input 데이터 유형은 반드시 문자열 또는 배열 형만 가능.
	if( input_type !== 'string' && input_type !== 'array' ) {
		throw console.error('병합하고자 하는 JS 파일 문자열 또는 리스트(배열)를 전달해야 합니다.');
	}

	// [데이터 유형 체크/변경] input 데이터 유형이 문자열일 경우, 리스트(배열) 데이터 형으로 변경.
	if( input_type === 'string' ) {
	// input.map()은 각 아이템(원소)마다 처리된 결과로 새롭게 구성된 배열 반환.
	// 새롭게 구성된 배열을 다시 input 변수에 참조.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//제일 좋은건 string 받지 않고 배열만 받도록 조건을 제약화 하는것.
		input = input.split(',').map(function(item, index) {
			return item.trim();
			//문자열의 앞과 뒤의 공백을 제거해 주는 메서드.  문자열.trim()
			//문제는 문자열이 배열 안에 있기 떄문에 탐색해서 적용해야 한다.
			// nodejs 는 ECMA5를 지원한다. map()
		});
	}

	// 압축 유무 확인
	min = (type(min) === 'null' || type(min) === 'undefined' || min === true) ? true : false;

	// 아웃풋 디렉토리 경로 확인.
	var output_dir = output.split('/');//배열화 시킴['js','output','bundle.js']
					//slice 는 시작 숫자부터 끝나는 숫자 앞에까지 자름.
		output_dir = output_dir.slice(0, output_dir.length - 1).join('/');
	// console.log(output_dir); // js/output

	// 병합되는 문자 데이터 변수.
	var combine_data = '',
		options      = {'encoding': ( encoding || 'utf-8' ) };

	// 아웃풋 디렉토리 생성.
	// fs.mkdir(path[, mode], callback)
	fs.mkdir(output_dir, function() {

		// input === javascript files
		// 사용자가 전달한 배열데이터를 forEach를 통해 각각의 파일을 탐색.
		input.forEach(function(file, index) {

			// [읽기] 병합하고자 하는 파일 리스트.
			// fs.readFile(filename[, options], callback)
			fs.readFile(file, options, function(err, data) {

				// 파일 내용 병합 => combine_data
				combine_data += data+'\n\n';

				// [쓰기] 병합되어 완성된 파일.
				// fs.writeFile(filename, data[, options], callback)
				if(index === input.length - 1) {
					fs.writeFileSync(output, combine_data, options);
				}

			});

		});

		// 압축 유무 처리.
		if (min) {
			minify(output, function(error, data) {
				if (error) { throw console.error(error.message); }
				var output_rename = output.replace('.js', '.min.js');
				fs.writeFile(output_rename, data, options);
			});
		}
	});

}
// forEach 는 개별적인 요소에 접근해서 item에 있는 값을 처리할 뿐이지 실제 원래 있던 input 데이터에 다시 적용해주는 방식이 아니다.

